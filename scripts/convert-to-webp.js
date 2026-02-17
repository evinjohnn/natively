import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, '../src/assets');

const files = fs.readdirSync(assetsDir);

files.forEach(async (file) => {
    if (file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.jpg')) {
        const inputPath = path.join(assetsDir, file);
        const outputPath = path.join(assetsDir, file.replace(/\.(png|jpeg|jpg)$/, '.webp'));

        try {
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }
});
