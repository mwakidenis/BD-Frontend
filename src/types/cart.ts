export interface ICartItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
  type: string;
  prescription: boolean;
}

export interface ICartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
  shippingInfo: {
    shippingAddress: string;
    shippingCity: string;
  };
  prescriptionImage?: string;
  shippingCost?: number;
}
