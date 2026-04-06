import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);

    const path = location.pathname;
    if (newLang === 'ru' && !path.startsWith('/ru')) {
      navigate(`/ru${path}`);
    } else if (newLang === 'en' && path.startsWith('/ru')) {
      navigate(path.replace(/^\/ru/, '') || '/');
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-[14px] font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1"
      aria-label="Switch language"
    >
      {i18n.language === 'en' ? 'RU' : 'EN'}
    </button>
  );
}
