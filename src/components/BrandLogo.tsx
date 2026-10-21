import React from 'react';

export interface BrandLogoProps {
  className?: string;
  variant?: 'banner' | 'transparent';
  alt?: string;
  priority?: boolean;
}

/**
 * BrandLogo Component
 * Renders the official BeingCraft logo banner with the deep maroon background,
 * golden metallic typography, lotus mark, and "• A UNIT OF UK YATRA •" subtitle.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-11 w-auto',
  variant = 'banner',
  alt = 'BeingCraft - A UNIT OF UK YATRA',
}) => {
  // Default to the official banner asset matching the user's exact uploaded brand identity
  const src = variant === 'transparent' ? '/beingcraft-logo.svg' : '/beingcraft-logo.png';

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      className={`object-contain rounded-md transition-transform duration-300 select-none ${className}`}
      onError={(e) => {
        const target = e.currentTarget;
        if (!target.src.includes('beingcraft-logo.png')) {
          target.src = '/beingcraft-logo.png';
        }
      }}
    />
  );
};

export default BrandLogo;
