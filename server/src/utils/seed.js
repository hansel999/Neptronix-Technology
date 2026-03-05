const Product = require('../models/Product');
const User = require('../models/User');

const initialProducts = [
  {
    name: '4K Ultra HD CCTV Camera System',
    description: 'Professional 4K resolution security camera with night vision and weatherproof design',
    price: 29999, originalPrice: 39999, category: 'cctv-cameras', subcategory: 'dome-cameras',
    brand: 'SecureVision',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558000143-a78f8299c40b?w=600&h=600&fit=crop',
    ],
    specifications: new Map([['Resolution','4K UHD'],['Night Vision','100ft'],['IP Rating','IP67']]),
    features: ['4K Ultra HD','Night Vision','Weatherproof','Motion Detection','Two-way Audio'],
    inStock: true, stockCount: 45, rating: 4.5, reviewCount: 128,
    isOnSale: true, discountPercentage: 25,
    tags: ['4k','outdoor','night-vision','weatherproof'],
    warranty: '2 Years', shippingInfo: 'Free shipping over Rs.500',
  },
  {
    name: 'Wireless Security Camera 2-Pack',
    description: 'Easy setup wireless cameras with cloud storage and smartphone alerts',
    price: 15999, originalPrice: 19999, category: 'cctv-cameras', subcategory: 'wireless-cameras',
    brand: 'NetCam',
    images: ['https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=600&fit=crop'],
    specifications: new Map([['Resolution','1080p FHD'],['Connectivity','WiFi 2.4GHz'],['Storage','Cloud + SD']]),
    features: ['Wireless Setup','Cloud Storage','Motion Alerts','Night Vision','Two-way Audio'],
    inStock: true, stockCount: 30, rating: 4.3, reviewCount: 89,
    isOnSale: true, discountPercentage: 20,
    tags: ['wireless','indoor','cloud','easy-setup'],
    warranty: '1 Year', shippingInfo: 'Free shipping over Rs.500',
  },
  {
    name: '8-Channel DVR Security System',
    description: 'Complete 8-channel DVR system with 2TB storage for professional surveillance',
    price: 45999, originalPrice: null, category: 'dvr-nvr', subcategory: '8-channel-dvr',
    brand: 'Hikvision',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'],
    specifications: new Map([['Channels','8'],['Max Resolution','4K'],['HDD','Supports up to 8TB'],['Remote Access','Yes']]),
    features: ['8 Channel Recording','4K Output','Motion Detection','Remote Access','H.265+ Compression'],
    inStock: true, stockCount: 20, rating: 4.7, reviewCount: 203,
    isOnSale: false, discountPercentage: 0,
    tags: ['dvr','professional','8-channel','hikvision'],
    warranty: '3 Years', shippingInfo: 'Free shipping over Rs.500',
  },
  {
    name: 'PoE Network Switch 8-Port',
    description: 'Gigabit PoE switch to power IP cameras without separate power supplies',
    price: 8999, originalPrice: 11999, category: 'networking', subcategory: 'poe-switches',
    brand: 'TP-Link',
    images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=600&fit=crop'],
    specifications: new Map([['Ports','8x PoE + 2x Uplink'],['Speed','Gigabit'],['PoE Budget','120W']]),
    features: ['8 PoE Ports','Gigabit Speed','Plug & Play','Metal Housing','VLAN Support'],
    inStock: true, stockCount: 60, rating: 4.4, reviewCount: 156,
    isOnSale: true, discountPercentage: 25,
    tags: ['poe','switch','networking','gigabit'],
    warranty: '2 Years', shippingInfo: 'Free shipping over Rs.500',
  },
  {
    name: '2TB Surveillance Hard Drive',
    description: 'Specially designed hard drive for 24/7 continuous recording in DVR/NVR systems',
    price: 6499, originalPrice: 7999, category: 'storage', subcategory: 'hard-drives',
    brand: 'Seagate',
    images: ['https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&h=600&fit=crop'],
    specifications: new Map([['Capacity','2TB'],['Interface','SATA 6Gb/s'],['Cache','256MB'],['RPM','5400 RPM']]),
    features: ['24/7 Recording','Low Power','Error Recovery','3 Years Warranty','RAID Support'],
    inStock: true, stockCount: 80, rating: 4.6, reviewCount: 312,
    isOnSale: true, discountPercentage: 19,
    tags: ['hdd','storage','surveillance','seagate'],
    warranty: '3 Years', shippingInfo: 'Free shipping over Rs.500',
  },
  {
    name: 'Smart Video Doorbell',
    description: 'HD video doorbell with two-way audio, motion detection and cloud storage',
    price: 12999, originalPrice: 16999, category: 'smart-home', subcategory: 'smart-doorbells',
    brand: 'Ring',
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=600&fit=crop'],
    specifications: new Map([['Resolution','1080p HD'],['Field of View','160°'],['Night Vision','Yes'],['Power','Battery/Wired']]),
    features: ['HD Video','Two-way Audio','Motion Zones','Night Vision','Alexa Compatible'],
    inStock: true, stockCount: 35, rating: 4.2, reviewCount: 445,
    isOnSale: true, discountPercentage: 24,
    tags: ['doorbell','smart-home','wifi','ring'],
    warranty: '1 Year', shippingInfo: 'Free shipping over Rs.500',
  },
  {
    name: 'PTZ Speed Dome Camera',
    description: 'Pan-tilt-zoom camera with 30x optical zoom for wide area monitoring',
    price: 89999, originalPrice: 109999, category: 'cctv-cameras', subcategory: 'ptz-cameras',
    brand: 'Dahua',
    images: ['https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?w=600&h=600&fit=crop'],
    specifications: new Map([['Zoom','30x Optical'],['Resolution','2MP'],['IR Range','100m'],['Protocol','ONVIF']]),
    features: ['30x Optical Zoom','Auto Tracking','360° Pan','Night Vision','IP66 Rating'],
    inStock: true, stockCount: 12, rating: 4.8, reviewCount: 67,
    isOnSale: true, discountPercentage: 18,
    tags: ['ptz','zoom','outdoor','professional'],
    warranty: '2 Years', shippingInfo: 'Free shipping over Rs.500',
  },
  {
    name: '4-Camera Complete CCTV Kit',
    description: 'Ready to install 4-camera kit with DVR, cables, and power supply included',
    price: 35999, originalPrice: 49999, category: 'complete-kits', subcategory: '4-camera-kit',
    brand: 'CP Plus',
    images: ['https://images.unsplash.com/photo-1580982172477-9373ff52ae43?w=600&h=600&fit=crop'],
    specifications: new Map([['Cameras','4x 2MP Dome'],['DVR','4 Channel H.265'],['Storage','1TB HDD Included'],['Cable','60m BNC Cable']]),
    features: ['Complete Kit','4 Cameras','1TB Storage','Night Vision','Mobile App'],
    inStock: true, stockCount: 18, rating: 4.5, reviewCount: 234,
    isOnSale: true, discountPercentage: 28,
    tags: ['kit','complete','4-camera','cp-plus'],
    warranty: '2 Years', shippingInfo: 'Free shipping over Rs.500',
  },
];

const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(initialProducts);
    console.log(`🌱 Seeded ${initialProducts.length} products`);
  }
};

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@neptronix.com';
  const exists = await User.findOne({ email: adminEmail });
  if (!exists) {
    await User.create({
      firstName: 'Admin',
      lastName: 'Neptronix',
      email: adminEmail,
      password: 'admin123',
      isAdmin: true,
    });
    console.log(`🔑 Admin user created: ${adminEmail}`);
  }
};

module.exports = { seedProducts, seedAdmin };
