import type { Product, ProductCategory, Coupon } from '../types/index.ts';

export interface TaxonomyCategory {
  name: ProductCategory;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  subcategories: string[];
}

export const TAXONOMY_CATEGORIES: TaxonomyCategory[] = [
  {
    name: 'Wood Craft',
    slug: 'wood-craft',
    tagline: 'Natural textures shaped by skilled hands',
    description: 'Aged Sheesham and reclaimed Teak meticulously hand-carved by hereditary Indian woodworkers.',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Wooden Décor', 'Sculptures', 'Utility & Storage', 'Wooden Art', 'Trays & Boxes'],
  },
  {
    name: 'Stone Craft',
    slug: 'stone-craft',
    tagline: 'Timeless forms carved in stone',
    description: 'Centuries-old Makrana marble inlay, soapstone jali filigree, and serene sandstone sculptures.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Stone Sculptures', 'Stone Décor', 'Figurines', 'Traditional Stone Art'],
  },
  {
    name: 'Brass & Metal',
    slug: 'brass-and-metal',
    tagline: 'Heritage metalwork with enduring character',
    description: 'Lost-wax cast virgin brass idols, ancient dhokra bell metal, and patinated antique accents.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Brass Décor', 'Brass Idols', 'Antique Metal', 'Vintage Pieces', 'Pooja Essentials'],
  },
  {
    name: 'Home Decor',
    slug: 'home-decor',
    tagline: 'Objects that give your space a story',
    description: 'Hand-beaten tree of life wall art, ornate jharokha mirrors, and evocative artisanal centerpieces.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Wall Décor', 'Table Décor', 'Sculptures', 'Decorative Objects'],
  },
  {
    name: 'Dining & Kitchen',
    slug: 'dining-and-kitchen',
    tagline: 'Pure heirloom dining and ritual serving',
    description: 'Ayurvedic pure Kansa bronze thalis, hand-hammered pure copper vessels, and brass spice chests.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Serving Pieces', 'Trays', 'Bowls', 'Kitchen Décor', 'Dining Accessories'],
  },
  {
    name: 'Collections',
    slug: 'collections',
    tagline: 'Curated heritage for meaningful spaces',
    description: 'Limited artisan releases, seasonal festive treasures, and certified heirloom creations.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
    subcategories: ['New Arrivals', 'Best Sellers', 'Festive Collection', 'Heritage Collection', 'Artisan Collection', 'Gifts'],
  }
];

export const EDITORIAL_STORIES = [
  {
    title: 'THE BEAUTY OF WOOD',
    subtitle: 'Seasoned Grain & Generational Carving',
    description: 'From the heartlands of Saharanpur and Shekhawati, master wood turners shape seasoned Indian Sheesham and reclaimed Teak using heirloom chisels. Every grain variation tells of decades weathered under the Indian sun.',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?category=Wood%20Craft',
    cta: 'Explore Wood Craft'
  },
  {
    title: 'CARVED IN STONE',
    subtitle: 'Pietra Dura & Agra Jali Traditions',
    description: 'Inheriting the precise stone craftsmanship of Mughal and Rajasthani master artisans, our carvers hand-chisel delicate soapstone lattices and embed semi-precious lapis lazuli into pristine white Makrana marble.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?category=Stone%20Craft',
    cta: 'Explore Stone Craft'
  },
  {
    title: 'THE WARMTH OF BRASS',
    subtitle: 'Lost-Wax Sand Casting of Peetal Nagri',
    description: 'In the narrow guild alleys of Moradabad, molten virgin brass is poured into custom clay and sand molds. Each bell, diya, and idol undergoes hours of hand-filing, emery buffing, and natural patination to radiate warmth for lifetimes.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?category=Brass%20%26%20Metal',
    cta: 'Explore Brass & Metal'
  }
];

export const GIFTING_OCCASIONS = [
  {
    title: 'Housewarming (Griha Pravesh)',
    slug: 'housewarming',
    description: 'Auspicious Urlis, Ganesha idols, and brass door torans to bless new dwellings.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Wedding Celebrations',
    slug: 'wedding',
    description: 'Pure Kansa dining dinnerware sets and heirloom vintage decorative chests.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Festive & Diwali Gifting',
    slug: 'festive',
    description: 'Handcrafted peacock hanging diyas, akhand deepaks, and luxury gift hampers.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Corporate & Memento Gifting',
    slug: 'corporate',
    description: 'Hand-carved marble coasters, brass pocket watch curios, and desk decor.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Luxury Heritage Heirlooms',
    slug: 'luxury',
    description: 'Masterwork lost-wax Nataraja bronzes and limited artisan sculptures.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
  }
];

export const MATERIALS_LIST = [
  {
    name: 'Wood',
    label: 'Natural Wood',
    desc: 'Sheesham & Teak',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Stone',
    label: 'Hand-Carved Stone',
    desc: 'Makrana Marble & Soapstone',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Brass',
    label: 'Solid Brass',
    desc: 'Virgin Cast Metal',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Bronze',
    label: 'Pure Kansa / Bronze',
    desc: 'Ayurvedic Bell Metal',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Metal',
    label: 'Antique Metal & Iron',
    desc: 'Lost-wax & Hand-beaten',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80'
  }
];

