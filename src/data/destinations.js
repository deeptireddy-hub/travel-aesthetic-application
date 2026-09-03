// Wanderly Curated Destinations Data

export const DESTINATIONS = [
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "East Asia",
    tagline: "Timeless traditions, moss gardens & thousand-year temples.",
    description:
      "Timeless traditions, serene bamboo groves, preserved geisha quarters, and unforgettable culinary heritage around every quiet stone alley.",
    category: ["Culture", "City"],
    coordinates: {
      lat: 35.0116,
      lon: 135.7681
    },
    imageQuery: "Kyoto Japan cherry blossoms temple",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    temperature: 19,
    weatherCondition: "Cloudy",
    weatherMock: {
      temp: 19,
      condition: "Partly Cloudy",
      feelsLike: 18,
      humidity: 64,
      windSpeed: 11,
      visibility: 10,
      description: "Gentle spring breeze with scattered light clouds"
    },
    famousPlaces: [
      {
        id: "fushimi-inari",
        name: "Fushimi Inari Taisha",
        neighborhood: "Fushimi Ward",
        description: "Winding hillside pathways sheltered by over ten thousand vibrant vermilion torii gates dedicated to the god of harvest.",
        bestTime: "Early sunrise (6:00 AM - 7:30 AM) before crowds arrive.",
        image: "https://images.unsplash.com/photo-1478436127897-769e00d2c715?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "arashiyama",
        name: "Arashiyama Bamboo Grove",
        neighborhood: "Western Kyoto",
        description: "Towering green bamboo stalks swaying gracefully in the wind, creating an ethereal auditory symphony recognized by Japan's Ministry of the Environment.",
        bestTime: "Dawn for pristine lighting and tranquil whispers of swaying bamboo.",
        image: "https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "kiyomizu-dera",
        name: "Kiyomizu-dera",
        neighborhood: "Higashiyama Ward",
        description: "Historic wooden temple perched dramatically on Mount Otowa, built entirely without a single nail, offering panoramic city vistas.",
        bestTime: "Late afternoon golden hour overlooking Kyoto basin.",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "gion-district",
        name: "Gion District",
        neighborhood: "Central Kyoto",
        description: "Atmospheric lantern-lit streets lined with 17th-century wooden machiya merchant houses, ochaya teahouses, and fleeting glimpses of geiko.",
        bestTime: "Dusk when traditional paper lanterns illuminate the stone flagstones.",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Aegean Sea, Europe",
    tagline: "Dramatic volcanic cliffs crowned in white and cobalt.",
    description:
      "Perched high on dramatic caldera precipices, Santorini boasts whitewashed cave houses, deep blue domes, and sunsets that paint the Aegean Sea in amber fire.",
    category: ["Beach", "Culture"],
    coordinates: {
      lat: 36.3932,
      lon: 25.4615
    },
    imageQuery: "Santorini Greece whitewashed houses sunset caldera",
    heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
    temperature: 24,
    weatherCondition: "Sunny",
    weatherMock: {
      temp: 24,
      condition: "Clear Sky",
      feelsLike: 25,
      humidity: 52,
      windSpeed: 18,
      visibility: 12,
      description: "Crisp Aegean sunshine with refreshing coastal breezes"
    },
    famousPlaces: [
      {
        id: "oia-castle",
        name: "Oia Castle & Sunset Point",
        neighborhood: "Northern Tip",
        description: "The premier vantage point on the island ruins where sunset enthusiasts gather to watch the sun melt beneath the Aegean horizon.",
        bestTime: "One hour before dusk; reserve terrace seating early.",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ammoudi-bay",
        name: "Ammoudi Bay",
        neighborhood: "Below Oia",
        description: "Charming red volcanic cliff cove with crystalline waters and waterfront tavernas serving fresh catch of the day.",
        bestTime: "Midday swim followed by seaside grilled octopus lunch.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ancient-thera",
        name: "Ancient Thera & Akrotiri",
        neighborhood: "Mesa Vouno",
        description: "Bronze Age Minoan archaeological wonder preserved beneath volcanic ash, often called Greece's prehistoric Pompeii.",
        bestTime: "Morning hours before the midday sun peaks.",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "red-beach",
        name: "Red Beach (Kokkini Paralia)",
        neighborhood: "Akrotiri",
        description: "Unreal landscape of pulverised red volcanic rock cliffs meeting deep turquoise waters.",
        bestTime: "Early morning to avoid afternoon heat and crowds.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    region: "Southern Africa",
    tagline: "Where dramatic peaks collide with two roaring oceans.",
    description:
      "A cosmopolitan metropolis framed by flat-topped Table Mountain, vineyard-draped valleys, and penguin-speckled coastlines of wild Atlantic beauty.",
    category: ["Nature", "City", "Adventure"],
    coordinates: {
      lat: -33.9249,
      lon: 18.4241
    },
    imageQuery: "Cape Town Table Mountain ocean Twelve Apostles",
    heroImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1600&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
    temperature: 22,
    weatherCondition: "Breezy",
    weatherMock: {
      temp: 22,
      condition: "Sunny & Crisp",
      feelsLike: 21,
      humidity: 58,
      windSpeed: 24,
      visibility: 15,
      description: "Crisp ocean air with clear views of Table Mountain"
    },
    famousPlaces: [
      {
        id: "table-mountain",
        name: "Table Mountain Summit",
        neighborhood: "Table Mountain National Park",
        description: "Ancient sandstone plateau soaring over 1,000 meters above sea level, accessible by rotating cable car or exhilarating Platteklip Gorge trail.",
        bestTime: "Early morning when the famous 'tablecloth' cloud is clear.",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "boulders-beach",
        name: "Boulders Beach Colony",
        neighborhood: "Simon's Town",
        description: "Sheltered coastal inlets surrounded by granite boulders, home to a wild breeding colony of African penguins.",
        bestTime: "Late morning at low tide for the best boardwalk views.",
        image: "https://images.unsplash.com/photo-1575459709629-97cf52299c5b?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "kirstenbosch",
        name: "Kirstenbosch Botanical Gardens",
        neighborhood: "Newlands",
        description: "World-renowned botanical sanctuary situated against the eastern slopes of Table Mountain featuring the Centenary Tree Canopy Walkway.",
        bestTime: "Mid-afternoon picnic amidst the fynbos kingdom.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "cape-point",
        name: "Cape Point & Cape of Good Hope",
        neighborhood: "Cape Peninsula",
        description: "Dramatic rocky headland and historic lighthouse where fierce winds and ocean currents converge in raw natural power.",
        bestTime: "Morning road trip along Chapman's Peak Drive.",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    tagline: "Emerald rice terraces, spiritual shrines & ocean swells.",
    description:
      "An island sanctuary steeped in Hindu mysticism, lush jungle ravines, sculptured emerald rice terraces, and world-class surf breaks along sacred shores.",
    category: ["Nature", "Beach", "Culture"],
    coordinates: {
      lat: -8.4095,
      lon: 115.1889
    },
    imageQuery: "Bali rice terraces Ubud water temple",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1600&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    temperature: 29,
    weatherCondition: "Tropical",
    weatherMock: {
      temp: 29,
      condition: "Tropical Sun",
      feelsLike: 33,
      humidity: 78,
      windSpeed: 10,
      visibility: 9,
      description: "Warm tropical warmth with fragrant ocean breeze"
    },
    famousPlaces: [
      {
        id: "tegallalang",
        name: "Tegallalang Rice Terraces",
        neighborhood: "Ubud",
        description: "Cascading emerald terraces sculpted along steep ravines following the ancient 9th-century Balinese subak cooperative irrigation system.",
        bestTime: "Dawn as sunlight filters through morning mist.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "uluwatu-temple",
        name: "Uluwatu Sea Temple",
        neighborhood: "Bukit Peninsula",
        description: "Spectacular clifftop temple perched 70 meters above crashing surf, famous for nightly sunset Kecak fire dance performances.",
        bestTime: "Sunset for the dramatic cliffside choral performance.",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "tirta-empul",
        name: "Tirta Empul Holy Water Temple",
        neighborhood: "Tampak Siring",
        description: "Sacred temple complex renowned for holy spring water pools where worshippers perform traditional purification rituals.",
        bestTime: "Early morning to experience respectful, serene prayer.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "nusa-penida",
        name: "Kelingking Beach & Nusa Penida",
        neighborhood: "Offshore Island",
        description: "Jaw-dropping coastal formation resembling a T-Rex overlooking pristine turquoise waters and untouched white sands.",
        bestTime: "Day trip by morning speed boat from Sanur harbor.",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Western Europe",
    tagline: "Haussmannian boulevards, art galleries & culinary art.",
    description:
      "The City of Light balances grand architectural grandeur with intimate cobblestone courtyards, pavement cafés, world-defining art museums, and timeless style.",
    category: ["City", "Culture"],
    coordinates: {
      lat: 48.8566,
      lon: 2.3522
    },
    imageQuery: "Paris Eiffel Tower Seine River Haussmann architecture",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    temperature: 17,
    weatherCondition: "Partly Cloudy",
    weatherMock: {
      temp: 17,
      condition: "Mild & Overcast",
      feelsLike: 16,
      humidity: 62,
      windSpeed: 14,
      visibility: 10,
      description: "Pleasant Parisian afternoon, ideal for terrace bistros"
    },
    famousPlaces: [
      {
        id: "louvre",
        name: "Musée du Louvre & Tuileries",
        neighborhood: "1st Arrondissement",
        description: "The world's largest art museum housed within the former French royal palace, crowned by I.M. Pei's iconic glass pyramid.",
        bestTime: "Wednesday or Friday evening openings for calmer galleries.",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "montmartre",
        name: "Montmartre & Sacré-Cœur",
        neighborhood: "18th Arrondissement",
        description: "Bohemian hilltop enclave once favored by Picasso and Renoir, crowned by the radiant travertine basilica overlooking all of Paris.",
        bestTime: "Morning stroll through Place du Tertre before tour groups.",
        image: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "seine-islands",
        name: "Île Saint-Louis & Île de la Cité",
        neighborhood: "Central Paris",
        description: "The historic cradle of Paris between the arms of the Seine river, home to Notre-Dame, Sainte-Chapelle, and artisan Berthillon sorbets.",
        bestTime: "Golden hour riverside walk along the Quai de Bourbon.",
        image: "https://images.unsplash.com/photo-1471623432079-b009d30b6729?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "palais-garnier",
        name: "Opéra Garnier",
        neighborhood: "9th Arrondissement",
        description: "Opulent masterpiece of 19th-century Beaux-Arts theatre architecture featuring Chagall's vibrant ceiling painting.",
        bestTime: "Afternoon self-guided architecture tour.",
        image: "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    region: "Central Europe",
    tagline: "Glacial peaks, mirror lakes & alpine majesty.",
    description:
      "Soaring jagged peaks, tranquil wildflower valleys, cogwheel railways winding through clouds, and wooden chalets nestled beneath the Matterhorn.",
    category: ["Nature", "Adventure"],
    coordinates: {
      lat: 46.5599,
      lon: 7.9804
    },
    imageQuery: "Swiss Alps Zermatt Matterhorn Lauterbrunnen waterfalls",
    heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1600&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop",
    temperature: 12,
    weatherCondition: "Alpine Crisp",
    weatherMock: {
      temp: 12,
      condition: "Alpine Sunshine",
      feelsLike: 11,
      humidity: 45,
      windSpeed: 8,
      visibility: 20,
      description: "Pristine mountain clarity with crisp, fresh air"
    },
    famousPlaces: [
      {
        id: "matterhorn",
        name: "The Matterhorn & Gornergrat",
        neighborhood: "Zermatt",
        description: "The pyramid-shaped icon of the Alps, reflected in the still waters of the Riffelsee along the legendary cogwheel train route.",
        bestTime: "Sunrise to witness the iconic peak catch the first golden rays.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "lauterbrunnen",
        name: "Lauterbrunnen Valley of 72 Waterfalls",
        neighborhood: "Bernese Oberland",
        description: "Fairytale glacial valley enclosed by sheer vertical limestone cliffs with roaring torrents including Staubbach Falls.",
        bestTime: "Late spring when alpine snowmelt powers the cascades.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "jungfraujoch",
        name: "Jungfraujoch – Top of Europe",
        neighborhood: "Interlaken Region",
        description: "Europe's highest-altitude railway station at 3,454 meters, offering breathtaking access to the vast Aletsch Glacier.",
        bestTime: "Clear morning departure by Eiger Express cable car.",
        image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "lake-oeschinen",
        name: "Oeschinen Lake (Oeschinensee)",
        neighborhood: "Kandersteg",
        description: "Crystal-clear turquoise mountain lake fed by glacial brooks, surrounded by 3,000-meter cliffs and alpine rowboats.",
        bestTime: "Midday when sun reaches the deepest turquoise depths.",
        image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=800&auto=format&fit=crop"
      }
    ]
  }
];

export const CATEGORIES = ["All", "Beach", "City", "Nature", "Culture", "Adventure"];
