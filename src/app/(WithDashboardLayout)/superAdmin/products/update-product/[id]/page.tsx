import UpdateProductForm from "@/components/dashboard/admin/UpdateProduct/UpdateProductForm";
import UpdateProductFormBySuperAdmin from "@/components/dashboard/superAdmin/ManageProducts/UpdateProductBySuperAdmin";
import { getSingleProduct } from "@/services/product";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const productId = (await params).id;

  const { data: product } = await getSingleProduct(productId);

  return (
    <div className="flex justify-center items-center">
      <UpdateProductFormBySuperAdmin product={product} />
    </div>
  );
};

export default UpdateProductPage;
