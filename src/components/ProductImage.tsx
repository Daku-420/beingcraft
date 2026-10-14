import React from 'react';
import { handleImageError, getSafeImageUrl } from '../utils/imageHelper';
import { ProductWatermark } from './ProductWatermark';
import type { WatermarkConfig } from '../config/watermark';

export interface ProductImageProps {
  /** Primary product image source */
  src?: string;
  /** Alternate text for accessibility */
  alt: string;
  /** Secondary image source for hover effect */
  secondarySrc?: string;
  /** Aspect ratio container class (e.g. 'aspect-[4/5]', 'aspect-square', 'aspect-[4/3]') */
  aspectRatioClass?: string;
  /** Container className */
  containerClassName?: string;
  /** Image className */
  imageClassName?: string;
  /** Whether to show the watermark overlay (default true for product images) */
  showWatermark?: boolean;
  /** Custom watermark configuration override */
  watermarkConfig?: Partial<WatermarkConfig>;
  /** Watermark size variant */
  watermarkSize?: 'compact' | 'standard' | 'large';
  /** Additional overlays or action buttons inside the image container */
  children?: React.ReactNode;
  /** Image loading strategy */
  loading?: 'lazy' | 'eager';
}

/**
 * Reusable Product Image component for BeingCraft.
 *
 * Encapsulates:
 * - `position: relative` image container
 * - Safe image URL fallback with error recovery
 * - Optional secondary image swap on hover
 * - Configurable `ProductWatermark` non-destructive overlay
 * - Slots for badges, wishlist buttons, and action controls
 */
export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  secondarySrc,
  aspectRatioClass = 'aspect-[4/5]',
  containerClassName = '',
  imageClassName = '',
  showWatermark = true,
  watermarkConfig,
  watermarkSize = 'standard',
  children,
  loading = 'lazy',
}) => {
  return (
    <div className={`relative ${aspectRatioClass} bg-surface-muted overflow-hidden ${containerClassName}`}>
      {/* Primary Image */}
      <img
        src={getSafeImageUrl(src)}
        alt={alt}
        loading={loading}
        onError={handleImageError}
        className={`w-full h-full object-cover object-center ${imageClassName}`}
      />

      {/* Optional secondary hover swap image */}
      {secondarySrc && (
        <img
          src={getSafeImageUrl(secondarySrc)}
          alt={alt}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
        />
      )}

      {/* Brand Watermark Overlay */}
      {showWatermark && (
        <ProductWatermark
          config={watermarkConfig}
          sizeVariant={watermarkSize}
        />
      )}

      {/* Embedded children (badges, action buttons, overlays) */}
      {children}
    </div>
  );
};
