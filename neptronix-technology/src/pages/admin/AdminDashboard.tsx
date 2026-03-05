import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChartBarIcon, ShoppingBagIcon, UsersIcon, CubeIcon,
  CurrencyDollarIcon, ArrowTrendingUpIcon, PencilIcon,
  TrashIcon, PlusIcon, EyeIcon, ClockIcon, CheckCircleIcon,
  TruckIcon, XCircleIcon, XMarkIcon, MagnifyingGlassIcon,
  PhotoIcon, FolderIcon, BuildingStorefrontIcon, Bars3Icon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { ordersAPI, usersAPI } from '../../services/api';
import type { Product } from '../../types';

type AdminTab = 'dashboard' | 'products' | 'categories' | 'brands' | 'orders' | 'users';
interface Category { value: string; label: string; subcategories: string[]; }
interface ApiOrder { _id?: string; id?: string; createdAt?: string; status?: string; total?: number; items?: { name?: string; quantity?: number; price?: number }[]; shipping?: { firstName?: string; lastName?: string; email?: string }; }
interface ApiUser { _id?: string; id?: string; firstName?: string; lastName?: string; email?: string; phone?: string; isAdmin?: boolean; createdAt?: string; }

const CATS_KEY = 'admin_categories';
const BRANDS_KEY = 'admin_brands';

const DEFAULT_CATEGORIES: Category[] = [
  { value: 'cctv-cameras', label: 'CCTV Cameras', subcategories: ['Dome Cameras', 'Bullet Cameras', 'PTZ Cameras', 'Wireless Cameras', 'Doorbell Cameras'] },
  { value: 'recording-devices', label: 'DVR / NVR', subcategories: ['4 Channel DVR', '8 Channel DVR', '16 Channel NVR', 'Hybrid Recorders'] },
  { value: 'complete-kits', label: 'Complete Kits', subcategories: ['CCTV Kits', 'Office Kits', 'Home Kits', '4 Camera Kit', '8 Camera Kit'] },
  { value: 'networking', label: 'Networking', subcategories: ['Routers', 'Switches', 'WiFi Extenders', 'PoE Switches', 'Network Cables'] },
  { value: 'storage', label: 'Storage', subcategories: ['Hard Drives', 'SSDs', 'Memory Cards', 'Pen Drives', 'NAS Devices'] },
  { value: 'ups-power', label: 'UPS / Power', subcategories: ['UPS Systems', 'Voltage Stabilizers', 'Inverters', 'Power Banks'] },
  { value: 'smart-home', label: 'Smart Home', subcategories: ['Smart Lights', 'Smart Locks', 'Smart Plugs', 'Motion Sensors', 'Smart Doorbells'] },
  { value: 'accessories', label: 'Accessories', subcategories: ['Cables & Connectors', 'Power Supplies', 'Mounts & Brackets', 'Security Lights', 'Storage Devices'] },
  { value: 'laptops', label: 'Laptops', subcategories: ['Business Laptops', 'Gaming Laptops', 'Ultrabooks', '2-in-1 Laptops'] },
  { value: 'mobile-phones', label: 'Mobile Phones', subcategories: ['Android Phones', 'iPhones', 'Feature Phones', '5G Phones'] },
  { value: 'televisions', label: 'Televisions', subcategories: ['Smart TVs', 'LED TVs', 'OLED TVs', 'QLED TVs', '4K TVs'] },
  { value: 'audio', label: 'Audio', subcategories: ['Headphones & Earbuds', 'Bluetooth Speakers', 'Home Theatre', 'Soundbars', 'Microphones'] },
  { value: 'monitors', label: 'Monitors', subcategories: ['Office Monitors', 'Gaming Monitors', '4K Monitors', 'Curved Monitors'] },
  { value: 'printers', label: 'Printers', subcategories: ['Inkjet Printers', 'Laser Printers', 'Multifunction Printers', 'Photo Printers'] },
];

const DEFAULT_BRANDS = [
  'Hikvision','Dahua','CP Plus','Bosch','Honeywell','Axis Communications',
  'Reolink','Imou','Ezviz','Ring','Arlo','Eufy','TP-Link','Netgear',
  'D-Link','APC','Eaton','Apple','Samsung','Dell','HP','Lenovo','Asus',
  'Acer','Sony','LG','JBL','Bose','Zebronics','Neptronix','Other',
];

