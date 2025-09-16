"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const TablePagination = ({ totalPage }: { totalPage: number }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathname}?page=${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathname}?page=${currentPage + 1}`);
    }
  };

  return (
    <div className="flex items-center gap-2 my-2">
      <Button
        disabled={currentPage === 1}
        onClick={handlePrev}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
      >
        <ArrowLeft />
      </Button>

      {[...Array(totalPage)].map((_, index) => (
        <Button
          onClick={() => {
            setCurrentPage(index + 1);
            router.push(`${pathname}?page=${index + 1}`);
          }}
          variant={currentPage === index + 1 ? "default" : "outline"}
          size="sm"
          key={index}
          className="w-8 cursor-pointer h-8 rounded-full flex items-center justify-center"
        >
          {" "}
          {index + 1}{" "}
        </Button>
      ))}

      <Button
        variant="outline"
        disabled={currentPage === totalPage}
        onClick={handleNext}
        size="sm"
        className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default TablePagination;
