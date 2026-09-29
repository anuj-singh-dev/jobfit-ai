"use client";

import { useEffect, useState } from "react";

const steps = [
  {
    number: "01",
    icon: "📄",
    title: "Upload your resume",
    short: "Build your profile",
    description:
      "JobFit AI extracts your skills, experience, education, tools, and projects to build your career profile.",
  },
  {
    number: "02",
    icon: "⚡",
    title: "Analyze any job",
    short: "Find your real fit",
    description:
      "Paste a job description and get a JobFit score showing your matched skills, missing skills, and experience gaps.",
  },
  {
    number: "03",
    icon: "🎯",
    title: "Close your gaps",
    short: "Become job-ready",
    description:
      "Turn your missing skills into a personalized learning roadmap with practical topics and projects.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-t border-white/[0.07] px-6 py-32"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/[0.035] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/[0.05] px-4 py-2 text-xs tracking-[0.18em] text-green-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            HOW IT WORKS
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl">
            From resume to
            <br />
            <span className="bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
              job-ready.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
            One intelligent workflow that turns where you are today into a
            clear path toward your next role.
          </p>
        </div>

        {/* Main visual */}
        <div className="relative mx-auto mt-24 max-w-6xl">
          {/* Desktop connection path */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-[105px] hidden h-px md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-green-500/50 to-green-500/10" />

            {/* Moving energy */}
            <div className="absolute left-0 top-1/2 h-1.5 w-16 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-green-400 to-transparent blur-[2px] animate-[flow_4s_linear_infinite]" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const isActive = active === index;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActive(index)}
                  className="group relative text-left focus:outline-none"
                >
                  {/* Glow */}
                  <div
                    className={`absolute -inset-1 rounded-[28px] bg-green-500/10 blur-2xl transition duration-700 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-50"
                    }`}
                  />

                  {/* Card */}
                  <div
                    className={`relative min-h-[330px] overflow-hidden rounded-[28px] border p-7 backdrop-blur-xl transition-all duration-500 ${
                      isActive
                        ? "border-green-500/30 bg-[#07100a]/90 -translate-y-2 shadow-[0_25px_70px_rgba(34,197,94,0.10)]"
                        : "border-white/[0.08] bg-white/[0.025] hover:-translate-y-1 hover:border-white/[0.15]"
                    }`}
                  >
                    {/* Decorative number */}
                    <span
                      className={`absolute -right-3 -top-8 text-[150px] font-black leading-none tracking-[-0.1em] transition duration-500 ${
                        isActive
                          ? "text-green-500/[0.07]"
                          : "text-white/[0.025]"
                      }`}
                    >
                      {step.number}
                    </span>

                    {/* Top */}
                    <div className="relative flex items-center justify-between">
                      {/* 3D-ish icon */}
                      <div
                        className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl shadow-2xl transition duration-500 ${
                          isActive
                            ? "border-green-500/30 bg-green-500/[0.08] shadow-green-500/10"
                            : "border-white/10 bg-black/40"
                        }`}
                      >
                        <span
                          className={`transition duration-500 ${
                            isActive ? "scale-110" : ""
                          }`}
                        >
                          {step.icon}
                        </span>

                        {/* Small status dot */}
                        <span
                          className={`absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#080b09] transition ${
                            isActive
                              ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]"
                              : "bg-gray-700"
                          }`}
                        />
                      </div>

                      <span
                        className={`font-mono text-xs transition ${
                          isActive ? "text-green-400" : "text-gray-700"
                        }`}
                      >
                        STEP {step.number}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="relative mt-10">
                      <p
                        className={`text-xs uppercase tracking-[0.18em] transition ${
                          isActive ? "text-green-400" : "text-gray-600"
                        }`}
                      >
                        {step.short}
                      </p>

                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-gray-500">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom progress */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.04]">
                      <div
                        className={`h-full bg-gradient-to-r from-transparent via-green-400 to-transparent transition-all duration-700 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile connector */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 top-6 -z-10 w-px bg-gradient-to-b from-green-500/10 via-green-500/30 to-transparent md:hidden" />
        </div>

        {/* Central bridge statement */}
        <div className="relative mx-auto mt-20 max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] px-6 py-8 backdrop-blur-xl sm:px-10">
            {/* Green light */}
            <div className="absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-green-400 to-transparent" />

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="text-gray-500">You are here</span>

              <span className="text-green-500/50">→</span>

              <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-white">
                Resume
              </span>

              <span className="text-green-500/50">→</span>

              <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-white">
                JobFit
              </span>

              <span className="text-green-500/50">→</span>

              <span className="rounded-full border border-green-500/20 bg-green-500/[0.06] px-4 py-2 text-green-400">
                Skill Gaps
              </span>

              <span className="text-green-500/50">→</span>

              <span className="rounded-full border border-green-500/30 bg-green-500/[0.08] px-4 py-2 font-medium text-green-300">
                Job Ready
              </span>
            </div>

            <p className="mt-5 text-center text-xs text-gray-600">
              SkillBridge turns uncertainty into a measurable path forward.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flow {
          0% {
            transform: translateX(-20px) translateY(-50%);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          85% {
            opacity: 1;
          }

          100% {
            transform: translateX(500px) translateY(-50%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}