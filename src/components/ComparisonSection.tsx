import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ShieldCheck, Eye } from "lucide-react";

const ComparisonSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-24 px-6 undetectable-bg">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-natively-green/10 border border-natively-green/20 px-4 py-1.5 text-xs font-medium text-natively-green mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Undetectable
          </span>
          <h2 className="text-3xl md:text-[40px] font-bold text-foreground mb-4 leading-tight">
            No meeting bots.
            <br />
            100% Undetectable.
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
            className="bg-card border border-destructive/15 rounded-[20px] p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-foreground">Other AI Notetakers</h3>
            </div>
            <div className="bg-secondary rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {["You", "Sarah"].map((name) => (
                  <div key={name} className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-destructive/8 border border-destructive/15 rounded-lg p-2">
                <div className="w-6 h-6 rounded-full bg-destructive/15 flex items-center justify-center">
                  <span className="text-[10px] text-destructive">🤖</span>
                </div>
                <span className="text-xs text-destructive font-medium">Notetaker Bot has joined</span>
              </div>
              <p className="text-[11px] text-muted-foreground italic">Everyone can see the bot is recording...</p>
            </div>
          </motion.div>

          {/* Natively */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border border-natively-green/15 rounded-[20px] p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-natively-green" />
              <h3 className="font-semibold text-foreground">Natively</h3>
            </div>
            <div className="bg-secondary rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {["You", "Sarah"].map((name) => (
                  <div key={name} className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-natively-green/8 border border-natively-green/15 rounded-lg p-2">
                <div className="w-6 h-6 rounded-full bg-natively-green/15 flex items-center justify-center">
                  <span className="text-[10px] text-natively-green">✓</span>
                </div>
                <span className="text-xs text-natively-green font-medium">Natively running locally</span>
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
