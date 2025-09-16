import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ProductSearchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Set initial searchTerm from URL when component mounts
    const initialSearch = searchParams.get("searchTerm") || "";
    setSearchTerm(initialSearch);
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("searchTerm", value);
    } else {
      params.delete("searchTerm");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete("searchTerm");
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-1 mb-6">
      <div className="flex items-center gap-2">
        <Input
          id="search"
          placeholder="Search (Name, Description)"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        }
      </div>
    </div>
  );
};

export default ProductSearchbar;
