import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const menuItems = [
    { title: t("nav.home"), path: "/", icon: "🏠" },
    { title: t("nav.whyProject"), path: "/why-project", icon: "❓" },
    { title: t("nav.goals"), path: "/goals", icon: "🎯" },
    { title: t("nav.activities"), path: "/activities", icon: "🎮" },
    { title: t("nav.experience"), path: "/experience", icon: "✨" },
  ];

  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "jp", name: "日本語", flag: "🇯🇵" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  // Detect scroll for navbar visibility and style changes
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 20);
      
      // Show navbar when:
      // 1. At the top (scrollY < 10)
      // 2. Scrolling up (currentScrollY < lastScrollY)
      // 3. Mobile menu is open
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY || mobileMenuOpen) {
        // Scrolling up or menu is open
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setLangMenuOpen(false);
  };

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        visible ? "top-0 translate-y-0" : "-top-24 -translate-y-full"
      } ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl shadow-lg border-b border-revolutionary-gold/20"
          : "bg-black/70 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Compact */}
          <Link
            to="/"
            className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/images2/logo.png"
              alt="Philosophy 4.0"
              className="w-9 h-9 object-contain transition-transform group-hover:rotate-12"
            />
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-revolutionary-gold group-hover:text-cyber-blue transition-colors leading-tight">
                Philosophy 4.0
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation - Compact */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-1.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-1.5 text-sm ${
                    active
                      ? "bg-revolutionary-gold text-black"
                      : "text-cream-white hover:bg-revolutionary-gold/10 hover:text-revolutionary-gold"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="hidden lg:inline">{item.title}</span>
                  
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-communist-red rounded-full"></span>
                  )}
                </Link>
              );
            })}

            {/* Language Switcher - Desktop */}
            <div className="relative ml-2">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="px-2 py-1.5 rounded-lg bg-revolutionary-gold/10 hover:bg-revolutionary-gold/20 transition-all duration-300 flex items-center gap-1"
                aria-label="Change language"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="text-xs text-cream-white font-medium hidden xl:inline">{currentLanguage.code.toUpperCase()}</span>
              </button>

              {/* Language Dropdown */}
              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-xl rounded-lg shadow-xl overflow-hidden min-w-[160px] z-50 border border-revolutionary-gold/20">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-revolutionary-gold/20 transition-colors text-sm ${
                          i18n.language === lang.code
                            ? "bg-revolutionary-gold/10 text-revolutionary-gold font-semibold"
                            : "text-cream-white"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-xs">{lang.name}</span>
                        {i18n.language === lang.code && (
                          <span className="ml-auto text-revolutionary-gold text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-lg bg-revolutionary-gold/10 hover:bg-revolutionary-gold/20 transition-all duration-300 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1">
              <span
                className={`w-5 h-0.5 bg-revolutionary-gold transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-revolutionary-gold transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-revolutionary-gold transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-[500px] opacity-100 pb-3" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1.5 pt-2">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    active
                      ? "bg-revolutionary-gold text-black"
                      : "bg-revolutionary-gold/5 text-cream-white hover:bg-revolutionary-gold/10"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.title}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 bg-communist-red rounded-full"></span>
                  )}
                </Link>
              );
            })}

            {/* Language Switcher - Mobile */}
            <div className="pt-2 mt-2 border-t border-revolutionary-gold/20">
              <div className="text-xs text-cream-white/50 px-3 pb-1 font-medium">Language</div>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex-1 px-3 py-2 rounded-lg text-center transition-all duration-300 ${
                      i18n.language === lang.code
                        ? "bg-revolutionary-gold text-black font-semibold"
                        : "bg-revolutionary-gold/5 text-cream-white hover:bg-revolutionary-gold/10"
                    }`}
                  >
                    <div className="text-lg">{lang.flag}</div>
                    <div className="text-xs mt-0.5">{lang.code.toUpperCase()}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
