import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BRAND } from '../config/brand';
import { handleImageError, getSafeImageUrl } from '../utils/imageHelper';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    freeShippingProgress,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
    navigate,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError('');
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const shippingCost = freeShippingProgress.qualifies ? 0 : BRAND.shipping.standardShippingFee;
  const grandTotal = finalTotal + (cart.length > 0 ? shippingCost : 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-brand-maroon-subtle text-brand-maroon mx-auto flex items-center justify-center mb-5">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-sm text-charcoal-600 mt-2 max-w-md mx-auto">
          You haven't added any handcrafted brassware or antique decor pieces to your cart yet.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-6 btn-pill-primary text-sm px-8 py-3.5 inline-flex items-center gap-2 shadow"
        >
          <span>Explore Artisan Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header & Breadcrumbs */}
      <div>
        <nav className="text-xs text-charcoal-500 mb-2 flex items-center gap-1.5">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="hover:text-brand-maroon transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <span className="text-charcoal-900 font-medium">Cart</span>
        </nav>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          Shopping Cart ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
        </h1>
      </div>

      {/* 2. Free Delivery Banner */}
      <div className="p-4 bg-surface-muted rounded-xl border border-surface-border">
        <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800 mb-2">
          <Truck className="w-4 h-4 text-brand-maroon" />
          {freeShippingProgress.qualifies ? (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 inline" /> You have qualified for FREE Express Delivery across India!
            </span>
          ) : (
            <span>
              Add <strong className="text-brand-maroon font-bold">₹{freeShippingProgress.remaining.toLocaleString('en-IN')}</strong> more to your cart for FREE Shipping!
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-2.5 rounded-full transition-all duration-500 bg-emerald-600"
            style={{ width: `${freeShippingProgress.percentage}%` }}
          />
        </div>
      </div>

      {/* 3. Main Grid (Items List vs Summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-surface-border p-6 shadow-sm divide-y divide-surface-border">
          {cart.map((item) => {
            const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
            const originalPrice = item.product.originalPrice;
            return (
              <div key={`${item.product.id}-${item.selectedVariant?.id || 'def'}`} className="py-5 flex flex-col sm:flex-row gap-4 first:pt-0">
                <img
                  src={getSafeImageUrl(item.product.images?.[0])}
                  alt={item.product.name}
                  onError={handleImageError}
                  className="w-24 h-24 object-cover rounded-xl border border-surface-border shrink-0 cursor-pointer"
                  onClick={() => navigate(`/product/${item.product.slug}`)}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[11px] font-semibold text-brand-maroon uppercase tracking-wider block">
                          {item.product.category}
                        </span>
                        <h3
                          onClick={() => navigate(`/product/${item.product.slug}`)}
                          className="font-heading font-semibold text-base text-charcoal-900 hover:text-brand-maroon transition-colors cursor-pointer"
                        >
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-charcoal-500 mt-0.5">SKU: {item.product.sku}</p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                        className="text-charcoal-400 hover:text-red-600 transition-colors p-1"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-border/60">
                    <div className="flex items-center border border-surface-border rounded-full bg-surface-muted px-2.5 py-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                        className="p-1 hover:text-brand-maroon"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold px-3 text-charcoal-900 min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                        className="p-1 hover:text-brand-maroon"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-heading font-bold text-base sm:text-lg text-charcoal-900">
                        ₹{(itemPrice * item.quantity).toLocaleString('en-IN')}.00
                      </span>
                      {originalPrice > itemPrice && (
                        <span className="block text-xs text-charcoal-400 line-through">
                          ₹{(originalPrice * item.quantity).toLocaleString('en-IN')}.00
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="lg:col-span-4 bg-surface-cream rounded-2xl border border-surface-border p-6 shadow-sm space-y-5">
          <h2 className="font-heading font-bold text-lg text-charcoal-900 border-b border-surface-border pb-3">
            Order Summary
          </h2>

          {/* Coupon Input */}
          <div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                <div>
                  <span className="font-bold text-emerald-900 block">{appliedCoupon.code}</span>
                  <span className="text-emerald-700">{appliedCoupon.description}</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-semibold text-red-600 hover:underline ml-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700 block">
                  Promotional Coupon
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. WELCOME10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 border border-surface-border rounded-lg uppercase focus:outline-none focus:border-brand-maroon bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-charcoal-900 hover:bg-brand-maroon text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
              </form>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-charcoal-600 border-t border-surface-border pt-4">
            <div className="flex justify-between">
              <span>Cart Subtotal</span>
              <span className="font-semibold text-charcoal-900">₹{cartSubtotal.toLocaleString('en-IN')}.00</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}.00</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-charcoal-900">
                {freeShippingProgress.qualifies ? (
                  <span className="text-emerald-700 font-bold uppercase">Free</span>
                ) : (
                  `₹${BRAND.shipping.standardShippingFee}.00`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-charcoal-900 pt-3 border-t border-surface-border">
              <span>Total Amount</span>
              <span className="text-brand-maroon">₹{grandTotal.toLocaleString('en-IN')}.00</span>
            </div>
            <p className="text-[11px] text-charcoal-400">Inclusive of all applicable Indian taxes (GST).</p>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full btn-pill-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center text-xs text-charcoal-500 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-maroon" />
              <span>Safe & Secure 256-Bit SSL Checkout</span>
            </div>
            <p className="text-[11px]">Accepting UPI (GPay, PhonePe, Paytm), RuPay, Cards & COD.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
