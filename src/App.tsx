import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SideCartDrawer } from './components/SideCartDrawer';
import { SearchModal } from './components/SearchModal';
import { ScrollToTop } from './components/ScrollToTop';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import {
  ShippingPolicyPage,
  ReturnsPolicyPage,
  PrivacyPolicyPage,
  TermsPage
} from './pages/PolicyPages';
import { AdminCMSPage } from './pages/AdminCMSPage';

import { WishlistPage } from './pages/WishlistPage';
import { QuickViewModal } from './components/QuickViewModal';

const MainRouter: React.FC = () => {
  const { currentPath } = useShop();

  // Parse path without query string
  const cleanPath = currentPath.split('?')[0];

  // Route: /products/:slug or /product/:slug (Clean SEO URL support)
  if (cleanPath.startsWith('/products/')) {
    const slug = cleanPath.replace('/products/', '');
    return <ProductDetailPage slug={slug} />;
  }
  if (cleanPath.startsWith('/product/')) {
    const slug = cleanPath.replace('/product/', '');
    return <ProductDetailPage slug={slug} />;
  }

  // Route: /order-confirmation/:id
  if (cleanPath.startsWith('/order-confirmation/')) {
    const id = cleanPath.replace('/order-confirmation/', '');
    return <OrderConfirmationPage orderId={id} />;
  }

  switch (cleanPath) {
    case '/shop':
      return <ShopPage />;
    case '/wishlist':
      return <WishlistPage />;
    case '/cart':
      return <CartPage />;
    case '/checkout':
      return <CheckoutPage />;
    case '/about':
      return <AboutPage />;
    case '/contact':
      return <ContactPage />;
    case '/faq':
      return <FAQPage />;
    case '/shipping-policy':
      return <ShippingPolicyPage />;
    case '/returns-policy':
      return <ReturnsPolicyPage />;
    case '/privacy-policy':
      return <PrivacyPolicyPage />;
    case '/terms':
      return <TermsPage />;
    case '/admin':
      return <AdminCMSPage />;
    case '/':
    case '':
    default:
      return <HomePage />;
  }
};

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBar />
      <Header />
      <main className="flex-1">
        <MainRouter />
      </main>
      <Footer />
      <SideCartDrawer />
      <SearchModal />
      <QuickViewModal />
      <ScrollToTop />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
};

export default App;
