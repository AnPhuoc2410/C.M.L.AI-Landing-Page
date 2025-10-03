import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "jp", name: "日本語", flag: "🇯🇵" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 left-6 z-50">
      <div className="relative">
        {/* Current Language Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-revolutionary-gold rounded-full flex items-center justify-center text-white font-bold hover:bg-revolutionary-gold/90 transition-all duration-300 shadow-lg hover:scale-110 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl">{currentLanguage.flag}</span>
        </motion.button>

        {/* Language Options */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 -z-10"
                onClick={() => setIsOpen(false)}
              />

              {/* Language Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-16 left-0 bg-white rounded-lg shadow-xl overflow-hidden min-w-[180px]"
              >
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-cyber-blue/10 transition-colors ${
                      i18n.language === lang.code
                        ? "bg-revolutionary-gold/10 text-revolutionary-gold font-bold"
                        : "text-gray-700"
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                    {i18n.language === lang.code && (
                      <span className="ml-auto text-revolutionary-gold">✓</span>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
