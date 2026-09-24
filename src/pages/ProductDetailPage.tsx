import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { getProductBySlug, products, addToCart, toggleWishlist, isInWishlist, navigate, showToast } = useShop();
  const product = getProductBySlug(slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'care' | 'reviews'>('description');
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

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

  const hasDiscount = product.originalPrice > product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
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
        <span className="text-charcoal-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Product Hero (50% Gallery / 50% Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square bg-surface-muted rounded-2xl overflow-hidden border border-surface-border shadow-sm">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-brand-maroon text-white text-xs font-bold px-3 py-1 rounded-full shadow uppercase tracking-wide">
                Sale!
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm shadow hover:bg-white text-charcoal-800 flex items-center justify-center transition-colors"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
            </button>
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-brand-maroon shadow-md scale-105'
                      : 'border-surface-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-maroon uppercase tracking-wider">
                {product.category} {product.subCategory && `• ${product.subCategory}`}
              </span>
              <button
                onClick={handleShare}
                className="text-xs text-charcoal-500 hover:text-brand-maroon flex items-center gap-1"
                title="Share this product"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900 mt-1.5 leading-snug">
              {product.name}
            </h1>

            {/* Rating & SKU */}
            <div className="flex items-center gap-4 mt-2 text-xs text-charcoal-500">
              <div className="flex items-center gap-1.5">
                <div className="flex text-brand-amber">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-brand-amber text-brand-amber' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-charcoal-800">{product.rating}</span>
                <span>({product.reviewCount || 24} reviews)</span>
              </div>
              <span>•</span>
              <span>SKU: <strong className="text-charcoal-700">{product.sku}</strong></span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-surface-cream rounded-xl border border-surface-border flex items-baseline gap-3">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-maroon">
              ₹{product.price.toLocaleString('en-IN')}.00
            </span>
            {hasDiscount && (
              <>
                <span className="text-sm text-charcoal-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}.00
                </span>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  {product.discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Short Description */}
          <p className="text-sm text-charcoal-600 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Stock Indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-green" />
            <span className="text-emerald-800">
              Availability: {product.stock} items in stock (Dispatches within 24 Hours)
            </span>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-surface-border rounded-full bg-surface-muted px-3 py-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-brand-maroon transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold px-4 min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-1 hover:text-brand-maroon transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 btn-pill-primary py-3 text-sm font-bold flex items-center justify-center gap-2 shadow"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full btn-pill-accent py-3 text-sm font-bold shadow hover:shadow-md transition-all"
            >
              Buy It Now (Fast Indian Checkout)
            </button>
          </div>

          {/* Pincode Delivery Check */}
          <div className="p-4 rounded-xl border border-surface-border bg-surface-muted/50 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-800 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-brand-maroon" />
              <span>Check Delivery to Your Pincode</span>
            </label>
            <form onSubmit={checkPincode} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit Pincode (e.g. 110001)"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 text-xs px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-charcoal-900 hover:bg-brand-maroon text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Check
              </button>
            </form>
            {deliveryEstimate && (
              <p className="text-xs font-medium text-emerald-800 flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>{deliveryEstimate}</span>
              </p>
            )}
          </div>

          {/* Micro Trust Matrix */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-charcoal-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-maroon shrink-0" />
              <span>100% Authentic Brass Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-brand-maroon shrink-0" />
              <span>7-Day Return / Replacement</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-maroon shrink-0" />
              <span>Handcrafted in Moradabad, India</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-maroon shrink-0" />
              <span>Cash on Delivery Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Tabs (Description, Specifications, Care, Reviews) */}
      <div className="pt-8 border-t border-surface-border">
        {/* Tab Buttons */}
        <div className="flex border-b border-surface-border overflow-x-auto gap-4 sm:gap-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-3 text-sm font-heading font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'description'
                ? 'border-brand-maroon text-brand-maroon'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-900'
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 text-sm font-heading font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-brand-maroon text-brand-maroon'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-900'
            }`}
          >
            Specifications & Dimensions
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`py-3 text-sm font-heading font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'care'
                ? 'border-brand-maroon text-brand-maroon'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-900'
            }`}
          >
            Artisan Care Instructions
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 text-sm font-heading font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-brand-maroon text-brand-maroon'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-900'
            }`}
          >
            Customer Reviews ({product.reviews?.length || product.reviewCount || 12})
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-6 text-sm text-charcoal-700 leading-relaxed max-w-4xl">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <div className="p-4 bg-surface-cream rounded-xl border border-surface-border">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand-maroon mb-1">
                  Artisan Heritage Note
                </h4>
                <p className="text-xs text-charcoal-600">
                  Because this artifact is individually hand-cast and chased by human hands, slight
                  variations in texture, weight, and patina are natural hallmarks of authentic metalcraft.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="border border-surface-border rounded-xl overflow-hidden divide-y divide-surface-border">
              <div className="grid grid-cols-3 p-3 bg-surface-muted/50 text-xs">
                <span className="font-semibold text-charcoal-900">Material</span>
                <span className="col-span-2 text-charcoal-700">{product.material}</span>
              </div>
              <div className="grid grid-cols-3 p-3 text-xs">
                <span className="font-semibold text-charcoal-900">Finish / Color</span>
                <span className="col-span-2 text-charcoal-700">{product.colorFinish}</span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-surface-muted/50 text-xs">
                <span className="font-semibold text-charcoal-900">Dimensions (L × W × H)</span>
                <span className="col-span-2 text-charcoal-700">
                  {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} {product.dimensions.unit}
                </span>
              </div>
              <div className="grid grid-cols-3 p-3 text-xs">
                <span className="font-semibold text-charcoal-900">Net Weight</span>
                <span className="col-span-2 text-charcoal-700">{product.weightKg} kg</span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-surface-muted/50 text-xs">
                <span className="font-semibold text-charcoal-900">Country of Origin</span>
                <span className="col-span-2 text-charcoal-700">India (Moradabad Guilds)</span>
              </div>
              <div className="grid grid-cols-3 p-3 text-xs">
                <span className="font-semibold text-charcoal-900">SKU Code</span>
                <span className="col-span-2 text-charcoal-700">{product.sku}</span>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-charcoal-900">
                Preserving Handcrafted Brass & Antique Finishes
              </h4>
              <ul className="space-y-2 text-xs text-charcoal-600 list-disc pl-5">
                {product.careInstructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
                <li>For natural brass items, exposure to air over months develops an authentic vintage patina. If you prefer high shine, rub with traditional Pitambari or tamarind paste and rinse dry immediately.</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Existing Reviews */}
              <div className="space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-surface-muted rounded-xl border border-surface-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-charcoal-900">{rev.userName}</span>
                          <span className="text-[11px] text-charcoal-400">({rev.userCity})</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-charcoal-400">{rev.date}</span>
                      </div>
                      <div className="flex text-brand-amber gap-0.5 my-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-brand-amber' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <h5 className="font-semibold text-xs text-charcoal-900">{rev.title}</h5>
                      <p className="text-xs text-charcoal-600 mt-1">{rev.comment}</p>
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

      {/* 4. Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-surface-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-charcoal-900">
              Related Handcrafted Products
            </h2>
            <button
              onClick={() => navigate(`/shop?category=${encodeURIComponent(product.category)}`)}
              className="text-xs font-semibold text-brand-maroon hover:underline flex items-center gap-1"
            >
              View More in {product.category} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
