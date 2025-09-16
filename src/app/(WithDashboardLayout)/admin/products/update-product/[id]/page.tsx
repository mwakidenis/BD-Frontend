export const dynamic = "force-dynamic";

import UpdateMedicineForm from "@/components/dashboard/admin/UpdateProduct/UpdateProductForm";
import { getSingleMedicine } from "@/services/product";

const UpdateMedicinePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const medicineId = (await params).id;

  const { data: medicine } = await getSingleMedicine(medicineId);

  return (
    <div className="flex justify-center items-center">
      <UpdateMedicineForm medicine={medicine} />
    </div>
  );
};

export default UpdateMedicinePage;
