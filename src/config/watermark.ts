export interface WatermarkConfig {
  /** Master toggle to show/hide the watermark across all product images */
  enabled: boolean;
  /** URL or path to the transparent Beigncraft / BeingCraft logo asset */
  logoSrc: string;
  /** Accessible alt description */
  altText: string;
  /** Corner placement on the product image */
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Opacity of the watermark overlay (0.9 - 1.0) */
  opacity: number;
  /** Width percentage relative to the container on desktop (approx. 18-22%) */
  desktopWidthPercent: number;
  /** Width percentage relative to the container on mobile (approx. 20-24%) */
  mobileWidthPercent: number;
  /** Sensible maximum width on desktop to prevent oversized watermarks */
  maxWidthDesktopPx: number;
  /** Minimum width to ensure the tagline "A UNIT OF UK YATRA" remains crisp and legible */
  minWidthPx: number;
  /** Consistent safe margin from container edges */
  spacing: {
    topMobile: number; // 12px
    rightMobile: number; // 12px
    topDesktop: number; // 16px
    rightDesktop: number; // 16px
  };
  /** Contrast treatment: 'subtle-backing' adds elegant translucent dark backing for high contrast */
  contrastTreatment: 'subtle-backing' | 'drop-shadow-only' | 'none';
}

export const DEFAULT_WATERMARK_CONFIG: WatermarkConfig = {
  enabled: true,
  logoSrc: '/beingcraft-watermark.webp',
  altText: 'BeingCraft - A UNIT OF UK YATRA',
  position: 'top-right',
  opacity: 0.96, // 96% opacity - highly readable against all backgrounds
  desktopWidthPercent: 20, // 20% of displayed image width
  mobileWidthPercent: 22, // 22% of displayed image width on mobile
  maxWidthDesktopPx: 135, // sensible desktop cap
  minWidthPx: 64, // keeps "A UNIT OF UK YATRA" legible on mobile cards
  spacing: {
    topMobile: 12,
    rightMobile: 12,
    topDesktop: 16,
    rightDesktop: 16,
  },
  contrastTreatment: 'subtle-backing',
};
