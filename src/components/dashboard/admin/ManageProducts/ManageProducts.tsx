"use client";

import { Button } from "@/components/ui/button";
import { deleteMedicine } from "@/services/product";
import { IMeta } from "@/types/meta";
import { TMedicineResponse } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import ProductSearchbar from "../../DashboardComponent/ProductSearchbar/ProductSearchbar";
import TablePagination from "../../DashboardComponent/TablePagination/TablePagination";
import { MMTable } from "@/components/ui/SoptokBDTable";
import DeleteConfirmationModal from "@/components/ui/SoptokBDModal";

const ManageMedicine = ({
  data,
  meta,
}: {
  data: TMedicineResponse[];
  meta: IMeta;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sorting, setSorting] = useState<{ key: string; desc: boolean }>({
    key: "price",
    desc: false,
  });

  const handleDelete = (data: TMedicineResponse) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      if (id) {
        const res = await deleteMedicine(id);
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

  const handleUpdate = (id: string) => {
    router.push(`/admin/medicines/update-medicine/${id}`);
  };

  const handleSort = (column: string) => {
    setSorting((prev) => ({
      key: column,
      desc: prev.key === column ? !prev.desc : false,
    }));
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sorting.key as keyof TMedicineResponse];
    const bValue = b[sorting.key as keyof TMedicineResponse];
    if (aValue < bValue) return sorting.desc ? 1 : -1;
    if (aValue > bValue) return sorting.desc ? -1 : 1;
    return 0;
  });

  const columns: ColumnDef<TMedicineResponse>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "imageUrl",
      header: () => <div>Image</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrl[0]}
            alt={row.original.name}
            width={80}
            height={80}
            className="w-8 h-8 rounded-full"
          />
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "manufacturer",
      header: "Manufacturer",
    },
    {
      accessorKey: "price",
      header: () => (
        <div className="cursor-pointer" onClick={() => handleSort("price")}>
          Price {sorting.key === "price" ? (sorting.desc ? "↓" : "↑") : ""}
        </div>
      ),
      cell: ({ row }) => <p className="text-center">{row.original.price}</p>,
    },
    {
      accessorKey: "quantity",
      header: () => (
        <div className="cursor-pointer" onClick={() => handleSort("quantity")}>
          Quantity{" "}
          {sorting.key === "quantity" ? (sorting.desc ? "↓" : "↑") : ""}
        </div>
      ),
      cell: ({ row }) => <p className="text-center">{row.original.quantity}</p>,
    },
    {
      accessorKey: "inStock",
      header: () => <div>Stock</div>,
      cell: ({ row }) => (
        <div>
          {row.original.inStock ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "expireDate",
      header: "Expire",
    },
    {
      accessorKey: "delete",
      header: () => <div>Delete</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <button
            className="text-red-500 cursor-pointer"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
    {
      accessorKey: "requiredPrescription",
      header: () => <div>Prescription</div>,
      cell: ({ row }) => (
        <div className="text-center flex justify-center items-center">
          {row.original.requiredPrescription ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "update",
      header: () => <div>Update</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <button
            className="text-blue-500 cursor-pointer"
            title="Update"
            onClick={() => handleUpdate(row.original._id)}
          >
            <Pen className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-end my-4">
        <Link href="/admin/create-product">
          <Button>Create Product</Button>
        </Link>
      </div>
      <div className="w-1/2 mx-auto">
        <ProductSearchbar />
      </div>
      <div>
        <TablePagination totalPage={meta.totalPage} />
      </div>
      <div className="flex items-center justify-between">
        <MMTable data={sortedData} columns={columns} />
        <DeleteConfirmationModal
          name={selectedItem}
          isOpen={isModalOpen}
          onOpenChange={setModalOpen}
          onConfirm={() => selectedId && handleDeleteConfirm(selectedId)}
        />
      </div>
    </div>
  );
};

export default ManageMedicine;
