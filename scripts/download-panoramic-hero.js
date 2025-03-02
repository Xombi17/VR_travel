const https = require('https');
const fs = require('fs');
const path = require('path');

const heroImages = [
  {
    name: 'panoramic-hero.jpg',
    url: 'https://source.unsplash.com/1920x1080/?panoramic,travel,landmarks,santorini,eiffel',
    dir: ''
  },
  {
    name: 'santorini.jpg',
    url: 'https://source.unsplash.com/800x800/?santorini,greece,blue,dome',
    dir: 'destinations'
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
console.log('Starting download of panoramic hero image...');
heroImages.forEach(image => {
  downloadImage(image.url, image.name, image.dir);
});

console.log('Download process initiated. This may take a few moments...'); 