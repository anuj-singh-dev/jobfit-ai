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

    const { resumeText } = await request.json();

    if (!resumeText || typeof resumeText !== "string") {
  return NextResponse.json(
    { error: "Resume text is required." },
    { status: 400 }
  );
}

const cleanedResumeText = resumeText.trim();

if (cleanedResumeText.length < 100) {
  return NextResponse.json(
    {
      error:
        "The resume text is too short. Please upload a readable resume PDF.",
    },
    { status: 400 }
  );
}

if (cleanedResumeText.length > 30000) {
  return NextResponse.json(
    {
      error:
        "The resume is too large to analyze. Please upload a shorter resume.",
    },
    { status: 400 }
  );
}

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: `
You are JobFit AI, a professional resume analyzer.

Analyze the resume carefully and return ONLY valid JSON.

Use exactly this structure:

{
  "name": "",
  "target_role": "",
  "skills": [],
  "programming_languages": [],
  "tools": [],
  "education": [],
  "experience": [],
  "projects": [],
  "certifications": []
}

Rules:

1. Never invent information.
2. If information is missing, return an empty string or empty array.
3. Keep skills, programming_languages, tools, education, experience,
   projects, and certifications as arrays.
4. Do not duplicate the same skill across multiple categories unless
   the resume clearly presents it that way.
5. Extract only information explicitly supported by the resume.
6. Preserve important names, job titles, companies, degrees,
   technologies, project names, and certifications.
7. target_role should contain the role explicitly stated in the resume.
   If no target role is stated, return an empty string.
8. Return valid JSON only. Do not include markdown or explanations.
`,
        },
        {
          role: "user",
          content: cleanedResumeText,
        },
      ],

      response_format: {
        type: "json_object",
      },
    });

    const result = completion.choices[0]?.message?.content;

    if (!result) {
      return NextResponse.json(
        { error: "AI returned no result." },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(result);

    const { error: saveError } = await supabase
      .from("resume_analyses")
      .insert({
        user_id: user.id,
        analysis,
      });

    if (saveError) {
      console.error("SAVE ANALYSIS ERROR:", saveError);

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
    console.error("===== GROQ ERROR =====");
    console.error("Message:", error?.message);
    console.error("Status:", error?.status);

    return NextResponse.json(
      {
        error: error?.message || "AI analysis failed.",
      },
      { status: error?.status || 500 }
    );
  }
}