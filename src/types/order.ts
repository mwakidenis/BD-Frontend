export interface IShippingInfo {
  shippingAddress: string;
  shippingCity: string;
}

export interface IProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  requiredPrescription: boolean;
}

export interface IOrderResponse {
  _id: string;
  userId: string;
  name: string;
  email: string;
  createdAt: string;
  prescription?: string;
  updatedAt: string;
  prescriptionReviewStatus: "pending" | "ok" | "cancelled";
  orderStatus: "pending" | "shipped" | "delivered" | "cancelled";
  paymentStatus: boolean;
  products: IProduct[];
  shippingCost: number;
  shippingInfo: IShippingInfo;
  status: "pending" | "completed" | "cancelled";
  totalPrice: number;
  __v: number;
}
