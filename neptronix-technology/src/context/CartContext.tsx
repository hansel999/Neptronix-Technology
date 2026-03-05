import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_ITEM_SELECTION'; payload: string };

interface CartContextType {
  state: CartState;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleItemSelection: (productId: string) => void;
  getSelectedItems: () => CartItem[];
  getSelectedTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems = [...state.items, { product, quantity, selected: true }];
      }
      
      return calculateTotals({ ...state, items: newItems });
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      return calculateTotals({ ...state, items: newItems });
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = state.items.filter(item => item.product.id !== productId);
        return calculateTotals({ ...state, items: newItems });
      }
      
      const newItems = state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return calculateTotals({ ...state, items: newItems });
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    
    case 'TOGGLE_ITEM_SELECTION': {
      const newItems = state.items.map(item =>
        item.product.id === action.payload ? { ...item, selected: !item.selected } : item
      );
      return calculateTotals({ ...state, items: newItems });
    }
    
    default:
      return state;
  }
};

const calculateTotals = (state: CartState): CartState => {
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  return { ...state, itemCount, total };
};

const CART_KEY = 'neptronix_cart';

const loadCart = (): CartState => {
  try {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      const items = JSON.parse(saved);
      if (Array.isArray(items)) return calculateTotals({ items, total: 0, itemCount: 0 });
    }
  } catch {}
  return { items: [], total: 0, itemCount: 0 };
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleItemSelection = (productId: string) => {
    dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: productId });
  };

  const getSelectedItems = (): CartItem[] => {
    return state.items.filter(item => item.selected);
  };

  const getSelectedTotal = (): number => {
    return state.items
      .filter(item => item.selected)
      .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleItemSelection,
        getSelectedItems,
        getSelectedTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
