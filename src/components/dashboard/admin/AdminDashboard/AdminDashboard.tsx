"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  DollarSign,
  Users,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Briefcase,
  CreditCard,
} from "lucide-react";
import { IOrderResponse } from "@/types/order";
import { IUser } from "@/types/user";
import { TProductResponse } from "@/types/product";
import { OrderStatusBar } from "../OrderStatusBar/OrderStatusBar";

const AdminDashboard = ({
  orders,
  users,
  products,
  totalProducts,
}: {
  orders: IOrderResponse[];
  users: IUser[];
  products: TProductResponse[];
  totalProducts: number;
}) => {
  console.log(totalProducts);
  const totalRevenue = orders
    ?.filter((order) => order.paymentStatus)
    .reduce((sum, order) => order.totalPrice + sum, 0);

  const pendingOrders = orders?.filter(
    (order) => order.orderStatus === "pending"
  );
  const shippedOrders = orders?.filter(
    (order) => order.orderStatus === "shipped"
  );
  const deliveredOrders = orders?.filter(
    (order) => order.orderStatus === "delivered"
  );
  const cancelledOrders = orders?.filter(
    (order) => order.orderStatus === "cancelled"
  );

  const [duePayments, setDuePayments] = useState(2000);

  const orderStatusData = [
    { name: "Pending", value: pendingOrders.length },
    { name: "Shipped", value: shippedOrders.length },
    { name: "Delivered", value: deliveredOrders.length },
    { name: "Cancelled", value: cancelledOrders.length },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-gray-100">
        Business Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        {/* Total Products */}
        <Card className="group p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Total Products
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                {totalProducts}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        {/* Total Users */}
        <Card className="group p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                {users?.length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        {/* Total Revenue */}
        <Card className="group p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Total Revenue
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                ${totalRevenue}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        {/* Row 2 */}
        {/* Total Orders */}
        <Card className="group p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Total Orders
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                {orders?.length}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </Card>

        {/* Pending Orders */}
        <Card className="group p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 hover:shadow-lg hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Pending Orders
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                {pendingOrders?.length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>

        {/* Shipped Orders */}
        <Card className="group p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Shipped Orders
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                {shippedOrders?.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
              <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        {/* Row 3 */}
        {/* Delivered Orders */}
        <Card className="group p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Delivered Orders
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                {deliveredOrders?.length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        {/* Cancelled Orders */}
        <Card className="group p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Cancelled Orders
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                {cancelledOrders?.length}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts & Tables */}

      <div className="py-10">
        <OrderStatusBar orderStatusData={orderStatusData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
