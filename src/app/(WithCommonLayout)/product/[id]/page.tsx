export const dynamic = "force-dynamic";

import MedicineDetail from "@/components/ProductDetails/ProductDetails";
import { getAllMedicine, getSingleMedicine } from "@/services/product";
import { getSpecificProductReviews } from "@/services/review";
import { TMedicineResponse } from "@/types/product";
import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const medicineId = (await params).id;
  const { data: medicine } = await getSingleMedicine(medicineId);

  if (!medicine) return { title: "Medicine Not Found" };

  return {
    title: medicine.name,
    description: medicine.description,
    openGraph: {
      title: medicine.name,
      description: medicine.description,
      images: medicine.imageUrl[0],
    },
  };
};

const MedicineDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const medicineId = (await params).id;

  const { data: medicine } = await getSingleMedicine(medicineId);

  const { data: reviews } = await getSpecificProductReviews(medicineId);

  const { data: medicines } = await getAllMedicine();

  const relatedMedicines =
    medicines.filter(
      (med: TMedicineResponse) =>
        med.type === medicine.type && med._id !== medicine._id
    ) || [];

  return (
    <div className="py-16">
      <MedicineDetail
        medicine={medicine}
        reviews={reviews}
        relatedMedicines={relatedMedicines}
      />
    </div>
  );
};

export default MedicineDetailPage;
