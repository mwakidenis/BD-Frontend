"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getHomePageMedicines } from "@/services/product";

// --- Types ---
type Medicine = {
  _id: string;
  name: string;
  description: string;
  type: string;
  requiredPrescription: boolean;
  price: number;
  discount: number;
  expireDate: string;
  quantity: number;
  imageUrl: string;
};

type MedicineCardProps = {
  medicine: Medicine;
};

// --- Medicine Card ---
const MedicineCard = ({ medicine }: MedicineCardProps) => {
  const [hover, setHover] = useState(false);

  // Calculate discounted price
  const discountedPrice =
    medicine.discount > 0
      ? medicine.price - (medicine.price * medicine.discount) / 100
      : medicine.price;

  // Check if medicine is expired
  const isExpired = new Date(medicine.expireDate) < new Date();

  // Check stock status
  const stockStatus = medicine.quantity <= 5 ? "Limited Stock" : "Available";
  const isOutOfStock = medicine.quantity === 0;

  return (
    <div
      className="h-[360px] mb-12 group relative overflow-hidden bg-neutral-200"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Medicine Image */}
      <div
        className={`h-[90%] relative mx-auto duration-500 transform ${
          hover ? "scale-105" : ""
        } ${isExpired || isOutOfStock ? "grayscale" : ""}`}
        style={{
          backgroundImage: `url(${medicine.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "80%",
        }}
      />

      {/* Expired/Out of Stock Overlay */}
      {(isExpired || isOutOfStock) && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded z-20">
          {isExpired ? "EXPIRED" : "OUT OF STOCK"}
        </div>
      )}

      {/* Prescription Required Badge */}
      {medicine.requiredPrescription && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded z-20">
          Rx REQUIRED
        </div>
      )}

      {/* Discount Badge */}
      {medicine.discount > 0 && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded z-20">
          {medicine.discount}% OFF
        </div>
      )}

      {/* Medicine Name */}
      <div className="h-[50px] bg-neutral-200 w-full font-medium py-2 text-center">
        {medicine.name}
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-center items-center gap-3 font-clashRegular ${
          hover ? "backdrop-blur-sm bg-black/20" : ""
        }`}
      >
        {/* Medicine Info */}
        <div
          className={`text-center text-white bg-black/60 px-4 py-2 transition-opacity duration-300 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm font-semibold mb-1">{medicine.type}</p>
          <div className="text-lg font-bold mb-1">
            {medicine.discount > 0 ? (
              <>
                <span className="line-through text-gray-300 text-sm mr-2">
                  ৳ {medicine.price}
                </span>
                <span>৳ {discountedPrice.toFixed(2)}</span>
              </>
            ) : (
              <span>৳ {medicine.price}</span>
            )}
          </div>
          <p className="text-sm">
            Stock: {medicine.quantity}{" "}
            <span
              className={
                medicine.quantity <= 5 ? "text-orange-300" : "text-green-300"
              }
            >
              ({stockStatus})
            </span>
          </p>
          {medicine.description && (
            <p className="text-xs mt-1 opacity-80 line-clamp-2">
              {medicine.description}
            </p>
          )}
        </div>

        {/* View Details */}
        <Link
          href={`/medicine/${medicine._id}`}
          className={`w-[80%] border border-white text-white text-center transition-all duration-500 ${
            hover
              ? "h-[40px] text-base"
              : "w-0 h-0 text-[0px] border-none overflow-hidden"
          } hover:bg-white hover:text-black`}
        >
          View Details
        </Link>

        {/* Add to Cart */}
        <button
          disabled={isExpired || isOutOfStock}
          className={`w-[80%] border border-white text-white cursor-pointer flex items-center justify-center gap-2 transition-all duration-500 ${
            hover
              ? "h-[40px] text-base"
              : "w-0 h-0 text-[0px] border-none overflow-hidden"
          } hover:bg-white hover:text-black ${
            isExpired || isOutOfStock
              ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-white"
              : ""
          }`}
        >
          <ShoppingCart
            className={`${hover ? "w-4 h-4" : "w-0 h-0"} transition-all`}
          />
          {isExpired || isOutOfStock ? "Unavailable" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

// --- Section Component ---
export default function MedicineSection() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const { data: medicines, meta } = await getHomePageMedicines();
        // Show only first 6 medicines
        setMedicines(medicines.slice(0, 6));
      } catch (err) {
        setError("Failed to load medicines");
        console.error("Error fetching medicines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Our Medicine Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-[360px] mb-12 bg-neutral-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Our Medicine Collections
        </h2>
        <div className="text-center text-red-500 text-lg">{error}</div>
      </section>
    );
  }

  if (!medicines || medicines.length === 0) {
    return (
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Our Medicine Collections
        </h2>
        <div className="text-center text-gray-500 text-lg">
          No medicines available at the moment.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Explore Our Medicine Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {medicines.map((medicine) => (
          <MedicineCard key={medicine._id} medicine={medicine} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <Link
          href="/medicines"
          className="bg-black text-white font-semibold px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-block"
        >
          Browse All Medicines
        </Link>
      </motion.div>
    </section>
  );
}
