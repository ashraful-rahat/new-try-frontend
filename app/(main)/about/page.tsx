"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  Award,
  Briefcase,
  Calendar,
  Facebook,
  Globe,
  GraduationCap,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Sparkles,
  Star,
  Trophy,
  Twitter,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useRef } from "react";

const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Generate stable particle positions using useMemo
  const heroParticles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      left: (i * 5.3 + 7.3) % 100,
      top: (i * 7.9 + 3.2) % 100,
      duration: 3 + (i % 5) * 0.4,
      delay: (i % 4) * 0.5,
    }));
  }, []);

  const contactParticles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      left: (i * 6.7 + 12.3) % 100,
      top: (i * 8.4 + 5.6) % 100,
      duration: 4 + (i % 3) * 0.7,
      delay: (i % 3) * 0.7,
    }));
  }, []);

  // Fixed Animation variants with proper typing
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
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

  const scaleIn: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const slideInLeft: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const slideInRight: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  // Timeline data
  const timeline = [
    {
      year: "১৯৭১",
      title: "জন্ম ও শৈশব",
      description:
        "বিজয় দিবসে চট্টগ্রামের নন্দনকাননে জন্ম। পিতা মুক্তিযুদ্ধে নির্যাতিত।",
      icon: <Calendar className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-600",
    },
    {
      year: "১৯৮৮",
      title: "রাজনৈতিক জীবন শুরু",
      description: "স্বৈরাচারবিরোধী আন্দোলনে সক্রিয় অংশগ্রহণ।",
      icon: <Users className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      year: "২০০২-২০০৩",
      title: "ছাত্র নেতৃত্ব",
      description: "ছাত্রশিবিরের সেক্রেটারি জেনারেল ও সভাপতি নির্বাচিত।",
      icon: <Award className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      year: "২০০৮",
      title: "মিডিয়া সংগঠক",
      description: "দিগন্ত টেলিভিশনের উপ-নির্বাহী পরিচালক।",
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-orange-500 to-red-600",
    },
    {
      year: "২০২০",
      title: "এবি পার্টি প্রতিষ্ঠা",
      description: "আমার বাংলাদেশ পার্টি গঠনে প্রধান উদ্যোক্তা।",
      icon: <Trophy className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      year: "২০২৪",
      title: "গণ-অভ্যুত্থান",
      description: "ফ্যাসিবাদবিরোধী আন্দোলনে গুলিবিদ্ধ ও কারারুদ্ধ।",
      icon: <Heart className="w-5 h-5" />,
      color: "from-red-500 to-rose-600",
    },
    {
      year: "২০২৫",
      title: "চেয়ারম্যান নির্বাচিত",
      description: "২৭০০ কাউন্সিলরের ভোটে এবি পার্টির চেয়ারম্যান।",
      icon: <Star className="w-5 h-5" />,
      color: "from-yellow-500 to-amber-600",
    },
  ];

  // Achievements data
  const achievements = [
    {
      title: "শিক্ষা",
      items: [
        "চট্টগ্রাম বিশ্ববিদ্যালয় - রাজনীতি বিজ্ঞানে স্নাতক ও মাস্টার্স",
        "চট্টগ্রাম কলেজ জাতীয় বিতর্ক দলের প্রধান",
        "কারারুদ্ধ অবস্থায় মাস্টার্স পরীক্ষায় কৃতিত্ব",
      ],
      icon: <GraduationCap className="w-8 h-8" />,
      gradient: "from-[#006A4E] via-emerald-600 to-green-700",
      bgGradient: "from-green-50 via-emerald-50 to-teal-50",
    },
    {
      title: "আন্তর্জাতিক অভিজ্ঞতা",
      items: [
        "১৫+ দেশে পেশাগত ও রাজনৈতিক সফর",
        "বিবিসি, সিএনএন, আল-জাজিরা পরিদর্শন",
        "২০২০ সালে বিবিসিতে বিশেষ সাক্ষাৎকার",
      ],
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-blue-600 via-indigo-600 to-purple-700",
      bgGradient: "from-blue-50 via-indigo-50 to-purple-50",
    },
    {
      title: "সাংস্কৃতিক অবদান",
      items: [
        "নাট্যকার, গীতিকার ও অভিনেতা",
        "খেলাঘর, স্বজন মেলা সদস্য",
        "ফুটবল, ক্রিকেট, দাবায় পুরস্কারপ্রাপ্ত",
      ],
      icon: <Trophy className="w-8 h-8" />,
      gradient: "from-[#F42A41] via-rose-600 to-red-700",
      bgGradient: "from-red-50 via-rose-50 to-pink-50",
    },
  ];

  // Current roles
  const currentRoles = [
    {
      title: "চেয়ারম্যান, আমার বাংলাদেশ পার্টি",
      icon: <Star className="w-6 h-6" />,
    },
    { title: "অর্থ কমিটির প্রধান", icon: <Trophy className="w-6 h-6" /> },
    {
      title: "জাতীয় নির্বাচন ও রাজনৈতিক কমিটির প্রধান",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "ইভেন্ট ম্যানেজমেন্ট কমিটির প্রধান",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: "উপ-নির্বাহী পরিচালক, দিগন্ত টিভি",
      icon: <Briefcase className="w-6 h-6" />,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-linear-to-b from-gray-50 to-white"
    >
      {/* Improved Hero Section */}
      <motion.section
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 z-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-[#006A4E] via-emerald-700 to-[#F42A41]" />

          {/* Animated mesh gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(0, 106, 78, 0.8) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(244, 42, 65, 0.8) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(0, 168, 98, 0.8) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(0, 106, 78, 0.8) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating particles with stable positions */}
          <div className="absolute inset-0">
            {heroParticles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
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
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                >
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-bold">
                    চেয়ারম্যান, আমার বাংলাদেশ পার্টি
                  </span>
                </motion.div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  মজিবুর রহমান
                  <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-yellow-200 to-yellow-100">
                    ভূঁইয়া মঞ্জু
                  </span>
                </h1>

                <div className="flex items-center gap-4">
                  <div className="h-1 flex-1 bg-linear-to-r from-white to-transparent rounded-full" />
                </div>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl leading-relaxed text-white/90 font-medium"
              >
                সংগ্রামী রাজনৈতিক নেতা • গণমাধ্যম সংগঠক • মুক্তিযুদ্ধ-উত্তর
                প্রজন্মের প্রতিনিধি
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-white text-[#006A4E] rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  যোগাযোগ করুন
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                  onClick={() =>
                    document
                      .getElementById("journey")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  আরও জানুন
                </motion.button>
              </motion.div>

              {/* Stats badges */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-3 gap-4 pt-8"
              >
                {[
                  { value: "50+", label: "বছর" },
                  { value: "15+", label: "দেশ" },
                  { value: "২৭০০", label: "সমর্থক" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <div className="text-3xl font-bold text-yellow-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Image Section */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-linear-to-br from-yellow-400/30 to-white/30 rounded-full blur-3xl animate-pulse" />

                {/* Outer rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 border-4 border-dashed border-white/40 rounded-full" />
                </motion.div>

                {/* Middle rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-8"
                >
                  <div className="absolute inset-0 border-4 border-dotted border-yellow-300/60 rounded-full" />
                </motion.div>

                {/* Main Image Container */}
                <div className="absolute inset-16 group">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl transform transition-transform group-hover:scale-105">
                    <Image
                      src="/image/mojnu.jpg"
                      alt="মজিবুর রহমান ভূঁইয়া মঞ্জু"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#006A4E]/30 to-transparent" />
                  </div>
                </div>

                {/* Floating badges with enhanced design */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -right-6 bg-linear-to-br from-white to-yellow-50 text-[#006A4E] px-6 py-4 rounded-2xl shadow-2xl font-bold border-4 border-yellow-300"
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <div className="text-sm text-gray-600">জন্ম</div>
                      <div className="text-lg">১৬ ডিসেম্বর ১৯৭১</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-6 -left-6 bg-linear-to-br from-[#F42A41] to-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold border-4 border-white"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <div>
                      <div className="text-sm opacity-90">বিশেষত্ব</div>
                      <div className="text-lg">বিজয় দিবসে জন্ম</div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative stars */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${20 + i * 60}%`,
                      top: `${10 + (i % 2) * 80}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm font-bold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              নিচে স্ক্রল করুন
            </span>
            <div className="w-8 h-12 border-3 border-white rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-white rounded-full shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Enhanced Quick Stats */}
      <section className="py-20 bg-linear-to-br from-[#006A4E] via-emerald-700 to-[#F42A41] relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { number: "50+", label: "বছরের জীবন", icon: <Calendar /> },
              { number: "35+", label: "বছরের রাজনীতি", icon: <Users /> },
              { number: "15+", label: "দেশ ভ্রমণ", icon: <Globe /> },
              { number: "২৭০০", label: "কাউন্সিলরের সমর্থন", icon: <Award /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center text-white bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex justify-center mb-4"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    {stat.icon}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-5xl md:text-6xl font-bold mb-3 text-yellow-300"
                >
                  {stat.number}
                </motion.div>
                <div className="text-lg md:text-xl font-semibold opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Overview */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-green-100 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-red-100 to-transparent rounded-full blur-3xl opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-100 to-red-100 rounded-full mb-6"
              >
                <Sparkles className="w-5 h-5 text-[#006A4E]" />
                <span className="font-bold text-gray-700">
                  সংক্ষিপ্ত পরিচিতি
                </span>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-[#006A4E] via-emerald-600 to-[#F42A41] bg-clip-text text-transparent">
                জীবন কাহিনী
              </h2>
              <div className="h-2 w-32 bg-linear-to-r from-[#006A4E] to-[#F42A41] rounded-full mx-auto" />
            </div>

            <motion.div variants={staggerContainer} className="space-y-8">
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-700 leading-relaxed text-center"
              >
                মজিবুর রহমান ভূঁইয়া মঞ্জু, যিনি মজিবুর রহমান মঞ্জু নামে
                সুপরিচিত, একজন সংগ্রামী রাজনৈতিক নেতা, গণমাধ্যম সংগঠক ও
                মুক্তিযুদ্ধ-উত্তর প্রজন্মের প্রতিনিধিত্বকারী কণ্ঠস্বর। তিনি ১৯৭১
                সালের ১৬ ডিসেম্বর, চট্টগ্রামের নন্দনকাননে জন্মগ্রহণ করেন—যে
                দিনটি ছিল নবগঠিত রাষ্ট্র বাংলাদেশের চূড়ান্ত বিজয়ের দিন।
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  variants={slideInLeft}
                  whileHover={{ scale: 1.02, rotate: -1 }}
                  className="group bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-[#006A4E]/20 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-linear-to-br from-[#006A4E] to-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#006A4E] mb-3">
                        জন্মস্থান
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        নন্দনকানন, চট্টগ্রাম
                        <br />
                        <span className="text-gray-600">
                          মূল বাড়ি: উত্তর শর্শদী, ফেনী
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={slideInRight}
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className="group bg-linear-to-br from-red-50 via-rose-50 to-pink-50 p-8 rounded-2xl border-2 border-[#F42A41]/20 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-linear-to-br from-[#F42A41] to-rose-600 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                      <Heart className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#F42A41] mb-3">
                        পারিবারিক ত্যাগ
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        পিতা কোব্বাদুর রহমান ভূঁইয়া মুক্তিযুদ্ধে নির্যাতিত হয়ে
                        ১৯৭৩ সালে মৃত্যুবরণ করেন
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-700 leading-relaxed bg-linear-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200"
              >
                পিতৃহীন শৈশব, মায়ের সংগ্রামী ছায়ায় বেড়ে ওঠা এবং একাধারে
                সাহিত্য, সংস্কৃতি ও রাজনীতির ভেতর গড়ে ওঠা মঞ্জুর ব্যক্তিত্ব
                তাঁকে একটি ব্যতিক্রমধর্মী নেতৃত্বে পরিণত করে।
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section
        id="journey"
        className="py-24 bg-linear-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-100 to-red-100 rounded-full mb-6"
            >
              <Star className="w-5 h-5 text-[#006A4E]" />
              <span className="font-bold text-gray-700">জীবন পথচলা</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-[#006A4E] via-emerald-600 to-[#F42A41] bg-clip-text text-transparent">
              মাইলফলক সমূহ
            </h2>
            <div className="h-2 w-32 bg-linear-to-r from-[#006A4E] to-[#F42A41] rounded-full mx-auto" />
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline line */}
                {index !== timeline.length - 1 && (
                  <div className="absolute left-10 md:left-1/2 top-20 w-1 h-full bg-linear-to-b from-[#006A4E] via-emerald-500 to-[#F42A41] -z-10 transform md:-translate-x-1/2" />
                )}

                <div
                  className={`flex flex-col md:flex-row gap-8 mb-16 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Year badge */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`shrink-0 w-20 h-20 bg-linear-to-br ${item.color} rounded-2xl flex items-center justify-center text-white font-bold shadow-2xl relative z-10 mx-auto md:mx-0`}
                  >
                    <div className="text-center">
                      <div className="text-xs mb-1">{item.icon}</div>
                    </div>
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="flex-1 bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:border-[#006A4E]/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      <span
                        className={`px-6 py-2 bg-linear-to-r ${item.color} text-white rounded-full text-lg font-bold shadow-lg inline-block w-fit`}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Achievements Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-100 to-red-100 rounded-full mb-6"
            >
              <Trophy className="w-5 h-5 text-[#006A4E]" />
              <span className="font-bold text-gray-700">কৃতিত্ব ও সাফল্য</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-[#006A4E] via-emerald-600 to-[#F42A41] bg-clip-text text-transparent">
              অর্জন ও অবদান
            </h2>
            <div className="h-2 w-32 bg-linear-to-r from-[#006A4E] to-[#F42A41] rounded-full mx-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -15, scale: 1.02 }}
                className={`group bg-linear-to-br ${achievement.bgGradient} p-10 rounded-3xl shadow-2xl border-2 border-white hover:shadow-3xl transition-all relative overflow-hidden`}
              >
                {/* Background pattern */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className={`w-20 h-20 bg-linear-to-br ${achievement.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all`}
                  >
                    {achievement.icon}
                  </div>

                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    {achievement.title}
                  </h3>

                  <ul className="space-y-4">
                    {achievement.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="w-3 h-3 bg-linear-to-r from-[#006A4E] to-[#F42A41] rounded-full mt-2 shrink-0 group-hover/item:scale-150 transition-transform" />
                        <span className="text-gray-700 text-lg leading-relaxed">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Current Roles */}
      <section className="py-24 bg-linear-to-br from-gray-50 via-gray-100 to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-100 to-red-100 rounded-full mb-6"
            >
              <Briefcase className="w-5 h-5 text-[#006A4E]" />
              <span className="font-bold text-gray-700">বর্তমান অবস্থান</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-[#006A4E] via-emerald-600 to-[#F42A41] bg-clip-text text-transparent">
              দায়িত্বসমূহ
            </h2>
            <div className="h-2 w-32 bg-linear-to-r from-[#006A4E] to-[#F42A41] rounded-full mx-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-6"
          >
            {currentRoles.map((role, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 15, scale: 1.02 }}
                className="group flex items-center gap-6 bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:border-[#006A4E]/30 hover:shadow-2xl transition-all"
              >
                <div
                  className={`w-16 h-16 bg-linear-to-br ${
                    index === 0
                      ? "from-yellow-400 to-orange-500"
                      : "from-[#006A4E] to-[#F42A41]"
                  } rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all`}
                >
                  {role.icon}
                </div>
                <p className="text-xl font-bold text-gray-800 flex-1">
                  {role.title}
                </p>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="w-3 h-3 bg-linear-to-r from-[#006A4E] to-[#F42A41] rounded-full"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section
        id="contact"
        className="py-24 bg-linear-to-br from-[#006A4E] via-emerald-700 to-[#F42A41] relative overflow-hidden"
      >
        {/* Animated background elements with stable positions */}
        <div className="absolute inset-0">
          {contactParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/10 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30"
            >
              <Mail className="w-5 h-5 text-white" />
              <span className="font-bold text-white">যোগাযোগ মাধ্যম</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              সরাসরি যোগাযোগ করুন
            </h2>
            <div className="h-2 w-32 bg-white rounded-full mx-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {[
              {
                icon: <Mail className="w-7 h-7" />,
                label: "ইমেইল",
                value: "mrmonju1971@gmail.com",
                link: "mailto:mrmonju1971@gmail.com",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: <Phone className="w-7 h-7" />,
                label: "হোয়াটসঅ্যাপ",
                value: "+880...",
                link: "https://wa.me/",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: <Facebook className="w-7 h-7" />,
                label: "ফেসবুক",
                value: "মজিবুর রহমান মঞ্জু",
                link: "https://facebook.com/mojibur.r.monju",
                color: "from-blue-600 to-blue-700",
              },
              {
                icon: <Twitter className="w-7 h-7" />,
                label: "এক্স (Twitter)",
                value: "@mrmonju",
                link: "https://twitter.com/",
                color: "from-gray-700 to-gray-900",
              },
              {
                icon: <Linkedin className="w-7 h-7" />,
                label: "লিঙ্কডইন",
                value: "মজিবুর রহমান মঞ্জু",
                link: "https://linkedin.com/in/",
                color: "from-blue-500 to-blue-700",
              },
              {
                icon: <MessageCircle className="w-7 h-7" />,
                label: "সরাসরি যোগাযোগ",
                value: "মেসেজ পাঠান",
                link: "#",
                color: "from-purple-500 to-pink-600",
              },
            ].map((contact, index) => (
              <motion.a
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.08, y: -8 }}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-linear-to-br ${contact.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all`}
                  >
                    {contact.icon}
                  </div>
                  <p className="text-sm text-gray-500 font-bold mb-2">
                    {contact.label}
                  </p>
                  <p className="text-gray-800 font-bold text-lg">
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <button className="group px-10 py-5 bg-white text-[#006A4E] rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all inline-flex items-center gap-3">
              <Share2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              প্রোফাইল শেয়ার করুন
            </button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Quote Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-green-50 via-white to-red-50" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-9xl text-[#006A4E]/10 mb-6"
            ></motion.div>

            <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-relaxed">
              জনগণের অধিকার, স্বচ্ছতা, ন্যায় এবং গণতান্ত্রিক মূল্যবোধই হচ্ছে
              আমার পথনির্দেশ
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-1 w-20 bg-linear-to-r from-transparent to-[#006A4E] rounded-full" />
              <Star className="w-8 h-8 text-yellow-500" />
              <div className="h-1 w-20 bg-linear-to-l from-transparent to-[#F42A41] rounded-full" />
            </div>

            <p className="text-2xl text-gray-600 font-bold">
              — মজিবুর রহমান ভূঁইয়া মঞ্জু
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