const SPEC_TEMPLATES: Record<string, string[]> = {
  'cctv-cameras': ['Resolution','Lens Size','Night Vision Range','IP Rating','Video Format','Frame Rate','Field of View','Power Supply','Audio'],
  'recording-devices': ['Channels','Max Resolution','HDD Capacity','Network Interface','Video Output','Remote Access'],
  'networking': ['WiFi Standard','Speed','Bands','Ports','Antennas'],
  'storage': ['Capacity','Interface','Read Speed','Write Speed','Form Factor'],
  'ups-power': ['Capacity','Type','Outlets','Battery Backup','Display'],
  'laptops': ['Processor','RAM','Storage','Display','GPU','Battery','OS','Weight'],
  'mobile-phones': ['Display','Processor','RAM','Storage','Camera','Battery','OS'],
  'televisions': ['Screen Size','Resolution','Panel Type','HDR','Refresh Rate','OS','Ports'],
  'accessories': ['Material','Compatibility','Dimensions','Weight','Color'],
};

const STATUS_CFG: Record<string, { color: string; icon: React.ElementType }> = {
  pending:    { color: 'text-yellow-600 bg-yellow-100', icon: ClockIcon },
  confirmed:  { color: 'text-blue-600 bg-blue-100',    icon: CheckCircleIcon },
  processing: { color: 'text-indigo-600 bg-indigo-100', icon: CubeIcon },
  shipped:    { color: 'text-purple-600 bg-purple-100', icon: TruckIcon },
  delivered:  { color: 'text-green-600 bg-green-100',  icon: CheckCircleIcon },
  cancelled:  { color: 'text-red-600 bg-red-100',      icon: XCircleIcon },
};

const emptyProduct: Omit<Product, 'id'> = {
  name: '', description: '', price: 0, originalPrice: undefined,
  category: 'cctv-cameras', subcategory: '', brand: 'Hikvision',
  images: [], specifications: {}, features: [''],
  inStock: true, stockCount: 50, rating: 0, reviewCount: 0,
  isNew: true, isOnSale: false, discountPercentage: 0,
  tags: [], warranty: '1 Year', shippingInfo: 'Flat Rs.150 delivery charge',
};

const loadLS = <T,>(key: string, def: T): T => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
};

