import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigate } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelect = (slug: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  const handleViewAll = () => {
    setIsSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-surface-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-border bg-surface-muted/60">
          <Search className="w-5 h-5 text-brand-maroon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search antique brass, idols, pocket watches, urli, diya..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                handleViewAll();
              } else if (e.key === 'Escape') {
                setIsSearchOpen(false);
              }
            }}
            className="flex-1 bg-transparent text-charcoal-900 placeholder-charcoal-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-charcoal-400 hover:text-charcoal-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 hover:text-brand-maroon px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-charcoal-500 text-sm">
              <p className="font-medium text-charcoal-800 mb-2">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {[
                  'Brass Urli',
                  'Vintage Pocket Watch',
                  'Dancing Ganesha',
                  'Mayur Diya',
                  'Tree of Life Wall Art',
                  'Sheesham Belan',
                  'Neem Comb',
                  'Nataraja Idol'
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-surface-muted hover:bg-brand-maroon-subtle hover:text-brand-maroon text-xs rounded-full border border-surface-border transition-colors flex items-center gap-1.5"
                  >
                    <Tag className="w-3 h-3 text-brand-maroon" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-charcoal-500 text-sm">
              <p className="text-base font-semibold text-charcoal-800">No handcrafted products found</p>
              <p className="mt-1">Try searching for keywords like "brass", "idol", "urli", or "antique".</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2 pb-2 text-xs font-semibold text-charcoal-500 uppercase tracking-wider border-b border-surface-border">
                <span>Matching Products ({filteredProducts.length})</span>
                <button
                  onClick={handleViewAll}
                  className="text-brand-maroon hover:underline flex items-center gap-1 font-medium lowercase"
                >
                  View all results <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              {filteredProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product.slug)}
                  className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-surface-muted cursor-pointer transition-colors group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-lg border border-surface-border group-hover:scale-105 transition-transform shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-brand-maroon uppercase tracking-wider block">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-semibold text-charcoal-900 truncate group-hover:text-brand-maroon transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-charcoal-500 truncate">{product.material}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-charcoal-900 block">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-[11px] text-charcoal-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
