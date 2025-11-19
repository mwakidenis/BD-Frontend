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
    title: "Colorful Sharee",
    description:
      "Durable and eco-friendly jute rugs that bring natural elegance to your floors.",
    image:
      "https://i.ibb.co.com/Xf4tFkwZ/534522030-122104364474973943-2085270456894943289-n.jpg",
  },
  {
    id: "2",
    title: "Colorful Cotton Mats",
    description:
      "Soft and vibrant cotton mats designed to brighten up bedrooms and living spaces.",
    image:
      "https://i.ibb.co.com/4Rft2RMp/559377095-122129040440973943-3785180031404989496-n.jpg",
  },
  {
    id: "3",
    title: "Geometric Carpets",
    description:
      "Modern geometric designs that combine comfort with a stylish look.",
    image:
      "https://i.ibb.co.com/kg2JXjbg/536278566-122106312656973943-6333669654772770161-n.jpg",
  },
  {
    id: "4",
    title: "Traditional Bangladeshi Craft",
    description:
      "Celebrate heritage with beautifully woven, traditional handmade pieces.",
    image:
      "https://i.ibb.co.com/6c8fk3YV/540590300-122114086406973943-3314017149461766343-n.jpg",
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
        Demo Categories
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
