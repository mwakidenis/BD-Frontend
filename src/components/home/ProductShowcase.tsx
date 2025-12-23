"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ProductShowcase = () => {
  // Sample product images - replace with your actual product images
  const showcaseImages = [
    {
      id: 1,
      src: "https://i.ibb.co.com/jPwLRQ2v/532569047-122104976060973943-7533162965895960141-n.jpg",
      alt: "Luxury Persian rug for living room",
      title: "Persian Elegance",
    },
    {
      id: 2,
      src: "https://i.ibb.co.com/YwVqfm0/532628420-122104440896973943-189849678533842657-n.jpg",
      alt: "Modern geometric floor mat",
      title: "Geometric Modern",
    },
    {
      id: 3,
      src: "https://i.ibb.co.com/LX6VfBX1/533530594-122104976000973943-184175613592695192-n.jpg",
      alt: "Cozy bedroom rug collection",
      title: "Bedroom Comfort",
    },
    {
      id: 4,
      src: "https://i.ibb.co.com/Xf4tFkwZ/534522030-122104364474973943-2085270456894943289-n.jpg",
      alt: "Kitchen utility mat set",
      title: "Kitchen Essentials",
    },
    {
      id: 5,
      src: "https://i.ibb.co.com/6c8fk3YV/540590300-122114086406973943-3314017149461766343-n.jpg",
      alt: "Bathroom anti-slip mats",
      title: "Bathroom Safety",
    },
    {
      id: 6,
      src: "https://i.ibb.co.com/4Rft2RMp/559377095-122129040440973943-3785180031404989496-n.jpg",
      alt: "Outdoor garden mats",
      title: "Garden Collection",
    },
    {
      id: 7,
      src: "https://i.ibb.co.com/Mmvy9YN/534228258-122106312752973943-2547299996735365583-n.jpg",
      alt: "Traditional handwoven rugs",
      title: "Handwoven Heritage",
    },
    {
      id: 8,
      src: "https://i.ibb.co.com/CKLh5yYp/534994784-122106312710973943-7381580249860017794-n.jpg",
      alt: "Kids playroom colorful mats",
      title: "Kids Collection",
    },
    {
      id: 9,
      src: "https://i.ibb.co.com/kg2JXjbg/536278566-122106312656973943-6333669654772770161-n.jpg",
      alt: "Office workspace mats",
      title: "Office Comfort",
    },
  ];

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
            Our Premium Collection
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* First Row - Left to Right */}
        <div className="flex space-x-6 animate-marquee mb-8">
          {[...showcaseImages, ...showcaseImages].map((image, index) => (
            <motion.div
              key={`row1-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex-shrink-0 group cursor-pointer"
            >
              <div className="relative w-80 h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="320px"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.title}
                  </h3>
                </div>
                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second Row - Right to Left */}
        <div className="flex space-x-6 animate-marquee-reverse">
          {[...showcaseImages.reverse(), ...showcaseImages].map(
            (image, index) => (
              <motion.div
                key={`row2-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex-shrink-0 group cursor-pointer"
              >
                <div className="relative w-80 h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="320px"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Title */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.title}
                    </h3>
                  </div>
                  {/* Decorative Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-colors duration-300"></div>
                </div>
              </motion.div>
            )
          )}
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
        <button className="bg-black hover:from-blue-900  text-white font-semibold px-10 py-4  shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          Explore Full Collection
        </button>
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
          animation: marquee 30s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }

        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ProductShowcase;
