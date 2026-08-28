"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import LanguageSwitcher from "../components/LanguageSwitcher";

type Market = {
  name: string;
  symbol: string;
  apiSymbol: string;
  label: string;
};

type Candle = {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
};

type Analysis = {
  signal: "BUY" | "SELL" | "WAIT";
  strength: number;
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  tp3: number;
  riskReward: string;
  trend: string;
};

const markets: Market[] = [
  {
    name: "Gold",
    symbol: "OANDA:XAUUSD",
    apiSymbol: "XAU/USD",
    label: "XAU / USD",
  },
  {
    name: "EUR / USD",
    symbol: "OANDA:EURUSD",
    apiSymbol: "EUR/USD",
    label: "EUR / USD",
  },
  {
    name: "GBP / USD",
    symbol: "OANDA:GBPUSD",
    apiSymbol: "GBP/USD",
    label: "GBP / USD",
  },
  {
    name: "USD / JPY",
    symbol: "OANDA:USDJPY",
    apiSymbol: "USD/JPY",
    label: "USD / JPY",
  },
];

const timeframes = [
  { label: "1M", value: "1", api: "1min" },
  { label: "5M", value: "5", api: "5min" },
  { label: "15M", value: "15", api: "15min" },
  { label: "1H", value: "60", api: "1h" },
  { label: "4H", value: "240", api: "4h" },
  { label: "1D", value: "D", api: "1day" },
];

