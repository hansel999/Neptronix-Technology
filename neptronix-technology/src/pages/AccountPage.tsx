import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CogIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { ordersAPI, authAPI } from '../services/api';

type Tab = 'profile' | 'orders' | 'addresses' | 'settings';

interface ApiOrder {
  _id?: string;
  id?: string;
  createdAt?: string;
  status?: string;
  total?: number;
  items?: { product?: { name?: string }; quantity?: number; price?: number }[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const AccountPage: React.FC = () => {
  const { state: authState, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const user = authState.user;

  const NOTIF_KEY = `notif_prefs_${user?.id ?? 'guest'}`;
  const loadNotifPrefs = () => {
    try { return JSON.parse(localStorage.getItem(NOTIF_KEY) || 'null'); } catch { return null; }
  };
  const [notifPrefs, setNotifPrefs] = useState<boolean[]>(() => loadNotifPrefs() ?? [true, true, false, false]);

  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [showPwForm, setShowPwForm] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? ''
  });

  useEffect(() => {
    setProfileData({
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? ''
    });
  }, [user]);

  useEffect(() => {
    if (authState.isAuthenticated && activeTab === 'orders') {
      setOrdersLoading(true);
      ordersAPI.getAll()
        .then((data: any) => {
          const list = Array.isArray(data) ? data : (Array.isArray(data?.orders) ? data.orders : []);
          setOrders(list);
        })
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false));
    }
  }, [authState.isAuthenticated, activeTab]);

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#2874f0] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading your account…</p>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center px-4">
        <div className="bg-white shadow-sm p-8 max-w-md w-full text-center rounded-lg">
          <UserIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Please Sign In</h2>
          <p className="text-gray-500 text-sm mb-6">You need to be logged in to access your account.</p>
          <Link to="/login" className="block w-full bg-[#2874f0] text-white py-3 rounded font-bold hover:bg-[#1a65de] mb-3">
            Sign In
          </Link>
          <Link to="/register" className="block w-full border border-gray-200 text-gray-700 py-3 rounded font-medium hover:bg-gray-50">
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
    pending: { color: 'text-yellow-600 bg-yellow-100', icon: ClockIcon, label: 'Pending' },
    processing: { color: 'text-blue-600 bg-blue-100', icon: CogIcon, label: 'Processing' },
    shipped: { color: 'text-purple-600 bg-purple-100', icon: TruckIcon, label: 'Shipped' },
    delivered: { color: 'text-green-600 bg-green-100', icon: CheckCircleIcon, label: 'Delivered' },
    cancelled: { color: 'text-red-600 bg-red-100', icon: XCircleIcon, label: 'Cancelled' }
  };

  const handleSaveProfile = () => {
    updateUser({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone
    });
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    setPwError('');
    setPwSuccess('');
    if (!pwForm.current) { setPwError('Enter your current password'); return; }
    if (pwForm.next.length < 6) { setPwError('New password must be at least 6 characters'); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError('New passwords do not match'); return; }
    setPwLoading(true);
    try {
      await authAPI.changePassword(pwForm.current, pwForm.next);
      setPwSuccess('Password changed successfully');
      setPwForm({ current: '', next: '', confirm: '' });
      setShowPwForm(false);
    } catch (e: any) {
      setPwError(e?.message ?? 'Failed to change password');
    } finally {
      setPwLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError('');
    if (!deletePassword) { setDeleteError('Enter your password to confirm'); return; }
    setDeleteLoading(true);
    try {
      await authAPI.deleteAccount();
      logout();
      navigate('/');
    } catch (e: any) {
      setDeleteError(e?.message ?? 'Failed to delete account');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleNotifToggle = (index: number) => {
    const updated = notifPrefs.map((v, i) => (i === index ? !v : v));
    setNotifPrefs(updated);
    localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
  };

  const initials = `${profileData.firstName?.[0] ?? ''}${profileData.lastName?.[0] ?? ''}`.toUpperCase() || '?';

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'profile', label: 'Profile', icon: UserIcon },
    { key: 'orders', label: 'Orders', icon: ShoppingBagIcon },
    { key: 'addresses', label: 'Addresses', icon: MapPinIcon },
    { key: 'settings', label: 'Settings', icon: CogIcon },
  ];

  const addresses = user?.addresses ?? [];
  const wishlistCount = user?.wishlist?.length ?? 0;
  const totalSpent = orders.reduce((sum, o) => sum + (o.total ?? 0), 0);

  return (
    <div className="min-h-screen bg-[#f1f3f6] pb-20 md:pb-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3">

        {/* Mobile: user header strip */}
        <div className="md:hidden bg-white shadow-sm rounded-lg mb-3 p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#2874f0] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-white">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Hello,</p>
            <p className="font-bold text-gray-900 text-sm truncate">
              {profileData.firstName || profileData.email || 'User'}
              {profileData.lastName ? ` ${profileData.lastName}` : ''}
            </p>
            <p className="text-xs text-gray-400 truncate">{profileData.email}</p>
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="ml-auto flex items-center gap-1 text-red-500 text-xs font-medium shrink-0"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="flex gap-3 items-start">
          {/* Sidebar – desktop only */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white shadow-sm rounded-lg">
              <div className="p-4 flex items-center gap-3 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#2874f0] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white">{initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Hello,</p>
                  <p className="font-bold text-gray-900 text-sm truncate">
                    {profileData.firstName || profileData.email || 'User'}
                    {profileData.lastName ? ` ${profileData.lastName}` : ''}
                  </p>
                </div>
              </div>
              <nav className="py-2">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                      activeTab === tab.key
                        ? 'border-[#2874f0] text-[#2874f0] bg-blue-50'
                        : 'border-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 border-l-4 border-transparent transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-3">

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
                  {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-1 text-[#2874f0] text-sm font-medium hover:underline">
                      <PencilIcon className="h-4 w-4" /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => { setIsEditing(false); setProfileData({ firstName: user?.firstName ?? '', lastName: user?.lastName ?? '', email: user?.email ?? '', phone: user?.phone ?? '' }); }} className="text-gray-600 text-sm px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50">Cancel</button>
                      <button onClick={handleSaveProfile} className="bg-[#2874f0] text-white text-sm px-3 py-1.5 rounded hover:bg-[#1a65de]">Save</button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'firstName', label: 'First Name' },
                    { name: 'lastName', label: 'Last Name' },
                    { name: 'email', label: 'Email' },
                    { name: 'phone', label: 'Phone' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={(profileData as Record<string, string>)[field.name]}
                          onChange={(e) => setProfileData(prev => ({ ...prev, [field.name]: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#2874f0]"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium text-sm break-all">
                          {(profileData as Record<string, string>)[field.name] || <span className="text-gray-400 font-normal">—</span>}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="bg-blue-50 rounded p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-[#2874f0]">{orders.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Orders</p>
                  </div>
                  <div className="bg-green-50 rounded p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-[#388e3c]">{wishlistCount}</p>
                    <p className="text-xs text-gray-500 mt-1">Wishlist</p>
                  </div>
                  <div className="bg-orange-50 rounded p-3 sm:p-4 text-center">
                    <p className="text-sm sm:text-lg font-bold text-orange-600">Rs.{totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Spent</p>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-2">
                <div className="bg-white shadow-sm rounded-lg px-4 py-3">
                  <h2 className="text-base font-semibold text-gray-900">Order History</h2>
                </div>
                {ordersLoading ? (
                  <div className="bg-white shadow-sm rounded-lg p-10 text-center text-gray-400 text-sm">Loading orders…</div>
                ) : orders.length === 0 ? (
                  <div className="bg-white shadow-sm rounded-lg p-10 text-center">
                    <ShoppingBagIcon className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm font-medium">No orders yet</p>
                    <p className="text-gray-400 text-xs mt-1">Your order history will appear here.</p>
                    <Link to="/products" className="mt-4 inline-block bg-[#2874f0] text-white text-sm px-5 py-2 rounded font-bold hover:bg-[#1a65de]">Shop Now</Link>
                  </div>
                ) : (
                  orders.map(order => {
                    const orderId = order._id ?? order.id ?? '';
                    const rawStatus = order.status ?? 'pending';
                    const config = statusConfig[rawStatus] ?? statusConfig['pending'];
                    const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—';
                    return (
                      <div key={orderId} className="bg-white shadow-sm rounded-lg p-4 sm:p-5">
                        <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{orderId}</p>
                            <p className="text-xs text-gray-400">Placed on {date}</p>
                          </div>
                          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`}>
                            <config.icon className="h-3.5 w-3.5" />{config.label}
                          </div>
                        </div>
                        {order.items && order.items.length > 0 && (
                          <div className="border-t border-gray-100 pt-3 space-y-1.5">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex justify-between text-sm gap-2">
                                <span className="text-gray-600 truncate">{item.product?.name ?? 'Product'} ×{item.quantity ?? 1}</span>
                                <span className="font-medium shrink-0">Rs.{(item.price ?? 0).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="border-t border-gray-100 mt-3 pt-3 flex flex-wrap justify-between items-center gap-2">
                          <div className="text-xs text-gray-400">
                            {order.trackingNumber && <span>Tracking: <span className="text-gray-700 font-medium">{order.trackingNumber}</span></span>}
                            {order.estimatedDelivery && <span className="ml-2">Est. Delivery: {order.estimatedDelivery}</span>}
                          </div>
                          <p className="text-sm font-bold text-gray-900">Total: Rs.{(order.total ?? 0).toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-3">
                <div className="bg-white shadow-sm rounded-lg px-4 py-3 flex justify-between items-center">
                  <h2 className="text-base font-semibold text-gray-900">Saved Addresses</h2>
                  <button className="bg-[#2874f0] text-white px-3 py-1.5 rounded text-sm font-bold hover:bg-[#1a65de]">+ Add</button>
                </div>
                {addresses.length === 0 ? (
                  <div className="bg-white shadow-sm rounded-lg p-10 text-center">
                    <MapPinIcon className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm font-medium">No saved addresses</p>
                    <p className="text-gray-400 text-xs mt-1">Add an address to speed up checkout.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map(addr => (
                      <div key={addr.id} className={`bg-white shadow-sm rounded-lg p-4 sm:p-5 ${addr.isDefault ? 'border-l-4 border-[#2874f0]' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase ${addr.isDefault ? 'bg-blue-50 text-[#2874f0]' : 'bg-gray-100 text-gray-600'}`}>
                            {addr.isDefault ? 'Default' : addr.type}
                          </span>
                          <button className="text-gray-400 hover:text-[#2874f0]"><PencilIcon className="h-4 w-4" /></button>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm capitalize">{addr.type}</p>
                        <p className="text-sm text-gray-500 mt-1">{addr.street}, {addr.city}, {addr.state} {addr.zipCode}, {addr.country}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-3">

                {/* Notifications */}
                <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Notifications</h3>
                  <div className="space-y-1">
                    {[
                      { label: 'Order updates', desc: 'Get notified about order status changes' },
                      { label: 'Promotions', desc: 'Receive promotional offers and deals' },
                      { label: 'Newsletter', desc: 'Weekly newsletter with latest products' },
                      { label: 'Security alerts', desc: 'Account security notifications' },
                    ].map((item, index) => (
                      <label key={index} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 cursor-pointer">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.label}</p>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifPrefs[index] ?? false}
                          onChange={() => handleNotifToggle(index)}
                          className="h-4 w-4 accent-[#2874f0]"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Change Password */}
                <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-gray-700">Password</h3>
                    {!showPwForm && (
                      <button
                        onClick={() => { setShowPwForm(true); setPwError(''); setPwSuccess(''); }}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 font-medium"
                      >
                        Change Password
                      </button>
                    )}
                  </div>
                  {pwSuccess && <p className="text-green-600 text-sm mb-3 bg-green-50 px-3 py-2 rounded">{pwSuccess}</p>}
                  {showPwForm && (
                    <div className="space-y-3">
                      {[
                        { key: 'current', label: 'Current Password' },
                        { key: 'next', label: 'New Password' },
                        { key: 'confirm', label: 'Confirm New Password' },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
                          <input
                            type="password"
                            value={(pwForm as Record<string, string>)[f.key]}
                            onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#2874f0]"
                          />
                        </div>
                      ))}
                      {pwError && <p className="text-red-500 text-xs">{pwError}</p>}
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={handleChangePassword}
                          disabled={pwLoading}
                          className="bg-[#2874f0] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#1a65de] disabled:opacity-60"
                        >
                          {pwLoading ? 'Saving…' : 'Save Password'}
                        </button>
                        <button
                          onClick={() => { setShowPwForm(false); setPwForm({ current: '', next: '', confirm: '' }); setPwError(''); }}
                          className="border border-gray-200 text-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delete Account */}
                <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                  <h3 className="text-sm font-semibold text-red-500 mb-1">Danger Zone</h3>
                  <p className="text-xs text-gray-400 mb-3">Once deleted, your account and all data cannot be recovered.</p>
                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => { setShowDeleteConfirm(true); setDeleteError(''); }}
                      className="bg-red-50 text-red-500 px-4 py-2 rounded text-sm hover:bg-red-100 font-medium"
                    >
                      Delete Account
                    </button>
                  ) : (
                    <div className="space-y-3 border border-red-100 rounded-lg p-4 bg-red-50">
                      <p className="text-sm font-medium text-red-700">Are you sure? This cannot be undone.</p>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Enter your password to confirm</label>
                        <input
                          type="password"
                          value={deletePassword}
                          onChange={e => { setDeletePassword(e.target.value); setDeleteError(''); }}
                          placeholder="Your password"
                          className="w-full px-3 py-2 border border-red-200 rounded text-sm focus:outline-none focus:border-red-400"
                        />
                      </div>
                      {deleteError && <p className="text-red-600 text-xs">{deleteError}</p>}
                      <div className="flex gap-2">
                        <button
                          onClick={handleDeleteAccount}
                          disabled={deleteLoading}
                          className="bg-red-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-600 disabled:opacity-60"
                        >
                          {deleteLoading ? 'Deleting…' : 'Yes, Delete My Account'}
                        </button>
                        <button
                          onClick={() => { setShowDeleteConfirm(false); setDeletePassword(''); setDeleteError(''); }}
                          className="border border-gray-200 text-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-40">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${
              activeTab === tab.key ? 'text-[#2874f0]' : 'text-gray-500'
            }`}
          >
            <tab.icon className="h-5 w-5 mb-0.5" />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AccountPage;
