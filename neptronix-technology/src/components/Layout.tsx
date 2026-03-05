import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

const navGroups = [
  {
    name: 'Electronics',
    href: '/products?category=mobile-phones',
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=160&h=160&fit=crop',
    sub: [
      { name: 'Mobiles', href: '/products?category=mobile-phones', brands: ['Samsung', 'Apple', 'Xiaomi', 'OnePlus', 'Realme'] },
      { name: 'Laptops', href: '/products?category=laptops', brands: ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus'] },
      { name: 'Televisions', href: '/products?category=televisions', brands: ['Samsung', 'LG', 'Sony', 'Himstar', 'TCL'] },
      { name: 'Audio & Headphones', href: '/products?category=audio', brands: ['Sony', 'JBL', 'Bose', 'Sennheiser', 'Boat'] },
      { name: 'Monitors', href: '/products?category=monitors', brands: ['Dell', 'LG', 'Samsung', 'Acer', 'BenQ'] },
    ],
  },
  {
    name: 'CCTV & Security',
    href: '/products?category=cctv-cameras',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=160&h=160&fit=crop',
    sub: [
      { name: 'CCTV Cameras', href: '/products?category=cctv-cameras', brands: ['Hikvision', 'Dahua', 'CP Plus', 'Reolink', 'Uniview'] },
      { name: 'DVR / NVR', href: '/products?category=recording-devices', brands: ['Hikvision', 'Dahua', 'CP Plus', 'Uniview', 'Provision'] },
      { name: 'Complete Kits', href: '/products?category=complete-kits', brands: ['Hikvision', 'Dahua', 'CP Plus', 'Reolink'] },
      { name: 'Accessories', href: '/products?category=accessories', brands: ['Hikvision', 'Dahua', 'Bosch', 'Axis'] },
    ],
  },
  {
    name: 'Computers',
    href: '/products?category=laptops',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=160&h=160&fit=crop',
    sub: [
      { name: 'Laptops', href: '/products?category=laptops', brands: ['Dell', 'HP', 'Lenovo', 'Asus', 'Acer'] },
      { name: 'Monitors', href: '/products?category=monitors', brands: ['Dell', 'LG', 'Samsung', 'Acer', 'BenQ'] },
      { name: 'Printers', href: '/products?category=printers', brands: ['HP', 'Canon', 'Epson', 'Brother', 'Xerox'] },
      { name: 'Networking', href: '/products?category=networking', brands: ['TP-Link', 'Cisco', 'Netgear', 'D-Link', 'Ubiquiti'] },
      { name: 'Storage', href: '/products?category=storage', brands: ['Seagate', 'WD', 'Samsung', 'Kingston', 'SanDisk'] },
      { name: 'UPS / Power', href: '/products?category=ups-power', brands: ['APC', 'Eaton', 'CyberPower', 'Luminous', 'Microtek'] },
    ],
  },
  {
    name: 'TV & Appliances',
    href: '/products?category=televisions',
    img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=160&h=160&fit=crop',
    sub: [
      { name: 'Televisions', href: '/products?category=televisions', brands: ['Samsung', 'LG', 'Sony', 'Himstar', 'TCL'] },
      { name: 'Smart Home', href: '/products?category=smart-home', brands: ['Amazon', 'Google', 'Xiaomi', 'TP-Link', 'Philips'] },
      { name: 'Audio Systems', href: '/products?category=audio', brands: ['Sony', 'LG', 'Samsung', 'JBL', 'Philips'] },
    ],
  },
  {
    name: 'Audio',
    href: '/products?category=audio',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop',
    sub: [
      { name: 'Headphones', href: '/products?category=audio', brands: ['Sony', 'JBL', 'Bose', 'Sennheiser', 'Audio-Technica'] },
      { name: 'Speakers', href: '/products?category=audio', brands: ['JBL', 'Sony', 'Bose', 'Marshall', 'Harman'] },
      { name: 'Home Theatre', href: '/products?category=audio', brands: ['Sony', 'LG', 'Samsung', 'Philips', 'Yamaha'] },
    ],
  },
  {
    name: 'Networking',
    href: '/products?category=networking',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=160&h=160&fit=crop',
    sub: [
      { name: 'Routers', href: '/products?category=networking', brands: ['TP-Link', 'Cisco', 'Netgear', 'D-Link', 'Asus'] },
      { name: 'Switches', href: '/products?category=networking', brands: ['Cisco', 'TP-Link', 'Netgear', 'D-Link', 'HP'] },
      { name: 'Access Points', href: '/products?category=networking', brands: ['Ubiquiti', 'TP-Link', 'Cisco', 'Netgear', 'Aruba'] },
    ],
  },
  {
    name: 'Storage',
    href: '/products?category=storage',
    img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=160&h=160&fit=crop',
    sub: [
      { name: 'Hard Drives', href: '/products?category=storage', brands: ['Seagate', 'WD', 'Toshiba', 'Samsung'] },
      { name: 'SSDs', href: '/products?category=storage', brands: ['Samsung', 'Kingston', 'WD', 'Crucial', 'Adata'] },
      { name: 'Pen Drives', href: '/products?category=storage', brands: ['SanDisk', 'Kingston', 'Transcend', 'HP', 'Adata'] },
    ],
  },
  {
    name: 'All Products',
    href: '/products',
    img: '',
    sub: [],
  },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>(null);
  const navigate = useNavigate();
  const { state: authState, logout } = useAuth();
  const { state: cartState } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] overflow-x-hidden">

      {/* ══ FLIPKART HEADER - BLUE ══ */}
      <header className="bg-[#2874f0] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex flex-col gap-2 py-2 sm:py-0 sm:h-14 sm:flex-row sm:items-center sm:gap-3">

            {/* Logo */}
            <div className="flex items-center justify-between gap-3">
              <Link to="/" className="flex-shrink-0 flex flex-col items-start min-w-fit">
              <span className="text-white font-bold text-lg sm:text-xl leading-tight tracking-tight">Neptronix</span>
              <span className="text-[#ffe500] text-[10px] sm:text-[11px] italic font-medium leading-tight">Technology ✦</span>
              </Link>

              {/* Mobile actions */}
              <div className="flex items-center gap-1 flex-shrink-0 sm:hidden">
                <Link
                  to={authState.isAuthenticated ? '/account' : '/login'}
                  className="text-white p-2 rounded hover:bg-[#1c5fcc]"
                  aria-label="Account"
                >
                  <UserIcon className="h-5 w-5" />
                </Link>

                <Link to="/cart" className="text-white p-2 rounded hover:bg-[#1c5fcc]" aria-label="Cart">
                  <div className="relative">
                    <ShoppingCartIcon className="h-5 w-5" />
                    {cartState.itemCount > 0 && (
                      <span className="absolute -top-2 -right-2.5 bg-[#ff6161] text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                        {cartState.itemCount}
                      </span>
                    )}
                  </div>
                </Link>

                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2 rounded hover:bg-[#1c5fcc]" aria-label="Menu">
                  {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 sm:mx-0">
              <div className="flex items-center bg-white rounded-sm overflow-hidden shadow-sm h-10 sm:h-[38px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more"
                  className="flex-1 px-3 sm:px-4 text-sm text-gray-700 outline-none h-full"
                />
                <button type="submit" className="bg-[#2874f0] px-4 sm:px-5 h-full flex items-center justify-center hover:bg-[#1c5fcc]">
                  <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="hidden sm:flex items-center gap-1 flex-shrink-0">

              {/* Login */}
              <div className="relative" onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
                <button className="flex items-center gap-1.5 bg-white text-[#2874f0] font-semibold text-sm px-4 py-1.5 rounded hover:bg-gray-50 min-w-[90px] justify-center whitespace-nowrap">
                  <UserIcon className="h-4 w-4 text-gray-600" />
                  <span>{authState.isAuthenticated ? (authState.user?.firstName || 'Account') : 'Login'}</span>
                  <ChevronDownIcon className="h-3 w-3 text-gray-500" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-white shadow-xl rounded w-52 z-50 py-1 border border-gray-100">
                    {!authState.isAuthenticated && (
                      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                        <span className="text-sm text-gray-600">New customer?</span>
                        <Link to="/register" onClick={() => setShowUserMenu(false)} className="text-sm text-[#2874f0] font-bold">Sign Up</Link>
                      </div>
                    )}
                    <Link to={authState.isAuthenticated ? '/account' : '/login'} onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <UserIcon className="h-4 w-4 text-gray-400" />{authState.isAuthenticated ? 'My Profile' : 'Login'}
                    </Link>
                    <Link to="/account" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <ShoppingCartIcon className="h-4 w-4 text-gray-400" />Orders
                    </Link>
                    <Link to="/wishlist" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <HeartIcon className="h-4 w-4 text-gray-400" />Wishlist
                    </Link>
                    {authState.isAuthenticated && authState.user?.isAdmin && (
                      <Link to="/admin" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2874f0] font-semibold hover:bg-gray-50">
                        Admin Panel
                      </Link>
                    )}
                    {authState.isAuthenticated && (
                      <>
                        <hr className="my-1" />
                        <button onClick={() => { logout(); setShowUserMenu(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50">
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Become a Seller */}
              <a href="#" className="hidden md:flex items-center gap-1 text-white font-semibold text-sm px-3 py-2 hover:bg-[#1c5fcc] rounded whitespace-nowrap">
                Become a Seller
              </a>

              {/* Cart */}
              <Link to="/cart" className="flex items-center gap-2 text-white font-semibold text-sm px-4 py-2 hover:bg-[#1c5fcc] rounded">
                <div className="relative">
                  <ShoppingCartIcon className="h-5 w-5" />
                  {cartState.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-[#ff6161] text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                      {cartState.itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline">Cart</span>
              </Link>

              {/* Mobile menu button */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white p-1.5">
                {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Category nav bar with mega-menu ── */}
        <nav className="bg-white hidden md:block shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center overflow-x-auto">
              {navGroups.map(group => (
                <div
                  key={group.name}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => setHoveredCat(group.name)}
                  onMouseLeave={() => setHoveredCat(null)}
                >
                  <Link
                    to={group.href}
                    className={`flex items-center gap-0.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      hoveredCat === group.name
                        ? 'text-[#2874f0] border-[#2874f0]'
                        : 'text-gray-800 border-transparent hover:text-[#2874f0] hover:border-[#2874f0]'
                    }`}
                  >
                    {group.name}
                    {group.sub.length > 0 && <ChevronDownIcon className="h-3 w-3 ml-0.5 text-gray-400" />}
                  </Link>

                  {hoveredCat === group.name && group.sub.length > 0 && (
                    <div className="absolute top-full left-0 z-50 bg-white shadow-2xl border-t-2 border-[#2874f0] flex" style={{ minWidth: 480 }}>
                      {/* Left image panel */}
                      <div className="w-32 flex-shrink-0 bg-[#f5f5f5] flex flex-col items-center justify-center p-4 gap-2 border-r border-gray-100">
                        <img src={group.img} alt={group.name} className="w-20 h-20 object-cover rounded" />
                        <span className="text-xs font-bold text-gray-700 text-center leading-tight">{group.name}</span>
                        <Link to={group.href} onClick={() => setHoveredCat(null)} className="text-[11px] text-[#2874f0] font-semibold hover:underline">
                          View All
                        </Link>
                      </div>
                      {/* Right: subcategories with brands */}
                      <div className="flex-1 py-3 overflow-y-auto" style={{ maxHeight: 320 }}>
                        {group.sub.map(s => (
                          <div key={s.name} className="px-4 py-2 border-b border-gray-50 last:border-0">
                            {/* Subcategory name */}
                            <Link
                              to={s.href}
                              onClick={() => setHoveredCat(null)}
                              className="text-sm font-semibold text-gray-800 hover:text-[#2874f0] block mb-1"
                            >
                              {s.name}
                            </Link>
                            {/* Brand pills */}
                            <div className="flex flex-wrap gap-1.5">
                              {s.brands.map(brand => (
                                <Link
                                  key={brand}
                                  to={`${s.href}&brand=${encodeURIComponent(brand)}`}
                                  onClick={() => setHoveredCat(null)}
                                  className="text-[11px] text-gray-500 hover:text-[#2874f0] hover:bg-blue-50 px-2 py-0.5 rounded border border-gray-200 hover:border-[#2874f0] transition-colors"
                                >
                                  {brand}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-md max-h-80 overflow-y-auto relative z-50">
            <div className="px-4 py-3 space-y-1">
              {navGroups.filter(g => g.name !== 'All Products').map(group => {
                const isOpen = expandedMobileGroup === group.name;
                return (
                  <div key={group.name} className="border border-gray-100 rounded overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpandedMobileGroup(prev => (prev === group.name ? null : group.name))}
                      className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                      aria-expanded={isOpen}
                    >
                      <span className="truncate">{group.name}</span>
                      <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-3 pb-3">
                        <Link
                          to={group.href}
                          onClick={() => { setIsMobileMenuOpen(false); setExpandedMobileGroup(null); }}
                          className="block text-xs font-semibold text-[#2874f0] py-2"
                        >
                          View All
                        </Link>

                        <div className="space-y-3">
                          {group.sub.map(s => (
                            <div key={s.name} className="">
                              <Link
                                to={s.href}
                                onClick={() => { setIsMobileMenuOpen(false); setExpandedMobileGroup(null); }}
                                className="block text-sm font-medium text-gray-800 hover:text-[#2874f0]"
                              >
                                {s.name}
                              </Link>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {s.brands.map(brand => (
                                  <Link
                                    key={brand}
                                    to={`${s.href}&brand=${encodeURIComponent(brand)}`}
                                    onClick={() => { setIsMobileMenuOpen(false); setExpandedMobileGroup(null); }}
                                    className="text-[11px] text-gray-600 hover:text-[#2874f0] hover:bg-blue-50 px-2 py-0.5 rounded border border-gray-200 hover:border-[#2874f0] transition-colors"
                                  >
                                    {brand}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                to="/products"
                onClick={() => { setIsMobileMenuOpen(false); setExpandedMobileGroup(null); }}
                className="block px-3 py-2.5 text-sm text-[#2874f0] font-semibold hover:bg-blue-50 rounded"
              >
                All Products
              </Link>
            </div>
          </div>
        )}
      </header>

      {showUserMenu && <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />}

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* ── Footer ── */}
      <footer className="bg-[#172337] text-gray-300 mt-4">
        <div className="max-w-[1100px] mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
            <div>
              <h4 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">About Neptronix</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Help</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/account" className="hover:text-white transition-colors">Payments</Link></li>
                <li><Link to="/account" className="hover:text-white transition-colors">Shipping</Link></li>
                <li><Link to="/account" className="hover:text-white transition-colors">Cancellation & Returns</Link></li>
                <li><Link to="/account" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Policy</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Return Policy</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Terms Of Use</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Social</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1">Registered Office:</p>
                <p className="text-xs text-gray-400">Biratnagar, Nepal</p>
                <p className="text-xs text-gray-400">+977-9807000750</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-4">
            <span className="text-white font-bold text-sm">Neptronix Technology</span>
            <p className="text-xs text-gray-500">&copy; 2024 Neptronix Technology Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
