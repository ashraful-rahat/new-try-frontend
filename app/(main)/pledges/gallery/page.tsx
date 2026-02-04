// app/(main)/gallery/page.tsx
"use client";

import {
  Calendar,
  Camera,
  Download,
  Filter,
  Heart,
  MapPin,
  Share2,
} from "lucide-react";
import { useState } from "react";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Public folder images - আপনি যেভাবে ইমেজ add করবেন
  const images = [
    {
      id: 1,
      src: "/image/banner.jpg",
      title: "জনসভায় বক্তৃতা",
      category: "রাজনীতি",
      date: "২০২৪-০১-১০",
      location: "ফেনী স্টেডিয়াম",
    },
    {
      id: 2,
      src: "/image/banner.jpg",
      title: "উন্নয়ন প্রকল্প উদ্বোধন",
      category: "উন্নয়ন",
      date: "২০২৪-০১-০৫",
      location: "পরশুরাম",
    },
    {
      id: 3,
      src: "/image/banner.jpg",
      title: "শিক্ষা প্রতিষ্ঠান পরিদর্শন",
      category: "শিক্ষা",
      date: "২০২৩-১২-২০",
      location: "ছাগলনাইয়া",
    },
    {
      id: 4,
      src: "/image/banner.jpg",
      title: "মহিলাদের সাথে মতবিনিময়",
      category: "সামাজিক",
      date: "২০২৩-১২-১৫",
      location: "দাগনভূঁইয়া",
    },
    {
      id: 5,
      src: "/image/banner.jpg",
      title: "কৃষকদের সাথে আলোচনা",
      category: "কৃষি",
      date: "২০২৩-১২-১০",
      location: "ফুলগাজী",
    },
    {
      id: 6,
      src: "/image/banner.jpg",
      title: "স্বেচ্ছাসেবক দলের সাথে",
      category: "সামাজিক",
      date: "২০২৩-১২-০৫",
      location: "সোনাগাজী",
    },
    {
      id: 7,
      src: "/image/banner.jpg",
      title: "অফিসে কর্মীদের সাথে",
      category: "রাজনীতি",
      date: "২০২৩-১১-৩০",
      location: "ফেনী শহর",
    },
    {
      id: 8,
      src: "/image/banner.jpg",
      title: "তরুণদের সাথে আলোচনা",
      category: "যুব",
      date: "২০২৩-১১-২৫",
      location: "ফেনী কলেজ",
    },
  ];

  const categories = [
    "all",
    "রাজনীতি",
    "উন্নয়ন",
    "শিক্ষা",
    "সামাজিক",
    "কৃষি",
    "যুব",
  ];

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-white rounded-full shadow-lg mb-6">
            <Camera className="h-10 w-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">গ্যালারি</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            জনগণের সাথে আমার বিভিন্ন কর্মকাণ্ড, সভা-সমাবেশ ও উন্নয়ন কার্যক্রমের
            মুহূর্তগুলো।
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {images.length}
            </div>
            <div className="text-gray-700">মোট ছবি</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {new Set(images.map((img) => img.category)).size}
            </div>
            <div className="text-gray-700">বিভিন্ন বিভাগ</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">৬</div>
            <div className="text-gray-700">উপজেলা কভার</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              ২০২৩-বর্তমান
            </div>
            <div className="text-gray-700">সময়কাল</div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${
                activeFilter === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter className="h-4 w-4" />
              সব ছবি
            </button>
            {categories
              .filter((cat) => cat !== "all")
              .map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-xl font-medium ${
                    activeFilter === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                {/* Next.js Image Component - আপনার public folder এ ইমেজ add করবেন */}
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-white mb-2" />
                    <p className="text-white font-medium">{image.title}</p>
                    <p className="text-white/80 text-sm mt-1">গ্যালারি ইমেজ</p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Download className="h-5 w-5 text-white" />
                  </button>
                  <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Share2 className="h-5 w-5 text-white" />
                  </button>
                  <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Heart className="h-5 w-5 text-white" />
                  </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{image.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>{image.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{image.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Upload Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">আপনার ছবি শেয়ার করুন</h2>
              <p className="text-white/90 mb-6">
                আপনি যদি আমার সাথে কোন সভা, অনুষ্ঠান বা কর্মকাণ্ডের ছবি তুলে
                থাকেন, তাহলে আমাদের সাথে শেয়ার করতে পারেন। নির্বাচিত ছবি
                গ্যালারিতে প্রকাশ করা হবে।
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-colors">
                  ছবি আপলোড করুন
                </button>
                <button className="px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors">
                  শর্তাবলী দেখুন
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">ছবি আপলোডের নির্দেশনা</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                    ১
                  </div>
                  <span>ছবির সাইজ সর্বোচ্চ ৫MB</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                    ২
                  </div>
                  <span>JPEG বা PNG ফরম্যাট</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                    ৩
                  </div>
                  <span>স্পষ্ট ও ভালো কোয়ালিটি</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                    ৪
                  </div>
                  <span>সময় ও স্থানের বিবরণ দিন</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
