"use client";

import React, { useState } from "react";
import Input2 from "../ui/Input2";
import { Button } from "../ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getCurrentUser, registerUser } from "@/services/auth";
import { useUser } from "@/context/UserContext";
import { registrationSchema } from "./registerValidation";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setIsLoading, setUser } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange", // Enables real-time validation
  });

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  const passwordsMatch =
    password === passwordConfirm || !passwordConfirm || !password;

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      const res = await registerUser(data);

      if (res?.success) {
        const user = await getCurrentUser();
        setUser(user);

        toast.success(res?.message || "Registration successful!", {
          duration: 1400,
        });

        if (user?.role) {
          router.push(`/${user?.role}`);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen min-h-[500px] w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2"
    >
      {/* Left Side */}
      <div className="hidden lg:block my-[2.5%] min-h-[500px] bg-signup relative">
        <Link
          href={"/"}
          className="text-lg font-clashBold sm:text-xl absolute top-[2%] left-[5%] cursor-pointer text-white hover:opacity-80 transition-opacity"
        >
          SoptokBD
        </Link>

        <div className="absolute w-full bottom-[10%] left-[5%] text-white">
          <h2 className="text-4xl font-clashBold">
            Join Us <br /> and Celebrate Authenticity
          </h2>
          <p className="text-sm text-gray-300 mt-2 w-[88%]">
            Become a part of the SoptokBD family. Create your account to explore
            curated Bangladeshi crafts, handmade rugs, and lifestyle treasures,
            while supporting local artisans with every purchase.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-[80%] lg:w-[70%] mx-auto my-[2.5%] flex flex-col justify-center items-center h-auto">
        <h1 className="text-2xl font-clashBold md:text-3xl text-center">
          Create your SoptokBD account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-2 mt-6"
          noValidate
        >
          {/* Name Field */}
          <div>
            <Input2
              {...register("name")}
              name="name"
              placeholder="Full Name"
              className={`py-2 text-sm md:text-base ${
                errors.name ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Input2
              {...register("email")}
              name="email"
              placeholder="Email"
              type="email"
              className={`py-2 text-sm md:text-base ${
                errors.email ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <Input2
                {...register("password")}
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className={`py-2 text-sm md:text-base pr-12 ${
                  errors.password ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <div className="relative">
              <Input2
                {...register("passwordConfirm")}
                name="passwordConfirm"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                className={`py-2 text-sm md:text-base pr-12 ${
                  errors.passwordConfirm || (!passwordsMatch && passwordConfirm)
                    ? "border-red-500 focus:border-red-500"
                    : passwordConfirm && passwordsMatch && password
                    ? "border-green-500 focus:border-green-500"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="text-red-600 text-sm mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
            {/* Password match validation */}
            {passwordConfirm &&
              password &&
              !passwordsMatch &&
              !errors.passwordConfirm && (
                <p className="text-red-600 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
            {passwordConfirm &&
              password &&
              passwordsMatch &&
              !errors.password &&
              !errors.passwordConfirm && (
                <p className="text-green-600 text-sm mt-1">Passwords match ✓</p>
              )}
          </div>

          <Button
            type="submit"
            disabled={
              isSubmitting || !passwordsMatch || Object.keys(errors).length > 0
            }
            className="py-2 mt-3 text-sm text-white md:text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing Up...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="mt-4 text-gray-400 text-sm">or</div>

        <Link
          href={"/login"}
          className="text-[12px] md:text-sm mb-8 hover:opacity-80 transition-opacity"
        >
          Already have an account?{" "}
          <span className="font-bold underline duration-300 cursor-pointer active:scale-90 text-primary">
            Login
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default Signup;
