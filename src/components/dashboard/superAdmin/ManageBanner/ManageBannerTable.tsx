"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Shield,
  Trash2,
  Eye,
  Calendar,
  Image as ImageIcon,
  Plus,
  RefreshCw,
  Edit,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllBanner, deleteBanner } from "@/services/banner";

interface Banner {
  _id: string;
  heading: string;
  description: string;
  imageUrl: string[];
  createdAt: string;
  updatedAt: string;
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bannerHeading: string;
  isLoading: boolean;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  bannerHeading,
  isLoading,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete Banner
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription className="text-gray-600 dark:text-gray-400 py-4">
          Are you sure you want to delete this banner?
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
            <p className="font-medium text-gray-900 dark:text-white">
              "{bannerHeading}"
            </p>
          </div>
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">
            This action cannot be undone. The banner will be permanently removed
            from your system.
          </p>
        </DialogDescription>

        <DialogFooter className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Banner
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const BannerManagementTable = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<{
    id: string;
    heading: string;
  } | null>(null);
  const router = useRouter();

  // Fetch banners
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await getAllBanner();
      if (response.success) {
        setBanners(response.data);
      } else {
        toast.error("Failed to fetch banners");
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error("Error fetching banners");
    } finally {
      setLoading(false);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (bannerId: string, bannerHeading: string) => {
    setBannerToDelete({ id: bannerId, heading: bannerHeading });
    setDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setBannerToDelete(null);
  };

  // Delete banner function
  const handleDeleteBanner = async () => {
    if (!bannerToDelete) return;

    try {
      setDeleteLoading(true);

      const response = await deleteBanner(bannerToDelete.id);

      if (response.success) {
        setBanners(
          banners.filter((banner) => banner._id !== bannerToDelete.id)
        );
        toast.success("Banner deleted successfully");
        closeDeleteModal();
      } else {
        toast.error(response.message || "Failed to delete banner");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Error deleting banner");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
              Banner Management
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Manage your promotional banners and track their performance across
              the platform.
            </p>
          </div>
        </div>

        {/* Table Container */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Active Banners</h2>
                    <p className="text-indigo-100">
                      {banners.length} banner{banners.length !== 1 ? "s" : ""}{" "}
                      currently active
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>System Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-3">
                    <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
                    <span className="text-lg text-slate-600 dark:text-slate-400">
                      Loading banners...
                    </span>
                  </div>
                </div>
              ) : banners.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-slate-100 dark:bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                    No banners found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Get started by creating your first promotional banner.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200 dark:border-gray-700">
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                          Preview
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                          Heading
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                          Description
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                          Images
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-center">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {banners.map((banner) => (
                        <TableRow
                          key={banner._id}
                          className="border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {banner.imageUrl && banner.imageUrl.length > 0 ? (
                                <img
                                  src={banner.imageUrl[0]}
                                  alt="Banner preview"
                                  className="w-16 h-10 object-cover rounded-lg border"
                                />
                              ) : (
                                <div className="w-16 h-10 bg-slate-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                  <ImageIcon className="w-4 h-4 text-slate-400" />
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[200px]">
                              <p className="font-medium text-slate-800 dark:text-white">
                                {truncateText(banner.heading, 50)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[250px]">
                              <p className="text-slate-600 dark:text-slate-400">
                                {truncateText(banner.description, 80)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <ImageIcon className="w-4 h-4 text-slate-500" />
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {banner.imageUrl?.length || 0} image
                                {banner.imageUrl?.length !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-900/20"
                                title="Delete Banner"
                                onClick={() =>
                                  openDeleteModal(banner._id, banner.heading)
                                }
                                disabled={deleteLoading}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteBanner}
        bannerHeading={bannerToDelete?.heading || ""}
        isLoading={deleteLoading}
      />
    </>
  );
};

export default BannerManagementTable;
