"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ProductShowcase = () => {
  // Sample product images - replace with your actual product images
  const showcaseImages = [
    {
      id: 1,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/533024266_122104440392973943_9221469124489150346_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHsDWcQVXciTDfRcBUL2aJydHcxnbtt_1Z0dzGdu23_Vv4rAA6c2apsazT_bnoO1CL9CqBkvlMsF4QDKX9Whpu8&_nc_ohc=0vbIBbkAEzcQ7kNvwHQ3Edg&_nc_oc=Adnrqi38TqnPPA3XCXapo9erL-FTuU1YIEIeKTZjogXfNbFkZvBTi4So7ImTkiCdr_U&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=0tNFr9ZuBKqrEBtojsh7nw&oh=00_AfZXvwsdJmOaAJ-lzp2LwpjVICphUIFutcBswooJUS1Zog&oe=68BF1B0D",
      alt: "Luxury Persian rug for living room",
      title: "Persian Elegance",
    },
    {
      id: 2,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532926678_122104440266973943_919630127005862197_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGU6mwkNtYAxGXrNfVIe95iydYC8mGPSazJ1gLyYY9JrGCC_8sbf6znbhrb9QSabgKD7CWTsdn5xtOeFxY_A2Fm&_nc_ohc=e8y-B9HnG2IQ7kNvwHCBEm-&_nc_oc=AdkzNb4tB1Xc7tdh87htyqwdIlt6p3xczOjeZp8Y5YyNxmvQ8VuQyBoYlnba9giZ8d4&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=AcJOmKawDATW7gfcUristA&oh=00_AfZoymo8BVpzkKmFPz2b3DmLRZRS3KkYLp5A98L7TgcbrQ&oe=68BF18CB",
      alt: "Modern geometric floor mat",
      title: "Geometric Modern",
    },
    {
      id: 3,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/533859890_122104440218973943_2205912236686563330_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEr2ApK9opgFp58PFYnSO6-sTw2Mrj9VGSxPDYyuP1UZPVbP9qUz3odAAMUdmvDnp8VngBm_Ov7Z3XmbiKbh9-W&_nc_ohc=thV_WzMYSqAQ7kNvwFAMJUM&_nc_oc=Adkcnk4JeySfF4EbSH7hkrQER65ZFCuGDhZb-iPeW5xc26-0Y-7oi-o81eJxD54wYHk&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=EcqbJl3CWi32HTV9WfOmLQ&oh=00_Afb7q3fEqyOkwaEMSCICjR5n24avAABMHYGJvOrf_NVApg&oe=68BF293C",
      alt: "Cozy bedroom rug collection",
      title: "Bedroom Comfort",
    },
    {
      id: 4,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532363272_122104440062973943_4831319241553192532_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEtUVbi77EqrmT3AaevdSruhZp1P99reDWFmnU_32t4Ne8nkX4T0YbO1qMVkdobDjqLWBQ9dK6G7kJgLmAGuSIC&_nc_ohc=aOf8KNFXDy8Q7kNvwHuTjig&_nc_oc=AdlUXNwdp7YChgMAJPFSbyLQFiqGRIZY4FEp9xqTq063zaXvY5BehS_A0K3yLMAET_M&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=Kr0gHJISPcXHoyRak_UjBw&oh=00_AfZthimvWIJrHmlf-BvBGsPmvrzR5NqeSeXgCw96v_5jSA&oe=68BF2335",
      alt: "Kitchen utility mat set",
      title: "Kitchen Essentials",
    },
    {
      id: 5,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534967943_122104366040973943_1368730029599823588_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEYDVWFHEvXDVGRT7KSDdv4Ek3F56-jsUwSTcXnr6OxTHhaY0tkQFmheTc0qVYAiIx7rMmhCrqLXdNc5T2bBUod&_nc_ohc=abv6-CMaXKcQ7kNvwFqp283&_nc_oc=AdkJ1hbg-RNgO5XhORF7FHAhCbk7Np0ktJ52IwF4WDrZajHLu4r5MG3BAY8ac8ZjjP8&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=GIAomzgUR8nRR5-B0EFhIw&oh=00_AfbwtPOmw2kmBFnrjMk-p7iO1tjvVrEDUiMfhV6U91khig&oe=68BF2A41",
      alt: "Bathroom anti-slip mats",
      title: "Bathroom Safety",
    },
    {
      id: 6,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/533413153_122104365158973943_4047792007434235028_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE9Te8J43LqSdFD5SDV3j6JgSRB4V8hjCiBJEHhXyGMKHUHpeC-qze82PFlcHhEw6LFtnJlYxpSSy1DN21SFb-5&_nc_ohc=H3OOJv3UuscQ7kNvwFA_Oe1&_nc_oc=Adlcn7IrWF5L33SU5pWsqgjEgMex3lFsurJHsmIbG6CAE5MJ9C__lS_-yc4bGBy3kmc&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=TZFlqQHX5UhDtqlQTwDlkw&oh=00_Afb_DbuIHopjKNev6ol9Z-yUXrXsAn9bsSa-XjGdCvJdoQ&oe=68BF0F5F",
      alt: "Outdoor garden mats",
      title: "Garden Collection",
    },
    {
      id: 7,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534100109_122104032860973943_8689777557644733012_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEm2dxb2CnLkknAwm-ZQc5pEyPkL8tPEpgTI-Qvy08SmEmzgIuJwFFVj3n1QXiPGylgMWpqdRM1kpnI78C5sqnn&_nc_ohc=RGKvsa-yB50Q7kNvwHjSOgX&_nc_oc=Adlk-OZbwHBMBxxMll4qG-mQ8g901zRHt3EjX47u5H6__5imKVPvQYMp0moFw0YJyYw&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=BdHviWK6x-jmgWg3csM6JA&oh=00_AfZT0mVysuGCBdmXkbDtgENEcnqWRNquNPBSwACCZjDm4g&oe=68BF323D",
      alt: "Traditional handwoven rugs",
      title: "Handwoven Heritage",
    },
    {
      id: 8,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532422023_122103138542973943_4340155958908383855_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH9M2cPRE-rwwzBFMyLoMCZ1yZEEerjJOjXJkQR6uMk6EwpNxuci729mUwNITM1Ql8JGEVHLZBvQUA6iObrCeIC&_nc_ohc=Xl1SS18Co0cQ7kNvwEbQRY4&_nc_oc=AdmyjYPn2X1_Rm-tI_YGqFdHMAk0chQEUc05km32-cbpEW8oIcm8BjwiV0Q4VI1k0vc&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=-WVkGivM08tgSnbgE1YJiQ&oh=00_AfbsdL-St3vf1MlwW7cvpBJL7EkCVthBK1BgUGSi36ktWA&oe=68BF37DD",
      alt: "Kids playroom colorful mats",
      title: "Kids Collection",
    },
    {
      id: 9,
      src: "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532560731_122104440536973943_5010521976418530357_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFc7wmmSG99tLbsIbC0yG0qKaQIuLxo8qcppAi4vGjyp3YAXmk_MDs8I16Ayhb0JQ-IuaVtDIAN9afYyNcuRxQF&_nc_ohc=jboM-yr_ptUQ7kNvwFMCdiZ&_nc_oc=Adlv6cXb21kWXtUKKUDKmxyXNTFSucERRYGd0i19NDKexWw7Vuxs-SSA08zplc45VFU&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=hWg6mdPcZ-XpauNXpCbDQQ&oh=00_AfZC1A_1MCJQmPrJnheHgSjXsMO5TdIaKlNET5t-JfWLDg&oe=68BF16DF",
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
