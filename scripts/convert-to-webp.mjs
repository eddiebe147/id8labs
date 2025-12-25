import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public';

async function findImages(dir) {
  const images = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...await findImages(fullPath));
    } else if (['.png', '.jpg', '.jpeg'].includes(extname(entry.name).toLowerCase())) {
      images.push(fullPath);
    }
  }
  return images;
}

async function convertToWebP(imagePath) {
  const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const originalStats = await stat(imagePath);

  try {
    await sharp(imagePath)
      .webp({ quality: 85 })
      .toFile(webpPath);

    const webpStats = await stat(webpPath);
    const savings = ((originalStats.size - webpStats.size) / originalStats.size * 100).toFixed(1);

    console.log(`✓ ${basename(imagePath)} → ${basename(webpPath)}`);
    console.log(`  ${(originalStats.size / 1024).toFixed(0)}KB → ${(webpStats.size / 1024).toFixed(0)}KB (${savings}% smaller)`);

    return { original: imagePath, webp: webpPath, savings };
  } catch (err) {
    console.error(`✗ Failed: ${imagePath}`, err.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Converting images to WebP...\n');

  const images = await findImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to convert\n`);

  const results = [];
  for (const img of images) {
    const result = await convertToWebP(img);
    if (result) results.push(result);
  }

  console.log('\n📊 Summary:');
  console.log(`   Converted: ${results.length}/${images.length} images`);

  if (results.length > 0) {
    const totalSavings = results.reduce((acc, r) => acc + parseFloat(r.savings), 0) / results.length;
    console.log(`   Avg savings: ${totalSavings.toFixed(1)}%`);
  }

  console.log('\n⚠️  Note: Update your code to reference .webp files instead of .png/.jpg');
  console.log('   Original files kept for reference. Delete manually when ready.');
}

main().catch(console.error);
