"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import nativelyLogo from "@/assets/logo.webp";

const EASE: [number,number,number,number] = [0.23, 1, 0.32, 1];
const SPRING = { type: "spring" as const, duration: 0.5, bounce: 0.12 };

const SOURCES = {
  resume: { label: "Resume",         color: "#166534", bg: "#dcfce7", border: "#86efac", dot: "#22c55e", grad: "linear-gradient(160deg, #4ade80 0%, #16a34a 50%, #15803d 100%)", shadow: "rgba(22,163,74,0.35)" },
  jd:     { label: "JD",             color: "#1e40af", bg: "#dbeafe", border: "#93c5fd", dot: "#3b82f6", grad: "linear-gradient(160deg, #5B8EF0 0%, #3B6FE8 50%, #2D5FD4 100%)", shadow: "rgba(37,99,235,0.35)" },
  custom: { label: "Custom Context", color: "#92400e", bg: "#fef3c7", border: "#fcd34d", dot: "#f59e0b", grad: "linear-gradient(160deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)", shadow: "rgba(217,119,6,0.35)" },
} as const;

type Src = keyof typeof SOURCES;

const segments: Array<{ text: string; src?: Src }> = [
  { text: "Stripe keeps coming up in my work. " },
  { text: "We integrated with your API at Google", src: "resume" },
  { text: " and every time something broke, it was on our side, never yours. That stuck with me. " },
  { text: "This role sits right at the intersection of reliability and developer experience", src: "jd" },
  { text: ", which is the part I care most about." },
];

function Citation({ text, src }: { text: string; src: Src }) {
  const s = SOURCES[src];
  return (
    <span
      className="font-semibold font-geist"
      style={{ color: s.color, fontSize: "inherit" }}
    >
      {text}
    </span>
  );
}

export default function ResumeJDAwareCard() {
  const { t } = useTranslation();

  return (
    <div className="rounded-[28px] sm:rounded-[36px] flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-[#eef0f4] aspect-[4/5] sm:aspect-[6/6] md:aspect-[6/5]">

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-blue-400/20 blur-[120px] rounded-full" />
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-emerald-300/15 blur-[100px] rounded-full" />
      </div>
      <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] shadow-[inset_0_0_140px_rgba(30,41,59,0.06)] pointer-events-none" />

      {/* UI area */}
      <div className="relative flex-1 min-h-0">
        <div className="absolute inset-0 flex flex-col justify-between px-4 pt-5 pb-3 sm:px-7 sm:pt-7 sm:pb-5">

          {/* Context pills row */}
          <motion.div
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <div className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-pulse" style={{ boxShadow: "0 0 6px rgba(34,197,94,0.7)" }} />
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#9CA3AF] font-geist tracking-[0.06em]">3 contexts active</span>
              <div className="flex items-center gap-1 sm:gap-1.5 sm:ml-1 flex-wrap">
              {(Object.entries(SOURCES) as [Src, typeof SOURCES[Src]][]).map(([key, s], i) => (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING, delay: 0.05 + i * 0.05 }}
                  className="relative text-[10px] sm:text-[11px] font-semibold px-2 sm:px-3 py-[3px] sm:py-[4px] rounded-full font-geist text-white overflow-hidden"
                  style={{ background: s.grad, boxShadow: `0 4px 12px ${s.shadow}`, border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <div className="absolute top-0.5 left-1.5 right-1.5 h-[45%] rounded-full bg-gradient-to-b from-white/60 to-white/5 blur-[0.5px] pointer-events-none" />
                  <span className="relative drop-shadow-sm">{s.label}</span>
                </motion.span>
              ))}
              </div>
            </div>
            <p className="text-[10px] text-[#B0B8C8] font-geist leading-snug">Natively reads your resume, job description, and prep notes to answer for you.</p>
          </motion.div>

          {/* Chat bubbles */}
          <div className="flex flex-col gap-2 sm:gap-3">

            {/* Interviewer */}
            <motion.div
              className="self-end"
              style={{ maxWidth: "80%" }}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.1 }}
            >
              <div className="flex items-center gap-1.5 mb-1.5 justify-end">
                <span className="text-[8.5px] font-bold text-[#8890a0] uppercase tracking-[0.14em] font-geist">Interviewer</span>
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Interviewer"
                  className="w-5 h-5 rounded-full object-cover"
                  style={{ boxShadow: "0 0 0 1.5px white, 0 1px 4px rgba(0,0,0,0.1)" }}
                />
              </div>
              <div
                className="rounded-[16px] rounded-tr-[4px] px-3 py-2 sm:px-4 sm:py-3"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.03)",
                }}
              >
                <p className="text-[11.5px] sm:text-[12.5px] text-[#4B5563] font-geist leading-[1.55] sm:leading-[2] font-semibold">
                  Why are you interested in this role specifically?
                </p>
              </div>
            </motion.div>

            {/* AI response */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.22 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                  style={{
                    background: "linear-gradient(160deg, rgba(90,90,108,0.9), rgba(36,36,50,0.97))",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  <img src={nativelyLogo} alt="Natively" className="w-[15px] h-[15px] object-contain" />
                </div>
                <span className="text-[8.5px] font-bold text-[#8890a0] uppercase tracking-[0.14em] font-geist">Natively AI</span>
              </div>

              <div
                className="rounded-[18px] rounded-tl-[5px] px-3 py-3 sm:px-4 sm:py-4"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)",
                }}
              >
                <p className="text-[11.5px] sm:text-[12.5px] text-[#374151] font-geist leading-[1.6] sm:leading-[2]">
                  {segments.map((seg, i) =>
                    seg.src
                      ? <Citation key={i} text={seg.text} src={seg.src} />
                      : <span key={i}>{seg.text}</span>
                  )}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Text — pinned bottom */}
      <div className="relative p-5 pt-3 sm:p-8 sm:pt-4 shrink-0">
        <h3 className="text-[20px] sm:text-[22px] md:text-[32px] leading-[1.15] font-semibold mb-2 text-[#2b3445] font-geist tracking-[-0.02em]">
          {t("features.card3_title")}
        </h3>
        <p className="text-[14px] sm:text-[16px] leading-relaxed max-w-full sm:max-w-[90%] text-[#7b8596] font-geist">
          {t("features.card3_desc")}
        </p>
      </div>
    </div>
  );
}
