import { FileText } from "lucide-react";
import heroPoster from "../assets/hero-poster.webp";
import UniversalLLMDesignCard from "./UniversalLLMDesignCard";
import ResumeJDAwareCard from "./ResumeJDAwareCard";
import PremiumMeetingNotesCard from "./PremiumMeetingNotesCard";
import ListeningCard from "./ListeningCard";
import NativelyInterfaceCard from "./NativelyInterfaceCard";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

const otherFeatures = [
  {
    icon: FileText,
    title: "Beautiful meeting notes",
    description: "Structured, searchable notes with action items, decisions, and key moments.",
    preview: (
      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#DCFCE7] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
          </div>
          <p className="text-[10px] text-[#374151]">Decision: Move deadline to Oct 15</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#DCFCE7] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
          </div>
          <p className="text-[10px] text-[#374151]">Action: Send contract to legal</p>
        </div>
      </div>
    ),
  },
];

const FirstFeatureCard = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  return (
    <div className="rounded-[28px] sm:rounded-[36px] flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-[#6B9BF7] to-[#4D7BF3] text-white border-none aspect-[4/5] sm:aspect-[6/6] md:aspect-[6/5]">
      {/* Hero poster background */}
      <div className="relative flex-1 min-h-0">
        <img
          src={heroPoster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'blur(0.5px)' }}
        />
        {/* Blue gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(107,155,247,0.55) 0%, rgba(77,123,243,0.7) 60%, rgba(77,123,243,0.92) 100%)' }}
        />
        {/* Natively interface */}
        <div className="absolute inset-0 flex items-center justify-center px-4 pt-6 pb-0 sm:p-10 sm:pb-0">
          {isMobile ? (
            <div className="w-full max-w-[360px]">
              <NativelyInterfaceCard isStatic isMobile hideMessages spreadHotkeys className="w-full" />
            </div>
          ) : (
            <div className="w-full max-w-[500px] sm:scale-[0.909] origin-center">
              <NativelyInterfaceCard isStatic />
            </div>
          )}
        </div>
      </div>

      {/* Text content */}
      <div className="p-5 pt-4 sm:p-8 sm:pt-4 shrink-0">
        <h3 className="text-[22px] sm:text-[26px] md:text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] mb-2 sm:mb-3 text-white font-geist">
          {t('features.card1_title')}
        </h3>
        <p className="text-[14px] sm:text-[16px] leading-relaxed max-w-full sm:max-w-[90%] text-white/80 font-geist">
          {t('features.card1_desc')}
        </p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="section-spacing bg-white" id="features" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-content">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="hero-headline !text-black text-[32px] sm:text-[44px] md:text-[80px] leading-[1.1] mb-6 text-center mx-auto" dangerouslySetInnerHTML={{ __html: t('features.title') }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* First card — custom hero poster design */}
          <FirstFeatureCard />

          {/* Second card — Universal LLM Interface */}
          <UniversalLLMDesignCard />

          {/* Premium Meeting Notes Card */}
          <PremiumMeetingNotesCard />

          {/* Third card — Resume & JD Aware Response */}
          <ResumeJDAwareCard />

          {/* Listening + Assist split card — full width */}
          <ListeningCard />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
