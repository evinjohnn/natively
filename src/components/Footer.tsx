import { Github, Twitter } from "lucide-react";
import logo from "@/assets/logo.webp";

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
      title: "Support",
      links: [
        { label: "Donate", href: "https://buymeacoffee.com/evinjohnn" },
        { label: "Contact", href: "mailto:natively.contact@gmail.com" },
        { label: "Report a Bug", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant/issues" },

      ],
    },
  ];

  return (
    <footer className="bg-transparent pt-0 pb-10 border-t border-transparent z-10 relative">
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[80%] h-[3px] bg-gradient-to-r from-transparent via-gray-400/80 to-transparent backdrop-blur-md" />
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 md:pr-32">
            {columns.map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-[#111827] mb-4 font-geist">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-[14px] text-[#64748B] hover:text-[#111827] transition-colors font-geist flex items-center gap-2"
                      >
                        {link.label}
                      </a>
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
