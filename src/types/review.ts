import { TMedicineResponse } from "./product";
import { IUserResponse } from "./user";

export type TReview = {
  title: string;
  description: string;
  userId: string;
  productId: string;
  rating: number;
};

export type TReviewResponse = {
  _id: string;
  title: string;
  description: string;
  userId: IUserResponse;
  productId: TMedicineResponse;
  rating: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
