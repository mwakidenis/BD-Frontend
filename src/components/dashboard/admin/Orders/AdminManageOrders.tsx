"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/services/order";
import { toast } from "sonner";
import { IOrderResponse } from "@/types/order";
import { MMTable } from "../../DashboardComponent/SoptokBdTable/SoptokBDTable";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ManageOrdersProps {
  data: IOrderResponse[];
}

const AdminManageOrders: React.FC<ManageOrdersProps> = ({ data }) => {
  const handleOrderStatusChange = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.success) {
        toast.success("Order status updated", { duration: 1200 });
      } else {
        toast.error(res.message, { duration: 1200 });
      }
    } catch (err) {
      toast("Failed to update order status", { duration: 1200 });
    }
  };

  const columns: ColumnDef<IOrderResponse>[] = [
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="bg-gray-200 dark:bg-gray-700 text-xs rounded px-1 mt-1 w-fit">
            {row.original.email}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "orderStatus",
      header: "Order Status",
      cell: ({ row }) => (
        <Select
          defaultValue={row.original.orderStatus}
          onValueChange={(value) =>
            handleOrderStatusChange(row.original._id, value)
          }
        >
          <SelectTrigger className="w-[140px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending"> Pending</SelectItem>
            <SelectItem value="shipped"> Shipped</SelectItem>
            <SelectItem value="delivered"> Delivered</SelectItem>
            <SelectItem value="cancelled"> Cancelled</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) =>
        row.original.paymentStatus ? (
          <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300 dark:bg-emerald-800 dark:text-emerald-100 dark:border-emerald-600">
            Paid
          </Badge>
        ) : (
          <Badge className="bg-rose-100 text-rose-700 border border-rose-300 dark:bg-rose-800 dark:text-rose-100 dark:border-rose-600">
            Unpaid
          </Badge>
        ),
    },
    {
      accessorKey: "shippingCost",
      header: "Shipping",
      cell: ({ row }) => <span>৳{row.original.shippingCost}</span>,
    },
    {
      accessorKey: "totalPrice",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          ৳{row.original.totalPrice}
        </span>
      ),
    },
    {
      accessorKey: "shippingInfo",
      header: "Shipping Info",
      cell: ({ row }) => (
        <div className="text-sm">
          <p>{row.original.shippingInfo.shippingAddress}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {row.original.shippingInfo.shippingCity}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.products.map((product, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs border border-slate-300 dark:border-slate-600"
            >
              {product.name} —{" "}
              <span className="font-medium">Qty {product.quantity}</span>
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
            Manage Orders
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data.length} orders found
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900 p-4">
        <div className="overflow-x-auto">
          <MMTable data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default AdminManageOrders;
