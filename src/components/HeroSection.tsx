import JellyClayButton from "@/components/JellyClayButton";
import { motion } from "framer-motion";

import heroBackdrop from "@/assets/hero.webp";
import desktopUI from "@/assets/desktopui.webp";
import heroVideo from "@/assets/hero.m4v";
import heroPoster from "@/assets/hero-poster.webp";

const GITHUB_URL = "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
      {/* Backdrop Image - Full Width */}
      <div className="absolute -top-20 left-0 z-0 w-full h-[800px] overflow-hidden pointer-events-none">
        <img
          src={heroBackdrop}
          alt="Hero Backdrop"
          loading="eager" // Keep eager for LCP
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

      <div className="max-content relative z-10 flex flex-col items-center text-center pt-8">
        {/* Title */}
        <div className="mb-6 flex flex-col items-center">
          {/* Main Heading Line 1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hero-headline text-[#111827] drop-shadow-sm"
          >
            #1 Undetectable
          </motion.h1>

          {/* Main Heading Line 2 - Word by Word */}
          <div className="hero-headline text-[#111827] drop-shadow-sm flex gap-3">
            {["AI", "for", "Meetings"].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.4 + i * 0.12,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subheading */}
        <div className="flex flex-col items-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="body-text-geist !text-[#6B7280] max-w-[540px] drop-shadow-none font-medium text-lg leading-relaxed"
          >
            Natively takes perfect meeting notes and gives real-time answers,
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.85, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="body-text-geist !text-[#6B7280] max-w-[540px] drop-shadow-none font-medium text-lg"
          >
            all while completely undetectable
          </motion.p>
        </div>

        {/* CTA Button: Get for Mac */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 flex flex-col items-center gap-4 scale-110"
        >
          <div className="relative group">
            <JellyClayButton href={GITHUB_URL} className="text-xl" />
            {/* Subtle glow pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.5, 0], scale: 1.2 }}
              transition={{ delay: 3.8, duration: 2, repeat: 0 }}
              className="absolute inset-0 bg-blue-400/30 blur-xl rounded-full -z-10"
            />
          </div>
          <p className="text-sm text-gray-600 font-medium tracking-wide">
            Trusted by 3,000+ Users
          </p>
        </motion.div>

        {/* Hero Mockup Composition */}
        <div className="relative w-full max-w-[1040px] mx-auto mt-8 scale-[1.1] -translate-y-12">
          {/* Main Aura: Orange -> Purple -> Blue vertical gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 3.2, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[102%] h-[102%] bg-gradient-to-b from-[#FB923C] via-[#A855F7] to-[#3B82F6] blur-[25px] rounded-[2rem] z-0 pointer-events-none mix-blend-normal"
          />

          {/* Secondary Glow for extra vibrance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 3.2, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] h-[80%] bg-gradient-to-tr from-[#3B82F6]/50 via-[#A855F7]/50 to-[#FB923C]/50 blur-[60px] rounded-full z-0 pointer-events-none"
          />

          {/* Layer 1: Desktop UI - Rises from bottom with smooth easing */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 1.8,
              duration: 1.8,
              ease: [0.19, 1, 0.22, 1], // "Buttery" smooth, no bounce
            }}
            className="relative z-10 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10"
          >
            <img
              src={desktopUI}
              alt="MacOS Desktop Interface"
              loading="eager" // Keep eager as it's above fold
              className="scale-101 -mt-[1%] block relative"
            />

            {/* Layer 2: Zoom Meeting MP4 Placeholder - Drops from top */}
            <motion.div
              initial={{ opacity: 0, y: -60, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 3.0,
                duration: 2.2,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="absolute top-[12.5%] left-[16.5%] w-[67%] h-[62.5%] bg-black rounded-lg overflow-hidden border border-white/10 shadow-inner"
            >
              <video
                src={heroVideo}
                poster={heroPoster}
                className="w-full h-full -mt-[2%] -mb-[10%] ml-[0%] mr-[0%] object-contain"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />

              {/* Floating Prompt Button - Jelly Style (Centered) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: "-50%", y: "calc(-50% + 12px)" }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.92, 1, 0.96, 0.96],
                  x: "-50%",
                  y: ["calc(-50% + 12px)", "-50%", "-50%", "-50%"]
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.2, 0.9, 1],
                  delay: 3.9
                }}
                className="absolute top-1/2 left-1/2 px-5 py-2.5 rounded-full flex items-center gap-2.5 bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.35)] backdrop-blur-xl border border-white/20 z-20 origin-center cursor-pointer"
              >
                <div className="absolute top-0.5 left-2 right-2 h-[45%] rounded-full bg-gradient-to-b from-white/70 to-white/5 blur-[0.5px] pointer-events-none" />

                <span className="text-white text-[13px] font-medium drop-shadow-sm">What should I say?</span>
              </motion.div>
            </motion.div>

            {/* Cursor Animation Layer */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: 60 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [60, 0, 0, 0],
                y: [60, 0, 0, 0],
                scale: [1, 1, 0.96, 1] // Click pulse
              }}
              transition={{
                duration: 0.8,
                times: [0, 0.4, 0.8, 1], // Enter 4.3s, arrive 4.6s, click 4.9s, fade 5.1s
                delay: 4.3,
                ease: "easeOut"
              }}
              // Positioning cursor relative to the video center-ish where the button is
              className="absolute top-[12.5%] left-[16.5%] w-[67%] h-[62.5%] pointer-events-none z-50 flex items-end justify-center pb-8"
            >
              {/* Offset cursor to align with button center visually */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg translate-x-4 translate-y-4" // Visual offset
              >
                <path
                  d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L25.5001 1.19169L5.65376 12.3673Z"
                  fill="black"
                  stroke="white"
                  strokeWidth="1.5"
                  className="drop-shadow-sm"
                />
              </svg>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, scale: 0.985, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%" }}
              transition={{ delay: 5.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[25%] left-1/2 w-[45%] z-30"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section >
  );
};

export default HeroSection;
