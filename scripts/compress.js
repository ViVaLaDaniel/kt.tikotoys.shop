import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../public/images');

const imagesToCompress = [
  { input: 'fairytale_bg.png', output: 'fairytale_bg.webp', quality: 75 },
  { input: 'box_small.png', output: 'box_small.webp', quality: 80 },
  { input: 'box_large.png', output: 'box_large.webp', quality: 80 }
];

async function compress() {
  console.log('Starting image compression...');
  for (const img of imagesToCompress) {
    const inputPath = path.join(imagesDir, img.input);
    const outputPath = path.join(imagesDir, img.output);

    if (fs.existsSync(inputPath)) {
      console.log(`Compressing ${img.input} to ${img.output}...`);
      const originalSize = fs.statSync(inputPath).size;
      
      await sharp(inputPath)
        .webp({ quality: img.quality })
        .toFile(outputPath);

      const compressedSize = fs.statSync(outputPath).size;
      console.log(`Saved ${img.output}: ${(originalSize / 1024).toFixed(1)} KB -> ${(compressedSize / 1024).toFixed(1)} KB`);
    } else {
      console.log(`File not found: ${img.input}`);
    }
  }
  console.log('Image compression completed!');
}

compress().catch(err => {
  console.error('Error during compression:', err);
});
