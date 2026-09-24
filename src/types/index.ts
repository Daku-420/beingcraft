export type ProductCategory =
  | 'Antique Metal Decor'
  | 'Brass Decor'
  | 'Pooja Essentials & Idols'
  | 'Vintage Collection'
  | 'Wall Decor'
  | 'Table Decor'
  | 'Candle Holders & Diyas'
  | 'Decorative Trays & Urli'
  | 'Sculptures & Figurines'
  | 'Dining & Kitchen'
  | 'Gifting';

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: number;
  image?: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  userCity: string;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: ProductCategory;
  subCategory?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  description: string;
  shortDescription: string;
  material: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'inches';
  };
  weightKg: number;
  colorFinish: string;
  stock: number;
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  tags: string[];
  images: string[];
  variants?: ProductVariant[];
  careInstructions: string[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  description: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantName?: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
  };
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending' | 'cod_pending';
  orderStatus: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  notes?: string;
}
