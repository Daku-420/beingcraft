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
    name: 'Home Decor',
    slug: 'home-decor',
    tagline: 'Objects that give your space a story',
    description: 'Hand-beaten tree of life wall art, ornate jharokha mirrors, and evocative artisanal centerpieces.',
    image: '/products/metal%20crafts/Radha%20Krishna%20under%20a%20Kalpavriksha%20Tree%20Statue/01.jpg',
    subcategories: ['Wall Décor', 'Table Décor', 'Sculptures', 'Decorative Objects'],
  },
  {
    name: 'Wood Crafts',
    slug: 'wood-crafts',
    tagline: 'Natural textures shaped by skilled hands',
    description: 'Aged Sheesham and reclaimed Teak meticulously hand-carved by hereditary Indian woodworkers.',
    image: '/products/wood%20crafts/handcrafted%20traditional%20wooden%20Buddha%20head%20statue/01.jpg',
    subcategories: ['Wooden Décor', 'Sculptures', 'Utility & Storage', 'Wooden Art', 'Trays & Boxes'],
  },
  {
    name: 'Brass & Metal',
    slug: 'brass-and-metal',
    tagline: 'Heritage metalwork with enduring character',
    description: 'Lost-wax cast virgin brass idols, ancient dhokra bell metal, and patinated antique accents.',
    image: '/products/metal%20crafts/Round%20Cutwork%20Brass%20Diya%20set%20of%203/01.jpg',
    subcategories: ['Brass Décor', 'Brass Idols', 'Antique Metal', 'Vintage Pieces', 'Pooja Essentials'],
  },
  {
    name: 'Dining & Kitchen',
    slug: 'dining-and-kitchen',
    tagline: 'Pure heirloom dining and ritual serving',
    description: 'Ayurvedic pure Kansa bronze thalis, hand-hammered pure copper vessels, and brass spice chests.',
    image: '/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.1.jpg',
    subcategories: ['Serving Pieces', 'Trays', 'Bowls', 'Kitchen Décor', 'Dining Accessories'],
  }
];

export const EDITORIAL_STORIES = [
  {
    title: 'THE BEAUTY OF WOOD',
    subtitle: 'Seasoned Grain & Generational Carving',
    description: 'From the heartlands of Saharanpur and Shekhawati, master wood turners shape seasoned Indian Sheesham and reclaimed Teak using heirloom chisels. Every grain variation tells of decades weathered under the Indian sun.',
    image: '/products/wood%20crafts/handcrafted%20traditional%20wooden%20Buddha%20head%20statue/01.jpg',
    link: '/shop?category=Wood%20Crafts',
    cta: 'Explore Wood Crafts'
  },
  {
    title: 'THE WARMTH OF BRASS & METAL',
    subtitle: 'Lost-Wax Sand Casting of Peetal Nagri',
    description: 'In the narrow guild alleys of Moradabad, molten virgin brass is poured into custom clay and sand molds. Each bell, diya, and idol undergoes hours of hand-filing, emery buffing, and natural patination to radiate warmth for lifetimes.',
    image: '/products/metal%20crafts/Round%20Cutwork%20Brass%20Diya%20set%20of%203/01.jpg',
    link: '/shop?category=Brass%20%26%20Metal',
    cta: 'Explore Brass & Metal'
  },
  {
    title: 'PURE HEIRLOOM DINING',
    subtitle: 'Ayurvedic Bronze & Serving Vessels',
    description: 'Experience mindful dining with hand-beaten bronze Kansa dinnerware, hammered copper carafes, and handcrafted natural wood serving platters shaped for generational family gatherings.',
    image: '/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.1.jpg',
    link: '/shop?category=Dining%20%26%20Kitchen',
    cta: 'Explore Dining & Kitchen'
  }
];

export const GIFTING_OCCASIONS = [
  {
    title: 'Housewarming (Griha Pravesh)',
    slug: 'housewarming',
    description: 'Auspicious Urlis, Ganesha idols, and brass door torans to bless new dwellings.',
    image: '/products/metal%20crafts/Radha%20Krishna%20under%20a%20Kalpavriksha%20Tree%20Statue/01.jpg'
  },
  {
    title: 'Wedding Celebrations',
    slug: 'wedding',
    description: 'Pure Kansa dining dinnerware sets and heirloom vintage decorative chests.',
    image: '/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.1.jpg'
  },
  {
    title: 'Festive & Diwali Gifting',
    slug: 'festive',
    description: 'Handcrafted peacock hanging diyas, akhand deepaks, and luxury gift hampers.',
    image: '/products/metal%20crafts/Round%20Cutwork%20Brass%20Diya%20set%20of%203/01.jpg'
  },
  {
    title: 'Corporate & Memento Gifting',
    slug: 'corporate',
    description: 'Handcrafted wooden organizers, brass pocket watch curios, and desk decor.',
    image: '/products/wood%20crafts/Coconut%20Shell%20Wristlet%20Wallet/01.jpg'
  },
  {
    title: 'Luxury Heritage Heirlooms',
    slug: 'luxury',
    description: 'Masterwork lost-wax bronze sculptures and limited artisan collectibles.',
    image: '/products/metal%20crafts/Antique%20Silver%20Peacock%20Panchmukhi%20Diya%20Stand/01.jpg'
  }
];

export const MATERIALS_LIST = [
  {
    name: 'Wood',
    label: 'Natural Wood',
    desc: 'Sheesham & Teak',
    image: '/products/wood%20crafts/Coconut%20Shell%20Wristlet%20Wallet/01.jpg'
  },
  {
    name: 'Brass',
    label: 'Solid Brass',
    desc: 'Virgin Cast Metal',
    image: '/products/metal%20crafts/Round%20Cutwork%20Brass%20Diya%20set%20of%203/01.jpg'
  },
  {
    name: 'Bronze',
    label: 'Pure Kansa / Bronze',
    desc: 'Ayurvedic Bell Metal',
    image: '/products/metal%20crafts/Antique%20Silver%20Peacock%20Panchmukhi%20Diya%20Stand/01.jpg'
  },
  {
    name: 'Metal',
    label: 'Antique Metal & Iron',
    desc: 'Lost-wax & Hand-beaten',
    image: '/products/metal%20crafts/Radha%20Krishna%20under%20a%20Kalpavriksha%20Tree%20Statue/01.jpg'
  }
];

