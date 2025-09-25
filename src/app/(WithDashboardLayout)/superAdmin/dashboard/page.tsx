export const dynamic = "force-dynamic";

import SuperAdminDashboard from "@/components/dashboard/superAdmin/SuperAdminDashboard/SuperAdminDashboard";
import { getAllOrder } from "@/services/order";
import { getAllProduct } from "@/services/product";
import { getAllUser } from "@/services/user";

const SuperAdminDashboardPage = async () => {
  const [orders, users] = await Promise.all([getAllOrder(), getAllUser()]);
  const { data, meta } = await getAllProduct();
  return (
    <div>
      <SuperAdminDashboard
        totalProducts={meta.total}
        orders={orders.data}
        users={users.data}
        products={data}
      />
    </div>
  );
};

export default SuperAdminDashboardPage;
