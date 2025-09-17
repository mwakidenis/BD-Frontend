"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Shield,
  Truck,
  Clock,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addItemToCart,
  specificProductQuantitySelector,
} from "@/redux/features/cartSlice";
import { useUser } from "@/context/UserContext";

import { createReview } from "@/services/review";
import { TMedicineResponse } from "@/types/product";
import { TReview, TReviewResponse } from "@/types/review";
import MedicineCard from "../shop/ProductCard";
import Input2 from "../ui/Input2";

export default function MedicineDetail({
  medicine,
  reviews,
  relatedMedicines,
}: {
  medicine: TMedicineResponse;
  reviews: TReviewResponse[];
  relatedMedicines: TMedicineResponse[];
}) {
  const router = useRouter();
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const userHasReview = reviews?.some(
    (review) => review.userId && review.userId._id === user?.id
  );

  const [selectedImage, setSelectedImage] = useState(medicine.imageUrl[0]);
  const { cartedProductQuantity } = useAppSelector((state) =>
    specificProductQuantitySelector(state, { id: medicine._id })
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const handleStarClick = (value: number) => setRating(value);

  const handleSubmit = async () => {
    try {
      if (!user?.id) return toast.error("Please login first!");
      if (userHasReview)
        return toast.error("You have already reviewed this product.");
      if (title.length < 3 || title.length > 100)
        return toast.error("Title must be between 3 and 100 characters.");
      if (description.length < 10 || description.length > 1000)
        return toast.error(
          "Description must be between 10 and 1000 characters."
        );
      if (rating === 0) return toast.error("Please give a rating.");

      const reviewData: TReview = {
        userId: user.id,
        productId: medicine._id,
        title,
        description,
        rating,
      };

      const res = await createReview(reviewData);
      if (res?.success) {
        toast.success(res.message);
        setTitle("");
        setDescription("");
        setRating(0);
      } else {
        toast.error(res.message || "Failed to submit review.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: medicine._id,
        name: medicine.name,
        quantity: 1,
        price: medicine.price,
        image: medicine.imageUrl[0],
        description: medicine.description,
        type: medicine.type,
        prescription: medicine.requiredPrescription,
      })
    );
    toast.success("Product added to cart!", { duration: 1000 });
    router.push("/cart");
  };

  const averageRating =
    reviews?.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  const discountedPrice = medicine.price * (1 - medicine.discount / 100);
  const savings = medicine.price - discountedPrice;

  return (
    <div className="min-h-screen dark:from-slate-900 dark:to-blue-900 my-10">
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative bg-white dark:bg-slate-800 p-8 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center"
                >
                  <Image
                    width={400}
                    height={400}
                    src={selectedImage}
                    alt={medicine.name}
                    className="w-80 h-80 object-contain "
                  />
                </motion.div>
              </AnimatePresence>
              {medicine.discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-sm font-bold">
                  -{medicine.discount}%
                </Badge>
              )}
            </div>

            <div className="flex gap-3 justify-center">
              {medicine.imageUrl.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === image
                      ? "border-black shadow-lg"
                      : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    width={80}
                    height={80}
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </motion.div>
              ))}
            </div>
            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Truck className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Safe Delivery</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">100% Authentic</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">Quality Assured</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <Badge
                variant="secondary"
                className="mb-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {medicine.type}
              </Badge>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                {medicine.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
                by{" "}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {medicine.manufacturer}
                </span>
              </p>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20  p-6 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ৳{discountedPrice.toFixed(2)}
                </span>
                {medicine.discount > 0 && (
                  <span className="text-lg line-through text-slate-500">
                    ৳{medicine.price.toFixed(2)}
                  </span>
                )}
              </div>
              {medicine.discount > 0 && (
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  You save ৳{savings.toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock & Expiry */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Stock Status:
                </span>
                <Badge
                  className={
                    medicine.inStock
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }
                >
                  {medicine.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Available Quantity:
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {medicine.quantity} units
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Expires on:
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {medicine.expireDate}
                </span>
              </div>
            </div>

            {medicine.requiredPrescription && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-700 dark:text-red-300 font-medium text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Prescription Required - Please consult your doctor
                </p>
              </div>
            )}
            {/* Description */}
            <div className="bg-white dark:bg-slate-800  p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                Description
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {medicine.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={
                  !medicine.inStock ||
                  user?.role === "admin" ||
                  cartedProductQuantity >= medicine.quantity
                }
                className="w-full "
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {medicine.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {Array.isArray(relatedMedicines) && relatedMedicines.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Related Products
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Discover similar medicines that might interest you
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedMedicines.map((med, index) => (
                <motion.div
                  key={med._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <MedicineCard medicine={med} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Reviews Section */}
        {Array.isArray(reviews) && reviews.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Customer Reviews
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={`${
                        star <= Math.round(Number(averageRating))
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-600 dark:text-slate-400 ml-2">
                  {averageRating} out of 5 ({reviews.length} reviews)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => {
                const isCurrentUser = review.userId?._id === user?.id;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-slate-800  p-6 shadow-lg border-2 transition-all ${
                      isCurrentUser
                        ? "border-blue-200 dark:border-blue-700 shadow-blue-100 dark:shadow-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <Image
                          width={48}
                          height={48}
                          src="https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
                          alt={review.userId?.name || "Reviewer"}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {isCurrentUser && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                        )}
                      </div>
                      <div>
                        <h4
                          className={`font-semibold ${
                            isCurrentUser
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {review.userId?.name}
                          {isCurrentUser && (
                            <span className="text-xs ml-1">(You)</span>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={`${
                                  star <= review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-slate-300 dark:text-slate-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h5 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {review.title}
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      "{review.description}"
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Review Form */}
        {!userHasReview && user && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-slate-800 shadow-xl dark:border-slate-700 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Share Your Experience
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Help others by reviewing{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {medicine.name}
                  </span>
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Review Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Summarize your experience..."
                    className="mt-2 border-2 border-slate-200 dark:border-slate-700 focus:border-gray-500 dark:focus:border-gray-400"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Detailed Review
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share your detailed experience with this medicine..."
                    rows={4}
                    className="mt-2 border-2 border-slate-200 rounded-none dark:border-slate-700 focus:border-gray-500 dark:focus:border-gray-400 resize-none"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                    Your Rating
                  </Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => handleStarClick(star)}
                      >
                        <Star
                          size={25}
                          className={`cursor-pointer transition-colors ${
                            rating >= star
                              ? "text-yellow-600 fill-yellow-600"
                              : "text-slate-300 dark:text-slate-600 hover:text-yellow-200"
                          }`}
                        />
                      </motion.button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-3 text-sm text-slate-600 dark:text-slate-400">
                        ({rating} star{rating !== 1 ? "s" : ""})
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!rating || !title.trim() || !description.trim()}
                  className="w-full cursor-pointer"
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
