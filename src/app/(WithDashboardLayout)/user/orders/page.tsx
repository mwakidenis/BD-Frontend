export const dynamic = "force-dynamic";

import UserManageOrders from "@/components/dashboard/user/Orders/UserManageOrders";
import { useUser } from "@/context/UserContext";
import { getCurrentUser } from "@/services/auth";
import { getAllOrder, getUserOrders } from "@/services/order";
import React from "react";

const OrdersPage = async () => {
  const { id } = await getCurrentUser();

  const { data } = await getUserOrders(id);

  return (
    <div>
      <UserManageOrders data={data} />
    </div>
  );
};

export default OrdersPage;
