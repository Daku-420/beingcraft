import React from 'react';

/**
 * HeroHeritageBackground
 * Luxury Indian Handicraft Heritage Background
 * Theme: Midnight Burgundy & Antique Gold (#100304 & #31030D)
 * Features:
 * - Near-black burgundy base with jewel-toned burgundy depth
 * - Mughal jaali trellis lattice pattern masked to edges/corners
 * - Antique gold floral/Mughal corner spandrels
 * - Warm ambient golden glow complementing brass and wood handcrafted products
 * - Micro-fine grain texture for depth (no external images)
 * - Accessibility text darkening shield
 * - Seamless top transition from burgundy navigation header
 */
export const HeroHeritageBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* 1. Base Multi-layer Midnight Burgundy & Wine Gradient Canvas */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#100304',
          backgroundImage: `
            /* Ambient product illumination zone on right side */
            radial-gradient(ellipse 70% 75% at 78% 42%, rgba(49, 3, 13, 0.95) 0%, rgba(30, 2, 8, 0.8) 45%, rgba(16, 3, 4, 0.98) 75%, #100304 100%),
            /* Top header blend: seamlessly transitions from brand-maroon (#6E001B) down into deep burgundy */
            linear-gradient(180deg, rgba(110, 0, 27, 0.45) 0%, rgba(49, 3, 13, 0.25) 18%, rgba(16, 3, 4, 0.1) 40%, #100304 100%),
            /* Overall soft vignette for depth */
            radial-gradient(circle at 50% 50%, transparent 50%, rgba(10, 2, 3, 0.8) 100%)
          `,
        }}
      />

      {/* 2. Restrained Warm Golden Ambient Glow behind product showcase (Desktop & Tablet) */}
      <div
        className="absolute right-[2%] lg:right-[6%] top-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] lg:w-[620px] h-[340px] sm:h-[480px] lg:h-[620px] rounded-full pointer-events-none opacity-70"
        style={{
          background:
            'radial-gradient(circle at center, rgba(212, 175, 55, 0.16) 0%, rgba(184, 115, 51, 0.10) 35%, rgba(49, 3, 13, 0.05) 60%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Secondary focused warm amber core for brass highlights */}
      <div
        className="absolute right-[8%] lg:right-[12%] top-[35%] w-[220px] sm:w-[320px] lg:w-[400px] h-[220px] sm:h-[320px] lg:h-[400px] rounded-full pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255, 237, 160, 0.14) 0%, rgba(212, 175, 55, 0.08) 40%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* 3. SVG Heritage System: Masks, Patterns, Jaali Trellis, Corner Motifs */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Subtle Organic Film Grain Filter */}
          <filter id="heritage-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>

          {/* Antique Gold Metallic Gradient */}
          <linearGradient id="antique-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9DB" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#D4AF37" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#AA7C11" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#E6CE6C" stopOpacity="0.75" />
          </linearGradient>

          {/* Radial Mask for Jaali Lattice: Keeps center & center-left dark/clean, edges subtly revealed */}
          <radialGradient id="jaali-edge-mask-grad" cx="42%" cy="48%" r="62%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="45%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </radialGradient>
          <mask id="jaali-edge-mask">
            <rect width="100%" height="100%" fill="url(#jaali-edge-mask-grad)" />
          </mask>

          {/* Traditional Indian Royal Jaali Trellis Pattern (8-point star & floral rosette) */}
          <pattern id="mughal-jaali-pattern" width="56" height="56" patternUnits="userSpaceOnUse">
            {/* Outer diamond frame */}
            <path
              d="M 28 0 L 56 28 L 28 56 L 0 28 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.65"
              strokeOpacity="0.35"
            />
            {/* Inner 8-pointed star */}
            <path
              d="M 28 11 L 32.5 23.5 L 45 28 L 32.5 32.5 L 28 45 L 23.5 32.5 L 11 28 L 23.5 23.5 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.6"
              strokeOpacity="0.4"
            />
            {/* Center floret */}
            <circle cx="28" cy="28" r="2.8" fill="none" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.45" />
            <circle cx="28" cy="28" r="0.9" fill="#D4AF37" fillOpacity="0.3" />
            {/* Corner diagonal connecting nodes */}
            <path
              d="M 0 0 L 11 11 M 56 0 L 45 11 M 56 56 L 45 45 M 0 56 L 11 45"
              stroke="#D4AF37"
              strokeWidth="0.55"
              strokeOpacity="0.3"
            />
            {/* Axis connector lines */}
            <path
              d="M 28 0 L 28 11 M 28 45 L 28 56 M 0 28 L 11 28 M 45 28 L 56 28"
              stroke="#D4AF37"
              strokeWidth="0.55"
              strokeOpacity="0.3"
            />
            {/* Corner quadrant florets */}
            <path
              d="M 0 11 C 5 7, 7 5, 11 0 M 56 11 C 51 7, 49 5, 45 0 M 56 45 C 51 49, 49 51, 45 56 M 0 45 C 5 49, 7 51, 11 56"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.5"
              strokeOpacity="0.25"
            />
          </pattern>
        </defs>

        {/* Jaali Trellis Layer with edge/corner mask (subtle, non-distracting) */}
        <rect
          width="100%"
          height="100%"
          fill="url(#mughal-jaali-pattern)"
          mask="url(#jaali-edge-mask)"
          opacity="0.14"
        />

        {/* Micro Film Grain Texture (overlayed seamlessly) */}
        <rect width="100%" height="100%" filter="url(#heritage-grain)" opacity="0.03" className="mix-blend-overlay" />
      </svg>

      {/* 4. Elegant Mughal Corner & Ornamental Filigree Accents */}
      {/* Top-Right Corner Mughal Arch & Floral Arabesque */}
      <div className="absolute top-0 right-0 w-44 h-44 sm:w-64 sm:h-64 lg:w-80 lg:h-80 pointer-events-none opacity-20 sm:opacity-25 transition-opacity">
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer Border Frames */}
          <path d="M 0 12 L 228 12 L 228 240" stroke="url(#antique-gold-grad)" strokeWidth="1.2" strokeOpacity="0.7" />
          <path d="M 0 20 L 220 20 L 220 240" stroke="url(#antique-gold-grad)" strokeWidth="0.6" strokeDasharray="2 3" strokeOpacity="0.6" />
          
          {/* Mughal Cusped Arch Quadrant */}
          <path
            d="M 40 240 C 40 180, 70 140, 110 110 C 140 70, 180 40, 240 40"
            stroke="url(#antique-gold-grad)"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />
          <path
            d="M 48 240 C 48 185, 76 148, 114 118 C 148 76, 185 48, 240 48"
            stroke="url(#antique-gold-grad)"
            strokeWidth="0.7"
            strokeOpacity="0.5"
          />

          {/* Intricate Floral Spandrel & Paisley / Boteh Motif */}
          <g transform="translate(145, 25)">
            {/* Corner Rosette */}
            <circle cx="65" cy="15" r="5" stroke="url(#antique-gold-grad)" strokeWidth="0.8" />
            <circle cx="65" cy="15" r="2" fill="url(#antique-gold-grad)" fillOpacity="0.7" />
            {/* Paisley / Kalga curve */}
            <path
              d="M 55 25 C 45 40, 48 60, 30 75 C 20 62, 30 45, 45 35 Z"
              fill="url(#antique-gold-grad)"
              fillOpacity="0.18"
              stroke="url(#antique-gold-grad)"
              strokeWidth="0.8"
            />
            {/* Tendril scrolls */}
            <path
              d="M 30 75 C 20 85, 8 82, 0 95 C 10 92, 18 100, 12 110"
              stroke="url(#antique-gold-grad)"
              strokeWidth="0.8"
              strokeOpacity="0.6"
              fill="none"
            />
            <path
              d="M 60 40 C 72 50, 70 65, 80 75"
              stroke="url(#antique-gold-grad)"
              strokeWidth="0.8"
              strokeOpacity="0.6"
              fill="none"
            />
            {/* Small floral buds */}
            <circle cx="30" cy="75" r="2.2" fill="url(#antique-gold-grad)" fillOpacity="0.6" />
            <circle cx="0" cy="95" r="2" fill="url(#antique-gold-grad)" fillOpacity="0.6" />
            <circle cx="80" cy="75" r="2" fill="url(#antique-gold-grad)" fillOpacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Bottom-Left Corner Mughal Ornament (Flipped/Rotated) */}
      <div className="absolute bottom-0 left-0 w-36 h-36 sm:w-56 sm:h-56 lg:w-72 lg:h-72 pointer-events-none opacity-15 sm:opacity-20 rotate-180">
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M 0 12 L 228 12 L 228 240" stroke="url(#antique-gold-grad)" strokeWidth="1.2" strokeOpacity="0.65" />
          <path d="M 0 20 L 220 20 L 220 240" stroke="url(#antique-gold-grad)" strokeWidth="0.6" strokeDasharray="2 3" strokeOpacity="0.5" />
          <path
            d="M 40 240 C 40 180, 70 140, 110 110 C 140 70, 180 40, 240 40"
            stroke="url(#antique-gold-grad)"
            strokeWidth="1.3"
            strokeOpacity="0.7"
          />
          <g transform="translate(145, 25)">
            <circle cx="65" cy="15" r="4.5" stroke="url(#antique-gold-grad)" strokeWidth="0.8" />
            <circle cx="65" cy="15" r="2" fill="url(#antique-gold-grad)" fillOpacity="0.6" />
            <path
              d="M 55 25 C 45 40, 48 60, 30 75 C 20 62, 30 45, 45 35 Z"
              fill="url(#antique-gold-grad)"
              fillOpacity="0.15"
              stroke="url(#antique-gold-grad)"
              strokeWidth="0.8"
            />
            <path
              d="M 30 75 C 20 85, 8 82, 0 95"
              stroke="url(#antique-gold-grad)"
              strokeWidth="0.8"
              strokeOpacity="0.5"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* Top-Left Delicate Arch Corner Accent (Discreet, framing the top margin without touching text) */}
      <div className="absolute top-0 left-0 w-28 h-28 sm:w-40 sm:h-40 pointer-events-none opacity-15">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M 0 8 L 112 8" stroke="url(#antique-gold-grad)" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M 8 0 L 8 112" stroke="url(#antique-gold-grad)" strokeWidth="1" strokeOpacity="0.6" />
          <path
            d="M 8 40 C 24 40, 40 24, 40 8"
            stroke="url(#antique-gold-grad)"
            strokeWidth="0.8"
            strokeOpacity="0.5"
            fill="none"
          />
          <circle cx="20" cy="20" r="2" fill="url(#antique-gold-grad)" fillOpacity="0.5" />
        </svg>
      </div>

      {/* 5. Seamless Header Transition: Antique Gold Hairline Accent at Top Edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none opacity-40"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.2) 15%, rgba(255, 237, 160, 0.5) 50%, rgba(212, 175, 55, 0.2) 85%, transparent 100%)',
        }}
      />

      {/* 6. Text Accessibility & Readability Shield */}
      {/* Ensures crisp contrast for headline, body copy, badges & CTA buttons */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[62%] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(16, 3, 4, 0.94) 0%, rgba(16, 3, 4, 0.88) 45%, rgba(16, 3, 4, 0.45) 75%, transparent 100%)',
        }}
      />

      {/* Subtle bottom fade into the page section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(16, 3, 4, 0.6) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};
