import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  Star,
  Quote,
  Flame,
  Award,
  HeartHandshake,
  Send
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import {
  TAXONOMY_CATEGORIES,
  EDITORIAL_STORIES,
  GIFTING_OCCASIONS,
  MATERIALS_LIST
} from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BRAND } from '../config/brand';

export const HomePage: React.FC = () => {
  const { products, navigate, showToast } = useShop();

  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'newArrivals' | 'festive'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filtered lists
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 8);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 8);
  const festivePicks = products.filter(
    (p) =>
      p.tags.some((t) => ['diwali', 'pooja', 'urli', 'diya', 'festive'].includes(t.toLowerCase())) ||
      p.category === 'Pooja Essentials & Idols' ||
      p.category === 'Candle Holders & Diyas' ||
      p.category === 'Decorative Trays & Urli'
  ).slice(0, 8);

  const featuredGridProducts =
    activeTab === 'all'
      ? products.slice(0, 8)
      : activeTab === 'bestsellers'
      ? bestsellers
      : activeTab === 'newArrivals'
      ? newArrivals
      : festivePicks;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Welcome to BeingCraft! Use code WELCOME10 for 10% off.');
    setNewsletterEmail('');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#1A0307] text-white overflow-hidden border-b border-brand-gold/20">
        {/* Subtle Textured Background Overlay */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HANDCRAFTED HERITAGE • TIMELESS INDIAN ARTISTRY</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
              CRAFTED BY HAND. <br />
              <span className="text-brand-gold italic font-serif font-normal">
                Made to Last Generations.
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Discover authentic Indian handcrafted objects of character—pure virgin brass sculptures,
              hand-carved Sheesham jharokhas, and Agra marble inlays, shaped by generational master artisans.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('/shop')}
                className="btn-pill-accent px-8 py-3.5 text-sm sm:text-base font-bold flex items-center gap-2 shadow-xl hover:shadow-2xl group"
              >
                <span>SHOP THE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full px-7 py-3.5 border-2 border-white/80 text-white hover:bg-white hover:text-brand-maroon text-sm sm:text-base shadow-sm active:scale-95"
              >
                EXPLORE OUR CRAFT
              </button>
            </div>

            {/* Quick Micro Proof */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-8 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Over 2,400+ Homes Styled</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center text-brand-gold gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                ))}
                <span className="text-white ml-1.5 font-bold">4.9 / 5.0 (500+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Hero Showcase Card */}
          <div className="lg:col-span-5 hidden lg:block">
            {products.length > 0 ? (
              <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-gold/40 bg-white/5 backdrop-blur-md p-3 group">
                <img
                  src={products[0].images?.[0] || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'}
                  alt={products[0].name}
                  className="w-full aspect-[4/5] object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-charcoal-900/95 backdrop-blur-md border border-brand-gold/30 text-white shadow-2xl">
                  <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">
                    Featured Handcrafted Creation
                  </span>
                  <h4 className="font-heading font-semibold text-sm mt-0.5 line-clamp-1">
                    {products[0].name}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                    <span className="text-base font-bold text-brand-gold">
                      ₹{products[0].price.toLocaleString('en-IN')}.00
                    </span>
                    <button
                      onClick={() => navigate(`/product/${products[0].slug}`)}
                      className="text-xs font-semibold text-white hover:text-brand-gold flex items-center gap-1"
                    >
                      View Details <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-gold/40 bg-white/5 backdrop-blur-md p-3 group">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                  alt="BeingCraft Indian Handicrafts"
                  className="w-full aspect-[4/5] object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-charcoal-900/95 backdrop-blur-md border border-brand-gold/30 text-white shadow-2xl">
                  <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">
                    Authentic Artisan Sanctuary
                  </span>
                  <h4 className="font-heading font-semibold text-sm mt-0.5 line-clamp-1">
                    Timeless Indian Handicrafts
                  </h4>
                  <p className="text-[11px] text-white/70 mt-1 line-clamp-2">
                    Pure virgin brass, hand-carved Sheesham & Makrana marble inlays.
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => navigate('/about')}
                      className="text-xs font-semibold text-brand-gold hover:text-white flex items-center gap-1"
                    >
                      Our Story <ChevronRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => navigate('/admin')}
                      className="text-[11px] font-semibold text-white/80 hover:text-white underline"
                    >
                      Admin Panel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. TRUST / VALUE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-surface-border p-6 sm:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-charcoal-900">Handcrafted in India</h4>
            <p className="text-[11px] text-charcoal-500">Centuries-old lineage</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-charcoal-900">Artisan Made</h4>
            <p className="text-[11px] text-charcoal-500">Fair guild wages</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-charcoal-900">Quality Materials</h4>
            <p className="text-[11px] text-charcoal-500">100% solid virgin brass</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-charcoal-900">Secure Payments</h4>
            <p className="text-[11px] text-charcoal-500">UPI, Card & COD</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-charcoal-900">Pan-India Delivery</h4>
            <p className="text-[11px] text-charcoal-500">26,000+ pincodes</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-charcoal-900">Easy Returns</h4>
            <p className="text-[11px] text-charcoal-500">7-day replacement</p>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY (Editorial Large Photography Tiles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
            Curated Craft Pillars
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-charcoal-900">
            Shop by Craft Discipline
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Every category represents an authentic Indian material tradition preserved by hereditary masters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TAXONOMY_CATEGORIES.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-charcoal-900 cursor-pointer flex flex-col justify-end aspect-[4/5] sm:aspect-[3/4]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative p-6 sm:p-7 space-y-2 text-white">
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">
                  Artisan Guild Craft
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-brand-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/80 font-light leading-relaxed line-clamp-2">
                  “{cat.tagline}”
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-brand-gold group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (With Tabs & Uncluttered Luxury Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-surface-border pb-5 mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon block mb-1">
              Handpicked Heirlooms
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-charcoal-900">
              Featured Craft Creations
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Lost-wax bronze, carved teakwood, and etched brass sculptures ready for your living space.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-muted rounded-full border border-surface-border overflow-x-auto self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-brand-maroon text-white shadow'
                  : 'text-charcoal-600 hover:text-brand-maroon'
              }`}
            >
              All Handcrafted
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                activeTab === 'bestsellers'
                  ? 'bg-brand-maroon text-white shadow'
                  : 'text-charcoal-600 hover:text-brand-maroon'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('newArrivals')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                activeTab === 'newArrivals'
                  ? 'bg-brand-maroon text-white shadow'
                  : 'text-charcoal-600 hover:text-brand-maroon'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('festive')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                activeTab === 'festive'
                  ? 'bg-brand-maroon text-white shadow'
                  : 'text-charcoal-600 hover:text-brand-maroon'
              }`}
            >
              Festive Picks
            </button>
          </div>
        </div>

        {/* Product Grid: 4 columns desktop, 3 tablet, 2 mobile */}
        {featuredGridProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredGridProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/shop')}
                className="btn-pill-outline text-sm px-8 py-3.5 inline-flex items-center gap-2 font-bold"
              >
                <span>View Complete Handcrafted Catalog ({products.length} Items)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16 px-4 bg-surface-cream rounded-2xl border border-surface-border max-w-lg mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-brand-maroon-subtle text-brand-maroon mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-brand-gold" />
            </div>
            <h3 className="font-heading font-bold text-lg text-charcoal-900">
              Handcrafted Catalog Ready
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              No products have been added yet. Add your unique handcrafted pieces through the Admin panel to display them here.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/admin')}
                className="btn-pill-primary text-xs px-6 py-2.5 font-bold shadow"
              >
                Go to Admin Panel to Add Products
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 5. EDITORIAL COLLECTION STORIES (Asymmetrical Craft Storytelling) */}
      <section className="bg-surface-cream py-16 sm:py-20 border-y border-surface-border space-y-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
            The Living Traditions
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-charcoal-900">
            Material Stories of India
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Beyond commerce, we celebrate the raw elements and human devotion behind each artifact.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          {EDITORIAL_STORIES.map((story, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
                  {story.subtitle}
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900 leading-tight">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  {story.description}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate(story.link)}
                    className="btn-pill-primary text-xs px-6 py-2.5 inline-flex items-center gap-2 font-bold"
                  >
                    <span>{story.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-surface-border aspect-[16/10] group">
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DEDICATED BESTSELLERS SECTION */}
      {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-surface-border pb-4 mb-8 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon block mb-1">
                Top Customer Rated
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-charcoal-900">
                Our Most Cherished Best Sellers
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop?collection=Best%20Sellers')}
              className="text-xs font-bold text-brand-maroon hover:underline flex items-center gap-1"
            >
              <span>VIEW ALL BESTSELLERS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 7. NEW ARRIVALS SHOWCASE */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-surface-border pb-4 mb-8 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block mb-1">
                Fresh From Guild Workshops
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-charcoal-900">
                New Season Arrivals
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop?collection=New%20Arrivals')}
              className="text-xs font-bold text-brand-maroon hover:underline flex items-center gap-1"
            >
              <span>VIEW ALL NEW ARRIVALS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 8. ARTISAN / OUR STORY (Authentic Brand Storytelling) */}
      <section className="bg-[#1A0307] text-white py-16 sm:py-24 border-y border-brand-gold/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 text-brand-gold text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE LIVING CRAFT OF INDIA</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              EVERY PIECE <br />
              <span className="text-brand-gold italic font-serif font-normal">HAS A STORY.</span>
            </h2>

            <p className="text-sm text-white/80 leading-relaxed font-light">
              Indian metalwork, stone carving, and timber craft are not assembly-line tasks. They are
              ancestral invocations where master hands mold red-hot bronze, sculpt white Makrana marble,
              and chisel seasoned Sheesham rosewood with techniques passed down over four centuries.
            </p>

            <p className="text-sm text-white/80 leading-relaxed font-light">
              By bringing a {BRAND.name} artifact into your sanctuary, you sustain the indigenous guilds of
              Moradabad, Bastar, Saharanpur, and Agra—ensuring our ancient artistic wisdom thrives in the
              modern world.
            </p>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="font-heading font-extrabold text-2xl text-brand-gold block">40+</span>
                <span className="text-xs text-white/60">Artisan Guilds</span>
              </div>
              <div>
                <span className="font-heading font-extrabold text-2xl text-brand-gold block">100%</span>
                <span className="text-xs text-white/60">Virgin Raw Materials</span>
              </div>
              <div>
                <span className="font-heading font-extrabold text-2xl text-brand-gold block">26k+</span>
                <span className="text-xs text-white/60">Pincodes Reached</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/about')}
                className="btn-pill-accent px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2 shadow"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
                alt="Artisan sculpting idol"
                loading="lazy"
                className="rounded-2xl object-cover w-full h-56 sm:h-64 shadow-2xl border border-white/10"
              />
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                alt="Ayurvedic Kansa beating"
                loading="lazy"
                className="rounded-2xl object-cover w-full h-40 sm:h-48 shadow-2xl border border-white/10"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=600&q=80"
                alt="Hand-carved woodwork finishing"
                loading="lazy"
                className="rounded-2xl object-cover w-full h-40 sm:h-48 shadow-2xl border border-white/10"
              />
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80"
                alt="Brass finishing details"
                loading="lazy"
                className="rounded-2xl object-cover w-full h-56 sm:h-64 shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. MATERIAL-BASED DISCOVERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
            Tactile Elements
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-charcoal-900">
            Shop by Material
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Select artifacts by the organic substance that speaks to your senses and living environment.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {MATERIALS_LIST.map((mat) => (
            <div
              key={mat.name}
              onClick={() => navigate(`/shop?material=${encodeURIComponent(mat.name)}`)}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-surface-border cursor-pointer flex flex-col items-center text-center p-4 bg-white"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-surface-border group-hover:border-brand-maroon transition-colors mb-3">
                <img
                  src={mat.image}
                  alt={mat.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 className="font-heading font-bold text-sm text-charcoal-900 group-hover:text-brand-maroon transition-colors">
                {mat.label}
              </h4>
              <span className="text-[11px] text-charcoal-500 mt-0.5">
                {mat.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FESTIVE & SEASONAL COLLECTION SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-charcoal-900 via-[#3A000E] to-[#6E001B] text-white p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-brand-gold/30 shadow-2xl">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-[11px] font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-brand-gold" />
              <span>Festive & Auspicious Decor</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl leading-tight">
              Illuminate Auspicious Moments with Brass Urlis, Deepdans & Mandir Idols
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-xl">
              From Diwali celebrations and wedding ceremonies to sacred daily aartis, infuse your home
              with divine radiance and traditional warmth.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/shop?category=Pooja%20Essentials%20%26%20Idols')}
                className="btn-pill-accent px-7 py-3 text-xs font-bold flex items-center gap-2 shadow"
              >
                <span>Shop Pooja & Idols</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/shop?category=Decorative%20Trays%20%26%20Urli')}
                className="btn-pill-outline !border-white !text-white hover:!bg-brand-gold hover:!text-black text-xs px-7 py-3 font-semibold"
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
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. GIFTING (Crafted Gifts for Meaningful Moments) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
            Heirloom Giving
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-charcoal-900">
            Crafted Gifts for Meaningful Moments
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Give a lasting piece of Indian craftsmanship rather than fleeting corporate tokens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {GIFTING_OCCASIONS.map((occ) => (
            <div
              key={occ.slug}
              onClick={() => navigate('/shop?category=Gifting')}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-border bg-white cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-[4/3] overflow-hidden bg-surface-muted">
                <img
                  src={occ.image}
                  alt={occ.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 space-y-1.5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-charcoal-900 group-hover:text-brand-maroon transition-colors line-clamp-1">
                    {occ.title}
                  </h4>
                  <p className="text-[11px] text-charcoal-500 leading-snug line-clamp-2 mt-1">
                    {occ.description}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-brand-maroon inline-flex items-center gap-1 pt-2">
                  <span>Shop Gifts</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. VERIFIED CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
            Verified Experiences
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-charcoal-900">
            Cherished Across Indian Homes
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Genuine words from patrons who value handmade integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex text-brand-amber gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
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
                <span className="font-heading font-bold text-xs text-charcoal-900 block">
                  Meenakshi Sundaram
                </span>
                <span className="text-[11px] text-charcoal-500">Chennai, Tamil Nadu</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex text-brand-amber gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-brand-maroon/20 mb-2" />
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic">
                "Ordered the Gandhi style vintage pocket watch keychain and the Sheesham jharokha. The
                wood carving depth is extraordinary and the brass pocket watch has a satisfying authentic
                snap. Fast 3-day delivery."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between">
              <div>
                <span className="font-heading font-bold text-xs text-charcoal-900 block">
                  Ananya Saxena
                </span>
                <span className="text-[11px] text-charcoal-500">Jaipur, Rajasthan</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex text-brand-amber gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-brand-maroon/20 mb-2" />
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic">
                "The peacock brass urli and Makrana marble coasters are pure museum grade art. We filled
                the urli with water and fresh marigolds for Diwali and every guest was spellbound. Truly
                handcrafted heritage."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between">
              <div>
                <span className="font-heading font-bold text-xs text-charcoal-900 block">
                  Vikramaditya Rao
                </span>
                <span className="text-[11px] text-charcoal-500">Hyderabad, Telangana</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 13. INSTAGRAM / SOCIAL PROOF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
            Artisanal Community
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-charcoal-900">
            FOLLOW THE CRAFT
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Tag your home styled with our creations on Instagram using{' '}
            <strong className="text-brand-maroon">#BeingCraftHeritage</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80', label: 'Urli in Courtyard' },
            { img: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=500&q=80', label: 'Sheesham Decor' },
            { img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=500&q=80', label: 'Marble & Idols' },
            { img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=500&q=80', label: 'Festive Diya Light' },
            { img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80', label: 'Kansa Dinnerware' },
            { img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80', label: 'Tree of Life Art' }
          ].map((item, i) => (
            <div key={i} className="group relative aspect-square rounded-xl overflow-hidden shadow-sm">
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-maroon/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center">
                <span className="text-[11px] font-bold text-white tracking-wider uppercase">
                  @BEINGCRAFT
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <a
            href={BRAND.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-outline text-xs px-6 py-2.5 inline-flex items-center gap-2 font-bold"
          >
            <span>FOLLOW @BEINGCRAFT ON INSTAGRAM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 14. NEWSLETTER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-cream rounded-2xl p-8 sm:p-12 border border-surface-border text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-brand-maroon text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6 text-brand-gold fill-brand-gold" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon block">
            Inner Artisan Circle
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            BE THE FIRST TO DISCOVER NEW CRAFTS.
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto leading-relaxed">
            Subscribe to receive private invitations to limited artisan guild batches, festive launch
            previews, and 10% off your inaugural handcrafted order.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl max-w-md mx-auto">
              ✓ You are subscribed! Check your inbox for code <strong>WELCOME10</strong>.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 rounded-full border border-surface-border bg-white text-xs text-charcoal-900 focus:outline-none focus:border-brand-maroon shadow-inner"
              />
              <button
                type="submit"
                className="btn-pill-primary px-7 py-3 text-xs font-bold flex items-center justify-center gap-2 shadow"
              >
                <span>SUBSCRIBE</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-charcoal-400">
            We honor your privacy. Unsubscribe anytime with zero spam.
          </p>
        </div>
      </section>
    </div>
  );
};
