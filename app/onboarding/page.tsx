"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: fullName,
        target_role: targetRole,
        experience_level: experience,
        location: location,
      });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.push("/upload");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-lg">

        <div className="mb-8">
          <p className="text-sm font-medium text-green-500">
            STEP 1 OF 3
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Let's build your profile.
          </h1>

          <p className="mt-3 text-gray-500">
            This helps JobFit AI understand what kind of career you're
            targeting.
          </p>
        </div>

        <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-8">

          <div>
            <label className="text-sm text-gray-400">
              Full name
            </label>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Target role
            </label>

            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Data Analyst"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Experience level
            </label>

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-green-500"
            >
              <option>Fresher</option>
              <option>0–1 years</option>
              <option>1–3 years</option>
              <option>3–5 years</option>
              <option>5+ years</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Preferred location
            </label>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Pune, India"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <button
            onClick={saveProfile}
            disabled={loading}
            className="w-full rounded-xl bg-green-500 py-3.5 font-semibold text-black transition hover:bg-green-400 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Continue →"}
          </button>

        </div>
      </div>
    </main>
  );
}