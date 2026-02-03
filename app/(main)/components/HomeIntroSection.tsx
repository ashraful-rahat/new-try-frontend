"use client";

import { easeOut, motion } from "framer-motion";
import { Heart, Shield, Target, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const HomeIntroSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-16 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Side - Image */}
            <motion.div variants={fadeInUp} className="lg:w-2/5 w-full">
              <div className="relative">
                {/* Decorative background elements - FIXED */}
                <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4">
                  <div className="absolute inset-0 bg-linear-to-br from-green-500/20 to-red-500/20 rounded-2xl lg:rounded-3xl blur-lg lg:blur-xl" />
                </div>

                {/* Main image container - FIXED */}
                <div className="relative z-10">
                  <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-xl lg:rounded-2xl overflow-hidden border-4 sm:border-6 lg:border-8 border-white shadow-xl lg:shadow-2xl">
                    <Image
                      src="/image/mojnu1.jpg"
                      alt="মজিবুর রহমান ভূঁইয়া মঞ্জু"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      priority
                      quality={90}
                    />

                    {/* Gradient overlay - FIXED */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />

                    {/* Badge on image - FIXED */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-green-600 to-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-bold">
                          এবি পার্টি চেয়ারম্যান
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative dots - FIXED */}
                  <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 sm:border-3 lg:border-4 border-yellow-400/20 lg:border-yellow-400/30 rounded-full" />
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-2 sm:border-3 lg:border-4 border-green-400/20 lg:border-green-400/30 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Right Side - Text Content */}
            <motion.div variants={fadeInUp} className="lg:w-3/5">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-50 to-red-50 rounded-full mb-4"
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      সংক্ষিপ্ত পরিচিতি
                    </span>
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    মজিবুর রহমান ভূঁইয়া{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-red-600">
                      মঞ্জু
                    </span>
                  </h2>

                  <div className="w-24 h-1.5 bg-linear-to-r from-green-500 to-red-500 rounded-full mt-4" />
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    একজন সংগ্রামী রাজনৈতিক নেতা, গণমাধ্যম সংগঠক ও
                    মুক্তিযুদ্ধ-উত্তর প্রজন্মের প্রতিনিধিত্বকারী কণ্ঠস্বর। ১৯৭১
                    সালের ১৬ ডিসেম্বর, বিজয় দিবসে চট্টগ্রামের নন্দনকাননে
                    জন্মগ্রহণ।
                  </p>

                  <p className="text-gray-600 leading-relaxed">
                    বর্তমানে তিনি আমার বাংলাদেশ পার্টি (এবি পার্টি)-এর
                    চেয়ারম্যান হিসেবে দায়িত্ব পালন করছেন। তাঁর নেতৃত্বে এবি
                    পার্টি একটি নতুন রাজনৈতিক ধারার পথপ্রদর্শক হয়ে উঠছে।
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {[
                    {
                      icon: <Users className="w-6 h-6" />,
                      value: "৩৫+ বছর",
                      label: "রাজনৈতিক অভিজ্ঞতা",
                      color: "text-green-600",
                      bgColor: "bg-green-50",
                    },
                    {
                      icon: <Target className="w-6 h-6" />,
                      value: "২৭০০+",
                      label: "কাউন্সিলর সমর্থন",
                      color: "text-red-600",
                      bgColor: "bg-red-50",
                    },
                    {
                      icon: <Shield className="w-6 h-6" />,
                      value: "১৫+ দেশ",
                      label: "আন্তর্জাতিক ভ্রমণ",
                      color: "text-blue-600",
                      bgColor: "bg-blue-50",
                    },
                    {
                      icon: <Heart className="w-6 h-6" />,
                      value: "৫০+ বছর",
                      label: "বাংলাদেশের সেবা",
                      color: "text-purple-600",
                      bgColor: "bg-purple-50",
                    },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl ${stat.bgColor} border border-gray-200`}
                    >
                      <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                      <div className="text-xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-6">
                  <Link href="/contact">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-600 to-red-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl">
                      <span>সম্পূর্ণ জীবনী পড়ুন</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeIntroSection;
