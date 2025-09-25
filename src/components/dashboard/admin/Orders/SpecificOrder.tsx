"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { IOrderResponse } from "@/types/order";

const SpecificOrder = async ({ order }: { order: IOrderResponse }) => {
  const {
    shippingInfo,
    shippingCost,
    totalPrice,
    products,
    paymentStatus,
    _id,
    createdAt,
    orderStatus,
    name,
    email,
  } = order;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Order Summary */}
      <Card className="rounded-3xl shadow-lg p-8 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-base">
          <Info label="Customer Name" value={name} />
          <Info label="Email" value={email} />
          <Info label="Order ID" value={_id} />
          <Info
            label="Placed On"
            value={new Date(createdAt).toLocaleDateString()}
          />
          <Info
            label="Total Products"
            value={products.reduce((sum, p) => sum + p.quantity, 0)}
          />
          <Info label="Shipping Address" value={shippingInfo.shippingAddress} />
          <Info label="Shipping City" value={shippingInfo.shippingCity} />
          <Info label="Shipping Cost" value={`৳${shippingCost}`} />
          <Info
            label="Order Status"
            value={
              <Badge variant="outline" className="text-blue-600">
                {orderStatus.toUpperCase()}
              </Badge>
            }
          />
          <Info
            label="Payment Status"
            value={<PaymentStatusBadge paymentStatus={paymentStatus} />}
          />
          <Info
            label="Total Price"
            value={
              <span className="font-semibold text-green-700 text-lg">
                ৳{totalPrice}
              </span>
            }
          />
        </CardContent>
      </Card>

      {/* Products */}
      <Card className="rounded-3xl shadow-lg p-8 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Products</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <div
              key={product.productId._id}
              className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition-all bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-24 h-24 relative rounded-xl overflow-hidden">
                  <Image
                    src={product.productId.imageUrl[0] || "/placeholder.png"}
                    alt={product.productId.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg">
                    {product.productId.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {product.productId.type}
                  </p>
                  <p className="font-medium text-green-700">
                    ৳{product.productId.price}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p>Manufacturer: {product.productId.manufacturer}</p>
                <p>Expiry: {product.productId.expireDate}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

// Info component
const Info = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-base font-medium text-gray-800 dark:text-gray-200">
      {value}
    </p>
  </div>
);

// PaymentStatusBadge component
const PaymentStatusBadge = ({ paymentStatus }: { paymentStatus: boolean }) => (
  <Badge
    variant="secondary"
    className={`uppercase text-white px-3 py-1 rounded-full ${
      paymentStatus ? "bg-green-600" : "bg-red-600"
    }`}
  >
    {paymentStatus ? "Done" : "Due"}
  </Badge>
);

export default SpecificOrder;
