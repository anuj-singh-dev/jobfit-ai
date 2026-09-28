import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@/lib/supabase/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST() {
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

    const { data: jobData, error } = await supabase
      .from("job_analyses")
      .select("id, analysis")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !jobData) {
      return NextResponse.json(
        { error: "Analyze a job first." },
        { status: 404 }
      );
    }

    const missingSkills =
      jobData.analysis?.missing_skills || [];

    if (missingSkills.length === 0) {
      return NextResponse.json({
        success: true,
        roadmap: [],
        message: "No major skill gaps detected.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: `
You are JobFit AI's career roadmap generator.

Create a practical learning roadmap based ONLY on the candidate's missing skills.

Return ONLY valid JSON.

Use exactly this format:

{
  "roadmap": [
    {
      "skill": "",
      "priority": "high",
      "why": "",
      "topics": [],
      "project": "",
      "estimated_weeks": 0
    }
  ]
}

Rules:
- Only use the provided missing skills.
- Do not invent additional skills.
- Prioritize the most important skills.
- Give practical learning topics.
- Give one realistic project for each skill.
- Keep projects suitable for a job seeker.
- estimated_weeks must be a number.
`,
        },
        {
          role: "user",
          content: `
MISSING SKILLS:

${JSON.stringify(missingSkills, null, 2)}

JOB ANALYSIS:

${JSON.stringify(jobData.analysis, null, 2)}
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
        { error: "AI returned no roadmap." },
        { status: 500 }
      );
    }

    const roadmap = JSON.parse(result);

    const generatedRoadmap = roadmap.roadmap || [];

// Save roadmap to Supabase
const { data: savedRoadmap, error: saveError } =
  await supabase
    .from("roadmaps")
    .insert({
      user_id: user.id,
      job_analysis_id: jobData.id,
      roadmap: generatedRoadmap,
      progress: 0,
    })
    .select()
    .single();

if (saveError) {
  console.error("SAVE ROADMAP ERROR:", saveError);

  return NextResponse.json(
    { error: saveError.message },
    { status: 500 }
  );
}

return NextResponse.json({
  success: true,
  roadmap: generatedRoadmap,
  roadmap_id: savedRoadmap.id,
});
  } catch (error: any) {
    console.error("ROADMAP ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Roadmap generation failed.",
      },
      {
        status: error?.status || 500,
      }
    );
  }
}