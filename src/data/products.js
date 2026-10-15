export const categories = [
  {
    id: 'home-and-kitchen',
    name: 'Home And Kitchen',
    description: 'Smart finds for cooking, organizing, and comfortable living.',
    buttonText: 'Shop',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'health-and-household',
    name: 'Health & Household',
    description: 'Everyday essentials for a healthier, happier home.',
    buttonText: 'Shop',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'office-products',
    name: 'Office Products',
    description: 'Straightforward office supplies for desks, workspaces, and organization.',
    buttonText: 'Shop',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pet-supplies',
    name: 'Pet Supplies',
    description: 'Comfort and care essentials for pets of all sizes.',
    buttonText: 'Shop',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sports-and-outdoors',
    name: 'Sports And Outdoors',
    description: 'High-performance fitness gear and outdoor activity essentials.',
    buttonText: 'Shop',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tools-and-home-improvement',
    name: 'Tools And Home Improvement',
    description: 'Essential tools and hardware for upgrades and home repairs.',
    buttonText: 'Shop',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Vehicle care, accessories, and maintenance solutions.',
    buttonText: 'Shop',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'baby-products',
    name: 'Baby Products',
    description: 'Gentle, safe, and reliable essentials for babies and toddlers.',
    buttonText: 'Shop',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
  }
];

