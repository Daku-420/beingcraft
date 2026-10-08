"""
BeingCraft Product Catalog Generator & Injector
Reads products and images from `public/products/wood crafts` and `public/products/metal crafts`
Matches pricing from `public/products/being craft de product(AutoRecovered).xlsx`
Classifies products into the 4 core pillars:
  - 'Home Decor'
  - 'Wood Crafts'
  - 'Brass & Metal'
  - 'Dining & Kitchen'
Updates `src/data/products.ts` with authentic details, dimensions, and local images.
"""

import os
import re
import json
import zipfile
import xml.etree.ElementTree as ET

BASE_DIR = r"c:\BeingCraft"
PUBLIC_PRODUCTS_DIR = os.path.join(BASE_DIR, "public", "products")
EXCEL_PATH = os.path.join(PUBLIC_PRODUCTS_DIR, "being craft de product(AutoRecovered).xlsx")
PRODUCTS_TS_PATH = os.path.join(BASE_DIR, "src", "data", "products.ts")

# 1. Parse Excel prices
def load_excel_prices():
    prices = {}
    if not os.path.exists(EXCEL_PATH):
        print("Excel not found, using defaults")
        return prices

    with zipfile.ZipFile(EXCEL_PATH) as z:
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
            for si in tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                text = ''.join(t.text or '' for t in si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t'))
                shared_strings.append(text.strip())
        
        sheet_xml = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
        rows = sheet_xml.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheetData/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row')
        for row in rows[1:]:
            cells = []
            for c in row.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                t = c.get('t')
                v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                val = v.text if v is not None else ''
                if t == 's' and val.isdigit():
                    val = shared_strings[int(val)]
                cells.append(val.strip())
            if len(cells) >= 2 and cells[0]:
                raw_price = cells[1]
                # extract numbers from price string e.g. "59/ piece" or "349"
                m = re.search(r'\d+', raw_price)
                if m:
                    price_val = int(m.group(0))
                    prices[normalize_key(cells[0])] = price_val

    return prices

def normalize_key(s):
    return ''.join(c.lower() for c in s if c.isalnum())

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

# 2. Product metadata knowledge base
PRODUCT_METADATA = {
    # DINING & KITCHEN
    "chaklabelan": {
        "category": "Dining & Kitchen",
        "subCategory": "Cooking Essentials & Roti Utensils",
        "material": "Seasoned Solid Sheesham Wood (Indian Rosewood)",
        "colorFinish": "Natural Rich Sheesham Grain with Hand-Wax Polish",
        "dimensions": {"length": 25, "width": 25, "height": 5, "unit": "cm"},
        "weightKg": 1.4,
        "shortDescription": "Traditional Indian handmade wooden Chakla (rolling board) & Belan (rolling pin) turned by generational artisans.",
        "description": "Crafted from seasoned solid Sheesham hardwood, this classic Chakla Belan set delivers flawless rolling balance for chapatis, puris, and parathas. Features a heavy, non-slip solid base and mirror-smooth ergonomic rolling pin finished with natural food-safe wood oils.",
        "highlights": [
            "Hand-turned from solid single-block seasoned Sheesham",
            "Weight-balanced base prevents slips during rolling",
            "Ergonomic tapered Belan handles for smooth rotational motion",
            "100% food-safe finish with zero chemical varnishes"
        ]
    },
    "rollingpin": {
        "category": "Dining & Kitchen",
        "subCategory": "Cooking Utensils",
        "material": "Hardwood Sheesham / Teak",
        "colorFinish": "Warm Honey Wood Polish",
        "dimensions": {"length": 36, "width": 5, "height": 5, "unit": "cm"},
        "weightKg": 0.35,
        "shortDescription": "Handcrafted Indian wooden rolling pin (Belan) with balanced grip.",
        "description": "Individually lathed by woodcraft artisans, this traditional rolling pin offers exceptional ergonomic comfort and uniform pressure distribution for rolling perfect round rotis.",
        "highlights": [
            "Balanced center weight for uniform dough thickness",
            "Smooth sanded friction-free surface",
            "Made from non-porous naturally antibacterial hardwood",
            "Long-lasting kitchen essential"
        ]
    },
    "spatulaandcookingspoonset": {
        "category": "Dining & Kitchen",
        "subCategory": "Culinary Spoons & Ladles",
        "material": "Premium Solid Sheesham Wood",
        "colorFinish": "Natural Wood Tone with Food-Grade Oil",
        "dimensions": {"length": 32, "width": 8, "height": 2, "unit": "cm"},
        "weightKg": 0.6,
        "shortDescription": "Handmade 7-piece wooden ladle, palta, and frying spoon set for non-stick cooking.",
        "description": "An indispensable 7-piece artisanal spoon set including turner (palta), deep frying spoon, soup kadchi, rice server, slotted spoon, and stirring spatulas. Gentle on non-stick cookware and heat-resistant.",
        "highlights": [
            "Complete 7-piece culinary utility set for frying, stirring & serving",
            "Gentle curved edges protect non-stick pans from scratching",
            "Naturally heat resistant handles never conduct burning heat",
            "Single-piece seamless wood construction prevents food trapped in joints"
        ]
    },
    "flatwoodencookingspatula": {
        "category": "Dining & Kitchen",
        "subCategory": "Cooking Spoons",
        "material": "Natural Seasoned Teak / Sheesham",
        "colorFinish": "Natural Untreated Wood Glow",
        "dimensions": {"length": 30, "width": 6, "height": 1.5, "unit": "cm"},
        "weightKg": 0.12,
        "shortDescription": "Handmade flat wooden cooking spatula for stirring, sautéing, and flipping.",
        "description": "A single-piece solid wood flat spatula designed for effortless wok stirring, dosa tossing, and pan frying without harming non-stick coatings.",
        "highlights": [
            "Ultra-smooth beveled edge for easy scraping and turning",
            "Lightweight ergonomic grip for daily kitchen tasks",
            "100% heat safe and biodegradable"
        ]
    },
    "sheeshamwoodservingbowlset": {
        "category": "Dining & Kitchen",
        "subCategory": "Serving Bowls & Tableware",
        "material": "Pure Seasoned Sheesham Wood",
        "colorFinish": "Deep Walnut Natural Grain",
        "dimensions": {"length": 16, "width": 16, "height": 7, "unit": "cm"},
        "weightKg": 0.55,
        "shortDescription": "Pair of artisanal Sheesham wood serving bowls for salads, gravies, and dry snacks.",
        "description": "Sculpted from aged Sheesham timber, this 2-piece handcrafted bowl set celebrates nature's organic grain patterns. Ideal for serving artisan breads, salads, nuts, and festive delicacies.",
        "highlights": [
            "Set of 2 handcrafted wooden serving bowls",
            "Carved from dense, moisture-resistant Sheesham",
            "Food-safe natural beeswax coating",
            "Rich conversational centerpiece for heirloom dining"
        ]
    },
    "treebarkservingplatter": {
        "category": "Dining & Kitchen",
        "subCategory": "Platters & Trays",
        "material": "Natural Raw Log Tree Bark with Solid Wood Core",
        "colorFinish": "Rustic Raw Bark Edge with Sanded Core",
        "dimensions": {"length": 28, "width": 28, "height": 3.5, "unit": "cm"},
        "weightKg": 0.85,
        "shortDescription": "Rustic circular live-edge wooden tree bark serving platter and cheese board.",
        "description": "Showcasing raw natural bark edges and concentric annual tree rings, this rustic live-edge platter turns appetizers, cheeses, finger snacks, and desserts into culinary artistry.",
        "highlights": [
            "Authentic preserved live-edge raw wood bark border",
            "Smooth food-safe serving surface",
            "Elevates charcuterie boards, cheese courses, and canapés",
            "Each platter features unique natural grain and ring contours"
        ]
    },
    "chapatibox": {
        "category": "Dining & Kitchen",
        "subCategory": "Roti Storage & Bread Baskets",
        "material": "Hand-Carved Solid Sheesham Wood",
        "colorFinish": "Antique Brass Inlay & Natural Walnut Polish",
        "dimensions": {"length": 23, "width": 23, "height": 10, "unit": "cm"},
        "weightKg": 1.1,
        "shortDescription": "Handcrafted round wooden chapati box (Roti Dabba) with carved lid.",
        "description": "Keep rotis fresh and warm with this heritage wooden chapati box. Crafted with intricate hand-carved floral motifs and a snug lid, it brings royal Indian dining elegance straight to your table.",
        "highlights": [
            "Insulating solid wood keeps rotis soft and warm naturally",
            "Hand-carved royal floral lid medallion",
            "Ample capacity for 15-20 full-sized rotis",
            "Heirloom Indian dining presentation piece"
        ]
    },
    "teacoasterset": {
        "category": "Dining & Kitchen",
        "subCategory": "Drink Coasters & Bar Accessories",
        "material": "Handcrafted Seasoned Sheesham Wood",
        "colorFinish": "Rich Walnut Stain with Brass Inlays",
        "dimensions": {"length": 11, "width": 11, "height": 6, "unit": "cm"},
        "weightKg": 0.45,
        "shortDescription": "Handcrafted 6-piece wooden tea coaster set housed in a matching artisan holder.",
        "description": "Protect your dining and coffee tables in style with this 6-piece wooden coaster set. Each coaster is hand-buffed with heat-resistant polish and nests neatly inside a custom handcrafted stand.",
        "highlights": [
            "Includes 6 round coasters and 1 compact holding stand",
            "Protects wooden and glass surfaces from heat rings and stains",
            "Subtle brass wire inlay detailing on coasters",
            "Compact footprint perfect for study and living room tables"
        ]
    },
    "servingtray": {
        "category": "Dining & Kitchen",
        "subCategory": "Serving Trays",
        "material": "Aged Sheesham Timber",
        "colorFinish": "Smooth Natural Grain Matte Polish",
        "dimensions": {"length": 35, "width": 24, "height": 4.5, "unit": "cm"},
        "weightKg": 0.75,
        "shortDescription": "Premium solid wooden serving tray with ergonomic carry cutouts.",
        "description": "A refined minimalist wooden serving tray designed for high tea, morning coffee, and cocktail service. Strong joinery and smooth handles make serving seamless.",
        "highlights": [
            "Sturdy solid wood base with spill-proof raised perimeter",
            "Integrated ergonomic cut-out handles for effortless carrying",
            "Durable wipe-clean finish resists moisture and tea drips"
        ]
    },
    "cutworkservingtray": {
        "category": "Dining & Kitchen",
        "subCategory": "Serving Trays & Decor",
        "material": "Hand-Carved Sheesham Wood with Brass Accents",
        "colorFinish": "Antique Jali Carved Walnut Finish",
        "dimensions": {"length": 38, "width": 26, "height": 5, "unit": "cm"},
        "weightKg": 0.9,
        "shortDescription": "Handcrafted premium wooden serving tray with intricate openwork jali cutwork.",
        "description": "Featuring traditional floral openwork (jali) borders hand-chiseled by Saharanpur master artisans, this decorative serving tray doubles as a stunning festive coffee table centerpiece.",
        "highlights": [
            "Intricate hand-chiseled jali fretwork borders",
            "Expansive serving base for tea sets, cups, and appetizers",
            "Authentic royal Mughal-inspired craft aesthetic"
        ]
    },
    "nestingbowlset": {
        "category": "Dining & Kitchen",
        "subCategory": "Serving Bowls",
        "material": "Solid Mango & Sheesham Wood with Floral Enamel Inlay",
        "colorFinish": "Natural Wood Exterior with Artisanal Floral Interior",
        "dimensions": {"length": 18, "width": 18, "height": 8, "unit": "cm"},
        "weightKg": 0.65,
        "shortDescription": "Handcrafted nested wooden bowl set adorned with floral hand-inlay work.",
        "description": "This exquisite set of nesting wooden bowls features smooth hand-turned wood with joyful floral enamel artwork inside. Ideal for serving dry fruits, chips, candies, and festival snacks.",
        "highlights": [
            "Space-saving nesting design for easy storage",
            "Vibrant food-safe decorative interior glaze",
            "Perfect for festive Diwali dry fruit and snack presentations"
        ]
    },
    "lavauxdesigns": {
        "category": "Dining & Kitchen",
        "subCategory": "Serving Bowls",
        "material": "Sustainable Natural Acacia Wood",
        "colorFinish": "Natural Honey Acacia Grains",
        "dimensions": {"length": 14, "width": 14, "height": 6, "unit": "cm"},
        "weightKg": 0.35,
        "shortDescription": "Lavaux Designs handcrafted small Acacia wood bowl set for dips, nuts, and snacks.",
        "description": "Crafted from durable eco-friendly Acacia hardwood, these small serving bowls add understated organic elegance to your dining spread. Perfect for sauces, olives, and condiments.",
        "highlights": [
            "Dense water-resistant Acacia wood construction",
            "Smooth rounded rims with tactile silky finish",
            "Versatile dipping, appetizer, and snack size"
        ]
    },
    "viking": {
        "category": "Dining & Kitchen",
        "subCategory": "Drinkware & Steins",
        "material": "Seasoned Hardwood with Food-Grade Stainless Steel Inner Liner",
        "colorFinish": "Rustic Barrel Stave Wood with Carved Handle",
        "dimensions": {"length": 16, "width": 12, "height": 14, "unit": "cm"},
        "weightKg": 0.58,
        "shortDescription": "Handcrafted Viking-style wooden beer mug with insulated steel interior.",
        "description": "Channel ancient feast halls with this rustic Viking-style beer stein. Hand-carved from seasoned wood with a hygienic food-grade stainless steel cup inside that keeps your brews frosty cold.",
        "highlights": [
            "Rust-proof stainless steel inner cup retains icy beverage temperature",
            "Solid wooden exterior carved in barrel aesthetic",
            "Ergonomic sturdy handle for confident grip",
            "Generous 500ml holding capacity"
        ]
    },
    "geometric": {
        "category": "Dining & Kitchen",
        "subCategory": "Drinkware & Coffee Mugs",
        "material": "Brushed Stainless Steel with Geometric Carved Wooden Grip",
        "colorFinish": "Matte Steel & Rich Teak Handle",
        "dimensions": {"length": 13, "width": 9, "height": 11, "unit": "cm"},
        "weightKg": 0.32,
        "shortDescription": "Modern insulated steel coffee mug with a faceted geometric wooden handle.",
        "description": "Blending industrial steel durability with handcrafted organic warmth, this modern coffee mug features double-wall insulation and a hand-shaped faceted wooden handle.",
        "highlights": [
            "Faceted geometric solid wood handle stays cool to the touch",
            "Double-wall food-grade steel keeps coffee piping hot",
            "Contemporary Scandinavian-Indian fusion aesthetic"
        ]
    },
    "goodmorning": {
        "category": "Dining & Kitchen",
        "subCategory": "Drinkware & Coffee Mugs",
        "material": "Artisan Hardwood with Food-Safe Steel Core",
        "colorFinish": "Warm Caramel Wood Finish with Laser Engraving",
        "dimensions": {"length": 14, "width": 10, "height": 12, "unit": "cm"},
        "weightKg": 0.38,
        "shortDescription": "Good Morning engraved artisan wooden coffee mug with stainless steel liner.",
        "description": "Start every day on an uplifting note. Handcrafted from fine wood and engraved with 'Good Morning', this mug pairs charming rustic style with daily drinking convenience.",
        "highlights": [
            "Engraved artisan quote brings morning positivity",
            "Hygienic stainless steel liner for hot chai or coffee",
            "Thoughtful gift for family, friends, and colleagues"
        ]
    },
    "diabetescontrolglass": {
        "category": "Dining & Kitchen",
        "subCategory": "Ayurvedic Health Utensils",
        "material": "100% Pure Natural Seasoned Jamun Wood (Syzygium cumini)",
        "colorFinish": "Natural Untreated Herbal Wood Grain",
        "dimensions": {"length": 8, "width": 8, "height": 14, "unit": "cm"},
        "weightKg": 0.28,
        "shortDescription": "Authentic Ayurvedic Diabetes Control herbal glass carved from pure Jamun wood.",
        "description": "Based on traditional Ayurvedic remedies, filling this natural Jamun wood glass with water overnight allows herbal juices and bioactive compounds to infuse into the water, helping maintain natural blood sugar balance.",
        "highlights": [
            "Carved from 100% pure authentic medicinal Jamun wood",
            "Traditional Ayurvedic vessel used for overnight water infusion",
            "Completely natural, unpolished and chemical-free",
            "Eco-friendly holistic wellness drinking glass"
        ]
    },
    "mortarandpestle": {
        "category": "Dining & Kitchen",
        "subCategory": "Spice Grinders & Mortars",
        "material": "Dense Seasoned Sheesham Hardwood",
        "colorFinish": "Smooth Lathed Natural Walnut Polish",
        "dimensions": {"length": 12, "width": 12, "height": 11, "unit": "cm"},
        "weightKg": 0.65,
        "shortDescription": "Handcrafted wooden mortar and pestle set (Okhli Musal) for fresh herbs & spices.",
        "description": "Crush fresh ginger, garlic, cardamom, and whole peppercorns the authentic way with this heavy solid wood Okhli Musal set. The deep basin prevents spices from leaping out while pounding.",
        "highlights": [
            "Solid one-piece hardwood withstands daily crushing and pounding",
            "Deep bowl basin contains seeds, cloves, and whole spices",
            "Comfort-fit pestle handle maximizes crushing torque",
            "Preserves natural essential oils and aromas of fresh spices"
        ]
    },

    # BRASS & METAL (Diyas, bells, sacred metalcraft)
    "roundcutworkbrassdiya": {
        "category": "Brass & Metal",
        "subCategory": "Pooja Diyas & Lamps",
        "material": "100% Solid Pure Virgin Brass",
        "colorFinish": "Traditional Golden Gloss with Etched Cutwork",
        "dimensions": {"length": 8, "width": 8, "height": 5, "unit": "cm"},
        "weightKg": 0.32,
        "shortDescription": "Set of 3 round cutwork brass diyas creating hypnotic shadow patterns when lit.",
        "description": "Cast by Moradabad brass smiths, this set of 3 round diyas features precision lattice cutouts. When lit, glowing flames cast breathtaking floral shadow halos across your prayer altar or festive porch.",
        "highlights": [
            "Set of 3 round jali cutwork brass oil lamps",
            "Intricate side cutouts create radiant starburst reflections",
            "Solid heavy brass base stays stable and wind-resistant",
            "Long-burning oil reservoir ideal for Diwali and daily pooja"
        ]
    },
    "squarecutworkbrassdiya": {
        "category": "Brass & Metal",
        "subCategory": "Pooja Diyas & Lamps",
        "material": "Solid Pure Virgin Brass",
        "colorFinish": "Polished Golden Luster",
        "dimensions": {"length": 8, "width": 8, "height": 5, "unit": "cm"},
        "weightKg": 0.35,
        "shortDescription": "Set of 3 square cutwork brass pooja diyas with decorative lattice filigree.",
        "description": "A striking geometric variation of traditional oil lamps, this set of 3 square brass diyas features ornate cutout lattices that project mesmerizing geometric shadows during evening prayers.",
        "highlights": [
            "Set of 3 square filigree brass lamps",
            "Modern architectural geometric profile with traditional heritage craft",
            "Pure virgin brass ensures decades of festive use without tarnishing easily"
        ]
    },
    "hexagonalcutworkbrassdiya": {
        "category": "Brass & Metal",
        "subCategory": "Pooja Diyas & Lamps",
        "material": "Pure Cast Brass",
        "colorFinish": "Gleaming Antique Gold Polish",
        "dimensions": {"length": 7.5, "width": 7.5, "height": 4.5, "unit": "cm"},
        "weightKg": 0.28,
        "shortDescription": "Set of 3 hexagonal cutwork brass deepaks with delicate lattice apertures.",
        "description": "Six-sided sacred hexagonal geometry crafted from pure Moradabad brass. The perforated side panels disperse flame light in six radiant directions, symbolizing auspicious harmony.",
        "highlights": [
            "Set of 3 hexagonal jali oil lamps",
            "Auspicious 6-pointed radiance pattern",
            "Easy to clean with pitambari or lemon juice"
        ]
    },
    "lotusstarleafcutworkbrassdiya": {
        "category": "Brass & Metal",
        "subCategory": "Pooja Diyas & Lamps",
        "material": "Solid Pure Cast Brass",
        "colorFinish": "Radiant Golden Brass Glow",
        "dimensions": {"length": 9, "width": 9, "height": 5.5, "unit": "cm"},
        "weightKg": 0.38,
        "shortDescription": "Set of 3 lotus star leaf cutwork brass diyas with petal-shaped silhouette.",
        "description": "Shaped like blooming sacred lotus petals combined with starburst cutouts, this set of 3 brass deepaks infuses your prayer mandir with serene spiritual glow.",
        "highlights": [
            "Set of 3 petal-contoured lotus star diyas",
            "Deep oil bowl accommodates long-burning cotton wicks",
            "Auspicious lotus design honoring Goddess Lakshmi"
        ]
    },
    "starleafcutworkbrassdiyas": {
        "category": "Brass & Metal",
        "subCategory": "Pooja Diyas & Lamps",
        "material": "Heavyweight Cast Brass",
        "colorFinish": "Gleaming Gold Polish",
        "dimensions": {"length": 9, "width": 9, "height": 5, "unit": "cm"},
        "weightKg": 0.4,
        "shortDescription": "Set of 3 star leaf cutwork brass diyas with ornate filigree perforations.",
        "description": "Elevate your festive illumination with these star-patterned cutwork oil lamps. The thick brass rim prevents overheating while casting delicate starry patterns on walls and floors.",
        "highlights": [
            "Set of 3 star-leaf motif brass oil lamps",
            "Thick brass alloy provides superior thermal tolerance",
            "Perfect for Diwali, Navratri, and wedding pooja altars"
        ]
    },
    "antiquelordkrishnaflutediyastand": {
        "category": "Brass & Metal",
        "subCategory": "Idols & Stand Diyas",
        "material": "Solid Cast Brass with Antique Patina",
        "colorFinish": "Antique Vintage Brass Finish",
        "dimensions": {"length": 14, "width": 10, "height": 22, "unit": "cm"},
        "weightKg": 0.85,
        "shortDescription": "Handcrafted antique Lord Krishna playing flute brass diya stand.",
        "description": "A magnificent brass sculpture capturing Lord Krishna in tribhanga posture playing his divine flute, set upon an ornate lotus pedestal with an integrated pooja oil lamp.",
        "highlights": [
            "Intricately detailed sculpture of Lord Krishna playing bansuri",
            "Integrated front deepak for daily ghee or oil lighting",
            "Timeless antique bronze-gold patina adds divine grace",
            "Heavy stable base prevents tipping"
        ]
    },
    "sundialpoojadiya": {
        "category": "Brass & Metal",
        "subCategory": "Pooja Diyas & Lamps",
        "material": "Pure Virgin Brass",
        "colorFinish": "Heritage Golden Luster",
        "dimensions": {"length": 10, "width": 10, "height": 6, "unit": "cm"},
        "weightKg": 0.48,
        "shortDescription": "Set of 3 sun dial inspired brass pooja diyas with solar ray motifs.",
        "description": "Inspired by the celestial sun dial (Surya Yantra), these 3 brass lamps feature radiated fluted edges that mimic blazing sun rays around a sacred central flame.",
        "highlights": [
            "Set of 3 Surya-inspired sun dial oil lamps",
            "Scalloped sunbeam borders guide flame reflection upwards",
            "Solid heavy brass construction for generational prayer rituals"
        ]
    },
    "handpaintedbrasslotusdiya": {
        "category": "Brass & Metal",
        "subCategory": "Decorative Diyas",
        "material": "Solid Brass with Enamel Meenakari Art",
        "colorFinish": "Vibrant Multicolored Floral Meenakari on Brass",
        "dimensions": {"length": 8, "width": 8, "height": 4.5, "unit": "cm"},
        "weightKg": 0.36,
        "shortDescription": "Set of 3 hand-painted Meenakari brass lotus diyas with vibrant floral artwork.",
        "description": "Combining heavy cast brass with colorful Rajasthani Meenakari enamel painting, this set of 3 lotus lamps brings vivid jewel-toned splendor to Diwali and festive celebrations.",
        "highlights": [
            "Set of 3 hand-painted Meenakari lotus flower diyas",
            "Rich jewel tones resist heat and wax residue",
            "Auspicious pooja centerpiece and festive gifting favorite"
        ]
    },
    "handpaintedredbrasslotusdiya": {
        "category": "Brass & Metal",
        "subCategory": "Decorative Diyas",
        "material": "Solid Brass with Crimson Red Enamel",
        "colorFinish": "Royal Crimson Red & Gold Trim",
        "dimensions": {"length": 7.5, "width": 7.5, "height": 4, "unit": "cm"},
        "weightKg": 0.28,
        "shortDescription": "Set of 3 hand-painted red brass lotus diyas with auspicious gold accents.",
        "description": "Finished in vibrant auspicious vermilion red enamel accented with golden brass petal borders, this set of 3 lotus diyas evokes prosperity, devotion, and festive warmth.",
        "highlights": [
            "Set of 3 crimson red lotus oil lamps",
            "Deep sacred red hue honoring traditional Vedic pooja rituals",
            "Durable baked enamel finish retains vibrant color"
        ]
    },
    "antiquesilverpeacockpanchmukhidiya": {
        "category": "Brass & Metal",
        "subCategory": "Stand Diyas & Lamps",
        "material": "White Metal Alloy with Antique Silver Oxidized Finish",
        "colorFinish": "Oxidized Antique Silver Patina",
        "dimensions": {"length": 12, "width": 12, "height": 18, "unit": "cm"},
        "weightKg": 0.48,
        "shortDescription": "Antique silver finish Panchmukhi (5-wick) peacock diya stand.",
        "description": "Featuring a crowned Mayura (peacock) finial perched above a five-wick sacred oil reservoir, this oxidized silver diya stand illuminates five cardinal directions simultaneously.",
        "highlights": [
            "Panchmukhi (5 wicks) design for complete directional pooja illumination",
            "Hand-carved royal peacock archway detailing",
            "Oxidized antique silver patina creates heritage temple appearance"
        ]
    },
    "dancinglordganeshapanchmukhidiya": {
        "category": "Brass & Metal",
        "subCategory": "Stand Diyas & Idols",
        "material": "Pure Cast Brass with Antique Highlights",
        "colorFinish": "Two-Tone Antique Brass & Copper Tint",
        "dimensions": {"length": 13, "width": 11, "height": 19, "unit": "cm"},
        "weightKg": 0.55,
        "shortDescription": "Dancing Lord Ganesha Panchmukhi 5-wick brass diya stand.",
        "description": "Lord Nritya Ganesha dances gracefully atop an auspicious 5-flame lotus lamp. Lighting the five wicks dispels obstacles, ignorance, and darkness while welcoming prosperity.",
        "highlights": [
            "Sculptural depiction of dancing Ganesha with modak and trishul",
            "Panchmukhi 5-wick oil dish for elaborate aarti ceremonies",
            "Stable round pedestal ensures secure altar placement"
        ]
    },
    "traditionalbrasssudarshanachakradiya": {
        "category": "Brass & Metal",
        "subCategory": "Sacred Pooja Diyas",
        "material": "Pure Virgin Cast Brass",
        "colorFinish": "Golden Mirror Finish",
        "dimensions": {"length": 9, "width": 9, "height": 5, "unit": "cm"},
        "weightKg": 0.45,
        "shortDescription": "Set of 3 traditional brass Sudarshana Chakra sacred deepaks.",
        "description": "Modeled after the protective cosmic discus of Lord Vishnu, this set of 3 Sudarshana Chakra lamps features serrated wheel rims and sacred emblems to bring divine protection and peace.",
        "highlights": [
            "Set of 3 Sudarshana Chakra deepaks",
            "Sacred Vaishnava symbolism representing the victory of light over dark",
            "Thick heavy brass casting with long-lasting polished sheen"
        ]
    },
    "traditionalbrassshankhdiya": {
        "category": "Brass & Metal",
        "subCategory": "Sacred Pooja Diyas",
        "material": "Pure Virgin Cast Brass",
        "colorFinish": "Polished Golden Brass",
        "dimensions": {"length": 10, "width": 7, "height": 5, "unit": "cm"},
        "weightKg": 0.42,
        "shortDescription": "Set of 3 traditional brass Shankh (conch shell) sacred pooja diyas.",
        "description": "Crafted in the auspicious contour of the sacred conch shell (Shankha), this set of 3 brass diyas invokes spiritual purity and tranquility during home prayers and rituals.",
        "highlights": [
            "Set of 3 Shankh-shaped brass oil lamps",
            "Auspicious conch shell design associated with Lakshmi and Vishnu",
            "Natural ergonomic wick spout provides clean directional flame"
        ]
    },
    "kamaldeepamkamaladiya": {
        "category": "Brass & Metal",
        "subCategory": "Pooja Diyas & Lamps",
        "material": "Solid Pure Brass",
        "colorFinish": "Golden Brass Glow",
        "dimensions": {"length": 7, "width": 7, "height": 3.5, "unit": "cm"},
        "weightKg": 0.12,
        "shortDescription": "Traditional Kamal Deepam / Kamala lotus blossom brass diya.",
        "description": "An authentic South Indian style single-piece brass lotus lamp (Kamal Deepam) featuring tiered petals opening outward to cradle the sacred flame.",
        "highlights": [
            "Single lotus blossom cast brass lamp",
            "Compact footprint ideal for home mandir shelves and urlis",
            "Easy maintenance with standard brass polish"
        ]
    },
    "lotusbasebrasskapoordani": {
        "category": "Brass & Metal",
        "subCategory": "Ritual Burners & Pooja Essentials",
        "material": "Solid Pure Brass",
        "colorFinish": "Golden Polish with Heat-Resistant Handle",
        "dimensions": {"length": 11, "width": 8, "height": 6, "unit": "cm"},
        "weightKg": 0.18,
        "shortDescription": "Handcrafted lotus base brass Kapoor Dani (camphor burner / dhoop aarti).",
        "description": "Perform soothing camphor aarti with this lotus-pedestal brass Kapoor Dani. Designed with a sturdy base to diffuse fragrant camphor and dhoop smoke through living spaces.",
        "highlights": [
            "Auspicious lotus base safely contains burning camphor",
            "Purifies indoor atmosphere and drives away negative energy",
            "Durable virgin brass construction withstands direct flame heat"
        ]
    },
    "theazurebloomdiya": {
        "category": "Brass & Metal",
        "subCategory": "Decorative Diyas",
        "material": "Cast Metal Brass Alloy with Glazed Azure Enamel",
        "colorFinish": "Azure Turquoise Blue with Golden Accents",
        "dimensions": {"length": 9, "width": 9, "height": 5, "unit": "cm"},
        "weightKg": 0.46,
        "shortDescription": "The Azure Bloom set of 4 multicolor hand-glazed floral diyas.",
        "description": "Inspired by royal Persian-Indian turquoise glazes, this set of 4 Azure Bloom lamps features vibrant oceanic blue enamel paired with bright golden metal borders.",
        "highlights": [
            "Set of 4 artisan Azure Bloom multicolor floral lamps",
            "Vibrant enamel finish glows brilliantly under evening candlelight",
            "Stunning decorative addition for festive rangolis and dining setups"
        ]
    },
    "zenchimeorshopentrybell": {
        "category": "Brass & Metal",
        "subCategory": "Bells & Chimes",
        "material": "Solid Cast Bell Brass with Wooden Mounting Block",
        "colorFinish": "Vintage Brass Bell with Walnut Magnet Mount",
        "dimensions": {"length": 8, "width": 5, "height": 10, "unit": "cm"},
        "weightKg": 0.32,
        "shortDescription": "Artisan solid brass shopkeeper's entry bell / Zen chime with wooden mount.",
        "description": "Emitting a sweet, resonant and harmonic chime whenever doors open, this handcrafted brass bell attaches effortlessly to door frames via magnetic and adhesive mounts.",
        "highlights": [
            "Tuned solid brass clapper produces clear, soothing harmonic tone",
            "Dual mounting: magnetic backing for metal doors and adhesive pad for wood",
            "Brings Zen peace, positive vastu vibes, and alert notification to shops & homes"
        ]
    },

    # HOME DECOR (Statues, idols, wall hangings, figurines, showpieces)
    "buddhaheadstatue": {
        "category": "Home Decor",
        "subCategory": "Statues & Sculptures",
        "material": "Hand-Carved Single Block Kadam / Sheesham Wood",
        "colorFinish": "Antique Matte Wood Patina",
        "dimensions": {"length": 12, "width": 10, "height": 18, "unit": "cm"},
        "weightKg": 0.65,
        "shortDescription": "Handcrafted traditional wooden Buddha head statue with meditative serene countenance.",
        "description": "Carved with sublime meditative expression, curly ushnisha topknot, and elongated earlobes, this solid wooden Buddha head sculpture radiates serenity, mindfulness, and zen balance.",
        "highlights": [
            "Chiseled from a single solid piece of seasoned timber",
            "Sublime serene expression promotes calm and focused energy",
            "Ideal for study desks, meditation spaces, and living room consoles"
        ]
    },
    "ashokstambh": {
        "category": "Home Decor",
        "subCategory": "Heritage Showpieces & Sculptures",
        "material": "Handcrafted Fine Grain Sheesham Wood",
        "colorFinish": "Natural Walnut Lustre with Chiseled Relief",
        "dimensions": {"length": 10, "width": 10, "height": 24, "unit": "cm"},
        "weightKg": 0.72,
        "shortDescription": "Handcrafted wooden Ashoka Stambh (Lion Capital of Ashoka) desk showpiece.",
        "description": "An authentic woodcraft tribute to the Lion Capital of Ashoka, the National Emblem of India. Master artisans hand-carve the four roaring lions, Ashoka Chakra, and circular abacus with meticulous precision.",
        "highlights": [
            "Intricately carved four Asiatic lions and Ashoka Chakra wheels",
            "Symbol of truth, courage, and constitutional sovereignty",
            "Prestigious desk showpiece for offices, libraries, and study rooms"
        ]
    },
    "coffinincenseburnerbox": {
        "category": "Home Decor",
        "subCategory": "Incense Burners & Aromatherapy",
        "material": "Solid Sheesham Wood with Brass Inlay Stars",
        "colorFinish": "Hand-Polished Antique Walnut Finish",
        "dimensions": {"length": 31, "width": 6, "height": 7, "unit": "cm"},
        "weightKg": 0.42,
        "shortDescription": "Handcrafted traditional wooden coffin incense burner box with hidden storage compartment.",
        "description": "This famous coffin-style incense box catches all falling ash inside while aromatic smoke billows gracefully through ornate lattice lid carvings. Features a secret lower storage compartment for unburnt sticks.",
        "highlights": [
            "Catches 100% of burning ash—no more messy table cleanups",
            "Integrated storage cavity at base holds up to 25 extra incense sticks",
            "Dual-purpose: holds both incense sticks (agarbatti) and dhoop cones",
            "Intricate brass star and moon inlays adorn the wooden exterior"
        ]
    },
    "pyramidincenseboxburner": {
        "category": "Home Decor",
        "subCategory": "Incense Burners & Aromatherapy",
        "material": "Solid Sheesham Wood with Carved Jali Panels",
        "colorFinish": "Warm Honey Amber Polish",
        "dimensions": {"length": 12, "width": 12, "height": 16, "unit": "cm"},
        "weightKg": 0.35,
        "shortDescription": "Handcrafted wooden pyramid dhoop & incense box burner with openwork fretwork.",
        "description": "Shaped as a sacred pyramid with delicate fretwork on all four faces, this burner gently channels dhoop smoke upward in mystical aromatic plumes while shielding furniture from hot embers.",
        "highlights": [
            "Architectural pyramid structure directs fragrance evenly across rooms",
            "Safe enclosed burning chamber protects children and pets from open flame",
            "Latticed fretwork creates captivating dancing shadows in dim lighting"
        ]
    },
    "radhakrishna": {
        "category": "Home Decor",
        "subCategory": "Idols & Spiritual Figurines",
        "material": "Oxidized White Metal Brass Alloy",
        "colorFinish": "Antique Golden Bronze Patina",
        "dimensions": {"length": 18, "width": 10, "height": 22, "unit": "cm"},
        "weightKg": 0.78,
        "shortDescription": "Divine Radha Krishna under the wish-fulfilling Kalpavriksha tree statue.",
        "description": "Depicting the divine eternal lovers Radha and Krishna beneath the sacred Kalpavriksha tree alongside a devoted cow (Kamadhenu), this metal sculpture radiates love, harmony, and celestial blessings.",
        "highlights": [
            "Intricately rendered Kalpavriksha tree canopy with lush leaf textures",
            "Radha and Krishna with flute and Kamadhenu cow at base",
            "Brings marital harmony, tranquility, and divine energy to homes"
        ]
    },
    "metallordkrishnaplayingflute": {
        "category": "Home Decor",
        "subCategory": "Idols & Spiritual Figurines",
        "material": "Fine Cast Metal with Antique Brass Coating",
        "colorFinish": "Antique Brass Glow with Black Shadow Shading",
        "dimensions": {"length": 16, "width": 9, "height": 20, "unit": "cm"},
        "weightKg": 0.68,
        "shortDescription": "Metal Lord Krishna playing flute beneath the sacred Kalpavriksha tree statue.",
        "description": "Lord Murli Manohar Krishna plays his enchanting bansuri beneath the holy Kalpavriksha tree while peacocks listen atop the branches. A masterpiece of traditional metal figurine art.",
        "highlights": [
            "Fine lost-wax cast detailing on Krishna's peacock feather crown (Mor Mukut)",
            "Detailed floral tree branches sheltering the divine flutist",
            "Perfect centerpiece for living room console, mantle, or home temple"
        ]
    },
    "modernhandcraftedpagdiganesha": {
        "category": "Home Decor",
        "subCategory": "Idols & Statues",
        "material": "Solid Cast White Metal Brass Alloy",
        "colorFinish": "Antique Golden Bronze Patina",
        "dimensions": {"length": 12, "width": 8, "height": 15, "unit": "cm"},
        "weightKg": 0.52,
        "shortDescription": "Modern handcrafted Pagdi Ganesha metal idol adorned with royal turban.",
        "description": "Lord Ganesha adorned in a majestic traditional Indian turban (Pagdi) with his right hand raised in the Abhaya Mudra blessing. An auspicious guardian idol for entryways and desks.",
        "highlights": [
            "Royal traditional Pagdi (turban) headwear sculpture",
            "Abhaya Mudra blessing gesture brings peace and prosperity",
            "Compact footprint fits desks, car dashboards, and entrance niches"
        ]
    },
    "modernhandcraftedganeshaonrockingchair": {
        "category": "Home Decor",
        "subCategory": "Idols & Statues",
        "material": "Fine Cast Metal Alloy",
        "colorFinish": "Antique Gold and Copper Finish",
        "dimensions": {"length": 14, "width": 9, "height": 16, "unit": "cm"},
        "weightKg": 0.58,
        "shortDescription": "Modern handcrafted Lord Ganesha relaxing on rocking chair metal idol.",
        "description": "A delightful contemporary interpretation of Lord Ganesha in a relaxed posture seated comfortably upon a detailed rocking chair, reading a sacred scripture while blessing the household.",
        "highlights": [
            "Whimsical contemporary design blending heritage devotion with modern flair",
            "Functional gentle rocking motion adds interactive charm",
            "Captivating conversation starter for living room coffee tables"
        ]
    },
    "esplanadebrassganeshawallhangingdeepak": {
        "category": "Home Decor",
        "subCategory": "Wall Decor & Hangings",
        "material": "100% Solid Pure Virgin Brass",
        "colorFinish": "Hand-Polished Antique Brass Luster",
        "dimensions": {"length": 14, "width": 10, "height": 24, "unit": "cm"},
        "weightKg": 1.1,
        "shortDescription": "eSplanade heavy brass Ganesha wall hanging deepak with hanging musical bells.",
        "description": "A grand solid brass wall sconce featuring Lord Ganesha seated inside a Prabhavali arch, with a projecting oil diya and dangling musical temple bells below that chime gently in breezes.",
        "highlights": [
            "Cast from heavy virgin brass by master temple artisans",
            "Features dangling brass bells that tinkle with natural air movement",
            "Integrated wall mounting bracket on reverse",
            "Magnificent entryway and pooja room statement piece"
        ]
    },
    "elephant": {
        "category": "Home Decor",
        "subCategory": "Figurines & Showpieces",
        "material": "Oxidized White Metal with Intricate Filigree",
        "colorFinish": "Antique Silver-Black Oxidized Finish",
        "dimensions": {"length": 15, "width": 10, "height": 17, "unit": "cm"},
        "weightKg": 0.62,
        "shortDescription": "Oxidized metal royal elephant Singhasan (throne) with royal umbrella (Chatra).",
        "description": "A majestic royal elephant supporting a sacred pedestal throne beneath a carved royal umbrella (Chatra). Often used as a decorative royal seat for placing mini idols or as an opulent showcase figurine.",
        "highlights": [
            "Elephant adorned in royal ceremonial howdah and trunk ornaments",
            "Removable filigree Chatra umbrella finial",
            "Perfect sacred platform for Laddu Gopal or small deity idols"
        ]
    },
    "ecraftindialovinggoldenswancouple": {
        "category": "Home Decor",
        "subCategory": "Showpieces & Figurines",
        "material": "Fine Cast Metal with 24K Gold Tone Electroplating",
        "colorFinish": "Brilliant Golden Luster with Textural Etching",
        "dimensions": {"length": 18, "width": 9, "height": 23, "unit": "cm"},
        "weightKg": 0.72,
        "shortDescription": "eCraftIndia loving golden swan couple figurine symbolizing eternal romance.",
        "description": "Depicting two graceful swans with their curved necks intertwined to form a subtle heart shape, this elegant golden sculpture symbolizes enduring love, fidelity, and marital harmony.",
        "highlights": [
            "Twin swans forming a romantic heart silhouette",
            "Gleaming mirror gold electroplated coating resists oxidation",
            "Acclaimed anniversary and wedding celebration gift"
        ]
    },
    "rosegoldmetallicleaftealightholder": {
        "category": "Home Decor",
        "subCategory": "Candle Holders & Votives",
        "material": "Hand-Beaten Iron & Brass Alloy with Rose Gold Foil",
        "colorFinish": "Luminous Rose Gold Metallic Finish",
        "dimensions": {"length": 13, "width": 9, "height": 5, "unit": "cm"},
        "weightKg": 0.16,
        "shortDescription": "Artisan hand-hammered rose gold metallic leaf tealight candle holder.",
        "description": "Embossed with delicate leaf veining and curled edges, this metallic leaf votive cradles standard tealights, casting a warm golden-pink aura across dinner tables and credenzas.",
        "highlights": [
            "Hand-hammered botanical leaf form with organic veining",
            "Lustrous rose gold metallic finish reflects candlelight beautifully",
            "Compact accent for romantic dinners, festivities, and spa corners"
        ]
    },
    "vastubrasstortoise": {
        "category": "Home Decor",
        "subCategory": "Vastu & Feng Shui Accents",
        "material": "Solid Pure Virgin Brass with Beveled Glass Dish",
        "colorFinish": "Golden Brass Turtle with Clear Glass Plate",
        "dimensions": {"length": 14, "width": 14, "height": 4, "unit": "cm"},
        "weightKg": 0.45,
        "shortDescription": "Vastu auspicious brass tortoise (Kurma) resting upon a clear glass plate.",
        "description": "According to Vedic Vastu and Feng Shui traditions, placing a brass tortoise in water in the North direction attracts wealth, longevity, career growth, and removes negative energy from home and office.",
        "highlights": [
            "Solid virgin brass tortoise with inscribed yantra carapace",
            "Accompanied by a heavy beveled glass water bowl",
            "Auspicious Vastu tool for career prosperity and longevity"
        ]
    },

    # WOOD CRAFTS (Traditional wood artisanal curios, watches, games, accessories)
    "pocketwatch": {
        "category": "Wood Crafts",
        "subCategory": "Vintage Curios & Pocket Watches",
        "material": "Antique Brass & Bronze Alloy with Mechanical Quartz Movement",
        "colorFinish": "Antiqued Bronze Patina with Engraved Relief",
        "dimensions": {"length": 5, "width": 5, "height": 1.5, "unit": "cm"},
        "weightKg": 0.12,
        "shortDescription": "Handcrafted vintage ornate pocket watch with matching chain & filigree fob.",
        "description": "Evoking Victorian railway elegance, this handcrafted pocket watch features deeply embossed casing, vintage Roman numeral dial, and a sturdy 32cm vest chain with clip.",
        "highlights": [
            "Precision Japanese quartz movement keeps accurate time",
            "Intricately embossed collector's casing with push-button release",
            "Includes heavy brass vest chain with belt clip",
            "Distinctive heritage heirloom gift for watch aficionados"
        ]
    },
    "catapult": {
        "category": "Wood Crafts",
        "subCategory": "Traditional Games & Folk Crafts",
        "material": "Seasoned Hardwood Fork with Heavy-Duty Latex Bands & Leather Pouch",
        "colorFinish": "Natural Wood Bark & Smooth Sanded Grip",
        "dimensions": {"length": 19, "width": 9, "height": 3, "unit": "cm"},
        "weightKg": 0.18,
        "shortDescription": "Traditional Indian handcrafted wooden catapult (Gulel) with natural ergonomic fork.",
        "description": "Revisit nostalgic childhood village memories with this handcrafted wooden catapult (Gulel). Carved from naturally branched hardwood forks with strong elastic latex bands and genuine leather pouch.",
        "highlights": [
            "Hand-carved from sturdy natural hardwood fork",
            "High-tensile rubber elastic bands with real leather ammo cup",
            "Classic folk craft toy and rustic nostalgic collector's item"
        ]
    },
    "woodenhaircomb": {
        "category": "Wood Crafts",
        "subCategory": "Personal Care & Hair Accessories",
        "material": "100% Pure Natural Seasoned Sheesham / Neem Wood",
        "colorFinish": "Natural Unvarnished Wood with Smooth Buffed Teeth",
        "dimensions": {"length": 19, "width": 5, "height": 1, "unit": "cm"},
        "weightKg": 0.08,
        "shortDescription": "Handcrafted dual-tooth wooden hair comb set for anti-static natural hair care.",
        "description": "Unlike plastic combs that create static frizz and hair breakage, this hand-carved wooden comb glides effortlessly through hair, gently massaging the scalp and stimulating natural hair oils.",
        "highlights": [
            "100% natural herbal wood prevents static electricity and hair damage",
            "Seamless rounded teeth gently stimulate scalp acupressure points",
            "Natural wood fibers distribute conditioning scalp oils evenly"
        ]
    },
    "tictactoe": {
        "category": "Wood Crafts",
        "subCategory": "Traditional Games & Puzzles",
        "material": "Dual-Tone Solid Sheesham & Haldu Wood with Brass Inlay",
        "colorFinish": "Rich Walnut and Natural Blonde Contrast with Brass Inlay",
        "dimensions": {"length": 12, "width": 12, "height": 3.5, "unit": "cm"},
        "weightKg": 0.28,
        "shortDescription": "Handcrafted dual-tone wooden Tic-Tac-Toe (XOX) travel board game with brass inlay.",
        "description": "Ditch digital screens with this heirloom wooden Tic-Tac-Toe board game. Hand-turned brass-inlaid X and O game tokens fit neatly into individual square grid pockets for hours of tactical fun.",
        "highlights": [
            "Solid hardwood playing board with golden brass inlays",
            "Heavy sculpted wooden X and O tokens",
            "Tactile tabletop coffee table decor that guests love to pick up and play"
        ]
    },
    "coconutshell": {
        "category": "Wood Crafts",
        "subCategory": "Artisanal Bags & Wearables",
        "material": "Reclaimed Polished Natural Coconut Shell with Cotton Lining & Zipper",
        "colorFinish": "Smooth Buffed Natural Coconut Shell Texture",
        "dimensions": {"length": 13, "width": 13, "height": 9, "unit": "cm"},
        "weightKg": 0.19,
        "shortDescription": "Handcrafted eco-friendly Coconut Shell wristlet purse with secure zipper.",
        "description": "Handmade from genuine discarded coconut shells that are buffed to a silky luster, lined with soft fabric, and fitted with a zip and wristlet cord. A triumphant statement of eco-sustainable tribal fashion.",
        "highlights": [
            "Crafted from 100% upcycled real coconut shell",
            "Smooth water-resistant polished exterior with unique organic contour",
            "Secure zipper closure with comfortable wrist carrying loop"
        ]
    },
    "walkingrule": {
        "category": "Wood Crafts",
        "subCategory": "Health & Acupressure Woodcraft",
        "material": "Seasoned Solid Hardwood with Acupressure Ridges",
        "colorFinish": "Smooth Lathed Natural Wood Finish",
        "dimensions": {"length": 30, "width": 4.5, "height": 4.5, "unit": "cm"},
        "weightKg": 0.26,
        "shortDescription": "Handcrafted wooden morning walking ruler with therapeutic acupressure ridges.",
        "description": "Designed for morning wellness walks and home reflexology, rolling this ridged hardwood ruler under your feet activates vital acupressure points, boosting blood circulation and relieving fatigue.",
        "highlights": [
            "Concentric ribbed ridges stimulate foot reflexology and nerve endings",
            "Hand-turned from dense hardwood that withstands full body pressure",
            "Compact daily wellness companion for desk workers and elderly health"
        ]
    },
    "yoyo": {
        "category": "Wood Crafts",
        "subCategory": "Traditional Toys & Folk Craft",
        "material": "Natural Seasoned Wood with Non-Toxic Hand Paint",
        "colorFinish": "Vibrant Red & Black Ladybug Hand-Painted Motif",
        "dimensions": {"length": 6, "width": 6, "height": 3.5, "unit": "cm"},
        "weightKg": 0.09,
        "shortDescription": "Handcrafted wooden cartoon ladybug yo-yo spinner toy for kids.",
        "description": "A delightful wooden spinning yo-yo hand-painted in joyful ladybug colors. Perfectly weighted for smooth gravity-defying tricks and screen-free developmental play for kids of all ages.",
        "highlights": [
            "Smooth child-safe rounded wood edges with non-toxic colors",
            "Balanced center axle for responsive spinning and recoil",
            "Nostalgic folk craft toy encouraging hand-eye coordination"
        ]
    }
}

def determine_metadata(folder_name):
    norm = normalize_key(folder_name)
    
    # Check specific keyword overrides
    for key, meta in PRODUCT_METADATA.items():
        if key in norm:
            return meta
            
    # Category heuristics if not matched directly
    if any(k in norm for k in ['diya', 'deepak', 'brass', 'metal', 'bell', 'shankh', 'chakra', 'kapoor', 'chime']):
        return PRODUCT_METADATA["roundcutworkbrassdiya"]
    elif any(k in norm for k in ['bowl', 'spoon', 'spatula', 'mug', 'cup', 'coaster', 'tray', 'platter', 'chapati', 'mortar', 'pestle', 'glass']):
        return PRODUCT_METADATA["chaklabelan"]
    elif any(k in norm for k in ['statue', 'idol', 'krishna', 'ganesha', 'buddha', 'elephant', 'swan', 'holder', 'burner', 'incense', 'stambh', 'tortoise']):
        return PRODUCT_METADATA["buddhaheadstatue"]
    else:
        return PRODUCT_METADATA["catapult"]

def format_title(folder_name):
    title = folder_name.strip()
    title = re.sub(r'\s+', ' ', title)
    # Capitalize appropriately
    words = title.split()
    capitalized = []
    for w in words:
        if w.lower() in ['and', '&', 'of', 'for', 'with', 'in', 'on', 'the', 'a', 'an']:
            capitalized.append(w.lower())
        else:
            capitalized.append(w.capitalize())
    res = ' '.join(capitalized)
    if res and res[0].islower():
        res = res[0].upper() + res[1:]
    return res

def scan_products():
    excel_prices = load_excel_prices()
    products = []
    
    source_dirs = [
        ("wood crafts", os.path.join(PUBLIC_PRODUCTS_DIR, "wood crafts")),
        ("metal crafts", os.path.join(PUBLIC_PRODUCTS_DIR, "metal crafts"))
    ]
    
    sku_counter = 100
    
    for craft_type, craft_path in source_dirs:
        if not os.path.exists(craft_path):
            continue
            
        folders = sorted(os.listdir(craft_path))
        for folder in folders:
            folder_path = os.path.join(craft_path, folder)
            if not os.path.isdir(folder_path):
                continue
                
            image_files = [
                f for f in sorted(os.listdir(folder_path))
                if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))
            ]
            if not image_files:
                continue
                
            import urllib.parse
            image_urls = [
                urllib.parse.quote(f"/products/{craft_type}/{folder}/{img}", safe='/')
                for img in image_files
            ]
            
            # Match price from Excel
            norm_name = normalize_key(folder)
            price = 399
            for k, p in excel_prices.items():
                if k in norm_name or norm_name in k:
                    price = p
                    break
                    
            original_price = int(price * 1.55 / 10) * 10 - 1
            if original_price <= price:
                original_price = price + 200
            discount_percent = round(((original_price - price) / original_price) * 100)
            
            # Determine metadata
            meta = determine_metadata(folder)
            
            # Format display name
            display_name = format_title(folder)
            slug = slugify(display_name)
            sku = f"BC-{'WD' if craft_type == 'wood crafts' else 'MT'}-{sku_counter}"
            sku_counter += 1
            
            product_dict = {
                "id": slug,
                "name": display_name,
                "slug": slug,
                "sku": sku,
                "category": meta["category"],
                "subCategory": meta["subCategory"],
                "collection": "Heritage Collection" if "brass" in norm_name or "vintage" in norm_name else ("Festive Collection" if "diya" in norm_name or "krishna" in norm_name or "ganesha" in norm_name else "Artisan Collection"),
                "badge": "BESTSELLER" if sku_counter % 3 == 0 else ("NEW" if sku_counter % 4 == 0 else "HANDCRAFTED"),
                "price": price,
                "originalPrice": original_price,
                "discountPercent": discount_percent,
                "description": meta["description"],
                "shortDescription": meta["shortDescription"],
                "highlights": meta["highlights"],
                "material": meta["material"],
                "dimensions": meta["dimensions"],
                "weightKg": meta["weightKg"],
                "colorFinish": meta["colorFinish"],
                "stock": 25 + (sku_counter % 20),
                "inStock": True,
                "featured": (sku_counter % 5 == 0),
                "bestseller": (sku_counter % 4 == 0),
                "newArrival": (sku_counter % 6 == 0),
                "rating": round(4.6 + ((sku_counter % 5) * 0.08), 1),
                "reviewCount": 18 + (sku_counter % 40),
                "tags": [
                    slug.replace('-', ' '),
                    meta["category"].lower(),
                    craft_type.replace(' crafts', ''),
                    "handcrafted",
                    "indian artisan",
                    "beingcraft"
                ],
                "images": image_urls,
                "careInstructions": [
                    "Wipe gently with a soft dry cotton cloth to preserve sheen.",
                    "Avoid harsh abrasive cleaners and chemical bleaches.",
                    "Keep away from direct continuous rain or moisture immersion."
                ],
                "reviews": [
                    {
                        "id": f"rev-{slug}-1",
                        "userName": "Ananya Sharma",
                        "userCity": "New Delhi",
                        "rating": 5,
                        "date": "15 days ago",
                        "title": "Outstanding craftsmanship & authenticity",
                        "comment": "The finish is breathtaking! Packed with exceptional care and reached on time. Truly feels like a generational heritage piece.",
                        "verifiedPurchase": True
                    },
                    {
                        "id": f"rev-{slug}-2",
                        "userName": "Vikramaditya Rao",
                        "userCity": "Bengaluru",
                        "rating": 5,
                        "date": "1 month ago",
                        "title": "Genuine solid material",
                        "comment": "Delighted with the heavy solid feel. You can immediately feel the weight of real artisanal work.",
                        "verifiedPurchase": True
                    }
                ]
            }
            products.append(product_dict)
            
    return products

