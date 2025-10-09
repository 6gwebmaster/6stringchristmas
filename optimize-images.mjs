import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const ASSETS_DIR = './src/assets';
const OPTIMIZED_DIR = './src/assets-optimized';

// Configuration for different image types
const CONFIG = {
  // Gallery images - high quality but compressed
  gallery: {
    jpeg: {
      quality: 85,
      progressive: true,
      mozjpeg: true
    },
    resize: {
      width: 1920,
      height: 1080,
      fit: 'inside',
      withoutEnlargement: true
    }
  },
  // Review images - smaller, optimized for web
  review: {
    png: {
      compressionLevel: 9,
      quality: 85
    },
    resize: {
      width: 400,
      height: 400,
      fit: 'inside',
      withoutEnlargement: true
    }
  },
  // Other PNG images
  png: {
    png: {
      compressionLevel: 9,
      quality: 85
    },
    resize: {
      width: 1200,
      fit: 'inside',
      withoutEnlargement: true
    }
  }
};

async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

async function optimizeImage(inputPath, outputPath) {
  const fileName = basename(inputPath).toLowerCase();
  const ext = extname(inputPath).toLowerCase();
  
  let config;
  
  // Determine which config to use
  if (fileName.startsWith('review')) {
    config = CONFIG.review;
  } else if (ext === '.png') {
    config = CONFIG.png;
  } else {
    config = CONFIG.gallery;
  }
  
  try {
    const originalSize = await getFileSize(inputPath);
    
    // Start with sharp
    let image = sharp(inputPath);
    
    // Apply resize if configured
    if (config.resize) {
      image = image.resize(config.resize);
    }
    
    // Convert and optimize based on file type
    if (ext === '.png' && config.png) {
      image = image.png(config.png);
    } else if (['.jpg', '.jpeg'].includes(ext) && config.jpeg) {
      image = image.jpeg(config.jpeg);
    }
    
    // Save the optimized image
    await image.toFile(outputPath);
    
    const optimizedSize = await getFileSize(outputPath);
    const savedBytes = originalSize - optimizedSize;
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);
    
    console.log(`✅ ${fileName}`);
    console.log(`   ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (saved ${savedPercent}%)`);
    
    return { originalSize, optimizedSize, savedBytes };
  } catch (error) {
    console.error(`❌ Error optimizing ${fileName}:`, error.message);
    return null;
  }
}

async function processDirectory() {
  try {
    // Create output directory if it doesn't exist
    await mkdir(OPTIMIZED_DIR, { recursive: true });
    
    // Read all files from assets directory
    const files = await readdir(ASSETS_DIR);
    
    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext);
    });
    
    console.log(`🖼️  Found ${imageFiles.length} images to optimize\n`);
    
    let totalOriginal = 0;
    let totalOptimized = 0;
    
    // Process each image
    for (const file of imageFiles) {
      const inputPath = join(ASSETS_DIR, file);
      const outputPath = join(OPTIMIZED_DIR, file);
      
      const result = await optimizeImage(inputPath, outputPath);
      
      if (result) {
        totalOriginal += result.originalSize;
        totalOptimized += result.optimizedSize;
      }
      
      console.log(''); // Empty line for readability
    }
    
    // Summary
    const totalSaved = totalOriginal - totalOptimized;
    const totalSavedPercent = ((totalSaved / totalOriginal) * 100).toFixed(1);
    
    console.log('📊 Summary:');
    console.log(`   Original:  ${formatBytes(totalOriginal)}`);
    console.log(`   Optimized: ${formatBytes(totalOptimized)}`);
    console.log(`   Saved:     ${formatBytes(totalSaved)} (${totalSavedPercent}%)`);
    console.log(`\n✨ Optimized images saved to: ${OPTIMIZED_DIR}`);
    console.log(`\nℹ️  To use optimized images, replace the contents of '${ASSETS_DIR}' with '${OPTIMIZED_DIR}'`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the optimization
processDirectory();

