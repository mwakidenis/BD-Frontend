"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Fake SoptokBD services data
const fakeServices = [
  {
    id: "1",
    title: "Handmade Jute Rugs",
    description:
      "Durable and eco-friendly jute rugs that bring natural elegance to your floors.",
    image:
      "https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/532374916_122104365818973943_6642884304932525799_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGjCQ2undAXGfkpZc-0rwCqGnD5MlrmFDQacPkyWuYUNOweGDLdfdr0PZViFmMwg1a8zBe2uWWnBpzaq8wCOURa&_nc_ohc=NJQzhP7rWv0Q7kNvwH2l3BC&_nc_oc=AdknQ7zwkmrKOxr683te8Jm74t8KTQRhqro6KwfcsxOuBhv36TAkcQyXMbrnaTd23KU&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=_nyfoQKuUhDtM-ferkANPg&oh=00_AfZSxATOJTTpMs7JMoj6c5SOBX7bX3S-kLj9RLx89-S_ig&oe=68BF4A9B",
  },
  {
    id: "2",
    title: "Colorful Cotton Mats",
    description:
      "Soft and vibrant cotton mats designed to brighten up bedrooms and living spaces.",
    image:
      "https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/532569047_122104976060973943_7533162965895960141_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG_TKgQ064USeV1p2_JunKoqhppwu_ws6mqGmnC7_CzqW5Ls6ZGQph9czx6Rg5x1gGsmgPc4WQAXUGn5GwwggrP&_nc_ohc=3TenKVa3OvgQ7kNvwHS0Ndq&_nc_oc=AdkPtFpCLsaorpw9ofjM0kMr83V4lIbjQfe9N5Lk3SqBVPzZwtRjPBH40d2L_gr-aEk&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=_DyIV3z6U6zYHbOuXE01kw&oh=00_AfYQM9hxG39pjADfT2QdNIELbhyftCX_ewGWsfTNZ6eK7w&oe=68BF4BE1",
  },
  {
    id: "3",
    title: "Geometric Carpets",
    description:
      "Modern geometric designs that combine comfort with a stylish look.",
    image:
      "https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/534226611_122106313190973943_8389626013523221598_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGZ5Duis3RalzasLwc15rkwrqUCsUgo0GaupQKxSCjQZn_fKHa7VeMyrYP4ugTwvo8lUwM8J0EqsqaPMKw83DbQ&_nc_ohc=AtFTRqt5XA4Q7kNvwFnVfMs&_nc_oc=AdnxSJsNLZjHTgajuLwps-IM6hf77vY2sMIDtrFcBGLO_t-J-6oa1vR4Xgmw3P-q-J0&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=h7-QDTr5nziBHVg5aksjpw&oh=00_AfbhZ4uUKTT-uxeuQ2YhTcMB7MaYFor_jJky1QweyWr6tg&oe=68BF2A4A",
  },
  {
    id: "4",
    title: "Traditional Bangladeshi Craft",
    description:
      "Celebrate heritage with beautifully woven, traditional handmade pieces.",
    image:
      "https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/542758219_122115287996973943_4995206793234091263_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE89thRc3GJ20nZ_DG68uRbU-qH6zYx2pZT6ofrNjHalmtDKw2lPF7sKtPOOmlT3lYpC-tADFn-nZDYi79QRutC&_nc_ohc=6xPBve7fIoAQ7kNvwFHnrAU&_nc_oc=Adku0-Bx1KkGW41kR6xJ5G6Zv6hJEpuUuydNoez93oyJTyN7mV4gKX35T0FBTkxzEGo&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=2YKLCaTCjrBZqoM0FNf80Q&oh=00_Afb0TjqdlaPc6irDCYwPGxOnRy4dfIT-iuG9CvFn5cIDWw&oe=68BF3068",
  },
];

export default function Categories() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false, // disable dots
    arrows: false, // disable default arrows
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

  return (
    <div className="relative py-12 px-6 md:px-20 my-9">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1d1b20] mb-10">
        Explore Our Categories
      </h2>

      <Slider ref={sliderRef} {...settings}>
        {fakeServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="px-4"
          >
            <div className="overflow-hidden border border-gray-200 bg-white shadow-md">
              <Image
                src={service.image}
                alt={service.title}
                width={500}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <Link href={`/`}>
                  <button
                    onMouseEnter={() => setHoveredIndex(service.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 mx-auto my-5 cursor-pointer"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {hoveredIndex === service.id ? (
                        <motion.div
                          key="arrow-right"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight size={20} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="arrow-up-right"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowUpRight size={20} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </Link>
                <h3 className="text-xl font-semibold mb-2 text-black text-center">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-center">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>

      {/* Custom arrows */}
      <div className="flex gap-3 justify-center my-5">
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
  );
}