export const CATEGORIES: { name: ProductCategory; slug: string; description: string; image: string; itemCount: number }[] = [
  {
    name: 'Wood Craft',
    slug: 'wood-craft',
    description: 'Natural textures shaped by skilled hands. Sheesham & teak carved decor, trays, and boxes.',
    image: '/products/wooden-chakla-belan-set/6.1.jpg',
    itemCount: 15,
  },
  {
    name: 'Stone Craft',
    slug: 'stone-craft',
    description: 'Timeless forms carved in stone. White Makrana marble inlay, soapstone jali and sculptures.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    itemCount: 0,
  },
  {
    name: 'Brass & Metal',
    slug: 'brass-and-metal',
    description: 'Heritage metalwork with enduring character. Solid brass idols, peacock urlis, and curios.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    itemCount: 0,
  },
  {
    name: 'Home Decor',
    slug: 'home-decor',
    description: 'Objects that give your space a story. Tree of life wall art, tabletop accents and jharokhas.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    itemCount: 0,
  },
  {
    name: 'Dining & Kitchen',
    slug: 'dining-kitchen',
    description: 'Pure heirloom dining. Ayurvedic Kansa bronze dinnerware, hammered copper jugs, and spice boxes.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    itemCount: 0,
  },
  {
    name: 'Pooja Essentials & Idols',
    slug: 'pooja-essentials-idols',
    description: 'Hand-carved brass Ganesha, Nataraja, Radha Krishna, and ritual bell sets.',
    image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=600&q=80',
    itemCount: 0,
  },
  {
    name: 'Vintage Collection',
    slug: 'vintage-collection',
    description: 'Pocket watches, heirloom compasses, brass telescope models, and retro curios.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    itemCount: 0,
  },
  {
    name: 'Candle Holders & Diyas',
    slug: 'candle-holders-diyas',
    description: 'Carved brass peacock diyas, akhand deepaks, and contemporary metal candelabras.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
    itemCount: 0,
  },
  {
    name: 'Decorative Trays & Urli',
    slug: 'decorative-trays-urli',
    description: 'Floating flower urlis, etched brass serving platters, and footed center bowls.',
    image: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=600&q=80',
    itemCount: 0,
  },
  {
    name: 'Gifting',
    slug: 'gifting',
    description: 'Curated brass festive gift boxes, shubh labh door hangings, and antique curios.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80',
    itemCount: 0,
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Utility essentials, traditional toys, handcrafted bags & purses, and lifestyle accents.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    itemCount: 0,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "wood-chakla-belan",
    "name": "Traditional Indian Handcrafted Wooden Chakla Belan Set",
    "slug": "traditional-indian-handcrafted-wooden-chakla-belan-set",
    "sku": "BC-WD-001",
    "category": "Wood Craft",
    "subCategory": "Utility & Storage",
    "collection": "Heritage Collection",
    "badge": "BESTSELLER",
    "price": 699,
    "originalPrice": 1199,
    "material": "Natural Seasoned Sheesham Wood (Indian Rosewood)",
    "shortDescription": "Classic wooden rolling board (Chakla) and rolling pin (Belan) turned by skilled Saharanpur wood artisans.",
    "description": "Elevate your culinary heritage with this authentic handcrafted Chakla Belan set. Masterfully turned from a single solid block of seasoned Sheesham wood, it features a smooth mirror-sanded finish, non-slip base stability, and ergonomic rolling balance designed for effortless rotis and parathas.",
    "highlights": [
      "Turned from seasoned single-piece Sheesham hardwood",
      "Heavy stable base preventing slips during rolling",
      "Ergonomic smooth-rolling Belan with tapered grips",
      "Food-safe 100% natural oil polish, zero chemical varnishes"
    ],
    "dimensions": {
      "length": 25,
      "width": 25,
      "height": 5,
      "unit": "cm"
    },
    "weightKg": 1.4,
    "colorFinish": "Rich Natural Walnut Grain",
    "stock": 28,
    "featured": true,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 34,
    "tags": [
      "chakla belan",
      "wooden roti maker",
      "sheesham wood",
      "kitchen utility",
      "handcrafted rolling pin",
      "wood craft"
    ],
    "images": [
      "/products/wooden-chakla-belan-set/6.1.jpg",
      "/products/wooden-chakla-belan-set/6.2.jpg",
      "/products/wooden-chakla-belan-set/6.3.jpg",
      "/products/wooden-chakla-belan-set/71idctzhppl.jpg"
    ],
    "discountPercent": 42,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-chakla-belan-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-chakla-belan-2"
      }
    ],
    "careInstructions": [
      "Wipe clean with a soft, dry cotton cloth after daily use",
      "Avoid prolonged soaking in water or washing in dishwashers",
      "Periodically condition with food-grade coconut or mineral oil to maintain luster",
      "Keep away from direct heat sources and extreme direct sunlight to prevent warping"
    ]
  },
  {
    "id": "wood-spatula-set",
    "name": "Handcrafted 7-Piece Premium Wooden Spatula and Cooking Spoon Set",
    "slug": "handcrafted-7-piece-premium-wooden-spatula-and-cooking-spoon-set",
    "sku": "BC-WD-002",
    "category": "Wood Craft",
    "subCategory": "Utility & Storage",
    "collection": "Best Sellers",
    "badge": "BESTSELLER",
    "price": 449,
    "originalPrice": 899,
    "material": "Eco-Friendly Solid Sheesham & Teak Wood",
    "shortDescription": "Complete 7-piece non-stick friendly wooden kitchen toolset including palta, kadchi, slotted spoon, and stirrers.",
    "description": "A culinary essential for wholesome traditional cooking. This 7-piece handcrafted wooden spatula and spoon set is carved from heat-resistant natural hardwood. Completely safe for non-stick cookware and cast iron pans, they will never scratch surfaces or leach harmful toxins into your hot food.",
    "highlights": [
      "Includes Palta Turner, Long-Handle Spoon, Kadchi, Slotted Spoon & Serving Spoons",
      "100% scratch-free protection for non-stick & enamel cookware",
      "Heat resistant with comfortable anti-burn handles",
      "Natural oil finish with integrated hanging hole loops"
    ],
    "dimensions": {
      "length": 32,
      "width": 8,
      "height": 4,
      "unit": "cm"
    },
    "weightKg": 0.65,
    "colorFinish": "Warm Honey Brown",
    "stock": 35,
    "featured": true,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 42,
    "tags": [
      "wooden spatula",
      "cooking spoons",
      "wooden palta",
      "non stick spoons",
      "sheesham spoon set",
      "wood craft"
    ],
    "images": [
      "/products/wooden-spatula-spoon-set/01-palta-turner.jpg",
      "/products/wooden-spatula-spoon-set/02-long-handle-frying-spoon.jpg",
      "/products/wooden-spatula-spoon-set/03-kadchi.jpg",
      "/products/wooden-spatula-spoon-set/04-rice-serving-spoon.jpg",
      "/products/wooden-spatula-spoon-set/05-slotted-spoon.jpg",
      "/products/wooden-spatula-spoon-set/06-spatula.jpg",
      "/products/wooden-spatula-spoon-set/07-strainer-spoon.jpg",
      "/products/wooden-spatula-spoon-set/all-set-with-details.jpg",
      "/products/wooden-spatula-spoon-set/all-set.jpg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-spatula-set-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-spatula-set-2"
      }
    ],
    "careInstructions": [
      "Wipe clean with a soft, dry cotton cloth after daily use",
      "Avoid prolonged soaking in water or washing in dishwashers",
      "Periodically condition with food-grade coconut or mineral oil to maintain luster",
      "Keep away from direct heat sources and extreme direct sunlight to prevent warping"
    ]
  },
  {
    "id": "wood-tea-coasters",
    "name": "Handcrafted 6-Piece Wooden Tea Coaster Set with Matching Holder",
    "slug": "handcrafted-6-piece-wooden-tea-coaster-set-with-a-matching-holder",
    "sku": "BC-WD-003",
    "category": "Wood Craft",
    "subCategory": "Trays & Boxes",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 319,
    "originalPrice": 599,
    "material": "Pure Sheesham Wood with Protective Sealant",
    "shortDescription": "Artisan hand-finished 6 wooden tea coasters neatly organized in an elegant matching open wooden box holder.",
    "description": "Protect your tabletops in artisanal elegance with this 6-piece wooden coaster set. Carved from distinctively grained Indian Sheesham wood, each coaster is sanded smooth and heat-treated to resist moisture stains from steaming chai cups and chilled glasses. Includes a tailored wooden stand for clutter-free tabletop presentation.",
    "highlights": [
      "Set of 6 square coasters plus dedicated organizer caddy",
      "Absorbs heat and shields dining tables from condensation rings",
      "Hand-rubbed smooth finish highlighting natural wood rings",
      "Compact footprint ideal for coffee tables, desks, and dining spaces"
    ],
    "dimensions": {
      "length": 11,
      "width": 11,
      "height": 6,
      "unit": "cm"
    },
    "weightKg": 0.45,
    "colorFinish": "Deep Sheesham Wood Grain",
    "stock": 40,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 29,
    "tags": [
      "tea coasters",
      "wooden coasters",
      "cup mat",
      "dining accessories",
      "table decor",
      "wood craft"
    ],
    "images": [
      "/products/wooden-tea-coaster-set/01.jpg",
      "/products/wooden-tea-coaster-set/02.jpg",
      "/products/wooden-tea-coaster-set/03.jpg",
      "/products/wooden-tea-coaster-set/04.jpg",
      "/products/wooden-tea-coaster-set/05.jpg"
    ],
    "discountPercent": 47,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-tea-coasters-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-tea-coasters-2"
      }
    ],
    "careInstructions": [
      "Wipe clean with a soft, dry cotton cloth after daily use",
      "Avoid prolonged soaking in water or washing in dishwashers",
      "Periodically condition with food-grade coconut or mineral oil to maintain luster",
      "Keep away from direct heat sources and extreme direct sunlight to prevent warping"
    ]
  },
  {
    "id": "wood-sheesham-bowls",
    "name": "Handcrafted Premium Sheesham Wood Serving Bowl Set (Set of 2)",
    "slug": "handcrafted-premium-sheesham-wood-serving-bowl-set-of-2",
    "sku": "BC-WD-004",
    "category": "Wood Craft",
    "subCategory": "Utility & Storage",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 249,
    "originalPrice": 499,
    "material": "Seasoned Indian Sheesham Wood",
    "shortDescription": "Pair of rustic hand-turned wooden serving bowls perfect for dry fruits, snacks, salads, and festive nibbles.",
    "description": "Present your dry fruits, freshly roasted snacks, and salads with authentic rustic charm. Hand-lathed from sustainably sourced solid Sheesham wood, each bowl showcases vibrant swirl grains and deep organic tones. Treated with food-safe plant oils for safe, lasting entertaining.",
    "highlights": [
      "Pack of 2 beautifully turned bowls with curved rims",
      "Food grade natural wax & oil protection",
      "Lightweight yet durable and drop-resistant",
      "Ideal for dry fruits, dips, mouth fresheners, and table centerpieces"
    ],
    "dimensions": {
      "length": 15,
      "width": 15,
      "height": 6,
      "unit": "cm"
    },
    "weightKg": 0.5,
    "colorFinish": "Glossy Honey Rosewood",
    "stock": 26,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.8,
    "reviewCount": 19,
    "tags": [
      "wooden bowls",
      "sheesham bowl",
      "serving bowls",
      "dry fruit bowl",
      "snack bowl",
      "wood craft"
    ],
    "images": [
      "/products/sheesham-wood-serving-bowl-set/7.1.jpg",
      "/products/sheesham-wood-serving-bowl-set/7.2.jpg",
      "/products/sheesham-wood-serving-bowl-set/7.3.jpg",
      "/products/sheesham-wood-serving-bowl-set/7.4.jpg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-sheesham-bowls-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-sheesham-bowls-2"
      }
    ],
    "careInstructions": [
      "Wipe clean with a soft, dry cotton cloth after daily use",
      "Avoid prolonged soaking in water or washing in dishwashers",
      "Periodically condition with food-grade coconut or mineral oil to maintain luster",
      "Keep away from direct heat sources and extreme direct sunlight to prevent warping"
    ]
  },
  {
    "id": "wood-viking-mug",
    "name": "Handcrafted Traditional Viking-Style Wooden Beer Mug",
    "slug": "handcrafted-traditional-viking-style-wooden-beer-mug",
    "sku": "BC-WD-005",
    "category": "Wood Craft",
    "subCategory": "Utility & Storage",
    "collection": "Heritage Collection",
    "badge": "LIMITED",
    "price": 429,
    "originalPrice": 799,
    "material": "Solid Hardwood with Carved Handle",
    "shortDescription": "Heirloom style medieval Viking wooden barrel tankard mug with heavy carved handle and rustic banded design.",
    "description": "Channel historic craftsmanship with this handcrafted Viking-style wooden barrel mug. Carved by master wood turners with ribbed barrel staves and an ergonomic solid grip handle. The insulated natural wooden wall keeps cold beverages chilled and hot beverages warm longer than glass.",
    "highlights": [
      "Medieval wooden tankard design with rustic barrel banding",
      "Sturdy ergonomic handle carved for a secure one-hand grip",
      "Natural wood insulation keeps brews cooler for longer",
      "Unique collector piece for home bars, themed gifts, and gatherings"
    ],
    "dimensions": {
      "length": 16,
      "width": 11,
      "height": 14,
      "unit": "cm"
    },
    "weightKg": 0.42,
    "colorFinish": "Antique Rustic Oak Finish",
    "stock": 18,
    "featured": true,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.9,
    "reviewCount": 23,
    "tags": [
      "wooden mug",
      "viking beer mug",
      "wooden tankard",
      "barware",
      "wooden cup",
      "wood craft"
    ],
    "images": [
      "/products/viking-style-wooden-beer-mug/01.jpg",
      "/products/viking-style-wooden-beer-mug/02.jpg",
      "/products/viking-style-wooden-beer-mug/03.jpg",
      "/products/viking-style-wooden-beer-mug/04.jpg",
      "/products/viking-style-wooden-beer-mug/05.jpg",
      "/products/viking-style-wooden-beer-mug/06.jpg",
      "/products/viking-style-wooden-beer-mug/07.jpg"
    ],
    "discountPercent": 46,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-viking-mug-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-viking-mug-2"
      }
    ],
    "careInstructions": [
      "Wipe clean with a soft, dry cotton cloth after daily use",
      "Avoid prolonged soaking in water or washing in dishwashers",
      "Periodically condition with food-grade coconut or mineral oil to maintain luster",
      "Keep away from direct heat sources and extreme direct sunlight to prevent warping"
    ]
  },
  {
    "id": "wood-buddha-statue",
    "name": "Handcrafted Traditional Wooden Buddha Head Statue",
    "slug": "handcrafted-traditional-wooden-buddha-head-statue",
    "sku": "BC-WD-006",
    "category": "Wood Craft",
    "subCategory": "Sculptures",
    "collection": "Heritage Collection",
    "badge": "HANDCRAFTED",
    "price": 499,
    "originalPrice": 999,
    "material": "Hand-Carved Seasoned Hardwood",
    "shortDescription": "Serene meditative Buddha head sculpture intricately hand-chiseled from single piece seasoned wood.",
    "description": "Infuse your living space with tranquility, balance, and mindful serenity. This contemplative Buddha head idol is delicately chiseled by hereditary Indian wood artisans, capturing gentle facial contours, coiled ushnisha curls, and a peaceful meditative expression. Perfect for altar, mantelpiece, or study desk.",
    "highlights": [
      "Single-piece hand-carved wood sculpture with fine chisel details",
      "Brings calming Zen harmony and positive Vastu energy to interiors",
      "Stable flat wooden pedestal base for secure placement",
      "Hand-waxed matte finish preserving natural grain texture"
    ],
    "dimensions": {
      "length": 10,
      "width": 9,
      "height": 20,
      "unit": "cm"
    },
    "weightKg": 0.6,
    "colorFinish": "Natural Matte Antique Brown",
    "stock": 22,
    "featured": true,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.9,
    "reviewCount": 31,
    "tags": [
      "wooden buddha",
      "buddha head statue",
      "wood carving",
      "sculpture",
      "meditation decor",
      "wood craft"
    ],
    "images": [
      "/products/wooden-buddha-head-statue/01.jpg",
      "/products/wooden-buddha-head-statue/02.jpg",
      "/products/wooden-buddha-head-statue/03.jpg",
      "/products/wooden-buddha-head-statue/04.jpg",
      "/products/wooden-buddha-head-statue/05.jpg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-buddha-statue-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-buddha-statue-2"
      }
    ],
    "careInstructions": [
      "Wipe clean with a soft, dry cotton cloth after daily use",
      "Avoid prolonged soaking in water or washing in dishwashers",
      "Periodically condition with food-grade coconut or mineral oil to maintain luster",
      "Keep away from direct heat sources and extreme direct sunlight to prevent warping"
    ]
  },
  {
    "id": "wood-incense-burner-box",
    "name": "Handcrafted Traditional Wooden Coffin Incense Burner Box",
    "slug": "handcrafted-traditional-wooden-coffin-incense-burner-box",
    "sku": "BC-WD-007",
    "category": "Wood Craft",
    "subCategory": "Wooden D\u00e9cor",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 299,
    "originalPrice": 599,
    "material": "Carved Sheesham Wood with Brass Inlay Accents",
    "shortDescription": "Ornate carved wooden incense holder box with bottom storage drawer for agarbatti sticks and brass inlay stars.",
    "description": "A sacred and aromatic addition to any pooja room, yoga sanctuary, or living room. This traditional coffin-style incense burner features delicate lattice fretwork (jali) that allows fragrant smoke ribbons to drift gracefully into the room while catching all ash safely inside. Includes a secret bottom sliding drawer to store unburnt incense sticks.",
    "highlights": [
      "Intricate jali latticework lid diffuses fragrant incense smoke safely",
      "Catches 100% of falling ash inside without tabletop mess",
      "Hidden bottom drawer holds extra agarbatti sticks and dhoop cones",
      "Dual side brass eyelets support two burning sticks simultaneously"
    ],
    "dimensions": {
      "length": 30,
      "width": 5.5,
      "height": 6,
      "unit": "cm"
    },
    "weightKg": 0.38,
    "colorFinish": "Warm Sheesham with Brass Motifs",
    "stock": 32,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 27,
    "tags": [
      "incense burner",
      "agarbatti stand",
      "wooden coffin box",
      "dhoop burner",
      "pooja decor",
      "wood craft"
    ],
    "images": [
      "/products/wooden-coffin-incense-burner-box/01.jpg",
      "/products/wooden-coffin-incense-burner-box/02.webp",
      "/products/wooden-coffin-incense-burner-box/03.jpg",
      "/products/wooden-coffin-incense-burner-box/04.jpg",
      "/products/wooden-coffin-incense-burner-box/05.jpg",
      "/products/wooden-coffin-incense-burner-box/06.jpg",
      "/products/wooden-coffin-incense-burner-box/07.jpg",
      "/products/wooden-coffin-incense-burner-box/08.webp",
      "/products/wooden-coffin-incense-burner-box/09.jpg",
      "/products/wooden-coffin-incense-burner-box/10.jpg",
      "/products/wooden-coffin-incense-burner-box/11.jpg",
      "/products/wooden-coffin-incense-burner-box/11.webp",
      "/products/wooden-coffin-incense-burner-box/12.webp",
      "/products/wooden-coffin-incense-burner-box/13.jpg",
      "/products/wooden-coffin-incense-burner-box/vaaree-assured-v6.png"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-incense-burner-box-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-incense-burner-box-2"
      }
    ],
    "careInstructions": [
      "Wipe clean with a soft, dry cotton cloth after daily use",
      "Avoid prolonged soaking in water or washing in dishwashers",
      "Periodically condition with food-grade coconut or mineral oil to maintain luster",
      "Keep away from direct heat sources and extreme direct sunlight to prevent warping"
    ]
  },
  {
    "id": "wood-hair-comb-set",
    "name": "Handcrafted Natural Wooden Hair Comb Set",
    "slug": "handcrafted-wooden-hair-comb",
    "sku": "BC-WD-008",
    "category": "Wood Craft",
    "subCategory": "Utility & Storage",
    "collection": "New Arrivals",
    "badge": "NEW",
    "price": 199,
    "originalPrice": 399,
    "material": "Pure Herbal Neem & Sheesham Wood",
    "shortDescription": "Wide-tooth and fine-tooth anti-static wooden combs for gentle detangling, scalp massage, and hair health.",
    "description": "Embrace ancient Ayurvedic hair wellness. Unlike plastic combs that generate static charge, cause micro-tears, and break hair cuticles, these smooth hand-buffed wooden teeth gently massage the scalp, stimulate blood micro-circulation, and distribute natural scalp oils evenly from roots to tips.",
    "highlights": [
      "100% anti-static wood eliminates frizz and hair flyaways",
      "Seamless rounded teeth prevent scalp scratches and split ends",
      "Naturally antibacterial Neem & seasoned Sheesham hardwood",
      "Compact and lightweight for everyday grooming and travel kits"
    ],
    "dimensions": {
      "length": 18,
      "width": 5,
      "height": 1,
      "unit": "cm"
    },
    "weightKg": 0.12,
    "colorFinish": "Raw Natural Polished Wood",
    "stock": 50,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.7,
    "reviewCount": 38,
    "tags": [
      "wooden comb",
      "neem comb",
      "hair care",
      "ayurvedic grooming",
      "wide tooth comb",
      "wood craft"
    ],
    "images": [
      "/products/wooden-hair-comb-set/5.1.png",
      "/products/wooden-hair-comb-set/5.2.png",
      "/products/wooden-hair-comb-set/5.3.jpg",
      "/products/wooden-hair-comb-set/5.5.jpg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-hair-comb-set-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-hair-comb-set-2"
      }
    ],
    "careInstructions": [
      "Wipe clean with a soft, dry cotton cloth after daily use",
      "Avoid prolonged soaking in water or washing in dishwashers",
      "Periodically condition with food-grade coconut or mineral oil to maintain luster",
      "Keep away from direct heat sources and extreme direct sunlight to prevent warping"
    ]
  },
  {
    "id": "wood-tic-tac-toe",
    "name": "Handcrafted Dual-Tone Wooden Tic-Tac-Toe Board Game",
    "slug": "handcrafted-dual-tone-wooden-tic-tac-toe-board-game",
    "sku": "BC-WD-009",
    "category": "Wood Craft",
    "subCategory": "Wooden D\u00e9cor",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 149,
    "originalPrice": 299,
    "material": "Solid Teak & Sheesham Hardwood Pieces",
    "shortDescription": "Classic 4-inch wooden coffee table X & O puzzle game with dual-tone brass and wood tokens.",
    "description": "A timeless parlor game that doubles as an eye-catching coffee table accent. Crafted by skilled toy artisans using solid natural wood, the grid holds 9 precision-carved game blocks. Perfect for quick family entertainment, screen-free playtime, and thoughtful desk gifts.",
    "highlights": [
      "Compact 4-inch square format ideal for coffee tables & office desks",
      "Dual-tone X and O blocks crafted with contrasting wood hues",
      "Screen-free tactile fun for children, adults, and party guests",
      "Smooth splinter-free hand sanding with child-safe natural wax"
    ],
    "dimensions": {
      "length": 10,
      "width": 10,
      "height": 3,
      "unit": "cm"
    },
    "weightKg": 0.22,
    "colorFinish": "Dual-Tone Honey Teak & Dark Rosewood",
    "stock": 45,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.6,
    "reviewCount": 18,
    "tags": [
      "tic tac toe",
      "wooden board game",
      "coffee table game",
      "x and o game",
      "wooden toy",
      "wood craft"
    ],
    "images": [
      "/products/wooden-tic-tac-toe/32.1.jpg",
      "/products/wooden-tic-tac-toe/4inch-xox-game.jpeg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-tic-tac-toe-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-tic-tac-toe-2"
      }
    ],
    "careInstructions": [
      "Wipe clean with a soft, dry cotton cloth after daily use",
      "Avoid prolonged soaking in water or washing in dishwashers",
      "Periodically condition with food-grade coconut or mineral oil to maintain luster",
      "Keep away from direct heat sources and extreme direct sunlight to prevent warping"
    ]
  },
  {
    "id": "wood-catapult",
    "name": "Traditional Wooden Catapult (Desi Gulel)",
    "slug": "traditional-wooden-catapult",
    "sku": "BC-WD-010",
    "category": "Wood Craft",
    "subCategory": "Wooden Art",
    "collection": "New Arrivals",
    "badge": "NEW",
    "price": 149,
    "originalPrice": 299,
    "material": "Natural Y-Fork Hardwood with Durable Elastic Bands",
    "shortDescription": "Nostalgic handmade Indian wooden slingshot (Gulel) carved from sturdy tree branch fork.",
    "description": "Relive nostalgic childhood memories with this authentic handmade Indian catapult (Gulel). Carved from sturdy naturally forked wood, sanded smooth for a comfortable grip, and fitted with high-tensile elastic rubber straps and a reinforced faux-leather pouch.",
    "highlights": [
      "Carved from natural fork branch for maximum structural strength",
      "High-elasticity durable latex bands with leather launch pouch",
      "Ergonomic hand-contoured grip for steady aiming practice",
      "Nostalgic traditional Indian toy and outdoor recreational handicraft"
    ],
    "dimensions": {
      "length": 18,
      "width": 9,
      "height": 3,
      "unit": "cm"
    },
    "weightKg": 0.15,
    "colorFinish": "Natural Smooth Sanded Timber",
    "stock": 35,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.7,
    "reviewCount": 15,
    "tags": [
      "wooden catapult",
      "gulel",
      "slingshot",
      "wooden toys",
      "nostalgic crafts",
      "wood craft"
    ],
    "images": [
      "/products/traditional-wooden-catapult/04.jpg",
      "/products/traditional-wooden-catapult/2.0.jpg",
      "/products/traditional-wooden-catapult/2.1.jpg",
      "/products/traditional-wooden-catapult/2.2.jpg",
      "/products/traditional-wooden-catapult/2.3.jpg",
      "/products/traditional-wooden-catapult/2.4.jpg",
      "/products/traditional-wooden-catapult/2.5.jpg",
      "/products/traditional-wooden-catapult/2.6.jpg",
      "/products/traditional-wooden-catapult/2.7.jpg",
      "/products/traditional-wooden-catapult/2.8.jpg",
      "/products/traditional-wooden-catapult/31qb4fnnjxl.jpg",
      "/products/traditional-wooden-catapult/41hoa8vll2l.jpg",
      "/products/traditional-wooden-catapult/41ngcoxkefl.jpg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-catapult-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-catapult-2"
      }
    ],
    "careInstructions": [
      "Wipe clean with a soft, dry cotton cloth after daily use",
      "Avoid prolonged soaking in water or washing in dishwashers",
      "Periodically condition with food-grade coconut or mineral oil to maintain luster",
      "Keep away from direct heat sources and extreme direct sunlight to prevent warping"
    ]
  },
  {
    "id": "wood-taj-mahal-watch",
    "name": "India Taj Mahal Vintage Pocket Watch",
    "slug": "india-taj-mahal-pocket-watch",
    "sku": "BC-WD-011",
    "category": "Wood Craft",
    "subCategory": "Wooden Art",
    "collection": "Heritage Collection",
    "badge": "BESTSELLER",
    "price": 349,
    "originalPrice": 699,
    "material": "Antique Bronzed Alloy with Embossed Relief",
    "shortDescription": "Collectible pocket watch featuring deep relief engraving of the iconic Taj Mahal monument with matching chain.",
    "description": "A tribute to world wonder architecture and royal vintage horology. This heirloom pocket watch showcases a magnificent 3D high-relief engraving of the Taj Mahal on its flip cover. Powered by a precision quartz movement with a vintage roman numeral dial and detachable vest chain.",
    "highlights": [
      "Intricate 3D relief casing of the Taj Mahal architecture",
      "Precision battery-operated quartz movement with crown push release",
      "Vintage cream dial with classic Roman numerals & filigree hands",
      "Comes with a 35cm matching antique curb link pocket chain"
    ],
    "dimensions": {
      "length": 4.8,
      "width": 4.8,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.08,
    "colorFinish": "Antique Burnished Bronze",
    "stock": 30,
    "featured": true,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 56,
    "tags": [
      "taj mahal watch",
      "pocket watch",
      "vintage watch",
      "antique pocket watch",
      "heritage curio",
      "wood craft"
    ],
    "images": [
      "/products/taj-mahal-pocket-watch/2.1.jpg",
      "/products/taj-mahal-pocket-watch/2.2.jpg",
      "/products/taj-mahal-pocket-watch/2.3.jpg",
      "/products/taj-mahal-pocket-watch/2.4.jpg",
      "/products/taj-mahal-pocket-watch/2.5.jpg",
      "/products/taj-mahal-pocket-watch/2.6.jpg",
      "/products/taj-mahal-pocket-watch/2.7.jpg",
      "/products/taj-mahal-pocket-watch/2.8.jpg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-taj-mahal-watch-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-taj-mahal-watch-2"
      }
    ],
    "careInstructions": [
      "Keep away from direct water immersion and high humidity environments",
      "Wipe clean with a soft microfiber jewelry cloth",
      "Uses standard LR66 / 377 button cell battery, easily replaceable at any watchmaker",
      "Store in a dry velvet pouch or jewelry box when not in use"
    ]
  },
  {
    "id": "wood-anchor-watch",
    "name": "Stylish Nautical Anchor Vintage Pocket Watch",
    "slug": "stylish-anchor-pocket-watch",
    "sku": "BC-WD-012",
    "category": "Wood Craft",
    "subCategory": "Wooden Art",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 349,
    "originalPrice": 699,
    "material": "Antique Brass Alloy with Maritime Relief",
    "shortDescription": "Maritime nautical themed pocket watch with embossed mariner anchor crest and rope filigree.",
    "description": "Inspired by vintage voyages and seafaring heritage. This handsome pocket watch features a raised maritime ship anchor emblem encircled by naval ropes. Press the top crown to snap open the front case and reveal a crisp vintage analog dial.",
    "highlights": [
      "High-relief mariner anchor emblem with maritime border",
      "Snap-open hunter case lid with spring-loaded crown latch",
      "Accurate quartz movement with easy battery replacement",
      "Includes matching antique necklace / waistcoat chain"
    ],
    "dimensions": {
      "length": 4.8,
      "width": 4.8,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.08,
    "colorFinish": "Nautical Antique Brass",
    "stock": 28,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.8,
    "reviewCount": 22,
    "tags": [
      "anchor watch",
      "pocket watch",
      "nautical pocket watch",
      "vintage curio",
      "maritime gift",
      "wood craft"
    ],
    "images": [
      "/products/stylish-anchor-pocket-watch/1.1.jpg",
      "/products/stylish-anchor-pocket-watch/1.3.jpg",
      "/products/stylish-anchor-pocket-watch/1.5.jpg",
      "/products/stylish-anchor-pocket-watch/1.6.jpg",
      "/products/stylish-anchor-pocket-watch/w1.jpg",
      "/products/stylish-anchor-pocket-watch/w4.jpg",
      "/products/stylish-anchor-pocket-watch/w5.jpg",
      "/products/stylish-anchor-pocket-watch/w6.jpg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-anchor-watch-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-anchor-watch-2"
      }
    ],
    "careInstructions": [
      "Keep away from direct water immersion and high humidity environments",
      "Wipe clean with a soft microfiber jewelry cloth",
      "Uses standard LR66 / 377 button cell battery, easily replaceable at any watchmaker",
      "Store in a dry velvet pouch or jewelry box when not in use"
    ]
  },
  {
    "id": "wood-ladakh-motorcycle-watch",
    "name": "Ladakh Motorcycle Adventurer Pocket Watch",
    "slug": "ladakh-motorcycle-pocket-watch",
    "sku": "BC-WD-013",
    "category": "Wood Craft",
    "subCategory": "Wooden Art",
    "collection": "New Arrivals",
    "badge": "NEW",
    "price": 349,
    "originalPrice": 699,
    "material": "Embossed Antique Bronze Metal",
    "shortDescription": "Commemorative expedition pocket watch depicting a vintage cruiser motorcycle against the Ladakh mountains.",
    "description": "Designed for wanderers and motorcycle enthusiasts. This unique pocket watch features an embossed cruiser motorcycle set against Himalayan mountain peaks. An ode to high-altitude passes, open highways, and adventurous spirit, complete with pocket vest chain.",
    "highlights": [
      "Detailed 3D motorcycle engraving inspired by Ladakh road trips",
      "Protective full hunter lid with top release push button",
      "High reliability quartz movement with crisp white dial",
      "A distinctive collectible gift for riders and travelers"
    ],
    "dimensions": {
      "length": 4.8,
      "width": 4.8,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.08,
    "colorFinish": "Rugged Antique Bronze",
    "stock": 32,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.8,
    "reviewCount": 26,
    "tags": [
      "motorcycle watch",
      "ladakh watch",
      "biker pocket watch",
      "adventurer gift",
      "vintage watch",
      "wood craft"
    ],
    "images": [
      "/products/ladakh-motorcycle-pocket-watch/3.1.jpg",
      "/products/ladakh-motorcycle-pocket-watch/3.2.jpg",
      "/products/ladakh-motorcycle-pocket-watch/w1.jpg",
      "/products/ladakh-motorcycle-pocket-watch/w2.jpg",
      "/products/ladakh-motorcycle-pocket-watch/w3.jpg",
      "/products/ladakh-motorcycle-pocket-watch/w4.jpg",
      "/products/ladakh-motorcycle-pocket-watch/w5.jpg",
      "/products/ladakh-motorcycle-pocket-watch/w6.jpg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-ladakh-motorcycle-watch-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-ladakh-motorcycle-watch-2"
      }
    ],
    "careInstructions": [
      "Keep away from direct water immersion and high humidity environments",
      "Wipe clean with a soft microfiber jewelry cloth",
      "Uses standard LR66 / 377 button cell battery, easily replaceable at any watchmaker",
      "Store in a dry velvet pouch or jewelry box when not in use"
    ]
  },
  {
    "id": "wood-vintage-ornate-watch",
    "name": "Vintage Ornate Victorian Filigree Pocket Watch",
    "slug": "vintage-ornate-pocket-watch",
    "sku": "BC-WD-014",
    "category": "Wood Craft",
    "subCategory": "Wooden Art",
    "collection": "Heritage Collection",
    "badge": "HANDCRAFTED",
    "price": 349,
    "originalPrice": 699,
    "material": "Antique Filigree Bronze Alloy",
    "shortDescription": "Classic Victorian floral filigree pocket watch with hollow-carved see-through case lid.",
    "description": "Exquisite Victorian floral arabesque openwork adorns this vintage pocket watch. The open filigree lid allows a subtle glimpse of the dial and hands even when closed. Finished in antiqued heirloom bronze with intricate scrollwork covering the rear casing.",
    "highlights": [
      "Open-worked Victorian floral filigree lid with see-through aperture",
      "Lavish arabesque relief engraving on both front and rear plates",
      "Smooth quartz caliber with sweeping second hand",
      "Comes with durable 35cm clip chain for jackets and vests"
    ],
    "dimensions": {
      "length": 4.8,
      "width": 4.8,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.08,
    "colorFinish": "Victorian Antique Bronze",
    "stock": 25,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 35,
    "tags": [
      "ornate pocket watch",
      "victorian watch",
      "filigree watch",
      "vintage pocket watch",
      "curio",
      "wood craft"
    ],
    "images": [
      "/products/vintage-ornate-pocket-watch/4.1.jpg",
      "/products/vintage-ornate-pocket-watch/4.2.jpg",
      "/products/vintage-ornate-pocket-watch/4.3.jpg",
      "/products/vintage-ornate-pocket-watch/4.4.jpg",
      "/products/vintage-ornate-pocket-watch/4.5.jpg",
      "/products/vintage-ornate-pocket-watch/4.6.jpg",
      "/products/vintage-ornate-pocket-watch/4.7.jpg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-vintage-ornate-watch-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-vintage-ornate-watch-2"
      }
    ],
    "careInstructions": [
      "Keep away from direct water immersion and high humidity environments",
      "Wipe clean with a soft microfiber jewelry cloth",
      "Uses standard LR66 / 377 button cell battery, easily replaceable at any watchmaker",
      "Store in a dry velvet pouch or jewelry box when not in use"
    ]
  },
  {
    "id": "wood-vintage-textured-watch",
    "name": "Vintage Textured Sunburst Heritage Pocket Watch",
    "slug": "vintage-textured-pocket-watch",
    "sku": "BC-WD-015",
    "category": "Wood Craft",
    "subCategory": "Wooden Art",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 349,
    "originalPrice": 699,
    "material": "Antiqued Alloy with Radial Guilloche Texture",
    "shortDescription": "Timeless textured guilloche-pattern pocket watch with central shield motif and antique patina.",
    "description": "Understated vintage elegance at its finest. This pocket watch features an intricate geometric guilloche sunburst texture across its outer shell, centered with a classic heraldic cartouche. The warm patinated bronze finish gives it the feel of a cherished family heirloom.",
    "highlights": [
      "Radial sunburst textured engraving with central heraldic shield",
      "Classic Roman numeral dial with filigree spade hands",
      "Push-button crown opens cover smoothly to 90 degrees",
      "Gift-ready timepiece with matching chain"
    ],
    "dimensions": {
      "length": 4.8,
      "width": 4.8,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.08,
    "colorFinish": "Antique Patinated Bronze",
    "stock": 24,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.8,
    "reviewCount": 21,
    "tags": [
      "textured pocket watch",
      "vintage watch",
      "heritage pocket watch",
      "guilloche watch",
      "wood craft"
    ],
    "images": [
      "/products/vintage-textured-pocket-watch/5.1.jpg",
      "/products/vintage-textured-pocket-watch/5.2.jpg",
      "/products/vintage-textured-pocket-watch/5.3.jpg",
      "/products/vintage-textured-pocket-watch/5.4.jpg",
      "/products/vintage-textured-pocket-watch/5.5.jpg",
      "/products/vintage-textured-pocket-watch/5.6.jpg",
      "/products/vintage-textured-pocket-watch/5.7.jpg"
    ],
    "discountPercent": 50,
    "inStock": true,
    "isCancellable": true,
    "isReturnable": true,
    "returnWindowDays": 7,
    "cancellationPolicy": "Cancellations accepted within 24 hours of order placement before shipment.",
    "returnPolicy": "7 days replacement or return if received damaged or defective.",
    "reviews": [
      {
        "userName": "Aarav Sharma",
        "userCity": "Jaipur",
        "rating": 5,
        "date": "2026-09-14",
        "title": "Stunning authentic craft",
        "comment": "Exceeded all expectations! The wood grain and polish are absolutely authentic and high quality.",
        "verifiedPurchase": true,
        "id": "rev-wood-vintage-textured-watch-1"
      },
      {
        "userName": "Pooja Mehta",
        "userCity": "Mumbai",
        "rating": 5,
        "date": "2026-09-18",
        "title": "Pure artisan perfection",
        "comment": "Beautifully packed and arrived in pristine condition. Feels so premium in hands.",
        "verifiedPurchase": true,
        "id": "rev-wood-vintage-textured-watch-2"
      }
    ],
    "careInstructions": [
      "Keep away from direct water immersion and high humidity environments",
      "Wipe clean with a soft microfiber jewelry cloth",
      "Uses standard LR66 / 377 button cell battery, easily replaceable at any watchmaker",
      "Store in a dry velvet pouch or jewelry box when not in use"
    ]
  }
];


export const INITIAL_COUPONS: Coupon[] = [
  {
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 999,
    description: "Get 10% OFF on your first handcrafted decor order above ₹999",
  },
  {
    code: "FESTIVE500",
    discountType: "flat",
    discountValue: 500,
    minOrderValue: 2999,
    description: "Flat ₹500 OFF on orders above ₹2,999",
  },
  {
    code: "HERITAGE15",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 4999,
    description: "Save 15% on premium brass & bronze collections above ₹4,999",
  },
];
