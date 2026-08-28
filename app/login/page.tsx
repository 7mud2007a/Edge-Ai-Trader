"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const translations = {
  en: {
    title: "Welcome Back",
    subtitle: "Sign in to your trading workspace.",
    email: "Email",
    password: "Password",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Your password",
    login: "Login",
    loading: "Signing in...",
    noAccount: "Don't have an account?",
    create: "Create one",
    back: "← Back to home",
  },
  ar: {
    title: "أهلاً بعودتك",
    subtitle: "سجّل الدخول إلى مساحة التداول الخاصة بك.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "كلمة المرور",
    login: "تسجيل الدخول",
    loading: "جاري تسجيل الدخول...",
    noAccount: "ليس لديك حساب؟",
    create: "إنشاء حساب",
    back: "← العودة للرئيسية",
  },
  tr: {
    title: "Tekrar Hoş Geldiniz",
    subtitle: "İşlem çalışma alanınıza giriş yapın.",
    email: "E-posta",
    password: "Şifre",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Şifreniz",
    login: "Giriş Yap",
    loading: "Giriş yapılıyor...",
    noAccount: "Hesabınız yok mu?",
    create: "Hesap oluştur",
    back: "← Ana sayfaya dön",
  },
  fr: {
    title: "Bon retour",
    subtitle: "Connectez-vous à votre espace de trading.",
    email: "E-mail",
    password: "Mot de passe",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Votre mot de passe",
    login: "Connexion",
    loading: "Connexion...",
    noAccount: "Vous n'avez pas de compte ?",
    create: "Créer un compte",
    back: "← Retour à l'accueil",
  },
  pt: {
    title: "Bem-vindo de volta",
    subtitle: "Entre no seu espaço de trading.",
    email: "E-mail",
    password: "Senha",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Sua senha",
    login: "Entrar",
    loading: "Entrando...",
    noAccount: "Não tem uma conta?",
    create: "Criar conta",
    back: "← Voltar ao início",
  },
};

type Language = keyof typeof translations;

export default function LoginPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("edge-language") as Language | null;

    if (saved && translations[saved]) {
      setLanguage(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const t = translations[language];

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

  function changeLanguage(value: Language) {
    setLanguage(value);
    localStorage.setItem("edge-language", value);
    document.documentElement.lang = value;
    document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
  }

  return (
    <main className="auth-page">

      <div className="auth-language">
        <select
          value={language}
          onChange={(e) =>
            changeLanguage(e.target.value as Language)
          }
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="tr">Türkçe</option>
          <option value="fr">Français</option>
          <option value="pt">Português</option>
        </select>
      </div>

      <div className="auth-card">

        <div className="auth-logo">
          EDGE <span>AI</span> TRADER
        </div>

        <h1>{t.title}</h1>

        <p className="auth-subtitle">
          {t.subtitle}
        </p>

        <form onSubmit={handleLogin}>

          <label>{t.email}</label>

          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>{t.password}</label>

          <input
            type="password"
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? t.loading : t.login}
          </button>

        </form>

        <p className="auth-bottom">
          {t.noAccount}{" "}
          <Link href="/signup">
            {t.create}
          </Link>
        </p>

        <Link href="/" className="back-home">
          {t.back}
        </Link>

      </div>
    </main>
  );
}
