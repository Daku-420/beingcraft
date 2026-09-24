import React from 'react';
import { Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { BRAND } from '../config/brand';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { navigate } = useShop();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
          About Our Heritage
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-900">
          Reviving the Soul of Indian Metal Artistry
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
          At {BRAND.name}, we bridge generational brass craftsmen with contemporary homes that revere
          authenticity, sacred spiritual grace, and timeless design.
        </p>
      </div>

      {/* 2. Visual Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-sm text-charcoal-700 leading-relaxed">
          <h2 className="font-heading font-bold text-2xl text-charcoal-900">
            Forged in the Brass Capital of India
          </h2>
          <p>
            Our roots lie deep in Moradabad, Uttar Pradesh, a historic center renowned across continents
            for over four centuries as "Peetal Nagri" (The Brass City). Here, the rhythm of metal hammers
            and the radiant warmth of casting furnaces are passed down through families as sacred knowledge.
          </p>
          <p>
            Unlike mass-produced, machine-stamped decor, every single piece in our collection is poured,
            hand-filed, and finished by master artisans. Whether it is an intricate dancing Ganesha idol,
            a resonant acoustic temple bell, or a floating flower peacock urli, you can feel the weight of
            pure metal and the human touch in every curve.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-xl border border-surface-border">
          <img
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
            alt="Artisan sculpting brass idol"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="bg-surface-cream rounded-2xl p-8 border border-surface-border grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-maroon-subtle text-brand-maroon flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-charcoal-900">100% Virgin Metals</h3>
          <p className="text-xs text-charcoal-600">
            We use zero scrap fillers or toxic adulterants. Every brass and bell metal artifact is heavy, solid, and built to last generations.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-maroon-subtle text-brand-maroon flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-charcoal-900">Fair Artisan Guilds</h3>
          <p className="text-xs text-charcoal-600">
            We work directly with traditional guild clusters, ensuring fair wages, ethical working conditions, and livelihood security.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-maroon-subtle text-brand-maroon flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-charcoal-900">Transit Guarantee</h3>
          <p className="text-xs text-charcoal-600">
            Each delicate sculpture is wrapped in triple-layer bubble cushioning, thermo-foam, and reinforced outer shipping boxes.
          </p>
        </div>
      </div>

      {/* 4. Call to Action */}
      <div className="text-center py-6">
        <button
          onClick={() => navigate('/shop')}
          className="btn-pill-primary px-8 py-3 text-sm font-bold inline-flex items-center gap-2 shadow"
        >
          <span>Explore Handcrafted Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
