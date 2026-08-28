"use client";

import { useEffect, useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "tr", name: "Türkçe" },
  { code: "fr", name: "Français" },
  { code: "pt", name: "Português" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
];

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("edge-language") || "en";
    setLanguage(saved);
    document.documentElement.lang = saved;
    document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
  }, []);

  function changeLanguage(code: string) {
    setLanguage(code);
    localStorage.setItem("edge-language", code);
    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";

    window.dispatchEvent(new Event("language-change"));
  }

  return (
    <select
      className="language-switcher"
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
