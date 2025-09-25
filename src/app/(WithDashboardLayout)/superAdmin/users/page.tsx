export const dynamic = "force-dynamic";

import ManageUserBySuperAdmin from "@/components/dashboard/superAdmin/ManageUsers/ManageUsers";
import { getAllUser } from "@/services/user";
import React from "react";

const UsersPage = async () => {
  const { data } = await getAllUser();
  return (
    <div className="overflow-x-auto w-full">
      <ManageUserBySuperAdmin data={data} />
    </div>
  );
};

export default UsersPage;
