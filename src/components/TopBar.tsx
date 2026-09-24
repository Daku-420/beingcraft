import React from 'react';
import { Phone, Mail, Sparkles } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';
import { BRAND } from '../config/brand';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-brand-maroon-dark text-white/90 text-xs py-2 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Contact Info */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${BRAND.phone}`}
            className="flex items-center gap-1.5 hover:text-brand-gold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span>{BRAND.phone}</span>
          </a>
          <span className="text-white/30 hidden sm:inline">|</span>
          <a
            href={`mailto:${BRAND.email}`}
            className="flex items-center gap-1.5 hover:text-brand-gold transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-brand-gold" />
            <span>{BRAND.email}</span>
          </a>
        </div>

        {/* Center: Live Announcement */}
        <div className="hidden md:flex items-center gap-1.5 text-brand-gold font-medium">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Festive Offer: Free Express Shipping on Orders Above ₹{BRAND.shipping.freeShippingThreshold} | Code: WELCOME10</span>
        </div>

        {/* Right: Social icons & Help */}
        <div className="flex items-center gap-3">
          <a
            href={BRAND.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-gold transition-colors"
            aria-label="Facebook"
          >
            <FacebookIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={BRAND.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-gold transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={BRAND.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-gold transition-colors"
            aria-label="YouTube"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
