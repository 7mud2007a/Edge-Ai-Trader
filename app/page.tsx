import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <nav className="navbar">
        <div className="logo">
          EDGE <span>AI</span> TRADER
        </div>

        <div className="nav-buttons">
          <Link href="/login" className="btn btn-outline">
            Login
          </Link>

          <Link href="/signup" className="btn btn-primary">
            Get Access
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="badge">AI-POWERED FOREX INTELLIGENCE</div>

        <h1>
          Trade Smarter.
          <br />
          <span>Think With AI.</span>
        </h1>

        <p>
          EDGE AI Trader gives traders an intelligent workspace for market
          analysis, signals and trading decisions.
        </p>

        <div className="hero-buttons">
          <Link href="/signup" className="btn btn-primary btn-large">
            Get Started
          </Link>

          <Link href="/login" className="btn btn-outline btn-large">
            Login to Dashboard
          </Link>
        </div>
      </section>

      <section className="features">
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

      <footer>
        © 2026 EDGE AI Trader. All rights reserved.
      </footer>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="feature">
      <div className="feature-icon">✦</div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
