import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

const TranscriptionSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const languages = useCountUp(12, 1500, isVisible);
  const responseTime = useCountUp(300, 1500, isVisible);
  const accuracy = useCountUp(95, 1500, isVisible);

  const transcriptLines = [
    { time: "10:42", speaker: "Sarah", text: "Let's review the quarterly results and compare them with our projections." },
    { time: "10:43", speaker: "Alex", text: "Revenue came in at $2.4 million, which is 18% above our initial target." },
    { time: "10:43", speaker: "Sarah", text: "That's great. What about the customer acquisition cost?" },
    { time: "10:44", speaker: "Jordan", text: "CAC dropped by 12% thanks to the new referral program we launched in October." },
  ];

  return (
    <section ref={ref} className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Real-time <span className="text-gradient">transcription</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Industry-leading speech recognition with multi-language support.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Transcription UI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              <span className="text-sm font-medium text-foreground">Live Transcription</span>
            </div>
            <div className="p-4 space-y-4 max-h-80 overflow-hidden">
              {transcriptLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.3, duration: 0.4 }}
                  className="flex gap-3"
                >
                  <span className="text-[10px] text-muted-foreground w-10 shrink-0 pt-0.5">{line.time}</span>
                  <div>
                    <span className="text-xs font-semibold text-primary">{line.speaker}</span>
                    <p className="text-sm text-foreground leading-relaxed">{line.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {[
              { value: `${languages}+`, label: "Languages supported", sublabel: "Including English, Spanish, French, German, Japanese, and more" },
              { value: `${responseTime}ms`, label: "Response time", sublabel: "Near-instant processing with on-device acceleration" },
              { value: `${accuracy}%`, label: "Transcription accuracy", sublabel: "Industry-leading accuracy powered by latest AI models" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-start gap-4">
                <span className="text-4xl md:text-5xl font-extrabold text-primary tabular-nums min-w-[120px]">
                  {stat.value}
                </span>
                <div>
                  <p className="text-base font-semibold text-foreground">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TranscriptionSection;
