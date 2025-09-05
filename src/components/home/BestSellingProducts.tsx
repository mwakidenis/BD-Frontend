"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Fake SoptokBD Products ---
const fakeProducts = [
  {
    id: "1",
    name: "Handmade Jute Rug",
    category: "Home Decor",
    price: 1200,
    stock: 8,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/533009442_122104364546973943_2904521196908557415_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeED2jotRDyOJbUUJw-uyqaYwI5CvYmbs0DAjkK9iZuzQKpubE6bJJa-beTi5-s1IzM7cWuuC-pMVXf8quTcsosZ&_nc_ohc=W2a04iegKFwQ7kNvwHS67FV&_nc_oc=Adlc8QnpMFZnPZFFCAwNM_Q09NvT0ftoRbomgk4X-II1bu3iVBY2Xy6ubSWbeWen8ik&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=7CrumKexDfBbi-8eu-Ty3g&oh=00_Afby540kUvvGg2SnhsfX6Btz1VvxJKu6kY1Gpjadavm4Zg&oe=68C03FB0",
    ],
  },
  {
    id: "2",
    name: "Colorful Cotton Mat",
    category: "Floor Mat",
    price: 950,
    stock: 15,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/542714379_122115311192973943_6893585986170167570_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGX3N_EdfWrtdlB34c-sS9kzAMPEuE7SI_MAw8S4TtIj9HKu5PH9NJkZbEFvhtieDGqy6NhrImgg8hAZiaC7OsQ&_nc_ohc=bWNOYQfIitIQ7kNvwGbs0vh&_nc_oc=AdmvMP0iB0-q54c-ABuUNggl3v240OxpoKXQjSjUJmDfl9-dKm2uKESZDXlVKwpp7Dw&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=YrDUSIVK2MsZYrex8I-W7g&oh=00_Afa1cejoMcV_YkOQfvXNvj8ufR_EpCQVAkYRmLsNq6vuOQ&oe=68C051B2",
    ],
  },
  {
    id: "3",
    name: "Geometric Carpet",
    category: "Carpet",
    price: 2200,
    stock: 5,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534962636_122106313358973943_3225486904480511132_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGZYhKaR_fXH71-HrIqgaUmYna9WwVV461idr1bBVXjrdFMAoTANzvlKWEDkZEiXaYS7NrTQYcH-rI7JhHhtS7k&_nc_ohc=MubqEsbQ0AMQ7kNvwHo-tGV&_nc_oc=AdkMO7RnXv3j95qyo3x3dGG5QCkqna-PTQ_NMDf4xSGaJu-ggwldfU5Su4-cu66KiqQ&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=vXw2IQaizJiHds26h-h_xg&oh=00_AfaeAYziE4d2VG7tyco22X16Pr76DEk7VirXwt24Lvzf0w&oe=68C05897",
    ],
  },
  {
    id: "4",
    name: "Traditional Nakshi Kantha",
    category: "Textile",
    price: 1800,
    stock: 12,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/536270090_122106312614973943_1005577160248086383_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE1CBoCPemxOTEsj9Do9YQw-cdhRlMt2EP5x2FGUy3YQ7Wg_jJktjIVYvOfLW4HPFYfdkbqvngYFQzB8pLxp_7J&_nc_ohc=dpjW6o9DOE0Q7kNvwH6npbs&_nc_oc=AdlmUBxyu8NhYjXQpVdDYJlQfJUPx6Tf6GgCX6Ywq7ygaFcsAtPR7YHaYk2UE6bf9VA&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=QUmyI0HHTrJgjYMdQMPWAw&oh=00_AfYSvMqfyyX96sJjoTnimtrycXCYo_EHYw5h2Bfru1_83w&oe=68C04668",
    ],
  },
  {
    id: "5",
    name: "Clay Flower Vase",
    category: "Handicraft",
    price: 750,
    stock: 20,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532569047_122104976060973943_7533162965895960141_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG_TKgQ064USeV1p2_JunKoqhppwu_ws6mqGmnC7_CzqW5Ls6ZGQph9czx6Rg5x1gGsmgPc4WQAXUGn5GwwggrP&_nc_ohc=3TenKVa3OvgQ7kNvwHba6Lz&_nc_oc=AdnuCRPUDW1Gcg5_9caqywPK0AKEJOCzj_JNOcpEsNC-VgkgPJeObFsNywd7CP_PSxg&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=LHTquBG8LCeqAdON0QgQJQ&oh=00_AfZkcvG9WMn3jTGCaVoS_bYGrsXOUoCTNZ9J3OpOLz6XzA&oe=68C06521",
    ],
  },
  {
    id: "6",
    name: "Bamboo Basket Set",
    category: "Utility",
    price: 600,
    stock: 30,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534194665_122104440758973943_6615517092214592842_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFCN7FhWJAGw40A3udUaIwGzoHRwuDiLS7OgdHC4OItLqj-QQ-PX-VPg7yaUq1Fe0NCpV6dqQ7vhuPzVPLhcuZT&_nc_ohc=JBjyRIVrBQsQ7kNvwFVCdhW&_nc_oc=Adkv6caz9kra-xHEUP9ZK8HHDbdEBP-x6UTT9aLwJi8vCkTepWjWDZnyuyJ3DXU5FOE&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=Z0WfV8pDRUtobiNGeZ0m6w&oh=00_AfZGPdh8WZhj7pVmpFvznVkWcMXBfLHpHjYJbG3s2UgMKQ&oe=68C0522F",
    ],
  },
];

