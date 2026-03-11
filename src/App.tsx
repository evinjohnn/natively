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
