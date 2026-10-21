import { DEFAULT_WATERMARK_CONFIG } from '../config/watermark';
import type { WatermarkConfig } from '../config/watermark';

export interface ProductWatermarkProps {
  className?: string;
  config?: Partial<WatermarkConfig>;
  /** Size variant override for different container scales */
  sizeVariant?: 'compact' | 'standard' | 'large';
}

/**
 * Reusable Product Image Watermark Overlay for BeingCraft.
 *
 * Implements a non-destructive positioned overlay with:
 * - Positioned in top-right corner with 12-16px responsive edge spacing
 * - Proportional width (~18-22% on desktop, ~20-24% on mobile)
 * - 90-100% opacity for high legibility
 * - Tagline "A UNIT OF UK YATRA" preserved intact with zero distortion
 * - Elegant dark-neutral translucent backing and subtle shadow for contrast on white/dark/multicolor photos
 * - `pointer-events-none` & `z-10` to never interfere with clicks, zooms, or hover interactions
 */
export const ProductWatermark: React.FC<ProductWatermarkProps> = ({
  className = '',
  config: customConfig,
  sizeVariant = 'standard',
}) => {
  const cfg: WatermarkConfig = {
    ...DEFAULT_WATERMARK_CONFIG,
    ...customConfig,
  };

  if (!cfg.enabled) {
    return null;
  }

  // Positioning classes based on configured position
  const getPositionClasses = () => {
    switch (cfg.position) {
      case 'top-left':
        return 'top-3 left-3 sm:top-3.5 sm:left-3.5 md:top-4 md:left-4';
      case 'bottom-right':
        return 'bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 md:bottom-4 md:right-4';
      case 'bottom-left':
        return 'bottom-3 left-3 sm:bottom-3.5 sm:left-3.5 md:bottom-4 md:left-4';
      case 'top-right':
      default:
        return 'top-3 right-3 sm:top-3.5 sm:right-3.5 md:top-4 md:right-4';
    }
  };

  // Responsive width styling
  const getWidthStyles = (): React.CSSProperties => {
    if (sizeVariant === 'large') {
      return {
        width: '20%',
        minWidth: '85px',
        maxWidth: `${cfg.maxWidthDesktopPx + 20}px`,
      };
    }
    if (sizeVariant === 'compact') {
      return {
        width: '22%',
        minWidth: `${cfg.minWidthPx}px`,
        maxWidth: '100px',
      };
    }
    // Standard (listing cards, quick view)
    return {
      width: '21%',
      minWidth: `${cfg.minWidthPx}px`,
      maxWidth: `${cfg.maxWidthDesktopPx}px`,
    };
  };

  return (
    <div
      className={`absolute ${getPositionClasses()} pointer-events-none select-none z-10 transition-opacity duration-300 ${className}`}
      style={{
        ...getWidthStyles(),
        opacity: cfg.opacity,
      }}
      aria-hidden="true"
    >
      {/* High-contrast elegant translucent wrapper with rounded corners */}
      <div
        className={`w-full flex items-center justify-center p-1 sm:p-1.5 rounded-md transition-all ${
          cfg.contrastTreatment === 'subtle-backing'
            ? 'bg-black/35 backdrop-blur-[2px] shadow-sm border border-white/10'
            : ''
        }`}
      >
        <img
          src={cfg.logoSrc}
          alt={cfg.altText}
          loading="lazy"
          className="w-full h-auto object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)]"
          style={{ aspectRatio: '1937 / 479' }}
        />
      </div>
    </div>
  );
};
