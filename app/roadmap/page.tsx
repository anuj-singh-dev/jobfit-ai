"use client";

import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";

type RoadmapItem = {
  skill: string;
  priority: string;
  why: string;
  topics: string[];
  project: string;
  estimated_weeks: number;
};

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [roadmapId, setRoadmapId] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadRoadmap() {
      try {
        const response = await fetch("/api/roadmap/latest");
        const result = await response.json();

        if (!response.ok) return;

        setRoadmap(result.roadmap || []);
        setRoadmapId(result.roadmapId || "");

        setCompleted(
          result.completedItems ||
            new Array(result.roadmap?.length || 0).fill(false)
        );
      } catch (error) {
        console.error("LOAD ROADMAP ERROR:", error);
      } finally {
        setInitialLoading(false);
      }
    }

    loadRoadmap();
  }, []);

  async function generateRoadmap() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/roadmap/generate", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to generate roadmap"
        );
      }

      setRoadmap(result.roadmap || []);
      setRoadmapId(result.roadmap_id || "");

      setCompleted(
        new Array(result.roadmap?.length || 0).fill(false)
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  async function toggleComplete(index: number) {
    const updated = [...completed];

    updated[index] = !updated[index];

    setCompleted(updated);

    const completedCount = updated.filter(Boolean).length;

    const progress =
      updated.length > 0
        ? Math.round((completedCount / updated.length) * 100)
        : 0;

    if (roadmapId) {
      try {
        await fetch("/api/roadmap/progress", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roadmapId,
            progress,
            completedItems: updated,
          }),
        });
      } catch (error) {
        console.error("SAVE PROGRESS ERROR:", error);
      }
    }
  }

  const completedCount = completed.filter(Boolean).length;

  const progress =
    roadmap.length > 0
      ? Math.round((completedCount / roadmap.length) * 100)
      : 0;

  if (initialLoading) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <Navigation />

        <div className="mx-auto max-w-6xl pt-20 md:ml-64 md:pt-10">
          <div className="animate-pulse">
            <div className="h-3 w-24 rounded bg-white/10" />
            <div className="mt-5 h-10 w-80 rounded bg-white/10" />
            <div className="mt-3 h-5 w-96 max-w-full rounded bg-white/5" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <Navigation />

      <div className="mx-auto max-w-6xl pt-16 md:ml-64 md:pt-0">

        {/* HEADER */}
        <section>
          <p className="text-sm font-medium tracking-wide text-green-500">
            JOBFIT AI
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Your Learning Roadmap
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-gray-500">
                Turn your job skill gaps into a practical learning path
                built around skills, topics, and projects.
              </p>
            </div>

            <button
              onClick={generateRoadmap}
              disabled={loading}
              className="w-fit rounded-xl bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Generating..." : "Generate New Roadmap →"}
            </button>
          </div>
        </section>

        {/* MESSAGE */}
        {message && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-5 text-sm text-red-400">
            {message}
          </div>
        )}

        {/* EMPTY STATE */}
        {roadmap.length === 0 && !message && (
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 text-2xl">
                ✦
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Build your roadmap
              </h2>

              <p className="mx-auto mt-3 max-w-md text-gray-500">
                Generate a personalized learning plan from your latest
                job analysis and start closing your skill gaps.
              </p>

              <button
                onClick={generateRoadmap}
                disabled={loading}
                className="mt-7 rounded-xl bg-green-500 px-6 py-3 font-semibold text-black hover:bg-green-400 disabled:opacity-40"
              >
                {loading ? "Generating..." : "Generate Roadmap →"}
              </button>
            </div>
          </div>
        )}

        {roadmap.length > 0 && (
          <>
            {/* PROGRESS */}
            <section className="relative mt-10 overflow-hidden rounded-3xl border border-green-500/20 bg-green-500/[0.04] p-7">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />

              <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-medium tracking-wider text-gray-500">
                    ROADMAP PROGRESS
                  </p>

                  <div className="mt-2 flex items-end gap-3">
                    <p className="text-5xl font-bold text-green-400">
                      {progress}%
                    </p>

                    <p className="pb-1 text-sm text-gray-500">
                      complete
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <span className="text-white">
                    {completedCount}
                  </span>{" "}
                  of {roadmap.length} steps completed
                </div>
              </div>

              <div className="relative mt-7 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {progress === 100 && (
                <p className="relative mt-4 text-sm font-medium text-green-400">
                  ✓ Roadmap completed. Keep building.
                </p>
              )}
            </section>

            {/* ROADMAP STEPS */}
            <section className="mt-10">
              <div className="mb-6">
                <p className="text-xs font-medium tracking-wider text-gray-500">
                  YOUR PLAN
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Skills to build
                </h2>
              </div>

              <div className="space-y-5">
                {roadmap.map((item, index) => {
                  const isComplete = completed[index];

                  return (
                    <article
                      key={index}
                      className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 sm:p-7 ${
                        isComplete
                          ? "border-green-500/20 bg-green-500/[0.03]"
                          : "border-white/10 bg-white/[0.03] hover:border-green-500/20"
                      }`}
                    >
                      {/* Connector */}
                      {index < roadmap.length - 1 && (
                        <div className="absolute bottom-[-21px] left-[35px] z-10 hidden h-5 w-px bg-white/10 sm:block" />
                      )}

                      <div className="flex gap-5">

                        {/* CHECKBOX */}
                        <button
                          onClick={() => toggleComplete(index)}
                          aria-label={`Mark ${item.skill} as ${
                            isComplete ? "incomplete" : "complete"
                          }`}
                          className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition ${
                            isComplete
                              ? "border-green-500 bg-green-500 text-black"
                              : "border-white/20 bg-black text-transparent hover:border-green-500"
                          }`}
                        >
                          ✓
                        </button>

                        <div className="min-w-0 flex-1">

                          {/* TITLE */}
                          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                            <div>
                              <p className="text-xs font-medium tracking-wider text-gray-600">
                                STEP {String(index + 1).padStart(2, "0")}
                              </p>

                              <h2
                                className={`mt-1 text-2xl font-bold ${
                                  isComplete
                                    ? "text-gray-500 line-through"
                                    : ""
                                }`}
                              >
                                {item.skill}
                              </h2>
                            </div>

                            <span
                              className={`w-fit rounded-full px-3 py-1.5 text-xs font-medium ${
                                item.priority.toLowerCase() === "high"
                                  ? "bg-red-500/10 text-red-400"
                                  : item.priority.toLowerCase() === "medium"
                                  ? "bg-yellow-500/10 text-yellow-400"
                                  : "bg-green-500/10 text-green-400"
                              }`}
                            >
                              {item.priority} priority
                            </span>
                          </div>

                          {/* WHY */}
                          <div className="mt-6">
                            <p className="text-xs font-medium tracking-wider text-gray-600">
                              WHY IT MATTERS
                            </p>

                            <p className="mt-2 max-w-3xl leading-7 text-gray-400">
                              {item.why}
                            </p>
                          </div>

                          {/* TOPICS */}
                          <div className="mt-7">
                            <p className="text-xs font-medium tracking-wider text-gray-600">
                              WHAT TO LEARN
                            </p>

                            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                              {item.topics.map(
                                (topic, topicIndex) => (
                                  <div
                                    key={topicIndex}
                                    className="rounded-xl border border-white/5 bg-black/30 px-4 py-3 text-sm text-gray-400"
                                  >
                                    <span className="mr-2 text-green-500">
                                      →
                                    </span>
                                    {topic}
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* PROJECT */}
                          <div className="mt-7 rounded-2xl border border-green-500/10 bg-green-500/[0.03] p-5">
                            <p className="text-xs font-medium tracking-wider text-green-500">
                              PRACTICAL PROJECT
                            </p>

                            <p className="mt-2 font-medium leading-6 text-gray-200">
                              {item.project}
                            </p>
                          </div>

                          {/* FOOTER */}
                          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span>
                              ⏱{" "}
                              <span className="text-gray-300">
                                {item.estimated_weeks} week
                                {item.estimated_weeks !== 1
                                  ? "s"
                                  : ""}
                              </span>
                            </span>

                            {isComplete && (
                              <span className="text-green-400">
                                ✓ Completed
                              </span>
                            )}
                          </div>

                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        )}

        <div className="h-10" />
      </div>
    </main>
  );
}