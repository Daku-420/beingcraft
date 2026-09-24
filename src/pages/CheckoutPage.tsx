import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  Building2,
  Lock,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import type { PaymentMethod, ShippingAddress } from '../types';
import { BRAND } from '../config/brand';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi NCR', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
];

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    freeShippingProgress,
    appliedCoupon,
    discountAmount,
    finalTotal,
    createOrder,
    navigate,
    showToast,
  } = useShop();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [pincode, setPincode] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiVpa, setUpiVpa] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="font-heading font-bold text-2xl text-charcoal-900">Your cart is empty</h2>
        <p className="text-sm text-charcoal-600 mt-2">Please add products before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-6 btn-pill-primary text-xs px-6 py-2.5"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const shippingCost = freeShippingProgress.qualifies ? 0 : BRAND.shipping.standardShippingFee;
  const totalAmount = finalTotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!fullName.trim() || !phone.trim() || !email.trim() || !addressLine1.trim() || !city.trim() || !pincode.trim()) {
      setErrorMsg('Please fill in all required shipping address fields.');
      return;
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      setErrorMsg('Please enter a valid 6-digit Indian postal code.');
      return;
    }

    setIsProcessing(true);

    // Simulate safe Indian payment processing
    setTimeout(() => {
      const shippingAddress: ShippingAddress = {
        fullName,
        phone,
        email,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
      };

      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        variantName: item.selectedVariant?.name,
        price: item.selectedVariant ? item.selectedVariant.price : item.product.price,
        quantity: item.quantity,
        total: (item.selectedVariant ? item.selectedVariant.price : item.product.price) * item.quantity,
      }));

      const newOrder = createOrder({
        customer: { fullName, phone, email },
        shippingAddress,
        items: orderItems,
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee: shippingCost,
        total: totalAmount,
        couponCode: appliedCoupon?.code,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'cod_pending' : 'paid',
        orderStatus: 'Confirmed',
        trackingNumber: `EXP-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      });

      // Celebratory Confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6E001B', '#FFEDA0', '#FDA256', '#2DA815'],
        });
      } catch (err) {
        console.error(err);
      }

      setIsProcessing(false);
      showToast('Order confirmed successfully!');
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-xs text-charcoal-500 mb-6 flex items-center gap-1.5">
        <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="hover:text-brand-maroon">Home</a>
        <span>/</span>
        <a href="#/cart" onClick={(e) => { e.preventDefault(); navigate('/cart'); }} className="hover:text-brand-maroon">Cart</a>
        <span>/</span>
        <span className="text-charcoal-900 font-medium">Indian Checkout</span>
      </nav>

      {/* Demo Mode Notice */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Demo Gateway Mode Active:</strong> You can place a complete test order using UPI, Card, Net Banking, or COD. No real money will be charged. Full Razorpay integration connects seamlessly with your live API credentials.
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customer & Address Information (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Contact Information */}
          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-base text-charcoal-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-maroon text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Customer Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Mobile Number (10 Digits) *</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-surface-border bg-surface-muted text-charcoal-500 rounded-l-lg font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-surface-border rounded-r-lg focus:outline-none focus:border-brand-maroon"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-charcoal-700 mb-1">Email Address (for order updates & invoice) *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-base text-charcoal-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-maroon text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Delivery Address in India</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Flat, House No., Building, Apartment *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 402, Heritage Residency"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Area, Street, Landmark (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Near Shiv Mandir, Civil Lines"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Moradabad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">State / UT *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon bg-white"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Pincode (6 Digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="244001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-base text-charcoal-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-maroon text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Select Indian Payment Method</span>
            </h2>

            <div className="space-y-3">
              {/* UPI Option */}
              <label
                className={`p-4 rounded-xl border flex flex-col cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-brand-maroon bg-brand-maroon-subtle/50 shadow-sm'
                    : 'border-surface-border hover:bg-surface-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-brand-maroon"
                    />
                    <div>
                      <span className="text-xs font-bold text-charcoal-900 block">UPI (Instant 0% Fee)</span>
                      <span className="text-[11px] text-charcoal-500">Google Pay, PhonePe, Paytm, BHIM, QR Code</span>
                    </div>
                  </div>
                  <QrCode className="w-5 h-5 text-brand-maroon" />
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-3 pt-3 border-t border-brand-maroon/20 pl-7 space-y-2 text-xs">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter your UPI ID (e.g. name@upi)"
                        value={upiVpa}
                        onChange={(e) => setUpiVpa(e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-surface-border rounded-md bg-white focus:outline-none focus:border-brand-maroon"
                      />
                      <span className="px-2.5 py-1.5 bg-brand-gold text-black font-semibold rounded-md text-[11px] flex items-center">
                        Verified
                      </span>
                    </div>
                    <span className="text-[11px] text-charcoal-500 block">
                      Or scan dynamic QR code on the next screen from any UPI app.
                    </span>
                  </div>
                )}
              </label>

              {/* Cards Option */}
              <label
                className={`p-4 rounded-xl border flex flex-col cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-brand-maroon bg-brand-maroon-subtle/50 shadow-sm'
                    : 'border-surface-border hover:bg-surface-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-brand-maroon"
                    />
                    <div>
                      <span className="text-xs font-bold text-charcoal-900 block">Credit / Debit Card</span>
                      <span className="text-[11px] text-charcoal-500">RuPay, Visa, MasterCard, Maestro</span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-brand-maroon" />
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-3 pt-3 border-t border-brand-maroon/20 pl-7 space-y-2 text-xs">
                    <input
                      type="text"
                      placeholder="Card Number (e.g. 4111 2222 3333 4444)"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-1.5 border border-surface-border rounded-md bg-white focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-1.5 border border-surface-border rounded-md bg-white focus:outline-none"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-1.5 border border-surface-border rounded-md bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </label>

              {/* Net Banking Option */}
              <label
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-brand-maroon bg-brand-maroon-subtle/50 shadow-sm'
                    : 'border-surface-border hover:bg-surface-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="accent-brand-maroon"
                  />
                  <div>
                    <span className="text-xs font-bold text-charcoal-900 block">Net Banking</span>
                    <span className="text-[11px] text-charcoal-500">SBI, HDFC, ICICI, Axis, Kotak & 50+ Banks</span>
                  </div>
                </div>
                <Building2 className="w-5 h-5 text-brand-maroon" />
              </label>

              {/* Cash on Delivery */}
              <label
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-brand-maroon bg-brand-maroon-subtle/50 shadow-sm'
                    : 'border-surface-border hover:bg-surface-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-brand-maroon"
                  />
                  <div>
                    <span className="text-xs font-bold text-charcoal-900 block">Cash on Delivery (COD)</span>
                    <span className="text-[11px] text-charcoal-500">Pay cash or UPI upon parcel arrival</span>
                  </div>
                </div>
                <Truck className="w-5 h-5 text-emerald-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Review & Place Order Button (5 cols) */}
        <div className="lg:col-span-5 bg-surface-cream p-6 rounded-2xl border border-surface-border shadow-sm space-y-6">
          <div className="border-b border-surface-border pb-4">
            <h2 className="font-heading font-bold text-lg text-charcoal-900">Your Order Review</h2>
            <p className="text-xs text-charcoal-500 mt-0.5">{cart.length} handcrafted items</p>
          </div>

          {/* Items Preview */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-surface-border/60">
            {cart.map((item) => (
              <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover border border-surface-border shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-charcoal-900 truncate">{item.product.name}</h4>
                  <span className="text-[11px] text-charcoal-500">Qty: {item.quantity}</span>
                </div>
                <span className="text-xs font-bold text-charcoal-900 shrink-0">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}.00
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 text-xs text-charcoal-600 border-t border-surface-border pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-charcoal-900">₹{cartSubtotal.toLocaleString('en-IN')}.00</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}.00</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping to {city || 'India'}</span>
              <span className="font-semibold text-charcoal-900">
                {shippingCost === 0 ? <span className="text-emerald-700 font-bold uppercase">Free</span> : `₹${shippingCost}.00`}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-charcoal-900 pt-3 border-t border-surface-border">
              <span>Total Payable</span>
              <span className="text-brand-maroon text-lg">₹{totalAmount.toLocaleString('en-IN')}.00</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full btn-pill-primary py-4 text-base font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-75"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Order...</span>
              </span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Confirm & Place Order (₹{totalAmount.toLocaleString('en-IN')})</span>
              </>
            )}
          </button>

          <div className="pt-2 text-center text-[11px] text-charcoal-500 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-charcoal-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-maroon" />
              <span>Encrypted SSL 256-Bit Protection Guarantee</span>
            </div>
            <p>Dispatched with insurance via BlueDart / Delhivery / XpressBees.</p>
          </div>
        </div>
      </form>
    </div>
  );
};
