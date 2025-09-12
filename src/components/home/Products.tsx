"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- Types ---
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
};

type ProductCardProps = {
  product: Product;
};

// --- Fake Products ---
const fakeProducts: Product[] = [
  {
    id: "1",
    name: "Handmade Jute Rug",
    category: "Home Decor",
    price: 1200,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1680777019951-9cc1abaa0471?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "2",
    name: "Colorful Cotton Mat",
    category: "Floor Mat",
    price: 950,
    stock: 15,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/547025259_122117484296973943_4735552708981977821_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFjIzmLc6vPYrR9LDLh8H1V4DB_B1ABZufgMH8HUAFm55ACFwof1SH0_6mQdiGPR8Ki1SXD24oZDNm70uN9SRdG&_nc_ohc=mwTVeGpGEJcQ7kNvwFzhpOQ&_nc_oc=AdnCAx9Jl-SoDZHLCX9aakOai1W_TJYsBk8iNcgX-cRLGd4Qh-oFArU82fFKlzccyKk&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=S8m5-MmGMkfNg2545iZdhw&oh=00_AfbygWXAKrYVSc9AjWxuJqpB_JH1FY2jBm2vdN7ahHbDqg&oe=68C9D521",
    ],
  },
  {
    id: "3",
    name: "Geometric Carpet",
    category: "Carpet",
    price: 2200,
    stock: 5,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/533632473_122104364354973943_3025970382381255880_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFDZGaLcP05-kjbFphDTHe_JwKdzeBEdAMnAp3N4ER0A196D_Jaa1x6BQk4kBZyqTxv6vPvr7nwEZ9L_AtTW_WQ&_nc_ohc=DkYam1ddK9wQ7kNvwE8jWLe&_nc_oc=AdkW-PArtUwADeTsra0mwRCam0Q7qWI2NMr5pP4b3OqH7zKfdjpkfHWhg_hVih9gtUE&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=P1lUqsGPOGcJIL36zALcZw&oh=00_AfYlMAPhGVs9eqacQSSGA_xUDBhc1XYgnBQ1yqSzSep9gQ&oe=68CA01B1",
    ],
  },
  {
    id: "4",
    name: "Traditional Nakshi Kantha",
    category: "Textile",
    price: 1800,
    stock: 12,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532569047_122104976060973943_7533162965895960141_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG_TKgQ064USeV1p2_JunKoqhppwu_ws6mqGmnC7_CzqW5Ls6ZGQph9czx6Rg5x1gGsmgPc4WQAXUGn5GwwggrP&_nc_ohc=FunH8QnuW2cQ7kNvwEZ4QxI&_nc_oc=AdliXjJxTElczMVnfE_HETO-FHcgEefVyEgsoWXCA65OJN9xmIDLkGU-JF8EXbIciVg&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=JTGmlNciVcafiDeZK2_K4Q&oh=00_AfYiTo_Y2mYCRAxNSUmpBhOCPG2_SY_TFU8jsc6GWbpcXg&oe=68C9D7E1",
    ],
  },
  {
    id: "5",
    name: "Clay Flower Vase",
    category: "Handicraft",
    price: 750,
    stock: 20,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532628420_122104440896973943_189849678533842657_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGXsRazuPjQXwpxDPu3C6Mgf6TaH3DN4QJ_pNofcM3hAkVr-IFnW7c0Y3XCIXAH4XiRlihwfSjfl8xXtoy6Qjaw&_nc_ohc=SiIFumusAlAQ7kNvwHr7OFj&_nc_oc=AdnkJsXPQDj6EREQIM4Z00O_3rILjd0q2C8GNcYzOaHTfwK1YsiUIbejUcGfPAIHjzo&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=_ZZ6DQO5Tt6KXHPUPFg7lA&oh=00_AfYNwUQDZ2VUJ-crUQBpW0diwexuFjUOgC0GTefloeVH3g&oe=68C9E93D",
    ],
  },
  {
    id: "6",
    name: "Bamboo Basket Set",
    category: "Utility",
    price: 600,
    stock: 30,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/540706896_122114085884973943_1992705282509866384_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG2pDXMa979TXr1ysYCBXzZWYLPWGOnCmBZgs9YY6cKYMps3zwhQiDr2WxRg6qJdhm3Ag53Q4xWEym_XyD6RNnn&_nc_ohc=02PhkMA942EQ7kNvwGo7Lgp&_nc_oc=AdlWp6y3LKn2oQs_cFN04RXsrgu15wVFy6FJXopF7IiJUC2h96qwUqNK9TBbC16uyl4&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=Jb9dB-pmi6h1u8_oQzjz7w&oh=00_Afb6e2oaPZ8F5ab5043IBRAI3cI0iAczS4KcZImtiKA5ng&oe=68C9E67F",
    ],
  },
];

// --- Product Card ---
const ProductCard = ({ product }: ProductCardProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="h-[360px] mb-12 group relative overflow-hidden bg-neutral-200"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Product Image */}
      <div
        className={`h-[90%] relative mx-auto duration-500 transform ${
          hover ? "scale-105" : ""
        }`}
        style={{
          backgroundImage: `url(${product.images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "80%",
        }}
      />

      {/* Product Name */}
      <div className="h-[50px] bg-neutral-200 w-full font-medium py-2 text-center">
        {product.name}
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-center items-center gap-3 font-clashRegular ${
          hover ? "backdrop-blur-sm bg-black/20" : ""
        }`}
      >
        {/* Product Info */}
        <div
          className={`text-center text-white bg-black/60 px-4 py-2 transition-opacity duration-300 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm font-semibold mb-1">{product.category}</p>
          <p className="text-lg font-bold mb-1">৳ {product.price}</p>
          <p className="text-sm">
            Stock: {product.stock}{" "}
            {product.stock <= 5 ? "Limited Stock" : "Available"}
          </p>
        </div>

        {/* View Details */}
        <Link
          href={`/product/${product.id}`}
          className={`w-[80%] border border-white text-white text-center transition-all duration-500 ${
            hover
              ? "h-[40px] text-base"
              : "w-0 h-0 text-[0px] border-none overflow-hidden"
          } hover:bg-white hover:text-black`}
        >
          View Details
        </Link>

        {/* Add to Cart */}
        <button
          className={`w-[80%] border border-white text-white cursor-pointer flex items-center justify-center gap-2 transition-all duration-500 ${
            hover
              ? "h-[40px] text-base"
              : "w-0 h-0 text-[0px] border-none overflow-hidden"
          } hover:bg-white hover:text-black`}
        >
          <ShoppingCart
            className={`${hover ? "w-4 h-4" : "w-0 h-0"} transition-all`}
          />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

// --- Section Component ---
export default function ProductSection() {
  return (
    <section className="py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Explore Our Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {fakeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <Link
          href="/collections"
          className="bg-black text-white font-semibold px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-block"
        >
          Browse Your Collection
        </Link>
      </motion.div>
    </section>
  );
}
