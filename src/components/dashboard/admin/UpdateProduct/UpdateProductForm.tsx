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
import { IMedicineWithId } from "@/types/product";
import { createProductSchema } from "../CreateProduct/createProductSchema";
import { updateMedicine } from "@/services/product";

const medicineTypes = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Injection",
  "Cream",
  "Drops",
];

const UpdateMedicineForm = ({ medicine }: { medicine: IMedicineWithId }) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: { ...medicine },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const medicineData: IMedicineWithId = {
      _id: medicine._id,
      name: data.name || medicine.name,
      type: data.type || medicine.type,
      description: data.description || medicine.description,
      price: data.price || medicine.price,
      discount: data.discount || medicine.discount,
      manufacturer: data.manufacturer || medicine.manufacturer,
      quantity: data.quantity || medicine.quantity,
      requiredPrescription:
        data.requiredPrescription || medicine.requiredPrescription,
      expireDate: data.expireDate || medicine.expireDate,
      imageUrl: medicine.imageUrl,
      inStock: data.quantity ? true : false || medicine.inStock,
    };

    const res = await updateMedicine(medicineData);

    if (res.success) {
      toast.success(res?.message, { duration: 1400 });
      router.push("/admin/products");
    } else {
      toast.error(res?.message, { duration: 1400 });
    }
  };

  return (
    <div className="border-[1px] border-gray-300 flex-grow max-w-5xl p-5 my-5">
      <div className="flex justify-center items-center space-x-4 mb-5">
        <div>
          <h1 className="text-xl font-semibold text-center my-5">
            Update Product
          </h1>
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
              name="price"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Product Price</FormLabel>
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
                  <FormLabel>Category</FormLabel>
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
                        className="h-36 border-[1px] p-2 resize-none"
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

          <div className="my-2 mt-8"></div>

          <div className="flex justify-center">
            <Button type="submit" className="mt-5 w-1/2">
              {isSubmitting ? "Updating...." : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateMedicineForm;
