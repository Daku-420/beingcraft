import type { Order, PaymentMethod, PaymentStatus, ShippingAddress } from '../types';

export interface PaymentConfigResponse {
  success: boolean;
  paymentMode: 'production' | 'test' | 'mock';
  keyId: string;
  hasSecret: boolean;
  webhookSecretSet: boolean;
  error?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  order: Order;
  orderId: string;
  orderNumber: string;
  gatewayOrderId?: string;
  amount: number;
  amountPaise: number;
  currency: string;
  keyId?: string;
  paymentMode: 'production' | 'test' | 'mock';
  paymentStatus: PaymentStatus;
  mockSignatureToken?: string;
  error?: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  paymentStatus: PaymentStatus;
  order: Order;
  message: string;
  error?: string;
}

export interface OrderStatusResponse {
  success: boolean;
  orderId: string;
  orderNumber: string;
  paymentStatus: PaymentStatus;
  orderStatus: Order['orderStatus'];
  paymentMethod: PaymentMethod;
  amount: number;
  currency: string;
  transactionId?: string;
  verifiedAt?: string;
  failureReason?: string;
  order?: Order;
  error?: string;
}

// 1. Fetch Payment Config
export async function getPaymentConfig(): Promise<PaymentConfigResponse> {
  const res = await fetch('/api/payment/config');
  if (!res.ok) {
    throw new Error(`Failed to load payment configuration (${res.status})`);
  }
  return res.json();
}

// 2. Request Order Creation on Backend
export async function createBackendOrder(params: {
  customer: { fullName: string; phone: string; email: string };
  shippingAddress: ShippingAddress;
  items: Array<{ productId: string; quantity: number; variantName?: string }>;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  upiVpa?: string;
}): Promise<CreateOrderResponse> {
  const res = await fetch('/api/payment/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to initialize order with server');
  }
  return data;
}

// 3. Request Server-side Cryptographic Verification
export async function verifyPaymentWithServer(params: {
  orderId: string;
  gatewayOrderId: string;
  paymentId: string;
  signature: string;
  mockSignatureToken?: string;
}): Promise<VerifyPaymentResponse> {
  const res = await fetch('/api/payment/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Payment verification failed on server');
  }
  return data;
}

// 4. Cancel In-Progress Transaction
export async function cancelPaymentOnServer(orderId: string, reason?: string): Promise<{ success: boolean; paymentStatus: PaymentStatus }> {
  try {
    const res = await fetch('/api/payment/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, reason }),
    });
    return res.json();
  } catch (e) {
    console.error('Failed to notify server of cancellation:', e);
    return { success: false, paymentStatus: 'CANCELLED' };
  }
}

// 5. Query Authoritative Order Payment Status from Server
export async function fetchOrderPaymentStatus(orderId: string): Promise<OrderStatusResponse> {
  const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/payment-status`);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || `Could not find payment record for order ID: ${orderId}`);
  }
  return data;
}

// 6. Dynamically load official Razorpay Checkout SDK
export function loadRazorpaySDK(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof (window as any).Razorpay !== 'undefined') {
      return resolve(true);
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load official Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
