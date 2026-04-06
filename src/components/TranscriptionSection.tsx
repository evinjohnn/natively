import transcriptImg from "@/assets/trancript.webp";
import { useTranslation } from "react-i18next";

const TranscriptionSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white">
      <div className="max-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Transcript Image */}
          <div className="rounded-[40px] overflow-hidden aspect-[4/5] bg-gray-100 relative">
            <img
              src={transcriptImg}
              alt="Live Transcript UI"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover scale-110 translate-y-3 translate-x-2"
            />
          </div>

          {/* Stats Blocks */}
          <div className="flex flex-col pl-0 pt-8 md:pl-4 md:pt-0">
            <h2 className="hero-headline !text-black text-[32px] md:text-[80px] md:leading-[1.1] leading-tight mb-6 text-left">{t('transcription.title')}</h2>

            <div className="flex flex-col">
              <div className="flex gap-8 py-6 border-t border-gray-100 first:border-t-0 items-start">
                <div className="w-[140px] shrink-0 text-[48px] font-medium text-[#111827] leading-none font-geist">{t('transcription.providers_count')}</div>
                <div>
                  <h3 className="text-[24px] font-medium text-[#111827] mb-2 font-geist">{t('transcription.providers_title')}</h3>
                  <p className="body-text-geist text-[#6B7280] text-[16px] leading-relaxed">
                    {t('transcription.providers_desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-8 py-6 border-t border-gray-100 items-start">
                <div className="w-[140px] shrink-0 text-[48px] font-medium text-[#111827] leading-none font-geist">
                  300<span className="text-[24px]">ms</span>
                </div>
                <div>
                  <h3 className="text-[24px] font-medium text-[#111827] mb-2 font-geist">{t('transcription.response_time_title')}</h3>
                  <p className="body-text-geist text-[#6B7280] text-[16px] leading-relaxed">
                    {t('transcription.response_time_desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-8 py-6 border-t border-gray-100 items-start">
                <div className="w-[140px] shrink-0 text-[48px] font-medium text-[#111827] leading-none font-geist">95%</div>
                <div>
                  <h3 className="text-[24px] font-medium text-[#111827] mb-2 font-geist">{t('transcription.accuracy_title')}</h3>
                  <p className="body-text-geist text-[#6B7280] text-[16px] leading-relaxed">
                    {t('transcription.accuracy_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranscriptionSection;
