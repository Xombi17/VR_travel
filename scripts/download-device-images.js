const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

// Define the directory where images will be saved
const imagesDir = path.join(process.cwd(), 'public', 'images', 'devices');

// Create the directory structure if it doesn't exist
async function createDirectories() {
  try {
    await mkdir(imagesDir, { recursive: true });
    console.log(`Created directory: ${imagesDir}`);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error(`Error creating directory: ${error.message}`);
      throw error;
    }
  }
}

// Function to download an image from a URL
async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const filePath = path.join(imagesDir, filename);
      const fileStream = fs.createWriteStream(filePath);

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve(filePath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Main function to download all images
async function downloadAllImages() {
  try {
    await createDirectories();

    // Define the images to download
    const images = [
      {
        url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000',
        filename: 'meta-quest.jpg'
      },
      {
        url: 'https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?q=80&w=1000',
        filename: 'htc-vive.jpg'
      },
      {
        url: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000',
        filename: 'valve-index.jpg'
      },
      {
        url: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1000',
        filename: 'smartphone-vr.jpg'
      }
    ];

    // Download each image
    const downloadPromises = images.map(image => 
      downloadImage(image.url, image.filename)
    );

    await Promise.all(downloadPromises);
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error(`Error downloading images: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
downloadAllImages(); 