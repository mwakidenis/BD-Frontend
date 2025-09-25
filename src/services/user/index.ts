"use server";

import { IUserResponse } from "@/types/user";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUser = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/user`, {
      next: {
        tags: ["USER"],
      },
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error: any) {
    throw Error(error);
  }
};

export const getSingleUser = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/user/${id}`, {
      next: {
        tags: ["USER"],
      },
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error: any) {
    throw Error(error);
  }
};

export const deleteSingleUser = async (userId: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/user/${userId}`, {
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    revalidateTag("USER");

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateProfile = async (
  userId: string,
  updatedData: Partial<IUserResponse>
) => {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/user/update-user/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    revalidateTag("USER");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updatePassword = async (
  userId: string,
  updatedData: { prevPassword: string; newPassword: string }
) => {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/user/update-password/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    revalidateTag("USER");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Update User Role (only superAdmin can call this)
export const updateUserRole = async (
  userId: string,
  role: "user" | "admin" | "superAdmin"
) => {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/user/update-role/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      }
    );

    revalidateTag("USER");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
