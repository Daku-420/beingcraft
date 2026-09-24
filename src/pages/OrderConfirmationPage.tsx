import React from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Printer,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface OrderConfirmationPageProps {
  orderId: string;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId }) => {
  const { getOrderById, orders, navigate } = useShop();
  const order = getOrderById(orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="font-heading font-bold text-2xl text-charcoal-900">Order Not Found</h2>
        <p className="text-sm text-charcoal-600 mt-2">We couldn't locate this order in our records.</p>
        <button onClick={() => navigate('/')} className="mt-6 btn-pill-primary text-xs px-6 py-2.5">
          Return Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 1. Success Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block">
          Order Successfully Placed!
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          Thank You, {order.customer.fullName}!
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
          We have received your order. Our master artisans are preparing and carefully packaging your
          handcrafted treasures with multi-layer protective padding.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-semibold text-charcoal-700">
          <span className="bg-white px-3 py-1.5 rounded-lg border border-surface-border">
            Order No: <strong className="text-brand-maroon">{order.orderNumber}</strong>
          </span>
          <span className="bg-white px-3 py-1.5 rounded-lg border border-surface-border">
            Tracking ID: <strong className="text-charcoal-900">{order.trackingNumber}</strong>
          </span>
        </div>
      </div>

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
          <p className="text-charcoal-600">
            Status:{' '}
            <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
              order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {order.paymentStatus === 'paid' ? 'Paid Online' : 'Cash on Delivery (Pending)'}
            </span>
          </p>
          <p className="text-charcoal-600">Total: <strong className="text-brand-maroon">₹{order.total.toLocaleString('en-IN')}.00</strong></p>
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
          <p className="text-[11px] text-charcoal-500">Live SMS & WhatsApp dispatch alert will be sent.</p>
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
                  src={item.productImage}
                  alt={item.productName}
                  className="w-14 h-14 object-cover rounded-lg border border-surface-border shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900">{item.productName}</h4>
                  <span className="text-[11px] text-charcoal-500">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</span>
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
              <span>Coupon Discount ({order.couponCode})</span>
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
            <span>Final Paid Total</span>
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
