export const dynamic = "force-dynamic";

import CreateTheProductForm from "@/components/dashboard/admin/CreateProduct/CreateProductForm";

import React from "react";

const CreateProductPage = () => {
  return (
    <div className="flex justify-center items-center">
      <CreateTheProductForm />
    </div>
  );
};

export default CreateProductPage;
