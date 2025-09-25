import SpecificOrder from "@/components/dashboard/admin/Orders/SpecificOrder";
import { getSpecificOrder } from "@/services/order";

const SpecificOrderPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { data: order } = await getSpecificOrder((await params).orderId);

  // console.log(order.products[0].productId.expiryDate);

  return (
    <div>
      <SpecificOrder order={order} />
    </div>
  );
};

export default SpecificOrderPage;
