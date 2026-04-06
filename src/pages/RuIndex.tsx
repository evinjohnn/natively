import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Index from './Index';

const RuIndex = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('ru');
    return () => {
      i18n.changeLanguage('en');
    };
  }, [i18n]);

  return <Index />;
};

export default RuIndex;
