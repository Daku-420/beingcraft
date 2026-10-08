import React, { useEffect, useState, useCallback } from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Printer,
  ArrowRight,
  Clock,
  XCircle,
  AlertTriangle,
  RotateCw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { fetchOrderPaymentStatus, type OrderStatusResponse } from '../services/paymentApi';
import type { Order } from '../types';
import { handleImageError, getSafeImageUrl } from '../utils/imageHelper';

interface OrderConfirmationPageProps {
  orderId: string;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId }) => {
  const { navigate, getOrderById } = useShop();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusData, setStatusData] = useState<OrderStatusResponse | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Authoritative status check directly from backend server
  const loadStatus = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await fetchOrderPaymentStatus(orderId);
      setStatusData(data);
    } catch (err: unknown) {
      const errorObj = err as Error;
      console.warn(`[OrderConfirmation] Backend status lookup failed:`, errorObj.message);
      // Fallback to local context only if order exists locally, but mark as unverified
      const local = getOrderById(orderId);
      if (local) {
        setStatusData({
          success: true,
          orderId: local.id,
          orderNumber: local.orderNumber,
          paymentStatus: local.paymentStatus,
          orderStatus: local.orderStatus,
          paymentMethod: local.paymentMethod,
          amount: local.total,
          currency: 'INR',
          transactionId: local.transactionId,
          verifiedAt: local.verifiedAt,
          failureReason: local.failureReason,
          order: local,
        });
      } else {
        setError(errorObj.message || 'Order could not be located in server records.');
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [orderId, getOrderById]);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-maroon border-t-transparent rounded-full animate-spin mx-auto" />
        <h2 className="font-heading font-bold text-xl text-charcoal-900">
          Verifying Payment with Server...
        </h2>
        <p className="text-xs text-charcoal-500">
          Querying authoritative order status from backend gateway records.
        </p>
      </div>
    );
  }

  if (error || !statusData || !statusData.order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-charcoal-900">
          Order Verification Failed
        </h2>
        <p className="text-xs text-charcoal-600 max-w-md mx-auto">
          {error || 'No verified server record exists for this order ID. Payments cannot be confirmed without server validation.'}
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button onClick={() => loadStatus(true)} className="btn-pill-outline text-xs px-5 py-2.5 flex items-center gap-2">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Retry Verification</span>
          </button>
          <button onClick={() => navigate('/shop')} className="btn-pill-primary text-xs px-6 py-2.5">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const order: Order = statusData.order;
  const paymentStatus = statusData.paymentStatus;
  const isCod = order.paymentMethod === 'cod';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 1. STATUS BANNER (Dynamic based strictly on Server-Verified State) */}

      {/* CASE A: SUCCESS (Only state that allows PAID) */}
      {paymentStatus === 'SUCCESS' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block">
            Payment Verified & Received
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            Thank You, {order.customer.fullName}!
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
            Your transaction has been cryptographically verified and captured. Our master artisans are preparing your handcrafted treasures.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs font-semibold text-charcoal-700">
            <span className="bg-white px-3 py-1.5 rounded-lg border border-surface-border">
              Order No: <strong className="text-brand-maroon">{order.orderNumber}</strong>
            </span>
            <span className="bg-white px-3 py-1.5 rounded-lg border border-surface-border">
              Tracking ID: <strong className="text-charcoal-900">{order.trackingNumber}</strong>
            </span>
            {order.transactionId && (
              <span className="bg-white px-3 py-1.5 rounded-lg border border-surface-border flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>TxID: <strong className="font-mono text-charcoal-900">{order.transactionId}</strong></span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* CASE B: PENDING (COD or Bank processing) */}
      {paymentStatus === 'PENDING' && (
        <div className={`rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm border ${
          isCod ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
        }`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md text-white ${
            isCod ? 'bg-amber-600' : 'bg-blue-600'
          }`}>
            {isCod ? <Truck className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
          </div>
          <span className={`text-xs font-bold uppercase tracking-widest block ${
            isCod ? 'text-amber-800' : 'text-blue-800'
          }`}>
            {isCod ? 'Cash on Delivery • Payment Pending' : 'Payment Pending • Awaiting Gateway Confirmation'}
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            {isCod ? 'Order Confirmed for COD Delivery' : 'Payment Under Verification'}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
            {isCod
              ? 'Your order has been placed. Payment is due upon parcel arrival. You may pay cash or scan the delivery executive\'s UPI QR code.'
              : 'We have initiated the transaction with your payment provider and are awaiting settlement confirmation. If money was debited, it will update automatically.'}
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs font-semibold text-charcoal-700">
            <span className="bg-white px-3 py-1.5 rounded-lg border border-surface-border">
              Order No: <strong className="text-brand-maroon">{order.orderNumber}</strong>
            </span>
            {!isCod && (
              <button
                onClick={() => loadStatus(true)}
                disabled={isRefreshing}
                className="btn-pill-primary text-xs px-4 py-1.5 flex items-center gap-1.5"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh Payment Status</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* CASE C: PAYMENT_INITIATED (Incomplete / In-progress) */}
      {paymentStatus === 'PAYMENT_INITIATED' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Clock className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 block">
            Payment Initiated
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-charcoal-900">
            Awaiting Payment Completion
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
            An order was created on our server, but payment authorization has not yet completed. The order will remain UNPAID until verified.
          </p>
          <div className="pt-3 flex justify-center gap-3">
            <button
              onClick={() => loadStatus(true)}
              disabled={isRefreshing}
              className="btn-pill-primary text-xs px-4 py-2 flex items-center gap-2"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Check Status Again</span>
            </button>
            <button
              onClick={() => navigate('/checkout')}
              className="btn-pill-outline text-xs px-5 py-2"
            >
              Return to Checkout
            </button>
          </div>
        </div>
      )}

      {/* CASE D: FAILED */}
      {paymentStatus === 'FAILED' && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-md">
            <XCircle className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-800 block">
            Payment Failed
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-charcoal-900">
            Transaction Declined / Unverified
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
            {order.failureReason || 'The payment gateway was unable to authorize the transaction or signature verification failed. No funds have been accepted for this order.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/checkout')}
              className="btn-pill-primary text-xs px-6 py-2.5 flex items-center gap-2"
            >
              <span>Retry Payment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="btn-pill-outline text-xs px-5 py-2.5"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      {/* CASE E: CANCELLED */}
      {paymentStatus === 'CANCELLED' && (
        <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-500 text-white flex items-center justify-center mx-auto shadow-md">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-700 block">
            Payment Cancelled
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-charcoal-900">
            Transaction Was Cancelled
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
            This checkout session was cancelled. No money was deducted from your account.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/checkout')}
              className="btn-pill-primary text-xs px-6 py-2.5"
            >
              Restart Checkout
            </button>
          </div>
        </div>
      )}

      {/* CASE F: EXPIRED */}
      {paymentStatus === 'EXPIRED' && (
        <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Clock className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-700 block">
            Payment Expired
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-charcoal-900">
            Payment Window Expired
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
            The allotted time for this payment session has elapsed. Please start a new checkout.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/cart')}
              className="btn-pill-primary text-xs px-6 py-2.5"
            >
              Return to Cart
            </button>
          </div>
        </div>
      )}

      {/* 2. Order Metadata & Shipping Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shipping Address */}
        <div className="bg-white p-5 rounded-xl border border-surface-border shadow-sm space-y-2 text-xs">
          <div className="flex items-center gap-2 font-heading font-bold text-charcoal-900 text-sm border-b border-surface-border pb-2">
            <MapPin className="w-4 h-4 text-brand-maroon" />
            <span>Shipping Address</span>
          </div>
          <p className="font-semibold text-charcoal-900">{order.shippingAddress.fullName}</p>
          <p className="text-charcoal-600 leading-relaxed">
            {order.shippingAddress.addressLine1}
            {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
          </p>
          <p className="text-charcoal-600">Phone: +91-{order.shippingAddress.phone}</p>
        </div>

        {/* Payment Details */}
        <div className="bg-white p-5 rounded-xl border border-surface-border shadow-sm space-y-2 text-xs">
          <div className="flex items-center gap-2 font-heading font-bold text-charcoal-900 text-sm border-b border-surface-border pb-2">
            <CreditCard className="w-4 h-4 text-brand-maroon" />
            <span>Payment Info</span>
          </div>
          <p className="capitalize text-charcoal-800">
            Method: <strong className="text-charcoal-900 uppercase">{order.paymentMethod}</strong>
          </p>
          <div className="text-charcoal-600 flex items-center gap-1.5">
            <span>Status:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                paymentStatus === 'SUCCESS'
                  ? 'bg-emerald-100 text-emerald-800'
                  : paymentStatus === 'PENDING'
                  ? 'bg-amber-100 text-amber-800'
                  : paymentStatus === 'FAILED'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              {paymentStatus === 'SUCCESS'
                ? 'PAID (Verified)'
                : paymentStatus === 'PENDING'
                ? isCod
                  ? 'Cash on Delivery (Pending)'
                  : 'Payment Pending'
                : paymentStatus}
            </span>
          </div>
          {order.transactionId && (
            <p className="text-charcoal-600 truncate text-[11px]">
              TxID: <strong className="font-mono text-charcoal-900">{order.transactionId}</strong>
            </p>
          )}
          <p className="text-charcoal-600">
            Total:{' '}
            <strong className="text-brand-maroon">
              ₹{order.total.toLocaleString('en-IN')}.00
            </strong>
          </p>
        </div>

        {/* Delivery Status */}
        <div className="bg-white p-5 rounded-xl border border-surface-border shadow-sm space-y-2 text-xs">
          <div className="flex items-center gap-2 font-heading font-bold text-charcoal-900 text-sm border-b border-surface-border pb-2">
            <Truck className="w-4 h-4 text-brand-maroon" />
            <span>Delivery Tracking</span>
          </div>
          <p className="text-charcoal-800">
            Estimated Delivery:{' '}
            <strong className="text-charcoal-900 block mt-0.5">Within 3-5 Business Days</strong>
          </p>
          <p className="text-charcoal-600">
            Current Status:{' '}
            <span className="font-semibold text-brand-maroon bg-brand-maroon-subtle px-2 py-0.5 rounded">
              {order.orderStatus}
            </span>
          </p>
          <p className="text-[11px] text-charcoal-500">Live dispatch alerts via SMS & email.</p>
        </div>
      </div>

      {/* 3. Items Ordered Table */}
      <div className="bg-white rounded-xl border border-surface-border shadow-sm overflow-hidden">
        <div className="p-4 bg-surface-muted border-b border-surface-border flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-charcoal-900 flex items-center gap-2">
            <Package className="w-4 h-4 text-brand-maroon" />
            <span>Purchased Items ({order.items.length})</span>
          </h3>
          <button
            onClick={handlePrint}
            className="text-xs font-semibold text-brand-maroon hover:underline flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>

        <div className="divide-y divide-surface-border p-4 space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 pt-3 first:pt-0">
              <div className="flex items-center gap-3">
                <img
                  src={getSafeImageUrl(item.productImage)}
                  alt={item.productName}
                  onError={handleImageError}
                  className="w-14 h-14 object-cover rounded-lg border border-surface-border shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900">{item.productName}</h4>
                  <span className="text-[11px] text-charcoal-500">
                    Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                    {item.variantName && ` • Variant: ${item.variantName}`}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-charcoal-900">
                ₹{item.total.toLocaleString('en-IN')}.00
              </span>
            </div>
          ))}
        </div>

        {/* Financial Summary */}
        <div className="bg-surface-cream p-4 border-t border-surface-border space-y-1.5 text-xs text-charcoal-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-charcoal-900">₹{order.subtotal.toLocaleString('en-IN')}.00</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Coupon Discount {order.couponCode && `(${order.couponCode})`}</span>
              <span className="font-semibold">-₹{order.discount.toLocaleString('en-IN')}.00</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-charcoal-900">
              {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}.00`}
            </span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-charcoal-900 pt-2 border-t border-surface-border">
            <span>Total</span>
            <span className="text-brand-maroon text-base">₹{order.total.toLocaleString('en-IN')}.00</span>
          </div>
        </div>
      </div>

      {/* 4. Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => navigate('/shop')}
          className="btn-pill-primary px-8 py-3 text-sm font-bold flex items-center gap-2 shadow"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate('/admin')}
          className="btn-pill-outline text-xs px-6 py-3 font-semibold"
        >
          View in Admin Dashboard
        </button>
      </div>
    </div>
  );
};
