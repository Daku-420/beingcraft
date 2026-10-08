export type ProductCategory =
  | 'Wood Craft'
  | 'Wood Crafts'
  | 'Stone Craft'
  | 'Brass & Metal'
  | 'Home Decor'
  | 'Dining & Kitchen'
  | 'Collections'
  | 'Antique Metal Decor'
  | 'Brass Decor'
  | 'Pooja Essentials & Idols'
  | 'Vintage Collection'
  | 'Wall Decor'
  | 'Table Decor'
  | 'Candle Holders & Diyas'
  | 'Decorative Trays & Urli'
  | 'Sculptures & Figurines'
  | 'Accessories'
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
  collection?: 'New Arrivals' | 'Best Sellers' | 'Festive Collection' | 'Heritage Collection' | 'Artisan Collection' | 'Gifts' | string;
  badge?: 'NEW' | 'BESTSELLER' | 'HANDCRAFTED' | 'LIMITED' | 'SALE' | string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  description: string;
  shortDescription: string;
  highlights?: string[]; // Key product highlights bullet points
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
  cancellationPolicy?: string; // Order cancellation terms
  returnPolicy?: string; // Return & replacement terms
  isCancellable?: boolean;
  isReturnable?: boolean;
  returnWindowDays?: number;
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

export type PaymentStatus =
  | 'CREATED'
  | 'PAYMENT_INITIATED'
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED'
  | 'EXPIRED';

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
  paymentStatus: PaymentStatus;
  orderStatus: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  notes?: string;
  gatewayOrderId?: string;
  transactionId?: string;
  verifiedAt?: string;
  paymentSignature?: string;
  paymentMode?: 'production' | 'test' | 'mock';
  failureReason?: string;
}

