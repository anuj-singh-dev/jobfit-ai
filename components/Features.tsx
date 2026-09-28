const features = [
  {
    icon: "🎯",
    title: "Job Fit Score",
    description:
      "See exactly how closely your current profile matches a specific job before you apply.",
  },
  {
    icon: "🧠",
    title: "Skill Gap Analysis",
    description:
      "Discover the important skills you're missing instead of guessing what you should learn next.",
  },
  {
    icon: "📈",
    title: "Career Roadmap",
    description:
      "Turn your skill gaps into a practical learning path with topics, projects, and priorities.",
  },
  {
    icon: "💼",
    title: "Job Matching",
    description:
      "Find roles that align with your existing skills, experience, and career direction.",
  },
  {
    icon: "🎤",
    title: "Interview Prep",
    description:
      "Prepare for technical and behavioral interviews based on the requirements of the role.",
  },
  {
    icon: "✨",
    title: "Resume Optimization",
    description:
      "Identify areas of your resume that can be improved for the specific jobs you're targeting.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-white/10 px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-medium tracking-wide text-green-500">
            EVERYTHING IN ONE PLACE
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Your career,
            <span className="text-green-500"> decoded.</span>
          </h2>

          <p className="mt-5 leading-7 text-gray-400">
            From understanding your current profile to becoming
            job-ready, JobFit AI connects every step of your career journey.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/30 hover:bg-white/[0.05]"
            >
              {/* Background glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-500/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

              {/* Number */}
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black text-2xl transition duration-300 group-hover:border-green-500/30 group-hover:scale-105">
                  {feature.icon}
                </div>

                <span className="text-sm font-medium text-gray-700">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div className="mt-7 h-px w-0 bg-green-500 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mx-auto mt-20 max-w-3xl text-center">
          <p className="text-lg leading-8 text-gray-500">
            Don't just apply to jobs.
            <span className="text-white"> Understand them.</span>
            <br />
            Then build the skills to
            <span className="text-green-400"> get them.</span>
          </p>
        </div>

      </div>
    </section>
  );
}