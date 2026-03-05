import React, { useState } from 'react';
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
  PencilIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const sampleOrders = [
  {
    id: 'NTX-10045823',
    date: '2024-12-20',
    status: 'delivered' as const,
    total: 449.98,
    items: [
      { name: '4K Ultra HD CCTV Camera System', qty: 1, price: 299.99 },
      { name: 'Smart Doorbell Camera', qty: 1, price: 149.99 }
    ],
    tracking: 'NP1234567890',
    estimatedDelivery: '2024-12-25'
  },
  {
    id: 'NTX-10045790',
    date: '2024-12-15',
    status: 'shipped' as const,
    total: 599.99,
    items: [
      { name: 'PTZ Security Camera with 32x Zoom', qty: 1, price: 599.99 }
    ],
    tracking: 'NP9876543210',
    estimatedDelivery: '2024-12-28'
  },
  {
    id: 'NTX-10045650',
    date: '2024-11-28',
    status: 'processing' as const,
    total: 199.99,
    items: [
      { name: 'Wireless Security Camera 2-Pack', qty: 1, price: 199.99 }
    ],
    tracking: '',
    estimatedDelivery: '2025-01-05'
  }
];

type Tab = 'profile' | 'orders' | 'addresses' | 'settings';

const AccountPage: React.FC = () => {
  const { state: authState, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: authState.user?.firstName || 'John',
    lastName: authState.user?.lastName || 'Doe',
    email: authState.user?.email || 'john@example.com',
    phone: authState.user?.phone || '+977-9876543210'
  });

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
        <div className="bg-white shadow-sm p-10 max-w-md w-full text-center">
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

  const statusConfig = {
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

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'profile', label: 'Profile', icon: UserIcon },
    { key: 'orders', label: 'Orders', icon: ShoppingBagIcon },
    { key: 'addresses', label: 'Addresses', icon: MapPinIcon },
    { key: 'settings', label: 'Settings', icon: CogIcon },
  ];

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3">
        <div className="flex gap-3 items-start">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white shadow-sm">
              {/* User info */}
              <div className="p-4 flex items-center gap-3 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#2874f0] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Hello,</p>
                  <p className="font-bold text-gray-900 text-sm truncate">{profileData.firstName} {profileData.lastName}</p>
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
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white shadow-sm p-6">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
                  {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-1 text-[#2874f0] text-sm font-medium hover:underline">
                      <PencilIcon className="h-4 w-4" /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setIsEditing(false)} className="text-gray-600 text-sm px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Cancel</button>
                      <button onClick={handleSaveProfile} className="bg-[#2874f0] text-white text-sm px-3 py-1 rounded hover:bg-[#1a65de]">Save</button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                          value={(profileData as any)[field.name]}
                          onChange={(e) => setProfileData(prev => ({ ...prev, [field.name]: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#2874f0]"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium text-sm">{(profileData as any)[field.name]}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded p-4 text-center">
                    <p className="text-2xl font-bold text-[#2874f0]">{sampleOrders.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Orders</p>
                  </div>
                  <div className="bg-green-50 rounded p-4 text-center">
                    <p className="text-2xl font-bold text-[#388e3c]">0</p>
                    <p className="text-xs text-gray-500 mt-1">Wishlist Items</p>
                  </div>
                  <div className="bg-orange-50 rounded p-4 text-center">
                    <p className="text-lg font-bold text-orange-600">Rs.1,249</p>
                    <p className="text-xs text-gray-500 mt-1">Total Spent</p>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-2">
                <div className="bg-white shadow-sm px-4 py-3">
                  <h2 className="text-base font-semibold text-gray-900">Order History</h2>
                </div>
                {sampleOrders.map(order => {
                  const config = statusConfig[order.status];
                  return (
                    <div key={order.id} className="bg-white shadow-sm p-5">
                      <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{order.id}</p>
                          <p className="text-xs text-gray-400">Placed on {order.date}</p>
                        </div>
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`}>
                          <config.icon className="h-3.5 w-3.5" />{config.label}
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-3 space-y-1.5">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.name} ×{item.qty}</span>
                            <span className="font-medium">Rs.{item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 mt-3 pt-3 flex flex-wrap justify-between items-center gap-2">
                        <div className="text-xs text-gray-400">
                          {order.tracking && <span>Tracking: <span className="text-gray-700 font-medium">{order.tracking}</span></span>}
                          {order.estimatedDelivery && <span className="ml-3">Est. Delivery: {order.estimatedDelivery}</span>}
                        </div>
                        <p className="text-sm font-bold text-gray-900">Total: Rs.{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-3">
                <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
                  <h2 className="text-base font-semibold text-gray-900">Saved Addresses</h2>
                  <button className="bg-[#2874f0] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#1a65de]">+ Add Address</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white shadow-sm p-5 border-l-4 border-[#2874f0]">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-blue-50 text-[#2874f0] text-xs px-2 py-0.5 rounded font-semibold">DEFAULT</span>
                      <button className="text-gray-400 hover:text-[#2874f0]"><PencilIcon className="h-4 w-4" /></button>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">Home</p>
                    <p className="text-sm text-gray-500 mt-1">123 Main Street, Kathmandu, Bagmati 44600, Nepal</p>
                    <p className="text-sm text-gray-500 mt-1">+977-9876543210</p>
                  </div>
                  <div className="bg-white shadow-sm p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-semibold">WORK</span>
                      <button className="text-gray-400 hover:text-[#2874f0]"><PencilIcon className="h-4 w-4" /></button>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">Office</p>
                    <p className="text-sm text-gray-500 mt-1">456 Business Road, Lalitpur, Bagmati 44700, Nepal</p>
                    <p className="text-sm text-gray-500 mt-1">+977-9812345678</p>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-5">Account Settings</h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Order updates', desc: 'Get notified about order status changes' },
                        { label: 'Promotions', desc: 'Receive promotional offers and deals' },
                        { label: 'Newsletter', desc: 'Weekly newsletter with latest products' },
                        { label: 'Security alerts', desc: 'Account security notifications' },
                      ].map((item, index) => (
                        <label key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                          </div>
                          <input type="checkbox" defaultChecked={index < 2} className="h-4 w-4 accent-[#2874f0]" />
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Password</h3>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 font-medium">Change Password</button>
                  </div>
                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="text-sm font-semibold text-red-500 mb-3">Danger Zone</h3>
                    <button className="bg-red-50 text-red-500 px-4 py-2 rounded text-sm hover:bg-red-100 font-medium">Delete Account</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
