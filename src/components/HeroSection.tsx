import JellyClayButton from "@/components/JellyClayButton";
import NativelyInterfaceCard from "@/components/NativelyInterfaceCard";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import heroBackdropMp4 from "@/assets/hero.mp4";
import heroJpeg from "@/assets/hero.jpeg";
import desktopUI from "@/assets/desktopui.webp";
import heroVideo from "@/assets/hero.webm";
import heroPoster from "@/assets/hero-poster.webp";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative pt-24 md:pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
      {/* Backdrop Video - Full Width */}
      <div className="absolute -top-20 left-0 z-0 w-full h-[600px] md:h-[800px] overflow-hidden pointer-events-none">
        <video
          src={heroBackdropMp4}
          poster={heroJpeg}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient fade to white at bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 100% at 50% 0%, transparent 30%, rgba(255,255,255,0.005) 40%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.12) 70%, rgba(255,255,255,0.25) 78%, rgba(255,255,255,0.40) 85%, rgba(255,255,255,0.58) 90%, rgba(255,255,255,0.80) 95%, rgba(255,255,255,0.95) 98%, #FFFFFF 100%)'
          }}
        />
      </div>

      <div className="max-content relative z-10 flex flex-col items-center text-center pt-8">
        {/* Title */}
        <div className="mb-6 flex flex-col items-center w-full px-4 md:px-0">
          {/* Main Heading Line 1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hero-headline text-[#111827] drop-shadow-sm"
          >
            {t('hero.title_line1')}
          </motion.h1>

          {/* Main Heading Line 2 - Word by Word */}
          <div className="hero-headline text-[#111827] drop-shadow-sm flex flex-wrap justify-center gap-x-3 gap-y-1">
            {(t('hero.title_words', { returnObjects: true }) as string[]).map((word, i) => (
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
        <div className="flex flex-col items-center mb-12 w-full px-4 md:px-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="body-text-geist !text-[#6B7280] w-full max-w-[540px] drop-shadow-none font-medium text-sm md:text-[17px] leading-relaxed text-center"
          >
            {t('hero.subtitle_line1')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.85, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="body-text-geist !text-[#6B7280] w-full max-w-[540px] drop-shadow-none font-medium text-sm md:text-[17px] text-center"
          >
            {t('hero.subtitle_line2')}
          </motion.p>
        </div>

        {/* CTA Button: Get for Mac */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-24 flex flex-col items-center gap-4 scale-100 md:scale-110"
        >
          <div className="relative group">
            <JellyClayButton className="text-xl" />
            {/* Subtle glow pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.5, 0], scale: 1.2 }}
              transition={{ delay: 3.8, duration: 2, repeat: 0 }}
              className="absolute inset-0 bg-blue-400/30 blur-xl rounded-full -z-10"
            />
          </div>
          <p className="text-sm text-gray-600 font-medium tracking-wide">
            {t('hero.trusted')}
          </p>

        </motion.div>

        {/* Hero Mockup Composition */}
        <div className="relative w-full max-w-[1040px] mt-4 md:mt-12 md:scale-[1.1] md:-translate-y-12 -mx-6 md:mx-auto px-0">
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

          {/* --- MOBILE LAYOUT (Overlay: card on top of video) --- */}
          <div className="md:hidden relative z-10 w-full">
            {/* Mobile Video Container */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
              className="w-full relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-video bg-black z-0"
            >
              <video
                src={heroVideo}
                poster={heroPoster}
                preload="metadata"
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
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
                  delay: 3.9,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
                className="absolute top-1/2 left-1/2 px-4 py-2 rounded-full flex items-center gap-2 bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg backdrop-blur-xl border border-white/20 z-20 whitespace-nowrap origin-center"
              >
                <div className="absolute top-0.5 left-2 right-2 h-[45%] rounded-full bg-gradient-to-b from-white/70 to-white/5 blur-[0.5px] pointer-events-none" />
                <span className="text-white text-[12px] font-medium drop-shadow-sm">{t('hero.interface_title')}</span>
              </motion.div>
            </motion.div>

            {/* Mobile Interface Card — overlaid on the video, naturally ~2:1 */}
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
              <div className="w-[88%] max-w-[420px] pointer-events-auto">
                <NativelyInterfaceCard isMobile={true} hideMessages className="w-full" />
              </div>
            </div>
          </div>

          {/* --- DESKTOP LAYOUT (Monitor Composition) --- */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 1.8,
              duration: 1.8,
              ease: [0.19, 1, 0.22, 1], // "Buttery" smooth, no bounce
            }}
            className="hidden md:block relative z-10 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10"
          >
            <img
              src={desktopUI}
              alt="MacOS Desktop Interface"
              loading="eager" // Keep eager as it's above fold
              className="scale-101 -mt-[4%] block relative"
            />

            {/* Video Placeholder - Drops from top */}
            <motion.div
              initial={{ opacity: 0, y: -60, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 3.0,
                duration: 2.2,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="absolute top-[18%] left-[12.5%] w-[770px] h-[435px] bg-black rounded-lg overflow-hidden border border-white/10 shadow-inner"
            >
              <video
                src={heroVideo}
                poster={heroPoster}
                preload="metadata"
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
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

                <span className="text-white text-[13px] font-medium drop-shadow-sm">{t('hero.interface_title')}</span>
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
              className="absolute top-[18%] left-[12.5%] w-[770px] h-[435px] pointer-events-none z-50 flex items-center justify-center"
            >
              {/* Offset cursor to align with button center visually */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 blur-md opacity-60">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L25.5001 1.19169L5.65376 12.3673Z"
                      fill="#3B82F6"
                    />
                  </svg>
                </div>
                {/* Main cursor */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] translate-x-4 translate-y-4"
                >
                  <defs>
                    <linearGradient id="cursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1F2937" />
                      <stop offset="100%" stopColor="#111827" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L25.5001 1.19169L5.65376 12.3673Z"
                    fill="url(#cursorGradient)"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Desktop Interface Card */}
            <NativelyInterfaceCard className="absolute top-[12%] left-[46%] w-[52%] z-30" isMobile={false} spreadHotkeys />
          </motion.div>
        </div>
      </div>
    </section >
  );
};

export default HeroSection;
