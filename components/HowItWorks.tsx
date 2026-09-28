const steps = [
  {
    number: "01",
    icon: "📄",
    title: "Upload your resume",
    description:
      "JobFit AI extracts your skills, experience, education, tools, and projects to build your career profile.",
  },
  {
    number: "02",
    icon: "⚡",
    title: "Analyze any job",
    description:
      "Paste a job description and get a JobFit score showing your matched skills, missing skills, and experience gaps.",
  },
  {
    number: "03",
    icon: "🎯",
    title: "Close your gaps",
    description:
      "Turn your missing skills into a personalized learning roadmap with practical topics and projects.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-white/10 px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="font-medium text-green-500">
            HOW IT WORKS
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            From resume to
            <span className="text-green-500">
              {" "}job-ready.
            </span>
          </h2>

          <p className="mt-5 leading-7 text-gray-400">
            One simple workflow to understand your career gaps and
            turn them into an actionable plan.
          </p>

        </div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-6 md:grid-cols-3">

          {/* Connecting line */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent md:block" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-2 hover:border-green-500/30 hover:bg-white/[0.05]"
            >

              {/* Icon */}
              <div className="relative flex items-center justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black text-2xl transition group-hover:border-green-500/30">
                  {step.icon}
                </div>

                <span className="text-sm font-medium text-gray-600">
                  {step.number}
                </span>

              </div>

              {/* Content */}
              <h3 className="mt-8 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {step.description}
              </p>

              {/* Bottom accent */}
              <div className="mt-8 h-px w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />

            </div>
          ))}

        </div>

        {/* Bottom statement */}
        <div className="mx-auto mt-16 max-w-3xl text-center">

          <p className="text-lg text-gray-500">
            <span className="text-white">
              Resume
            </span>
            {" → "}
            <span className="text-white">
              JobFit
            </span>
            {" → "}
            <span className="text-white">
              Skill Gaps
            </span>
            {" → "}
            <span className="text-green-400">
              Roadmap
            </span>
          </p>

        </div>

      </div>
    </section>
  );
}