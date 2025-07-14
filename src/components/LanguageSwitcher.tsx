import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/languageSwitcher.css";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (newLanguage: "en" | "ro") => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const getLanguageLabel = (lang: "en" | "ro") => {
    return lang.toUpperCase();
  };

  const getLanguageFlag = (lang: "en" | "ro") => {
    return lang === "en" ? "🇺🇸" : "🇷🇴";
  };

  return (
    <div className="language-switcher">
      <button
        className="language-toggle btn-minimal"
        onClick={toggleDropdown}
        aria-label="Toggle language selection"
      >
        <span className="language-flag">{getLanguageFlag(language)}</span>
        <span className="language-label">{getLanguageLabel(language)}</span>
        <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown glass-card">
          <button
            className={`language-option ${language === "en" ? "active" : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            <span className="language-flag">🇺🇸</span>
            <span className="language-label">EN</span>
          </button>

          <button
            className={`language-option ${language === "ro" ? "active" : ""}`}
            onClick={() => handleLanguageChange("ro")}
          >
            <span className="language-flag">🇷🇴</span>
            <span className="language-label">RO</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