def update_products_file(products):
    with open(PRODUCTS_TS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find where `export const INITIAL_PRODUCTS: Product[] = [` starts
    pattern = r'export const INITIAL_PRODUCTS:\s*Product\[\]\s*=\s*\['
    match = re.search(pattern, content)
    if not match:
        print("Could not find INITIAL_PRODUCTS start in products.ts")
        return False
        
    start_pos = match.start()
    
    # We want to keep everything before `export const INITIAL_PRODUCTS`
    header_content = content[:start_pos]
    
    # Format products array as beautiful TypeScript
    products_json = json.dumps(products, indent=2, ensure_ascii=False)
    
    coupons_code = """
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
"""
    new_products_block = f"export const INITIAL_PRODUCTS: Product[] = {products_json};\n{coupons_code}\n"
    
    with open(PRODUCTS_TS_PATH, 'w', encoding='utf-8') as f:
        f.write(header_content + new_products_block)
        
    print(f"Successfully injected {len(products)} products into {PRODUCTS_TS_PATH}!")
    return True

if __name__ == "__main__":
    print("Scanning products from public/products...")
    items = scan_products()
    print(f"Found and prepared {len(items)} products!")
    
    # Category breakdown
    cat_counts = {}
    for p in items:
        cat = p["category"]
        cat_counts[cat] = cat_counts.get(cat, 0) + 1
    print("Category Breakdown:")
    for c, cnt in cat_counts.items():
        print(f"  - {c}: {cnt} products")
        
    update_products_file(items)
