import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  ChevronDown,
  Filter,
  Sparkles,
  Check,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { TAXONOMY_CATEGORIES } from '../data/products';

export const ShopPage: React.FC = () => {
  const { products, currentPath, navigate, wishlist } = useShop();

  // Parse URL search params from hash
  const queryParams = useMemo(() => {
    const qIndex = currentPath.indexOf('?');
    if (qIndex === -1) return new URLSearchParams();
    return new URLSearchParams(currentPath.slice(qIndex));
  }, [currentPath]);

  const initialCategory = queryParams.get('category') || '';
  const initialSubcategory = queryParams.get('subcategory') || '';
  const initialCollection = queryParams.get('collection') || '';
  const initialMaterial = queryParams.get('material') || 'all';
  const initialSearch = queryParams.get('search') || '';
  const isWishlistOnly = queryParams.get('wishlist') === 'true';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [priceRange, setPriceRange] = useState<number>(8000);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(initialMaterial);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('menu_order');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSelectedSubcategory(initialSubcategory);
    setSelectedCollection(initialCollection);
    setSelectedMaterial(initialMaterial);
    setSearchQuery(initialSearch);
  }, [initialCategory, initialSubcategory, initialCollection, initialMaterial, initialSearch]);

  // Unique Materials
  const materials = [
    { id: 'all', label: 'All Materials' },
    { id: 'wood', label: 'Natural Wood (Sheesham/Teak)' },
    { id: 'stone', label: 'Stone (Marble/Soapstone)' },
    { id: 'brass', label: 'Solid Virgin Brass' },
    { id: 'bronze', label: 'Pure Kansa / Bell Metal' },
    { id: 'metal', label: 'Wrought Iron / Antique Alloy' },
  ];

  // Collections list
  const collections = [
    'New Arrivals',
    'Best Sellers',
    'Festive Collection',
    'Heritage Collection',
    'Artisan Collection',
    'Gifts'
  ];

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Wishlist filter
      if (isWishlistOnly && !wishlist.includes(product.id)) {
        return false;
      }

      // Category filter: match either direct category, subcategory, or pillar grouping
      if (selectedCategory) {
        const catLower = selectedCategory.toLowerCase();
        const prodCatLower = product.category.toLowerCase();
        const prodSubLower = (product.subCategory || '').toLowerCase();

        if (prodCatLower === catLower) {
          // Direct match passes category filter
        } else if (catLower === 'wood craft' || catLower === 'wood crafts') {
          const isWood = prodCatLower.includes('wood') || product.material.toLowerCase().includes('wood') || product.material.toLowerCase().includes('sheesham') || product.material.toLowerCase().includes('teak');
          if (!isWood) return false;
        } else if (catLower === 'stone craft') {
          const isStone = prodCatLower.includes('stone') || product.material.toLowerCase().includes('stone') || product.material.toLowerCase().includes('marble') || product.material.toLowerCase().includes('soapstone');
          if (!isStone) return false;
        } else if (catLower === 'brass & metal') {
          const isMetal = prodCatLower.includes('brass') || prodCatLower.includes('metal') || prodCatLower.includes('idol') || prodCatLower.includes('vintage') || prodCatLower.includes('urli') || prodCatLower.includes('diya');
          if (!isMetal) return false;
        } else if (catLower === 'home decor') {
          const isHome = prodCatLower.includes('home') || prodCatLower.includes('wall') || prodCatLower.includes('table') || prodCatLower.includes('sculpture');
          if (!isHome) return false;
        } else if (catLower === 'dining & kitchen') {
          const isDining = prodCatLower.includes('dining') || prodCatLower.includes('kitchen') || prodSubLower.includes('tray') || prodSubLower.includes('spice') || prodSubLower.includes('serving') || prodSubLower.includes('drinkware') || prodSubLower.includes('tableware');
          if (!isDining) return false;
        } else if (catLower === 'accessories') {
          const isAcc = prodCatLower.includes('accessor') || prodCatLower.includes('utility') || prodCatLower.includes('toy') || prodCatLower.includes('bag') || prodSubLower.includes('accessor') || prodSubLower.includes('utility');
          if (!isAcc) return false;
        } else if (catLower === 'collections') {
          // shows all
        } else if (product.category !== selectedCategory && !prodSubLower.includes(catLower)) {
          return false;
        }
      }

      // Subcategory filter
      if (selectedSubcategory) {
        const subLower = selectedSubcategory.toLowerCase();
        const prodSubLower = (product.subCategory || '').toLowerCase();
        const nameLower = product.name.toLowerCase();
        const tagMatch = product.tags.some(t => t.toLowerCase().includes(subLower));
        if (!prodSubLower.includes(subLower) && !nameLower.includes(subLower) && !tagMatch) {
          return false;
        }
      }

      // Collection filter
      if (selectedCollection) {
        if (selectedCollection === 'New Arrivals' && !product.newArrival) return false;
        if (selectedCollection === 'Best Sellers' && !product.bestseller) return false;
        if (selectedCollection === 'Festive Collection' && product.collection !== 'Festive Collection' && !product.tags.some(t => ['diwali', 'pooja', 'urli', 'diya'].includes(t.toLowerCase()))) return false;
        if (selectedCollection === 'Heritage Collection' && product.collection !== 'Heritage Collection' && !product.tags.some(t => ['heritage', 'brass', 'antique', 'royal'].includes(t.toLowerCase()))) return false;
        if (selectedCollection === 'Artisan Collection' && product.collection !== 'Artisan Collection' && !product.badge?.includes('HANDCRAFTED')) return false;
        if (selectedCollection === 'Gifts' && product.category !== 'Gifting' && !product.tags.some(t => t.includes('gift'))) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchMat = product.material.toLowerCase().includes(q);
        const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchCat && !matchMat && !matchTag) return false;
      }

      // Price filter
      if (product.price > priceRange) {
        return false;
      }

      // Material filter
      if (selectedMaterial !== 'all') {
        const mat = product.material.toLowerCase();
        if (selectedMaterial === 'wood' && !mat.includes('wood') && !mat.includes('sheesham') && !mat.includes('teak')) return false;
        if (selectedMaterial === 'stone' && !mat.includes('stone') && !mat.includes('marble') && !mat.includes('soapstone') && !mat.includes('sandstone')) return false;
        if (selectedMaterial === 'brass' && !mat.includes('brass')) return false;
        if (selectedMaterial === 'bronze' && !mat.includes('kansa') && !mat.includes('bronze') && !mat.includes('bell metal')) return false;
        if (selectedMaterial === 'metal' && !mat.includes('iron') && !mat.includes('alloy') && !mat.includes('dhokra') && !mat.includes('metal')) return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
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
  }, [
    products,
    isWishlistOnly,
    wishlist,
    selectedCategory,
    selectedCollection,
    searchQuery,
    priceRange,
    selectedMaterial,
    minRating,
    inStockOnly,
    sortBy
  ]);

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedCollection('');
    setSearchQuery('');
    setPriceRange(8000);
    setSelectedMaterial('all');
    setMinRating(0);
    setInStockOnly(false);
    navigate('/shop');
  };

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedCollection) ||
    Boolean(searchQuery) ||
    selectedMaterial !== 'all' ||
    minRating > 0 ||
    inStockOnly ||
    priceRange < 8000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-charcoal-500 flex items-center gap-1.5">
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
          {isWishlistOnly
            ? 'My Wishlist'
            : selectedCategory
            ? selectedCategory
            : selectedCollection
            ? selectedCollection
            : 'Handcrafted Catalog'}
        </span>
      </nav>

      {/* 2. Header Banner */}
      <div className="bg-surface-cream rounded-2xl p-6 sm:p-8 border border-surface-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-maroon text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
              <span>Authentic Indian Handicrafts</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
              {isWishlistOnly
                ? 'Your Saved Wishlist'
                : selectedCategory
                ? selectedCategory
                : selectedCollection
                ? selectedCollection
                : 'All Handcrafted Collections'}
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5 max-w-2xl leading-relaxed">
              {isWishlistOnly
                ? 'Your handpicked selection of heirloom brass items, carved wood panels, and stone sculptures.'
                : selectedCategory
                ? TAXONOMY_CATEGORIES.find((c) => c.name === selectedCategory || c.name.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(c.name.toLowerCase()))?.description ||
                  'Explore genuine Indian handcrafted artifacts made with generational integrity.'
                : 'Explore our comprehensive catalog of virgin brass idols, hand-chiseled marble inlays, and seasoned timber decor.'}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-4 bg-white p-3.5 rounded-xl border border-surface-border text-xs text-charcoal-700 shadow-sm shrink-0">
            <div>
              <span className="font-heading font-bold text-lg text-brand-maroon block">
                {filteredProducts.length}
              </span>
              <span className="text-charcoal-500">Products Available</span>
            </div>
            <div className="h-8 w-[1px] bg-surface-border" />
            <div>
              <span className="font-heading font-bold text-lg text-charcoal-900 block">100%</span>
              <span className="text-charcoal-500">Artisan Guild Made</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Controls & Sorting Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden btn-pill-outline text-xs px-4 py-2 flex items-center gap-1.5 font-bold"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters ({filteredProducts.length})</span>
          </button>
          <span className="text-xs sm:text-sm text-charcoal-500">
            Showing <strong className="text-charcoal-900">{filteredProducts.length}</strong> of{' '}
            {products.length} handcrafted products
          </span>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="shop-sort" className="text-xs text-charcoal-500 hidden sm:inline">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold px-3 py-2 pr-8 bg-white border border-surface-border rounded-lg text-charcoal-800 appearance-none focus:outline-none focus:border-brand-maroon cursor-pointer shadow-sm"
            >
              <option value="menu_order">Default Featured</option>
              <option value="rating">Top Rated by Customers</option>
              <option value="date">Newest Arrivals First</option>
              <option value="price">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-charcoal-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-xs text-charcoal-500 font-medium mr-1">Active filters:</span>
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-brand-maroon-subtle text-brand-maroon border border-brand-maroon/20 font-medium">
              Category: {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('')} />
            </span>
          )}
          {selectedCollection && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-brand-gold/30 text-charcoal-900 border border-brand-gold font-medium">
              Collection: {selectedCollection}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCollection('')} />
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
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-brand-maroon-subtle text-brand-maroon border border-brand-maroon/20 font-medium">
              {minRating}+ Stars
              <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} />
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
            className="text-xs text-brand-maroon hover:underline font-bold ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* 4. Main Catalogue Grid & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 divide-y divide-surface-border bg-white p-5 rounded-2xl border border-surface-border shadow-sm">
          {/* Categories */}
          <div className="pt-0 first:pt-0">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-charcoal-900 mb-3">
              Craft Categories
            </h3>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg flex items-center justify-between transition-colors ${
                  selectedCategory === ''
                    ? 'font-bold text-brand-maroon bg-brand-maroon-subtle'
                    : 'text-charcoal-700 hover:text-brand-maroon'
                }`}
              >
                <span>All Handcrafted</span>
                <span>({products.length})</span>
              </button>
              {TAXONOMY_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    selectedCategory === cat.name
                      ? 'font-bold text-brand-maroon bg-brand-maroon-subtle'
                      : 'text-charcoal-700 hover:text-brand-maroon'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-charcoal-400">View</span>
                </button>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="pt-5">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-charcoal-900 mb-3">
              Collections
            </h3>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCollection('')}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg flex items-center justify-between transition-colors ${
                  selectedCollection === ''
                    ? 'font-bold text-brand-maroon bg-brand-maroon-subtle'
                    : 'text-charcoal-700 hover:text-brand-maroon'
                }`}
              >
                <span>All Collections</span>
              </button>
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(col)}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    selectedCollection === col
                      ? 'font-bold text-brand-maroon bg-brand-maroon-subtle'
                      : 'text-charcoal-700 hover:text-brand-maroon'
                  }`}
                >
                  <span>{col}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Material Filter */}
          <div className="pt-5">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-charcoal-900 mb-3">
              Material
            </h3>
            <div className="space-y-1 text-xs">
              {materials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMaterial(m.id)}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    selectedMaterial === m.id
                      ? 'font-bold text-brand-maroon bg-brand-maroon-subtle'
                      : 'text-charcoal-700 hover:text-brand-maroon'
                  }`}
                >
                  <span>{m.label}</span>
                  {selectedMaterial === m.id && <Check className="w-3.5 h-3.5 text-brand-maroon" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-5 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-charcoal-900">
                Max Price
              </h3>
              <span className="text-xs font-bold text-brand-maroon">₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="500"
              max="8000"
              step="250"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-maroon cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-charcoal-400">
              <span>₹500</span>
              <span>₹8,000+</span>
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div className="pt-5">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-charcoal-900 mb-2.5">
              Minimum Rating
            </h3>
            <div className="space-y-1 text-xs">
              {[
                { label: 'All Ratings', value: 0 },
                { label: '4.8★ and above', value: 4.8 },
                { label: '4.5★ and above', value: 4.5 },
                { label: '4.0★ and above', value: 4.0 },
              ].map((r) => (
                <button
                  key={r.value}
                  onClick={() => setMinRating(r.value)}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg flex items-center justify-between ${
                    minRating === r.value
                      ? 'font-bold text-brand-maroon bg-brand-maroon-subtle'
                      : 'text-charcoal-700 hover:text-brand-maroon'
                  }`}
                >
                  <span>{r.label}</span>
                  {minRating === r.value && <Check className="w-3.5 h-3.5 text-brand-maroon" />}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-5">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-charcoal-800">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-maroon focus:ring-brand-maroon accent-brand-maroon"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid (4 columns desktop, 3 columns tablet, 2 columns mobile) */}
        <main className="lg:col-span-9">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-surface-cream rounded-2xl border border-surface-border p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-maroon-subtle text-brand-maroon mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="font-heading font-bold text-xl text-charcoal-900">
                Catalog Ready For Your Products
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
                All system-generated items have been removed. You can now add your own handcrafted products through the Admin CMS panel.
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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-surface-cream rounded-2xl border border-surface-border p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-maroon-subtle text-brand-maroon mx-auto flex items-center justify-center">
                <Filter className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-charcoal-900">
                No Handcrafted Treasures Found
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
                We couldn't find any products matching your active filters. Try resetting your filters to discover our artisan collection.
              </p>
              <button
                onClick={clearAllFilters}
                className="btn-pill-primary text-xs px-6 py-2.5 font-bold shadow"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white text-charcoal-900 h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto p-5">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-surface-border pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-maroon" />
                  <span className="font-heading font-bold text-base">Filter Catalog</span>
                </div>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-charcoal-600" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-charcoal-900 mb-2">
                  Category
                </h4>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left py-1.5 px-2 rounded ${
                      selectedCategory === '' ? 'font-bold text-brand-maroon bg-brand-maroon-subtle' : ''
                    }`}
                  >
                    All Categories
                  </button>
                  {TAXONOMY_CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left py-1.5 px-2 rounded ${
                        selectedCategory === cat.name ? 'font-bold text-brand-maroon bg-brand-maroon-subtle' : ''
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="border-t border-surface-border pt-4">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-charcoal-900 mb-2">
                  Material
                </h4>
                <div className="space-y-1 text-xs">
                  {materials.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMaterial(m.id)}
                      className={`w-full text-left py-1.5 px-2 rounded ${
                        selectedMaterial === m.id ? 'font-bold text-brand-maroon bg-brand-maroon-subtle' : ''
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-surface-border pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">Max Price</span>
                  <span className="font-bold text-brand-maroon">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="8000"
                  step="250"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand-maroon"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-surface-border flex gap-3">
              <button
                onClick={clearAllFilters}
                className="btn-pill-outline text-xs px-4 py-2.5 flex-1"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn-pill-primary text-xs px-4 py-2.5 flex-1 font-bold shadow"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
