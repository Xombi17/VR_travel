const https = require('https');
const fs = require('fs');
const path = require('path');

// Define all the images we need to download
const images = [
  // Destinations
  {
    name: 'eiffel-tower.jpg',
    url: 'https://source.unsplash.com/1600x900/?eiffel+tower,paris',
    dir: 'destinations'
  },
  {
    name: 'great-wall.jpg',
    url: 'https://source.unsplash.com/1600x900/?great+wall+of+china',
    dir: 'destinations'
  },
  {
    name: 'taj-mahal.jpg',
    url: 'https://source.unsplash.com/1600x900/?taj+mahal,india',
    dir: 'destinations'
  },
  {
    name: 'santorini.jpg',
    url: 'https://source.unsplash.com/1600x900/?santorini,greece',
    dir: 'destinations'
  },
  {
    name: 'machu-picchu.jpg',
    url: 'https://source.unsplash.com/1600x900/?machu+picchu,peru',
    dir: 'destinations'
  },
  {
    name: 'northern-lights.jpg',
    url: 'https://source.unsplash.com/1600x900/?northern+lights,aurora',
    dir: 'destinations'
  },
  {
    name: 'grand-canyon.jpg',
    url: 'https://source.unsplash.com/1600x900/?grand+canyon',
    dir: 'destinations'
  },
  
  // VR Experiences
  {
    name: 'paris-vr.jpg',
    url: 'https://source.unsplash.com/1600x900/?paris,eiffel+tower',
    dir: 'experiences'
  },
  {
    name: 'kyoto-vr.jpg',
    url: 'https://source.unsplash.com/1600x900/?kyoto,japan,temple',
    dir: 'experiences'
  },
  {
    name: 'grand-canyon-vr.jpg',
    url: 'https://source.unsplash.com/1600x900/?grand+canyon,arizona',
    dir: 'experiences'
  },
  
  // Experience Categories
  {
    name: 'adventure.jpg',
    url: 'https://source.unsplash.com/800x800/?adventure,travel',
    dir: 'categories'
  },
  {
    name: 'cultural.jpg',
    url: 'https://source.unsplash.com/800x800/?cultural,museum,history',
    dir: 'categories'
  },
  {
    name: 'urban.jpg',
    url: 'https://source.unsplash.com/800x800/?urban,city,skyline',
    dir: 'categories'
  },
  {
    name: 'natural.jpg',
    url: 'https://source.unsplash.com/800x800/?nature,landscape',
    dir: 'categories'
  },
  
  // VR Devices
  {
    name: 'meta-quest.jpg',
    url: 'https://source.unsplash.com/600x600/?vr+headset,oculus',
    dir: 'devices'
  },
  {
    name: 'htc-vive.jpg',
    url: 'https://source.unsplash.com/600x600/?vr+headset,htc',
    dir: 'devices'
  },
  {
    name: 'smartphone-vr.jpg',
    url: 'https://source.unsplash.com/600x600/?smartphone,vr',
    dir: 'devices'
  },
  
  // Hero backgrounds
  {
    name: 'vr-experience-bg.jpg',
    url: 'https://source.unsplash.com/1920x1080/?virtual+reality,travel',
    dir: 'backgrounds'
  },
  {
    name: 'vr-experiences-header.jpg',
    url: 'https://source.unsplash.com/1920x1080/?vr,travel,technology',
    dir: 'backgrounds'
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

// Create base images directory if it doesn't exist
const baseDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// Download all images
console.log('Starting download of all placeholder images...');
images.forEach(image => {
  downloadImage(image.url, image.name, image.dir);
});

console.log('Download process initiated. This may take a few moments...'); 