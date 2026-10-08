export type PaymentStatus =
  | 'CREATED'
  | 'PAYMENT_INITIATED'
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED'
  | 'EXPIRED';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export type OrderStatus = 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface BackendOrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantName?: string;
  price: number;
  quantity: number;
  total: number;
}

export interface BackendShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface BackendOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
  };
  shippingAddress: BackendShippingAddress;
  items: BackendOrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number; // in INR
  totalPaise: number; // in Paise for gateways
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber: string;
  gatewayOrderId?: string;
  transactionId?: string;
  paymentSignature?: string;
  verifiedAt?: string;
  paymentMode: 'production' | 'test' | 'mock';
  failureReason?: string;
  notes?: string;
  upiVpa?: string;
}
