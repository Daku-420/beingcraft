import React, { useState, useRef } from 'react';
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
  Lock,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Sparkles,
  Copy,
  FileText,
  Check,
  ExternalLink,
  Clock,
  ArrowLeft,
  Info,
  Download,
  ChevronDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import type { Product, ProductCategory } from '../types';
import { CATEGORIES } from '../data/products';
import { handleImageError, getSafeImageUrl } from '../utils/imageHelper';

export const AdminCMSPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    deleteOrder,
    clearAllOrders,
    coupons,
    showToast,
    navigate
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'add-product' | 'orders' | 'coupons'>('overview');
  const [isCsvMenuOpen, setIsCsvMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('beingcraft_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Editing state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Dining & Kitchen');
  const [subCategory, setSubCategory] = useState('');
  const [collection, setCollection] = useState<'New Arrivals' | 'Best Sellers' | 'Festive Collection' | 'Heritage Collection' | 'Artisan Collection' | 'Gifts' | ''>('');
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState<number>(0);
  const [material, setMaterial] = useState('');
  const [colorFinish, setColorFinish] = useState('');

  // Measurements
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [measurementUnit, setMeasurementUnit] = useState<'cm' | 'inches'>('cm');
  const [weightKg, setWeightKg] = useState<number>(0);

  // Descriptions & Highlights
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlightInput, setNewHighlightInput] = useState('');

  // Pictures / Images
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cancellation & Returns
  const [isCancellable, setIsCancellable] = useState<boolean>(true);
  const [cancellationPolicy, setCancellationPolicy] = useState<string>(
    'Free cancellation within 24 hours of order placement before shipment dispatch.'
  );
  const [isReturnable, setIsReturnable] = useState<boolean>(true);
  const [returnWindowDays, setReturnWindowDays] = useState<number>(7);
  const [returnPolicy, setReturnPolicy] = useState<string>(
    '7-day hassle-free replacement or return in case of transit damage or craftsmanship defects.'
  );

  // Care instructions & Tags
  const [careInstructions, setCareInstructions] = useState<string[]>([]);
  const [newCareInput, setNewCareInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState('');

  // Badges
  const [featured, setFeatured] = useState<boolean>(false);
  const [bestseller, setBestseller] = useState<boolean>(false);
  const [newArrival, setNewArrival] = useState<boolean>(false);

  // Search in products
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Generate unique SKU
  const generateSku = () => {
    const prefix = category ? category.substring(0, 2).toUpperCase() : 'BC';
    const random = Math.floor(1000 + Math.random() * 9000);
    setSku(`BC-${prefix}-${random}`);
    showToast(`Generated SKU: BC-${prefix}-${random}`, 'info');
  };

  // CSV Helpers
  const escapeCSV = (val: any): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const handleDownloadProductsCSV = () => {
    if (products.length === 0) {
      showToast('No products in catalog to export.', 'info');
      return;
    }
    const headers = [
      'ID',
      'SKU',
      'Product Title',
      'Category',
      'Sub Category',
      'Collection',
      'Price (INR)',
      'Original Price (INR)',
      'Stock',
      'Material',
      'Color & Finish',
      'Dimensions (LxWxH)',
      'Unit',
      'Weight (kg)',
      'Short Description',
      'Description',
      'Highlights',
      'Returnable',
      'Return Window (Days)',
      'Cancellable',
      'Primary Image',
      'All Images'
    ];

    const rows = products.map((p) => [
      p.id,
      p.sku,
      p.name,
      p.category,
      p.subCategory || '',
      p.collection || '',
      p.price,
      p.originalPrice,
      p.stock,
      p.material,
      p.colorFinish || '',
      p.dimensions ? `${p.dimensions.length}x${p.dimensions.width}x${p.dimensions.height}` : '',
      p.dimensions?.unit || 'cm',
      p.weightKg || 0,
      p.shortDescription || '',
      p.description || '',
      (p.highlights || []).join(' | '),
      p.isReturnable !== false ? 'Yes' : 'No',
      p.returnWindowDays || 7,
      p.isCancellable !== false ? 'Yes' : 'No',
      p.images?.[0] || '',
      (p.images || []).join(' ; ')
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...rows.map((row) => row.map(escapeCSV).join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BeingCraft_Products_Catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded CSV for ${products.length} products!`, 'success');
  };

  const handleDownloadOrdersCSV = () => {
    if (orders.length === 0) {
      showToast('No customer orders to export yet.', 'info');
      return;
    }
    const headers = [
      'Order Number',
      'Order Date',
      'Customer Name',
      'Email',
      'Phone',
      'Address',
      'City',
      'State',
      'Pincode',
      'Items Count',
      'Items Summary',
      'Total (INR)',
      'Payment Method',
      'Payment Status',
      'Order Status'
    ];

    const rows = orders.map((o) => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString('en-IN'),
      o.customer.fullName,
      o.customer.email,
      o.customer.phone,
      o.shippingAddress
        ? `${o.shippingAddress.addressLine1}${o.shippingAddress.addressLine2 ? ' ' + o.shippingAddress.addressLine2 : ''}`
        : '',
      o.shippingAddress?.city || '',
      o.shippingAddress?.state || '',
      o.shippingAddress?.pincode || '',
      o.items.length,
      o.items.map((i) => `${i.productName} (x${i.quantity})`).join(' | '),
      o.total,
      o.paymentMethod,
      o.paymentStatus || 'paid',
      o.orderStatus
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...rows.map((row) => row.map(escapeCSV).join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BeingCraft_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded CSV for ${orders.length} orders!`, 'success');
  };

  // Auth Handlers
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    if (clean === 'beingcraft2026' || clean === 'beingcraft' || clean === 'admin123' || clean === 'admin' || clean === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('beingcraft_admin_auth', 'true');
      setAuthError('');
      showToast('Admin session authenticated!');
    } else {
      setAuthError('Invalid passcode. Passcode is: beingcraft2026');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('beingcraft_admin_auth', 'true');
    setAuthError('');
    showToast('Admin session authenticated via Quick Access!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('beingcraft_admin_auth');
    showToast('Logged out of Admin Portal', 'info');
  };

  // Switch to Add Product Form
  const startAddProduct = () => {
    setEditingProductId(null);
    setName('');
    setCategory('Dining & Kitchen');
    setSubCategory('');
    setCollection('');
    setPrice(0);
    setOriginalPrice(0);
    setSku('');
    setStock(0);
    setMaterial('');
    setColorFinish('');
    setLength(0);
    setWidth(0);
    setHeight(0);
    setMeasurementUnit('cm');
    setWeightKg(0);
    setShortDescription('');
    setDescription('');
    setHighlights([]);
    setImages([]);
    setIsCancellable(true);
    setCancellationPolicy('Free cancellation within 24 hours of order placement before shipment dispatch.');
    setIsReturnable(true);
    setReturnWindowDays(7);
    setReturnPolicy('7-day hassle-free replacement or return in case of transit damage or craftsmanship defects.');
    setCareInstructions([]);
    setTags([]);
    setFeatured(false);
    setBestseller(false);
    setNewArrival(false);
    setActiveTab('add-product');
  };

  // Open Edit Form for an existing product
  const startEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setName(p.name);
    setCategory(p.category);
    setSubCategory(p.subCategory || '');
    setCollection((p.collection as any) || '');
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setSku(p.sku);
    setStock(p.stock);
    setMaterial(p.material);
    setColorFinish(p.colorFinish || 'Natural Heritage Polish');
    setLength(p.dimensions?.length || 20);
    setWidth(p.dimensions?.width || 15);
    setHeight(p.dimensions?.height || 20);
    setMeasurementUnit(p.dimensions?.unit || 'cm');
    setWeightKg(p.weightKg || 1.0);
    setShortDescription(p.shortDescription || '');
    setDescription(p.description || '');
    setHighlights(p.highlights && p.highlights.length > 0 ? p.highlights : [
      'Authentic handcrafted Indian heritage craft',
      'Solid virgin raw materials',
      'Protective finish for lifelong preservation'
    ]);
    setImages(p.images && p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80']);
    setIsCancellable(p.isCancellable !== false);
    setCancellationPolicy(p.cancellationPolicy || 'Free cancellation within 24 hours before workshop dispatch.');
    setIsReturnable(p.isReturnable !== false);
    setReturnWindowDays(p.returnWindowDays || 7);
    setReturnPolicy(p.returnPolicy || '7-day replacement if damaged during transit.');
    setCareInstructions(p.careInstructions && p.careInstructions.length > 0 ? p.careInstructions : ['Clean with soft dry cloth.']);
    setTags(p.tags || ['handcrafted']);
    setFeatured(Boolean(p.featured));
    setBestseller(Boolean(p.bestseller));
    setNewArrival(Boolean(p.newArrival));
    setActiveTab('add-product');
  };

  // Duplicate / Clone Product
  const handleCloneProduct = (p: Product) => {
    const cloneSku = `BC-CPY-${Math.floor(1000 + Math.random() * 9000)}`;
    const clonedProduct: Omit<Product, 'id'> = {
      ...p,
      name: `${p.name} (Copy)`,
      slug: `${p.slug}-copy-${Date.now()}`,
      sku: cloneSku,
      stock: 10,
    };
    addProduct(clonedProduct);
    showToast(`Created duplicate product with SKU: ${cloneSku}`);
  };

  // Highlight actions
  const addHighlight = () => {
    if (!newHighlightInput.trim()) return;
    setHighlights([...highlights, newHighlightInput.trim()]);
    setNewHighlightInput('');
  };

  const removeHighlight = (idx: number) => {
    setHighlights(highlights.filter((_, i) => i !== idx));
  };

  // Image actions
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setImages([...images, imageUrlInput.trim()]);
    setImageUrlInput('');
    showToast('Image URL added to gallery!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        showToast('Please select valid image files (JPG, PNG, WEBP).', 'error');
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        showToast('Image size exceeds 8MB.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImages((prev) => [...prev, result]);
          showToast(`Uploaded "${file.name}"`);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const setPrimaryImage = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const rest = images.filter((_, i) => i !== index);
    setImages([selected, ...rest]);
    showToast('Set as cover image!');
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Care instructions actions
  const addCareInstruction = () => {
    if (!newCareInput.trim()) return;
    setCareInstructions([...careInstructions, newCareInput.trim()]);
    setNewCareInput('');
  };

  const removeCareInstruction = (index: number) => {
    setCareInstructions(careInstructions.filter((_, i) => i !== index));
  };

  // Tags actions
  const addTag = () => {
    if (!newTagInput.trim()) return;
    const cleanTag = newTagInput.trim().toLowerCase();
    if (!tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
    }
    setNewTagInput('');
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Submit Product Form
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Product title is required.', 'error');
      return;
    }
    if (!sku.trim()) {
      showToast('SKU code is required.', 'error');
      return;
    }
    if (price <= 0) {
      showToast('Selling price must be greater than ₹0.', 'error');
      return;
    }
    if (images.length === 0) {
      showToast('Please provide at least one product picture.', 'error');
      return;
    }

    const discountPercent =
      originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const finalSlug = editingProductId
      ? baseSlug
      : `${baseSlug}-${Math.floor(100 + Math.random() * 900)}`;

    const productPayload: Omit<Product, 'id'> = {
      name: name.trim(),
      slug: finalSlug,
      sku: sku.trim().toUpperCase(),
      category,
      subCategory: subCategory.trim() || undefined,
      collection: collection || undefined,
      price: Number(price),
      originalPrice: Number(originalPrice || price),
      discountPercent,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      highlights: highlights.filter((h) => h.trim().length > 0),
      material: material.trim(),
      dimensions: {
        length: Number(length) || 1,
        width: Number(width) || 1,
        height: Number(height) || 1,
        unit: measurementUnit,
      },
      weightKg: Number(weightKg) || 0.5,
      colorFinish: colorFinish.trim(),
      stock: Number(stock),
      inStock: Number(stock) > 0,
      featured,
      bestseller,
      newArrival,
      tags: tags.length > 0 ? tags : [category.toLowerCase(), 'handcrafted'],
      images,
      cancellationPolicy: isCancellable ? cancellationPolicy.trim() : 'Non-cancellable once confirmed.',
      returnPolicy: isReturnable
        ? returnPolicy.trim()
        : 'Final sale. Not eligible for return or replacement.',
      isCancellable,
      isReturnable,
      returnWindowDays: isReturnable ? Number(returnWindowDays) || 7 : 0,
      careInstructions: careInstructions.filter((c) => c.trim().length > 0),
      rating: 5.0,
      reviewCount: 1,
      reviews: [],
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
      showToast(`Updated product "${name}" successfully!`);
    } else {
      addProduct(productPayload);
      showToast(`Added product "${name}" to store catalog!`);
    }

    // Switch back to products list
    setActiveTab('products');
  };

  // Filtered products list for table
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      productSearch.trim() === '' ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.material.toLowerCase().includes(productSearch.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Overview metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
  const totalItemsSold = orders.reduce((sum, ord) => {
    return sum + (ord.items ? ord.items.reduce((s, it) => s + (it.quantity || 1), 0) : 0);
  }, 0);
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-surface-cream/50">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-surface-border p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-brand-maroon/10 text-brand-maroon flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-charcoal-900">
              BeingCraft Admin Portal
            </h1>
            <p className="text-xs text-charcoal-500">
              Manage your handcrafted products, customer orders, and catalog highlights.
            </p>
          </div>

          {/* Quick pass hint banner */}
          <div className="p-3.5 rounded-xl bg-brand-maroon-subtle/50 border border-brand-maroon/20 text-xs text-charcoal-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-brand-maroon">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Administrator Access</span>
            </div>
            <p className="text-[11px] text-charcoal-600">
              Passcode: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-brand-maroon/30 text-brand-maroon font-bold">beingcraft2026</code>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full px-4 py-3 rounded-xl border border-surface-border text-sm focus:outline-none focus:border-brand-maroon transition-colors"
              />
              {authError && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-pill-primary py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              Sign In to Admin Portal
            </button>

            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 text-xs font-semibold text-brand-maroon hover:bg-brand-maroon-subtle rounded-xl transition-colors border border-dashed border-brand-maroon/30"
            >
              One-Click Instant Access
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-charcoal-500 hover:text-brand-maroon transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Return to Public Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED PORTAL
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[85vh]">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-maroon text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
            <span>Store Administrator Suite</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            Catalog & Inventory Studio
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Add items with descriptions, highlights, measurements, pictures, cancellation, and return rules.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
          {/* Download CSV Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCsvMenuOpen(!isCsvMenuOpen)}
              className="px-3.5 py-2.5 rounded-full border border-surface-border text-charcoal-700 hover:text-brand-maroon hover:bg-surface-muted text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm bg-white"
              title="Download CSV Reports"
            >
              <Download className="w-3.5 h-3.5 text-brand-maroon" />
              <span>Download CSV</span>
              <ChevronDown className="w-3 h-3 text-charcoal-400" />
            </button>

            {isCsvMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-surface-border py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-1.5 text-[10px] uppercase font-bold text-charcoal-400 tracking-wider">
                  Select CSV Report
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleDownloadProductsCSV();
                    setIsCsvMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-surface-muted flex items-center justify-between text-charcoal-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-brand-maroon" />
                    <span className="font-medium">Products Catalog CSV</span>
                  </div>
                  <span className="text-[10px] bg-surface-muted text-charcoal-600 px-1.5 py-0.5 rounded font-mono">
                    {products.length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDownloadOrdersCSV();
                    setIsCsvMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-surface-muted flex items-center justify-between text-charcoal-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-brand-gold" />
                    <span className="font-medium">Customer Orders CSV</span>
                  </div>
                  <span className="text-[10px] bg-surface-muted text-charcoal-600 px-1.5 py-0.5 rounded font-mono">
                    {orders.length}
                  </span>
                </button>

                <a
                  href="/beingcraft_product_template.csv"
                  download="beingcraft_product_template.csv"
                  onClick={() => setIsCsvMenuOpen(false)}
                  className="w-full text-left px-3.5 py-2 hover:bg-surface-muted flex items-center justify-between text-charcoal-800 transition-colors border-t border-surface-border mt-1 pt-2"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">Download Sample Template</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold">
                    .CSV
                  </span>
                </a>
              </div>
            )}
          </div>

          <button
            onClick={startAddProduct}
            className="btn-pill-primary text-xs px-4 sm:px-5 py-2.5 flex items-center gap-2 font-bold shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>

          <button
            onClick={() => navigate('/shop')}
            className="p-2.5 rounded-full border border-surface-border text-charcoal-600 hover:text-brand-maroon hover:bg-surface-muted transition-colors"
            title="Preview Live Shop"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="text-xs text-charcoal-500 hover:text-red-600 px-3 py-2 border border-surface-border rounded-full transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 sm:gap-4 border-b border-surface-border overflow-x-auto pb-px text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-brand-maroon text-brand-maroon font-bold'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'products'
              ? 'border-brand-maroon text-brand-maroon font-bold'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => {
            if (activeTab !== 'add-product') {
              startAddProduct();
            }
          }}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'add-product'
              ? 'border-brand-maroon text-brand-maroon font-bold'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{editingProductId ? 'Edit Item Studio' : '+ Add Item Studio'}</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
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
          className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'coupons'
              ? 'border-brand-maroon text-brand-maroon font-bold'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Discount Coupons</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
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
              <p className="text-[11px] text-charcoal-500">Live handcrafted artisan products</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-surface-border shadow-sm space-y-1">
              <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
                Total Units Dispatched
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-charcoal-900">
                {totalItemsSold}
              </h3>
              <p className="text-[11px] text-charcoal-500">Authentic artisan pieces fulfilled</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-surface-border shadow-sm space-y-1">
              <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
                Low Stock Alert
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-amber-600">
                {lowStockCount}
              </h3>
              <p className="text-[11px] text-charcoal-500">Products with under 10 inventory units</p>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-gradient-to-r from-brand-maroon-dark to-[#3A000E] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-brand-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-xl text-white">
                Ready to Expand Your Handcrafted Catalog?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                Add new creations with detailed descriptions, bulleted product highlights, exact dimensions, weight, photo gallery, cancellation, and return terms.
              </p>
            </div>
            <button
              onClick={startAddProduct}
              className="btn-pill-accent px-6 py-3 text-xs sm:text-sm font-bold shadow shrink-0 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Launch Product Studio</span>
            </button>
          </div>

          {/* Recent Orders in Overview */}
          <div className="bg-white rounded-2xl border border-surface-border shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-charcoal-900">
                Recent Orders Queue
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
                No orders placed yet. As customers place orders, they will stream live into this dashboard.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-surface-muted text-charcoal-600 uppercase border-b border-surface-border">
                    <tr>
                      <th className="p-3">Order Number</th>
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
                        <td className="p-3 font-bold text-brand-maroon font-mono">{ord.orderNumber}</td>
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

      {/* ========================================================================= */}
      {/* TAB 2: PRODUCTS TABLE */}
      {/* ========================================================================= */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title, SKU, or material..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-surface-border rounded-xl text-xs focus:outline-none focus:border-brand-maroon"
                />
              </div>

              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-surface-border rounded-xl text-xs bg-white text-charcoal-700 focus:outline-none"
              >
                <option value="all">All Categories ({products.length})</option>
                {CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
              <span className="text-xs text-charcoal-500">
                Showing {filteredProducts.length} of {products.length} products
              </span>

              {products.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to permanently delete ALL ${products.length} products? This cannot be undone.`)) {
                      products.forEach((p) => deleteProduct(p.id));
                    }
                  }}
                  className="text-xs text-red-600 hover:text-white hover:bg-red-600 border border-red-200 px-3 py-2 rounded-xl font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                  title="Delete All Products"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete All Products</span>
                </button>
              )}

              {products.length > 0 && (
                <button
                  type="button"
                  onClick={handleDownloadProductsCSV}
                  className="text-xs text-charcoal-700 hover:text-brand-maroon hover:bg-surface-muted border border-surface-border px-3 py-2 rounded-xl font-semibold flex items-center gap-1.5 transition-all shadow-sm bg-white"
                  title="Download Products Catalog as CSV file"
                >
                  <Download className="w-3.5 h-3.5 text-brand-maroon" />
                  <span>Download CSV</span>
                </button>
              )}

              <button
                onClick={startAddProduct}
                className="btn-pill-primary text-xs px-4 py-2 flex items-center gap-1.5 font-bold shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-surface-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-surface-muted text-charcoal-600 uppercase border-b border-surface-border">
                  <tr>
                    <th className="p-3.5">Image</th>
                    <th className="p-3.5">Product Title & Category</th>
                    <th className="p-3.5">SKU</th>
                    <th className="p-3.5">Price (INR)</th>
                    <th className="p-3.5">Measurements</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Policies</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-16 text-center text-charcoal-500">
                        <div className="max-w-md mx-auto space-y-4">
                          <div className="w-16 h-16 rounded-full bg-brand-maroon-subtle text-brand-maroon mx-auto flex items-center justify-center">
                            <Package className="w-8 h-8 text-brand-gold" />
                          </div>
                          <h4 className="font-heading font-bold text-lg text-charcoal-900">
                            {products.length === 0
                              ? 'Your Store Catalog is Empty'
                              : 'No Matching Products Found'}
                          </h4>
                          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                            {products.length === 0
                              ? 'You have completely cleared all system-generated items. Click below to add your first handcrafted item with descriptions, highlights, dimensions, and pictures.'
                              : 'Try changing your search terms or clearing the category filter.'}
                          </p>
                          {products.length === 0 && (
                            <div className="flex items-center justify-center gap-3 flex-wrap">
                              <button
                                onClick={startAddProduct}
                                className="btn-pill-primary text-xs px-6 py-2.5 font-bold shadow inline-flex items-center gap-2"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Create Your First Product</span>
                              </button>

                              <a
                                href="/beingcraft_product_template.csv"
                                download="beingcraft_product_template.csv"
                                className="px-5 py-2.5 text-xs text-charcoal-700 hover:text-brand-maroon border border-surface-border rounded-full font-semibold inline-flex items-center gap-2 bg-white hover:bg-surface-muted transition-colors shadow-sm"
                              >
                                <Download className="w-4 h-4 text-brand-maroon" />
                                <span>Download CSV Template</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-surface-muted/40 transition-colors">
                        <td className="p-3.5">
                          <img
                            src={getSafeImageUrl(p.images?.[0])}
                            alt={p.name}
                            onError={handleImageError}
                            className="w-12 h-12 rounded-lg object-cover border border-surface-border shrink-0 shadow-sm"
                          />
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <span className="font-bold text-charcoal-900 block truncate" title={p.name}>
                            {p.name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] text-brand-maroon font-semibold">{p.category}</span>
                            {p.highlights && p.highlights.length > 0 && (
                              <span className="text-[10px] text-charcoal-500 bg-surface-muted px-1.5 py-0.2 rounded border">
                                {p.highlights.length} highlights
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3.5 font-mono text-charcoal-600 font-semibold">{p.sku}</td>
                        <td className="p-3.5">
                          <span className="font-bold text-charcoal-900 block">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                          {p.originalPrice > p.price && (
                            <span className="text-[10px] text-charcoal-400 line-through">
                              ₹{p.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-[11px] text-charcoal-600 whitespace-nowrap">
                          {p.dimensions ? (
                            <div>
                              <span>{p.dimensions.length}×{p.dimensions.width}×{p.dimensions.height} {p.dimensions.unit}</span>
                              <span className="block text-charcoal-400">{p.weightKg} kg</span>
                            </div>
                          ) : (
                            <span className="text-charcoal-400">—</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
                              p.stock < 5
                                ? 'bg-red-100 text-red-800'
                                : p.stock < 10
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {p.stock} in stock
                          </span>
                        </td>
                        <td className="p-3.5 text-[11px] space-y-0.5">
                          <div className="flex items-center gap-1 text-emerald-700">
                            <RotateCcw className="w-3 h-3 shrink-0" />
                            <span>{p.isReturnable !== false ? `${p.returnWindowDays || 7}d Return` : 'No Return'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-charcoal-500">
                            <Clock className="w-3 h-3 shrink-0" />
                            <span>{p.isCancellable !== false ? 'Cancellable' : 'No Cancel'}</span>
                          </div>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5 flex-wrap">
                            <button
                              onClick={() => navigate(`/product/${p.slug}`)}
                              className="p-1.5 text-charcoal-500 hover:text-charcoal-900 hover:bg-surface-muted rounded-lg transition-colors"
                              title="Preview on Store"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleCloneProduct(p)}
                              className="p-1.5 text-charcoal-500 hover:text-brand-maroon hover:bg-surface-muted rounded-lg transition-colors"
                              title="Duplicate Product"
                            >
                              <Copy className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => startEditProduct(p)}
                              className="px-2.5 py-1 text-xs text-charcoal-700 hover:text-brand-maroon hover:bg-surface-muted border border-surface-border rounded-lg transition-colors font-medium inline-flex items-center gap-1"
                              title="Edit Product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete "${p.name}" (SKU: ${p.sku})? This product will be permanently removed from your store catalog.`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="px-2.5 py-1 text-xs text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded-lg transition-all font-semibold inline-flex items-center gap-1 shadow-sm"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DEDICATED ADD / EDIT PRODUCT STUDIO */}
      {/* ========================================================================= */}
      {activeTab === 'add-product' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-surface-border pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('products')}
                className="p-2 rounded-xl border border-surface-border hover:bg-surface-muted transition-colors text-charcoal-600"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-charcoal-900">
                  {editingProductId ? 'Edit Handcrafted Item' : 'Add New Item to Catalog'}
                </h2>
                <p className="text-xs text-charcoal-500">
                  Fill in product information, measurements, pictures, cancellation, and return rules.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className="px-4 py-2 border border-surface-border rounded-full text-xs font-semibold hover:bg-surface-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitProduct}
                className="btn-pill-primary px-6 py-2 text-xs font-bold shadow-md hover:shadow-lg flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{editingProductId ? 'Save Changes' : 'Publish Product'}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitProduct} className="space-y-8 text-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT COLUMN: Main Form Inputs */}
              <div className="lg:col-span-8 space-y-6">
                {/* 1. Basic Information */}
                <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-surface-border pb-3">
                    <FileText className="w-4 h-4 text-brand-maroon" />
                    <h3 className="font-heading font-bold text-sm text-charcoal-900">
                      1. Basic Item Details
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Royal Peacock Handcrafted Brass Urli with Bells"
                        className="w-full px-3.5 py-2.5 border border-surface-border rounded-xl text-sm focus:outline-none focus:border-brand-maroon"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-charcoal-800 mb-1">
                          Category *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as ProductCategory)}
                          className="w-full px-3 py-2 border border-surface-border rounded-xl bg-white text-charcoal-900 focus:outline-none focus:border-brand-maroon"
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="font-semibold text-charcoal-800">SKU Code *</label>
                          <button
                            type="button"
                            onClick={generateSku}
                            className="text-[10px] text-brand-maroon font-bold hover:underline"
                          >
                            Auto-Generate
                          </button>
                        </div>
                        <input
                          type="text"
                          required
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                          placeholder="e.g. BC-BR-4921"
                          className="w-full px-3 py-2 border border-surface-border rounded-xl font-mono text-xs uppercase focus:outline-none focus:border-brand-maroon"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-charcoal-800 mb-1">
                          Collection / Series
                        </label>
                        <select
                          value={collection}
                          onChange={(e) => setCollection(e.target.value as any)}
                          className="w-full px-3 py-2 border border-surface-border rounded-xl bg-white text-charcoal-900 focus:outline-none focus:border-brand-maroon"
                        >
                          <option value="">None</option>
                          <option value="New Arrivals">New Arrivals</option>
                          <option value="Best Sellers">Best Sellers</option>
                          <option value="Festive Collection">Festive Collection</option>
                          <option value="Heritage Collection">Heritage Collection</option>
                          <option value="Artisan Collection">Artisan Collection</option>
                          <option value="Gifts">Gifts & Heirlooms</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-charcoal-800 mb-1">
                          Material Composition *
                        </label>
                        <input
                          type="text"
                          required
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                          placeholder="e.g. 100% Solid Virgin Brass / Makrana Marble / Sheesham"
                          className="w-full px-3 py-2 border border-surface-border rounded-xl focus:outline-none focus:border-brand-maroon"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-charcoal-800 mb-1">
                          Color & Surface Finish
                        </label>
                        <input
                          type="text"
                          value={colorFinish}
                          onChange={(e) => setColorFinish(e.target.value)}
                          placeholder="e.g. Antique Gold Patina with Protective Lacquer"
                          className="w-full px-3 py-2 border border-surface-border rounded-xl focus:outline-none focus:border-brand-maroon"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Pricing & Stock */}
                <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-surface-border pb-3">
                    <TrendingUp className="w-4 h-4 text-brand-maroon" />
                    <h3 className="font-heading font-bold text-sm text-charcoal-900">
                      2. Pricing & Inventory
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Selling Price (₹ INR) *
                      </label>
                      <input
                        type="number"
                        required
                        min={1}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-surface-border rounded-xl text-sm font-bold text-charcoal-900 focus:outline-none focus:border-brand-maroon"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Original MRP Price (₹ INR) *
                      </label>
                      <input
                        type="number"
                        required
                        min={1}
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-surface-border rounded-xl text-sm focus:outline-none focus:border-brand-maroon"
                      />
                      {originalPrice > price && (
                        <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                          Discount: {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-surface-border rounded-xl text-sm focus:outline-none focus:border-brand-maroon"
                      />
                      <p className="text-[10px] text-charcoal-500 mt-1">
                        {stock > 0 ? `${stock} units in inventory` : 'Out of stock'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Description & Product Highlights (Requested explicitly by user) */}
                <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-surface-border pb-3">
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                    <div>
                      <h3 className="font-heading font-bold text-sm text-charcoal-900">
                        3. Description & Product Highlights
                      </h3>
                      <p className="text-[11px] text-charcoal-500">
                        Highlight the artisanal craft features and detailed story of the piece.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Short Summary Excerpt
                      </label>
                      <textarea
                        rows={2}
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="Brief 1-2 sentence hook displayed in catalog cards and search..."
                        className="w-full px-3 py-2 border border-surface-border rounded-xl focus:outline-none focus:border-brand-maroon"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Full Detailed Product Description *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detailed heritage story, artisan guild origin, casting process, and ideal decor placement..."
                        className="w-full px-3 py-2 border border-surface-border rounded-xl focus:outline-none focus:border-brand-maroon leading-relaxed"
                      />
                    </div>

                    {/* PRODUCT HIGHLIGHTS BULLET POINTS */}
                    <div className="p-4 rounded-xl bg-surface-muted/50 border border-surface-border space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-charcoal-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                          <span>Key Product Highlights (Bullet Points)</span>
                        </label>
                        <span className="text-[10px] text-charcoal-500">
                          {highlights.length} bullet points added
                        </span>
                      </div>

                      {/* Highlights list */}
                      <div className="space-y-2">
                        {highlights.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-2 p-2 bg-white rounded-lg border border-surface-border shadow-2xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-brand-gold/20 text-brand-maroon flex items-center justify-center text-[10px] font-bold">
                                {idx + 1}
                              </span>
                              <span className="text-xs text-charcoal-800">{item}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeHighlight(idx)}
                              className="text-charcoal-400 hover:text-red-600 p-1 transition-colors"
                              title="Remove highlight"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add highlight input */}
                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          value={newHighlightInput}
                          onChange={(e) => setNewHighlightInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addHighlight();
                            }
                          }}
                          placeholder="Type a new highlight bullet point and press Enter..."
                          className="flex-1 px-3 py-2 border border-surface-border rounded-xl bg-white focus:outline-none focus:border-brand-maroon"
                        />
                        <button
                          type="button"
                          onClick={addHighlight}
                          className="btn-pill-primary px-4 py-2 text-xs font-bold shrink-0"
                        >
                          Add Highlight
                        </button>
                      </div>

                      {/* Quick Highlight Preset Suggestions */}
                      <div className="pt-2">
                        <span className="text-[10px] uppercase font-bold text-charcoal-500 block mb-1.5">
                          Quick Presets (Click to add):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            '100% Solid Virgin Brass',
                            'Handcrafted by Hereditary Guild Artisans',
                            'Protective Clear Anti-Tarnish Lacquer',
                            'Genuine Makrana Marble with Inlay',
                            'Aged Natural Sheesham Rosewood',
                            'Ayurvedic Food-Safe Kansa Bronze',
                            'Multi-Layer Shockproof Packaging',
                          ].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => {
                                if (!highlights.includes(preset)) {
                                  setHighlights([...highlights, preset]);
                                }
                              }}
                              className="text-[11px] px-2.5 py-1 bg-white hover:bg-brand-maroon-subtle hover:text-brand-maroon border border-surface-border rounded-full transition-colors flex items-center gap-1"
                            >
                              <Plus className="w-2.5 h-2.5" />
                              <span>{preset}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Measurements & Dimensions (Requested explicitly by user) */}
                <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-surface-border pb-3">
                    <Ruler className="w-4 h-4 text-brand-maroon" />
                    <div>
                      <h3 className="font-heading font-bold text-sm text-charcoal-900">
                        4. Measurements & Weight
                      </h3>
                      <p className="text-[11px] text-charcoal-500">
                        Exact physical measurements to help patrons choose the right size for their sanctuary.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Length ({measurementUnit}) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-surface-border rounded-xl focus:outline-none focus:border-brand-maroon"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Width ({measurementUnit}) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-surface-border rounded-xl focus:outline-none focus:border-brand-maroon"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Height ({measurementUnit}) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-surface-border rounded-xl focus:outline-none focus:border-brand-maroon"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Measurement Unit
                      </label>
                      <div className="flex rounded-xl border border-surface-border overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setMeasurementUnit('cm')}
                          className={`flex-1 py-2 text-xs font-bold transition-colors ${
                            measurementUnit === 'cm'
                              ? 'bg-brand-maroon text-white'
                              : 'bg-white text-charcoal-600 hover:bg-surface-muted'
                          }`}
                        >
                          cm
                        </button>
                        <button
                          type="button"
                          onClick={() => setMeasurementUnit('inches')}
                          className={`flex-1 py-2 text-xs font-bold transition-colors ${
                            measurementUnit === 'inches'
                              ? 'bg-brand-maroon text-white'
                              : 'bg-white text-charcoal-600 hover:bg-surface-muted'
                          }`}
                        >
                          inches
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Net Weight (kg) *
                      </label>
                      <input
                        type="number"
                        step="0.05"
                        required
                        value={weightKg}
                        onChange={(e) => setWeightKg(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-surface-border rounded-xl focus:outline-none focus:border-brand-maroon"
                      />
                      <p className="text-[10px] text-charcoal-500 mt-1">
                        Equivalent to {(weightKg * 1000).toFixed(0)} grams
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-cream border border-surface-border flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-maroon-subtle text-brand-maroon flex items-center justify-center shrink-0">
                        <Ruler className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-maroon block">
                          Customer Specification Preview
                        </span>
                        <span className="font-bold text-charcoal-900 text-xs">
                          {length} × {width} × {height} {measurementUnit} • {weightKg} kg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Pictures & Image Gallery (Requested explicitly by user) */}
                <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-surface-border pb-3">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-brand-maroon" />
                      <div>
                        <h3 className="font-heading font-bold text-sm text-charcoal-900">
                          5. Pictures & Photography Gallery
                        </h3>
                        <p className="text-[11px] text-charcoal-500">
                          Upload high-resolution photographs from your computer or paste direct web URLs.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-brand-maroon bg-brand-maroon-subtle px-2.5 py-0.5 rounded-full">
                      {images.length} {images.length === 1 ? 'picture' : 'pictures'}
                    </span>
                  </div>

                  {/* Upload Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Local file upload */}
                    <div className="p-4 rounded-xl border-2 border-dashed border-brand-maroon/30 hover:border-brand-maroon bg-brand-maroon-subtle/20 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-colors">
                      <Upload className="w-6 h-6 text-brand-maroon" />
                      <div>
                        <span className="font-bold text-charcoal-900 block text-xs">
                          Upload Photos from Device
                        </span>
                        <span className="text-[10px] text-charcoal-500">
                          PNG, JPG, WEBP up to 8MB
                        </span>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-pill-primary text-[11px] px-4 py-1.5 font-bold"
                      >
                        Choose Photo Files
                      </button>
                    </div>

                    {/* Web URL input */}
                    <div className="p-4 rounded-xl border border-surface-border bg-surface-muted/40 space-y-2">
                      <span className="font-bold text-charcoal-900 block text-xs">
                        Or Add Web Image Link
                      </span>
                      <p className="text-[10px] text-charcoal-500">
                        Paste direct URL from Cloudinary, S3, or photography CDN.
                      </p>
                      <div className="flex gap-2 pt-1">
                        <input
                          type="url"
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className="flex-1 px-3 py-1.5 border border-surface-border rounded-lg bg-white text-xs focus:outline-none focus:border-brand-maroon"
                        />
                        <button
                          type="button"
                          onClick={handleAddImageUrl}
                          className="btn-pill-outline text-xs px-3 py-1.5 font-semibold shrink-0"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image Gallery Grid */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-semibold text-charcoal-700 block">
                      Active Gallery Photos (First image is Cover):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          className="group relative rounded-xl overflow-hidden border-2 border-surface-border bg-charcoal-900 aspect-square shadow-sm"
                        >
                          <img
                            src={getSafeImageUrl(img)}
                            alt=""
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                          />
                          {idx === 0 && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-brand-gold text-black font-bold text-[9px] shadow uppercase tracking-wider">
                              Cover Photo
                            </span>
                          )}

                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => setPrimaryImage(idx)}
                                className="px-2.5 py-1 bg-white text-charcoal-900 rounded-lg text-[10px] font-bold shadow hover:bg-brand-gold"
                              >
                                Make Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="px-2.5 py-1 bg-red-600 text-white rounded-lg text-[10px] font-bold shadow hover:bg-red-700 flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 6. Cancellation & Return Policies (Requested explicitly by user) */}
                <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-5">
                  <div className="flex items-center gap-2 border-b border-surface-border pb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <h3 className="font-heading font-bold text-sm text-charcoal-900">
                        6. Cancellation & Return Policies
                      </h3>
                      <p className="text-[11px] text-charcoal-500">
                        Define customer terms for order cancellation, transit breakage replacement, and return windows.
                      </p>
                    </div>
                  </div>

                  {/* CANCELLATION POLICY */}
                  <div className="p-4 rounded-xl bg-surface-muted/50 border border-surface-border space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 font-bold text-charcoal-900 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isCancellable}
                          onChange={(e) => setIsCancellable(e.target.checked)}
                          className="w-4 h-4 rounded text-brand-maroon accent-brand-maroon"
                        />
                        <span>Allow Order Cancellation</span>
                      </label>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border">
                        {isCancellable ? 'Cancellation Permitted' : 'Non-Cancellable'}
                      </span>
                    </div>

                    {isCancellable && (
                      <div>
                        <label className="block text-charcoal-700 font-semibold mb-1">
                          Cancellation Terms & Conditions
                        </label>
                        <textarea
                          rows={2}
                          value={cancellationPolicy}
                          onChange={(e) => setCancellationPolicy(e.target.value)}
                          placeholder="e.g. Free cancellation within 24 hours of order placement before dispatch..."
                          className="w-full px-3 py-2 border border-surface-border rounded-xl bg-white focus:outline-none focus:border-brand-maroon"
                        />
                      </div>
                    )}
                  </div>

                  {/* RETURN & REPLACEMENT POLICY */}
                  <div className="p-4 rounded-xl bg-surface-muted/50 border border-surface-border space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 font-bold text-charcoal-900 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isReturnable}
                          onChange={(e) => setIsReturnable(e.target.checked)}
                          className="w-4 h-4 rounded text-brand-maroon accent-brand-maroon"
                        />
                        <span>Allow Returns & Replacements</span>
                      </label>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border">
                        {isReturnable ? `${returnWindowDays}-Day Return Window` : 'Final Sale / Non-Returnable'}
                      </span>
                    </div>

                    {isReturnable && (
                      <div className="space-y-3">
                        <div className="w-full sm:w-48">
                          <label className="block font-semibold text-charcoal-700 mb-1">
                            Return Window (Days)
                          </label>
                          <select
                            value={returnWindowDays}
                            onChange={(e) => setReturnWindowDays(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-surface-border rounded-xl bg-white focus:outline-none"
                          >
                            <option value={3}>3 Days Replacement</option>
                            <option value={5}>5 Days Replacement</option>
                            <option value={7}>7 Days Easy Return/Replacement</option>
                            <option value={10}>10 Days Return Window</option>
                            <option value={14}>14 Days Full Return</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-charcoal-700 font-semibold mb-1">
                            Return Policy Details & Guidelines
                          </label>
                          <textarea
                            rows={2}
                            value={returnPolicy}
                            onChange={(e) => setReturnPolicy(e.target.value)}
                            placeholder="e.g. 7-day easy replacement if damaged in transit or defective. Video proof recommended..."
                            className="w-full px-3 py-2 border border-surface-border rounded-xl bg-white focus:outline-none focus:border-brand-maroon"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 7. Care Instructions & Search Tags */}
                <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-surface-border pb-3">
                    <Info className="w-4 h-4 text-brand-maroon" />
                    <h3 className="font-heading font-bold text-sm text-charcoal-900">
                      7. Care Instructions & Search Tags
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Care Instructions */}
                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Care Instructions for Buyer
                      </label>
                      <div className="space-y-1.5 mb-2">
                        {careInstructions.map((tip, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 bg-surface-muted/50 rounded-lg text-xs"
                          >
                            <span>• {tip}</span>
                            <button
                              type="button"
                              onClick={() => removeCareInstruction(idx)}
                              className="text-charcoal-400 hover:text-red-600"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCareInput}
                          onChange={(e) => setNewCareInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addCareInstruction();
                            }
                          }}
                          placeholder="e.g. Wipe with dry cotton cloth. Do not soak in water..."
                          className="flex-1 px-3 py-1.5 border border-surface-border rounded-xl bg-white focus:outline-none focus:border-brand-maroon"
                        />
                        <button
                          type="button"
                          onClick={addCareInstruction}
                          className="btn-pill-outline text-xs px-3 py-1.5 font-semibold"
                        >
                          Add Tip
                        </button>
                      </div>
                    </div>

                    {/* Search Tags */}
                    <div>
                      <label className="block font-semibold text-charcoal-800 mb-1">
                        Store Search Tags
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {tags.map((tg, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-brand-maroon-subtle text-brand-maroon rounded-full text-[11px] font-semibold flex items-center gap-1"
                          >
                            <span>#{tg}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(idx)}
                              className="hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                          placeholder="Type tag (e.g. brass, idol, vintage) and press Enter..."
                          className="flex-1 px-3 py-1.5 border border-surface-border rounded-xl bg-white focus:outline-none focus:border-brand-maroon"
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="btn-pill-outline text-xs px-3 py-1.5 font-semibold"
                        >
                          Add Tag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Badges, Live Product Card Preview & Actions */}
              <div className="lg:col-span-4 space-y-6">
                {/* Store Promotion Badges */}
                <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm space-y-3">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-charcoal-900 border-b pb-2">
                    Marketing & Badges
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-charcoal-800">
                      <input
                        type="checkbox"
                        checked={newArrival}
                        onChange={(e) => setNewArrival(e.target.checked)}
                        className="w-4 h-4 rounded text-brand-maroon accent-brand-maroon"
                      />
                      <span>Mark as "New Season Arrival"</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-charcoal-800">
                      <input
                        type="checkbox"
                        checked={bestseller}
                        onChange={(e) => setBestseller(e.target.checked)}
                        className="w-4 h-4 rounded text-brand-maroon accent-brand-maroon"
                      />
                      <span>Highlight as "Best Seller"</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-charcoal-800">
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-brand-maroon accent-brand-maroon"
                      />
                      <span>Feature in Home Hero Section</span>
                    </label>
                  </div>
                </div>

                {/* Live Card Preview */}
                <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-[10px] uppercase font-bold text-charcoal-500 tracking-wider">
                      Live Store Card Preview
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      Dynamic Render
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-surface-border bg-white shadow-sm flex flex-col">
                    <div className="relative aspect-[4/5] bg-charcoal-900 overflow-hidden">
                      <img
                        src={getSafeImageUrl(images[0])}
                        alt="Preview"
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                      {bestseller && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-brand-maroon text-white font-bold text-[9px] shadow">
                          Bestseller
                        </span>
                      )}
                      {newArrival && !bestseller && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-brand-gold text-black font-bold text-[9px] shadow">
                          New Season
                        </span>
                      )}
                    </div>
                    <div className="p-3.5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-brand-maroon tracking-wider">
                        {category}
                      </span>
                      <h5 className="font-heading font-bold text-xs text-charcoal-900 line-clamp-1">
                        {name || 'Product Title Goes Here'}
                      </h5>
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-bold text-sm text-charcoal-900">
                          ₹{price.toLocaleString('en-IN')}.00
                        </span>
                        {originalPrice > price && (
                          <span className="text-[11px] text-charcoal-400 line-through">
                            ₹{originalPrice.toLocaleString('en-IN')}.00
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-charcoal-500 line-clamp-2 pt-1">
                        {shortDescription || 'Brief handcrafted description preview.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-5 rounded-2xl bg-surface-cream border border-surface-border space-y-3">
                  <button
                    type="submit"
                    className="w-full btn-pill-primary py-3 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingProductId ? 'Update & Save Changes' : 'Publish Product to Store'}</span>
                  </button>

                  {editingProductId && (
                    <button
                      type="button"
                      onClick={() => {
                        const prod = products.find((p) => p.id === editingProductId);
                        if (window.confirm(`Are you sure you want to permanently delete "${prod?.name || name || 'this product'}"? This action cannot be undone.`)) {
                          deleteProduct(editingProductId);
                          startAddProduct();
                          setActiveTab('products');
                        }
                      }}
                      className="w-full py-2.5 text-xs text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded-full bg-white font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete This Product</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={startAddProduct}
                    className="w-full py-2.5 text-xs text-charcoal-600 hover:text-red-600 border border-surface-border rounded-full bg-white font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear / Reset Form</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('products')}
                    className="w-full py-2.5 text-xs text-charcoal-600 hover:text-charcoal-900 border border-surface-border rounded-full bg-white font-semibold transition-colors"
                  >
                    Back to Product List
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ORDERS QUEUE */}
      {/* ========================================================================= */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-heading font-bold text-lg text-charcoal-900">
                Customer Order Management ({orders.length})
              </h2>
              <span className="text-xs text-charcoal-500">Live Indian Orders Queue</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              {orders.length > 0 && (
                <button
                  type="button"
                  onClick={handleDownloadOrdersCSV}
                  className="text-xs text-charcoal-700 hover:text-brand-maroon hover:bg-surface-muted border border-surface-border px-3.5 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all shadow-sm bg-white"
                  title="Download Customer Orders as CSV file"
                >
                  <Download className="w-3.5 h-3.5 text-brand-maroon" />
                  <span>Download Orders CSV</span>
                </button>
              )}

              {orders.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ALL ${orders.length} customer orders? This action is permanent and cannot be undone.`)) {
                      clearAllOrders();
                    }
                  }}
                  className="text-xs text-red-600 hover:text-white hover:bg-red-600 border border-red-200 px-3.5 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete All Orders</span>
                </button>
              )}
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-surface-border text-charcoal-500 text-xs">
              No customer orders in record yet. Place a test order through checkout to preview it here!
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
                      <span className="font-mono font-bold text-sm text-brand-maroon">
                        {ord.orderNumber}
                      </span>
                      <span className="text-charcoal-400 ml-2">
                        • {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                          ord.paymentStatus === 'SUCCESS'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.paymentStatus === 'FAILED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.paymentStatus}
                      </span>

                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="px-2.5 py-1 border border-surface-border rounded-lg bg-surface-muted font-semibold text-charcoal-800 focus:outline-none"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      {/* Delete Order Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete order ${ord.orderNumber} placed by ${ord.customer.fullName}?`)) {
                            deleteOrder(ord.id);
                          }
                        }}
                        className="px-2.5 py-1 text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded-lg font-medium transition-colors flex items-center gap-1 shadow-sm"
                        title="Delete Order Record"
                        aria-label={`Delete order ${ord.orderNumber}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-charcoal-600">
                    <div>
                      <span className="font-bold text-charcoal-900 block">Customer</span>
                      <p>{ord.customer.fullName}</p>
                      <p>{ord.customer.phone}</p>
                      <p>{ord.customer.email}</p>
                    </div>

                    <div>
                      <span className="font-bold text-charcoal-900 block">Delivery Address</span>
                      <p>{ord.shippingAddress.addressLine1}</p>
                      {ord.shippingAddress.addressLine2 && <p>{ord.shippingAddress.addressLine2}</p>}
                      <p>
                        {ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.pincode}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-charcoal-900 block">Payment & Logistics</span>
                      <p className="uppercase">Method: <strong>{ord.paymentMethod}</strong></p>
                      {ord.transactionId && (
                        <p className="text-[11px] font-mono text-charcoal-500">
                          Txn: {ord.transactionId}
                        </p>
                      )}
                      {ord.gatewayOrderId && (
                        <p className="text-[11px] font-mono text-charcoal-500">
                          Gateway Order: {ord.gatewayOrderId}
                        </p>
                      )}
                      <p>Tracking ID: <strong>{ord.trackingNumber}</strong></p>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="bg-surface-muted p-3 rounded-xl space-y-2">
                    {ord.items.map((it, i) => (
                      <div key={i} className="flex items-center justify-between text-charcoal-800">
                        <div className="flex items-center gap-2">
                          <img
                            src={getSafeImageUrl(it.productImage)}
                            alt={it.productName}
                            onError={handleImageError}
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

      {/* ========================================================================= */}
      {/* TAB 5: COUPONS */}
      {/* ========================================================================= */}
      {activeTab === 'coupons' && (
        <div className="space-y-6 animate-in fade-in duration-200">
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
    </div>
  );
};
