import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const GITHUB_URL = "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden hero-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            Now available for macOS & Windows
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-gradient">#1 Undetectable AI</span>
          <br />
          <span className="text-foreground">for Meetings</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Real-time AI meeting assistant that provides live transcription, smart answers, and beautiful notes — completely invisible to others.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-4 mb-16"
        >
          <Button asChild size="lg" className="rounded-full px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              Download Free <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </Button>
        </motion.div>

        {/* Animated Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* macOS Window */}
          <div className="rounded-2xl overflow-hidden mockup-shadow bg-cluely-dark">
            {/* Title Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-foreground/5 border-b border-border/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-[hsl(45,80%,55%)]" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-muted-foreground/60">Zoom Meeting</span>
              </div>
            </div>

            {/* Meeting UI */}
            <div className="relative bg-[hsl(220,20%,8%)] p-6 min-h-[400px] flex items-center justify-center">
              {/* Video Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {[
                  { name: "Sarah Chen", initials: "SC", bg: "hsl(200,60%,25%)" },
                  { name: "Alex Rivera", initials: "AR", bg: "hsl(160,50%,25%)" },
                  { name: "Jordan Park", initials: "JP", bg: "hsl(280,50%,25%)" },
                  { name: "You", initials: "YO", bg: "hsl(220,50%,25%)" },
                ].map((person, i) => (
                  <motion.div
                    key={person.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="aspect-video rounded-lg flex flex-col items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: person.bg }}
                  >
                    <div className="w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-primary-foreground font-semibold text-sm mb-1">
                      {person.initials}
                    </div>
                    <span className="text-primary-foreground/80 text-xs">{person.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Cluely Overlay Panel */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute right-4 top-4 bottom-4 w-72 rounded-xl bg-background/95 backdrop-blur-xl border border-border shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Panel Header */}
                <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-[10px] font-bold">N</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">Natively AI</span>
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
                    Live
                  </span>
                </div>

                {/* Panel Content */}
                <div className="flex-1 p-4 space-y-3 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="bg-secondary rounded-lg p-3"
                  >
                    <p className="text-[11px] text-muted-foreground mb-1">Suggested Answer</p>
                    <p className="text-xs text-foreground leading-relaxed">
                      Based on last quarter's data, our conversion rate improved by 23% after implementing the new onboarding flow.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    className="bg-secondary rounded-lg p-3"
                  >
                    <p className="text-[11px] text-muted-foreground mb-1">Key Point Detected</p>
                    <p className="text-xs text-foreground leading-relaxed">
                      Sarah mentioned budget review deadline is March 15th.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.1 }}
                    className="space-y-1"
                  >
                    <p className="text-[11px] text-muted-foreground">Live Transcription</p>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      "...so if we look at the numbers from Q4, I think we can agree that the strategy is working..."
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Dock */}
            <div className="flex items-center justify-center gap-2 py-3 bg-[hsl(220,20%,8%)] border-t border-border/10">
              {["🌐", "📹", "⚙️", "📁", "💬"].map((icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.05 }}
                  className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center text-lg hover:bg-background/20 transition-colors cursor-pointer"
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
