const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directories to process
const sourceDir = path.join(__dirname, '../public/images');
const placeholdersDir = path.join(__dirname, '../public/images/placeholders');

// Create placeholders directory if it doesn't exist
if (!fs.existsSync(placeholdersDir)) {
  fs.mkdirSync(placeholdersDir, { recursive: true });
}

// Function to process a single image
async function processImage(filePath) {
  try {
    const relativePath = path.relative(sourceDir, filePath);
    const outputPath = path.join(placeholdersDir, relativePath);
    
    // Create directory structure if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Skip if it's a directory or not an image
    const ext = path.extname(filePath).toLowerCase();
    if (!ext.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
      return;
    }
    
    console.log(`Processing: ${relativePath}`);
    
    // Generate a low quality placeholder
    await sharp(filePath)
      .resize(20) // Tiny size
      .blur(5)    // Blur it
      .toFormat('webp', { quality: 20 })
      .toFile(outputPath.replace(/\.[^.]+$/, '.webp'));
    
    console.log(`Created placeholder: ${relativePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Function to walk through directories recursively
async function processDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    // Skip the placeholders directory itself
    if (fullPath === placeholdersDir) {
      continue;
    }
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      await processImage(fullPath);
    }
  }
}

// Start processing
(async () => {
  console.log('Generating image placeholders...');
  await processDirectory(sourceDir);
  console.log('Done!');
})();
