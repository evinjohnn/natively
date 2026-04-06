import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/components/LocaleLink";

interface SEOTemplateProps {
  title: string;
  description: string;
  canonicalPath: string;
  children: React.ReactNode;
  h1: string;
  ru?: { title: string; description: string; h1?: string; children?: React.ReactNode };
}

export default function SEOTemplate({ title, description, canonicalPath, children, h1, ru }: SEOTemplateProps) {
  const { i18n } = useTranslation();
  const localePath = useLocalePath();
  const isRu = i18n.language === "ru";
  const displayTitle = isRu && ru ? ru.title : title;
  const displayDesc = isRu && ru ? ru.description : description;
  const displayH1 = isRu && ru?.h1 ? ru.h1 : h1;
  const displayChildren = isRu && ru?.children ? ru.children : children;
  const displayPath = localePath(canonicalPath);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title={displayTitle} description={displayDesc} canonicalPath={displayPath} />
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <article className="prose prose-invert lg:prose-xl w-full max-w-none">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 text-foreground tracking-tight">
            {displayH1}
          </h1>
          <div className="text-muted-foreground leading-relaxed space-y-8">
            {displayChildren}
          </div>
          
          <div className="mt-16 bg-card border border-border/50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">{isRu ? "Готовы попробовать Natively?" : "Ready to try Natively?"}</h2>
            <p className="text-muted-foreground mb-6">
              {isRu
                ? "Скачайте локальный ИИ-ассистент для собеседований и пройдите следующее код-собеседование с полной приватностью."
                : "Download the definitive local AI interview assistant today and ace your next coding interview with complete privacy."}
            </p>
            <a
              href={localePath("/")}
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {isRu ? "Начать бесплатно" : "Get Started Free"}
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
