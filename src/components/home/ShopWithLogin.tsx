"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ShopNow = () => {
  return (
    <div>
      <section className="overflow-hidden my-20 sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-6 sm:p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-2xl sm:text-3xl font-bold mt-2">
              Discover Authentic Bangladeshi Crafts & Lifestyle Products
            </h1>
            <div className="py-3 text-sm sm:text-base">
              Welcome to <span className="font-semibold">SoptokBD</span> – your
              trusted destination for handmade Bangladeshi rugs, crafts, and
              lifestyle essentials. Whether you’re shopping for your home or
              gifting a loved one, our platform brings you quality, tradition,
              and value.
              <p className="my-2">
                We connect artisans and buyers, giving locally crafted products
                the recognition they deserve. Enjoy authentic items, reliable
                service, and a smooth experience built on trust and heritage.
              </p>
            </div>
            <div>
              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Link href={"/login"}>
                  <button className="bg-black hover:from-blue-900  text-white font-semibold px-10 py-4  shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    Login
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-full w-full rounded-md md:rounded-l-full sm:rounded-ss-[30px] md:rounded-ss-[60px] overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

          {/* Image */}
          <Image
            height={300}
            width={500}
            alt="ShopNowImg"
            src="https://i.ibb.co.com/YFLNf7f8/520284469-122104977080973943-5059480252296765432-n.jpg"
            className="h-full w-full object-cover z-0"
          />
        </div>
      </section>
      <div className="mt-28 mb-28"></div>
    </div>
  );
};

export default ShopNow;
