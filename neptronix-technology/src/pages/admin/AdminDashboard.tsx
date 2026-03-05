import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import type { Product } from '../../types';

type AdminTab = 'dashboard' | 'products' | 'orders' | 'customers';

const CATEGORIES = [
  { value: 'laptops', label: 'Laptops', subcategories: ['Business Laptops', 'Gaming Laptops', 'Ultrabooks', '2-in-1 Laptops'] },
  { value: 'mobile-phones', label: 'Mobile Phones', subcategories: ['Android Phones', 'iPhones', 'Feature Phones', '5G Phones'] },
  { value: 'televisions', label: 'Televisions', subcategories: ['Smart TVs', 'LED TVs', 'OLED TVs', 'QLED TVs', '4K TVs'] },
  { value: 'audio', label: 'Audio', subcategories: ['Headphones & Earbuds', 'Bluetooth Speakers', 'Home Theatre', 'Soundbars', 'Microphones'] },
  { value: 'monitors', label: 'Monitors', subcategories: ['Office Monitors', 'Gaming Monitors', '4K Monitors', 'Curved Monitors'] },
  { value: 'printers', label: 'Printers', subcategories: ['Inkjet Printers', 'Laser Printers', 'Multifunction Printers', 'Photo Printers'] },
  { value: 'networking', label: 'Networking', subcategories: ['Routers', 'Switches', 'WiFi Extenders', 'PoE Switches', 'Network Cables'] },
  { value: 'storage', label: 'Storage', subcategories: ['Hard Drives', 'SSDs', 'Memory Cards', 'Pen Drives', 'NAS Devices'] },
  { value: 'ups-power', label: 'UPS / Power', subcategories: ['UPS Systems', 'Voltage Stabilizers', 'Inverters', 'Power Banks'] },
  { value: 'smart-home', label: 'Smart Home', subcategories: ['Smart Lights', 'Smart Locks', 'Smart Plugs', 'Motion Sensors', 'Smart Doorbells'] },
  { value: 'cctv-cameras', label: 'CCTV Cameras', subcategories: ['Dome Cameras', 'Bullet Cameras', 'PTZ Cameras', 'Wireless Cameras', 'Doorbell Cameras'] },
  { value: 'recording-devices', label: 'DVR / NVR', subcategories: ['4 Channel DVR', '8 Channel DVR', '16 Channel NVR', 'Hybrid Recorders'] },
  { value: 'complete-kits', label: 'Complete Kits', subcategories: ['CCTV Kits', 'Office Kits', 'Home Kits', '4 Camera Kit', '8 Camera Kit'] },
  { value: 'accessories', label: 'Accessories', subcategories: ['Cables & Connectors', 'Power Supplies', 'Mounts & Brackets', 'Security Lights', 'Storage Devices'] },
];

const BRANDS = [
  'Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Sony', 'LG', 'JBL',
  'Bose', 'Sennheiser', 'TP-Link', 'Netgear', 'D-Link', 'APC', 'Eaton', 'Zebronics',
  'Hikvision', 'Dahua', 'CP Plus', 'Bosch', 'Honeywell', 'Axis Communications',
  'Reolink', 'Imou', 'Ezviz', 'Ring', 'Arlo', 'Eufy',
  'Neptronix', 'Other'
];

