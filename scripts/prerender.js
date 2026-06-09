import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const SITE = 'https://natively.software';
const PORT = 4178;

// App-level constants for per-page SoftwareApplication JSON-LD. Keep the version in
// sync with the homepage SoftwareApplication block in index.html and llms.txt.
const APP_VERSION = '2.7.0';

// Locales to prerender. 'en' is the default (bare path); others are served under
// a /<locale>/ prefix. Keep this in sync with src/config/locales.ts — prerender.js
// runs in plain Node and cannot import the app's .ts module. To add a locale:
// register its JSON in src/i18n.ts, add it here, and add a `<locale>: {...}` block
// to each route below.
const SUPPORTED_LOCALES = ['en', 'ru'];
const DEFAULT_LOCALE = 'en';

// Routes that do not render a meaningful <h1> (e.g. embedded iframe pages). They are
// still prerendered for meta/schema, but skip the "<h1> content settled" assertion.
const NO_H1_ROUTES = new Set(['/pro']);

// Minimum non-whitespace character count expected inside #root for a real content
// page. The PageLoader spinner is a tiny SVG wrapper, well under this.
const MIN_ROOT_CONTENT_CHARS = 500;

// Define Routes and their specific SEO metadata (for Social Media crawlers & Google caching)
const seoRoutes = [
    {
        // Homepage. Index.tsx does NOT use Helmet, so its <head> stays as the rich
        // index.html template. preserveDefaultHead keeps the hand-tuned EN head as-is;
        // the /ru/ variant still gets localized title/desc injected.
        path: '/',
        noHelmet: true,
        preserveDefaultHead: true,
        title: 'Free AI Interview Assistant & Meeting Copilot | Natively',
        desc: 'AI for interviews & meetings with live coding help, instant answers, and auto notes. Unlike Cluely or FinalRoundAI, invisible during your call — and completely free.',
        ru: {
            title: 'Бесплатный ИИ-ассистент для собеседований и встреч | Natively',
            desc: 'ИИ для собеседований и встреч: помощь с кодингом в реальном времени, мгновенные ответы и авто-заметки. В отличие от Cluely и FinalRoundAI — невидим во время звонка и полностью бесплатен.'
        }
    },
    {
        // Pricing / Pro page. Uses SEOHead (Helmet) — title/desc here MUST match
        // src/pages/Pro.tsx's SEOHead props so the prerendered head equals what
        // Helmet emits on hydration. Genuinely bilingual (full RU content).
        path: '/pro',
        title: 'Natively Pro vs Free | Interactive Demo & Comparison',
        desc: 'Compare Natively Free (Ollama/BYOK) and Natively Pro. Try the live interactive simulation to compare real-time transcription, answers, and negotiation features.',
        ru: {
            title: 'Natively Pro vs Free | Интерактивное демо и сравнение',
            desc: 'Сравните Natively Free (Ollama/BYOK) и Natively Pro. Проверьте разницу в ответах, транскрипции и функциях для переговоров по зарплате.'
        }
    },
    {
        path: '/ai-interview-assistant',
        title: 'Best AI Interview Assistant — Ace Coding Interviews | Natively',
        desc: 'Discover how an AI interview assistant running entirely locally on your device can help you ace technical and coding interviews without compromising your privacy.',
        schemaType: 'SoftwareApplication',
        ru: {
            title: 'Лучший ИИ-ассистент для собеседований | Natively',
            desc: 'Узнайте, как ИИ-ассистент, работающий полностью локально на вашем устройстве, поможет пройти технические и код-собеседования без компромиссов с приватностью.'
        }
    },
    {
        path: '/ai-coding-interview-helper',
        title: 'Elite AI Coding Interview Helper | Technical Interview Copilot',
        desc: 'Leverage a local AI coding interview helper to tackle challenging algorithm and data structure problems with real-time feedback and high privacy.',
        ru: {
            title: 'Элитный ИИ-помощник для код-собеседований | Natively',
            desc: 'Используйте локальный ИИ-помощник для решения сложных алгоритмических задач и задач на структуры данных с обратной связью в реальном времени.'
        }
    },
    {
        path: '/local-ai-assistant',
        title: 'Secure Local AI Assistant for Offline Computing | Natively',
        desc: 'Use an offline, local AI assistant to secure your interview process. Get real-time answers directly from your device hardware without cloud tracking.',
        ru: {
            title: 'Безопасный локальный ИИ-ассистент для офлайн-работы | Natively',
            desc: 'Используйте офлайн ИИ-ассистент для безопасного прохождения собеседований. Получайте ответы в реальном времени прямо с вашего устройства без облачного отслеживания.'
        }
    },
    {
        path: '/ai-assistant-for-coding-interviews',
        title: 'The Best AI Assistant for Coding Interviews | Real-Time Help',
        desc: 'Find the perfect AI assistant for coding interviews. Learn how an offline, AI-powered pair programmer helps you solve algorithms and system design problems instantly.',
        ru: {
            title: 'Лучший ИИ-ассистент для код-собеседований | Natively',
            desc: 'Найдите идеального ИИ-ассистента для код-собеседований. Узнайте, как офлайн ИИ-помощник помогает мгновенно решать алгоритмические задачи и задачи по системному дизайну.'
        }
    },
    {
        path: '/how-ai-helps-in-coding-interviews',
        title: 'How AI Helps in Coding Interviews | The Ultimate Guide',
        desc: 'Understand the tactical advantages of an AI coding interview helper. From real-time algorithm generation to invisible syntax correction.',
        ru: {
            title: 'Как ИИ помогает на код-собеседованиях | Полное руководство',
            desc: 'Узнайте о тактических преимуществах ИИ-помощника на собеседованиях. От генерации алгоритмов в реальном времени до незаметной коррекции синтаксиса.'
        }
    },
    {
        path: '/local-ai-coding-assistant',
        title: 'The Premier Local AI Coding Assistant | Secure Interview Help',
        desc: 'Download the fastest local AI coding assistant. Process complex interview questions securely offline with zero latency and total invisibility.',
        ru: {
            title: 'Лучший локальный ИИ-помощник для кода | Natively',
            desc: 'Скачайте самый быстрый локальный ИИ-помощник для программирования. Обрабатывайте сложные вопросы собеседований офлайн с нулевой задержкой и полной невидимостью.'
        }
    },
    {
        path: '/ai-tools-for-technical-interviews',
        title: 'The Top AI Tools for Technical Interviews | Ace Your Assessment',
        desc: 'Explore the best AI tools for technical interviews. Compare cloud-based applications versus local, offline assistants for algorithmic screenings.',
        ru: {
            title: 'Лучшие ИИ-инструменты для технических собеседований | Natively',
            desc: 'Обзор лучших ИИ-инструментов для технических собеседований. Сравнение облачных решений и локальных офлайн-ассистентов для алгоритмических тестов.'
        }
    },
    {
        path: '/docs/ai-interview-assistant',
        title: 'Natively Docs: AI Interview Assistant Definition and Use Cases',
        desc: 'Documentation for Natively AI interview assistant. Read a concise, objective explanation of how local ai copilots work, their privacy benefits, and functionality.',
        ru: {
            title: 'Документация Natively: ИИ-ассистент для собеседований',
            desc: 'Документация ИИ-ассистента Natively для собеседований. Краткое объяснение того, как работают локальные ИИ-копилоты, их преимущества в приватности и функциональность.'
        }
    },
    // BLOG POSTS
    {
        path: '/blog/ai-interview-assistant-guide',
        title: 'The Definitive Guide to Using an AI Interview Assistant',
        desc: 'Read our comprehensive guide on maximizing an AI interview assistant to effortlessly pass technical coding interviews.',
        ru: {
            title: 'Полное руководство по использованию ИИ-ассистента для собеседований',
            desc: 'Подробное руководство по максимальному использованию ИИ-ассистента для лёгкого прохождения технических код-собеседований.'
        }
    },
    {
        path: '/blog/local-ai-vs-cloud-ai-assistants',
        title: 'Local AI vs Cloud AI Assistants: Which is Better?',
        desc: 'Comparing local, offline AI interview assistants to cloud-based alternatives like Cluely. Find out which offers the best performance and privacy.',
        ru: {
            title: 'Локальный ИИ против облачного: что лучше?',
            desc: 'Сравнение локальных офлайн ИИ-ассистентов с облачными альтернативами. Узнайте, что обеспечивает лучшую производительность и приватность.'
        }
    },
    {
        path: '/blog/how-ai-can-help-with-coding-interviews',
        title: 'How AI Can Supercharge Your Next Coding Interview',
        desc: 'Learn about the strategies developers use to incorporate AI into live technical interviews to solve dynamic programming challenges.',
        ru: {
            title: 'Как ИИ может усилить ваше следующее код-собеседование',
            desc: 'Узнайте о стратегиях разработчиков по внедрению ИИ в технические собеседования для решения задач динамического программирования.'
        }
    },
    {
        path: '/blog/how-ai-interview-assistants-work',
        title: 'How AI Interview Assistants Work Under The Hood | Tech Breakdown',
        desc: 'Learn exactly how an AI interview assistant captures audio and screen data, runs OCR and LLM inference, and helps candidates pass technical interviews.',
        ru: {
            title: 'Как работают ИИ-ассистенты для собеседований | Технический разбор',
            desc: 'Узнайте, как ИИ-ассистент захватывает аудио и данные экрана, выполняет OCR и LLM-инференс, помогая кандидатам проходить технические собеседования.'
        }
    },
    {
        path: '/blog/best-ai-tools-for-coding-interviews',
        title: 'The 5 Best AI Tools for Coding Interviews | 2026 Guide',
        desc: 'Comparing the top AI tools for technical and coding interviews. We evaluate local vs cloud architectures, privacy, speed, and real-time inference capabilities.',
        ru: {
            title: '5 лучших ИИ-инструментов для код-собеседований | Гид 2026',
            desc: 'Сравнение лучших ИИ-инструментов для технических собеседований. Оценка локальных и облачных архитектур, приватности, скорости и возможностей инференса в реальном времени.'
        }
    },
    {
        path: '/blog/preparing-for-technical-interviews-with-ai',
        title: 'Preparing for Technical Interviews with AI | Ultimate Guide',
        desc: 'Discover how to prepare for technical and coding interviews using AI assistants. Leverage offline algorithms to practice system design and LeetCode.',
        ru: {
            title: 'Подготовка к техническим собеседованиям с ИИ | Руководство',
            desc: 'Узнайте, как подготовиться к техническим и код-собеседованиям с помощью ИИ-ассистентов. Используйте офлайн-алгоритмы для практики системного дизайна и LeetCode.'
        }
    },
    // COMPARISON & HIGH-VALUE PAGES
    {
        path: '/finalroundai-alternative',
        title: 'Best FinalRoundAI Alternative — Free, Local & Private | Natively',
        desc: 'Looking for a FinalRoundAI alternative? Natively is a 100% free, local AI interview assistant for coding interviews — no subscription, no cloud, no privacy risks.',
        schemaType: 'SoftwareApplication',
        faqs: [
            { q: "Is there a free alternative to FinalRoundAI?", a: "Yes, Natively is a completely free alternative to FinalRoundAI. It allows you to use your own API keys or run models locally for $0." },
            { q: "How is Natively different from FinalRoundAI?", a: "Unlike FinalRoundAI which is cloud-based, Natively runs 100% locally on your machine, ensuring complete privacy and zero network detectability." }
        ],
        ru: {
            title: 'Лучшая альтернатива FinalRoundAI — Бесплатно, Локально | Natively',
            desc: 'Ищете альтернативу FinalRoundAI? Natively — это 100% бесплатный локальный ИИ-ассистент для собеседований без подписки, без облака и без рисков приватности.'
        }
    },
    {
        path: '/cluely-alternative',
        title: 'The Top Local Cluely Alternative for Coding Interviews | Natively',
        desc: 'Looking for an alternative to Cluely? Natively provides a 100% local, ultra-fast, and deeply private AI meeting assistant for technical interviews.',
        schemaType: 'SoftwareApplication',
        faqs: [
            { q: "Is Cluely safe for job interviews?", a: "Cluely is cloud-based, meaning your data is processed on their servers. Natively is a safer alternative that processes everything locally on your device." },
            { q: "What is the best local alternative to Cluely?", a: "Natively is the best local alternative, offering invisible real-time AI assistance without sending audio or video to the cloud." }
        ],
        ru: {
            title: 'Лучшая локальная альтернатива Cluely | Natively',
            desc: 'Ищете альтернативу Cluely? Natively — 100% локальный, сверхбыстрый и приватный ИИ-ассистент для технических собеседований.'
        }
    },
    {
        path: '/natively-vs-cluely',
        title: 'Natively vs Cluely: Which AI Interview Assistant Is Better? (2026)',
        desc: 'Natively vs Cluely — detailed comparison. Natively is local, free, and private. Cluely is cloud-based and focused on meetings. See which AI interview tool fits your needs.',
        ru: {
            title: 'Natively vs Cluely: Какой ИИ-ассистент лучше? (2026)',
            desc: 'Сравнение Natively и Cluely. Natively — локальный, бесплатный и приватный. Cluely — облачный для встреч. Выберите подходящий инструмент.'
        }
    },
    {
        path: '/free-ai-interview-assistant',
        title: 'Free AI Interview Assistant — No Subscription Required | Natively',
        desc: 'The best free AI interview assistant for coding interviews. Natively runs locally — no subscription, no credit card, no cloud. Works with Ollama for fully offline, $0 operation.',
        ru: {
            title: 'Бесплатный ИИ-ассистент для собеседований — Без подписки | Natively',
            desc: 'Лучший бесплатный ИИ-ассистент для интервью. Natively работает локально — без подписки, без карты, без облака. Работает с Ollama полностью офлайн.'
        }
    },
    {
        path: '/leetcode-ai-helper',
        title: 'LeetCode AI Helper — Solve Hard Problems in Real Time | Natively',
        desc: 'Natively is the best LeetCode AI helper for live coding interviews. Get instant algorithm suggestions, Big-O analysis, and code solutions — all running locally on your device.',
        ru: {
            title: 'ИИ-помощник для LeetCode — Решайте сложные задачи в реальном времени | Natively',
            desc: 'Natively — лучший ИИ-помощник для LeetCode на живых собеседованиях. Мгновенные подсказки по алгоритмам, анализ Big-O и решения кода — всё работает локально.'
        }
    },
    {
        path: '/offline-ai-interview',
        title: 'Offline AI Interview Assistant — Works Without Internet | Natively',
        desc: 'Need an AI interview assistant that works offline? Natively runs 100% without internet — powered by Ollama and local models. Zero cloud, zero network, zero traceable traffic.',
        ru: {
            title: 'Офлайн ИИ-ассистент для собеседований — Без интернета | Natively',
            desc: 'Natively работает 100% без интернета — на Ollama и локальных моделях. Без облака, без трафика, без риска обнаружения.'
        }
    },
    {
        path: '/blog/is-cluely-safe',
        title: 'Is Cluely Safe? Privacy Facts Every User Must Know (2026)',
        desc: 'Is Cluely safe to use? We analyze Cluely data practices, cloud architecture, and privacy risks — and show why local alternatives like Natively protect your interview data.',
        schemaType: 'Article',
        publishedDate: '2026-01-22T09:00:00Z',
        ru: {
            title: 'Безопасен ли Cluely? Факты о конфиденциальности (2026)',
            desc: 'Безопасен ли Cluely? Мы анализируем практику работы с данными Cluely и риски конфиденциальности — и объясняем, почему локальные альтернативы лучше.'
        }
    },
    {
        path: '/blog/best-ai-interview-assistants',
        title: '7 Best AI Interview Assistants in 2026 (Tested & Ranked)',
        desc: 'We tested 7 AI interview assistants in 2026. Compare FinalRoundAI, Cluely, Natively, LockedIn AI, and more — ranked by privacy, cost, coding support, and real-time performance.',
        schemaType: 'Article',
        publishedDate: '2026-02-18T09:00:00Z',
        ru: {
            title: '7 лучших ИИ-ассистентов для интервью в 2026 (Протестировано и рейтинг)',
            desc: 'Мы протестировали 7 ИИ-ассистентов для собеседований в 2026. Сравнение FinalRoundAI, Cluely, Natively и других по приватности, стоимости и поддержке кодинга.'
        }
    },
    {
        path: '/refundpolicy',
        title: 'Refund Policy — Natively',
        desc: 'Refund policy for Natively Pro and the Natively API.',
        skipRu: true
    },
    {
        path: '/privacy',
        title: 'Privacy Policy — Natively',
        desc: 'How Natively handles your data: privacy-first, local-first, no central server for your meeting data.',
        skipRu: true
    },
    {
        path: '/termsandconditions',
        title: 'Terms & Conditions — Natively',
        desc: 'Terms governing the Natively desktop app, Natively Pro, and the Natively API.',
        skipRu: true
    },
    {
        path: '/nativelypro/t&c',
        title: 'Terms & Conditions — Natively',
        desc: 'Terms governing the Natively desktop app, Natively Pro, and the Natively API.',
        canonical: '/termsandconditions',
        skipRu: true
    },
    {
        path: '/nativelyapi/t&c',
        title: 'Terms & Conditions — Natively',
        desc: 'Terms governing the Natively desktop app, Natively Pro, and the Natively API.',
        canonical: '/termsandconditions',
        skipRu: true
    },
    {
        path: '/interview-copilot',
        title: 'Local AI Interview Copilot — Real-Time Coding Help | Natively',
        desc: 'Natively is the only local AI interview copilot that runs 100% on your device. Real-time coding, algorithm, and system design answers during live interviews — zero cloud, zero cost.',
        schemaType: 'SoftwareApplication',
        faqs: [
            { q: "What is the best free AI interview copilot?", a: "Natively is the best free AI interview copilot. It runs completely offline using Ollama, costing $0 in API fees." },
            { q: "Can interview copilots be detected?", a: "Cloud-based copilots generate network traffic. Natively with Ollama generates zero network traffic and uses an invisible overlay, making it undetectable." }
        ],
        ru: {
            title: 'Локальный ИИ-копилот для собеседований — Помощь в реальном времени | Natively',
            desc: 'Natively — единственный локальный ИИ-копилот для собеседований, работающий 100% на вашем устройстве. Помощь с кодингом и системным дизайном без облака.'
        }
    },
    {
        path: '/natively-vs-lockedinai',
        title: 'Natively vs LockedIn AI: Which Is Better? (2026) | Free & Private',
        desc: 'Compare Natively vs LockedIn AI for real-time interview assistance. Natively is 100% local, works offline, and has a free tier — LockedIn AI requires cloud and a paid plan.',
        schemaType: 'SoftwareApplication',
        ru: {
            title: 'Natively против LockedIn AI: что лучше? (2026) | Бесплатно и приватно',
            desc: 'Сравнение Natively и LockedIn AI для помощи на собеседованиях. Natively работает 100% локально, офлайн и имеет бесплатный тариф — LockedIn AI требует облако и платную подписку.'
        }
    },
    {
        path: '/natively-vs-interviewcoder',
        title: 'Natively vs Interview Coder: Free LeetCode AI Alternative (2026)',
        desc: 'Compare Natively vs Interview Coder for LeetCode and technical interview help. Natively is free, runs 100% locally, and covers all interview types — not just coding.',
        schemaType: 'SoftwareApplication',
        ru: {
            title: 'Natively против Interview Coder: бесплатная альтернатива для LeetCode (2026)',
            desc: 'Сравнение Natively и Interview Coder для LeetCode и технических собеседований. Natively бесплатен, работает 100% локально и охватывает все типы интервью — не только кодинг.'
        }
    },
    {
        path: '/undetectable-interview-ai',
        title: 'Undetectable Interview AI — Invisible AI Assistant for Interviews | Natively',
        desc: 'The only AI interview assistant with zero network traffic in local mode. Natively runs 100% on-device — no cloud pings, no detectable outbound data. Stay invisible during any technical interview.',
        schemaType: 'SoftwareApplication',
        ru: {
            title: 'Незаметный ИИ для собеседований — Невидимый ИИ-ассистент | Natively',
            desc: 'Единственный ИИ-ассистент для собеседований с нулевым сетевым трафиком в локальном режиме. Natively работает 100% на устройстве — без облачных запросов и обнаруживаемых данных.'
        }
    },

    // ===================================================================
    // MEETING / NOTES VERTICAL (English-first; RU body backfill = 60-day roadmap)
    // skipRu omits the /ru/ prerender + hreflang so we never ship English body
    // under lang="ru". App.tsx still has /ru routes, but they're not indexed.
    // ===================================================================
    {
        path: '/ai-meeting-assistant',
        title: 'AI Meeting Assistant — Live Notes, Local & Private | Natively',
        desc: 'A free, local AI meeting assistant for Zoom, Teams & Google Meet. Live transcription, real-time answers, and automatic notes — invisible, no bot joins your call.',
        schemaType: 'SoftwareApplication',
        skipRu: true,
        faqs: [
            { q: "Does the AI meeting assistant join my call as a participant?", a: "No. Natively runs as a separate native overlay on your own computer, not as a bot inside the meeting. It captures audio locally, so it never appears in the participant list or in recordings." },
            { q: "Is my meeting data private?", a: "In local mode, audio, transcripts, and notes stay on your device with zero outbound network traffic. Natively is open source (AGPL-3.0), so the data handling is fully auditable." }
        ]
    },
    {
        path: '/ai-note-taker',
        title: 'AI Note Taker for Meetings — Local, Free & Private | Natively',
        desc: 'A free AI note taker that transcribes and summarizes meetings locally. Automatic notes, speaker labels, and Markdown export — no bot in your call, no cloud.',
        schemaType: 'SoftwareApplication',
        skipRu: true,
        faqs: [
            { q: "Is there a free AI note taker that works offline?", a: "Yes. Natively's note taking is free, and with Ollama and on-device Whisper it works completely offline — transcription and summarization both run locally." },
            { q: "Can I export my meeting notes?", a: "Yes. Every meeting can be exported to Markdown, JSON, or plain text from the local dashboard." }
        ]
    },
    {
        path: '/sales-call-assistant',
        title: 'AI Sales Call Assistant — Real-Time Talk Tracks | Natively',
        desc: 'A private AI sales call assistant: real-time objection handling, talk-track suggestions, and auto call notes — local on your device, invisible to the prospect.',
        schemaType: 'SoftwareApplication',
        skipRu: true,
        faqs: [
            { q: "Can the prospect tell I'm using a sales assistant?", a: "No. Natively runs as a hidden overlay on your own computer rather than joining the call as a bot, so there's no extra participant and nothing appears in the prospect's screen share or recording." },
            { q: "Will my call recordings be stored in the cloud?", a: "Not in local mode. Audio, transcripts, and notes stay on your device with zero outbound traffic. If you use a bring-your-own-key cloud model, only the specific text request is sent — never the raw call audio." }
        ]
    },
    {
        path: '/lecture-note-taker',
        title: 'AI Lecture Note Taker — Transcribe Classes Offline | Natively',
        desc: 'A free AI lecture note taker that transcribes and summarizes classes on your laptop. Works offline, handles multi-hour lectures — no subscription, no cloud.',
        schemaType: 'SoftwareApplication',
        skipRu: true,
        faqs: [
            { q: "Can it transcribe a lecture without internet?", a: "Yes. With Ollama and on-device Whisper, Natively transcribes and summarizes entirely offline, so it works in lecture halls where Wi-Fi is unreliable." },
            { q: "Does it handle long, multi-hour lectures?", a: "Yes. Epoch summarization breaks long sessions into coherent segments, so even a three-hour seminar produces structured, readable notes." }
        ]
    },

    // ===================================================================
    // FIREFLIES / OTTER (verified pricing; English-first)
    // ===================================================================
    {
        path: '/natively-vs-fireflies',
        title: 'Natively vs Fireflies: Local AI vs Cloud Notetaker (2026)',
        desc: 'Natively vs Fireflies.ai: Fireflies is a cloud notetaker with deep integrations; Natively is free, local-first, with real-time help and no bot in your call.',
        schemaType: 'SoftwareApplication',
        skipRu: true
    },
    {
        path: '/natively-vs-otter',
        title: 'Natively vs Otter.ai: Local Meeting AI vs Cloud (2026)',
        desc: 'Natively vs Otter.ai: Otter is a popular cloud transcription service; Natively is a free, local-first meeting assistant with real-time help and on-device privacy.',
        schemaType: 'SoftwareApplication',
        skipRu: true
    },
    {
        path: '/fireflies-alternative',
        title: 'Best Fireflies Alternative — Free, Local & Private | Natively',
        desc: 'The best Fireflies.ai alternative: Natively is a free, local-first meeting assistant — no bot in your call, no cloud transcripts, no per-seat subscription. Works offline.',
        schemaType: 'SoftwareApplication',
        skipRu: true,
        faqs: [
            { q: "Is there a free Fireflies alternative?", a: "Yes. Natively is free using your own API key or fully free and offline with Ollama. There's no per-seat subscription and no monthly-minute cap in local mode." },
            { q: "Can I take meeting notes without a bot joining the call?", a: "Yes. Natively captures audio locally as an invisible overlay, so nothing joins your meeting as a participant and nothing shows up in recordings." }
        ]
    },
    {
        path: '/otter-alternative',
        title: 'Best Otter.ai Alternative — Local, Free & Unlimited | Natively',
        desc: 'The best Otter.ai alternative: Natively transcribes and summarizes meetings locally — no cloud upload, no 300-minute cap, real-time help, and free with Ollama.',
        schemaType: 'SoftwareApplication',
        skipRu: true,
        faqs: [
            { q: "Is there an Otter alternative without a minute limit?", a: "Yes. In local mode (Ollama), Natively has no monthly-minute cap — transcription runs on your own hardware, so you can record as much as you like for free." },
            { q: "Does Natively transcribe without uploading my audio?", a: "Yes. On-device Whisper transcribes locally, so your audio never leaves your machine in local mode." }
        ]
    },

    // ===================================================================
    // MISSING INTERVIEW PAGES (English-first)
    // ===================================================================
    {
        path: '/system-design-interview-assistant',
        title: 'AI System Design Interview Assistant — Real-Time Help | Natively',
        desc: 'A local AI system design interview assistant: real-time architecture prompts, trade-off analysis, and scaling guidance during live rounds — private and free.',
        schemaType: 'SoftwareApplication',
        skipRu: true,
        faqs: [
            { q: "Can an AI assistant really help during a live system design interview?", a: "Yes — by keeping you structured. It suggests the next dimension to cover and surfaces trade-offs you haven't mentioned, in under half a second, so you present a coherent design instead of freezing." },
            { q: "Does it support both system design and coding rounds?", a: "Yes. Natively covers system design, coding/algorithm, and behavioral rounds in one app." }
        ]
    },
    {
        path: '/behavioral-interview-assistant',
        title: 'AI Behavioral Interview Assistant — STAR Answers Live | Natively',
        desc: 'A local AI behavioral interview assistant: real-time STAR-method structure, natural human-sounding answers, and resume-grounded examples — private and free.',
        schemaType: 'SoftwareApplication',
        skipRu: true,
        faqs: [
            { q: "Will the answers sound robotic?", a: "No. The human persona system phrases suggestions to sound natural and conversational, matching your tone, so you can deliver them authentically." },
            { q: "Can it use my real experience?", a: "Yes. With Natively Pro you can load your resume and the job description, so the assistant suggests STAR stories drawn from your actual background." }
        ]
    },
    {
        path: '/interview-answer-generator',
        title: 'AI Interview Answer Generator — Real-Time Responses | Natively',
        desc: 'A real-time AI interview answer generator: hears the question and suggests a clear, natural answer in under 500 ms — coding, behavioral, system design. Local and free.',
        schemaType: 'SoftwareApplication',
        skipRu: true,
        faqs: [
            { q: "How fast does it generate an answer?", a: "End-to-end latency is under 500 milliseconds, fast enough that the suggestion is ready while you're still acknowledging the question." },
            { q: "Do the answers sound generated?", a: "The human persona system phrases responses to sound natural, and accent/dialect matching adapts them to your speaking style." }
        ]
    },
    {
        path: '/live-interview-assistant',
        title: 'Live Interview Assistant — Real-Time AI Help On Calls | Natively',
        desc: 'A live interview assistant for real time during the call — live transcription, instant answers, and on-screen code analysis at sub-500 ms latency. Local, invisible, free.',
        schemaType: 'SoftwareApplication',
        skipRu: true,
        faqs: [
            { q: "How is a live interview assistant different from interview prep?", a: "Prep tools help before the interview; a live assistant helps during it. Natively transcribes the actual conversation and surfaces answers in real time." },
            { q: "Does it work on Zoom and Teams?", a: "Yes. Because Natively captures your system audio rather than plugging into a specific platform, it works with Zoom, Microsoft Teams, Google Meet, and any other video call app." }
        ]
    },

    // ===================================================================
    // PROGRAMMATIC: interview-questions/<role> + system-design/<product>
    // ===================================================================
    {
        path: '/interview-questions/software-engineer',
        title: 'Software Engineer Interview Questions (2026) | Natively',
        desc: 'Common software engineer interview questions for 2026 — coding, system design, and behavioral — each with a clear approach to structuring a strong answer.',
        skipRu: true
    },
    {
        path: '/interview-questions/product-manager',
        title: 'Product Manager Interview Questions (2026) | Natively',
        desc: 'Common product manager interview questions for 2026 — product sense, execution, strategy, and behavioral — each with a framework for structuring a strong answer.',
        skipRu: true
    },
    {
        path: '/interview-questions/data-scientist',
        title: 'Data Scientist Interview Questions (2026) | Natively',
        desc: 'Common data scientist interview questions for 2026 — statistics, machine learning, SQL, and case studies — each with a clear approach to answering well.',
        skipRu: true
    },
    {
        path: '/interview-questions/ai-engineer',
        title: 'AI Engineer Interview Questions (2026) — LLMs, RAG & MLOps',
        desc: 'Common AI engineer interview questions for 2026 — LLMs, RAG, prompt engineering, evaluation, and ML systems — each with a clear approach to answering well.',
        skipRu: true
    },
    {
        path: '/interview-questions/google-software-engineer',
        title: 'Google Software Engineer Interview Questions (2026) | Natively',
        desc: 'Google software engineer interview questions for 2026 — algorithms, data structures, system design, and Googleyness behavioral rounds — with how to approach each.',
        skipRu: true
    },
    {
        path: '/interview-questions/meta-software-engineer',
        title: 'Meta Software Engineer Interview Questions (2026) | Natively',
        desc: 'Meta (Facebook) software engineer interview questions for 2026 — coding speed, system design, and behavioral rounds — with the approach interviewers reward.',
        skipRu: true
    },
    {
        path: '/interview-questions/amazon-software-engineer',
        title: 'Amazon SDE Interview Questions (2026) — Leadership Principles | Natively',
        desc: 'Amazon SDE interview questions for 2026 — coding, system design, and Leadership Principles behavioral rounds — with how to structure answers Amazon rewards.',
        skipRu: true
    },
    {
        path: '/interview-questions/microsoft-software-engineer',
        title: 'Microsoft Software Engineer Interview Questions (2026) | Natively',
        desc: 'Microsoft software engineer interview questions for 2026 — coding, problem-solving, design, and behavioral rounds — with how to approach each effectively.',
        skipRu: true
    },
    {
        path: '/system-design/uber',
        title: 'System Design: Uber (Ride-Hailing) — Interview Walk-Through',
        desc: 'How to design a ride-hailing system like Uber in a system design interview: requirements, geospatial matching, real-time location, scaling, and the trade-offs interviewers want to hear.',
        skipRu: true
    },
    {
        path: '/system-design/whatsapp',
        title: 'System Design: WhatsApp (Chat) — Interview Walk-Through',
        desc: 'How to design a messaging system like WhatsApp in a system design interview: real-time delivery, message storage, online presence, group chat, and the trade-offs interviewers expect.',
        skipRu: true
    },
    {
        path: '/system-design/netflix',
        title: 'System Design: Netflix (Video Streaming) — Interview Walk-Through',
        desc: 'How to design a video streaming service like Netflix in a system design interview: ingestion, transcoding, CDN delivery, adaptive bitrate, and the trade-offs interviewers want.',
        skipRu: true
    },
    {
        path: '/system-design/twitter',
        title: 'System Design: Twitter (Timeline) — Interview Walk-Through',
        desc: 'How to design a social feed like Twitter/X in a system design interview: tweet storage, timeline generation, fan-out, the celebrity problem, and the trade-offs interviewers expect.',
        skipRu: true
    }
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// Expand seoRoutes × SUPPORTED_LOCALES into a flat list of render jobs.
// Default locale renders at the bare path; other locales render under /<locale>/.
function expandRoutes() {
    const jobs = [];
    for (const route of seoRoutes) {
        for (const locale of SUPPORTED_LOCALES) {
            const isDefault = locale === DEFAULT_LOCALE;
            const localeMeta = route[locale]; // e.g. route.ru = { title, desc, ... }

            // Skip a non-default locale if the route opts out or has no translation.
            if (!isDefault && (route.skipRu || !localeMeta)) continue;

            const isRoot = route.path === '/';
            const urlPath = isDefault ? route.path : `/${locale}${route.path}`;
            const outDir = isDefault
                ? (isRoot ? distPath : path.join(distPath, route.path.slice(1)))
                : (isRoot ? path.join(distPath, locale) : path.join(distPath, locale, route.path.slice(1)));

            const title = (!isDefault && localeMeta) ? localeMeta.title : route.title;
            const desc = (!isDefault && localeMeta) ? localeMeta.desc : route.desc;

            jobs.push({ route, locale, isDefault, urlPath, outDir, title, desc });
        }
    }
    return jobs;
}

// Build the static hreflang + JSON-LD tags appended just before </head>.
// These are static (not Helmet-managed), so they don't participate in hydration.
// `job` carries the locale-resolved url/desc so per-page schema matches the page
// it's emitted on (e.g. the /ru/ URL and RU description on a Russian render).
function buildSchemaTags(route, job) {
    // Locale-resolved page URL + description (fall back to the EN route values).
    const pageUrl = job ? `${SITE}${job.urlPath}` : `${SITE}${route.path}`;
    const pageDesc = job ? job.desc : route.desc;
    // hreflang: one <link> per locale that this route actually renders, plus x-default.
    const localesForRoute = SUPPORTED_LOCALES.filter(
        (l) => l === DEFAULT_LOCALE || (!route.skipRu && route[l])
    );
    const hreflangTags = localesForRoute
        .map((l) => {
            const href = l === DEFAULT_LOCALE
                ? `${SITE}${route.path}`
                : `${SITE}/${l}${route.path}`;
            return `\n  <link rel="alternate" hreflang="${l}" href="${href}" />`;
        })
        .join('') +
        `\n  <link rel="alternate" hreflang="x-default" href="${SITE}${route.path}" />`;

    const schemas = [];

    // 1. Breadcrumb — skip on the homepage (index.html already ships one).
    if (route.path !== '/') {
        const pathParts = route.path.split('/').filter(Boolean);
        const breadcrumbItems = [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE}/` }
        ];
        pathParts.forEach((part, i) => {
            breadcrumbItems.push({
                "@type": "ListItem",
                "position": i + 2,
                "name": part.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
                "item": `${SITE}/${pathParts.slice(0, i + 1).join('/')}`
            });
        });
        schemas.push({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems
        });
    }

    // 2. Article schema with named Person author + real publish date.
    if (route.schemaType === 'Article') {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": route.title,
            "description": route.desc,
            "author": {
                "@type": "Person",
                "name": "Evin John",
                "url": "https://x.com/evinjohnn",
                "sameAs": ["https://x.com/evinjohnn"]
            },
            "publisher": { "@type": "Organization", "name": "Natively", "logo": { "@type": "ImageObject", "url": `${SITE}/logowebsite.png` } },
            "datePublished": route.publishedDate || "2025-01-15T09:00:00Z",
            "dateModified": new Date().toISOString()
        });
    }

    // 3. SoftwareApplication schema for product/landing pages that declare it.
    // Lean, page-scoped variant of the homepage entity in index.html: same app
    // identity (name, OS, version, free offer) but this page's own URL and copy,
    // so each landing page is a self-contained, citable description of the app.
    // The homepage index.html still carries the full multi-tier pricing entity;
    // we intentionally don't duplicate all 5 offers on every page (avoids drift).
    if (route.schemaType === 'SoftwareApplication') {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Natively",
            "url": pageUrl,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "macOS, Windows",
            "softwareVersion": APP_VERSION,
            "description": pageDesc,
            "offers": {
                "@type": "Offer",
                "name": "Free (BYOK / Ollama)",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": `${SITE}/`
            },
            "creator": {
                "@type": "Organization",
                "name": "Natively",
                "url": `${SITE}/`,
                "logo": `${SITE}/logowebsite.png`
            }
        });
    }

    // 4. FAQ schema for routes that declare inline FAQs.
    if (route.faqs) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": route.faqs.map((f) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
        });
    }

    const schemaTags = schemas
        .map((s) => `\n  <script type="application/ld+json">${JSON.stringify(s)}</script>`)
        .join('');

    return `${hreflangTags}${schemaTags}`;
}

// Remove the FIRST occurrence of a base (non-Helmet) head tag matching `re`.
// Helmet emits its own copy marked data-rh="true"; the base copy from index.html
// would otherwise duplicate it. We only ever strip tags WITHOUT data-rh.
function stripBaseTag(html, re) {
    return html.replace(re, (m) => (/data-rh=/.test(m) ? m : ''));
}

// The base index.html ships 7 static (non-Helmet) JSON-LD blocks. Because they're
// in the template <head>, the prerender capture copies ALL of them onto every
// interior page. Two of those types are genuinely site-level and belong on every
// page (Organization, WebSite); the rest describe the HOMEPAGE specifically and
// must not leak onto interior pages:
//   - SoftwareApplication / FAQPage / BreadcrumbList — re-emitted page-scoped by
//     buildSchemaTags where applicable (leaving the base copy would double them up).
//   - WebPage — names the page as the homepage (wrong url/title on interior pages).
//   - VideoObject — the demo lives on the homepage, not on every page.
const HOMEPAGE_ONLY_SCHEMA_TYPES = new Set([
    'SoftwareApplication', 'WebPage', 'VideoObject', 'FAQPage', 'BreadcrumbList',
]);

// Strip the homepage-specific base JSON-LD blocks from an interior page's captured
// HTML. Runs BEFORE buildSchemaTags appends the page-scoped replacements, so there
// is no collision. Helmet never emits ld+json (only title/meta/canonical/og/twitter),
// so every ld+json block present at this point is a base-template block — matching
// by @type is safe. Unparseable blocks are left untouched.
function stripHomepageSchema(html) {
    return html.replace(
        /<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/g,
        (full, body) => {
            let type;
            try {
                const obj = JSON.parse(body);
                type = Array.isArray(obj) ? (obj[0] && obj[0]['@type']) : obj['@type'];
            } catch (_) {
                return full;
            }
            return HOMEPAGE_ONLY_SCHEMA_TYPES.has(type) ? '' : full;
        },
    );
}

// Post-capture: normalize the <head> so there is exactly one canonical/description/
// og/twitter per page, append static hreflang + JSON-LD, and set <html lang>.
//
// Two cases:
//  - Helmet pages (SEO/blog via SEOTemplate): Helmet's data-rh="true" tags are
//    authoritative. We strip the duplicate base tags that index.html shipped and
//    leave Helmet's in place. (Helmet already replaces <title> in-place, no dup.)
//  - Non-Helmet pages (homepage/legal/pro): no data-rh tags exist, so we inject the
//    route's own title/desc/canonical/og/twitter. The EN homepage keeps its
//    hand-tuned head untouched (preserveDefaultHead).
function finalizeHtml(html, job) {
    const { route, urlPath, isDefault, title, desc } = job;
    const canonicalPath = isDefault ? (route.canonical || route.path) : urlPath;
    const canonicalUrl = `${SITE}${canonicalPath}`;

    let out = html;
    const helmetActive = /data-rh=["']true["']/.test(out);

    // Drop the homepage-specific JSON-LD blocks that leak in from the base template
    // (SoftwareApplication, WebPage, VideoObject, FAQPage, BreadcrumbList). The
    // homepage keeps them; interior pages get page-scoped Breadcrumb/FAQ/Software-
    // Application re-emitted by buildSchemaTags below. Site-level Organization +
    // WebSite are intentionally preserved on every page.
    if (route.path !== '/') {
        out = stripHomepageSchema(out);
    }

    if (helmetActive) {
        // Drop the base duplicates; keep Helmet's data-rh copies as the single source.
        out = stripBaseTag(out, /<link\s+rel=["']canonical["'][^>]*>/i);
        out = stripBaseTag(out, /<meta\s+name=["']description["'][^>]*>/i);
        out = stripBaseTag(out, /<meta\s+property=["']og:title["'][^>]*>/i);
        out = stripBaseTag(out, /<meta\s+property=["']og:description["'][^>]*>/i);
        out = stripBaseTag(out, /<meta\s+property=["']og:url["'][^>]*>/i);
        out = stripBaseTag(out, /<meta\s+name=["']twitter:title["'][^>]*>/i);
        out = stripBaseTag(out, /<meta\s+name=["']twitter:description["'][^>]*>/i);
    } else {
        // Non-Helmet page: inject route meta unless the EN homepage opted to keep its head.
        const injectMeta = !(isDefault && route.preserveDefaultHead);
        if (injectMeta) {
            out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
            out = out.replace(/<meta\s+name=["']description["'][^>]*>/i,
                `<meta name="description" content="${escapeAttr(desc)}" />`);
            out = out.replace(/<meta\s+property=["']og:title["'][^>]*>/i,
                `<meta property="og:title" content="${escapeAttr(title)}" />`);
            out = out.replace(/<meta\s+property=["']og:description["'][^>]*>/i,
                `<meta property="og:description" content="${escapeAttr(desc)}" />`);
            out = out.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i,
                `<meta name="twitter:title" content="${escapeAttr(title)}" />`);
            out = out.replace(/<meta\s+name=["']twitter:description["'][^>]*>/i,
                `<meta name="twitter:description" content="${escapeAttr(desc)}" />`);
        }

        // Canonical + og:url for non-Helmet pages (replace base copy, else inject).
        if (/<link\s+rel=["']canonical["'][^>]*>/i.test(out)) {
            out = out.replace(/<link\s+rel=["']canonical["'][^>]*>/i,
                `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`);
        } else {
            out = out.replace('</head>',
                `  <link rel="canonical" href="${escapeAttr(canonicalUrl)}" />\n</head>`);
        }
        out = out.replace(/<meta\s+property=["']og:url["'][^>]*>/i,
            `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`);
    }

    // <html lang="..">
    out = out.replace(/<html\s+lang=["'][^"']*["']/i, `<html lang="${job.locale}"`);

    // Append static hreflang + JSON-LD just before </head> (static, not Helmet-managed).
    out = out.replace('</head>', `${buildSchemaTags(route, job)}\n</head>`);

    return out;
}

// Assert the captured #root actually contains rendered content, not the spinner.
// `metrics` is measured in-page against the live DOM (reliable), not via regex.
function assertRendered(metrics, job) {
    const { rootChars, hasH1 } = metrics;
    const needsH1 = !NO_H1_ROUTES.has(job.route.path);

    if (rootChars < MIN_ROOT_CONTENT_CHARS || (needsH1 && !hasH1)) {
        throw new Error(
            `Prerender FAILED for ${job.urlPath}: rootContentChars=${rootChars} hasH1=${hasH1} ` +
            `(needsH1=${needsH1}). Likely captured the loading spinner or an empty shell.`
        );
    }
}

// ---------------------------------------------------------------------------
// Chromium launch (env-branched: @sparticuz in CI, system Chrome locally)
// ---------------------------------------------------------------------------

async function launchBrowser() {
    const isCI = !!process.env.VERCEL || !!process.env.CI;

    if (isCI) {
        const chromium = (await import('@sparticuz/chromium')).default;
        return puppeteer.launch({
            args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            defaultViewport: { width: 1280, height: 900 }
        });
    }

    // Local dev: puppeteer-core ships no browser, so point at a system Chrome.
    const candidates = [
        process.env.PUPPETEER_EXECUTABLE_PATH,
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium'
    ].filter(Boolean);
    const executablePath = candidates.find((p) => { try { return fs.existsSync(p); } catch { return false; } });
    if (!executablePath) {
        throw new Error(
            'No Chrome/Chromium found for prerender. Set PUPPETEER_EXECUTABLE_PATH to a Chrome binary.'
        );
    }
    // Use a dedicated, throwaway profile dir. Without this, puppeteer drives the
    // same Chrome binary against the user's DEFAULT profile — if the developer has
    // Chrome open, the two instances collide and capture fails intermittently with
    // ERR_CONNECTION_REFUSED / navigation timeouts. An isolated profile makes local
    // runs deterministic regardless of what else is running.
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'natively-prerender-'));
    return puppeteer.launch({
        executablePath,
        headless: true,
        args: ['--no-sandbox'],
        userDataDir,
        defaultViewport: { width: 1280, height: 900 }
    });
}

// ---------------------------------------------------------------------------
// Static server over dist/ (express 5: use a middleware SPA fallback)
// ---------------------------------------------------------------------------

function startServer() {
    const app = express();
    // Serve real static assets, but NOT the prerendered route folders' index.html —
    // we capture from the pristine template by letting unknown paths fall through to
    // the root index.html. `index: false` stops express.static from auto-serving
    // dist/<route>/index.html for /<route>.
    app.use(express.static(distPath, { index: false, extensions: [] }));
    app.use((_req, res) => res.sendFile(path.join(distPath, 'index.html')));
    return new Promise((resolve) => {
        const server = app.listen(PORT, () => resolve(server));
    });
}

// ---------------------------------------------------------------------------
// Capture one route in one locale
// ---------------------------------------------------------------------------

async function captureRoute(browser, job) {
    const page = await browser.newPage();
    try {
        // Abort all cross-origin requests. The app fires runtime fetches to
        // api.github.com (download counts, GitHub stars), Google Analytics, and
        // Google Fonts; under waitUntil:'networkidle0' a slow or rate-limited
        // third-party response stalls capture past the timeout — flaky, and the
        // all-or-nothing write then discards every good capture in the run. None
        // of these affect the captured HTML: components have static fallbacks
        // (e.g. download count defaults), and fonts/analytics don't change markup.
        // Same-origin requests (our JS/CSS chunks on localhost) proceed normally;
        // the in-page "<h1> settled" wait remains the real readiness signal.
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            try {
                const host = new URL(req.url()).hostname;
                if (host === 'localhost' || host === '127.0.0.1') req.continue();
                else req.abort();
            } catch (_) {
                req.abort();
            }
        });

        // Seed the language BEFORE any app script runs, so the module-load
        // detectLanguage() in src/i18n.ts renders the right locale from first paint.
        // Also flag the prerender pass so client-only chrome (toasters/analytics) is
        // omitted from the captured HTML — matching the client's first hydration paint
        // (where the same chrome is also deferred until after mount).
        await page.evaluateOnNewDocument((loc, def) => {
            try {
                window.__PRERENDER__ = true;
                if (loc === def) localStorage.removeItem('lang');
                else localStorage.setItem('lang', loc);
            } catch (_) { /* ignore */ }
        }, job.locale, DEFAULT_LOCALE);

        await page.goto(`http://localhost:${PORT}${job.urlPath}`, {
            waitUntil: 'networkidle0',
            timeout: 45000
        });

        // Wait until the app has rendered real content (not the PageLoader spinner).
        if (!NO_H1_ROUTES.has(job.route.path)) {
            await page.waitForFunction(() => {
                const h1 = document.querySelector('main h1, h1');
                return !!h1 && h1.textContent.trim().length > 0;
            }, { timeout: 25000 });
        } else {
            // Pages without an <h1>: just wait for #root to have substantive content.
            await page.waitForFunction((min) => {
                const root = document.getElementById('root');
                return !!root && root.textContent.replace(/\s+/g, '').length > min;
            }, { timeout: 25000 }, 50);
        }

        const { html, rootChars, hasH1 } = await page.evaluate(() => {
            const root = document.getElementById('root');
            const rootText = root ? root.textContent.replace(/\s+/g, '') : '';
            return {
                html: '<!doctype html>\n' + document.documentElement.outerHTML,
                rootChars: rootText.length,
                hasH1: !!document.querySelector('#root h1')
            };
        });
        return { html, rootChars, hasH1 };
    } finally {
        await page.close();
    }
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

