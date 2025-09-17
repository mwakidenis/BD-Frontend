"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Mail,
  MapPin,
  ListOrdered,
  PenBox,
  Star,
  StarIcon,
  Package,
  Calendar,
  User,
  ShoppingBag,
  MessageSquare,
  MapPinIcon,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { IOrderResponse } from "@/types/order";
import { IUser } from "@/types/user";
import { TReviewResponse } from "@/types/review";

// InfoItem Component
const InfoItem = ({
  icon,
  label,
  value,
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
  variant?: "default" | "highlight";
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
    <div className="text-blue-600 dark:text-blue-400 mt-1 p-1 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </p>
      <p
        className={`text-base font-semibold break-words ${
          variant === "highlight"
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-900 dark:text-white"
        }`}
      >
        {value || "—"}
      </p>
    </div>
  </div>
);

// ReviewCard Component
const ReviewCard = ({ review }: { review: TReviewResponse }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-semibold text-base text-gray-900 dark:text-white pr-2 line-clamp-2">
        {review.title}
      </h3>
      <div className="flex items-center space-x-1 flex-shrink-0">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    </div>

    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
      {review.description}
    </p>

    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
          <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {review.userId?.name?.trim() || "Anonymous"}
        </span>
      </div>
      <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="w-3 h-3" />
        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  </div>
);

const UserProfile = ({
  orders,
  user,
  reviews,
}: {
  orders: IOrderResponse[];
  user: IUser & { iat: string };
  reviews: TReviewResponse[];
}) => {
  const lastOrder = orders[orders.length - 1];
  const lastLogin = user.iat ? new Date(Number(user.iat) * 1000) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white/30 shadow-lg">
                  <AvatarImage alt={user?.name || "User"} />
                  <AvatarFallback className="bg-white/20 backdrop-blur-sm text-white font-bold text-2xl">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-green-400 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <BadgeCheck className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  {user.name}
                </h1>
                <div className="flex items-center space-x-3 mb-3">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    {user.role}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-100" />
                    <span className="text-blue-100 text-sm">
                      Last seen{" "}
                      {lastLogin
                        ? format(lastLogin, "MMM dd, yyyy")
                        : "Unknown"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm">{orders.length} Orders</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">
                      {reviews?.length || 0} Reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/user/update-profile">
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-200">
                <PenBox className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <InfoItem
                  icon={<BadgeCheck className="w-4 h-4" />}
                  label="Account Role"
                  value={user.role}
                  variant="highlight"
                />
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Email Address"
                  value={user.email}
                />
                <InfoItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Member Since"
                  value={
                    lastLogin ? format(lastLogin, "MMMM yyyy") : "Recently"
                  }
                />
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPinIcon className="w-5 h-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {lastOrder?.shippingInfo ? (
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {lastOrder.shippingInfo.shippingAddress}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {lastOrder.shippingInfo.shippingCity}
                    </p>
                    <div className="flex items-center space-x-2 mt-3 text-green-600 dark:text-green-400">
                      <BadgeCheck className="w-4 h-4" />
                      <span className="text-sm">Verified Address</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No delivery address on file
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Orders and Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Orders Section */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="w-5 h-5" />
                    Recent Orders ({orders.length})
                  </CardTitle>
                  {orders.length > 0 && (
                    <Link href="/user/orders">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        View All
                      </Button>
                    </Link>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {lastOrder ? (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Latest Order
                      </h3>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {lastOrder.products.length} item
                        {lastOrder.products.length > 1 ? "s" : ""}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">
                          {lastOrder.products[0].name}
                          {lastOrder.products.length > 1 &&
                            ` +${lastOrder.products.length - 1} more`}
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          ৳{lastOrder.totalPrice.toLocaleString()}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                        <Link
                          href="/user/orders"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          View order details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      No orders placed yet
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Start Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="w-5 h-5" />
                  Your Reviews ({reviews?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {reviews?.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {reviews.slice(0, 4).map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      No reviews submitted yet
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      Share your experience with others by writing reviews
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
