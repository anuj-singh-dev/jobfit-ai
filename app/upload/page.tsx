"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";

export default function UploadResume() {
  const supabase = createClient();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);

  function selectFile(selectedFile: File) {
    if (selectedFile.type !== "application/pdf") {
      setFile(null);
      setMessage("Please upload a PDF file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFile(null);
      setMessage("File size must be less than 5MB.");
      return;
    }

    setFile(selectedFile);
    setMessage("");
  }

  async function uploadResume() {
    if (!file) {
      setMessage("Please select your resume first.");
      return;
    }

    setUploading(true);
    setMessage("Uploading your resume...");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      const filePath = `${user.id}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Extract PDF text
      setMessage("Resume uploaded. Extracting your resume...");

      const response = await fetch("/api/resume/extract", {
        method: "POST",
      });

      const raw = await response.text();

      if (!raw) {
        throw new Error(
          "Resume extraction API returned an empty response."
        );
      }

      let result: {
        error?: string;
        text?: string | string[];
      };

      try {
        result = JSON.parse(raw);
      } catch {
        throw new Error(
          "Resume extraction API returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.error || "Could not extract resume."
        );
      }

      // AI analysis
      setMessage("Resume extracted. Analyzing with AI...");

      const resumeText = Array.isArray(result.text)
        ? result.text.join("\n")
        : result.text;

      const aiResponse = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
        }),
      });

      const aiRaw = await aiResponse.text();

      if (!aiRaw) {
        throw new Error("AI returned an empty response.");
      }

      let aiResult;

      try {
        aiResult = JSON.parse(aiRaw);
      } catch {
        throw new Error("AI returned an invalid response.");
      }

      if (!aiResponse.ok) {
        throw new Error(
          aiResult.error || "AI analysis failed."
        );
      }

      setMessage("Resume analyzed successfully!");

      // Redirect only AFTER the complete pipeline finishes
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <Navigation />

      <div className="mx-auto max-w-3xl pt-16 md:ml-64 md:pt-0">

        {/* HEADER */}
        <section className="text-center">
          <p className="text-sm font-medium tracking-wide text-green-500">
            STEP 1 OF 3
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Upload your resume
          </h1>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
            JobFit AI will analyze your skills, experience, education,
            tools, and projects to build your career profile.
          </p>
        </section>

        {/* PROGRESS */}
        <div className="mx-auto mt-8 flex max-w-md items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-green-500" />
          <div className="h-1 flex-1 rounded-full bg-white/10" />
          <div className="h-1 flex-1 rounded-full bg-white/10" />
        </div>

        {/* UPLOAD CARD */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">

          <label
            htmlFor="resume"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
            e.preventDefault();
            setDragging(false);

            if (uploading) return;

            const droppedFile = e.dataTransfer.files?.[0];

            if (droppedFile) {
              selectFile(droppedFile);
            }
          }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-all ${
              dragging
                ? "border-green-500 bg-green-500/[0.05]"
                : file
                ? "border-green-500/30 bg-green-500/[0.03]"
                : "border-white/10 hover:border-green-500/40 hover:bg-white/[0.02]"
            }`}
          >

            {/* ICON */}
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-3xl border text-3xl ${
                file
                  ? "border-green-500/20 bg-green-500/10"
                  : "border-white/10 bg-black"
              }`}
            >
              {file ? "✓" : "📄"}
            </div>

            {/* FILE NAME */}
            <h2 className="mt-6 max-w-full truncate px-4 text-xl font-semibold">
              {file ? file.name : "Drop your resume here"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {file
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                : "or click to browse your files"}
            </p>

            {!file && (
              <span className="mt-6 rounded-xl border border-white/10 bg-black px-5 py-2.5 text-sm font-medium transition hover:border-green-500/30">
                Browse files
              </span>
            )}

            {file && !uploading && (
              <span className="mt-6 rounded-xl border border-white/10 bg-black px-5 py-2.5 text-sm text-gray-400 transition hover:border-green-500/30 hover:text-white">
                Choose another file
              </span>
            )}

            <input
              id="resume"
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
              if (uploading) return;

              const selectedFile = e.target.files?.[0];

              if (selectedFile) {
                selectFile(selectedFile);
              }
            }}
            />
          </label>

          {/* REQUIREMENTS */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-black/30 p-4 text-center">
              <p className="text-sm text-gray-300">PDF</p>
              <p className="mt-1 text-xs text-gray-600">
                File format
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-4 text-center">
              <p className="text-sm text-gray-300">5 MB</p>
              <p className="mt-1 text-xs text-gray-600">
                Maximum size
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 p-4 text-center">
              <p className="text-sm text-gray-300">AI</p>
              <p className="mt-1 text-xs text-gray-600">
                Resume analysis
              </p>
            </div>
          </div>

          {/* STATUS */}
          {message && (
            <div
              className={`mt-5 rounded-2xl border p-4 text-center text-sm ${
                message.includes("successfully")
                  ? "border-green-500/20 bg-green-500/[0.05] text-green-400"
                  : message.includes("Please") ||
                    message.includes("must")
                  ? "border-red-500/20 bg-red-500/[0.05] text-red-400"
                  : "border-white/10 bg-white/[0.03] text-gray-400"
              }`}
            >
              {message}
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={uploadResume}
            disabled={!file || uploading}
            className="mt-5 w-full rounded-xl bg-green-500 py-3.5 font-semibold text-black transition-all hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {uploading ? "Processing your resume..." : "Analyze My Resume →"}
          </button>

        </section>

        {/* FLOW */}
        <div className="mt-8 pb-10 text-center">
          <p className="text-sm text-gray-600">
            Resume
            <span className="mx-2 text-gray-700">→</span>
            AI Profile
            <span className="mx-2 text-gray-700">→</span>
            JobFit
            <span className="mx-2 text-gray-700">→</span>
            Roadmap
          </p>
        </div>

      </div>
    </main>
  );
}
