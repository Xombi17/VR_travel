const https = require('https');
const fs = require('fs');
const path = require('path');

const aboutImages = [
  {
    name: 'about-hero.jpg',
    url: 'https://source.unsplash.com/1920x1080/?travel,technology,office',
    dir: 'about'
  },
  {
    name: 'our-story.jpg',
    url: 'https://source.unsplash.com/800x600/?travel,vr,technology',
    dir: 'about'
  },
  {
    name: 'our-technology.jpg',
    url: 'https://source.unsplash.com/800x600/?vr,technology,headset',
    dir: 'about'
  },
  {
    name: 'team-alex.jpg',
    url: 'https://source.unsplash.com/300x300/?portrait,man,professional',
    dir: 'about/team'
  },
  {
    name: 'team-sophia.jpg',
    url: 'https://source.unsplash.com/300x300/?portrait,woman,professional',
    dir: 'about/team'
  },
  {
    name: 'team-marcus.jpg',
    url: 'https://source.unsplash.com/300x300/?portrait,man,creative',
    dir: 'about/team'
  },
  {
    name: 'team-leila.jpg',
    url: 'https://source.unsplash.com/300x300/?portrait,woman,business',
    dir: 'about/team'
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

// Download about page images
console.log('Starting download of about page images...');
aboutImages.forEach(image => {
  downloadImage(image.url, image.name, image.dir);
});

console.log('Download process initiated. This may take a few moments...'); 