"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPassword() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function sendResetEmail() {
    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      }
    );

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        "Password reset link sent. Check your email."
      );
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md">
        <p className="text-sm font-medium tracking-wide text-green-500">
          JOBFIT AI
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Forgot your password?
        </h1>

        <p className="mt-3 text-gray-500">
          Enter your email and we'll send you a password reset link.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-green-500"
          />

          <button
            onClick={sendResetEmail}
            disabled={loading || !email.trim()}
            className="w-full rounded-xl bg-green-500 px-5 py-3 font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {message && (
            <p className="text-sm text-green-400">
              {message}
            </p>
          )}

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <Link
            href="/auth"
            className="block text-center text-sm text-gray-500 hover:text-white"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}