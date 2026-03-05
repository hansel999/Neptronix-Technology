import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: '4K Ultra HD CCTV Camera System',
    description: 'Professional 4K resolution security camera with night vision and weatherproof design',
    price: 299.99,
    originalPrice: 399.99,
    category: 'cctv-cameras',
    subcategory: 'dome-cameras',
    brand: 'SecureVision',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558000143-a78f8299c40b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=600&fit=crop'
    ],
    specifications: {
      'Resolution': '4K Ultra HD (3840x2160)',
      'Field of View': '110°',
      'Night Vision': 'Up to 100ft',
      'Weather Resistance': 'IP67',
      'Power': '12V DC',
      'Storage': 'Supports up to 2TB SD card',
      'Connectivity': 'WiFi, Ethernet',
      'Mobile App': 'iOS, Android'
    },
    features: [
      '4K Ultra HD resolution',
      'Advanced night vision',
      'Weatherproof design',
      'Motion detection alerts',
      'Two-way audio',
      'Cloud storage support',
      'Easy mobile app setup',
      'AI-powered person detection'
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.5,
    reviewCount: 128,
    isOnSale: true,
    discountPercentage: 25,
    tags: ['4k', 'outdoor', 'night-vision', 'weatherproof'],
    warranty: '2 Years Manufacturer Warranty',
    shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '2',
    name: 'Wireless Security Camera 2-Pack',
    description: 'Battery-powered wireless cameras with 1080p HD video and smart home integration',
    price: 199.99,
    category: 'cctv-cameras',
    subcategory: 'wireless-cameras',
    brand: 'TechGuard',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886f3b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562078809-c5391e3e79be?w=600&h=600&fit=crop'
    ],
    specifications: {
      'Resolution': '1080p Full HD',
      'Field of View': '130°',
      'Battery Life': 'Up to 6 months',
      'Weather Resistance': 'IP65',
      'Power': 'Battery + Solar option',
      'Storage': 'Cloud storage included',
      'Connectivity': 'WiFi 2.4GHz',
      'Mobile App': 'iOS, Android'
    },
    features: [
      'Completely wireless installation',
      'Long battery life',
      'Smart home integration',
      'Person detection',
      'Custom activity zones',
      'Two-way audio',
      'Night vision',
      'Free cloud storage'
    ],
    inStock: true,
    stockCount: 67,
    rating: 4.3,
    reviewCount: 89,
    isNew: true,
    tags: ['wireless', 'battery', 'smart-home', '1080p'],
    warranty: '1 Year Manufacturer Warranty',
    shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '3',
    name: 'PTZ Security Camera with 32x Zoom',
    description: 'Professional PTZ camera with powerful zoom and auto-tracking capabilities',
    price: 599.99,
    originalPrice: 799.99,
    category: 'cctv-cameras',
    subcategory: 'ptz-cameras',
    brand: 'ProView',
    images: [
      'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609743522471-83c84ce23e64?w=600&h=600&fit=crop'
    ],
    specifications: {
      'Resolution': '4K Ultra HD',
      'Optical Zoom': '32x',
      'Digital Zoom': '16x',
      'Pan Range': '355°',
      'Tilt Range': '90°',
      'Tracking': 'Auto-tracking',
      'Night Vision': 'Up to 300ft',
      'Power': '24V AC'
    },
    features: [
      '32x optical zoom',
      'Auto-tracking technology',
      '4K resolution',
      'Advanced night vision',
      'Preset positions',
      'Tour recording',
      'Motion tracking',
      'Professional grade'
    ],
    inStock: true,
    stockCount: 12,
    rating: 4.7,
    reviewCount: 56,
    isOnSale: true,
    discountPercentage: 25,
    tags: ['ptz', 'zoom', 'professional', 'tracking'],
    warranty: '3 Years Manufacturer Warranty',
    shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '4',
    name: 'Smart Doorbell Camera',
    description: 'Video doorbell with two-way audio and motion detection',
    price: 149.99,
    category: 'cctv-cameras',
    subcategory: 'doorbell-cameras',
    brand: 'DoorSecure',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?w=600&h=600&fit=crop'
    ],
    specifications: {
      'Resolution': '1080p HD',
      'Field of View': '160°',
      'Night Vision': 'Infrared',
      'Power': 'Hardwired',
      'Chime': 'Mechanical & Digital',
      'Connectivity': 'WiFi 2.4GHz',
      'Mobile App': 'iOS, Android'
    },
    features: [
      'Two-way audio communication',
      'Motion detection alerts',
      'Night vision',
      'Weather resistant',
      'Easy installation',
      'Smart chime',
      'Video recording',
      'Person detection'
    ],
    inStock: true,
    stockCount: 89,
    rating: 4.2,
    reviewCount: 203,
    tags: ['doorbell', 'two-way-audio', 'motion-detection'],
    warranty: '2 Years Manufacturer Warranty',
    shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '5',
    name: 'Network Video Recorder (NVR) 8-Channel',
    description: 'Professional NVR with 8 channels and 2TB pre-installed storage',
    price: 399.99,
    category: 'recording-devices',
    subcategory: 'nvr',
    brand: 'RecordTech',
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&h=600&fit=crop'
    ],
    specifications: {
      'Channels': '8',
      'Storage': '2TB Pre-installed',
      'Max Storage': '12TB',
      'Video Output': 'HDMI, VGA',
      'Network': 'Gigabit Ethernet',
      'Mobile Access': 'iOS, Android',
      'Compression': 'H.265+',
      'Playback': 'Simultaneous 8-channel'
    },
    features: [
      '8-channel recording',
      '2TB storage included',
      'H.265+ compression',
      'Mobile app access',
      'Easy setup',
      'Backup options',
      'Motion detection recording',
      'Professional grade'
    ],
    inStock: true,
    stockCount: 34,
    rating: 4.4,
    reviewCount: 67,
    tags: ['nvr', 'recording', 'storage', '8-channel'],
    warranty: '2 Years Manufacturer Warranty',
    shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '6',
    name: 'Security Camera Cable 100ft',
    description: 'Professional grade security camera cable with power and video',
    price: 29.99,
    category: 'accessories',
    subcategory: 'cables',
    brand: 'CablePro',
    images: [
      'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600&h=600&fit=crop'
    ],
    specifications: {
      'Length': '100 feet',
      'Type': 'Siamese Cable',
      'Connectors': 'BNC + DC Power',
      'Gauge': '18 AWG',
      'Weather Rating': 'Outdoor rated',
      'Color': 'White'
    },
    features: [
      'Power and video in one cable',
      'Weather resistant',
      'Professional grade',
      'Easy installation',
      '99% copper',
      'Shielded for interference protection'
    ],
    inStock: true,
    stockCount: 156,
    rating: 4.1,
    reviewCount: 45,
    tags: ['cable', 'power', 'video', '100ft'],
    warranty: '1 Year Warranty',
    shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '7',
    name: 'LED Security Light with Camera',
    description: 'Motion-activated LED security light with built-in camera',
    price: 89.99,
    originalPrice: 119.99,
    category: 'accessories',
    subcategory: 'security-lights',
    brand: 'LightGuard',
    images: [
      'https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop'
    ],
    specifications: {
      'Light Output': '2000 Lumens',
      'Camera Resolution': '1080p',
      'Detection Range': '30 feet',
      'Power': 'Hardwired 120V',
      'Weather Rating': 'IP65',
      'Color Temperature': '5000K',
      'Mobile App': 'iOS, Android'
    },
    features: [
      'Motion-activated lighting',
      'Built-in security camera',
      'Bright LED illumination',
      'Weather resistant',
      'Mobile app control',
      'Adjustable settings',
      'Easy installation',
      'Deterrent effect'
    ],
    inStock: true,
    stockCount: 78,
    rating: 4.3,
    reviewCount: 34,
    isOnSale: true,
    discountPercentage: 25,
    tags: ['led', 'security-light', 'camera', 'motion'],
    warranty: '2 Years Manufacturer Warranty',
    shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '8',
    name: 'Hard Drive 4TB Surveillance Grade',
    description: '24/7 surveillance hard drive designed for security systems',
    price: 129.99,
    category: 'accessories',
    subcategory: 'storage',
    brand: 'DataSecure',
    images: [
      'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&h=600&fit=crop'
    ],
    specifications: {
      'Capacity': '4TB',
      'Interface': 'SATA 6Gb/s',
      'Cache': '256MB',
      'RPM': '5400',
      'Workload Rating': '180TB/year',
      'Warranty': '3 Years',
      'Compatibility': 'All NVR/DVR systems'
    },
    features: [
      '24/7 operation designed',
      'High workload capacity',
      'Low power consumption',
      'Vibration protection',
      'Reliable performance',
      'Easy installation',
      'Wide compatibility',
      'Surveillance optimized'
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.6,
    reviewCount: 78,
    tags: ['hard-drive', 'storage', '4tb', 'surveillance'],
    warranty: '3 Years Manufacturer Warranty',
    shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '9',
    name: 'Dell Inspiron 15 Laptop',
    description: 'Intel Core i5 12th Gen, 8GB RAM, 512GB SSD, 15.6" FHD Display',
    price: 85000,
    originalPrice: 99000,
    category: 'laptops',
    subcategory: 'business-laptops',
    brand: 'Dell',
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop'],
    specifications: { 'Processor': 'Intel Core i5-1235U', 'RAM': '8GB DDR4', 'Storage': '512GB SSD', 'Display': '15.6" FHD IPS', 'OS': 'Windows 11 Home', 'Battery': '41WHr' },
    features: ['12th Gen Intel Core i5', '512GB NVMe SSD', 'Backlit keyboard', 'FHD Anti-glare display', 'Fast charging'],
    inStock: true, stockCount: 20, rating: 4.4, reviewCount: 112, isOnSale: true, discountPercentage: 14,
    tags: ['laptop', 'dell', 'intel', 'student'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '10',
    name: 'Samsung Galaxy S23 5G',
    description: '6.1" Dynamic AMOLED, Snapdragon 8 Gen 2, 128GB, 50MP Camera',
    price: 95000,
    originalPrice: 105000,
    category: 'mobile-phones',
    subcategory: 'android',
    brand: 'Samsung',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop'],
    specifications: { 'Display': '6.1" Dynamic AMOLED 2X', 'Processor': 'Snapdragon 8 Gen 2', 'RAM': '8GB', 'Storage': '128GB', 'Camera': '50MP + 12MP + 10MP', 'Battery': '3900mAh' },
    features: ['Snapdragon 8 Gen 2', '50MP triple camera', '5G connectivity', 'IP68 water resistance', 'Fast wireless charging'],
    inStock: true, stockCount: 35, rating: 4.6, reviewCount: 245, isNew: true,
    tags: ['samsung', '5g', 'android', 'flagship'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '11',
    name: 'LG 43" Smart TV 4K UHD',
    description: '43" 4K UHD Smart TV with ThinQ AI, HDR10, WebOS, Built-in Alexa',
    price: 65000,
    originalPrice: 75000,
    category: 'televisions',
    subcategory: 'smart-tv',
    brand: 'LG',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop'],
    specifications: { 'Screen Size': '43 inches', 'Resolution': '4K UHD (3840x2160)', 'HDR': 'HDR10 Pro', 'OS': 'WebOS', 'Ports': '3x HDMI, 2x USB', 'Audio': '20W' },
    features: ['4K UHD display', 'ThinQ AI', 'HDR10 Pro', 'Built-in Alexa & Google', 'Magic Remote included'],
    inStock: true, stockCount: 18, rating: 4.5, reviewCount: 189, isOnSale: true, discountPercentage: 13,
    tags: ['lg', 'smart-tv', '4k', 'webos'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '12',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancelling wireless headphones, 30hr battery',
    price: 42000,
    originalPrice: 52000,
    category: 'audio',
    subcategory: 'headphones',
    brand: 'Sony',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'],
    specifications: { 'Type': 'Over-ear wireless', 'Driver': '30mm', 'Battery': '30 hours', 'Charging': 'USB-C', 'Connectivity': 'Bluetooth 5.2', 'Weight': '250g' },
    features: ['Industry-leading ANC', '30hr battery life', 'Multipoint connection', 'Speak-to-chat', 'Foldable design'],
    inStock: true, stockCount: 25, rating: 4.8, reviewCount: 320, isOnSale: true, discountPercentage: 19,
    tags: ['sony', 'headphones', 'noise-cancelling', 'wireless'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '13',
    name: 'Dell 27" IPS Monitor FHD',
    description: '27" Full HD IPS Monitor, 75Hz, AMD FreeSync, HDMI, DisplayPort',
    price: 28000,
    originalPrice: 33000,
    category: 'monitors',
    subcategory: 'office-monitors',
    brand: 'Dell',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop'],
    specifications: { 'Size': '27 inches', 'Resolution': '1920x1080 FHD', 'Panel': 'IPS', 'Refresh Rate': '75Hz', 'Response Time': '5ms', 'Ports': 'HDMI, DisplayPort, VGA' },
    features: ['IPS panel', 'AMD FreeSync', '75Hz refresh rate', 'Tilt adjustable stand', 'VESA mountable'],
    inStock: true, stockCount: 30, rating: 4.3, reviewCount: 98, isNew: true,
    tags: ['dell', 'monitor', 'ips', 'fhd'], warranty: '3 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '14',
    name: 'HP LaserJet Pro Printer',
    description: 'Monochrome laser printer, 30ppm, WiFi, duplex, mobile printing',
    price: 22000,
    originalPrice: 26000,
    category: 'printers',
    subcategory: 'laser',
    brand: 'HP',
    images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=600&fit=crop'],
    specifications: { 'Type': 'Monochrome Laser', 'Speed': '30 ppm', 'Resolution': '600x600 dpi', 'Connectivity': 'WiFi, USB, Ethernet', 'Duplex': 'Automatic', 'Paper Capacity': '150 sheets' },
    features: ['30ppm print speed', 'Auto duplex printing', 'WiFi & Ethernet', 'Mobile printing', 'Energy Star certified'],
    inStock: true, stockCount: 22, rating: 4.2, reviewCount: 67, isOnSale: true, discountPercentage: 15,
    tags: ['hp', 'printer', 'laser', 'wifi'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '15',
    name: 'TP-Link WiFi 6 Router AX3000',
    description: 'Dual band WiFi 6 router, 3000Mbps, MU-MIMO, 4 antennas, gigabit ports',
    price: 12000,
    originalPrice: 15000,
    category: 'networking',
    subcategory: 'routers',
    brand: 'TP-Link',
    images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop'],
    specifications: { 'WiFi Standard': 'WiFi 6 (802.11ax)', 'Speed': 'AX3000 (574+2402 Mbps)', 'Bands': 'Dual Band', 'Ports': '1x WAN + 4x LAN Gigabit', 'Antennas': '4 external' },
    features: ['WiFi 6 technology', 'MU-MIMO & OFDMA', '4 gigabit LAN ports', 'Beamforming', 'Easy Tether app'],
    inStock: true, stockCount: 40, rating: 4.5, reviewCount: 156, isNew: true,
    tags: ['tp-link', 'wifi6', 'router', 'networking'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '16',
    name: 'APC 1000VA UPS Back-UPS',
    description: 'Line interactive UPS 1000VA/600W, 6 outlets, AVR, LCD display',
    price: 15000,
    originalPrice: 18000,
    category: 'ups-power',
    subcategory: 'ups',
    brand: 'APC',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'],
    specifications: { 'Capacity': '1000VA / 600W', 'Type': 'Line Interactive', 'Outlets': '6', 'Battery Backup': '~10 min at full load', 'Display': 'LCD', 'Connectivity': 'USB' },
    features: ['AVR voltage regulation', '6 protected outlets', 'LCD status display', 'USB connectivity', 'Hot-swappable battery'],
    inStock: true, stockCount: 28, rating: 4.4, reviewCount: 89, isOnSale: true, discountPercentage: 17,
    tags: ['apc', 'ups', 'power-backup', '1000va'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '17',
    name: 'Apple iPhone 14 128GB',
    description: 'A15 Bionic chip, 6.1" Super Retina XDR, 12MP dual camera, 5G',
    price: 135000,
    originalPrice: 149000,
    category: 'mobile-phones',
    subcategory: 'iphone',
    brand: 'Apple',
    images: ['https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=600&h=600&fit=crop'],
    specifications: { 'Chip': 'A15 Bionic', 'Display': '6.1" Super Retina XDR', 'Storage': '128GB', 'Camera': '12MP dual', 'Battery': '3279mAh', 'OS': 'iOS 16' },
    features: ['A15 Bionic chip', 'Crash Detection', 'Emergency SOS via satellite', 'Cinematic mode video', 'MagSafe compatible'],
    inStock: true, stockCount: 15, rating: 4.7, reviewCount: 412, isNew: true,
    tags: ['apple', 'iphone', '5g', 'ios'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '18',
    name: 'Samsung 55" QLED 4K TV',
    description: '55" QLED 4K Smart TV, Quantum HDR, 120Hz, Gaming Hub, Tizen OS',
    price: 115000,
    originalPrice: 135000,
    category: 'televisions',
    subcategory: 'smart-tv',
    brand: 'Samsung',
    images: ['https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=600&h=600&fit=crop'],
    specifications: { 'Size': '55 inches', 'Technology': 'QLED', 'Resolution': '4K UHD', 'Refresh Rate': '120Hz', 'HDR': 'Quantum HDR', 'OS': 'Tizen' },
    features: ['QLED Quantum Dot', '120Hz refresh rate', 'Gaming Hub', 'Dolby Atmos', 'Multiple voice assistants'],
    inStock: true, stockCount: 12, rating: 4.6, reviewCount: 278, isOnSale: true, discountPercentage: 15,
    tags: ['samsung', 'qled', '4k', '55inch'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '19',
    name: 'Lenovo IdeaPad Gaming Laptop',
    description: 'AMD Ryzen 5, RTX 3050, 16GB RAM, 512GB SSD, 144Hz display',
    price: 115000,
    originalPrice: 130000,
    category: 'laptops',
    subcategory: 'gaming-laptops',
    brand: 'Lenovo',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop'],
    specifications: { 'CPU': 'AMD Ryzen 5 6600H', 'GPU': 'NVIDIA RTX 3050', 'RAM': '16GB DDR5', 'Storage': '512GB NVMe SSD', 'Display': '15.6" FHD 144Hz' },
    features: ['RTX 3050 GPU', '144Hz gaming display', 'AMD Ryzen 5', 'Rapid Charge', 'Legion cooling system'],
    inStock: true, stockCount: 10, rating: 4.5, reviewCount: 134, isNew: true,
    tags: ['lenovo', 'gaming', 'rtx', 'ryzen'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },
  {
    id: '20',
    name: 'JBL Flip 6 Bluetooth Speaker',
    description: 'Portable waterproof speaker, 12hr battery, PartyBoost, IP67',
    price: 14500,
    originalPrice: 17000,
    category: 'audio',
    subcategory: 'speakers',
    brand: 'JBL',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop'],
    specifications: { 'Driver': 'Woofer + tweeter', 'Battery': '12 hours', 'Water Resistance': 'IP67', 'Connectivity': 'Bluetooth 5.1', 'Power Output': '30W' },
    features: ['IP67 waterproof', 'PartyBoost', '12hr playtime', 'USB-C charging', 'Bold JBL Pro Sound'],
    inStock: true, stockCount: 45, rating: 4.6, reviewCount: 223, isOnSale: true, discountPercentage: 15,
    tags: ['jbl', 'speaker', 'bluetooth', 'waterproof'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge'
  },

  // ── MOBILES ──
  { id: '21', name: 'Xiaomi Redmi Note 12 Pro', description: '6.67" AMOLED, Dimensity 1080, 50MP, 5000mAh, 67W fast charge', price: 42000, originalPrice: 48000, category: 'mobile-phones', subcategory: 'android', brand: 'Xiaomi', images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop'], specifications: { 'Display': '6.67" AMOLED 120Hz', 'Processor': 'Dimensity 1080', 'RAM': '8GB', 'Storage': '256GB', 'Camera': '50MP + 8MP + 2MP', 'Battery': '5000mAh 67W' }, features: ['120Hz AMOLED display', '67W turbo charging', '50MP OIS camera', '5000mAh battery', 'Gorilla Glass 5'], inStock: true, stockCount: 40, rating: 4.4, reviewCount: 187, isOnSale: true, discountPercentage: 13, tags: ['xiaomi', 'redmi', '5g', 'android'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '22', name: 'OnePlus 11 5G', description: 'Snapdragon 8 Gen 2, 16GB RAM, 256GB, 50MP Hasselblad, 100W charge', price: 108000, originalPrice: 120000, category: 'mobile-phones', subcategory: 'android', brand: 'OnePlus', images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop'], specifications: { 'Processor': 'Snapdragon 8 Gen 2', 'RAM': '16GB', 'Storage': '256GB', 'Camera': '50MP Hasselblad', 'Battery': '5000mAh 100W', 'Display': '6.7" QHD+ 120Hz' }, features: ['100W SuperVOOC', 'Hasselblad camera', 'Snapdragon 8 Gen 2', 'Alert slider', 'OxygenOS 13'], inStock: true, stockCount: 18, rating: 4.6, reviewCount: 204, isNew: true, tags: ['oneplus', '5g', 'flagship', 'snapdragon'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '23', name: 'Realme 11 Pro+ 5G', description: '200MP Sony camera, 6.7" AMOLED curved, Dimensity 7050, 100W', price: 55000, originalPrice: 62000, category: 'mobile-phones', subcategory: 'android', brand: 'Realme', images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop'], specifications: { 'Camera': '200MP Sony IMX890', 'Display': '6.7" AMOLED 120Hz curved', 'Processor': 'Dimensity 7050', 'Battery': '5000mAh 100W', 'RAM': '12GB' }, features: ['200MP Sony sensor', '100W fast charging', 'Curved AMOLED display', 'Dual stereo speakers', '5G connectivity'], inStock: true, stockCount: 25, rating: 4.3, reviewCount: 98, isOnSale: true, discountPercentage: 11, tags: ['realme', '200mp', '5g', 'android'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '24', name: 'Apple iPhone 15 Pro 256GB', description: 'A17 Pro chip, titanium design, 48MP, USB-C, Action Button', price: 185000, originalPrice: 199000, category: 'mobile-phones', subcategory: 'iphone', brand: 'Apple', images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop'], specifications: { 'Chip': 'A17 Pro', 'Display': '6.1" Super Retina XDR ProMotion', 'Storage': '256GB', 'Camera': '48MP main + 12MP ultrawide + 12MP 3x tele', 'Body': 'Titanium' }, features: ['A17 Pro chip', 'Titanium design', 'USB-C', 'Action Button', 'ProRes video'], inStock: true, stockCount: 10, rating: 4.9, reviewCount: 532, isNew: true, tags: ['apple', 'iphone15', 'pro', 'titanium'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── LAPTOPS ──
  { id: '25', name: 'HP Pavilion 15 Laptop', description: 'Intel Core i7 12th Gen, 16GB RAM, 1TB SSD, NVIDIA MX550, 15.6" FHD', price: 110000, originalPrice: 125000, category: 'laptops', subcategory: 'business-laptops', brand: 'HP', images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop'], specifications: { 'Processor': 'Intel Core i7-1255U', 'RAM': '16GB DDR4', 'Storage': '1TB SSD', 'GPU': 'NVIDIA MX550 2GB', 'Display': '15.6" FHD IPS 144Hz' }, features: ['12th Gen Core i7', 'NVIDIA MX550 GPU', '144Hz display', 'Bang & Olufsen audio', 'HP Fast Charge'], inStock: true, stockCount: 15, rating: 4.4, reviewCount: 143, isOnSale: true, discountPercentage: 12, tags: ['hp', 'laptop', 'i7', 'nvidia'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '26', name: 'Asus VivoBook 15 OLED', description: 'Ryzen 5 5600H, 16GB RAM, 512GB SSD, 15.6" 2.8K OLED 120Hz', price: 92000, originalPrice: 105000, category: 'laptops', subcategory: 'ultrabooks', brand: 'Asus', images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop'], specifications: { 'Processor': 'AMD Ryzen 5 5600H', 'RAM': '16GB', 'Storage': '512GB NVMe', 'Display': '15.6" 2.8K OLED 120Hz', 'Weight': '1.8kg' }, features: ['2.8K OLED display', 'AMD Ryzen 5', '120Hz refresh', 'Backlit keyboard', 'Fast charging 90min'], inStock: true, stockCount: 20, rating: 4.5, reviewCount: 167, isOnSale: true, discountPercentage: 12, tags: ['asus', 'oled', 'ryzen', 'vivobook'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '27', name: 'Acer Aspire 7 Gaming Laptop', description: 'Ryzen 5 5500U, RTX 2050, 16GB RAM, 512GB SSD, 15.6" FHD 144Hz', price: 98000, originalPrice: 112000, category: 'laptops', subcategory: 'gaming-laptops', brand: 'Acer', images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop'], specifications: { 'CPU': 'AMD Ryzen 5 5500U', 'GPU': 'NVIDIA RTX 2050', 'RAM': '16GB DDR4', 'Display': '15.6" FHD 144Hz' }, features: ['RTX 2050 GPU', '144Hz gaming display', 'AMD Ryzen 5', 'DTS Audio', 'Fingerprint reader'], inStock: true, stockCount: 12, rating: 4.3, reviewCount: 89, isNew: true, tags: ['acer', 'gaming', 'rtx', 'ryzen'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '28', name: 'Apple MacBook Air M2', description: 'M2 chip, 8GB RAM, 256GB SSD, 13.6" Liquid Retina, 18hr battery', price: 165000, originalPrice: 180000, category: 'laptops', subcategory: 'ultrabooks', brand: 'Apple', images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop'], specifications: { 'Chip': 'Apple M2', 'RAM': '8GB unified', 'Storage': '256GB SSD', 'Display': '13.6" Liquid Retina', 'Battery': '18 hours', 'Weight': '1.24kg' }, features: ['Apple M2 chip', '18hr battery', 'Fanless design', 'MagSafe charging', 'Touch ID'], inStock: true, stockCount: 8, rating: 4.9, reviewCount: 456, isOnSale: true, discountPercentage: 8, tags: ['apple', 'macbook', 'm2', 'ultrabook'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── TELEVISIONS ──
  { id: '29', name: 'Sony Bravia 55" OLED TV', description: '55" 4K OLED, XR Processor, Dolby Vision, HDMI 2.1, Google TV', price: 195000, originalPrice: 225000, category: 'televisions', subcategory: 'oled-tv', brand: 'Sony', images: ['https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=600&h=600&fit=crop'], specifications: { 'Size': '55"', 'Panel': 'OLED', 'Resolution': '4K', 'Processor': 'XR Cognitive', 'OS': 'Google TV', 'Audio': 'Dolby Atmos 50W' }, features: ['OLED perfect black', 'XR Cognitive Processor', 'HDMI 2.1 Gaming', 'Dolby Vision & Atmos', 'Google TV'], inStock: true, stockCount: 6, rating: 4.8, reviewCount: 312, isOnSale: true, discountPercentage: 13, tags: ['sony', 'oled', '4k', 'google-tv'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '30', name: 'Himstar 43" Smart LED TV', description: '43" Full HD Smart TV, Android 11, 20W audio, WiFi, 3x HDMI', price: 32000, originalPrice: 40000, category: 'televisions', subcategory: 'led-tv', brand: 'Himstar', images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop'], specifications: { 'Size': '43"', 'Resolution': 'Full HD 1080p', 'OS': 'Android 11', 'Audio': '20W stereo', 'Ports': '3x HDMI, 2x USB' }, features: ['Android 11 Smart TV', 'Google Play Store', 'Chromecast built-in', 'Dolby Audio', 'Voice remote'], inStock: true, stockCount: 30, rating: 4.1, reviewCount: 145, isOnSale: true, discountPercentage: 20, tags: ['himstar', 'smart-tv', 'fhd', 'android'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '31', name: 'TCL 65" QLED 4K TV', description: '65" QLED 4K, Mini LED, 144Hz, Dolby Vision IQ, Google TV, HDMI 2.1', price: 145000, originalPrice: 170000, category: 'televisions', subcategory: 'smart-tv', brand: 'TCL', images: ['https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=600&h=600&fit=crop'], specifications: { 'Size': '65"', 'Technology': 'QLED Mini LED', 'Refresh Rate': '144Hz', 'OS': 'Google TV', 'HDR': 'Dolby Vision IQ' }, features: ['Mini LED backlight', '144Hz gaming', 'Dolby Vision IQ', 'HDMI 2.1 4K@144Hz', 'Onkyo audio system'], inStock: true, stockCount: 8, rating: 4.6, reviewCount: 198, isNew: true, tags: ['tcl', 'qled', '65inch', '4k'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── AUDIO ──
  { id: '32', name: 'Bose QuietComfort 45 Headphones', description: 'Premium ANC headphones, 24hr battery, multipoint, Aware Mode', price: 48000, originalPrice: 58000, category: 'audio', subcategory: 'headphones', brand: 'Bose', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'], specifications: { 'Type': 'Over-ear wireless', 'ANC': 'Quiet & Aware modes', 'Battery': '24 hours', 'Connectivity': 'Bluetooth 5.1', 'Charging': 'USB-C' }, features: ['World-class ANC', 'Aware Mode', '24hr battery', 'Multipoint connection', 'Foldable design'], inStock: true, stockCount: 18, rating: 4.7, reviewCount: 289, isOnSale: true, discountPercentage: 17, tags: ['bose', 'anc', 'headphones', 'wireless'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '33', name: 'Sennheiser HD 560S Headphones', description: 'Open-back audiophile headphones, 38Ω, wide soundstage, foldable', price: 22000, originalPrice: 28000, category: 'audio', subcategory: 'headphones', brand: 'Sennheiser', images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop'], specifications: { 'Type': 'Open-back over-ear', 'Impedance': '38Ω', 'Driver': '38mm', 'Frequency': '6-38,000 Hz', 'Cable': '3m detachable' }, features: ['Open-back design', 'Wide soundstage', 'Low distortion', 'E.A.R. technology', 'Foldable earcups'], inStock: true, stockCount: 22, rating: 4.6, reviewCount: 134, tags: ['sennheiser', 'audiophile', 'open-back', 'headphones'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '34', name: 'Marshall Stanmore III Bluetooth Speaker', description: 'Iconic home speaker, 80W RMS, Bluetooth 5.2, gold knobs, phono input', price: 38000, originalPrice: 45000, category: 'audio', subcategory: 'speakers', brand: 'Marshall', images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop'], specifications: { 'Power': '80W RMS', 'Connectivity': 'Bluetooth 5.2, Analog, RCA', 'Dimensions': '34.9 x 19.5 x 18.7cm', 'Weight': '4.15kg' }, features: ['80W powerful sound', 'Iconic Marshall look', 'Bluetooth 5.2', 'Multi-host', 'Phono/RCA input'], inStock: true, stockCount: 12, rating: 4.7, reviewCount: 167, isOnSale: true, discountPercentage: 16, tags: ['marshall', 'speaker', 'bluetooth', 'home'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '35', name: 'Sony HT-S400 Soundbar', description: '2.1ch soundbar with subwoofer, 330W, Dolby Atmos, Bluetooth', price: 35000, originalPrice: 42000, category: 'audio', subcategory: 'home-theatre', brand: 'Sony', images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=600&fit=crop'], specifications: { 'Channels': '2.1ch', 'Power': '330W total', 'Audio': 'Dolby Atmos, DTS:X', 'Connectivity': 'Bluetooth, HDMI ARC, Optical' }, features: ['330W total power', 'Wireless subwoofer', 'Dolby Atmos', 'HDMI ARC', 'Sound Field optimization'], inStock: true, stockCount: 16, rating: 4.5, reviewCount: 213, isOnSale: true, discountPercentage: 17, tags: ['sony', 'soundbar', 'dolby', 'subwoofer'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── MONITORS ──
  { id: '36', name: 'LG 27" UltraGear 4K Gaming Monitor', description: '27" 4K IPS, 144Hz, 1ms GTG, HDR600, HDMI 2.1, G-Sync Compatible', price: 68000, originalPrice: 80000, category: 'monitors', subcategory: 'gaming-monitors', brand: 'LG', images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop'], specifications: { 'Size': '27"', 'Resolution': '4K UHD', 'Panel': 'IPS', 'Refresh Rate': '144Hz', 'Response': '1ms GTG', 'HDR': 'HDR600' }, features: ['4K 144Hz IPS', '1ms response', 'HDMI 2.1', 'G-Sync Compatible', 'HDR600'], inStock: true, stockCount: 14, rating: 4.7, reviewCount: 201, isOnSale: true, discountPercentage: 15, tags: ['lg', 'monitor', '4k', 'gaming'], warranty: '3 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '37', name: 'Samsung 32" Curved VA Monitor', description: '32" FHD curved VA, 165Hz, 1ms, AMD FreeSync Premium, USB hub', price: 38000, originalPrice: 46000, category: 'monitors', subcategory: 'gaming-monitors', brand: 'Samsung', images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop'], specifications: { 'Size': '32"', 'Curvature': '1500R', 'Resolution': 'FHD 1920x1080', 'Refresh Rate': '165Hz', 'Panel': 'VA' }, features: ['1500R curved panel', '165Hz refresh rate', 'AMD FreeSync Premium', '1ms MPRT', 'USB hub'], inStock: true, stockCount: 20, rating: 4.5, reviewCount: 178, isOnSale: true, discountPercentage: 17, tags: ['samsung', 'curved', '165hz', 'gaming'], warranty: '3 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '38', name: 'Acer 24" IPS Full HD Monitor', description: '24" FHD IPS, 75Hz, AMD FreeSync, HDMI, VGA, eye care display', price: 18000, originalPrice: 22000, category: 'monitors', subcategory: 'office-monitors', brand: 'Acer', images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop'], specifications: { 'Size': '24"', 'Resolution': 'FHD 1920x1080', 'Panel': 'IPS', 'Refresh Rate': '75Hz', 'Ports': 'HDMI, VGA' }, features: ['IPS wide-view panel', 'AMD FreeSync', 'Flicker-free', 'BluelightShield', 'VESA mountable'], inStock: true, stockCount: 35, rating: 4.2, reviewCount: 112, isOnSale: true, discountPercentage: 18, tags: ['acer', 'monitor', 'ips', 'office'], warranty: '3 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '39', name: 'BenQ 27" PD2705Q Designer Monitor', description: '27" QHD IPS, 100Hz, 99% sRGB, USB-C 65W, Calman Verified', price: 72000, originalPrice: 85000, category: 'monitors', subcategory: 'office-monitors', brand: 'BenQ', images: ['https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&h=600&fit=crop'], specifications: { 'Size': '27"', 'Resolution': 'QHD 2560x1440', 'Panel': 'IPS', 'Color': '99% sRGB', 'USB-C': '65W PD' }, features: ['Calman Verified color', '99% sRGB', 'USB-C 65W', 'KVM switch', 'Ergonomic stand'], inStock: true, stockCount: 10, rating: 4.8, reviewCount: 95, tags: ['benq', 'designer', 'qhd', 'usbc'], warranty: '3 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── CCTV ──
  { id: '40', name: 'Hikvision 8CH NVR Kit with 4 IP Cameras', description: '8-channel NVR, 4x 4MP IP cameras, 2TB HDD, PoE switch included', price: 45000, originalPrice: 55000, category: 'complete-kits', subcategory: 'ip-kits', brand: 'Hikvision', images: ['https://images.unsplash.com/photo-1558000143-a78f8299c40b?w=600&h=600&fit=crop'], specifications: { 'NVR': '8CH 4K NVR', 'Cameras': '4x 4MP IP Dome', 'Storage': '2TB HDD', 'Resolution': '4MP (2560x1440)', 'PoE': '4x PoE ports' }, features: ['8-channel NVR', '4MP IP cameras', '2TB HDD included', 'PoE powered cameras', 'Mobile app access'], inStock: true, stockCount: 15, rating: 4.6, reviewCount: 234, isOnSale: true, discountPercentage: 18, tags: ['hikvision', 'nvr', 'kit', 'ip-camera'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '41', name: 'Dahua 5MP Bullet Camera', description: 'IP67 outdoor bullet camera, 5MP, IR 60m, H.265+, PoE', price: 8500, originalPrice: 11000, category: 'cctv-cameras', subcategory: 'bullet-cameras', brand: 'Dahua', images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop'], specifications: { 'Resolution': '5MP', 'Type': 'Bullet', 'IR Range': '60m', 'Weatherproof': 'IP67', 'Compression': 'H.265+', 'Power': 'PoE/12VDC' }, features: ['5MP resolution', '60m IR night vision', 'IP67 weatherproof', 'H.265+ compression', 'Smart detection'], inStock: true, stockCount: 50, rating: 4.5, reviewCount: 167, isOnSale: true, discountPercentage: 23, tags: ['dahua', 'bullet', 'outdoor', '5mp'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '42', name: 'CP Plus 2MP PTZ Speed Dome Camera', description: '2MP PTZ, 36x optical zoom, 200m IR, IP66, H.265, auto tracking', price: 32000, originalPrice: 40000, category: 'cctv-cameras', subcategory: 'ptz-cameras', brand: 'CP Plus', images: ['https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=600&fit=crop'], specifications: { 'Resolution': '2MP 1080p', 'Zoom': '36x Optical', 'IR Range': '200m', 'Pan/Tilt': '360° continuous pan', 'IP': 'IP66' }, features: ['36x optical zoom', '200m IR range', 'Auto tracking', '360° pan', 'Smart motion detection'], inStock: true, stockCount: 10, rating: 4.4, reviewCount: 89, isOnSale: true, discountPercentage: 20, tags: ['cpplus', 'ptz', 'zoom', 'speed-dome'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '43', name: 'Reolink 4K WiFi Camera', description: 'Wireless 4K camera, color night vision, AI detection, two-way audio', price: 9500, originalPrice: 12000, category: 'cctv-cameras', subcategory: 'wireless-cameras', brand: 'Reolink', images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop'], specifications: { 'Resolution': '4K 8MP', 'Connectivity': 'WiFi 2.4/5GHz', 'Night Vision': 'Color night vision', 'Detection': 'Person/Vehicle AI', 'Audio': 'Two-way' }, features: ['4K resolution', 'Color night vision', 'AI smart detection', 'Two-way audio', 'Free cloud storage'], inStock: true, stockCount: 35, rating: 4.5, reviewCount: 198, isOnSale: true, discountPercentage: 21, tags: ['reolink', 'wireless', '4k', 'wifi'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '44', name: 'Hikvision 16CH DVR 1080p', description: '16-channel DVR, H.265+, supports 1080p AHD/TVI/CVI, 2HDD bays', price: 22000, originalPrice: 28000, category: 'recording-devices', subcategory: 'dvr', brand: 'Hikvision', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Channels': '16', 'Resolution': '1080p', 'Compression': 'H.265+', 'HDD Bays': '2 (up to 8TB each)', 'Output': 'HDMI 4K, VGA' }, features: ['16 channel recording', 'H.265+ compression', 'Smart playback', 'Mobile remote view', '4K HDMI output'], inStock: true, stockCount: 20, rating: 4.4, reviewCount: 123, isOnSale: true, discountPercentage: 21, tags: ['hikvision', 'dvr', '16ch', '1080p'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '45', name: 'Dahua 8CH NVR 4K', description: '8-channel NVR, 4K output, H.265+, 2HDD bays, supports 8MP cameras', price: 18500, originalPrice: 23000, category: 'recording-devices', subcategory: 'nvr', brand: 'Dahua', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Channels': '8', 'Max Resolution': '4K 8MP', 'Compression': 'H.265+', 'HDD': '2x SATA up to 8TB', 'Network': '1 RJ-45 Gigabit' }, features: ['8-channel 4K NVR', 'Supports 8MP cameras', 'AI smart search', '2x HDD bays', 'P2P remote access'], inStock: true, stockCount: 22, rating: 4.5, reviewCount: 98, isOnSale: true, discountPercentage: 20, tags: ['dahua', 'nvr', '8ch', '4k'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── PRINTERS ──
  { id: '46', name: 'Canon PIXMA G3020 Ink Tank Printer', description: 'Refillable ink tank, color print/scan/copy, WiFi, 4800dpi', price: 18500, originalPrice: 22000, category: 'printers', subcategory: 'inkjet', brand: 'Canon', images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=600&fit=crop'], specifications: { 'Type': 'Inkjet Tank', 'Functions': 'Print, Scan, Copy', 'Resolution': '4800x1200 dpi', 'Connectivity': 'WiFi, USB', 'Pages': '6000 black / 7700 color' }, features: ['Refillable ink tank', 'Low cost printing', 'WiFi printing', 'Flat-bed scanner', 'Mobile printing'], inStock: true, stockCount: 28, rating: 4.3, reviewCount: 156, isOnSale: true, discountPercentage: 16, tags: ['canon', 'printer', 'ink-tank', 'wifi'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '47', name: 'Epson EcoTank L3250 Printer', description: 'Print/scan/copy, WiFi Direct, 5760dpi, ultra-low cost per page', price: 22000, originalPrice: 26500, category: 'printers', subcategory: 'inkjet', brand: 'Epson', images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=600&fit=crop'], specifications: { 'Type': 'EcoTank Inkjet', 'Functions': 'Print/Scan/Copy', 'Resolution': '5760x1440 dpi', 'WiFi': 'WiFi Direct', 'Yield': '4500 black / 7500 color' }, features: ['EcoTank refillable', 'WiFi Direct', 'Mobile printing', 'Ultra-low cost/page', 'Borderless printing'], inStock: true, stockCount: 32, rating: 4.4, reviewCount: 189, isOnSale: true, discountPercentage: 17, tags: ['epson', 'ecotank', 'printer', 'wifi'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '48', name: 'Brother HL-L2350DW Laser Printer', description: 'Monochrome laser, 32ppm, auto duplex, WiFi, 250-sheet tray', price: 19500, originalPrice: 24000, category: 'printers', subcategory: 'laser', brand: 'Brother', images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=600&fit=crop'], specifications: { 'Type': 'Mono Laser', 'Speed': '32ppm', 'Duplex': 'Auto', 'Connectivity': 'WiFi, USB', 'Paper': '250-sheet tray' }, features: ['32ppm fast printing', 'Auto duplex', 'WiFi & mobile print', '250-sheet capacity', 'Energy Save mode'], inStock: true, stockCount: 25, rating: 4.3, reviewCount: 112, isOnSale: true, discountPercentage: 19, tags: ['brother', 'laser', 'duplex', 'wifi'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── NETWORKING ──
  { id: '49', name: 'Cisco RV340 Dual WAN VPN Router', description: 'Business router, dual WAN, 25 VPN tunnels, gigabit, SD-WAN', price: 32000, originalPrice: 40000, category: 'networking', subcategory: 'routers', brand: 'Cisco', images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop'], specifications: { 'WAN': 'Dual WAN gigabit', 'VPN': '25 IPsec tunnels', 'LAN': '4x Gigabit', 'USB': '2x USB 3.0', 'SD-WAN': 'Cisco SD-WAN' }, features: ['Dual WAN failover', '25 VPN tunnels', 'SD-WAN ready', 'Advanced firewall', 'Cloud management'], inStock: true, stockCount: 12, rating: 4.5, reviewCount: 67, tags: ['cisco', 'vpn', 'router', 'business'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '50', name: 'Netgear 24-Port Gigabit Switch', description: 'Unmanaged 24-port gigabit switch, fanless, plug and play, rack mount', price: 14000, originalPrice: 18000, category: 'networking', subcategory: 'switches', brand: 'Netgear', images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop'], specifications: { 'Ports': '24x Gigabit RJ-45', 'Type': 'Unmanaged', 'Form Factor': 'Rack-mountable 1U', 'Power': 'Internal, fanless', 'Switching Capacity': '48Gbps' }, features: ['24 gigabit ports', 'Fanless quiet operation', 'Plug and play', 'Rack mountable', 'Green Ethernet'], inStock: true, stockCount: 20, rating: 4.4, reviewCount: 89, isOnSale: true, discountPercentage: 22, tags: ['netgear', 'switch', 'gigabit', 'rack'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '51', name: 'Ubiquiti UniFi AP AC Pro', description: 'Enterprise WiFi access point, dual-band AC1750, PoE, indoor/outdoor', price: 28000, originalPrice: 34000, category: 'networking', subcategory: 'access-points', brand: 'Ubiquiti', images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=600&fit=crop'], specifications: { 'WiFi': 'AC1750 Dual-band', '2.4GHz': '450Mbps', '5GHz': '1300Mbps', 'PoE': '802.3af/at', 'Users': '200+ concurrent' }, features: ['Enterprise-grade WiFi', '200+ concurrent users', 'PoE powered', 'Unifi controller', 'VLAN support'], inStock: true, stockCount: 15, rating: 4.7, reviewCount: 145, tags: ['ubiquiti', 'unifi', 'access-point', 'enterprise'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '52', name: 'D-Link 8-Port PoE Switch', description: '8-port 10/100 PoE switch + 2 uplink, 65W budget, plug and play', price: 8500, originalPrice: 11000, category: 'networking', subcategory: 'switches', brand: 'D-Link', images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop'], specifications: { 'Ports': '8x PoE + 2x uplink', 'PoE Budget': '65W', 'Speed': '10/100Mbps', 'Type': 'Unmanaged' }, features: ['8 PoE ports', '65W PoE budget', 'Plug and play', 'Powers IP cameras', 'Compact desktop'], inStock: true, stockCount: 40, rating: 4.3, reviewCount: 112, isOnSale: true, discountPercentage: 23, tags: ['dlink', 'poe', 'switch', 'camera'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── STORAGE ──
  { id: '53', name: 'Seagate 2TB BarraCuda HDD', description: '2TB 3.5" desktop hard drive, 7200RPM, SATA 6Gb/s, 256MB cache', price: 7500, originalPrice: 9500, category: 'storage', subcategory: 'hdd', brand: 'Seagate', images: ['https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&h=600&fit=crop'], specifications: { 'Capacity': '2TB', 'Form Factor': '3.5"', 'RPM': '7200', 'Interface': 'SATA 6Gb/s', 'Cache': '256MB' }, features: ['7200RPM performance', '256MB cache', 'Multi-tier caching', 'Rescue data recovery', '3-year warranty'], inStock: true, stockCount: 60, rating: 4.3, reviewCount: 234, isOnSale: true, discountPercentage: 21, tags: ['seagate', 'hdd', '2tb', 'desktop'], warranty: '3 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '54', name: 'WD Blue 1TB SSD', description: '1TB 2.5" SATA SSD, 560MB/s read, 530MB/s write, 5-year warranty', price: 12500, originalPrice: 16000, category: 'storage', subcategory: 'ssd', brand: 'WD', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Capacity': '1TB', 'Interface': 'SATA 6Gb/s', 'Read Speed': '560MB/s', 'Write Speed': '530MB/s', 'Form Factor': '2.5"' }, features: ['560MB/s read speed', 'Energy efficient', '1.75M hours MTTF', 'shock resistant', '5-year warranty'], inStock: true, stockCount: 45, rating: 4.5, reviewCount: 312, isOnSale: true, discountPercentage: 22, tags: ['wd', 'ssd', '1tb', 'sata'], warranty: '5 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '55', name: 'Samsung 970 EVO Plus 1TB NVMe SSD', description: '1TB NVMe M.2 SSD, 3500MB/s read, PCIe 3.0, V-NAND technology', price: 18000, originalPrice: 22000, category: 'storage', subcategory: 'ssd', brand: 'Samsung', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Capacity': '1TB', 'Interface': 'NVMe PCIe 3.0 x4', 'Read': '3500MB/s', 'Write': '3300MB/s', 'Form': 'M.2 2280' }, features: ['3500MB/s sequential read', 'V-NAND technology', 'NVMe interface', 'Thermal control', '5-year warranty'], inStock: true, stockCount: 38, rating: 4.8, reviewCount: 445, isOnSale: true, discountPercentage: 18, tags: ['samsung', 'nvme', 'ssd', 'm2'], warranty: '5 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '56', name: 'SanDisk 128GB Ultra USB 3.0 Pen Drive', description: '128GB USB 3.0 flash drive, 130MB/s read, compact, durable', price: 2800, originalPrice: 3800, category: 'storage', subcategory: 'pen-drives', brand: 'SanDisk', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Capacity': '128GB', 'Interface': 'USB 3.0', 'Read Speed': '130MB/s', 'Dimensions': '58.1x21.9x11.5mm' }, features: ['130MB/s fast transfers', 'USB 3.0', 'SecureAccess software', 'RescuePRO Deluxe', '5-year warranty'], inStock: true, stockCount: 80, rating: 4.4, reviewCount: 567, isOnSale: true, discountPercentage: 26, tags: ['sandisk', 'pendrive', 'usb3', '128gb'], warranty: '5 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── UPS / POWER ──
  { id: '57', name: 'CyberPower 1500VA UPS', description: 'Line interactive 1500VA/900W, 12 outlets, LCD, GreenPower UPS', price: 18000, originalPrice: 22000, category: 'ups-power', subcategory: 'ups', brand: 'CyberPower', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'], specifications: { 'Capacity': '1500VA / 900W', 'Type': 'Line Interactive', 'Outlets': '12', 'LCD': 'Yes', 'USB': 'Yes' }, features: ['1500VA / 900W', '12 protected outlets', 'GreenPower technology', 'LCD panel', 'Hot-swap battery'], inStock: true, stockCount: 22, rating: 4.4, reviewCount: 98, isOnSale: true, discountPercentage: 18, tags: ['cyberpower', 'ups', '1500va', 'lcd'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '58', name: 'Eaton 5E 650VA UPS', description: 'Offline UPS 650VA/360W, 6 outlets, USB, ideal for home & SOHO', price: 8500, originalPrice: 11000, category: 'ups-power', subcategory: 'ups', brand: 'Eaton', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'], specifications: { 'Capacity': '650VA / 360W', 'Type': 'Offline', 'Outlets': '6', 'USB Port': 'USB-A for charging' }, features: ['650VA capacity', '6 AC outlets', 'USB charging', 'LED status indicators', 'Eco mode'], inStock: true, stockCount: 35, rating: 4.2, reviewCount: 134, isOnSale: true, discountPercentage: 23, tags: ['eaton', 'ups', '650va', 'home'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '59', name: 'Luminous 800VA Home UPS', description: '800VA/500W home UPS, pure sine wave, fast charging, LED display', price: 7500, originalPrice: 9500, category: 'ups-power', subcategory: 'ups', brand: 'Luminous', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'], specifications: { 'Capacity': '800VA / 500W', 'Output': 'Pure Sine Wave', 'Battery': 'External battery supported', 'Display': 'LED indicators' }, features: ['Pure sine wave output', 'Fast battery charging', 'Overload protection', 'Short circuit protection', 'LED display'], inStock: true, stockCount: 40, rating: 4.3, reviewCount: 167, isOnSale: true, discountPercentage: 21, tags: ['luminous', 'ups', 'sinewave', 'home'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── SMART HOME ──
  { id: '60', name: 'Amazon Echo Dot 5th Gen', description: 'Smart speaker with Alexa, improved bass, motion detection, eero WiFi', price: 5500, originalPrice: 7000, category: 'smart-home', subcategory: 'smart-speakers', brand: 'Amazon', images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=600&fit=crop'], specifications: { 'Voice Assistant': 'Alexa', 'Connectivity': 'WiFi, Bluetooth', 'Motion': 'Built-in motion sensor', 'Audio': 'Improved bass speaker' }, features: ['Alexa voice control', 'Motion detection', 'eero WiFi extender', 'Smart home hub', 'Improved audio'], inStock: true, stockCount: 55, rating: 4.5, reviewCount: 389, isOnSale: true, discountPercentage: 21, tags: ['amazon', 'alexa', 'smart-speaker', 'echo'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '61', name: 'TP-Link Tapo Smart Plug', description: 'WiFi smart plug, energy monitoring, voice control, timer, schedules', price: 1800, originalPrice: 2500, category: 'smart-home', subcategory: 'smart-plugs', brand: 'TP-Link', images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=600&fit=crop'], specifications: { 'Connectivity': 'WiFi 2.4GHz', 'Max Load': '2300W / 10A', 'Voice': 'Alexa, Google, Siri', 'Energy': 'Monitoring' }, features: ['Energy monitoring', 'Alexa & Google Home', 'Timer & schedules', 'Away mode', 'App control'], inStock: true, stockCount: 80, rating: 4.4, reviewCount: 234, isOnSale: true, discountPercentage: 28, tags: ['tp-link', 'smart-plug', 'wifi', 'alexa'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '62', name: 'Philips Hue White & Color Smart Bulb', description: 'E27 smart bulb, 16M colors, 800 lumens, Zigbee, voice & app control', price: 4500, originalPrice: 6000, category: 'smart-home', subcategory: 'smart-lights', brand: 'Philips', images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=600&fit=crop'], specifications: { 'Base': 'E27', 'Colors': '16 million', 'Brightness': '800 lumens', 'Protocol': 'Zigbee', 'Watt': '9W (=60W equivalent)' }, features: ['16M color options', 'Voice control', 'App scheduling', 'Sync with movies/music', 'Energy efficient'], inStock: true, stockCount: 60, rating: 4.6, reviewCount: 312, isOnSale: true, discountPercentage: 25, tags: ['philips', 'hue', 'smart-bulb', 'rgb'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── ACCESSORIES ──
  { id: '63', name: 'Hikvision CCTV Coaxial Cable 100m', description: '100m RG59 coaxial cable with power, suitable for CCTV installation', price: 3500, originalPrice: 4500, category: 'accessories', subcategory: 'cables', brand: 'Hikvision', images: ['https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600&h=600&fit=crop'], specifications: { 'Type': 'RG59 + Power', 'Length': '100m', 'Conductor': '0.81mm CCS', 'Shield': '95% coverage' }, features: ['100m roll', 'Power + video combined', 'Pre-made connectors', 'UV resistant jacket', 'Easy installation'], inStock: true, stockCount: 50, rating: 4.2, reviewCount: 89, isOnSale: true, discountPercentage: 22, tags: ['hikvision', 'cable', 'rg59', 'coaxial'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '64', name: 'Dahua Camera Wall Mount Bracket', description: 'Adjustable wall/ceiling mount for dome & bullet cameras, heavy duty', price: 850, originalPrice: 1200, category: 'accessories', subcategory: 'mounts', brand: 'Dahua', images: ['https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600&h=600&fit=crop'], specifications: { 'Material': 'Iron + Zinc coating', 'Load': 'Up to 5kg', 'Adjustable': 'Pan & tilt', 'Compatibility': 'All standard cameras' }, features: ['Heavy duty iron', 'Adjustable angle', 'Universal fit', 'Anti-rust coating', 'Easy installation'], inStock: true, stockCount: 100, rating: 4.3, reviewCount: 145, isOnSale: true, discountPercentage: 29, tags: ['dahua', 'bracket', 'mount', 'cctv'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '65', name: 'CP Plus SMPS 12V 5A Power Supply', description: 'CCTV power supply box 12V DC 5A, for up to 4 cameras, metal box', price: 1200, originalPrice: 1600, category: 'accessories', subcategory: 'power', brand: 'CP Plus', images: ['https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600&h=600&fit=crop'], specifications: { 'Output': '12V DC / 5A', 'Channels': '4 outputs', 'Input': '100-240V AC', 'Box': 'Metal enclosure', 'Protection': 'Short circuit, overload' }, features: ['4-camera power box', '12V DC output', 'Short circuit protection', 'Metal enclosure', 'LED indicator'], inStock: true, stockCount: 75, rating: 4.2, reviewCount: 198, isOnSale: true, discountPercentage: 25, tags: ['cpplus', 'power-supply', '12v', 'smps'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── AUDIO: Boat, Audio-Technica, Harman, Yamaha, Philips ──
  { id: '66', name: 'Boat Rockerz 450 Bluetooth Headphones', description: 'On-ear wireless headphones, 40hr battery, 40mm drivers, foldable', price: 1799, originalPrice: 3000, category: 'audio', subcategory: 'headphones', brand: 'Boat', images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop'], specifications: { 'Type': 'On-ear wireless', 'Battery': '40 hours', 'Driver': '40mm', 'Connectivity': 'Bluetooth 5.0', 'Charging': 'USB-C' }, features: ['40hr battery life', 'Foldable design', 'IPX4 water resistant', 'Voice assistant support', 'Dual pairing'], inStock: true, stockCount: 80, rating: 4.1, reviewCount: 456, isOnSale: true, discountPercentage: 40, tags: ['boat', 'headphones', 'wireless', 'budget'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '67', name: 'Boat Airdopes 141 TWS Earbuds', description: 'True wireless earbuds, 42hr total playtime, ENx tech, IPX4, low latency', price: 1299, originalPrice: 2500, category: 'audio', subcategory: 'headphones', brand: 'Boat', images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop'], specifications: { 'Type': 'TWS In-ear', 'Total Battery': '42 hours', 'Single': '6hrs + 36hrs case', 'Driver': '6mm', 'IPX': 'IPX4' }, features: ['42hr total playtime', 'ENx noise reduction', 'BEAST mode gaming', 'Voice assistant', 'Bluetooth 5.2'], inStock: true, stockCount: 100, rating: 4.0, reviewCount: 892, isOnSale: true, discountPercentage: 48, tags: ['boat', 'tws', 'earbuds', 'wireless'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '68', name: 'Audio-Technica ATH-M50x Professional Headphones', description: 'Studio reference monitor headphones, 45mm drivers, detachable cable', price: 18500, originalPrice: 22000, category: 'audio', subcategory: 'headphones', brand: 'Audio-Technica', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'], specifications: { 'Type': 'Over-ear wired', 'Driver': '45mm', 'Frequency': '15-28,000Hz', 'Impedance': '38Ω', 'Cable': '3 detachable cables' }, features: ['Studio reference sound', '45mm large-aperture driver', '3 detachable cables', '90° swivel earcups', 'Foldable design'], inStock: true, stockCount: 25, rating: 4.8, reviewCount: 567, isOnSale: true, discountPercentage: 16, tags: ['audio-technica', 'studio', 'monitor', 'professional'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '69', name: 'Harman Kardon Onyx Studio 8 Speaker', description: 'Portable Bluetooth speaker, 50W, 8hr battery, IPX5, multi-device pairing', price: 32000, originalPrice: 40000, category: 'audio', subcategory: 'speakers', brand: 'Harman', images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop'], specifications: { 'Power': '50W', 'Battery': '8 hours', 'IPX': 'IPX5', 'Connectivity': 'Bluetooth 5.3', 'Pairing': 'Multi-device' }, features: ['50W powerful audio', 'IPX5 water resistant', 'Multi-device pairing', 'USB-C charging', 'Premium fabric design'], inStock: true, stockCount: 15, rating: 4.6, reviewCount: 189, isOnSale: true, discountPercentage: 20, tags: ['harman', 'speaker', 'bluetooth', 'portable'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '70', name: 'Yamaha YAS-109 Soundbar', description: '2.0ch soundbar, 120W, Dolby Atmos, DTS:X, Alexa built-in, Bluetooth', price: 28000, originalPrice: 35000, category: 'audio', subcategory: 'home-theatre', brand: 'Yamaha', images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=600&fit=crop'], specifications: { 'Channels': '2.0ch', 'Power': '120W', 'Audio': 'Dolby Atmos, DTS:X', 'Voice': 'Alexa built-in', 'Connectivity': 'Bluetooth, HDMI ARC, Optical' }, features: ['Alexa built-in', 'Dolby Atmos & DTS:X', '120W output', 'Clear Voice feature', 'Bass Ext. technology'], inStock: true, stockCount: 18, rating: 4.5, reviewCount: 143, isOnSale: true, discountPercentage: 20, tags: ['yamaha', 'soundbar', 'alexa', 'dolby'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '71', name: 'Philips SHL3075 Headphones', description: 'On-ear wired headphones, 32mm neodymium drivers, bass boost, foldable', price: 2500, originalPrice: 3500, category: 'audio', subcategory: 'headphones', brand: 'Philips', images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop'], specifications: { 'Type': 'On-ear wired', 'Driver': '32mm neodymium', 'Frequency': '10-22,000Hz', 'Impedance': '32Ω', 'Cable': '1.2m' }, features: ['Bass boost enhancement', 'Foldable design', 'Comfortable ear cushions', 'Tangle-free cable', 'Lightweight 130g'], inStock: true, stockCount: 50, rating: 3.9, reviewCount: 234, isOnSale: true, discountPercentage: 29, tags: ['philips', 'headphones', 'wired', 'budget'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── CCTV: Uniview, Bosch, Axis ──
  { id: '72', name: 'Uniview 4MP LightHunter Turret Camera', description: '4MP color night vision, H.265, IP67, IK10, Smart IR 30m, deep learning', price: 9800, originalPrice: 13000, category: 'cctv-cameras', subcategory: 'dome-cameras', brand: 'Uniview', images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop'], specifications: { 'Resolution': '4MP 2560x1440', 'Night Vision': 'Color LightHunter', 'IR': '30m Smart IR', 'IP': 'IP67', 'Vandalproof': 'IK10', 'Compression': 'H.265' }, features: ['LightHunter color night vision', 'Deep learning detection', 'H.265 compression', 'IP67+IK10', 'Smart IR 30m'], inStock: true, stockCount: 30, rating: 4.5, reviewCount: 98, isOnSale: true, discountPercentage: 25, tags: ['uniview', 'turret', '4mp', 'color-night'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '73', name: 'Uniview 8CH NVR 4K', description: '8-channel 4K NVR, H.265+, RAID, 2HDD bays, deep learning, AI features', price: 20000, originalPrice: 26000, category: 'recording-devices', subcategory: 'nvr', brand: 'Uniview', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Channels': '8', 'Max Resolution': '4K 8MP', 'Compression': 'H.265+', 'HDD': '2x SATA up to 10TB' }, features: ['8-channel 4K', 'Deep learning AI', 'RAID 0/1 support', 'Smart search', 'P2P remote access'], inStock: true, stockCount: 18, rating: 4.4, reviewCount: 67, isOnSale: true, discountPercentage: 23, tags: ['uniview', 'nvr', '8ch', '4k'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '74', name: 'Bosch FLEXIDOME 5MP IP Camera', description: '5MP fixed dome, H.265, WDR, IP66/IK10, intelligent video analytics', price: 22000, originalPrice: 28000, category: 'cctv-cameras', subcategory: 'dome-cameras', brand: 'Bosch', images: ['https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=600&fit=crop'], specifications: { 'Resolution': '5MP', 'Compression': 'H.265', 'WDR': '120dB', 'IP': 'IP66', 'IK': 'IK10', 'Analytics': 'Essential Video Analytics' }, features: ['5MP resolution', '120dB WDR', 'Essential Video Analytics', 'IP66+IK10', 'H.265 compression'], inStock: true, stockCount: 12, rating: 4.6, reviewCount: 54, tags: ['bosch', 'dome', '5mp', 'analytics'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '75', name: 'Axis P3245-V Fixed Dome Camera', description: '2MP HDTV, WDR, ARTPEC-6, lightfinder, IK10, Zipstream, NEMA4X', price: 35000, originalPrice: 42000, category: 'cctv-cameras', subcategory: 'dome-cameras', brand: 'Axis', images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop'], specifications: { 'Resolution': '2MP 1080p HDTV', 'Processor': 'ARTPEC-6', 'WDR': 'Forensic WDR', 'IP': 'IP42/NEMA4X', 'IK': 'IK10' }, features: ['Forensic WDR', 'AXIS Lightfinder', 'Zipstream compression', 'HDTV 1080p', 'Vandal resistant IK10'], inStock: true, stockCount: 8, rating: 4.7, reviewCount: 43, tags: ['axis', 'dome', 'enterprise', 'forensic'], warranty: '3 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── NETWORKING: Asus ──
  { id: '76', name: 'Asus RT-AX88U Pro WiFi 6 Router', description: 'AX6000 dual-band WiFi 6 router, 8 LAN ports, AiMesh, gaming optimized', price: 38000, originalPrice: 48000, category: 'networking', subcategory: 'routers', brand: 'Asus', images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop'], specifications: { 'WiFi': 'WiFi 6 AX6000', 'Bands': 'Dual Band', 'Ports': '8x Gigabit LAN + 2.5G WAN', 'USB': '3.1 + 2.0', 'CPU': 'Quad-core 1.8GHz' }, features: ['AX6000 WiFi 6', '8 Gigabit LAN ports', 'AiMesh WiFi system', 'Game Acceleration', 'AiProtection Pro'], inStock: true, stockCount: 10, rating: 4.7, reviewCount: 189, isOnSale: true, discountPercentage: 21, tags: ['asus', 'wifi6', 'router', 'gaming'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── STORAGE: Kingston, Toshiba, Crucial, Adata, Transcend, HP ──
  { id: '77', name: 'Kingston A2000 500GB NVMe SSD', description: '500GB NVMe M.2 PCIe SSD, 2000MB/s read, 2200MB/s write', price: 8500, originalPrice: 11000, category: 'storage', subcategory: 'ssd', brand: 'Kingston', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Capacity': '500GB', 'Interface': 'NVMe PCIe 3.0 x4', 'Read': '2000MB/s', 'Write': '2200MB/s', 'Form': 'M.2 2280' }, features: ['2000MB/s read', 'NVMe PCIe 3.0', 'Self-encrypting drive', 'Low power', '5-year warranty'], inStock: true, stockCount: 45, rating: 4.5, reviewCount: 312, isOnSale: true, discountPercentage: 23, tags: ['kingston', 'nvme', 'ssd', 'm2'], warranty: '5 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '78', name: 'Kingston 64GB DataTraveler USB 3.2', description: '64GB USB 3.2 Gen 1 flash drive, 130MB/s, durable capless design', price: 1500, originalPrice: 2000, category: 'storage', subcategory: 'pen-drives', brand: 'Kingston', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Capacity': '64GB', 'Interface': 'USB 3.2 Gen 1', 'Read': '130MB/s', 'Design': 'Capless sliding' }, features: ['USB 3.2 Gen 1 speed', 'Capless design', 'Key ring attachment', 'Backward compatible USB 2.0', 'Lifetime warranty'], inStock: true, stockCount: 100, rating: 4.3, reviewCount: 445, isOnSale: true, discountPercentage: 25, tags: ['kingston', 'pendrive', 'usb32', '64gb'], warranty: 'Lifetime Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '79', name: 'Toshiba 4TB Desktop HDD', description: '4TB 3.5" SATA desktop hard drive, 5400RPM, 128MB cache, CMR', price: 12000, originalPrice: 15500, category: 'storage', subcategory: 'hdd', brand: 'Toshiba', images: ['https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&h=600&fit=crop'], specifications: { 'Capacity': '4TB', 'Form Factor': '3.5"', 'RPM': '5400', 'Interface': 'SATA 6Gb/s', 'Cache': '128MB', 'Recording': 'CMR' }, features: ['4TB large capacity', 'CMR recording', '5400RPM quiet', 'Shock sensor', '2-year warranty'], inStock: true, stockCount: 35, rating: 4.2, reviewCount: 178, isOnSale: true, discountPercentage: 23, tags: ['toshiba', 'hdd', '4tb', 'desktop'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '80', name: 'Crucial MX500 1TB SATA SSD', description: '1TB 2.5" SATA SSD, 560MB/s read, Micron 3D NAND, 5-year warranty', price: 11500, originalPrice: 15000, category: 'storage', subcategory: 'ssd', brand: 'Crucial', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Capacity': '1TB', 'Interface': 'SATA 6Gb/s', 'Read': '560MB/s', 'Write': '510MB/s', 'NAND': 'Micron 3D' }, features: ['Micron 3D NAND', '560MB/s read', 'Integrated Power Loss Immunity', 'AES 256-bit encryption', '5-year warranty'], inStock: true, stockCount: 40, rating: 4.6, reviewCount: 389, isOnSale: true, discountPercentage: 23, tags: ['crucial', 'ssd', '1tb', 'sata'], warranty: '5 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '81', name: 'Adata XPG Spectrix D60G 16GB DDR4 RAM', description: '16GB DDR4 3200MHz RGB RAM, XMP 2.0, heatspreader, desktop memory', price: 6500, originalPrice: 9000, category: 'storage', subcategory: 'ram', brand: 'Adata', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Capacity': '16GB', 'Type': 'DDR4', 'Speed': '3200MHz', 'CAS': 'CL16', 'RGB': 'Yes', 'XMP': '2.0' }, features: ['RGB lighting', 'XMP 2.0 support', 'Heatspreader design', '3200MHz speed', 'Compatible with Intel/AMD'], inStock: true, stockCount: 35, rating: 4.4, reviewCount: 234, isOnSale: true, discountPercentage: 28, tags: ['adata', 'ram', 'ddr4', 'rgb'], warranty: 'Lifetime Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '82', name: 'Transcend 256GB JetFlash 790 USB 3.1', description: '256GB USB 3.1 Gen 1 pen drive, 100MB/s read, military-grade shock proof', price: 3500, originalPrice: 5000, category: 'storage', subcategory: 'pen-drives', brand: 'Transcend', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Capacity': '256GB', 'Interface': 'USB 3.1 Gen 1', 'Read': '100MB/s', 'Write': '40MB/s', 'Military': 'MIL-STD-810G' }, features: ['MIL-STD-810G shock proof', '100MB/s read', 'USB 3.1 Gen 1', 'LED indicator', 'Lifetime warranty'], inStock: true, stockCount: 55, rating: 4.5, reviewCount: 312, isOnSale: true, discountPercentage: 30, tags: ['transcend', 'pendrive', 'usb31', '256gb'], warranty: 'Lifetime Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '83', name: 'HP x5000m 128GB USB 3.2 Pen Drive', description: '128GB metal USB 3.2 pen drive, 420MB/s read, retractable design', price: 2200, originalPrice: 3200, category: 'storage', subcategory: 'pen-drives', brand: 'HP', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop'], specifications: { 'Capacity': '128GB', 'Interface': 'USB 3.2 Gen 1', 'Read': '420MB/s', 'Design': 'Retractable metal' }, features: ['420MB/s fast read', 'Metal body', 'Retractable connector', 'USB 3.2 Gen 1', 'Password protection'], inStock: true, stockCount: 60, rating: 4.2, reviewCount: 198, isOnSale: true, discountPercentage: 31, tags: ['hp', 'pendrive', 'usb32', 'metal'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── UPS: Microtek ──
  { id: '84', name: 'Microtek 1000VA Line Interactive UPS', description: '1000VA/600W line interactive UPS, AVR, LCD, 6 outlets, USB monitoring', price: 9500, originalPrice: 12500, category: 'ups-power', subcategory: 'ups', brand: 'Microtek', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'], specifications: { 'Capacity': '1000VA / 600W', 'Type': 'Line Interactive', 'Outlets': '6', 'Display': 'LCD', 'AVR': 'Yes', 'USB': 'For monitoring' }, features: ['AVR voltage regulation', 'LCD status display', '6 protected outlets', 'USB monitoring', 'Hot-swap battery'], inStock: true, stockCount: 30, rating: 4.2, reviewCount: 145, isOnSale: true, discountPercentage: 24, tags: ['microtek', 'ups', '1000va', 'avr'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '85', name: 'Microtek 600VA Home UPS', description: 'Offline 600VA/360W home UPS, pure sine wave output, fast charging', price: 5500, originalPrice: 7500, category: 'ups-power', subcategory: 'ups', brand: 'Microtek', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'], specifications: { 'Capacity': '600VA / 360W', 'Type': 'Offline', 'Output': 'Pure Sine Wave', 'Charging': 'Fast charge' }, features: ['Pure sine wave', 'Fast battery charging', 'Overload protection', 'Auto restart', 'LED indicators'], inStock: true, stockCount: 40, rating: 4.1, reviewCount: 198, isOnSale: true, discountPercentage: 27, tags: ['microtek', 'ups', '600va', 'home'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── SMART HOME: Google ──
  { id: '86', name: 'Google Nest Hub 2nd Gen', description: '7" smart display with Google Assistant, sleep sensing, ambient EQ', price: 9500, originalPrice: 12000, category: 'smart-home', subcategory: 'smart-displays', brand: 'Google', images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=600&fit=crop'], specifications: { 'Display': '7" touchscreen', 'Voice': 'Google Assistant', 'Connectivity': 'WiFi, Bluetooth', 'Feature': 'Sleep sensing' }, features: ['Google Assistant built-in', 'Sleep sensing radar', 'Ambient EQ display', 'Smart home control', 'Photo frame mode'], inStock: true, stockCount: 25, rating: 4.5, reviewCount: 267, isOnSale: true, discountPercentage: 21, tags: ['google', 'nest', 'smart-display', 'assistant'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '87', name: 'Google Nest WiFi Pro 6E Router', description: 'WiFi 6E mesh router, tri-band, 2400sqft coverage, Matter support', price: 22000, originalPrice: 28000, category: 'networking', subcategory: 'routers', brand: 'Google', images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop'], specifications: { 'WiFi': 'WiFi 6E tri-band', 'Coverage': '2400 sqft per node', 'Protocol': 'Matter + Thread', 'Connectivity': 'Ethernet, USB-C' }, features: ['WiFi 6E tri-band', 'Matter protocol support', 'Mesh system', 'Google Home app', 'Automatic updates'], inStock: true, stockCount: 15, rating: 4.4, reviewCount: 134, isOnSale: true, discountPercentage: 21, tags: ['google', 'wifi6e', 'mesh', 'router'], warranty: '2 Years Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },

  // ── PRINTERS: Xerox ──
  { id: '88', name: 'Xerox B210 Mono Laser Printer', description: 'Monochrome laser, 31ppm, WiFi, mobile print, 250-sheet tray, duplex', price: 16500, originalPrice: 21000, category: 'printers', subcategory: 'laser', brand: 'Xerox', images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=600&fit=crop'], specifications: { 'Type': 'Mono Laser', 'Speed': '31ppm', 'Resolution': '600x600dpi', 'Connectivity': 'WiFi, USB, Ethernet', 'Paper': '250-sheet', 'Duplex': 'Auto' }, features: ['31ppm print speed', 'Auto duplex', 'WiFi & Ethernet', 'Mobile printing', 'Energy Star'], inStock: true, stockCount: 18, rating: 4.3, reviewCount: 89, isOnSale: true, discountPercentage: 21, tags: ['xerox', 'laser', 'mono', 'wifi'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' },
  { id: '89', name: 'Xerox C230 Color Laser Printer', description: 'Color laser printer, 22ppm color/30ppm mono, WiFi, 250-sheet, duplex', price: 28000, originalPrice: 36000, category: 'printers', subcategory: 'laser', brand: 'Xerox', images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=600&fit=crop'], specifications: { 'Type': 'Color Laser', 'Speed': '22ppm color / 30ppm mono', 'Resolution': '600x600dpi', 'Connectivity': 'WiFi, USB, Ethernet', 'Duplex': 'Auto' }, features: ['Color laser printing', 'Auto duplex', 'WiFi & Ethernet', 'AirPrint & Mopria', 'Energy Star certified'], inStock: true, stockCount: 12, rating: 4.4, reviewCount: 67, isOnSale: true, discountPercentage: 22, tags: ['xerox', 'color-laser', 'wifi', 'duplex'], warranty: '1 Year Manufacturer Warranty', shippingInfo: 'Flat Rs.150 delivery charge' }
];

export const categories = [
  {
    id: 'cctv-cameras',
    name: 'CCTV Cameras',
    description: 'Professional security cameras for any application',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'dome-cameras', name: 'Dome Cameras', productCount: 15 },
      { id: 'bullet-cameras', name: 'Bullet Cameras', productCount: 12 },
      { id: 'ptz-cameras', name: 'PTZ Cameras', productCount: 8 },
      { id: 'wireless-cameras', name: 'Wireless Cameras', productCount: 10 },
      { id: 'doorbell-cameras', name: 'Doorbell Cameras', productCount: 6 }
    ],
    productCount: 51
  },
  {
    id: 'recording-devices',
    name: 'Recording Devices',
    description: 'NVR and DVR systems for video storage',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'nvr', name: 'Network Video Recorders', productCount: 8 },
      { id: 'dvr', name: 'Digital Video Recorders', productCount: 6 },
      { id: 'hybrid', name: 'Hybrid Recorders', productCount: 4 }
    ],
    productCount: 18
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Cables, storage, and installation accessories',
    image: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'cables', name: 'Cables & Connectors', productCount: 25 },
      { id: 'storage', name: 'Storage Devices', productCount: 12 },
      { id: 'power', name: 'Power Supplies', productCount: 18 },
      { id: 'security-lights', name: 'Security Lights', productCount: 9 },
      { id: 'mounts', name: 'Mounts & Brackets', productCount: 15 }
    ],
    productCount: 79
  },
  {
    id: 'laptops',
    name: 'Laptops',
    description: 'Laptops and notebooks for work and gaming',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'business-laptops', name: 'Business Laptops', productCount: 12 },
      { id: 'gaming-laptops', name: 'Gaming Laptops', productCount: 8 },
      { id: 'ultrabooks', name: 'Ultrabooks', productCount: 6 }
    ],
    productCount: 26
  },
  {
    id: 'mobile-phones',
    name: 'Mobile Phones',
    description: 'Smartphones and feature phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'android', name: 'Android Phones', productCount: 20 },
      { id: 'iphone', name: 'iPhones', productCount: 8 },
      { id: 'feature-phones', name: 'Feature Phones', productCount: 5 }
    ],
    productCount: 33
  },
  {
    id: 'televisions',
    name: 'Televisions',
    description: 'Smart TVs, LED and OLED televisions',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'smart-tv', name: 'Smart TVs', productCount: 15 },
      { id: 'led-tv', name: 'LED TVs', productCount: 10 },
      { id: 'oled-tv', name: 'OLED TVs', productCount: 5 }
    ],
    productCount: 30
  },
  {
    id: 'audio',
    name: 'Audio',
    description: 'Speakers, headphones, and sound systems',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'headphones', name: 'Headphones & Earbuds', productCount: 18 },
      { id: 'speakers', name: 'Speakers', productCount: 12 },
      { id: 'home-theatre', name: 'Home Theatre', productCount: 6 }
    ],
    productCount: 36
  },
  {
    id: 'printers',
    name: 'Printers',
    description: 'Inkjet, laser and multifunction printers',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'inkjet', name: 'Inkjet Printers', productCount: 10 },
      { id: 'laser', name: 'Laser Printers', productCount: 8 },
      { id: 'multifunction', name: 'Multifunction Printers', productCount: 7 }
    ],
    productCount: 25
  },
  {
    id: 'ups-power',
    name: 'UPS / Power',
    description: 'UPS systems and power backup solutions',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'ups', name: 'UPS Systems', productCount: 12 },
      { id: 'stabilizers', name: 'Voltage Stabilizers', productCount: 8 },
      { id: 'inverters', name: 'Inverters', productCount: 6 }
    ],
    productCount: 26
  },
  {
    id: 'networking',
    name: 'Networking',
    description: 'Routers, switches and network equipment',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'routers', name: 'Routers', productCount: 10 },
      { id: 'switches', name: 'Switches', productCount: 8 },
      { id: 'wifi', name: 'WiFi Extenders', productCount: 6 }
    ],
    productCount: 24
  },
  {
    id: 'storage',
    name: 'Storage',
    description: 'Hard drives, SSDs and memory cards',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'hdd', name: 'Hard Drives', productCount: 12 },
      { id: 'ssd', name: 'SSDs', productCount: 10 },
      { id: 'memory-cards', name: 'Memory Cards', productCount: 8 },
      { id: 'pen-drives', name: 'Pen Drives', productCount: 10 }
    ],
    productCount: 40
  },
  {
    id: 'smart-home',
    name: 'Smart Home',
    description: 'Smart devices and home automation',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'smart-lights', name: 'Smart Lights', productCount: 10 },
      { id: 'smart-locks', name: 'Smart Locks', productCount: 6 },
      { id: 'smart-plugs', name: 'Smart Plugs', productCount: 8 }
    ],
    productCount: 24
  },
  {
    id: 'monitors',
    name: 'Monitors',
    description: 'Computer monitors and displays',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'gaming-monitors', name: 'Gaming Monitors', productCount: 8 },
      { id: 'office-monitors', name: 'Office Monitors', productCount: 12 },
      { id: '4k-monitors', name: '4K Monitors', productCount: 6 }
    ],
    productCount: 26
  },
  {
    id: 'complete-kits',
    name: 'Complete Kits',
    description: 'All-in-one security and electronics bundles',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop',
    subcategories: [
      { id: 'cctv-kits', name: 'CCTV Kits', productCount: 10 },
      { id: 'office-kits', name: 'Office Kits', productCount: 6 },
      { id: 'home-kits', name: 'Home Kits', productCount: 8 }
    ],
    productCount: 24
  }
];

export const brands = [
  'SecureVision',
  'TechGuard', 
  'ProView',
  'DoorSecure',
  'RecordTech',
  'CablePro',
  'LightGuard',
  'DataSecure'
];
