"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          EDGE <span>AI</span> TRADER
        </div>

        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your trading workspace.</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="auth-bottom">
          Don't have an account?{" "}
          <Link href="/signup">Create one</Link>
        </p>

        <Link href="/" className="back-home">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
