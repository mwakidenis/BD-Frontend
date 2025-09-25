export type TProductResponse = {
  _id: string;
  name: string;
  description: string;
  category: string;
  manufacturer: string;
  price: number;
  quantity: number;
  discount: number;
  inStock: boolean;
  imageUrl: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface IProduct {
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  imageUrl: string[];
  manufacturer: string;
  quantity: number;
  inStock: boolean;
}

export type IProductWithId = IProduct & { _id: string };
