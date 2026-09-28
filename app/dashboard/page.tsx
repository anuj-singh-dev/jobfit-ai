import Navigation from "../components/Navigation";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Resume analysis
  const { data: analysisData, error } = await supabase
    .from("resume_analyses")
    .select("analysis, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Latest job analysis
  const { data: jobData } = await supabase
    .from("job_analyses")
    .select(
      "id, job_title, company, jobfit_score, analysis, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  // Latest roadmap
  const { data: roadmapData } = await supabase
    .from("roadmaps")
    .select("id, progress, roadmap, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !analysisData) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <Navigation />

        <div className="mx-auto max-w-4xl pt-20 md:ml-64 md:pt-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="text-sm font-medium text-green-500">
              JOBFIT AI
            </p>

            <h1 className="mt-4 text-3xl font-bold">
              Your dashboard is waiting.
            </h1>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              Upload your resume to generate your AI career profile.
            </p>

            <a
              href="/upload"
              className="mt-7 inline-flex rounded-xl bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400"
            >
              Upload Resume →
            </a>
          </div>
        </div>
      </main>
    );
  }

  const analysis = analysisData.analysis;
  const jobAnalysis = jobData?.analysis;

  const missingSkills = jobAnalysis?.missing_skills || [];
  const matchedSkills = jobAnalysis?.matched_skills || [];

  const score = jobData?.jobfit_score || 0;
  const roadmapProgress = roadmapData?.progress || 0;

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <Navigation />

      <div className="mx-auto max-w-6xl pt-16 md:ml-64 md:pt-0">

        {/* HEADER */}
        <section className="pt-2">
          <p className="text-sm font-medium tracking-wide text-green-500">
            JOBFIT AI
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome, {analysis.name || "there"}.
              </h1>

              <p className="mt-2 text-gray-500">
                Your career intelligence, all in one place.
              </p>
            </div>

            <a
              href="/job-analysis"
              className="w-fit rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition hover:border-green-500/30 hover:bg-white/[0.06]"
            >
              Analyze New Job →
            </a>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="mt-10">
          <div className="grid gap-4 md:grid-cols-4">

            {/* SCORE */}
            <div className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-green-500/[0.06] p-6">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-500/10 blur-3xl" />

              <p className="text-xs font-medium tracking-wider text-gray-500">
                JOBFIT SCORE
              </p>

              <div className="mt-4 flex items-end gap-2">
                <p className="text-5xl font-bold text-green-400">
                  {score}
                </p>

                <p className="pb-1 text-sm text-gray-600">
                  / 100
                </p>
              </div>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            {/* JOB */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-medium tracking-wider text-gray-500">
                LATEST JOB
              </p>

              <h3 className="mt-4 line-clamp-2 text-lg font-semibold">
                {jobData?.job_title || "No job analyzed"}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {jobData?.company || "Analyze a job to begin"}
              </p>
            </div>

            {/* GAPS */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-medium tracking-wider text-gray-500">
                SKILL GAPS
              </p>

              <p className="mt-4 text-4xl font-bold">
                {missingSkills.length}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                skills to improve
              </p>
            </div>

            {/* ROADMAP */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-medium tracking-wider text-gray-500">
                ROADMAP
              </p>

              <p className="mt-4 text-4xl font-bold text-green-400">
                {roadmapProgress}%
              </p>

              <p className="mt-1 text-sm text-gray-500">
                completed
              </p>
            </div>

          </div>
        </section>

        {/* JOB ANALYSIS */}
        {jobData && (
          <section className="mt-8 grid gap-6 lg:grid-cols-2">

            {/* MATCHED */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium tracking-wider text-gray-500">
                    MATCHED SKILLS
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    What you already have
                  </h2>
                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  {matchedSkills.length} matched
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map(
                    (skill: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-sm text-green-400"
                      >
                        {skill}
                      </span>
                    )
                  )
                ) : (
                  <p className="text-sm text-gray-600">
                    No matched skills detected.
                  </p>
                )}
              </div>
            </div>

            {/* GAPS */}
            <div className="rounded-3xl border border-red-500/10 bg-red-500/[0.03] p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium tracking-wider text-gray-500">
                    SKILL GAPS
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    What you need next
                  </h2>
                </div>

                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                  {missingSkills.length} gaps
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {missingSkills.length > 0 ? (
                  missingSkills.map(
                    (skill: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-sm text-red-400"
                      >
                        {skill}
                      </span>
                    )
                  )
                ) : (
                  <p className="text-sm text-gray-600">
                    No major skill gaps detected.
                  </p>
                )}
              </div>
            </div>

          </section>
        )}

        {/* ROADMAP */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium tracking-wider text-gray-500">
                CAREER ROADMAP
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Build the skills your target job needs.
              </h2>
            </div>

            <a
              href="/roadmap"
              className="w-fit rounded-xl bg-green-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-green-400"
            >
              Open Roadmap →
            </a>
          </div>

          <div className="mt-7">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Progress
              </span>

              <span className="font-medium text-green-400">
                {roadmapProgress}%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-green-500 transition-all"
                style={{ width: `${roadmapProgress}%` }}
              />
            </div>
          </div>
        </section>

        {/* PROFILE */}
        <section className="mt-8">
          <div>
            <p className="text-xs font-medium tracking-wider text-gray-500">
              YOUR PROFILE
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Resume Intelligence
            </h2>

            <p className="mt-2 text-gray-500">
              What JobFit AI extracted from your resume.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs text-gray-500">
                TARGET ROLE
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                {analysis.target_role || "Not detected"}
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs text-gray-500">
                SKILLS
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                {analysis.skills?.length || 0}
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs text-gray-500">
                PROJECTS
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                {analysis.projects?.length || 0}
              </h3>
            </div>

          </div>
        </section>

        {/* SKILLS */}
        <section className="mt-8">
          <h2 className="text-xl font-bold">
            Skills
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {analysis.skills?.map(
              (skill: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-400"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </section>

        {/* PROGRAMMING LANGUAGES */}
        <section className="mt-8">
          <h2 className="text-xl font-bold">
            Programming Languages
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {analysis.programming_languages?.map(
              (language: string, index: number) => (
                <span
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300"
                >
                  {language}
                </span>
              )
            )}
          </div>
        </section>

        {/* TOOLS */}
        <section className="mt-8">
          <h2 className="text-xl font-bold">
            Tools
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {analysis.tools?.map(
              (tool: string, index: number) => (
                <span
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300"
                >
                  {tool}
                </span>
              )
            )}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mt-8 pb-16">
          <h2 className="text-xl font-bold">
            Projects
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {analysis.projects?.map(
              (project: any, index: number) => (
                <div
                  key={index}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-green-500/20"
                >
                  <h3 className="text-lg font-semibold">
                    {project.name || "Project"}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {project.description || ""}
                  </p>

                  <div className="mt-5 h-px w-0 bg-green-500 transition-all duration-500 group-hover:w-full" />
                </div>
              )
            )}
          </div>
        </section>

      </div>
    </main>
  );
}