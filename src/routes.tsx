// Single source of truth for code-split route modules.
//
// Each page is a preloadable lazy component (see lazyWithPreload). App.tsx renders
// these directly, and main.tsx calls preloadRoute() before hydrateRoot() so the
// current route's chunk is loaded AND rendered synchronously during hydration —
// otherwise Suspense would show its spinner fallback, mismatch the prerendered HTML
// (React errors #418/#423), and force a full client re-render with a content flash.
import { lazyWithPreload, type PreloadableComponent } from "@/lib/lazyWithPreload";

// Keyed by a stable module id (not path, since several paths share one component).
export const pages = {
  Index: lazyWithPreload(() => import("./pages/Index")),
  NotFound: lazyWithPreload(() => import("./pages/NotFound")),
  Pro: lazyWithPreload(() => import("./pages/Pro")),
  RefundPolicy: lazyWithPreload(() => import("./pages/legal/RefundPolicy")),
  TermsAndConditions: lazyWithPreload(() => import("./pages/legal/TermsAndConditions")),
  PrivacyPolicy: lazyWithPreload(() => import("./pages/legal/PrivacyPolicy")),
  AIInterviewAssistant: lazyWithPreload(() => import("./pages/seo/AIInterviewAssistant")),
  NativelyAlternative: lazyWithPreload(() => import("./pages/seo/NativelyAlternative")),
  AICodingInterviewHelper: lazyWithPreload(() => import("./pages/seo/AICodingInterviewHelper")),
  LocalAIAssistant: lazyWithPreload(() => import("./pages/seo/LocalAIAssistant")),
  AIInterviewAssistantGuide: lazyWithPreload(() => import("./pages/blog/AIInterviewAssistantGuide")),
  LocalAIVsCloudAIAssistants: lazyWithPreload(() => import("./pages/blog/LocalAIVsCloudAIAssistants")),
  HowAICanHelpWithCodingInterviews: lazyWithPreload(() => import("./pages/blog/HowAICanHelpWithCodingInterviews")),
  AIAssistantForCodingInterviews: lazyWithPreload(() => import("./pages/seo/AIAssistantForCodingInterviews")),
  HowAIHelpsInCodingInterviews: lazyWithPreload(() => import("./pages/seo/HowAIHelpsInCodingInterviews")),
  LocalAICodingAssistant: lazyWithPreload(() => import("./pages/seo/LocalAICodingAssistant")),
  AIToolsForTechnicalInterviews: lazyWithPreload(() => import("./pages/seo/AIToolsForTechnicalInterviews")),
  HowAIInterviewAssistantsWork: lazyWithPreload(() => import("./pages/blog/HowAIInterviewAssistantsWork")),
  BestAIToolsForCodingInterviews: lazyWithPreload(() => import("./pages/blog/BestAIToolsForCodingInterviews")),
  PreparingForTechnicalInterviewsWithAI: lazyWithPreload(() => import("./pages/blog/PreparingForTechnicalInterviewsWithAI")),
  IsCluelySafe: lazyWithPreload(() => import("./pages/blog/IsCluelySafe")),
  BestAIInterviewAssistants: lazyWithPreload(() => import("./pages/blog/BestAIInterviewAssistants")),
  LeetCodeAIHelper: lazyWithPreload(() => import("./pages/seo/LeetCodeAIHelper")),
  OfflineAIInterview: lazyWithPreload(() => import("./pages/seo/OfflineAIInterview")),
  DocsAIInterviewAssistant: lazyWithPreload(() => import("./pages/seo/DocsAIInterviewAssistant")),
  FinalRoundAIAlternative: lazyWithPreload(() => import("./pages/seo/FinalRoundAIAlternative")),
  NativelyVsCluely: lazyWithPreload(() => import("./pages/seo/NativelyVsCluely")),
  InterviewCopilot: lazyWithPreload(() => import("./pages/seo/InterviewCopilot")),
  FreeAIInterviewAssistant: lazyWithPreload(() => import("./pages/seo/FreeAIInterviewAssistant")),
  NativelyVsLockedInAI: lazyWithPreload(() => import("./pages/seo/NativelyVsLockedInAI")),
  NativelyVsInterviewCoder: lazyWithPreload(() => import("./pages/seo/NativelyVsInterviewCoder")),
  UndetectableInterviewAI: lazyWithPreload(() => import("./pages/seo/UndetectableInterviewAI")),

  // Meeting / notes vertical
  AIMeetingAssistant: lazyWithPreload(() => import("./pages/seo/AIMeetingAssistant")),
  AINoteTaker: lazyWithPreload(() => import("./pages/seo/AINoteTaker")),
  SalesCallAssistant: lazyWithPreload(() => import("./pages/seo/SalesCallAssistant")),
  LectureNoteTaker: lazyWithPreload(() => import("./pages/seo/LectureNoteTaker")),

  // Fireflies / Otter comparison + alternative
  NativelyVsFireflies: lazyWithPreload(() => import("./pages/seo/NativelyVsFireflies")),
  NativelyVsOtter: lazyWithPreload(() => import("./pages/seo/NativelyVsOtter")),
  FirefliesAlternative: lazyWithPreload(() => import("./pages/seo/FirefliesAlternative")),
  OtterAlternative: lazyWithPreload(() => import("./pages/seo/OtterAlternative")),

  // Missing interview pages
  SystemDesignInterviewAssistant: lazyWithPreload(() => import("./pages/seo/SystemDesignInterviewAssistant")),
  BehavioralInterviewAssistant: lazyWithPreload(() => import("./pages/seo/BehavioralInterviewAssistant")),
  InterviewAnswerGenerator: lazyWithPreload(() => import("./pages/seo/InterviewAnswerGenerator")),
  LiveInterviewAssistant: lazyWithPreload(() => import("./pages/seo/LiveInterviewAssistant")),

  // Programmatic: interview-questions/<role>
  InterviewQuestionsSWE: lazyWithPreload(() => import("./pages/programmatic/routes/InterviewQuestionsSWE")),
  InterviewQuestionsPM: lazyWithPreload(() => import("./pages/programmatic/routes/InterviewQuestionsPM")),
  InterviewQuestionsDS: lazyWithPreload(() => import("./pages/programmatic/routes/InterviewQuestionsDS")),
  InterviewQuestionsAI: lazyWithPreload(() => import("./pages/programmatic/routes/InterviewQuestionsAI")),

  // Programmatic: interview-questions/<company>-software-engineer
  InterviewQuestionsGoogleSWE: lazyWithPreload(() => import("./pages/programmatic/routes/InterviewQuestionsGoogleSWE")),
  InterviewQuestionsMetaSWE: lazyWithPreload(() => import("./pages/programmatic/routes/InterviewQuestionsMetaSWE")),
  InterviewQuestionsAmazonSWE: lazyWithPreload(() => import("./pages/programmatic/routes/InterviewQuestionsAmazonSWE")),
  InterviewQuestionsMicrosoftSWE: lazyWithPreload(() => import("./pages/programmatic/routes/InterviewQuestionsMicrosoftSWE")),

  // Programmatic: system-design/<product>
  SystemDesignUber: lazyWithPreload(() => import("./pages/programmatic/routes/SystemDesignUber")),
  SystemDesignWhatsApp: lazyWithPreload(() => import("./pages/programmatic/routes/SystemDesignWhatsApp")),
  SystemDesignNetflix: lazyWithPreload(() => import("./pages/programmatic/routes/SystemDesignNetflix")),
  SystemDesignTwitter: lazyWithPreload(() => import("./pages/programmatic/routes/SystemDesignTwitter")),
} satisfies Record<string, PreloadableComponent>;

