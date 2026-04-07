import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * /pro — serves the Free vs Pro interactive demo page.
 * The demo is a self-contained HTML file in /public/free-vs-pro.html.
 * We render it via a full-screen iframe so the animation, JS, and CSS
 * all work exactly as authored without any React interference.
 * Language is passed via ?lang=ru for Russian routes.
 */
const Pro = () => {
  const location = useLocation();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const isRu = location.pathname.startsWith("/ru");
    setLang(isRu ? "ru" : "en");
    document.title = isRu
      ? "Natively Pro — Создан для получения оффера"
      : "Natively Pro — Built to get the offer";
  }, [location.pathname]);

  return (
    <iframe
      src={`/free-vs-pro.html?lang=${lang}`}
      title="Natively Pro"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        display: "block",
      }}
    />
  );
};

export default Pro;
