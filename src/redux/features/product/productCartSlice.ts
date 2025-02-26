import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, CartState } from "../../../types/AllTypes";

// Initial state for the cart
const initialState: CartState = {
  books: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Book>) => {
      const itemIndex = state.books.findIndex(
        (book) => book._id === action.payload._id
      );

      if (itemIndex === -1) {
        state.books.push({ ...action.payload, cartQuantity: 1 }); // Ensure cartQuantity is set
      } else {
        state.books[itemIndex].cartQuantity += 1; // Increment cartQuantity
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      // action.payload is the book's _id
      state.books = state.books.filter((book) => book._id !== action.payload);
    },
    clearCart: (state) => {
      state.books = [];
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; cartQuantity: number }>
    ) => {
      const itemIndex = state.books.findIndex(
        (book) => book._id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.books[itemIndex].cartQuantity = action.payload.cartQuantity;
      }
    },
  },
});

// Export actions to use in components
export const { addItem, removeItem, clearCart, updateItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
