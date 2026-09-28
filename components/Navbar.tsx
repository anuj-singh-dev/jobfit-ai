export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          className="group text-2xl font-bold tracking-tight"
        >
          JobFit
          <span className="text-green-500 transition group-hover:text-green-400">
            AI
          </span>
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#how-it-works"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            How it works
          </a>

          <a
            href="#features"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#jobs"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Job Matching
          </a>
        </div>

        {/* CTA */}
        <a
          href="/auth"
          className="group rounded-xl border border-green-500/30 bg-green-500 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(34,197,94,0.12)] transition-all duration-300 hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]"
        >
          Get Started
          <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </a>

      </div>
    </nav>
  );
}