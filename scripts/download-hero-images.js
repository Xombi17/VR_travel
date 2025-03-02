const https = require('https');
const fs = require('fs');
const path = require('path');

const heroImages = [
  {
    name: 'hero.jpg',
    url: 'https://source.unsplash.com/1920x1080/?travel,landscape,vr',
    dir: ''
  },
  {
    name: 'destinations-header.jpg',
    url: 'https://source.unsplash.com/1920x800/?travel,destinations,world',
    dir: ''
  }
];

const downloadImage = (url, filename, directory) => {
  const dir = path.join(__dirname, '..', 'public', 'images', directory);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const destinationPath = path.join(dir, filename);
  
  console.log(`Downloading: ${filename} to ${directory ? directory + '/' : ''}`);
  
  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(destinationPath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`✓ Downloaded: ${filename}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
};

// Download hero images
console.log('Starting download of hero images...');
heroImages.forEach(image => {
  downloadImage(image.url, image.name, image.dir);
});

console.log('Download process initiated. This may take a few moments...'); 