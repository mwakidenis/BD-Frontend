"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

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
  index: number;
};

// --- New Arrivals Products ---
const newArrivals = [
  {
    id: "1",
    name: "Handmade Jute Rug",
    category: "Home Decor",
    price: 1200,
    stock: 8,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532295847_122104976126973943_4310246959330191845_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGR8flFMI3sBibrfOun7yg4MoXD8KGrGkcyhcPwoasaRxB6uRZKDvE6dyWQJBT870vqvqxkFsfol_5inrEUVg3U&_nc_ohc=Hpy1Dyo2N4AQ7kNvwGo8kxi&_nc_oc=AdlFzMmwOw0Tt0uEcAB-TwLifvOc5df76p17yiWQ32vdx16ySRHHTVQMonKFsfGUCsA&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=y5kEqQ54BBjgu7W8wOMw_A&oh=00_Afbvn2BJALnwWZzREGiBdFVG-1WLsBhs-EsoMHzPg8ZK-g&oe=68C9FF19",
    ],
  },
  {
    id: "2",
    name: "Colorful Cotton Mat",
    category: "Floor Mat",
    price: 950,
    stock: 15,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/520416636_122104976798973943_752362423245426600_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHLaCM-6F-1ahMMMC7OXbV-GWwZUHg46Y4ZbBlQeDjpjlXhJmwzTrPuPv9Dax1h3uev14kuCh5_uhznagwehuaC&_nc_ohc=HYtZ6yiw5Z8Q7kNvwFT6stl&_nc_oc=AdlRFY2ZIk4-LxkIOuRqqtfjuzqnIfQwYpFD-vA5FgkMbzv5IrG_TNCR9oNXDwwomzE&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=WKVqNU9NlrWCq7Yq5P-U0Q&oh=00_AfYEk5BtR29G0Nw6ZF7KkiVZV9pXffbzvWqoN2cLkoNWmQ&oe=68C9FAF4",
    ],
  },
  {
    id: "3",
    name: "Geometric Carpet",
    category: "Carpet",
    price: 2200,
    stock: 5,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534919662_122104439972973943_2819935696708950046_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGzZ_hnwjiJkNZ6wltcA80cpkZ19yjpZ-imRnX3KOln6LSoiBLtRiRfJmmby4WDFiFLC0IMx3pX-U_fLK5q30ln&_nc_ohc=O8XMUQMyMRoQ7kNvwHar5jn&_nc_oc=Adk6mo27k-vEWs86uPbyR5ZSV_aXR-zLqFIQM5Yn30Kzy7Z9s05Bx69UqGew60v06OA&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=BY7tTlyDGhxlKx4Edsgk_w&oh=00_AfbZNGgM-YlWOxdNxm4I1L3r_yFePeC0aCL6OAVatYt0uw&oe=68C9E0D8",
    ],
  },
  {
    id: "4",
    name: "Traditional Nakshi Kantha",
    category: "Textile",
    price: 1800,
    stock: 12,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/532836508_122104439864973943_8243994768622642815_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE3oM5DT0WCRuIBsMK-Cv9UVpAihc6V6kNWkCKFzpXqQymQo3SdGWLfxTP2nTL0nAck9EB_gwfFV3cliTswVOjH&_nc_ohc=K01wbxSAYWkQ7kNvwHO6mzS&_nc_oc=AdlqLHVBB-gXbdWV-rwzeCbJuxRiNJ5O67o0MOHvlaVjG1r37rBmu09v5KizB7zsJm0&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=TpkjdimHKOaYlYhFfhZMkw&oh=00_AfYCIBvBEo2zdpCdrTcj0qYnoZJMgcFb4GN-arJ3BIoSXA&oe=68C9DF16",
    ],
  },
  {
    id: "5",
    name: "Clay Flower Vase",
    category: "Handicraft",
    price: 750,
    stock: 20,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/533104712_122104440632973943_2490122050539472476_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHMdTNWzwdnoK1A7Dl9dZanCkXs0h6IlvEKRezSHoiW8d373H0LZBPBK369zWK3zGrdC3u4WxvcpN5VFfGwl-i4&_nc_ohc=RZ2ojmIX-0cQ7kNvwEuYG2e&_nc_oc=AdmL6Pe1CSJOw1hOTGRk4N4NpJf304BfDZ09CZLGawzsTG-hlmcpfWgqg1Z4ArFaxLM&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=XkdLueLXuLYbrRJ-DK1BsA&oh=00_AfbP3XCOelFcXkysQu6plRuPLokxSlVmph63DJHsi0KS3A&oe=68CA03C2",
    ],
  },
  {
    id: "6",
    name: "Bamboo Basket Set",
    category: "Utility",
    price: 600,
    stock: 30,
    images: [
      "https://scontent.fspd6-1.fna.fbcdn.net/v/t39.30808-6/534696453_122104976222973943_4127404409419455615_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGl0ZaT3C8GW7oEMlGy8cr0HRu9rLeZnBQdG72st5mcFH-y5N4l5IRaM0cwMLLN9PiInaCSONIg-3fAtlrvVsem&_nc_ohc=hTgp4Wl8pv0Q7kNvwHL4HKv&_nc_oc=AdlowCqpIvZV4gIcg0t94XjvCO5eh7eIa-hbYxjuVqTnSdplKw5JaPIb98LDn3QR6Gk&_nc_zt=23&_nc_ht=scontent.fspd6-1.fna&_nc_gid=09xFlLQdspMaZaRf__NIYQ&oh=00_AfbhXd11Z5C98UU5IqOumNegps-6vNoR3D0Z3HNi7oJXOw&oe=68C9FC1F",
    ],
  },
];

// --- Product Card Component ---
const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex-shrink-0 w-80 h-[360px] mb-12 group relative overflow-hidden"
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
    </motion.div>
  );
};

// --- New Arrivals Section Component ---
export default function NewArrivalsSection() {
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
            New Arrivals
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* First Row - Left to Right */}
        <div className="flex space-x-6 animate-marquee mb-8">
          {[...newArrivals, ...newArrivals].map((product, index) => (
            <ProductCard
              key={`row1-${index}`}
              product={product}
              index={index}
            />
          ))}
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
        {/* <button className="bg-black hover:from-blue-900 text-white font-semibold px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          View All New Arrivals
        </button> */}
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
          animation: marquee 40s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }

        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
