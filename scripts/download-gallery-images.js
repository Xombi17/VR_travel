const https = require('https');
const fs = require('fs');
const path = require('path');

const galleryImages = [
  // Paris gallery
  {
    name: 'paris-gallery-1.jpg',
    url: 'https://source.unsplash.com/800x600/?paris,eiffel+tower',
    dir: 'gallery/paris'
  },
  {
    name: 'paris-gallery-2.jpg',
    url: 'https://source.unsplash.com/800x600/?paris,louvre',
    dir: 'gallery/paris'
  },
  {
    name: 'paris-gallery-3.jpg',
    url: 'https://source.unsplash.com/800x600/?paris,seine',
    dir: 'gallery/paris'
  },
  {
    name: 'paris-gallery-4.jpg',
    url: 'https://source.unsplash.com/800x600/?paris,montmartre',
    dir: 'gallery/paris'
  },
  {
    name: 'paris-gallery-5.jpg',
    url: 'https://source.unsplash.com/800x600/?paris,notre+dame',
    dir: 'gallery/paris'
  },
  {
    name: 'paris-gallery-6.jpg',
    url: 'https://source.unsplash.com/800x600/?paris,arc+de+triomphe',
    dir: 'gallery/paris'
  },
  
  // Great Wall gallery
  {
    name: 'great-wall-gallery-1.jpg',
    url: 'https://source.unsplash.com/800x600/?great+wall+of+china',
    dir: 'gallery/great-wall'
  },
  {
    name: 'great-wall-gallery-2.jpg',
    url: 'https://source.unsplash.com/800x600/?great+wall,china',
    dir: 'gallery/great-wall'
  },
  {
    name: 'great-wall-gallery-3.jpg',
    url: 'https://source.unsplash.com/800x600/?great+wall,mountains',
    dir: 'gallery/great-wall'
  },
  {
    name: 'great-wall-gallery-4.jpg',
    url: 'https://source.unsplash.com/800x600/?great+wall,architecture',
    dir: 'gallery/great-wall'
  },
  {
    name: 'great-wall-gallery-5.jpg',
    url: 'https://source.unsplash.com/800x600/?great+wall,landscape',
    dir: 'gallery/great-wall'
  },
  
  // Generic gallery images for other destinations
  {
    name: 'gallery-1.jpg',
    url: 'https://source.unsplash.com/800x600/?travel,landmark',
    dir: 'gallery/generic'
  },
  {
    name: 'gallery-2.jpg',
    url: 'https://source.unsplash.com/800x600/?travel,landscape',
    dir: 'gallery/generic'
  },
  {
    name: 'gallery-3.jpg',
    url: 'https://source.unsplash.com/800x600/?travel,architecture',
    dir: 'gallery/generic'
  },
  {
    name: 'gallery-4.jpg',
    url: 'https://source.unsplash.com/800x600/?travel,nature',
    dir: 'gallery/generic'
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

// Download gallery images
console.log('Starting download of gallery images...');
galleryImages.forEach(image => {
  downloadImage(image.url, image.name, image.dir);
});

console.log('Download process initiated. This may take a few moments...'); 