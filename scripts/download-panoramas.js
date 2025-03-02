const https = require('https');
const fs = require('fs');
const path = require('path');

const panoramas = [
  {
    name: 'paris-panorama.jpg',
    url: 'https://source.unsplash.com/1920x960/?paris,panorama,360',
    dir: 'panoramas'
  },
  {
    name: 'santorini-panorama.jpg',
    url: 'https://source.unsplash.com/1920x960/?santorini,panorama,360',
    dir: 'panoramas'
  },
  {
    name: 'grand-canyon-panorama.jpg',
    url: 'https://source.unsplash.com/1920x960/?grand+canyon,panorama,360',
    dir: 'panoramas'
  },
  {
    name: 'kyoto-panorama.jpg',
    url: 'https://source.unsplash.com/1920x960/?kyoto,japan,panorama,360',
    dir: 'panoramas'
  },
  {
    name: 'taj-mahal-panorama.jpg',
    url: 'https://source.unsplash.com/1920x960/?taj+mahal,panorama,360',
    dir: 'panoramas'
  }
];

const downloadImage = (url, filename, directory) => {
  const dir = path.join(__dirname, '..', 'public', 'images', directory);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const destinationPath = path.join(dir, filename);
  
  console.log(`Downloading: ${filename} to ${directory}/`);
  
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

// Download panorama images
console.log('Starting download of panorama images...');
panoramas.forEach(image => {
  downloadImage(image.url, image.name, image.dir);
});

console.log('Download process initiated. This may take a few moments...'); 