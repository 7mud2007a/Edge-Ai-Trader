import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5 lg:px-16">
        <div className="text-xl font-bold tracking-wider">
          EDGE <span className="text-cyan-400">AI</span> TRADER
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-white/15 px-5 py-2 text-sm hover:bg-white/5"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-cyan-400 px-5 py-2 text-sm font-semibold text-black hover:bg-cyan-300"
          >
            Get Access
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-24 text-center lg:py-32">
        <div className="mb-6 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
          AI-Powered Forex Intelligence
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight lg:text-7xl">
          Trade Smarter.
          <br />
          <span className="text-cyan-400">Think With AI.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-400">
          EDGE AI Trader gives traders an intelligent workspace for market
          analysis, signals and trading decisions.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-cyan-400 px-8 py-4 font-bold text-black transition hover:bg-cyan-300"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-white/15 px-8 py-4 font-semibold transition hover:bg-white/5"
          >
            Login to Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-24 md:grid-cols-3">
        <Feature
          title="AI Analysis"
          text="Analyze market conditions with an intelligent trading assistant."
        />

        <Feature
          title="Trading Intelligence"
          text="Organize your market research and trading decisions in one place."
        />

        <Feature
          title="Private Access"
          text="Accounts are activated manually after your subscription is confirmed."
        />
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        © 2026 EDGE AI Trader. All rights reserved.
      </footer>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      <p className="leading-7 text-gray-400">{text}</p>
    </div>
  );
      }
