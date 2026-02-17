import { Github, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const columns = [
    {
      title: "Project",
      links: [
        { label: "About", href: "#" },
        { label: "How It Works", href: "#" },
        { label: "Features", href: "#" },
        { label: "Roadmap", href: "#" },
      ],
    },
    {
      title: "Open Source",
      links: [
        { label: "GitHub", href: "#" },
        { label: "Contribute", href: "#" },
        { label: "License", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Trust",
      links: [
        { label: "Security", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "Ethical Use", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Donate", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Report a Bug", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-transparent pt-0 pb-10 border-t border-transparent z-10 relative">
      <div className="max-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo Column */}
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center gap-2.5 mb-6">
              <img src={logo} alt="Natively Logo" className="w-6 h-6 object-contain brightness-0" />
              <span className="font-['Biennale',sans-serif] text-[24px] font-semibold leading-[24px] text-[#111827]">Natively</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
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
