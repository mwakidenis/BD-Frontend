"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateProfile } from "@/services/user";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getCurrentUser } from "@/services/auth";
import { IUser } from "@/types/user";
import Input2 from "@/components/ui/Input2";

const userSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

const UpdateUserForm = ({ user }: { user: IUser }) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const router = useRouter();

  const { setIsLoading, setUser } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const res = await updateProfile(user.id, data);

      if (res.success) {
        const user = await getCurrentUser();
        setUser(user);

        toast.success(res?.message, { duration: 1400 });
        router.push("/user/profile");
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
        Update your profile
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input2 placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email (disabled) */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input2 disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4">
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserForm;
