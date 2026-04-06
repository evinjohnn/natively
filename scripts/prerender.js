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

        // Save generated HTML to nested folder matching the route path
        const dir = path.join(distPath, route.path.slice(1));
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        fs.writeFileSync(path.join(dir, 'index.html'), newHTML);
        console.log(`Successfully mapped ${route.path}`);

        // Generate /ru/ variant if Russian translations exist
        if (route.ru) {
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
