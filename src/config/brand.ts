export interface BrandConfig {
  name: string;
  tagline: string;
  subtitle: string;
  phone: string;
  email: string;
  supportHours: string;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    pinterest: string;
  };
  currency: {
    symbol: string;
    code: string;
  };
  shipping: {
    freeShippingThreshold: number;
    standardShippingFee: number;
    estimatedDaysMin: number;
    estimatedDaysMax: number;
  };
}

export const BRAND: BrandConfig = {
  name: "BeingCraft",
  tagline: "HANDCRAFTED HERITAGE",
  subtitle: "Handcrafted Indian Wood, Stone, Brass, Metal & Traditional Heritage Decor",
  phone: "+91-7900827796",
  email: "info@beingcraft.com",
  supportHours: "Mon - Sat: 10:00 AM - 7:00 PM IST",
  address: {
    line1: "Artisan Guild Lane, Brassware Heritage Quarter",
    city: "Moradabad",
    state: "Uttar Pradesh",
    pincode: "244001",
    country: "India",
  },
  socials: {
    facebook: "https://facebook.com/beingcraftstore",
    instagram: "https://instagram.com/beingcraftdecor",
    youtube: "https://youtube.com/@beingcraftheritage",
    pinterest: "https://pinterest.com/beingcraft",
  },
  currency: {
    symbol: "₹",
    code: "INR",
  },
  shipping: {
    freeShippingThreshold: 999,
    standardShippingFee: 99,
    estimatedDaysMin: 3,
    estimatedDaysMax: 6,
  }
};
