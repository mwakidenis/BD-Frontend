import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-2xl font-bold">
      Cancelled Page
      <Link href="/" className="text-blue-500 underline ml-2">
        Go to Home
      </Link>
    </div>
  );
};

export default page;
