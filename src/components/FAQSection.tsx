import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does Natively stay undetectable?",
    answer: "Natively runs locally on your computer and captures audio from your system. No bots join the meeting, making it 100% invisible to other participants.",
  },
  {
    question: "Who is Natively for?",
    answer: "Natively is designed for professionals, engineers, and researchers who need high-quality transcription and AI assistance without the distraction of visible bots.",
  },
  {
    question: "Is Natively free?",
    answer: "Yes, we offer a generous free tier for individuals. Professional plans are available for power users who need advanced features.",
  },
  {
    question: "What languages are supported?",
    answer: "We support over 12 major languages including English, Spanish, French, German, and more with industry-leading accuracy.",
  },
  {
    question: "Can I talk to customer support?",
    answer: "Absolutely. Our team is available via email and Discord to help you with any questions or technical issues.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-spacing bg-white">
      <div className="max-content max-w-3xl mx-auto">
        <h2 className="hero-headline !text-black text-[48px] leading-tight mb-12 text-center">Frequently asked questions</h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#E5E7EB] py-2">
              <AccordionTrigger className="card-title-geist hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-small leading-relaxed pb-4">
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
