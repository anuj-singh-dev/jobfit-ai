import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@/lib/supabase/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { jobDescription } = await request.json();

    if (!jobDescription?.trim()) {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 }
      );
    }

    // Get latest resume analysis
    const { data: resumeData, error: resumeError } =
      await supabase
        .from("resume_analyses")
        .select("analysis")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    if (resumeError || !resumeData) {
      return NextResponse.json(
        {
          error:
            "Please upload and analyze your resume first.",
        },
        { status: 404 }
      );
    }

    // Ask AI to analyze the job
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: `
You are JobFit AI.

Compare the candidate resume with the job description.

Return ONLY valid JSON.

Return exactly:

{
  "job_title": "",
  "company": "",
  "matched_skills": [],
  "missing_skills": [],
  "experience_match": "",
  "education_match": "",
  "project_relevance": "",
  "experience_gaps": [],
  "recommendations": [],
  "summary": ""
}

Rules:

- Do not invent candidate experience.
- Only consider skills actually present in the resume.
- matched_skills = skills required by the job that the candidate has.
- missing_skills = important job skills that are missing from the resume.
- experience_match must be one of:
  "strong", "partial", "weak"
- education_match must be one of:
  "strong", "partial", "weak"
- project_relevance must be one of:
  "strong", "partial", "weak"
`,
        },

        {
          role: "user",
          content: `
CANDIDATE RESUME:

${JSON.stringify(
  resumeData.analysis,
  null,
  2
)}

JOB DESCRIPTION:

${jobDescription}
`,
        },
      ],

      response_format: {
        type: "json_object",
      },
    });

    const result =
      completion.choices[0]?.message?.content;

    if (!result) {
      return NextResponse.json(
        { error: "AI returned no result." },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(result);

    // -----------------------------
    // JOBFIT SCORING ENGINE
    // -----------------------------

    const matchedSkills =
      Array.isArray(analysis.matched_skills)
        ? analysis.matched_skills.length
        : 0;

    const missingSkills =
      Array.isArray(analysis.missing_skills)
        ? analysis.missing_skills.length
        : 0;

    const totalSkills =
      matchedSkills + missingSkills;

    const skillScore =
      totalSkills > 0
        ? (matchedSkills / totalSkills) * 60
        : 0;

    const experienceScore =
      analysis.experience_match === "strong"
        ? 20
        : analysis.experience_match === "partial"
        ? 12
        : 5;

    const educationScore =
      analysis.education_match === "strong"
        ? 10
        : analysis.education_match === "partial"
        ? 6
        : 3;

    const projectScore =
      analysis.project_relevance === "strong"
        ? 10
        : analysis.project_relevance === "partial"
        ? 6
        : 3;

    const jobfitScore = Math.round(
      skillScore +
        experienceScore +
        educationScore +
        projectScore
    );

    // Add calculated score
    analysis.jobfit_score = jobfitScore;

    // Save analysis to Supabase
    const { error: saveError } = await supabase
      .from("job_analyses")
      .insert({
        user_id: user.id,
        job_title: analysis.job_title || null,
        company: analysis.company || null,
        jobfit_score: jobfitScore,
        analysis,
      });
  
    if (saveError) {
      console.error("SAVE JOB ANALYSIS ERROR:", saveError);

  return NextResponse.json(
    { error: saveError.message },
    { status: 500 }
  );
}

return NextResponse.json({
  success: true,
  analysis,
});

  } catch (error: any) {
    console.error("JOB ANALYSIS ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Job analysis failed.",
      },
      {
        status: error?.status || 500,
      }
    );
  }
}