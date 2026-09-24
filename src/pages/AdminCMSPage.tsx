import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Tag,
  Eye,
  Lock
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import type { Product, ProductCategory, Order } from '../types';
import { CATEGORIES } from '../data/products';

export const AdminCMSPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    showToast,
    navigate
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('beingcraft_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Brass Decor');
  const [price, setPrice] = useState<number>(1499);
  const [originalPrice, setOriginalPrice] = useState<number>(2499);
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState<number>(20);
  const [material, setMaterial] = useState('Pure Cast Brass');
  const [lengthCm, setLengthCm] = useState<number>(15);
  const [widthCm, setWidthCm] = useState<number>(10);
  const [heightCm, setHeightCm] = useState<number>(20);
  const [weightKg, setWeightKg] = useState<number>(1.2);
  const [colorFinish, setColorFinish] = useState('Polished Golden Brass');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [bestseller, setBestseller] = useState(false);
  const [newArrival, setNewArrival] = useState(true);

  // Search in products
  const [productSearch, setProductSearch] = useState('');

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'beingcraft' || passcode === 'admin123' || passcode === 'admin' || passcode === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('beingcraft_admin_auth', 'true');
      setAuthError('');
      showToast('Admin session authenticated!');
    } else {
      setAuthError('Invalid administrator passcode. (Demo pass: beingcraft or admin123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('beingcraft_admin_auth');
    showToast('Logged out of Admin Portal', 'info');
  };

  // Open modal for Create
  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory('Brass Decor');
    setPrice(1499);
    setOriginalPrice(2499);
    setSku(`AC-${Math.floor(1000 + Math.random() * 9000)}`);
    setStock(20);
    setMaterial('100% Pure Virgin Brass');
    setLengthCm(15);
    setWidthCm(10);
    setHeightCm(20);
    setWeightKg(1.2);
    setColorFinish('Antique Gold Finish');
    setShortDescription('Handcrafted artisanal brass decor sculpted with exquisite detail.');
    setDescription('Individually hand-cast by master artisans in Moradabad using traditional techniques.');
    setImageUrl('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80');
    setFeatured(false);
    setBestseller(false);
    setNewArrival(true);
    setIsProductModalOpen(true);
  };

  // Open modal for Edit
  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setSku(p.sku);
    setStock(p.stock);
    setMaterial(p.material);
    setLengthCm(p.dimensions.length);
    setWidthCm(p.dimensions.width);
    setHeightCm(p.dimensions.height);
    setWeightKg(p.weightKg);
    setColorFinish(p.colorFinish);
    setShortDescription(p.shortDescription);
    setDescription(p.description);
    setImageUrl(p.images[0] || '');
    setFeatured(p.featured || false);
    setBestseller(p.bestseller || false);
    setNewArrival(p.newArrival || false);
    setIsProductModalOpen(true);
  };

  // Submit Product form
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku || price <= 0) return;

    const discountPercent =
      originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const productPayload = {
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      sku,
      category,
      price: Number(price),
      originalPrice: Number(originalPrice),
      discountPercent,
      shortDescription,
      description,
      material,
      dimensions: {
        length: Number(lengthCm),
        width: Number(widthCm),
        height: Number(heightCm),
        unit: 'cm' as const,
      },
      weightKg: Number(weightKg),
      colorFinish,
      stock: Number(stock),
      inStock: Number(stock) > 0,
      featured,
      bestseller,
      newArrival,
      tags: [category.toLowerCase(), material.toLowerCase(), 'handcrafted'],
      images: [
        imageUrl ||
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      ],
      careInstructions: ['Wipe clean with a soft dry cloth.', 'Avoid harsh acidic cleaners.'],
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 1,
      reviews: editingProduct ? editingProduct.reviews : [],
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
  };

  // Calculations for Overview
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalItemsSold = orders.reduce(
    (sum, ord) => sum + ord.items.reduce((s, it) => s + it.quantity, 0),
    0
  );
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  // If not authenticated, show passcode screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-surface-border p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-brand-maroon-subtle text-brand-maroon mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-charcoal-900">
              Admin CMS Portal
            </h1>
            <p className="text-xs text-charcoal-500">
              Enter administrator authorization key to manage inventory, catalog & orders.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">
                Passcode (Demo: <code className="text-brand-maroon font-bold">admin123</code>)
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full px-3.5 py-2.5 border border-surface-border rounded-lg focus:outline-none focus:border-brand-maroon text-sm"
              />
            </div>

            {authError && <p className="text-xs text-red-600 font-medium">{authError}</p>}

            <button
              type="submit"
              className="w-full btn-pill-primary py-3 text-xs font-bold uppercase tracking-wider"
            >
              Authorize & Access CMS
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-charcoal-500 hover:text-brand-maroon"
            >
              ← Back to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header & Quick Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Admin Active • Real-time Data Persistence Enabled</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            Catalog & Store Management CMS
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="btn-pill-primary text-xs px-4 py-2.5 flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
          <button
            onClick={handleLogout}
            className="btn-pill-outline text-xs px-4 py-2 text-charcoal-600 border-charcoal-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* 2. CMS Navigation Tabs */}
      <div className="flex border-b border-surface-border gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-brand-maroon text-brand-maroon font-bold'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Overview Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'products'
              ? 'border-brand-maroon text-brand-maroon font-bold'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-brand-maroon text-brand-maroon font-bold'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'coupons'
              ? 'border-brand-maroon text-brand-maroon font-bold'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Coupons & Banners</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-surface-border shadow-sm space-y-1">
              <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
                Total Store Revenue
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-brand-maroon">
                ₹{totalRevenue.toLocaleString('en-IN')}.00
              </h3>
              <p className="text-[11px] text-emerald-700">From {orders.length} placed customer orders</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-surface-border shadow-sm space-y-1">
              <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
                Active Catalog Items
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-charcoal-900">
                {products.length}
              </h3>
              <p className="text-[11px] text-charcoal-500">Across {CATEGORIES.length} handcrafted categories</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-surface-border shadow-sm space-y-1">
              <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
                Total Items Sold
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-charcoal-900">
                {totalItemsSold}
              </h3>
              <p className="text-[11px] text-charcoal-500">Handcrafted brass & decor dispatched</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-surface-border shadow-sm space-y-1">
              <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
                Low Stock Warning
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-amber-600">
                {lowStockCount}
              </h3>
              <p className="text-[11px] text-charcoal-500">Products with under 10 units</p>
            </div>
          </div>

          {/* Recent Orders in Overview */}
          <div className="bg-white rounded-2xl border border-surface-border shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-charcoal-900">
                Recent Orders Stream
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-brand-maroon hover:underline"
              >
                View all orders →
              </button>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-charcoal-500 py-6 text-center">
                No orders placed yet. Place a test order through checkout to preview here!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-surface-muted text-charcoal-600 uppercase border-b border-surface-border">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-surface-muted/50">
                        <td className="p-3 font-bold text-brand-maroon">{ord.orderNumber}</td>
                        <td className="p-3 font-medium text-charcoal-900">{ord.customer.fullName}</td>
                        <td className="p-3 text-charcoal-600">{ord.items.length} items</td>
                        <td className="p-3 font-bold text-charcoal-900">₹{ord.total.toLocaleString('en-IN')}</td>
                        <td className="p-3 uppercase font-semibold text-charcoal-700">{ord.paymentMethod}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full font-semibold text-[10px] bg-emerald-100 text-emerald-800">
                            {ord.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, SKU, or category..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-surface-border rounded-lg text-xs focus:outline-none focus:border-brand-maroon"
              />
            </div>
            <span className="text-xs text-charcoal-500">
              Showing {filteredProducts.length} of {products.length} catalog items
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-surface-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-surface-muted text-charcoal-600 uppercase border-b border-surface-border">
                  <tr>
                    <th className="p-3">Image</th>
                    <th className="p-3">Product Name & Category</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Badges</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-muted/40 transition-colors">
                      <td className="p-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover border border-surface-border shrink-0"
                        />
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-charcoal-900 block line-clamp-1">{p.name}</span>
                        <span className="text-[11px] text-brand-maroon font-semibold">{p.category}</span>
                      </td>
                      <td className="p-3 font-mono text-charcoal-600">{p.sku}</td>
                      <td className="p-3">
                        <span className="font-bold text-charcoal-900 block">₹{p.price.toLocaleString('en-IN')}</span>
                        {p.originalPrice > p.price && (
                          <span className="text-[10px] text-charcoal-400 line-through">
                            ₹{p.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                            p.stock < 10 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3 space-x-1">
                        {p.bestseller && (
                          <span className="bg-brand-maroon text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Bestseller
                          </span>
                        )}
                        {p.featured && (
                          <span className="bg-brand-gold text-black text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                        {p.newArrival && (
                          <span className="bg-blue-100 text-blue-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            New
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/product/${p.slug}`)}
                            className="p-1 text-charcoal-500 hover:text-charcoal-900"
                            title="Preview on Store"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1 text-charcoal-500 hover:text-brand-maroon"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1 text-charcoal-500 hover:text-red-600"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-charcoal-900">
              Customer Order Management ({orders.length})
            </h2>
            <span className="text-xs text-charcoal-500">Live Indian Orders Queue</span>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-surface-border text-charcoal-500 text-xs">
              No customer orders in record. Place an order through checkout to test.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white p-5 rounded-2xl border border-surface-border shadow-sm space-y-4 text-xs"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-surface-border pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-brand-maroon">{ord.orderNumber}</span>
                        <span className="text-charcoal-400">•</span>
                        <span className="text-charcoal-600">
                          {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-charcoal-700 font-semibold mt-0.5">
                        {ord.customer.fullName} ({ord.customer.phone} / {ord.customer.email})
                      </p>
                    </div>

                    {/* Status Changer */}
                    <div className="flex items-center gap-2">
                      <span className="text-charcoal-500 font-medium">Order Status:</span>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) =>
                          updateOrderStatus(ord.id, e.target.value as Order['orderStatus'])
                        }
                        className="font-bold px-2.5 py-1 border border-surface-border rounded-lg text-brand-maroon focus:outline-none bg-surface-muted cursor-pointer"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Address & Payment Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-charcoal-600">
                    <div>
                      <span className="font-bold text-charcoal-800 block mb-0.5">Shipping Address:</span>
                      <p>
                        {ord.shippingAddress.addressLine1}, {ord.shippingAddress.addressLine2 && `${ord.shippingAddress.addressLine2}, `}
                        {ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.pincode}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-charcoal-800 block mb-0.5">Payment Details:</span>
                      <p className="capitalize">
                        Method: <strong>{ord.paymentMethod.toUpperCase()}</strong> | Status:{' '}
                        <strong className="text-emerald-700">{ord.paymentStatus}</strong>
                      </p>
                      <p>Tracking ID: <strong>{ord.trackingNumber}</strong></p>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="bg-surface-muted p-3 rounded-xl space-y-2">
                    {ord.items.map((it, i) => (
                      <div key={i} className="flex items-center justify-between text-charcoal-800">
                        <div className="flex items-center gap-2">
                          <img
                            src={it.productImage}
                            alt={it.productName}
                            className="w-8 h-8 rounded object-cover border"
                          />
                          <span>
                            {it.productName} (x{it.quantity})
                          </span>
                        </div>
                        <span className="font-bold">₹{it.total.toLocaleString('en-IN')}.00</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-surface-border flex justify-between font-bold text-charcoal-900">
                      <span>Total Invoice</span>
                      <span className="text-brand-maroon">₹{ord.total.toLocaleString('en-IN')}.00</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* COUPONS TAB */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-charcoal-900">
              Active Store Promotional Coupons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="p-4 rounded-xl border border-brand-maroon/20 bg-brand-maroon-subtle/50 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-brand-maroon font-mono">{c.code}</span>
                    <span className="bg-brand-maroon text-white text-[10px] px-2 py-0.5 rounded font-bold">
                      {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                    </span>
                  </div>
                  <p className="text-charcoal-600">{c.description}</p>
                  <p className="text-charcoal-500 text-[10px]">Min Cart: ₹{c.minOrderValue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. PRODUCT CREATE / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-surface-border max-h-[90vh] overflow-y-auto p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h3 className="font-heading font-bold text-lg text-charcoal-900">
                {editingProduct ? 'Edit Handcrafted Product' : 'Add New Handcrafted Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-charcoal-500 hover:text-brand-maroon"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Royal Peacock Brass Urli"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-maroon"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Selling Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Original MRP Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Stock Units Available *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Material Composition *</label>
                  <input
                    type="text"
                    required
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    placeholder="e.g. 100% Pure Virgin Brass"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Color / Finish</label>
                  <input
                    type="text"
                    value={colorFinish}
                    onChange={(e) => setColorFinish(e.target.value)}
                    placeholder="e.g. Antique Gold / Verdigris"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Net Weight (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Dimensions L × W × H (cm)</label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      placeholder="L"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(Number(e.target.value))}
                      className="px-2 py-1.5 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="W"
                      value={widthCm}
                      onChange={(e) => setWidthCm(Number(e.target.value))}
                      className="px-2 py-1.5 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="H"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="px-2 py-1.5 border rounded"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1">Image URL (High Quality)</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1">Full Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  />
                </div>

                {/* Badges */}
                <div className="sm:col-span-2 flex gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="accent-brand-maroon"
                    />
                    <span>Featured in Home Hero</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-semibold">
                    <input
                      type="checkbox"
                      checked={bestseller}
                      onChange={(e) => setBestseller(e.target.checked)}
                      className="accent-brand-maroon"
                    />
                    <span>Mark as Bestseller</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-semibold">
                    <input
                      type="checkbox"
                      checked={newArrival}
                      onChange={(e) => setNewArrival(e.target.checked)}
                      className="accent-brand-maroon"
                    />
                    <span>New Arrival</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2 border rounded-full hover:bg-surface-muted font-medium"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-pill-primary px-7 py-2 font-bold">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
