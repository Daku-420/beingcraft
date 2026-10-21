import React from 'react';

export interface BrandLogoProps {
  className?: string;
  variant?: 'transparent' | 'banner';
  alt?: string;
  priority?: boolean;
}

/**
 * BrandLogo Component
 * Renders the official BeingCraft vector gold logo with lotus mark and "A UNIT OF UK YATRA" tagline.
 * Features lossless vector scaling, rich antique gold gradients, and optimal responsiveness.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'transparent',
  alt = 'BeingCraft - A UNIT OF UK YATRA',
}) => {
  const src = variant === 'banner' ? '/beingcraft-logo-banner.svg' : '/beingcraft-logo.svg';

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      className={`object-contain transition-transform duration-300 select-none ${className}`}
    />
  );
};

export default BrandLogo;
