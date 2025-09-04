"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8">
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
            SoptokBD – Where Homes Feel Alive
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
            Quality mats and rugs designed to blend beauty with long-lasting
            comfort.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Redefine Your Space
          </motion.button>
        </div>
      </motion.div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-96 md:h-[500px] mt-16 mb-16">
        {/* Main Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:col-span-3 relative overflow-hidden  group cursor-pointer"
        >
          {/* Next.js Optimized Image */}
          <Image
            src="https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532314375_122104439918973943_741066774039141628_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFBGroF815j32TyKVklvjW6VJJZ9Cw4PlNUkln0LDg-UxfIVDI9iwO_z-s4yf3neWrf5419tq5hAjhDSo79oVoL&_nc_ohc=kos53XVhLhgQ7kNvwHNnS1B&_nc_oc=AdkeZxa_Wc9id4w_TZFFM2Dsk5FzziRyAxWieiiIF58F38j3AfM7l38WmyCOmpb4WVw&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=rJWccE68Pp4IDySaLR4KRA&oh=00_AfbjAAW3lhlSR0dXvJzDuncFRVsDjbEytOeToNxWvHybwQ&oe=68BF0224"
            alt="Premium quality mats and rugs collection"
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
          {/* Casual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative overflow-hidden  group cursor-pointer"
          >
            <Image
              src="https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534567920_122106312458973943_8239955401131150047_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFj8YafKT4L0FEItO11xQHGjV1Xt06w1zWNXVe3TrDXNSMUoP4YdgC182KghNE5VkIAtN9i44IBUyHa406trtYg&_nc_ohc=YKlSRqwaukEQ7kNvwG6mdXJ&_nc_oc=AdlTXjc70EQ3LlvNCs4CXXWk-kGdhtO6fzFkULtNrcwf6_6bWBc2DcSjzlIa4SKG52g&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=gR4v4VdW7dZC8PG1chgp4w&oh=00_AfbUeucHYkWy5z3F_bp7RsB_84Nswseaaqfarq0xwQDNYg&oe=68BF07CC"
              alt="Colorful decorative mats for home"
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

          {/* Sports Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative overflow-hidden  group cursor-pointer"
          >
            <Image
              src="https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/533632473_122104364354973943_3025970382381255880_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFDZGaLcP05-kjbFphDTHe_JwKdzeBEdAMnAp3N4ER0A196D_Jaa1x6BQk4kBZyqTxv6vPvr7nwEZ9L_AtTW_WQ&_nc_ohc=qatNwXZJhloQ7kNvwG11gzX&_nc_oc=AdlDtMfS-pYf13viFgZZbtn3a5EUm68A1v1P0uAlQGznod1Uhum88y5KK57HlBKZIPY&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=MqeFtVcQa1TaQLMg8xPiKA&oh=00_Afbgxq8Tpns-ekJN_oAm2zVKu3juTux4ap6G3YjBNr8wRQ&oe=68BF0531"
              alt="Elegant room mats and rugs"
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
    </div>
  );
};

export default Banner;
