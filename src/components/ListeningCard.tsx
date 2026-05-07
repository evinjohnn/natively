import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NativelyInterfaceCard from "./NativelyInterfaceCard";

// Visually matched waveform from the image
const WAVE_BARS = [
  3, 14, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 14, 12, 10, 16, 24, 42, 24, 16, 20, 16, 16, 16, 42, 26, 14, 14, 20, 14, 10, 10, 10, 10, 10, 10, 12, 10, 10, 10, 14, 18, 12, 10, 10, 12, 14, 10, 3
];

const WaveBar = ({ height, duration, delay }: { height: number; duration: number; delay: number }) => {
  return (
    <motion.div
      className="w-[3px] rounded-full bg-white/50 shrink-0 relative z-10 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
      animate={{ height: [height * 0.5, height, height * 0.4] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{ height: `${height}px` }}
    />
  );
};

export default function ListeningCard() {
  const [elapsed, setElapsed] = useState(12);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div 
      className="col-span-1 md:col-span-2 mt-8 md:mt-16 w-full max-w-[1250px] mx-auto text-left px-4 font-medium"
      style={{ fontFamily: "'Biennale', sans-serif" }}
    >
      <h2 
        className="hero-headline !text-[#3f3f46] text-[28px] md:text-[60px] lg:text-[68px] leading-[1.1] mb-10 text-center mx-auto w-full lg:whitespace-nowrap tracking-tight block"
        style={{ fontFamily: "'EB Garamond', serif" }}
      >
        How Natively helps during a meeting
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-start relative z-10">
        
        {/* LEFT CARD */}
        <div 
          className="rounded-[32px] md:rounded-[40px] p-5 md:p-8 flex flex-col relative overflow-hidden aspect-square w-full max-w-[600px] mx-auto"
          style={{ 
            background: "radial-gradient(circle at 20% 20%, #7EABFB 0%, #6B9DF7 100%)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.55)",
              "inset 0 -2px 0 rgba(0,0,0,0.12)",
              "inset 1px 0 0 rgba(255,255,255,0.2)",
              "inset -1px 0 0 rgba(0,0,0,0.08)",
              "0 2px 4px rgba(0,0,0,0.08)",
              "0 8px 16px rgba(107,157,247,0.25)",
              "0 24px 48px rgba(107,157,247,0.2)"
            ].join(", ")
          }}
        >
          {/* 3D GLARE: Specular top-left catch-light */}
          <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
          <div className="absolute top-[2px] left-[20px] right-[20px] h-[1px] bg-white opacity-40 blur-[0.5px] pointer-events-none" />
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-white/25 blur-[50px] rounded-full pointer-events-none" />

          {/* Header */}
          <h3 className="text-white text-[18px] md:text-[28px] font-medium leading-[1.3] relative z-10 pr-4 tracking-tight">
            Natively{" "}
            <span className="relative inline-flex items-center gap-2 px-4 py-1.5 bg-white/30 border border-white/40 rounded-full text-[14px] md:text-[18px] mx-1 align-middle backdrop-blur-xl shadow-[0_8px_16px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden group/jelly translate-y-[-1px]">
              {/* 3D Jelly Gloss highlight */}
              <div className="absolute top-0.5 left-1.5 right-1.5 h-[40%] rounded-full bg-gradient-to-b from-white/60 to-white/5 blur-[0.5px] pointer-events-none" />
              
              <div className="flex items-center gap-[1.5px] h-[10px] md:h-[12px] relative z-10">
                <div className="w-[1.5px] md:w-[2px] h-[40%] bg-white rounded-full opacity-90 shadow-[0_0_4px_rgba(255,255,255,0.5)]"></div>
                <div className="w-[1.5px] md:w-[2px] h-[100%] bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)]"></div>
                <div className="w-[1.5px] md:w-[2px] h-[60%] bg-white rounded-full opacity-90 shadow-[0_0_4px_rgba(255,255,255,0.5)]"></div>
              </div>
              <span className="opacity-100 font-medium tracking-tight relative z-10 text-white drop-shadow-sm">listens</span>
            </span>{" "}
            in to the conversation
          </h3>
          <p className="text-[14px] md:text-[17px] text-white/90 mt-3 md:mt-5 leading-[1.6] max-w-[550px] relative z-10">
            It picks up the context of your meeting in real time, so it can help when you need it.
          </p>

          {/* Record State */}
          <div className="mt-3 md:mt-6 flex flex-col items-center relative z-10 shrink-0">
            <div className="text-[36px] md:text-[52px] font-medium text-white tracking-widest tabular-nums leading-none">
              {mm}:{ss}
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-[#FF4F4F] shadow-[0_0_8px_rgba(255,79,79,0.8)]"></span>
              <span className="text-white/80 text-[14px] font-medium tracking-wide uppercase">Recording</span>
            </div>
          </div>

          {/* Waveform - Apple Style Scrolling Left */}
          <div className="mt-3 md:mt-5 mb-2 md:mb-4 relative z-10 mx-auto w-full max-w-[400px] h-[48px] md:h-[60px] flex items-center overflow-hidden shrink-0"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
            }}
          >
            <motion.div 
              className="flex items-center gap-[6px] pl-2 h-full z-10 whitespace-nowrap"
              animate={{ x: [0, -350] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ width: "fit-content" }}
            >
              {[...WAVE_BARS, ...WAVE_BARS, ...WAVE_BARS].map((h, i) => (
                <WaveBar key={i} height={h * 1.3} duration={0.8 + ((i * 7) % 100) / 250} delay={i * 0.01} />
              ))}
            </motion.div>
          </div>

          {/* Bottom Panel */}
          <div className="mt-auto relative z-20 w-full pb-2">
            <NativelyInterfaceCard isStatic hidePill hideMessages dreamyVariant />
          </div>
        </div>

        {/* RIGHT CARD */}
        <div 
          className="rounded-[32px] md:rounded-[40px] p-5 md:p-10 flex flex-col relative overflow-hidden aspect-square w-full max-w-[600px] mx-auto"
          style={{
            background: "#F2F4F8",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,1)",
              "inset 0 -2px 0 rgba(0,0,0,0.05)",
              "inset 1px 0 0 rgba(255,255,255,0.8)",
              "inset -1px 0 0 rgba(0,0,0,0.03)",
              "0 1px 3px rgba(0,0,0,0.04)",
              "0 8px 20px rgba(0,0,0,0.05)",
              "0 24px 48px rgba(0,0,0,0.06)"
            ].join(", ")
          }}
        >
          {/* Title — matching reference exactly */}
          <h3 className="text-[#111827] text-[18px] md:text-[26px] font-medium leading-[1.2] tracking-[-0.02em] relative z-10">
            When you need help, Natively{" "}
            <span className="relative inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full text-[16px] md:text-[18px] align-text-bottom -translate-y-[2px] mx-1 shadow-[0_8px_20px_rgba(37,99,235,0.3),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden">
              {/* Jelly Gloss */}
              <div className="absolute top-0.5 left-1.5 right-1.5 h-[45%] rounded-full bg-gradient-to-b from-white/60 to-white/5 blur-[0.5px] pointer-events-none" />
              
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white relative z-10 drop-shadow-sm">
                <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
              </svg>
              <span className="font-semibold text-white relative z-10 drop-shadow-sm">assists</span>
            </span>
            you instantly
          </h3>
          
          <p className="text-[14px] md:text-[17px] text-slate-500 mt-3 md:mt-5 leading-relaxed max-w-[440px] relative z-10">
            Hit Cmd/Ctrl + Enter and Natively helps you with AI in the moment.
          </p>

          <div className="mt-auto w-full flex flex-col items-center relative z-10 pb-2 shrink-0">
               <div className="w-full transform scale-[0.88] origin-bottom">
                 <NativelyInterfaceCard isStatic />
               </div>
          </div>
        </div>

      </div>
    </div>
  );
}
