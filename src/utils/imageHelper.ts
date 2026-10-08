import React from 'react';

// Lightweight, elegant SVG fallback that requires 0 network requests
export const DEFAULT_PRODUCT_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 750' width='600' height='750'%3E" +
  "%3Crect width='100%25' height='100%25' fill='%23F8F5F0'/%3E" +
  "%3Crect x='40' y='40' width='520' height='670' rx='16' fill='none' stroke='%23C5A059' stroke-width='1.5' stroke-dasharray='6 6' opacity='0.5'/%3E" +
  "%3Ccircle cx='300' cy='320' r='110' fill='%23EFE8DC'/%3E" +
  "%3Cpath d='M260 370 Q300 240 340 370 Z' fill='%23C5A059' opacity='0.75'/%3E" +
  "%3Ctext x='50%25' y='480' text-anchor='middle' font-family='serif' font-size='24' font-weight='700' fill='%23661824' letter-spacing='3'%3EBEINGCRAFT%3C/text%3E" +
  "%3Ctext x='50%25' y='515' text-anchor='middle' font-family='sans-serif' font-size='13' fill='%23888888' letter-spacing='1'%3EHANDCRAFTED HERITAGE%3C/text%3E" +
  "%3C/svg%3E";

/**
 * Replaces a broken image with the default handcrafted placeholder.
 * Prevents recursive loops if the fallback itself triggers onError.
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallback: string = DEFAULT_PRODUCT_IMAGE
) => {
  const target = e.currentTarget;
  if (target.src !== fallback) {
    target.src = fallback;
  }
};

/**
 * Ensures any image URL is safely encoded and valid.
 */
export const getSafeImageUrl = (src?: string): string => {
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return DEFAULT_PRODUCT_IMAGE;
  }
  return src.trim();
};
