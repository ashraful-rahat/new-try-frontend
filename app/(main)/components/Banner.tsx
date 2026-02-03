"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/image/banner.jpg",
      title: "স্বাগতম",
      subtitle: "আমার বাংলাদেশ পার্টি",
      description: "জনগণের অধিকার, স্বচ্ছতা, ন্যায় এবং গণতান্ত্রিক মূল্যবোধ",
    },
    {
      image: "/image/banner1.jpg",
      title: "একসাথে এগিয়ে যাই",
      subtitle: "শক্তিশালী বাংলাদেশ গড়ি",
      description: "সবার জন্য সমান সুযোগ এবং উন্নয়ন",
    },
    {
      image: "/image/banner2.jpg",
      title: "পরিবর্তনের প্রতিশ্রুতি",
      subtitle: "নতুন দিনের স্বপ্ন",
      description: "দুর্নীতিমুক্ত, সমৃদ্ধ বাংলাদেশ",
    },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-150 md:h-150 lg:h-197.5 overflow-hidden bg-gray-900">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
              quality={100}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-3xl text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-6"
              >
                {/* Subtitle Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#006A4E]/80 backdrop-blur-sm rounded-full border-2 border-white/30"
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm md:text-base font-bold">
                    {slides[currentSlide].subtitle}
                  </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-2xl text-white/90 leading-relaxed max-w-2xl"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-[#F42A41] text-white rounded-xl font-bold text-lg shadow-2xl hover:bg-[#d91f35] transition-all"
                  >
                    আরও জানুন
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                  >
                    যোগ দিন
                  </motion.button>
                </motion.div>

                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="h-1 bg-linear-to-r from-[#006A4E] via-white to-[#F42A41] rounded-full"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`relative transition-all duration-300 ${
              currentSlide === index ? "w-12" : "w-3"
            }`}
          >
            {currentSlide === index ? (
              <div className="h-3 bg-linear-to-r from-[#006A4E] via-white to-[#F42A41] rounded-full shadow-lg" />
            ) : (
              <Circle
                className="w-3 h-3 text-white/60 hover:text-white transition-colors"
                fill="currentColor"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
        <span className="text-white font-bold text-lg">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${(i * 7.3 + 10) % 100}%`,
              top: `${(i * 9.7 + 15) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: (i % 4) * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
