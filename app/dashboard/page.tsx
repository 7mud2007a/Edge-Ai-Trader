"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setEmail(data.user.email ?? "");
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <nav className="border-b border-white/10 bg-[#080b12]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold tracking-[0.2em]">
              EDGE AI TRADER
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              AI-Powered Forex Intelligence
            </p>
          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-2 text-sm text-gray-500">Welcome back</p>
          <h2 className="text-3xl font-bold tracking-tight">
            {email}
          </h2>
          <p className="mt-3 text-gray-400">
            Your AI Forex intelligence workspace.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0b0f18] p-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-xl">
              AI
            </div>
            <h3 className="text-lg font-semibold">AI Market Analysis</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Analyze market conditions with your intelligent trading
              assistant.
            </p>
            <button className="mt-6 w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
              Start Analysis
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0f18] p-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-xl">
              FX
            </div>
            <h3 className="text-lg font-semibold">Trading Intelligence</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Organize your market research, setups and trading decisions
              in one place.
            </p>
            <button className="mt-6 w-full rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/10">
              Open Workspace
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0f18] p-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-xl">
              PRO
            </div>
            <h3 className="text-lg font-semibold">Private Access</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Your account is active. Subscription status can be managed
              from your private workspace.
            </p>
            <div className="mt-6 rounded-lg border border-white/10 px-4 py-3 text-center text-sm text-gray-400">
              Account Active
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-xs text-gray-600">
        © 2026 EDGE AI TRADER. All rights reserved.
      </footer>
    </main>
  );
}