export const CATEGORIES: { name: ProductCategory; slug: string; description: string; image: string; itemCount: number }[] = [
  {
    name: 'Home Decor',
    slug: 'home-decor',
    description: 'Objects that give your space a story. Tree of life wall art, tabletop accents and jharokhas.',
    image: '/products/metal%20crafts/Radha%20Krishna%20under%20a%20Kalpavriksha%20Tree%20Statue/01.jpg',
    itemCount: 13,
  },
  {
    name: 'Wood Crafts',
    slug: 'wood-crafts',
    description: 'Natural textures shaped by skilled hands. Sheesham & teak carved decor, trays, and boxes.',
    image: '/products/wood%20crafts/Coconut%20Shell%20Wristlet%20Wallet/01.jpg',
    itemCount: 12,
  },
  {
    name: 'Brass & Metal',
    slug: 'brass-and-metal',
    description: 'Heritage metalwork with enduring character. Solid brass idols, peacock urlis, and curios.',
    image: '/products/metal%20crafts/Round%20Cutwork%20Brass%20Diya%20set%20of%203/01.jpg',
    itemCount: 17,
  },
  {
    name: 'Dining & Kitchen',
    slug: 'dining-and-kitchen',
    description: 'Pure heirloom dining. Ayurvedic Kansa bronze dinnerware, hammered copper jugs, and spice boxes.',
    image: '/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.1.jpg',
    itemCount: 17,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "coconut-shell-wristlet-wallet",
    "name": "Coconut Shell Wristlet Wallet",
    "slug": "coconut-shell-wristlet-wallet",
    "sku": "BC-WD-100",
    "category": "Wood Crafts",
    "subCategory": "Artisanal Bags & Wearables",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 319,
    "originalPrice": 489,
    "discountPercent": 35,
    "description": "Handmade from genuine discarded coconut shells that are buffed to a silky luster, lined with soft fabric, and fitted with a zip and wristlet cord. A triumphant statement of eco-sustainable tribal fashion.",
    "shortDescription": "Handcrafted eco-friendly Coconut Shell wristlet purse with secure zipper.",
    "highlights": [
      "Crafted from 100% upcycled real coconut shell",
      "Smooth water-resistant polished exterior with unique organic contour",
      "Secure zipper closure with comfortable wrist carrying loop"
    ],
    "material": "Reclaimed Polished Natural Coconut Shell with Cotton Lining & Zipper",
    "dimensions": {
      "length": 13,
      "width": 13,
      "height": 9,
      "unit": "cm"
    },
    "weightKg": 0.19,
    "colorFinish": "Smooth Buffed Natural Coconut Shell Texture",
    "stock": 26,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 39,
    "tags": [
      "coconut shell wristlet wallet",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/Coconut%20Shell%20Wristlet%20Wallet/01.jpg",
      "/products/wood%20crafts/Coconut%20Shell%20Wristlet%20Wallet/02.jpg",
      "/products/wood%20crafts/Coconut%20Shell%20Wristlet%20Wallet/03.jpg",
      "/products/wood%20crafts/Coconut%20Shell%20Wristlet%20Wallet/04.jpg",
      "/products/wood%20crafts/Coconut%20Shell%20Wristlet%20Wallet/05.jpg",
      "/products/wood%20crafts/Coconut%20Shell%20Wristlet%20Wallet/06.jpg",
      "/products/wood%20crafts/Coconut%20Shell%20Wristlet%20Wallet/07.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-coconut-shell-wristlet-wallet-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-coconut-shell-wristlet-wallet-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "diabetes-control-glass-made-from-jamun-wood",
    "name": "Diabetes Control Glass Made From Jamun Wood",
    "slug": "diabetes-control-glass-made-from-jamun-wood",
    "sku": "BC-WD-101",
    "category": "Dining & Kitchen",
    "subCategory": "Ayurvedic Health Utensils",
    "collection": "Artisan Collection",
    "badge": "BESTSELLER",
    "price": 399,
    "originalPrice": 609,
    "discountPercent": 34,
    "description": "Based on traditional Ayurvedic remedies, filling this natural Jamun wood glass with water overnight allows herbal juices and bioactive compounds to infuse into the water, helping maintain natural blood sugar balance.",
    "shortDescription": "Authentic Ayurvedic Diabetes Control herbal glass carved from pure Jamun wood.",
    "highlights": [
      "Carved from 100% pure authentic medicinal Jamun wood",
      "Traditional Ayurvedic vessel used for overnight water infusion",
      "Completely natural, unpolished and chemical-free",
      "Eco-friendly holistic wellness drinking glass"
    ],
    "material": "100% Pure Natural Seasoned Jamun Wood (Syzygium cumini)",
    "dimensions": {
      "length": 8,
      "width": 8,
      "height": 14,
      "unit": "cm"
    },
    "weightKg": 0.28,
    "colorFinish": "Natural Untreated Herbal Wood Grain",
    "stock": 27,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.8,
    "reviewCount": 40,
    "tags": [
      "diabetes control glass made from jamun wood",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/12.1.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/12.2.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/12.3.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/12.4.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/12.5.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/61-iAPnQogL._SX679_.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/612TV1vF70L._SX679_.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/61aqWxVSlNL._SX679_.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/7149HwFE2fL._SX679_.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/71ccfSaQaHL._SX679_.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/71lO33IgH3L._SX679_.jpg",
      "/products/wood%20crafts/Diabetes%20Control%20Glass%20made%20from%20Jamun%20wood/71mCQlpk%2B%2BL._SL1500_.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-diabetes-control-glass-made-from-jamun-wood-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-diabetes-control-glass-made-from-jamun-wood-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "geometric-wooden-handle-stainless-steel-mug",
    "name": "Geometric Wooden Handle Stainless Steel Mug",
    "slug": "geometric-wooden-handle-stainless-steel-mug",
    "sku": "BC-WD-102",
    "category": "Dining & Kitchen",
    "subCategory": "Drinkware & Coffee Mugs",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 599,
    "originalPrice": 919,
    "discountPercent": 35,
    "description": "Blending industrial steel durability with handcrafted organic warmth, this modern coffee mug features double-wall insulation and a hand-shaped faceted wooden handle.",
    "shortDescription": "Modern insulated steel coffee mug with a faceted geometric wooden handle.",
    "highlights": [
      "Faceted geometric solid wood handle stays cool to the touch",
      "Double-wall food-grade steel keeps coffee piping hot",
      "Contemporary Scandinavian-Indian fusion aesthetic"
    ],
    "material": "Brushed Stainless Steel with Geometric Carved Wooden Grip",
    "dimensions": {
      "length": 13,
      "width": 9,
      "height": 11,
      "unit": "cm"
    },
    "weightKg": 0.32,
    "colorFinish": "Matte Steel & Rich Teak Handle",
    "stock": 28,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 41,
    "tags": [
      "geometric wooden handle stainless steel mug",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/Geometric%20Wooden%20Handle%20Stainless%20Steel%20Mug/10.1.jpg",
      "/products/wood%20crafts/Geometric%20Wooden%20Handle%20Stainless%20Steel%20Mug/10.10.jpg",
      "/products/wood%20crafts/Geometric%20Wooden%20Handle%20Stainless%20Steel%20Mug/10.2.jpg",
      "/products/wood%20crafts/Geometric%20Wooden%20Handle%20Stainless%20Steel%20Mug/10.3.jpg",
      "/products/wood%20crafts/Geometric%20Wooden%20Handle%20Stainless%20Steel%20Mug/10.4.jpg",
      "/products/wood%20crafts/Geometric%20Wooden%20Handle%20Stainless%20Steel%20Mug/10.5.jpg",
      "/products/wood%20crafts/Geometric%20Wooden%20Handle%20Stainless%20Steel%20Mug/10.6.jpg",
      "/products/wood%20crafts/Geometric%20Wooden%20Handle%20Stainless%20Steel%20Mug/10.7.jpg",
      "/products/wood%20crafts/Geometric%20Wooden%20Handle%20Stainless%20Steel%20Mug/10.8.jpg",
      "/products/wood%20crafts/Geometric%20Wooden%20Handle%20Stainless%20Steel%20Mug/10.9.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-geometric-wooden-handle-stainless-steel-mug-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-geometric-wooden-handle-stainless-steel-mug-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "good-morning-engraved-wooden-mug",
    "name": "Good Morning Engraved Wooden Mug",
    "slug": "good-morning-engraved-wooden-mug",
    "sku": "BC-WD-103",
    "category": "Dining & Kitchen",
    "subCategory": "Drinkware & Coffee Mugs",
    "collection": "Artisan Collection",
    "badge": "NEW",
    "price": 279,
    "originalPrice": 429,
    "discountPercent": 35,
    "description": "Start every day on an uplifting note. Handcrafted from fine wood and engraved with 'Good Morning', this mug pairs charming rustic style with daily drinking convenience.",
    "shortDescription": "Good Morning engraved artisan wooden coffee mug with stainless steel liner.",
    "highlights": [
      "Engraved artisan quote brings morning positivity",
      "Hygienic stainless steel liner for hot chai or coffee",
      "Thoughtful gift for family, friends, and colleagues"
    ],
    "material": "Artisan Hardwood with Food-Safe Steel Core",
    "dimensions": {
      "length": 14,
      "width": 10,
      "height": 12,
      "unit": "cm"
    },
    "weightKg": 0.38,
    "colorFinish": "Warm Caramel Wood Finish with Laser Engraving",
    "stock": 29,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 42,
    "tags": [
      "good morning engraved wooden mug",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/Good%20Morning%20Engraved%20Wooden%20Mug/15.1.jpg",
      "/products/wood%20crafts/Good%20Morning%20Engraved%20Wooden%20Mug/15.2.jpg",
      "/products/wood%20crafts/Good%20Morning%20Engraved%20Wooden%20Mug/15.3.jpg",
      "/products/wood%20crafts/Good%20Morning%20Engraved%20Wooden%20Mug/15.4.jpg",
      "/products/wood%20crafts/Good%20Morning%20Engraved%20Wooden%20Mug/15.5.png",
      "/products/wood%20crafts/Good%20Morning%20Engraved%20Wooden%20Mug/15.6.png",
      "/products/wood%20crafts/Good%20Morning%20Engraved%20Wooden%20Mug/15.7.png",
      "/products/wood%20crafts/Good%20Morning%20Engraved%20Wooden%20Mug/15.8.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-good-morning-engraved-wooden-mug-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-good-morning-engraved-wooden-mug-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-wooden-hair-comb-set",
    "name": "Handcrafted Wooden Hair Comb Set",
    "slug": "handcrafted-wooden-hair-comb-set",
    "sku": "BC-WD-104",
    "category": "Wood Crafts",
    "subCategory": "Personal Care & Hair Accessories",
    "collection": "Artisan Collection",
    "badge": "BESTSELLER",
    "price": 199,
    "originalPrice": 299,
    "discountPercent": 33,
    "description": "Unlike plastic combs that create static frizz and hair breakage, this hand-carved wooden comb glides effortlessly through hair, gently massaging the scalp and stimulating natural hair oils.",
    "shortDescription": "Handcrafted dual-tooth wooden hair comb set for anti-static natural hair care.",
    "highlights": [
      "100% natural herbal wood prevents static electricity and hair damage",
      "Seamless rounded teeth gently stimulate scalp acupressure points",
      "Natural wood fibers distribute conditioning scalp oils evenly"
    ],
    "material": "100% Pure Natural Seasoned Sheesham / Neem Wood",
    "dimensions": {
      "length": 19,
      "width": 5,
      "height": 1,
      "unit": "cm"
    },
    "weightKg": 0.08,
    "colorFinish": "Natural Unvarnished Wood with Smooth Buffed Teeth",
    "stock": 30,
    "inStock": true,
    "featured": true,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.6,
    "reviewCount": 43,
    "tags": [
      "handcrafted wooden hair comb set",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/Handcrafted%20Wooden%20Hair%20Comb%20Set/5.1.png",
      "/products/wood%20crafts/Handcrafted%20Wooden%20Hair%20Comb%20Set/5.2.png",
      "/products/wood%20crafts/Handcrafted%20Wooden%20Hair%20Comb%20Set/5.3.jpg",
      "/products/wood%20crafts/Handcrafted%20Wooden%20Hair%20Comb%20Set/5.5.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-wooden-hair-comb-set-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-wooden-hair-comb-set-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "lavaux-designs-acacia-wood-small-bowl-se",
    "name": "Lavaux Designs Acacia Wood Small Bowl Se",
    "slug": "lavaux-designs-acacia-wood-small-bowl-se",
    "sku": "BC-WD-105",
    "category": "Dining & Kitchen",
    "subCategory": "Serving Bowls",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 149,
    "originalPrice": 229,
    "discountPercent": 35,
    "description": "Crafted from durable eco-friendly Acacia hardwood, these small serving bowls add understated organic elegance to your dining spread. Perfect for sauces, olives, and condiments.",
    "shortDescription": "Lavaux Designs handcrafted small Acacia wood bowl set for dips, nuts, and snacks.",
    "highlights": [
      "Dense water-resistant Acacia wood construction",
      "Smooth rounded rims with tactile silky finish",
      "Versatile dipping, appetizer, and snack size"
    ],
    "material": "Sustainable Natural Acacia Wood",
    "dimensions": {
      "length": 14,
      "width": 14,
      "height": 6,
      "unit": "cm"
    },
    "weightKg": 0.35,
    "colorFinish": "Natural Honey Acacia Grains",
    "stock": 31,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 44,
    "tags": [
      "lavaux designs acacia wood small bowl se",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/LAVAUX%20DESIGNS%20Acacia%20wood%20small%20bowl%20se/8.1.jpg",
      "/products/wood%20crafts/LAVAUX%20DESIGNS%20Acacia%20wood%20small%20bowl%20se/8.2.jpg",
      "/products/wood%20crafts/LAVAUX%20DESIGNS%20Acacia%20wood%20small%20bowl%20se/8.3.jpg",
      "/products/wood%20crafts/LAVAUX%20DESIGNS%20Acacia%20wood%20small%20bowl%20se/8.4.jpg",
      "/products/wood%20crafts/LAVAUX%20DESIGNS%20Acacia%20wood%20small%20bowl%20se/8.5.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-lavaux-designs-acacia-wood-small-bowl-se-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-lavaux-designs-acacia-wood-small-bowl-se-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "traditional-wooden-catapult",
    "name": "Traditional Wooden Catapult",
    "slug": "traditional-wooden-catapult",
    "sku": "BC-WD-106",
    "category": "Wood Crafts",
    "subCategory": "Traditional Games & Folk Crafts",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 149,
    "originalPrice": 229,
    "discountPercent": 35,
    "description": "Revisit nostalgic childhood village memories with this handcrafted wooden catapult (Gulel). Carved from naturally branched hardwood forks with strong elastic latex bands and genuine leather pouch.",
    "shortDescription": "Traditional Indian handcrafted wooden catapult (Gulel) with natural ergonomic fork.",
    "highlights": [
      "Hand-carved from sturdy natural hardwood fork",
      "High-tensile rubber elastic bands with real leather ammo cup",
      "Classic folk craft toy and rustic nostalgic collector's item"
    ],
    "material": "Seasoned Hardwood Fork with Heavy-Duty Latex Bands & Leather Pouch",
    "dimensions": {
      "length": 19,
      "width": 9,
      "height": 3,
      "unit": "cm"
    },
    "weightKg": 0.18,
    "colorFinish": "Natural Wood Bark & Smooth Sanded Grip",
    "stock": 32,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 45,
    "tags": [
      "traditional wooden catapult",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/04.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/2.0.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/2.1.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/2.2.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/2.3.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/2.4.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/2.5.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/2.6.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/2.7.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/2.8.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/31qB4FnnjxL.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/41NGCoxKeFL.jpg",
      "/products/wood%20crafts/Traditional%20Wooden%20Catapult/41hOa8vLl2L.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-traditional-wooden-catapult-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-traditional-wooden-catapult-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "vintage-ornate-pocket-watch",
    "name": "Vintage Ornate Pocket Watch",
    "slug": "vintage-ornate-pocket-watch",
    "sku": "BC-WD-107",
    "category": "Wood Crafts",
    "subCategory": "Vintage Curios & Pocket Watches",
    "collection": "Heritage Collection",
    "badge": "BESTSELLER",
    "price": 349,
    "originalPrice": 539,
    "discountPercent": 35,
    "description": "Evoking Victorian railway elegance, this handcrafted pocket watch features deeply embossed casing, vintage Roman numeral dial, and a sturdy 32cm vest chain with clip.",
    "shortDescription": "Handcrafted vintage ornate pocket watch with matching chain & filigree fob.",
    "highlights": [
      "Precision Japanese quartz movement keeps accurate time",
      "Intricately embossed collector's casing with push-button release",
      "Includes heavy brass vest chain with belt clip",
      "Distinctive heritage heirloom gift for watch aficionados"
    ],
    "material": "Antique Brass & Bronze Alloy with Mechanical Quartz Movement",
    "dimensions": {
      "length": 5,
      "width": 5,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.12,
    "colorFinish": "Antiqued Bronze Patina with Engraved Relief",
    "stock": 33,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": true,
    "rating": 4.8,
    "reviewCount": 46,
    "tags": [
      "vintage ornate pocket watch",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/Vintage%20Ornate%20Pocket%20Watch/4.1.jpg",
      "/products/wood%20crafts/Vintage%20Ornate%20Pocket%20Watch/4.2.jpg",
      "/products/wood%20crafts/Vintage%20Ornate%20Pocket%20Watch/4.3.jpg",
      "/products/wood%20crafts/Vintage%20Ornate%20Pocket%20Watch/4.4.jpg",
      "/products/wood%20crafts/Vintage%20Ornate%20Pocket%20Watch/4.5.jpg",
      "/products/wood%20crafts/Vintage%20Ornate%20Pocket%20Watch/4.6.jpg",
      "/products/wood%20crafts/Vintage%20Ornate%20Pocket%20Watch/4.7.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-vintage-ornate-pocket-watch-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-vintage-ornate-pocket-watch-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "vintage-textured-pocket-watch",
    "name": "Vintage Textured Pocket Watch",
    "slug": "vintage-textured-pocket-watch",
    "sku": "BC-WD-108",
    "category": "Wood Crafts",
    "subCategory": "Vintage Curios & Pocket Watches",
    "collection": "Heritage Collection",
    "badge": "HANDCRAFTED",
    "price": 349,
    "originalPrice": 539,
    "discountPercent": 35,
    "description": "Evoking Victorian railway elegance, this handcrafted pocket watch features deeply embossed casing, vintage Roman numeral dial, and a sturdy 32cm vest chain with clip.",
    "shortDescription": "Handcrafted vintage ornate pocket watch with matching chain & filigree fob.",
    "highlights": [
      "Precision Japanese quartz movement keeps accurate time",
      "Intricately embossed collector's casing with push-button release",
      "Includes heavy brass vest chain with belt clip",
      "Distinctive heritage heirloom gift for watch aficionados"
    ],
    "material": "Antique Brass & Bronze Alloy with Mechanical Quartz Movement",
    "dimensions": {
      "length": 5,
      "width": 5,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.12,
    "colorFinish": "Antiqued Bronze Patina with Engraved Relief",
    "stock": 34,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 47,
    "tags": [
      "vintage textured pocket watch",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/Vintage%20Textured%20Pocket%20Watch/5.1.jpg",
      "/products/wood%20crafts/Vintage%20Textured%20Pocket%20Watch/5.2.jpg",
      "/products/wood%20crafts/Vintage%20Textured%20Pocket%20Watch/5.3.jpg",
      "/products/wood%20crafts/Vintage%20Textured%20Pocket%20Watch/5.4.jpg",
      "/products/wood%20crafts/Vintage%20Textured%20Pocket%20Watch/5.5.jpg",
      "/products/wood%20crafts/Vintage%20Textured%20Pocket%20Watch/5.6.jpg",
      "/products/wood%20crafts/Vintage%20Textured%20Pocket%20Watch/5.7.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-vintage-textured-pocket-watch-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-vintage-textured-pocket-watch-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-6-piece-wooden-tea-coaster-set-with-a-matching",
    "name": "Handcrafted 6-piece Wooden Tea Coaster Set with a Matching",
    "slug": "handcrafted-6-piece-wooden-tea-coaster-set-with-a-matching",
    "sku": "BC-WD-109",
    "category": "Dining & Kitchen",
    "subCategory": "Drink Coasters & Bar Accessories",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 319,
    "originalPrice": 489,
    "discountPercent": 35,
    "description": "Protect your dining and coffee tables in style with this 6-piece wooden coaster set. Each coaster is hand-buffed with heat-resistant polish and nests neatly inside a custom handcrafted stand.",
    "shortDescription": "Handcrafted 6-piece wooden tea coaster set housed in a matching artisan holder.",
    "highlights": [
      "Includes 6 round coasters and 1 compact holding stand",
      "Protects wooden and glass surfaces from heat rings and stains",
      "Subtle brass wire inlay detailing on coasters",
      "Compact footprint perfect for study and living room tables"
    ],
    "material": "Handcrafted Seasoned Sheesham Wood",
    "dimensions": {
      "length": 11,
      "width": 11,
      "height": 6,
      "unit": "cm"
    },
    "weightKg": 0.45,
    "colorFinish": "Rich Walnut Stain with Brass Inlays",
    "stock": 35,
    "inStock": true,
    "featured": true,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.6,
    "reviewCount": 48,
    "tags": [
      "handcrafted 6 piece wooden tea coaster set with a matching",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%206-piece%20wooden%20tea%20coaster%20set%20with%20a%20matching/01.jpg",
      "/products/wood%20crafts/handcrafted%206-piece%20wooden%20tea%20coaster%20set%20with%20a%20matching/02.jpg",
      "/products/wood%20crafts/handcrafted%206-piece%20wooden%20tea%20coaster%20set%20with%20a%20matching/03.jpg",
      "/products/wood%20crafts/handcrafted%206-piece%20wooden%20tea%20coaster%20set%20with%20a%20matching/04.jpg",
      "/products/wood%20crafts/handcrafted%206-piece%20wooden%20tea%20coaster%20set%20with%20a%20matching/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-6-piece-wooden-tea-coaster-set-with-a-matching-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-6-piece-wooden-tea-coaster-set-with-a-matching-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-7-piece-premium-wooden-spatula-and-cooking-spoon-set",
    "name": "Handcrafted 7-piece Premium Wooden Spatula and Cooking Spoon Set",
    "slug": "handcrafted-7-piece-premium-wooden-spatula-and-cooking-spoon-set",
    "sku": "BC-WD-110",
    "category": "Dining & Kitchen",
    "subCategory": "Culinary Spoons & Ladles",
    "collection": "Artisan Collection",
    "badge": "BESTSELLER",
    "price": 449,
    "originalPrice": 689,
    "discountPercent": 35,
    "description": "An indispensable 7-piece artisanal spoon set including turner (palta), deep frying spoon, soup kadchi, rice server, slotted spoon, and stirring spatulas. Gentle on non-stick cookware and heat-resistant.",
    "shortDescription": "Handmade 7-piece wooden ladle, palta, and frying spoon set for non-stick cooking.",
    "highlights": [
      "Complete 7-piece culinary utility set for frying, stirring & serving",
      "Gentle curved edges protect non-stick pans from scratching",
      "Naturally heat resistant handles never conduct burning heat",
      "Single-piece seamless wood construction prevents food trapped in joints"
    ],
    "material": "Premium Solid Sheesham Wood",
    "dimensions": {
      "length": 32,
      "width": 8,
      "height": 2,
      "unit": "cm"
    },
    "weightKg": 0.6,
    "colorFinish": "Natural Wood Tone with Food-Grade Oil",
    "stock": 36,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 49,
    "tags": [
      "handcrafted 7 piece premium wooden spatula and cooking spoon set",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%207-piece%20premium%20wooden%20spatula%20and%20cooking%20spoon%20set/01.%20Palta%20Turner.jpg",
      "/products/wood%20crafts/handcrafted%207-piece%20premium%20wooden%20spatula%20and%20cooking%20spoon%20set/02.%20Long%20Handle%20Frying%20Spoon.jpg",
      "/products/wood%20crafts/handcrafted%207-piece%20premium%20wooden%20spatula%20and%20cooking%20spoon%20set/03.%20Kadchi.jpg",
      "/products/wood%20crafts/handcrafted%207-piece%20premium%20wooden%20spatula%20and%20cooking%20spoon%20set/04.%20Rice%20Serving%20Spoon.jpg",
      "/products/wood%20crafts/handcrafted%207-piece%20premium%20wooden%20spatula%20and%20cooking%20spoon%20set/05.%20Slotted%20Spoon.jpg",
      "/products/wood%20crafts/handcrafted%207-piece%20premium%20wooden%20spatula%20and%20cooking%20spoon%20set/06.%20Spatula.jpg",
      "/products/wood%20crafts/handcrafted%207-piece%20premium%20wooden%20spatula%20and%20cooking%20spoon%20set/07.%20Strainer%20Spoon.jpg",
      "/products/wood%20crafts/handcrafted%207-piece%20premium%20wooden%20spatula%20and%20cooking%20spoon%20set/All%20Set%20With%20Details.jpg",
      "/products/wood%20crafts/handcrafted%207-piece%20premium%20wooden%20spatula%20and%20cooking%20spoon%20set/All%20Set.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-7-piece-premium-wooden-spatula-and-cooking-spoon-set-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-7-piece-premium-wooden-spatula-and-cooking-spoon-set-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-dual-tone-wooden-tic-tac-toe-board-game",
    "name": "Handcrafted Dual-tone Wooden Tic-tac-toe Board Game",
    "slug": "handcrafted-dual-tone-wooden-tic-tac-toe-board-game",
    "sku": "BC-WD-111",
    "category": "Wood Crafts",
    "subCategory": "Traditional Games & Puzzles",
    "collection": "Artisan Collection",
    "badge": "NEW",
    "price": 149,
    "originalPrice": 229,
    "discountPercent": 35,
    "description": "Ditch digital screens with this heirloom wooden Tic-Tac-Toe board game. Hand-turned brass-inlaid X and O game tokens fit neatly into individual square grid pockets for hours of tactical fun.",
    "shortDescription": "Handcrafted dual-tone wooden Tic-Tac-Toe (XOX) travel board game with brass inlay.",
    "highlights": [
      "Solid hardwood playing board with golden brass inlays",
      "Heavy sculpted wooden X and O tokens",
      "Tactile tabletop coffee table decor that guests love to pick up and play"
    ],
    "material": "Dual-Tone Solid Sheesham & Haldu Wood with Brass Inlay",
    "dimensions": {
      "length": 12,
      "width": 12,
      "height": 3.5,
      "unit": "cm"
    },
    "weightKg": 0.28,
    "colorFinish": "Rich Walnut and Natural Blonde Contrast with Brass Inlay",
    "stock": 37,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 50,
    "tags": [
      "handcrafted dual tone wooden tic tac toe board game",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20dual-tone%20wooden%20Tic-Tac-Toe%20board%20game/32.1.jpg",
      "/products/wood%20crafts/handcrafted%20dual-tone%20wooden%20Tic-Tac-Toe%20board%20game/4inch-xox-game.jpeg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-dual-tone-wooden-tic-tac-toe-board-game-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-dual-tone-wooden-tic-tac-toe-board-game-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-flat-wooden-cooking-spatula",
    "name": "Handcrafted Flat Wooden Cooking Spatula",
    "slug": "handcrafted-flat-wooden-cooking-spatula",
    "sku": "BC-WD-112",
    "category": "Dining & Kitchen",
    "subCategory": "Cooking Spoons",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 109,
    "originalPrice": 159,
    "discountPercent": 31,
    "description": "A single-piece solid wood flat spatula designed for effortless wok stirring, dosa tossing, and pan frying without harming non-stick coatings.",
    "shortDescription": "Handmade flat wooden cooking spatula for stirring, sautéing, and flipping.",
    "highlights": [
      "Ultra-smooth beveled edge for easy scraping and turning",
      "Lightweight ergonomic grip for daily kitchen tasks",
      "100% heat safe and biodegradable"
    ],
    "material": "Natural Seasoned Teak / Sheesham",
    "dimensions": {
      "length": 30,
      "width": 6,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.12,
    "colorFinish": "Natural Untreated Wood Glow",
    "stock": 38,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 51,
    "tags": [
      "handcrafted flat wooden cooking spatula",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20flat%20wooden%20cooking%20spatula/01.jpg",
      "/products/wood%20crafts/handcrafted%20flat%20wooden%20cooking%20spatula/02.jpg",
      "/products/wood%20crafts/handcrafted%20flat%20wooden%20cooking%20spatula/03.jpg",
      "/products/wood%20crafts/handcrafted%20flat%20wooden%20cooking%20spatula/04.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-flat-wooden-cooking-spatula-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-flat-wooden-cooking-spatula-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-premium-sheesham-wood-serving-bowl-set",
    "name": "Handcrafted Premium Sheesham Wood Serving Bowl Set",
    "slug": "handcrafted-premium-sheesham-wood-serving-bowl-set",
    "sku": "BC-WD-113",
    "category": "Dining & Kitchen",
    "subCategory": "Serving Bowls & Tableware",
    "collection": "Artisan Collection",
    "badge": "BESTSELLER",
    "price": 249,
    "originalPrice": 379,
    "discountPercent": 34,
    "description": "Sculpted from aged Sheesham timber, this 2-piece handcrafted bowl set celebrates nature's organic grain patterns. Ideal for serving artisan breads, salads, nuts, and festive delicacies.",
    "shortDescription": "Pair of artisanal Sheesham wood serving bowls for salads, gravies, and dry snacks.",
    "highlights": [
      "Set of 2 handcrafted wooden serving bowls",
      "Carved from dense, moisture-resistant Sheesham",
      "Food-safe natural beeswax coating",
      "Rich conversational centerpiece for heirloom dining"
    ],
    "material": "Pure Seasoned Sheesham Wood",
    "dimensions": {
      "length": 16,
      "width": 16,
      "height": 7,
      "unit": "cm"
    },
    "weightKg": 0.55,
    "colorFinish": "Deep Walnut Natural Grain",
    "stock": 39,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.9,
    "reviewCount": 52,
    "tags": [
      "handcrafted premium sheesham wood serving bowl set",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20premium%20Sheesham%20wood%20serving%20bowl%20set/7.1.jpg",
      "/products/wood%20crafts/handcrafted%20premium%20Sheesham%20wood%20serving%20bowl%20set/7.2.jpg",
      "/products/wood%20crafts/handcrafted%20premium%20Sheesham%20wood%20serving%20bowl%20set/7.3.jpg",
      "/products/wood%20crafts/handcrafted%20premium%20Sheesham%20wood%20serving%20bowl%20set/7.4.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-premium-sheesham-wood-serving-bowl-set-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-premium-sheesham-wood-serving-bowl-set-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-premium-wooden-cutwork-serving-tray",
    "name": "Handcrafted Premium Wooden Cutwork Serving Tray",
    "slug": "handcrafted-premium-wooden-cutwork-serving-tray",
    "sku": "BC-WD-114",
    "category": "Dining & Kitchen",
    "subCategory": "Serving Trays",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 199,
    "originalPrice": 299,
    "discountPercent": 33,
    "description": "A refined minimalist wooden serving tray designed for high tea, morning coffee, and cocktail service. Strong joinery and smooth handles make serving seamless.",
    "shortDescription": "Premium solid wooden serving tray with ergonomic carry cutouts.",
    "highlights": [
      "Sturdy solid wood base with spill-proof raised perimeter",
      "Integrated ergonomic cut-out handles for effortless carrying",
      "Durable wipe-clean finish resists moisture and tea drips"
    ],
    "material": "Aged Sheesham Timber",
    "dimensions": {
      "length": 35,
      "width": 24,
      "height": 4.5,
      "unit": "cm"
    },
    "weightKg": 0.75,
    "colorFinish": "Smooth Natural Grain Matte Polish",
    "stock": 40,
    "inStock": true,
    "featured": true,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.6,
    "reviewCount": 53,
    "tags": [
      "handcrafted premium wooden cutwork serving tray",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20premium%20wooden%20cutwork%20serving%20tray/01.jpg",
      "/products/wood%20crafts/handcrafted%20premium%20wooden%20cutwork%20serving%20tray/02.jpg",
      "/products/wood%20crafts/handcrafted%20premium%20wooden%20cutwork%20serving%20tray/03.jpg",
      "/products/wood%20crafts/handcrafted%20premium%20wooden%20cutwork%20serving%20tray/04.jpg",
      "/products/wood%20crafts/handcrafted%20premium%20wooden%20cutwork%20serving%20tray/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-premium-wooden-cutwork-serving-tray-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-premium-wooden-cutwork-serving-tray-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-premium-wooden-serving-tray",
    "name": "Handcrafted Premium Wooden Serving Tray",
    "slug": "handcrafted-premium-wooden-serving-tray",
    "sku": "BC-WD-115",
    "category": "Dining & Kitchen",
    "subCategory": "Serving Trays",
    "collection": "Artisan Collection",
    "badge": "NEW",
    "price": 149,
    "originalPrice": 229,
    "discountPercent": 35,
    "description": "A refined minimalist wooden serving tray designed for high tea, morning coffee, and cocktail service. Strong joinery and smooth handles make serving seamless.",
    "shortDescription": "Premium solid wooden serving tray with ergonomic carry cutouts.",
    "highlights": [
      "Sturdy solid wood base with spill-proof raised perimeter",
      "Integrated ergonomic cut-out handles for effortless carrying",
      "Durable wipe-clean finish resists moisture and tea drips"
    ],
    "material": "Aged Sheesham Timber",
    "dimensions": {
      "length": 35,
      "width": 24,
      "height": 4.5,
      "unit": "cm"
    },
    "weightKg": 0.75,
    "colorFinish": "Smooth Natural Grain Matte Polish",
    "stock": 41,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 54,
    "tags": [
      "handcrafted premium wooden serving tray",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20premium%20wooden%20serving%20tray/01.jpg",
      "/products/wood%20crafts/handcrafted%20premium%20wooden%20serving%20tray/02.jpg",
      "/products/wood%20crafts/handcrafted%20premium%20wooden%20serving%20tray/03.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-premium-wooden-serving-tray-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-premium-wooden-serving-tray-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-round-wooden-tree-bark-serving-platter",
    "name": "Handcrafted Round Wooden Tree Bark Serving Platter",
    "slug": "handcrafted-round-wooden-tree-bark-serving-platter",
    "sku": "BC-WD-116",
    "category": "Dining & Kitchen",
    "subCategory": "Platters & Trays",
    "collection": "Artisan Collection",
    "badge": "BESTSELLER",
    "price": 299,
    "originalPrice": 459,
    "discountPercent": 35,
    "description": "Showcasing raw natural bark edges and concentric annual tree rings, this rustic live-edge platter turns appetizers, cheeses, finger snacks, and desserts into culinary artistry.",
    "shortDescription": "Rustic circular live-edge wooden tree bark serving platter and cheese board.",
    "highlights": [
      "Authentic preserved live-edge raw wood bark border",
      "Smooth food-safe serving surface",
      "Elevates charcuterie boards, cheese courses, and canapés",
      "Each platter features unique natural grain and ring contours"
    ],
    "material": "Natural Raw Log Tree Bark with Solid Wood Core",
    "dimensions": {
      "length": 28,
      "width": 28,
      "height": 3.5,
      "unit": "cm"
    },
    "weightKg": 0.85,
    "colorFinish": "Rustic Raw Bark Edge with Sanded Core",
    "stock": 42,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 55,
    "tags": [
      "handcrafted round wooden tree bark serving platter",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.1.jpg",
      "/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.2.jpg",
      "/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.3.png",
      "/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.4.jpg",
      "/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.5.jpg",
      "/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.6.jpg",
      "/products/wood%20crafts/handcrafted%20round%20wooden%20tree%20bark%20serving%20platter/20.7.png"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-round-wooden-tree-bark-serving-platter-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-round-wooden-tree-bark-serving-platter-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-traditional-viking-style-wooden-beer-mug",
    "name": "Handcrafted Traditional Viking-style Wooden Beer Mug",
    "slug": "handcrafted-traditional-viking-style-wooden-beer-mug",
    "sku": "BC-WD-117",
    "category": "Dining & Kitchen",
    "subCategory": "Drinkware & Steins",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 429,
    "originalPrice": 659,
    "discountPercent": 35,
    "description": "Channel ancient feast halls with this rustic Viking-style beer stein. Hand-carved from seasoned wood with a hygienic food-grade stainless steel cup inside that keeps your brews frosty cold.",
    "shortDescription": "Handcrafted Viking-style wooden beer mug with insulated steel interior.",
    "highlights": [
      "Rust-proof stainless steel inner cup retains icy beverage temperature",
      "Solid wooden exterior carved in barrel aesthetic",
      "Ergonomic sturdy handle for confident grip",
      "Generous 500ml holding capacity"
    ],
    "material": "Seasoned Hardwood with Food-Grade Stainless Steel Inner Liner",
    "dimensions": {
      "length": 16,
      "width": 12,
      "height": 14,
      "unit": "cm"
    },
    "weightKg": 0.58,
    "colorFinish": "Rustic Barrel Stave Wood with Carved Handle",
    "stock": 43,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 56,
    "tags": [
      "handcrafted traditional viking style wooden beer mug",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20traditional%20Viking-style%20wooden%20beer%20mug/01.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20Viking-style%20wooden%20beer%20mug/02.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20Viking-style%20wooden%20beer%20mug/03.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20Viking-style%20wooden%20beer%20mug/04.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20Viking-style%20wooden%20beer%20mug/05.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20Viking-style%20wooden%20beer%20mug/06.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20Viking-style%20wooden%20beer%20mug/07.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-traditional-viking-style-wooden-beer-mug-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-traditional-viking-style-wooden-beer-mug-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-traditional-wooden-buddha-head-statue",
    "name": "Handcrafted Traditional Wooden Buddha Head Statue",
    "slug": "handcrafted-traditional-wooden-buddha-head-statue",
    "sku": "BC-WD-118",
    "category": "Home Decor",
    "subCategory": "Statues & Sculptures",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 499,
    "originalPrice": 769,
    "discountPercent": 35,
    "description": "Carved with sublime meditative expression, curly ushnisha topknot, and elongated earlobes, this solid wooden Buddha head sculpture radiates serenity, mindfulness, and zen balance.",
    "shortDescription": "Handcrafted traditional wooden Buddha head statue with meditative serene countenance.",
    "highlights": [
      "Chiseled from a single solid piece of seasoned timber",
      "Sublime serene expression promotes calm and focused energy",
      "Ideal for study desks, meditation spaces, and living room consoles"
    ],
    "material": "Hand-Carved Single Block Kadam / Sheesham Wood",
    "dimensions": {
      "length": 12,
      "width": 10,
      "height": 18,
      "unit": "cm"
    },
    "weightKg": 0.65,
    "colorFinish": "Antique Matte Wood Patina",
    "stock": 44,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 57,
    "tags": [
      "handcrafted traditional wooden buddha head statue",
      "home decor",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20Buddha%20head%20statue/01.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20Buddha%20head%20statue/02.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20Buddha%20head%20statue/03.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20Buddha%20head%20statue/04.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20Buddha%20head%20statue/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-traditional-wooden-buddha-head-statue-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-traditional-wooden-buddha-head-statue-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-traditional-wooden-coffin-incense-burner-box",
    "name": "Handcrafted Traditional Wooden Coffin Incense Burner Box",
    "slug": "handcrafted-traditional-wooden-coffin-incense-burner-box",
    "sku": "BC-WD-119",
    "category": "Home Decor",
    "subCategory": "Incense Burners & Aromatherapy",
    "collection": "Artisan Collection",
    "badge": "BESTSELLER",
    "price": 399,
    "originalPrice": 609,
    "discountPercent": 34,
    "description": "This famous coffin-style incense box catches all falling ash inside while aromatic smoke billows gracefully through ornate lattice lid carvings. Features a secret lower storage compartment for unburnt sticks.",
    "shortDescription": "Handcrafted traditional wooden coffin incense burner box with hidden storage compartment.",
    "highlights": [
      "Catches 100% of burning ash—no more messy table cleanups",
      "Integrated storage cavity at base holds up to 25 extra incense sticks",
      "Dual-purpose: holds both incense sticks (agarbatti) and dhoop cones",
      "Intricate brass star and moon inlays adorn the wooden exterior"
    ],
    "material": "Solid Sheesham Wood with Brass Inlay Stars",
    "dimensions": {
      "length": 31,
      "width": 6,
      "height": 7,
      "unit": "cm"
    },
    "weightKg": 0.42,
    "colorFinish": "Hand-Polished Antique Walnut Finish",
    "stock": 25,
    "inStock": true,
    "featured": true,
    "bestseller": true,
    "newArrival": true,
    "rating": 4.6,
    "reviewCount": 18,
    "tags": [
      "handcrafted traditional wooden coffin incense burner box",
      "home decor",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/01.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/02.webp",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/03.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/04.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/05.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/06.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/07.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/08.webp",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/09.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/10.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/11.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/11.webp",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/12.webp",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/13.jpg",
      "/products/wood%20crafts/handcrafted%20traditional%20wooden%20coffin%20incense%20burner%20box/Vaaree-Assured-v6.png"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-traditional-wooden-coffin-incense-burner-box-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-traditional-wooden-coffin-incense-burner-box-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-wooden-ashok-stambh",
    "name": "Handcrafted Wooden Ashok Stambh",
    "slug": "handcrafted-wooden-ashok-stambh",
    "sku": "BC-WD-120",
    "category": "Home Decor",
    "subCategory": "Heritage Showpieces & Sculptures",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 599,
    "originalPrice": 919,
    "discountPercent": 35,
    "description": "An authentic woodcraft tribute to the Lion Capital of Ashoka, the National Emblem of India. Master artisans hand-carve the four roaring lions, Ashoka Chakra, and circular abacus with meticulous precision.",
    "shortDescription": "Handcrafted wooden Ashoka Stambh (Lion Capital of Ashoka) desk showpiece.",
    "highlights": [
      "Intricately carved four Asiatic lions and Ashoka Chakra wheels",
      "Symbol of truth, courage, and constitutional sovereignty",
      "Prestigious desk showpiece for offices, libraries, and study rooms"
    ],
    "material": "Handcrafted Fine Grain Sheesham Wood",
    "dimensions": {
      "length": 10,
      "width": 10,
      "height": 24,
      "unit": "cm"
    },
    "weightKg": 0.72,
    "colorFinish": "Natural Walnut Lustre with Chiseled Relief",
    "stock": 26,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 19,
    "tags": [
      "handcrafted wooden ashok stambh",
      "home decor",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20wooden%20Ashok%20Stambh/19.1.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20Ashok%20Stambh/19.2.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20Ashok%20Stambh/19.3.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20Ashok%20Stambh/19.4.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20Ashok%20Stambh/19.5.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20Ashok%20Stambh/19.6.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20Ashok%20Stambh/19.7.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-wooden-ashok-stambh-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-wooden-ashok-stambh-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-wooden-cartoon-ladybug-yo-yo-spinner-toy",
    "name": "Handcrafted Wooden Cartoon Ladybug Yo-yo Spinner Toy",
    "slug": "handcrafted-wooden-cartoon-ladybug-yo-yo-spinner-toy",
    "sku": "BC-WD-121",
    "category": "Wood Crafts",
    "subCategory": "Traditional Toys & Folk Craft",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 109,
    "originalPrice": 159,
    "discountPercent": 31,
    "description": "A delightful wooden spinning yo-yo hand-painted in joyful ladybug colors. Perfectly weighted for smooth gravity-defying tricks and screen-free developmental play for kids of all ages.",
    "shortDescription": "Handcrafted wooden cartoon ladybug yo-yo spinner toy for kids.",
    "highlights": [
      "Smooth child-safe rounded wood edges with non-toxic colors",
      "Balanced center axle for responsive spinning and recoil",
      "Nostalgic folk craft toy encouraging hand-eye coordination"
    ],
    "material": "Natural Seasoned Wood with Non-Toxic Hand Paint",
    "dimensions": {
      "length": 6,
      "width": 6,
      "height": 3.5,
      "unit": "cm"
    },
    "weightKg": 0.09,
    "colorFinish": "Vibrant Red & Black Ladybug Hand-Painted Motif",
    "stock": 27,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 20,
    "tags": [
      "handcrafted wooden cartoon ladybug yo yo spinner toy",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20wooden%20cartoon%20ladybug%20yo-yo%20spinner%20toy/01.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20cartoon%20ladybug%20yo-yo%20spinner%20toy/02.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20cartoon%20ladybug%20yo-yo%20spinner%20toy/03.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20cartoon%20ladybug%20yo-yo%20spinner%20toy/04.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20cartoon%20ladybug%20yo-yo%20spinner%20toy/05.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20cartoon%20ladybug%20yo-yo%20spinner%20toy/06.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20cartoon%20ladybug%20yo-yo%20spinner%20toy/07.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-wooden-cartoon-ladybug-yo-yo-spinner-toy-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-wooden-cartoon-ladybug-yo-yo-spinner-toy-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-wooden-chapati-box",
    "name": "Handcrafted Wooden Chapati Box",
    "slug": "handcrafted-wooden-chapati-box",
    "sku": "BC-WD-122",
    "category": "Dining & Kitchen",
    "subCategory": "Roti Storage & Bread Baskets",
    "collection": "Artisan Collection",
    "badge": "BESTSELLER",
    "price": 599,
    "originalPrice": 919,
    "discountPercent": 35,
    "description": "Keep rotis fresh and warm with this heritage wooden chapati box. Crafted with intricate hand-carved floral motifs and a snug lid, it brings royal Indian dining elegance straight to your table.",
    "shortDescription": "Handcrafted round wooden chapati box (Roti Dabba) with carved lid.",
    "highlights": [
      "Insulating solid wood keeps rotis soft and warm naturally",
      "Hand-carved royal floral lid medallion",
      "Ample capacity for 15-20 full-sized rotis",
      "Heirloom Indian dining presentation piece"
    ],
    "material": "Hand-Carved Solid Sheesham Wood",
    "dimensions": {
      "length": 23,
      "width": 23,
      "height": 10,
      "unit": "cm"
    },
    "weightKg": 1.1,
    "colorFinish": "Antique Brass Inlay & Natural Walnut Polish",
    "stock": 28,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 21,
    "tags": [
      "handcrafted wooden chapati box",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20wooden%20chapati%20box/21.1.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20chapati%20box/21.2.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20chapati%20box/21.3.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20chapati%20box/21.4.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20chapati%20box/21.5.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20chapati%20box/homifi-wooden-chapto-handmade-chapati-box-roti-hot-case-chapati-box-casserole-serving-food-for-dinig-table-kitchen-tableware-product-images-orvpvrdbqaf-p605698743-0-202310220441.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-wooden-chapati-box-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-wooden-chapati-box-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-wooden-morning-walking-rule",
    "name": "Handcrafted Wooden Morning Walking Rule",
    "slug": "handcrafted-wooden-morning-walking-rule",
    "sku": "BC-WD-123",
    "category": "Wood Crafts",
    "subCategory": "Health & Acupressure Woodcraft",
    "collection": "Artisan Collection",
    "badge": "NEW",
    "price": 199,
    "originalPrice": 299,
    "discountPercent": 33,
    "description": "Designed for morning wellness walks and home reflexology, rolling this ridged hardwood ruler under your feet activates vital acupressure points, boosting blood circulation and relieving fatigue.",
    "shortDescription": "Handcrafted wooden morning walking ruler with therapeutic acupressure ridges.",
    "highlights": [
      "Concentric ribbed ridges stimulate foot reflexology and nerve endings",
      "Hand-turned from dense hardwood that withstands full body pressure",
      "Compact daily wellness companion for desk workers and elderly health"
    ],
    "material": "Seasoned Solid Hardwood with Acupressure Ridges",
    "dimensions": {
      "length": 30,
      "width": 4.5,
      "height": 4.5,
      "unit": "cm"
    },
    "weightKg": 0.26,
    "colorFinish": "Smooth Lathed Natural Wood Finish",
    "stock": 29,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 22,
    "tags": [
      "handcrafted wooden morning walking rule",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20wooden%20morning%20walking%20rule/23.1.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20morning%20walking%20rule/23.2.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20morning%20walking%20rule/23.3.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20morning%20walking%20rule/23.4.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-wooden-morning-walking-rule-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-wooden-morning-walking-rule-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-wooden-morning-walking-ruler",
    "name": "Handcrafted Wooden Morning Walking Ruler",
    "slug": "handcrafted-wooden-morning-walking-ruler",
    "sku": "BC-WD-124",
    "category": "Wood Crafts",
    "subCategory": "Health & Acupressure Woodcraft",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 199,
    "originalPrice": 299,
    "discountPercent": 33,
    "description": "Designed for morning wellness walks and home reflexology, rolling this ridged hardwood ruler under your feet activates vital acupressure points, boosting blood circulation and relieving fatigue.",
    "shortDescription": "Handcrafted wooden morning walking ruler with therapeutic acupressure ridges.",
    "highlights": [
      "Concentric ribbed ridges stimulate foot reflexology and nerve endings",
      "Hand-turned from dense hardwood that withstands full body pressure",
      "Compact daily wellness companion for desk workers and elderly health"
    ],
    "material": "Seasoned Solid Hardwood with Acupressure Ridges",
    "dimensions": {
      "length": 30,
      "width": 4.5,
      "height": 4.5,
      "unit": "cm"
    },
    "weightKg": 0.26,
    "colorFinish": "Smooth Lathed Natural Wood Finish",
    "stock": 30,
    "inStock": true,
    "featured": true,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.6,
    "reviewCount": 23,
    "tags": [
      "handcrafted wooden morning walking ruler",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20wooden%20morning%20walking%20ruler/22.1.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20morning%20walking%20ruler/22.2.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20morning%20walking%20ruler/22.3.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20morning%20walking%20ruler/22.4.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-wooden-morning-walking-ruler-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-wooden-morning-walking-ruler-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-wooden-mortar-and-pestle-set",
    "name": "Handcrafted Wooden Mortar and Pestle Set",
    "slug": "handcrafted-wooden-mortar-and-pestle-set",
    "sku": "BC-WD-125",
    "category": "Dining & Kitchen",
    "subCategory": "Spice Grinders & Mortars",
    "collection": "Artisan Collection",
    "badge": "BESTSELLER",
    "price": 399,
    "originalPrice": 609,
    "discountPercent": 34,
    "description": "Crush fresh ginger, garlic, cardamom, and whole peppercorns the authentic way with this heavy solid wood Okhli Musal set. The deep basin prevents spices from leaping out while pounding.",
    "shortDescription": "Handcrafted wooden mortar and pestle set (Okhli Musal) for fresh herbs & spices.",
    "highlights": [
      "Solid one-piece hardwood withstands daily crushing and pounding",
      "Deep bowl basin contains seeds, cloves, and whole spices",
      "Comfort-fit pestle handle maximizes crushing torque",
      "Preserves natural essential oils and aromas of fresh spices"
    ],
    "material": "Dense Seasoned Sheesham Hardwood",
    "dimensions": {
      "length": 12,
      "width": 12,
      "height": 11,
      "unit": "cm"
    },
    "weightKg": 0.65,
    "colorFinish": "Smooth Lathed Natural Walnut Polish",
    "stock": 31,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.7,
    "reviewCount": 24,
    "tags": [
      "handcrafted wooden mortar and pestle set",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20wooden%20mortar%20and%20pestle%20set/11.1.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20mortar%20and%20pestle%20set/11.2.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20mortar%20and%20pestle%20set/11.3.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-wooden-mortar-and-pestle-set-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-wooden-mortar-and-pestle-set-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-wooden-nesting-bowl-set-with-floral-inlay-work",
    "name": "Handcrafted Wooden Nesting Bowl Set with Floral Inlay Work",
    "slug": "handcrafted-wooden-nesting-bowl-set-with-floral-inlay-work",
    "sku": "BC-WD-126",
    "category": "Dining & Kitchen",
    "subCategory": "Serving Bowls",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 159,
    "originalPrice": 239,
    "discountPercent": 33,
    "description": "This exquisite set of nesting wooden bowls features smooth hand-turned wood with joyful floral enamel artwork inside. Ideal for serving dry fruits, chips, candies, and festival snacks.",
    "shortDescription": "Handcrafted nested wooden bowl set adorned with floral hand-inlay work.",
    "highlights": [
      "Space-saving nesting design for easy storage",
      "Vibrant food-safe decorative interior glaze",
      "Perfect for festive Diwali dry fruit and snack presentations"
    ],
    "material": "Solid Mango & Sheesham Wood with Floral Enamel Inlay",
    "dimensions": {
      "length": 18,
      "width": 18,
      "height": 8,
      "unit": "cm"
    },
    "weightKg": 0.65,
    "colorFinish": "Natural Wood Exterior with Artisanal Floral Interior",
    "stock": 32,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 25,
    "tags": [
      "handcrafted wooden nesting bowl set with floral inlay work",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20wooden%20nesting%20bowl%20set%20with%20floral%20inlay%20work/9.1.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20nesting%20bowl%20set%20with%20floral%20inlay%20work/9.2.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20nesting%20bowl%20set%20with%20floral%20inlay%20work/9.3.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-wooden-nesting-bowl-set-with-floral-inlay-work-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-wooden-nesting-bowl-set-with-floral-inlay-work-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "handcrafted-wooden-pyramid-incense-box-burner",
    "name": "Handcrafted Wooden Pyramid Incense Box Burner",
    "slug": "handcrafted-wooden-pyramid-incense-box-burner",
    "sku": "BC-WD-127",
    "category": "Home Decor",
    "subCategory": "Incense Burners & Aromatherapy",
    "collection": "Artisan Collection",
    "badge": "NEW",
    "price": 249,
    "originalPrice": 379,
    "discountPercent": 34,
    "description": "Shaped as a sacred pyramid with delicate fretwork on all four faces, this burner gently channels dhoop smoke upward in mystical aromatic plumes while shielding furniture from hot embers.",
    "shortDescription": "Handcrafted wooden pyramid dhoop & incense box burner with openwork fretwork.",
    "highlights": [
      "Architectural pyramid structure directs fragrance evenly across rooms",
      "Safe enclosed burning chamber protects children and pets from open flame",
      "Latticed fretwork creates captivating dancing shadows in dim lighting"
    ],
    "material": "Solid Sheesham Wood with Carved Jali Panels",
    "dimensions": {
      "length": 12,
      "width": 12,
      "height": 16,
      "unit": "cm"
    },
    "weightKg": 0.35,
    "colorFinish": "Warm Honey Amber Polish",
    "stock": 33,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 26,
    "tags": [
      "handcrafted wooden pyramid incense box burner",
      "home decor",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/handcrafted%20wooden%20pyramid%20incense%20box%20burner/14.2.jpg",
      "/products/wood%20crafts/handcrafted%20wooden%20pyramid%20incense%20box%20burner/14.3.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-handcrafted-wooden-pyramid-incense-box-burner-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-handcrafted-wooden-pyramid-incense-box-burner-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "india-taj-mahal-pocket-watch",
    "name": "India Taj Mahal Pocket Watch",
    "slug": "india-taj-mahal-pocket-watch",
    "sku": "BC-WD-128",
    "category": "Wood Crafts",
    "subCategory": "Vintage Curios & Pocket Watches",
    "collection": "Artisan Collection",
    "badge": "BESTSELLER",
    "price": 349,
    "originalPrice": 539,
    "discountPercent": 35,
    "description": "Evoking Victorian railway elegance, this handcrafted pocket watch features deeply embossed casing, vintage Roman numeral dial, and a sturdy 32cm vest chain with clip.",
    "shortDescription": "Handcrafted vintage ornate pocket watch with matching chain & filigree fob.",
    "highlights": [
      "Precision Japanese quartz movement keeps accurate time",
      "Intricately embossed collector's casing with push-button release",
      "Includes heavy brass vest chain with belt clip",
      "Distinctive heritage heirloom gift for watch aficionados"
    ],
    "material": "Antique Brass & Bronze Alloy with Mechanical Quartz Movement",
    "dimensions": {
      "length": 5,
      "width": 5,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.12,
    "colorFinish": "Antiqued Bronze Patina with Engraved Relief",
    "stock": 34,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 27,
    "tags": [
      "india taj mahal pocket watch",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/india%20taj%20mahal%20pocket%20watch/2.1.jpg",
      "/products/wood%20crafts/india%20taj%20mahal%20pocket%20watch/2.2.jpg",
      "/products/wood%20crafts/india%20taj%20mahal%20pocket%20watch/2.3.jpg",
      "/products/wood%20crafts/india%20taj%20mahal%20pocket%20watch/2.4.jpg",
      "/products/wood%20crafts/india%20taj%20mahal%20pocket%20watch/2.5.jpg",
      "/products/wood%20crafts/india%20taj%20mahal%20pocket%20watch/2.6.jpg",
      "/products/wood%20crafts/india%20taj%20mahal%20pocket%20watch/2.7.jpg",
      "/products/wood%20crafts/india%20taj%20mahal%20pocket%20watch/2.8.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-india-taj-mahal-pocket-watch-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-india-taj-mahal-pocket-watch-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "ladakh-motorcycle-pocket-watch",
    "name": "Ladakh Motorcycle Pocket Watch",
    "slug": "ladakh-motorcycle-pocket-watch",
    "sku": "BC-WD-129",
    "category": "Wood Crafts",
    "subCategory": "Vintage Curios & Pocket Watches",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 349,
    "originalPrice": 539,
    "discountPercent": 35,
    "description": "Evoking Victorian railway elegance, this handcrafted pocket watch features deeply embossed casing, vintage Roman numeral dial, and a sturdy 32cm vest chain with clip.",
    "shortDescription": "Handcrafted vintage ornate pocket watch with matching chain & filigree fob.",
    "highlights": [
      "Precision Japanese quartz movement keeps accurate time",
      "Intricately embossed collector's casing with push-button release",
      "Includes heavy brass vest chain with belt clip",
      "Distinctive heritage heirloom gift for watch aficionados"
    ],
    "material": "Antique Brass & Bronze Alloy with Mechanical Quartz Movement",
    "dimensions": {
      "length": 5,
      "width": 5,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.12,
    "colorFinish": "Antiqued Bronze Patina with Engraved Relief",
    "stock": 35,
    "inStock": true,
    "featured": true,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.6,
    "reviewCount": 28,
    "tags": [
      "ladakh motorcycle pocket watch",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/ladakh%20motorcycle%20pocket%20watch/3.1.jpg",
      "/products/wood%20crafts/ladakh%20motorcycle%20pocket%20watch/3.2.jpg",
      "/products/wood%20crafts/ladakh%20motorcycle%20pocket%20watch/W1.jpg",
      "/products/wood%20crafts/ladakh%20motorcycle%20pocket%20watch/W2.jpg",
      "/products/wood%20crafts/ladakh%20motorcycle%20pocket%20watch/W3.jpg",
      "/products/wood%20crafts/ladakh%20motorcycle%20pocket%20watch/W4.jpg",
      "/products/wood%20crafts/ladakh%20motorcycle%20pocket%20watch/W5.jpg",
      "/products/wood%20crafts/ladakh%20motorcycle%20pocket%20watch/W6.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-ladakh-motorcycle-pocket-watch-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-ladakh-motorcycle-pocket-watch-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "stylish-anchor-pocket-watch",
    "name": "Stylish Anchor Pocket Watch",
    "slug": "stylish-anchor-pocket-watch",
    "sku": "BC-WD-130",
    "category": "Wood Crafts",
    "subCategory": "Vintage Curios & Pocket Watches",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 349,
    "originalPrice": 539,
    "discountPercent": 35,
    "description": "Evoking Victorian railway elegance, this handcrafted pocket watch features deeply embossed casing, vintage Roman numeral dial, and a sturdy 32cm vest chain with clip.",
    "shortDescription": "Handcrafted vintage ornate pocket watch with matching chain & filigree fob.",
    "highlights": [
      "Precision Japanese quartz movement keeps accurate time",
      "Intricately embossed collector's casing with push-button release",
      "Includes heavy brass vest chain with belt clip",
      "Distinctive heritage heirloom gift for watch aficionados"
    ],
    "material": "Antique Brass & Bronze Alloy with Mechanical Quartz Movement",
    "dimensions": {
      "length": 5,
      "width": 5,
      "height": 1.5,
      "unit": "cm"
    },
    "weightKg": 0.12,
    "colorFinish": "Antiqued Bronze Patina with Engraved Relief",
    "stock": 36,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 29,
    "tags": [
      "stylish anchor pocket watch",
      "wood crafts",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/stylish%20anchor%20pocket%20watch/1.1.jpg",
      "/products/wood%20crafts/stylish%20anchor%20pocket%20watch/1.3.jpg",
      "/products/wood%20crafts/stylish%20anchor%20pocket%20watch/1.5.jpg",
      "/products/wood%20crafts/stylish%20anchor%20pocket%20watch/1.6.jpg",
      "/products/wood%20crafts/stylish%20anchor%20pocket%20watch/W1.jpg",
      "/products/wood%20crafts/stylish%20anchor%20pocket%20watch/W4.jpg",
      "/products/wood%20crafts/stylish%20anchor%20pocket%20watch/W5.jpg",
      "/products/wood%20crafts/stylish%20anchor%20pocket%20watch/W6.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-stylish-anchor-pocket-watch-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-stylish-anchor-pocket-watch-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "traditional-indian-handcrafted-wooden-chakla-belan-set",
    "name": "Traditional Indian Handcrafted Wooden Chakla Belan Set",
    "slug": "traditional-indian-handcrafted-wooden-chakla-belan-set",
    "sku": "BC-WD-131",
    "category": "Dining & Kitchen",
    "subCategory": "Cooking Essentials & Roti Utensils",
    "collection": "Artisan Collection",
    "badge": "BESTSELLER",
    "price": 699,
    "originalPrice": 1079,
    "discountPercent": 35,
    "description": "Crafted from seasoned solid Sheesham hardwood, this classic Chakla Belan set delivers flawless rolling balance for chapatis, puris, and parathas. Features a heavy, non-slip solid base and mirror-smooth ergonomic rolling pin finished with natural food-safe wood oils.",
    "shortDescription": "Traditional Indian handmade wooden Chakla (rolling board) & Belan (rolling pin) turned by generational artisans.",
    "highlights": [
      "Hand-turned from solid single-block seasoned Sheesham",
      "Weight-balanced base prevents slips during rolling",
      "Ergonomic tapered Belan handles for smooth rotational motion",
      "100% food-safe finish with zero chemical varnishes"
    ],
    "material": "Seasoned Solid Sheesham Wood (Indian Rosewood)",
    "dimensions": {
      "length": 25,
      "width": 25,
      "height": 5,
      "unit": "cm"
    },
    "weightKg": 1.4,
    "colorFinish": "Natural Rich Sheesham Grain with Hand-Wax Polish",
    "stock": 37,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": true,
    "rating": 4.8,
    "reviewCount": 30,
    "tags": [
      "traditional indian handcrafted wooden chakla belan set",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/traditional%20Indian%20handcrafted%20wooden%20Chakla%20Belan%20set/6.1.jpg",
      "/products/wood%20crafts/traditional%20Indian%20handcrafted%20wooden%20Chakla%20Belan%20set/6.2.jpg",
      "/products/wood%20crafts/traditional%20Indian%20handcrafted%20wooden%20Chakla%20Belan%20set/6.3.jpg",
      "/products/wood%20crafts/traditional%20Indian%20handcrafted%20wooden%20Chakla%20Belan%20set/71IdCTzhppL.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-traditional-indian-handcrafted-wooden-chakla-belan-set-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-traditional-indian-handcrafted-wooden-chakla-belan-set-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "traditional-indian-wooden-rolling-pin",
    "name": "Traditional Indian Wooden Rolling Pin",
    "slug": "traditional-indian-wooden-rolling-pin",
    "sku": "BC-WD-132",
    "category": "Dining & Kitchen",
    "subCategory": "Cooking Utensils",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 139,
    "originalPrice": 209,
    "discountPercent": 33,
    "description": "Individually lathed by woodcraft artisans, this traditional rolling pin offers exceptional ergonomic comfort and uniform pressure distribution for rolling perfect round rotis.",
    "shortDescription": "Handcrafted Indian wooden rolling pin (Belan) with balanced grip.",
    "highlights": [
      "Balanced center weight for uniform dough thickness",
      "Smooth sanded friction-free surface",
      "Made from non-porous naturally antibacterial hardwood",
      "Long-lasting kitchen essential"
    ],
    "material": "Hardwood Sheesham / Teak",
    "dimensions": {
      "length": 36,
      "width": 5,
      "height": 5,
      "unit": "cm"
    },
    "weightKg": 0.35,
    "colorFinish": "Warm Honey Wood Polish",
    "stock": 38,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 31,
    "tags": [
      "traditional indian wooden rolling pin",
      "dining & kitchen",
      "wood",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/wood%20crafts/traditional%20Indian%20wooden%20rolling%20pin/3.1.jpg",
      "/products/wood%20crafts/traditional%20Indian%20wooden%20rolling%20pin/3.2.jpg",
      "/products/wood%20crafts/traditional%20Indian%20wooden%20rolling%20pin/3.3.jpg",
      "/products/wood%20crafts/traditional%20Indian%20wooden%20rolling%20pin/3.4.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-traditional-indian-wooden-rolling-pin-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-traditional-indian-wooden-rolling-pin-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "antique-lord-krishna-flute-diya-stand",
    "name": "Antique Lord Krishna Flute Diya Stand",
    "slug": "antique-lord-krishna-flute-diya-stand",
    "sku": "BC-MT-133",
    "category": "Brass & Metal",
    "subCategory": "Idols & Stand Diyas",
    "collection": "Festive Collection",
    "badge": "HANDCRAFTED",
    "price": 599,
    "originalPrice": 919,
    "discountPercent": 35,
    "description": "A magnificent brass sculpture capturing Lord Krishna in tribhanga posture playing his divine flute, set upon an ornate lotus pedestal with an integrated pooja oil lamp.",
    "shortDescription": "Handcrafted antique Lord Krishna playing flute brass diya stand.",
    "highlights": [
      "Intricately detailed sculpture of Lord Krishna playing bansuri",
      "Integrated front deepak for daily ghee or oil lighting",
      "Timeless antique bronze-gold patina adds divine grace",
      "Heavy stable base prevents tipping"
    ],
    "material": "Solid Cast Brass with Antique Patina",
    "dimensions": {
      "length": 14,
      "width": 10,
      "height": 22,
      "unit": "cm"
    },
    "weightKg": 0.85,
    "colorFinish": "Antique Vintage Brass Finish",
    "stock": 39,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 32,
    "tags": [
      "antique lord krishna flute diya stand",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Antique%20Lord%20Krishna%20Flute%20Diya%20Stand/01.jpg",
      "/products/metal%20crafts/Antique%20Lord%20Krishna%20Flute%20Diya%20Stand/02.jpeg",
      "/products/metal%20crafts/Antique%20Lord%20Krishna%20Flute%20Diya%20Stand/03.jpeg",
      "/products/metal%20crafts/Antique%20Lord%20Krishna%20Flute%20Diya%20Stand/04.jpg",
      "/products/metal%20crafts/Antique%20Lord%20Krishna%20Flute%20Diya%20Stand/05.png"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-antique-lord-krishna-flute-diya-stand-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-antique-lord-krishna-flute-diya-stand-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "antique-silver-peacock-panchmukhi-diya-stand",
    "name": "Antique Silver Peacock Panchmukhi Diya Stand",
    "slug": "antique-silver-peacock-panchmukhi-diya-stand",
    "sku": "BC-MT-134",
    "category": "Brass & Metal",
    "subCategory": "Stand Diyas & Lamps",
    "collection": "Festive Collection",
    "badge": "BESTSELLER",
    "price": 299,
    "originalPrice": 459,
    "discountPercent": 35,
    "description": "Featuring a crowned Mayura (peacock) finial perched above a five-wick sacred oil reservoir, this oxidized silver diya stand illuminates five cardinal directions simultaneously.",
    "shortDescription": "Antique silver finish Panchmukhi (5-wick) peacock diya stand.",
    "highlights": [
      "Panchmukhi (5 wicks) design for complete directional pooja illumination",
      "Hand-carved royal peacock archway detailing",
      "Oxidized antique silver patina creates heritage temple appearance"
    ],
    "material": "White Metal Alloy with Antique Silver Oxidized Finish",
    "dimensions": {
      "length": 12,
      "width": 12,
      "height": 18,
      "unit": "cm"
    },
    "weightKg": 0.48,
    "colorFinish": "Oxidized Antique Silver Patina",
    "stock": 40,
    "inStock": true,
    "featured": true,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.6,
    "reviewCount": 33,
    "tags": [
      "antique silver peacock panchmukhi diya stand",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Antique%20Silver%20Peacock%20Panchmukhi%20Diya%20Stand/01.jpg",
      "/products/metal%20crafts/Antique%20Silver%20Peacock%20Panchmukhi%20Diya%20Stand/02.jpg",
      "/products/metal%20crafts/Antique%20Silver%20Peacock%20Panchmukhi%20Diya%20Stand/03.jpg",
      "/products/metal%20crafts/Antique%20Silver%20Peacock%20Panchmukhi%20Diya%20Stand/04.jpg",
      "/products/metal%20crafts/Antique%20Silver%20Peacock%20Panchmukhi%20Diya%20Stand/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-antique-silver-peacock-panchmukhi-diya-stand-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-antique-silver-peacock-panchmukhi-diya-stand-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "dancing-lord-ganesha-panchmukhi-diya-stand",
    "name": "Dancing Lord Ganesha Panchmukhi Diya Stand",
    "slug": "dancing-lord-ganesha-panchmukhi-diya-stand",
    "sku": "BC-MT-135",
    "category": "Brass & Metal",
    "subCategory": "Stand Diyas & Idols",
    "collection": "Festive Collection",
    "badge": "NEW",
    "price": 349,
    "originalPrice": 539,
    "discountPercent": 35,
    "description": "Lord Nritya Ganesha dances gracefully atop an auspicious 5-flame lotus lamp. Lighting the five wicks dispels obstacles, ignorance, and darkness while welcoming prosperity.",
    "shortDescription": "Dancing Lord Ganesha Panchmukhi 5-wick brass diya stand.",
    "highlights": [
      "Sculptural depiction of dancing Ganesha with modak and trishul",
      "Panchmukhi 5-wick oil dish for elaborate aarti ceremonies",
      "Stable round pedestal ensures secure altar placement"
    ],
    "material": "Pure Cast Brass with Antique Highlights",
    "dimensions": {
      "length": 13,
      "width": 11,
      "height": 19,
      "unit": "cm"
    },
    "weightKg": 0.55,
    "colorFinish": "Two-Tone Antique Brass & Copper Tint",
    "stock": 41,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 34,
    "tags": [
      "dancing lord ganesha panchmukhi diya stand",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Dancing%20Lord%20Ganesha%20Panchmukhi%20Diya%20Stand/01.jpg",
      "/products/metal%20crafts/Dancing%20Lord%20Ganesha%20Panchmukhi%20Diya%20Stand/02.jpg",
      "/products/metal%20crafts/Dancing%20Lord%20Ganesha%20Panchmukhi%20Diya%20Stand/03.jpg",
      "/products/metal%20crafts/Dancing%20Lord%20Ganesha%20Panchmukhi%20Diya%20Stand/04.jpg",
      "/products/metal%20crafts/Dancing%20Lord%20Ganesha%20Panchmukhi%20Diya%20Stand/05.jpg",
      "/products/metal%20crafts/Dancing%20Lord%20Ganesha%20Panchmukhi%20Diya%20Stand/06.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-dancing-lord-ganesha-panchmukhi-diya-stand-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-dancing-lord-ganesha-panchmukhi-diya-stand-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "hand-painted-brass-lotus-diya-set-of-3",
    "name": "Hand-painted Brass Lotus Diya Set of 3",
    "slug": "hand-painted-brass-lotus-diya-set-of-3",
    "sku": "BC-MT-136",
    "category": "Brass & Metal",
    "subCategory": "Decorative Diyas",
    "collection": "Heritage Collection",
    "badge": "HANDCRAFTED",
    "price": 349,
    "originalPrice": 539,
    "discountPercent": 35,
    "description": "Combining heavy cast brass with colorful Rajasthani Meenakari enamel painting, this set of 3 lotus lamps brings vivid jewel-toned splendor to Diwali and festive celebrations.",
    "shortDescription": "Set of 3 hand-painted Meenakari brass lotus diyas with vibrant floral artwork.",
    "highlights": [
      "Set of 3 hand-painted Meenakari lotus flower diyas",
      "Rich jewel tones resist heat and wax residue",
      "Auspicious pooja centerpiece and festive gifting favorite"
    ],
    "material": "Solid Brass with Enamel Meenakari Art",
    "dimensions": {
      "length": 8,
      "width": 8,
      "height": 4.5,
      "unit": "cm"
    },
    "weightKg": 0.36,
    "colorFinish": "Vibrant Multicolored Floral Meenakari on Brass",
    "stock": 42,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 35,
    "tags": [
      "hand painted brass lotus diya set of 3",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Hand-Painted%20Brass%20Lotus%20Diya%20%20set%20of%203/01.jpg",
      "/products/metal%20crafts/Hand-Painted%20Brass%20Lotus%20Diya%20%20set%20of%203/02.jpg",
      "/products/metal%20crafts/Hand-Painted%20Brass%20Lotus%20Diya%20%20set%20of%203/03.jpg",
      "/products/metal%20crafts/Hand-Painted%20Brass%20Lotus%20Diya%20%20set%20of%203/04.jpg",
      "/products/metal%20crafts/Hand-Painted%20Brass%20Lotus%20Diya%20%20set%20of%203/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-hand-painted-brass-lotus-diya-set-of-3-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-hand-painted-brass-lotus-diya-set-of-3-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "hand-painted-red-brass-lotus-diya-set-of-3",
    "name": "Hand-painted Red Brass Lotus Diya Set of 3",
    "slug": "hand-painted-red-brass-lotus-diya-set-of-3",
    "sku": "BC-MT-137",
    "category": "Brass & Metal",
    "subCategory": "Decorative Diyas",
    "collection": "Heritage Collection",
    "badge": "BESTSELLER",
    "price": 399,
    "originalPrice": 609,
    "discountPercent": 34,
    "description": "Finished in vibrant auspicious vermilion red enamel accented with golden brass petal borders, this set of 3 lotus diyas evokes prosperity, devotion, and festive warmth.",
    "shortDescription": "Set of 3 hand-painted red brass lotus diyas with auspicious gold accents.",
    "highlights": [
      "Set of 3 crimson red lotus oil lamps",
      "Deep sacred red hue honoring traditional Vedic pooja rituals",
      "Durable baked enamel finish retains vibrant color"
    ],
    "material": "Solid Brass with Crimson Red Enamel",
    "dimensions": {
      "length": 7.5,
      "width": 7.5,
      "height": 4,
      "unit": "cm"
    },
    "weightKg": 0.28,
    "colorFinish": "Royal Crimson Red & Gold Trim",
    "stock": 43,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.8,
    "reviewCount": 36,
    "tags": [
      "hand painted red brass lotus diya set of 3",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Hand-Painted%20Red%20Brass%20Lotus%20Diya%20%20set%20of%203/01.jpg",
      "/products/metal%20crafts/Hand-Painted%20Red%20Brass%20Lotus%20Diya%20%20set%20of%203/02.jpg",
      "/products/metal%20crafts/Hand-Painted%20Red%20Brass%20Lotus%20Diya%20%20set%20of%203/03.jpg",
      "/products/metal%20crafts/Hand-Painted%20Red%20Brass%20Lotus%20Diya%20%20set%20of%203/04.jpg",
      "/products/metal%20crafts/Hand-Painted%20Red%20Brass%20Lotus%20Diya%20%20set%20of%203/05.jpg",
      "/products/metal%20crafts/Hand-Painted%20Red%20Brass%20Lotus%20Diya%20%20set%20of%203/06.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-hand-painted-red-brass-lotus-diya-set-of-3-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-hand-painted-red-brass-lotus-diya-set-of-3-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "hexagonal-cutwork-brass-diya-set-of-3",
    "name": "Hexagonal Cutwork Brass Diya Set of 3",
    "slug": "hexagonal-cutwork-brass-diya-set-of-3",
    "sku": "BC-MT-138",
    "category": "Brass & Metal",
    "subCategory": "Pooja Diyas & Lamps",
    "collection": "Heritage Collection",
    "badge": "HANDCRAFTED",
    "price": 229,
    "originalPrice": 349,
    "discountPercent": 34,
    "description": "Six-sided sacred hexagonal geometry crafted from pure Moradabad brass. The perforated side panels disperse flame light in six radiant directions, symbolizing auspicious harmony.",
    "shortDescription": "Set of 3 hexagonal cutwork brass deepaks with delicate lattice apertures.",
    "highlights": [
      "Set of 3 hexagonal jali oil lamps",
      "Auspicious 6-pointed radiance pattern",
      "Easy to clean with pitambari or lemon juice"
    ],
    "material": "Pure Cast Brass",
    "dimensions": {
      "length": 7.5,
      "width": 7.5,
      "height": 4.5,
      "unit": "cm"
    },
    "weightKg": 0.28,
    "colorFinish": "Gleaming Antique Gold Polish",
    "stock": 44,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 37,
    "tags": [
      "hexagonal cutwork brass diya set of 3",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Hexagonal%20Cutwork%20Brass%20Diya%20%20set%20of%203/01.jpg",
      "/products/metal%20crafts/Hexagonal%20Cutwork%20Brass%20Diya%20%20set%20of%203/02.jpg",
      "/products/metal%20crafts/Hexagonal%20Cutwork%20Brass%20Diya%20%20set%20of%203/03.jpg",
      "/products/metal%20crafts/Hexagonal%20Cutwork%20Brass%20Diya%20%20set%20of%203/04.jpg",
      "/products/metal%20crafts/Hexagonal%20Cutwork%20Brass%20Diya%20%20set%20of%203/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-hexagonal-cutwork-brass-diya-set-of-3-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-hexagonal-cutwork-brass-diya-set-of-3-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "kamal-deepam-kamala-diya",
    "name": "Kamal Deepam Kamala Diya",
    "slug": "kamal-deepam-kamala-diya",
    "sku": "BC-MT-139",
    "category": "Brass & Metal",
    "subCategory": "Pooja Diyas & Lamps",
    "collection": "Festive Collection",
    "badge": "NEW",
    "price": 59,
    "originalPrice": 89,
    "discountPercent": 34,
    "description": "An authentic South Indian style single-piece brass lotus lamp (Kamal Deepam) featuring tiered petals opening outward to cradle the sacred flame.",
    "shortDescription": "Traditional Kamal Deepam / Kamala lotus blossom brass diya.",
    "highlights": [
      "Single lotus blossom cast brass lamp",
      "Compact footprint ideal for home mandir shelves and urlis",
      "Easy maintenance with standard brass polish"
    ],
    "material": "Solid Pure Brass",
    "dimensions": {
      "length": 7,
      "width": 7,
      "height": 3.5,
      "unit": "cm"
    },
    "weightKg": 0.12,
    "colorFinish": "Golden Brass Glow",
    "stock": 25,
    "inStock": true,
    "featured": true,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.6,
    "reviewCount": 38,
    "tags": [
      "kamal deepam kamala diya",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Kamal%20Deepam%20%20Kamala%20Diya/01.jpg",
      "/products/metal%20crafts/Kamal%20Deepam%20%20Kamala%20Diya/02.jpg",
      "/products/metal%20crafts/Kamal%20Deepam%20%20Kamala%20Diya/03.jpg",
      "/products/metal%20crafts/Kamal%20Deepam%20%20Kamala%20Diya/04.jpg",
      "/products/metal%20crafts/Kamal%20Deepam%20%20Kamala%20Diya/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-kamal-deepam-kamala-diya-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-kamal-deepam-kamala-diya-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "lotus-star-leaf-cutwork-brass-diya-set-of-3",
    "name": "Lotus Star Leaf Cutwork Brass Diya Set of 3",
    "slug": "lotus-star-leaf-cutwork-brass-diya-set-of-3",
    "sku": "BC-MT-140",
    "category": "Brass & Metal",
    "subCategory": "Pooja Diyas & Lamps",
    "collection": "Heritage Collection",
    "badge": "BESTSELLER",
    "price": 319,
    "originalPrice": 489,
    "discountPercent": 35,
    "description": "Shaped like blooming sacred lotus petals combined with starburst cutouts, this set of 3 brass deepaks infuses your prayer mandir with serene spiritual glow.",
    "shortDescription": "Set of 3 lotus star leaf cutwork brass diyas with petal-shaped silhouette.",
    "highlights": [
      "Set of 3 petal-contoured lotus star diyas",
      "Deep oil bowl accommodates long-burning cotton wicks",
      "Auspicious lotus design honoring Goddess Lakshmi"
    ],
    "material": "Solid Pure Cast Brass",
    "dimensions": {
      "length": 9,
      "width": 9,
      "height": 5.5,
      "unit": "cm"
    },
    "weightKg": 0.38,
    "colorFinish": "Radiant Golden Brass Glow",
    "stock": 26,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 39,
    "tags": [
      "lotus star leaf cutwork brass diya set of 3",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Lotus%20%20Star%20Leaf%20Cutwork%20Brass%20Diya%20%20set%20of%203/01.jpg",
      "/products/metal%20crafts/Lotus%20%20Star%20Leaf%20Cutwork%20Brass%20Diya%20%20set%20of%203/02.jpg",
      "/products/metal%20crafts/Lotus%20%20Star%20Leaf%20Cutwork%20Brass%20Diya%20%20set%20of%203/03.jpg",
      "/products/metal%20crafts/Lotus%20%20Star%20Leaf%20Cutwork%20Brass%20Diya%20%20set%20of%203/04.jpg",
      "/products/metal%20crafts/Lotus%20%20Star%20Leaf%20Cutwork%20Brass%20Diya%20%20set%20of%203/05.jpg",
      "/products/metal%20crafts/Lotus%20%20Star%20Leaf%20Cutwork%20Brass%20Diya%20%20set%20of%203/06.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-lotus-star-leaf-cutwork-brass-diya-set-of-3-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-lotus-star-leaf-cutwork-brass-diya-set-of-3-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "lotus-base-brass-kapoor-dani",
    "name": "Lotus Base Brass Kapoor Dani",
    "slug": "lotus-base-brass-kapoor-dani",
    "sku": "BC-MT-141",
    "category": "Brass & Metal",
    "subCategory": "Ritual Burners & Pooja Essentials",
    "collection": "Heritage Collection",
    "badge": "HANDCRAFTED",
    "price": 59,
    "originalPrice": 89,
    "discountPercent": 34,
    "description": "Perform soothing camphor aarti with this lotus-pedestal brass Kapoor Dani. Designed with a sturdy base to diffuse fragrant camphor and dhoop smoke through living spaces.",
    "shortDescription": "Handcrafted lotus base brass Kapoor Dani (camphor burner / dhoop aarti).",
    "highlights": [
      "Auspicious lotus base safely contains burning camphor",
      "Purifies indoor atmosphere and drives away negative energy",
      "Durable virgin brass construction withstands direct flame heat"
    ],
    "material": "Solid Pure Brass",
    "dimensions": {
      "length": 11,
      "width": 8,
      "height": 6,
      "unit": "cm"
    },
    "weightKg": 0.18,
    "colorFinish": "Golden Polish with Heat-Resistant Handle",
    "stock": 27,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 40,
    "tags": [
      "lotus base brass kapoor dani",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Lotus%20Base%20Brass%20Kapoor%20Dani/01.jpg",
      "/products/metal%20crafts/Lotus%20Base%20Brass%20Kapoor%20Dani/02.jpg",
      "/products/metal%20crafts/Lotus%20Base%20Brass%20Kapoor%20Dani/03.jpg",
      "/products/metal%20crafts/Lotus%20Base%20Brass%20Kapoor%20Dani/04.jpg",
      "/products/metal%20crafts/Lotus%20Base%20Brass%20Kapoor%20Dani/06.jpg",
      "/products/metal%20crafts/Lotus%20Base%20Brass%20Kapoor%20Dani/07.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-lotus-base-brass-kapoor-dani-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-lotus-base-brass-kapoor-dani-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "metal-lord-krishna-playing-flute-under-a-kalpavriksha-tree-statue",
    "name": "Metal Lord Krishna Playing Flute Under a Kalpavriksha Tree Statue",
    "slug": "metal-lord-krishna-playing-flute-under-a-kalpavriksha-tree-statue",
    "sku": "BC-MT-142",
    "category": "Home Decor",
    "subCategory": "Idols & Spiritual Figurines",
    "collection": "Festive Collection",
    "badge": "HANDCRAFTED",
    "price": 299,
    "originalPrice": 459,
    "discountPercent": 35,
    "description": "Lord Murli Manohar Krishna plays his enchanting bansuri beneath the holy Kalpavriksha tree while peacocks listen atop the branches. A masterpiece of traditional metal figurine art.",
    "shortDescription": "Metal Lord Krishna playing flute beneath the sacred Kalpavriksha tree statue.",
    "highlights": [
      "Fine lost-wax cast detailing on Krishna's peacock feather crown (Mor Mukut)",
      "Detailed floral tree branches sheltering the divine flutist",
      "Perfect centerpiece for living room console, mantle, or home temple"
    ],
    "material": "Fine Cast Metal with Antique Brass Coating",
    "dimensions": {
      "length": 16,
      "width": 9,
      "height": 20,
      "unit": "cm"
    },
    "weightKg": 0.68,
    "colorFinish": "Antique Brass Glow with Black Shadow Shading",
    "stock": 28,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 41,
    "tags": [
      "metal lord krishna playing flute under a kalpavriksha tree statue",
      "home decor",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Metal%20Lord%20Krishna%20Playing%20Flute%20under%20a%20Kalpavriksha%20Tree%20statue/01.jpg",
      "/products/metal%20crafts/Metal%20Lord%20Krishna%20Playing%20Flute%20under%20a%20Kalpavriksha%20Tree%20statue/02.jpg",
      "/products/metal%20crafts/Metal%20Lord%20Krishna%20Playing%20Flute%20under%20a%20Kalpavriksha%20Tree%20statue/03.jpg",
      "/products/metal%20crafts/Metal%20Lord%20Krishna%20Playing%20Flute%20under%20a%20Kalpavriksha%20Tree%20statue/04.jpg",
      "/products/metal%20crafts/Metal%20Lord%20Krishna%20Playing%20Flute%20under%20a%20Kalpavriksha%20Tree%20statue/05.jpg",
      "/products/metal%20crafts/Metal%20Lord%20Krishna%20Playing%20Flute%20under%20a%20Kalpavriksha%20Tree%20statue/06.jpeg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-metal-lord-krishna-playing-flute-under-a-kalpavriksha-tree-statue-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-metal-lord-krishna-playing-flute-under-a-kalpavriksha-tree-statue-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "modern-handcrafted-ganesha-on-rocking-chair-idol",
    "name": "Modern Handcrafted Ganesha on Rocking Chair Idol",
    "slug": "modern-handcrafted-ganesha-on-rocking-chair-idol",
    "sku": "BC-MT-143",
    "category": "Home Decor",
    "subCategory": "Idols & Statues",
    "collection": "Festive Collection",
    "badge": "BESTSELLER",
    "price": 399,
    "originalPrice": 609,
    "discountPercent": 34,
    "description": "A delightful contemporary interpretation of Lord Ganesha in a relaxed posture seated comfortably upon a detailed rocking chair, reading a sacred scripture while blessing the household.",
    "shortDescription": "Modern handcrafted Lord Ganesha relaxing on rocking chair metal idol.",
    "highlights": [
      "Whimsical contemporary design blending heritage devotion with modern flair",
      "Functional gentle rocking motion adds interactive charm",
      "Captivating conversation starter for living room coffee tables"
    ],
    "material": "Fine Cast Metal Alloy",
    "dimensions": {
      "length": 14,
      "width": 9,
      "height": 16,
      "unit": "cm"
    },
    "weightKg": 0.58,
    "colorFinish": "Antique Gold and Copper Finish",
    "stock": 29,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": true,
    "rating": 4.9,
    "reviewCount": 42,
    "tags": [
      "modern handcrafted ganesha on rocking chair idol",
      "home decor",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Modern%20Handcrafted%20Ganesha%20on%20Rocking%20Chair%20Idol/01.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Ganesha%20on%20Rocking%20Chair%20Idol/02.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Ganesha%20on%20Rocking%20Chair%20Idol/03.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Ganesha%20on%20Rocking%20Chair%20Idol/04.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Ganesha%20on%20Rocking%20Chair%20Idol/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-modern-handcrafted-ganesha-on-rocking-chair-idol-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-modern-handcrafted-ganesha-on-rocking-chair-idol-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "modern-handcrafted-pagdi-ganesha-metal-idol",
    "name": "Modern Handcrafted Pagdi Ganesha Metal Idol",
    "slug": "modern-handcrafted-pagdi-ganesha-metal-idol",
    "sku": "BC-MT-144",
    "category": "Home Decor",
    "subCategory": "Idols & Statues",
    "collection": "Festive Collection",
    "badge": "HANDCRAFTED",
    "price": 199,
    "originalPrice": 299,
    "discountPercent": 33,
    "description": "Lord Ganesha adorned in a majestic traditional Indian turban (Pagdi) with his right hand raised in the Abhaya Mudra blessing. An auspicious guardian idol for entryways and desks.",
    "shortDescription": "Modern handcrafted Pagdi Ganesha metal idol adorned with royal turban.",
    "highlights": [
      "Royal traditional Pagdi (turban) headwear sculpture",
      "Abhaya Mudra blessing gesture brings peace and prosperity",
      "Compact footprint fits desks, car dashboards, and entrance niches"
    ],
    "material": "Solid Cast White Metal Brass Alloy",
    "dimensions": {
      "length": 12,
      "width": 8,
      "height": 15,
      "unit": "cm"
    },
    "weightKg": 0.52,
    "colorFinish": "Antique Golden Bronze Patina",
    "stock": 30,
    "inStock": true,
    "featured": true,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.6,
    "reviewCount": 43,
    "tags": [
      "modern handcrafted pagdi ganesha metal idol",
      "home decor",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Modern%20Handcrafted%20Pagdi%20Ganesha%20Metal%20Idol/01.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Pagdi%20Ganesha%20Metal%20Idol/02.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Pagdi%20Ganesha%20Metal%20Idol/03.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Pagdi%20Ganesha%20Metal%20Idol/04.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Pagdi%20Ganesha%20Metal%20Idol/05.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Pagdi%20Ganesha%20Metal%20Idol/06.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Pagdi%20Ganesha%20Metal%20Idol/07.jpg",
      "/products/metal%20crafts/Modern%20Handcrafted%20Pagdi%20Ganesha%20Metal%20Idol/08.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-modern-handcrafted-pagdi-ganesha-metal-idol-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-modern-handcrafted-pagdi-ganesha-metal-idol-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "oxidized-metal-elephant-singhasan-with-chatra",
    "name": "Oxidized Metal Elephant Singhasan with Chatra",
    "slug": "oxidized-metal-elephant-singhasan-with-chatra",
    "sku": "BC-MT-145",
    "category": "Home Decor",
    "subCategory": "Figurines & Showpieces",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 399,
    "originalPrice": 609,
    "discountPercent": 34,
    "description": "A majestic royal elephant supporting a sacred pedestal throne beneath a carved royal umbrella (Chatra). Often used as a decorative royal seat for placing mini idols or as an opulent showcase figurine.",
    "shortDescription": "Oxidized metal royal elephant Singhasan (throne) with royal umbrella (Chatra).",
    "highlights": [
      "Elephant adorned in royal ceremonial howdah and trunk ornaments",
      "Removable filigree Chatra umbrella finial",
      "Perfect sacred platform for Laddu Gopal or small deity idols"
    ],
    "material": "Oxidized White Metal with Intricate Filigree",
    "dimensions": {
      "length": 15,
      "width": 10,
      "height": 17,
      "unit": "cm"
    },
    "weightKg": 0.62,
    "colorFinish": "Antique Silver-Black Oxidized Finish",
    "stock": 31,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 44,
    "tags": [
      "oxidized metal elephant singhasan with chatra",
      "home decor",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Oxidized%20Metal%20Elephant%20Singhasan%20with%20Chatra/01.jpg",
      "/products/metal%20crafts/Oxidized%20Metal%20Elephant%20Singhasan%20with%20Chatra/02.jpg",
      "/products/metal%20crafts/Oxidized%20Metal%20Elephant%20Singhasan%20with%20Chatra/03.jpg",
      "/products/metal%20crafts/Oxidized%20Metal%20Elephant%20Singhasan%20with%20Chatra/04.jpg",
      "/products/metal%20crafts/Oxidized%20Metal%20Elephant%20Singhasan%20with%20Chatra/05.jpeg",
      "/products/metal%20crafts/Oxidized%20Metal%20Elephant%20Singhasan%20with%20Chatra/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-oxidized-metal-elephant-singhasan-with-chatra-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-oxidized-metal-elephant-singhasan-with-chatra-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "radha-krishna-under-a-kalpavriksha-tree-statue",
    "name": "Radha Krishna Under a Kalpavriksha Tree Statue",
    "slug": "radha-krishna-under-a-kalpavriksha-tree-statue",
    "sku": "BC-MT-146",
    "category": "Home Decor",
    "subCategory": "Idols & Spiritual Figurines",
    "collection": "Festive Collection",
    "badge": "BESTSELLER",
    "price": 299,
    "originalPrice": 459,
    "discountPercent": 35,
    "description": "Depicting the divine eternal lovers Radha and Krishna beneath the sacred Kalpavriksha tree alongside a devoted cow (Kamadhenu), this metal sculpture radiates love, harmony, and celestial blessings.",
    "shortDescription": "Divine Radha Krishna under the wish-fulfilling Kalpavriksha tree statue.",
    "highlights": [
      "Intricately rendered Kalpavriksha tree canopy with lush leaf textures",
      "Radha and Krishna with flute and Kamadhenu cow at base",
      "Brings marital harmony, tranquility, and divine energy to homes"
    ],
    "material": "Oxidized White Metal Brass Alloy",
    "dimensions": {
      "length": 18,
      "width": 10,
      "height": 22,
      "unit": "cm"
    },
    "weightKg": 0.78,
    "colorFinish": "Antique Golden Bronze Patina",
    "stock": 32,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 45,
    "tags": [
      "radha krishna under a kalpavriksha tree statue",
      "home decor",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Radha%20Krishna%20under%20a%20Kalpavriksha%20Tree%20Statue/01.jpg",
      "/products/metal%20crafts/Radha%20Krishna%20under%20a%20Kalpavriksha%20Tree%20Statue/02.jpg",
      "/products/metal%20crafts/Radha%20Krishna%20under%20a%20Kalpavriksha%20Tree%20Statue/03.jpg",
      "/products/metal%20crafts/Radha%20Krishna%20under%20a%20Kalpavriksha%20Tree%20Statue/04.jpg",
      "/products/metal%20crafts/Radha%20Krishna%20under%20a%20Kalpavriksha%20Tree%20Statue/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-radha-krishna-under-a-kalpavriksha-tree-statue-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-radha-krishna-under-a-kalpavriksha-tree-statue-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "rose-gold-metallic-leaf-tealight-holder",
    "name": "Rose Gold Metallic Leaf Tealight Holder",
    "slug": "rose-gold-metallic-leaf-tealight-holder",
    "sku": "BC-MT-147",
    "category": "Home Decor",
    "subCategory": "Candle Holders & Votives",
    "collection": "Artisan Collection",
    "badge": "NEW",
    "price": 79,
    "originalPrice": 119,
    "discountPercent": 34,
    "description": "Embossed with delicate leaf veining and curled edges, this metallic leaf votive cradles standard tealights, casting a warm golden-pink aura across dinner tables and credenzas.",
    "shortDescription": "Artisan hand-hammered rose gold metallic leaf tealight candle holder.",
    "highlights": [
      "Hand-hammered botanical leaf form with organic veining",
      "Lustrous rose gold metallic finish reflects candlelight beautifully",
      "Compact accent for romantic dinners, festivities, and spa corners"
    ],
    "material": "Hand-Beaten Iron & Brass Alloy with Rose Gold Foil",
    "dimensions": {
      "length": 13,
      "width": 9,
      "height": 5,
      "unit": "cm"
    },
    "weightKg": 0.16,
    "colorFinish": "Luminous Rose Gold Metallic Finish",
    "stock": 33,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 46,
    "tags": [
      "rose gold metallic leaf tealight holder",
      "home decor",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Rose%20Gold%20Metallic%20Leaf%20Tealight%20Holder/01.jpg",
      "/products/metal%20crafts/Rose%20Gold%20Metallic%20Leaf%20Tealight%20Holder/02.jpg",
      "/products/metal%20crafts/Rose%20Gold%20Metallic%20Leaf%20Tealight%20Holder/03.jpg",
      "/products/metal%20crafts/Rose%20Gold%20Metallic%20Leaf%20Tealight%20Holder/04.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-rose-gold-metallic-leaf-tealight-holder-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-rose-gold-metallic-leaf-tealight-holder-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "round-cutwork-brass-diya-set-of-3",
    "name": "Round Cutwork Brass Diya Set of 3",
    "slug": "round-cutwork-brass-diya-set-of-3",
    "sku": "BC-MT-148",
    "category": "Brass & Metal",
    "subCategory": "Pooja Diyas & Lamps",
    "collection": "Heritage Collection",
    "badge": "HANDCRAFTED",
    "price": 259,
    "originalPrice": 399,
    "discountPercent": 35,
    "description": "Cast by Moradabad brass smiths, this set of 3 round diyas features precision lattice cutouts. When lit, glowing flames cast breathtaking floral shadow halos across your prayer altar or festive porch.",
    "shortDescription": "Set of 3 round cutwork brass diyas creating hypnotic shadow patterns when lit.",
    "highlights": [
      "Set of 3 round jali cutwork brass oil lamps",
      "Intricate side cutouts create radiant starburst reflections",
      "Solid heavy brass base stays stable and wind-resistant",
      "Long-burning oil reservoir ideal for Diwali and daily pooja"
    ],
    "material": "100% Solid Pure Virgin Brass",
    "dimensions": {
      "length": 8,
      "width": 8,
      "height": 5,
      "unit": "cm"
    },
    "weightKg": 0.32,
    "colorFinish": "Traditional Golden Gloss with Etched Cutwork",
    "stock": 34,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 47,
    "tags": [
      "round cutwork brass diya set of 3",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Round%20Cutwork%20Brass%20Diya%20set%20of%203/01.jpg",
      "/products/metal%20crafts/Round%20Cutwork%20Brass%20Diya%20set%20of%203/02.jpg",
      "/products/metal%20crafts/Round%20Cutwork%20Brass%20Diya%20set%20of%203/03.jpg",
      "/products/metal%20crafts/Round%20Cutwork%20Brass%20Diya%20set%20of%203/04.jpg",
      "/products/metal%20crafts/Round%20Cutwork%20Brass%20Diya%20set%20of%203/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-round-cutwork-brass-diya-set-of-3-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-round-cutwork-brass-diya-set-of-3-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "set-of-3-star-leaf-cutwork-brass-diyas",
    "name": "Set of 3 Star Leaf Cutwork Brass Diyas",
    "slug": "set-of-3-star-leaf-cutwork-brass-diyas",
    "sku": "BC-MT-149",
    "category": "Brass & Metal",
    "subCategory": "Pooja Diyas & Lamps",
    "collection": "Heritage Collection",
    "badge": "BESTSELLER",
    "price": 349,
    "originalPrice": 539,
    "discountPercent": 35,
    "description": "Elevate your festive illumination with these star-patterned cutwork oil lamps. The thick brass rim prevents overheating while casting delicate starry patterns on walls and floors.",
    "shortDescription": "Set of 3 star leaf cutwork brass diyas with ornate filigree perforations.",
    "highlights": [
      "Set of 3 star-leaf motif brass oil lamps",
      "Thick brass alloy provides superior thermal tolerance",
      "Perfect for Diwali, Navratri, and wedding pooja altars"
    ],
    "material": "Heavyweight Cast Brass",
    "dimensions": {
      "length": 9,
      "width": 9,
      "height": 5,
      "unit": "cm"
    },
    "weightKg": 0.4,
    "colorFinish": "Gleaming Gold Polish",
    "stock": 35,
    "inStock": true,
    "featured": true,
    "bestseller": false,
    "newArrival": true,
    "rating": 4.6,
    "reviewCount": 48,
    "tags": [
      "set of 3 star leaf cutwork brass diyas",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Set%20of%203%20Star%20Leaf%20Cutwork%20Brass%20Diyas/01.jpg",
      "/products/metal%20crafts/Set%20of%203%20Star%20Leaf%20Cutwork%20Brass%20Diyas/02.jpg",
      "/products/metal%20crafts/Set%20of%203%20Star%20Leaf%20Cutwork%20Brass%20Diyas/03.jpg",
      "/products/metal%20crafts/Set%20of%203%20Star%20Leaf%20Cutwork%20Brass%20Diyas/04.jpg",
      "/products/metal%20crafts/Set%20of%203%20Star%20Leaf%20Cutwork%20Brass%20Diyas/06.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-set-of-3-star-leaf-cutwork-brass-diyas-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-set-of-3-star-leaf-cutwork-brass-diyas-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "square-cutwork-brass-diya-set-of-3",
    "name": "Square Cutwork Brass Diya Set of 3",
    "slug": "square-cutwork-brass-diya-set-of-3",
    "sku": "BC-MT-150",
    "category": "Brass & Metal",
    "subCategory": "Pooja Diyas & Lamps",
    "collection": "Heritage Collection",
    "badge": "HANDCRAFTED",
    "price": 279,
    "originalPrice": 429,
    "discountPercent": 35,
    "description": "A striking geometric variation of traditional oil lamps, this set of 3 square brass diyas features ornate cutout lattices that project mesmerizing geometric shadows during evening prayers.",
    "shortDescription": "Set of 3 square cutwork brass pooja diyas with decorative lattice filigree.",
    "highlights": [
      "Set of 3 square filigree brass lamps",
      "Modern architectural geometric profile with traditional heritage craft",
      "Pure virgin brass ensures decades of festive use without tarnishing easily"
    ],
    "material": "Solid Pure Virgin Brass",
    "dimensions": {
      "length": 8,
      "width": 8,
      "height": 5,
      "unit": "cm"
    },
    "weightKg": 0.35,
    "colorFinish": "Polished Golden Luster",
    "stock": 36,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.7,
    "reviewCount": 49,
    "tags": [
      "square cutwork brass diya set of 3",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Square%20Cutwork%20Brass%20Diya%20%20set%20of%203/01.jpg",
      "/products/metal%20crafts/Square%20Cutwork%20Brass%20Diya%20%20set%20of%203/02.jpg",
      "/products/metal%20crafts/Square%20Cutwork%20Brass%20Diya%20%20set%20of%203/03.jpg",
      "/products/metal%20crafts/Square%20Cutwork%20Brass%20Diya%20%20set%20of%203/04.jpg",
      "/products/metal%20crafts/Square%20Cutwork%20Brass%20Diya%20%20set%20of%203/05.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-square-cutwork-brass-diya-set-of-3-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-square-cutwork-brass-diya-set-of-3-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "sun-dial-pooja-diya-set-of-3",
    "name": "Sun Dial Pooja Diya Set of 3",
    "slug": "sun-dial-pooja-diya-set-of-3",
    "sku": "BC-MT-151",
    "category": "Brass & Metal",
    "subCategory": "Pooja Diyas & Lamps",
    "collection": "Festive Collection",
    "badge": "NEW",
    "price": 429,
    "originalPrice": 659,
    "discountPercent": 35,
    "description": "Inspired by the celestial sun dial (Surya Yantra), these 3 brass lamps feature radiated fluted edges that mimic blazing sun rays around a sacred central flame.",
    "shortDescription": "Set of 3 sun dial inspired brass pooja diyas with solar ray motifs.",
    "highlights": [
      "Set of 3 Surya-inspired sun dial oil lamps",
      "Scalloped sunbeam borders guide flame reflection upwards",
      "Solid heavy brass construction for generational prayer rituals"
    ],
    "material": "Pure Virgin Brass",
    "dimensions": {
      "length": 10,
      "width": 10,
      "height": 6,
      "unit": "cm"
    },
    "weightKg": 0.48,
    "colorFinish": "Heritage Golden Luster",
    "stock": 37,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 50,
    "tags": [
      "sun dial pooja diya set of 3",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Sun%20Dial%20Pooja%20Diya%20%20set%20of%203/01.jpg",
      "/products/metal%20crafts/Sun%20Dial%20Pooja%20Diya%20%20set%20of%203/02.jpg",
      "/products/metal%20crafts/Sun%20Dial%20Pooja%20Diya%20%20set%20of%203/03.jpg",
      "/products/metal%20crafts/Sun%20Dial%20Pooja%20Diya%20%20set%20of%203/04.jpg",
      "/products/metal%20crafts/Sun%20Dial%20Pooja%20Diya%20%20set%20of%203/05.jpg",
      "/products/metal%20crafts/Sun%20Dial%20Pooja%20Diya%20%20set%20of%203/06.jpg",
      "/products/metal%20crafts/Sun%20Dial%20Pooja%20Diya%20%20set%20of%203/07.jpg",
      "/products/metal%20crafts/Sun%20Dial%20Pooja%20Diya%20%20set%20of%203/08.jpg",
      "/products/metal%20crafts/Sun%20Dial%20Pooja%20Diya%20%20set%20of%203/09.jpg",
      "/products/metal%20crafts/Sun%20Dial%20Pooja%20Diya%20%20set%20of%203/10.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-sun-dial-pooja-diya-set-of-3-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-sun-dial-pooja-diya-set-of-3-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "the-azure-bloom-diya-set-of-4",
    "name": "The Azure Bloom Diya Set of 4",
    "slug": "the-azure-bloom-diya-set-of-4",
    "sku": "BC-MT-152",
    "category": "Brass & Metal",
    "subCategory": "Decorative Diyas",
    "collection": "Festive Collection",
    "badge": "BESTSELLER",
    "price": 399,
    "originalPrice": 609,
    "discountPercent": 34,
    "description": "Inspired by royal Persian-Indian turquoise glazes, this set of 4 Azure Bloom lamps features vibrant oceanic blue enamel paired with bright golden metal borders.",
    "shortDescription": "The Azure Bloom set of 4 multicolor hand-glazed floral diyas.",
    "highlights": [
      "Set of 4 artisan Azure Bloom multicolor floral lamps",
      "Vibrant enamel finish glows brilliantly under evening candlelight",
      "Stunning decorative addition for festive rangolis and dining setups"
    ],
    "material": "Cast Metal Brass Alloy with Glazed Azure Enamel",
    "dimensions": {
      "length": 9,
      "width": 9,
      "height": 5,
      "unit": "cm"
    },
    "weightKg": 0.46,
    "colorFinish": "Azure Turquoise Blue with Golden Accents",
    "stock": 38,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 51,
    "tags": [
      "the azure bloom diya set of 4",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/The%20Azure%20Bloom%20Diya%20set%20of%204/01.jpg",
      "/products/metal%20crafts/The%20Azure%20Bloom%20Diya%20set%20of%204/02.jpeg",
      "/products/metal%20crafts/The%20Azure%20Bloom%20Diya%20set%20of%204/03.jpeg",
      "/products/metal%20crafts/The%20Azure%20Bloom%20Diya%20set%20of%204/04.jpg",
      "/products/metal%20crafts/The%20Azure%20Bloom%20Diya%20set%20of%204/05.jpg",
      "/products/metal%20crafts/The%20Azure%20Bloom%20Diya%20set%20of%204/06.jpg",
      "/products/metal%20crafts/The%20Azure%20Bloom%20Diya%20set%20of%204/08.jpg",
      "/products/metal%20crafts/The%20Azure%20Bloom%20Diya%20set%20of%204/09.jpg",
      "/products/metal%20crafts/The%20Azure%20Bloom%20Diya%20set%20of%204/10.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-the-azure-bloom-diya-set-of-4-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-the-azure-bloom-diya-set-of-4-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "traditional-brass-shankh-diya-set-of-3",
    "name": "Traditional Brass Shankh Diya Set of 3",
    "slug": "traditional-brass-shankh-diya-set-of-3",
    "sku": "BC-MT-153",
    "category": "Brass & Metal",
    "subCategory": "Sacred Pooja Diyas",
    "collection": "Heritage Collection",
    "badge": "HANDCRAFTED",
    "price": 349,
    "originalPrice": 539,
    "discountPercent": 35,
    "description": "Crafted in the auspicious contour of the sacred conch shell (Shankha), this set of 3 brass diyas invokes spiritual purity and tranquility during home prayers and rituals.",
    "shortDescription": "Set of 3 traditional brass Shankh (conch shell) sacred pooja diyas.",
    "highlights": [
      "Set of 3 Shankh-shaped brass oil lamps",
      "Auspicious conch shell design associated with Lakshmi and Vishnu",
      "Natural ergonomic wick spout provides clean directional flame"
    ],
    "material": "Pure Virgin Cast Brass",
    "dimensions": {
      "length": 10,
      "width": 7,
      "height": 5,
      "unit": "cm"
    },
    "weightKg": 0.42,
    "colorFinish": "Polished Golden Brass",
    "stock": 39,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 52,
    "tags": [
      "traditional brass shankh diya set of 3",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Traditional%20Brass%20Shankh%20Diya%20set%20of%203/01.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Shankh%20Diya%20set%20of%203/02.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Shankh%20Diya%20set%20of%203/03.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Shankh%20Diya%20set%20of%203/04.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Shankh%20Diya%20set%20of%203/05.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Shankh%20Diya%20set%20of%203/06.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Shankh%20Diya%20set%20of%203/07.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-traditional-brass-shankh-diya-set-of-3-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-traditional-brass-shankh-diya-set-of-3-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "traditional-brass-sudarshana-chakra-diya-set-of-3",
    "name": "Traditional Brass Sudarshana Chakra Diya Set of 3",
    "slug": "traditional-brass-sudarshana-chakra-diya-set-of-3",
    "sku": "BC-MT-154",
    "category": "Brass & Metal",
    "subCategory": "Sacred Pooja Diyas",
    "collection": "Heritage Collection",
    "badge": "HANDCRAFTED",
    "price": 399,
    "originalPrice": 609,
    "discountPercent": 34,
    "description": "Modeled after the protective cosmic discus of Lord Vishnu, this set of 3 Sudarshana Chakra lamps features serrated wheel rims and sacred emblems to bring divine protection and peace.",
    "shortDescription": "Set of 3 traditional brass Sudarshana Chakra sacred deepaks.",
    "highlights": [
      "Set of 3 Sudarshana Chakra deepaks",
      "Sacred Vaishnava symbolism representing the victory of light over dark",
      "Thick heavy brass casting with long-lasting polished sheen"
    ],
    "material": "Pure Virgin Cast Brass",
    "dimensions": {
      "length": 9,
      "width": 9,
      "height": 5,
      "unit": "cm"
    },
    "weightKg": 0.45,
    "colorFinish": "Golden Mirror Finish",
    "stock": 40,
    "inStock": true,
    "featured": true,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.6,
    "reviewCount": 53,
    "tags": [
      "traditional brass sudarshana chakra diya set of 3",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Traditional%20Brass%20Sudarshana%20Chakra%20Diya%20%20set%20of%203/01.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Sudarshana%20Chakra%20Diya%20%20set%20of%203/02.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Sudarshana%20Chakra%20Diya%20%20set%20of%203/03.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Sudarshana%20Chakra%20Diya%20%20set%20of%203/04.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Sudarshana%20Chakra%20Diya%20%20set%20of%203/05.jpg",
      "/products/metal%20crafts/Traditional%20Brass%20Sudarshana%20Chakra%20Diya%20%20set%20of%203/06.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-traditional-brass-sudarshana-chakra-diya-set-of-3-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-traditional-brass-sudarshana-chakra-diya-set-of-3-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "vastu-brass-tortoise-on-a-glass-plate",
    "name": "Vastu Brass Tortoise on a Glass Plate",
    "slug": "vastu-brass-tortoise-on-a-glass-plate",
    "sku": "BC-MT-155",
    "category": "Home Decor",
    "subCategory": "Vastu & Feng Shui Accents",
    "collection": "Heritage Collection",
    "badge": "BESTSELLER",
    "price": 399,
    "originalPrice": 609,
    "discountPercent": 34,
    "description": "According to Vedic Vastu and Feng Shui traditions, placing a brass tortoise in water in the North direction attracts wealth, longevity, career growth, and removes negative energy from home and office.",
    "shortDescription": "Vastu auspicious brass tortoise (Kurma) resting upon a clear glass plate.",
    "highlights": [
      "Solid virgin brass tortoise with inscribed yantra carapace",
      "Accompanied by a heavy beveled glass water bowl",
      "Auspicious Vastu tool for career prosperity and longevity"
    ],
    "material": "Solid Pure Virgin Brass with Beveled Glass Dish",
    "dimensions": {
      "length": 14,
      "width": 14,
      "height": 4,
      "unit": "cm"
    },
    "weightKg": 0.45,
    "colorFinish": "Golden Brass Turtle with Clear Glass Plate",
    "stock": 41,
    "inStock": true,
    "featured": false,
    "bestseller": true,
    "newArrival": true,
    "rating": 4.7,
    "reviewCount": 54,
    "tags": [
      "vastu brass tortoise on a glass plate",
      "home decor",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Vastu%20Brass%20Tortoise%20on%20a%20Glass%20Plate/01.jpg",
      "/products/metal%20crafts/Vastu%20Brass%20Tortoise%20on%20a%20Glass%20Plate/02.jpg",
      "/products/metal%20crafts/Vastu%20Brass%20Tortoise%20on%20a%20Glass%20Plate/03.jpg",
      "/products/metal%20crafts/Vastu%20Brass%20Tortoise%20on%20a%20Glass%20Plate/04.jpg",
      "/products/metal%20crafts/Vastu%20Brass%20Tortoise%20on%20a%20Glass%20Plate/05.jpg",
      "/products/metal%20crafts/Vastu%20Brass%20Tortoise%20on%20a%20Glass%20Plate/06.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-vastu-brass-tortoise-on-a-glass-plate-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-vastu-brass-tortoise-on-a-glass-plate-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "zen-chime-or-shop-entry-bell",
    "name": "Zen Chime Or Shop Entry Bell",
    "slug": "zen-chime-or-shop-entry-bell",
    "sku": "BC-MT-156",
    "category": "Brass & Metal",
    "subCategory": "Bells & Chimes",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 299,
    "originalPrice": 459,
    "discountPercent": 35,
    "description": "Emitting a sweet, resonant and harmonic chime whenever doors open, this handcrafted brass bell attaches effortlessly to door frames via magnetic and adhesive mounts.",
    "shortDescription": "Artisan solid brass shopkeeper's entry bell / Zen chime with wooden mount.",
    "highlights": [
      "Tuned solid brass clapper produces clear, soothing harmonic tone",
      "Dual mounting: magnetic backing for metal doors and adhesive pad for wood",
      "Brings Zen peace, positive vastu vibes, and alert notification to shops & homes"
    ],
    "material": "Solid Cast Bell Brass with Wooden Mounting Block",
    "dimensions": {
      "length": 8,
      "width": 5,
      "height": 10,
      "unit": "cm"
    },
    "weightKg": 0.32,
    "colorFinish": "Vintage Brass Bell with Walnut Magnet Mount",
    "stock": 42,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 55,
    "tags": [
      "zen chime or shop entry bell",
      "brass & metal",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/Zen%20chime%20or%20shop%20entry%20bell/01.jpg",
      "/products/metal%20crafts/Zen%20chime%20or%20shop%20entry%20bell/02.jpg",
      "/products/metal%20crafts/Zen%20chime%20or%20shop%20entry%20bell/03.jpeg",
      "/products/metal%20crafts/Zen%20chime%20or%20shop%20entry%20bell/04.jpg",
      "/products/metal%20crafts/Zen%20chime%20or%20shop%20entry%20bell/05.jpg",
      "/products/metal%20crafts/Zen%20chime%20or%20shop%20entry%20bell/06.jpeg",
      "/products/metal%20crafts/Zen%20chime%20or%20shop%20entry%20bell/07.jpg",
      "/products/metal%20crafts/Zen%20chime%20or%20shop%20entry%20bell/09.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-zen-chime-or-shop-entry-bell-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-zen-chime-or-shop-entry-bell-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "ecraftindia-loving-golden-swan-couple-figurine",
    "name": "Ecraftindia Loving Golden Swan Couple Figurine",
    "slug": "ecraftindia-loving-golden-swan-couple-figurine",
    "sku": "BC-MT-157",
    "category": "Home Decor",
    "subCategory": "Showpieces & Figurines",
    "collection": "Artisan Collection",
    "badge": "HANDCRAFTED",
    "price": 399,
    "originalPrice": 609,
    "discountPercent": 34,
    "description": "Depicting two graceful swans with their curved necks intertwined to form a subtle heart shape, this elegant golden sculpture symbolizes enduring love, fidelity, and marital harmony.",
    "shortDescription": "eCraftIndia loving golden swan couple figurine symbolizing eternal romance.",
    "highlights": [
      "Twin swans forming a romantic heart silhouette",
      "Gleaming mirror gold electroplated coating resists oxidation",
      "Acclaimed anniversary and wedding celebration gift"
    ],
    "material": "Fine Cast Metal with 24K Gold Tone Electroplating",
    "dimensions": {
      "length": 18,
      "width": 9,
      "height": 23,
      "unit": "cm"
    },
    "weightKg": 0.72,
    "colorFinish": "Brilliant Golden Luster with Textural Etching",
    "stock": 43,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewCount": 56,
    "tags": [
      "ecraftindia loving golden swan couple figurine",
      "home decor",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/eCraftIndia%20Loving%20Golden%20Swan%20Couple%20Figurine/01.jpg",
      "/products/metal%20crafts/eCraftIndia%20Loving%20Golden%20Swan%20Couple%20Figurine/02.jpg",
      "/products/metal%20crafts/eCraftIndia%20Loving%20Golden%20Swan%20Couple%20Figurine/03.jpg",
      "/products/metal%20crafts/eCraftIndia%20Loving%20Golden%20Swan%20Couple%20Figurine/04.jpg",
      "/products/metal%20crafts/eCraftIndia%20Loving%20Golden%20Swan%20Couple%20Figurine/05.jpg",
      "/products/metal%20crafts/eCraftIndia%20Loving%20Golden%20Swan%20Couple%20Figurine/06.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-ecraftindia-loving-golden-swan-couple-figurine-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-ecraftindia-loving-golden-swan-couple-figurine-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
    ]
  },
  {
    "id": "esplanade-brass-ganesha-wall-hanging-deepak-with-bells",
    "name": "Esplanade Brass Ganesha Wall Hanging Deepak with Bells",
    "slug": "esplanade-brass-ganesha-wall-hanging-deepak-with-bells",
    "sku": "BC-MT-158",
    "category": "Home Decor",
    "subCategory": "Wall Decor & Hangings",
    "collection": "Heritage Collection",
    "badge": "BESTSELLER",
    "price": 499,
    "originalPrice": 769,
    "discountPercent": 35,
    "description": "A grand solid brass wall sconce featuring Lord Ganesha seated inside a Prabhavali arch, with a projecting oil diya and dangling musical temple bells below that chime gently in breezes.",
    "shortDescription": "eSplanade heavy brass Ganesha wall hanging deepak with hanging musical bells.",
    "highlights": [
      "Cast from heavy virgin brass by master temple artisans",
      "Features dangling brass bells that tinkle with natural air movement",
      "Integrated wall mounting bracket on reverse",
      "Magnificent entryway and pooja room statement piece"
    ],
    "material": "100% Solid Pure Virgin Brass",
    "dimensions": {
      "length": 14,
      "width": 10,
      "height": 24,
      "unit": "cm"
    },
    "weightKg": 1.1,
    "colorFinish": "Hand-Polished Antique Brass Luster",
    "stock": 44,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewCount": 57,
    "tags": [
      "esplanade brass ganesha wall hanging deepak with bells",
      "home decor",
      "metal",
      "handcrafted",
      "indian artisan",
      "beingcraft"
    ],
    "images": [
      "/products/metal%20crafts/eSplanade%20Brass%20Ganesha%20Wall%20Hanging%20Deepak%20with%20Bells/01.jpg",
      "/products/metal%20crafts/eSplanade%20Brass%20Ganesha%20Wall%20Hanging%20Deepak%20with%20Bells/02.jpg",
      "/products/metal%20crafts/eSplanade%20Brass%20Ganesha%20Wall%20Hanging%20Deepak%20with%20Bells/03.jpg",
      "/products/metal%20crafts/eSplanade%20Brass%20Ganesha%20Wall%20Hanging%20Deepak%20with%20Bells/04.jpeg",
      "/products/metal%20crafts/eSplanade%20Brass%20Ganesha%20Wall%20Hanging%20Deepak%20with%20Bells/05.jpeg",
      "/products/metal%20crafts/eSplanade%20Brass%20Ganesha%20Wall%20Hanging%20Deepak%20with%20Bells/06.jpg"
    ],
    "careInstructions": [
      "Wipe gently with a soft dry cotton cloth to preserve sheen.",
      "Avoid harsh abrasive cleaners and chemical bleaches.",
      "Keep away from direct continuous rain or moisture immersion."
    ],
    "reviews": [
      {
        "id": "rev-esplanade-brass-ganesha-wall-hanging-deepak-with-bells-1",
        "userName": "Ananya Sharma",
        "userCity": "New Delhi",
        "rating": 5,
        "date": "15 days ago",
        "title": "Outstanding craftsmanship & authenticity",
        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
        "verifiedPurchase": true
      },
      {
        "id": "rev-esplanade-brass-ganesha-wall-hanging-deepak-with-bells-2",
        "userName": "Vikramaditya Rao",
        "userCity": "Bengaluru",
        "rating": 5,
        "date": "1 month ago",
        "title": "Genuine solid material",
        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
        "verifiedPurchase": true
      }
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

