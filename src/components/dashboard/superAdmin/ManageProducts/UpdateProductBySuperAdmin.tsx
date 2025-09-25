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
import { IProductWithId } from "@/types/product";
import { updateProduct } from "@/services/product";
import { createProductSchema } from "../../admin/CreateProduct/createProductSchema";

const UpdateProductFormBySuperAdmin = ({
  product,
}: {
  product: IProductWithId;
}) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: { ...product },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const productData: IProductWithId = {
      _id: product._id,
      name: data.name || product.name,
      category: data.category || product.category,
      description: data.description || product.description,
      price: data.price || product.price,
      discount: data.discount || product.discount,
      manufacturer: data.manufacturer || product.manufacturer,
      quantity: data.quantity || product.quantity,
      imageUrl: product.imageUrl,
      inStock: data.quantity ? true : false || product.inStock,
    };

    const res = await updateProduct(productData);

    if (res.success) {
      toast.success(res?.message, { duration: 1400 });
      router.push("/superAdmin/products");
    } else {
      toast.error(res?.message, { duration: 1400 });
    }
  };

  return (
    <div className="flex-grow max-w-6xl mx-auto p-8 my-6 rounded-2xl shadow-md bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-slate-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          Update Product By Super Admin
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Make changes to the product details and save your updates.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section: Basic Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-gray-200">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Section: Pricing & Stock */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-gray-200">
              Pricing & Stock
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Section: Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-gray-200">
              Product Details
            </h2>
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

          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-1/3 rounded-lg"
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProductFormBySuperAdmin;
