import { FileText } from "lucide-react";
import heroPoster from "../assets/hero-poster.webp";
import UniversalLLMDesignCard from "./UniversalLLMDesignCard";
import ResumeJDAwareCard from "./ResumeJDAwareCard";
import PremiumMeetingNotesCard from "./PremiumMeetingNotesCard";

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

const FirstFeatureCard = () => (
  <div className="rounded-[24px] flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-[#6B9BF7] to-[#4D7BF3] text-white border-none aspect-[6/5]">
    {/* Image area with Natively interface overlay */}
    <div className="relative w-full flex-1 min-h-0">
      {/* Hero poster background — cropped portion */}
      <img
        src={heroPoster}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter: 'blur(0.5px)' }}
      />
      {/* Blue gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(107,155,247,0.55) 0%, rgba(77,123,243,0.7) 60%, rgba(77,123,243,0.92) 100%)',
        }}
      />

      {/* Natively interface overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-5 pt-8">
        <div className="w-full max-w-[380px] bg-black/40 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 transform scale-90 sm:scale-100">
          {/* Header */}
          <div className="p-4 pb-2 flex justify-end">
            <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 px-3 py-1.5 rounded-full text-white text-[13px] font-semibold tracking-wide shadow-[0_8px_20px_rgba(37,99,235,0.35)] border border-white/20">
              {/* Gloss effect */}
              <div className="absolute top-0.5 left-2 right-2 h-[45%] rounded-full bg-gradient-to-b from-white/70 to-white/5 blur-[0.5px] pointer-events-none" />
              <span className="relative drop-shadow-sm">What should I say?</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 pb-5">
            <p className="text-white/90 text-[14px] leading-relaxed font-light font-geist text-left mb-6 drop-shadow-md">
              "I hear you on the integration concerns—that's usually the first thing that comes up. We've actually built direct connectors for the tools you mentioned, and our average setup time is only half a day."
            </p>

            {/* Actions Row */}
            <div className="flex items-center justify-between mb-4 text-[11px] text-white/50 font-medium overflow-x-auto gap-4 no-scrollbar">
              <div className="flex items-center gap-1.5 hover:text-white/80 transition-colors cursor-pointer whitespace-nowrap">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                What should I say?
              </div>
              <span className="opacity-30">•</span>
              <div className="flex items-center gap-2 hover:text-white/80 transition-colors cursor-pointer whitespace-nowrap">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                Follow-up
              </div>
              <span className="opacity-30">•</span>
              <div className="flex items-center gap-2 hover:text-white/80 transition-colors cursor-pointer whitespace-nowrap">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Recap
              </div>
              <span className="opacity-30">•</span>
              <div className="flex items-center gap-2 hover:text-white/80 transition-colors cursor-pointer whitespace-nowrap">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Answer
              </div>
            </div>

            {/* Input Field */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Ask anything about the screen or conversation"
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all font-light"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Text content */}
    <div className="p-8 pt-6 shrink-0">
      <h3 className="text-[24px] font-medium mb-3 text-white font-geist">
        AI that answers questions for you, real-time
      </h3>
      <p className="text-[16px] leading-relaxed max-w-[90%] text-white/80 font-geist">
        Natively uses the screen, transcript, and AI to answer questions for you, live.
      </p>
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="section-spacing bg-white" id="features" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-content">
        <div className="text-center mb-16">
          <h2 className="hero-headline !text-black text-[56px] leading-[1.1] mb-6 text-center mx-auto">
            Four ways we make your<br />meetings better
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First card — custom hero poster design */}
          <FirstFeatureCard />

          {/* Second card — Universal LLM Interface */}
          <UniversalLLMDesignCard />

          {/* Third card — Resume & JD Aware Response */}
          <ResumeJDAwareCard />

          {/* Premium Meeting Notes Card */}
          <PremiumMeetingNotesCard />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
