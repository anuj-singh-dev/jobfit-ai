export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          }}
        />

        {/* Green glow */}
        <div className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-green-500/[0.10] blur-[130px]" />

        {/* Secondary glow */}
        <div className="absolute -right-40 top-40 h-[300px] w-[300px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />

        {/* Orbital rings */}
        <div className="absolute left-1/2 top-[42%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/[0.08]" />

        <div className="absolute left-1/2 top-[42%] h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center pb-20 pt-28 text-center">

        {/* Status badge */}
        <div className="group mb-7 inline-flex cursor-default items-center gap-2 rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-sm text-green-400 backdrop-blur-md transition duration-300 hover:border-green-500/40 hover:bg-green-500/[0.10]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>

          AI-powered career intelligence

          <span className="text-green-500/40">✦</span>
        </div>

        {/* Heading */}
        <h1 className="relative max-w-5xl text-5xl font-bold leading-[0.92] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[92px]">
          Stop applying
          <br />

          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-green-300 via-green-500 to-emerald-400 bg-clip-text text-transparent">
              blindly.
            </span>

            {/* Glow behind word */}
            <span className="absolute inset-0 -z-10 blur-2xl opacity-30">
              <span className="text-green-500">blindly.</span>
            </span>
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
          SkillBridge analyzes your resume, compares it with real job
          requirements, finds your skill gaps, and builds a roadmap to help
          you become job-ready.
        </p>

        {/* CTA */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="/auth"
            className="group relative overflow-hidden rounded-xl bg-green-500 px-8 py-4 font-semibold text-black shadow-[0_0_35px_rgba(34,197,94,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-green-400 hover:shadow-[0_0_45px_rgba(34,197,94,0.28)]"
          >
            <span className="relative z-10">
              Analyze My Resume
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>

            {/* Button shine */}
            <span className="absolute inset-y-0 -left-20 w-10 rotate-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[120%]" />
          </a>

          <a
            href="#how-it-works"
            className="rounded-xl border border-white/10 bg-white/[0.035] px-8 py-4 font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
          >
            See How It Works
          </a>
        </div>

        <p className="mt-7 text-sm text-gray-600">
          Built for students, freshers & early-career professionals
        </p>

        {/* -------------------------------- */}
        {/* PRODUCT VISUAL */}
        {/* -------------------------------- */}

        <div className="relative mt-20 w-full max-w-5xl">

          {/* Floating Resume card */}
          <div className="absolute -left-2 top-8 z-20 hidden w-44 -rotate-6 rounded-2xl border border-white/10 bg-[#0b0d0d]/90 p-4 text-left shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:rotate-0 md:block">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-gray-500">
                Resume
              </span>

              <span className="text-green-400">✓</span>
            </div>

            <div className="space-y-2">
              <div className="h-2 w-20 rounded-full bg-white/10" />
              <div className="h-2 w-28 rounded-full bg-white/5" />
              <div className="h-2 w-24 rounded-full bg-white/5" />
            </div>

            <div className="mt-4 flex gap-1">
              <span className="h-1.5 w-8 rounded-full bg-green-500/60" />
              <span className="h-1.5 w-5 rounded-full bg-green-500/30" />
              <span className="h-1.5 w-6 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Floating Job Match card */}
          <div className="absolute -right-2 top-16 z-20 hidden w-48 rotate-6 rounded-2xl border border-white/10 bg-[#0b0d0d]/90 p-4 text-left shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:rotate-0 md:block">
            <div className="text-[10px] uppercase tracking-wider text-gray-500">
              Job match
            </div>

            <div className="mt-2 flex items-end gap-1">
              <span className="text-4xl font-bold text-green-400">87</span>
              <span className="mb-1 text-xs text-gray-500">%</span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[87%] rounded-full bg-green-500" />
            </div>

            <div className="mt-2 text-[10px] text-gray-600">
              Strong candidate
            </div>
          </div>

          {/* Main product visual */}
          <div className="relative mx-auto max-w-3xl">
            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/[0.12] blur-[100px]" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090b0b]/90 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">

              {/* Browser header */}
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />

                <div className="ml-4 flex-1 rounded-md bg-white/[0.035] px-3 py-1.5 text-left text-[10px] text-gray-600">
                  skillbridge.ai / analysis
                </div>
              </div>

              {/* Dashboard */}
              <div className="grid gap-5 p-5 sm:grid-cols-[1fr_1.4fr] sm:p-7">

                {/* Score */}
                <div className="relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 text-left">

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-gray-600">
                      JobFit Score
                    </div>

                    <div className="mt-5 flex items-end gap-2">
                      <span className="text-7xl font-bold tracking-[-0.06em] text-white">
                        87
                      </span>

                      <span className="mb-3 text-sm text-gray-600">
                        / 100
                      </span>
                    </div>
                  </div>

                  {/* Circular visual */}
                  <div className="absolute -bottom-16 -right-12 h-44 w-44 rounded-full border-[14px] border-green-500/10">
                    <div className="absolute inset-0 rounded-full border-[14px] border-transparent border-l-green-500 border-t-green-500 rotate-[-35deg]" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-2 flex justify-between text-[10px] text-gray-600">
                      <span>Current fit</span>
                      <span className="text-green-400">Strong</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-green-600 to-green-400" />
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-gray-600">
                        Skill analysis
                      </div>

                      <div className="mt-1 text-sm text-gray-300">
                        Your profile vs. target role
                      </div>
                    </div>

                    <span className="animate-pulse text-green-400">●</span>
                  </div>

                  <div className="mt-7 space-y-5">
                    {[
                      ["SQL", "95%"],
                      ["Excel", "90%"],
                      ["Power BI", "82%"],
                      ["Python", "70%"],
                    ].map(([skill, score]) => (
                      <div key={skill}>
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="text-gray-400">{skill}</span>
                          <span className="text-gray-600">{score}</span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                          <div
                            className="h-full rounded-full bg-green-500/80"
                            style={{ width: score }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom flow */}
              <div className="border-t border-white/[0.07] px-5 py-5 sm:px-7">
                <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] sm:gap-3">
                  {[
                    "Resume",
                    "Analysis",
                    "Skill Gaps",
                    "Roadmap",
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-1.5 ${
                          index === 3
                            ? "border-green-500/30 bg-green-500/[0.08] text-green-400"
                            : "border-white/[0.08] bg-white/[0.02] text-gray-500"
                        }`}
                      >
                        {item}
                      </span>

                      {index < 3 && (
                        <span className="text-gray-700">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating skill card */}
          <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 translate-y-1/2 rounded-full border border-green-500/20 bg-[#0b0d0d]/90 px-5 py-3 shadow-xl backdrop-blur-xl sm:block">
            <div className="flex items-center gap-3 text-xs">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                ✓
              </span>

              <span className="text-gray-400">
                Roadmap generated
              </span>

              <span className="font-semibold text-green-400">
                +4 skills
              </span>
            </div>
          </div>
        </div>

        {/* Product flow */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-600 sm:gap-3">
          {["Resume", "Job Match", "Skill Gaps", "Roadmap"].map(
            (item, index) => (
              <div key={item} className="flex items-center gap-2">
                <span
                  className={`rounded-full border px-4 py-2 transition duration-300 hover:-translate-y-0.5 ${
                    index === 3
                      ? "border-green-500/20 bg-green-500/[0.05] text-green-400"
                      : "border-white/10 hover:border-white/20 hover:text-gray-400"
                  }`}
                >
                  {item}
                </span>

                {index < 3 && (
                  <span className="text-gray-700">→</span>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}