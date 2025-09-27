"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { getAllBanner } from "@/services/banner";

interface Banner {
  _id: string;
  heading: string;
  description: string;
  imageUrl: string[];
  createdAt: string;
  updatedAt: string;
}

const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch banners on component mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await getAllBanner();
        if (response.success && response.data) {
          setBanners(response.data);
        } else {
          setError("Failed to fetch banners");
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Error loading banners");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Get the most recent banner for display
  const latestBanner = banners.length > 0 ? banners[0] : null;

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 w-full">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="md:col-span-2">
                <div className="h-16 bg-gray-200 rounded mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-96 md:h-[500px] mt-16 mb-16">
              <div className="md:col-span-3 bg-gray-200 rounded"></div>
              <div className="grid gap-4 grid-rows-2 md:col-span-2">
                <div className="bg-gray-200 rounded"></div>
                <div className="bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no banners available, show empty state
  if (!latestBanner) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 w-full">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Banners Available
            </h2>
            <p className="text-gray-600">
              Please add banners to display content.
            </p>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 w-full grid grid-cols-1 md:grid-cols-5 gap-6"
      >
        {/* Title */}
        <div className="md:col-span-3">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-tight"
          >
            {latestBanner.heading}
          </motion.h1>
        </div>

        {/* Description & CTA */}
        <div className="md:col-span-2">
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed max-w-sm"
          >
            {latestBanner.description}
          </motion.p>
          <Link href="/shop">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Redefine Your Space
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Banner Grid - Only show if we have at least 3 images */}
      {latestBanner.imageUrl.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-96 md:h-[500px] mt-16 mb-16">
          {/* Main Banner - Using First Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-3 relative overflow-hidden group cursor-pointer"
          >
            <Image
              src={latestBanner.imageUrl[0]}
              alt={`${latestBanner.heading} - Main Banner`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
              priority
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-red-900/30 z-10"></div>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute left-8 bottom-8 text-white font-bold text-xl md:text-2xl lg:text-3xl max-w-sm leading-tight z-20"
            >
              Softness You Can Feel
            </motion.h2>
          </motion.div>

          {/* Right Side Cards */}
          <div className="grid gap-4 grid-rows-2 md:col-span-2">
            {/* Second Image Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative overflow-hidden group cursor-pointer"
            >
              <Image
                src={latestBanner.imageUrl[1]}
                alt={`${latestBanner.heading} - Second Banner`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-yellow-600/30 z-10"></div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute left-6 bottom-6 text-white font-bold text-lg md:text-xl leading-tight z-20"
              >
                Bring Colors to Your Home
              </motion.h2>
            </motion.div>

            {/* Third Image Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="relative overflow-hidden group cursor-pointer"
            >
              <Image
                src={latestBanner.imageUrl[2]}
                alt={`${latestBanner.heading} - Third Banner`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-gray-500/30 z-10"></div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute left-6 bottom-6 text-white font-bold text-lg md:text-xl leading-tight z-20"
              >
                Make Every Room Special
              </motion.h2>
            </motion.div>
          </div>
        </div>
      )}

      {/* Show message if banner has fewer than 3 images */}
      {latestBanner.imageUrl.length < 3 && (
        <div className="text-center py-8 text-gray-600">
          <p>Banner needs at least 3 images to display the grid layout.</p>
          <p className="text-sm">
            Current images: {latestBanner.imageUrl.length}/3
          </p>
        </div>
      )}
    </div>
  );
};

export default Banner;
