import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Settings
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BRAND } from '../config/brand';

export const Header: React.FC = () => {
  const {
    cartCount,
    cartSubtotal,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    wishlist,
    navigate,
    currentPath,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [diningDropdown, setDiningDropdown] = useState(false);
  const [decorDropdown, setDecorDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-brand-maroon text-white ${
        isScrolled ? 'shadow-md py-2' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-white hover:text-brand-gold focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-maroon shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-brand-maroon fill-brand-maroon" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl sm:text-2xl tracking-wider text-white uppercase flex items-center gap-1">
                  {BRAND.name}
                  <span className="text-brand-gold text-base font-normal">.</span>
                </span>
                <span className="text-[10px] tracking-widest text-brand-gold/90 uppercase -mt-1 font-light hidden sm:inline">
                  Handcrafted Heritage
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              className={`transition-colors py-2 ${
                currentPath === '/' || currentPath === ''
                  ? 'text-brand-gold font-semibold'
                  : 'text-white hover:text-brand-gold'
              }`}
            >
              Home
            </a>

            {/* Dining & Kitchen Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDiningDropdown(true)}
              onMouseLeave={() => setDiningDropdown(false)}
            >
              <button
                onClick={() => handleNav('/shop?category=Dining%20%26%20Kitchen')}
                className="flex items-center gap-1 text-white hover:text-brand-gold transition-colors py-2"
              >
                <span>Dining & Kitchen</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              {diningDropdown && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-lg shadow-xl py-2 text-charcoal-900 border border-surface-border animate-in fade-in slide-in-from-top-2 duration-150">
                  <a
                    href="#/shop?category=Dining%20%26%20Kitchen"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('/shop?category=Dining%20%26%20Kitchen');
                      setDiningDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-brand-maroon-subtle hover:text-brand-maroon transition-colors text-sm"
                  >
                    All Dining & Kitchen
                  </a>
                  <a
                    href="#/shop?category=Dining%20%26%20Kitchen&sub=Drinkware"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('/shop?category=Dining%20%26%20Kitchen&sub=Drinkware');
                      setDiningDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-brand-maroon-subtle hover:text-brand-maroon transition-colors text-sm"
                  >
                    Royal Goblets & Drinkware
                  </a>
                  <a
                    href="#/shop?category=Dining%20%26%20Kitchen&sub=Kitchen%20Tools"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('/shop?category=Dining%20%26%20Kitchen&sub=Kitchen%20Tools');
                      setDiningDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-brand-maroon-subtle hover:text-brand-maroon transition-colors text-sm"
                  >
                    Wooden Belan & Chakla Sets
                  </a>
                  <a
                    href="#/shop?category=Dining%20%26%20Kitchen&sub=Kitchen%20Essentials"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('/shop?category=Dining%20%26%20Kitchen&sub=Kitchen%20Essentials');
                      setDiningDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-brand-maroon-subtle hover:text-brand-maroon transition-colors text-sm"
                  >
                    Brass Spice Dabba (Masala Dani)
                  </a>
                </div>
              )}
            </div>

            {/* Home Decor Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDecorDropdown(true)}
              onMouseLeave={() => setDecorDropdown(false)}
            >
              <button
                onClick={() => handleNav('/shop?category=Brass%20Decor')}
                className="flex items-center gap-1 text-white hover:text-brand-gold transition-colors py-2"
              >
                <span>Home Decor</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              {decorDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl py-2 text-charcoal-900 border border-surface-border animate-in fade-in slide-in-from-top-2 duration-150">
                  <a
                    href="#/shop?category=Brass%20Decor"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('/shop?category=Brass%20Decor');
                      setDecorDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-brand-maroon-subtle hover:text-brand-maroon transition-colors text-sm"
                  >
                    Brass Collection (Featured)
                  </a>
                  <a
                    href="#/shop?category=Pooja%20Essentials%20%26%20Idols"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('/shop?category=Pooja%20Essentials%20%26%20Idols');
                      setDecorDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-brand-maroon-subtle hover:text-brand-maroon transition-colors text-sm"
                  >
                    Pooja Essentials & Idols
                  </a>
                  <a
                    href="#/shop?category=Decorative%20Trays%20%26%20Urli"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('/shop?category=Decorative%20Trays%20%26%20Urli');
                      setDecorDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-brand-maroon-subtle hover:text-brand-maroon transition-colors text-sm"
                  >
                    Decorative Urlis & Platters
                  </a>
                  <a
                    href="#/shop?category=Candle%20Holders%20%26%20Diyas"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('/shop?category=Candle%20Holders%20%26%20Diyas');
                      setDecorDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-brand-maroon-subtle hover:text-brand-maroon transition-colors text-sm"
                  >
                    Decorative Diyas & Lamps
                  </a>
                  <a
                    href="#/shop?category=Wall%20Decor"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('/shop?category=Wall%20Decor');
                      setDecorDropdown(false);
                    }}
                    className="block px-4 py-2 hover:bg-brand-maroon-subtle hover:text-brand-maroon transition-colors text-sm"
                  >
                    Wall Hangings & Sculptures
                  </a>
                </div>
              )}
            </div>

            {/* Vintage Collection */}
            <a
              href="#/shop?category=Vintage%20Collection"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/shop?category=Vintage%20Collection');
              }}
              className="text-white hover:text-brand-gold transition-colors py-2"
            >
              Vintage Collection
            </a>

            {/* Antique Metal Decor */}
            <a
              href="#/shop?category=Antique%20Metal%20Decor"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/shop?category=Antique%20Metal%20Decor');
              }}
              className="text-white hover:text-brand-gold transition-colors py-2"
            >
              Antique Metal
            </a>

            {/* Shop All */}
            <a
              href="#/shop"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/shop');
              }}
              className={`transition-colors py-2 ${
                currentPath === '/shop' ? 'text-brand-gold font-semibold' : 'text-white hover:text-brand-gold'
              }`}
            >
              Shop All
            </a>
          </nav>

          {/* Right Action Icons (Search, Wishlist, Cart Widget, Admin) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white hover:text-brand-gold"
              title="Search products..."
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNav('/shop?wishlist=true')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors relative text-white hover:text-brand-gold"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Widget Trigger (Matching Being Craft's fkcart-mini-toggler) */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/30 border border-white/10 transition-all text-white group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white group-hover:text-brand-gold transition-colors" />
                <span className="absolute -top-1.5 -right-2 bg-brand-gold text-black font-bold text-[10px] min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              </div>
              <span className="hidden sm:inline text-xs font-semibold tracking-wide text-brand-gold">
                ₹{cartSubtotal.toLocaleString('en-IN')}.00
              </span>
            </button>

            {/* Admin CMS Portal link */}
            <button
              onClick={() => handleNav('/admin')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-brand-gold"
              title="Admin CMS & Orders"
              aria-label="Admin CMS"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Offcanvas Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white text-charcoal-900 h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="bg-brand-maroon text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-gold flex items-center justify-center text-brand-maroon font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-heading font-bold text-lg">{BRAND.name}</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-white hover:text-brand-gold"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="p-4 divide-y divide-surface-border">
                <div className="py-2 space-y-1">
                  <button
                    onClick={() => handleNav('/')}
                    className="w-full text-left py-2.5 px-3 rounded-md hover:bg-brand-maroon-subtle font-medium text-charcoal-900 hover:text-brand-maroon"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNav('/shop')}
                    className="w-full text-left py-2.5 px-3 rounded-md hover:bg-brand-maroon-subtle font-medium text-charcoal-900 hover:text-brand-maroon"
                  >
                    Shop All Products
                  </button>
                </div>

                <div className="py-3">
                  <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider px-3">
                    Categories
                  </span>
                  <div className="mt-2 space-y-1 text-sm">
                    <button
                      onClick={() => handleNav('/shop?category=Antique%20Metal%20Decor')}
                      className="w-full text-left py-2 px-3 rounded hover:bg-surface-muted text-charcoal-800"
                    >
                      Antique Metal Decor
                    </button>
                    <button
                      onClick={() => handleNav('/shop?category=Brass%20Decor')}
                      className="w-full text-left py-2 px-3 rounded hover:bg-surface-muted text-charcoal-800"
                    >
                      Brass Decor
                    </button>
                    <button
                      onClick={() => handleNav('/shop?category=Pooja%20Essentials%20%26%20Idols')}
                      className="w-full text-left py-2 px-3 rounded hover:bg-surface-muted text-charcoal-800"
                    >
                      Pooja Essentials & Idols
                    </button>
                    <button
                      onClick={() => handleNav('/shop?category=Decorative%20Trays%20%26%20Urli')}
                      className="w-full text-left py-2 px-3 rounded hover:bg-surface-muted text-charcoal-800"
                    >
                      Decorative Trays & Urli
                    </button>
                    <button
                      onClick={() => handleNav('/shop?category=Candle%20Holders%20%26%20Diyas')}
                      className="w-full text-left py-2 px-3 rounded hover:bg-surface-muted text-charcoal-800"
                    >
                      Candle Holders & Diyas
                    </button>
                    <button
                      onClick={() => handleNav('/shop?category=Wall%20Decor')}
                      className="w-full text-left py-2 px-3 rounded hover:bg-surface-muted text-charcoal-800"
                    >
                      Wall Decor & Art
                    </button>
                    <button
                      onClick={() => handleNav('/shop?category=Vintage%20Collection')}
                      className="w-full text-left py-2 px-3 rounded hover:bg-surface-muted text-charcoal-800"
                    >
                      Vintage Pocket Watches & Curios
                    </button>
                    <button
                      onClick={() => handleNav('/shop?category=Dining%20%26%20Kitchen')}
                      className="w-full text-left py-2 px-3 rounded hover:bg-surface-muted text-charcoal-800"
                    >
                      Dining & Kitchen Essentials
                    </button>
                    <button
                      onClick={() => handleNav('/shop?category=Gifting')}
                      className="w-full text-left py-2 px-3 rounded hover:bg-surface-muted text-charcoal-800"
                    >
                      Traditional Gifting
                    </button>
                  </div>
                </div>

                <div className="py-3 space-y-1">
                  <button
                    onClick={() => handleNav('/about')}
                    className="w-full text-left py-2 px-3 rounded text-sm text-charcoal-700 hover:text-brand-maroon"
                  >
                    About Our Artisans
                  </button>
                  <button
                    onClick={() => handleNav('/contact')}
                    className="w-full text-left py-2 px-3 rounded text-sm text-charcoal-700 hover:text-brand-maroon"
                  >
                    Contact & Support
                  </button>
                  <button
                    onClick={() => handleNav('/admin')}
                    className="w-full text-left py-2 px-3 rounded text-sm text-brand-maroon font-semibold flex items-center gap-1.5"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Admin CMS & Orders</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Support Badge */}
            <div className="p-4 bg-surface-muted border-t border-surface-border text-xs text-charcoal-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-maroon shrink-0" />
              <span>100% Genuine Handcrafted Brass & Antique Decor</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
