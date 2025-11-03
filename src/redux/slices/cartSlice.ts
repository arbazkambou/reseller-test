"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  data_quantity: number;
  data_unit: string;
  package_validity: number;
  package_validity_unit: string;
  image_url?: string;
  unlimited: boolean;
  quantity: number;
  provider: string;
  recurring: number;
  can_renew: boolean;
  package_type: string;
}

export interface CartState extends CartItem {
  cart_id: string;
  total_price: number;
}

const initialState: CartState[] = loadFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      if (isQuantityLessThanFive(state)) {
        const cartItem = action.payload;

        const {
          id,
          name,
          price,
          data_quantity,
          data_unit,
          package_validity,
          package_validity_unit,
          image_url,
          quantity,
          unlimited,
          provider,
          can_renew,
          package_type,
        } = cartItem;

        const isItemAlreadyInCart = state.find((item) => item.cart_id === id);

        if (isItemAlreadyInCart) {
          isItemAlreadyInCart.quantity =
            isItemAlreadyInCart.quantity + quantity;
          isItemAlreadyInCart.total_price = Number(
            (price * isItemAlreadyInCart.quantity).toFixed(2),
          );

          saveToLocalStorage(state);
          return;
        }

        const cartObject: CartState = {
          id,
          name,
          price,
          data_quantity,
          data_unit,
          package_validity,
          package_validity_unit,
          image_url,
          quantity,
          cart_id: id,
          provider,
          unlimited,
          total_price: Number((price * quantity).toFixed(2)),
          recurring: 0,
          can_renew,
          package_type,
        };
        state.push(cartObject);
        saveToLocalStorage(state);
      }
    },

    deleteItem(state, action: PayloadAction<string>) {
      const index = state.findIndex((item) => item.cart_id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveToLocalStorage(state);
      }
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      if (isQuantityLessThanFive(state)) {
        const cartItem = state.find((item) => item.cart_id === action.payload);

        if (cartItem) {
          cartItem.quantity++;
          cartItem.total_price = Number(
            (cartItem.price * cartItem.quantity).toFixed(2),
          );
          saveToLocalStorage(state);
        }
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const cartItem = state.find((item) => item.cart_id === action.payload);

      if (cartItem) {
        if (cartItem.quantity === 1) {
          cartSlice.caseReducers.deleteItem(state, action);
          saveToLocalStorage(state);
          return;
        }
        cartItem.quantity--;

        cartItem.total_price = Number(
          (cartItem.price * cartItem.quantity).toFixed(2),
        );
        saveToLocalStorage(state);
      }
    },

    enableRenew(
      state,
      action: PayloadAction<{ id: string; isRenew: boolean }>,
    ) {
      const { id, isRenew } = action.payload;
      const cartItem = state.find((item) => item.cart_id === id);

      if (cartItem) {
        cartItem.recurring = isRenew ? 1 : 0;
        saveToLocalStorage(state);
      }
    },

    clearCart(state) {
      state.length = 0;
      saveToLocalStorage(state);
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  enableRenew,
} = cartSlice.actions;

export function isQuantityLessThanFive(state: CartState[]) {
  const totalItemsQuantity = state.reduce((acc, cur) => acc + cur.quantity, 0);
  if (totalItemsQuantity < 5) {
    return true;
  } else {
    return false;
  }
}

export function getTotalCartItems(state: CartState[]) {
  return state.reduce((acc, cur) => acc + cur.quantity, 0);
}

export function getTotalCartPrice(state: CartState[]) {
  return Number(
    state.reduce((acc, cur) => acc + cur.total_price, 0).toFixed(2),
  );
}

export function getTotalQuantityById(state: CartState[], cartId: string) {
  return state.find((item) => item.cart_id === cartId)?.quantity;
}

export function saveToLocalStorage(cartItems: CartState[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}

export function loadFromLocalStorage(): CartState[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cartItems");

    if (stored) {
      return JSON.parse(stored) as CartState[];
    } else {
      return [];
    }
  } else {
    return [];
  }
}

export const cartReducer = cartSlice.reducer;
