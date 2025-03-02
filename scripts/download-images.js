const https = require('https');
const fs = require('fs');
const path = require('path');

const destinations = [
  {
    name: 'eiffel-tower',
    url: 'https://source.unsplash.com/1600x900/?eiffel+tower'
  },
  {
    name: 'great-wall',
    url: 'https://source.unsplash.com/1600x900/?great+wall+of+china'
  },
  {
    name: 'taj-mahal',
    url: 'https://source.unsplash.com/1600x900/?taj+mahal'
  }
];

const downloadImage = (url, filename) => {
  const destinationPath = path.join(__dirname, '..', 'public', 'images', 'destinations', filename);
  
  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(destinationPath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded: ${filename}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
};

// Create directories if they don't exist
const dir = path.join(__dirname, '..', 'public', 'images', 'destinations');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Download all images
destinations.forEach(dest => {
  downloadImage(dest.url, `${dest.name}.jpg`);
}); 