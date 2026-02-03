"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Facebook,
  Globe,
  Home,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ContactPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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

  const contactInfo = [
    {
      platform: "ইমেইল",
      value: "mrmonju1971@gmail.com",
      icon: <Mail className="w-6 h-6" />,
      color: "bg-gradient-to-br from-green-600 to-emerald-700",
      link: "mailto:mrmonju1971@gmail.com",
      description: "সরাসরি ইমেইল পাঠান",
    },
    {
      platform: "ফেসবুক প্রোফাইল",
      value: "facebook.com/mojibur.r.monju",
      icon: <Facebook className="w-6 h-6" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      link: "https://facebook.com/mojibur.r.monju",
      description: "ব্যক্তিগত প্রোফাইল",
    },
    {
      platform: "ফেসবুক পেইজ",
      value: "facebook.com/...",
      icon: <Facebook className="w-6 h-6" />,
      color: "bg-gradient-to-br from-blue-500 to-cyan-600",
      link: "#",
      description: "আনুষ্ঠানিক পেইজ",
    },
    {
      platform: "এক্স (টুইটার)",
      value: "twitter.com/...",
      icon: <Twitter className="w-6 h-6" />,
      color: "bg-gradient-to-br from-gray-700 to-gray-900",
      link: "#",
      description: "প্রতিষ্ঠানিক অ্যাকাউন্ট",
    },
    {
      platform: "লিঙ্কডইন",
      value: "linkedin.com/in/...",
      icon: <Linkedin className="w-6 h-6" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      link: "#",
      description: "পেশাগত প্রোফাইল",
    },
    {
      platform: "হোয়াটসঅ্যাপ",
      value: "যোগাযোগ করুন",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-gradient-to-br from-green-500 to-emerald-600",
      link: "#",
      description: "সরাসরি বার্তা",
    },
  ];

  const emergencyContacts = [
    {
      title: "জরুরি হেল্পলাইন",
      number: "৯৯৯",
      description: "২৪/৭ জরুরি সাহায্য",
      color: "bg-gradient-to-br from-red-600 to-rose-700",
    },
    {
      title: "অফিস যোগাযোগ",
      number: "০১৭১১-XXX-XXX",
      description: "অফিস সময়ে যোগাযোগ",
      color: "bg-gradient-to-br from-green-600 to-emerald-700",
    },
    {
      title: "ব্যক্তিগত সহায়ক",
      number: "০১৮১১-XXX-XXX",
      description: "ব্যক্তিগত বিষয়াবলী",
      color: "bg-gradient-to-br from-blue-600 to-indigo-700",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner with Image and Text */}
      <section className="relative bg-linear-to-r from-[#006A4E] via-green-600 to-[#F42A41] py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-yellow-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>সব আর্টিকেল</span>
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/3"
            >
              <div className="relative w-64 h-64 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-yellow-200 rounded-full blur-2xl opacity-30" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <Image
                    src="/image/mojnu.jpg"
                    alt="মজিবুর রহমান ভূঁইয়া মঞ্জু"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, 320px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* Right Side - Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/3 text-white"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                সরাসরি <span className="text-yellow-300">যোগাযোগ</span> করুন
              </h1>

              <div className="w-24 h-1.5 bg-linear-to-r from-yellow-400 to-yellow-200 rounded-full mb-6" />

              <p className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed">
                নেতার সাথে সরাসরি যোগাযোগের মাধ্যমসমূহ। আপনার মতামত, পরামর্শ ও
                প্রয়োজনীয় বিষয়াদি নিয়ে সরাসরি যোগাযোগ করতে পারেন।
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Users className="w-5 h-5 text-yellow-300" />
                  <span className="font-semibold">জনগণের প্রতিনিধি</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Home className="w-5 h-5 text-yellow-300" />
                  <span className="font-semibold">এবি পার্টি চেয়ারম্যান</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            {/* Contact Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-linear-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:border-green-300 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${contact.color}`}
                    >
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 font-semibold mb-1">
                        {contact.platform}
                      </div>
                      <div className="text-lg font-bold text-gray-800 mb-1">
                        {contact.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {contact.description}
                      </div>
                    </div>
                    <div className="text-gray-400 group-hover:text-green-600 transition-colors">
                      <Send className="w-5 h-5" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Emergency Contacts */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                জরুরি <span className="text-red-600">যোগাযোগ</span>
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className={`${index === 0 ? "md:col-span-1" : ""} bg-linear-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg border-2 border-gray-100`}
                  >
                    <div
                      className={`w-16 h-16 rounded-xl ${contact.color} flex items-center justify-center text-white mb-4 mx-auto`}
                    >
                      <Phone className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                      {contact.title}
                    </h3>
                    <div className="text-3xl font-bold text-center text-gray-900 mb-2">
                      {contact.number}
                    </div>
                    <p className="text-gray-600 text-center">
                      {contact.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Location and Hours */}
            <motion.div
              variants={fadeInUp}
              className="grid md:grid-cols-2 gap-8 bg-linear-to-br from-green-50 to-red-50 rounded-2xl p-8 border-2 border-green-200"
            >
              {/* Location */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      অফিস অবস্থান
                    </h3>
                    <p className="text-gray-600">ঢাকা, বাংলাদেশ</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-600" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        মুখ্য অফিস
                      </div>
                      <div className="text-gray-600">
                        বাংলাদেশের রাজধানী ঢাকায়
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-red-600" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        স্থানীয় অফিস
                      </div>
                      <div className="text-gray-600">
                        চট্টগ্রাম ও ফেনীতে উপস্থিতি
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-red-600 to-rose-700 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      অফিস সময়
                    </h3>
                    <p className="text-gray-600">সরকারি ছুটির দিন বাদে</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-semibold text-gray-800">
                      সপ্তাহের দিন
                    </span>
                    <span className="text-green-600 font-bold">
                      সকাল ৯টা - সন্ধ্যা ৬টা
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-semibold text-gray-800">
                      শুক্রবার
                    </span>
                    <span className="text-red-600 font-bold">
                      সকাল ৯টা - দুপুর ১টা
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-semibold text-gray-800">
                      জরুরি যোগাযোগ
                    </span>
                    <span className="text-blue-600 font-bold">২৪/৭ খোলা</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Message Form */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 bg-linear-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-100 shadow-lg"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                সরাসরি <span className="text-green-600">বার্তা</span> পাঠান
              </h2>

              <form className="space-y-6 max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      আপনার নাম
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                      placeholder="পুরো নাম"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      ইমেইল ঠিকানা
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    বিষয়
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                    placeholder="বার্তার বিষয়"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    আপনার বার্তা
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                    placeholder="আপনার গুরুত্বপূর্ণ বার্তা এখানে লিখুন..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-green-600 to-red-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                    বার্তা পাঠান
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Footer Note */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 text-center bg-linear-to-r from-green-50 to-red-50 rounded-xl p-6 border-2 border-green-100"
            >
              <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                আপনার যোগাযোগ গুরুত্বপূর্ণ
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                প্রতিটি বার্তা, প্রতিটি মতামত আমাদের কাছে গুরুত্বপূর্ণ। আপনার
                সমস্যা, পরামর্শ ও চিন্তাভাবনা শেয়ার করুন। আমরা সবাই মিলে গড়বো
                সোনার বাংলাদেশ।
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="py-8 bg-linear-to-r from-gray-50 to-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors mb-4 md:mb-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">মূল পাতায় ফিরে যান</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-gray-600 font-medium">
                জনগণের সেবায় সর্বদা
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <div className="w-2 h-2 bg-red-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
