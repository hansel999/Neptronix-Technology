import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ArrowLeftIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { state, removeFromCart, updateQuantity, toggleItemSelection, getSelectedItems, getSelectedTotal } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const selectedItems = getSelectedItems();
  const selectedTotal = getSelectedTotal();
  const shipping = 150;
  const tax = 0;
  const finalTotal = selectedTotal + shipping + tax;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <div className="bg-white p-8 sm:p-16 text-center max-w-sm w-full shadow-sm">
          <ShoppingBagIcon className="h-24 w-24 mx-auto text-gray-200 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty!</h2>
          <p className="text-gray-500 text-sm mb-8">Add items to it now.</p>
          <Link to="/products" className="inline-block bg-[#2874f0] text-white font-bold px-12 py-3 rounded text-sm hover:bg-[#1a65de]">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  const savedAmount = state.items.reduce((s, i) =>
    i.selected && i.product.originalPrice ? s + (i.product.originalPrice - i.product.price) * i.quantity : s, 0);

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <div className="max-w-[1100px] mx-auto px-3 py-3">
        <div className="flex flex-col lg:flex-row gap-3 items-start">

          {/* ── LEFT: Cart Items ── */}
          <div className="flex-1 min-w-0">

            {/* Deliver to header */}
            <div className="bg-white px-4 py-3 mb-0.5 flex items-center justify-between shadow-sm">
              <h1 className="text-base font-medium text-gray-800">
                My Cart
                <span className="text-gray-400 font-normal text-sm ml-1">({state.itemCount} {state.itemCount === 1 ? 'item' : 'items'})</span>
              </h1>
            </div>

            {/* Items list */}
            <div className="bg-white shadow-sm divide-y divide-gray-100">
              {state.items.map(item => (
                <div key={item.product.id} className="px-4 sm:px-6 py-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={item.selected !== false}
                      onChange={() => toggleItemSelection(item.product.id)}
                      className="mt-1 sm:mt-8 accent-[#2874f0] w-4 h-4 flex-shrink-0 cursor-pointer"
                    />
                    {/* Product image */}
                    <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-[112px] h-[112px] object-contain"
                      />
                    </Link>
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item.product.id}`} className="text-sm text-gray-800 hover:text-[#2874f0] line-clamp-2 leading-snug">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">{item.product.brand}</p>
                      {item.product.inStock
                        ? <p className="text-xs text-[#388e3c] mt-1 font-medium">In Stock</p>
                        : <p className="text-xs text-red-500 mt-1 font-medium">Out of Stock</p>}

                      {/* Qty + Remove/Save row */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 text-lg font-light"
                          >
                            <MinusIcon className="h-3 w-3" />
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center text-sm font-medium border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stockCount}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-30"
                          >
                            <PlusIcon className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-sm text-gray-600 hover:text-red-500 font-medium uppercase tracking-wide"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price (right side) */}
                    <div className="flex-shrink-0 text-left sm:text-right">
                      <p className="text-base font-bold text-gray-900">Rs.{(item.product.price * item.quantity).toLocaleString()}</p>
                      {item.product.originalPrice && (
                        <>
                          <p className="text-xs text-gray-400 line-through mt-0.5">
                            Rs.{(item.product.originalPrice * item.quantity).toLocaleString()}
                          </p>
                          {item.product.isOnSale && (
                            <p className="text-xs text-[#388e3c] font-semibold mt-0.5">{item.product.discountPercentage}% off</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Place Order bar */}
            <div className="bg-white shadow-sm mt-0.5 px-4 sm:px-6 py-4 flex items-center justify-end">
              <Link
                to="/checkout"
                onClick={e => selectedItems.length === 0 && e.preventDefault()}
                className={`font-bold py-4 px-16 text-sm uppercase tracking-wide transition-colors ${
                  selectedItems.length === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#fb641b] hover:bg-[#f4581f] text-white'
                }`}
              >
                Place Order
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Price Details ── */}
          <div className="w-full lg:w-[360px] flex-shrink-0 lg:sticky lg:top-[72px]">
            <div className="bg-white shadow-sm">

              {/* Header */}
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Price Details</h2>
              </div>

              <div className="px-5 py-4 space-y-3.5">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Price ({selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''})</span>
                  <span>Rs.{selectedTotal.toLocaleString()}</span>
                </div>
                {savedAmount > 0 && (
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Discount</span>
                    <span className="text-[#388e3c]">− Rs.{savedAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Delivery Charges</span>
                  <span className="text-[#388e3c]">Rs.{shipping} <span className="text-gray-400 line-through text-xs">Free</span></span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between font-bold text-base text-gray-900">
                  <span>Total Amount</span>
                  <span>Rs.{finalTotal.toLocaleString()}</span>
                </div>
                {savedAmount > 0 && (
                  <p className="text-sm text-[#388e3c] font-semibold pt-1">
                    You will save Rs.{savedAmount.toLocaleString()} on this order
                  </p>
                )}
              </div>

              {/* Place Order */}
              <div className="px-5 pb-5">
                <Link
                  to="/checkout"
                  onClick={e => selectedItems.length === 0 && e.preventDefault()}
                  className={`w-full block text-center font-bold py-4 text-sm uppercase tracking-wide transition-colors ${
                    selectedItems.length === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#fb641b] hover:bg-[#f4581f] text-white'
                  }`}
                >
                  Place Order
                </Link>
              </div>

              {/* Safety badge */}
              <div className="px-5 pb-4 border-t border-gray-100 pt-3 flex items-center gap-2 text-xs text-gray-500">
                <span className="text-base">🔒</span>
                <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
