import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navigation from "../components/Navigation";

export default async function JobHistory() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: jobs, error } = await supabase
    .from("job_analyses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <Navigation />

        <div className="mx-auto max-w-5xl pt-20 md:ml-64 md:pt-10">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/[0.05] p-8">
            <p className="text-sm text-red-400">
              Failed to load job history.
            </p>
          </div>
        </div>
      </main>
    );
  }

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
            Job Analysis History
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-gray-500">
            Keep track of the jobs you've analyzed and how closely your
            profile matched each opportunity.
          </p>
        </section>

        {/* STATS */}
        {jobs.length > 0 && (
          <section className="mt-10 grid gap-4 sm:grid-cols-2">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-medium tracking-wider text-gray-500">
                JOBS ANALYZED
              </p>

              <p className="mt-3 text-4xl font-bold">
                {jobs.length}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                total analyses
              </p>
            </div>

            <div className="rounded-3xl border border-green-500/10 bg-green-500/[0.03] p-6">
              <p className="text-xs font-medium tracking-wider text-gray-500">
                LATEST SCORE
              </p>

              <p className="mt-3 text-4xl font-bold text-green-400">
                {jobs[0]?.jobfit_score ?? 0}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                latest JobFit score
              </p>
            </div>

          </section>
        )}

        {/* EMPTY STATE */}
        {jobs.length === 0 ? (
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">

            <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black text-2xl">
                ⚡
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                No job analyses yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-gray-500">
                Analyze your first job to see your JobFit score, skill
                gaps, and recommendations here.
              </p>

              <a
                href="/job-analysis"
                className="mt-7 inline-flex rounded-xl bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400"
              >
                Analyze a Job →
              </a>
            </div>
          </div>
        ) : (
          /* HISTORY */
          <section className="mt-10">

            <div className="mb-5">
              <p className="text-xs font-medium tracking-wider text-gray-500">
                ANALYSIS HISTORY
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Your previous jobs
              </h2>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => {

                const score = job.jobfit_score ?? 0;

                return (
                  <div
                    key={job.id}
                    className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-500/20 hover:bg-white/[0.045]"
                  >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                      {/* JOB */}
                      <div className="min-w-0">
                        <div className="flex items-start gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black text-lg">
                            💼
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-xl font-semibold">
                              {job.job_title || "Untitled Job"}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                              {job.company || "Unknown Company"}
                            </p>

                            <p className="mt-3 text-xs text-gray-600">
                              Analyzed{" "}
                              {new Date(
                                job.created_at
                              ).toLocaleDateString()}
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* SCORE */}
                      <div className="flex items-center justify-between gap-8 sm:justify-end">

                        <div className="hidden text-right sm:block">
                          <p className="text-xs text-gray-600">
                            JOBFIT SCORE
                          </p>

                          <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-green-500"
                              style={{
                                width: `${score}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-3xl font-bold text-green-400">
                            {score}
                          </p>

                          <p className="text-xs text-gray-600">
                            / 100
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </section>
        )}

        <div className="h-12" />
      </div>
    </main>
  );
}