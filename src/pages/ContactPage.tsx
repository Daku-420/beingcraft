import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../config/brand';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bulk Order & Gifting');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    showToast('Your message has been delivered to our care team. We will respond within 24 hours.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-maroon">
          Customer Care
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal-900">
          We’re Here to Assist You
        </h1>
        <p className="text-sm text-charcoal-600">
          Have queries about dimensions, customized brass finishes, or corporate wedding gifting?
          Reach out directly to our artisan specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 bg-surface-cream rounded-2xl p-6 sm:p-8 border border-surface-border space-y-6">
          <h3 className="font-heading font-bold text-lg text-charcoal-900 border-b border-surface-border pb-3">
            Contact Channels
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-maroon shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-charcoal-900 block text-sm">Artisan Workshop & Studio</strong>
                <p className="text-charcoal-600 mt-0.5">
                  {BRAND.address.line1}, {BRAND.address.city}, {BRAND.address.state} - {BRAND.address.pincode}, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand-maroon shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-charcoal-900 block text-sm">Direct Helpline & WhatsApp</strong>
                <a href={`tel:${BRAND.phone}`} className="text-brand-maroon font-bold mt-0.5 block">
                  {BRAND.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-brand-maroon shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-charcoal-900 block text-sm">Email Support</strong>
                <a href={`mailto:${BRAND.email}`} className="text-brand-maroon font-bold mt-0.5 block">
                  {BRAND.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-maroon shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-charcoal-900 block text-sm">Support Hours</strong>
                <p className="text-charcoal-600 mt-0.5">{BRAND.supportHours}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-brand-maroon text-white rounded-xl text-xs space-y-1">
            <span className="font-heading font-bold block text-brand-gold">Custom & Corporate Bulk Gifting</span>
            <p className="text-white/80">
              Planning wedding favors, festive hampers, or bespoke brass idols with custom box branding?
              We fulfill bulk Indian corporate orders with express insured transit.
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-surface-border shadow-sm">
          <h3 className="font-heading font-bold text-lg text-charcoal-900 mb-1">
            Send Us a Message
          </h3>
          <p className="text-xs text-charcoal-500 mb-6">
            Fill out the form below and our customer happiness executive will reply promptly.
          </p>

          {sent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-heading font-bold text-base text-charcoal-900">Message Delivered!</h4>
              <p className="text-xs text-charcoal-600">
                Thank you for reaching out. We have logged your request and will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 text-xs font-semibold text-brand-maroon hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sanya Kapoor"
                    className="w-full px-3.5 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3.5 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Inquiry Purpose</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-surface-border rounded-lg focus:outline-none bg-white"
                  >
                    <option value="Bulk Order & Gifting">Bulk Order & Corporate Gifting</option>
                    <option value="Order Tracking">Order Tracking & Delivery</option>
                    <option value="Product Details & Dimensions">Product Details & Custom Finishing</option>
                    <option value="Returns & Exchanges">Returns & Exchange Inquiry</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today? Please share details..."
                  className="w-full px-3.5 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon"
                />
              </div>

              <button
                type="submit"
                className="btn-pill-primary px-8 py-3 text-xs font-bold flex items-center gap-2 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
