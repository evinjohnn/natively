import { useEffect } from "react";

/**
 * /pro — serves the Free vs Pro interactive demo page.
 * The demo is a self-contained HTML file in /public/free-vs-pro.html.
 * We render it via a full-screen iframe so the animation, JS, and CSS
 * all work exactly as authored without any React interference.
 */
const Pro = () => {
  useEffect(() => {
    document.title = "Natively Pro — Built to get the offer";
  }, []);

  return (
    <iframe
      src="/free-vs-pro.html"
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
