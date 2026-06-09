import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import LanguageRouter from "@/components/LanguageRouter";
import { pages } from "@/routes";

// Preloadable lazy route components (see src/routes.tsx + lazyWithPreload).
// main.tsx preloads the matching chunk before hydration so it renders synchronously
// and Suspense never shows its fallback (which would mismatch the prerendered HTML).
const {
  Index, NotFound, Pro, RefundPolicy, TermsAndConditions, PrivacyPolicy,
  AIInterviewAssistant, NativelyAlternative, AICodingInterviewHelper, LocalAIAssistant,
  AIInterviewAssistantGuide, LocalAIVsCloudAIAssistants, HowAICanHelpWithCodingInterviews,
  AIAssistantForCodingInterviews, HowAIHelpsInCodingInterviews, LocalAICodingAssistant,
  AIToolsForTechnicalInterviews, HowAIInterviewAssistantsWork, BestAIToolsForCodingInterviews,
  PreparingForTechnicalInterviewsWithAI, IsCluelySafe, BestAIInterviewAssistants,
  LeetCodeAIHelper, OfflineAIInterview, DocsAIInterviewAssistant, FinalRoundAIAlternative,
  NativelyVsCluely, InterviewCopilot, FreeAIInterviewAssistant, NativelyVsLockedInAI,
  NativelyVsInterviewCoder, UndetectableInterviewAI,
  AIMeetingAssistant, AINoteTaker, SalesCallAssistant, LectureNoteTaker,
  NativelyVsFireflies, NativelyVsOtter, FirefliesAlternative, OtterAlternative,
  SystemDesignInterviewAssistant, BehavioralInterviewAssistant, InterviewAnswerGenerator, LiveInterviewAssistant,
  InterviewQuestionsSWE, InterviewQuestionsPM, InterviewQuestionsDS, InterviewQuestionsAI,
  InterviewQuestionsGoogleSWE, InterviewQuestionsMetaSWE, InterviewQuestionsAmazonSWE, InterviewQuestionsMicrosoftSWE,
  SystemDesignUber, SystemDesignWhatsApp, SystemDesignNetflix, SystemDesignTwitter,
} = pages;

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => {
  // Toaster/Sonner/Analytics are client-only chrome (empty notification regions +
  // analytics beacon). Radix applies inline styles (e.g. pointer-events) via effects,
  // which the browser serializes differently than React's hydration vdom — a guaranteed
  // hydration mismatch when prerendered. They carry no content, so we render them only
  // after mount on the client, and never during the prerender pass. Both the prerendered
  // HTML and the client's first hydration paint therefore omit them → no mismatch.
  const [showChrome, setShowChrome] = useState(false);
  useEffect(() => {
    const isPrerender = typeof window !== "undefined" &&
      (window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__;
    if (!isPrerender) setShowChrome(true);
  }, []);

  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showChrome && (
          <>
            <Toaster />
            <Sonner />
            <Analytics />
          </>
        )}
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

              <Route path="/natively-vs-lockedinai" element={<NativelyVsLockedInAI />} />
              <Route path="/natively-vs-interviewcoder" element={<NativelyVsInterviewCoder />} />
              <Route path="/undetectable-interview-ai" element={<UndetectableInterviewAI />} />

              <Route path="/blog/is-cluely-safe" element={<IsCluelySafe />} />
              <Route path="/blog/best-ai-interview-assistants" element={<BestAIInterviewAssistants />} />

              {/* Meeting / notes vertical */}
              <Route path="/ai-meeting-assistant" element={<AIMeetingAssistant />} />
              <Route path="/ai-note-taker" element={<AINoteTaker />} />
              <Route path="/sales-call-assistant" element={<SalesCallAssistant />} />
              <Route path="/lecture-note-taker" element={<LectureNoteTaker />} />

              {/* Fireflies / Otter */}
              <Route path="/natively-vs-fireflies" element={<NativelyVsFireflies />} />
              <Route path="/natively-vs-otter" element={<NativelyVsOtter />} />
              <Route path="/fireflies-alternative" element={<FirefliesAlternative />} />
              <Route path="/otter-alternative" element={<OtterAlternative />} />

              {/* Missing interview pages */}
              <Route path="/system-design-interview-assistant" element={<SystemDesignInterviewAssistant />} />
              <Route path="/behavioral-interview-assistant" element={<BehavioralInterviewAssistant />} />
              <Route path="/interview-answer-generator" element={<InterviewAnswerGenerator />} />
              <Route path="/live-interview-assistant" element={<LiveInterviewAssistant />} />

              {/* Programmatic */}
              <Route path="/interview-questions/software-engineer" element={<InterviewQuestionsSWE />} />
              <Route path="/interview-questions/product-manager" element={<InterviewQuestionsPM />} />
              <Route path="/interview-questions/data-scientist" element={<InterviewQuestionsDS />} />
              <Route path="/interview-questions/ai-engineer" element={<InterviewQuestionsAI />} />
              <Route path="/interview-questions/google-software-engineer" element={<InterviewQuestionsGoogleSWE />} />
              <Route path="/interview-questions/meta-software-engineer" element={<InterviewQuestionsMetaSWE />} />
              <Route path="/interview-questions/amazon-software-engineer" element={<InterviewQuestionsAmazonSWE />} />
              <Route path="/interview-questions/microsoft-software-engineer" element={<InterviewQuestionsMicrosoftSWE />} />
              <Route path="/system-design/uber" element={<SystemDesignUber />} />
              <Route path="/system-design/whatsapp" element={<SystemDesignWhatsApp />} />
              <Route path="/system-design/netflix" element={<SystemDesignNetflix />} />
              <Route path="/system-design/twitter" element={<SystemDesignTwitter />} />

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

              <Route path="/ru/natively-vs-lockedinai" element={<NativelyVsLockedInAI />} />
              <Route path="/ru/natively-vs-interviewcoder" element={<NativelyVsInterviewCoder />} />
              <Route path="/ru/undetectable-interview-ai" element={<UndetectableInterviewAI />} />

              <Route path="/ru/blog/is-cluely-safe" element={<IsCluelySafe />} />
              <Route path="/ru/blog/best-ai-interview-assistants" element={<BestAIInterviewAssistants />} />

              <Route path="/ru/ai-meeting-assistant" element={<AIMeetingAssistant />} />
              <Route path="/ru/ai-note-taker" element={<AINoteTaker />} />
              <Route path="/ru/sales-call-assistant" element={<SalesCallAssistant />} />
              <Route path="/ru/lecture-note-taker" element={<LectureNoteTaker />} />

              <Route path="/ru/natively-vs-fireflies" element={<NativelyVsFireflies />} />
              <Route path="/ru/natively-vs-otter" element={<NativelyVsOtter />} />
              <Route path="/ru/fireflies-alternative" element={<FirefliesAlternative />} />
              <Route path="/ru/otter-alternative" element={<OtterAlternative />} />

              <Route path="/ru/system-design-interview-assistant" element={<SystemDesignInterviewAssistant />} />
              <Route path="/ru/behavioral-interview-assistant" element={<BehavioralInterviewAssistant />} />
              <Route path="/ru/interview-answer-generator" element={<InterviewAnswerGenerator />} />
              <Route path="/ru/live-interview-assistant" element={<LiveInterviewAssistant />} />

              <Route path="/ru/interview-questions/software-engineer" element={<InterviewQuestionsSWE />} />
              <Route path="/ru/interview-questions/product-manager" element={<InterviewQuestionsPM />} />
              <Route path="/ru/interview-questions/data-scientist" element={<InterviewQuestionsDS />} />
              <Route path="/ru/interview-questions/ai-engineer" element={<InterviewQuestionsAI />} />
              <Route path="/ru/interview-questions/google-software-engineer" element={<InterviewQuestionsGoogleSWE />} />
              <Route path="/ru/interview-questions/meta-software-engineer" element={<InterviewQuestionsMetaSWE />} />
              <Route path="/ru/interview-questions/amazon-software-engineer" element={<InterviewQuestionsAmazonSWE />} />
              <Route path="/ru/interview-questions/microsoft-software-engineer" element={<InterviewQuestionsMicrosoftSWE />} />
              <Route path="/ru/system-design/uber" element={<SystemDesignUber />} />
              <Route path="/ru/system-design/whatsapp" element={<SystemDesignWhatsApp />} />
              <Route path="/ru/system-design/netflix" element={<SystemDesignNetflix />} />
              <Route path="/ru/system-design/twitter" element={<SystemDesignTwitter />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
