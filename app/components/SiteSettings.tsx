"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type SiteLanguage = "zh" | "en";
export type SiteTheme = "macaron" | "mint" | "classic";

type SiteSettingsProps = {
  language: SiteLanguage;
  theme: SiteTheme;
  onLanguageChange: (language: SiteLanguage) => void;
  onThemeChange: (theme: SiteTheme) => void;
  cover?: boolean;
  inline?: boolean;
};

const themeOptions: Array<{
  id: SiteTheme;
  zh: string;
  en: string;
}> = [
  {
    id: "macaron",
    zh: "马卡龙糖果",
    en: "Macaron Candy",
  },
  {
    id: "mint",
    zh: "薄荷乐园",
    en: "Mint Garden",
  },
  {
    id: "classic",
    zh: "蓝莓星空",
    en: "Blueberry Sky",
  },
];

export default function SiteSettings({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
  cover = false,
  inline = false,
}: SiteSettingsProps) {
  const [open, setOpen] = useState(false);
  const isEnglish = language === "en";

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <button
        className={`site-settings-trigger ${cover ? "on-cover" : ""} ${
          inline ? "is-inline" : ""
        }`}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={isEnglish ? "Open settings" : "打开设置"}
        title={isEnglish ? "Settings" : "设置"}
      >
        <span aria-hidden="true">⚙︎</span>
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="settings-layer">
          <button
            className="settings-backdrop"
            type="button"
            onClick={() => setOpen(false)}
            aria-label={isEnglish ? "Close settings" : "关闭设置"}
          />
          <section
            className="settings-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            <header>
              <div>
                <small>{isEnglish ? "SITE PREFERENCES" : "网站偏好"}</small>
                <h2 id="settings-title">
                  {isEnglish ? "Make it yours" : "把网站调成喜欢的样子"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={isEnglish ? "Close settings" : "关闭设置"}
              >
                ×
              </button>
            </header>

            <div className="settings-group">
              <div>
                <strong>{isEnglish ? "Interface language" : "界面语言"}</strong>
                <small>
                  {isEnglish
                    ? "Navigation and controls only; lessons stay in Chinese."
                    : "切换导航与按钮；课程正文仍保持中文。"}
                </small>
              </div>
              <div className="language-options">
                <button
                  className={language === "zh" ? "selected" : ""}
                  type="button"
                  onClick={() => onLanguageChange("zh")}
                  aria-pressed={language === "zh"}
                >
                  简体中文
                </button>
                <button
                  className={language === "en" ? "selected" : ""}
                  type="button"
                  onClick={() => onLanguageChange("en")}
                  aria-pressed={language === "en"}
                >
                  English
                </button>
              </div>
            </div>

            <div className="settings-group">
              <div>
                <strong>{isEnglish ? "Color style" : "网站风格"}</strong>
                <small>
                  {isEnglish
                    ? "Colors change immediately and stay on this browser."
                    : "点击立即预览，并保存在当前浏览器。"}
                </small>
              </div>
              <div className="theme-options">
                {themeOptions.map((option) => (
                  <button
                    className={theme === option.id ? "selected" : ""}
                    type="button"
                    onClick={() => onThemeChange(option.id)}
                    aria-pressed={theme === option.id}
                    key={option.id}
                  >
                    <span
                      className={`theme-preview theme-preview-${option.id}`}
                      aria-hidden="true"
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <i key={index} />
                      ))}
                    </span>
                    <strong>{isEnglish ? option.en : option.zh}</strong>
                    <small>{theme === option.id ? "✓" : ""}</small>
                  </button>
                ))}
              </div>
            </div>

            <footer>
              {isEnglish
                ? "Preferences are saved only on this device."
                : "这些设置只保存在当前设备。"}
            </footer>
          </section>
          </div>,
          document.body,
        )}
    </>
  );
}
