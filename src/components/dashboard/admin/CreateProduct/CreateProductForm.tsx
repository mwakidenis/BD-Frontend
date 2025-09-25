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
import { createProductSchema } from "./createProductSchema";
import { useState } from "react";
import { createProduct, imageToLink } from "@/services/product";
import { IProduct } from "@/types/product";
import ImagePreviewer from "./ImagePreviewer";
import ImageUploader from "./ImageUploader";

const CreateTheProductForm = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {},
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
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
        }
      }

      if (uploadedLinks.length === imageFiles.length) {
        const productData: IProduct = {
          name: data.name,
          category: data.category,
          description: data.description,
          price: data.price,
          discount: data.discount,
          manufacturer: data.manufacturer,
          quantity: data.quantity,
          imageUrl: uploadedLinks,
          inStock: true,
        };

        const res = await createProduct(productData);

        if (res.success) {
          toast.success(res?.message, { duration: 1400 });
          router.push("/admin/products");
        } else {
          toast.error(res?.message, { duration: 1400 });
        }
      } else {
        toast.error("Image Upload Error", { duration: 1400 });
      }
    } catch (err: any) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="flex-grow max-w-6xl mx-auto p-8 my-6 rounded-2xl shadow-md bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-slate-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          Create a New Product
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fill in the product details below to add a new item to your inventory.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section: Basic Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-gray-200">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section: Pricing & Inventory */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-gray-200">
              Pricing & Inventory
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section: Description & Images */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-gray-200">
              Product Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                {imageFiles.length < 3 && imagePreview.length < 3 && (
                  <ImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Images"
                  />
                )}
                {(imageFiles.length === 3 || imagePreview.length === 3) && (
                  <p className="text-red-500 text-sm font-medium mt-2">
                    Maximum 3 images allowed.
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
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTheProductForm;
