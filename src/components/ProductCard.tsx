import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Eye, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { handleImageError, getSafeImageUrl } from '../utils/imageHelper';
import { ProductWatermark } from './ProductWatermark';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, navigate, setQuickViewProduct } = useShop();
  const isWishlisted = isInWishlist(product.id);

  const images = product.images && product.images.length > 0 ? product.images : [];
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % images.length);
  };

  const hasDiscount = product.originalPrice > product.price;

  // Determine badge to display
  const badgeText = product.badge || (hasDiscount ? 'Sale!' : null);

  // When hovered, bring out the best photo (index 1 if available, or user-selected angle)
  const currentDisplayIndex = isHovered ? activePhotoIndex : 0;

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => {
        setIsHovered(true);
        if (images.length > 1) {
          // Bring out the best photo (index 1 is the hero lifestyle / detail angle)
          setActivePhotoIndex(1);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActivePhotoIndex(0);
      }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-surface-border hover:border-brand-maroon/40 hover:shadow-2xl hover:shadow-brand-maroon/15 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.015] flex flex-col cursor-pointer"
    >
      {/* 1. Thumbnail Container */}
      <div className="relative aspect-[4/5] bg-surface-muted overflow-hidden">
        {/* Render base image and cross-fade to active/best photo on hover with pop-up zoom */}
        {images.length > 0 ? (
          images.map((imgUrl, idx) => (
            <img
              key={idx}
              src={getSafeImageUrl(imgUrl)}
              alt={`${product.name} - View ${idx + 1}`}
              loading="lazy"
              onError={handleImageError}
              className={`w-full h-full object-cover object-center absolute inset-0 transition-all duration-500 ease-out ${
                idx === currentDisplayIndex
                  ? 'opacity-100 scale-100 group-hover:scale-110'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            />
          ))
        ) : (
          <img
            src={getSafeImageUrl(undefined)}
            alt={product.name}
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        )}

        {/* Soft Ambient Vignette on hover to accentuate craftsmanship */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Brand Watermark Overlay */}
        <ProductWatermark />

        {/* Badge (NEW, BESTSELLER, HANDCRAFTED, LIMITED, or Sale!) */}
        {badgeText && (
          <span
            className={`absolute top-3 left-3 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wide z-10 ${
              badgeText === 'NEW'
                ? 'bg-emerald-700'
                : badgeText === 'BESTSELLER'
                ? 'bg-brand-maroon'
                : badgeText === 'LIMITED'
                ? 'bg-amber-800'
                : badgeText === 'HANDCRAFTED'
                ? 'bg-charcoal-900 border border-brand-gold/40 text-brand-gold'
                : 'bg-brand-maroon'
            }`}
          >
            {badgeText}
          </span>
        )}

        {/* "Best View" Floating Pill Tag on Hover */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-charcoal-900/90 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-[10px] font-bold tracking-wider uppercase shadow-lg">
              <Sparkles className="w-3 h-3 fill-brand-gold text-brand-gold" />
              <span>{activePhotoIndex === 1 ? 'Best View' : `Angle ${activePhotoIndex + 1}/${images.length}`}</span>
            </span>
          </div>
        )}

        {/* Interactive Multi-photo Dots indicator on Hover */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-24">
            {images.slice(0, 5).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(dotIdx);
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(dotIdx);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  dotIdx === activePhotoIndex
                    ? 'w-4 bg-brand-gold shadow'
                    : 'w-1.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Switch to angle ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Manual Chevrons for multi-photo navigation on Hover */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-charcoal-900/80 hover:bg-brand-gold text-white hover:text-black flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 shadow-md border border-white/20 active:scale-90"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-charcoal-900/80 hover:bg-brand-gold text-white hover:text-black flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 shadow-md border border-white/20 active:scale-90"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Wishlist Heart Button - positioned neatly under watermark */}
        <button
          onClick={handleWishlist}
          className={`absolute top-11 right-3 sm:top-12 sm:right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-20 ${
            isWishlisted
              ? 'bg-red-50 text-red-600 shadow'
              : 'bg-white/85 backdrop-blur-sm text-charcoal-700 hover:text-brand-maroon hover:bg-white shadow-sm'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
        </button>

        {/* Floating Quick Action Buttons on Hover */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-20">
          {/* Quick View Button */}
          <div className="relative group/view">
            <button
              onClick={handleQuickView}
              className="w-9 h-9 rounded-full bg-white/95 text-charcoal-800 flex items-center justify-center hover:bg-brand-gold hover:text-black shadow-md transition-colors"
              aria-label="Quick preview"
              title="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
            <span className="absolute bottom-full right-0 mb-1 px-2 py-0.5 bg-charcoal-900 text-white text-[10px] font-medium rounded shadow pointer-events-none whitespace-nowrap opacity-0 group-hover/view:opacity-100 transition-opacity">
              Quick view
            </span>
          </div>

          {/* Quick Add Button */}
          <div className="relative group/add">
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-full bg-brand-maroon text-white flex items-center justify-center hover:bg-brand-gold hover:text-black shadow-md transition-colors"
              aria-label="Add to cart"
              title="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <span className="absolute bottom-full right-0 mb-1 px-2 py-0.5 bg-charcoal-900 text-white text-[10px] font-medium rounded shadow pointer-events-none whitespace-nowrap opacity-0 group-hover/add:opacity-100 transition-opacity">
              Add to cart
            </span>
          </div>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Material Tag */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-semibold text-brand-maroon/90 tracking-wider uppercase truncate">
              {product.category}
            </span>
            <span className="text-[10px] text-charcoal-500 font-medium truncate ml-2">
              {product.material.split(' ')[0]}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-heading font-semibold text-xs sm:text-sm text-charcoal-900 group-hover:text-brand-maroon transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center text-brand-amber">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-brand-amber text-brand-amber' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] text-charcoal-500 font-medium">
              ({product.reviewCount || 12})
            </span>
          </div>
        </div>

        {/* 3. Pricing & Button */}
        <div className="mt-3 pt-2.5 border-t border-surface-border flex items-center justify-between gap-1.5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm sm:text-base text-charcoal-900">
                ₹{product.price.toLocaleString('en-IN')}.00
              </span>
              {hasDiscount && (
                <span className="text-[11px] text-charcoal-400 line-through hidden sm:inline">
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
            className="btn-pill-primary text-[11px] px-3 py-1.5 shrink-0 shadow-none hover:shadow"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
