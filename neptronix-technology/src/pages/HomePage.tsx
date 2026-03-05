import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { TruckIcon, ShieldCheckIcon, ArrowPathIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useProducts } from '../context/ProductContext';

/* ── Flipkart-exact section data ── */
const sections = [
  {
    title: 'Best of Electronics',
    color: '#e23744',
    href: '/products?category=mobile-phones',
    items: [
      { label: 'Mobiles', sub: 'Min. 50% Off', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', href: '/products?category=mobile-phones' },
      { label: 'Laptops', sub: 'Min. 40% Off', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop', href: '/products?category=laptops' },
      { label: 'Headphones', sub: 'Min. 50% Off', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', href: '/products?category=audio' },
      { label: 'Televisions', sub: 'Min. 30% Off', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop', href: '/products?category=televisions' },
    ]
  },
  {
    title: 'Best of Security',
    color: '#e23744',
    href: '/products?category=cctv-cameras',
    items: [
      { label: 'CCTV Cameras', sub: 'Min. 30% Off', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop', href: '/products?category=cctv-cameras' },
      { label: 'DVR / NVR', sub: 'Min. 25% Off', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=300&fit=crop', href: '/products?category=recording-devices' },
      { label: 'Complete Kits', sub: 'Min. 20% Off', img: 'https://images.unsplash.com/photo-1558000143-a78f8299c40b?w=300&h=300&fit=crop', href: '/products?category=complete-kits' },
      { label: 'Accessories', sub: 'Min. 40% Off', img: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=300&h=300&fit=crop', href: '/products?category=accessories' },
    ]
  },
  {
    title: 'Top Computers & Peripherals',
    color: '#e23744',
    href: '/products?category=laptops',
    items: [
      { label: 'Monitors', sub: 'Min. 35% Off', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop', href: '/products?category=monitors' },
      { label: 'Printers', sub: 'Min. 20% Off', img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300&h=300&fit=crop', href: '/products?category=printers' },
      { label: 'Networking', sub: 'Min. 30% Off', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop', href: '/products?category=networking' },
      { label: 'Storage', sub: 'Min. 40% Off', img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop', href: '/products?category=storage' },
    ]
  },
  {
    title: 'Best Value Deals on Audio',
    color: '#e23744',
    href: '/products?category=audio',
    items: [
      { label: 'Speakers', sub: 'Min. 50% Off', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop', href: '/products?category=audio' },
      { label: 'Headphones', sub: 'Min. 50% Off', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', href: '/products?category=audio' },
      { label: 'Smart Home', sub: 'Min. 30% Off', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=300&h=300&fit=crop', href: '/products?category=smart-home' },
      { label: 'Televisions', sub: 'Min. 30% Off', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop', href: '/products?category=televisions' },
    ]
  },
];

/* ── 3-panel ad banners (Flipkart homepage top banners) ── */
const adBanners = [
  {
    href: '/products?category=mobile-phones',
    bg: 'from-[#e3f2fd] to-[#bbdefb]',
    accent: '#1565c0',
    tag: 'BIG SAVING DAYS',
    brand: 'Smartphones',
    title: 'Latest 5G Phones',
    sub: 'Starts on 8th Mar',
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=180&h=140&fit=crop',
  },
  {
    href: '/products?category=audio',
    bg: 'from-[#fff3e0] to-[#ffe0b2]',
    accent: '#e65100',
    tag: 'BIG SAVING DAYS',
    brand: 'Audio',
    title: 'Premium Headphones',
    sub: 'From Rs.1,999',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=180&h=140&fit=crop',
  },
  {
    href: '/products?category=laptops',
    bg: 'from-[#f3e5f5] to-[#e1bee7]',
    accent: '#6a1b9a',
    tag: 'NEW LAUNCH',
    brand: 'Laptops',
    title: 'Ultra-Slim Laptops',
    sub: 'Sale on 11th March, 12 PM',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=180&h=140&fit=crop',
  },
];

/* ── Category icon grid (Flipkart 2-row, 8 per row) ── */
const categoryIcons = [
  { label: 'Electronics', href: '/products?category=mobile-phones', bg: 'bg-blue-100', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop' },
  { label: 'Laptops', href: '/products?category=laptops', bg: 'bg-indigo-100', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=80&h=80&fit=crop' },
  { label: 'TVs', href: '/products?category=televisions', bg: 'bg-purple-100', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=80&h=80&fit=crop' },
  { label: 'Audio', href: '/products?category=audio', bg: 'bg-pink-100', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop' },
  { label: 'Monitors', href: '/products?category=monitors', bg: 'bg-teal-100', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=80&h=80&fit=crop' },
  { label: 'Smart Home', href: '/products?category=smart-home', bg: 'bg-green-100', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=80&h=80&fit=crop' },
  { label: 'Networking', href: '/products?category=networking', bg: 'bg-cyan-100', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=80&h=80&fit=crop' },
  { label: 'Storage', href: '/products?category=storage', bg: 'bg-yellow-100', img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=80&h=80&fit=crop' },
  { label: 'Mobiles', href: '/products?category=mobile-phones', bg: 'bg-orange-100', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop' },
  { label: 'Printers', href: '/products?category=printers', bg: 'bg-lime-100', img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=80&h=80&fit=crop' },
  { label: 'Appliances', href: '/products?category=smart-home', bg: 'bg-amber-100', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop' },
  { label: 'UPS / Power', href: '/products?category=ups-power', bg: 'bg-red-100', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=80&h=80&fit=crop' },
  { label: 'CCTV', href: '/products?category=cctv-cameras', bg: 'bg-slate-100', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=80&h=80&fit=crop' },
  { label: 'DVR / NVR', href: '/products?category=recording-devices', bg: 'bg-violet-100', img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=80&h=80&fit=crop' },
  { label: 'Complete Kits', href: '/products?category=complete-kits', bg: 'bg-emerald-100', img: 'https://images.unsplash.com/photo-1558000143-a78f8299c40b?w=80&h=80&fit=crop' },
  { label: 'Accessories', href: '/products?category=accessories', bg: 'bg-rose-100', img: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=80&h=80&fit=crop' },
];

const showcases = [
  {
    title: 'Best of Electronics', href: '/products?category=mobile-phones',
    items: [
      { label: 'Mobiles', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop', href: '/products?category=mobile-phones' },
      { label: 'Laptops', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop', href: '/products?category=laptops' },
      { label: 'Headphones', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', href: '/products?category=audio' },
      { label: 'Televisions', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop', href: '/products?category=televisions' },
    ]
  },
  {
    title: 'TV & Appliances', href: '/products?category=televisions',
    items: [
      { label: 'Televisions', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop', href: '/products?category=televisions' },
      { label: 'Smart Home', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=200&h=200&fit=crop', href: '/products?category=smart-home' },
      { label: 'Speakers', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop', href: '/products?category=audio' },
      { label: 'Monitors', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop', href: '/products?category=monitors' },
    ]
  },
  {
    title: 'Security & Surveillance', href: '/products?category=cctv-cameras',
    items: [
      { label: 'CCTV Cameras', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop', href: '/products?category=cctv-cameras' },
      { label: 'DVR / NVR', img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=200&fit=crop', href: '/products?category=recording-devices' },
      { label: 'Complete Kits', img: 'https://images.unsplash.com/photo-1558000143-a78f8299c40b?w=200&h=200&fit=crop', href: '/products?category=complete-kits' },
      { label: 'Accessories', img: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=200&h=200&fit=crop', href: '/products?category=accessories' },
    ]
  },
  {
    title: 'Computers & Peripherals', href: '/products?category=laptops',
    items: [
      { label: 'Laptops', img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=200&fit=crop', href: '/products?category=laptops' },
      { label: 'Printers', img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200&h=200&fit=crop', href: '/products?category=printers' },
      { label: 'Storage', img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=200&fit=crop', href: '/products?category=storage' },
      { label: 'Networking', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=200&fit=crop', href: '/products?category=networking' },
    ]
  },
];

const HomePage: React.FC = () => {
  const { products } = useProducts();
  const [bannerIdx, setBannerIdx] = useState(0);

  const bannerSlides = [
    { bg: 'from-[#0d47a1] to-[#1565c0]', title: 'Latest Laptops & PCs', sub: 'Dell, Lenovo, HP — up to 15% off', cta: 'Shop Laptops', href: '/products?category=laptops' },
    { bg: 'from-[#880e4f] to-[#ad1457]', title: 'Smartphones & Mobiles', sub: 'iPhone, Samsung, latest 5G phones', cta: 'Shop Phones', href: '/products?category=mobile-phones' },
    { bg: 'from-[#1b5e20] to-[#2e7d32]', title: 'Smart TVs & Displays', sub: '4K QLED & OLED — best prices', cta: 'Shop TVs', href: '/products?category=televisions' },
    { bg: 'from-[#e65100] to-[#f57c00]', title: 'Audio & Headphones', sub: 'Sony, JBL, Bose — premium sound', cta: 'Shop Audio', href: '/products?category=audio' },
    { bg: 'from-[#1a237e] to-[#283593]', title: 'CCTV & Security', sub: 'Professional surveillance solutions', cta: 'Shop Security', href: '/products?category=cctv-cameras' },
  ];

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % bannerSlides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const byCategory = (cat: string, n = 4) => products.filter(p => p.category === cat).slice(0, n);

  /* ── Exact Flipkart section: colored header bar + 4 image tiles ── */
  const FKSection: React.FC<{ sec: typeof sections[0] }> = ({ sec }) => (
    <div className="bg-white rounded overflow-hidden shadow-sm">
      {/* Red header bar with title left + arrow button right */}
      <div className="flex items-center justify-between px-4 py-3 rounded-t" style={{ background: sec.color }}>
        <h2 className="text-white font-bold text-base sm:text-lg">{sec.title}</h2>
        <Link to={sec.href} className="bg-white rounded-full p-1 flex items-center justify-center hover:bg-gray-100">
          <ChevronRightIcon className="h-5 w-5" style={{ color: sec.color }} />
        </Link>
      </div>
      {/* 4 product image tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
        {sec.items.map(item => (
          <Link key={item.label} to={item.href} className="group flex flex-col items-center py-4 px-2 hover:bg-gray-50 transition-colors">
            <div className="w-full aspect-square overflow-hidden mb-2">
              <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="text-xs font-semibold text-gray-800 text-center">{item.label}</p>
            <p className="text-xs text-green-600 font-medium text-center">{item.sub}</p>
          </Link>
        ))}
      </div>
    </div>
  );

  /* ── Product card exactly like Flipkart search results ── */
  const ProductCard: React.FC<{ product: any }> = ({ product }) => (
    <Link to={`/products/${product.id}`} className="group flex flex-col bg-white hover:shadow-md transition-shadow p-3 border border-gray-100">
      <div className="relative w-full h-44 flex items-center justify-center overflow-hidden mb-3 bg-white">
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300" />
        {product.isOnSale && (
          <span className="absolute top-2 left-2 bg-[#388e3c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{product.discountPercentage}% off</span>
        )}
      </div>
      <p className="text-sm text-gray-800 font-medium line-clamp-2 mb-1">{product.name}</p>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="bg-[#388e3c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {product.rating > 0 ? product.rating.toFixed(1) : '4.0'} ★
        </span>
        <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-base font-bold text-gray-900">Rs.{product.price.toLocaleString()}</span>
        {product.originalPrice && <span className="text-xs text-gray-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>}
        {product.isOnSale && <span className="text-xs text-green-600 font-semibold">{product.discountPercentage}% off</span>}
      </div>
    </Link>
  );

  /* ── Product row section (like Flipkart's scrollable product rows) ── */
  const ProductRow: React.FC<{ title: string; href: string; cat: string }> = ({ title, href, cat }) => {
    const items = byCategory(cat);
    if (!items.length) return null;
    return (
      <div className="bg-white shadow-sm rounded overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <Link to={href} className="text-sm text-[#2874f0] font-semibold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-gray-100">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f1f3f6] min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 py-2 space-y-2">

        {/* ━━ Banner carousel — full width ━━ */}
        <div className="relative overflow-hidden bg-white w-full h-[210px] sm:h-[260px] lg:h-[280px]">
          {bannerSlides.map((b, i) => (
            <div key={i} className={`absolute inset-0 bg-gradient-to-r ${b.bg} flex items-center px-4 sm:px-10 lg:px-16 transition-opacity duration-500 ${i === bannerIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Neptronix Technology</p>
                <h1 className="text-white text-xl sm:text-3xl lg:text-4xl font-extrabold mb-2 leading-tight">{b.title}</h1>
                <p className="text-white/80 text-xs sm:text-sm mb-4 sm:mb-5">{b.sub}</p>
                <Link to={b.href} className="inline-block bg-white text-[#2874f0] font-bold text-xs sm:text-sm px-5 sm:px-7 py-2 sm:py-2.5 rounded hover:bg-gray-50">{b.cta}</Link>
              </div>
            </div>
          ))}
          <button onClick={() => setBannerIdx(i => (i - 1 + bannerSlides.length) % bannerSlides.length)} className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1 shadow">
            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <button onClick={() => setBannerIdx(i => (i + 1) % bannerSlides.length)} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1 shadow">
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {bannerSlides.map((_, i) => (
              <button key={i} onClick={() => setBannerIdx(i)} className={`h-1.5 rounded-full transition-all ${i === bannerIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`} />
            ))}
          </div>
        </div>

        {/* ━━ Category showcase 4-box grid ━━ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {showcases.map(sc => (
            <div key={sc.title} className="bg-white shadow-sm p-3">
              <div className="flex items-center justify-between mb-2.5 border-b border-gray-100 pb-2.5">
                <h3 className="font-bold text-gray-900 text-sm sm:text-[15px]">{sc.title}</h3>
                <Link to={sc.href} className="text-[11px] text-[#2874f0] font-semibold hover:underline whitespace-nowrap">See All</Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {sc.items.map(item => (
                  <Link key={item.label} to={item.href} className="group flex flex-col items-center gap-1">
                    <div className="w-full aspect-square overflow-hidden bg-gray-50">
                      <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span className="text-[11px] text-gray-700 font-medium text-center leading-tight">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ━━ Red-header sections (Best of Electronics etc.) ━━ */}
        {sections.map(sec => <FKSection key={sec.title} sec={sec} />)}

        {/* ━━ Product rows ━━ */}
        <ProductRow title="Mobiles" href="/products?category=mobile-phones" cat="mobile-phones" />
        <ProductRow title="Laptops" href="/products?category=laptops" cat="laptops" />
        <ProductRow title="Televisions" href="/products?category=televisions" cat="televisions" />
        <ProductRow title="Audio" href="/products?category=audio" cat="audio" />
        <ProductRow title="CCTV & Security" href="/products?category=cctv-cameras" cat="cctv-cameras" />
        <ProductRow title="Monitors" href="/products?category=monitors" cat="monitors" />

        {/* ━━ Trust badges ━━ */}
        <div className="bg-white shadow-sm px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <TruckIcon className="h-7 w-7 text-[#2874f0]" />, title: 'Free Delivery', sub: 'Flat Rs.150 on all orders' },
            { icon: <ShieldCheckIcon className="h-7 w-7 text-[#2874f0]" />, title: '100% Genuine', sub: 'Authentic products only' },
            { icon: <ArrowPathIcon className="h-7 w-7 text-[#2874f0]" />, title: '7-Day Returns', sub: 'Hassle-free returns' },
            { icon: <PhoneIcon className="h-7 w-7 text-[#2874f0]" />, title: '24×7 Support', sub: '+977-9807000750' },
          ].map(b => (
            <div key={b.title} className="flex items-center gap-3 justify-center sm:justify-start">
              {b.icon}
              <div>
                <p className="text-sm font-bold text-gray-800">{b.title}</p>
                <p className="text-xs text-gray-500">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomePage;
