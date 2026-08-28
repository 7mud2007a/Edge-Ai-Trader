"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import LanguageSwitcher from "../components/LanguageSwitcher";

const t: Record<string, Record<string, string>> = {
  en: {
    title: "Welcome Back",
    sub: "Sign in to your trading workspace.",
    email: "Email",
    password: "Password",
    login: "Login",
    signing: "Signing in...",
    noAccount: "Don't have an account?",
    create: "Create one",
    back: "← Back to home",
  },
  ar: {
    title: "مرحباً بعودتك",
    sub: "سجّل الدخول إلى مساحة التداول الخاصة بك.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    signing: "جارٍ تسجيل الدخول...",
    noAccount: "ليس لديك حساب؟",
    create: "إنشاء حساب",
    back: "← العودة للرئيسية",
  },
  tr: {
    title: "Tekrar Hoş Geldiniz",
    sub: "İşlem çalışma alanınıza giriş yapın.",
    email: "E-posta",
    password: "Şifre",
    login: "Giriş Yap",
    signing: "Giriş yapılıyor...",
    noAccount: "Hesabınız yok mu?",
    create: "Hesap oluştur",
    back: "← Ana sayfaya dön",
  },
  de: {
    title: "Willkommen zurück",
    sub: "Melden Sie sich bei Ihrem Trading-Arbeitsbereich an.",
    email: "E-Mail",
    password: "Passwort",
    login: "Anmelden",
    signing: "Anmeldung...",
    noAccount: "Noch kein Konto?",
    create: "Konto erstellen",
    back: "← Zur Startseite",
  },
  fr: {
    title: "Bon Retour",
    sub: "Connectez-vous à votre espace de trading.",
    email: "E-mail",
    password: "Mot de passe",
    login: "Connexion",
    signing: "Connexion...",
    noAccount: "Vous n'avez pas de compte ?",
    create: "Créer un compte",
    back: "← Retour à l'accueil",
  },
  es: {
    title: "Bienvenido de nuevo",
    sub: "Inicia sesión en tu espacio de trading.",
    email: "Correo electrónico",
    password: "Contraseña",
    login: "Iniciar sesión",
    signing: "Iniciando sesión...",
    noAccount: "¿No tienes una cuenta?",
    create: "Crear una",
    back: "← Volver al inicio",
  },
  pt: {
    title: "Bem-vindo de volta",
    sub: "Entre no seu espaço de trading.",
    email: "E-mail",
    password: "Senha",
    login: "Entrar",
    signing: "Entrando...",
    noAccount: "Não tem uma conta?",
    create: "Criar uma",
    back: "← Voltar ao início",
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const updateLanguage = () => {
      const saved = localStorage.getItem("edge-language") || "en";
      setLanguage(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    };

    updateLanguage();
    window.addEventListener("language-change", updateLanguage);

    return () =>
      window.removeEventListener("language-change", updateLanguage);
  }, []);

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

  const text = t[language] || t.en;

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <div className="auth-logo">
            EDGE <span>AI</span> TRADER
          </div>

          <LanguageSwitcher />
        </div>

        <h1>{text.title}</h1>
        <p className="auth-subtitle">{text.sub}</p>

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

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? text.signing : text.login}
          </button>
        </form>

        <p className="auth-bottom">
          {text.noAccount}{" "}
          <Link href="/signup">{text.create}</Link>
        </p>

        <Link href="/" className="back-home">
          {text.back}
        </Link>
      </div>
    </main>
  );
}
