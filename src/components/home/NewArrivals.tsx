"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProduct } from "@/services/product";
import { TProductResponse } from "@/types/product";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addItemToCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

type ProductCardProps = {
  product: TProductResponse;
  index: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [hover, setHover] = useState(false);
  const [showCartIcon, setShowCartIcon] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useUser();

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const stockStatus =
    !product.inStock || product.quantity === 0
      ? "Out of Stock"
      : product.quantity <= 5
      ? "Limited Stock"
      : "Available";

  const isOutOfStock = !product.inStock || product.quantity === 0;

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: product._id,
        name: product.name,
        quantity: 1,
        price: product.price,
        image: product.imageUrl[0],
        description: product.description,
        category: product.category,
      })
    );

    toast.success(`${product.name} added to cart!`, { duration: 1000 });
  };

  const handleClick = async () => {
    if (isOutOfStock) return;

    setIsLoading(true);
    handleAddToCart();
    setShowCartIcon(false);

    setTimeout(() => {
      setShowCartIcon(true);
      setIsLoading(false);
    }, 1000);
  };

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
          backgroundImage: `url(${product.imageUrl[0] || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "80%",
        }}
        className={`h-[90%] relative mx-auto duration-[.4s] ${
          hover ? "scale-105" : ""
        } ${isOutOfStock ? "grayscale" : ""}`}
      ></div>

      {/* Stock Overlay */}
      {isOutOfStock && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded z-20">
          OUT OF STOCK
        </div>
      )}

      {/* Discount Badge */}
      {product.discount > 0 && !isOutOfStock && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded z-20">
          {product.discount}% OFF
        </div>
      )}

      {/* New Badge */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-2 py-1 text-xs font-semibold rounded z-20">
        NEW
      </div>

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

        {/* Action Buttons */}
        <Link href={`/product/${product._id}`} className="w-[80%]">
          <button
            className={`w-full border border-white bg-transparent text-white cursor-pointer ${
              hover
                ? "h-[40px] text-base"
                : "w-0 h-0 text-[0px] border-none duration-[.5s]"
            } duration-[.5s] hover:bg-white hover:text-black`}
          >
            View Details
          </button>
        </Link>

        {user?.role !== "admin" && (
          <div className="w-[80%] relative">
            <AnimatePresence mode="wait">
              {showCartIcon && (
                <motion.button
                  key="cart-button"
                  onClick={handleClick}
                  disabled={isLoading || isOutOfStock}
                  initial={{ opacity: 1, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full border border-white bg-transparent text-white cursor-pointer flex items-center justify-center gap-2 ${
                    hover
                      ? "h-[40px] text-base"
                      : "w-0 h-0 text-[0px] border-none"
                  } duration-[.5s] hover:bg-white hover:text-black ${
                    isOutOfStock
                      ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-white"
                      : ""
                  }`}
                >
                  <motion.div
                    animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                    transition={{
                      duration: 0.5,
                      repeat: isLoading ? Infinity : 0,
                    }}
                  >
                    <ShoppingCart
                      className={`${
                        hover ? "w-4 h-4" : "w-0 h-0"
                      } duration-300`}
                    />
                  </motion.div>
                  {isOutOfStock ? "Unavailable" : "Add To Cart"}
                </motion.button>
              )}
            </AnimatePresence>

            {!showCartIcon && hover && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-green-700 flex items-center justify-center text-white h-[40px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ✓
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- New Arrivals Section ---
export default function NewArrivalsSection() {
  const [products, setProducts] = useState<TProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const { data } = await getAllProduct();

        const sortedProducts =
          data
            ?.sort(
              (a: TProductResponse, b: TProductResponse) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 10) || [];

        setProducts(sortedProducts);
      } catch (err) {
        setError("Failed to load new arrivals");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading || !products) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
        </div>
        <div className="flex space-x-6 mb-8">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 h-[360px] bg-neutral-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex space-x-6 animate-marquee mb-8">
          {[...products, ...products].map((product, idx) => (
            <ProductCard
              key={`${product._id}-${idx}`}
              product={product}
              index={idx}
            />
          ))}
        </div>

        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Link href={"/shop"}>
          <button className="cursor-pointer bg-black text-white font-semibold px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            View All New Arrivals
          </button>
        </Link>
      </motion.div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
