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
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input2 from "@/components/ui/Input2";
import {
  ArrowLeft,
  Lock,
  Shield,
  Eye,
  EyeOff,
  Key,
  CheckCircle2,
  Info,
  Loader2,
} from "lucide-react";

const passwordSchema = z.object({
  prevPassword: z.string().min(6, "Previous password is required"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const UpdateUserPasswordForm = () => {
  const router = useRouter();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Responsive Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 p-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back</span>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block" />
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Password Settings
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                    Update your account password
                  </p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Account Security
              </p>
              <div className="flex items-center space-x-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
                  Protected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Card Header */}
          <div className="bg-black/70 text-white p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Update Password</h2>
                <p className="text-blue-100 text-sm mt-1">
                  Keep your account secure
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Previous Password */}
                <FormField
                  control={form.control}
                  name="prevPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium">
                        <Lock className="w-4 h-4" />
                        <span>Current Password</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input2
                            type={showPrevPassword ? "text" : "password"}
                            placeholder="Enter your current password"
                            className="pr-12 py-3 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            {...field}
                            value={field.value || ""}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPrevPassword(!showPrevPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            {showPrevPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium">
                        <Shield className="w-4 h-4" />
                        <span>New Password</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input2
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter your new password"
                            className="pr-12 py-3 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            {...field}
                            value={field.value || ""}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                {/* Security Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                        Password Security Tips
                      </h4>
                      <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                        <li className="flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span>Use at least 6 characters</span>
                        </li>
                        <li className="flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span>Make it unique to this account</span>
                        </li>
                        <li className="flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span>Don't share with anyone</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Update Password</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Additional Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your password is encrypted and stored securely
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPasswordForm;
