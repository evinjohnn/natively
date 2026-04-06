import { Github, Twitter } from "lucide-react";
import logo from "@/assets/logo.webp";
import { LocaleLink } from "@/components/LocaleLink";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const columns = [
    {
      titleKey: "footer.product",
      links: [
        { label: "GitHub", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant" },
        { label: "Hacker News", href: "https://news.ycombinator.com/item?id=46923304" },
        { labelKey: "footer.contribute", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/pulls" },
        { labelKey: "footer.license", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/blob/main/LICENSE" },
        { labelKey: "footer.changelog", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/blob/main/CHANGELOG.md" },
      ],
    },
    {
      titleKey: "footer.legal",
      links: [
        { labelKey: "footer.security", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/blob/main/SECURITY.md" },
        { labelKey: "footer.privacy", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/blob/main/PRIVACY.md" },
      ],
    },
    {
      titleKey: "footer.resources",
      links: [
        { labelKey: "footer.ai_interview", href: "/ai-interview-assistant" },
        { labelKey: "footer.cluely_alt", href: "/cluely-alternative" },
        { labelKey: "footer.coding_helper", href: "/ai-coding-interview-helper" },
        { labelKey: "footer.local_ai", href: "/local-ai-assistant" },
        { labelKey: "footer.ai_coding_exams", href: "/ai-assistant-for-coding-interviews" },
        { labelKey: "footer.how_ai_helps", href: "/how-ai-helps-in-coding-interviews" },
        { labelKey: "footer.local_coding", href: "/local-ai-coding-assistant" },
        { labelKey: "footer.tech_ai_tools", href: "/ai-tools-for-technical-interviews" },
      ],
    },
    {
      titleKey: "footer.blog",
      links: [
        { labelKey: "footer.interview_guide", href: "/blog/ai-interview-assistant-guide" },
        { labelKey: "footer.local_vs_cloud", href: "/blog/local-ai-vs-cloud-ai-assistants" },
        { labelKey: "footer.ai_coding_exams_blog", href: "/blog/how-ai-can-help-with-coding-interviews" },
        { labelKey: "footer.interview_copilots", href: "/blog/how-ai-interview-assistants-work" },
        { labelKey: "footer.top_ai_tools", href: "/blog/best-ai-tools-for-coding-interviews" },
        { labelKey: "footer.preparing_screenings", href: "/blog/preparing-for-technical-interviews-with-ai" },
      ],
    },
    {
      titleKey: "footer.support",
      links: [
        { labelKey: "footer.donate", href: "https://buymeacoffee.com/evinjohnn" },
        { labelKey: "footer.contact", href: "mailto:natively.contact@gmail.com" },
        { labelKey: "footer.report_bug", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/issues" },
      ],
    },
  ];

  return (
    <footer className="bg-transparent pt-16 pb-10 border-t border-transparent z-10 relative">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Logo Column */}
          <div className="md:max-w-[300px]">
            <div className="flex items-center gap-2.5 mb-6">
              <img src={logo} alt="Natively Logo" className="w-6 h-6 object-contain brightness-0" />
              <span className="font-['Biennale',sans-serif] text-[24px] font-semibold leading-[24px] text-[#111827]">Natively</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 md:pr-12">
            {columns.map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-[#111827] mb-4 font-geist">{t(col.titleKey)}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => {
                    const label = link.labelKey ? t(link.labelKey) : link.label;
                    return (
                    <li key={j}>
                      {link.href.startsWith("/") ? (
                        <LocaleLink
                          to={link.href}
                          className="text-[14px] text-[#64748B] hover:text-[#111827] transition-colors font-geist flex items-center gap-2"
                        >
                          {label}
                        </LocaleLink>
                      ) : (
                        <a
                          href={link.href}
                          className="text-[14px] text-[#64748B] hover:text-[#111827] transition-colors font-geist flex items-center gap-2"
                        >
                          {label}
                        </a>
                      )}
                    </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
