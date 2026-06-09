import { LocaleLink } from "@/components/LocaleLink";
import { useTranslation } from "react-i18next";
import { motion } from "@/lib/motion";
import { Briefcase, Users, TrendingUp, GraduationCap, ArrowRight } from "lucide-react";

// Spacing and animation easing tokens
const EASE_OUT = [0.25, 1, 0.5, 1];

interface UseCase {
  to: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  glowColor: string;
  preview: React.ReactNode;
  en: { title: string; desc: string; cta: string };
  ru: { title: string; desc: string; cta: string };
}

// ─────────────────────────────────────────────────────────────
// Interactive Mockups/Previews for Parallax Visuals
// ─────────────────────────────────────────────────────────────

const InterviewPreview = () => (
  <div className="h-[140px] w-full rounded-2xl bg-[#090D16] border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between select-none">
    {/* Specular Glare */}
    <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
    
    {/* Animated horizontal laser scanning line */}
    <motion.div 
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pointer-events-none z-10"
      animate={{ top: ["15%", "85%", "15%"] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    />
    
    <div>
      {/* Mac Window Dots + Live status */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F56]/80" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
          <div className="w-2 h-2 rounded-full bg-[#27C93F]/80" />
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[7.5px] font-mono text-emerald-500 font-bold uppercase tracking-widest">ACTIVE</span>
        </div>
      </div>
      
      {/* Code Snippet */}
      <div className="font-mono text-[9.5px] text-slate-400 space-y-0.5 leading-normal">
        <div><span className="text-pink-500">const</span> path = (root) =&gt; &#123;</div>
        <div className="pl-3"><span className="text-pink-500">if</span> (!root) <span className="text-pink-500">return</span> [];</div>
        <div className="pl-3">visited.add(root);<motion.span className="inline-block w-1 h-3 bg-emerald-400 ml-0.5 align-middle" animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} /></div>
        <div>&#125;;</div>
      </div>
    </div>

    {/* Floating Jelly Glass suggestion */}
    <motion.div 
      className="relative z-10 bg-white/95 backdrop-blur-md rounded-xl border border-emerald-500/10 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] origin-bottom-left"
      animate={{ 
        y: [0, -4, 0],
        rotate: [-1, 1, -1]
      }}
      transition={{
        repeat: Infinity,
        duration: 3.5,
        ease: "easeInOut"
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="relative inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full text-[8.5px] font-bold text-white shadow-[0_4px_10px_rgba(16,185,129,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden">
          <div className="absolute top-0.5 left-1 right-1 h-[45%] rounded-full bg-gradient-to-b from-white/50 to-white/5 blur-[0.3px] pointer-events-none" />
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-white relative z-10">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          <span className="relative z-10 uppercase tracking-wider text-[7px]">Copilot</span>
        </span>
      </div>
      <p className="text-[10px] text-slate-800 font-semibold leading-snug">
        Use BFS to optimize search queries.
      </p>
    </motion.div>
  </div>
);

const MeetingPreview = () => (
  <div className="h-[140px] w-full rounded-2xl bg-white border border-slate-200 p-4 relative overflow-hidden flex flex-col justify-between select-none">
    {/* Specular Glare */}
    <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
    <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />
    
    <div>
      {/* Mac Window Dots + Live Badge */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F56]/80" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
          <div className="w-2 h-2 rounded-full bg-[#27C93F]/80" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[7.5px] font-bold text-red-500 tracking-wider">LIVE TRANSCRIBING</span>
        </div>
      </div>
      
      {/* Conversation layout */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="w-5.5 h-5.5 rounded-full bg-blue-100 flex items-center justify-center text-[9px] font-bold text-blue-600 relative z-10">A</span>
            <motion.span 
              className="absolute inset-0 rounded-full bg-blue-500/20"
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            />
          </div>
          <span className="text-[9.5px] font-semibold text-slate-800">Alex</span>
          {/* Waveform graphic */}
          <div className="flex items-center gap-[1.5px] h-3.5 px-1 bg-slate-50 border border-slate-100 rounded-md">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-[1.2px] bg-blue-500 rounded-full"
                style={{ height: "100%", originY: 0.5 }}
                animate={{
                  scaleY: [0.3, 1.2, 0.4, 1.0, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
        <p className="text-[9.5px] text-slate-500 pl-7 leading-normal font-geist">
          "We need to sync the design mockups next week."
        </p>
      </div>
    </div>

    {/* Floating Jelly Glass note */}
    <motion.div 
      className="relative z-10 bg-white/95 backdrop-blur-md rounded-xl border border-blue-500/10 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] origin-top-right"
      animate={{ 
        y: [0, 4, 0],
        rotate: [1, -1, 1]
      }}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="relative inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full text-[8.5px] font-bold text-white shadow-[0_4px_10px_rgba(59,130,246,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden">
          <div className="absolute top-0.5 left-1 right-1 h-[45%] rounded-full bg-gradient-to-b from-white/50 to-white/5 blur-[0.3px] pointer-events-none" />
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white relative z-10">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span className="relative z-10 uppercase tracking-wider text-[7px]">Note</span>
        </span>
      </div>
      <p className="text-[10px] text-slate-800 font-semibold leading-snug">
        Alex to present Figma layout on Monday.
      </p>
    </motion.div>
  </div>
);

const SalesPreview = () => (
  <div className="h-[140px] w-full rounded-2xl bg-[#090D16] border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between select-none">
    {/* Specular Glare */}
    <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-violet-500/10 blur-2xl pointer-events-none" />
    
    <div>
      {/* Mac Window Dots + Call Timer */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F56]/80" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
          <div className="w-2 h-2 rounded-full bg-[#27C93F]/80" />
        </div>
        <div className="flex items-center gap-1 font-mono text-[8px] text-violet-400">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
          <span>00:42</span>
        </div>
      </div>
      
      {/* Sales Objection text */}
      <div className="space-y-1">
        <div className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider">Prospect Objection</div>
        <p className="text-[9.5px] text-slate-300 italic leading-snug font-geist">"The pricing model isn't clear to us."</p>
        {/* Objection sentiment bar */}
        <div className="flex gap-1.5 items-center mt-1">
          <span className="text-[7px] font-bold text-slate-500 uppercase tracking-wider">Confidence</span>
          <div className="w-16 h-1 rounded-full bg-slate-800 overflow-hidden relative">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-violet-400 rounded-full" 
              animate={{ width: ["20%", "85%", "40%", "75%", "20%"] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Floating Talk Track */}
    <motion.div 
      className="relative z-10 bg-white/95 backdrop-blur-md rounded-xl border border-violet-500/10 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] origin-bottom-right"
      animate={{ 
        y: [0, -4, 0],
        rotate: [-1, 1, -1]
      }}
      transition={{
        repeat: Infinity,
        duration: 3.8,
        ease: "easeInOut"
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="relative inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-br from-violet-400 to-violet-600 rounded-full text-[8.5px] font-bold text-white shadow-[0_4px_10px_rgba(139,92,246,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden">
          <div className="absolute top-0.5 left-1 right-1 h-[45%] rounded-full bg-gradient-to-b from-white/50 to-white/5 blur-[0.3px] pointer-events-none" />
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-white relative z-10">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          <span className="relative z-10 uppercase tracking-wider text-[7px]">Coaching</span>
        </span>
      </div>
      <p className="text-[10px] text-slate-800 font-semibold leading-snug">
        Highlight 80% cost savings with local execution.
      </p>
    </motion.div>
  </div>
);

const LecturePreview = () => (
  <div className="h-[140px] w-full rounded-2xl bg-white border border-slate-200 p-4 relative overflow-hidden flex flex-col justify-between select-none"
    style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)",
      backgroundSize: "100% 16px"
    }}
  >
    {/* Specular Glare */}
    <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
    <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />
    
    <div>
      {/* Mac Window Dots + Outline */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F56]/80" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
          <div className="w-2 h-2 rounded-full bg-[#27C93F]/80" />
        </div>
        <span className="text-[8px] font-bold text-amber-600/70 tracking-widest font-mono">GRID</span>
      </div>
      
      {/* Lecture outline */}
      <div className="space-y-0.5">
        <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">Notebook</div>
        <p className="text-[9.5px] text-slate-800 font-semibold leading-snug">Distributed System Design</p>
        
        {/* Node architecture animation SVG */}
        <svg className="w-full h-8 text-slate-400 overflow-visible" viewBox="0 0 100 20">
          <line x1="20" y1="10" x2="50" y2="10" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50" y1="10" x2="80" y2="10" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
          
          <motion.circle 
            cx="20" cy="10" r="1.8" fill="#F59E0B"
            animate={{ cx: [20, 50] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
          <motion.circle 
            cx="50" cy="10" r="1.8" fill="#F59E0B"
            animate={{ cx: [50, 80] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
          />
          
          <circle cx="20" cy="10" r="3" fill="#FFF" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="50" cy="10" r="3" fill="#FFF" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="80" cy="10" r="3" fill="#FFF" stroke="#F59E0B" strokeWidth="1" />
        </svg>
      </div>
    </div>

    {/* Floating Takeaway */}
    <motion.div 
      className="relative z-10 bg-white/95 backdrop-blur-md rounded-xl border border-amber-500/10 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] origin-top-left"
      animate={{ 
        y: [0, 4, 0],
        rotate: [1, -1, 1]
      }}
      transition={{
        repeat: Infinity,
        duration: 4.2,
        ease: "easeInOut"
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="relative inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full text-[8.5px] font-bold text-white shadow-[0_4px_10px_rgba(245,158,11,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden">
          <div className="absolute top-0.5 left-1 right-1 h-[45%] rounded-full bg-gradient-to-b from-white/50 to-white/5 blur-[0.3px] pointer-events-none" />
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-white relative z-10">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          <span className="relative z-10 uppercase tracking-wider text-[7px]">Summary</span>
        </span>
      </div>
      <p className="text-[10px] text-slate-800 font-semibold leading-snug">
        Raft splits state machines into isolated subproblems.
      </p>
    </motion.div>
  </div>
);

const USE_CASES: UseCase[] = [
  {
    to: "/ai-interview-assistant",
    icon: Briefcase,
    glowColor: "rgba(16,185,129,0.04)",
    preview: <InterviewPreview />,
    en: { 
      title: "Job interviews", 
      desc: "Real-time coding, system design, and behavioral help on live interviews.",
      cta: "Explore Interview Copilot"
    },
    ru: { 
      title: "Собеседования", 
      desc: "Помощь в реальном времени с кодингом, системным дизайном и поведенческими вопросами.",
      cta: "Попробовать копилот"
    },
  },
  {
    to: "/ai-meeting-assistant",
    icon: Users,
    glowColor: "rgba(59,130,246,0.04)",
    preview: <MeetingPreview />,
    en: { 
      title: "Meetings", 
      desc: "Live transcription, instant answers, and automatic notes for any call.",
      cta: "Explore Meeting Assistant"
    },
    ru: { 
      title: "Встречи", 
      desc: "Транскрипция, мгновенные ответы и авто-заметки для любого звонка.",
      cta: "Попробовать ассистент"
    },
  },
  {
    to: "/sales-call-assistant",
    icon: TrendingUp,
    glowColor: "rgba(139,92,246,0.04)",
    preview: <SalesPreview />,
    en: { 
      title: "Sales calls", 
      desc: "On-call objection handling and talk tracks, invisible to the prospect.",
      cta: "Explore Sales Assistant"
    },
    ru: { 
      title: "Звонки по продажам", 
      desc: "Работа с возражениями и скрипты во время звонка, незаметно для клиента.",
      cta: "Попробовать продажи"
    },
  },
  {
    to: "/lecture-note-taker",
    icon: GraduationCap,
    glowColor: "rgba(245,158,11,0.04)",
    preview: <LecturePreview />,
    en: { 
      title: "Lectures", 
      desc: "Transcribe and summarize classes offline, searchable all semester.",
      cta: "Explore Lecture Notes"
    },
    ru: { 
      title: "Лекции", 
      desc: "Расшифровка и резюме занятий офлайн, поиск по всему семестру.",
      cta: "Попробовать лекции"
    },
  },
];

const UseCasesSection = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  // Stagger entry animations
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_OUT }
    }
  };

  return (
    <section className="section-spacing bg-white relative overflow-hidden" id="use-cases" style={{ backgroundColor: "#ffffff" }}>
      {/* Background radial soft lights to blend the section premium style */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-slate-50/50 blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-slate-50/30 blur-[150px] pointer-events-none translate-y-1/2" />

      <div className="max-content relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100/80 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 font-geist">
              {isRu ? "Применение" : "Versatility"}
            </span>
          </div>

          <h2
            className="hero-headline !text-black leading-[1.0] mb-5 tracking-tight text-center mx-auto"
            style={{ fontSize: "clamp(40px, 8vw, 96px)", letterSpacing: "-0.038em" }}
          >
            {isRu ? (
              <>
                Один ассистент для <br className="hidden sm:block" />
                <span className="italic font-serif text-slate-700">любого разговора</span>
              </>
            ) : (
              <>
                One assistant for every <br className="hidden sm:block" />
                <span className="italic font-serif text-slate-700">conversation</span>
              </>
            )}
          </h2>
          
          <p className="text-[18px] text-[#6B7280] font-geist leading-relaxed text-center mx-auto" style={{ maxWidth: "46ch" }}>
            {isRu
              ? "Natively — это ИИ-копилот для собеседований и ассистент для встреч в одном приложении: локально, приватно и в реальном времени."
              : "Natively is an AI interview copilot and a meeting assistant in one app — local, private, and real-time."}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {USE_CASES.map((u) => {
            const c = isRu ? u.ru : u.en;
            return (
              <motion.div key={u.to} variants={item} className="h-full">
                <LocaleLink
                  to={u.to}
                  className="group relative flex flex-col justify-between h-[390px] rounded-[32px] border border-slate-200/40 hover:border-slate-300/60 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                  style={{
                    background: "#F2F4F8",
                    boxShadow: [
                      "inset 0 1px 0 rgba(255,255,255,1)",
                      "inset 0 -2px 0 rgba(0,0,0,0.05)",
                      "inset 1px 0 0 rgba(255,255,255,0.8)",
                      "inset -1px 0 0 rgba(0,0,0,0.03)",
                      "0 1px 3px rgba(0,0,0,0.04)",
                      "0 8px 20px rgba(0,0,0,0.04)",
                      "0 24px 48px rgba(0,0,0,0.05)"
                    ].join(", ")
                  }}
                >
                  {/* Subtle color glow on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 10% 10%, ${u.glowColor} 0%, transparent 65%)`
                    }}
                  />

                  {/* Top Portion: Embedded visual preview mock */}
                  <div className="p-4 pb-0 shrink-0 relative z-10">
                    {u.preview}
                  </div>

                  {/* Bottom Portion: Text and metadata */}
                  <div className="p-6 pb-7 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      {/* Header and Icon line */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 bg-white/90 text-slate-700 shadow-sm">
                          <u.icon size={15} strokeWidth={2} />
                        </div>
                        <h3 className="text-[17px] font-semibold text-slate-900 font-geist tracking-tight transition-colors duration-200">
                          {c.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-[13px] leading-relaxed text-slate-500 font-geist">
                        {c.desc}
                      </p>
                    </div>

                    {/* CTA Link */}
                    <div 
                      className="flex items-center gap-1.5 text-[12.5px] font-semibold font-geist mt-auto transition-colors duration-200 text-slate-700 group-hover:text-slate-900"
                    >
                      <span>{c.cta}</span>
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </LocaleLink>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
