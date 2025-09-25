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
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/540590300_122114086406973943_3314017149461766343_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHN59cMt_Lm0JZolYJkRhItplW3H-Z92PumVbcf5n3Y-2WErCT4AVQxQWySXwQ35yD7zA3FhZ1dluh_dPrd7rIR&_nc_ohc=4gRPJ-oAIuEQ7kNvwEGkFo0&_nc_oc=AdnlxP89avNCRWJ4LKTucubjoy9jkMaBc3lIeEOwX31coUCYIpaIjLfYhdDMAmoDW7o&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=C8y_OP5PNiuztkIgkUWi9g&oh=00_AfYWosq6xZLka1bd2HcKKikLu0HZA7Tpw17RfndXDJtEsA&oe=68C9FE0A",
  },
  {
    id: "2",
    title: "Colorful Cotton Mats",
    description:
      "Soft and vibrant cotton mats designed to brighten up bedrooms and living spaces.",
    image:
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532083747_122104365644973943_2391280419084169710_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG-emQ2LZTAFvUqYrx0t_T0_8DUEIhqXff_wNQQiGpd9_a7gun9-0Wa0R56D49zIxHH7nM7JQZL17jQtsTXxa7V&_nc_ohc=j365DEVbML8Q7kNvwGkRXZL&_nc_oc=AdmvbnL0BiovxApVaiat--zn3U41oCJCrdDnTHt_kPKc0jMpn9n8jIwOAQ_L5S-oLG4&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=k5gdBWtLWZFJ-Z820oliPg&oh=00_AfY30CNShk5r0ZhoXpil5x9K-HCelUChBnBkHCGMTJoxAQ&oe=68C9F5F7",
  },
  {
    id: "3",
    title: "Geometric Carpets",
    description:
      "Modern geometric designs that combine comfort with a stylish look.",
    image:
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/536270152_122106312842973943_9042513676787082582_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGhN8MUL0UUNHYp_fraBYq0P2xLJAW0wrA_bEskBbTCsPkMR15byC6H26o3Q1rFJ0NiH29DRxDBhR7JKFIbJUtM&_nc_ohc=KnxGZLNs2j4Q7kNvwFof-qH&_nc_oc=AdnEM5TqHy2lsUu3MkxJ_91YsDdNv6Q5QQkRaqn9afmaj2qUP0ugRKR2HuU8pODJl4k&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=BLkq2VRLgNvUWrQlGanndw&oh=00_AfZfPqO3R-7Kf5b1vmvcWcOeo883BTaUudAAJIk-i-AliA&oe=68CA0DD8",
  },
  {
    id: "4",
    title: "Traditional Bangladeshi Craft",
    description:
      "Celebrate heritage with beautifully woven, traditional handmade pieces.",
    image:
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/533106420_122104976312973943_4551989155769631010_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF-_zGqHtcF0KI9RtxuqR-2HZkmswz_CCEdmSazDP8IIYVRV5fqXTuk-WBlQtoIIUmXytX-XgCPj87Uhb-jy_gh&_nc_ohc=pZcK-L_NIhQQ7kNvwHMtita&_nc_oc=AdkwqScbFDbuDgpXYFgtv0Cy9rCHdTN75FCEF0v-suHX7Yvf6zlIRrXFACCI-H3Gzd8&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=4GT0GBntqiu2BeAtxFM6wg&oh=00_AfYJvbzfQ6L5jznidgSXoRVlAZfL09FLy76vOcfh3-O5sQ&oe=68CA03DB",
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
