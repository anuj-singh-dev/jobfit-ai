export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">

          {/* Brand */}
          <div>
            <a
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              JobFit
              <span className="text-green-500">AI</span>
            </a>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Understand your job fit, identify your gaps, and build the
              skills to become job-ready.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a
              href="#how-it-works"
              className="text-gray-500 transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#features"
              className="text-gray-500 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#jobs"
              className="text-gray-500 transition hover:text-white"
            >
              Job Matching
            </a>

            <a
              href="/auth"
              className="text-gray-500 transition hover:text-green-400"
            >
              Get Started
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            © 2026 JobFit AI. All rights reserved.
          </p>

          <p className="text-gray-700">
            Built for the next generation of job seekers.
          </p>
        </div>

      </div>
    </footer>
  );
}