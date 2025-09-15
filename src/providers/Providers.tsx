import React from "react";
import { Toaster } from "sonner";
import UserProvider from "@/context/UserContext";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <StoreProvider>
        <Toaster position="top-center" richColors />
        {children}
      </StoreProvider>
    </UserProvider>
  );
};

export default Providers;
