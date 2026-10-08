import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Reset image index and quantity when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
  }, [quickViewProduct]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
      }
    };
    if (quickViewProduct) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);
  const hasDiscount = product.originalPrice > product.price;

  const handleClose = () => {
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    handleClose();
  };

  const handleViewFullDetails = () => {
    handleClose();
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={handleClose}
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-4 text-center">
        <div
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl text-left overflow-hidden border border-surface-border animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-charcoal-700 hover:text-brand-maroon shadow-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left: Gallery */}
            <div className="p-4 sm:p-6 bg-surface-muted/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-surface-border">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm border border-surface-border">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-brand-maroon text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-brand-maroon shadow-sm scale-105'
                          : 'border-surface-border hover:border-brand-maroon/40'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Category & Material */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-maroon bg-brand-maroon-subtle px-2.5 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-[11px] text-charcoal-500 font-medium">
                    {product.material}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-charcoal-900 leading-snug">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex text-brand-amber">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-brand-amber text-brand-amber'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-charcoal-600 font-medium">
                    {product.rating} ({product.reviewCount || 12} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pt-1 border-t border-surface-border">
                  <span className="font-heading font-extrabold text-2xl text-charcoal-900">
                    ₹{product.price.toLocaleString('en-IN')}.00
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-sm text-charcoal-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}.00
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Save {product.discountPercent}%
                      </span>
                    </>
                  )}
                </div>

                {/* Short description */}
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed line-clamp-3">
                  {product.shortDescription || product.description}
                </p>

                {/* Highlights (if any) */}
                {product.highlights && product.highlights.length > 0 && (
                  <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-700" /> Highlights:
                    </span>
                    <ul className="text-[11px] text-charcoal-700 space-y-0.5">
                      {product.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-brand-maroon shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specifications Pill */}
                <div className="p-2.5 bg-surface-cream rounded-lg text-[11px] text-charcoal-700 space-y-1">
                  <div>
                    <span className="font-semibold text-charcoal-900">Dimensions: </span>
                    {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} {product.dimensions.unit}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-charcoal-900">Weight: </span>
                      {product.weightKg} kg
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 flex items-center gap-1">
                      <RotateCcw className="w-2.5 h-2.5" />
                      {product.isReturnable !== false ? `${product.returnWindowDays || 7}-Day Returns` : 'Final Sale'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-3 pt-3 border-t border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-surface-border rounded-full bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-charcoal-600 hover:text-brand-maroon transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-charcoal-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-charcoal-600 hover:text-brand-maroon transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-pill-primary py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-10 h-10 rounded-full border border-surface-border flex items-center justify-center transition-colors ${
                      isWishlisted
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'text-charcoal-600 hover:text-brand-maroon hover:bg-surface-muted'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={handleViewFullDetails}
                    className="text-brand-maroon font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Full Details & Artisan Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Ready to Dispatch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
