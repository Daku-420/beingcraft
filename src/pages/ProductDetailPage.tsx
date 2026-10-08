import React, { useState, useEffect } from 'react';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  Share2,
  Award
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { BRAND } from '../config/brand';
import { handleImageError, getSafeImageUrl } from '../utils/imageHelper';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { getProductBySlug, products, addToCart, toggleWishlist, isInWishlist, navigate, showToast } = useShop();
  const product = getProductBySlug(slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'craftsmanship' | 'specs' | 'care' | 'shipping' | 'returns' | 'reviews'>('description');
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Monitor scroll for sticky mobile purchase bar
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 350px
      setShowStickyBar(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-maroon-subtle text-brand-maroon mx-auto flex items-center justify-center">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          Handcrafted Creation Not Found
        </h1>
        <p className="text-sm text-charcoal-600 max-w-md mx-auto">
          The requested item is not currently available in our catalog. Browse our handcrafted collections or add new pieces via the admin panel.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => navigate('/shop')}
            className="btn-pill-primary text-xs px-6 py-2.5 font-bold shadow"
          >
            Explore Catalog
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-pill-outline text-xs px-6 py-2.5 font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      const today = new Date();
      const arrival = new Date(today);
      arrival.setDate(today.getDate() + 4);
      const formatted = arrival.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      setDeliveryEstimate(`Express delivery by ${formatted} to pincode ${pincode}`);
    } else {
      setDeliveryEstimate('Please enter a valid 6-digit Indian pincode.');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    setReviewSubmitted(true);
    showToast('Thank you for your feedback! Review submitted for moderation.');
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const youMayAlsoLike = products
    .filter((p) => p.id !== product.id && (p.bestseller || p.featured))
    .slice(0, 4);

  const hasDiscount = product.originalPrice > product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 lg:pb-16">
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-charcoal-500 flex flex-wrap items-center gap-1.5">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="hover:text-brand-maroon transition-colors"
        >
          Home
        </a>
        <span>/</span>
        <a
          href={`#/shop?category=${encodeURIComponent(product.category)}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/shop?category=${encodeURIComponent(product.category)}`);
          }}
          className="hover:text-brand-maroon transition-colors"
        >
          {product.category}
        </a>
        <span>/</span>
        <span className="text-charcoal-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Product Showcase: Gallery + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT: Large Product Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-surface-muted border border-surface-border shadow-md">
            <img
              src={getSafeImageUrl(product.images?.[activeImageIndex] || product.images?.[0])}
              alt={product.name}
              onError={handleImageError}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.badge && (
                <span className="bg-charcoal-900 border border-brand-gold/40 text-brand-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {product.badge}
                </span>
              )}
              {hasDiscount && (
                <span className="bg-brand-maroon text-white text-xs font-bold px-3 py-1 rounded-full shadow uppercase tracking-wide">
                  Save {product.discountPercent}%
                </span>
              )}
            </div>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-charcoal-700 hover:text-brand-maroon shadow-md transition-colors"
              title="Share Product"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-brand-maroon shadow-md scale-105'
                      : 'border-surface-border hover:border-brand-maroon/40'
                  }`}
                >
                  <img src={getSafeImageUrl(img)} alt="" onError={handleImageError} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Craft Heritage Highlight Banner */}
          <div className="p-4 rounded-xl bg-surface-cream border border-surface-border flex items-center gap-3 text-xs text-charcoal-700">
            <Sparkles className="w-5 h-5 text-brand-maroon shrink-0" />
            <div>
              <span className="font-bold text-charcoal-900">Authentic Handcrafted Lineage: </span>
              Cast & hand-finished by master generational guild craftsmen. No two handmade objects are ever 100% identical.
            </div>
          </div>
        </div>

        {/* RIGHT: Product Meta & Purchase Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            {/* Category & SKU */}
            <div className="flex items-center justify-between text-xs text-charcoal-500 mb-1.5">
              <span className="font-bold uppercase tracking-widest text-brand-maroon">
                {product.category}
              </span>
              <span className="text-[11px] font-mono">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900 leading-snug">
              {product.name}
            </h1>

            {/* Star Rating & Reviews */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-brand-amber">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-brand-amber text-brand-amber'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-charcoal-800">{product.rating}</span>
              <span className="text-xs text-charcoal-500">
                • {product.reviewCount || 12} Verified Customer Reviews
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-xl bg-surface-muted/60 border border-surface-border space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-heading font-extrabold text-3xl text-charcoal-900">
                ₹{product.price.toLocaleString('en-IN')}.00
              </span>
              {hasDiscount && (
                <span className="text-base text-charcoal-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}.00
                </span>
              )}
            </div>
            <p className="text-[11px] text-charcoal-500">
              Inclusive of all taxes • Free shipping applies at checkout on orders above ₹{BRAND.shipping.freeShippingThreshold}
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
            {product.shortDescription || product.description}
          </p>

          {/* Key Product Highlights (from Admin Portal) */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Key Product Highlights
              </span>
              <ul className="space-y-1.5 text-xs text-charcoal-700">
                {product.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-maroon mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications Highlight Pills */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 bg-white border border-surface-border rounded-lg">
              <span className="text-[10px] text-charcoal-400 uppercase font-bold block">Material</span>
              <span className="font-semibold text-charcoal-900 text-xs">{product.material}</span>
            </div>
            <div className="p-2.5 bg-white border border-surface-border rounded-lg">
              <span className="text-[10px] text-charcoal-400 uppercase font-bold block">Weight</span>
              <span className="font-semibold text-charcoal-900 text-xs">{product.weightKg} kg (Solid Build)</span>
            </div>
            <div className="p-2.5 bg-white border border-surface-border rounded-lg">
              <span className="text-[10px] text-charcoal-400 uppercase font-bold block">Dimensions</span>
              <span className="font-semibold text-charcoal-900 text-xs">
                {product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} {product.dimensions.unit}
              </span>
            </div>
            <div className="p-2.5 bg-white border border-surface-border rounded-lg">
              <span className="text-[10px] text-charcoal-400 uppercase font-bold block">Finish</span>
              <span className="font-semibold text-charcoal-900 text-xs truncate block">{product.colorFinish}</span>
            </div>
          </div>

          {/* Quantity, Add to Cart & Buy Now */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-surface-border rounded-full bg-white shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-charcoal-600 hover:text-brand-maroon transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-charcoal-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-charcoal-600 hover:text-brand-maroon transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-pill-primary py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 rounded-full border border-surface-border flex items-center justify-center transition-colors shadow-sm ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-white text-charcoal-600 hover:text-brand-maroon hover:bg-surface-muted'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600' : ''}`} />
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              onClick={handleBuyNow}
              className="w-full btn-pill-accent py-3 text-xs sm:text-sm font-bold shadow-md"
            >
              Buy It Now (Express Checkout)
            </button>
          </div>

          {/* Pincode Delivery Estimator */}
          <div className="p-4 rounded-xl border border-surface-border bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-charcoal-900">
              <Truck className="w-4 h-4 text-brand-maroon" />
              <span>Check Delivery & Cash on Delivery</span>
            </div>
            <form onSubmit={checkPincode} className="flex gap-2 text-xs">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode..."
                className="flex-1 px-3 py-2 border border-surface-border rounded-lg bg-surface-muted/40 focus:outline-none focus:border-brand-maroon font-mono"
              />
              <button
                type="submit"
                className="btn-pill-primary px-4 py-2 text-xs font-bold"
              >
                Check
              </button>
            </form>
            {deliveryEstimate && (
              <p className="text-xs text-emerald-700 font-semibold pt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 inline" /> {deliveryEstimate}
              </p>
            )}
          </div>

          {/* Cancellation & Return Policies Summary */}
          <div className="p-3.5 rounded-xl bg-surface-muted/60 border border-surface-border space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-charcoal-900 flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-brand-maroon" /> Cancellation & Returns
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                product.isReturnable !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {product.isReturnable !== false ? `${product.returnWindowDays || 7}-Day Replacement / Return` : 'Final Sale / Non-Returnable'}
              </span>
            </div>
            <p className="text-charcoal-600 text-[11px] leading-relaxed">
              {product.returnPolicy || 'Items can be returned or replaced within the return window if received damaged, defective, or significantly different from description.'}
            </p>
            <div className="pt-1.5 border-t border-surface-border/70 flex items-center justify-between text-[11px]">
              <span className="text-charcoal-500">Order Cancellation:</span>
              <span className="font-semibold text-charcoal-800">
                {product.isCancellable !== false ? (product.cancellationPolicy || 'Permitted prior to dispatch') : 'Non-cancellable once order is confirmed'}
              </span>
            </div>
          </div>

          {/* Trust Value Points */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-charcoal-600 border-t border-surface-border">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-maroon shrink-0" />
              <span>Multi-Layer Breakage-Proof Transit</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-brand-maroon shrink-0" />
              <span>{product.returnWindowDays || 7}-Day Easy Replacement</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-maroon shrink-0" />
              <span>Certified Virgin Raw Materials</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-maroon shrink-0" />
              <span>Dispatched in 24–48 Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Editorial Tabs (Description, Craftsmanship, Specs, Care, Shipping, Returns, Reviews) */}
      <div className="pt-8 border-t border-surface-border space-y-6">
        <div className="flex gap-2 border-b border-surface-border overflow-x-auto pb-px">
          {[
            { id: 'description', label: 'Artisan Story & Details' },
            { id: 'craftsmanship', label: 'Craftsmanship & Materials' },
            { id: 'specs', label: 'Specifications & Dimensions' },
            { id: 'care', label: 'Care Instructions' },
            { id: 'shipping', label: 'Shipping & Packaging' },
            { id: 'returns', label: 'Cancellation & Returns' },
            { id: 'reviews', label: `Reviews (${product.reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-brand-maroon text-brand-maroon'
                  : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-surface-border shadow-sm min-h-[220px]">
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
              <h3 className="font-heading font-bold text-base sm:text-lg text-charcoal-900">
                About this Handcrafted Creation
              </h3>
              <p>{product.description}</p>
              <p>
                Every stroke of chisel, mold impression, and polishing stage reflects the distinctive
                hand of the maker. Subdued tonal variances and handcrafted textures are hallmarks of
                authentic heritage production rather than defects.
              </p>
            </div>
          )}

          {activeTab === 'craftsmanship' && (
            <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              <h3 className="font-heading font-bold text-base sm:text-lg text-charcoal-900">
                Centuries-Old Guild Craftsmanship
              </h3>
              <p>
                Our metal, stone, and wood pieces are crafted in accordance with traditional Indian Shilpa
                Shastra guidelines. We use 100% solid virgin metals and sustainably sourced timber,
                rejecting inferior scrap fillers and synthetic composites.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-surface-cream border border-surface-border">
                  <h4 className="font-heading font-bold text-xs text-brand-maroon uppercase mb-1">
                    Raw Material Purity
                  </h4>
                  <p className="text-xs text-charcoal-600">
                    Solid brass, pure copper, natural Sheesham rosewood, and authentic white Makrana marble.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-cream border border-surface-border">
                  <h4 className="font-heading font-bold text-xs text-brand-maroon uppercase mb-1">
                    Generational Tooling
                  </h4>
                  <p className="text-xs text-charcoal-600">
                    Hand-chiseled on anvils, hand-filed, and buffed with natural organic emery pastes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl space-y-3 text-xs">
              <h3 className="font-heading font-bold text-base text-charcoal-900 mb-2">
                Technical Specifications
              </h3>
              <div className="divide-y divide-surface-border">
                <div className="py-2.5 flex justify-between">
                  <span className="text-charcoal-500">Material Composition</span>
                  <span className="font-semibold text-charcoal-900">{product.material}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-charcoal-500">Dimensions (L × W × H)</span>
                  <span className="font-semibold text-charcoal-900">
                    {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} {product.dimensions.unit}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-charcoal-500">Net Weight</span>
                  <span className="font-semibold text-charcoal-900">{product.weightKg} kg</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-charcoal-500">Surface Finish</span>
                  <span className="font-semibold text-charcoal-900">{product.colorFinish}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-charcoal-500">Country of Origin</span>
                  <span className="font-semibold text-charcoal-900">India (Bharat)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="max-w-2xl space-y-4 text-xs sm:text-sm text-charcoal-700">
              <h3 className="font-heading font-bold text-base text-charcoal-900">
                Preserving Your Heirloom
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                {product.careInstructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
                <li>Keep dry and away from continuous rain or direct damp soil.</li>
                <li>Avoid harsh chemical wire brushes or bleach-based cleansers.</li>
              </ul>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              <h3 className="font-heading font-bold text-base text-charcoal-900">
                Breakage-Proof Transit Guarantee
              </h3>
              <p>
                Every heavy brass sculpture, delicate marble inlay coaster, and carved timber artifact is
                encased in high-density customized foam padding, triple-layer bubble wrap, and rigid
                corrugated outer boxing.
              </p>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                <strong>Zero-Damage Guarantee:</strong> In the rare event of transit damage, simply share an
                unboxing photo or video with our team within 7 days and we will dispatch a replacement immediately.
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="max-w-3xl space-y-6 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-charcoal-900 mb-2">
                  Cancellation & Return Policies
                </h3>
                <p className="text-charcoal-600">
                  We stand by the master craftsmanship of our generational artisans. Here are our complete transparent policies for this creation:
                </p>
              </div>

              {/* Order Cancellation */}
              <div className="p-4 rounded-xl bg-surface-cream border border-surface-border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-xs uppercase text-brand-maroon tracking-wider">
                    1. Order Cancellation Policy
                  </h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    product.isCancellable !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {product.isCancellable !== false ? 'Cancellable' : 'Final Order'}
                  </span>
                </div>
                <p className="text-xs text-charcoal-700">
                  {product.cancellationPolicy || (
                    product.isCancellable !== false
                      ? 'You can cancel your order free of charge before the item has been packed and handed over to our courier partner (typically within 24 hours of placement). Once dispatched, cancellation is no longer possible, but standard return/replacement guidelines apply.'
                      : 'Because each piece is custom-prepared or packed immediately upon order confirmation, cancellation is not permitted for this product.'
                  )}
                </p>
              </div>

              {/* Return & Replacement */}
              <div className="p-4 rounded-xl bg-surface-cream border border-surface-border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-xs uppercase text-brand-maroon tracking-wider">
                    2. Return & Replacement Policy ({product.returnWindowDays || 7}-Day Window)
                  </h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    product.isReturnable !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {product.isReturnable !== false ? `${product.returnWindowDays || 7}-Day Return Window` : 'Non-Returnable'}
                  </span>
                </div>
                <p className="text-xs text-charcoal-700">
                  {product.returnPolicy || (
                    product.isReturnable !== false
                      ? `We offer a hassle-free ${product.returnWindowDays || 7}-day return and replacement guarantee from the date of delivery. If your item arrives damaged, defective, or noticeably different from our catalog pictures, we will arrange a reverse pickup and issue an immediate replacement or full refund.`
                      : 'This artisanal creation is considered a final sale and is non-returnable unless received damaged or defective in transit.'
                  )}
                </p>
                <div className="pt-2 text-[11px] text-charcoal-600 border-t border-surface-border space-y-1">
                  <p><strong>Eligibility Guidelines:</strong></p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>The product must be unused, in its original authentic condition with tags and artisan certificates intact.</li>
                    <li>Please preserve the original custom box and foam packaging for reverse courier transit.</li>
                    <li>For transit damage claims, please contact our support team at {BRAND.email} or WhatsApp {BRAND.phone} with short unboxing photos.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-4">
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-charcoal-900">
                    Customer Feedback
                  </h3>
                  <p className="text-xs text-charcoal-500">
                    Real reviews from collectors and home decorators across India.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-brand-amber">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
                    ))}
                  </div>
                  <span className="font-bold text-sm text-charcoal-900">{product.rating} out of 5</span>
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-surface-muted/40 border border-surface-border space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-charcoal-900">{rev.userName} ({rev.userCity})</span>
                        <span className="text-[10px] text-charcoal-400">{rev.date}</span>
                      </div>
                      <div className="flex text-brand-amber gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-brand-amber' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <h5 className="font-semibold text-xs text-charcoal-900">{rev.title}</h5>
                      <p className="text-xs text-charcoal-600">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-charcoal-500">
                    Be the first to review this handcrafted masterpiece!
                  </p>
                )}
              </div>

              {/* Add Review Form */}
              <div className="p-5 border border-surface-border rounded-xl bg-surface-cream">
                <h4 className="font-heading font-bold text-sm text-charcoal-900 mb-1">
                  Add Your Review
                </h4>
                <p className="text-xs text-charcoal-500 mb-4">
                  Share your experience with fellow collectors and devotees.
                </p>

                {reviewSubmitted ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg">
                    ✓ Your review has been submitted and will appear upon moderation. Thank you!
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold mb-1">Your Rating *</label>
                      <div className="flex gap-1 text-brand-amber cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className={`w-5 h-5 ${star <= newReviewRating ? 'fill-brand-amber' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="e.g. Radhika Iyer"
                          className="w-full px-3 py-2 border border-surface-border rounded-lg bg-white focus:outline-none focus:border-brand-maroon"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Your Review *</label>
                      <textarea
                        rows={3}
                        required
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Tell us about the craftsmanship, finish, and packaging..."
                        className="w-full px-3 py-2 border border-surface-border rounded-lg bg-white focus:outline-none focus:border-brand-maroon"
                      />
                    </div>

                    <button type="submit" className="btn-pill-primary text-xs px-6 py-2.5 font-bold">
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Related Products & "You May Also Like" */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-surface-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon block mb-0.5">
                Harmonious Pairings
              </span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-charcoal-900">
                Related Handcrafted Creations
              </h2>
            </div>
            <button
              onClick={() => navigate(`/shop?category=${encodeURIComponent(product.category)}`)}
              className="text-xs font-bold text-brand-maroon hover:underline flex items-center gap-1"
            >
              View More <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* You May Also Like Section */}
      {youMayAlsoLike.length > 0 && (
        <div className="pt-8 border-t border-surface-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon block mb-0.5">
                Curated Recommendations
              </span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-charcoal-900">
                You May Also Like
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="text-xs font-bold text-brand-maroon hover:underline flex items-center gap-1"
            >
              Explore All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {youMayAlsoLike.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* 5. Sticky Purchase CTA Bar on Mobile (Appears on scroll) */}
      {showStickyBar && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border p-3 flex items-center justify-between gap-3 shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <img
              src={getSafeImageUrl(product.images?.[0])}
              alt={product.name}
              onError={handleImageError}
              className="w-11 h-11 rounded-lg object-cover border border-surface-border shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-heading font-semibold text-xs text-charcoal-900 truncate">
                {product.name}
              </h4>
              <span className="font-bold text-xs text-brand-maroon">
                ₹{product.price.toLocaleString('en-IN')}.00
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-pill-primary py-2.5 px-4 text-xs font-bold shrink-0 flex items-center gap-1.5 shadow"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};
