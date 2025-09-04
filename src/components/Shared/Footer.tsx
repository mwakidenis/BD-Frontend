"use client";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Container from "../ui/Container";

const Footer = () => {
  return (
    <motion.footer
      initial={{ height: 0 }}
      whileInView={{ height: "auto" }}
      transition={{ duration: 0.01 }}
      className="bg-[#263238] text-white px-6 py-10"
    >
      <Container className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="text-center sm:text-left">
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Soptok<span className="text-black">BD</span>
            </h1>
          </Link>
          <p className="mt-3 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
            Bringing colors, comfort & creativity to your home with stylish
            rugs, mats, and home décor.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h2 className="font-bold text-base mb-4">Explore</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:underline">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:underline">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="font-bold text-base mb-4">Customer Support</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link href="/help" className="hover:underline">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:underline">
                Return & Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:underline">
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="font-bold text-base mb-4">Contact</h2>
          <p className="text-sm mb-2">support@soptokbd.com</p>
          <p className="text-sm mb-6">+880 1234-567890</p>

          <h2 className="font-bold text-base mb-3">Follow Us</h2>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:scale-110 transition-transform">
              <Facebook />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <Instagram />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <Twitter />
            </a>
          </div>
        </div>
      </Container>

      {/* Bottom Divider */}
      <div className="mt-10 border-t border-black pt-4 text-center text-sm text-white">
        © {new Date().getFullYear()} SoptokBD. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