async function prerender() {
    console.log('Starting full-body prerender (headless capture)...');

    const indexPath = path.join(distPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
        console.error('dist/index.html not found. Did the Vite build fail?');
        process.exit(1);
    }

    const jobs = expandRoutes();
    console.log(`Rendering ${jobs.length} route×locale combinations...`);

    const server = await startServer();
    let browser;
    const results = []; // { outDir, html } — buffered, written after browser closes

    try {
        browser = await launchBrowser();
        for (const job of jobs) {
            process.stdout.write(`  → ${job.urlPath} (${job.locale}) ... `);
            // Retry transient capture failures (navigation timeout, flaky socket).
            // The whole run is all-or-nothing — one unretried flake on page 30 of 59
            // discards every prior capture — so a couple of cheap retries here pay for
            // themselves. assertRendered still guards against capturing empty shells.
            const MAX_ATTEMPTS = 3;
            let lastErr;
            for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
                try {
                    const { html: captured, rootChars, hasH1 } = await captureRoute(browser, job);
                    assertRendered({ rootChars, hasH1 }, job);
                    results.push({ outDir: job.outDir, html: finalizeHtml(captured, job) });
                    console.log(`ok (${rootChars} chars)${attempt > 1 ? ` [attempt ${attempt}]` : ''}`);
                    lastErr = null;
                    break;
                } catch (err) {
                    lastErr = err;
                    if (attempt < MAX_ATTEMPTS) process.stdout.write(`retry ${attempt}… `);
                }
            }
            if (lastErr) throw lastErr;
        }
    } finally {
        if (browser) await browser.close();
        server.close();
    }

    // Write everything only after the browser is closed, so a freshly-written
    // dist/<route>/index.html can never be re-captured mid-run.
    for (const { outDir, html } of results) {
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
    }

    console.log(`Prerender complete: ${results.length} pages written with full body content.`);
}

prerender().catch((err) => {
    console.error(err);
    process.exit(1);
});
