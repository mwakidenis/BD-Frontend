export interface IShippingInfo {
  shippingAddress: string;
  shippingCity: string;
}

export interface IProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrderResponse {
  _id: string;
  userId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  orderStatus: "pending" | "shipped" | "delivered" | "cancelled";
  paymentStatus: boolean;
  products: IProduct[];
  shippingCost: number;
  shippingInfo: IShippingInfo;
  status: "pending" | "completed" | "cancelled";
  totalPrice: number;
  __v: number;
}
