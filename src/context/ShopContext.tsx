import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem, Order, Coupon, ProductVariant } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/products';
import { BRAND } from '../config/brand';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface ShopContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  freeShippingProgress: {
    qualifies: boolean;
    remaining: number;
    percentage: number;
  };

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  finalTotal: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  syncOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  deleteOrder: (orderId: string) => void;
  clearAllOrders: () => void;
  resetAdminData: () => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Search & Navigation modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Toast notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Active view routing state
  currentPath: string;
  navigate: (path: string) => void;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

const isSystemGenerated = (id?: string): boolean => {
  if (!id) return true;
  return id.startsWith('auracraft-') || id.startsWith('prod-');
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Migration check to ensure clean slate reset
  const MIGRATION_KEY = 'beingcraft_reset_all_data_v11';
  const hasResetRun = typeof window !== 'undefined' && localStorage.getItem(MIGRATION_KEY) === 'true';

  if (typeof window !== 'undefined' && !hasResetRun) {
    localStorage.setItem(MIGRATION_KEY, 'true');
    localStorage.removeItem('beingcraft_products');
    localStorage.removeItem('auracraft_products');
    localStorage.removeItem('beingcraft_orders');
    localStorage.removeItem('auracraft_orders');
    localStorage.removeItem('beingcraft_cart');
    localStorage.removeItem('beingcraft_wishlist');
    fetch('/api/orders/all', { method: 'DELETE' }).catch(() => {});
  }

  // 1. Products state (persisted, defaults to INITIAL_PRODUCTS)
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return INITIAL_PRODUCTS;
    const saved = localStorage.getItem('beingcraft_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        // Verify that cached catalog is valid, matches the current authentic catalog count,
        // and does not contain obsolete or broken image paths
        const hasOutdatedPaths = parsed.some((p) =>
          !p.images ||
          p.images.length === 0 ||
          p.images.some((img) => img.includes('wooden-chakla-belan-set') || !img.includes('/products/'))
        );
        if (Array.isArray(parsed) && parsed.length === INITIAL_PRODUCTS.length && !hasOutdatedPaths) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('beingcraft_products', JSON.stringify(products));
  }, [products]);

  // 2. Cart state (persisted)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('beingcraft_cart');
    if (saved) {
      try {
        const parsed: CartItem[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((item) => item.product && !isSystemGenerated(item.product.id));
        }
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('beingcraft_cart', JSON.stringify(cart));
  }, [cart]);

  // 3. Wishlist state (persisted)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('beingcraft_wishlist');
    if (saved) {
      try {
        const parsed: string[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((id) => !isSystemGenerated(id));
        }
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('beingcraft_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 4. Orders state (persisted)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('beingcraft_orders') || localStorage.getItem('auracraft_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('beingcraft_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.success && Array.isArray(data.orders)) {
          setOrders((prev) => {
            const map = new Map<string, Order>();
            // Server orders take precedence
            data.orders.forEach((o: Order) => map.set(o.id, o));
            prev.forEach((o) => {
              if (!map.has(o.id)) map.set(o.id, o);
            });
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {});
  }, []);

  // 5. Coupons & discounts
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // 6. UI Drawers & Overlays
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 7. Lightweight SPA Hash / Route tracker
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash ? window.location.hash.slice(1) : '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash ? window.location.hash.slice(1) : '/';
      setCurrentPath(hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant?.id === variant?.id
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedVariant: variant, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 32)}..." to your cart`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVariant?.id === variantId)
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVariant?.id === variantId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => {
    const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
    return total + price * item.quantity;
  }, 0);

  // Free shipping calculation
  const freeThreshold = BRAND.shipping.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeThreshold - cartSubtotal);
  const freeShippingProgress = {
    qualifies: cartSubtotal >= freeThreshold,
    remaining: remainingForFreeShipping,
    percentage: Math.min(100, Math.round((cartSubtotal / freeThreshold) * 100)),
  };

  // Coupon Logic
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `This coupon requires a minimum cart value of ₹${found.minOrderValue}.`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied successfully!`);
    return { success: true, message: `Coupon applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? Math.round((cartSubtotal * appliedCoupon.discountValue) / 100)
      : appliedCoupon.discountValue
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Product CRUD
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = { ...newProdData, id };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" created successfully!`);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
  const getProductById = (id: string) => products.find((p) => p.id === id);

  // Order Operations
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber: `AC-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const syncOrder = (order: Order) => {
    setOrders((prev) => {
      const idx = prev.findIndex((o) => o.id === order.id || o.orderNumber === order.orderNumber);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = order;
        return updated;
      }
      return [order, ...prev];
    });
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: status } : ord))
    );
    fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => {});
    showToast(`Order status updated to ${status}`);
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId && o.orderNumber !== orderId));
    fetch(`/api/orders/${orderId}`, {
      method: 'DELETE',
    }).catch(() => {});
    showToast('Order removed from records', 'info');
  };

  const clearAllOrders = () => {
    setOrders([]);
    fetch('/api/orders/all', {
      method: 'DELETE',
    }).catch(() => {});
    showToast('All orders cleared', 'info');
  };

  const resetAdminData = () => {
    setProducts([]);
    setOrders([]);
    setCart([]);
    setWishlist([]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('beingcraft_products', JSON.stringify([]));
      localStorage.setItem('beingcraft_orders', JSON.stringify([]));
      localStorage.setItem('beingcraft_cart', JSON.stringify([]));
      localStorage.setItem('beingcraft_wishlist', JSON.stringify([]));
    }
    fetch('/api/orders/all', { method: 'DELETE' }).catch(() => {});
    showToast('Admin data reset to clean slate. 0 items, 0 orders.', 'info');
  };

  const getOrderById = (orderId: string) => orders.find((o) => o.id === orderId || o.orderNumber === orderId);

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getProductById,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        freeShippingProgress,
        wishlist,
        toggleWishlist,
        isInWishlist,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalTotal,
        orders,
        createOrder,
        syncOrder,
        updateOrderStatus,
        deleteOrder,
        clearAllOrders,
        resetAdminData,
        getOrderById,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,
        currentPath,
        navigate,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { useShop } from './useShop';
