import { Mail, Users, FileText } from "lucide-react";
import heroPoster from "../assets/hero-poster.webp";

const otherFeatures = [
  {
    icon: Mail,
    title: "Instant follow-up emails",
    description: "Automatically draft personalized follow-up emails right after your meeting ends.",
    preview: (
      <div className="mt-6 bg-[#F3F4F6] rounded-[12px] p-4 text-[10px] space-y-2">
        <div className="font-semibold text-[#111827]">Follow-up: Project Titan</div>
        <p className="text-[#6B7280]">Hi Alex, Great meeting today. Here are the action items we discussed...</p>
        <div className="inline-block px-2 py-0.5 bg-[#DCFCE7] text-[#16A34A] rounded-full">Email Drafted</div>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Who are you really talking to?",
    description: "Instant background research on meeting participants with LinkedIn and company data.",
    preview: (
      <div className="mt-6 border border-[#E5E7EB] rounded-[12px] p-3 flex gap-3 items-center bg-white">
        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[12px] font-bold text-[#111827]">JD</div>
        <div>
          <p className="text-[11px] font-semibold text-[#111827]">John Doe</p>
          <p className="text-[10px] text-[#9CA3AF]">CTO at TechFlow</p>
        </div>
      </div>
    ),
  },
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
        <div className="w-full max-w-[340px] flex flex-col gap-2.5">
          {/* "What do I say next?" pill — top right */}
          <div className="flex justify-end">
            <div
              className="px-4 py-2 rounded-lg text-[13px] font-medium text-white"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              }}
            >
              What do I say next?
            </div>
          </div>

          {/* Response bubble — glassmorphic */}
          <div
            className="rounded-xl px-5 py-4"
            style={{
              background: 'rgba(30, 58, 110, 0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-[13px] leading-[1.55] text-white/95 font-normal">
              "I hear you on the integration concerns—that's usually the first thing that comes up. We've actually built direct connectors for the tools you mentioned, and our average setup time is only half a day."
            </p>
          </div>

          {/* Ask bar */}
          <div
            className="rounded-lg px-4 py-2.5 flex items-center gap-2"
            style={{
              background: 'rgba(30, 58, 110, 0.45)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="text-[13px] text-white/50 font-normal">Ask,</span>
            <div className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white/60 font-medium">⌘</span>
              <span className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white/60 font-medium">↵</span>
            </div>
            <span className="text-[13px] text-white/50 font-normal">for Assist</span>
          </div>
        </div>
      </div>

      {/* Bottom edge: participant name chips */}
      <div className="absolute bottom-2 left-4 right-4 flex justify-between">
        <span className="text-[9px] text-white/40 font-medium tracking-wide">all Ray Lee</span>
        <span className="text-[9px] text-white/40 font-medium tracking-wide">all Neel Shanmugam</span>
      </div>
    </div>

    {/* Text content */}
    <div className="p-8 pt-6 shrink-0">
      <h3 className="text-[24px] font-medium mb-3 text-white font-geist">
        AI that answers questions for you, real-time
      </h3>
      <p className="text-[16px] leading-relaxed max-w-[90%] text-white/80 font-geist">
        Cluely uses the screen, transcript, and AI to answer questions for you, live.
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

          {/* Other three feature cards */}
          {otherFeatures.map((feature, i) => (
            <div
              key={i}
              className="rounded-[24px] p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-white border border-[#E5E7EB] text-[#111827]"
            >
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-6 bg-[#F3F4F6] text-[#6B7280]">
                <feature.icon size={24} />
              </div>

              <h3 className="text-[24px] font-medium mb-3 text-[#111827] font-geist">
                {feature.title}
              </h3>

              <p className="text-[16px] leading-relaxed mb-8 max-w-[90%] text-[#6B7280] font-geist">
                {feature.description}
              </p>

              {/* Mini UI Preview Container */}
              <div className="mt-auto rounded-t-[12px] overflow-hidden border-t-4 shadow-sm bg-[#F9FAFB] border-[#F3F4F6]">
                {feature.preview}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
