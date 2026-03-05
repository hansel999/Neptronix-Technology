import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartIcon,
  ShoppingCartIcon,
  TrashIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const WishlistPage: React.FC = () => {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 4));

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product, 1);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
        <div className="bg-white shadow-sm p-12 text-center max-w-md w-full">
          <HeartIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty!</h2>
          <p className="text-gray-500 text-sm mb-6">Save items you love and come back to them anytime.</p>
          <Link to="/products" className="inline-block bg-[#2874f0] text-white font-bold px-8 py-3 rounded hover:bg-[#1a65de] transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3">
        {/* Header */}
        <div className="bg-white shadow-sm px-4 py-3 mb-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            My Wishlist <span className="text-gray-400 font-normal text-sm">({wishlistItems.length} items)</span>
          </h1>
          <button onClick={() => setWishlistItems([])} className="text-sm text-red-500 hover:text-red-600">
            Clear All
          </button>
        </div>

        <div className="bg-white shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 divide-x divide-y divide-gray-100">
            {wishlistItems.map(product => (
              <div key={product.id} className="group p-3 flex flex-col items-center hover:shadow-md transition-shadow relative">
                {/* Remove button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50 z-10"
                >
                  <TrashIcon className="h-3.5 w-3.5 text-red-400" />
                </button>
                {/* Image */}
                <Link to={`/products/${product.id}`} className="w-full h-44 flex items-center justify-center overflow-hidden mb-3">
                  <img src={product.images[0]} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </Link>
                {product.isOnSale && (
                  <span className="absolute top-2 left-2 bg-[#388e3c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{product.discountPercentage}% off</span>
                )}
                <Link to={`/products/${product.id}`} className="text-sm text-gray-800 font-medium line-clamp-2 text-center w-full mb-1 hover:text-[#2874f0]">
                  {product.name}
                </Link>
                <div className="flex items-center gap-1 mb-1">
                  <span className="bg-[#388e3c] text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                    {product.rating.toFixed(1)} ★
                  </span>
                  <span className="text-xs text-gray-400">({product.reviewCount})</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap justify-center mb-2">
                  <span className="text-base font-bold text-gray-900">Rs.{product.price.toLocaleString()}</span>
                  {product.originalPrice && <span className="text-xs text-gray-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>}
                </div>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 flex items-center justify-center gap-1 bg-[#ff9f00] hover:bg-[#f59000] disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-bold py-1.5 rounded transition-colors"
                  >
                    <ShoppingCartIcon className="h-3.5 w-3.5" /> ADD
                  </button>
                  <Link to="/compare" className="p-1.5 border border-gray-200 rounded hover:bg-gray-50" title="Compare">
                    <ArrowsRightLeftIcon className="h-3.5 w-3.5 text-gray-500" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
