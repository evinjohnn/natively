import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import JellyClayButton from "@/components/JellyClayButton";
import JellyClayGithubStars from "@/components/JellyClayGithubStars";
import logo from "@/assets/logo.webp";
import { motion } from "framer-motion";

const GITHUB_URL = "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks: { label: string; href: string; isNew?: boolean }[] = [
    { label: "Features", href: "#" },
    { label: "GitHub", href: "https://github.com/evinjohnn/natively-cluely-ai-assistant" },
    { label: "Donate", href: "https://buymeacoffee.com/evinjohnn" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Natively Logo" className="w-8 h-8 object-contain" />
          <span className="font-['Biennale',sans-serif] text-[18px] md:text-[20px] font-semibold leading-tight text-white flex flex-col md:flex-row md:items-center md:gap-2">
            <span>Natively</span>

          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] font-medium flex items-center gap-2 transition-colors text-white hover:opacity-70"
            >
              {link.label}
              {link.isNew && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold">
                  New
                </span>
              )}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <JellyClayGithubStars />
        </div>

        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-border overflow-hidden">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex justify-center w-full">
              <JellyClayButton href={GITHUB_URL} className="w-full h-12 text-lg px-6">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Download
                </span>
              </JellyClayButton>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
