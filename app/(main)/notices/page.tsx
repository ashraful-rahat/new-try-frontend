// app/notices/page.tsx
"use client";

import { SimpleNotice } from "@/app/interfaces/notice";
import { noticeService } from "@/app/lib/api/notice";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Bell,
  Calendar,
  Clock,
  Filter,
  MapPin,
  Megaphone,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const NoticesPage = () => {
  const [notices, setNotices] = useState<SimpleNotice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<SimpleNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [mounted, setMounted] = useState(false); // ✅ Add this

  // ✅ Fix hydration - only show animations after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await noticeService.getAllNotices();
        setNotices(data);
        setFilteredNotices(data);
      } catch (error) {
        console.error("Error loading notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    let filtered = notices;

    if (selectedType !== "all") {
      filtered = filtered.filter((notice) => notice.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (notice) =>
          notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notice.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    filtered = filtered.sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setFilteredNotices(filtered);
  }, [searchTerm, selectedType, notices]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const typeStats = {
    all: notices.length,
    important: notices.filter((n) => n.type === "important").length,
    election: notices.filter((n) => n.type === "election").length,
    daily: notices.filter((n) => n.type === "daily").length,
  };

  // ✅ Fixed particle positions - now constant
  const particlePositions = [
    { left: 15, top: 20 },
    { left: 35, top: 45 },
    { left: 55, top: 15 },
    { left: 75, top: 60 },
    { left: 25, top: 75 },
    { left: 65, top: 35 },
    { left: 45, top: 85 },
    { left: 85, top: 25 },
    { left: 10, top: 50 },
    { left: 50, top: 10 },
    { left: 90, top: 70 },
    { left: 30, top: 30 },
    { left: 70, top: 80 },
    { left: 20, top: 65 },
    { left: 60, top: 40 },
    { left: 40, top: 90 },
    { left: 80, top: 55 },
    { left: 5, top: 85 },
    { left: 95, top: 15 },
    { left: 12, top: 95 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#006A4E] via-emerald-700 to-[#F42A41] overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* ✅ Fixed Floating particles - only show after mount */}
        {mounted && (
          <div className="absolute inset-0">
            {particlePositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: (i % 4) * 0.5,
                }}
              />
            ))}
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl border-2 border-white/30">
                <Bell className="w-20 h-20" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              সকল নোটিশ ও ঘোষণা
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              দলীয় সকল গুরুত্বপূর্ণ তথ্য এবং আপডেট এক জায়গায়
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              {[
                { label: "মোট নোটিশ", count: typeStats.all, icon: <Bell /> },
                {
                  label: "জরুরি",
                  count: typeStats.important,
                  icon: <AlertCircle />,
                },
                {
                  label: "নির্বাচন",
                  count: typeStats.election,
                  icon: <Megaphone />,
                },
                {
                  label: "সাধারণ",
                  count: typeStats.daily,
                  icon: <Sparkles />,
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20"
                >
                  <div className="text-white mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.count}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b-2 border-gray-100 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xl w-full">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="নোটিশ খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#006A4E] focus:outline-none transition-all text-lg shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Type Filters */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="flex items-center gap-2 text-gray-600 font-bold text-lg">
                <Filter className="w-6 h-6" />
                <span>ফিল্টার:</span>
              </div>

              {[
                { value: "all", label: "সব", count: typeStats.all },
                {
                  value: "important",
                  label: "জরুরি",
                  count: typeStats.important,
                },
                {
                  value: "election",
                  label: "নির্বাচন",
                  count: typeStats.election,
                },
                { value: "daily", label: "সাধারণ", count: typeStats.daily },
              ].map((filter) => (
                <motion.button
                  key={filter.value}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(filter.value)}
                  className={`px-6 py-3 rounded-xl font-bold text-base transition-all shadow-md ${
                    selectedType === filter.value
                      ? "bg-gradient-to-r from-[#006A4E] to-[#F42A41] text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter.label} ({filter.count})
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notices Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-32">
              <div className="animate-spin w-20 h-20 border-4 border-[#006A4E] border-t-transparent rounded-full mx-auto mb-6" />
              <p className="text-2xl text-gray-600 font-semibold">
                নোটিশ লোড হচ্ছে...
              </p>
            </div>
          ) : filteredNotices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 bg-gray-50 rounded-3xl"
            >
              <div className="bg-gray-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
                <Bell className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-600 mb-4">
                কোন নোটিশ পাওয়া যায়নি
              </h3>
              <p className="text-xl text-gray-500">
                অন্য ফিল্টার বা সার্চ টার্ম ব্যবহার করে দেখুন
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 text-center"
              >
                <p className="text-xl text-gray-600">
                  <span className="font-bold text-[#006A4E] text-2xl">
                    {filteredNotices.length}
                  </span>{" "}
                  টি নোটিশ পাওয়া গেছে
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNotices.map((notice, index) => {
                  const typeColors = getTypeColor(notice.type);
                  return (
                    <motion.div
                      key={notice._id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border-2 border-gray-100"
                    >
                      {notice.priority > 7 && (
                        <div className="absolute top-5 right-5 z-10">
                          <motion.div
                            animate={{
                              rotate: [0, 15, -15, 0],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-3 rounded-full shadow-2xl"
                          >
                            <Star className="w-5 h-5" fill="currentColor" />
                          </motion.div>
                        </div>
                      )}

                      <div
                        className={`h-3 bg-gradient-to-r ${typeColors.bg}`}
                      />

                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-5">
                          <div
                            className={`flex items-center gap-3 px-5 py-3 ${typeColors.bgLight} rounded-xl border-2 ${typeColors.border}`}
                          >
                            <div
                              className={`${typeColors.iconBg} p-2 rounded-lg ${typeColors.text}`}
                            >
                              {getTypeIcon(notice.type)}
                            </div>
                            <span
                              className={`text-sm font-bold ${typeColors.text}`}
                            >
                              {getTypeBanglaName(notice.type)}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-[#006A4E] transition-colors">
                          {notice.title}
                        </h3>

                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                          {notice.description}
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-gray-600">
                            <div className="bg-green-100 p-2 rounded-lg">
                              <Calendar className="w-5 h-5 text-[#006A4E]" />
                            </div>
                            <span className="font-semibold text-sm">
                              {formatDate(notice.date)}
                            </span>
                          </div>

                          {notice.time && (
                            <div className="flex items-center gap-3 text-gray-600">
                              <div className="bg-red-100 p-2 rounded-lg">
                                <Clock className="w-5 h-5 text-[#F42A41]" />
                              </div>
                              <span className="font-semibold text-sm">
                                {notice.time}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-3 text-gray-600">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-semibold text-sm line-clamp-1">
                              {notice.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br ${typeColors.bg} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default NoticesPage;
