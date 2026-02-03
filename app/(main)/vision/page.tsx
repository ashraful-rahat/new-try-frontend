"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  Briefcase,
  Eye,
  Flag,
  Globe,
  GraduationCap,
  Heart,
  Home,
  Lightbulb,
  Scale3D,
  Shield,
  Target,
  TrendingUpDown,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useRef } from "react";

const VisionPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const scaleIn: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Vision items
  const visionItems = [
    {
      title: "সুন্দর ও সমৃদ্ধ বাংলাদেশ",
      description:
        "প্রতিটি নাগরিকের জন্য নিরাপদ, উন্নত ও সমৃদ্ধ জীবন নিশ্চিত করা",
      icon: <Home className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
    },
    {
      title: "তরুণ প্রজন্মের নেতৃত্ব",
      description:
        "যুবসমাজকে দেশ পরিচালনায় এগিয়ে আনা ও তাদের স্বপ্ন বাস্তবায়ন",
      icon: <Users className="w-8 h-8" />,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50",
    },
    {
      title: "ডিজিটাল বাংলাদেশ",
      description: "প্রযুক্তি নির্ভর আধুনিক রাষ্ট্র গঠন ও ডিজিটাল সেবা প্রসার",
      icon: <Globe className="w-8 h-8" />,
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-50",
    },
    {
      title: "শিক্ষা বিপ্লব",
      description: "সকলের জন্য সমান ও মানসম্মত শিক্ষার সুযোগ তৈরি করা",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
    },
  ];

  // Mission pillars
  const missionPillars = [
    {
      title: "স্বচ্ছতা ও জবাবদিহিতা",
      description:
        "সরকারি কাজে সম্পূর্ণ স্বচ্ছতা, দুর্নীতিমুক্ত প্রশাসন প্রতিষ্ঠা",
      icon: <Shield className="w-8 h-8" />,
      number: "০১",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "সমতা ও ন্যায়বিচার",
      description: "সকলের সমান অধিকার, সামাজিক ন্যায়বিচার নিশ্চিত করা",
      icon: <Scale3D className="w-8 h-8" />,
      number: "০২",
      gradient: "from-red-500 to-rose-600",
    },
    {
      title: "অর্থনৈতিক উন্নয়ন",
      description: "দারিদ্র্য বিমোচন, কর্মসংস্থান সৃষ্টি ও অর্থনৈতিক সমৃদ্ধি",
      icon: <TrendingUpDown className="w-8 h-8" />,
      number: "০৩",
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "সামাজিক নিরাপত্তা",
      description:
        "সকলের জন্য স্বাস্থ্যসেবা, শিক্ষা ও সামাজিক নিরাপত্তা নিশ্চিত করা",
      icon: <Heart className="w-8 h-8" />,
      number: "০৪",
      gradient: "from-red-500 to-pink-600",
    },
  ];

  // Target areas for youth
  const youthTargets = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      value: "১ কোটি",
      label: "নতুন চাকরি",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      value: "৫ লক্ষ",
      label: "উদ্যোক্তা",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: "১০০%",
      label: "ডিজিটাল সুযোগ",
    },
    { icon: <Trophy className="w-6 h-6" />, value: "১০০০", label: "যুব নেতা" },
  ];

  // Core principles
  const corePrinciples = [
    {
      title: "দেশপ্রেম",
      description: "বাংলাদেশের উন্নয়ন ও সমৃদ্ধিই আমাদের একমাত্র লক্ষ্য",
      icon: "🇧🇩",
    },
    {
      title: "জনসেবা",
      description: "জনগণের সেবাই আমাদের রাজনীতির মূল উদ্দেশ্য",
      icon: "🤝",
    },
    {
      title: "স্বচ্ছতা",
      description: "সকল কাজে সম্পূর্ণ স্বচ্ছতা ও জবাবদিহিতা",
      icon: "🔍",
    },
    {
      title: "উদ্ভাবন",
      description: "নতুন চিন্তা ও প্রযুক্তির মাধ্যমে সমাধান খোঁজা",
      icon: "💡",
    },
  ];

  // Fix for missing Scale and TrendingUp components
  const Scale = ({ className }: { className: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    </svg>
  );

  const TrendingUp = ({ className }: { className: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Banner with Bangladesh Flag Theme */}
      <motion.section
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#006A4E] via-green-700 to-[#F42A41]"
      >
        {/* Flag pattern background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#006A4E] 60% to-transparent" />
          <div className="absolute right-0 inset-y-0 w-2/5 bg-gradient-to-l from-[#F42A41] 60% to-transparent" />
        </div>

        {/* Animated circles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full border-2 border-yellow-400/20"
              style={{
                left: `${20 + i * 10}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-white space-y-8"
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full"
                >
                  <Flag className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-bold">
                    আমার বাংলাদেশ পার্টি
                  </span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  আমাদের <span className="text-yellow-300">ভিশন</span>
                  <br />ও <span className="text-yellow-200">মিশন</span>
                </h1>

                <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full" />
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl text-white/90 leading-relaxed"
              >
                একটি সুন্দর, সমৃদ্ধ ও আধুনিক বাংলাদেশ গড়ার স্বপ্ন নিয়ে আমরা
                কাজ করছি। তরুণ প্রজন্মকে সাথে নিয়ে গড়বো সোনার বাংলা।
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-all shadow-lg">
                  আমাদের পরিকল্পনা
                </button>
                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg hover:bg-white/30 transition-all">
                  আমাদের সাথে যুক্ত হন
                </button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 gap-4 pt-6"
              >
                {[
                  { label: "লক্ষ্য", value: "তরুণ বাংলাদেশ" },
                  { label: "সময়সীমা", value: "২০৩০" },
                  { label: "ফোকাস", value: "যুব উন্নয়ন" },
                  { label: "দৃষ্টিভঙ্গি", value: "ডিজিটাল বাংলাদেশ" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-lg"
                  >
                    <div className="text-xs opacity-80">{stat.label}</div>
                    <div className="font-semibold">{stat.value}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image/Icon Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Bangladesh Flag inspired design */}
                <div className="relative w-64 h-64 mx-auto">
                  <div className="absolute inset-0 bg-[#006A4E] rounded-full" />
                  <div className="absolute inset-10 bg-white rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#F42A41] rounded-full flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-8 border-4 border-yellow-400/30 rounded-full"
                  />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-gradient-to-br from-green-600 to-emerald-700 text-white px-4 py-2 rounded-lg shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <div className="text-sm font-bold">স্বপ্নের বাংলাদেশ</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-gradient-to-br from-red-600 to-rose-700 text-white px-4 py-2 rounded-lg shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <div className="text-sm font-bold">জনগণের জন্য</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              আমাদের ভিশন
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              তরুণ প্রজন্মের নেতৃত্বে একটি আধুনিক, প্রযুক্তি নির্ভর ও সমৃদ্ধ
              বাংলাদেশ
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {visionItems.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                className={`p-6 rounded-xl shadow-lg ${item.bgColor} border-2 border-gray-100`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              আমাদের মিশনের স্তম্ভ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              যে চারটি মূল নীতির উপর ভিত্তি করে আমরা দেশ গঠনের কাজ করব
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {missionPillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-100">
                  <div className="flex items-start gap-4">
                    <div
                      className={`text-3xl font-bold bg-gradient-to-br ${pillar.gradient} bg-clip-text text-transparent`}
                    >
                      {pillar.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-600">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Youth Targets Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              তরুণ প্রজন্মের লক্ষ্যমাত্রা
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ২০৩০ সালের মধ্যে আমরা যা অর্জন করতে চাই
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {youthTargets.map((target, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-100 to-red-100 rounded-lg flex items-center justify-center">
                  <div className="text-green-600">{target.icon}</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {target.value}
                </div>
                <div className="text-sm text-gray-600">{target.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              মূল নীতি ও আদর্শ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আমাদের রাজনৈতিক চিন্তাধারা ও কর্মপদ্ধতি
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {corePrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-red-50 p-6 rounded-xl shadow-lg border-2 border-gray-100"
              >
                <div className="text-4xl mb-4">{principle.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-600 text-sm">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#006A4E] via-green-600 to-[#F42A41]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              স্বপ্নের বাংলাদেশ গড়তে আমাদের সাথে যুক্ত হন
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              আপনার যোগদানেই আমরা শক্তি পাই। আসুন, একসাথে গড়ি সোনার বাংলা।
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-all shadow-lg">
                সদস্য হন
              </button>
              <button className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg hover:bg-white/30 transition-all">
                স্বেচ্ছাসেবক হন
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <div className="text-5xl text-green-600/20">"</div>
            <p className="text-xl sm:text-2xl text-gray-800 italic leading-relaxed">
              তরুণ প্রজন্মের হাত ধরেই গড়ে উঠবে নতুন বাংলাদেশ। তাদের স্বপ্নই হবে
              আমাদের পথচলার প্রেরণা।
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-green-600" />
              <div className="text-lg font-semibold text-red-600">
                — মজিবুর রহমান ভূঁইয়া মঞ্জু
              </div>
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-red-600" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VisionPage;
