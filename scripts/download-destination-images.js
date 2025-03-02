const fs = require('fs');
const https = require('https');
const path = require('path');

const destinations = [
  {
    id: 'angkor-wat',
    query: 'angkor-wat-temple-cambodia-ancient',
  },
  {
    id: 'rio',
    query: 'rio-de-janeiro-christ-redeemer-brazil',
  },
  {
    id: 'serengeti',
    query: 'serengeti-national-park-wildlife-tanzania',
  },
  {
    id: 'bora-bora',
    query: 'bora-bora-french-polynesia-overwater-bungalows',
  },
  {
    id: 'sydney',
    query: 'sydney-opera-house-harbour-bridge',
  },
  {
    id: 'petra',
    query: 'petra-jordan-treasury-ancient',
  }
];

const downloadImage = async (destination) => {
  const url = `https://source.unsplash.com/1600x900/?${destination.query}`;
  const filePath = path.join(__dirname, '..', 'public', 'images', 'destinations', `${destination.id}.jpg`);
  
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image for ${destination.id}`));
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ Downloaded ${destination.id}.jpg`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => reject(err));
      });
    }).on('error', reject);
  });
};

async function downloadAllImages() {
  console.log('Starting to download destination images...');
  
  for (const destination of destinations) {
    try {
      await downloadImage(destination);
    } catch (error) {
      console.error(`Error downloading ${destination.id}:`, error.message);
    }
  }
  
  console.log('Finished downloading all images!');
}

downloadAllImages();
