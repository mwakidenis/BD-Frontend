"use client";

import React, { useState, useEffect } from "react";
import Input2 from "../ui/Input2";
import { Button } from "../ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser, loginUser } from "@/services/auth";
import { useUser } from "@/context/UserContext";
import { loginSchema } from "./loginValidation";

const Login = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [vanishForm, setVanishForm] = useState(false);
  const { setIsLoading, setUser } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      const user = await getCurrentUser();
      setVanishForm(true);

      if (res?.success) {
        setUser(user);
        toast.success(res?.message, { duration: 1400 });

        if (redirect) {
          router.push(redirect);
        } else {
          router.push(`/${user?.role}`);
        }
      } else {
        toast.error(res?.message, { duration: 1400 });
        setVanishForm(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
      setVanishForm(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <AnimatePresence> */}
      {!vanishForm && (
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 150 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="h-screen min-h-[500px] w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2"
        >
          {/* Left Side */}
          <div className="hidden lg:block my-[2.5%] min-h-[500px] bg-login relative">
            <Link
              href={"/"}
              className="text-lg font-clashBold sm:text-xl absolute top-[2%] left-[5%] cursor-pointer text-white hover:opacity-80 transition-opacity"
            >
              SoptokBD
            </Link>

            <div className="absolute w-full bottom-[10%] left-[5%] text-white">
              <h2 className="text-4xl font-clashBold">
                Sign in <br /> and explore authentic crafts
              </h2>
              <p className="text-sm text-gray-300 mt-2 w-[88%]">
                Experience the finest Bangladeshi handmade rugs, crafts, and
                lifestyle essentials. Log in to unlock personalized collections,
                exclusive offers, and a seamless shopping journey with SoptokBD.
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-[80%] lg:w-[70%] mx-auto my-[2.5%] flex flex-col justify-center items-center h-auto">
            <h1 className="text-2xl font-clashBold md:text-3xl text-center">
              Welcome back to SoptokBD!
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-2 mt-6"
              noValidate
            >
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
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : ""
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

              <Button
                type="submit"
                disabled={isSubmitting}
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
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="mt-4 text-gray-400 text-sm">OR</div>

            <Link
              href={"/signup"}
              className="text-[12px] md:text-sm mb-8 hover:opacity-80 transition-opacity"
            >
              Don&apos;t have an account?{" "}
              <span className="font-bold underline duration-300 cursor-pointer active:scale-90 text-primary">
                Sign Up
              </span>
            </Link>
          </div>
        </motion.div>
      )}
      {/* </AnimatePresence> */}
    </div>
  );
};

export default Login;
