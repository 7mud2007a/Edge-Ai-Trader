"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./components/LanguageSwitcher";

const translations: Record<string, any> = {
  en: {
    badge: "AI-POWERED FOREX INTELLIGENCE",
    title1: "Trade Smarter.",
    title2: "Think With AI.",
    desc: "EDGE AI Trader gives traders an intelligent workspace for market analysis, signals and trading decisions.",
    login: "Login",
    access: "Get Access",
    started: "Get Started",
    dashboard: "Login to Dashboard",
    features: [
      ["AI Analysis", "Analyze market conditions with an intelligent trading assistant."],
      ["Trading Intelligence", "Organize your market research and trading decisions in one place."],
      ["Private Access", "Accounts are activated manually after your subscription is confirmed."],
    ],
    footer: "All rights reserved.",
  },
  ar: {
    badge: "ذكاء فوركس مدعوم بالذكاء الاصطناعي",
    title1: "تداول بذكاء.",
    title2: "فكّر مع الذكاء الاصطناعي.",
    desc: "EDGE AI Trader يمنح المتداولين مساحة ذكية لتحليل الأسواق والإشارات واتخاذ قرارات التداول.",
    login: "تسجيل الدخول",
    access: "الحصول على الوصول",
    started: "ابدأ الآن",
    dashboard: "الدخول إلى لوحة التحكم",
    features: [
      ["تحليل بالذكاء الاصطناعي", "حلّل ظروف السوق باستخدام مساعد تداول ذكي."],
      ["ذكاء التداول", "نظّم أبحاث السوق وقرارات التداول في مكان واحد."],
      ["وصول خاص", "يتم تفعيل الحسابات يدويًا بعد تأكيد الاشتراك."],
    ],
    footer: "جميع الحقوق محفوظة.",
  },
  tr: {
    badge: "YAPAY ZEKA DESTEKLİ FOREX ANALİZİ",
    title1: "Daha Akıllı İşlem Yap.",
    title2: "Yapay Zeka ile Düşün.",
    desc: "EDGE AI Trader, piyasa analizi, sinyaller ve işlem kararları için akıllı bir çalışma alanı sunar.",
    login: "Giriş Yap",
    access: "Erişim Al",
    started: "Başla",
    dashboard: "Kontrol Paneline Giriş",
    features: [
      ["AI Analizi", "Piyasa koşullarını akıllı bir işlem asistanıyla analiz edin."],
      ["İşlem Zekası", "Piyasa araştırmalarınızı ve işlem kararlarınızı tek yerde yönetin."],
      ["Özel Erişim", "Hesaplar abonelik onayından sonra manuel olarak etkinleştirilir."],
    ],
    footer: "Tüm hakları saklıdır.",
  },
  fr: {
    badge: "INTELLIGENCE FOREX PROPULSÉE PAR L'IA",
    title1: "Tradez Plus Intelligemment.",
    title2: "Pensez Avec l'IA.",
    desc: "EDGE AI Trader offre un espace intelligent pour l'analyse des marchés, les signaux et les décisions de trading.",
    login: "Connexion",
    access: "Obtenir l'accès",
    started: "Commencer",
    dashboard: "Accéder au tableau de bord",
    features: [
      ["Analyse IA", "Analysez les conditions du marché avec un assistant de trading intelligent."],
      ["Intelligence de Trading", "Organisez vos recherches et décisions de trading au même endroit."],
      ["Accès Privé", "Les comptes sont activés manuellement après confirmation de l'abonnement."],
    ],
    footer: "Tous droits réservés.",
  },
  pt: {
    badge: "INTELIGÊNCIA FOREX COM IA",
    title1: "Opere com Mais Inteligência.",
    title2: "Pense com IA.",
    desc: "O EDGE AI Trader oferece um espaço inteligente para análise de mercado, sinais e decisões de trading.",
    login: "Entrar",
    access: "Obter Acesso",
    started: "Começar",
    dashboard: "Entrar no Painel",
    features: [
      ["Análise com IA", "Analise as condições do mercado com um assistente inteligente."],
      ["Inteligência de Trading", "Organize suas pesquisas e decisões de trading em um só lugar."],
      ["Acesso Privado", "As contas são ativadas manualmente após a confirmação da assinatura."],
    ],
    footer: "Todos os direitos reservados.",
  },
  de: {
    badge: "KI-GESTÜTZTE FOREX-INTELLIGENZ",
    title1: "Smarter Handeln.",
    title2: "Denke mit KI.",
    desc: "EDGE AI Trader bietet einen intelligenten Arbeitsbereich für Marktanalyse, Signale und Handelsentscheidungen.",
    login: "Anmelden",
    access: "Zugang erhalten",
    started: "Loslegen",
    dashboard: "Zum Dashboard",
    features: [
      ["KI-Analyse", "Analysieren Sie Marktbedingungen mit einem intelligenten Trading-Assistenten."],
      ["Trading-Intelligenz", "Organisieren Sie Ihre Marktforschung und Handelsentscheidungen an einem Ort."],
      ["Privater Zugang", "Konten werden nach Bestätigung des Abonnements manuell aktiviert."],
    ],
    footer: "Alle Rechte vorbehalten.",
  },
  es: {
    badge: "INTELIGENCIA FOREX IMPULSADA POR IA",
    title1: "Opera de Forma Inteligente.",
    title2: "Piensa con IA.",
    desc: "EDGE AI Trader ofrece un espacio inteligente para análisis de mercado, señales y decisiones de trading.",
    login: "Iniciar sesión",
    access: "Obtener acceso",
    started: "Comenzar",
    dashboard: "Entrar al panel",
    features: [
      ["Análisis con IA", "Analiza las condiciones del mercado con un asistente inteligente."],
      ["Inteligencia de Trading", "Organiza tu investigación y decisiones de trading en un solo lugar."],
      ["Acceso Privado", "Las cuentas se activan manualmente después de confirmar la suscripción."],
    ],
    footer: "Todos los derechos reservados.",
  },
};

export default function Home() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("edge-language") || "en";
    setLanguage(saved);

    const update = () => {
      setLanguage(localStorage.getItem("edge-language") || "en");
    };

    window.addEventListener("language-change", update);
    return () => window.removeEventListener("language-change", update);
  }, []);

  const t = translations[language] || translations.en;

  return (
    <main className="home">
      <nav className="navbar">
        <div className="logo">
          EDGE <span>AI</span> TRADER
        </div>

        <div className="nav-buttons">
          <LanguageSwitcher />

          <Link href="/login" className="btn btn-outline">
            {t.login}
          </Link>

          <Link href="/signup" className="btn btn-primary">
            {t.access}
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="badge">{t.badge}</div>

        <h1>
          {t.title1}
          <br />
          <span>{t.title2}</span>
        </h1>

        <p>{t.desc}</p>

        <div className="hero-buttons">
          <Link href="/signup" className="btn btn-primary btn-large">
            {t.started}
          </Link>

          <Link href="/login" className="btn btn-outline btn-large">
            {t.dashboard}
          </Link>
        </div>
      </section>

      <section className="features">
        {t.features.map(([title, text]: string[], i: number) => (
          <Feature key={i} title={title} text={text} />
        ))}
      </section>

      <footer>
        © 2026 EDGE AI Trader. {t.footer}
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