export type PageKey = keyof typeof pages;

// Map a (locale-stripped) pathname to the module key that renders it.
// Keep in sync with the <Route> table in App.tsx.
const pathToKey: Record<string, PageKey> = {
  "/": "Index",
  "/pro": "Pro",
  "/refundpolicy": "RefundPolicy",
  "/privacy": "PrivacyPolicy",
  "/termsandconditions": "TermsAndConditions",
  "/nativelypro/t&c": "TermsAndConditions",
  "/nativelyapi/t&c": "TermsAndConditions",
  "/ai-interview-assistant": "AIInterviewAssistant",
  "/cluely-alternative": "NativelyAlternative",
  "/ai-coding-interview-helper": "AICodingInterviewHelper",
  "/local-ai-assistant": "LocalAIAssistant",
  "/blog/ai-interview-assistant-guide": "AIInterviewAssistantGuide",
  "/blog/local-ai-vs-cloud-ai-assistants": "LocalAIVsCloudAIAssistants",
  "/blog/how-ai-can-help-with-coding-interviews": "HowAICanHelpWithCodingInterviews",
  "/ai-assistant-for-coding-interviews": "AIAssistantForCodingInterviews",
  "/how-ai-helps-in-coding-interviews": "HowAIHelpsInCodingInterviews",
  "/local-ai-coding-assistant": "LocalAICodingAssistant",
  "/ai-tools-for-technical-interviews": "AIToolsForTechnicalInterviews",
  "/blog/how-ai-interview-assistants-work": "HowAIInterviewAssistantsWork",
  "/blog/best-ai-tools-for-coding-interviews": "BestAIToolsForCodingInterviews",
  "/blog/preparing-for-technical-interviews-with-ai": "PreparingForTechnicalInterviewsWithAI",
  "/docs/ai-interview-assistant": "DocsAIInterviewAssistant",
  "/finalroundai-alternative": "FinalRoundAIAlternative",
  "/natively-vs-cluely": "NativelyVsCluely",
  "/interview-copilot": "InterviewCopilot",
  "/free-ai-interview-assistant": "FreeAIInterviewAssistant",
  "/leetcode-ai-helper": "LeetCodeAIHelper",
  "/offline-ai-interview": "OfflineAIInterview",
  "/natively-vs-lockedinai": "NativelyVsLockedInAI",
  "/natively-vs-interviewcoder": "NativelyVsInterviewCoder",
  "/undetectable-interview-ai": "UndetectableInterviewAI",
  "/blog/is-cluely-safe": "IsCluelySafe",
  "/blog/best-ai-interview-assistants": "BestAIInterviewAssistants",

  "/ai-meeting-assistant": "AIMeetingAssistant",
  "/ai-note-taker": "AINoteTaker",
  "/sales-call-assistant": "SalesCallAssistant",
  "/lecture-note-taker": "LectureNoteTaker",

  "/natively-vs-fireflies": "NativelyVsFireflies",
  "/natively-vs-otter": "NativelyVsOtter",
  "/fireflies-alternative": "FirefliesAlternative",
  "/otter-alternative": "OtterAlternative",

  "/system-design-interview-assistant": "SystemDesignInterviewAssistant",
  "/behavioral-interview-assistant": "BehavioralInterviewAssistant",
  "/interview-answer-generator": "InterviewAnswerGenerator",
  "/live-interview-assistant": "LiveInterviewAssistant",

  "/interview-questions/software-engineer": "InterviewQuestionsSWE",
  "/interview-questions/product-manager": "InterviewQuestionsPM",
  "/interview-questions/data-scientist": "InterviewQuestionsDS",
  "/interview-questions/ai-engineer": "InterviewQuestionsAI",
  "/interview-questions/google-software-engineer": "InterviewQuestionsGoogleSWE",
  "/interview-questions/meta-software-engineer": "InterviewQuestionsMetaSWE",
  "/interview-questions/amazon-software-engineer": "InterviewQuestionsAmazonSWE",
  "/interview-questions/microsoft-software-engineer": "InterviewQuestionsMicrosoftSWE",

  "/system-design/uber": "SystemDesignUber",
  "/system-design/whatsapp": "SystemDesignWhatsApp",
  "/system-design/netflix": "SystemDesignNetflix",
  "/system-design/twitter": "SystemDesignTwitter",
};

// Preload the page chunk for the current location so hydration is synchronous.
// Strips a leading /<locale> segment so /ru/x resolves to the same chunk as /x.
export function preloadRoute(pathname: string): Promise<unknown> {
  let p = pathname.replace(/\/+$/, "") || "/";

  const seg = p.split("/")[1];
  if (seg && seg.length === 2) {
    const stripped = p.slice(seg.length + 1) || "/";
    if (pathToKey[stripped]) p = stripped;
  }

  const key = pathToKey[p];
  const component = key ? pages[key] : pages.NotFound;
  return component.preload().catch(() => undefined);
}