// --- Product Card (unchanged from original) ---
const ProductCard = ({ product }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="px-4">
      {" "}
      {/* Added padding for slider spacing */}
      <div
        className="h-[360px] mb-12 group relative overflow-hidden"
        style={{ backgroundColor: "rgb(234 234 234)" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Product Image */}
        <div
          style={{
            backgroundImage: `url(${product.images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "80%",
          }}
          className={`h-[90%] relative mx-auto duration-[.4s] ${
            hover ? "scale-105" : ""
          }`}
        ></div>

        {/* Product Name */}
        <div className="h-[50px] bg-[rgb(234_234_234)] w-full font-medium py-2 text-center">
          {product.name}
        </div>

        {/* Hover Overlay - show product details on hover */}
        <div
          className={`absolute top-0 left-0 w-full h-full z-5 flex flex-col justify-center items-center gap-3 font-clashRegular ${
            hover ? "backdrop-blur-sm bg-black/20" : ""
          }`}
        >
          {/* Product Information */}
          <div
            className={`text-center text-white bg-black/60 px-4 py-2 ${
              hover ? "opacity-100" : "opacity-0"
            } duration-300`}
          >
            <p className="text-sm font-semibold mb-1">{product.category}</p>
            <p className="text-lg font-bold mb-1">৳ {product.price}</p>
            <p className="text-sm">
              Stock: {product.stock}{" "}
              {product.stock <= 5 ? "Stock shimito" : "Available"}
            </p>
          </div>

          {/* Action Buttons */}
          <button
            className={`w-[80%] border border-white bg-transparent text-white cursor-pointer ${
              hover
                ? "h-[40px] text-base"
                : "w-0 h-0 text-[0px] border-none duration-[.5s]"
            } duration-[.5s] hover:bg-white hover:text-black`}
            onClick={() => {
              // Navigate to product details
              window.location.href = `/product/${product.id}`;
            }}
          >
            View Details
          </button>

          <button
            className={`w-[80%] border border-white bg-transparent text-white cursor-pointer flex items-center justify-center gap-2 ${
              hover ? "h-[40px] text-base" : "w-0 h-0 text-[0px] border-none"
            } duration-[.5s] hover:bg-white hover:text-black`}
          >
            <ShoppingCart
              className={`${hover ? "w-4 h-4" : "w-0 h-0"} duration-300`}
            />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Section Component with Slider ---
export default function BestSellingProducts() {
  const sliderRef = useRef(null);

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
    <section className="py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Best Selling Products
      </h2>

      {/* Slider Implementation */}
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {fakeProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </Slider>

        {/* Custom Navigation Arrows */}
        <div className="flex gap-3 justify-center mt-8">
          <button
            onClick={() => {
              const slider = sliderRef.current as any;
              if (slider) {
                slider.slickPrev();
              }
            }}
            className="size-10 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => {
              const slider = sliderRef.current as any;
              if (slider) {
                slider.slickNext();
              }
            }}
            className="size-10 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <button className="bg-black hover:from-blue-900 text-white font-semibold px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          Browse Your Collection
        </button>
      </motion.div>
    </section>
  );
}
