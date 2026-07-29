import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { Product, CartItem } from '../types';

// ─── Wishlist item type ───────────────────────────────────────────────────────
export interface WishlistItem extends Product {}

// ─── State ───────────────────────────────────────────────────────────────────
type CartState = {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  wishlistItems: WishlistItem[];
};

// ─── Actions ─────────────────────────────────────────────────────────────────
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string };

// ─── Context type ─────────────────────────────────────────────────────────────
type CartContextType = CartState & {
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (product: Product) => 'added' | 'removed';
};

// ─── Initial state ────────────────────────────────────────────────────────────
const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  wishlistItems: [],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const calcTotals = (cartItems: CartItem[]) => ({
  totalItems: cartItems.reduce((t, i) => t + i.quantity, 0),
  totalPrice: cartItems.reduce((t, i) => t + i.price * i.quantity, 0),
});

// ─── Reducer ──────────────────────────────────────────────────────────────────
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const idx = state.cartItems.findIndex((i) => i.id === action.payload.id);
      const updatedItems =
        idx >= 0
          ? state.cartItems.map((i, n) =>
              n === idx ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...state.cartItems, { ...action.payload, quantity: 1 }];
      return { ...state, ...calcTotals(updatedItems), cartItems: updatedItems };
    }
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.cartItems.filter((i) => i.id !== action.payload);
      return { ...state, ...calcTotals(updatedItems), cartItems: updatedItems };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0)
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: id });
      const updatedItems = state.cartItems.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
      return { ...state, ...calcTotals(updatedItems), cartItems: updatedItems };
    }
    case 'CLEAR_CART':
      return { ...state, cartItems: [], totalItems: 0, totalPrice: 0 };

    // ─── Wishlist ────────────────────────────────────────────────────────────
    case 'ADD_TO_WISHLIST': {
      const exists = state.wishlistItems.some((i) => i.id === action.payload.id);
      if (exists) return state;
      return { ...state, wishlistItems: [...state.wishlistItems, action.payload] };
    }
    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter((i) => i.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

// ─── Context ──────────────────────────────────────────────────────────────────
export const CartContext = createContext<CartContextType>({
  ...initialState,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  toggleWishlist: () => 'added',
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialState = (): CartState => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Guard: old stored state may not have wishlistItems
        return {
          ...initialState,
          ...parsed,
          wishlistItems: Array.isArray(parsed.wishlistItems) ? parsed.wishlistItems : [],
          cartItems: Array.isArray(parsed.cartItems) ? parsed.cartItems : [],
        };
      }
      return initialState;
    } catch {
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = useCallback(
    (product: Product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    []
  );
  const removeFromCart = useCallback(
    (id: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),
    []
  );
  const updateQuantity = useCallback(
    (id: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  // Wishlist actions
  const addToWishlist = useCallback(
    (product: Product) => dispatch({ type: 'ADD_TO_WISHLIST', payload: product }),
    []
  );
  const removeFromWishlist = useCallback(
    (id: string) => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id }),
    []
  );
  const isInWishlist = useCallback(
    (id: string) => state.wishlistItems.some((i) => i.id === id),
    [state.wishlistItems]
  );
  const toggleWishlist = useCallback(
    (product: Product): 'added' | 'removed' => {
      const exists = state.wishlistItems.some((i) => i.id === product.id);
      if (exists) {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
        return 'removed';
      } else {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
        return 'added';
      }
    },
    [state.wishlistItems]
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};