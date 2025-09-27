/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TBanner } from "@/types/banner";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// createBanner
export const createBanner = async (bannerData: TBanner) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/banner/create-banner`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bannerData),
    });
    revalidateTag("BANNER");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// getAllbanner
export const getAllBanner = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/banner`, {
      next: {
        tags: ["BANNER"],
      },
    });

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

// deletebanner
export const deleteBanner = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/banner/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
    });

    revalidateTag("BANNER");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// imageToLink
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
