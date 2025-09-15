"use server";

import { cookies } from "next/headers";

import { jwtDecode } from "jwt-decode";
import { FieldValues } from "react-hook-form";

// Register user function
export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/user/create-user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result.data.refreshToken);
    }
    return result;
  } catch (error: any) {
    throw Error(error);
  }
};

// Login user function
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result.data.refreshToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// Get current user function
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

// Get new access token function
export const getNewToken = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: (await cookies()).get("refreshToken")!.value,
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
