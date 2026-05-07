import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import LanguageRouter from "@/components/LanguageRouter";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Pro = lazy(() => import("./pages/Pro"));
const RefundPolicy = lazy(() => import("./pages/legal/RefundPolicy"));
const TermsAndConditions = lazy(() => import("./pages/legal/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));

const AIInterviewAssistant = lazy(() => import("./pages/seo/AIInterviewAssistant"));
const NativelyAlternative = lazy(() => import("./pages/seo/NativelyAlternative"));
const AICodingInterviewHelper = lazy(() => import("./pages/seo/AICodingInterviewHelper"));
const LocalAIAssistant = lazy(() => import("./pages/seo/LocalAIAssistant"));

const AIInterviewAssistantGuide = lazy(() => import("./pages/blog/AIInterviewAssistantGuide"));
const LocalAIVsCloudAIAssistants = lazy(() => import("./pages/blog/LocalAIVsCloudAIAssistants"));
const HowAICanHelpWithCodingInterviews = lazy(() => import("./pages/blog/HowAICanHelpWithCodingInterviews"));

const AIAssistantForCodingInterviews = lazy(() => import('./pages/seo/AIAssistantForCodingInterviews'));
const HowAIHelpsInCodingInterviews = lazy(() => import('./pages/seo/HowAIHelpsInCodingInterviews'));
const LocalAICodingAssistant = lazy(() => import('./pages/seo/LocalAICodingAssistant'));
const AIToolsForTechnicalInterviews = lazy(() => import('./pages/seo/AIToolsForTechnicalInterviews'));

const HowAIInterviewAssistantsWork = lazy(() => import('./pages/blog/HowAIInterviewAssistantsWork'));
const BestAIToolsForCodingInterviews = lazy(() => import('./pages/blog/BestAIToolsForCodingInterviews'));
const PreparingForTechnicalInterviewsWithAI = lazy(() => import('./pages/blog/PreparingForTechnicalInterviewsWithAI'));

const IsCluelySafe = lazy(() => import('./pages/blog/IsCluelySafe'));
const BestAIInterviewAssistants = lazy(() => import('./pages/blog/BestAIInterviewAssistants'));

const LeetCodeAIHelper = lazy(() => import('./pages/seo/LeetCodeAIHelper'));
const OfflineAIInterview = lazy(() => import('./pages/seo/OfflineAIInterview'));

const DocsAIInterviewAssistant = lazy(() => import('./pages/seo/DocsAIInterviewAssistant'));

const FinalRoundAIAlternative = lazy(() => import('./pages/seo/FinalRoundAIAlternative'));
const NativelyVsCluely = lazy(() => import('./pages/seo/NativelyVsCluely'));
const InterviewCopilot = lazy(() => import('./pages/seo/InterviewCopilot'));
const FreeAIInterviewAssistant = lazy(() => import('./pages/seo/FreeAIInterviewAssistant'));

const queryClient = new QueryClient();

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
            <LanguageRouter />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pro" element={<Pro />} />
              <Route path="/refundpolicy" element={<RefundPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/termsandconditions" element={<TermsAndConditions canonicalPath="/termsandconditions" />} />
              <Route path="/nativelypro/t&c" element={<TermsAndConditions canonicalPath="/termsandconditions" />} />
              <Route path="/nativelyapi/t&c" element={<TermsAndConditions canonicalPath="/termsandconditions" />} />
              <Route path="/ai-interview-assistant" element={<AIInterviewAssistant />} />
              <Route path="/cluely-alternative" element={<NativelyAlternative />} />
              <Route path="/ai-coding-interview-helper" element={<AICodingInterviewHelper />} />
              <Route path="/local-ai-assistant" element={<LocalAIAssistant />} />

              <Route path="/blog/ai-interview-assistant-guide" element={<AIInterviewAssistantGuide />} />
              <Route path="/blog/local-ai-vs-cloud-ai-assistants" element={<LocalAIVsCloudAIAssistants />} />
              <Route path="/blog/how-ai-can-help-with-coding-interviews" element={<HowAICanHelpWithCodingInterviews />} />

              <Route path="/ai-assistant-for-coding-interviews" element={<AIAssistantForCodingInterviews />} />
              <Route path="/how-ai-helps-in-coding-interviews" element={<HowAIHelpsInCodingInterviews />} />
              <Route path="/local-ai-coding-assistant" element={<LocalAICodingAssistant />} />
              <Route path="/ai-tools-for-technical-interviews" element={<AIToolsForTechnicalInterviews />} />

              <Route path="/blog/how-ai-interview-assistants-work" element={<HowAIInterviewAssistantsWork />} />
              <Route path="/blog/best-ai-tools-for-coding-interviews" element={<BestAIToolsForCodingInterviews />} />
              <Route path="/blog/preparing-for-technical-interviews-with-ai" element={<PreparingForTechnicalInterviewsWithAI />} />

              <Route path="/docs/ai-interview-assistant" element={<DocsAIInterviewAssistant />} />

              <Route path="/finalroundai-alternative" element={<FinalRoundAIAlternative />} />
              <Route path="/natively-vs-cluely" element={<NativelyVsCluely />} />
              <Route path="/interview-copilot" element={<InterviewCopilot />} />
              <Route path="/free-ai-interview-assistant" element={<FreeAIInterviewAssistant />} />
              <Route path="/leetcode-ai-helper" element={<LeetCodeAIHelper />} />
              <Route path="/offline-ai-interview" element={<OfflineAIInterview />} />

              <Route path="/blog/is-cluely-safe" element={<IsCluelySafe />} />
              <Route path="/blog/best-ai-interview-assistants" element={<BestAIInterviewAssistants />} />

              <Route path="/ru" element={<Index />} />
              <Route path="/ru/pro" element={<Pro />} />
              <Route path="/ru/ai-interview-assistant" element={<AIInterviewAssistant />} />
              <Route path="/ru/cluely-alternative" element={<NativelyAlternative />} />
              <Route path="/ru/ai-coding-interview-helper" element={<AICodingInterviewHelper />} />
              <Route path="/ru/local-ai-assistant" element={<LocalAIAssistant />} />

              <Route path="/ru/blog/ai-interview-assistant-guide" element={<AIInterviewAssistantGuide />} />
              <Route path="/ru/blog/local-ai-vs-cloud-ai-assistants" element={<LocalAIVsCloudAIAssistants />} />
              <Route path="/ru/blog/how-ai-can-help-with-coding-interviews" element={<HowAICanHelpWithCodingInterviews />} />

              <Route path="/ru/ai-assistant-for-coding-interviews" element={<AIAssistantForCodingInterviews />} />
              <Route path="/ru/how-ai-helps-in-coding-interviews" element={<HowAIHelpsInCodingInterviews />} />
              <Route path="/ru/local-ai-coding-assistant" element={<LocalAICodingAssistant />} />
              <Route path="/ru/ai-tools-for-technical-interviews" element={<AIToolsForTechnicalInterviews />} />

              <Route path="/ru/blog/how-ai-interview-assistants-work" element={<HowAIInterviewAssistantsWork />} />
              <Route path="/ru/blog/best-ai-tools-for-coding-interviews" element={<BestAIToolsForCodingInterviews />} />
              <Route path="/ru/blog/preparing-for-technical-interviews-with-ai" element={<PreparingForTechnicalInterviewsWithAI />} />

              <Route path="/ru/docs/ai-interview-assistant" element={<DocsAIInterviewAssistant />} />

              <Route path="/ru/finalroundai-alternative" element={<FinalRoundAIAlternative />} />
              <Route path="/ru/natively-vs-cluely" element={<NativelyVsCluely />} />
              <Route path="/ru/interview-copilot" element={<InterviewCopilot />} />
              <Route path="/ru/free-ai-interview-assistant" element={<FreeAIInterviewAssistant />} />
              <Route path="/ru/leetcode-ai-helper" element={<LeetCodeAIHelper />} />
              <Route path="/ru/offline-ai-interview" element={<OfflineAIInterview />} />

              <Route path="/ru/blog/is-cluely-safe" element={<IsCluelySafe />} />
              <Route path="/ru/blog/best-ai-interview-assistants" element={<BestAIInterviewAssistants />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
