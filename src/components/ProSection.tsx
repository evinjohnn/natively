import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProSection = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState(0);

  return (
    <section className="py-24 bg-white hidden md:block">
      <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="text-center mb-16 flex flex-col md:flex-row items-center justify-between w-full">
          <div className="flex-1"></div>
          <div className="flex flex-col items-center flex-1 whitespace-nowrap">
            <p className="text-[#f59e0b] font-medium mb-4 uppercase tracking-wider">{t('pro.label')}</p>
            <h2 className="hero-headline !text-black text-[36px] md:text-[64px] leading-[1.1] mb-4 text-center">
              {t('pro.title')}
            </h2>
          </div>
          <div className="flex-1 flex justify-end">
            <button 
              onClick={() => setKey(k => k + 1)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              {t('pro.replay')}
            </button>
          </div>
        </div>

        <div className="w-full h-[700px] rounded-[32px] overflow-hidden border border-gray-200 shadow-2xl bg-black">
          <iframe 
            key={key}
            src="/free-vs-pro.html" 
            className="w-full h-full border-none"
            title="Natively Free vs Pro Demo"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default ProSection;
