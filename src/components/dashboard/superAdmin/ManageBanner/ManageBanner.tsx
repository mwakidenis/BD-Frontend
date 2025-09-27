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
    <div className="flex-grow max-w-6xl mx-auto p-8 my-6 rounded-2xl shadow-md bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-slate-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          Create a New Banner
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fill in the Banner details below to add a new item to your inventory.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section: Heading Description & Images */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-gray-200">
              Banner Heading, description and Images
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-4 md:col-span-3">
                <FormField
                  control={form.control}
                  name="heading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heading</FormLabel>
                      <FormControl>
                        <textarea
                          className="h-40 border rounded-md p-3 resize-none w-full focus:ring-2 focus:ring-blue-500"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-4 md:col-span-3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          className="h-40 border rounded-md p-3 resize-none w-full focus:ring-2 focus:ring-blue-500"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <BannerImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload 3 Images"
                  maxFiles={3}
                />
                <div className="mt-2 text-xs text-gray-500">
                  {imageFiles.length}/3 images selected
                </div>
                {imageFiles.length === 3 && (
                  <p className="text-green-600 text-sm font-medium mt-2">
                    ✓ All 3 images uploaded successfully!
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <ImagePreviewer
                className="sm:flex justify-center items-center gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-1/3 rounded-lg"
              disabled={isSubmitting || imageFiles.length !== 3}
            >
              {isSubmitting ? "Creating..." : "Create Banner"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTheBannerForm;
