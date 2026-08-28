"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const translations = {
  en: {
    title: "Create Account",
    subtitle: "Create your account to access the trading workspace.",
    email: "Email",
    password: "Password",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Minimum 6 characters",
    create: "Create Account",
    creating: "Creating account...",
    haveAccount: "Already have an account?",
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
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "6 أحرف على الأقل",
    create: "إنشاء الحساب",
    creating: "جاري إنشاء الحساب...",
    haveAccount: "لديك حساب بالفعل؟",
    login: "تسجيل الدخول",
    back: "← العودة للرئيسية",
    success:
      "تم إنشاء الحساب بنجاح. تحقق من بريدك الإلكتروني إذا كان التأكيد مطلوباً.",
  },

  tr: {
    title: "Hesap Oluştur",
    subtitle: "İşlem çalışma alanına erişmek için hesabınızı oluşturun.",
    email: "E-posta",
    password: "Şifre",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "En az 6 karakter",
    create: "Hesap Oluştur",
    creating: "Hesap oluşturuluyor...",
    haveAccount: "Zaten hesabınız var mı?",
    login: "Giriş Yap",
    back: "← Ana sayfaya dön",
    success:
      "Hesabınız başarıyla oluşturuldu. Onay gerekiyorsa e-postanızı kontrol edin.",
  },

  fr: {
    title: "Créer un compte",
    subtitle: "Créez votre compte pour accéder à votre espace de trading.",
    email: "E-mail",
    password: "Mot de passe",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "6 caractères minimum",
    create: "Créer un compte",
    creating: "Création du compte...",
    haveAccount: "Vous avez déjà un compte ?",
    login: "Connexion",
    back: "← Retour à l'accueil",
    success:
      "Compte créé avec succès. Vérifiez votre e-mail si une confirmation est requise.",
  },

  pt: {
    title: "Criar Conta",
    subtitle: "Crie sua conta para acessar o espaço de trading.",
    email: "E-mail",
    password: "Senha",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Mínimo de 6 caracteres",
    create: "Criar Conta",
    creating: "Criando conta...",
    haveAccount: "Já tem uma conta?",
    login: "Entrar",
    back: "← Voltar ao início",
    success:
      "Conta criada com sucesso. Verifique seu e-mail se a confirmação for necessária.",
  },
};

type Language = keyof typeof translations;

export default function SignupPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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

  function changeLanguage(value: Language) {
    setLanguage(value);
    localStorage.setItem("edge-language", value);

    document.documentElement.lang = value;
    document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
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

    setMessage(t.success);
    setLoading(false);
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

        <form onSubmit={handleSignup}>

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
            minLength={6}
            required
          />

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {message && (
            <div className="auth-success">
              {message}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? t.creating : t.create}
          </button>

        </form>

        <p className="auth-bottom">
          {t.haveAccount}{" "}
          <Link href="/login">
            {t.login}
          </Link>
        </p>

        <Link href="/" className="back-home">
          {t.back}
        </Link>

      </div>
    </main>
  );
}
