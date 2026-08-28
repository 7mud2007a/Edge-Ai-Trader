"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import LanguageSwitcher from "../components/LanguageSwitcher";

const t: Record<string, Record<string, string>> = {
  en: {
    title: "Create Account",
    sub: "Create your account to access the trading workspace.",
    email: "Email",
    password: "Password",
    create: "Create Account",
    creating: "Creating account...",
    have: "Already have an account?",
    login: "Login",
    back: "← Back to home",
    success: "Account created successfully. Check your email if confirmation is required.",
  },
  ar: {
    title: "إنشاء حساب",
    sub: "أنشئ حسابك للوصول إلى مساحة التداول.",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    create: "إنشاء الحساب",
    creating: "جارٍ إنشاء الحساب...",
    have: "لديك حساب بالفعل؟",
    login: "تسجيل الدخول",
    back: "← العودة للرئيسية",
    success: "تم إنشاء الحساب بنجاح. تحقق من بريدك الإلكتروني إذا كان التأكيد مطلوباً.",
  },
  tr: {
    title: "Hesap Oluştur",
    sub: "İşlem çalışma alanına erişmek için hesabınızı oluşturun.",
    email: "E-posta",
    password: "Şifre",
    create: "Hesap Oluştur",
    creating: "Hesap oluşturuluyor...",
    have: "Zaten hesabınız var mı?",
    login: "Giriş Yap",
    back: "← Ana sayfaya dön",
    success: "Hesap başarıyla oluşturuldu. Onay gerekiyorsa e-postanızı kontrol edin.",
  },
  de: {
    title: "Konto erstellen",
    sub: "Erstellen Sie Ihr Konto, um auf den Trading-Arbeitsbereich zuzugreifen.",
    email: "E-Mail",
    password: "Passwort",
    create: "Konto erstellen",
    creating: "Konto wird erstellt...",
    have: "Sie haben bereits ein Konto?",
    login: "Anmelden",
    back: "← Zur Startseite",
    success: "Konto erfolgreich erstellt. Prüfen Sie Ihre E-Mail, falls eine Bestätigung erforderlich ist.",
  },
  fr: {
    title: "Créer un compte",
    sub: "Créez votre compte pour accéder à votre espace de trading.",
    email: "E-mail",
    password: "Mot de passe",
    create: "Créer un compte",
    creating: "Création du compte...",
    have: "Vous avez déjà un compte ?",
    login: "Connexion",
    back: "← Retour à l'accueil",
    success: "Compte créé avec succès. Vérifiez votre e-mail si une confirmation est requise.",
  },
  es: {
    title: "Crear cuenta",
    sub: "Crea tu cuenta para acceder a tu espacio de trading.",
    email: "Correo electrónico",
    password: "Contraseña",
    create: "Crear cuenta",
    creating: "Creando cuenta...",
    have: "¿Ya tienes una cuenta?",
    login: "Iniciar sesión",
    back: "← Volver al inicio",
    success: "Cuenta creada correctamente. Revisa tu correo si se requiere confirmación.",
  },
  pt: {
    title: "Criar conta",
    sub: "Crie sua conta para acessar o espaço de trading.",
    email: "E-mail",
    password: "Senha",
    create: "Criar conta",
    creating: "Criando conta...",
    have: "Já tem uma conta?",
    login: "Entrar",
    back: "← Voltar ao início",
    success: "Conta criada com sucesso. Verifique seu e-mail se a confirmação for necessária.",
  },
};

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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

    setMessage(text.success);
    setLoading(false);
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
            <div className="auth-success">
              {message}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? text.creating : text.create}
          </button>
        </form>

        <p className="auth-bottom">
          {text.have}{" "}
          <Link href="/login">{text.login}</Link>
        </p>

        <Link href="/" className="back-home">
          {text.back}
        </Link>
      </div>
    </main>
  );
}
