export const dynamic = "force-dynamic";

import AdminDashboard from "@/components/dashboard/admin/AdminDashboard/AdminDashboard";
import { getAllOrder } from "@/services/order";
import { getAllProduct } from "@/services/product";
import { getAllUser } from "@/services/user";

const AdminDashboardPage = async () => {
  const [orders, users] = await Promise.all([getAllOrder(), getAllUser()]);
  const { data, meta } = await getAllProduct();
  return (
    <div>
      <AdminDashboard
        totalProducts={meta.total}
        orders={orders.data}
        users={users.data}
        products={data}
      />
    </div>
  );
};

export default AdminDashboardPage;
