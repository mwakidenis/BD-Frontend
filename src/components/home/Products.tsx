"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getHomePageProducts } from "@/services/product";
import { TProductResponse } from "@/types/product";

// --- Types ---
type ProductCardProps = {
  product: TProductResponse;
};

// --- Product Card ---
const ProductCard = ({ product }: ProductCardProps) => {
  const [hover, setHover] = useState(false);

  // Calculate discounted price
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  // Stock status (without expireDate check)
  const stockStatus =
    !product.inStock || product.quantity === 0
      ? "Out of Stock"
      : product.quantity <= 5
      ? "Limited Stock"
      : "Available";
  const isOutOfStock = !product.inStock || product.quantity === 0;

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
        } ${isOutOfStock ? "grayscale" : ""}`}
        style={{
          backgroundImage: `url(${product.imageUrl[0] || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "80%",
        }}
      />

      {/* Out of Stock Overlay */}
      {isOutOfStock && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold  z-20">
          OUT OF STOCK
        </div>
      )}

      {/* Discount Badge */}
      {product.discount > 0 && !isOutOfStock && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold  z-20">
          {product.discount}% OFF
        </div>
      )}

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
          <div className="text-lg font-bold mb-1">
            {product.discount > 0 ? (
              <>
                <span className="line-through text-gray-300 text-sm mr-2">
                  ৳ {product.price}
                </span>
                <span>৳ {discountedPrice.toFixed(2)}</span>
              </>
            ) : (
              <span>৳ {product.price}</span>
            )}
          </div>
          <p className="text-sm">
            Stock: {product.quantity}{" "}
            <span
              className={
                product.quantity <= 5 ? "text-orange-300" : "text-green-300"
              }
            >
              ({stockStatus})
            </span>
          </p>
          {product.description && (
            <p className="text-xs mt-1 opacity-80 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* View Details */}
        <Link
          href={`/product/${product._id}`}
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
          disabled={isOutOfStock}
          className={`w-[80%] border border-white text-white cursor-pointer flex items-center justify-center gap-2 transition-all duration-500 ${
            hover
              ? "h-[40px] text-base"
              : "w-0 h-0 text-[0px] border-none overflow-hidden"
          } hover:bg-white hover:text-black ${
            isOutOfStock
              ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-white"
              : ""
          }`}
        >
          <ShoppingCart
            className={`${hover ? "w-4 h-4" : "w-0 h-0"} transition-all`}
          />
          {isOutOfStock ? "Unavailable" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

// --- Section Component ---
export default function ProductSection() {
  const [products, setProducts] = useState<TProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data: products } = await getHomePageProducts();
        // Show only first 6 medicines
        setProducts(products.slice(0, 6));
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Our Products Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-[360px] mb-12 bg-neutral-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Our Collections
        </h2>
        <div className="text-center text-red-500 text-lg">{error}</div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Our Product Collections
        </h2>
        <div className="text-center text-gray-500 text-lg">
          No Products available at the moment.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Explore Our Products Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
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
          href="/shop"
          className="bg-black text-white font-semibold px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-block"
        >
          Browse All products
        </Link>
      </motion.div>
    </section>
  );
}
