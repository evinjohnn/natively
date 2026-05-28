import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { LocaleLink } from "@/components/LocaleLink";

interface LegalPageProps {
  title: string;
  heading: string;
  description: string;
  canonicalPath: string;
  lastUpdated: string;
  toc?: { id: string; label: string }[];
  children: React.ReactNode;
}

export default function LegalPage({
  title,
  heading,
  description,
  canonicalPath,
  lastUpdated,
  toc,
  children,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title={title} description={description} canonicalPath={canonicalPath} />
      <Navbar />
      <main className="flex-1 pt-32 pb-[25vh] px-6 max-w-[42rem] mx-auto w-full print:pt-8 print:pb-8 print:max-w-none">
        <article className="w-full text-[#111827] font-geist">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {heading}
          </h1>
          <p className="text-sm italic text-[#6B7280] mb-10">
            Last updated: {lastUpdated}
          </p>

          {toc && toc.length > 0 && (
            <details className="mb-10 rounded-lg border border-border/60 bg-secondary/40 print:hidden">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-[#111827]">
                Jump to a section
              </summary>
              <nav className="px-4 pb-4">
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-[#374151]">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="hover:text-primary">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          )}

          <div className="space-y-6 leading-relaxed text-[#374151] text-[16px]">
            {children}
          </div>

          <div className="mt-16 pt-8 border-t border-border/40 print:hidden">
            <LocaleLink to="/" className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors">
              ← Back to home
            </LocaleLink>
          </div>
        </article>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

export const legalProse = {
  h2: "text-2xl md:text-3xl font-semibold text-[#111827] mt-12 mb-4 tracking-tight scroll-mt-32",
  h3: "text-lg md:text-xl font-semibold text-[#111827] mt-8 mb-3 scroll-mt-32",
  p: "text-[#374151] leading-relaxed",
  ul: "list-disc pl-6 space-y-2 text-[#374151]",
  ol: "list-decimal pl-6 space-y-2 text-[#374151]",
  hr: "my-12 border-t border-border/60",
  a: "text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary",
  strong: "font-semibold text-[#111827]",
  code: "px-1.5 py-0.5 rounded bg-secondary text-[#111827] text-[0.9em] font-mono",
  blockquote: "border-l-2 border-border/60 pl-4 italic text-[#4B5563]",
};

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-lg border-l-4 border-primary bg-primary/5 px-5 py-4 text-[#111827]">
      {children}
    </div>
  );
}
