"use client";

import Navigation from "../components/Navigation";
import { useState } from "react";

type Analysis = {
  job_title: string;
  company: string;
  jobfit_score: number;
  matched_skills: string[];
  missing_skills: string[];
  experience_gaps: string[];
  education_match: string;
  recommendations: string[];
  summary: string;
};

export default function JobAnalysis() {
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeJob() {
    if (!jobDescription.trim()) return;

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch("/api/job/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Analysis failed");
      }

      setAnalysis(result.analysis);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const score = analysis?.jobfit_score || 0;

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <Navigation />

      <div className="mx-auto max-w-6xl pt-16 md:ml-64 md:pt-0">

        {/* HEADER */}
        <section>
          <p className="text-sm font-medium tracking-wide text-green-500">
            JOBFIT AI
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Analyze a Job
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-gray-500">
            See how your resume matches a job, what you're missing,
            and what you should work on next.
          </p>
        </section>

        {/* INPUT */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium tracking-wider text-gray-500">
                JOB DESCRIPTION
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Paste the role you're targeting
              </h2>
            </div>

            <span className="hidden text-xs text-gray-600 sm:block">
              AI Analysis
            </span>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="mt-6 h-64 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-5 leading-7 text-white outline-none transition placeholder:text-gray-700 focus:border-green-500/40 focus:ring-1 focus:ring-green-500/20"
          />

          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-gray-600">
              Include responsibilities, required skills, and qualifications
              for a more useful analysis.
            </p>

            <button
              onClick={analyzeJob}
              disabled={!jobDescription.trim() || loading}
              className="rounded-xl bg-green-500 px-7 py-3 font-semibold text-black transition-all hover:bg-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Analyzing..." : "Analyze Job →"}
            </button>
          </div>
        </section>

        {/* ERROR */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-5 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* RESULTS */}
        {analysis && (
          <section className="mt-10 space-y-6">

            {/* TOP RESULT */}
            <div className="grid gap-6 lg:grid-cols-3">

              {/* JOB INFO */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 lg:col-span-2">

                <p className="text-xs font-medium tracking-wider text-gray-500">
                  JOB ANALYSIS
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {analysis.job_title || "Untitled Job"}
                </h2>

                <p className="mt-1 text-gray-500">
                  {analysis.company || "Company not detected"}
                </p>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="text-sm leading-7 text-gray-300">
                    {analysis.summary}
                  </p>
                </div>

              </div>

              {/* SCORE */}
              <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-green-500/20 bg-green-500/[0.05] p-7">

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-500/10 blur-3xl" />

                <p className="relative text-xs font-medium tracking-wider text-gray-500">
                  JOBFIT SCORE
                </p>

                <p className="relative mt-3 text-7xl font-bold text-green-400">
                  {score}
                </p>

                <p className="relative text-sm text-gray-600">
                  out of 100
                </p>

                <div className="relative mt-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all duration-700"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>

            </div>

            {/* SKILLS */}
            <div className="grid gap-6 lg:grid-cols-2">

              {/* MATCHED */}
              <div className="rounded-3xl border border-green-500/10 bg-green-500/[0.03] p-7">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-wider text-gray-500">
                      STRENGTHS
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      Matched Skills
                    </h3>
                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                    {analysis.matched_skills.length}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {analysis.matched_skills.length > 0 ? (
                    analysis.matched_skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-sm text-green-400"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">
                      No matched skills detected.
                    </p>
                  )}
                </div>

              </div>

              {/* MISSING */}
              <div className="rounded-3xl border border-red-500/10 bg-red-500/[0.03] p-7">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-wider text-gray-500">
                      GAPS
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      Missing Skills
                    </h3>
                  </div>

                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                    {analysis.missing_skills.length}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {analysis.missing_skills.length > 0 ? (
                    analysis.missing_skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-sm text-red-400"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">
                      No major skill gaps detected.
                    </p>
                  )}
                </div>

              </div>

            </div>

            {/* EXPERIENCE + EDUCATION */}
            <div className="grid gap-6 lg:grid-cols-2">

              {/* EXPERIENCE */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

                <p className="text-xs font-medium tracking-wider text-gray-500">
                  EXPERIENCE
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  Experience Gaps
                </h3>

                <div className="mt-6 space-y-3">
                  {analysis.experience_gaps.length > 0 ? (
                    analysis.experience_gaps.map((gap, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-white/5 bg-black/30 p-4 text-sm leading-6 text-gray-400"
                      >
                        <span className="mr-2 text-green-500">
                          →
                        </span>
                        {gap}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">
                      No significant experience gaps detected.
                    </p>
                  )}
                </div>

              </div>

              {/* EDUCATION */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

                <p className="text-xs font-medium tracking-wider text-gray-500">
                  EDUCATION
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  Education Match
                </h3>

                <div className="mt-6 rounded-2xl border border-white/5 bg-black/30 p-5">
                  <p className="leading-7 text-gray-400">
                    {analysis.education_match}
                  </p>
                </div>

              </div>

            </div>

            {/* RECOMMENDATIONS */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

              <div>
                <p className="text-xs font-medium tracking-wider text-gray-500">
                  NEXT STEPS
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  What You Should Improve
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Use these recommendations to close the gap between your
                  current profile and this role.
                </p>
              </div>

              <div className="mt-7 grid gap-3">
                {analysis.recommendations.map(
                  (recommendation, index) => (
                    <div
                      key={index}
                      className="group rounded-2xl border border-white/5 bg-black/30 p-5 transition hover:border-green-500/20"
                    >
                      <div className="flex gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-sm font-semibold text-green-400">
                          {index + 1}
                        </span>

                        <p className="pt-1 leading-6 text-gray-300">
                          {recommendation}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

            </div>

            {/* ROADMAP CTA */}
            {analysis.missing_skills.length > 0 && (
              <div className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-green-500/[0.05] p-7 sm:p-8">

                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-green-500/10 blur-3xl" />

                <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

                  <div>
                    <p className="text-xs font-medium tracking-wider text-green-500">
                      NEXT STEP
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      Turn your gaps into a roadmap.
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                      Generate a personalized learning path based on the
                      skills this job requires.
                    </p>
                  </div>

                  <a
                    href="/roadmap"
                    className="relative w-fit shrink-0 rounded-xl bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400"
                  >
                    Build Roadmap →
                  </a>

                </div>
              </div>
            )}

          </section>
        )}

      </div>
    </main>
  );
}