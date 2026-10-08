import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, navigate } = useShop();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  // Recommended products if wishlist is empty
  const recommended = products.filter((p) => p.bestseller || p.featured).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <nav className="text-xs text-charcoal-500 mb-2 flex items-center gap-1.5">
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
          <span className="text-charcoal-900 font-medium">My Wishlist</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-4">
          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900 flex items-center gap-2">
              <span>Saved Handcrafted Heirlooms</span>
              <span className="text-sm font-normal text-charcoal-500">
                ({wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'})
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Keep track of traditional metal, wood, and brass pieces you cherish.
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => addToCart(p, 1));
              }}
              className="btn-pill-primary text-xs px-5 py-2.5 flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Cart</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      {wishlistedProducts.length === 0 ? (
        <div className="py-16 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-maroon-subtle text-brand-maroon flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-bold text-xl text-charcoal-900">
            Your Wishlist is Currently Empty
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Explore our curated catalog of authentic brass idols, carved wooden jharokhas, and marble inlay accents to save your favorite treasures.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/shop')}
              className="btn-pill-primary text-xs px-7 py-3 inline-flex items-center gap-2 shadow"
            >
              <span>Explore All Handcrafted Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recommended picks */}
          {recommended.length > 0 && (
            <div className="pt-12 text-left border-t border-surface-border">
              <h3 className="font-heading font-bold text-base text-charcoal-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold fill-brand-gold" />
                <span>Popular Artisan Creations</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {recommended.slice(0, 2).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistedProducts.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
