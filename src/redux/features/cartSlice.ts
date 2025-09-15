import { ICartItem, ICartState } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: ICartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  shippingInfo: {
    shippingAddress: "",
    shippingCity: "",
  },
  prescriptionImage: "",
  shippingCost: 60,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      state.totalQuantity += item.quantity;
      state.totalPrice += item.price * item.quantity;
    },

    increaseQuanity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const itemToIncrease = state.items.find((item) => item.id === itemId);

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += itemToIncrease.price;
      }
      return;
    },

    decreaseQuanity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const itemToIncrease = state.items.find((item) => item.id === itemId);

      if (itemToIncrease) {
        itemToIncrease.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= itemToIncrease.price;
      }
      return;
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === itemId);

      if (itemToRemove) {
        state.items = state.items.filter((item) => item.id !== itemId);
        state.totalQuantity -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.prescriptionImage = "";
    },

    addOrderInfo: (state, action) => {
      state.shippingInfo = action.payload.shippingInfo;
    },
    addPrescription: (state, action) => {
      state.prescriptionImage = action.payload;
    },
  },
});

export const totalQuantitySelector = (state: RootState) => {
  return state.cart.totalQuantity;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.items.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      name: product.name,
      price: product.price,
      requiredPrescription: product.prescription,
    })),
    shippingInfo: state.cart.shippingInfo,
    shippingCost: state.cart.shippingCost,
    totalPrice: state.cart.totalPrice,
    prescription: state.cart.prescriptionImage,
  };
};

export const specificProductQuantitySelector = (
  state: RootState,
  payload: { id: string }
) => {
  const cartedProductQuantity =
    state.cart.items.find((p) => p.id === payload.id)?.quantity || 0;
  return {
    cartedProductQuantity,
  };
};

export const cartSelector = (state: RootState) => state.cart;

export const {
  addItemToCart,
  removeItemFromCart,
  addPrescription,
  clearCart,
  increaseQuanity,
  decreaseQuanity,
  addOrderInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
