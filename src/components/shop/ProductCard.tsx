"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart,
  Calendar,
  Package,
  Stethoscope,
  Info,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addItemToCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { TProductResponse } from "@/types/product";

export default function ProductCard({
  product,
}: {
  product: TProductResponse;
}) {
  const {
    name,
    description,
    category,
    price,
    discount,
    quantity,
    imageUrl,
    _id,
  } = product;

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: _id,
        name,
        quantity: 1,
        price,
        image: product.imageUrl[0],
        description,
        category,
      })
    );

    toast.success(`${name} added to cart!`, { duration: 1000 });
  };

  const { user } = useUser();
  const [showCartIcon, setShowCartIcon] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (quantity <= 0) return;

    setIsLoading(true);
    handleAddToCart();
    setShowCartIcon(false);

    setTimeout(() => {
      setShowCartIcon(true);
      setIsLoading(false);
    }, 1000);
  };

  const discountedPrice = price * (1 - discount / 100);
  const isOutOfStock = quantity <= 0;
  const isLowStock = quantity > 0 && quantity <= 5;

  return (
    <motion.div
      className="h-full group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 flex flex-col h-full relative transition-shadow duration-300">
        {/* Image Container with Overlay Effects */}
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl[0] || "/placeholder-product.jpg"}
            alt={name}
            width={400}
            height={250}
            className="object-cover w-full h-52 transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Discount Badge */}
          {discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-3 left-3 z-10"
            >
              <Badge className="bg-red-500/80 hover:bg-red-600 text-white font-semibold px-3 py-1 text-sm shadow-lg">
                -{discount}% OFF
              </Badge>
            </motion.div>
          )}

          {/* Stock Status Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
              <Badge className="bg-red-600 text-white px-4 py-2 text-lg font-bold">
                OUT OF STOCK
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5 flex flex-col flex-grow space-y-4">
          {/* Header Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-md min-h-[50px] font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                {name}
              </h3>

              {/* Stock Badge */}
              <div className="flex flex-col items-end gap-1">
                {/* product Type */}
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex justify-between items-center gap-2 my-4">
              {discount > 0 && (
                <span className="text-lg font-semibold text-red-400 line-through">
                  ৳{price.toFixed(2)}
                </span>
              )}
              <span className="text-lg font-bold text-primary">
                ৳{discountedPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              {discount > 0 && (
                <span className="text-sm text-green-600 font-medium">
                  Save ৳{(price - discountedPrice).toFixed(2)}
                </span>
              )}
              {!isOutOfStock && (
                <Badge
                  className={`text-xs font-semibold px-2 py-1 ${
                    isLowStock
                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                      : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  }`}
                >
                  <Package size={10} className="mr-1" />
                  {quantity} left
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <Link href={`/product/${_id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full hover:bg-primary hover:text-white transition-all duration-300 group/btn"
              >
                View Details
              </Button>
            </Link>

            {user?.role !== "admin" && !isOutOfStock && (
              <div className="relative">
                <AnimatePresence mode="wait">
                  {showCartIcon && (
                    <motion.button
                      key="cart-button"
                      onClick={handleClick}
                      disabled={isLoading || isOutOfStock}
                      initial={{ opacity: 1, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 360 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group/cart cursor-pointer"
                    >
                      <motion.div
                        animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                        transition={{
                          duration: 0.5,
                          repeat: isLoading ? Infinity : 0,
                        }}
                      >
                        <ShoppingCart
                          size={20}
                          className="group-hover/cart:scale-110 transition-transform duration-200"
                        />
                      </motion.div>
                    </motion.button>
                  )}
                </AnimatePresence>

                {!showCartIcon && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-green-700 rounded-full flex items-center justify-center text-white"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
