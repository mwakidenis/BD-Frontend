"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllProduct } from "@/services/product";
import { TProductResponse } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { addItemToCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

// Type for Slider ref
type SliderRef = any;

// --- Product Card Props ---
type ProductCardProps = {
  product: TProductResponse;
};

// --- Product Card ---
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hover, setHover] = useState(false);
  const [showCartIcon, setShowCartIcon] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useUser();

  // Calculate discounted price
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  // Stock status based on inStock boolean and quantity
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
    <div className="px-2 sm:px-3 md:px-4">
      <div
        className="h-[300px] sm:h-[340px] md:h-[360px] mb-8 sm:mb-10 md:mb-12 group relative overflow-hidden rounded-lg"
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
          className={`h-[85%] sm:h-[88%] md:h-[90%] relative mx-auto duration-[.4s] ${
            hover ? "scale-105" : ""
          } ${isOutOfStock ? "grayscale" : ""}`}
        ></div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-[10px] sm:text-xs font-semibold rounded z-20">
            OUT OF STOCK
          </div>
        )}

        {/* Discount Badge */}
        {product.discount > 0 && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-[10px] sm:text-xs font-semibold rounded z-20">
            {product.discount}% OFF
          </div>
        )}

        {/* Product Name */}
        <div className="h-[40px] sm:h-[45px] md:h-[50px] bg-[rgb(234_234_234)] w-full font-medium py-2 text-center text-sm sm:text-base truncate px-2">
          {product.name}
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute top-0 left-0 w-full h-full z-5 flex flex-col justify-center items-center gap-2 sm:gap-3 font-clashRegular ${
            hover ? "backdrop-blur-sm bg-black/20" : ""
          }`}
        >
          <div
            className={`text-center text-white bg-black/60 px-3 sm:px-4 py-2 mx-2 rounded ${
              hover ? "opacity-100" : "opacity-0"
            } duration-300`}
          >
            <p className="text-xs sm:text-sm font-semibold mb-1">
              {product.category}
            </p>
            <div className="text-base sm:text-lg font-bold mb-1">
              {product.discount > 0 ? (
                <>
                  <span className="line-through text-gray-300 text-xs sm:text-sm mr-2">
                    ৳ {product.price}
                  </span>
                  <span>৳ {discountedPrice.toFixed(2)}</span>
                </>
              ) : (
                <span>৳ {product.price}</span>
              )}
            </div>
            <p className="text-xs sm:text-sm">
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
              <p className="text-[10px] sm:text-xs mt-1 opacity-80 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <button
            className={`w-[85%] sm:w-[80%] border border-white bg-transparent text-white cursor-pointer ${
              hover
                ? "h-[35px] sm:h-[38px] md:h-[40px] text-sm sm:text-base"
                : "w-0 h-0 text-[0px] border-none duration-[.5s]"
            } duration-[.5s] hover:bg-white hover:text-black rounded`}
            onClick={() => {
              window.location.href = `/product/${product._id}`;
            }}
          >
            View Details
          </button>

          {user?.role !== "admin" && (
            <div className="w-[85%] sm:w-[80%] relative">
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
                    className={`w-full border border-white bg-transparent text-white cursor-pointer flex items-center justify-center gap-2 rounded ${
                      hover
                        ? "h-[35px] sm:h-[38px] md:h-[40px] text-sm sm:text-base"
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
                          hover ? "w-3 h-3 sm:w-4 sm:h-4" : "w-0 h-0"
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
                  className="absolute inset-0 bg-green-700 flex items-center justify-center text-white h-[35px] sm:h-[38px] md:h-[40px] rounded"
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
      </div>
    </div>
  );
};

// --- Section Component ---
export default function BestSellingProducts() {
  const sliderRef = useRef<SliderRef>(null);
  const [products, setProducts] = useState<TProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await getAllProduct();

        // No allowedTypes filter — just use category field
        const filteredProducts =
          data?.filter((med: TProductResponse) => med.category).slice(0, 8) ||
          [];

        setProducts(filteredProducts);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        breakpoint: 1280,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
          Best Selling Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-[300px] sm:h-[340px] md:h-[360px] bg-neutral-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
          Best Selling Products
        </h2>
        <div className="text-center text-red-500 text-base sm:text-lg">
          {error}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
          Best Selling Products
        </h2>
        <div className="text-center text-gray-500 text-base sm:text-lg">
          No products available at the moment.
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
        Best Selling Products
      </h2>

      <div className="relative max-w-7xl mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {products.map((product, index) => (
            <motion.div
              key={product._id}
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
        <div className="flex gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Previous slide"
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            aria-label="Next slide"
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-8 sm:mt-10 md:mt-12"
      >
        <Link
          href="/shop"
          className="bg-black hover:bg-gray-800 text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-block rounded"
        >
          Browse All Products
        </Link>
      </motion.div>
    </section>
  );
}
