"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const translations = {
  en: {
    login: "Login",
    access: "Get Access",
    badge: "AI-POWERED FOREX INTELLIGENCE",
    title1: "Trade Smarter.",
    title2: "Think With AI.",
    desc: "EDGE AI Trader gives traders an intelligent workspace for market analysis, signals and trading decisions.",
    start: "Get Started",
    dashboard: "Login to Dashboard",
    features: [
      ["AI Analysis", "Analyze market conditions with an intelligent trading assistant."],
      ["Trading Intelligence", "Organize your market research and trading decisions in one place."],
      ["Private Access", "Accounts are activated manually after your subscription is confirmed."],
    ],
    footer: "© 2026 EDGE AI Trader. All rights reserved.",
  },

  ar: {
    login: "تسجيل الدخول",
    access: "إنشاء حساب",
    badge: "ذكاء فوركس مدعوم بالذكاء الاصطناعي",
    title1: "تداول بذكاء.",
    title2: "فكّر مع الذكاء الاصطناعي.",
    desc: "EDGE AI Trader يمنح المتداولين مساحة ذكية لتحليل الأسواق والإشارات واتخاذ قرارات التداول.",
    start: "ابدأ الآن",
    dashboard: "الدخول إلى لوحة التحكم",
    features: [
      ["تحليل بالذكاء الاصطناعي", "حلّل ظروف السوق باستخدام مساعد تداول ذكي."],
      ["ذكاء التداول", "نظّم أبحاث السوق وقرارات التداول في مكان واحد."],
      ["وصول خاص", "يتم تفعيل الحسابات يدوياً بعد تأكيد الاشتراك."],
    ],
    footer: "© 2026 EDGE AI Trader. جميع الحقوق محفوظة.",
  },

  tr: {
    login: "Giriş Yap",
    access: "Erişim Al",
    badge: "YAPAY ZEKA DESTEKLİ FOREX",
    title1: "Daha Akıllı İşlem.",
    title2: "Yapay Zeka ile Düşün.",
    desc: "EDGE AI Trader, piyasa analizi, sinyaller ve işlem kararları için akıllı bir çalışma alanı sunar.",
    start: "Başla",
    dashboard: "Panele Giriş",
    features: [
      ["Yapay Zeka Analizi", "Piyasa koşullarını akıllı bir işlem asistanıyla analiz edin."],
      ["İşlem Zekası", "Piyasa araştırmalarınızı ve işlem kararlarınızı tek yerde yönetin."],
      ["Özel Erişim", "Hesaplar abonelik onayından sonra manuel olarak etkinleştirilir."],
    ],
    footer: "© 2026 EDGE AI Trader. Tüm hakları saklıdır.",
  },

  fr: {
    login: "Connexion",
    access: "Accéder",
    badge: "INTELLIGENCE FOREX PROPULSÉE PAR L'IA",
    title1: "Tradez plus intelligemment.",
    title2: "Pensez avec l'IA.",
    desc: "EDGE AI Trader offre un espace intelligent pour analyser les marchés, les signaux et les décisions de trading.",
    start: "Commencer",
    dashboard: "Accéder au tableau de bord",
    features: [
      ["Analyse IA", "Analysez les conditions du marché avec un assistant de trading intelligent."],
      ["Intelligence de Trading", "Organisez vos recherches et décisions de trading au même endroit."],
      ["Accès Privé", "Les comptes sont activés manuellement après confirmation de l'abonnement."],
    ],
    footer: "© 2026 EDGE AI Trader. Tous droits réservés.",
  },

  pt: {
    login: "Entrar",
    access: "Obter Acesso",
    badge: "INTELIGÊNCIA FOREX COM IA",
    title1: "Negocie com mais inteligência.",
    title2: "Pense com IA.",
    desc: "O EDGE AI Trader oferece um espaço inteligente para análise de mercado, sinais e decisões de trading.",
    start: "Começar",
    dashboard: "Entrar no Painel",
    features: [
      ["Análise com IA", "Analise as condições do mercado com um assistente inteligente de trading."],
      ["Inteligência de Trading", "Organize suas pesquisas e decisões de trading em um só lugar."],
      ["Acesso Privado", "As contas são ativadas manualmente após a confirmação da assinatura."],
    ],
    footer: "© 2026 EDGE AI Trader. Todos os direitos reservados.",
  },
};

type Language = keyof typeof translations;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("edge-language") as Language | null;

    if (saved && translations[saved]) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("edge-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = translations[language];

  function changeLanguage(value: Language) {
    setLanguage(value);
  }

  return (
    <main className="home">
      <nav className="navbar">

        <div className="logo">
          EDGE <span>AI</span> TRADER
        </div>

        <div className="nav-right">

          <div className="language-selector">
            <select
              value={language}
              onChange={(e) =>
                changeLanguage(e.target.value as Language)
              }
              aria-label="Language"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="tr">Türkçe</option>
              <option value="fr">Français</option>
              <option value="pt">Português</option>
            </select>
          </div>

          <div className="nav-buttons">
            <Link href="/login" className="btn btn-outline">
              {t.login}
            </Link>

            <Link href="/signup" className="btn btn-primary">
              {t.access}
            </Link>
          </div>

        </div>
      </nav>

      <section className="hero">

        <div className="badge">
          {t.badge}
        </div>

        <h1>
          {t.title1}
          <br />
          <span>{t.title2}</span>
        </h1>

        <p>{t.desc}</p>

        <div className="hero-buttons">

          <Link href="/signup" className="btn btn-primary btn-large">
            {t.start}
          </Link>

          <Link href="/login" className="btn btn-outline btn-large">
            {t.dashboard}
          </Link>

        </div>
      </section>

      <section className="features">

        {t.features.map(([title, text]) => (
          <div className="feature" key={title}>
            <div className="feature-icon">✦</div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}

      </section>

      <footer>
        {t.footer}
      </footer>
    </main>
  );
}
