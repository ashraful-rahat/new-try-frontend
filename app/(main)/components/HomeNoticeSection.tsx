// components/HomeNoticeSection.tsx
"use client";

import { SimpleNotice } from "@/app/interfaces/notice";
import { noticeService } from "@/app/lib/api/notice";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Calendar,
  Clock,
  MapPin,
  Megaphone,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomeNoticeSection = () => {
  const [notices, setNotices] = useState<SimpleNotice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await noticeService.getLatestNotices(4);
        setNotices(data);
      } catch (error) {
        console.error("Error loading notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "important":
        return {
          bg: "from-red-500 to-rose-600",
          border: "border-red-300",
          text: "text-red-700",
          bgLight: "bg-red-50",
          iconBg: "bg-red-100",
        };
      case "election":
        return {
          bg: "from-blue-500 to-indigo-600",
          border: "border-blue-300",
          text: "text-blue-700",
          bgLight: "bg-blue-50",
          iconBg: "bg-blue-100",
        };
      default:
        return {
          bg: "from-green-500 to-emerald-600",
          border: "border-green-300",
          text: "text-green-700",
          bgLight: "bg-green-50",
          iconBg: "bg-green-100",
        };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "important":
        return <AlertCircle className="w-5 h-5" />;
      case "election":
        return <Megaphone className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeBanglaName = (type: string) => {
    switch (type) {
      case "important":
        return "জরুরি";
      case "election":
        return "নির্বাচন";
      default:
        return "সাধারণ";
    }
  };

  const formatDate = (dateInput: string | Date) => {
    try {
      const date =
        typeof dateInput === "string" ? new Date(dateInput) : dateInput;

      if (isNaN(date.getTime())) {
        return "তারিখ নেই";
      }

      return date.toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Date format error:", error);
      return "তারিখ নেই";
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-linear-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-[#006A4E] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-xl text-gray-600 font-semibold">
              নোটিশ লোড হচ্ছে...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (notices.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-linear-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-[#006A4E]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-[#F42A41]/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-green-100 to-red-100 rounded-full mb-6 shadow-lg"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bell className="w-6 h-6 text-[#006A4E]" />
            </motion.div>
            <span className="font-bold text-gray-700 text-lg">
              সাম্প্রতিক নোটিশ
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-[#006A4E] via-emerald-600 to-[#F42A41] bg-clip-text text-transparent">
            গুরুত্বপূর্ণ ঘোষণা
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            সর্বশেষ খবর এবং আপডেট সম্পর্কে অবগত থাকুন
          </p>
        </motion.div>

        {/* Notice Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {notices.map((notice, index) => {
            const typeColors = getTypeColor(notice.type);
            return (
              <motion.div
                key={notice._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border-2 border-gray-100"
              >
                {/* Priority indicator */}
                {notice.priority > 7 && (
                  <div className="absolute top-6 right-6 z-10">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-linear-to-br from-yellow-400 to-orange-500 text-white p-3 rounded-full shadow-2xl"
                    >
                      <Star className="w-5 h-5" fill="currentColor" />
                    </motion.div>
                  </div>
                )}

                {/* Gradient top bar */}
                <div className={`h-3 bg-linear-to-r ${typeColors.bg}`} />

                <div className="p-8">
                  {/* Type badge */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`flex items-center gap-3 px-5 py-3 ${typeColors.bgLight} rounded-xl border-2 ${typeColors.border} shadow-sm`}
                    >
                      <div
                        className={`${typeColors.iconBg} p-2 rounded-lg ${typeColors.text}`}
                      >
                        {getTypeIcon(notice.type)}
                      </div>
                      <span className={`text-sm font-bold ${typeColors.text}`}>
                        {getTypeBanglaName(notice.type)}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-[#006A4E] transition-colors">
                    {notice.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-lg mb-6 line-clamp-3 leading-relaxed">
                    {notice.description}
                  </p>

                  {/* Meta information */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-[#006A4E]" />
                      </div>
                      <span className="font-semibold">
                        {formatDate(notice.date)}
                      </span>
                    </div>

                    {notice.time && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <Clock className="w-5 h-5 text-[#F42A41]" />
                        </div>
                        <span className="font-semibold">{notice.time}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-semibold line-clamp-1">
                        {notice.location}
                      </span>
                    </div>
                  </div>

                  {/* Read more link */}
                  <Link
                    href={`/notices/${notice._id}`}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-[#006A4E] to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all group/link"
                  >
                    <span>বিস্তারিত পড়ুন</span>
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Decorative corner */}
                <div
                  className={`absolute -bottom-16 -right-16 w-40 h-40 bg-linear-to-br ${typeColors.bg} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700`}
                />

                {/* Animated particles */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/notices">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group px-12 py-6 bg-linear-to-r from-[#006A4E] to-[#F42A41] text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-4"
            >
              <Bell className="w-7 h-7" />
              <span>সকল নোটিশ দেখুন</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeNoticeSection;
