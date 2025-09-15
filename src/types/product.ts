export type TMedicineResponse = {
  _id: string;
  name: string;
  description: string;
  type: string;
  manufacturer: string;
  price: number;
  quantity: number;
  discount: number;
  inStock: boolean;
  imageUrl: string[];
  expireDate: string;
  createdAt: string;
  updatedAt: string;
  requiredPrescription: boolean;
  __v: number;
};

export interface IMedicine {
  name: string;
  type: "Tablet" | "Capsule" | "Syrup" | "Injection" | "Cream" | "Drops";
  description: string;
  price: number;
  discount: number;
  imageUrl: string[];
  manufacturer: string;
  quantity: number;
  expireDate: string;
  inStock: boolean;
  requiredPrescription: boolean;
}

export type IMedicineWithId = IMedicine & { _id: string };
