"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

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
          <Link href="/products">
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
            src="https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534962636_122106313358973943_3225486904480511132_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGZYhKaR_fXH71-HrIqgaUmYna9WwVV461idr1bBVXjrdFMAoTANzvlKWEDkZEiXaYS7NrTQYcH-rI7JhHhtS7k&_nc_ohc=q7a4ODM-0gYQ7kNvwFD4LrT&_nc_oc=AdnS6N1KfTMX2rQbW-Jmab7gXrNXrIIw28xq4-aa-S6897LLAymzWK2hXl3iI1J4m_s&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=WTco_2eASAy6C10dTF64oQ&oh=00_AfZzLcX1UCey7bHcAk5YrdWIKGr0ZBtU-fk6mrzDjaeJRw&oe=68CA0397"
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
              src="https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/536142904_122106313430973943_6471720637710960023_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE750xtUDjOIG4P9YpQejv92VCeWW9L3_zZUJ5Zb0vf_B6JgknBsDqyJMYGRZJHir5lvJObY3TlwKb5OVR9Fm3l&_nc_ohc=N1XS2J0h2zIQ7kNvwEIvlkr&_nc_oc=AdkrNOCftcDo6BH1KGlhMYqSR4UvohDa9ucoHxONYvVcv8LMUOxeU9Cx11TTy-7HYqI&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=bX_OObEaOfO3xDmMwVCSTw&oh=00_AfY02ERrJc-ir2ThLoYzlieLQwdoiiHKBQHSDyLier3Oug&oe=68C9DBC7"
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
              src="https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534340482_122106313046973943_6905950517460037426_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHG-Prl1X3iB4-kGz4BQhlSofSZR-QnDj2h9JlH5CcOPW52vTpUCKxChe4nyBqPxxfpgmFBOfQXGoSSxSznbRuW&_nc_ohc=FufIFXD5PLMQ7kNvwHXvR6b&_nc_oc=AdlBUjOgz-SFNALpPpwS_hQyDrMglg-MZ68U3hjWNlna0bSrt7PkocPDD4OH_Inqgwk&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=4WY_9yJvzBiHFcFFFY3KRg&oh=00_AfbHhN5bYM0QQvIZYcszNPvaQl0P3zUMxTH41DpBR2QH-g&oe=68C9DC0D"
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
