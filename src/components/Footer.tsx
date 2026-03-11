import { Github, Twitter } from "lucide-react";
import logo from "@/assets/logo.webp";
import { Link } from "react-router-dom";

const Footer = () => {
  const columns = [
    {
      title: "Product",
      links: [
        { label: "GitHub", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant" },
        { label: "Contribute", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/pulls" },
        { label: "License", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/blob/main/LICENSE" },
        { label: "Changelog", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/blob/main/CHANGELOG.md" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Security", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/blob/main/SECURITY.md" },
        { label: "Privacy", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/blob/main/PRIVACY.md" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "AI Interview Assistant", href: "/ai-interview-assistant" },
        { label: "Cluely Alternative", href: "/cluely-alternative" },
        { label: "Coding Interview Helper", href: "/ai-coding-interview-helper" },
        { label: "Local AI Assistant", href: "/local-ai-assistant" },
        { label: "AI for Coding Exams", href: "/ai-assistant-for-coding-interviews" },
        { label: "How AI Helps You", href: "/how-ai-helps-in-coding-interviews" },
        { label: "Local Coding Copilot", href: "/local-ai-coding-assistant" },
        { label: "Top Technical AI Tools", href: "/ai-tools-for-technical-interviews" },
      ],
    },
    {
      title: "Blog",
      links: [
        { label: "Interview Assistant Guide", href: "/blog/ai-interview-assistant-guide" },
        { label: "Local vs Cloud AI", href: "/blog/local-ai-vs-cloud-ai-assistants" },
        { label: "AI for Coding Exams", href: "/blog/how-ai-can-help-with-coding-interviews" },
        { label: "How Interview Copilots Work", href: "/blog/how-ai-interview-assistants-work" },
        { label: "Top 5 AI Tools (2026)", href: "/blog/best-ai-tools-for-coding-interviews" },
        { label: "Preparing for Screenings", href: "/blog/preparing-for-technical-interviews-with-ai" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Donate", href: "https://buymeacoffee.com/evinjohnn" },
        { label: "Contact", href: "mailto:natively.contact@gmail.com" },
        { label: "Report a Bug", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/issues" },
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
                <h4 className="font-semibold text-[#111827] mb-4 font-geist">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      {link.href.startsWith("/") ? (
                        <Link
                          to={link.href}
                          className="text-[14px] text-[#64748B] hover:text-[#111827] transition-colors font-geist flex items-center gap-2"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-[14px] text-[#64748B] hover:text-[#111827] transition-colors font-geist flex items-center gap-2"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
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
