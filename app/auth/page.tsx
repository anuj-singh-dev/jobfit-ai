"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAuth() {
    setMessage("");

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.session) {
        router.push("/onboarding");
        router.refresh();
      } else {
        setMessage(
          "Account created! Check your email to confirm your account, then login."
        );
      }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
  email: email.trim(),
  password,
});

if (error) {
  setMessage(error.message);
  return;
}

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  setMessage("Unable to verify your account. Please try again.");
  return;
}

const { data: profile, error: profileError } = await supabase
  .from("profiles")
  .select("id")
  .eq("id", user.id)
  .maybeSingle();

if (profileError) {
  setMessage(profileError.message);
  return;
}

if (!profile) {
  router.push("/onboarding");
} else {
  router.push("/dashboard");
}

router.refresh();
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500/[0.06] blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* Brand */}
        <div className="mb-8 text-center">
          <a
            href="/"
            className="text-3xl font-bold tracking-tight"
          >
            JobFit
            <span className="text-green-500">AI</span>
          </a>

          <div className="mt-8">
            <p className="text-sm font-medium tracking-wide text-green-500">
              CAREER INTELLIGENCE
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              {isSignup
                ? "Build your career intelligence."
                : "Welcome back."}
            </h1>

            <p className="mt-3 leading-6 text-gray-500">
              {isSignup
                ? "Analyze your resume, understand your gaps, and become job-ready."
                : "Continue analyzing jobs and closing your skill gaps."}
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 sm:p-8">

          {/* Toggle */}
          <div className="grid grid-cols-2 rounded-xl border border-white/10 bg-black/40 p-1">
            <button
              type="button"
              onClick={() => {
                setIsSignup(true);
                setMessage("");
              }}
              className={`rounded-lg py-2.5 text-sm font-medium transition ${
                isSignup
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Create account
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSignup(false);
                setMessage("");
              }}
              className={`rounded-lg py-2.5 text-sm font-medium transition ${
                !isSignup
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Login
            </button>
          </div>

          {/* Email */}
          <div className="mt-7">
            <label className="text-sm font-medium text-gray-400">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAuth();
                }
              }}
              placeholder="you@example.com"
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20"
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label className="text-sm font-medium text-gray-400">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAuth();
                }
              }}
              placeholder="••••••••"
              autoComplete={
                isSignup ? "new-password" : "current-password"
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-700 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20"
            />

            {isSignup && (
              <p className="mt-2 text-xs text-gray-600">
                Minimum 6 characters
              </p>
            )}
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mt-5 rounded-xl border p-3.5 text-sm ${
                message.includes("created")
                  ? "border-green-500/20 bg-green-500/[0.05] text-green-400"
                  : "border-red-500/20 bg-red-500/[0.05] text-red-400"
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleAuth}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-green-500 py-3.5 font-semibold text-black transition-all hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading
              ? "Please wait..."
              : isSignup
                ? "Create Account →"
                : "Login →"}
          </button>

          {/* Switch */}
          <p className="mt-6 text-center text-sm text-gray-500">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setMessage("");
              }}
              className="ml-2 font-medium text-green-500 transition hover:text-green-400"
            >
              {isSignup ? "Login" : "Sign up"}
            </button>
          </p>
        </div>

        {/* Product flow */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-700">
            Resume
            <span className="mx-2">→</span>
            JobFit
            <span className="mx-2">→</span>
            Skill Gaps
            <span className="mx-2">→</span>
            Roadmap
          </p>
        </div>

      </div>
    </main>
  );
}