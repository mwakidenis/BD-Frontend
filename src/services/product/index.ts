/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IMedicine, IMedicineWithId } from "@/types/product";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createMedicine = async (medicineData: IMedicine) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/product/create-product`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicineData),
    });
    revalidateTag("MEDICINE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMedicine = async (medicineData: IMedicineWithId) => {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/product/${medicineData._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicineData),
      }
    );

    revalidateTag("MEDICINE");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteMedicine = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
    });

    revalidateTag("MEDICINE");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllMedicine = async (params?: Record<string, string>) => {
  try {
    const query = new URLSearchParams(params).toString();

    const res = await fetch(
      `${process.env.BASE_API}/product${query ? `?${query}` : ""}`,
      {
        next: {
          tags: ["MEDICINE"],
        },
      }
    );

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getHomePageMedicines = async (params?: Record<string, string>) => {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/product`,

      {
        cache: "force-cache",
        next: {
          revalidate: 30,
          tags: ["MEDICINE"],
        },
      }
    );

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getSingleMedicine = async (medicineId: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/product/${medicineId}`, {
      next: { tags: ["MEDICINE"] },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    return { data: null };
  }
};

export const imageToLink = async (image: FormData) => {
  try {
    const res = await fetch(
      `${process.env.IMGBB_API_LINK}?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: image,
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
