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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Type for Slider ref - using any to avoid type conflicts with react-slick
type SliderRef = any;

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
  const sliderRef = useRef<SliderRef>(null);

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
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-5">
            Demo Categories
          </h2>
        </div>

        {/* Slider Section */}
        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {fakeServices.map((service) => (
              <div key={service.id} className="px-2 sm:px-3 md:px-4">
                <div className="relative group">
                  {/* Image Container */}
                  <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Arrow Button */}
                  <div
                    onMouseEnter={() => setHoveredIndex(service.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-500 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 mx-auto my-4 sm:my-5 cursor-pointer"
                  >
                    {hoveredIndex === service.id ? (
                      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="text-center px-2 sm:px-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom Navigation Arrows */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
