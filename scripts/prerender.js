import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const routesToPrerender = [
    '/',
    '/ai-interview-assistant',
    '/cluely-alternative',
    '/ai-coding-interview-helper',
    '/local-ai-assistant',
    '/ai-assistant-for-coding-interviews',
    '/how-ai-helps-in-coding-interviews',
    '/local-ai-coding-assistant',
    '/ai-tools-for-technical-interviews',
    '/blog/ai-interview-assistant-guide',
    '/blog/local-ai-vs-cloud-ai-assistants',
    '/blog/how-ai-can-help-with-coding-interviews',
    '/blog/how-ai-interview-assistants-work',
    '/blog/best-ai-tools-for-coding-interviews',
    '/blog/preparing-for-technical-interviews-with-ai',
    '/docs/ai-interview-assistant'
];

async function prerender() {
    console.log('Starting prerender script...');
    
    // Serve the dist directory locally
    const app = express();
    app.use(express.static(distPath));
    app.use((req, res) => res.sendFile(path.join(distPath, 'index.html')));
    
    const server = app.listen(0, async () => {
        const port = server.address().port;
        console.log(`Express listening on port ${port} `);
        
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        for (const route of routesToPrerender) {
            console.log(`Prerendering ${route}...`);
            const url = `http://localhost:${port}${route}`;
            await page.goto(url, { waitUntil: 'networkidle0' });
            
            const html = await page.content();
            
            // Remove the scripts that react injects for the client if required, 
            // but for CSR hydration, keeping them is correct so the app becomes interactive.

            const dir = path.join(distPath, route.slice(1));
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            
            fs.writeFileSync(path.join(dir, 'index.html'), html);
            console.log(`Prerendered ${route} successfully.`);
        }
        
        await browser.close();
        server.close();
        console.log('Prerendering completed.');
    });
}

prerender().catch(console.error);
