"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ProductShowcase = () => {
  // Sample product images - replace with your actual product images
  const showcaseImages = [
    {
      id: 1,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534876157_122106312902973943_5346314353282879395_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGH1hFecTyRP_xUNVFGOkOdow5Dp79ngyajDkOnv2eDJiZke0q-AC867GPH2tLX_j6m5mI738MfYlaB04D2H6nX&_nc_ohc=5wVyvEH2v0YQ7kNvwE6WMAT&_nc_oc=AdncpVStLgLW5ErtMlin0v2TKJfj5Hu5_gnlrkR7mIllRbD8knPu6HLh1zSqfH5mLqs&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=eHMAzZ2lcNPYuK_lnf_tOw&oh=00_AfZLZsu8y7gkP5SC2_7-_TX28feYh-YlgNY7s2pi5vjnMQ&oe=68CA0BC4",
      alt: "Luxury Persian rug for living room",
      title: "Persian Elegance",
    },
    {
      id: 2,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/536270152_122106312842973943_9042513676787082582_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGhN8MUL0UUNHYp_fraBYq0P2xLJAW0wrA_bEskBbTCsPkMR15byC6H26o3Q1rFJ0NiH29DRxDBhR7JKFIbJUtM&_nc_ohc=KnxGZLNs2j4Q7kNvwFof-qH&_nc_oc=AdnEM5TqHy2lsUu3MkxJ_91YsDdNv6Q5QQkRaqn9afmaj2qUP0ugRKR2HuU8pODJl4k&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=BLkq2VRLgNvUWrQlGanndw&oh=00_AfZfPqO3R-7Kf5b1vmvcWcOeo883BTaUudAAJIk-i-AliA&oe=68CA0DD8",
      alt: "Modern geometric floor mat",
      title: "Geometric Modern",
    },
    {
      id: 3,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/533245516_122104977500973943_550900078342926045_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH-v29PAqm2ahZFSs5ouvZgbqgsUxVbgfduqCxTFVuB95pMLuCEwUeIIm-Z4ij31i51vI65MrgiKDqHYZ5eWTqN&_nc_ohc=yCR-NsQQz-wQ7kNvwEWwpza&_nc_oc=AdnXpmk4D5VaoLwBhDqlLi9IT6tUT3f-0V5-YyTgeFOzURZ_f4-6w3RRSdOeX-r9RZA&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=8rQfibQP-z6AshRtiir7Cw&oh=00_AfYthgIUnfuiQdlYDe0UltUm-rH34uM9LCAo27n-rI-olQ&oe=68CA0A1C",
      alt: "Cozy bedroom rug collection",
      title: "Bedroom Comfort",
    },
    {
      id: 4,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534567925_122104977440973943_4956455942702326225_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGOiA7lv3EvCOD_auckGP1qLuv1HCG5dtou6_UcIbl22i4A6Cd-L1pUX9_uaxdkW10OnwQn5xDB4CGjuD79Qd9b&_nc_ohc=58Cj4WujnEoQ7kNvwGDR_iC&_nc_oc=AdnJEK5Yn13tt1FAQfAkLO1LY8izQcq-GyTmq9rALGN7m2jdmfsDd9BHN7Udk-uLVYY&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=i7TSbdS3Hx7h7M9AF0dtOw&oh=00_AfaKDHWeT5nqZex_2WCF-4UG07xRWSzRERDpAIl0k65tVw&oe=68C9F789",
      alt: "Kitchen utility mat set",
      title: "Kitchen Essentials",
    },
    {
      id: 5,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534194665_122104440758973943_6615517092214592842_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFCN7FhWJAGw40A3udUaIwGzoHRwuDiLS7OgdHC4OItLqj-QQ-PX-VPg7yaUq1Fe0NCpV6dqQ7vhuPzVPLhcuZT&_nc_ohc=GFPDa9O6tNIQ7kNvwFzKr-T&_nc_oc=AdlCTXCs2pQOOe8GUFL7Nq9H01PsnYkn1ru7w6Wbfk_mA8HPw5PgkSyt8F2wHwMk2kU&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=rO1Loa2RevDEmNDgBoO4yQ&oh=00_AfaGTAkU4kYEJ03Nmce3C5AeEGwiR91lwIEbrkrQtCgxMQ&oe=68C9FD2F",
      alt: "Bathroom anti-slip mats",
      title: "Bathroom Safety",
    },
    {
      id: 6,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/533104712_122104440632973943_2490122050539472476_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHMdTNWzwdnoK1A7Dl9dZanCkXs0h6IlvEKRezSHoiW8d373H0LZBPBK369zWK3zGrdC3u4WxvcpN5VFfGwl-i4&_nc_ohc=RZ2ojmIX-0cQ7kNvwEuYG2e&_nc_oc=AdmL6Pe1CSJOw1hOTGRk4N4NpJf304BfDZ09CZLGawzsTG-hlmcpfWgqg1Z4ArFaxLM&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=CZRSqhGSbdayMYMOySsGpw&oh=00_AfbHb7dbLe1BIQFzZI0d6AHVruac4WM-8YgDOqJIr5dauQ&oe=68CA03C2",
      alt: "Outdoor garden mats",
      title: "Garden Collection",
    },
    {
      id: 7,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534967943_122104366040973943_1368730029599823588_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEYDVWFHEvXDVGRT7KSDdv4Ek3F56-jsUwSTcXnr6OxTHhaY0tkQFmheTc0qVYAiIx7rMmhCrqLXdNc5T2bBUod&_nc_ohc=w69cs6TA6UcQ7kNvwGWSusF&_nc_oc=AdlEfX2F5kvrKZZkoUP00O7vBirrNBI5mhKLhymnMZbvcp34UtfsYgIhfj5KBd8N4JQ&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=Ijq4inGHOxM0rN4cdL9tsA&oh=00_AfZKWikvwvy7PHfjh-ptrsTMlovIsiS7ZL3ULhjdiy0Muw&oe=68C9EE81",
      alt: "Traditional handwoven rugs",
      title: "Handwoven Heritage",
    },
    {
      id: 8,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/540676319_122113375574973943_7050035308164706905_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGsJJs9owWSdTBdvwSqAWT7_3QucaiKUof_dC5xqIpShyCd8xbSB5qxmfz1aKPsVNayxBIwVPO7jBvG2-CzxHUo&_nc_ohc=idZoBwKsYn4Q7kNvwEz-fPv&_nc_oc=AdlSzfD4gZf2RkRgunNZZNBXMBKtQ97XzZMV7DAqABHlFi5sHew_wZbkWgiLKkApkWs&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=RtFQd8zogvC3NEcamLZ_RQ&oh=00_AfZbIZLEsAWPJwEqKPUrLJNYCBIPs-UItUzg8a85_WOdDQ&oe=68C9ED3D",
      alt: "Kids playroom colorful mats",
      title: "Kids Collection",
    },
    {
      id: 9,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/540590300_122114086406973943_3314017149461766343_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHN59cMt_Lm0JZolYJkRhItplW3H-Z92PumVbcf5n3Y-2WErCT4AVQxQWySXwQ35yD7zA3FhZ1dluh_dPrd7rIR&_nc_ohc=4gRPJ-oAIuEQ7kNvwEGkFo0&_nc_oc=AdnlxP89avNCRWJ4LKTucubjoy9jkMaBc3lIeEOwX31coUCYIpaIjLfYhdDMAmoDW7o&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=C8y_OP5PNiuztkIgkUWi9g&oh=00_AfYWosq6xZLka1bd2HcKKikLu0HZA7Tpw17RfndXDJtEsA&oe=68C9FE0A",
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
