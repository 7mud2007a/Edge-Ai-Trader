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

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Account created successfully. Check your email if confirmation is required."
    );

    setLoading(false);
  }

  const t: Record<string, Record<string, string>> = {
    en: {
      title: "Create Account",
      subtitle: "Create your account to access the trading workspace.",
      email: "Email",
      password: "Password",
      create: "Create Account",
      creating: "Creating account...",
      already: "Already have an account?",
      login: "Login",
      back: "← Back to home",
      success:
        "Account created successfully. Check your email if confirmation is required.",
    },
    ar: {
      title: "إنشاء حساب",
      subtitle: "أنشئ حسابك للوصول إلى مساحة التداول.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      create: "إنشاء حساب",
      creating: "جارٍ إنشاء الحساب...",
      already: "لديك حساب بالفعل؟",
      login: "تسجيل الدخول",
      back: "← العودة للرئيسية",
      success:
        "تم إنشاء الحساب بنجاح. تحقق من بريدك الإلكتروني إذا كان التأكيد مطلوباً.",
    },
    tr: {
      title: "Hesap Oluştur",
      subtitle: "İşlem çalışma alanınıza erişmek için hesabınızı oluşturun.",
      email: "E-posta",
      password: "Şifre",
      create: "Hesap Oluştur",
      creating: "Hesap oluşturuluyor...",
      already: "Zaten hesabınız var mı?",
      login: "Giriş Yap",
      back: "← Ana sayfaya dön",
      success:
        "Hesap başarıyla oluşturuldu. Onay gerekiyorsa e-postanızı kontrol edin.",
    },
    fr: {
      title: "Créer un compte",
      subtitle: "Créez votre compte pour accéder à votre espace de trading.",
      email: "E-mail",
      password: "Mot de passe",
      create: "Créer un compte",
      creating: "Création du compte...",
      already: "Vous avez déjà un compte ?",
      login: "Connexion",
      back: "← Retour à l'accueil",
      success:
        "Compte créé avec succès. Vérifiez votre e-mail si une confirmation est requise.",
    },
    pt: {
      title: "Criar conta",
      subtitle: "Crie sua conta para acessar seu espaço de trading.",
      email: "E-mail",
      password: "Senha",
      create: "Criar conta",
      creating: "Criando conta...",
      already: "Já tem uma conta?",
      login: "Entrar",
      back: "← Voltar ao início",
      success:
        "Conta criada com sucesso. Verifique seu e-mail se a confirmação for necessária.",
    },
    de: {
      title: "Konto erstellen",
      subtitle:
        "Erstellen Sie Ihr Konto, um auf Ihren Trading-Arbeitsbereich zuzugreifen.",
      email: "E-Mail",
      password: "Passwort",
      create: "Konto erstellen",
      creating: "Konto wird erstellt...",
      already: "Sie haben bereits ein Konto?",
      login: "Anmelden",
      back: "← Zur Startseite",
      success:
        "Konto erfolgreich erstellt. Überprüfen Sie Ihre E-Mail, falls eine Bestätigung erforderlich ist.",
    },
    es: {
      title: "Crear cuenta",
      subtitle: "Crea tu cuenta para acceder a tu espacio de trading.",
      email: "Correo electrónico",
      password: "Contraseña",
      create: "Crear cuenta",
      creating: "Creando cuenta...",
      already: "¿Ya tienes una cuenta?",
      login: "Iniciar sesión",
      back: "← Volver al inicio",
      success:
        "Cuenta creada correctamente. Revisa tu correo si se requiere confirmación.",
    },
    it: {
      title: "Crea account",
      subtitle: "Crea il tuo account per accedere al tuo spazio di trading.",
      email: "Email",
      password: "Password",
      create: "Crea account",
      creating: "Creazione account...",
      already: "Hai già un account?",
      login: "Accedi",
      back: "← Torna alla home",
      success:
        "Account creato con successo. Controlla la tua email se è richiesta la conferma.",
    },
  };

  const text = t[language] || t.en;
  const isRTL = language === "ar";

  return (
    <main className="auth-page" dir={isRTL ? "rtl" : "ltr"}>
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

        <h1>{text.title}</h1>

        <p className="auth-subtitle">{text.subtitle}</p>

        <form onSubmit={handleSignup}>
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
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {error && <div className="auth-error">{error}</div>}

          {message && (
            <div className="auth-success">{text.success}</div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? text.creating : text.create}
          </button>
        </form>

        <p className="auth-bottom">
          {text.already}{" "}
          <Link href="/login">{text.login}</Link>
        </p>

        <Link href="/" className="back-home">
          {text.back}
        </Link>
      </div>
    </main>
  );
}
