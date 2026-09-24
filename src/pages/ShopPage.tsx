import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  ChevronDown,
  Filter,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/products';

export const ShopPage: React.FC = () => {
  const { products, currentPath, navigate, wishlist } = useShop();

  // Parse URL search params from hash
  const queryParams = useMemo(() => {
    const qIndex = currentPath.indexOf('?');
    if (qIndex === -1) return new URLSearchParams();
    return new URLSearchParams(currentPath.slice(qIndex));
  }, [currentPath]);

  const initialCategory = queryParams.get('category') || '';
  const initialSearch = queryParams.get('search') || '';
  const isWishlistOnly = queryParams.get('wishlist') === 'true';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [priceRange, setPriceRange] = useState<number>(8000);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('menu_order');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialCategory, initialSearch]);

  // Unique Materials
  const materials = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.material.toLowerCase().includes('brass')) set.add('Solid Brass');
      else if (p.material.toLowerCase().includes('wood') || p.material.toLowerCase().includes('sheesham') || p.material.toLowerCase().includes('neem')) set.add('Natural Wood');
      else if (p.material.toLowerCase().includes('iron')) set.add('Wrought Iron');
      else if (p.material.toLowerCase().includes('bell metal') || p.material.toLowerCase().includes('dokra')) set.add('Bell Metal / Dhokra');
      else set.add('Vintage Alloy');
    });
    return Array.from(set);
  }, [products]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Wishlist filter
      if (isWishlistOnly && !wishlist.includes(product.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchCat && !matchTag) return false;
      }

      // Price filter
      if (product.price > priceRange) {
        return false;
      }

      // Material filter
      if (selectedMaterial !== 'all') {
        if (!product.material.toLowerCase().includes(selectedMaterial.toLowerCase().split(' ')[0])) {
          return false;
        }
      }

      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'date') return b.newArrival ? 1 : -1;
      return 0; // default order
    });
  }, [products, isWishlistOnly, wishlist, selectedCategory, searchQuery, priceRange, selectedMaterial, inStockOnly, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setPriceRange(8000);
    setSelectedMaterial('all');
    setInStockOnly(false);
    navigate('/shop');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-charcoal-500 mb-4 flex items-center gap-1.5">
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
        <span className="text-charcoal-900 font-medium">
          {isWishlistOnly ? 'My Wishlist' : selectedCategory ? selectedCategory : 'Shop Handcrafted Decor'}
        </span>
      </nav>

      {/* 2. Header Banner */}
      <div className="bg-surface-cream rounded-2xl p-6 sm:p-8 border border-surface-border mb-8">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          {isWishlistOnly ? 'Your Saved Wishlist' : selectedCategory ? selectedCategory : 'All Handcrafted Collections'}
        </h1>
        <p className="text-sm text-charcoal-600 mt-1 max-w-2xl">
          {isWishlistOnly
            ? 'Your handpicked selection of heirloom brass items, vintage curios, and antique home accents.'
            : selectedCategory
            ? CATEGORIES.find((c) => c.name === selectedCategory)?.description || 'Explore authentic handcrafted metal products and traditional artistry.'
            : 'Explore our complete catalog of traditional Indian brass idols, peacock urlis, vintage pocket watches, and artisanal metal crafts.'}
        </p>
      </div>

      {/* 3. Controls & Active Filters Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-surface-border mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden btn-pill-outline text-xs px-4 py-2 flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters ({filteredProducts.length})</span>
          </button>
          <span className="text-xs sm:text-sm text-charcoal-500">
            Showing <strong>{filteredProducts.length}</strong> of {products.length} products
          </span>
        </div>

        {/* Sorting Dropdown (Exact WooCommerce options from Being Craft) */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="shop-sort" className="text-xs text-charcoal-500 hidden sm:inline">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold px-3 py-2 pr-8 bg-white border border-surface-border rounded-lg text-charcoal-800 appearance-none focus:outline-none focus:border-brand-maroon cursor-pointer"
            >
              <option value="menu_order">Default sorting</option>
              <option value="rating">Sort by average rating</option>
              <option value="date">Sort by latest arrivals</option>
              <option value="price">Sort by price: low to high</option>
              <option value="price-desc">Sort by price: high to low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-charcoal-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(selectedCategory || searchQuery || selectedMaterial !== 'all' || inStockOnly || priceRange < 8000) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-charcoal-500 font-medium mr-1">Active filters:</span>
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-brand-maroon-subtle text-brand-maroon border border-brand-maroon/20 font-medium">
              Category: {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('')} />
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-brand-maroon-subtle text-brand-maroon border border-brand-maroon/20 font-medium">
              Keyword: "{searchQuery}"
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
            </span>
          )}
          {selectedMaterial !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-brand-maroon-subtle text-brand-maroon border border-brand-maroon/20 font-medium">
              Material: {selectedMaterial}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMaterial('all')} />
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-brand-maroon-subtle text-brand-maroon border border-brand-maroon/20 font-medium">
              In Stock Only
              <X className="w-3 h-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
            </span>
          )}
          {priceRange < 8000 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-brand-maroon-subtle text-brand-maroon border border-brand-maroon/20 font-medium">
              Up to ₹{priceRange}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange(8000)} />
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs text-brand-maroon hover:underline font-semibold ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* 4. Main Grid & Filter Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 divide-y divide-surface-border">
          {/* Categories */}
          <div>
            <h3 className="font-heading font-bold text-sm text-charcoal-900 uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left py-1.5 px-2 rounded flex items-center justify-between transition-colors ${
                  selectedCategory === ''
                    ? 'font-bold text-brand-maroon bg-brand-maroon-subtle'
                    : 'text-charcoal-700 hover:text-brand-maroon'
                }`}
              >
                <span>All Categories</span>
                <span>({products.length})</span>
              </button>
              {CATEGORIES.map((cat) => {
                const count = products.filter((p) => p.category === cat.name).length;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left py-1.5 px-2 rounded flex items-center justify-between transition-colors ${
                      selectedCategory === cat.name
                        ? 'font-bold text-brand-maroon bg-brand-maroon-subtle'
                        : 'text-charcoal-700 hover:text-brand-maroon'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-charcoal-400">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading font-bold text-sm text-charcoal-900 uppercase tracking-wider">
                Price Range
              </h3>
              <span className="text-xs font-bold text-brand-maroon">
                Up to ₹{priceRange.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="299"
              max="8000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-maroon cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-charcoal-400 mt-1">
              <span>₹299</span>
              <span>₹8,000+</span>
            </div>
          </div>

          {/* Material Filter */}
          <div className="pt-6">
            <h3 className="font-heading font-bold text-sm text-charcoal-900 uppercase tracking-wider mb-3">
              Craft Material
            </h3>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center gap-2 text-charcoal-700 cursor-pointer">
                <input
                  type="radio"
                  name="material"
                  checked={selectedMaterial === 'all'}
                  onChange={() => setSelectedMaterial('all')}
                  className="accent-brand-maroon"
                />
                <span>All Materials</span>
              </label>
              {materials.map((mat) => (
                <label key={mat} className="flex items-center gap-2 text-charcoal-700 cursor-pointer">
                  <input
                    type="radio"
                    name="material"
                    checked={selectedMaterial === mat}
                    onChange={() => setSelectedMaterial(mat)}
                    className="accent-brand-maroon"
                  />
                  <span>{mat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="pt-6">
            <label className="flex items-center gap-2.5 text-xs font-medium text-charcoal-800 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-maroon accent-brand-maroon"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-surface-muted rounded-2xl border border-surface-border">
              <Sparkles className="w-10 h-10 text-charcoal-300 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-charcoal-800">
                No products found
              </h3>
              <p className="text-xs text-charcoal-500 mt-1 max-w-sm mx-auto">
                We couldn't find any products matching your current filters. Try adjusting price or
                clearing search.
              </p>
              <button onClick={clearAllFilters} className="mt-4 btn-pill-primary text-xs px-6 py-2">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white text-charcoal-900 h-full shadow-2xl z-10 p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-surface-border pb-3">
                <h3 className="font-heading font-bold text-base text-charcoal-900">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-charcoal-500 hover:text-brand-maroon"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-charcoal-900 mb-2">
                  Category
                </h4>
                <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left py-1.5 px-2 rounded ${
                      selectedCategory === '' ? 'bg-brand-maroon-subtle text-brand-maroon font-bold' : ''
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedCategory(c.name)}
                      className={`block w-full text-left py-1.5 px-2 rounded ${
                        selectedCategory === c.name ? 'bg-brand-maroon-subtle text-brand-maroon font-bold' : ''
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Price Up To</span>
                  <span className="text-brand-maroon">₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="299"
                  max="8000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand-maroon"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-brand-maroon"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-border flex gap-2">
              <button
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 btn-pill-outline text-xs py-2"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 btn-pill-primary text-xs py-2"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
