import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes Cluely different from other meeting AI tools?",
    answer: "Cluely runs entirely on your local device — no bots join your call, nothing shows up for other participants. Unlike tools like Otter.ai or Fireflies that add a visible 'notetaker' to the meeting, Cluely is 100% undetectable. Plus, it provides real-time AI assistance during the call, not just notes after.",
  },
  {
    question: "Who is Cluely for?",
    answer: "Cluely is for professionals who want AI-powered meeting assistance without compromising discretion. Whether you're in sales, consulting, management, or any role that involves frequent meetings, Cluely helps you stay sharp, prepared, and productive.",
  },
  {
    question: "Is Cluely free to use?",
    answer: "Yes! Cluely offers a free tier with core features including live transcription, meeting notes, and basic AI assistance. Premium features like unlimited meetings, advanced analytics, and team collaboration are available with a paid plan.",
  },
  {
    question: "Which languages does Cluely support?",
    answer: "Cluely supports 12+ languages including English, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese (Mandarin), Hindi, Dutch, and Russian. We're constantly adding more languages based on user demand.",
  },
  {
    question: "Does Cluely offer enterprise support?",
    answer: "Yes, we offer enterprise plans with dedicated support, custom integrations, SSO, admin controls, and advanced security features. Contact our sales team for a tailored solution for your organization.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about Cluely.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-6 data-[state=open]:bg-secondary/50"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
