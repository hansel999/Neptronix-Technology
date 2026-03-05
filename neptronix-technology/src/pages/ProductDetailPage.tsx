import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowsRightLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const sampleReviews = [
  { id: '1', userName: 'Raj S.', rating: 5, title: 'Excellent camera quality!', content: 'I installed this camera at my shop entrance and the video quality is superb. Night vision works flawlessly even in complete darkness. Highly recommended!', date: '2024-12-15', verified: true, helpful: 12 },
  { id: '2', userName: 'Sita K.', rating: 4, title: 'Good but app could be better', content: 'The camera itself is great. 4K quality is amazing. The mobile app is a bit laggy sometimes but overall a solid product for the price.', date: '2024-11-20', verified: true, helpful: 8 },
  { id: '3', userName: 'Bishal P.', rating: 5, title: 'Best CCTV for the price', content: 'After comparing many options, I chose this one and I am very satisfied. Installation was easy and picture quality is crystal clear. Customer service from Neptronix was also very helpful.', date: '2024-10-30', verified: true, helpful: 15 },
  { id: '4', userName: 'Anita M.', rating: 3, title: 'Decent product', content: 'Works fine for basic surveillance. WiFi connectivity drops occasionally but resets quickly. Would be nice if it had better weatherproofing.', date: '2024-09-18', verified: false, helpful: 3 },
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [reviewRatingFilter, setReviewRatingFilter] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const filteredReviews = reviewRatingFilter > 0 ? sampleReviews.filter(r => r.rating === reviewRatingFilter) : sampleReviews;
  const avgRating = sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const nextImage = () => setSelectedImageIndex(prev => (prev + 1) % product.images.length);
  const prevImage = () => setSelectedImageIndex(prev => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <nav className="flex text-xs text-gray-500 gap-1 flex-wrap">
            <Link to="/" className="hover:text-[#2874f0]">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#2874f0]">Products</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-[#2874f0] capitalize">{product.category.replace(/-/g, ' ')}</Link>
            <span>/</span>
            <span className="text-gray-700 truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 space-y-3">
        {/* Main Product Card */}
        <div className="bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Image Gallery */}
            <div className="lg:col-span-4 lg:border-r border-gray-100 p-3 sm:p-4">
              <div className="lg:sticky lg:top-20">
                <div className="relative border border-gray-100 rounded flex items-center justify-center bg-white h-[260px] sm:h-[340px]">
                  <img src={product.images[selectedImageIndex] || product.images[0]} alt={product.name} className="max-h-full max-w-full object-contain p-4" />
                  {product.images.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow border border-gray-100"><ChevronLeftIcon className="h-4 w-4 text-gray-600" /></button>
                      <button onClick={nextImage} className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1.5 shadow border border-gray-100"><ChevronRightIcon className="h-4 w-4 text-gray-600" /></button>
                    </>
                  )}
                  {product.isOnSale && <span className="absolute top-2 left-2 bg-[#388e3c] text-white text-xs font-bold px-2 py-0.5 rounded">{product.discountPercentage}% OFF</span>}
                </div>
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImageIndex(i)} className={`w-14 h-14 flex-shrink-0 border-2 rounded overflow-hidden transition-colors ${i === selectedImageIndex ? 'border-[#2874f0]' : 'border-gray-200 hover:border-gray-400'}`}>
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={handleAddToCart} disabled={!product.inStock} className="flex-1 flex items-center justify-center gap-2 bg-[#ff9f00] hover:bg-[#f59000] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded text-sm">
                    <ShoppingCartIcon className="h-5 w-5" /> ADD TO CART
                  </button>
                  <button onClick={() => navigate('/checkout', { state: { buyNow: { product, quantity } } })} className="flex-1 flex items-center justify-center gap-2 bg-[#fb641b] hover:bg-[#e85d18] text-white font-bold py-3 rounded text-sm">
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Middle: Product Info */}
            <div className="lg:col-span-5 p-4 sm:p-5 lg:border-r border-gray-100">
              <p className="text-sm text-gray-500 mb-0.5">{product.brand}</p>
              <h1 className="text-xl font-medium text-gray-900 mb-2 leading-snug">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <span className="bg-[#388e3c] text-white text-sm px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                  {product.rating.toFixed(1)} <StarIconSolid className="h-3 w-3" />
                </span>
                <span className="text-sm text-gray-500">{product.reviewCount} Ratings &amp; {sampleReviews.length} Reviews</span>
                {product.inStock ? <span className="ml-auto text-sm text-[#388e3c] font-semibold">✓ In Stock</span> : <span className="ml-auto text-sm text-red-500 font-semibold">Out of Stock</span>}
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-medium text-gray-900">Rs.{product.price.toLocaleString()}</span>
                  {product.originalPrice && <>
                    <span className="text-lg text-gray-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>
                    <span className="text-lg text-[#388e3c] font-semibold">{product.discountPercentage}% off</span>
                  </>}
                </div>
                {product.originalPrice && <p className="text-sm text-gray-500 mt-0.5">You save Rs.{(product.originalPrice - product.price).toLocaleString()}</p>}
              </div>
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-2">Key Highlights</p>
                <ul className="space-y-1.5">
                  {product.features.slice(0, 6).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckIcon className="h-4 w-4 text-[#2874f0] flex-shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4 pb-4 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-1">Description</p>
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag, i) => <span key={i} className="bg-blue-50 text-[#2874f0] text-xs px-2.5 py-1 rounded-full border border-blue-100">{tag}</span>)}
                </div>
              )}
            </div>

            {/* Right: Buy Box */}
            <div className="lg:col-span-3 p-4 sm:p-5">
              <div className="mb-4 pb-4 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-2">Delivery</p>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <TruckIcon className="h-4 w-4 text-[#2874f0] flex-shrink-0 mt-0.5" />
                  <span>{product.shippingInfo || 'Flat Rs.150 delivery charge'}</span>
                </div>
              </div>
              <div className="mb-4 pb-4 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-2">Warranty</p>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <ShieldCheckIcon className="h-4 w-4 text-[#2874f0] flex-shrink-0 mt-0.5" />
                  <span>{product.warranty || '1 Year Manufacturer Warranty'}</span>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
                <div className="flex items-center border border-gray-200 rounded w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50 text-gray-600"><MinusIcon className="h-4 w-4" /></button>
                  <span className="px-4 py-2 text-sm font-semibold border-x border-gray-200 min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))} className="px-3 py-2 hover:bg-gray-50 text-gray-600"><PlusIcon className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <button onClick={handleAddToCart} disabled={!product.inStock} className="flex items-center justify-center gap-2 bg-[#ff9f00] hover:bg-[#f59000] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded text-sm">
                  <ShoppingCartIcon className="h-5 w-5" /> ADD TO CART
                </button>
                <button onClick={() => navigate('/checkout', { state: { buyNow: { product, quantity } } })} className="flex items-center justify-center gap-2 bg-[#fb641b] hover:bg-[#e85d18] text-white font-bold py-3 rounded text-sm">
                  BUY NOW
                </button>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500"><HeartIcon className="h-4 w-4" /> Wishlist</button>
                <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2874f0]"><ArrowsRightLeftIcon className="h-4 w-4" /> Compare</button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-sm">
          <div className="border-b border-gray-100 flex overflow-x-auto whitespace-nowrap">
            {(['description', 'specs', 'reviews'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-[#2874f0] text-[#2874f0]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {tab === 'specs' ? 'Specifications' : tab === 'reviews' ? `Reviews (${sampleReviews.length})` : 'Description'}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <h4 className="text-md font-semibold mb-3">Features</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {product.tags.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-semibold mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specs' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-3 text-sm font-medium text-gray-900 w-1/3">{key}</td>
                          <td className="px-6 py-3 text-sm text-gray-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                {/* Review Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">{avgRating.toFixed(1)}</div>
                    <div className="flex justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        i < Math.round(avgRating)
                          ? <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                          : <StarIcon key={i} className="h-5 w-5 text-gray-300" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Based on {sampleReviews.length} reviews</div>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Rating Breakdown</h4>
                    {[5, 4, 3, 2, 1].map(rating => {
                      const count = sampleReviews.filter(r => r.rating === rating).length;
                      const percentage = (count / sampleReviews.length) * 100;
                      return (
                        <button
                          key={rating}
                          onClick={() => setReviewRatingFilter(reviewRatingFilter === rating ? 0 : rating)}
                          className={`flex items-center w-full mb-1 group ${reviewRatingFilter === rating ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                        >
                          <span className="text-sm w-8">{rating}★</span>
                          <div className="flex-1 h-3 bg-gray-200 rounded-full mx-2 overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-sm text-gray-500 w-8">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-6">
                  {filteredReviews.map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{review.userName}</span>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified Purchase</span>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              i < review.rating
                                ? <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
                                : <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>
                      <p className="text-gray-600 text-sm">{review.content}</p>
                      <div className="mt-3 flex items-center space-x-4">
                        <button className="text-sm text-gray-500 hover:text-blue-600">
                          Helpful ({review.helpful})
                        </button>
                        <button className="text-sm text-gray-500 hover:text-blue-600">
                          Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Similar Products</h2>
              <Link to={`/products?category=${product.category}`} className="text-sm text-[#2874f0] hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 border border-gray-100 divide-x divide-y divide-gray-100">
              {relatedProducts.map(rp => (
                <Link key={rp.id} to={`/products/${rp.id}`} className="group p-3 flex flex-col items-center hover:shadow-md transition-shadow">
                  <div className="h-36 w-full flex items-center justify-center overflow-hidden mb-2">
                    <img src={rp.images[0]} alt={rp.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <p className="text-sm text-gray-800 font-medium line-clamp-2 text-center mb-1">{rp.name}</p>
                  <span className="bg-[#388e3c] text-white text-xs px-1.5 py-0.5 rounded mb-1">{rp.rating.toFixed(1)} ★</span>
                  <span className="text-sm font-bold text-gray-900">Rs.{rp.price.toLocaleString()}</span>
                  {rp.originalPrice && <span className="text-xs text-gray-400 line-through">Rs.{rp.originalPrice.toLocaleString()}</span>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
