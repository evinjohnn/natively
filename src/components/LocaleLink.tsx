import { Link, LinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function LocaleLink({ to, children, ...props }: LinkProps & { to: string }) {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";
  const href = isRu && to.startsWith("/") && !to.startsWith("/ru") ? `/ru${to}` : to;

  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}

export function useLocalePath() {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  return (path: string) => {
    if (!path.startsWith("/")) return path;
    return isRu && !path.startsWith("/ru") ? `/ru${path}` : path;
  };
}
