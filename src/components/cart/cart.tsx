"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import {
  addOrderInfo,
  clearCart,
  decreaseQuanity,
  increaseQuanity,
  orderSelector,
  removeItemFromCart,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TProductResponse } from "@/types/product";

const Cart = ({ products }: { products: TProductResponse[] }) => {
  const router = useRouter();
  const orderInfo = useAppSelector(orderSelector);

  const [shippingInfo, setShippingInfo] = useState(orderInfo.shippingInfo);

  const { items: cartItems, totalPrice } = useAppSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedInfo = { ...shippingInfo, [name]: value };
    setShippingInfo(updatedInfo);
    dispatch(addOrderInfo({ shippingInfo: updatedInfo }));
  };

  const handleIncreaseQuantity = (id: string) => {
    const specificProduct = products?.find((product) => product._id === id);

    if (!specificProduct) {
      toast.error("Product not found");
      return;
    }

    const cartedProductQuantity = cartItems.find(
      (cartItem) => cartItem.id === id
    )?.quantity as number;

    if (cartedProductQuantity >= specificProduct.quantity) {
      toast.error("Maximum amount carted");
    } else {
      dispatch(increaseQuanity(id));
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);

    if (item && item.quantity > 1) {
      dispatch(decreaseQuanity(id));
    } else {
      toast.warning("Quantity can't go below 1");
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleSubmit = () => {
    if (cartItems.length > 0) {
      dispatch(addOrderInfo({ shippingInfo }));
      router.push("/user/checkout");
    } else {
      toast.warning("No Product in CART");
    }
  };

  return (
    <div className="flex justify-center items-center lg:min-h-screen py-10 px-4">
      {cartItems.length > 0 ? (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Your Shopping Cart
            </h2>

            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="shadow-md border border-muted bg-card hover:shadow-lg transition"
              >
                <CardContent className="flex flex-col sm:flex-row gap-6 p-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-xl border"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      Product Name : {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Category : {item.category}
                    </p>
                    <p className="text-sm mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-lg font-bold mt-3 text-primary">
                      ৳{item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-3 justify-between sm:justify-start">
                    <Button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      variant="outline"
                      size="icon"
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="font-medium">{item.quantity}</span>
                    <Button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      variant="outline"
                      size="icon"
                    >
                      <Plus size={16} />
                    </Button>
                    <Button
                      onClick={() => handleRemoveItem(item.id)}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleClearCart}
                variant="destructive"
                className="mt-4"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary Section */}
          <Card className="h-fit border border-muted shadow-lg bg-card">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Order Summary
              </h2>

              <ul className="space-y-2 text-sm">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <Separator />

              {/* Shipping Inputs */}
              <div className="text-sm space-y-3">
                <p className="font-medium">Delivery Address</p>
                <Input
                  name="shippingAddress"
                  placeholder="Street address"
                  value={shippingInfo.shippingAddress}
                  onChange={handleChange}
                />
                <Input
                  name="shippingCity"
                  placeholder="City"
                  value={shippingInfo.shippingCity}
                  onChange={handleChange}
                />
              </div>

              <Separator />

              <div className="flex justify-between text-sm">
                <span>Shipping Cost</span>
                <span className="font-medium">৳ 60.00</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  ৳ {(totalPrice + 60).toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              {shippingInfo.shippingAddress && shippingInfo.shippingCity ? (
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white text-base py-2"
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <p className="text-teal-600 font-medium text-center">
                  Shipping Address Required!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="min-h-[60vh] flex flex-col justify-center items-center text-center space-y-6">
          <ShoppingCart size={80} className="text-gray-400" />
          <p className="text-gray-700 dark:text-gray-200 font-semibold text-2xl">
            Your cart is empty
          </p>
          <Button
            onClick={() => router.push("/shop")}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
