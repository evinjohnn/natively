import { MessageSquare, Mail, Users, FileText } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI answers questions for you",
    description: "Get real-time suggested answers based on your meeting context and past data.",
    preview: (
      <div className="mt-6 bg-[#F3F4F6] rounded-[12px] p-3 space-y-2">
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-1" />
          <p className="text-[11px] text-[#374151]">"What was our Q2 growth?"</p>
        </div>
        <div className="bg-white rounded-lg p-2 border border-[#E5E7EB] shadow-sm">
          <p className="text-[10px] font-semibold text-[#16A34A] mb-0.5">Natively Suggestion</p>
          <p className="text-[10px] text-[#6B7280]">Our Q2 growth was 24% year-over-year.</p>
        </div>
      </div>
    ),
  },
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
          {features.map((feature, i) => (
            <div
              key={i}
              className={`rounded-[24px] p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg ${i === 0
                ? "bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white border-none"
                : "bg-white border border-[#E5E7EB] text-[#111827]"
                }`}
            >
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center mb-6 ${i === 0 ? "bg-white/20 text-white" : "bg-[#F3F4F6] text-[#6B7280]"
                }`}>
                <feature.icon size={24} />
              </div>

              <h3 className={`text-[24px] font-medium mb-3 ${i === 0 ? "text-white" : "text-[#111827]"
                } font-geist`}>
                {feature.title}
              </h3>

              <p className={`text-[16px] leading-relaxed mb-8 max-w-[90%] ${i === 0 ? "text-white/80" : "text-[#6B7280]"
                } font-geist`}>
                {feature.description}
              </p>

              {/* Mini UI Preview Container */}
              <div className={`mt-auto rounded-t-[12px] overflow-hidden border-t-4 shadow-sm ${i === 0 ? "bg-white/10 border-white/20" : "bg-[#F9FAFB] border-[#F3F4F6]"
                }`}>
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
