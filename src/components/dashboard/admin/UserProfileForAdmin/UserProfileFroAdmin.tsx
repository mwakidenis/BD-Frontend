"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Mail, ShoppingCart, Star, Truck } from "lucide-react";
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
    <div className="w-full px-3 md:px-6 py-8 space-y-12 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      {/* User Info */}
      <MotionCard
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto rounded-2xl shadow-2xl border border-slate-200/60 dark:border-gray-700/60 bg-gradient-to-tr from-white to-slate-50 dark:from-gray-800 dark:to-gray-900"
      >
        <CardHeader className="flex flex-col items-center space-y-4 text-center">
          <Avatar className="w-28 h-28 border-4 border-blue-500/30 shadow-md">
            <AvatarImage src={""} alt={user.name || "User"} />
            <AvatarFallback className="bg-blue-100 text-blue-800 text-3xl dark:bg-gray-700 dark:text-white">
              {user.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 tracking-wide">
            {user.name?.toUpperCase()}
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Admin Panel User Profile
          </p>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 pb-8">
          <InfoItem
            icon={<BadgeCheck size={20} />}
            label="Role"
            value={user.role}
          />
          <InfoItem
            icon={<Mail size={20} />}
            label="Email"
            value={user.email}
          />
        </CardContent>
      </MotionCard>

      {/* Last Order Summary */}
      {hasOrders && lastOrder && (
        <MotionCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white my-5">
              Last Order Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-6 pb-8">
            <StatBox
              icon={<ShoppingCart />}
              label="Products"
              value={lastOrder.products.length}
            />
            <StatBox
              icon={<Star />}
              label="Revenue"
              value={`৳${lastOrder.totalPrice}`}
            />
            <StatBox
              icon={<BadgeCheck />}
              label="Payment"
              value={
                lastOrder.paymentStatus ? (
                  <span className="px-2 py-1 text-xs rounded-full bg-green-600 text-white">
                    Paid
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-600 text-white">
                    Unpaid
                  </span>
                )
              }
            />
            <StatBox
              icon={<Truck />}
              label="Status"
              value={
                <span
                  className={cn(
                    "px-2 py-1 text-xs rounded-full font-medium",
                    lastOrder.orderStatus === "pending" &&
                      "bg-yellow-200 text-yellow-800",
                    lastOrder.orderStatus === "shipped" &&
                      "bg-blue-200 text-blue-800",
                    lastOrder.orderStatus === "delivered" &&
                      "bg-green-200 text-green-800",
                    lastOrder.orderStatus === "cancelled" &&
                      "bg-red-200 text-red-800"
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
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-white">
            User Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto px-6 pb-6">
          <table className="min-w-full text-sm text-slate-700 dark:text-gray-200">
            <thead>
              <tr className="text-left border-b border-slate-200 dark:border-gray-600">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Total</th>
                <th className="py-2 px-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-2 px-3 font-mono text-xs">{order._id}</td>
                    <td className="py-2 px-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          order.orderStatus === "pending" &&
                            "bg-yellow-100 text-yellow-700",
                          order.orderStatus === "shipped" &&
                            "bg-blue-100 text-blue-700",
                          order.orderStatus === "delivered" &&
                            "bg-green-100 text-green-700",
                          order.orderStatus === "cancelled" &&
                            "bg-red-100 text-red-700"
                        )}
                      >
                        {order.orderStatus.charAt(0).toUpperCase() +
                          order.orderStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-2 px-3">৳{order.totalPrice}</td>
                    <td className="py-2 px-3">
                      <Button className="bg-blue-600" size="sm">
                        <Link href={`/admin/orders/${order._id}`}>View</Link>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    No orders found.
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
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-white">
            User Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 px-6 pb-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-xl p-4 shadow-sm bg-slate-50 dark:bg-gray-700 hover:shadow-md transition"
              >
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">
                  {review.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
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
            <p className="text-gray-500 dark:text-gray-300 text-center py-4">
              This user hasn’t left any reviews yet.
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
  <div className="flex items-center space-x-3">
    <div className="text-blue-600 dark:text-blue-400">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-base font-semibold text-slate-800 dark:text-white">
        {value || "—"}
      </p>
    </div>
  </div>
);

const StatBox = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-100 dark:bg-gray-700 shadow-inner">
    <div className="text-blue-600 dark:text-blue-400 mb-2">{icon}</div>
    <p className="text-xs text-gray-500 dark:text-gray-300">{label}</p>
    <p className="text-sm font-bold text-slate-800 dark:text-white">{value}</p>
  </div>
);
