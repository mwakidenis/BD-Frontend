export const dynamic = "force-dynamic";

import ManageUser from "@/components/dashboard/admin/ManageUsers/ManageUsers";
import { getAllUser } from "@/services/user";
import React from "react";

const UsersPage = async () => {
  const { data } = await getAllUser();
  return (
    <div className="overflow-x-auto w-full">
      <ManageUser data={data} />
    </div>
  );
};

export default UsersPage;
