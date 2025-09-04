import React, { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [bgWhite, setBgWhite] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [user, setUser] = useState({ email: "user@example.com" }); // Mock user state
  const [pathname, setPathname] = useState("/"); // Mock pathname

  // Handle scroll events with Framer Motion
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prevValue = scrollY.getPrevious();

    if (latest > 240) {
      setBgWhite(true);
    } else {
      setBgWhite(false);
    }

    if (latest > prevValue && latest > 30) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Check if pathname includes product
  useEffect(() => {
    if (typeof pathname === "string") {
      setTransparent(pathname.includes("/product/"));
    }
  }, [pathname]);

  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Collection",
      slug: "/collection",
    },
    {
      name: "Cart",
      slug: "/cart",
    },
    {
      name: "Checkout",
      slug: "/checkout",
    },
  ];

  const handleNavigation = (slug) => {
    if (typeof slug === "string") {
      setPathname(slug);
      console.log(`Navigating to: ${slug}`);
    }
  };

  const handleLogin = () => {
    console.log("Navigate to login");
  };

  // Handle cart open functionality
  const handleCartOpen = () => {
    console.log("Cart opened");
    // You can add your cart opening logic here
    // For example: open a cart sidebar, navigate to cart page, etc.
  };

  // Handle wishlist functionality
  const handleWishlistOpen = () => {
    console.log("Wishlist opened");
    // You can add your wishlist logic here
  };

  // Shopping Cart Icon Component
  const ShoppingCartIcon = ({ className = "", onClick }) => (
    <svg
      onClick={onClick}
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      style={{ cursor: "pointer" }}
      role="button"
      aria-label="Shopping Cart"
    >
      <path d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1.28L19 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3L6.28 6H5a1 1 0 0 1 0-2h2zm2 0h6V3H9v1zm7.72 2H7.28l.72 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l.72-13z" />
    </svg>
  );

  // Heart Icon Component
  const HeartIcon = ({ className = "", onClick }) => (
    <svg
      onClick={onClick}
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ cursor: "pointer" }}
      role="button"
      aria-label="Wishlist"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );

  // Menu Icon Component
  const MenuIcon = ({ className = "", onClick }) => (
    <svg
      onClick={onClick}
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      style={{ cursor: "pointer" }}
      role="button"
      aria-label="Menu"
    >
      <path
        d="M3 12h18M3 6h18M3 18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  // Profile Circle Component
  const ProfileCircle = () => {
    const userInitial = user?.email?.[0]?.toUpperCase() || "U";

    return (
      <div
        className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
        role="button"
        aria-label="User Profile"
      >
        <span className="text-sm font-medium text-gray-600">{userInitial}</span>
      </div>
    );
  };

  // Button Component
  const Button = ({ onClick, className = "", children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`bg-black hover:bg-gray-800 transition-colors duration-200 rounded ${className}`}
    >
      {children}
    </button>
  );

  // DropDown Component with enhanced animations
  const DropDown = ({ menu, setMenu, navItems }) => (
    <motion.div
      initial={{ opacity: 0, scaleY: 0, y: -20 }}
      animate={
        menu
          ? { opacity: 1, scaleY: 1, y: 0 }
          : { opacity: 0, scaleY: 0, y: -20 }
      }
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05,
      }}
      className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg md:hidden z-20 transform origin-top ${
        menu ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <ul className="py-4">
        {navItems &&
          Array.isArray(navItems) &&
          navItems.map(({ name, slug }, index) => (
            <motion.li
              key={name || slug}
              initial={{ opacity: 0, x: -20 }}
              animate={menu ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{
                duration: 0.2,
                delay: menu ? index * 0.05 : 0,
              }}
              className="transform transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => {
                  handleNavigation(slug);
                  if (setMenu) setMenu(false);
                }}
                className={`block w-full text-left px-6 py-3 hover:bg-gray-100/80 transition-all duration-200 transform hover:translate-x-2 ${
                  pathname === slug
                    ? "border-l-4 border-black font-semibold bg-gray-50"
                    : ""
                }`}
              >
                {name}
              </button>
            </motion.li>
          ))}
      </ul>
    </motion.div>
  );

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 z-[12] w-full ${
        pathname === "/login" || pathname === "/signup" ? "hidden" : ""
      } ${transparent ? " bg-transparent" : "bg-white"} h-max`}
    >
      <nav
        className={`px-[5%] flex justify-between py-4 items-center overflow-hidden border-b ${
          transparent && !bgWhite
            ? "border-none text-white"
            : bgWhite && transparent
            ? "bg-white text-black"
            : "border-b-gray-500 text-black"
        } z-10 relative`}
      >
        {/* Logo */}
        <div className="w-max flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavigation("/")}
            className="text-lg underline font-bold sm:text-xl hover:opacity-80 transition-opacity"
          >
            ShoeSphere
          </button>
        </div>

        {/* NavItems */}
        <ul className="hidden lg:flex justify-center gap-6 w-[40%] font-normal items-center pl-[5%]">
          {navItems.map(({ name, slug }) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => handleNavigation(slug)}
                className={
                  pathname === slug
                    ? "border-b border-black text-[15px]"
                    : "hover:border-b hover:border-gray-400 duration-300 text-[15px] pb-0.5"
                }
              >
                {name}
              </button>
            </li>
          ))}
        </ul>

        {/* Search and Cart */}
        <div className="flex justify-end items-center gap-4 md:w-[80%] lg:w-max">
          <div>
            <ShoppingCartIcon
              onClick={handleCartOpen}
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </div>
          <div>
            <HeartIcon
              onClick={handleWishlistOpen}
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </div>

          {user?.email ? (
            <ProfileCircle />
          ) : (
            <Button
              onClick={handleLogin}
              className="text-[12px] text-white md:text-sm px-4 md:px-3 font-normal py-1 md:py-2"
            >
              Sign In
            </Button>
          )}

          <MenuIcon
            className="w-5 h-5 md:hidden"
            onClick={() => setMenu(!menu)}
          />
        </div>

        <DropDown menu={menu} setMenu={setMenu} navItems={navItems} />
      </nav>

      {/* Demo content to show scrolling effect */}
      <div className="h-[200vh] bg-gradient-to-b from-blue-50 to-purple-50 pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-8">
              Scroll to see navbar animation
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The navbar will hide when scrolling down and show when scrolling
              up
            </p>
            <div className="space-y-8">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold mb-4">
                    Section {i + 1}
                  </h2>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
