// app/campaigns/page.tsx - Public Campaigns Page
"use client";

import {
  Campaign,
  CampaignStatus,
  CampaignType,
} from "@/app/interfaces/campaign";
import { bn, formatDate } from "@/app/interfaces/languageUtils";
import { campaignService } from "@/app/lib/api/campaignService";

import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function CampaignsPublicPage() {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [activeFilter, setActiveFilter] = useState<CampaignStatus | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch campaigns
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await campaignService.fetchAllCampaigns();

      if (response.success && response.campaigns) {
        const activeCampaigns = response.campaigns.filter(
          (campaign) => campaign.status !== "CANCELLED",
        );
        setCampaigns(activeCampaigns);
        setFilteredCampaigns(activeCampaigns);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter handlers
  const handleFilterChange = (filter: CampaignStatus | "all") => {
    setActiveFilter(filter);

    if (filter === "all") {
      setFilteredCampaigns(campaigns);
    } else {
      setFilteredCampaigns(campaigns.filter((c) => c.status === filter));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredCampaigns(campaigns);
      return;
    }

    const filtered = campaigns.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        campaign.location?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setFilteredCampaigns(filtered);
  };

  // Get status color and icon
  const getStatusConfig = (status: CampaignStatus) => {
    switch (status) {
      case "ONGOING":
        return {
          color: "bg-green-500",
          icon: <TrendingUp className="h-4 w-4" />,
          text: "text-green-700",
          bg: "bg-green-50",
        };
      case "UPCOMING":
        return {
          color: "bg-blue-500",
          icon: <Clock className="h-4 w-4" />,
          text: "text-blue-700",
          bg: "bg-blue-50",
        };
      case "COMPLETED":
        return {
          color: "bg-purple-500",
          icon: <CheckCircle className="h-4 w-4" />,
          text: "text-purple-700",
          bg: "bg-purple-50",
        };
      default:
        return {
          color: "bg-gray-500",
          icon: <Award className="h-4 w-4" />,
          text: "text-gray-700",
          bg: "bg-gray-50",
        };
    }
  };

  // Get type config
  const getTypeConfig = (type: CampaignType) => {
    switch (type) {
      case "VOLUNTEER":
        return {
          icon: <Users className="h-4 w-4" />,
          label: "স্বেচ্ছাসেবক",
          color: "bg-indigo-100 text-indigo-800",
        };
      case "EVENT":
        return {
          icon: <Calendar className="h-4 w-4" />,
          label: "ইভেন্ট",
          color: "bg-amber-100 text-amber-800",
        };
      case "SOCIAL_ACTIVITY":
        return {
          icon: <Award className="h-4 w-4" />,
          label: "সামাজিক কার্যক্রম",
          color: "bg-cyan-100 text-cyan-800",
        };
      default:
        return {
          icon: <Award className="h-4 w-4" />,
          label: type,
          color: "bg-gray-100 text-gray-800",
        };
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative  bg-linear-to-r from-green-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              সমাজ পরিবর্তনের ক্যাম্পেইনে অংশ নিন
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              স্বেচ্ছাসেবক হন, ইভেন্টে যোগ দিন, এবং সামাজিক উন্নয়নে ভূমিকা
              রাখুন
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="কী ধরনের ক্যাম্পেইনে অংশ নিতে চান?"
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-white text-lg font-semi-bold focus:ring-2 focus:ring-white focus:outline-none"
                  />
                </div>
              </form>
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-lg">
                ক্যাম্পেইন খুঁজুন
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {campaigns.length}
            </div>
            <div className="text-gray-600">সক্রিয় ক্যাম্পেইন</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {campaigns.filter((c) => c.status === "ONGOING").length}
            </div>
            <div className="text-gray-600">চলমান</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {campaigns.filter((c) => c.status === "UPCOMING").length}
            </div>
            <div className="text-gray-600">আসন্ন</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {campaigns.filter((c) => c.status === "COMPLETED").length}
            </div>
            <div className="text-gray-600">সম্পন্ন</div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ক্যাম্পেইন ব্রাউজ করুন
          </h2>
          <div className="flex flex-wrap gap-4">
            {(["all", "ONGOING", "UPCOMING", "COMPLETED"] as const).map(
              (filter) => {
                const statusConfig = getStatusConfig(filter as CampaignStatus);
                return (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      activeFilter === filter
                        ? filter === "all"
                          ? "bg-gray-900 text-white"
                          : `${statusConfig.bg} ${statusConfig.text}`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter === "all" ? "সব ক্যাম্পেইন" : bn(filter)}
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* Campaigns Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-32 w-32 text-gray-300 mb-6">
              <Award className="h-full w-full" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              কোনো ক্যাম্পেইন পাওয়া যায়নি
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              {searchQuery || activeFilter !== "all"
                ? "আপনার সার্চ বা ফিল্টারের সাথে মিলিয়ে কোনো ক্যাম্পেইন নেই"
                : "এখনও কোনো ক্যাম্পেইন তৈরি করা হয়নি"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign) => {
              const statusConfig = getStatusConfig(campaign.status);
              const typeConfig = getTypeConfig(campaign.type);

              return (
                <div
                  key={campaign._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:-translate-y-1"
                >
                  {/* Campaign Image */}
                  <div className="relative h-56">
                    {campaign.images?.[0] ? (
                      <Image
                        src={campaign.images[0].url}
                        alt={campaign.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <Award className="h-20 w-20 text-blue-300" />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`${statusConfig.bg} ${statusConfig.text} px-4 py-2 rounded-full font-medium flex items-center gap-2`}
                      >
                        {statusConfig.icon}
                        {bn(campaign.status)}
                      </div>
                    </div>
                  </div>

                  {/* Campaign Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${typeConfig.color}`}
                        >
                          {typeConfig.icon}
                          {typeConfig.label}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {campaign.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {campaign.description}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>শুরু: {formatDate(campaign.startDate)}</span>
                      </div>

                      {campaign.endDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>শেষ: {formatDate(campaign.endDate)}</span>
                        </div>
                      )}

                      {campaign.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{campaign.location}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="font-medium">
                          {campaign.registeredVolunteers || 0} জন স্বেচ্ছাসেবক
                          অংশগ্রহণ করেছেন
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                      ক্যাম্পেইনে যোগ দিন
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ক্যাম্পেইনে কেন অংশ নেবেন?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">সম্প্রদায় গঠন</h3>
              <p className="text-gray-600">
                নতুন মানুষের সাথে পরিচিত হন এবং সামাজিক বন্ধন শক্তিশালী করুন
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">দক্ষতা উন্নয়ন</h3>
              <p className="text-gray-600">
                নতুন দক্ষতা শিখুন এবং আপনার অভিজ্ঞতা সমৃদ্ধ করুন
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">সামাজিক প্রভাব</h3>
              <p className="text-gray-600">
                সমাজের ইতিবাচক পরিবর্তনে সরাসরি ভূমিকা রাখুন
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">ক্যাম্পেইন প্লাটফর্ম</span>
              </div>
              <p className="text-gray-400">
                সামাজিক উন্নয়ন এবং স্বেচ্ছাসেবক কার্যক্রমের কেন্দ্রীয়
                প্লাটফর্ম
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">ক্যাম্পেইন</h4>
              <ul className="space-y-2 text-gray-400">
                <li>চলমান ক্যাম্পেইন</li>
                <li>আসন্ন ইভেন্ট</li>
                <li>সম্পন্ন কার্যক্রম</li>
                <li>স্বেচ্ছাসেবক হন</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">সম্পর্কিত</h4>
              <ul className="space-y-2 text-gray-400">
                <li>সাধারণ জিজ্ঞাসা</li>
                <li>যোগাযোগ</li>
                <li>প্রাইভেসি পলিসি</li>
                <li>শর্তাবলী</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">সংযোগ</h4>
              <p className="text-gray-400 mb-4">
                সর্বশেষ ক্যাম্পেইন আপডেট পেতে ইমেইল ঠিকানা দিন
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
                  সাবস্ক্রাইব
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>
              © {new Date().getFullYear()} ক্যাম্পেইন প্লাটফর্ম. সর্বস্বত্ব
              সংরক্ষিত.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
