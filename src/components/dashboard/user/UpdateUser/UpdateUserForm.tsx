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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  User,
  Mail,
  Shield,
  Save,
  Loader2,
  Info,
  UserCog,
  CheckCircle2,
} from "lucide-react";

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
        const updatedUser = await getCurrentUser();
        setUser(updatedUser);

        toast.success(res?.message, { duration: 1400 });
        router.push("/user/profile");
      } else {
        toast.error(res?.message, { duration: 1400 });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 1400 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
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
                  <UserCog className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Edit Profile
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                    Update your account information
                  </p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Account Management
              </p>
              <div className="flex items-center space-x-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
                  Secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8">
        <Card className="shadow-lg border-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Update Profile</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Keep your information up to date
                  </p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                Profile Settings
              </Badge>
            </div>
          </div>

          {/* Form Content */}
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium">
                        <User className="w-4 h-4" />
                        <span>Full Name</span>
                      </FormLabel>
                      <FormControl>
                        <Input2
                          placeholder="Enter your full name"
                          className="py-3 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium">
                        <Mail className="w-4 h-4" />
                        <span>Email Address</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input2
                            disabled
                            className="py-3 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            {...field}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Shield className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </FormControl>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Email address cannot be changed for security reasons
                      </p>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                {/* Info Section */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                        Profile Update Guidelines
                      </h4>
                      <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                        <li className="flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span>Use your real name for better recognition</span>
                        </li>
                        <li className="flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span>Changes will be reflected immediately</span>
                        </li>
                        <li className="flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span>Your data is securely protected</span>
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
                      <Save className="w-4 h-4" />
                      <span>Update Profile</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your personal information is encrypted and stored securely
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserForm;
