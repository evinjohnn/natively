import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

export default function LanguageSwitcher({ isDark = true }: { isDark?: boolean }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLang = LANGUAGES.find(l => i18n.language.startsWith(l.code)) || LANGUAGES[0];
  const currentLangIndex = LANGUAGES.findIndex(l => l.code === currentLang.code);

  const close = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(0);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(i => (i + 1) % LANGUAGES.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(i => (i - 1 + LANGUAGES.length) % LANGUAGES.length);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(currentLangIndex >= 0 ? currentLangIndex : 0);
    }
  }, [isOpen, currentLangIndex]);

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    close();

    const path = location.pathname;
    if (code === 'ru' && !path.startsWith('/ru')) {
      navigate(`/ru${path}`);
    } else if (code !== 'ru' && path.startsWith('/ru')) {
      navigate(path.replace(/^\/ru/, '') || '/');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[14px] font-medium transition-all duration-200 cursor-pointer ${
          isDark
            ? 'text-white/70 hover:text-white hover:bg-white/10'
            : 'text-foreground/70 hover:text-foreground hover:bg-gray-100'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Language: ${currentLang.label}`}
      >
        <Globe className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-12" />
        <span>{currentLang.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            aria-label="Select language"
            className={`absolute right-0 top-full mt-2 w-[160px] rounded-xl border shadow-xl overflow-hidden z-50 ${
              isDark
                ? 'bg-gray-900/95 backdrop-blur-md border-white/10'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className={`px-3 py-2 border-b ${
              isDark ? 'border-white/5' : 'border-gray-100'
            }`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                isDark ? 'text-white/40' : 'text-gray-400'
              }`}>
                Language
              </span>
            </div>

            <div className="p-1">
              {LANGUAGES.map((lang, i) => {
                const isSelected = lang.code === currentLang.code;
                const isFocused = i === focusedIndex;
                return (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => switchLanguage(lang.code)}
                    onMouseEnter={() => setFocusedIndex(i)}
                    className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-[14px] font-medium transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-white/10 text-white'
                          : 'bg-gray-100 text-foreground'
                        : isFocused
                          ? isDark
                            ? 'text-white/80 bg-white/5'
                            : 'text-foreground bg-gray-50'
                          : isDark
                            ? 'text-white/60 hover:text-white hover:bg-white/5'
                            : 'text-foreground/60 hover:text-foreground hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold opacity-60">{lang.label}</span>
                      <span>{lang.name}</span>
                    </div>
                    {isSelected && (
                      <div className={`rounded-full p-0.5 ${
                        isDark ? 'bg-white/10' : 'bg-gray-200'
                      }`}>
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
