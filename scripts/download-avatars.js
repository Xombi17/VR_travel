const https = require('https');
const fs = require('fs');
const path = require('path');

const avatars = [
  {
    name: 'avatar-1',
    url: 'https://source.unsplash.com/200x200/?portrait,woman'
  },
  {
    name: 'avatar-2',
    url: 'https://source.unsplash.com/200x200/?portrait,man'
  },
  {
    name: 'avatar-3',
    url: 'https://source.unsplash.com/200x200/?portrait,woman'
  },
  {
    name: 'avatar-4',
    url: 'https://source.unsplash.com/200x200/?portrait,man'
  }
];

const downloadImage = (url, filename) => {
  const destinationPath = path.join(__dirname, '..', 'public', 'images', 'avatars', filename);
  
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
const dir = path.join(__dirname, '..', 'public', 'images', 'avatars');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Download all images
avatars.forEach(avatar => {
  downloadImage(avatar.url, `${avatar.name}.jpg`);
}); 