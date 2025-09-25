"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

import { getAllProduct } from "@/services/product";
import { IProduct } from "@/types/product";

export default function FilterProductSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [price, setPrice] = useState<number[]>([0]);
  const [date, setDate] = useState<Date | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await getAllProduct();
        if (res?.data) {
          const allProducts: IProduct[] = res.data;

          // ✅ Extract unique categories & manufacturers
          const uniqueCategories: string[] = Array.from(
            new Set(allProducts.map((p) => p.category))
          ).filter(Boolean);

          const uniqueManufacturers: string[] = Array.from(
            new Set(allProducts.map((p) => p.manufacturer))
          ).filter(Boolean);

          setCategories(uniqueCategories);
          setManufacturers(uniqueManufacturers);
        }
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };

    fetchFilters();
  }, []);

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setPrice([0]);
    setDate(undefined);
    setSearchTerm("");
    setSelectedCategory(undefined);
    setSelectedManufacturer(undefined);
    router.push(`${pathname}`);
  };

  return (
    <aside className="w-full md:w-[280px] p-4 bg-white dark:bg-zinc-900 shadow rounded-lg space-y-6 text-zinc-900 dark:text-zinc-100">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
        >
          <X className="w-4 h-4" />
          <span className="ml-1">Reset</span>
        </Button>
      </div>

      {/* Search */}
      <div className="space-y-1">
        <Label htmlFor="search">Search (Name, Description)</Label>
        <Input
          id="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            handleFilter("searchTerm", value);
          }}
        />
      </div>

      {/* Category Select */}
      <div className="space-y-1">
        <Label>Category</Label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            handleFilter("category", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Manufacturer Select */}
      <div className="space-y-1">
        <Label>Manufacturer</Label>
        <Select
          value={selectedManufacturer}
          onValueChange={(value) => {
            setSelectedManufacturer(value);
            handleFilter("manufacturer", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select manufacturer" />
          </SelectTrigger>
          <SelectContent>
            {manufacturers.map((man) => (
              <SelectItem key={man} value={man}>
                {man}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h2 className="font-semibold">Price</h2>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>৳0</span>
          <span>৳5000</span>
        </div>
        <p className="text-sm my-2 text-center">
          Selected Price:{" "}
          <span className="font-semibold py-2">৳{price[0]}</span>
        </p>
        <Slider
          max={5000}
          value={price}
          step={1}
          onValueChange={(value) => {
            setPrice(value);
            handleFilter("price", value[0].toString());
          }}
          className="w-full"
        />
      </div>

      {/* Stockout */}
      <div className="space-y-1">
        <Label>Stockout</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="stockout"
            onCheckedChange={(checked) =>
              handleFilter("inStock", String(checked !== true))
            }
          />
          <Label htmlFor="stockout" className="text-sm">
            Stockout Products
          </Label>
        </div>
      </div>
    </aside>
  );
}
