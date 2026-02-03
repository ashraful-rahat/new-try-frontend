"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Bell,
  Calendar,
  Camera,
  ChevronDown,
  FileWarning,
  HandHeart,
  HeartHandshake,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  Target,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TopBanner = () => {
  const sloganText =
    "সেবা করাই আমাদের লক্ষ্য • সবার জন্য সমৃদ্ধি • ন্যায় ও সত্যের পথে";

  return (
    <div className="relative w-full bg-gradient-to-r from-[#006A4E] to-[#F42A41] py-3 px-4 overflow-hidden">
      {/* Static background pattern for better readability */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.03) 10px,
              rgba(255, 255, 255, 0.03) 20px
            )`,
          }}
        />
      </div>

      {/* Subtle animated glow effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 0% 50%, rgba(0, 106, 78, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 50%, rgba(244, 42, 65, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 50%, rgba(0, 106, 78, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Slogan text with high contrast */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="w-full overflow-hidden">
          <motion.div
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="whitespace-nowrap"
          >
            {/* First instance */}
            <motion.span
              className="inline-block text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-white px-8"
              style={{
                textShadow:
                  "2px 2px 8px rgba(0, 0, 0, 0.5), 0px 0px 20px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(0, 106, 78, 0.5)",
              }}
            >
              {sloganText}
            </motion.span>

            {/* Duplicate for seamless loop */}
            <motion.span
              className="inline-block text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-white px-8"
              style={{
                textShadow:
                  "2px 2px 8px rgba(0, 0, 0, 0.5), 0px 0px 20px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(0, 106, 78, 0.5)",
              }}
            >
              {sloganText}
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Decorative pulsing dots on sides */}
      <motion.div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 flex gap-1"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
        <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
        <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
      </motion.div>
      <motion.div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-1"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
        <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
        <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Main navigation items
  const navItems = [
    { name: "হোম", href: "/", icon: <Home size={20} /> },
    { name: "নেতা সম্পর্কে", href: "/about", icon: <User size={20} /> },
    { name: "আমার ভিশন", href: "/vision", icon: <Target size={20} /> },
    { name: "নোটিশ", href: "/notices", icon: <Bell size={20} /> },
    { name: "অভিযোগ", href: "/complaints", icon: <FileWarning size={20} /> },
  ];

  // Dropdown items
  const dropdownItems = [
    {
      name: "সেবা প্রকল্প",
      href: "/schemes",
      icon: <HeartHandshake size={18} />,
    },
    { name: "আমার এলাকা", href: "/constituency", icon: <MapPin size={18} /> },
    {
      name: "অ্যাপয়েন্টমেন্ট",
      href: "/appointments",
      icon: <Calendar size={18} />,
    },
    { name: "আমার অঙ্গীকার", href: "/pledges", icon: <Award size={18} /> },
    { name: "গ্যালারি", href: "/gallery", icon: <Camera size={18} /> },
    { name: "ডোনেশন", href: "/donation", icon: <HandHeart size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      {/* Top Banner */}
      <TopBanner />

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-[#006A4E]/20"
            : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Section */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center flex-shrink-0"
            >
              <Link href="/" className="flex items-center">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#006A4E] via-[#00A862] to-[#F42A41] bg-clip-text text-transparent whitespace-nowrap"
                >
                  মজিবুর রহমান ভূঁইয়া
                </motion.h1>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-1"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive(item.href)
                          ? "text-white bg-gradient-to-r from-[#006A4E] to-[#F42A41]"
                          : "text-gray-700 hover:text-[#006A4E] hover:bg-green-50"
                      }`}
                    >
                      <motion.div
                        animate={{
                          scale: hoveredItem === item.name ? 1.15 : 1,
                        }}
                        className={`${
                          isActive(item.href) ? "text-white" : "text-gray-600"
                        }`}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="text-sm font-semibold hidden xl:inline">
                        {item.name}
                      </span>

                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full shadow-lg"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Dropdown Menu */}
                <motion.div
                  variants={itemVariants}
                  className="relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isDropdownOpen
                        ? "text-[#006A4E] bg-green-50"
                        : "text-gray-700 hover:text-[#006A4E] hover:bg-green-50"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                    <span className="text-sm font-semibold hidden xl:inline">
                      আরও
                    </span>
                  </motion.button>

                  {/* Dropdown Content */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border-2 border-[#006A4E]/20 overflow-hidden"
                      >
                        <div className="p-2">
                          {dropdownItems.map((item) => (
                            <motion.div key={item.name} whileHover={{ x: 4 }}>
                              <Link
                                href={item.href}
                                onClick={() => setIsDropdownOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-[#006A4E] hover:to-[#F42A41] rounded-lg transition-all duration-200 font-medium"
                              >
                                <div className="text-gray-600">{item.icon}</div>
                                <span className="text-sm">{item.name}</span>
                              </Link>
                            </motion.div>
                          ))}

                          {/* Divider */}
                          <div className="border-t-2 border-[#006A4E]/10 my-2" />

                          {/* Contact Button in Dropdown */}
                          <Link
                            href="/contact"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#006A4E] to-[#F42A41] text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <Mail size={16} />
                            <span>যোগাযোগ</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Contact Button - Desktop */}
                <motion.div variants={itemVariants}>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#006A4E] to-[#F42A41] text-white rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ml-2"
                  >
                    <Mail size={18} />
                    <span>যোগাযোগ</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-gradient-to-r from-[#006A4E] to-[#F42A41] text-white hover:shadow-lg transition-all duration-300"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden bg-white border-t-2 border-[#006A4E]/20"
            >
              <div className="px-4 py-4">
                {/* Mobile Menu Items */}
                <div className="space-y-2 mb-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-[#006A4E] to-[#F42A41] text-white shadow-md"
                            : "text-gray-700 hover:bg-green-50"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isActive(item.href)
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span className="font-semibold flex-1">
                          {item.name}
                        </span>
                        {isActive(item.href) && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Dropdown Items */}
                <details className="mb-4">
                  <summary className="flex items-center gap-4 px-4 py-3 cursor-pointer rounded-lg text-gray-700 hover:bg-green-50 font-semibold">
                    <ChevronDown size={20} />
                    <span>আরও বিকল্প</span>
                  </summary>
                  <div className="space-y-2 mt-2 ml-4">
                    {dropdownItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.05,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium"
                        >
                          <div className="text-gray-600">{item.icon}</div>
                          <span className="text-sm">{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </details>

                {/* Mobile Contact Button */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-[#006A4E] to-[#F42A41] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Mail size={20} />
                    <span>যোগাযোগ করুন</span>
                  </Link>
                </motion.div>

                {/* Emergency Contact */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="p-4 bg-gradient-to-r from-[#006A4E] to-[#F42A41] rounded-lg shadow-lg"
                >
                  <div className="text-white">
                    <div className="text-xs font-semibold opacity-90 mb-2">
                      জরুরি সাহায্য প্রয়োজন?
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xl font-bold">
                        <Phone size={20} />
                        <span>৯৯৯</span>
                      </div>
                      <button
                        onClick={() => {
                          window.location.href = "tel:999";
                          setIsOpen(false);
                        }}
                        className="bg-white text-[#006A4E] hover:bg-gray-100 px-3 py-1.5 rounded font-semibold text-xs shadow-md"
                      >
                        কল করুন
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-xs text-yellow-100">
                        ২৪/৭ জরুরি সেবা
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Global Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700;800&display=swap");

        * {
          font-family: "Noto Sans Bengali", system-ui, sans-serif;
        }

        /* Custom Scrollbar - Bangladesh Flag Colors */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #006a4e, #f42a41);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00563c, #d9233a);
        }

        /* Selection Styles */
        ::selection {
          background-color: rgba(0, 106, 78, 0.3);
          color: #ffffff;
        }

        /* Focus Styles for Accessibility */
        a:focus-visible,
        button:focus-visible {
          outline: 3px solid #006a4e;
          outline-offset: 2px;
          border-radius: 6px;
        }

        /* Smooth transitions */
        a,
        button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Better touch targets for mobile */
        @media (max-width: 768px) {
          button,
          a {
            min-height: 48px;
            min-width: 48px;
          }
        }

        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Details element styling */
        details summary::-webkit-details-marker {
          display: none;
        }

        details summary {
          list-style: none;
        }
      `}</style>
    </>
  );
};

export default Navbar;
