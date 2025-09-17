import UpdateUserForm from "@/components/dashboard/user/UpdateUser/UpdateUserForm";
import { getCurrentUser } from "@/services/auth";
import React from "react";

const UpdateUserProfile = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <UpdateUserForm user={user} />
    </div>
  );
};

export default UpdateUserProfile;
