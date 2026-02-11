import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ShieldCheck, Eye } from "lucide-react";

const ComparisonSection = () => {
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
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Undetectable
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            No meeting bots.
            <br />
            <span className="text-gradient">100% Undetectable.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Unlike other tools that add visible bots to your call, Natively runs silently on your device.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Other Tools */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-destructive/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-foreground">Other AI Notetakers</h3>
            </div>
            {/* Mock meeting with bot */}
            <div className="bg-secondary rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {["You", "Sarah"].map((name) => (
                  <div key={name} className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-lg p-2">
                <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                  <span className="text-[10px] text-destructive">🤖</span>
                </div>
                <span className="text-xs text-destructive font-medium">Notetaker Bot has joined</span>
              </div>
              <p className="text-[11px] text-muted-foreground italic">Everyone can see the bot is recording...</p>
            </div>
          </motion.div>

          {/* Cluely */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border border-primary/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Natively</h3>
            </div>
            {/* Clean meeting */}
            <div className="bg-secondary rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {["You", "Sarah"].map((name) => (
                  <div key={name} className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg p-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-[10px] text-primary">✓</span>
                </div>
                <span className="text-xs text-primary font-medium">Natively running locally</span>
              </div>
              <p className="text-[11px] text-muted-foreground italic">No one knows you're using AI assistance</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
