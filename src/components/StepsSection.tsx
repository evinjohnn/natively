import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play, Square, FileCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Play,
    title: "Start Natively",
    description: "One click to activate before or during your meeting. Works with Zoom, Google Meet, Teams.",
    mockup: (
      <div className="mt-4 bg-secondary rounded-xl p-4 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
          <Play className="w-6 h-6 text-primary fill-primary" />
        </div>
      </div>
    ),
  },
  {
    number: "02",
    icon: Square,
    title: "End Natively",
    description: "Stop whenever you're done. Natively processes everything in seconds.",
    mockup: (
      <div className="mt-4 bg-secondary rounded-xl p-4 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 border-2 border-destructive/20 flex items-center justify-center">
          <Square className="w-5 h-5 text-destructive fill-destructive" />
        </div>
      </div>
    ),
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Get notes",
    description: "Receive beautiful, structured notes with action items, decisions, and follow-up emails.",
    mockup: (
      <div className="mt-4 bg-secondary rounded-xl p-4 space-y-1.5">
        {["Summary generated", "Action items extracted", "Email drafted"].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-natively-green/15 flex items-center justify-center">
              <span className="text-natively-green text-[10px]">✓</span>
            </span>
            <span className="text-xs text-foreground">{item}</span>
          </div>
        ))}
      </div>
    ),
  },
];

const StepsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-24 px-6 section-alt">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-[40px] font-bold text-foreground mb-4 leading-tight">
            Meeting notes in <span className="text-gradient">3 steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No complicated setup. No learning curve. Just start, stop, and get your notes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="bg-card border border-border rounded-[20px] p-6 text-center card-hover"
            >
              <span className="text-5xl font-extrabold text-border/80">{step.number}</span>
              <h3 className="text-xl font-semibold text-foreground mt-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
              {step.mockup}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
