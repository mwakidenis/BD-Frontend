export const dynamic = "force-dynamic";

import Cart from "@/components/cart/cart";
import { getAllProduct } from "@/services/product";
import React from "react";

const CartPage = async () => {
  const { data } = await getAllProduct();
  return (
    <div className="">
      <Cart products={data} />
    </div>
  );
};

export default CartPage;
