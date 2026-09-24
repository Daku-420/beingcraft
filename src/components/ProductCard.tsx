import React from 'react';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import type { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, navigate } = useShop();
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const hasDiscount = product.originalPrice > product.price;

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-xl overflow-hidden border border-surface-border hover:border-brand-maroon/30 hover:shadow-card-hover transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* 1. Thumbnail Container */}
      <div className="relative aspect-[4/5] bg-surface-muted overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Secondary image hover swap if available */}
        {product.images.length > 1 && (
          <img
            src={product.images[1]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          />
        )}

        {/* Sale Badge (Being Craft exact maroon pill) */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-brand-maroon text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
            Sale!
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? 'bg-red-50 text-red-600 shadow'
              : 'bg-white/80 backdrop-blur-sm text-charcoal-700 hover:text-brand-maroon hover:bg-white shadow-sm'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
        </button>

        {/* Floating Quick Add Icon with Tooltip (Being Craft exact behavior) */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <div className="relative group/btn">
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 rounded-full bg-brand-maroon text-white flex items-center justify-center hover:bg-brand-gold hover:text-black shadow-md transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-charcoal-900 text-white text-[11px] font-medium rounded shadow pointer-events-none whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity">
              Add to cart
            </span>
          </div>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[11px] font-semibold text-brand-maroon/90 tracking-wider uppercase block mb-1">
            {product.category}
          </span>

          {/* Product Title */}
          <h3 className="font-heading font-semibold text-sm sm:text-base text-charcoal-900 group-hover:text-brand-maroon transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center text-brand-amber">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) ? 'fill-brand-amber text-brand-amber' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-charcoal-500 font-medium">
              ({product.reviewCount || 12})
            </span>
          </div>
        </div>

        {/* 3. Pricing & Button */}
        <div className="mt-3 pt-2.5 border-t border-surface-border flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base sm:text-lg text-charcoal-900">
                ₹{product.price.toLocaleString('en-IN')}.00
              </span>
              {hasDiscount && (
                <span className="text-xs text-charcoal-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}.00
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="text-[10px] font-semibold text-emerald-700">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-pill-primary text-xs px-3.5 py-1.5 shrink-0 shadow-none hover:shadow"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
