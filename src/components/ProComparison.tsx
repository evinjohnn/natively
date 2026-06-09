"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useTranslation } from "react-i18next";
import { 
  Check, X, Sparkles, Mic2, Globe, RefreshCw, 
  ArrowUpRight, Play, ChevronRight, Layers, 
  UserCheck, Database, TrendingUp, Scan, 
  Target, FileText, Building2, Monitor, Award, ShieldAlert
} from "lucide-react";
import nativelyLogo from "@/assets/logo.webp";

// ── LOCALIZATION DICTIONARY ──
const LOCAL_I18N = {
  en: {
    sl_badge_free: "Free forever",
    sl_badge_pro: "One-time · yours forever",
    hide: "Hide",
    listening: "Listening for interviewer...",
    chip_what: "What to answer?",
    chip_shorten: "Shorten",
    chip_recap: "Recap",
    chip_fup: "Follow Up",
    chip_answer: "Answer",
    inp_free: "Ask anything on screen or conversation...",
    inp_pro: "Ask anything — Natively knows your resume and this company...",
    ctx_label: "Pro context active",
    ctx_stripe: "Stripe · Senior Backend",
    ctx_resume: "Resume loaded",
    ctx_yoe: "5 YOE · Infra",
    ctx_nego: "Negotiation ON",
    say_this: "Say this",
    say_this_stripe: "Say this · tailored to Stripe",
    nego_head: "Negotiation copilot · Stripe L5",
    nego_badge: "Live · Mar 2026",
    cite_eng: "Stripe network protocol cited",
    cite_resume: "Matched your resume",
    cite_tradeoff: "Latency tradeoffs included",
    nego_l5: "L5 TC: $245K–$310K",
    nego_anchor: "Anchor: $280–295K",
    nego_flex: 'Don\'t say "flexible" first',
    nego_counter: "Counter within 15%",
    fup_label: "Follow-up questions",
    fup_label_stripe: "Follow-up questions · Stripe-tailored",
    recording: "Recording...",
    q1_ann: '"What is the difference between TCP and UDP?"',
    q1_press: 'Both panels: pressing "What to answer?"',
    q2_ann: '"What compensation are you targeting for this role?"',
    q2_press: 'Both panels: holding "Answer" to speak',
    q3_ann: '"Do you have any questions for us?"',
    q3_press: 'Both panels: pressing "Follow Up"',
    end_free_eyebrow: "Natively Free",
    end_free_h: "Good enough to get by.",
    end_free_sub: "Real-time AI. Any model. Runs locally. Free forever with your own API keys.",
    end_free_f1: "Live transcription & AI answers",
    end_free_f2: "Screenshot OCR analysis",
    end_free_f3: "Undetectable stealth mode",
    end_free_f4: "Local RAG memory",
    end_free_btn: "Download free →",
    end_replay: "Replay",
    end_note_free: "AGPL-3.0 open source · github.com/Natively-AI-assistant",
    end_pro_eyebrow: "Natively Pro",
    end_pro_h: "Built to get the offer.",
    end_pro_sub: "Everything in Free, plus resume & JD context, live company intelligence, and salary negotiation copilot.",
    end_pro_f1: "Resume & JD context awareness",
    end_pro_f2: "Live company research & dossiers",
    end_pro_f3: "Salary negotiation copilot",
    end_pro_f4: "Priority support & feature access",
    end_pro_btn: "Get Natively Pro →",
    end_replay_demo: "Replay Demo",
    end_note_pro: "One-time purchase · No subscription · yours forever",
    q1_free_answer: "TCP is connection-oriented, guaranteeing that packets are delivered in order without data loss. UDP is connectionless, prioritizing speed by sending packets immediately without verification.",
    q1_pro_answer: "At Stripe's API layer, we use TCP (via TLS/HTTP) to ensure transactional reliability and packet ordering. For low-overhead telemetry and log aggregation, we use UDP to minimize latency and CPU overhead.",
    q2_free_answer: "I'm open to discussing compensation. I'm targeting something competitive with market rate for this role and location. I'm flexible and happy to discuss the full package.",
    q2_pro_answer: "Based on my research, I'm targeting $280–295K total comp for this level at Stripe. That's anchored to L5 benchmarks on levels.fyi and reflects my distributed infrastructure background.",
    q3_free_qs: [
      "How does the team handle packet loss in lossy network environments?",
      "When is UDP preferred over TCP in client-facing applications?",
      "How does HTTP/3 change the reliability characteristics of UDP?"
    ],
    q3_pro_qs: [
      "Does Stripe use HTTP/3 or QUIC internally to mitigate TCP head-of-line blocking?",
      "How is telemetry packet loss handled over UDP at Stripe's scale?",
      "How do we balance consistency and performance for low-latency Stripe API endpoints?"
    ],
    q1_user: "What to answer?",
    q2_user: "What should I say about salary?",
    q3_user: "Questions I should ask them?",
    or: "or",
    skip_demo: "Skip Demo →"
  },
  ru: {
    sl_badge_free: "Бесплатно навсегда",
    sl_badge_pro: "Одноразово · навсегда",
    hide: "Скрыть",
    listening: "Слушаем интервьюера...",
    chip_what: "Что ответить?",
    chip_shorten: "Короче",
    chip_recap: "Итоги",
    chip_fup: "Уточнить",
    chip_answer: "Ответ",
    inp_free: "Спросите что-нибудь об экране или разговоре...",
    inp_pro: "Спросите что угодно — Natively знает ваше резюме и эту компанию...",
    ctx_label: "Pro контекст активен",
    ctx_stripe: "Stripe · Senior Backend",
    ctx_resume: "Резюме загружено",
    ctx_yoe: "5 лет опыта · Инфра",
    ctx_nego: "Переговоры ВКЛ",
    say_this: "Скажите это",
    say_this_stripe: "Скажите это · адаптировано для Stripe",
    nego_head: "Помощник переговоров · Stripe L5",
    nego_badge: "Live · Мар 2026",
    cite_eng: "Сетевой протокол Stripe",
    cite_resume: "Совпадение с резюме",
    cite_tradeoff: "Компромисс задержки включён",
    nego_l5: "L5 TC: $245K–$310K",
    nego_anchor: "Якорь: $280–295K",
    nego_flex: "Не говорите «гибкий» первым",
    nego_counter: "Контрпредложение в пределах 15%",
    fup_label: "Вопросы для собеседования",
    fup_label_stripe: "Вопросы · адаптировано для Stripe",
    recording: "Запись...",
    q1_ann: '"В чем разница между TCP и UDP?"',
    q1_press: 'Обе панели: нажата кнопка "Что ответить?"',
    q2_ann: '"На какую компенсацию вы рассчитываете?"',
    q2_press: 'Обе панели: удержание кнопки "Ответ"',
    q3_ann: '"Есть ли у вас вопросы к нам?"',
    q3_press: 'Обе панели: нажата кнопка "Уточнить"',
    end_free_eyebrow: "Natively Free",
    end_free_h: "Хватит, чтобы справиться.",
    end_free_sub: "ИИ в реальном времени. Любая модель. Работает локально. Бесплатно навсегда со своими API-ключами.",
    end_free_f1: "Транскрипция и ответы ИИ в реальном времени",
    end_free_f2: "OCR-анализ скриншотов",
    end_free_f3: "Незаметный режим стелс",
    end_free_f4: "Локальная RAG-память",
    end_free_btn: "Скачать бесплатно →",
    end_replay: "Повтор",
    end_note_free: "AGPL-3.0 open source · github.com/Natively-AI-assistant",
    end_pro_eyebrow: "Natively Pro",
    end_pro_h: "Создан, чтобы получить оффер.",
    end_pro_sub: "Всё из Free, плюс контекст резюме и описания вакансии, досье на компанию и помощник в переговорах.",
    end_pro_f1: "Контекст резюме и описания вакансии",
    end_pro_f2: "Разведка о компании и досье",
    end_pro_f3: "Помощник переговоров по зарплате",
    end_pro_f4: "Приоритетная поддержка и доступ к функциям",
    end_pro_btn: "Получить Natively Pro →",
    end_replay_demo: "Повтор демо",
    end_note_pro: "Одноразовая покупка · Без подписки · навсегда",
    q1_free_answer: "TCP — это протокол с установлением соединения, гарантирующий доставку и порядок пакетов, тогда как UDP работает без установления соединения и отправляет пакеты без проверки. TCP используется для точности данных (например, веб-трафик), а UDP — для скорости (например, видеостриминг).",
    q1_pro_answer: "На уровне API Stripe мы используем TCP (через TLS/HTTP) для обеспечения транзакционной надежности и упорядоченности пакетов. Для логов и сбора телеметрии с низкими накладными расходами мы используем UDP, чтобы минимизировать задержки и нагрузку на CPU.",
    q2_free_answer: "Я открыт к обсуждению компенсации. Рассчитываю на конкурентную рыночную ставку для этой роли и локации. Гибкий и готов обсудить полный пакет.",
    q2_pro_answer: "По моим данным, я рассчитываю на $280–295K общего дохода для этого уровня в Stripe. Это основано на L5 бенчмарках levels.fyi и отражает мой опыт в распределённой инфраструктуре.",
    q3_free_qs: [
      "Как команда обрабатывает потерю пакетов в нестабильных сетевых окружениях?",
      "Когда UDP предпочтительнее TCP в клиентских приложениях?",
      "Как HTTP/3 меняет характеристики надежности поверх UDP?"
    ],
    q3_pro_qs: [
      "Использует ли Stripe HTTP/3 или QUIC внутри инфраструктуры для снижения TCP head-of-line blocking?",
      "Как обрабатывается потеря пакетов телеметрии по UDP на масштабе Stripe?",
      "Как мы балансируем согласованность и производительность для эндпоинтов Stripe API с низким временем отклика?"
    ],
    q1_user: "Что ответить?",
    q2_user: "Что мне сказать про зарплату?",
    q3_user: "Какие вопросы им задать?",
    or: "или",
    skip_demo: "Пропустить демо →"
  }
};

