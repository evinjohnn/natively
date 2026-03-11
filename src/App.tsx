import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

import { HelmetProvider } from "react-helmet-async";

// Lazy load the pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// SEO Pages
const AIInterviewAssistant = lazy(() => import("./pages/seo/AIInterviewAssistant"));
const CluelyAlternative = lazy(() => import("./pages/seo/CluelyAlternative"));
const AICodingInterviewHelper = lazy(() => import("./pages/seo/AICodingInterviewHelper"));
const LocalAIAssistant = lazy(() => import("./pages/seo/LocalAIAssistant"));

// Blog Pages
const AIInterviewAssistantGuide = lazy(() => import("./pages/blog/AIInterviewAssistantGuide"));
const LocalAIVsCloudAIAssistants = lazy(() => import("./pages/blog/LocalAIVsCloudAIAssistants"));
const HowAICanHelpWithCodingInterviews = lazy(() => import("./pages/blog/HowAICanHelpWithCodingInterviews"));

// NEW LONG TAIL PAGES
const AIAssistantForCodingInterviews = lazy(() => import('./pages/seo/AIAssistantForCodingInterviews'));
const HowAIHelpsInCodingInterviews = lazy(() => import('./pages/seo/HowAIHelpsInCodingInterviews'));
const LocalAICodingAssistant = lazy(() => import('./pages/seo/LocalAICodingAssistant'));
const AIToolsForTechnicalInterviews = lazy(() => import('./pages/seo/AIToolsForTechnicalInterviews'));

// NEW BLOG PAGES
const HowAIInterviewAssistantsWork = lazy(() => import('./pages/blog/HowAIInterviewAssistantsWork'));
const BestAIToolsForCodingInterviews = lazy(() => import('./pages/blog/BestAIToolsForCodingInterviews'));
const PreparingForTechnicalInterviewsWithAI = lazy(() => import('./pages/blog/PreparingForTechnicalInterviewsWithAI'));

// DOCS PAGE
const DocsAIInterviewAssistant = lazy(() => import('./pages/seo/DocsAIInterviewAssistant'));

const queryClient = new QueryClient();

// Simple loading component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Analytics />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai-interview-assistant" element={<AIInterviewAssistant />} />
              <Route path="/cluely-alternative" element={<CluelyAlternative />} />
              <Route path="/ai-coding-interview-helper" element={<AICodingInterviewHelper />} />
              <Route path="/local-ai-assistant" element={<LocalAIAssistant />} />
              
              <Route path="/blog/ai-interview-assistant-guide" element={<AIInterviewAssistantGuide />} />
              <Route path="/blog/local-ai-vs-cloud-ai-assistants" element={<LocalAIVsCloudAIAssistants />} />
              <Route path="/blog/how-ai-can-help-with-coding-interviews" element={<HowAICanHelpWithCodingInterviews />} />
              {/* New SEO Long Tails */}
          <Route path="/ai-assistant-for-coding-interviews" element={<AIAssistantForCodingInterviews />} />
          <Route path="/how-ai-helps-in-coding-interviews" element={<HowAIHelpsInCodingInterviews />} />
          <Route path="/local-ai-coding-assistant" element={<LocalAICodingAssistant />} />
          <Route path="/ai-tools-for-technical-interviews" element={<AIToolsForTechnicalInterviews />} />

          {/* New Blog Pages */}
          <Route path="/blog/how-ai-interview-assistants-work" element={<HowAIInterviewAssistantsWork />} />
          <Route path="/blog/best-ai-tools-for-coding-interviews" element={<BestAIToolsForCodingInterviews />} />
          <Route path="/blog/preparing-for-technical-interviews-with-ai" element={<PreparingForTechnicalInterviewsWithAI />} />

          {/* Docs Pages */}
          <Route path="/docs/ai-interview-assistant" element={<DocsAIInterviewAssistant />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
