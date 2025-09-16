export const dynamic = "force-dynamic";

import CreateMedicineForm from "@/components/dashboard/admin/CreateProduct/CreateProductForm";
import React from "react";

const CreateMedicinePage = () => {
  return (
    <div className="flex justify-center items-center">
      <CreateMedicineForm />
    </div>
  );
};

export default CreateMedicinePage;
