"use client";

import { Button } from "@/components/ui/button";
import { MMTable } from "@/components/dashboard/DashboardComponent/SoptokBdTable/SoptokBDTable";
import { IUserResponse } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const ManageUser = ({ data }: { data: IUserResponse[] }) => {
  // ✅ Only keep users with role "user"
  const userData = data.filter((u) => u.role === "user");

  const columns: ColumnDef<IUserResponse>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <p className="font-medium text-slate-700 dark:text-slate-200">
          {row.original.name}
        </p>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {row.original.email}
        </span>
      ),
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: ({ row }) => (
        <Link href={`/admin/users/${row.original._id}`}>
          <Button variant="outline" size="sm" className="text-xs">
            More details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white my-5">
            All User's Lists
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {userData.length} users found
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => toast.info("Refresh action placeholder")}
        >
          <RefreshCw size={16} /> Refresh
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900 p-4">
        <div className="overflow-x-auto">
          <MMTable data={userData} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
