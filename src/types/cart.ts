export interface ICartItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
  category: string;
}

export interface ICartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
  shippingInfo: {
    shippingAddress: string;
    shippingCity: string;
  };
  shippingCost?: number;
}
