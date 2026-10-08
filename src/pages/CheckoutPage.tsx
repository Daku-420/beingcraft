import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  Building2,
  Lock,
  AlertCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import type { PaymentMethod, ShippingAddress, Order } from '../types';
import { handleImageError, getSafeImageUrl } from '../utils/imageHelper';
import { BRAND } from '../config/brand';
import {
  createBackendOrder,
  verifyPaymentWithServer,
  cancelPaymentOnServer,
  loadRazorpaySDK,
} from '../services/paymentApi';

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
    syncOrder,
    clearCart,
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

  // Sandbox Test Gateway Modal State (Development / Test Mode only)
  const [sandboxModalOrder, setSandboxModalOrder] = useState<{
    orderId: string;
    orderNumber: string;
    gatewayOrderId: string;
    amount: number;
    amountPaise: number;
    mockSignatureToken?: string;
    order: Order;
  } | null>(null);

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

  // Real Payment Verification Execution Flow
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Client-side Form Validation
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

    try {
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
        productImage: item.product.images?.[0] || '',
        price: item.selectedVariant ? item.selectedVariant.price : item.product.price,
        quantity: item.quantity,
        variantName: item.selectedVariant?.name,
      }));

      // 2. Request order creation on BACKEND (Server calculates authoritative pricing)
      const backendResponse = await createBackendOrder({
        customer: { fullName, phone, email },
        shippingAddress,
        items: orderItems,
        paymentMethod,
        couponCode: appliedCoupon?.code,
        upiVpa: paymentMethod === 'upi' ? upiVpa.trim() : undefined,
      });

      const { order, gatewayOrderId, keyId, mockSignatureToken } = backendResponse;

      // 3. Handle Cash on Delivery (COD)
      if (paymentMethod === 'cod') {
        setIsProcessing(false);
        syncOrder(order);
        clearCart();
        showToast('Cash on Delivery order confirmed!');
        navigate(`/order-confirmation/${order.id}`);
        return;
      }

      // 4. Online Payment: Attempt Razorpay Standard Gateway
      const isRealRazorpay = keyId && keyId.startsWith('rzp_') && keyId !== 'rzp_test_beingcraft_sandbox';

      if (isRealRazorpay) {
        const sdkLoaded = await loadRazorpaySDK();
        if (!sdkLoaded) {
          throw new Error('Payment gateway SDK failed to load. Please check your connection and retry.');
        }

        const options = {
          key: keyId,
          amount: backendResponse.amountPaise,
          currency: backendResponse.currency || 'INR',
          name: BRAND.name,
          description: `Order ${backendResponse.orderNumber} - Authentic Indian Heritage Crafts`,
          order_id: gatewayOrderId,
          prefill: {
            name: fullName,
            email,
            contact: phone,
            vpa: paymentMethod === 'upi' && upiVpa ? upiVpa : undefined,
          },
          notes: {
            orderId: order.id,
            orderNumber: order.orderNumber,
          },
          theme: {
            color: '#6E001B', // Brand Maroon
          },
          modal: {
            ondismiss: async () => {
              setIsProcessing(false);
              await cancelPaymentOnServer(order.id, 'Customer dismissed gateway modal');
              setErrorMsg('Payment was cancelled. You have not been charged.');
              syncOrder({ ...order, paymentStatus: 'CANCELLED' });
            },
          },
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            // 5. SERVER-SIDE CRYPTOGRAPHIC VERIFICATION
            // The frontend does NOT mark as paid. It sends gateway signature to server.
            try {
              setIsProcessing(true);
              const verification = await verifyPaymentWithServer({
                orderId: order.id,
                gatewayOrderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              });

              if (verification.success && verification.paymentStatus === 'SUCCESS') {
                // ONLY NOW can order be treated as PAID
                syncOrder(verification.order);
                clearCart();
                try {
                  confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#6E001B', '#FFEDA0', '#FDA256', '#2DA815'],
                  });
                } catch {
                  // ignore confetti failure
                }
                showToast('Payment verified successfully!');
                navigate(`/order-confirmation/${order.id}`);
              } else {
                setErrorMsg(verification.message || 'Payment verification failed on server.');
              }
            } catch (err: unknown) {
              const error = err as Error;
              setErrorMsg(error.message || 'Server verification failed.');
            } finally {
              setIsProcessing(false);
            }
          },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.on('payment.failed', async (response: any) => {
          setIsProcessing(false);
          setErrorMsg(`Payment Declined by Bank: ${response.error?.description || 'Transaction failed'}`);
          await cancelPaymentOnServer(order.id, response.error?.description || 'Gateway declined');
        });

        razorpayInstance.open();
        return;
      }

      // 5. Sandbox / Test Gateway Flow (Safe Development Mode)
      // When live gateway credentials are not yet configured in local test environment,
      // present a Sandbox Gateway Interface where real SERVER endpoints verify transactions.
      setIsProcessing(false);
      setSandboxModalOrder({
        orderId: order.id,
        orderNumber: order.orderNumber,
        gatewayOrderId: gatewayOrderId || '',
        amount: backendResponse.amount,
        amountPaise: backendResponse.amountPaise,
        mockSignatureToken,
        order,
      });
    } catch (err: unknown) {
      const error = err as Error;
      setIsProcessing(false);
      setErrorMsg(error.message || 'An error occurred during payment processing.');
    }
  };

  // Sandbox Test Action Handlers (All communicate with real backend verification endpoint)
  const handleSandboxApprove = async () => {
    if (!sandboxModalOrder) return;
    setIsProcessing(true);
    setErrorMsg('');

    try {
      const testPaymentId = `pay_test_${Date.now()}`;
      const verification = await verifyPaymentWithServer({
        orderId: sandboxModalOrder.orderId,
        gatewayOrderId: sandboxModalOrder.gatewayOrderId,
        paymentId: testPaymentId,
        signature: `sig_test_${Date.now()}`,
        mockSignatureToken: sandboxModalOrder.mockSignatureToken,
      });

      if (verification.success && verification.paymentStatus === 'SUCCESS') {
        syncOrder(verification.order);
        clearCart();
        setSandboxModalOrder(null);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6E001B', '#FFEDA0', '#FDA256', '#2DA815'],
          });
        } catch {
          // ignore
        }
        showToast('Payment verified successfully by server!');
        navigate(`/order-confirmation/${sandboxModalOrder.orderId}`);
      } else {
        setErrorMsg('Server rejected test payment.');
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Server verification failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSandboxSimulateFailure = async () => {
    if (!sandboxModalOrder) return;
    setIsProcessing(true);
    try {
      // Send an invalid signature to demonstrate server rejection
      await verifyPaymentWithServer({
        orderId: sandboxModalOrder.orderId,
        gatewayOrderId: sandboxModalOrder.gatewayOrderId,
        paymentId: 'pay_bad_id',
        signature: 'INVALID_TAMPERED_SIGNATURE',
        mockSignatureToken: 'INVALID_TOKEN',
      });
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(`Server Correctly Rejected Invalid Payment: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSandboxCancel = async () => {
    if (!sandboxModalOrder) return;
    setIsProcessing(true);
    try {
      await cancelPaymentOnServer(sandboxModalOrder.orderId, 'User cancelled sandbox payment');
      syncOrder({ ...sandboxModalOrder.order, paymentStatus: 'CANCELLED' });
      setSandboxModalOrder(null);
      setErrorMsg('Payment was cancelled. Order marked as CANCELLED.');
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSandboxLeavePending = () => {
    if (!sandboxModalOrder) return;
    syncOrder({ ...sandboxModalOrder.order, paymentStatus: 'PENDING' });
    clearCart();
    setSandboxModalOrder(null);
    showToast('Payment session created. Awaiting bank confirmation.', 'info');
    navigate(`/order-confirmation/${sandboxModalOrder.orderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-xs text-charcoal-500 mb-6 flex items-center gap-1.5">
        <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="hover:text-brand-maroon">Home</a>
        <span>/</span>
        <a href="#/cart" onClick={(e) => { e.preventDefault(); navigate('/cart'); }} className="hover:text-brand-maroon">Cart</a>
        <span>/</span>
        <span className="text-charcoal-900 font-medium">Secure Checkout</span>
      </nav>

      {/* Security Architecture Badge */}
      <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">
            Real Server-Side Payment Verification Active
          </p>
          <p className="text-slate-600">
            Orders are only marked as <span className="font-mono bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-bold">PAID</span> after cryptographic signature verification and exact amount reconciliation on our backend server. Entering a UPI ID or clicking Pay does not confirm payment.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-medium flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="block font-bold">Payment Error:</strong>
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg('')} className="text-red-400 hover:text-red-700">
            <XCircle className="w-4 h-4" />
          </button>
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
              <span>Select Payment Method</span>
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
                      <span className="text-xs font-bold text-charcoal-900 block">UPI (Unified Payments Interface)</span>
                      <span className="text-[11px] text-charcoal-500">Google Pay, PhonePe, Paytm, BHIM, CRED, QR Code</span>
                    </div>
                  </div>
                  <QrCode className="w-5 h-5 text-brand-maroon" />
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-3 pt-3 border-t border-brand-maroon/20 pl-7 space-y-2 text-xs">
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px] flex items-start gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>
                        <strong>Real Payment Process:</strong> When you click "Proceed to Pay", the secure payment gateway will open. You can scan dynamic QR code or authorize via your UPI app. Entering a UPI ID here is optional and merely prefills the gateway. Money is only transferred when authorized by you in your UPI app.
                      </span>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Optional UPI ID (e.g. yourname@okhdfcbank)"
                        value={upiVpa}
                        onChange={(e) => setUpiVpa(e.target.value)}
                        className="w-full px-3 py-1.5 border border-surface-border rounded-md bg-white focus:outline-none focus:border-brand-maroon"
                      />
                    </div>
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
                    <p className="text-[11px] text-charcoal-600">
                      Card payments are securely processed via 256-bit encrypted gateway with bank OTP (3D Secure).
                    </p>
                    <input
                      type="text"
                      placeholder="Card Number (Optional prefill)"
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
                        maxLength={4}
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
                    <span className="text-[11px] text-charcoal-500">Payment status will remain PENDING until parcel arrival</span>
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
                  src={getSafeImageUrl(item.product.images?.[0])}
                  alt={item.product.name}
                  onError={handleImageError}
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
            <p className="text-[10px] text-charcoal-400">
              * Exact amount is recalculated and verified authoritatively by server.
            </p>
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
                <span>Contacting Secure Gateway...</span>
              </span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {paymentMethod === 'cod'
                    ? `Confirm COD Order (₹${totalAmount.toLocaleString('en-IN')})`
                    : `Proceed to Pay (₹${totalAmount.toLocaleString('en-IN')})`}
                </span>
              </>
            )}
          </button>

          <div className="pt-2 text-center text-[11px] text-charcoal-500 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-charcoal-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-maroon" />
              <span>Encrypted SSL 256-Bit Cryptographic Payment Gateway</span>
            </div>
            <p>Direct bank integration via Razorpay UPI, RuPay, Visa, MasterCard.</p>
          </div>
        </div>
      </form>

      {/* DEVELOPER SANDBOX GATEWAY MODAL (Only rendered in Test / Sandbox Mode) */}
      {sandboxModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-border space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-900 font-mono text-[10px] font-bold uppercase rounded">
                  Developer Sandbox Gateway Mode
                </span>
                <h3 className="font-heading font-bold text-lg text-charcoal-900 mt-1">
                  Simulate Real Gateway Authorization
                </h3>
              </div>
              <button
                onClick={handleSandboxCancel}
                disabled={isProcessing}
                className="text-charcoal-400 hover:text-charcoal-700 p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-surface-muted p-4 rounded-xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal-600">Order Number:</span>
                <strong className="font-mono text-brand-maroon">{sandboxModalOrder.orderNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Gateway Order ID:</span>
                <strong className="font-mono text-charcoal-800">{sandboxModalOrder.gatewayOrderId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Selected Method:</span>
                <strong className="uppercase text-charcoal-800">{paymentMethod}</strong>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-surface-border">
                <span>Verified Server Total:</span>
                <span className="text-brand-maroon">₹{sandboxModalOrder.amount.toLocaleString('en-IN')}.00</span>
              </div>
            </div>

            <div className="text-xs text-charcoal-600 space-y-2">
              <p>
                <strong>Security Architecture Test:</strong> In production, this opens Razorpay's live UPI/Card modal. Here in sandbox mode, you can test how the backend handles different gateway responses:
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: Legitimate verification */}
              <button
                type="button"
                onClick={handleSandboxApprove}
                disabled={isProcessing}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                {isProcessing ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                <span>1. Complete Payment (Server HMAC Cryptographic Verification)</span>
              </button>

              {/* Option 2: Tampered / bad signature */}
              <button
                type="button"
                onClick={handleSandboxSimulateFailure}
                disabled={isProcessing}
                className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-semibold text-xs flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                <span>2. Simulate Invalid Signature / Tampering (Test Server Rejection)</span>
              </button>

              {/* Option 3: Leave as Pending */}
              <button
                type="button"
                onClick={handleSandboxLeavePending}
                disabled={isProcessing}
                className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl font-semibold text-xs flex items-center justify-center gap-2"
              >
                <span>3. Test "Payment Pending" State (Simulate Bank Delayed Confirmation)</span>
              </button>

              {/* Option 4: Cancel */}
              <button
                type="button"
                onClick={handleSandboxCancel}
                disabled={isProcessing}
                className="w-full py-2 px-4 text-charcoal-600 hover:text-charcoal-900 text-xs text-center"
              >
                4. Cancel Payment (Marks CANCELLED on Server)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
