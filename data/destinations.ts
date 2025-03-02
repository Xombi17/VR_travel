export interface Destination {
  id: string
  title: string
  description: string
  longDescription?: string
  price: number
  rating: number
  reviewCount: number
  category: string
  featured?: boolean
  imagePath: string
}

export const destinations: Destination[] = [
  {
    id: "paris",
    title: "Paris, France",
    description: "Experience the romance and charm of the City of Light with iconic landmarks and world-class cuisine.",
    longDescription: "Paris, the capital of France, is known worldwide for its stunning architecture, art museums, historical monuments, and romantic atmosphere. From the iconic Eiffel Tower to the majestic Notre-Dame Cathedral, Paris is filled with landmarks that will take your breath away. Stroll along the Champs-Élysées, visit the world-famous Louvre Museum, or simply relax at a charming café terrace and watch the world go by.",
    price: 1299,
    rating: 4.8,
    reviewCount: 423,
    category: "Europe",
    featured: true,
    imagePath: "/images/destinations/eiffel-tower.jpg"
  },
  {
    id: "great-wall",
    title: "Great Wall of China",
    description: "Explore one of the world's most impressive architectural feats spanning over 13,000 miles.",
    longDescription: "The Great Wall of China is an ancient series of walls and fortifications located in northern China, built around 500 years ago. Spanning thousands of kilometers from the east to the west of China, the Great Wall is one of the most impressive structures ever built by humans. This UNESCO World Heritage site attracts millions of visitors each year who come to marvel at its architectural grandeur and historical significance.",
    price: 1499,
    rating: 4.9,
    reviewCount: 387,
    category: "Asia",
    featured: true,
    imagePath: "/images/destinations/great-wall.jpg"
  },
  {
    id: "taj-mahal",
    title: "Taj Mahal, India",
    description: "Visit this magnificent marble mausoleum, a testament to eternal love and architectural brilliance.",
    longDescription: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. The Taj Mahal is regarded by many as the best example of Mughal architecture and a symbol of India's rich history.",
    price: 1199,
    rating: 4.7,
    reviewCount: 315,
    category: "Asia",
    imagePath: "/images/destinations/taj-mahal.jpg"
  },
  {
    id: "machu-picchu",
    title: "Machu Picchu, Peru",
    description: "Discover the mystical ancient Incan citadel set high in the Andes Mountains.",
    longDescription: "Machu Picchu stands 2,430 meters above sea level, in the middle of a tropical mountain forest, in an extraordinarily beautiful setting. It was probably the most amazing urban creation of the Inca Empire at its height; its giant walls, terraces and ramps seem as if they have been cut naturally in the continuous rock escarpments.",
    price: 1599,
    rating: 4.9,
    reviewCount: 276,
    category: "South America",
    featured: true,
    imagePath: "/images/destinations/machu-picchu.jpg"
  },
  {
    id: "pyramids",
    title: "Pyramids of Giza, Egypt",
    description: "Stand in awe before these ancient wonders that have fascinated humanity for millennia.",
    longDescription: "The Great Pyramid of Giza is the oldest and largest of the three pyramids in the Giza pyramid complex bordering present-day Giza in Greater Cairo, Egypt. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact. Egyptologists believe that the pyramid was built as a tomb for the Fourth Dynasty Egyptian pharaoh Khufu over a 20-year period.",
    price: 1399,
    rating: 4.6,
    reviewCount: 289,
    category: "Africa",
    imagePath: "/images/destinations/pyramids.jpg"
  },
  {
    id: "grand-canyon",
    title: "Grand Canyon, USA",
    description: "Witness the breathtaking scale and beauty of one of nature's greatest masterpieces.",
    longDescription: "The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles long, up to 18 miles wide and attains a depth of over a mile. For thousands of years, the area has been continuously inhabited by Native Americans, who built settlements within the canyon and its many caves.",
    price: 999,
    rating: 4.8,
    reviewCount: 352,
    category: "North America",
    imagePath: "/images/destinations/grand-canyon.jpg"
  },
  {
    id: "santorini",
    title: "Santorini, Greece",
    description: "Explore the stunning white-washed buildings and blue domes overlooking the Aegean Sea.",
    longDescription: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its two principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    price: 1499,
    rating: 4.9,
    reviewCount: 412,
    category: "Europe",
    featured: true,
    imagePath: "/images/destinations/santorini.jpg"
  },
  {
    id: "kyoto",
    title: "Kyoto, Japan",
    description: "Immerse yourself in Japanese culture with ancient temples, traditional gardens, and geisha districts.",
    longDescription: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It's also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.",
    price: 1699,
    rating: 4.8,
    reviewCount: 298,
    category: "Asia",
    imagePath: "/images/destinations/kyoto.jpg"
  },
  {
    id: "venice",
    title: "Venice, Italy",
    description: "Glide through the romantic canals of this unique city built on water.",
    longDescription: "Venice, the capital of northern Italy's Veneto region, is built on more than 100 small islands in a lagoon in the Adriatic Sea. It has no roads, just canals – including the Grand Canal thoroughfare – lined with Renaissance and Gothic palaces. The central square, Piazza San Marco, contains St. Mark's Basilica, which is tiled with Byzantine mosaics, and the Campanile bell tower offering views of the city's red roofs.",
    price: 1399,
    rating: 4.7,
    reviewCount: 356,
    category: "Europe",
    imagePath: "/images/destinations/venice.jpg"
  },
  {
    id: "bora-bora",
    title: "Bora Bora, French Polynesia",
    description: "Experience paradise with crystal clear waters, overwater bungalows, and stunning coral reefs.",
    longDescription: "Bora Bora is a small South Pacific island northwest of Tahiti in French Polynesia. Surrounded by sand-fringed motus (islets) and a turquoise lagoon protected by a coral reef, it's known for its scuba diving. It's also a popular luxury resort destination where some guest bungalows are perched over the water on stilts.",
    price: 2499,
    rating: 4.9,
    reviewCount: 278,
    category: "Oceania",
    featured: true,
    imagePath: "/images/destinations/bora-bora.jpg"
  },
  {
    id: "petra",
    title: "Petra, Jordan",
    description: "Discover the ancient city carved into rose-colored rock faces in the desert canyons.",
    longDescription: "Petra is a famous archaeological site in Jordan's southwestern desert. Dating to around 300 B.C., it was the capital of the Nabatean Kingdom. Accessed via a narrow canyon called Al Siq, it contains tombs and temples carved into pink sandstone cliffs, earning its nickname, the 'Rose City.' Perhaps its most famous structure is Al Khazneh, a temple with an ornate, Greek-style facade.",
    price: 1299,
    rating: 4.8,
    reviewCount: 245,
    category: "Middle East",
    imagePath: "/images/destinations/petra.jpg"
  },
  {
    id: "angkor-wat",
    title: "Angkor Wat, Cambodia",
    description: "Explore the largest religious monument in the world, a stunning temple complex.",
    longDescription: "Angkor Wat is a temple complex in Cambodia and is the largest religious monument in the world, on a site measuring 162.6 hectares. Originally constructed as a Hindu temple dedicated to the god Vishnu for the Khmer Empire, it was gradually transformed into a Buddhist temple towards the end of the 12th century.",
    price: 1199,
    rating: 4.7,
    reviewCount: 312,
    category: "Asia",
    imagePath: "/images/destinations/angkor-wat.jpg"
  },
  {
    id: "serengeti",
    title: "Serengeti National Park, Tanzania",
    description: "Witness the incredible wildlife and the Great Migration across vast African plains.",
    longDescription: "The Serengeti National Park is a large conservation area located in the north of Tanzania. The park flows over into neighboring Kenya where it's known as the Masai Mara. The park is famous for its annual migration of over 1.5 million white-bearded wildebeest and 250,000 zebra, and for its numerous Nile crocodile and honey badger.",
    price: 1899,
    rating: 4.9,
    reviewCount: 198,
    category: "Africa",
    imagePath: "/images/destinations/serengeti.jpg"
  },
  {
    id: "rio",
    title: "Rio de Janeiro, Brazil",
    description: "Experience the vibrant culture, stunning beaches, and iconic Christ the Redeemer statue.",
    longDescription: "Rio de Janeiro is a huge seaside city in Brazil, famed for its Copacabana and Ipanema beaches, 38m Christ the Redeemer statue atop Mount Corcovado and for Sugarloaf Mountain, a granite peak with cable cars to its summit. The city is also known for its sprawling favelas (shanty towns).",
    price: 1499,
    rating: 4.6,
    reviewCount: 287,
    category: "South America",
    imagePath: "/images/destinations/rio.jpg"
  },
  {
    id: "northern-lights",
    title: "Northern Lights, Iceland",
    description: "Marvel at the magical aurora borealis dancing across the Arctic night sky.",
    longDescription: "The aurora borealis, or northern lights, are a natural phenomenon characterized by the appearance of colorful lights in the night sky, predominantly seen in high-latitude regions. Iceland is one of the best places in the world to see this breathtaking display of green, pink, and purple lights swirling across the dark sky.",
    price: 1799,
    rating: 4.9,
    reviewCount: 234,
    category: "Europe",
    featured: true,
    imagePath: "/images/destinations/northern-lights.jpg"
  },
  {
    id: "sydney",
    title: "Sydney, Australia",
    description: "Visit the iconic Opera House and experience the vibrant culture of Australia's largest city.",
    longDescription: "Sydney, capital of New South Wales and one of Australia's largest cities, is best known for its harbourfront Sydney Opera House, with a distinctive sail-like design. Massive Darling Harbour and the smaller Circular Quay port are hubs of waterside life, with the arched Harbour Bridge and esteemed Royal Botanic Garden nearby.",
    price: 1699,
    rating: 4.7,
    reviewCount: 321,
    category: "Oceania",
    imagePath: "/images/destinations/sydney.jpg"
  }
] 