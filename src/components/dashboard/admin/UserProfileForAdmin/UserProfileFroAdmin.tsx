"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  BadgeCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import { IOrderResponse } from "@/types/order";
import { TReviewResponse } from "@/types/review";

const MotionCard = motion(Card);

const UserProfileForAdmin = ({
  user,
  orders,
  reviews,
}: {
  user: IUser;
  orders: IOrderResponse[];
  reviews: TReviewResponse[];
}) => {
  const hasOrders = orders.length > 0;
  const lastOrder = hasOrders ? orders[orders.length - 1] : null;

  function cn(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="w-full px-2 md:px-4 py-6 space-y-10">
      {/* User Info */}
      <MotionCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl border-none rounded-3xl shadow-lg mx-auto p-6 bg-white dark:bg-gray-800"
      >
        <CardHeader className="flex items-center flex-col space-y-4">
          <Avatar className="w-24 h-24 border-4 border-blue-100 shadow-md dark:border-gray-600">
            <AvatarImage src={""} alt={user.name || "User"} />
            <AvatarFallback className="bg-blue-100 text-blue-800 text-2xl dark:bg-gray-700 dark:text-white">
              {user.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold text-slate-800 dark:text-white">
            {user.name?.toUpperCase()}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 pb-6">
          <InfoItem
            icon={<BadgeCheck size={18} />}
            label="Role"
            value={user.role}
          />
          <InfoItem
            icon={<Mail size={18} />}
            label="Email"
            value={user.email}
          />
          {/* <InfoItem icon={<User size={18} />} label="Phone" value={user.phone || 'Not provided'} /> */}
        </CardContent>
      </MotionCard>

      {/* Last Order Summary */}
      {hasOrders && lastOrder && (
        <MotionCard
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl p-6 rounded-3xl mx-auto border shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 dark:text-white">
              Last Order History
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 pb-6">
            <InfoItem
              icon={<ShoppingCart size={18} />}
              label="Total Products"
              value={lastOrder.products.length}
            />
            <InfoItem
              icon={<Star size={18} />}
              label="Total Revenue"
              value={`৳${lastOrder.totalPrice}`}
            />
            <InfoItem
              icon={<BadgeCheck size={18} />}
              label="Payment Status"
              value={
                <span
                  className={`text-sm font-medium px-1 rounded-sm text-white ${
                    lastOrder.paymentStatus ? "bg-green-600" : "bg-yellow-700"
                  }`}
                >
                  {lastOrder.paymentStatus ? "Paid" : "Unpaid"}
                </span>
              }
            />
            <InfoItem
              icon={<Truck size={18} />}
              label="Order Status"
              value={
                <span
                  className={cn(
                    "text-sm font-medium px-1 rounded-sm dark:bg-gray-700",
                    lastOrder.orderStatus === "pending" && "text-yellow-700",
                    lastOrder.orderStatus === "shipped" && "text-blue-700",
                    lastOrder.orderStatus === "delivered" && "text-green-700",
                    lastOrder.orderStatus === "cancelled" && "text-red-700"
                  )}
                >
                  {lastOrder.orderStatus.charAt(0).toUpperCase() +
                    lastOrder.orderStatus.slice(1)}
                </span>
              }
            />
          </CardContent>
        </MotionCard>
      )}

      {/* All Orders */}
      <MotionCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl p-6 mx-auto rounded-3xl border shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
      >
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 dark:text-white">
            User Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto px-4 pb-6">
          <table className="min-w-full text-sm text-slate-700 dark:text-gray-200">
            <thead>
              <tr className="text-left border-b border-slate-200 dark:border-gray-600">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2 pr-4">Order Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b transition-colors hover:bg-blue-50 dark:hover:bg-gray-700 dark:border-gray-600"
                  >
                    <td className="py-2 pr-4">{order._id}</td>
                    <td className="py-2 pr-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 pr-4 font-semibold">
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-sm",
                          order.orderStatus === "pending" && "text-yellow-600",
                          order.orderStatus === "shipped" && "text-blue-600",
                          order.orderStatus === "delivered" && "text-green-600",
                          order.orderStatus === "cancelled" && "text-red-600"
                        )}
                      >
                        {order.orderStatus.charAt(0).toUpperCase() +
                          order.orderStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-2 pr-4">৳{order.totalPrice}</td>
                    <td className="py-2 pr-4">
                      <Button variant="outline">
                        <Link href={`/admin/orders/${order._id}`}>More</Link>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                  >
                    No orders found for this user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </MotionCard>

      {/* Reviews */}
      <MotionCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-6xl p-3 mx-auto rounded-3xl border shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
      >
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 dark:text-white">
            User Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 pb-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-lg p-4 bg-slate-50 hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                <p className="font-semibold text-blue-700 dark:text-blue-400">
                  {review.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {review.description}
                </p>
                {review.rating && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              This user hasn't left any reviews yet.
            </p>
          )}
        </CardContent>
      </MotionCard>
    </div>
  );
};

export default UserProfileForAdmin;

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start space-x-3">
    <div className="text-blue-600 mt-1 dark:text-blue-400">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground dark:text-gray-400">
        {label}
      </p>
      <p className="text-base font-medium text-slate-800 break-words sm:break-after-avoid dark:text-white">
        {value || "—"}
      </p>
    </div>
  </div>
);
