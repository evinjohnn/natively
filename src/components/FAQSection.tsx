import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const { t } = useTranslation();

  const faqKeys = [
    { q: "faq.q1", a: "faq.a1" },
    { q: "faq.q2", a: "faq.a2" },
    { q: "faq.q3", a: "faq.a3" },
    { q: "faq.q4", a: "faq.a4" },
    { q: "faq.q5", a: "faq.a5" },
    { q: "faq.q6", a: "faq.a6" },
    { q: "faq.q7", a: "faq.a7" },
    { q: "faq.q8", a: "faq.a8" },
  ];
  return (
    <section className="section-spacing bg-white">
      <div className="max-content max-w-3xl mx-auto">
        <h2 className="hero-headline !text-black text-[32px] md:text-[80px] leading-tight mb-12 text-center mx-auto">{t('faq.title')}</h2>

        <Accordion type="single" collapsible className="w-full">
          {faqKeys.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#E5E7EB] py-3">
              <AccordionTrigger className="text-[18px] font-medium font-geist text-gray-900 hover:no-underline py-4 text-left">
                {t(faq.q)}
              </AccordionTrigger>
              <AccordionContent className="text-[16px] leading-relaxed text-gray-600 font-geist pb-4">
                <span dangerouslySetInnerHTML={{ __html: t(faq.a) }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
