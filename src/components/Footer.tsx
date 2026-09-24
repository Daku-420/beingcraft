import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';
import { BRAND } from '../config/brand';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing to our artisan newsletter!');
    setEmail('');
  };

  return (
    <footer className="bg-[#1A0307] text-white/80 border-t-4 border-brand-maroon">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-white/10 bg-brand-maroon/40 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
              <Sparkles className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Authentic Brass</h4>
              <p className="text-xs text-white/60">Handcrafted by master artisans</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
              <ShieldCheck className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Secure Packaging</h4>
              <p className="text-xs text-white/60">Zero-damage transit guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
              <span className="font-heading font-bold text-brand-gold text-lg">₹</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Indian Shipping</h4>
              <p className="text-xs text-white/60">On all orders above ₹{BRAND.shipping.freeShippingThreshold}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
              <CheckCircle2 className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Cash on Delivery</h4>
              <p className="text-xs text-white/60">Available across 26,000+ pincodes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center text-brand-maroon font-bold">
                <Sparkles className="w-5 h-5 text-brand-maroon fill-brand-maroon" />
              </div>
              <span className="font-heading font-bold text-2xl text-white uppercase tracking-wider">
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Dedicated to reviving and showcasing India's exquisite legacy of handcrafted metalcraft.
              From sacred temple brass idols and intricate peacock urlis to nostalgic vintage timepieces,
              each creation embodies decades of artisan skill and devotion.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={BRAND.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BRAND.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Handcrafted Collections
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate('/shop?category=Antique%20Metal%20Decor')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Antique Metal Decor
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?category=Brass%20Decor')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Pure Brass Decor
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?category=Pooja%20Essentials%20%26%20Idols')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Pooja Essentials & Idols
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?category=Decorative%20Trays%20%26%20Urli')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Decorative Urlis & Platters
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?category=Candle%20Holders%20%26%20Diyas')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Candle Holders & Diyas
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?category=Vintage%20Collection')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Vintage Pocket Watches
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop?category=Dining%20%26%20Kitchen')}
                  className="hover:text-brand-gold transition-colors"
                >
                  Dining & Kitchen
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-brand-gold transition-colors">
                  Our Story & Artisans
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-brand-gold transition-colors">
                  Contact Customer Care
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-brand-gold transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shipping-policy')} className="hover:text-brand-gold transition-colors">
                  Shipping & Delivery Info
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/returns-policy')} className="hover:text-brand-gold transition-colors">
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy-policy')} className="hover:text-brand-gold transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-brand-gold transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                <span className="text-xs text-white/70">
                  {BRAND.address.line1}, {BRAND.address.city}, {BRAND.address.state} - {BRAND.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href={`tel:${BRAND.phone}`} className="text-xs text-white/70 hover:text-brand-gold">
                  {BRAND.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="text-xs text-white/70 hover:text-brand-gold">
                  {BRAND.email}
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <span className="text-xs font-semibold text-white block mb-2">Join our Artisan Club</span>
              {subscribed ? (
                <p className="text-xs text-emerald-400 font-medium">✓ Subscribed for exclusive discounts!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs px-3 py-2 rounded-l-md focus:outline-none focus:border-brand-gold w-full"
                    />
                    <button
                      type="submit"
                      className="bg-brand-maroon hover:bg-brand-gold hover:text-black text-white px-3 py-2 rounded-r-md transition-colors text-xs font-semibold shrink-0"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] text-white/50 block">Get 10% OFF your first order with code WELCOME10</span>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved. Handcrafted with pride in India.</p>

          {/* Indian Payment Badges */}
          <div className="flex items-center flex-wrap gap-2 text-[11px] text-white/80">
            <span className="bg-white/10 px-2 py-1 rounded font-semibold text-brand-gold">UPI</span>
            <span className="bg-white/10 px-2 py-1 rounded font-semibold">GPay</span>
            <span className="bg-white/10 px-2 py-1 rounded font-semibold">PhonePe</span>
            <span className="bg-white/10 px-2 py-1 rounded font-semibold">Paytm</span>
            <span className="bg-white/10 px-2 py-1 rounded font-semibold">RuPay</span>
            <span className="bg-white/10 px-2 py-1 rounded font-semibold">Visa / MC</span>
            <span className="bg-white/10 px-2 py-1 rounded font-semibold">Net Banking</span>
            <span className="bg-white/10 px-2 py-1 rounded font-semibold text-emerald-400">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
