"use client";

import React from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/services/order";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MMTable } from "../../DashboardComponent/SoptokBdTable/SoptokBDTable";
import {
  ArrowLeft,
  Package,
  ShoppingBag,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  Calendar,
} from "lucide-react";

interface IShippingInfo {
  shippingAddress: string;
  shippingCity: string;
}

interface IProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrderResponse {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  prescription: string;
  prescriptionReviewStatus: "pending" | "ok" | "cancelled";
  orderStatus: "pending" | "shipped" | "delivered" | "cancelled";
  paymentStatus: boolean;
  products: IProduct[];
  shippingCost: number;
  shippingInfo: IShippingInfo;
  status: "pending" | "completed" | "cancelled";
  totalPrice: number;
  __v: number;
}

interface ManageOrdersProps {
  data: IOrderResponse[];
}

const UserManageOrders: React.FC<ManageOrdersProps> = ({ data }) => {
  const router = useRouter();

  const handlePayment = (id: string) => {
    router.push(`/user/orders/${id}`);
  };

  const handleOrderStatusChange = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.success) {
        toast("Order status updated", { duration: 1200 });
      } else {
        toast(res.message, { duration: 1200 });
      }
    } catch (err) {
      toast("Failed to update order status", { duration: 1200 });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800";
    }
  };

  const columns: ColumnDef<IOrderResponse>[] = [
    {
      accessorKey: "orderStatus",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4" />
          <span>Order Status</span>
        </div>
      ),
      cell: ({ row }) => {
        const status = row.original.orderStatus;
        return (
          <Badge
            className={`${getStatusColor(status)} border font-medium px-3 py-1`}
            variant="outline"
          >
            <span className="flex items-center space-x-2">
              {getStatusIcon(status)}
              <span>{status?.toUpperCase()}</span>
            </span>
          </Badge>
        );
      },
    },

    {
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4" />
          <span>Payment</span>
        </div>
      ),
      cell: ({ row }) =>
        row.original.paymentStatus ? (
          <Badge
            className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800 border font-medium px-3 py-1"
            variant="outline"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        ) : (
          <Badge
            className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800 border font-medium px-3 py-1"
            variant="outline"
          >
            <XCircle className="w-3 h-3 mr-1" />
            Unpaid
          </Badge>
        ),
    },
    {
      accessorKey: "shippingCost",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4" />
          <span>Shipping</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 dark:text-white">
          ৳{row.original.shippingCost.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4" />
          <span>Total</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-bold text-lg text-blue-600 dark:text-blue-400">
          ৳{row.original.totalPrice.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "shippingInfo",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>Delivery Address</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="max-w-xs">
          <p className="font-medium text-gray-900 dark:text-white truncate">
            {row.original.shippingInfo.shippingAddress}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {row.original.shippingInfo.shippingCity}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "products",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-4 h-4" />
          <span>Products</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="space-y-2 max-w-md">
          {row.original.products.slice(0, 2).map((product, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Qty: {product.quantity}
                    </span>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      ৳{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {row.original.products.length > 2 && (
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
              +{row.original.products.length - 2} more items
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Order Date</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-white">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {new Date(row.original.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ),
    },
  ];

  const getOrderSummary = () => {
    const totalOrders = data.length;
    const paidOrders = data.filter((order) => order.paymentStatus).length;
    const pendingOrders = data.filter(
      (order) => order.orderStatus === "pending"
    ).length;
    const deliveredOrders = data.filter(
      (order) => order.orderStatus === "delivered"
    ).length;

    return { totalOrders, paidOrders, pendingOrders, deliveredOrders };
  };

  const { totalOrders, paidOrders, pendingOrders, deliveredOrders } =
    getOrderSummary();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                    My Orders
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Track and manage your orders
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Orders
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalOrders}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Orders
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {totalOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Paid Orders
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {paidOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 dark:bg-orange-900/50 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Pending
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {pendingOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Delivered
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {deliveredOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShoppingBag className="w-6 h-6" />
              Order History
              <Badge className="bg-white/20 text-white border-white/30 ml-auto">
                {totalOrders} Orders
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {data.length > 0 ? (
              <MMTable data={data} columns={columns} />
            ) : (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No orders found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  You haven't placed any orders yet. Start shopping to see your
                  orders here.
                </p>
                <Link href={"/shop"}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManageOrders;
