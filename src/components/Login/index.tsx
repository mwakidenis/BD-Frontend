"use client";

import React from "react";
import Input2 from "../ui/Input2";
import { Button } from "../ui/button";

const Login = () => {
  return (
    <div className="h-screen min-h-[500px] w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:block my-[2.5%] min-h-[500px] bg-login relative">
        <p className="text-lg font-clashBold sm:text-xl absolute top-[2%] left-[5%] underline cursor-pointer text-white">
          SoptokBD
        </p>

        <div className="absolute w-full bottom-[10%] left-[5%] text-white">
          <h2 className="text-4xl">
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
        <h1 className="text-2xl font-clashBold md:text-3xl">
          Welcome back to SoptokBD!
        </h1>

        <form className="flex flex-col w-full gap-2 mt-6">
          <Input2
            name="email"
            placeholder="Email"
            className="py-2 text-sm md:text-base"
          />
          <Input2
            name="password"
            placeholder="Password"
            type="password"
            className="py-2 text-sm md:text-base"
          />

          {/* Error message placeholder */}
          <p className="text-red-600 text-sm hidden">Error message here</p>

          <Button className="py-2 mt-3 text-sm text-white md:text-base">
            Login
          </Button>
        </form>

        <div className="mt-4 divider">or</div>

        <p className="text-[12px] md:text-sm mb-8">
          Don&apos;t have an account?{" "}
          <span className="font-bold underline duration-300 cursor-pointer active:scale-90">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