const ConfirmModal: React.FC<{ msg: string; onYes: () => void; onNo: () => void }> = ({ msg, onYes, onNo }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4">
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
      <p className="text-gray-800 font-medium mb-5">{msg}</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onNo} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
        <button onClick={onYes} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700">Delete</button>
      </div>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { products: productList, addProduct, updateProduct, deleteProduct } = useProducts();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);

  const [productSearch, setProductSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(emptyProduct);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  const [categories, setCategories] = useState<Category[]>(() => loadLS(CATS_KEY, DEFAULT_CATEGORIES));
  const [showCatForm, setShowCatForm] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [catForm, setCatForm] = useState({ value: '', label: '' });
  const [catSubInput, setCatSubInput] = useState('');
  const [catSubs, setCatSubs] = useState<string[]>([]);
  const [deleteCatVal, setDeleteCatVal] = useState<string | null>(null);

  const [brands, setBrands] = useState<string[]>(() => loadLS(BRANDS_KEY, DEFAULT_BRANDS));
  const [brandInput, setBrandInput] = useState('');
  const [editingBrand, setEditingBrand] = useState<{ old: string; val: string } | null>(null);
  const [deleteBrand, setDeleteBrand] = useState<string | null>(null);
  const [brandSearch, setBrandSearch] = useState('');

  const [orderSearch, setOrderSearch] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const [userSearch, setUserSearch] = useState('');
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const showSuccess = (msg: string) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(''), 3000); };

  useEffect(() => { localStorage.setItem(CATS_KEY, JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem(BRANDS_KEY, JSON.stringify(brands)); }, [brands]);

  useEffect(() => {
    if (activeTab === 'orders' || activeTab === 'dashboard') {
      setOrdersLoading(true);
      ordersAPI.getAll()
        .then((d: any) => setOrders(Array.isArray(d) ? d : (d?.orders ?? [])))
        .catch(() => {})
        .finally(() => setOrdersLoading(false));
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'users') {
      setUsersLoading(true);
      usersAPI.getAll()
        .then((d: any) => setUsers(Array.isArray(d) ? d : (d?.users ?? [])))
        .catch(() => {})
        .finally(() => setUsersLoading(false));
    }
  }, [activeTab]);

  if (!authState.isAuthenticated || !authState.user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white shadow p-8 max-w-md w-full text-center rounded-xl">
          <XCircleIcon className="h-14 w-14 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500 text-sm mb-5">You need admin privileges to access this page.</p>
          <Link to="/login" className="block w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Sign In as Admin</Link>
        </div>
      </div>
    );
  }

  // Product handlers
  const openAddForm = () => { setEditingProduct(null); setFormData({ ...emptyProduct }); setFormErrors({}); setShowProductForm(true); };
  const openEditForm = (p: Product) => { setEditingProduct(p); const { id, ...rest } = p; setFormData({ ...rest, features: rest.features.length > 0 ? rest.features : [''] }); setFormErrors({}); setShowProductForm(true); };
  const validateForm = () => { const e: Record<string, string> = {}; if (!formData.name.trim()) e.name = 'Required'; if (!formData.description.trim()) e.description = 'Required'; if (formData.price <= 0) e.price = 'Must be > 0'; setFormErrors(e); return Object.keys(e).length === 0; };
  const handleSaveProduct = () => { if (!validateForm()) return; const clean = { ...formData, features: formData.features.filter(f => f.trim()) }; if (editingProduct) { updateProduct(editingProduct.id, clean); showSuccess(`"${clean.name}" updated`); } else { addProduct(clean); showSuccess(`"${clean.name}" added`); } setShowProductForm(false); };
  const confirmDeleteProduct = () => { if (!deleteProductId) return; const p = productList.find(x => x.id === deleteProductId); deleteProduct(deleteProductId); setDeleteProductId(null); showSuccess(`"${p?.name}" deleted`); };

  // Category handlers
  const openAddCat = () => { setEditingCat(null); setCatForm({ value: '', label: '' }); setCatSubs([]); setCatSubInput(''); setShowCatForm(true); };
  const openEditCat = (c: Category) => { setEditingCat(c); setCatForm({ value: c.value, label: c.label }); setCatSubs([...c.subcategories]); setCatSubInput(''); setShowCatForm(true); };
  const saveCat = () => { if (!catForm.label.trim()) return; const val = catForm.value.trim() || catForm.label.trim().toLowerCase().replace(/\s+/g, '-'); if (editingCat) { setCategories(prev => prev.map(c => c.value === editingCat.value ? { value: val, label: catForm.label.trim(), subcategories: catSubs } : c)); showSuccess(`Category updated`); } else { setCategories(prev => [...prev, { value: val, label: catForm.label.trim(), subcategories: catSubs }]); showSuccess(`Category added`); } setShowCatForm(false); };
  const confirmDeleteCat = () => { if (!deleteCatVal) return; setCategories(prev => prev.filter(c => c.value !== deleteCatVal)); setDeleteCatVal(null); showSuccess('Category deleted'); };

  // Brand handlers
  const addBrand = () => { const b = brandInput.trim(); if (!b || brands.includes(b)) return; setBrands(prev => [...prev, b]); setBrandInput(''); showSuccess(`Brand "${b}" added`); };
  const saveEditBrand = () => { if (!editingBrand || !editingBrand.val.trim()) return; setBrands(prev => prev.map(b => b === editingBrand.old ? editingBrand.val.trim() : b)); setEditingBrand(null); showSuccess('Brand updated'); };
  const confirmDeleteBrand = () => { if (!deleteBrand) return; setBrands(prev => prev.filter(b => b !== deleteBrand)); setDeleteBrand(null); showSuccess(`Brand deleted`); };

  // Order handler
  const updateOrderStatus = async (id: string, status: string) => {
    setUpdatingOrderId(id);
    try { await ordersAPI.updateStatus(id, status); setOrders(prev => prev.map(o => (o._id ?? o.id) === id ? { ...o, status } : o)); showSuccess('Order status updated'); }
    catch { showSuccess('Failed to update status'); }
    finally { setUpdatingOrderId(null); }
  };

  // User handler
  const confirmDeleteUser = async () => {
    if (!deleteUserId) return;
    try { await usersAPI.delete(deleteUserId); setUsers(prev => prev.filter(u => (u._id ?? u.id) !== deleteUserId)); showSuccess('User deleted'); }
    catch { showSuccess('Failed to delete user'); }
    finally { setDeleteUserId(null); }
  };

  const filteredProducts = productList.filter(p => (catFilter === 'all' || p.category === catFilter) && (p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.brand.toLowerCase().includes(productSearch.toLowerCase())));
  const filteredOrders = orders.filter(o => { const name = `${o.shipping?.firstName ?? ''} ${o.shipping?.lastName ?? ''}`.toLowerCase(); return name.includes(orderSearch.toLowerCase()) || (o._id ?? o.id ?? '').includes(orderSearch); });
  const filteredUsers = users.filter(u => `${u.firstName ?? ''} ${u.lastName ?? ''} ${u.email ?? ''}`.toLowerCase().includes(userSearch.toLowerCase()));
  const filteredBrands = brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));
  const currentSubcategories = categories.find(c => c.value === formData.category)?.subcategories ?? [];
  const totalRevenue = orders.reduce((s, o) => s + (o.total ?? 0), 0);

  const TABS: { key: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { key: 'dashboard',  label: 'Dashboard',  icon: ChartBarIcon },
    { key: 'products',   label: 'Products',   icon: CubeIcon, badge: productList.length },
    { key: 'categories', label: 'Categories', icon: FolderIcon, badge: categories.length },
    { key: 'brands',     label: 'Brands',     icon: BuildingStorefrontIcon, badge: brands.length },
    { key: 'orders',     label: 'Orders',     icon: ShoppingBagIcon, badge: orders.length },
    { key: 'users',      label: 'Users',      icon: UsersIcon },
  ];

  const NavItems = () => (
    <>
      {TABS.map(tab => (
        <button key={tab.key} onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
          className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
          <tab.icon className="h-5 w-5 mr-3 shrink-0" />
          <span className="flex-1 text-left">{tab.label}</span>
          {tab.badge !== undefined && <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>{tab.badge}</span>}
        </button>
      ))}
      <div className="border-t border-gray-800 mt-3 pt-3">
        <Link to="/" className="flex items-center px-3 py-2.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg">← Back to Store</Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-60 bg-gray-900 fixed inset-y-0 left-0 z-30">
        <div className="px-5 py-5 flex items-center gap-3 border-b border-gray-800">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-lg">N</div>
          <div><p className="text-white font-bold text-sm">Neptronix</p><p className="text-gray-400 text-xs">Admin Panel</p></div>
        </div>
        <nav className="px-3 py-4 space-y-0.5 flex-1 overflow-y-auto"><NavItems /></nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-60 bg-gray-900 h-full">
            <div className="px-5 py-5 flex items-center gap-3 border-b border-gray-800">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-lg">N</div>
              <div><p className="text-white font-bold text-sm">Neptronix</p><p className="text-gray-400 text-xs">Admin Panel</p></div>
            </div>
            <nav className="px-3 py-4 space-y-0.5 flex-1 overflow-y-auto"><NavItems /></nav>
          </aside>
        </div>
      )}

      {/* Toast */}
      {successMsg && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium animate-bounce">
          <CheckCircleIcon className="h-5 w-5" />{successMsg}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-800"><Bars3Icon className="h-6 w-6" /></button>
            <h1 className="font-bold text-gray-900 text-lg capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:inline">{authState.user?.firstName} {authState.user?.lastName}</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{(authState.user?.firstName?.[0] ?? 'A').toUpperCase()}</div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Revenue', value: `Rs.${totalRevenue.toLocaleString()}`, icon: CurrencyDollarIcon, color: 'bg-green-100 text-green-600' },
                  { label: 'Total Orders',  value: String(orders.length), icon: ShoppingBagIcon, color: 'bg-blue-100 text-blue-600' },
                  { label: 'Products',      value: String(productList.length), icon: CubeIcon, color: 'bg-purple-100 text-purple-600' },
                  { label: 'Categories',    value: String(categories.length), icon: FolderIcon, color: 'bg-orange-100 text-orange-600' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${s.color}`}><s.icon className="h-6 w-6" /></div>
                    <div><p className="text-2xl font-bold text-gray-900">{s.value}</p><p className="text-xs text-gray-500 mt-0.5">{s.label}</p></div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">Recent Orders</h2>
                  <button onClick={() => setActiveTab('orders')} className="text-blue-600 text-sm hover:underline">View All</button>
                </div>
                {ordersLoading ? <div className="py-12 text-center text-gray-400 text-sm">Loading...</div> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>{['Order ID','Customer','Date','Status','Total'].map(h => <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>)}</tr></thead>
                      <tbody className="divide-y divide-gray-100">
                        {orders.slice(0, 6).map(o => { const id = o._id ?? o.id ?? ''; const cfg = STATUS_CFG[o.status ?? ''] ?? STATUS_CFG.pending; return (
                          <tr key={id} className="hover:bg-gray-50">
                            <td className="px-5 py-3 font-mono text-xs text-gray-700">{id.slice(-8).toUpperCase()}</td>
                            <td className="px-5 py-3 text-gray-700">{o.shipping?.firstName} {o.shipping?.lastName}</td>
                            <td className="px-5 py-3 text-gray-500 text-xs">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '—'}</td>
                            <td className="px-5 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${cfg.color}`}><cfg.icon className="h-3 w-3" />{o.status}</span></td>
                            <td className="px-5 py-3 font-semibold text-gray-900">Rs.{(o.total ?? 0).toLocaleString()}</td>
                          </tr>
                        ); })}
                        {orders.length === 0 && <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400">No orders yet</td></tr>}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {([['categories','Categories',FolderIcon,'bg-teal-100 text-teal-600',categories.length],['brands','Brands',BuildingStorefrontIcon,'bg-pink-100 text-pink-600',brands.length],['products','Products',CubeIcon,'bg-violet-100 text-violet-600',productList.length]] as const).map(([tab, label, Icon, color, count]) => (
                  <button key={tab} onClick={() => setActiveTab(tab as AdminTab)} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow text-left">
                    <div className={`p-3 rounded-xl ${color}`}><Icon className="h-6 w-6" /></div>
                    <div><p className="text-xl font-bold text-gray-900">{count}</p><p className="text-xs text-gray-500">{label}</p></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-sm text-gray-500">{filteredProducts.length} products</p>
                <button onClick={openAddForm} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center gap-2"><PlusIcon className="h-4 w-4" /> Add Product</button>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-3 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1"><MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /><input value={productSearch} onChange={e => setProductSearch(e.target.value)} placeholder="Search by name or brand..." className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="all">All Categories</option>
                  {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>{['Product','Category','Brand','Price','Stock','Flags','Actions'].map(h => <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.length === 0 ? <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400">No products found</td></tr>
                    : filteredProducts.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3"><div className="flex items-center gap-3">{p.images[0] ? <img src={p.images[0]} alt="" className="w-9 h-9 rounded object-contain bg-gray-100" /> : <div className="w-9 h-9 bg-gray-100 rounded flex items-center justify-center"><PhotoIcon className="h-5 w-5 text-gray-400" /></div>}<div className="max-w-[180px]"><p className="font-medium text-gray-900 truncate">{p.name}</p><p className="text-xs text-gray-400">#{p.id}</p></div></div></td>
                        <td className="px-4 py-3 text-gray-600 capitalize">{p.category.replace(/-/g,' ')}</td>
                        <td className="px-4 py-3 text-gray-600">{p.brand}</td>
                        <td className="px-4 py-3"><span className="font-medium text-gray-900">Rs.{p.price.toLocaleString()}</span>{p.originalPrice && <span className="text-xs text-gray-400 line-through ml-1">Rs.{p.originalPrice.toLocaleString()}</span>}</td>
                        <td className="px-4 py-3"><span className={`font-medium ${p.stockCount > 20 ? 'text-green-600' : p.stockCount > 0 ? 'text-yellow-600' : 'text-red-600'}`}>{p.stockCount}</span></td>
                        <td className="px-4 py-3"><div className="flex gap-1 flex-wrap">{p.isNew && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold">NEW</span>}{p.isOnSale && <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded font-bold">SALE</span>}{!p.inStock && <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded font-bold">OUT</span>}</div></td>
                        <td className="px-4 py-3"><div className="flex gap-1"><button onClick={() => setViewProduct(p)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View"><EyeIcon className="h-4 w-4" /></button><button onClick={() => openEditForm(p)} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Edit"><PencilIcon className="h-4 w-4" /></button><button onClick={() => setDeleteProductId(p.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><TrashIcon className="h-4 w-4" /></button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{categories.length} categories</p>
                <button onClick={openAddCat} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center gap-2"><PlusIcon className="h-4 w-4" /> Add Category</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {categories.map(c => (
                  <div key={c.value} className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div><p className="font-semibold text-gray-900">{c.label}</p><p className="text-xs text-gray-400 font-mono mt-0.5">{c.value}</p></div>
                      <div className="flex gap-1"><button onClick={() => openEditCat(c)} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"><PencilIcon className="h-4 w-4" /></button><button onClick={() => setDeleteCatVal(c.value)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><TrashIcon className="h-4 w-4" /></button></div>
                    </div>
                    <div className="flex flex-wrap gap-1">{c.subcategories.map(s => <span key={s} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{s}</span>)}</div>
                    <p className="text-xs text-gray-400 mt-2">{c.subcategories.length} subcategories</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BRANDS */}
          {activeTab === 'brands' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1"><MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /><input value={brandSearch} onChange={e => setBrandSearch(e.target.value)} placeholder="Search brands..." className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                <div className="flex gap-2">
                  <input value={brandInput} onChange={e => setBrandInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addBrand()} placeholder="New brand name..." className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <button onClick={addBrand} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center gap-1"><PlusIcon className="h-4 w-4" /> Add</button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr><th className="px-5 py-3 text-left font-medium">Brand</th><th className="px-5 py-3 text-left font-medium">Products</th><th className="px-5 py-3 text-left font-medium">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBrands.map(b => (
                      <tr key={b} className="hover:bg-gray-50">
                        <td className="px-5 py-3 font-medium text-gray-900">{editingBrand?.old === b ? <input value={editingBrand.val} onChange={e => setEditingBrand({ old: b, val: e.target.value })} onKeyDown={e => e.key === 'Enter' && saveEditBrand()} className="px-2 py-1 border border-blue-400 rounded text-sm focus:outline-none w-full max-w-xs" autoFocus /> : b}</td>
                        <td className="px-5 py-3 text-gray-500">{productList.filter(p => p.brand === b).length}</td>
                        <td className="px-5 py-3"><div className="flex gap-1">{editingBrand?.old === b ? (<><button onClick={saveEditBrand} className="px-3 py-1 bg-green-600 text-white text-xs rounded font-bold hover:bg-green-700">Save</button><button onClick={() => setEditingBrand(null)} className="px-3 py-1 border border-gray-200 text-xs rounded hover:bg-gray-50">Cancel</button></>) : (<><button onClick={() => setEditingBrand({ old: b, val: b })} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"><PencilIcon className="h-4 w-4" /></button><button onClick={() => setDeleteBrand(b)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><TrashIcon className="h-4 w-4" /></button></>)}</div></td>
                      </tr>
                    ))}
                    {filteredBrands.length === 0 && <tr><td colSpan={3} className="px-5 py-10 text-center text-gray-400">No brands found</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-3"><div className="relative"><MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /><input value={orderSearch} onChange={e => setOrderSearch(e.target.value)} placeholder="Search by customer name or order ID..." className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div></div>
              {ordersLoading ? <div className="bg-white rounded-xl shadow-sm py-16 text-center text-gray-400">Loading orders...</div> : (
                <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>{['Order ID','Customer','Date','Items','Status','Total','Update'].map(h => <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>)}</tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredOrders.length === 0 ? <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400">No orders found</td></tr>
                      : filteredOrders.map(o => { const id = o._id ?? o.id ?? ''; const cfg = STATUS_CFG[o.status ?? ''] ?? STATUS_CFG.pending; return (
                        <tr key={id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-xs text-gray-700">{id.slice(-8).toUpperCase()}</td>
                          <td className="px-4 py-3"><p className="font-medium text-gray-900">{o.shipping?.firstName} {o.shipping?.lastName}</p><p className="text-xs text-gray-400">{o.shipping?.email}</p></td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '—'}</td>
                          <td className="px-4 py-3 text-gray-600">{o.items?.length ?? 0}</td>
                          <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${cfg.color}`}><cfg.icon className="h-3 w-3" />{o.status}</span></td>
                          <td className="px-4 py-3 font-semibold text-gray-900">Rs.{(o.total ?? 0).toLocaleString()}</td>
                          <td className="px-4 py-3"><select value={o.status ?? ''} disabled={updatingOrderId === id} onChange={e => updateOrderStatus(id, e.target.value)} className="px-2 py-1 border border-gray-200 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50">{['pending','confirmed','processing','shipped','delivered','cancelled'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}</select></td>
                        </tr>
                      ); })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* USERS */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-3"><div className="relative"><MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /><input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Search users by name or email..." className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div></div>
              {usersLoading ? <div className="bg-white rounded-xl shadow-sm py-16 text-center text-gray-400">Loading users...</div> : (
                <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr>{['User','Email','Phone','Role','Joined','Actions'].map(h => <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>)}</tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">No users found</td></tr>
                      : filteredUsers.map(u => { const uid = u._id ?? u.id ?? ''; const initials = `${u.firstName?.[0]??''}${u.lastName?.[0]??''}`.toUpperCase()||'?'; return (
                        <tr key={uid} className="hover:bg-gray-50">
                          <td className="px-5 py-3"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${u.isAdmin ? 'bg-blue-600' : 'bg-gray-400'}`}>{initials}</div><span className="font-medium text-gray-900">{u.firstName} {u.lastName}</span></div></td>
                          <td className="px-5 py-3 text-gray-600">{u.email}</td>
                          <td className="px-5 py-3 text-gray-500">{u.phone || '—'}</td>
                          <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${u.isAdmin ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{u.isAdmin ? 'Admin' : 'Customer'}</span></td>
                          <td className="px-5 py-3 text-gray-500 text-xs">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                          <td className="px-5 py-3">{!u.isAdmin && <button onClick={() => setDeleteUserId(uid)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><TrashIcon className="h-4 w-4" /></button>}</td>
                        </tr>
                      ); })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* PRODUCT FORM MODAL */}
      {showProductForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-6 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-4">
            <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white rounded-t-xl z-10">
              <h2 className="text-lg font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowProductForm(false)} className="text-gray-400 hover:text-gray-600"><XMarkIcon className="h-6 w-6" /></button>
            </div>
            <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
              <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label><input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${formErrors.name ? 'border-red-400' : 'border-gray-300'}`} />{formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}</div>
                  <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><textarea value={formData.description} rows={3} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${formErrors.description ? 'border-red-400' : 'border-gray-300'}`} />{formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}</div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label><select value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value, subcategory: '' }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">{categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label><select value={formData.subcategory} onChange={e => setFormData(p => ({ ...p, subcategory: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"><option value="">— Select —</option>{currentSubcategories.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Brand</label><select value={formData.brand} onChange={e => setFormData(p => ({ ...p, brand: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">{brands.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label><select value={formData.warranty ?? '1 Year'} onChange={e => setFormData(p => ({ ...p, warranty: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">{['6 Months','1 Year','2 Years','3 Years','5 Years','Lifetime'].map(w => <option key={w} value={w}>{w}</option>)}</select></div>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Pricing & Inventory</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[{label:'Price (Rs.) *',key:'price'},{label:'Original Price',key:'originalPrice'},{label:'Stock Count',key:'stockCount'},{label:'Discount %',key:'discountPercentage'}].map(f => (
                    <div key={f.key}><label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label><input type="number" value={(formData as Record<string,any>)[f.key]||''} onChange={e => { const val=parseFloat(e.target.value)||0; if(f.key==='stockCount') setFormData(p=>({...p,stockCount:val,inStock:val>0})); else if(f.key==='discountPercentage') setFormData(p=>({...p,discountPercentage:val,isOnSale:val>0})); else if(f.key==='originalPrice') setFormData(p=>({...p,originalPrice:val||undefined})); else setFormData(p=>({...p,[f.key]:val})); }} className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${formErrors[f.key]?'border-red-400':'border-gray-300'}`} /></div>
                  ))}
                </div>
                <div className="flex gap-4 mt-3">{[{key:'isNew',label:'New Arrival'},{key:'isOnSale',label:'On Sale'},{key:'inStock',label:'In Stock'}].map(cb => (<label key={cb.key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><input type="checkbox" checked={(formData as Record<string,any>)[cb.key]??false} onChange={e=>setFormData(p=>({...p,[cb.key]:e.target.checked}))} className="h-4 w-4 accent-blue-600" />{cb.label}</label>))}</div>
              </section>
              <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Images (URLs)</h3>
                <div className="space-y-2">
                  {formData.images.map((img,i) => (<div key={i} className="flex gap-2"><input value={img} onChange={e=>{const imgs=[...formData.images];imgs[i]=e.target.value;setFormData(p=>({...p,images:imgs}));}} placeholder="https://..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /><button onClick={()=>setFormData(p=>({...p,images:p.images.filter((_,j)=>j!==i)}))} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><XMarkIcon className="h-4 w-4" /></button></div>))}
                  <button onClick={()=>setFormData(p=>({...p,images:[...p.images,'']}))} className="text-blue-600 text-sm hover:underline flex items-center gap-1"><PlusIcon className="h-4 w-4" /> Add Image URL</button>
                </div>
              </section>
              <section>
                <div className="flex justify-between items-center mb-3"><h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Specifications</h3><button onClick={()=>{const keys=SPEC_TEMPLATES[formData.category]??[];const specs={...formData.specifications};keys.forEach(k=>{if(!specs[k])specs[k]='';});setFormData(p=>({...p,specifications:specs}));}} className="text-xs text-blue-600 hover:underline">Load Template</button></div>
                <div className="space-y-2">
                  {Object.entries(formData.specifications).map(([k,v])=>(<div key={k} className="flex gap-2"><input value={k} readOnly className="w-36 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600" /><input value={v} onChange={e=>{const s={...formData.specifications,[k]:e.target.value};setFormData(p=>({...p,specifications:s}));}} className="flex-1 px-2 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" /><button onClick={()=>{const s={...formData.specifications};delete s[k];setFormData(p=>({...p,specifications:s}));}} className="p-1 text-red-400 hover:bg-red-50 rounded"><XMarkIcon className="h-4 w-4" /></button></div>))}
                  <div className="flex gap-2 mt-1"><input value={specKey} onChange={e=>setSpecKey(e.target.value)} placeholder="Key" className="w-32 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /><input value={specValue} onChange={e=>setSpecValue(e.target.value)} placeholder="Value" className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /><button onClick={()=>{if(specKey.trim()&&specValue.trim()){setFormData(p=>({...p,specifications:{...p.specifications,[specKey.trim()]:specValue.trim()}}));setSpecKey('');setSpecValue('');} }} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"><PlusIcon className="h-4 w-4" /></button></div>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Features</h3>
                <div className="space-y-2">
                  {formData.features.map((f,i)=>(<div key={i} className="flex gap-2"><input value={f} onChange={e=>{const fs=[...formData.features];fs[i]=e.target.value;setFormData(p=>({...p,features:fs}));}} placeholder={`Feature ${i+1}`} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /><button onClick={()=>setFormData(p=>({...p,features:p.features.filter((_,j)=>j!==i)}))} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><XMarkIcon className="h-4 w-4" /></button></div>))}
                  <button onClick={()=>setFormData(p=>({...p,features:[...p.features,'']}))} className="text-blue-600 text-sm hover:underline flex items-center gap-1"><PlusIcon className="h-4 w-4" /> Add Feature</button>
                </div>
              </section>
              <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2 mb-2">{formData.tags.map(t=>(<span key={t} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{t}<button onClick={()=>setFormData(p=>({...p,tags:p.tags.filter(x=>x!==t)}))} className="text-blue-400 hover:text-blue-600"><XMarkIcon className="h-3 w-3" /></button></span>))}</div>
                <div className="flex gap-2"><input value={tagInput} onChange={e=>setTagInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&tagInput.trim()&&!formData.tags.includes(tagInput.trim())){setFormData(p=>({...p,tags:[...p.tags,tagInput.trim()]}));setTagInput('');}}} placeholder="Add tag..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /><button onClick={()=>{if(tagInput.trim()&&!formData.tags.includes(tagInput.trim())){setFormData(p=>({...p,tags:[...p.tags,tagInput.trim()]}));setTagInput('');}}} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"><PlusIcon className="h-4 w-4" /></button></div>
              </section>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button onClick={()=>setShowProductForm(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveProduct} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">{editingProduct ? 'Save Changes' : 'Add Product'}</button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY FORM MODAL */}
      {showCatForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center px-5 py-4 border-b"><h2 className="font-bold text-gray-900">{editingCat ? 'Edit Category' : 'Add Category'}</h2><button onClick={()=>setShowCatForm(false)} className="text-gray-400 hover:text-gray-600"><XMarkIcon className="h-5 w-5" /></button></div>
            <div className="p-5 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Label *</label><input value={catForm.label} onChange={e=>setCatForm(p=>({...p,label:e.target.value}))} placeholder="e.g. CCTV Cameras" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug (auto-generated)</label><input value={catForm.value} onChange={e=>setCatForm(p=>({...p,value:e.target.value}))} placeholder="auto-generated from label" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" /></div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategories</label>
                <div className="flex flex-wrap gap-2 mb-2">{catSubs.map(s=>(<span key={s} className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">{s}<button onClick={()=>setCatSubs(p=>p.filter(x=>x!==s))} className="text-gray-400 hover:text-red-500"><XMarkIcon className="h-3 w-3" /></button></span>))}</div>
                <div className="flex gap-2"><input value={catSubInput} onChange={e=>setCatSubInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&catSubInput.trim()){setCatSubs(p=>[...p,catSubInput.trim()]);setCatSubInput('');}}} placeholder="Add subcategory..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /><button onClick={()=>{if(catSubInput.trim()){setCatSubs(p=>[...p,catSubInput.trim()]);setCatSubInput('');}}} className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"><PlusIcon className="h-4 w-4 text-gray-600" /></button></div>
              </div>
            </div>
            <div className="px-5 py-4 border-t flex justify-end gap-3"><button onClick={()=>setShowCatForm(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button><button onClick={saveCat} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">{editingCat ? 'Save Changes' : 'Add Category'}</button></div>
          </div>
        </div>
      )}

      {/* VIEW PRODUCT MODAL */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-6 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-4">
            <div className="flex justify-between items-center px-5 py-4 border-b"><h2 className="font-bold text-gray-900 truncate pr-4">{viewProduct.name}</h2><button onClick={()=>setViewProduct(null)} className="text-gray-400 hover:text-gray-600"><XMarkIcon className="h-5 w-5" /></button></div>
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {viewProduct.images.length>0 && <img src={viewProduct.images[0]} alt="" className="w-full h-48 object-contain rounded-lg bg-gray-50" />}
              <p className="text-gray-600 text-sm">{viewProduct.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{[{l:'Price',v:`Rs.${viewProduct.price.toLocaleString()}`},{l:'Brand',v:viewProduct.brand},{l:'Category',v:viewProduct.category.replace(/-/g,' ')},{l:'Stock',v:String(viewProduct.stockCount)},{l:'Rating',v:`${viewProduct.rating} ★`},{l:'Warranty',v:viewProduct.warranty??'—'}].map(item=>(<div key={item.l} className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">{item.l}</p><p className="font-semibold text-gray-900 text-sm mt-0.5 capitalize">{item.v}</p></div>))}</div>
              {Object.keys(viewProduct.specifications).length>0 && (<div><p className="text-xs font-bold text-gray-500 uppercase mb-2">Specifications</p><div className="divide-y divide-gray-100">{Object.entries(viewProduct.specifications).map(([k,v])=>(<div key={k} className="flex justify-between py-1.5 text-sm"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v}</span></div>))}</div></div>)}
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM MODALS */}
      {deleteProductId && <ConfirmModal msg={`Delete "${productList.find(p=>p.id===deleteProductId)?.name}"?`} onYes={confirmDeleteProduct} onNo={()=>setDeleteProductId(null)} />}
      {deleteCatVal && <ConfirmModal msg={`Delete category "${categories.find(c=>c.value===deleteCatVal)?.label}"?`} onYes={confirmDeleteCat} onNo={()=>setDeleteCatVal(null)} />}
      {deleteBrand && <ConfirmModal msg={`Delete brand "${deleteBrand}"?`} onYes={confirmDeleteBrand} onNo={()=>setDeleteBrand(null)} />}
      {deleteUserId && <ConfirmModal msg={`Delete user "${users.find(u=>(u._id??u.id)===deleteUserId)?.email}"? This cannot be undone.`} onYes={confirmDeleteUser} onNo={()=>setDeleteUserId(null)} />}
    </div>
  );
};

export default AdminDashboard;
