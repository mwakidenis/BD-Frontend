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
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { updatePassword } from "@/services/user";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Input2 from "@/components/ui/Input2";

const passwordSchema = z.object({
  prevPassword: z.string().min(6, "Previous password is required"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const UpdateUserPasswordForm = () => {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      prevPassword: "",
      newPassword: "",
    },
  });
  const [showPrevPassword, setShowPrevPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const { user } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatedInfo = {
      prevPassword: data.prevPassword,
      newPassword: data.newPassword,
    };

    try {
      const res = await updatePassword(user?.id as string, updatedInfo);

      if (res.success) {
        toast.success(res?.message, { duration: 1400 });
        reset({ prevPassword: "", newPassword: "" });
      } else {
        toast.error(res?.message, { duration: 1400 });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 1400 });
    }
  };

  return (
    <div className="border-2 border-gray-300  p-6 mt-6 m-4">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Update your password
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Previous Password */}
          <FormField
            control={form.control}
            name="prevPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4">
                  Previous Password{" "}
                  <Checkbox
                    onClick={() => setShowPrevPassword(!showPrevPassword)}
                  />
                </FormLabel>
                <FormControl>
                  <Input2
                    type={`${showPrevPassword ? "text" : "password"}`}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4">
                  New Password{" "}
                  <Checkbox
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  />
                </FormLabel>
                <FormControl>
                  <Input2
                    type={`${showNewPassword ? "text" : "password"}`}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4">
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserPasswordForm;
