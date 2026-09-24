import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  Star,
  Quote
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BRAND } from '../config/brand';

export const HomePage: React.FC = () => {
  const { products, navigate } = useShop();
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'newArrivals' | 'featured'>('bestsellers');

  const bestsellers = products.filter((p) => p.bestseller).slice(0, 8);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 8);
  const featured = products.filter((p) => p.featured).slice(0, 8);

  const displayedProducts =
    activeTab === 'bestsellers'
      ? bestsellers
      : activeTab === 'newArrivals'
      ? newArrivals
      : featured;

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[500px] lg:min-h-[580px] flex items-center bg-gradient-to-r from-[#240008] via-[#4A0012] to-[#6E001B] text-white overflow-hidden">
        {/* Decorative Background Artwork Overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Handcrafted Metal Decor & Antiques</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Where Ancient Craft's <br />
              <span className="text-brand-gold italic font-serif">Alive in Every Metal.</span>
            </h1>

            <p className="text-sm sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Explore timeless handcrafted brass idols, ornate peacock urlis, heirloom vintage pocket
              watches, and sacred Indian home accents forged by master Moradabad artisans.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('/shop')}
                className="btn-pill-accent px-8 py-3.5 text-sm sm:text-base font-bold flex items-center gap-2 shadow-lg hover:shadow-xl group"
              >
                <span>Shop All Collections</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/shop?category=Pooja%20Essentials%20%26%20Idols')}
                className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full px-7 py-3.5 border-2 border-white/80 text-white hover:bg-white hover:text-brand-maroon text-sm sm:text-base shadow-sm active:scale-95"
              >
                Brass Pooja Essentials
              </button>
            </div>

            {/* Quick Micro Proof */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Over 2,400+ Homes Styled</span>
              </div>
              <span>•</span>
              <div className="flex items-center text-brand-gold gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-brand-gold" />
                ))}
                <span className="text-white ml-1 font-bold">4.9 / 5.0</span>
              </div>
            </div>
          </div>

          {/* Hero Showcase Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-gold/30 bg-white/5 backdrop-blur-md p-3 group">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                alt="Royal Peacock Brass Urli"
                className="w-full aspect-[4/5] object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-charcoal-900/90 backdrop-blur-md border border-white/10 text-white shadow-xl">
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">
                  Artisan Featured Highlight
                </span>
                <h4 className="font-heading font-semibold text-sm mt-0.5">
                  Royal Peacock Brass Urli with Bell Accents
                </h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                  <span className="text-base font-bold text-brand-gold">₹2,899.00</span>
                  <button
                    onClick={() => navigate('/product/royal-peacock-handcrafted-brass-urli')}
                    className="text-xs font-semibold text-white hover:text-brand-gold flex items-center gap-1"
                  >
                    View Details <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS & TRUST BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-card border border-surface-border p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-surface-border">
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 first:pt-0">
            <div className="w-12 h-12 rounded-xl bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-charcoal-900">100% Solid Brass</h4>
              <p className="text-xs text-charcoal-500 mt-0.5">Heavy virgin brass, zero fillers</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="w-12 h-12 rounded-xl bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-charcoal-900">Free Express Delivery</h4>
              <p className="text-xs text-charcoal-500 mt-0.5">On orders above ₹{BRAND.shipping.freeShippingThreshold}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="w-12 h-12 rounded-xl bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-charcoal-900">Breakage-Proof Transit</h4>
              <p className="text-xs text-charcoal-500 mt-0.5">Multi-layer safety bubble packing</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="w-12 h-12 rounded-xl bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-charcoal-900">7-Day Easy Returns</h4>
              <p className="text-xs text-charcoal-500 mt-0.5">Hassle-free replacement policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
            Curated Spaces
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-charcoal-900 mt-1">
            Shop by Traditional Craft
          </h2>
          <p className="text-sm text-charcoal-600 mt-2">
            Handcrafted metal decor, sacred idols, and antique collectables designed to elevate your living spaces.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <div
              key={cat.slug}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-surface-border group-hover:border-brand-maroon group-hover:shadow-card-hover transition-all duration-300 p-1">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-heading font-semibold text-xs sm:text-sm text-charcoal-900 group-hover:text-brand-maroon transition-colors mt-3">
                {cat.name}
              </h3>
              <span className="text-[11px] text-charcoal-500 mt-0.5">
                {cat.itemCount}+ Products
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT TABS: BESTSELLERS / NEW ARRIVALS / FEATURED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-surface-border pb-4 mb-8 gap-4">
          <div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-charcoal-900">
              Discover Our Creations
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Top rated brass sculptures, antique decor, and heirloom crafts.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 bg-surface-muted rounded-full border border-surface-border">
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'bestsellers'
                  ? 'bg-brand-maroon text-white shadow'
                  : 'text-charcoal-600 hover:text-brand-maroon'
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveTab('newArrivals')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'newArrivals'
                  ? 'bg-brand-maroon text-white shadow'
                  : 'text-charcoal-600 hover:text-brand-maroon'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'featured'
                  ? 'bg-brand-maroon text-white shadow'
                  : 'text-charcoal-600 hover:text-brand-maroon'
              }`}
            >
              Featured Artisans
            </button>
          </div>
        </div>

        {/* Products Grid (2 columns on mobile, 4 columns on desktop matching reference) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/shop')}
            className="btn-pill-outline text-sm px-8 py-3 inline-flex items-center gap-2"
          >
            <span>View All {products.length} Handcrafted Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. SPOTLIGHT PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-charcoal-900 via-[#3A000E] to-[#6E001B] text-white p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
              Special Festive Spotlight
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl leading-tight">
              Bring Sacred Vibrations Home with Temple Brass Lamps & Diyas
            </h2>
            <p className="text-sm text-white/80 font-light leading-relaxed max-w-xl">
              Each traditional vilakku and peacock deepdan is sand-cast by generational artisans to
              radiate divine serenity, warmth, and prosperity across Indian households.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/shop?category=Candle%20Holders%20%26%20Diyas')}
                className="btn-pill-accent px-7 py-3 text-sm font-bold flex items-center gap-2"
              >
                <span>Shop Brass Diyas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/shop?category=Decorative%20Trays%20%26%20Urli')}
                className="btn-pill-outline !border-white !text-white hover:!bg-brand-gold hover:!text-black text-sm px-7 py-3"
              >
                Explore Peacock Urlis
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-brand-gold/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
                alt="Traditional Brass Diya"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. BRAND STORY & ARTISAN HERITAGE SECTION */}
      <section className="bg-surface-cream py-16 border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
              Handcrafted in India
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-charcoal-900 leading-tight">
              Honoring Century-Old Metalworking Traditions of Moradabad
            </h2>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Moradabad, known globally as the "Peetal Nagri" (Brass City) of India, is home to
              families of metalsmiths who have safeguarded ancient lost-wax casting, repousse
              hammering, and delicate hand-etching for generations.
            </p>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Every brass idol, antique pocket watch casing, and ceremonial urli you welcome into your
              home directly supports these indigenous craftsmen and ensures Indian metal art flourishes
              for centuries to come.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-border">
              <div>
                <span className="font-heading font-bold text-2xl text-brand-maroon block">100%</span>
                <span className="text-xs text-charcoal-500">Pure Virgin Metals</span>
              </div>
              <div>
                <span className="font-heading font-bold text-2xl text-brand-maroon block">40+</span>
                <span className="text-xs text-charcoal-500">Artisan Guilds</span>
              </div>
              <div>
                <span className="font-heading font-bold text-2xl text-brand-maroon block">26k+</span>
                <span className="text-xs text-charcoal-500">Pincodes Delivered</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/about')}
                className="btn-pill-primary text-sm px-6 py-2.5 inline-flex items-center gap-2"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
              alt="Artisan sculpting brass idol"
              className="rounded-2xl object-cover w-full h-64 shadow-md hover:scale-102 transition-transform"
            />
            <img
              src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=600&q=80"
              alt="Handcrafted brass decor finishing"
              className="rounded-2xl object-cover w-full h-64 mt-6 shadow-md hover:scale-102 transition-transform"
            />
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
            Verified Customer Reviews
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-charcoal-900 mt-1">
            Cherished in Indian Homes
          </h2>
          <p className="text-sm text-charcoal-600 mt-1">
            Read authentic feedback from collectors and devotees across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex text-brand-amber gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-amber" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-brand-maroon/20 mb-2" />
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic">
                "The Dancing Ganesha idol has completely transformed our entrance foyer. The weight of
                the pure brass is remarkable, and the facial expressions are so blissful. Packaging was
                bulletproof!"
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between">
              <div>
                <span className="font-heading font-bold text-xs text-charcoal-900 block">Meenakshi Sundaram</span>
                <span className="text-[11px] text-charcoal-500">Chennai, Tamil Nadu</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex text-brand-amber gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-amber" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-brand-maroon/20 mb-2" />
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic">
                "Ordered the Gandhi style vintage pocket watch as an anniversary gift for my husband.
                The quartz movement is accurate and the antique bronze finish feels genuinely vintage.
                Arrived in 3 days."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between">
              <div>
                <span className="font-heading font-bold text-xs text-charcoal-900 block">Ananya Saxena</span>
                <span className="text-[11px] text-charcoal-500">Jaipur, Rajasthan</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex text-brand-amber gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-amber" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-brand-maroon/20 mb-2" />
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic">
                "The peacock brass urli is pure magnificence. We filled it with marigold petals and
                floating candles for Diwali and all our guests couldn't stop praising it. Exceptional
                finishing."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between">
              <div>
                <span className="font-heading font-bold text-xs text-charcoal-900 block">Vikramaditya Rao</span>
                <span className="text-[11px] text-charcoal-500">Hyderabad, Telangana</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
