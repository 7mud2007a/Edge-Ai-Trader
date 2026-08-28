"use client";

import { useEffect, useRef, useState } from "react";

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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("edge-language") || "en";
    setLanguage(saved);

    document.documentElement.lang = saved;
    document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";

    function closeMenu(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  function changeLanguage(code: string) {
    setLanguage(code);
    setOpen(false);

    localStorage.setItem("edge-language", code);

    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";

    window.dispatchEvent(new Event("language-change"));
  }

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  return (
    <div className="language-switcher" ref={ref}>
      <button
        type="button"
        className="language-button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="language-icon">◉</span>
        <span>{currentLanguage.name}</span>
        <span className={`language-arrow ${open ? "open" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="language-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={language === lang.code ? "active-language" : ""}
              onClick={() => changeLanguage(lang.code)}
            >
              <span>{lang.name}</span>

              {language === lang.code && (
                <span className="language-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
