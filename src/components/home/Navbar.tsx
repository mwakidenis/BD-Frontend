"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Home,
  ShoppingBag,
  Building2,
  Mail,
  HelpCircle,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart, totalQuantitySelector } from "@/redux/features/cartSlice";
import { protectedRoutes } from "@/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const userContext = useUser();
  const dispatch = useAppDispatch();
  const totalQuantity = useAppSelector(totalQuantitySelector);

  // Safely destructure with fallbacks
  const user = userContext?.user || null;
  const setUser = userContext?.setUser || (() => {});
  const setIsLoading = userContext?.setIsLoading || (() => {});

  // Temporarily disabled lastLogin until user type includes iat
  // const lastLogin = user?.iat ? new Date(Number(user.iat) * 1000) : null;
  const lastLogin = null;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      // Call logout API if available
      // await logoutUser();

      setUser(null);
      dispatch(clearCart());
      toast.success("Logged out successfully", { duration: 1400 });

      // Check if current page is protected and redirect if needed
      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push("/");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const mobileNavLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: ShoppingBag },
    { name: "About", href: "/about", icon: Building2 },
    { name: "Contact", href: "/contact", icon: Mail },
    { name: "FAQ", href: "/faq", icon: HelpCircle },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-gray-900"
            >
              SoptokBD
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`font-medium transition-colors duration-200 relative group ${
                    pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-gray-700 hover:text-teal-800"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-200 ${
                      pathname === link.href
                        ? "w-full bg-primary"
                        : "w-0 bg-teal-800 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Right Side - Cart, Dashboard and User/Login */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <Link
                href="/cart"
                className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                  pathname === "/cart"
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-gray-700 hover:text-teal-800 hover:bg-gray-100"
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </motion.div>

            {/* Dashboard Button - only show if user is logged in */}
            {user && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={user?.role === "admin" ? "/admin" : "/user"}>
                  <Button
                    className={`px-6 py-2 transition-colors ${
                      pathname === (user?.role === "admin" ? "/admin" : "/user")
                        ? "bg-primary text-white"
                        : "bg-black hover:bg-teal-950 text-white"
                    }`}
                  >
                    Dashboard
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* User Section */}
            {user ? (
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                        <AvatarImage alt={user?.name || "User"} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/40 text-primary text-sm font-semibold">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-24">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-primary capitalize font-medium">
                          {user?.role || "User"}
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 z-[60]"
                    sideOffset={8}
                    avoidCollisions={true}
                  >
                    {/* User Info Header */}
                    <div className="px-3 py-2 border-b">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                          <AvatarImage alt={user?.name || "User"} />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/40 text-primary font-semibold">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="px-3 py-2 space-y-2 text-xs border-b">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Role:</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full capitalize font-medium">
                          {user?.role || "User"}
                        </span>
                      </div>

                      {lastLogin && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Last Login:</span>
                          <span className="text-gray-700 font-medium">
                            {format(lastLogin, "MMM dd, HH:mm")}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-green-600 flex items-center gap-1 font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Online
                        </span>
                      </div>
                    </div>

                    {/* Menu Actions */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              /* Not logged in - Show Login and Sign Up buttons */
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/login">
                    <Button className="bg-primary text-white hover:bg-primary/90 px-6 py-2">
                      Login
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/signup">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-teal-800 transition-colors"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Navigation Links */}
              {mobileNavLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      pathname === link.href
                        ? "text-primary font-semibold bg-primary/10"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <link.icon
                      size={20}
                      className={
                        pathname === link.href
                          ? "text-primary"
                          : "text-teal-800"
                      }
                    />
                    <span className="font-medium text-gray-700">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Cart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    pathname === "/cart"
                      ? "text-primary font-semibold bg-primary/10"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingCart
                      size={20}
                      className={
                        pathname === "/cart" ? "text-primary" : "text-teal-800"
                      }
                    />
                    <span className="font-medium text-gray-700">Cart</span>
                  </div>
                  {totalQuantity > 0 && (
                    <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              </motion.div>

              <div className="pt-4 border-t space-y-2">
                {/* Mobile Dashboard Button - only show if user is logged in */}
                {user && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      href={user?.role === "admin" ? "/admin" : "/user"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        className={`w-full transition-colors ${
                          pathname ===
                          (user?.role === "admin" ? "/admin" : "/user")
                            ? "bg-primary hover:bg-primary/90 text-white"
                            : "bg-black hover:bg-teal-950 text-white"
                        }`}
                      >
                        Dashboard
                      </Button>
                    </Link>
                  </motion.div>
                )}

                {/* Mobile User Section */}
                {user ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                        <AvatarImage alt={user?.name || "User"} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/40 text-primary font-semibold">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || "No email"}
                        </p>
                        <p className="text-xs text-primary capitalize font-medium">
                          {user?.role || "User"}
                        </p>
                      </div>
                    </div>

                    {/* User Status */}
                    <div className="px-3 py-2 bg-gray-50 rounded-lg space-y-2 text-xs">
                      {lastLogin && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Last Login:</span>
                          <span className="text-gray-700 font-medium">
                            {format(lastLogin, "MMM dd, HH:mm")}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-green-600 flex items-center gap-1 font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Online
                        </span>
                      </div>
                    </div>

                    {/* User Actions */}
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                      >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Not logged in - Mobile Login/Signup */
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3 text-center"
                  >
                    <p className="text-sm text-gray-600">Not signed in</p>
                    <div className="space-y-2">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="w-full bg-primary text-white hover:bg-primary/90">
                          Login
                        </Button>
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