type Message = {
  id: string;
  sender: "user" | "ai" | "thinking";
  text: string;
  type?: "default" | "citation" | "nego" | "fup";
  cites?: string[];
  fupQuestions?: string[];
};

export default function ProComparison() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language === "ru" || i18n.language?.startsWith("ru")) ? "ru" : "en";
  const dict = LOCAL_I18N[currentLang];

  // Mobile navigation tabs: 'free' or 'pro'
  const [mobileTab, setMobileTab] = useState<"free" | "pro">("free");

  // Interactive Timeline state
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentQuestionBanner, setCurrentQuestionBanner] = useState("");
  const [bannerAnnotation, setBannerAnnotation] = useState("");
  const [showEndScreen, setShowEndScreen] = useState(false);

  // App mockup states
  const [freeListening, setFreeListening] = useState(true);
  const [freeListeningText, setFreeListeningText] = useState("");
  const [freeListeningActive, setFreeListeningActive] = useState(false);

  const [proListening, setProListening] = useState(true);
  const [proListeningText, setProListeningText] = useState("");
  const [proListeningActive, setProListeningActive] = useState(false);

  const [showProContext, setShowProContext] = useState(false);
  const [highlightedChip, setHighlightedChip] = useState<string | null>(null);

  const [freeMessages, setFreeMessages] = useState<Message[]>([]);
  const [proMessages, setProMessages] = useState<Message[]>([]);

  // Storing abort ref to prevent overlapping timelines
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Chat scroll container refs
  const freeChatRef = useRef<HTMLDivElement>(null);
  const proChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (freeChatRef.current) {
      freeChatRef.current.scrollTop = freeChatRef.current.scrollHeight;
    }
  }, [freeMessages]);

  useEffect(() => {
    if (proChatRef.current) {
      proChatRef.current.scrollTop = proChatRef.current.scrollHeight;
    }
  }, [proMessages]);

  const startDemo = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    runDemo(controller.signal);
  };

  useEffect(() => {
    startDemo();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang]);

  const wait = (ms: number, signal: AbortSignal) => new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timeout);
      reject(new Error("aborted"));
    };
    signal.addEventListener("abort", onAbort);
  });

  const typeText = async (
    text: string, 
    speed: number, 
    onChar: (typed: string) => void, 
    signal: AbortSignal
  ) => {
    let current = "";
    for (let i = 0; i < text.length; i++) {
      if (signal.aborted) throw new Error("aborted");
      current += text[i];
      onChar(current);
      await wait(speed, signal);
    }
  };

  const runDemo = async (signal: AbortSignal) => {
    try {
      // ── Reset All States ──
      setProgress(0);
      setCurrentQuestionBanner(dict.q1_ann);
      setBannerAnnotation("");
      setShowEndScreen(false);
      
      setFreeListening(true);
      setFreeListeningText(dict.listening);
      setFreeListeningActive(false);
      
      setProListening(true);
      setProListeningText(dict.listening);
      setProListeningActive(false);
      
      setShowProContext(false);
      setHighlightedChip(null);
      setFreeMessages([]);
      setProMessages([]);

      // Start initial delay
      await wait(1500, signal);
      setProgress(4);

      // ==========================================
      // ── QUESTION 1 ──
      // ==========================================
      setBannerAnnotation("");
      setFreeListeningActive(true);
      setProListeningActive(true);
      
      // Type out question in transcription bars
      await Promise.all([
        typeText(dict.q1_ann, 20, (t) => setFreeListeningText(t), signal),
        typeText(dict.q1_ann, 20, (t) => setProListeningText(t), signal)
      ]);

      await wait(800, signal);
      
      // Done listening, active contexts kick in
      setFreeListeningActive(false);
      setProListeningActive(false);
      setShowProContext(true);
      setProgress(12);

      // Flashing "What to answer?" chip
      setBannerAnnotation(dict.q1_press);
      setHighlightedChip("what");
      await wait(800, signal);
      setHighlightedChip(null);

      // User presses chip -> sends user message
      setFreeMessages([{ id: "q1_u", sender: "user", text: dict.q1_user }]);
      setProMessages([{ id: "q1_u", sender: "user", text: dict.q1_user }]);
      setProgress(20);

      // Thinking indicators
      setFreeMessages(prev => [...prev, { id: "q1_f_think", sender: "thinking", text: "" }]);
      setProMessages(prev => [...prev, { id: "q1_p_think", sender: "thinking", text: "" }]);
      await wait(1500, signal);

      // Animate AI Answer 1 typing
      // Remove thinking
      setFreeMessages(prev => prev.filter(m => m.id !== "q1_f_think"));
      setProMessages(prev => prev.filter(m => m.id !== "q1_p_think"));

      const freeAnsMsg: Message = { id: "q1_f_a", sender: "ai", text: "", type: "default" };
      const proAnsMsg: Message = { 
        id: "q1_p_a", 
        sender: "ai", 
        text: "", 
        type: "citation", 
        cites: [dict.cite_eng, dict.cite_resume, dict.cite_tradeoff] 
      };

      setFreeMessages(prev => [...prev, freeAnsMsg]);
      setProMessages(prev => [...prev, proAnsMsg]);

      await Promise.all([
        typeText(dict.q1_free_answer, 12, (t) => {
          setFreeMessages(prev => prev.map(m => m.id === "q1_f_a" ? { ...m, text: t } : m));
        }, signal),
        typeText(dict.q1_pro_answer, 10, (t) => {
          setProMessages(prev => prev.map(m => m.id === "q1_p_a" ? { ...m, text: t } : m));
        }, signal)
      ]);

      setProgress(40);
      await wait(2500, signal);

      // ==========================================
      // ── QUESTION 2 ──
      // ==========================================
      setCurrentQuestionBanner(dict.q2_ann);
      setBannerAnnotation("");
      setFreeListeningText(dict.listening);
      setProListeningText(dict.listening);
      setFreeListeningActive(true);
      setProListeningActive(true);

      await Promise.all([
        typeText(dict.q2_ann, 20, (t) => setFreeListeningText(t), signal),
        typeText(dict.q2_ann, 20, (t) => setProListeningText(t), signal)
      ]);

      await wait(800, signal);
      setFreeListeningActive(false);
      setProListeningActive(false);
      setProgress(50);

      // Pressing Answer / speaking
      setBannerAnnotation(dict.q2_press);
      setHighlightedChip("answer");
      await wait(1200, signal);
      setHighlightedChip(null);

      // User speaks
      setFreeMessages(prev => [...prev, { id: "q2_u", sender: "user", text: dict.q2_user }]);
      setProMessages(prev => [...prev, { id: "q2_u", sender: "user", text: dict.q2_user }]);
      
      setFreeMessages(prev => [...prev, { id: "q2_f_think", sender: "thinking", text: "" }]);
      setProMessages(prev => [...prev, { id: "q2_p_think", sender: "thinking", text: "" }]);
      await wait(1500, signal);

      setFreeMessages(prev => prev.filter(m => m.id !== "q2_f_think"));
      setProMessages(prev => prev.filter(m => m.id !== "q2_p_think"));

      const freeAnsMsg2: Message = { id: "q2_f_a", sender: "ai", text: "", type: "default" };
      const proAnsMsg2: Message = { id: "q2_p_a", sender: "ai", text: "", type: "nego" };

      setFreeMessages(prev => [...prev, freeAnsMsg2]);
      setProMessages(prev => [...prev, proAnsMsg2]);

      await Promise.all([
        typeText(dict.q2_free_answer, 12, (t) => {
          setFreeMessages(prev => prev.map(m => m.id === "q2_f_a" ? { ...m, text: t } : m));
        }, signal),
        typeText(dict.q2_pro_answer, 10, (t) => {
          setProMessages(prev => prev.map(m => m.id === "q2_p_a" ? { ...m, text: t } : m));
        }, signal)
      ]);

      setProgress(68);
      await wait(2500, signal);

      // ==========================================
      // ── QUESTION 3 ──
      // ==========================================
      setCurrentQuestionBanner(dict.q3_ann);
      setBannerAnnotation("");
      setFreeListeningText(dict.listening);
      setProListeningText(dict.listening);
      setFreeListeningActive(true);
      setProListeningActive(true);

      await Promise.all([
        typeText(dict.q3_ann, 20, (t) => setFreeListeningText(t), signal),
        typeText(dict.q3_ann, 20, (t) => setProListeningText(t), signal)
      ]);

      await wait(800, signal);
      setFreeListeningActive(false);
      setProListeningActive(false);
      setProgress(78);

      setBannerAnnotation(dict.q3_press);
      setHighlightedChip("fup");
      await wait(1000, signal);
      setHighlightedChip(null);

      // User prompt
      setFreeMessages(prev => [...prev, { id: "q3_u", sender: "user", text: dict.q3_user }]);
      setProMessages(prev => [...prev, { id: "q3_u", sender: "user", text: dict.q3_user }]);

      setFreeMessages(prev => [...prev, { id: "q3_f_think", sender: "thinking", text: "" }]);
      setProMessages(prev => [...prev, { id: "q3_p_think", sender: "thinking", text: "" }]);
      await wait(1400, signal);

      setFreeMessages(prev => prev.filter(m => m.id !== "q3_f_think"));
      setProMessages(prev => prev.filter(m => m.id !== "q3_p_think"));

      const freeAnsMsg3: Message = { id: "q3_f_a", sender: "ai", text: "", type: "fup", fupQuestions: [] };
      const proAnsMsg3: Message = { id: "q3_p_a", sender: "ai", text: "", type: "fup", fupQuestions: [] };

      setFreeMessages(prev => [...prev, freeAnsMsg3]);
      setProMessages(prev => [...prev, proAnsMsg3]);

      // Sequentially load the follow up questions
      const freeQs = dict.q3_free_qs;
      const proQs = dict.q3_pro_qs;

      for (let i = 0; i < 3; i++) {
        if (signal.aborted) throw new Error("aborted");
        await wait(500, signal);
        setFreeMessages(prev => prev.map(m => m.id === "q3_f_a" ? { ...m, fupQuestions: [...(m.fupQuestions || []), freeQs[i]] } : m));
        setProMessages(prev => prev.map(m => m.id === "q3_p_a" ? { ...m, fupQuestions: [...(m.fupQuestions || []), proQs[i]] } : m));
      }

      setProgress(92);
      await wait(3000, signal);

      // End
      setProgress(100);
      await wait(500, signal);
      setShowEndScreen(true);

    } catch (e) {
      // aborted, ignore
    }
  };

  const skipDemo = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setProgress(100);
    setShowEndScreen(true);
  };

  const formattedTime = () => {
    const d = new Date();
    const h = d.getHours() % 12 || 12;
    const m = d.getMinutes().toString().padStart(2, "0");
    const ampm = d.getHours() >= 12 ? "PM" : "AM";
    return `${h}:${m} ${ampm}`;
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#FAF9F5] rounded-[36px] overflow-hidden border border-black/5 shadow-2xl relative">
      
      {/* ── Progress Bar & Timer Header ── */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-5 bg-white border-b border-black/5 z-20 gap-4">
        
        {/* Active Question Banner */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C1440E] animate-pulse shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#C1440E] tracking-wider leading-none">Interviewer Statement</span>
            <p className="text-[14px] md:text-[15px] font-semibold text-slate-800 line-clamp-1 max-w-[340px] md:max-w-[480px] mt-1 font-geist">
              {currentQuestionBanner}
            </p>
          </div>
        </div>

        {/* Live Annotations */}
        {bannerAnnotation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] md:text-[12px] font-semibold font-mono text-[#C1440E] bg-[#C1440E]/5 border border-[#C1440E]/15 px-3 py-1.5 rounded-full"
          >
            {bannerAnnotation}
          </motion.div>
        )}

        <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end w-full md:w-auto">
          {/* Skip Button */}
          {!showEndScreen && (
            <button 
              onClick={skipDemo}
              className="text-[12px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider shrink-0"
            >
              {dict.skip_demo}
            </button>
          )}

          {/* Time display */}
          <div className="text-[12px] font-semibold text-slate-400 font-geist">
            {formattedTime()}
          </div>
        </div>

      </div>

      {/* Progress slider indicator */}
      <div className="w-full h-1 bg-slate-100 relative overflow-hidden z-20">
        <motion.div 
          className="absolute left-0 top-0 bottom-0 bg-indigo-600"
          style={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      {/* ── Segment Toggle for Mobile/Tablet ── */}
      <div className="flex md:hidden w-full px-4 pt-4 pb-0 z-20 bg-[#FAF9F5]">
        <div className="flex w-full bg-slate-200/60 rounded-xl p-1">
          <button 
            onClick={() => setMobileTab("free")}
            className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all ${
              mobileTab === "free" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            Natively Free
          </button>
          <button 
            onClick={() => setMobileTab("pro")}
            className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all ${
              mobileTab === "pro" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500"
            }`}
          >
            Natively Pro
          </button>
        </div>
      </div>

      {/* ── Main Comparison Grid ── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 relative overflow-hidden min-h-[520px]">

        {/* Vertical Separator Line & VS Badge (Desktop Only) */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-slate-200 dark:bg-slate-800 z-30 -translate-x-1/2 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-indigo-600 border border-indigo-500 flex items-center justify-center shadow-lg">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">VS</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* LEFT COLUMN: NATIVELY FREE (Light Minimalist Theme) */}
        {/* ══════════════════════════════════════════════════════════ */}
        <div 
          className={`relative p-6 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 ${
            mobileTab === "free" ? "block w-full" : "hidden md:block w-full"
          }`}
          style={{
            background: "linear-gradient(160deg, #F4F1EB 0%, #FAF9F5 60%, #EFECE6 100%)"
          }}
        >
          {/* Subtle Grid Dotted pattern */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{
              backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />
          <div className="absolute -top-12 -left-12 w-96 h-96 bg-yellow-400/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Header row */}
          <div className="flex items-center justify-between mb-8 z-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Standard Tier</p>
              <h4 className="text-[20px] font-bold text-slate-800 mt-1 font-geist">Natively Free</h4>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 bg-slate-200/80 text-slate-600 rounded-full border border-slate-300/40">
              {dict.sl_badge_free}
            </span>
          </div>

          {/* Shell Container */}
          <div className="flex-1 flex flex-col w-full max-w-[480px] mx-auto z-10 rounded-[24px] border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden min-h-[360px] max-h-[380px] justify-between">
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[11px] font-semibold text-slate-500 font-geist">Ollama Mode</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span>Local Engine</span>
              </div>
            </div>

            {/* Live audio bar */}
            <div className="flex items-center gap-2.5 px-4 py-2 border-b border-slate-50 bg-slate-50/20 text-slate-600">
              <div className={`w-2 h-2 rounded-full ${freeListeningActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              <p className={`text-[11px] font-geist truncate ${freeListeningActive ? 'text-slate-800 font-medium' : 'text-slate-400 font-light italic'}`}>
                {freeListeningText}
              </p>
            </div>

            {/* Scrolling Chat */}
            <div ref={freeChatRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 scroll-smooth scrollbar-thin">
              <AnimatePresence>
                {freeMessages.map((m) => (
                  <motion.div 
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    {m.sender === "user" ? (
                      <div className="max-w-[80%] bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-blue-900 rounded-2xl rounded-tr-sm px-3.5 py-2 text-[12.5px] font-geist leading-normal">
                        {m.text}
                      </div>
                    ) : m.sender === "thinking" ? (
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-emerald-500/20 bg-emerald-500/5 p-3.5">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">
                          <Check size={10} className="stroke-[3]" />
                          <span>{dict.say_this}</span>
                        </div>
                        <p className="text-[12px] text-slate-700 leading-relaxed font-geist">
                          {m.text}
                        </p>
                        
                        {m.type === "fup" && m.fupQuestions && m.fupQuestions.length > 0 && (
                          <div className="mt-3 space-y-2 border-t border-slate-100 pt-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{dict.fup_label}</span>
                            {m.fupQuestions.map((q, idx) => (
                              <div key={idx} className="flex gap-1.5 text-[11px] text-slate-600 font-geist">
                                <span className="font-bold text-slate-400 shrink-0">{idx+1}.</span>
                                <span>{q}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Interactive chips */}
            <div className="flex flex-wrap gap-1.5 p-3 border-t border-slate-100 bg-slate-50/50 justify-center">
              {["what", "shorten", "recap", "fup", "answer"].map((c) => {
                const labelMap: Record<string, string> = {
                  what: dict.chip_what,
                  shorten: dict.chip_shorten,
                  recap: dict.chip_recap,
                  fup: dict.chip_fup,
                  answer: dict.chip_answer
                };
                const isSelected = highlightedChip === c;
                return (
                  <span 
                    key={c}
                    className={`text-[9.5px] font-medium px-2.5 py-1 rounded-full border transition-all duration-200 ${
                      isSelected 
                        ? "bg-[#3B82F6]/20 border-[#3B82F6] text-[#1E40AF] scale-95 shadow-inner" 
                        : "bg-white border-slate-200 text-slate-500"
                    }`}
                  >
                    {labelMap[c]}
                  </span>
                );
              })}
            </div>

            {/* Bottom Input Area */}
            <div className="p-3 bg-slate-50/40 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-geist font-light italic truncate max-w-[80%]">
                {dict.inp_free}
              </span>
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                <ChevronRight size={12} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="h-6" />

          {/* End Screen overlay for Free side */}
          {showEndScreen && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-[#F4F1EB] z-40 p-6 md:p-10 flex flex-col justify-between"
            >
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
                  {dict.end_free_eyebrow}
                </span>
                <h3 className="text-[26px] md:text-[36px] font-medium text-slate-800 font-geist leading-[1.1] mb-4">
                  {dict.end_free_h.replace("<br>", " ").replace("<em>", "").replace("</em>", "")}
                </h3>
                <p className="text-[13px] md:text-[14px] text-slate-500 max-w-[34ch] mb-8 leading-relaxed font-geist">
                  {dict.end_free_sub}
                </p>

                <ul className="space-y-2.5 mb-8 text-left inline-block">
                  {[dict.end_free_f1, dict.end_free_f2, dict.end_free_f3, dict.end_free_f4].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Check size={8} className="text-emerald-600 stroke-[3]" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <a 
                  href="https://github.com/Natively-AI-assistant/natively-cluely-ai-assistant/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[280px] py-3.5 rounded-[14px] text-[13px] font-bold text-white text-center shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #4B4859 0%, #1A1921 100%)",
                  }}
                >
                  {dict.end_free_btn}
                </a>
                <button 
                  onClick={startDemo}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-700 uppercase tracking-widest transition-colors py-2"
                >
                  <RefreshCw size={11} />
                  {dict.end_replay}
                </button>
              </div>
            </motion.div>
          )}

        </div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* RIGHT COLUMN: NATIVELY PRO (Premium Jelly-Clay Light Theme) */}
        {/* ══════════════════════════════════════════════════════════ */}
        <div 
          className={`relative p-6 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 ${
            mobileTab === "pro" ? "block w-full" : "hidden md:block w-full"
          }`}
          style={{
            background: "linear-gradient(160deg, #F5F7FB 0%, #FAFBFD 60%, #EEF1F6 100%)"
          }}
        >
          {/* Subtle Grid Dotted pattern */}
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none" 
            style={{
              backgroundImage: "radial-gradient(circle, #6366f1 1.2px, transparent 1.2px)",
              backgroundSize: "26px 26px"
            }}
          />
          <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Header row */}
          <div className="flex items-center justify-between mb-8 z-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-500/80 leading-none">Premium License</p>
              <h4 className="text-[20px] font-bold text-slate-800 mt-1 font-geist">Natively Pro</h4>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 bg-indigo-500/10 text-indigo-600 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.06)]">
              {dict.sl_badge_pro}
            </span>
          </div>

          {/* Shell Container */}
          <div className="flex-1 flex flex-col w-full max-w-[480px] mx-auto z-10 rounded-[24px] border border-indigo-200/60 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[360px] max-h-[380px] justify-between relative">
            
            {/* Top Speckle Ambient Shimmer */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent pointer-events-none" />

            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" style={{ boxShadow: "0 0 8px rgba(99,102,241,0.7)" }} />
                <span className="text-[11px] font-semibold text-indigo-600 font-geist">Natively API</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span>Cloud Max Engine</span>
              </div>
            </div>

            {/* Live audio bar */}
            <div className="flex items-center gap-2.5 px-4 py-2 border-b border-slate-50 bg-slate-50/20 text-slate-800">
              <div className={`w-2 h-2 rounded-full ${proListeningActive ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'}`} />
              <p className={`text-[11px] font-geist truncate ${proListeningActive ? 'text-slate-800 font-medium' : 'text-slate-400 font-light italic'}`}>
                {proListeningText}
              </p>
            </div>

            {/* Scrolling Chat */}
            <div ref={proChatRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 scroll-smooth scrollbar-none">
              
              {/* Dynamic Context Card (Pro exclusive) */}
              {showProContext && (
                <motion.div 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-indigo-500/[0.02] border border-indigo-500/10 rounded-xl p-3 mb-2"
                >
                  <p className="text-[8.5px] font-bold text-indigo-500 uppercase tracking-widest mb-2 leading-none">
                    {dict.ctx_label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[dict.ctx_stripe, dict.ctx_resume, dict.ctx_yoe, dict.ctx_nego].map((tag, i) => (
                      <span 
                        key={i} 
                        className={`text-[9.5px] font-medium px-2 py-0.5 rounded border ${
                          tag === dict.ctx_nego
                            ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 font-bold"
                            : "bg-indigo-500/5 border-indigo-500/15 text-indigo-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                {proMessages.map((m) => (
                  <motion.div 
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    {m.sender === "user" ? (
                      <div className="max-w-[80%] bg-indigo-500/10 border border-indigo-500/20 text-indigo-900 rounded-2xl rounded-tr-sm px-3.5 py-2 text-[12.5px] font-geist leading-normal">
                        {m.text}
                      </div>
                    ) : m.sender === "thinking" ? (
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : m.type === "nego" ? (
                      // Negotiation custom card (Pro exclusive)
                      <div className="w-full max-w-[90%] rounded-2xl overflow-hidden border border-indigo-500/20 bg-white shadow-xl">
                        <div className="bg-indigo-5/50 px-3.5 py-2 border-b border-indigo-100 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold text-indigo-600 uppercase tracking-widest">{dict.nego_head}</span>
                          <span className="text-[8.5px] font-mono text-emerald-700 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">{dict.nego_badge}</span>
                        </div>
                        <div className="p-3.5">
                          <p className="text-[12px] text-slate-800 leading-relaxed font-geist mb-3">
                            {m.text}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[9.5px] font-mono bg-emerald-500/10 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-semibold">{dict.nego_l5}</span>
                            <span className="text-[9.5px] font-mono bg-indigo-500/10 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded font-semibold">{dict.nego_anchor}</span>
                            <span className="text-[9.5px] font-mono bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded">{dict.nego_flex}</span>
                            <span className="text-[9.5px] font-mono bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded">{dict.nego_counter}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-indigo-500/20 bg-indigo-500/5 p-3.5">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-600 uppercase tracking-widest mb-1.5">
                          <Sparkles size={10} className="text-indigo-500" />
                          <span>{dict.say_this_stripe}</span>
                        </div>
                        <p className="text-[12px] text-slate-800 leading-relaxed font-geist">
                          {m.text}
                        </p>
                        
                        {m.cites && m.cites.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-2">
                            {m.cites.map((cite, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/10 text-indigo-600 border border-indigo-100 text-[9.5px] font-mono rounded font-medium">
                                <span className="w-1 h-1 rounded-full bg-indigo-500" />
                                {cite}
                              </div>
                            ))}
                          </div>
                        )}

                        {m.type === "fup" && m.fupQuestions && m.fupQuestions.length > 0 && (
                          <div className="mt-3 space-y-2 border-t border-slate-100 pt-2">
                            <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider block">{dict.fup_label_stripe}</span>
                            {m.fupQuestions.map((q, idx) => (
                              <div key={idx} className="flex gap-1.5 text-[11px] text-slate-700 font-geist">
                                <span className="font-bold text-indigo-400 shrink-0">{idx+1}.</span>
                                <span>{q}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Interactive chips */}
            <div className="flex flex-wrap gap-1.5 p-3 border-t border-slate-100 bg-slate-50/50 justify-center">
              {["what", "shorten", "recap", "fup", "answer"].map((c) => {
                const labelMap: Record<string, string> = {
                  what: dict.chip_what,
                  shorten: dict.chip_shorten,
                  recap: dict.chip_recap,
                  fup: dict.chip_fup,
                  answer: dict.chip_answer
                };
                const isSelected = highlightedChip === c;
                return (
                  <span 
                    key={c}
                    className={`text-[9.5px] font-medium px-2.5 py-1 rounded-full border transition-all duration-200 ${
                      isSelected 
                        ? "bg-indigo-600 text-white border-indigo-600 scale-95 shadow-[0_4px_12px_rgba(99,102,241,0.2)] font-bold" 
                        : "bg-white border-slate-200 text-slate-500"
                    }`}
                  >
                    {labelMap[c]}
                  </span>
                );
              })}
            </div>

            {/* Bottom Input Area */}
            <div className="p-3 bg-slate-50/40 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-indigo-500/60 font-geist font-light italic truncate max-w-[80%]">
                {dict.inp_pro}
              </span>
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                <ChevronRight size={12} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="h-6" />

          {/* End Screen overlay for Pro side */}
          {showEndScreen && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-[#F5F7FB] z-40 p-6 md:p-10 flex flex-col justify-between"
            >
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-3">
                  {dict.end_pro_eyebrow}
                </span>
                <h3 className="text-[26px] md:text-[36px] font-medium text-slate-800 font-geist leading-[1.1] mb-4">
                  {dict.end_pro_h}
                </h3>
                <p className="text-[13px] md:text-[14px] text-slate-500 max-w-[34ch] mb-8 leading-relaxed font-geist">
                  {dict.end_pro_sub}
                </p>

                <ul className="space-y-2.5 mb-8 text-left inline-block">
                  {[dict.end_pro_f1, dict.end_pro_f2, dict.end_pro_f3, dict.end_pro_f4].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Check size={8} className="text-indigo-600 stroke-[3]" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NbHo6EnXlNPqNcZ14OTi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[280px] py-3.5 rounded-[14px] text-[13px] font-bold text-white text-center shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)",
                    boxShadow: "0 8px 24px rgba(99,102,241,0.3), inset 0 2px 0 rgba(255,255,255,0.3)",
                  }}
                >
                  {dict.end_pro_btn}
                </a>
                <button 
                  onClick={startDemo}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-500 hover:text-indigo-700 uppercase tracking-widest transition-colors py-2"
                >
                  <RefreshCw size={11} />
                  {dict.end_replay_demo}
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
}
