import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

// Define Routes and their specific SEO metadata (for Social Media crawlers & Google caching)
const seoRoutes = [
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
        path: '/cluely-alternative',
        title: 'The Top Local Cluely Alternative for Coding Interviews | Natively',
        desc: 'Looking for an alternative to Cluely? Natively provides a 100% local, ultra-fast, and deeply private AI meeting assistant for technical interviews.',
        ru: {
            title: 'Лучшая локальная альтернатива Cluely | Natively',
            desc: 'Ищете альтернативу Cluely? Natively — 100% локальный, сверхбыстрый и приватный ИИ-ассистент для технических собеседований.'
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
        path: '/interview-copilot',
        title: 'Local AI Interview Copilot — Real-Time Coding Help | Natively',
        desc: 'Natively is the only local AI interview copilot that runs 100% on your device. Real-time coding, algorithm, and system design answers during live interviews — zero cloud, zero cost.',
        ru: {
            title: 'Локальный ИИ-копилот для собеседований — Помощь в реальном времени | Natively',
            desc: 'Natively — единственный локальный ИИ-копилот для собеседований, работающий 100% на вашем устройстве. Помощь с кодингом и системным дизайном без облака.'
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
    }
];

async function prerenderMetaTags() {
    console.log('Starting Blazing Fast Static Meta-Tag injection...');
    
    const indexPath = path.join(distPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
        console.error('dist/index.html not found. Did the Vite build fail?');
        process.exit(1);
    }

    const templateHTML = fs.readFileSync(indexPath, 'utf-8');

    for (const route of seoRoutes) {
        console.log(`Injecting Tags for ${route.path}...`);

        // Replace Title TAG
        let newHTML = templateHTML.replace(
            /<title>.*<\/title>/i,
            `<title>${route.title}</title>`
        );

        // Replace Description TAG
        newHTML = newHTML.replace(
            /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
            `<meta name="description" content="${route.desc}" />`
        );

        // Replace OG TAGS
        newHTML = newHTML.replace(
            /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
            `<meta property="og:title" content="${route.title}" />`
        );
        newHTML = newHTML.replace(
            /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
            `<meta property="og:description" content="${route.desc}" />`
        );
        newHTML = newHTML.replace(
            /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
            `<meta property="og:url" content="https://natively.software${route.path}" />`
        );

        // Replace Twitter TAGS
        newHTML = newHTML.replace(
            /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
            `<meta name="twitter:title" content="${route.title}" />`
        );
        newHTML = newHTML.replace(
            /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
            `<meta name="twitter:description" content="${route.desc}" />`
        );

        // Inject hreflang tags for multilingual SEO
        const hreflangTags = route.skipRu
            ? `\n  <link rel="alternate" hreflang="en" href="https://natively.software${route.path}" />\n  <link rel="alternate" hreflang="x-default" href="https://natively.software${route.path}" />`
            : `\n  <link rel="alternate" hreflang="en" href="https://natively.software${route.path}" />\n  <link rel="alternate" hreflang="ru" href="https://natively.software/ru${route.path}" />\n  <link rel="alternate" hreflang="x-default" href="https://natively.software${route.path}" />`;
        
        // Ensure canonical tag matches the route (or an explicit canonical if provided)
        const canonicalPath = route.canonical || route.path;
        newHTML = newHTML.replace(
            /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
            `<link rel="canonical" href="https://natively.software${canonicalPath}" />`
        );

        // Generate JSON-LD Schemas
        const schemas = [];
        
        // 1. Breadcrumb Schema
        const pathParts = route.path.split('/').filter(Boolean);
        const breadcrumbItems = [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://natively.software/" }
        ];
        pathParts.forEach((part, i) => {
            breadcrumbItems.push({
                "@type": "ListItem",
                "position": i + 2,
                "name": part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                "item": `https://natively.software/${pathParts.slice(0, i + 1).join('/')}`
            });
        });
        schemas.push({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems
        });

        // 2. Article/Software Schema
        if (route.schemaType === 'Article') {
            schemas.push({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": route.title,
                "description": route.desc,
                "author": { "@type": "Organization", "name": "Natively" },
                "publisher": { "@type": "Organization", "name": "Natively", "logo": { "@type": "ImageObject", "url": "https://natively.software/logowebsite.png" } },
                "datePublished": "2024-04-19T18:00:00Z",
                "dateModified": new Date().toISOString()
            });
        }

        // 3. FAQ Schema
        if (route.faqs) {
            schemas.push({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": route.faqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
            });
        }

        const schemaTags = schemas.map(s => `\n  <script type="application/ld+json">${JSON.stringify(s)}</script>`).join('');
        newHTML = newHTML.replace('</head>', `${hreflangTags}${schemaTags}\n</head>`);

        // Save generated HTML to nested folder matching the route path
        const dir = path.join(distPath, route.path.slice(1));
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        fs.writeFileSync(path.join(dir, 'index.html'), newHTML);
        console.log(`Successfully mapped ${route.path}`);

        // Generate /ru/ variant if Russian translations exist (skip for routes that opt out)
        if (route.ru && !route.skipRu) {
            const ruPath = `/ru${route.path}`;
            console.log(`Injecting Tags for ${ruPath}...`);

            let ruHTML = templateHTML.replace(
                /<title>.*<\/title>/i,
                `<title>${route.ru.title}</title>`
            );

            ruHTML = ruHTML.replace(
                /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
                `<meta name="description" content="${route.ru.desc}" />`
            );

            ruHTML = ruHTML.replace(
                /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
                `<meta property="og:title" content="${route.ru.title}" />`
            );
            ruHTML = ruHTML.replace(
                /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
                `<meta property="og:description" content="${route.ru.desc}" />`
            );
            ruHTML = ruHTML.replace(
                /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
                `<meta property="og:url" content="https://natively.software${ruPath}" />`
            );

            ruHTML = ruHTML.replace(
                /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
                `<meta name="twitter:title" content="${route.ru.title}" />`
            );
            ruHTML = ruHTML.replace(
                /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
                `<meta name="twitter:description" content="${route.ru.desc}" />`
            );

            const ruDir = path.join(distPath, `ru${route.path.slice(1)}`);
            if (!fs.existsSync(ruDir)) fs.mkdirSync(ruDir, { recursive: true });
            
            fs.writeFileSync(path.join(ruDir, 'index.html'), ruHTML);
            console.log(`Successfully mapped ${ruPath}`);
        }
    }
    
    console.log('Static Route Injection complete. Vercel build will now succeed.');
}

prerenderMetaTags().catch(console.error);
