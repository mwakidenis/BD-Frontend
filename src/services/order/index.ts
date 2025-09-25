"use server";

import { IOrderResponse } from "@/types/order";
import { cookies } from "next/headers";

// createOrderWithPrescription
// export const createOrderWithPrescription = async (orderInfo: any) => {
//   const res = await fetch(
//     `${process.env.BASE_API}/order/create-order-prescription`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: (await cookies()).get("accessToken")!.value,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(orderInfo),
//     }
//   );

//   const result = res.json();

//   return result;
// };

// createOrderWithOutPrescription
export const createOrder = async (orderInfo: any) => {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/order/create-order-payment`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderInfo),
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

// updateOrderStatus
export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/order/${orderId}`, {
      method: "PATCH",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderStatus: newStatus }),
      next: {
        tags: ["ORDER"],
      },
    });

    return await res.json();
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
};

// getAllOrder
export const getAllOrder = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/order`, {
      next: {
        tags: ["ORDER"],
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

// getUserOrders
export const getUserOrders = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/order/user-order/${id}`, {
      next: {
        tags: ["ORDER"],
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

// getSpecificOrder
export const getSpecificOrder = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/order/${id}`, {
      next: {
        tags: ["ORDER"],
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

// paymentPrescriptionOrder
export const paymentPrescriptionOrder = async (paymentInfo: IOrderResponse) => {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/payment/${paymentInfo._id}`,
      {
        next: {
          // tags:['ORDER']
        },
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      }
    );
    return await res.json();
  } catch (error: any) {
    throw Error(error);
  }
};
