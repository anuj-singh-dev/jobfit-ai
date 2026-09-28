"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Analyze Job", href: "/job-analysis" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Job History", href: "/job-history" },
  { name: "Upload Resume", href: "/upload" },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const supabase = createClient();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/auth");
    router.refresh();
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r border-white/10 bg-black p-6 md:flex md:flex-col">

        <div>
          <p className="text-lg font-bold">
            JOB<span className="text-green-500">FIT</span> AI
          </p>

          <p className="mt-1 text-xs text-gray-600">
            Career intelligence
          </p>
        </div>

        <nav className="mt-10 flex-1 space-y-2">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-xl px-4 py-3 text-sm transition ${
                  active
                    ? "bg-green-500/10 text-green-400"
                    : "text-gray-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={logout}
          className="rounded-xl px-4 py-3 text-left text-sm text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          Logout
        </button>
      </aside>

      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/90 px-5 py-4 backdrop-blur md:hidden">

        <p className="font-bold">
          JOB<span className="text-green-500">FIT</span> AI
        </p>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-white/10 px-3 py-2 text-gray-300"
        >
          {open ? "✕" : "☰"}
        </button>

      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-x-0 top-[65px] z-40 border-b border-white/10 bg-black p-5 md:hidden">

          <nav className="space-y-2">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 ${
                    active
                      ? "bg-green-500/10 text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={logout}
            className="mt-4 w-full rounded-xl px-4 py-3 text-left text-red-400"
          >
            Logout
          </button>

        </div>
      )}
    </>
  );
}