const translations: Record<string, any> = {
  en: {
    overview: "Overview",
    analysis: "AI Analysis",
    signals: "Market Signals",
    markets: "Markets",
    command: "Market Command Center",
    description:
      "Real-time market visualization and multi-timeframe analysis.",
    live: "LIVE MARKET",
    chart: "MARKET CHART",
    analyzing: "ANALYZING",
    strength: "Live Market Strength",
    engine: "MARKET SIGNAL ENGINE",
    ready: "Ready to analyze",
    start: "Refresh Analysis",
    logout: "Logout",
    news: "MARKET NEWS",
    newsText:
      "Economic news integration will appear here after the market feed is connected.",
    entry: "ENTRY",
    stop: "STOP LOSS",
    tp1: "TAKE PROFIT 1",
    tp2: "TAKE PROFIT 2",
    tp3: "TAKE PROFIT 3",
    rr: "RISK / REWARD",
    trend: "TREND",
    loading: "Analyzing live market data...",
    error: "Unable to load live market data.",
    noData: "No market data available.",
    refresh: "Refresh",
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
    strength: "قوة السوق الحقيقية",
    engine: "محرك إشارات السوق",
    ready: "جاهز لتحليل",
    start: "تحديث التحليل",
    logout: "تسجيل الخروج",
    news: "أخبار السوق",
    newsText:
      "سيتم عرض الأخبار الاقتصادية هنا بعد ربط مصدر الأخبار.",
    entry: "دخول",
    stop: "وقف الخسارة",
    tp1: "الهدف 1",
    tp2: "الهدف 2",
    tp3: "الهدف 3",
    rr: "المخاطرة / العائد",
    trend: "الاتجاه",
    loading: "جاري تحليل بيانات السوق الحقيقية...",
    error: "تعذر تحميل بيانات السوق.",
    noData: "لا توجد بيانات سوق متاحة.",
    refresh: "تحديث",
  },

  tr: {
    overview: "Genel Bakış",
    analysis: "AI Analizi",
    signals: "Piyasa Sinyalleri",
    markets: "Piyasalar",
    command: "Piyasa Komuta Merkezi",
    description:
      "Gerçek zamanlı piyasa görünümü ve çoklu zaman dilimi analizi.",
    live: "CANLI PİYASA",
    chart: "PİYASA GRAFİĞİ",
    analyzing: "ANALİZ EDİLİYOR",
    strength: "Canlı Piyasa Gücü",
    engine: "PİYASA SİNYAL MOTORU",
    ready: "Analize hazır",
    start: "Analizi Yenile",
    logout: "Çıkış",
    news: "PİYASA HABERLERİ",
    newsText:
      "Ekonomik haber entegrasyonu piyasa haber akışı bağlandıktan sonra burada görünecek.",
    entry: "GİRİŞ",
    stop: "STOP LOSS",
    tp1: "TAKE PROFIT 1",
    tp2: "TAKE PROFIT 2",
    tp3: "TAKE PROFIT 3",
    rr: "RİSK / ÖDÜL",
    trend: "TREND",
    loading: "Canlı piyasa verileri analiz ediliyor...",
    error: "Canlı piyasa verileri yüklenemedi.",
    noData: "Piyasa verisi bulunamadı.",
    refresh: "Yenile",
  },
};

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [market, setMarket] = useState(markets[0]);
  const [timeframe, setTimeframe] = useState("60");
  const [language, setLanguage] = useState("en");

  const [candles, setCandles] = useState<Candle[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [error, setError] = useState("");

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

    return () => {
      window.removeEventListener("language-change", updateLanguage);
    };
  }, []);

  const t = translations[language] || translations.en;

  const currentTimeframe = useMemo(() => {
    return (
      timeframes.find((item) => item.value === timeframe) ||
      timeframes.find((item) => item.value === "60")!
    );
  }, [timeframe]);

  async function loadMarketData() {
    try {
      setAnalysisLoading(true);
      setError("");

      const response = await fetch(
        `/api/market?symbol=${encodeURIComponent(
          market.apiSymbol
        )}&interval=${encodeURIComponent(currentTimeframe.api)}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Market API error");
      }

      const values: Candle[] = Array.isArray(data.values)
        ? data.values
        : [];

      if (!values.length) {
        throw new Error("No market data");
      }

      const ordered = [...values].reverse();

      setCandles(ordered);
      setAnalysis(calculateAnalysis(ordered));
    } catch (err) {
      console.error(err);
      setError(t.error);
      setAnalysis(null);
    } finally {
      setAnalysisLoading(false);
    }
  }

  useEffect(() => {
    if (!loading) {
      loadMarketData();
    }
  }, [loading, market.apiSymbol, currentTimeframe.api]);

  useEffect(() => {
    if (loading) return;

    const interval = window.setInterval(() => {
      loadMarketData();
    }, 30000);

    return () => window.clearInterval(interval);
  }, [loading, market.apiSymbol, currentTimeframe.api]);

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
              {analysisLoading ? t.analyzing : "LIVE"}
            </div>
          </div>

          {analysisLoading && !analysis ? (
            <div className="dashboard-description">
              {t.loading}
            </div>
          ) : error ? (
            <div className="dashboard-description">
              {error}
            </div>
          ) : analysis ? (
            <>
              <div className="signal-grid">
                <Signal
                  timeframe={currentTimeframe.label}
                  value={analysis.strength}
                  type={analysis.signal}
                />

                <Signal
                  timeframe="TREND"
                  value={analysis.strength}
                  type={analysis.trend}
                />

                <Signal
                  timeframe="DATA"
                  value={Math.min(candles.length, 100)}
                  type={`${candles.length} CANDLES`}
                />
              </div>

              <div className="trade-levels">
                <TradeLevel
                  title={t.entry}
                  value={formatPrice(analysis.entry, market.apiSymbol)}
                />

                <TradeLevel
                  title={t.stop}
                  value={formatPrice(analysis.sl, market.apiSymbol)}
                />

                <TradeLevel
                  title={t.tp1}
                  value={formatPrice(analysis.tp1, market.apiSymbol)}
                />

                <TradeLevel
                  title={t.tp2}
                  value={formatPrice(analysis.tp2, market.apiSymbol)}
                />

                <TradeLevel
                  title={t.tp3}
                  value={formatPrice(analysis.tp3, market.apiSymbol)}
                />

                <TradeLevel
                  title={t.rr}
                  value={analysis.riskReward}
                />
              </div>
            </>
          ) : (
            <div className="dashboard-description">
              {t.noData}
            </div>
          )}

          <button
            className="start-analysis"
            onClick={loadMarketData}
            disabled={analysisLoading}
          >
            <span>✦</span>
            {analysisLoading ? t.analyzing : t.refresh}
          </button>
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
              Live candles are being processed into a technical market view.
            </p>
          </div>

          <button
            className="start-analysis"
            onClick={loadMarketData}
            disabled={analysisLoading}
          >
            <span>✦</span>
            {analysisLoading ? t.analyzing : t.start}
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
  const isSell = type.includes("SELL") || type === "BEARISH";
  const isWait = type === "WAIT" || type === "NEUTRAL";

  return (
    <div className="signal-card">
      <div className="signal-card-top">
        <span>{timeframe}</span>

        <span className="signal-percent">
          {Math.round(value)}%
        </span>
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
          style={{ width: `${Math.max(5, Math.min(value, 100))}%` }}
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

      <small>Live market calculation</small>
    </div>
  );
}

function TradeLevel({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="trade-level-card">
      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
}

function calculateAnalysis(candles: Candle[]): Analysis {
  const data = candles
    .map((c) => ({
      open: Number(c.open),
      high: Number(c.high),
      low: Number(c.low),
      close: Number(c.close),
    }))
    .filter(
      (c) =>
        Number.isFinite(c.open) &&
        Number.isFinite(c.high) &&
        Number.isFinite(c.low) &&
        Number.isFinite(c.close)
    );

  if (data.length < 20) {
    throw new Error("Not enough candles");
  }

  const closes = data.map((c) => c.close);

  const current = data[data.length - 1];
  const previous = data[data.length - 2];

  const ema20 = calculateEMA(closes, 20);
  const ema50 = calculateEMA(closes, Math.min(50, closes.length));

  const rsi = calculateRSI(closes, 14);
  const atr = calculateATR(data, 14);

  const recent = data.slice(-20);

  const recentHigh = Math.max(...recent.map((c) => c.high));
  const recentLow = Math.min(...recent.map((c) => c.low));

  const bullishStructure =
    current.close > ema20 &&
    ema20 > ema50 &&
    current.close > previous.close;

  const bearishStructure =
    current.close < ema20 &&
    ema20 < ema50 &&
    current.close < previous.close;

  let score = 50;

  if (bullishStructure) score += 25;
  if (bearishStructure) score -= 25;

  if (rsi > 55 && rsi < 70) score += 15;
  if (rsi < 45 && rsi > 30) score -= 15;

  if (current.close > recentHigh * 0.9995) score += 8;
  if (current.close < recentLow * 1.0005) score -= 8;

  score = Math.max(5, Math.min(95, score));

  let signal: "BUY" | "SELL" | "WAIT" = "WAIT";

  if (score >= 62) signal = "BUY";
  if (score <= 38) signal = "SELL";

  const entry = current.close;

  const riskDistance = Math.max(
    atr * 1.25,
    Math.abs(recentHigh - recentLow) * 0.12
  );

  let sl: number;
  let tp1: number;
  let tp2: number;
  let tp3: number;

  if (signal === "SELL") {
    sl = entry + riskDistance;
    tp1 = entry - riskDistance * 1.5;
    tp2 = entry - riskDistance * 2;
    tp3 = entry - riskDistance * 3;
  } else {
    sl = entry - riskDistance;
    tp1 = entry + riskDistance * 1.5;
    tp2 = entry + riskDistance * 2;
    tp3 = entry + riskDistance * 3;
  }

  const reward = Math.abs(tp2 - entry);
  const risk = Math.abs(entry - sl);

  const rr = risk > 0 ? `1:${(reward / risk).toFixed(2)}` : "—";

  return {
    signal,
    strength: Math.round(score),
    entry,
    sl,
    tp1,
    tp2,
    tp3,
    riskReward: rr,
    trend:
      bullishStructure
        ? "BULLISH"
        : bearishStructure
        ? "BEARISH"
        : "NEUTRAL",
  };
}

function calculateEMA(values: number[], period: number) {
  const multiplier = 2 / (period + 1);

  let ema = values[0];

  for (let i = 1; i < values.length; i++) {
    ema = (values[i] - ema) * multiplier + ema;
  }

  return ema;
}

function calculateRSI(values: number[], period: number) {
  if (values.length <= period) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = values[i] - values[i - 1];

    if (change >= 0) {
      gains += change;
    } else {
      losses += Math.abs(change);
    }
  }

  let averageGain = gains / period;
  let averageLoss = losses / period;

  for (let i = period + 1; i < values.length; i++) {
    const change = values[i] - values[i - 1];

    const gain = Math.max(change, 0);
    const loss = Math.max(-change, 0);

    averageGain =
      (averageGain * (period - 1) + gain) / period;

    averageLoss =
      (averageLoss * (period - 1) + loss) / period;
  }

  if (averageLoss === 0) return 100;

  const rs = averageGain / averageLoss;

  return 100 - 100 / (1 + rs);
}

function calculateATR(
  data: {
    high: number;
    low: number;
    close: number;
  }[],
  period: number
) {
  const trueRanges: number[] = [];

  for (let i = 1; i < data.length; i++) {
    const current = data[i];
    const previous = data[i - 1];

    const tr = Math.max(
      current.high - current.low,
      Math.abs(current.high - previous.close),
      Math.abs(current.low - previous.close)
    );

    trueRanges.push(tr);
  }

  if (!trueRanges.length) return 0;

  const recent = trueRanges.slice(-period);

  return (
    recent.reduce((sum, value) => sum + value, 0) /
    recent.length
  );
}

function formatPrice(value: number, symbol: string) {
  if (symbol.includes("JPY")) {
    return value.toFixed(3);
  }

  if (symbol.includes("XAU")) {
    return value.toFixed(2);
  }

  return value.toFixed(5);
}
