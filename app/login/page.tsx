"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "tr", name: "Türkçe" },
  { code: "fr", name: "Français" },
  { code: "pt", name: "Português" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("edge-language") || "en";
    }
    return "en";
  });

  function changeLanguage(value: string) {
    setLanguage(value);
    localStorage.setItem("edge-language", value);
  }

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

  const t: Record<string, Record<string, string>> = {
    en: {
      welcome: "Welcome Back",
      subtitle: "Sign in to your trading workspace.",
      email: "Email",
      password: "Password",
      login: "Login",
      signing: "Signing in...",
      noAccount: "Don't have an account?",
      create: "Create one",
      back: "← Back to home",
    },
    ar: {
      welcome: "مرحباً بعودتك",
      subtitle: "سجّل الدخول إلى مساحة التداول الخاصة بك.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      login: "تسجيل الدخول",
      signing: "جارٍ تسجيل الدخول...",
      noAccount: "ليس لديك حساب؟",
      create: "إنشاء حساب",
      back: "← العودة للرئيسية",
    },
    tr: {
      welcome: "Tekrar Hoş Geldiniz",
      subtitle: "İşlem çalışma alanınıza giriş yapın.",
      email: "E-posta",
      password: "Şifre",
      login: "Giriş Yap",
      signing: "Giriş yapılıyor...",
      noAccount: "Hesabınız yok mu?",
      create: "Hesap oluştur",
      back: "← Ana sayfaya dön",
    },
    fr: {
      welcome: "Bon retour",
      subtitle: "Connectez-vous à votre espace de trading.",
      email: "E-mail",
      password: "Mot de passe",
      login: "Connexion",
      signing: "Connexion...",
      noAccount: "Vous n'avez pas de compte ?",
      create: "Créer un compte",
      back: "← Retour à l'accueil",
    },
    pt: {
      welcome: "Bem-vindo de volta",
      subtitle: "Entre no seu espaço de trading.",
      email: "E-mail",
      password: "Senha",
      login: "Entrar",
      signing: "Entrando...",
      noAccount: "Não tem uma conta?",
      create: "Criar conta",
      back: "← Voltar ao início",
    },
    de: {
      welcome: "Willkommen zurück",
      subtitle: "Melden Sie sich bei Ihrem Trading-Arbeitsbereich an.",
      email: "E-Mail",
      password: "Passwort",
      login: "Anmelden",
      signing: "Anmeldung...",
      noAccount: "Noch kein Konto?",
      create: "Konto erstellen",
      back: "← Zur Startseite",
    },
    es: {
      welcome: "Bienvenido de nuevo",
      subtitle: "Inicia sesión en tu espacio de trading.",
      email: "Correo electrónico",
      password: "Contraseña",
      login: "Iniciar sesión",
      signing: "Iniciando sesión...",
      noAccount: "¿No tienes una cuenta?",
      create: "Crear cuenta",
      back: "← Volver al inicio",
    },
    it: {
      welcome: "Bentornato",
      subtitle: "Accedi al tuo spazio di trading.",
      email: "Email",
      password: "Password",
      login: "Accedi",
      signing: "Accesso...",
      noAccount: "Non hai un account?",
      create: "Crea account",
      back: "← Torna alla home",
    },
  };

  const text = t[language] || t.en;
  const isRTL = language === "ar";

  return (
    <main
      className="auth-page"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="language-switcher">
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          aria-label="Language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="auth-card">
        <div className="auth-logo">
          EDGE <span>AI</span> TRADER
        </div>

        <h1>{text.welcome}</h1>

        <p className="auth-subtitle">
          {text.subtitle}
        </p>

        <form onSubmit={handleLogin}>
          <label>{text.email}</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>{text.password}</label>

          <input
            type="password"
            placeholder="Your password"
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
            {loading ? text.signing : text.login}
          </button>
        </form>

        <p className="auth-bottom">
          {text.noAccount}{" "}
          <Link href="/signup">
            {text.create}
          </Link>
        </p>

        <Link href="/" className="back-home">
          {text.back}
        </Link>
      </div>
    </main>
  );
}
