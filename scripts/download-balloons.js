const https = require('https');
const fs = require('fs');
const path = require('path');

const balloonImages = [
  {
    name: 'balloon-1.png',
    url: 'https://source.unsplash.com/400x400/?hot+air+balloon,red',
    dir: 'elements'
  },
  {
    name: 'balloon-2.png',
    url: 'https://source.unsplash.com/400x400/?hot+air+balloon,orange',
    dir: 'elements'
  },
  {
    name: 'balloon-3.png',
    url: 'https://source.unsplash.com/400x400/?hot+air+balloon,colorful',
    dir: 'elements'
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

// Download balloon images
console.log('Starting download of balloon images...');
balloonImages.forEach(image => {
  downloadImage(image.url, image.name, image.dir);
});

console.log('Download process initiated. This may take a few moments...'); 