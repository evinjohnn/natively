import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, Mail, Users, FileText } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI answers questions for you",
    description: "Get real-time suggested answers based on your meeting context and past data.",
    mockup: (
      <div className="mt-4 space-y-2">
        <div className="flex gap-2 items-start">
          <div className="w-6 h-6 rounded-full bg-[hsl(200,60%,50%)] flex items-center justify-center text-[10px] text-primary-foreground shrink-0">S</div>
          <div className="bg-secondary rounded-lg rounded-tl-none px-3 py-2 text-xs text-foreground">"What was our Q4 revenue?"</div>
        </div>
        <div className="flex gap-2 items-start justify-end">
          <div className="bg-primary/10 border border-primary/20 rounded-lg rounded-tr-none px-3 py-2 text-xs text-foreground">
            <span className="text-primary text-[10px] font-medium block mb-0.5">AI Suggestion</span>
            "$2.4M, up 18% YoY"
          </div>
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground shrink-0">C</div>
        </div>
      </div>
    ),
  },
  {
    icon: Mail,
    title: "Instant follow-up emails",
    description: "Automatically draft personalized follow-up emails right after your meeting ends.",
    mockup: (
      <div className="mt-4 bg-secondary rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center"><Mail className="w-2.5 h-2.5 text-primary" /></div>
          <span className="text-xs font-medium text-foreground">Follow-up: Q4 Review</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">Hi Sarah, Thank you for the productive meeting today. As discussed, here are the key action items...</p>
        <div className="flex gap-2">
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">Auto-generated</span>
        </div>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Who are you really talking to?",
    description: "Instant background research on meeting participants with LinkedIn and company data.",
    mockup: (
      <div className="mt-4 bg-secondary rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[hsl(280,50%,40%)] flex items-center justify-center text-primary-foreground text-sm font-semibold">JD</div>
          <div>
            <p className="text-xs font-medium text-foreground">Jane Doe</p>
            <p className="text-[11px] text-muted-foreground">VP of Engineering, Acme Inc.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-[10px] text-muted-foreground">🏢 500+ employees</div>
          <div className="text-[10px] text-muted-foreground">📍 San Francisco</div>
          <div className="text-[10px] text-muted-foreground">💼 12 years exp.</div>
          <div className="text-[10px] text-muted-foreground">🔗 2nd connection</div>
        </div>
      </div>
    ),
  },
  {
    icon: FileText,
    title: "Beautiful meeting notes",
    description: "Structured, searchable notes with action items, decisions, and key moments.",
    mockup: (
      <div className="mt-4 bg-secondary rounded-lg p-3 space-y-2">
        <p className="text-xs font-medium text-foreground">📋 Meeting Notes — Q4 Review</p>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="text-primary text-xs">✓</span>
            <span className="text-[11px] text-foreground">Revenue hit $2.4M target</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary text-xs">✓</span>
            <span className="text-[11px] text-foreground">New onboarding flow approved</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-destructive text-xs">→</span>
            <span className="text-[11px] text-foreground">Action: Budget proposal by Mar 15</span>
          </div>
        </div>
      </div>
    ),
  },
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Four ways we make your
            <br />
            <span className="text-gradient">meetings better</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From real-time answers to automated follow-ups, Cluely transforms how you handle meetings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              {feature.mockup}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
