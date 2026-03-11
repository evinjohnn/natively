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
        desc: 'Discover how an AI interview assistant running entirely locally on your device can help you ace technical and coding interviews without compromising your privacy.'
    },
    {
        path: '/cluely-alternative',
        title: 'The Top Local Cluely Alternative for Coding Interviews | Natively',
        desc: 'Looking for an alternative to Cluely? Natively provides a 100% local, ultra-fast, and deeply private AI meeting assistant for technical interviews.'
    },
    {
        path: '/ai-coding-interview-helper',
        title: 'Elite AI Coding Interview Helper | Technical Interview Copilot',
        desc: 'Leverage a local AI coding interview helper to tackle challenging algorithm and data structure problems with real-time feedback and high privacy.'
    },
    {
        path: '/local-ai-assistant',
        title: 'Secure Local AI Assistant for Offline Computing | Natively',
        desc: 'Use an offline, local AI assistant to secure your interview process. Get real-time answers directly from your device hardware without cloud tracking.'
    },
    {
        path: '/ai-assistant-for-coding-interviews',
        title: 'The Best AI Assistant for Coding Interviews | Real-Time Help',
        desc: 'Find the perfect AI assistant for coding interviews. Learn how an offline, AI-powered pair programmer helps you solve algorithms and system design problems instantly.'
    },
    {
        path: '/how-ai-helps-in-coding-interviews',
        title: 'How AI Helps in Coding Interviews | The Ultimate Guide',
        desc: 'Understand the tactical advantages of an AI coding interview helper. From real-time algorithm generation to invisible syntax correction.'
    },
    {
        path: '/local-ai-coding-assistant',
        title: 'The Premier Local AI Coding Assistant | Secure Interview Help',
        desc: 'Download the fastest local AI coding assistant. Process complex interview questions securely offline with zero latency and total invisibility.'
    },
    {
        path: '/ai-tools-for-technical-interviews',
        title: 'The Top AI Tools for Technical Interviews | Ace Your Assessment',
        desc: 'Explore the best AI tools for technical interviews. Compare cloud-based applications versus local, offline assistants for algorithmic screenings.'
    },
    {
        path: '/docs/ai-interview-assistant',
        title: 'Natively Docs: AI Interview Assistant Definition and Use Cases',
        desc: 'Documentation for Natively AI interview assistant. Read a concise, objective explanation of how local ai copilots work, their privacy benefits, and functionality.'
    },
    // BLOG POSTS
    {
        path: '/blog/ai-interview-assistant-guide',
        title: 'The Definitive Guide to Using an AI Interview Assistant',
        desc: 'Read our comprehensive guide on maximizing an AI interview assistant to effortlessly pass technical coding interviews.'
    },
    {
        path: '/blog/local-ai-vs-cloud-ai-assistants',
        title: 'Local AI vs Cloud AI Assistants: Which is Better?',
        desc: 'Comparing local, offline AI interview assistants to cloud-based alternatives like Cluely. Find out which offers the best performance and privacy.'
    },
    {
        path: '/blog/how-ai-can-help-with-coding-interviews',
        title: 'How AI Can Supercharge Your Next Coding Interview',
        desc: 'Learn about the strategies developers use to incorporate AI into live technical interviews to solve dynamic programming challenges.'
    },
    {
        path: '/blog/how-ai-interview-assistants-work',
        title: 'How AI Interview Assistants Work Under The Hood | Tech Breakdown',
        desc: 'Learn exactly how an AI interview assistant captures audio and screen data, runs OCR and LLM inference, and helps candidates pass technical interviews.'
    },
    {
        path: '/blog/best-ai-tools-for-coding-interviews',
        title: 'The 5 Best AI Tools for Coding Interviews | 2026 Guide',
        desc: 'Comparing the top AI tools for technical and coding interviews. We evaluate local vs cloud architectures, privacy, speed, and real-time inference capabilities.'
    },
    {
        path: '/blog/preparing-for-technical-interviews-with-ai',
        title: 'Preparing for Technical Interviews with AI | Ultimate Guide',
        desc: 'Discover how to prepare for technical and coding interviews using AI assistants. Leverage offline algorithms to practice system design and LeetCode.'
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

        // Replace Title Tag
        let newHTML = templateHTML.replace(
            /<title>.*<\/title>/i,
            `<title>${route.title}</title>`
        );

        // Replace Description Tag
        newHTML = newHTML.replace(
            /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
            `<meta name="description" content="${route.desc}" />`
        );

        // Replace OG Tags
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

        // Replace Twitter Tags
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
    }
    
    console.log('Static Route Injection complete. Vercel build will now succeed.');
}

prerenderMetaTags().catch(console.error);
