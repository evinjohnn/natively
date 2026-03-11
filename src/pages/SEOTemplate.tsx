import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

interface SEOTemplateProps {
  title: string;
  description: string;
  canonicalPath: string;
  children: React.ReactNode;
  h1: string;
}

export default function SEOTemplate({ title, description, canonicalPath, children, h1 }: SEOTemplateProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title={title} description={description} canonicalPath={canonicalPath} />
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <article className="prose prose-invert lg:prose-xl w-full max-w-none">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 text-foreground tracking-tight">
            {h1}
          </h1>
          <div className="text-muted-foreground leading-relaxed space-y-8">
            {children}
          </div>
          
          <div className="mt-16 bg-card border border-border/50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to try Natively?</h2>
            <p className="text-muted-foreground mb-6">
              Download the definitive local AI interview assistant today and ace your next coding interview with complete privacy.
            </p>
            <a 
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started Free
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
