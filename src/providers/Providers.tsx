import React from "react";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";

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
