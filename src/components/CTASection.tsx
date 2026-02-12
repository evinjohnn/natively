import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const GITHUB_URL = "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-24 px-6 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-[40px] font-bold text-foreground mb-4 leading-tight"
        >
          Meeting AI that helps
          <br />
          during the call, not after
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
        >
          Try Natively on your next meeting today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Button asChild size="lg" className="rounded-full px-10 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 h-12">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              Download Free <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
