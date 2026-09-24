import React from 'react';
import { BRAND } from '../config/brand';

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-charcoal-700 leading-relaxed">
      <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900 border-b border-surface-border pb-4">
        Shipping & Delivery Policy
      </h1>
      <p>
        At <strong>{BRAND.name}</strong>, we take utmost care in delivering our handcrafted brass,
        vintage, and antique metal products safely to your doorstep across India.
      </p>

      <h2 className="font-heading font-bold text-lg text-charcoal-900 pt-3">1. Shipping Charges & Free Delivery</h2>
      <p>
        • We offer <strong>FREE Express Shipping</strong> across India on all orders of ₹{BRAND.shipping.freeShippingThreshold} and above.
        <br />
        • For orders below ₹{BRAND.shipping.freeShippingThreshold}, a flat standard shipping fee of ₹{BRAND.shipping.standardShippingFee} is applied at checkout.
      </p>

      <h2 className="font-heading font-bold text-lg text-charcoal-900 pt-3">2. Delivery Timelines</h2>
      <p>
        • All orders are dispatched from our Moradabad / Regional craft hubs within <strong>24 to 48 business hours</strong>.
        <br />
        • Metro cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata, Pune): <strong>3 - 4 business days</strong>.
        <br />
        • Rest of India: <strong>4 - 6 business days</strong>.
      </p>

      <h2 className="font-heading font-bold text-lg text-charcoal-900 pt-3">3. Tracking Your Order</h2>
      <p>
        Once your order is dispatched, you will receive an automated SMS and WhatsApp notification containing your AWB tracking number and a live carrier link (BlueDart, Delhivery, or XpressBees).
      </p>

      <h2 className="font-heading font-bold text-lg text-charcoal-900 pt-3">4. Transit Damage Guarantee</h2>
      <p>
        All parcels are fully insured against transit damage. In the extremely rare event that your package arrives visibly dented or broken, please take a quick unboxing video and notify us within 48 hours for immediate replacement.
      </p>
    </div>
  );
};

export const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-charcoal-700 leading-relaxed">
      <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900 border-b border-surface-border pb-4">
        Returns, Replacements & Refund Policy
      </h1>
      <p>
        We take great pride in the artisanal quality of our products. If you receive an item that is damaged, defective, or incorrect, we offer a straightforward <strong>7-Day Return / Replacement Guarantee</strong>.
      </p>

      <h2 className="font-heading font-bold text-lg text-charcoal-900 pt-3">1. Eligibility for Returns</h2>
      <p>
        • Item must be reported within 7 days of verified delivery.
        <br />
        • The product must be unused, unwashed, and returned in its original artisanal packaging with all tags intact.
        <br />
        • Natural variations in hand-hammered textures, slight oxidation or casting marks are authentic features of hand-forged brass and are not considered manufacturing defects.
      </p>

      <h2 className="font-heading font-bold text-lg text-charcoal-900 pt-3">2. Replacement & Refund Process</h2>
      <p>
        • Step 1: Reach out to our care team via WhatsApp or email at <strong>{BRAND.email}</strong> with your Order ID and photos/unboxing video.
        <br />
        • Step 2: Once approved, we will arrange a reverse pickup from your address within 48 hours.
        <br />
        • Step 3: Upon receipt and inspection at our workshop, a replacement is dispatched or a 100% refund is initiated to your original payment method (or bank account for COD orders) within 5-7 business days.
      </p>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-charcoal-700 leading-relaxed">
      <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900 border-b border-surface-border pb-4">
        Privacy Policy
      </h1>
      <p>
        Your privacy is sacred to us at <strong>{BRAND.name}</strong>. This policy details how we collect, store, and safeguard your personal information when you use our website.
      </p>
      <h2 className="font-heading font-bold text-lg text-charcoal-900 pt-3">1. Information We Collect</h2>
      <p>
        When you make a purchase or subscribe to our newsletter, we collect details such as your name, mobile number, email address, shipping address, and payment method identifier.
      </p>
      <h2 className="font-heading font-bold text-lg text-charcoal-900 pt-3">2. How Your Data Is Protected</h2>
      <p>
        All transactions are encrypted with 256-Bit SSL technology. We never store credit card CVVs or bank PINs on our servers. Your phone number is strictly used for order updates and delivery coordination. We never sell or lease customer information to third-party marketing companies.
      </p>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-charcoal-700 leading-relaxed">
      <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900 border-b border-surface-border pb-4">
        Terms & Conditions of Service
      </h1>
      <p>
        Welcome to <strong>{BRAND.name}</strong>. By browsing, purchasing, or using our e-commerce platform, you agree to comply with the terms and conditions outlined below.
      </p>
      <h2 className="font-heading font-bold text-lg text-charcoal-900 pt-3">1. Product Authenticity & Imagery</h2>
      <p>
        All product photography represents actual handcrafted inventory. Due to lighting conditions and hand-finishing processes, minor color and patina deviations may occur.
      </p>
      <h2 className="font-heading font-bold text-lg text-charcoal-900 pt-3">2. Pricing & Orders</h2>
      <p>
        Prices are quoted in Indian National Rupees (INR ₹) and are inclusive of statutory GST. We reserve the right to modify prices or cancel orders in cases of pricing or technical errors.
      </p>
    </div>
  );
};
