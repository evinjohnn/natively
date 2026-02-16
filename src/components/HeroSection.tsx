import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import heroBackdrop from "@/assets/heroimage.jpeg";
import desktopUI from "@/assets/desktopui.png";
import heroVideo from "@/assets/hero.m4v";

const GITHUB_URL = "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
      {/* Backdrop Image - Full Width */}
      <div className="absolute -top-20 left-0 z-0 w-full h-[800px] overflow-hidden pointer-events-none">
        <img
          src={heroBackdrop}
          alt="Hero Backdrop"
          className="w-full h-full object-cover object-top opacity-100"
        />
        {/* Cubic eased gradient mask: super feeble start x^3 curve */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 100% at 50% 0%, transparent 30%, rgba(255,255,255,0.005) 40%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.12) 70%, rgba(255,255,255,0.25) 78%, rgba(255,255,255,0.40) 85%, rgba(255,255,255,0.58) 90%, rgba(255,255,255,0.80) 95%, rgba(255,255,255,0.95) 98%, #FFFFFF 100%)'
          }}
        />
      </div>

      <div className="max-content relative z-10 flex flex-col items-center text-center pt-20">
        {/* Title */}
        <h1 className="hero-headline mb-6 text-[#111827] drop-shadow-sm">
          #1 Undetectable<br />AI for Meetings
        </h1>

        {/* Subheading */}
        <p className="body-text-geist !text-[#6B7280] max-w-[540px] mb-12 drop-shadow-none font-medium text-lg">
          Natively takes perfect meeting notes and gives real-time answers,<br className="hidden md:block" />
          all while completely undetectable
        </p>

        {/* CTA Button: Get for Mac */}
        <div className="mb-24 scale-110">
          <Button asChild size="lg" className="rounded-xl px-10 bg-gradient-to-b from-[#3B82F6] to-[#1E3A8A] hover:opacity-90 text-white h-14 border-none shadow-[0_10px_30px_-10px_rgba(30,58,138,0.3)] transition-all">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <span className="font-semibold btn-text">Get for Mac</span>
            </a>
          </Button>
        </div>

        {/* Hero Mockup Composition */}
        <div className="relative w-full max-w-[1040px] mx-auto mt-8 scale-[1.1] -translate-y-12">
          {/* Layer 1: MacOS Desktop UI Background with Radiant Aura */}
          {/* Layer 1: MacOS Desktop UI Background with Radiant Aura */}
          {/* Layer 1: MacOS Desktop UI Background with Radiant Aura - Tighter Radius */}
          {/* Main Aura: Orange -> Purple -> Blue vertical gradient to match reference */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[102%] h-[102%] bg-gradient-to-b from-[#FB923C] via-[#A855F7] to-[#3B82F6] blur-[25px] opacity-30 rounded-[2rem] z-0 pointer-events-none mix-blend-normal" />

          {/* Secondary Glow for extra vibrance */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] h-[80%] bg-gradient-to-tr from-[#3B82F6]/50 via-[#A855F7]/50 to-[#FB923C]/50 blur-[60px] opacity-30 rounded-full z-0 pointer-events-none" />

          <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img
              src={desktopUI}
              alt="MacOS Desktop Interface"
              className="w-full h-auto object-cover"
            />

            {/* Layer 2: Zoom Meeting GIF Placeholder 
                Positioned to overlay where the meeting window would be on the desktop UI.
                Adjust top/left/width/height based on the actual desktopui.png layout.
            */}
            <div className="absolute top-[16%] left-[16.5%] w-[67%] h-[60%] bg-black rounded-lg overflow-hidden border border-white/10 shadow-inner">
              <video
                src={heroVideo}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Layer 3: Natively Interface Overlay */}
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[45%] z-30">
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/20">
                {/* Header */}
                <div className="p-4 pb-2 flex justify-end">
                  <div className="bg-[#2563EB] px-3 py-1.5 rounded-full text-white text-[11px] font-semibold tracking-wide shadow-lg shadow-blue-500/30">
                    What should I say?
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 pb-5">
                  <p className="text-white/90 text-[15px] leading-relaxed font-light font-geist text-left mb-6 drop-shadow-md">
                    "A discounted cash flow model values a company by projecting future free cash flows and discounting them to present value using the weighted average cost of capital."
                  </p>

                  <div className="flex items-center gap-3 mb-4 text-[11px] text-white/50 font-medium">
                    <div className="flex items-center gap-1.5 hover:text-white/80 transition-colors cursor-pointer">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      What should I say?
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5 hover:text-white/80 transition-colors cursor-pointer">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                      Follow-up questions
                    </div>
                  </div>

                  {/* Input Field */}
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Ask anything about the screen or conversation"
                      className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all font-light"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
