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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    navigate(path);
  };

  const NAV_DROPDOWNS = [
    {
      title: 'Dining & Kitchen',
      path: '/shop?category=Dining%20%26%20Kitchen',
      items: [
        { label: 'Drinkware', path: '/shop?category=Dining%20%26%20Kitchen&subcategory=Drinkware' },
        { label: 'Kitchen Tools & Essentials', path: '/shop?category=Dining%20%26%20Kitchen&subcategory=Kitchen%20Tools%20%26%20Essentials' },
        { label: 'Serveware', path: '/shop?category=Dining%20%26%20Kitchen&subcategory=Serveware' },
        { label: 'Tableware', path: '/shop?category=Dining%20%26%20Kitchen&subcategory=Tableware' },
      ],
    },
    {
      title: 'Home Decor',
      path: '/shop?category=Home%20Decor',
      items: [
        { label: 'Pooja Essentials (Brass Collection)', path: '/shop?category=Home%20Decor&subcategory=Pooja%20Essentials%20(Brass%20Collection)' },
        { label: 'Showpieces & Idols', path: '/shop?category=Home%20Decor&subcategory=Showpieces%20%26%20Idols' },
        { label: 'Decorative Diyas & Accessories', path: '/shop?category=Home%20Decor&subcategory=Decorative%20Diyas%20%26%20Accessories' },
        { label: 'Spiritual Accents', path: '/shop?category=Home%20Decor&subcategory=Spiritual%20Accents' },
      ],
    },
    {
      title: 'Accessories',
      path: '/shop?category=Accessories',
      items: [
        { label: 'Utility Essentials', path: '/shop?category=Accessories&subcategory=Utility%20Essentials' },
        { label: 'Toys', path: '/shop?category=Accessories&subcategory=Toys' },
        { label: 'Artisan Bags & Purses', path: '/shop?category=Accessories&subcategory=Artisan%20Bags%20%26%20Purses' },
        { label: 'Lifestyle & Personal Care', path: '/shop?category=Accessories&subcategory=Lifestyle%20%26%20Personal%20Care' },
      ],
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-brand-maroon text-white border-b border-brand-gold/20 ${
        isScrolled ? 'shadow-lg py-2.5' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 -ml-1 text-white hover:text-brand-gold focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-maroon shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-maroon fill-brand-maroon" />
              </div>
              <span className="font-heading font-extrabold text-lg tracking-wider text-white uppercase">
                {BRAND.name}
              </span>
            </a>
          </div>

          {/* Desktop Brand Logo */}
          <div className="hidden lg:flex items-center">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-maroon shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-brand-maroon fill-brand-maroon" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-wider text-white uppercase flex items-center gap-1">
                  {BRAND.name}
                  <span className="text-brand-gold text-lg font-normal">.</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-brand-gold uppercase -mt-1 font-semibold">
                  Handcrafted Heritage
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium">
            {/* Home */}
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              className={`transition-colors py-2 ${
                currentPath === '/' || currentPath === ''
                  ? 'text-brand-gold font-semibold'
                  : 'text-white/90 hover:text-brand-gold'
              }`}
            >
              Home
            </a>

            {/* Shop */}
            <a
              href="#/shop"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/shop');
              }}
              className={`transition-colors py-2 ${
                currentPath === '/shop' ? 'text-brand-gold font-semibold' : 'text-white/90 hover:text-brand-gold'
              }`}
            >
              Shop
            </a>

            {/* Dropdown Categories: Dining & Kitchen, Home Decor, Accessories */}
            {NAV_DROPDOWNS.map((menu) => {
              const isOpen = activeDropdown === menu.title;
              return (
                <div
                  key={menu.title}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(menu.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNav(menu.path)}
                    className={`flex items-center gap-1.5 transition-colors py-2 focus:outline-none ${
                      isOpen
                        ? 'text-brand-gold font-semibold'
                        : 'text-white/95 hover:text-brand-gold font-medium'
                    }`}
                  >
                    <span>{menu.title}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-gold' : 'text-white/80'
                      }`}
                    />
                  </button>

                  {/* Dropdown Card */}
                  {isOpen && (
                    <div className="absolute top-full left-0 min-w-[260px] bg-white rounded-xl shadow-2xl py-2 text-charcoal-900 border border-surface-border animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                      {menu.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={`#${item.path}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNav(item.path);
                          }}
                          className="block px-5 py-2.5 hover:bg-brand-maroon-subtle/50 hover:text-brand-maroon transition-colors text-[13px] font-medium text-charcoal-800"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons (Search, Wishlist, Account, Cart Widget) */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white hover:text-brand-gold"
              title="Search handcrafted products..."
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNav('/wishlist')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors relative text-white hover:text-brand-gold"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Widget Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-black/25 hover:bg-black/35 border border-brand-gold/30 transition-all text-white group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white group-hover:text-brand-gold transition-colors" />
                <span className="absolute -top-1.5 -right-2 bg-brand-gold text-black font-extrabold text-[10px] min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              </div>
              <span className="hidden sm:inline text-xs font-bold tracking-wide text-brand-gold">
                ₹{cartSubtotal.toLocaleString('en-IN')}.00
              </span>
            </button>

            {/* Admin / Portal Trigger */}
            <button
              onClick={() => handleNav('/admin')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-brand-gold hidden sm:flex"
              title="Admin CMS & Orders"
              aria-label="Admin CMS"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Offcanvas Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white text-charcoal-900 h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="bg-brand-maroon text-white p-4 flex items-center justify-between border-b border-brand-gold/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-maroon font-bold shadow">
                    <Sparkles className="w-4 h-4 text-brand-maroon fill-brand-maroon" />
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-base tracking-wider block">
                      {BRAND.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-brand-gold font-light block">
                      Handcrafted Heritage
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-white/80 hover:text-brand-gold"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search Input */}
              <div className="p-3 bg-surface-cream border-b border-surface-border">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 bg-white rounded-lg border border-surface-border text-xs text-charcoal-500 shadow-sm"
                >
                  <Search className="w-4 h-4 text-brand-maroon" />
                  <span>Search handcrafted decor, idols...</span>
                </button>
              </div>

              {/* Drawer Links */}
              <div className="p-4 divide-y divide-surface-border text-sm">
                <div className="py-2 space-y-1">
                  <button
                    onClick={() => handleNav('/')}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-brand-maroon-subtle font-medium text-charcoal-900 hover:text-brand-maroon"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNav('/shop')}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-brand-maroon-subtle font-medium text-charcoal-900 hover:text-brand-maroon"
                  >
                    Shop All Products
                  </button>
                  <button
                    onClick={() => handleNav('/wishlist')}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-brand-maroon-subtle font-medium text-charcoal-900 hover:text-brand-maroon flex items-center justify-between"
                  >
                    <span>My Wishlist</span>
                    {wishlist.length > 0 && (
                      <span className="text-xs bg-brand-gold text-black font-bold px-2 py-0.5 rounded-full">
                        {wishlist.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Category Accordions: Dining & Kitchen, Home Decor, Accessories */}
                <div className="py-2 divide-y divide-surface-border/60">
                  {NAV_DROPDOWNS.map((menu) => {
                    const isExpanded = mobileExpandedMenu === menu.title;
                    return (
                      <div key={menu.title} className="py-2">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleNav(menu.path)}
                            className="text-left font-bold text-xs uppercase tracking-wider text-charcoal-900 hover:text-brand-maroon py-1 px-2 flex-1"
                          >
                            {menu.title}
                          </button>
                          <button
                            onClick={() => setMobileExpandedMenu(isExpanded ? null : menu.title)}
                            className="p-1.5 text-charcoal-500 hover:text-brand-maroon"
                            aria-label={`Toggle ${menu.title}`}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-brand-maroon' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-1 space-y-1 pl-3 border-l-2 border-brand-maroon/20 ml-2 py-1">
                            {menu.items.map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleNav(item.path)}
                                className="w-full text-left py-1.5 px-3 rounded hover:bg-surface-muted text-charcoal-700 text-xs font-medium block"
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Information Links */}
                <div className="py-3 space-y-1 text-xs">
                  <button
                    onClick={() => handleNav('/about')}
                    className="w-full text-left py-2 px-3 rounded text-charcoal-700 hover:text-brand-maroon"
                  >
                    About Our Artisans
                  </button>
                  <button
                    onClick={() => handleNav('/contact')}
                    className="w-full text-left py-2 px-3 rounded text-charcoal-700 hover:text-brand-maroon"
                  >
                    Contact & Customer Care
                  </button>
                  <button
                    onClick={() => handleNav('/admin')}
                    className="w-full text-left py-2 px-3 rounded text-brand-maroon font-semibold flex items-center gap-1.5"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Admin CMS & Order Management</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Support Badge */}
            <div className="p-4 bg-surface-muted border-t border-surface-border text-xs text-charcoal-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-maroon shrink-0" />
              <span>100% Genuine Handcrafted Indian Heritage</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