const CAMERA_SPEC_TEMPLATES: Record<string, string[]> = {
  'laptops': ['Processor', 'RAM', 'Storage', 'Display', 'GPU', 'Battery', 'OS', 'Weight', 'Ports'],
  'mobile-phones': ['Display', 'Processor', 'RAM', 'Storage', 'Camera', 'Battery', 'OS', 'Connectivity'],
  'televisions': ['Screen Size', 'Resolution', 'Panel Type', 'HDR', 'Refresh Rate', 'OS', 'Ports', 'Audio'],
  'audio': ['Type', 'Driver', 'Battery', 'Connectivity', 'Frequency Response', 'Impedance', 'Weight'],
  'monitors': ['Screen Size', 'Resolution', 'Panel Type', 'Refresh Rate', 'Response Time', 'Ports'],
  'printers': ['Type', 'Speed', 'Resolution', 'Connectivity', 'Duplex', 'Paper Capacity'],
  'networking': ['WiFi Standard', 'Speed', 'Bands', 'Ports', 'Antennas', 'Protocol'],
  'storage': ['Capacity', 'Interface', 'Read Speed', 'Write Speed', 'Form Factor'],
  'ups-power': ['Capacity', 'Type', 'Outlets', 'Battery Backup', 'Display', 'Connectivity'],
  'smart-home': ['Connectivity', 'Battery Life', 'App Support', 'Voice Assistant', 'Protocol'],
  'cctv-cameras': ['Resolution', 'Lens Size', 'Night Vision Range', 'IP Rating', 'Video Format', 'Frame Rate', 'Field of View', 'Power Supply', 'Audio'],
  'recording-devices': ['Channels', 'Max Resolution', 'HDD Capacity', 'Network Interface', 'Video Output', 'Remote Access'],
  'accessories': ['Material', 'Compatibility', 'Dimensions', 'Weight', 'Color'],
  'complete-kits': ['Number of Cameras', 'Resolution', 'DVR/NVR Included', 'HDD Included', 'Cable Length', 'Night Vision'],
};

const emptyProduct: Omit<Product, 'id'> = {
  name: '', description: '', price: 0, originalPrice: undefined,
  category: 'cctv-cameras', subcategory: '', brand: 'Hikvision',
  images: [], specifications: {}, features: [''],
  inStock: true, stockCount: 50, rating: 0, reviewCount: 0,
  isNew: true, isOnSale: false, discountPercentage: 0,
  tags: [], warranty: '1 Year', shippingInfo: 'Flat Rs.150 delivery charge',
};

const sampleOrders = [
  { id: 'NTX-10045823', customer: 'Raj Sharma', date: '2024-12-20', status: 'delivered', total: 449.98, items: 2 },
  { id: 'NTX-10045790', customer: 'Sita Karki', date: '2024-12-19', status: 'shipped', total: 599.99, items: 1 },
  { id: 'NTX-10045650', customer: 'Bishal Poudel', date: '2024-12-18', status: 'processing', total: 199.99, items: 1 },
  { id: 'NTX-10045601', customer: 'Anita Maharjan', date: '2024-12-17', status: 'pending', total: 329.98, items: 3 },
  { id: 'NTX-10045550', customer: 'Ram Thapa', date: '2024-12-16', status: 'delivered', total: 89.99, items: 1 },
  { id: 'NTX-10045499', customer: 'Gita Rai', date: '2024-12-15', status: 'cancelled', total: 149.99, items: 1 },
];

const sampleCustomers = [
  { id: '1', name: 'Raj Sharma', email: 'raj@example.com', orders: 5, spent: 1249.95, joined: '2024-01-15' },
  { id: '2', name: 'Sita Karki', email: 'sita@example.com', orders: 3, spent: 899.97, joined: '2024-03-20' },
  { id: '3', name: 'Bishal Poudel', email: 'bishal@example.com', orders: 8, spent: 2199.92, joined: '2023-11-10' },
  { id: '4', name: 'Anita Maharjan', email: 'anita@example.com', orders: 2, spent: 479.97, joined: '2024-06-05' },
  { id: '5', name: 'Ram Thapa', email: 'ram@example.com', orders: 12, spent: 3599.88, joined: '2023-08-22' },
];

const AdminDashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { products: productList, addProduct, updateProduct, deleteProduct } = useProducts();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Product form state
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(emptyProduct);
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!authState.isAuthenticated || !authState.user?.isAdmin) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
        <div className="bg-white shadow-sm p-8 max-w-md w-full text-center">
          <XCircleIcon className="h-14 w-14 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500 text-sm mb-5">You need admin privileges to access this page.</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-5 text-left">
            <p className="text-sm font-semibold text-yellow-800 mb-1">Admin Login Credentials:</p>
            <p className="text-sm text-yellow-700">Email: <strong>admin@neptronix.com</strong></p>
            <p className="text-sm text-yellow-700">Password: <strong>any password works</strong></p>
          </div>
          <Link to="/login" className="block w-full bg-[#2874f0] text-white py-3 rounded font-bold hover:bg-[#1a65de]">
            Sign In as Admin
          </Link>
        </div>
      </div>
    );
  }

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setFormData({ ...emptyProduct });
    setFormErrors({});
    setShowProductForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    const { id, ...rest } = product;
    setFormData({ ...rest, features: rest.features.length > 0 ? rest.features : [''] });
    setFormErrors({});
    setShowProductForm(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (formData.price <= 0) errors.price = 'Price must be greater than 0';
    if (!formData.brand) errors.brand = 'Brand is required';
    if (!formData.category) errors.category = 'Category is required';
    if (formData.stockCount < 0) errors.stockCount = 'Stock cannot be negative';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProduct = () => {
    if (!validateForm()) return;

    const cleanFeatures = formData.features.filter(f => f.trim() !== '');

    if (editingProduct) {
      updateProduct(editingProduct.id, { ...formData, features: cleanFeatures });
      showSuccess(`"${formData.name}" updated successfully!`);
    } else {
      addProduct({ ...formData, features: cleanFeatures });
      showSuccess(`"${formData.name}" added successfully!`);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    const product = productList.find(p => p.id === id);
    deleteProduct(id);
    setDeleteConfirm(null);
    showSuccess(`"${product?.name}" deleted successfully!`);
  };

  const addSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData(prev => ({ ...prev, specifications: { ...prev.specifications, [specKey.trim()]: specValue.trim() } }));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpec = (key: string) => {
    setFormData(prev => {
      const specs = { ...prev.specifications };
      delete specs[key];
      return { ...prev, specifications: specs };
    });
  };

  const addSpecTemplate = () => {
    const templateKeys = CAMERA_SPEC_TEMPLATES[formData.category] || [];
    const newSpecs = { ...formData.specifications };
    templateKeys.forEach(key => {
      if (!newSpecs[key]) newSpecs[key] = '';
    });
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => {
      const features = [...prev.features];
      features[index] = value;
      return { ...prev, features };
    });
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const filteredProducts = productList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
    pending: { color: 'text-yellow-600 bg-yellow-100', icon: ClockIcon },
    processing: { color: 'text-blue-600 bg-blue-100', icon: CubeIcon },
    shipped: { color: 'text-purple-600 bg-purple-100', icon: TruckIcon },
    delivered: { color: 'text-green-600 bg-green-100', icon: CheckCircleIcon },
    cancelled: { color: 'text-red-600 bg-red-100', icon: XCircleIcon },
  };

  const tabs: { key: AdminTab; label: string; icon: React.ElementType }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { key: 'products', label: 'Products', icon: CubeIcon },
    { key: 'orders', label: 'Orders', icon: ShoppingBagIcon },
    { key: 'customers', label: 'Customers', icon: UsersIcon },
  ];

  const stats = [
    { label: 'Total Revenue', value: 'Rs.24,589.00', change: '+12.5%', up: true, icon: CurrencyDollarIcon, color: 'bg-green-100 text-green-600' },
    { label: 'Total Orders', value: '156', change: '+8.2%', up: true, icon: ShoppingBagIcon, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Products', value: String(productList.length), change: '+3', up: true, icon: CubeIcon, color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Customers', value: '89', change: '+15.3%', up: true, icon: UsersIcon, color: 'bg-orange-100 text-orange-600' },
  ];

  const currentSubcategories = CATEGORIES.find(c => c.value === formData.category)?.subcategories || [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-pulse">
          <CheckCircleIcon className="h-5 w-5 mr-2" />
          {successMsg}
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 min-h-screen fixed left-0 top-0 pt-4 hidden lg:block z-20">
          <div className="px-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="text-white font-bold text-sm">Neptronix</span>
                <span className="text-gray-400 text-xs block">Admin Panel</span>
              </div>
            </div>
          </div>
          <nav className="px-3 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.key ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.label}
                {tab.key === 'products' && (
                  <span className="ml-auto bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">{productList.length}</span>
                )}
              </button>
            ))}
            <div className="border-t border-gray-700 mt-4 pt-4">
              <Link to="/" className="flex items-center px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg">
                ← Back to Store
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Top Bar */}
          <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center space-x-2 lg:hidden overflow-x-auto">
              {tabs.map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`text-sm font-medium px-3 py-1 rounded whitespace-nowrap ${activeTab === tab.key ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden lg:block capitalize">{activeTab}</h1>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden sm:inline">Welcome, Admin</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* ===== DASHBOARD TAB ===== */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg ${stat.color}`}><stat.icon className="h-6 w-6" /></div>
                        <span className={`flex items-center text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.up ? <ArrowTrendingUpIcon className="h-4 w-4 mr-1" /> : <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />}
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    <button onClick={() => setActiveTab('orders')} className="text-blue-600 text-sm hover:underline">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          {['Order ID', 'Customer', 'Date', 'Status', 'Total'].map(h => (
                            <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {sampleOrders.slice(0, 5).map(order => {
                          const config = statusConfig[order.status];
                          return (
                            <tr key={order.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${config.color}`}>
                                  <config.icon className="h-3 w-3 mr-1" />{order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">Rs.{order.total.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ===== PRODUCTS TAB ===== */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">Product Management ({filteredProducts.length})</h2>
                  <button onClick={openAddForm}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700 font-medium flex items-center shadow-sm">
                    <PlusIcon className="h-5 w-5 mr-2" /> Add New Product
                  </button>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search products by name or brand..." value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                  </div>
                  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
                    <option value="all">All Categories</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Product', 'Category', 'Brand', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredProducts.length === 0 ? (
                        <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-500">No products found. Click "Add New Product" to get started.</td></tr>
                      ) : (
                        filteredProducts.map(product => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                  <PhotoIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="ml-3 max-w-[200px]">
                                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                  <p className="text-xs text-gray-500">ID: {product.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 capitalize">{product.category.replace(/-/g, ' ')}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{product.brand}</td>
                            <td className="px-4 py-3">
                              <span className="text-sm font-medium text-gray-900">Rs.{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through ml-1">Rs.{product.originalPrice}</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-sm font-medium ${product.stockCount > 20 ? 'text-green-600' : product.stockCount > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {product.stockCount}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {product.isNew && <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-medium">NEW</span>}
                                {product.isOnSale && <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded font-medium">SALE</span>}
                                {!product.inStock && <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-medium">OUT</span>}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-1">
                                <button onClick={() => setViewProduct(product)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="View">
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                <button onClick={() => openEditForm(product)} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded" title="Edit">
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button onClick={() => setDeleteConfirm(product.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                                  <TrashIcon className="h-4 w-4" />
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
            )}

            {/* ===== ORDERS TAB ===== */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Order Management</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Order ID', 'Customer', 'Date', 'Items', 'Status', 'Total'].map(h => (
                          <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sampleOrders.map(order => {
                        const config = statusConfig[order.status];
                        return (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${config.color}`}>
                                <config.icon className="h-3 w-3 mr-1" />{order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Rs.{order.total.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===== CUSTOMERS TAB ===== */}
            {activeTab === 'customers' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Customer Management</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Customer', 'Email', 'Orders', 'Total Spent', 'Joined'].map(h => (
                          <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sampleCustomers.map(customer => (
                        <tr key={customer.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-blue-600">{customer.name[0]}</span>
                              </div>
                              <span className="ml-3 text-sm font-medium text-gray-900">{customer.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{customer.orders}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Rs.{customer.spent.toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{customer.joined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== ADD / EDIT PRODUCT MODAL ===== */}
      {showProductForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 my-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white rounded-t-xl z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowProductForm(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                    <input type="text" value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Hikvision 4MP Dome Camera DS-2CD2143G2-I"
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.name ? 'border-red-300' : 'border-gray-300'}`} />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea value={formData.description} rows={3}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed product description..."
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.description ? 'border-red-300' : 'border-gray-300'}`} />
                    {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value, subcategory: '' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                      {CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                    <select value={formData.subcategory}
                      onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                      <option value="">Select subcategory</option>
                      {currentSubcategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                    <select value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${formErrors.brand ? 'border-red-300' : 'border-gray-300'}`}>
                      {BRANDS.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label>
                    <select value={formData.warranty || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                      <option value="6 Months">6 Months</option>
                      <option value="1 Year">1 Year</option>
                      <option value="2 Years">2 Years</option>
                      <option value="3 Years">3 Years</option>
                      <option value="5 Years">5 Years</option>
                      <option value="Lifetime">Lifetime</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Pricing & Inventory</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.) *</label>
                    <input type="number" step="0.01" value={formData.price || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${formErrors.price ? 'border-red-300' : 'border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (Rs.)</label>
                    <input type="number" step="0.01" value={formData.originalPrice || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || undefined }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Count</label>
                    <input type="number" value={formData.stockCount}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        setFormData(prev => ({ ...prev, stockCount: count, inStock: count > 0 }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                    <input type="number" value={formData.discountPercentage || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, discountPercentage: parseInt(e.target.value) || 0, isOnSale: parseInt(e.target.value) > 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="flex items-center space-x-6 mt-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isNew || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Mark as New</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isOnSale || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, isOnSale: e.target.checked }))}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">On Sale</span>
                  </label>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Specifications</h3>
                  <button onClick={addSpecTemplate}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 border border-blue-200 rounded hover:bg-blue-50">
                    + Auto-fill Template
                  </button>
                </div>
                {Object.entries(formData.specifications).length > 0 && (
                  <div className="space-y-2 mb-3">
                    {Object.entries(formData.specifications).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 w-40 truncate">{key}:</span>
                        <input type="text" value={val}
                          onChange={(e) => setFormData(prev => ({ ...prev, specifications: { ...prev.specifications, [key]: e.target.value } }))}
                          className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500" />
                        <button onClick={() => removeSpec(key)} className="text-red-400 hover:text-red-600 p-1">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input type="text" value={specKey} onChange={(e) => setSpecKey(e.target.value)}
                    placeholder="Spec name (e.g. Resolution)" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  <input type="text" value={specValue} onChange={(e) => setSpecValue(e.target.value)}
                    placeholder="Value (e.g. 4MP)" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && addSpec()} />
                  <button onClick={addSpec} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 font-medium">Add</button>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Key Features</h3>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Feature ${index + 1} (e.g. Built-in IR LEDs for 30m night vision)`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                      {formData.features.length > 1 && (
                        <button onClick={() => removeFeature(index)} className="text-red-400 hover:text-red-600 p-1">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={addFeature} className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">+ Add Feature</button>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Tags</h3>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full">
                        <TagIcon className="h-3 w-3 mr-1" />{tag}
                        <button onClick={() => removeTag(tag)} className="ml-1 hover:text-blue-900"><XMarkIcon className="h-3 w-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag (e.g. 4k, outdoor, night-vision)" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                  <button onClick={addTag} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 font-medium">Add</button>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Product Images ({formData.images.length}/5)</h3>

                {/* Uploaded Previews */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-5 gap-3 mb-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-blue-200 bg-gray-100">
                        <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                        {index === 0 && (
                          <span className="absolute top-1 left-1 bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">MAIN</span>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          {index > 0 && (
                            <button onClick={() => setFormData(prev => {
                              const imgs = [...prev.images];
                              [imgs[index - 1], imgs[index]] = [imgs[index], imgs[index - 1]];
                              return { ...prev, images: imgs };
                            })} className="bg-white text-gray-700 rounded-full p-1.5 text-xs hover:bg-gray-100 shadow" title="Move left">
                              ←
                            </button>
                          )}
                          <button onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))}
                            className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow" title="Remove">
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                          {index < formData.images.length - 1 && (
                            <button onClick={() => setFormData(prev => {
                              const imgs = [...prev.images];
                              [imgs[index], imgs[index + 1]] = [imgs[index + 1], imgs[index]];
                              return { ...prev, images: imgs };
                            })} className="bg-white text-gray-700 rounded-full p-1.5 text-xs hover:bg-gray-100 shadow" title="Move right">
                              →
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Drop Zone */}
                {formData.images.length < 5 && (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer relative"
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.add('border-blue-500', 'bg-blue-50'); }}
                    onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50'); }}
                    onDrop={(e) => {
                      e.preventDefault(); e.stopPropagation();
                      e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
                      const slots = 5 - formData.images.length;
                      files.slice(0, slots).forEach(file => {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (ev.target?.result) {
                            setFormData(prev => prev.images.length < 5 ? { ...prev, images: [...prev.images, ev.target!.result as string] } : prev);
                          }
                        };
                        reader.readAsDataURL(file);
                      });
                    }}
                    onPaste={(e) => {
                      const items = Array.from(e.clipboardData.items);
                      const imageItem = items.find(item => item.type.startsWith('image/'));
                      if (imageItem) {
                        const file = imageItem.getAsFile();
                        if (file && formData.images.length < 5) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            if (ev.target?.result) {
                              setFormData(prev => prev.images.length < 5 ? { ...prev, images: [...prev.images, ev.target!.result as string] } : prev);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }
                    }}
                    onClick={() => document.getElementById('product-image-input')?.click()}
                    tabIndex={0}
                  >
                    <input
                      id="product-image-input"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
                        const slots = 5 - formData.images.length;
                        files.slice(0, slots).forEach(file => {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            if (ev.target?.result) {
                              setFormData(prev => prev.images.length < 5 ? { ...prev, images: [...prev.images, ev.target!.result as string] } : prev);
                            }
                          };
                          reader.readAsDataURL(file);
                        });
                        e.target.value = '';
                      }}
                    />
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <PhotoIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Drop images here, click to browse, or paste</p>
                      <p className="text-xs text-gray-400 mt-1">{5 - formData.images.length} slot{5 - formData.images.length !== 1 ? 's' : ''} remaining · PNG, JPG, WEBP</p>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-2">Drag to reorder. First image is the main product image. Hover to move or remove.</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50 rounded-b-xl">
              <button onClick={() => setShowProductForm(false)} className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={handleSaveProduct}
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== VIEW PRODUCT MODAL ===== */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-8">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">Product Details</h2>
              <button onClick={() => setViewProduct(null)} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PhotoIcon className="h-10 w-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{viewProduct.name}</h3>
                  <p className="text-sm text-gray-500">{viewProduct.brand} · {viewProduct.category.replace(/-/g, ' ')}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold text-gray-900">Rs.{viewProduct.price}</span>
                    {viewProduct.originalPrice && <span className="text-sm text-gray-400 line-through">Rs.{viewProduct.originalPrice}</span>}
                    {viewProduct.isOnSale && <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded font-medium">-{viewProduct.discountPercentage}%</span>}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{viewProduct.description}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded p-3 text-center">
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className={`font-bold ${viewProduct.stockCount > 0 ? 'text-green-600' : 'text-red-600'}`}>{viewProduct.stockCount}</p>
                </div>
                <div className="bg-gray-50 rounded p-3 text-center">
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="font-bold text-yellow-600">{viewProduct.rating} ★</p>
                </div>
                <div className="bg-gray-50 rounded p-3 text-center">
                  <p className="text-sm text-gray-500">Reviews</p>
                  <p className="font-bold text-gray-900">{viewProduct.reviewCount}</p>
                </div>
              </div>
              {Object.keys(viewProduct.specifications).length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Specifications</h4>
                  <div className="bg-gray-50 rounded-lg divide-y">
                    {Object.entries(viewProduct.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between px-4 py-2 text-sm">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium text-gray-900">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {viewProduct.features.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Features</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {viewProduct.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}
              {viewProduct.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {viewProduct.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <button onClick={() => { openEditForm(viewProduct); setViewProduct(null); }}
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                Edit Product
              </button>
              <button onClick={() => setViewProduct(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRM MODAL ===== */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrashIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>{productList.find(p => p.id === deleteConfirm)?.name}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => handleDeleteProduct(deleteConfirm)}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
