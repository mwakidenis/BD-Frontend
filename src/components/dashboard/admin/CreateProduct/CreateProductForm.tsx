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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createProductSchema } from "./createProductSchema";
import { useState } from "react";
import { createMedicine, imageToLink } from "@/services/product";
import { IMedicine } from "@/types/product";
import ImagePreviewer from "./ImagePreviewer";
import ImageUploader from "./ImageUploader";

const medicineTypes = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Injection",
  "Cream",
  "Drops",
  "Food",
  "Skin",
  "Baby",
];

const CreateMedicineForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);

  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      requiredPrescription: false,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const uploadedLinks: string[] = [];

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
        const medicineData: IMedicine = {
          name: data.name,
          type: data.type,
          description: data.description,
          price: data.price,
          discount: data.discount,
          manufacturer: data.manufacturer,
          quantity: data.quantity,
          requiredPrescription: data.requiredPrescription,
          expireDate: data.expireDate,
          imageUrl: uploadedLinks,
          inStock: true,
        };

        const res = await createMedicine(medicineData);

        if (res.success) {
          toast.success(res?.message, { duration: 1400 });
          router.push("/admin/medicines");
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
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 my-5">
      <div className="flex justify-center items-center space-x-4 mb-5">
        <div>
          <h1 className="text-xl font-semibold">Create Product</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Medicine Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="mb-3">
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
                <FormItem className="mb-3">
                  <FormLabel>Discount</FormLabel>
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
              name="manufacturer"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Manufacturer</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="mb-3">
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

            <FormField
              control={form.control}
              name="requiredPrescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prescription</FormLabel>
                  <span className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {field.value ? (
                        <span className="text-green-700 flex gap-3">
                          PRESCRIPTION
                        </span>
                      ) : (
                        <del>PRESCRIPTION</del>
                      )}
                    </FormLabel>
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Medicine Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {medicineTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expireDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expire Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            new Date(field.value).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            const formattedDate = date
                              .toISOString()
                              .split("T")[0];
                            field.onChange(formattedDate);
                          }
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
            <div className="col-span-4 md:col-span-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medicine Description</FormLabel>
                    <FormControl>
                      <textarea
                        className="h-36 border-[1px] p-2 rounded-md"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="">
              {imageFiles.length < 3 && imagePreview.length < 3 && (
                <div className="mt-6">
                  <ImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Medicine Images"
                  />
                </div>
              )}
              {(imageFiles.length === 3 || imagePreview.length === 3) && (
                <p className="text-red-500 text-sm font-semibold">
                  Maximum Image Selected!
                </p>
              )}
            </div>
          </div>

          <div className="my-2 mt-8">
            <ImagePreviewer
              className="sm:flex justify-center items-center gap-4"
              setImageFiles={setImageFiles}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>

          <Button type="submit" className="mt-5 w-full">
            {isSubmitting ? "Creating...." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateMedicineForm;
