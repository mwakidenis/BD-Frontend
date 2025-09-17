"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { getAllMedicine } from "@/services/product";
import { TMedicineResponse } from "@/types/product";

type MedicineCardProps = {
  medicine: TMedicineResponse;
  index: number;
};

// --- Medicine Card Component ---
const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, index }) => {
  const [hover, setHover] = useState(false);

  // Calculate discounted price
  const discountedPrice =
    medicine.discount > 0
      ? medicine.price - (medicine.price * medicine.discount) / 100
      : medicine.price;

  // Check if medicine is expired
  const isExpired = new Date(medicine.expireDate) < new Date();

  // Check stock status based on inStock boolean and quantity
  const stockStatus =
    !medicine.inStock || medicine.quantity === 0
      ? "Out of Stock"
      : medicine.quantity <= 5
      ? "Limited Stock"
      : "Available";
  const isOutOfStock = !medicine.inStock || medicine.quantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex-shrink-0 w-80 h-[360px] mb-12 group relative overflow-hidden"
      style={{ backgroundColor: "rgb(234 234 234)" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Medicine Image */}
      <div
        style={{
          backgroundImage: `url(${medicine.imageUrl[0] || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "80%",
        }}
        className={`h-[90%] relative mx-auto duration-[.4s] ${
          hover ? "scale-105" : ""
        } ${isExpired || isOutOfStock ? "grayscale" : ""}`}
      ></div>

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
      {medicine.discount > 0 && !isExpired && !isOutOfStock && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded z-20">
          {medicine.discount}% OFF
        </div>
      )}

      {/* New Arrival Badge */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-2 py-1 text-xs font-semibold rounded z-20">
        NEW
      </div>

      {/* Medicine Name */}
      <div className="h-[50px] bg-[rgb(234_234_234)] w-full font-medium py-2 text-center">
        {medicine.name}
      </div>

      {/* Hover Overlay - show medicine details on hover */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-5 flex flex-col justify-center items-center gap-3 font-clashRegular ${
          hover ? "backdrop-blur-sm bg-black/20" : ""
        }`}
      >
        {/* Medicine Information */}
        <div
          className={`text-center text-white bg-black/60 px-4 py-2 ${
            hover ? "opacity-100" : "opacity-0"
          } duration-300`}
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

        {/* Action Buttons */}
        <button
          className={`w-[80%] border border-white bg-transparent text-white cursor-pointer ${
            hover
              ? "h-[40px] text-base"
              : "w-0 h-0 text-[0px] border-none duration-[.5s]"
          } duration-[.5s] hover:bg-white hover:text-black`}
          onClick={() => {
            // Navigate to medicine details
            window.location.href = `/product/${medicine._id}`;
          }}
        >
          View Details
        </button>

        <button
          disabled={isExpired || isOutOfStock}
          className={`w-[80%] border border-white bg-transparent text-white cursor-pointer flex items-center justify-center gap-2 ${
            hover ? "h-[40px] text-base" : "w-0 h-0 text-[0px] border-none"
          } duration-[.5s] hover:bg-white hover:text-black ${
            isExpired || isOutOfStock
              ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-white"
              : ""
          }`}
        >
          <ShoppingCart
            className={`${hover ? "w-4 h-4" : "w-0 h-0"} duration-300`}
          />
          {isExpired || isOutOfStock ? "Unavailable" : "Add To Cart"}
        </button>
      </div>
    </motion.div>
  );
};

// --- New Arrivals Section Component ---
export default function NewArrivalsSection() {
  const [medicines, setMedicines] = useState<TMedicineResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const { data } = await getAllMedicine();

        // Sort by createdAt date (most recent first) and take first 10
        const sortedMedicines =
          data
            ?.sort(
              (a: TMedicineResponse, b: TMedicineResponse) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 10) || [];

        setMedicines(sortedMedicines);
      } catch (err) {
        setError("Failed to load new arrivals");
        console.error("Error fetching new arrivals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
          </div>
        </div>
        <div className="flex space-x-6 mb-8">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-[360px] bg-neutral-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <div className="text-red-500 text-lg">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  if (!medicines || medicines.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <div className="text-gray-500 text-lg">
              No new arrivals available at the moment.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* First Row - Left to Right */}
        <div className="flex space-x-6 animate-marquee mb-8">
          {[...medicines, ...medicines].map((medicine, index) => (
            <MedicineCard
              key={`row1-${index}`}
              medicine={medicine}
              index={index}
            />
          ))}
        </div>

        {/* Gradient Overlays for Seamless Effect */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        {/* <button className="bg-black hover:from-blue-900 text-white font-semibold px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          View All New Arrivals
        </button> */}
      </motion.div>

      {/* CSS for Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }

        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
