import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BRAND } from '../config/brand';

export const SideCartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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

  if (!isCartDrawerOpen) return null;

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

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  const handleBrowse = () => {
    setIsCartDrawerOpen(false);
    navigate('/shop');
  };

  const shippingCost = freeShippingProgress.qualifies ? 0 : BRAND.shipping.standardShippingFee;
  const estimatedTotal = finalTotal + (cart.length > 0 ? shippingCost : 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-surface-border">
          {/* 1. Header */}
          <div className="p-4 sm:p-5 border-b border-surface-border bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-maroon-subtle flex items-center justify-center text-brand-maroon">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-charcoal-900">Your Shopping Cart</h3>
                <p className="text-xs text-charcoal-500">
                  {cart.length === 1 ? '1 item' : `${cart.length} items`} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-surface-muted text-charcoal-500 hover:text-brand-maroon transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Shipping Progress Bar (Matching reference fkcart styling) */}
          <div className="px-5 py-3 bg-surface-muted border-b border-surface-border">
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800 mb-1.5">
              <Truck className="w-4 h-4 text-brand-maroon shrink-0" />
              {freeShippingProgress.qualifies ? (
                <span className="text-emerald-700 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 inline" /> Congratulations! You unlocked FREE Delivery.
                </span>
              ) : (
                <span>
                  Add <span className="text-brand-maroon font-bold">₹{freeShippingProgress.remaining.toLocaleString('en-IN')}</span> more for FREE Shipping
                </span>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-500 bg-emerald-600"
                style={{ width: `${freeShippingProgress.percentage}%` }}
              />
            </div>
          </div>

          {/* 3. Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-surface-border">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-muted mx-auto flex items-center justify-center text-charcoal-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-lg text-charcoal-900">Your cart is empty</h4>
                <p className="text-sm text-charcoal-500 mt-1 max-w-xs mx-auto">
                  Explore our handcrafted brass idols, antique home decor, and vintage collectibles.
                </p>
                <button
                  onClick={handleBrowse}
                  className="mt-6 btn-pill-primary text-sm inline-flex items-center gap-2"
                >
                  <span>Explore Handcrafted Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
                const originalPrice = item.product.originalPrice;
                return (
                  <div key={`${item.product.id}-${item.selectedVariant?.id || 'default'}`} className="py-4 flex gap-3.5 first:pt-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg border border-surface-border shrink-0 cursor-pointer"
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigate(`/product/${item.product.slug}`);
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            navigate(`/product/${item.product.slug}`);
                          }}
                          className="font-medium text-sm text-charcoal-900 hover:text-brand-maroon transition-colors line-clamp-2 cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                          className="text-charcoal-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <p className="text-xs text-charcoal-500 mt-0.5">Style: {item.selectedVariant.name}</p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-surface-border rounded-full bg-surface-muted px-2 py-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                            className="p-1 hover:text-brand-maroon transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-2 min-w-[20px] text-center text-charcoal-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                            className="p-1 hover:text-brand-maroon transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-bold text-sm text-charcoal-900">
                            ₹{(itemPrice * item.quantity).toLocaleString('en-IN')}.00
                          </span>
                          {originalPrice > itemPrice && (
                            <span className="block text-[11px] text-charcoal-400 line-through">
                              ₹{(originalPrice * item.quantity).toLocaleString('en-IN')}.00
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 4. Footer Summary (If cart has items) */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-surface-border bg-white shadow-lg space-y-3.5">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discountAmount.toLocaleString('en-IN')})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Have a coupon? Try WELCOME10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-surface-border rounded-lg uppercase tracking-wider focus:outline-none focus:border-brand-maroon"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-charcoal-900 hover:bg-brand-maroon text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-600 -mt-1">{couponError}</p>}

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-charcoal-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal-900">₹{cartSubtotal.toLocaleString('en-IN')}.00</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}.00</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (India)</span>
                  <span className="font-semibold text-charcoal-900">
                    {freeShippingProgress.qualifies ? (
                      <span className="text-emerald-700 font-bold uppercase">Free</span>
                    ) : (
                      `₹${BRAND.shipping.standardShippingFee}.00`
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-surface-border text-sm font-bold text-charcoal-900">
                  <span>Estimated Total</span>
                  <span className="text-base text-brand-maroon">₹{estimatedTotal.toLocaleString('en-IN')}.00</span>
                </div>
                <p className="text-[11px] text-charcoal-400">Taxes included. Free delivery over ₹{BRAND.shipping.freeShippingThreshold}.</p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full btn-pill-primary py-3 text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>Proceed to Indian Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleViewCart}
                  className="w-full btn-pill-outline py-2.5 text-xs font-semibold flex items-center justify-center gap-1"
                >
                  View Full Cart & Summary
                </button>
              </div>

              {/* Safe & Secure Guarantee */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-maroon" />
                <span>Safe & Encrypted 256-Bit Indian Payments (UPI, Cards, COD)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
