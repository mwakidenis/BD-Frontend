import UpdateUserPasswordForm from "@/components/dashboard/user/UpdateUserPassword/UpdateUserPasswordForm";
import React from "react";

const ChangePassword = async () => {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center gap-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <UpdateUserPasswordForm />
      </div>
    </div>
  );
};

export default ChangePassword;
