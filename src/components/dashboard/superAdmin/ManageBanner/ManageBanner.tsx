"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBannerSchema } from "./createBannerSchema";
import { createBanner, imageToLink } from "@/services/banner";
import { TBanner } from "@/types/banner";
import ImageUploader from "../../admin/CreateProduct/ImageUploader";
import ImagePreviewer from "../../admin/CreateProduct/ImagePreviewer";
import BannerImageUploader from "./BannerUploader";
import {
  Shield,
  Image,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Settings,
  Eye,
  Save,
} from "lucide-react";
import BannerImagePreviewer from "./BannerImagePreviewer";
import BannerManagementTable from "./ManageBannerTable";

const CreateTheBannerForm = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createBannerSchema),
    defaultValues: {},
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Check if we have exactly 3 images
      if (imageFiles.length !== 3) {
        toast.error("Please upload exactly 3 images", { duration: 1400 });
        return;
      }

      const uploadedLinks: string[] = [];

      // Upload images one by one
      for (let i = 0; i < imageFiles.length; i++) {
        const formData = new FormData();
        formData.append("image", imageFiles[i]);

        try {
          const res = await imageToLink(formData);
          if (res?.data?.url) {
            uploadedLinks.push(res.data.url);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error(`Error uploading image ${i + 1}`, { duration: 1400 });
          return;
        }
      }

      if (uploadedLinks.length === imageFiles.length) {
        const BannerData: TBanner = {
          heading: data.heading,
          description: data.description,
          imageUrl: uploadedLinks,
        };

        const res = await createBanner(BannerData);

        if (res.success) {
          toast.success(res?.message, { duration: 1400 });
          router.push("/");
        } else {
          toast.error(res?.message, { duration: 1400 });
        }
      } else {
        toast.error("Image Upload Error", { duration: 1400 });
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error("An unexpected error occurred", { duration: 1400 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border">
            <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Super Admin Panel
            </span>
          </div>
        </div>

        <div>
          <BannerManagementTable />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Image className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
            Create New Banner
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Design and deploy promotional banners to enhance your platform's
            visual appeal and drive user engagement.
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Banner Configuration</h2>
                  <p className="text-indigo-100">
                    Configure your banner content and media assets
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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-8 space-y-10"
            >
              {/* Content Section */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Text Content */}
                <div className="xl:col-span-2 space-y-8">
                  <div className="bg-slate-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-slate-200 dark:border-gray-600">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                        Content Details
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="heading"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                              <span>Banner Heading</span>
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <textarea
                                className="min-h-[120px] w-full border-2 border-slate-200 dark:border-gray-600 rounded-xl p-4 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-400"
                                placeholder="Enter an engaging headline that captures attention..."
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                              <span>Banner Description</span>
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <textarea
                                className="min-h-[120px] w-full border-2 border-slate-200 dark:border-gray-600 rounded-xl p-4 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder:text-slate-400"
                                placeholder="Provide a compelling description that motivates action..."
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-slate-200 dark:border-gray-600">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                        <Upload className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                        Media Assets
                      </h3>
                    </div>

                    <BannerImageUploader
                      setImageFiles={setImageFiles}
                      setImagePreview={setImagePreview}
                      label="Upload Banner Images"
                      maxFiles={3}
                    />

                    {/* Upload Status */}
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Upload Progress
                        </span>
                        <span className="font-medium text-slate-800 dark:text-white">
                          {imageFiles.length}/3 images
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(imageFiles.length / 3) * 100}%` }}
                        ></div>
                      </div>

                      {imageFiles.length === 3 ? (
                        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-medium">
                            All images uploaded successfully!
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-medium">
                            {3 - imageFiles.length} more image
                            {3 - imageFiles.length !== 1 ? "s" : ""} required
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Preview Section */}
              {imagePreview.length > 0 && (
                <div className="bg-slate-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-slate-200 dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center space-x-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                      <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span>Image Preview</span>
                  </h3>
                  <BannerImagePreviewer
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-gray-700">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  All fields marked with <span className="text-red-500">*</span>{" "}
                  are required
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="px-8 py-3 rounded-xl"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting || imageFiles.length !== 3}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Banner...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Create Banner</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateTheBannerForm;
