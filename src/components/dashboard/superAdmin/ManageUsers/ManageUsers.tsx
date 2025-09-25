"use client";

import { Button } from "@/components/ui/button";
import DeleteConfirmationModal from "@/components/dashboard/DashboardComponent/SoptokBdModal/SoptokBDModal";
import { MMTable } from "@/components/dashboard/DashboardComponent/SoptokBdTable/SoptokBDTable";
import { deleteSingleUser, updateUserRole } from "@/services/user";
import { IUserResponse } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Trash, RefreshCw } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const ManageUserBySuperAdmin = ({ data }: { data: IUserResponse[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (user: IUserResponse) => {
    setSelectedId(user._id);
    setSelectedItem(user.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      if (id) {
        const res = await deleteSingleUser(id);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await updateUserRole(
        userId,
        newRole as "user" | "admin" | "superAdmin"
      );
      if (res.success) {
        toast.success(res.message || "Role updated successfully");
      } else {
        toast.error(res.message || "Failed to update role");
      }
    } catch (err: any) {
      toast.error(err?.message || "Error updating role");
    }
  };

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
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;

        const roleStyles: Record<string, string> = {
          user: "bg-emerald-100 text-emerald-700 border border-emerald-300 dark:bg-emerald-800 dark:text-emerald-100 dark:border-emerald-600",
          admin:
            "bg-indigo-100 text-indigo-700 border border-indigo-300 dark:bg-indigo-800 dark:text-indigo-100 dark:border-indigo-600",
          superAdmin:
            "bg-rose-100 text-rose-700 border border-rose-300 dark:bg-rose-800 dark:text-rose-100 dark:border-rose-600",
        };

        const roleLabels: Record<string, string> = {
          user: "User",
          admin: "Admin",
          superAdmin: "Super Admin",
        };

        return (
          <span
            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
              roleStyles[role] ||
              "bg-gray-100 text-gray-700 border border-gray-300"
            }`}
          >
            {roleLabels[role] || "Unknown"}
          </span>
        );
      },
    },
    {
      accessorKey: "delete",
      header: "Delete",
      cell: ({ row }) =>
        row.original.role === "user" ? (
          <button
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors  cursor-pointer"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        ),
    },
    {
      accessorKey: "updateRole",
      header: "Update Role",
      cell: ({ row }) => (
        <select
          className="p-1 rounded border border-gray-300 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
          value={row.original.role}
          onChange={(e) => handleRoleChange(row.original._id, e.target.value)}
          title="Change Role"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superAdmin">Super Admin</option>
        </select>
      ),
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: ({ row }) =>
        row.original.role === "user" ? (
          <Link href={`/superAdmin/users/${row.original._id}`}>
            <Button variant="outline" size="sm" className="text-xs">
              More details
            </Button>
          </Link>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        ),
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
            Manage Users
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data.length} users found
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
          <MMTable data={data} columns={columns} />
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={() => selectedId && handleDeleteConfirm(selectedId)}
      />
    </div>
  );
};

export default ManageUserBySuperAdmin;
