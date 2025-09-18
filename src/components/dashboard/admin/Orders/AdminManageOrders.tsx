"use client";

import React from "react";
import Image from "next/image";
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
      header: "Customer info",
      cell: ({ row }) => (
        <div>
          <p className="px-1">{row.original.name}</p>
          <p className="bg-gray-200 dark:bg-gray-700 text-sm rounded px-1">
            {row.original.email}
          </p>
        </div>
      ),
    },
    // {
    //   accessorKey: "prescription",
    //   header: "Prescription",
    //   cell: ({ row }) =>
    //     row.original.prescription ? (
    //       <div className="w-20 h-20 overflow-hidden rounded-md border dark:border-gray-600">
    //         <HoverPrescription
    //           prescription={row.original.prescription}
    //           products={row.original.products}
    //         />
    //       </div>
    //     ) : (
    //       <p className="text-center">N/A</p>
    //     ),
    // },
    {
      accessorKey: "prescriptionReviewStatus",
      header: "Review Status",
      cell: ({ row }) => {
        const status = row.original.prescriptionReviewStatus;
        const colorClasses = {
          ok: "bg-green-100 text-green-600 border-green-300 dark:bg-green-800 dark:text-green-100 dark:border-green-600",
          cancelled:
            "bg-red-100 text-red-600 border-red-300 dark:bg-red-800 dark:text-red-100 dark:border-red-600",
          pending:
            "bg-yellow-100 text-yellow-600 border-yellow-300 dark:bg-yellow-800 dark:text-yellow-100 dark:border-yellow-600",
        };

        return row.original.prescription ? (
          <Badge className={colorClasses[status]}>{status.toUpperCase()}</Badge>
        ) : (
          <p className="text-center">N/A</p>
        );
      },
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
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) =>
        row.original.paymentStatus ? (
          <Badge variant="default">Paid</Badge>
        ) : (
          <Badge variant="destructive">Unpaid</Badge>
        ),
    },
    {
      accessorKey: "shippingCost",
      header: "Shipping Cost",
      cell: ({ row }) => <span>৳{row.original.shippingCost}</span>,
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => <span>৳{row.original.totalPrice}</span>,
    },
    {
      accessorKey: "shippingInfo",
      header: "Shipping Address",
      cell: ({ row }) => (
        <div>
          <p>{row.original.shippingInfo.shippingAddress}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {row.original.shippingInfo.shippingCity}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.original.products.map((product, index) => (
            <div
              key={index}
              className="text-sm p-1 rounded bg-muted dark:bg-gray-800 border border-border dark:border-gray-600"
            >
              <p>
                <span className="font-medium">{product.name}</span> — Qty:{" "}
                {product.quantity}, ৳{product.price}
              </p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
      <div className="w-full flex items-center justify-between">
        <MMTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default AdminManageOrders;
