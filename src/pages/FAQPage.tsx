import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BRAND } from '../config/brand';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: "Are all products made of genuine solid brass?",
      a: `Yes, 100%. At ${BRAND.name}, all our brass sculptures, diyas, urlis, and idols are cast using pure virgin brass and traditional sand-casting or lost-wax casting methods. We never use cheap zinc fillers, hollow resin shells, or toxic plating that peels over time.`
    },
    {
      q: "How do you ensure fragile metal artifacts do not get damaged during transit?",
      a: "Every artifact undergoes a strict 4-stage packaging protocol: first wrapped in protective tissue to preserve the finish, followed by multiple layers of heavy-duty bubble wrap, snug-fitted high-density thermo-foam casing, and finally packed into double-wall corrugated shipping boxes marked fragile."
    },
    {
      q: "What is your shipping policy and delivery timeline across India?",
      a: `We offer FREE Express Shipping across India for all orders above ₹${BRAND.shipping.freeShippingThreshold}. Orders below this threshold carry a nominal delivery fee of ₹${BRAND.shipping.standardShippingFee}. Metros typically receive delivery in 3 to 4 business days; other locations across India in 4 to 6 business days.`
    },
    {
      q: "Is Cash on Delivery (COD) available?",
      a: "Yes! Cash on Delivery is available across 26,000+ Indian pincodes. You can inspect the outer packaging and pay either cash or scan the delivery executive's UPI QR code upon receipt."
    },
    {
      q: "How should I clean and maintain my brass home decor?",
      a: "For daily maintenance, simply wipe with a soft, clean, dry cotton cloth. Over time, natural brass reacts with air to develop a noble vintage patina. If you prefer high mirror shine, apply traditional Pitambari powder or a paste of lemon juice & salt, rub gently, rinse with water, and dry immediately with a soft towel."
    },
    {
      q: "Can I place bulk orders for wedding favors or corporate gifting?",
      a: `Absolutely! We specialize in bespoke corporate gifts, Diwali hampers, and wedding return gifts. We can also provide customized laser engraving and premium velvet gift boxes. Please contact us at ${BRAND.email} or call ${BRAND.phone} with your quantity requirements.`
    },
    {
      q: "What is your return and replacement policy?",
      a: "We provide a 7-day hassle-free return or replacement guarantee in the rare event of transit damage or manufacturing defects. Just share an unboxing video or photo with our WhatsApp care team and we will dispatch a replacement immediately."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
          Got Questions?
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-900">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-charcoal-600">
          Everything you need to know about our handcrafted metal collections, authenticity, and Indian delivery.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-surface-border overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-heading font-semibold text-sm sm:text-base text-charcoal-900 hover:text-brand-maroon transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-maroon shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-surface-border/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
