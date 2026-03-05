import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowsRightLeftIcon,
  XMarkIcon,
  ShoppingCartIcon,
  CheckIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ComparePage: React.FC = () => {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [compareItems, setCompareItems] = useState(products.slice(0, 3));
  const [showAddProduct, setShowAddProduct] = useState(false);

  const removeItem = (productId: string) => {
    setCompareItems(prev => prev.filter(p => p.id !== productId));
  };

  const addItem = (product: typeof products[0]) => {
    if (compareItems.length < 4 && !compareItems.find(p => p.id === product.id)) {
      setCompareItems(prev => [...prev, product]);
    }
    setShowAddProduct(false);
  };

  const allSpecKeys = Array.from(
    new Set(compareItems.flatMap(p => Object.keys(p.specifications)))
  );

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
        <div className="bg-white shadow-sm p-12 text-center max-w-md w-full">
          <ArrowsRightLeftIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No products to compare</h2>
          <p className="text-gray-500 text-sm mb-6">Add products to compare their features side by side.</p>
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
        <div className="bg-white shadow-sm px-4 py-3 mb-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            Compare Products <span className="text-gray-400 font-normal text-sm">({compareItems.length} of 4)</span>
          </h1>
          {compareItems.length < 4 && (
            <button onClick={() => setShowAddProduct(true)}
              className="bg-[#2874f0] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#1a65de]">
              + Add Product
            </button>
          )}
        </div>

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white shadow-xl p-5 max-w-md w-full max-h-[70vh] overflow-y-auto mx-4 rounded">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-900">Add Product to Compare</h3>
                <button onClick={() => setShowAddProduct(false)} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-1.5">
                {products.filter(p => !compareItems.find(c => c.id === p.id)).map(product => (
                  <button key={product.id} onClick={() => addItem(product)}
                    className="w-full flex items-center gap-3 p-2.5 border border-gray-100 rounded hover:bg-blue-50 hover:border-[#2874f0] transition-colors text-left">
                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-contain border border-gray-100 rounded p-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm line-clamp-1">{product.name}</p>
                      <p className="text-sm text-[#388e3c] font-semibold">Rs.{product.price.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        <div className="bg-white shadow-sm overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase w-40">Product</th>
                {compareItems.map(product => (
                  <th key={product.id} className="p-4 text-center">
                    <div className="relative">
                      <button onClick={() => removeItem(product.id)}
                        className="absolute -top-1 -right-1 bg-red-50 rounded-full p-1 hover:bg-red-100">
                        <XMarkIcon className="h-3.5 w-3.5 text-red-500" />
                      </button>
                      <div className="h-28 flex items-center justify-center mb-2">
                        <img src={product.images[0]} alt={product.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <Link to={`/products/${product.id}`} className="text-sm font-medium text-gray-800 hover:text-[#2874f0] line-clamp-2">
                        {product.name}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 bg-[#f1f3f6]">
                <td className="p-3 text-xs font-semibold text-gray-500 uppercase">Price</td>
                {compareItems.map(product => (
                  <td key={product.id} className="p-3 text-center">
                    <span className="text-base font-bold text-gray-900">Rs.{product.price.toLocaleString()}</span>
                    {product.originalPrice && <span className="block text-xs text-gray-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>}
                    {product.isOnSale && <span className="block text-xs text-[#388e3c] font-semibold">{product.discountPercentage}% off</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 text-xs font-semibold text-gray-500 uppercase">Rating</td>
                {compareItems.map(product => (
                  <td key={product.id} className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 bg-[#388e3c] text-white text-xs px-2 py-0.5 rounded font-semibold">
                      {product.rating.toFixed(1)} ★
                    </span>
                    <span className="block text-xs text-gray-400 mt-0.5">({product.reviewCount})</span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 bg-[#f1f3f6]">
                <td className="p-3 text-xs font-semibold text-gray-500 uppercase">Brand</td>
                {compareItems.map(product => (
                  <td key={product.id} className="p-3 text-center text-sm text-gray-800">{product.brand}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3 text-xs font-semibold text-gray-500 uppercase">Availability</td>
                {compareItems.map(product => (
                  <td key={product.id} className="p-3 text-center">
                    {product.inStock
                      ? <span className="inline-flex items-center gap-1 text-[#388e3c] text-xs font-semibold"><CheckIcon className="h-3.5 w-3.5" /> In Stock</span>
                      : <span className="inline-flex items-center gap-1 text-red-500 text-xs font-semibold"><XCircleIcon className="h-3.5 w-3.5" /> Out of Stock</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 bg-[#f1f3f6]">
                <td className="p-3 text-xs font-semibold text-gray-500 uppercase">Warranty</td>
                {compareItems.map(product => (
                  <td key={product.id} className="p-3 text-center text-sm text-gray-700">{product.warranty || 'N/A'}</td>
                ))}
              </tr>
              {allSpecKeys.map((specKey, index) => (
                <tr key={specKey} className={`border-b border-gray-100 ${index % 2 === 0 ? '' : 'bg-[#f1f3f6]'}`}>
                  <td className="p-3 text-xs font-semibold text-gray-500 uppercase">{specKey}</td>
                  {compareItems.map(product => (
                    <td key={product.id} className="p-3 text-center text-sm text-gray-700">{product.specifications[specKey] || '—'}</td>
                  ))}
                </tr>
              ))}
              <tr className="border-t-2 border-gray-100">
                <td className="p-3"></td>
                {compareItems.map(product => (
                  <td key={product.id} className="p-3 text-center">
                    <button onClick={() => addToCart(product, 1)} disabled={!product.inStock}
                      className="inline-flex items-center gap-1.5 bg-[#ff9f00] hover:bg-[#f59000] disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-bold px-4 py-2 rounded transition-colors">
                      <ShoppingCartIcon className="h-4 w-4" /> ADD TO CART
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
