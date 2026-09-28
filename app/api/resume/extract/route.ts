import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { extractText } from "unpdf";

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

    const { data: files, error: listError } =
      await supabase.storage
        .from("resumes")
        .list(user.id);

    if (listError) {
      return NextResponse.json(
        { error: listError.message },
        { status: 500 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No resume found." },
        { status: 404 }
      );
    }

    const latestFile = files.sort(
      (a, b) =>
        new Date(b.created_at ?? 0).getTime() -
        new Date(a.created_at ?? 0).getTime()
    )[0];

    const filePath = `${user.id}/${latestFile.name}`;

    const { data: file, error: downloadError } =
      await supabase.storage
        .from("resumes")
        .download(filePath);

    if (downloadError || !file) {
      return NextResponse.json(
        {
          error:
            downloadError?.message ??
            "Could not download resume.",
        },
        { status: 500 }
      );
    }

    const buffer = new Uint8Array(
      await file.arrayBuffer()
    );

    const { text } = await extractText(buffer);

const extractedText = Array.isArray(text)
  ? text.join("\n")
  : text;

if (!extractedText || extractedText.trim().length < 100) {
  return NextResponse.json(
    {
      error:
        "Could not extract enough readable text from this PDF. Please upload a text-based resume PDF.",
    },
    { status: 422 }
  );
}

return NextResponse.json({
  success: true,
  text: extractedText,
});

  } catch (error) {
    console.error("RESUME EXTRACTION ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}