"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Product Type ---
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
};

// --- Fake SoptokBD Products ---
const fakeProducts: Product[] = [
  {
    id: "1",
    name: "Handmade Jute Rug",
    category: "Home Decor",
    price: 1200,
    stock: 8,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532569047_122104976060973943_7533162965895960141_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG_TKgQ064USeV1p2_JunKoqhppwu_ws6mqGmnC7_CzqW5Ls6ZGQph9czx6Rg5x1gGsmgPc4WQAXUGn5GwwggrP&_nc_ohc=FunH8QnuW2cQ7kNvwEZ4QxI&_nc_oc=AdliXjJxTElczMVnfE_HETO-FHcgEefVyEgsoWXCA65OJN9xmIDLkGU-JF8EXbIciVg&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=ZjnpMFt4DJ6u2YE-LamORA&oh=00_AfYoBIP8nCoKu2LlL04Uxnl2F05smwB3NvznBCqPOo6Z-g&oe=68C9D7E1",
    ],
  },
  {
    id: "2",
    name: "Colorful Cotton Mat",
    category: "Floor Mat",
    price: 950,
    stock: 15,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532628420_122104440896973943_189849678533842657_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGXsRazuPjQXwpxDPu3C6Mgf6TaH3DN4QJ_pNofcM3hAkVr-IFnW7c0Y3XCIXAH4XiRlihwfSjfl8xXtoy6Qjaw&_nc_ohc=SiIFumusAlAQ7kNvwHr7OFj&_nc_oc=AdnkJsXPQDj6EREQIM4Z00O_3rILjd0q2C8GNcYzOaHTfwK1YsiUIbejUcGfPAIHjzo&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=9-YyOZKq_1AiW_5vGXffTA&oh=00_AfapWpfEGFKU5dMLEjc2w-mBeuLxG447wTAXMEGDbHP-hg&oe=68C9E93D",
    ],
  },
  {
    id: "3",
    name: "Geometric Carpet",
    category: "Carpet",
    price: 2200,
    stock: 5,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/546149660_122117486636973943_3600102622741597497_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFh9EgNX-sjeqpql9NY0BiDdyttlmuEPm13K22Wa4Q-bZ-U_M3B6Dam_SODHGwubkibnfYuaEZiK7Hd9hL5Tu3q&_nc_ohc=iVwCKrZm5xwQ7kNvwG-eBSj&_nc_oc=Adn6r50RiQ06je5TCaZ1MYjanLlU2_FTMHmKxJ2wpoocEzdwmo6owxh9fbULVyboX7k&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=vvYQtmqcqAtnCzX6hsQ17w&oh=00_AfZTnp9N95EkAk4HPDW7nL37N10iLIryko7RpiUfj0afuQ&oe=68CA0433",
    ],
  },
  {
    id: "4",
    name: "Traditional Nakshi Kantha",
    category: "Textile",
    price: 1800,
    stock: 12,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/541466544_122114085956973943_1835386506036262292_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG6_aqwPP1lW5l-a3bLdefzkWpGBqtRkQORakYGq1GRA0tFUQwTbi8NKutevPcGF4120QxT0k_6uqN3523SG9E-&_nc_ohc=2jS7ft8MtWIQ7kNvwEnADB8&_nc_oc=AdnMVGJWIDf63j6gX7S59pi6M7eF4Rn0ietT9C5JeGtnMchI7MyGuTsZJALg2ur-CRM&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=vzwo3C7d8xKxt0wX_JJDXA&oh=00_AfZfi52qFjYdvbs1Az-sFoSXzK9wKseZCtq9_QDcnndd7Q&oe=68C9E2D0",
    ],
  },
  {
    id: "5",
    name: "Clay Flower Vase",
    category: "Handicraft",
    price: 750,
    stock: 20,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/542227832_122115310004973943_3296926302656374867_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFDDLuL1_iynRw56n8JFztqrD4olINMg0-sPiiUg0yDTy8j-Zvgv7wiDGXs0jlswBmLmpPxKLrzWWQlyD398N4-&_nc_ohc=_OBBZXw0XhwQ7kNvwF-08Fc&_nc_oc=Adk9y_9B0ELpcuxcbg4UyXkbzP2EEJzo8ycKe2FKbaTinA1SRNDJYY1v-lMbtVpo5_s&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=zxdF2ONYQFxLD6rqM8A98A&oh=00_Afa4GpXcb2rt9PsCc7rQe8NfDM0WZ9l23Pcw4VrhvehUjg&oe=68C9FFFD",
    ],
  },
  {
    id: "6",
    name: "Bamboo Basket Set",
    category: "Utility",
    price: 600,
    stock: 30,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/542197078_122115263492973943_7013362593950739564_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGHLTe4xShimMxHJJT5EjpPOqlszq4z_xg6qWzOrjP_GPSB8dEyKHGYVdLIH7jghib-kw7MHPoC12aNCe_d-x2V&_nc_ohc=KmcPS6NDVlkQ7kNvwElldH1&_nc_oc=AdnuD1eR-bwcRbgUB2vkVTPyzLhS1Nb_VgH1IUHuqHay9lOJ5acsDYsmBzmuZLsbqxM&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=5puMb6TeQLd4gPFLEGIBlw&oh=00_AfYiaWUMo7GhZ8_Bld6fphn5IOxjDXtqHkyNEJso0nq72w&oe=68C9F2BD",
    ],
  },
];

// --- Product Card ---
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="px-4">
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

        {/* Hover Overlay */}
        <div
          className={`absolute top-0 left-0 w-full h-full z-5 flex flex-col justify-center items-center gap-3 font-clashRegular ${
            hover ? "backdrop-blur-sm bg-black/20" : ""
          }`}
        >
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

// --- Section Component ---
export default function BestSellingProducts() {
  const sliderRef = useRef<Slider | null>(null);

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
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Best Selling Products
      </h2>

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
