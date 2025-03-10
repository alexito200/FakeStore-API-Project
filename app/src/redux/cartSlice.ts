import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  count: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItemCount: (state, action: PayloadAction<{ id: string; count: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.count = action.payload.count;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    }
  },
});

export const { addItemToCart, removeItemFromCart, updateItemCount, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
