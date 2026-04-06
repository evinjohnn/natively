import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LanguageRouter() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRu = pathname.startsWith('/ru');
    const targetLang = isRu ? 'ru' : 'en';

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
      if (targetLang === 'ru') {
        localStorage.setItem('lang', 'ru');
      } else {
        localStorage.removeItem('lang');
      }
    }
  }, [pathname, i18n]);

  return null;
}
