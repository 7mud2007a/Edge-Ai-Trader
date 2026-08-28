"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import LanguageSwitcher from "../components/LanguageSwitcher";

const markets = [
  { name: "Gold", symbol: "OANDA:XAUUSD", label: "XAU / USD" },
  { name: "EUR / USD", symbol: "OANDA:EURUSD", label: "EUR / USD" },
  { name: "GBP / USD", symbol: "OANDA:GBPUSD", label: "GBP / USD" },
  { name: "USD / JPY", symbol: "OANDA:USDJPY", label: "USD / JPY" },
];

const timeframes = [
  { label: "1M", value: "1" },
  { label: "5M", value: "5" },
  { label: "15M", value: "15" },
  { label: "1H", value: "60" },
  { label: "4H", value: "240" },
  { label: "1D", value: "D" },
];

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [market, setMarket] = useState(markets[0]);
  const [timeframe, setTimeframe] = useState("60");
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setEmail(data.user.email ?? "");
      setLoading(false);
    }

    loadUser();

    const saved = localStorage.getItem("edge-language") || "en";
    setLanguage(saved);

    document.documentElement.lang = saved;
    document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";

    const updateLanguage = () => {
      const lang = localStorage.getItem("edge-language") || "en";
      setLanguage(lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    };

    window.addEventListener("language-change", updateLanguage);

    return () =>
      window.removeEventListener("language-change", updateLanguage);
  }, []);

  const chartUrl =
    `https://www.tradingview.com/widgetembed/?` +
    `symbol=${encodeURIComponent(market.symbol)}` +
    `&interval=${timeframe}` +
    `&hidesidetoolbar=1` +
    `&symboledit=1` +
    `&saveimage=0` +
    `&toolbarbg=%2305070d` +
    `&theme=dark` +
    `&style=1` +
    `&timezone=Etc%2FUTC` +
    `&withdateranges=1` +
    `&hideideas=1`;

  const translations: Record<string, any> = {
    en: {
      overview: "Overview",
      analysis: "AI Analysis",
      signals: "Market Signals",
      markets: "Markets",
      command: "Market Command Center",
      description: "Real-time market visualization and multi-timeframe analysis.",
      live: "LIVE MARKET",
      chart: "MARKET CHART",
      analyzing: "ANALYZING",
      strength: "Multi-Timeframe Strength",
      engine: "AI SIGNAL ENGINE",
      ready: "Ready to analyze",
      start: "Start AI Analysis",
      logout: "Logout",
      news: "MARKET NEWS",
      newsText: "Latest trusted news for the selected market will appear here.",
    },
    ar: {
      overview: "نظرة عامة",
      analysis: "تحليل الذكاء الاصطناعي",
      signals: "إشارات السوق",
      markets: "الأسواق",
      command: "مركز قيادة السوق",
      description: "عرض مباشر للسوق وتحليل متعدد الفريمات.",
      live: "السوق مباشر",
      chart: "شارت السوق",
      analyzing: "جاري التحليل",
      strength: "قوة متعددة الفريمات",
      engine: "محرك إشارات الذكاء الاصطناعي",
      ready: "جاهز لتحليل",
      start: "بدء تحليل AI",
      logout: "تسجيل الخروج",
      news: "أخبار السوق",
      newsText: "ستظهر هنا آخر الأخبار الموثوقة الخاصة بالسوق المختار.",
    },
    tr: {
      overview: "Genel Bakış",
      analysis: "AI Analizi",
      signals: "Piyasa Sinyalleri",
      markets: "Piyasalar",
      command: "Piyasa Komuta Merkezi",
      description: "Gerçek zamanlı piyasa görünümü ve çoklu zaman dilimi analizi.",
      live: "CANLI PİYASA",
      chart: "PİYASA GRAFİĞİ",
      analyzing: "ANALİZ EDİLİYOR",
      strength: "Çoklu Zaman Dilimi Gücü",
      engine: "AI SİNYAL MOTORU",
      ready: "Analize hazır",
      start: "AI Analizini Başlat",
      logout: "Çıkış",
      news: "PİYASA HABERLERİ",
      newsText: "Seçilen piyasa için güvenilir güncel haberler burada görünecek.",
    },
  };

  const t = translations[language] || translations.en;

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-orb">AI</div>
        <p>Loading EDGE AI TRADER...</p>
      </div>
    );
  }

  return (
    <main className="dashboard">
      <div className="dashboard-background">
        {Array.from({ length: 38 }).map((_, i) => (
          <div
            key={i}
            className={`bg-candle ${
              i % 3 === 0 ? "bearish" : "bullish"
            }`}
            style={{
              left: `${i * 2.7}%`,
              animationDelay: `${(i % 12) * 0.35}s`,
            }}
          >
            <span className="candle-wick" />
            <span className="candle-body" />
          </div>
        ))}

        <div className="background-grid" />
        <div className="background-glow glow-one" />
        <div className="background-glow glow-two" />
      </div>

      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          EDGE <span>AI</span> TRADER
        </div>

        <div className="sidebar-status">
          <span />
          MARKET ENGINE ONLINE
        </div>

        <div className="sidebar-section">
          <p className="sidebar-title">WORKSPACE</p>

          <a className="sidebar-link active" href="/dashboard">
            <span>⌂</span>
            {t.overview}
          </a>

          <a className="sidebar-link" href="#chart">
            <span>◈</span>
            {t.analysis}
          </a>

          <a className="sidebar-link" href="#signals">
            <span>↗</span>
            {t.signals}
          </a>

          <a className="sidebar-link" href="#markets">
            <span>▣</span>
            {t.markets}
          </a>
        </div>

        <div className="sidebar-bottom">
          <div className="account-mini">
            <div className="account-avatar">
              {email.charAt(0).toUpperCase()}
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
            {t.logout}
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">
              AI FOREX INTELLIGENCE
            </p>

            <h1>{t.command}</h1>

            <p className="dashboard-description">
              {t.description}
            </p>
          </div>

          <div className="status-badge">
            <span />
            {t.live}
          </div>

          <LanguageSwitcher />
        </header>

        <section className="market-selector" id="markets">
          {markets.map((item) => (
            <button
              key={item.symbol}
              className={`market-selector-card ${
                market.symbol === item.symbol ? "selected" : ""
              }`}
              onClick={() => setMarket(item)}
            >
              <div className="market-selector-top">
                <span>{item.name}</span>
                <span className="market-dot" />
              </div>

              <strong>{item.label}</strong>
              <small>Live chart</small>
            </button>
          ))}
        </section>

        <section className="chart-panel" id="chart">
          <div className="chart-header">
            <div>
              <p className="panel-kicker">{t.chart}</p>
              <h2>{market.name}</h2>

              <span className="chart-subtitle">
                {market.label} · Candlestick
              </span>
            </div>

            <div className="timeframes">
              {timeframes.map((frame) => (
                <button
                  key={frame.value}
                  className={
                    timeframe === frame.value
                      ? "timeframe active"
                      : "timeframe"
                  }
                  onClick={() => setTimeframe(frame.value)}
                >
                  {frame.label}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-container">
            <iframe
              key={`${market.symbol}-${timeframe}`}
              src={chartUrl}
              title={`${market.name} live chart`}
              className="trading-chart"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </section>

        <section className="analysis-panel" id="signals">
          <div className="analysis-header">
            <div>
              <p className="panel-kicker">{t.engine}</p>
              <h2>{t.strength}</h2>
            </div>

            <div className="analysis-live">
              <span />
              {t.analyzing}
            </div>
          </div>

          <div className="signal-grid">
            <Signal timeframe="1M" value={54} type="BUY" />
            <Signal timeframe="5M" value={67} type="BUY" />
            <Signal timeframe="15M" value={73} type="BUY" />
            <Signal timeframe="1H" value={81} type="STRONG BUY" />
            <Signal timeframe="4H" value={62} type="BUY" />
            <Signal timeframe="1D" value={48} type="WAIT" />
          </div>
        </section>

        <section className="analysis-panel">
          <div className="analysis-header">
            <div>
              <p className="panel-kicker">{t.news}</p>
              <h2>{market.name}</h2>
            </div>
          </div>

          <p className="dashboard-description">
            {t.newsText}
          </p>
        </section>

        <section className="ai-command">
          <div className="ai-command-icon">✦</div>

          <div className="ai-command-text">
            <p className="panel-kicker">EDGE AI ENGINE</p>

            <h2>
              {t.ready} {market.name}
            </h2>

            <p>
              Combine multiple timeframes and technical signals into one
              structured market view.
            </p>
          </div>

          <button
            className="start-analysis"
            onClick={() => {
              alert(
                "AI Analysis interface is ready. Live signal calculations will be connected next."
              );
            }}
          >
            <span>✦</span>
            {t.start}
          </button>
        </section>

        <footer className="dashboard-footer">
          <span>EDGE AI TRADER</span>
          <span>© 2026 · AI Market Intelligence</span>
        </footer>
      </section>
    </main>
  );
}

function Signal({
  timeframe,
  value,
  type,
}: {
  timeframe: string;
  value: number;
  type: string;
}) {
  const isSell = type.includes("SELL");
  const isWait = type === "WAIT";

  return (
    <div className="signal-card">
      <div className="signal-card-top">
        <span>{timeframe}</span>
        <span className="signal-percent">{value}%</span>
      </div>

      <div className="strength-bar">
        <div
          className={
            isSell
              ? "strength-fill sell"
              : isWait
              ? "strength-fill wait"
              : "strength-fill buy"
          }
          style={{ width: `${value}%` }}
        />
      </div>

      <div
        className={
          isSell
            ? "signal-result sell-text"
            : isWait
            ? "signal-result wait-text"
            : "signal-result buy-text"
        }
      >
        {type}
      </div>

      <small>Multi-factor signal</small>
    </div>
  );
}
