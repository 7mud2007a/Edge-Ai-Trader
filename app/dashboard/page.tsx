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
    <>
      <div className="dashboard-candles">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="bg-candle"
            style={{
              left: `${i * 3.3}%`,
              animationDelay: `${(i % 8) * 0.45}s`,
            }}
          >
            <span className="candle-wick"></span>
            <span className="candle-body"></span>
          </div>
        ))}
      </div>

      <main className="dashboard">
        <aside className="dashboard-sidebar">
          <div className="dashboard-logo">
            EDGE <span>AI</span> TRADER
          </div>

          <div className="sidebar-section">
            <p className="sidebar-title">WORKSPACE</p>

            <a className="sidebar-link active" href="/dashboard">
              <span>⌂</span>
              Overview
            </a>

            <a className="sidebar-link" href="#">
              <span>◈</span>
              AI Analysis
            </a>

            <a className="sidebar-link" href="#">
              <span>↗</span>
              Market Signals
            </a>

            <a className="sidebar-link" href="#">
              <span>▣</span>
              Watchlist
            </a>
          </div>

          <div className="sidebar-bottom">
            <div className="account-mini">
              <div className="account-avatar">
                {email ? email.charAt(0).toUpperCase() : "U"}
              </div>

              <div className="account-info">
                <strong>Account</strong>
                <span>{email}</span>
              </div>
            </div>

            <button
              className="logout-button"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </aside>

        <section className="dashboard-main">
          <header className="dashboard-header">
            <div>
              <p className="dashboard-eyebrow">
                AI FOREX INTELLIGENCE
              </p>

              <h1>Dashboard</h1>

              <p className="dashboard-description">
                Welcome back. Your intelligent trading workspace is ready.
              </p>
            </div>

            <div className="status-badge">
              <span></span>
              SYSTEM ONLINE
            </div>
          </header>

          <div className="market-grid">
            <div className="market-card">
              <div className="market-card-top">
                <span>EUR / USD</span>
                <span className="market-positive">+0.42%</span>
              </div>

              <div className="market-price">1.1748</div>

              <div className="market-label">
                Euro / US Dollar
              </div>
            </div>

            <div className="market-card">
              <div className="market-card-top">
                <span>GBP / USD</span>
                <span className="market-positive">+0.28%</span>
              </div>

              <div className="market-price">1.3512</div>

              <div className="market-label">
                British Pound / US Dollar
              </div>
            </div>

            <div className="market-card">
              <div className="market-card-top">
                <span>USD / JPY</span>
                <span className="market-negative">-0.16%</span>
              </div>

              <div className="market-price">147.82</div>

              <div className="market-label">
                US Dollar / Japanese Yen
              </div>
            </div>
          </div>

          <div className="dashboard-content-grid">
            <div className="panel ai-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">INTELLIGENCE</p>
                  <h2>AI Market Analysis</h2>
                </div>

                <div className="ai-indicator">AI</div>
              </div>

              <div className="ai-empty">
                <div className="ai-icon">✦</div>

                <h3>Ready to analyze the market</h3>

                <p>
                  Get intelligent market analysis, technical insights
                  and structured trading scenarios.
                </p>

                <button className="primary-action">
                  Start AI Analysis
                </button>
              </div>
            </div>

            <div className="panel signals-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">MARKET</p>
                  <h2>Trading Signals</h2>
                </div>

                <span className="live-label">LIVE</span>
              </div>

              <div className="signal-row">
                <div>
                  <strong>EUR/USD</strong>
                  <span>Market Watch</span>
                </div>

                <b className="neutral">WAIT</b>
              </div>

              <div className="signal-row">
                <div>
                  <strong>GBP/USD</strong>
                  <span>Market Watch</span>
                </div>

                <b className="positive">BUY</b>
              </div>

              <div className="signal-row">
                <div>
                  <strong>USD/JPY</strong>
                  <span>Market Watch</span>
                </div>

                <b className="negative">SELL</b>
              </div>
            </div>
          </div>

          <div className="dashboard-footer">
            <span>EDGE AI TRADER</span>
            <span>© 2026 All rights reserved.</span>
          </div>
        </section>
      </main>
    </>
  );
          }
