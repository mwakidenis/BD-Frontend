"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllMedicine } from "@/services/product";
import { TMedicineResponse } from "@/types/product";

// --- Medicine Card Props ---
type MedicineCardProps = {
  medicine: TMedicineResponse;
};

// --- Medicine Card ---
const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
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
    <div className="px-4">
      <div
        className="h-[360px] mb-12 group relative overflow-hidden"
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

        {/* Medicine Name */}
        <div className="h-[50px] bg-[rgb(234_234_234)] w-full font-medium py-2 text-center">
          {medicine.name}
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute top-0 left-0 w-full h-full z-5 flex flex-col justify-center items-center gap-3 font-clashRegular ${
            hover ? "backdrop-blur-sm bg-black/20" : ""
          }`}
        >
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
              window.location.href = `/medicine/${medicine._id}`;
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
      </div>
    </div>
  );
};

// --- Section Component ---
export default function BestSellingMedicines() {
  const sliderRef = useRef<Slider | null>(null);
  const [medicines, setMedicines] = useState<TMedicineResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const { data } = await getAllMedicine();
        const allowedTypes = [
          "Skin Care",
          "Food",
          "Baby",
          "Tablet",
          "Syrup",
          "Capsule",
        ];
        const filteredMedicines =
          data
            ?.filter((med: TMedicineResponse) =>
              allowedTypes.includes(med.type)
            )
            .slice(0, 8) || [];
        setMedicines(filteredMedicines);
      } catch (err) {
        setError("Failed to load medicines");
        console.error("Error fetching medicines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    focusOnSelect: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (loading) {
    return (
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Best Selling Medicines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-[360px] bg-neutral-200 animate-pulse mx-4"
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
          Best Selling Medicines
        </h2>
        <div className="text-center text-red-500 text-lg">{error}</div>
      </section>
    );
  }

  if (!medicines || medicines.length === 0) {
    return (
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Best Selling Medicines
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
        Best Selling Medicines
      </h2>

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {medicines.map((medicine, index) => (
            <motion.div
              key={medicine._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MedicineCard medicine={medicine} />
            </motion.div>
          ))}
        </Slider>

        {/* Custom Navigation Arrows */}
        <div className="flex gap-3 justify-center mt-8">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="size-10 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="size-10 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link
          href="/medicines"
          className="bg-black hover:from-blue-900 text-white font-semibold px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-block"
        >
          Browse All Medicines
        </Link>
      </motion.div>
    </section>
  );
}
