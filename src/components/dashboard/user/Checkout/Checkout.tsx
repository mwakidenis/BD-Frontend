"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart, orderSelector } from "@/redux/features/cartSlice";
import { useUser } from "@/context/UserContext";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  MapPin,
  User,
  Package,
  CreditCard,
  Shield,
  Truck,
  CheckCircle,
  ArrowLeft,
  CarTaxiFrontIcon,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/services/order";

const Checkout = () => {
  const orderInfo = useAppSelector(orderSelector);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    shippingInfo,
    shippingCost = 60,
    totalPrice = 0,
    products = [],
  } = orderInfo;
  const { user } = useUser();
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isCashOnDeliveryLoading, setIsCashOnDeliveryLoading] = useState(false);

  const handleOrder = async () => {
    if (!products.length) return;

    try {
      setIsPaymentLoading(true);

      const orderedProductInfo = {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        products,
        shippingInfo,
        shippingCost,
        totalPrice: Number(totalPrice + shippingCost),
        orderStatus: "pending",
        paymentStatus: false,
      };

      const res = await createOrder(orderedProductInfo);

      if (res?.success) {
        toast.success(res.message, { duration: 3000 });
        dispatch(clearCart());
        router.push(res?.data || "/user/orders");
      } else {
        toast.error(res?.message, { duration: 1400 });
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const handleCashOnDelivery = async () => {
    if (!products.length) return;

    try {
      setIsCashOnDeliveryLoading(true);

      const orderedProductInfo = {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        products,
        shippingInfo,
        shippingCost,
        totalPrice: Number(totalPrice + shippingCost),
        orderStatus: "pending",
        paymentStatus: false,
      };

      const res = await createOrder(orderedProductInfo);

      if (res?.success) {
        toast.success(res.message, { duration: 3000 });
        dispatch(clearCart());
        router.push("/user/orders");
      } else {
        toast.error(res?.message, { duration: 1400 });
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsCashOnDeliveryLoading(false);
    }
  };

  const isCartEmpty = products.length === 0;
  const subtotal = Number(totalPrice);
  const total = subtotal + Number(shippingCost);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Navigation Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Checkout
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {!isCartEmpty &&
                      `${products.length} item${
                        products.length > 1 ? "s" : ""
                      } in cart`}
                  </p>
                </div>
              </div>
            </div>

            {!isCartEmpty && (
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ৳{total.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {isCartEmpty ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 text-center max-w-md w-full">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Looks like you haven't added any products yet. Start shopping to
                fill your cart!
              </p>
              <Button
                onClick={() => router.push("/shop")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Package className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
            </div>
          </div>
        ) : (
          /* Checkout Content */
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Order Items */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="h-6 w-6" />
                      <div>
                        <h2 className="text-xl font-semibold">Order Summary</h2>
                        <p className="text-blue-100">
                          {products.length} item
                          {products.length > 1 ? "s" : ""} in your order
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">
                      {products.length}{" "}
                      {products.length === 1 ? "Item" : "Items"}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.productId}
                        className="group relative bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                              {product.name}
                            </h3>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  Qty:
                                </span>
                                <Badge
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                                >
                                  {product.quantity}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                ৳{product.price.toLocaleString()} each
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              ৳
                              {(
                                product.price * product.quantity
                              ).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="mt-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Price Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Subtotal ({products.length}{" "}
                          {products.length === 1 ? "item" : "items"})
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ৳{subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-gray-600 dark:text-gray-400">
                          <Truck className="w-4 h-4 mr-2" />
                          Delivery Charges
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ৳{shippingCost}
                        </span>
                      </div>
                      <div className="h-px bg-gray-200 dark:bg-gray-600"></div>
                      <div className="flex justify-between items-center text-xl">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Total Amount
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          ৳{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-2 space-y-6">
              {/* Customer Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Customer Information</h3>
                      <p className="text-green-100 text-sm">Verified Account</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Name
                    </span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {user?.name?.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Email
                    </span>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
                      {user?.email}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Delivery Address</h3>
                      <p className="text-orange-100 text-sm">
                        Where we'll send your order
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {shippingInfo?.shippingAddress}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {shippingInfo?.shippingCity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Delivery available to this address</span>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Ready to Complete Payment?
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Secure checkout powered by trusted payment gateway
                    </p>
                  </div>

                  {/* pay */}
                  <Button
                    onClick={handleOrder}
                    disabled={
                      isCartEmpty || isPaymentLoading || isCashOnDeliveryLoading
                    }
                    className="w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl"
                  >
                    {isPaymentLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Pay ৳{total.toLocaleString()}</span>
                      </div>
                    )}
                  </Button>

                  {/* cash on delivery */}
                  <Button
                    onClick={handleCashOnDelivery}
                    disabled={
                      isCartEmpty || isPaymentLoading || isCashOnDeliveryLoading
                    }
                    className="w-full my-10 py-4 text-lg font-semibold rounded-xl transition-all duration-200 bg-blue-500 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                  >
                    {isCashOnDeliveryLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <ShoppingBag className="w-5 h-5" />
                        <span>Cash On Delivery</span>
                      </div>
                    )}
                  </Button>

                  <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Shield className="w-3 h-3" />
                    <span>
                      256-bit SSL encrypted • Secure payment processing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
