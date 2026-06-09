import { LocaleLink } from "@/components/LocaleLink";
import { useTranslation } from "react-i18next";

// Curated internal-linking map. Each SEO/blog page links to a handful of
// contextually-related pages so link equity flows across the site and crawlers
// reach every page through real <a> links (not just the sitemap). Several
// high-value commercial pages previously had ZERO inbound internal links — this
// map guarantees each is linked from multiple relevant siblings.
//
// `label` is the visible anchor text (descriptive, keyword-aware); `ru` is its
// Russian translation. Paths are locale-agnostic — LocaleLink prefixes /ru when
// the active locale is Russian.
interface RelatedItem {
  to: string;
  label: string;
  ru: string;
}

const RELATED: Record<string, RelatedItem[]> = {
  "/ai-interview-assistant": [
    { to: "/interview-copilot", label: "Local AI Interview Copilot", ru: "Локальный ИИ-копилот для собеседований" },
    { to: "/free-ai-interview-assistant", label: "Free AI Interview Assistant", ru: "Бесплатный ИИ-ассистент для собеседований" },
    { to: "/cluely-alternative", label: "The Best Cluely Alternative", ru: "Лучшая альтернатива Cluely" },
    { to: "/blog/best-ai-interview-assistants", label: "7 Best AI Interview Assistants (2026)", ru: "7 лучших ИИ-ассистентов (2026)" },
  ],
  "/ai-coding-interview-helper": [
    { to: "/leetcode-ai-helper", label: "LeetCode AI Helper", ru: "ИИ-помощник для LeetCode" },
    { to: "/ai-assistant-for-coding-interviews", label: "AI Assistant for Coding Interviews", ru: "ИИ-ассистент для код-собеседований" },
    { to: "/local-ai-coding-assistant", label: "Local AI Coding Assistant", ru: "Локальный ИИ-помощник для кода" },
    { to: "/natively-vs-interviewcoder", label: "Natively vs Interview Coder", ru: "Natively против Interview Coder" },
  ],
  "/leetcode-ai-helper": [
    { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper", ru: "ИИ-помощник для код-собеседований" },
    { to: "/natively-vs-interviewcoder", label: "Natively vs Interview Coder", ru: "Natively против Interview Coder" },
    { to: "/ai-assistant-for-coding-interviews", label: "AI Assistant for Coding Interviews", ru: "ИИ-ассистент для код-собеседований" },
    { to: "/offline-ai-interview", label: "Offline AI Interview Assistant", ru: "Офлайн ИИ-ассистент для собеседований" },
  ],
  "/local-ai-assistant": [
    { to: "/local-ai-coding-assistant", label: "Local AI Coding Assistant", ru: "Локальный ИИ-помощник для кода" },
    { to: "/offline-ai-interview", label: "Offline AI Interview Assistant", ru: "Офлайн ИИ-ассистент для собеседований" },
    { to: "/undetectable-interview-ai", label: "Undetectable Interview AI", ru: "Незаметный ИИ для собеседований" },
    { to: "/cluely-alternative", label: "The Best Cluely Alternative", ru: "Лучшая альтернатива Cluely" },
  ],
  "/local-ai-coding-assistant": [
    { to: "/local-ai-assistant", label: "Secure Local AI Assistant", ru: "Безопасный локальный ИИ-ассистент" },
    { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper", ru: "ИИ-помощник для код-собеседований" },
    { to: "/leetcode-ai-helper", label: "LeetCode AI Helper", ru: "ИИ-помощник для LeetCode" },
    { to: "/offline-ai-interview", label: "Offline AI Interview Assistant", ru: "Офлайн ИИ-ассистент для собеседований" },
  ],
  "/ai-assistant-for-coding-interviews": [
    { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper", ru: "ИИ-помощник для код-собеседований" },
    { to: "/leetcode-ai-helper", label: "LeetCode AI Helper", ru: "ИИ-помощник для LeetCode" },
    { to: "/ai-tools-for-technical-interviews", label: "AI Tools for Technical Interviews", ru: "ИИ-инструменты для технических собеседований" },
    { to: "/how-ai-helps-in-coding-interviews", label: "How AI Helps in Coding Interviews", ru: "Как ИИ помогает на код-собеседованиях" },
  ],
  "/how-ai-helps-in-coding-interviews": [
    { to: "/ai-assistant-for-coding-interviews", label: "AI Assistant for Coding Interviews", ru: "ИИ-ассистент для код-собеседований" },
    { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper", ru: "ИИ-помощник для код-собеседований" },
    { to: "/blog/how-ai-can-help-with-coding-interviews", label: "How AI Can Supercharge Your Interview", ru: "Как ИИ усилит ваше собеседование" },
    { to: "/leetcode-ai-helper", label: "LeetCode AI Helper", ru: "ИИ-помощник для LeetCode" },
  ],
  "/ai-tools-for-technical-interviews": [
    { to: "/ai-assistant-for-coding-interviews", label: "AI Assistant for Coding Interviews", ru: "ИИ-ассистент для код-собеседований" },
    { to: "/blog/best-ai-tools-for-coding-interviews", label: "Best AI Tools for Coding Interviews", ru: "Лучшие ИИ-инструменты для код-собеседований" },
    { to: "/blog/best-ai-interview-assistants", label: "7 Best AI Interview Assistants (2026)", ru: "7 лучших ИИ-ассистентов (2026)" },
    { to: "/interview-copilot", label: "Local AI Interview Copilot", ru: "Локальный ИИ-копилот для собеседований" },
  ],
  "/docs/ai-interview-assistant": [
    { to: "/ai-interview-assistant", label: "What is an AI Interview Assistant?", ru: "Что такое ИИ-ассистент для собеседований?" },
    { to: "/interview-copilot", label: "Local AI Interview Copilot", ru: "Локальный ИИ-копилот для собеседований" },
    { to: "/free-ai-interview-assistant", label: "Free AI Interview Assistant", ru: "Бесплатный ИИ-ассистент для собеседований" },
    { to: "/blog/how-ai-interview-assistants-work", label: "How AI Interview Assistants Work", ru: "Как работают ИИ-ассистенты для собеседований" },
  ],
  "/finalroundai-alternative": [
    { to: "/cluely-alternative", label: "The Best Cluely Alternative", ru: "Лучшая альтернатива Cluely" },
    { to: "/natively-vs-cluely", label: "Natively vs Cluely", ru: "Natively против Cluely" },
    { to: "/free-ai-interview-assistant", label: "Free AI Interview Assistant", ru: "Бесплатный ИИ-ассистент для собеседований" },
    { to: "/blog/best-ai-interview-assistants", label: "7 Best AI Interview Assistants (2026)", ru: "7 лучших ИИ-ассистентов (2026)" },
  ],
  "/cluely-alternative": [
    { to: "/natively-vs-cluely", label: "Natively vs Cluely (Full Comparison)", ru: "Natively против Cluely (полное сравнение)" },
    { to: "/finalroundai-alternative", label: "The Best FinalRoundAI Alternative", ru: "Лучшая альтернатива FinalRoundAI" },
    { to: "/blog/is-cluely-safe", label: "Is Cluely Safe?", ru: "Безопасен ли Cluely?" },
    { to: "/undetectable-interview-ai", label: "Undetectable Interview AI", ru: "Незаметный ИИ для собеседований" },
  ],
  "/natively-vs-cluely": [
    { to: "/cluely-alternative", label: "The Best Cluely Alternative", ru: "Лучшая альтернатива Cluely" },
    { to: "/blog/is-cluely-safe", label: "Is Cluely Safe?", ru: "Безопасен ли Cluely?" },
    { to: "/natively-vs-lockedinai", label: "Natively vs LockedIn AI", ru: "Natively против LockedIn AI" },
    { to: "/natively-vs-interviewcoder", label: "Natively vs Interview Coder", ru: "Natively против Interview Coder" },
  ],
  "/natively-vs-lockedinai": [
    { to: "/natively-vs-cluely", label: "Natively vs Cluely", ru: "Natively против Cluely" },
    { to: "/natively-vs-interviewcoder", label: "Natively vs Interview Coder", ru: "Natively против Interview Coder" },
    { to: "/interview-copilot", label: "Local AI Interview Copilot", ru: "Локальный ИИ-копилот для собеседований" },
    { to: "/free-ai-interview-assistant", label: "Free AI Interview Assistant", ru: "Бесплатный ИИ-ассистент для собеседований" },
  ],
  "/natively-vs-interviewcoder": [
    { to: "/leetcode-ai-helper", label: "LeetCode AI Helper", ru: "ИИ-помощник для LeetCode" },
    { to: "/natively-vs-cluely", label: "Natively vs Cluely", ru: "Natively против Cluely" },
    { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper", ru: "ИИ-помощник для код-собеседований" },
    { to: "/natively-vs-lockedinai", label: "Natively vs LockedIn AI", ru: "Natively против LockedIn AI" },
  ],
  "/interview-copilot": [
    { to: "/ai-interview-assistant", label: "What is an AI Interview Assistant?", ru: "Что такое ИИ-ассистент для собеседований?" },
    { to: "/free-ai-interview-assistant", label: "Free AI Interview Assistant", ru: "Бесплатный ИИ-ассистент для собеседований" },
    { to: "/undetectable-interview-ai", label: "Undetectable Interview AI", ru: "Незаметный ИИ для собеседований" },
    { to: "/cluely-alternative", label: "The Best Cluely Alternative", ru: "Лучшая альтернатива Cluely" },
  ],
  "/free-ai-interview-assistant": [
    { to: "/offline-ai-interview", label: "Offline AI Interview Assistant", ru: "Офлайн ИИ-ассистент для собеседований" },
    { to: "/interview-copilot", label: "Local AI Interview Copilot", ru: "Локальный ИИ-копилот для собеседований" },
    { to: "/finalroundai-alternative", label: "The Best FinalRoundAI Alternative", ru: "Лучшая альтернатива FinalRoundAI" },
    { to: "/ai-interview-assistant", label: "What is an AI Interview Assistant?", ru: "Что такое ИИ-ассистент для собеседований?" },
  ],
  "/offline-ai-interview": [
    { to: "/local-ai-assistant", label: "Secure Local AI Assistant", ru: "Безопасный локальный ИИ-ассистент" },
    { to: "/undetectable-interview-ai", label: "Undetectable Interview AI", ru: "Незаметный ИИ для собеседований" },
    { to: "/free-ai-interview-assistant", label: "Free AI Interview Assistant", ru: "Бесплатный ИИ-ассистент для собеседований" },
    { to: "/leetcode-ai-helper", label: "LeetCode AI Helper", ru: "ИИ-помощник для LeetCode" },
  ],
  "/undetectable-interview-ai": [
    { to: "/offline-ai-interview", label: "Offline AI Interview Assistant", ru: "Офлайн ИИ-ассистент для собеседований" },
    { to: "/local-ai-assistant", label: "Secure Local AI Assistant", ru: "Безопасный локальный ИИ-ассистент" },
    { to: "/cluely-alternative", label: "The Best Cluely Alternative", ru: "Лучшая альтернатива Cluely" },
    { to: "/blog/is-cluely-safe", label: "Is Cluely Safe?", ru: "Безопасен ли Cluely?" },
  ],
  // Blog posts
  "/blog/ai-interview-assistant-guide": [
    { to: "/ai-interview-assistant", label: "What is an AI Interview Assistant?", ru: "Что такое ИИ-ассистент для собеседований?" },
    { to: "/interview-copilot", label: "Local AI Interview Copilot", ru: "Локальный ИИ-копилот для собеседований" },
    { to: "/blog/best-ai-interview-assistants", label: "7 Best AI Interview Assistants (2026)", ru: "7 лучших ИИ-ассистентов (2026)" },
    { to: "/free-ai-interview-assistant", label: "Free AI Interview Assistant", ru: "Бесплатный ИИ-ассистент для собеседований" },
  ],
  "/blog/local-ai-vs-cloud-ai-assistants": [
    { to: "/local-ai-assistant", label: "Secure Local AI Assistant", ru: "Безопасный локальный ИИ-ассистент" },
    { to: "/offline-ai-interview", label: "Offline AI Interview Assistant", ru: "Офлайн ИИ-ассистент для собеседований" },
    { to: "/blog/is-cluely-safe", label: "Is Cluely Safe?", ru: "Безопасен ли Cluely?" },
    { to: "/cluely-alternative", label: "The Best Cluely Alternative", ru: "Лучшая альтернатива Cluely" },
  ],
  "/blog/how-ai-can-help-with-coding-interviews": [
    { to: "/how-ai-helps-in-coding-interviews", label: "How AI Helps in Coding Interviews", ru: "Как ИИ помогает на код-собеседованиях" },
    { to: "/leetcode-ai-helper", label: "LeetCode AI Helper", ru: "ИИ-помощник для LeetCode" },
    { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper", ru: "ИИ-помощник для код-собеседований" },
    { to: "/blog/preparing-for-technical-interviews-with-ai", label: "Preparing for Technical Interviews with AI", ru: "Подготовка к техническим собеседованиям с ИИ" },
  ],
  "/blog/how-ai-interview-assistants-work": [
    { to: "/docs/ai-interview-assistant", label: "Natively Documentation", ru: "Документация Natively" },
    { to: "/ai-interview-assistant", label: "What is an AI Interview Assistant?", ru: "Что такое ИИ-ассистент для собеседований?" },
    { to: "/undetectable-interview-ai", label: "Undetectable Interview AI", ru: "Незаметный ИИ для собеседований" },
    { to: "/blog/best-ai-interview-assistants", label: "7 Best AI Interview Assistants (2026)", ru: "7 лучших ИИ-ассистентов (2026)" },
  ],
  "/blog/best-ai-tools-for-coding-interviews": [
    { to: "/ai-tools-for-technical-interviews", label: "AI Tools for Technical Interviews", ru: "ИИ-инструменты для технических собеседований" },
    { to: "/leetcode-ai-helper", label: "LeetCode AI Helper", ru: "ИИ-помощник для LeetCode" },
    { to: "/blog/best-ai-interview-assistants", label: "7 Best AI Interview Assistants (2026)", ru: "7 лучших ИИ-ассистентов (2026)" },
    { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper", ru: "ИИ-помощник для код-собеседований" },
  ],
  "/blog/preparing-for-technical-interviews-with-ai": [
    { to: "/leetcode-ai-helper", label: "LeetCode AI Helper", ru: "ИИ-помощник для LeetCode" },
    { to: "/blog/how-ai-can-help-with-coding-interviews", label: "How AI Can Supercharge Your Interview", ru: "Как ИИ усилит ваше собеседование" },
    { to: "/ai-assistant-for-coding-interviews", label: "AI Assistant for Coding Interviews", ru: "ИИ-ассистент для код-собеседований" },
    { to: "/interview-copilot", label: "Local AI Interview Copilot", ru: "Локальный ИИ-копилот для собеседований" },
  ],
  "/blog/is-cluely-safe": [
    { to: "/cluely-alternative", label: "The Best Cluely Alternative", ru: "Лучшая альтернатива Cluely" },
    { to: "/natively-vs-cluely", label: "Natively vs Cluely", ru: "Natively против Cluely" },
    { to: "/undetectable-interview-ai", label: "Undetectable Interview AI", ru: "Незаметный ИИ для собеседований" },
    { to: "/local-ai-assistant", label: "Secure Local AI Assistant", ru: "Безопасный локальный ИИ-ассистент" },
  ],
  "/blog/best-ai-interview-assistants": [
    { to: "/finalroundai-alternative", label: "The Best FinalRoundAI Alternative", ru: "Лучшая альтернатива FinalRoundAI" },
    { to: "/natively-vs-cluely", label: "Natively vs Cluely", ru: "Natively против Cluely" },
    { to: "/interview-copilot", label: "Local AI Interview Copilot", ru: "Локальный ИИ-копилот для собеседований" },
    { to: "/leetcode-ai-helper", label: "LeetCode AI Helper", ru: "ИИ-помощник для LeetCode" },
  ],
};

/**
 * Renders a curated "Related" block of internal links for the given page path.
 * Returns null for paths with no mapping (e.g. legal pages), so it is safe to
 * render unconditionally from SEOTemplate.
 */
export default function RelatedLinks({ canonicalPath }: { canonicalPath: string }) {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";
  const items = RELATED[canonicalPath];
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label={isRu ? "Похожие страницы" : "Related pages"} className="mt-16 pt-8 border-t border-border/50">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        {isRu ? "Читайте также" : "Related Reading"}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.to}>
            <LocaleLink
              to={item.to}
              className="block rounded-lg border border-border/50 bg-card/50 px-4 py-3 text-foreground transition-colors hover:bg-card hover:border-primary/50"
            >
              {isRu ? item.ru : item.label}
            </LocaleLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
