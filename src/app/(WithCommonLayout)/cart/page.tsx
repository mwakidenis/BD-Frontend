export const dynamic = "force-dynamic";

import Cart from "@/components/cart/cart";
import { getAllMedicine } from "@/services/product";
import React from "react";

const CartPage = async () => {
  const { data } = await getAllMedicine();
  return (
    <div className="">
      <Cart medicines={data} />
    </div>
  );
};

export default CartPage;
