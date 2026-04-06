import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function RuPage<T extends Record<string, unknown>>(Component: React.ComponentType<T>) {
  return function RuPageWrapper(props: T) {
    const { i18n } = useTranslation();

    useEffect(() => {
      i18n.changeLanguage('ru');
      return () => {
        i18n.changeLanguage('en');
      };
    }, [i18n]);

    return <Component {...props} />;
  };
}
