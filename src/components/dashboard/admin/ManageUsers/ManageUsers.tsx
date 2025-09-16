"use client";

import { Button } from "@/components/ui/button";
import DeleteConfirmationModal from "@/components/ui/SoptokBDModal";
import { MMTable } from "@/components/ui/SoptokBDTable";
import { deleteSingleUser } from "@/services/user";
import { IUserResponse } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const ManageUser = ({ data }: { data: IUserResponse[] }) => {
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

  const columns: ColumnDef<IUserResponse>[] = [
    {
      accessorKey: "name",
      header: "User Name",
    },
    {
      accessorKey: "email",
      header: "User Email",
    },
    {
      accessorKey: "role",
      header: "User Role",
      cell: ({ row }) => {
        const role = row.original.role;
        const baseStyle =
          "w-16 text-center font-semibold px-1 py-0.5 rounded text-sm border";

        return (
          <p
            className={
              role === "user"
                ? `${baseStyle} bg-green-100 text-green-600 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700`
                : `${baseStyle} bg-red-100 text-blue-600 border-red-300 dark:bg-red-900 dark:text-blue-200 dark:border-red-700`
            }
          >
            {role}
          </p>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) =>
        row.original.role === "user" ? (
          <button
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="w-5 h-5" />
          </button>
        ) : null,
    },
    {
      accessorKey: "details",
      header: () => <div>Details</div>,
      cell: ({ row }) =>
        row.original.role === "user" ? (
          <Button variant="outline" className="px-2 py-1 text-sm">
            <Link href={`/admin/users/${row.original._id}`}>More details</Link>
          </Button>
        ) : null,
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4 text-center my-5">
        Manage all soptokBD Users
      </h2>
      <MMTable data={data} columns={columns} />
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={() => selectedId && handleDeleteConfirm(selectedId)}
      />
    </div>
  );
};

export default ManageUser;
