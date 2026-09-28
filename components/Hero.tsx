export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 -z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-500/[0.08] blur-[140px]" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center text-center">

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/[0.07] px-4 py-2 text-sm text-green-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          AI-powered career intelligence
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">

          Stop applying
          <br />

          <span className="text-green-500">
            blindly.
          </span>

        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
          JobFit AI analyzes your resume, compares it with real job
          requirements, finds your skill gaps, and builds a roadmap to
          help you become job-ready.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">

          <a
            href="/auth"
            className="group rounded-xl bg-green-500 px-8 py-4 font-semibold text-black transition duration-200 hover:-translate-y-1 hover:bg-green-400"
          >
            Analyze My Resume
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="#how-it-works"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-white/[0.07]"
          >
            See How It Works
          </a>

        </div>

        {/* Trust text */}
        <p className="mt-8 text-sm text-gray-600">
          Built for students, freshers & early-career professionals
        </p>

        {/* Product flow */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600">

          <span className="rounded-full border border-white/10 px-4 py-2">
            Resume
          </span>

          <span>→</span>

          <span className="rounded-full border border-white/10 px-4 py-2">
            Job Match
          </span>

          <span>→</span>

          <span className="rounded-full border border-white/10 px-4 py-2">
            Skill Gaps
          </span>

          <span>→</span>

          <span className="rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2 text-green-400">
            Roadmap
          </span>

        </div>

      </div>
    </section>
  );
}