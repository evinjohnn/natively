import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is Natively really free?",
    answer: (
      <>
        Yes. Natively is an open-source project. You only pay for what you use by
        bringing your own API keys (Gemini, OpenAI, Anthropic, etc.), or use it{" "}
        <strong>100% free</strong> by connecting to a local Ollama instance.
      </>
    ),
  },
  {
    question: "Does Natively work with Zoom, Teams, and Google Meet?",
    answer:
      "Yes. Natively uses a Rust-based system audio capture that works universally across any desktop application, including Zoom, Microsoft Teams, Google Meet, Slack, and Discord.",
  },
  {
    question: "Is my data safe?",
    answer: (
      <>
        Natively is built on <strong>Privacy-by-Design</strong>. All transcripts,
        vector embeddings (Local RAG), and keys are stored locally on your
        machine. We have no backend and collect zero telemetry.
      </>
    ),
  },
  {
    question: "Can I use it for technical interviews?",
    answer:
      "Natively is a powerful assistant for any professional situation. However, users are responsible for complying with their company policies and interview guidelines.",
  },
  {
    question: "Is it truly undetectable?",
    answer: "Yes. Natively runs entirely on your machine and captures system audio directly. It does not join calls as a bot, extensions, or browser plugins, making it 100% invisible to other participants."
  },
  {
    question: "Which platforms does it support?",
    answer: "Natively works with every meeting platform that runs on your computer, including Zoom, Microsoft Teams, Google Meet, Slack Huddles, Discord, and Webex."
  },
  {
    question: "Can I use it with headphones?",
    answer: "Yes! Natively captures the audio stream directly from your system, so it works perfectly whether you're using speakers, wired headphones, or Bluetooth headsets."
  },
  {
    question: "How is this different from Otter or Fireflies?",
    answer: "Unlike Otter or Fireflies, Natively does not send a bot to join your meetings. This means no awkward \"AI Note Taker is recording\" announcements and complete privacy for your conversations."
  },
];

const FAQSection = () => {
  return (
    <section className="section-spacing bg-white">
      <div className="max-content max-w-3xl mx-auto">
        <h2 className="hero-headline !text-black text-[48px] leading-tight mb-12 text-center mx-auto">Frequently asked questions</h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#E5E7EB] py-3">
              <AccordionTrigger className="text-[18px] font-medium font-geist text-gray-900 hover:no-underline py-4 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[16px] leading-relaxed text-gray-600 font-geist pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
