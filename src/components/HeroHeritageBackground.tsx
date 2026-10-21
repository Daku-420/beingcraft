import React from 'react';

/**
 * HeroHeritageBackground
 * Cinematic Indian Artisan Studio Atmosphere
 * Matching the BeingCraft Artisan Workshop Reference:
 * - High-resolution atmospheric background with carved architectural pillar on the far left
 * - Warm amber hanging lamps, glowing diya bokeh, and carved Sheesham wood textures
 * - Handcrafted antique brass idol & vessels on the rustic workshop table
 * - Dark chiaroscuro gradient overlay on the left for crisp text contrast and accessibility
 * - Seamless top transition from the deep burgundy navigation header
 * - Responsive desktop and mobile positioning
 */
export const HeroHeritageBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* 1. Base High-Resolution Artisan Studio Background Image */}
      <img
        src="/hero-artisan-studio.jpg"
        alt="BeingCraft Artisan Workshop"
        fetchPriority="high"
        className="w-full h-full object-cover object-[24%_center] sm:object-[28%_center] lg:object-[center_35%] scale-100 transform transition-transform duration-1000"
      />

      {/* 2. Global Moody Film & Chiaroscuro Tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(8, 2, 3, 0.75) 0%, rgba(16, 4, 6, 0.5) 45%, rgba(8, 2, 3, 0.35) 100%)',
        }}
      />

      {/* 3. Text Accessibility & Readability Darkening Shield (Left-to-Center) */}
      {/* Keeps the left column dark and uncluttered for headline, body copy & CTA buttons */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[62%] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(10, 2, 4, 0.95) 0%, rgba(10, 2, 4, 0.88) 35%, rgba(10, 2, 4, 0.6) 65%, rgba(10, 2, 4, 0.15) 88%, transparent 100%)',
        }}
      />

      {/* 4. Seamless Navigation Bar Transition (Top) */}
      {/* Blends smoothly with brand-maroon (#6E001B) from the header into the hero */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(110, 0, 27, 0.65) 0%, rgba(49, 3, 13, 0.4) 35%, rgba(16, 4, 6, 0.15) 70%, transparent 100%)',
        }}
      />

      {/* Antique Gold Hairline Divider at Top Seam */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none opacity-40"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.2) 15%, rgba(255, 237, 160, 0.5) 50%, rgba(212, 175, 55, 0.2) 85%, transparent 100%)',
        }}
      />

      {/* 5. Restrained Warm Golden Ambient Glow behind product showcase */}
      <div
        className="absolute right-[4%] lg:right-[8%] top-1/2 -translate-y-1/2 w-[320px] sm:w-[460px] lg:w-[580px] h-[320px] sm:h-[460px] lg:h-[580px] rounded-full pointer-events-none opacity-60 hidden sm:block"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255, 215, 0, 0.16) 0%, rgba(212, 175, 55, 0.10) 35%, rgba(184, 115, 51, 0.05) 55%, transparent 75%)',
          filter: 'blur(55px)',
        }}
      />

      {/* 6. Subtle Bottom Blend into Page Section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(12, 3, 5, 0.95) 0%, rgba(12, 3, 5, 0.5) 50%, transparent 100%)',
        }}
      />
    </div>
  );
};