export const products = [
  {
    id: 1,
    name: 'Adjustable Resistance Bands',
    category: 'sports-and-outdoors',
    categoryName: 'Sports And Outdoors',
    sku: 'ZV-ARB-020',
    price: '$19',
    priceNumeric: 19,
    packSize: 'Standard Resistance Set with Door Anchor & Handles',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 850,
    minOrder: '1 Unit',
    rating: 5.0,
    popularity: 98,
    reviewCount: 48,
    priceNote: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    description: 'Stackable high-durability resistance bands designed for strength workouts, muscle toning, rehabilitation, and home fitness routines.',
    longDescription: 'Engineered from premium layered natural latex, this adjustable resistance band system offers variable resistance levels suitable for beginners and seasoned athletes alike. Complete with reinforced carabiners, non-slip handles, ankle straps, and protective travel carry pouch.',
    features: [
      'Multi-level progressive resistance stackable up to full workout load',
      'Anti-snap heavy-duty layered latex tubes for maximum workout safety',
      'Cushioned foam ergonomic grip handles with heavy gauge steel hooks',
      'Includes door anchor and adjustable ankle straps for full-body workouts',
      'Lightweight and compact for travel, home gym, and outdoor training'
    ],
    specs: [
      { label: 'Set Contents', value: '5 Color-coded Resistance Bands, 2 Handles, 2 Ankle Straps, 1 Door Anchor' },
      { label: 'Material', value: '100% Natural Elastic Latex & High-Tensile Steel' },
      { label: 'Weight', value: '0.95 kg total pack' },
      { label: 'Packaging', value: 'Waterproof Zipper Storage Case & Retail Box' }
    ]
  },
  {
    id: 2,
    name: 'Citrus Surface Cleaner',
    category: 'health-and-household',
    categoryName: 'Health & Household',
    sku: 'ZV-CSC-015',
    price: '$13',
    priceNumeric: 13,
    packSize: '500ml Spray Bottle',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 920,
    minOrder: '1 Unit',
    rating: 4.9,
    popularity: 91,
    reviewCount: 36,
    priceNote: 'Everyday Essential',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
    description: 'All-purpose plant-based citrus surface cleaner cutting through grease, grime, and food residue on countertops, glass, and tiles.',
    longDescription: 'Specially formulated with natural citrus extracts and biodegradable cleansing agents, Citrus Surface Cleaner leaves behind a refreshing natural scent without any toxic residue. Safe for kitchen islands, dining tables, bathrooms, and high-touch everyday surfaces.',
    features: [
      'Formulated with cold-pressed natural citrus peel oil',
      'Powerful multi-surface degreaser and grime remover',
      'Streak-free shine on quartz, granite, ceramic, and glass',
      'Cruelty-free, phosphate-free, and biodegradable formula',
      'Ergonomic precision spray nozzle with mist and stream settings'
    ],
    specs: [
      { label: 'Volume', value: '500 ml (16.9 fl oz)' },
      { label: 'Scent', value: 'Zesty Citrus Mandarin & Sweet Orange' },
      { label: 'Safety', value: 'Non-toxic, Food-contact surface safe' },
      { label: 'Bottle Type', value: 'Recyclable PET Spray' }
    ]
  },
  {
    id: 3,
    name: 'Cloud Comfort Pet Bed',
    category: 'pet-supplies',
    categoryName: 'Pet Supplies',
    sku: 'ZV-CCP-018',
    price: '$40',
    priceNumeric: 40,
    packSize: 'Deluxe Cozy Donut Cushion (Medium / Large)',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 620,
    minOrder: '1 Unit',
    rating: 5.0,
    popularity: 96,
    reviewCount: 52,
    priceNote: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-soft calming round pet bed with high-loft plush fleece and orthopedic bolster edge for restful sleep.',
    longDescription: 'Created to alleviate joint stiffness and anxiety, the Cloud Comfort Pet Bed features an ergonomic raised rim that delivers head and neck support, while the ultra-soft faux fur lining offers warmth and security. Fully machine washable with a water-resistant, non-skid bottom.',
    features: [
      'Orthopedic raised edge creates a cozy nest feeling for anxiety relief',
      'Dense supportive polypropylene cotton filler retains bounce and shape',
      'Non-slip water and dirt-resistant silicone-beaded base prevents sliding',
      'Machine washable and dryer safe on gentle cycle for easy maintenance',
      'Safe, non-toxic pet-friendly textile materials'
    ],
    specs: [
      { label: 'Dimensions', value: '60 cm x 60 cm x 18 cm (Medium / Universal)' },
      { label: 'Outer Shell', value: 'Ultra-Soft Faux Fur Shag Plush' },
      { label: 'Inner Filling', value: 'High-Resilience Breathable Virgin PP Cotton' },
      { label: 'Bottom', value: 'Waterproof 300D Oxford with Silicone Grip Dots' }
    ]
  },
  {
    id: 4,
    name: 'Essential Desk Organizer Set',
    category: 'office-products',
    categoryName: 'Office Products',
    sku: 'ZV-EDO-016',
    price: '$25',
    priceNumeric: 25,
    packSize: 'Multi-Compartment Mesh Desk Caddy with Pen Holders',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 940,
    minOrder: '1 Unit',
    rating: 4.9,
    popularity: 94,
    reviewCount: 39,
    priceNote: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek multi-compartment metal mesh desktop organizer designed for pens, documents, notepads, and office supplies.',
    longDescription: 'Declutter your workspace with the Essential Desk Organizer Set. Constructed from durable, anti-scratch powder-coated steel mesh with reinforced borders and non-scratch protective rubber footings. Features multiple partitioned tiers to keep desk essentials sorted and accessible.',
    features: [
      'Multi-tiered layout with slide-out drawer and dedicated pen slots',
      'Rust-resistant electroplated powder-coated black wire mesh',
      'Anti-scratch padded base prevents marks on wood and glass surfaces',
      'Smooth edges and polished contours for effortless everyday handling',
      'Instant ready-to-use setup with no assembly required'
    ],
    specs: [
      { label: 'Dimensions', value: '22 cm x 14 cm x 13 cm' },
      { label: 'Material', value: 'Powder-Coated Reinforced Steel Wire Mesh' },
      { label: 'Compartments', value: '6 Divided Sections + 1 Sliding Drawer' },
      { label: 'Finish', value: 'Matte Scratch-Resistant Black' }
    ]
  },
  {
    id: 5,
    name: 'Everyday Nonstick Cookware Set',
    category: 'home-and-kitchen',
    categoryName: 'Home And Kitchen',
    sku: 'ZV-ENC-014',
    price: '$70',
    priceNumeric: 70,
    packSize: 'Multi-Piece Nonstick Cookware with Tempered Glass Lids',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 510,
    minOrder: '1 Unit',
    rating: 5.0,
    popularity: 99,
    reviewCount: 64,
    priceNote: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    description: 'Premium granite nonstick cookware set with even-heat aluminum core and ergonomic heat-resistant handles.',
    longDescription: 'Crafted for daily home cooking and effortless cleanup, this Nonstick Cookware Set features multi-layer ceramic granite coating 100% free of PFOA, lead, and cadmium. Suitable for gas, electric, ceramic, and induction cooktops.',
    features: [
      'Superior 5-layer nonstick granite surface for oil-minimal cooking',
      'Die-cast aluminum core delivers uniform heat without hot spots',
      'Bakelite stay-cool woodgrain handles for safe, comfortable grip',
      'Steam-vented shatter-resistant tempered glass lids',
      'Compatible with all stovetops including magnetic induction'
    ],
    specs: [
      { label: 'Set Includes', value: 'Frying Pan, Saucepan with Lid, Casserole Pot with Lid' },
      { label: 'Coating', value: 'PFOA-Free Multi-Layer Granite Nonstick' },
      { label: 'Base', value: 'Induction Magnetized Stainless Steel Bottom' },
      { label: 'Cleaning', value: 'Dishwasher Safe / Hand Wash Recommended' }
    ]
  }
];
