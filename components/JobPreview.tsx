const skills = [
  { name: "SQL", score: 95, status: "Strong" },
  { name: "Excel", score: 90, status: "Strong" },
  { name: "Power BI", score: 82, status: "Strong" },
  { name: "Python", score: 70, status: "Developing" },
  { name: "Statistics", score: 52, status: "Gap" },
];

export default function JobPreview() {
  return (
    <section
      id="jobs"
      className="border-t border-white/10 px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Text */}
          <div>

            <p className="font-medium text-green-500">
              YOUR JOBFIT
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Know where you stand
              <span className="text-green-500">
                {" "}before you apply.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-gray-400">
              Stop guessing whether you're qualified. JobFit AI compares
              your resume with the actual requirements of a job and shows
              you exactly where you match and where you need to improve.
            </p>

            <a
              href="/auth"
              className="mt-8 inline-block rounded-xl bg-green-500 px-7 py-3.5 font-semibold text-black transition hover:-translate-y-1 hover:bg-green-400"
            >
              Analyze My Profile →
            </a>

          </div>

          {/* Dashboard Preview */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">

              <div>
                <p className="text-sm text-gray-500">
                  TARGET ROLE
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  Data Analyst
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  TechNova Solutions
                </p>
              </div>

              {/* Score */}
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-green-500">
                <span className="text-xl font-bold">
                  82
                </span>

                <span className="text-[10px] text-gray-500">
                  / 100
                </span>
              </div>

            </div>

            {/* Match */}
            <div className="mt-6">

              <div className="flex items-center justify-between">

                <h4 className="font-semibold">
                  Skill Match
                </h4>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  Strong match
                </span>

              </div>

              <div className="mt-6 space-y-5">

                {skills.map((skill) => (
                  <div key={skill.name}>

                    <div className="mb-2 flex items-center justify-between text-sm">

                      <span className="text-gray-300">
                        {skill.name}
                      </span>

                      <div className="flex items-center gap-3">

                        <span
                          className={
                            skill.status === "Gap"
                              ? "text-red-400"
                              : skill.status === "Developing"
                              ? "text-yellow-400"
                              : "text-green-400"
                          }
                        >
                          {skill.status}
                        </span>

                        <span className="text-gray-500">
                          {skill.score}%
                        </span>

                      </div>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">

                      <div
                        className={`h-full rounded-full ${
                          skill.status === "Gap"
                            ? "bg-red-500"
                            : skill.status === "Developing"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${skill.score}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* Skill Gap */}
            <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-5">

              <div className="flex items-center justify-between">

                <p className="text-sm font-medium text-red-400">
                  Biggest skill gap
                </p>

                <span className="text-xs text-gray-600">
                  NEEDS WORK
                </span>

              </div>

              <div className="mt-3 flex items-center justify-between">

                <span className="font-semibold">
                  Statistics
                </span>

                <span className="text-sm text-red-400">
                  52% match
                </span>

              </div>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Build your statistics skills to improve your alignment
                with this role.
              </p>

            </div>

            {/* Roadmap preview */}
            <div className="mt-4 rounded-2xl border border-green-500/10 bg-green-500/[0.03] p-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    NEXT STEP
                  </p>

                  <p className="mt-1 font-semibold">
                    Learn Statistics
                  </p>
                </div>

                <span className="text-green-400">
                  →
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}