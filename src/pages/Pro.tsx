import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import ProComparison from "@/components/ProComparison";
import { useTranslation } from "react-i18next";

const Pro = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const isRu = location.pathname.startsWith("/ru");
    setLang(isRu ? "ru" : "en");
    document.title = isRu
      ? "Natively Pro — Создан для получения оффера"
      : "Natively Pro — Built to get the offer";
  }, [location.pathname]);

  const isRu = lang === "ru";

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col">
      <SEOHead 
        title={isRu ? "Natively Pro vs Free | Интерактивное демо и сравнение" : "Natively Pro vs Free | Interactive Demo & Comparison"}
        description={isRu 
          ? "Сравните Natively Free (Ollama/BYOK) и Natively Pro. Проверьте разницу в ответах, транскрипции и функциях для переговоров по зарплате."
          : "Compare Natively Free (Ollama/BYOK) and Natively Pro. Try the live interactive simulation to compare real-time transcription, answers, and negotiation features."}
        canonicalPath={isRu ? "/ru/pro" : "/pro"}
      />
      <Navbar />
      
      <main className="flex-1 w-full pt-28 pb-16 px-4 md:px-8 max-w-[1280px] mx-auto flex flex-col">
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center">
          <div className="mb-4">
            <span className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full text-[10px] font-bold text-white shadow-[0_4px_12px_rgba(99,102,241,0.2),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden">
              <div className="absolute top-0.5 left-1 right-1 h-[45%] rounded-full bg-gradient-to-b from-white/50 to-white/5 blur-[0.3px] pointer-events-none" />
              <span className="relative z-10 drop-shadow-sm uppercase tracking-[0.15em]">
                {isRu ? "Сравнение возможностей" : "Interactive Simulation"}
              </span>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-4 font-geist">
            {isRu ? "Создан получить оффер." : "Built to get the offer."}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-geist">
            {isRu 
              ? "Посмотрите живое сравнение в реальном времени. Узнайте, как Natively Pro адаптирует ответы под ваше резюме и выбранную компанию, в то время как бесплатная версия использует общие модели."
              : "Watch the real-time simulation. See how Natively Pro tailors answers specifically to your resume, YOE, and target company in real time, while the free version runs general local models."}
          </p>
        </div>

        {/* The Premium Interactive Comparison Simulator */}
        <div className="w-full">
          <ProComparison />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pro;
