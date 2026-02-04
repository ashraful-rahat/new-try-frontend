"use client";
import { Campaign, CampaignStats } from "@/app/interfaces/campaign";
import { bn, formatNumber } from "@/app/interfaces/languageUtils";
import Image from "next/image";

import { sweetAlert } from "@/app/utils/sweetAlert";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Edit2,
  Eye,
  RefreshCw,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";

interface StatsSectionProps {
  stats: CampaignStats;
  campaigns: Campaign[];
  loading?: boolean;
  onRefresh?: () => void;
  onViewCampaign?: (id: string) => void;
  onEditCampaign?: (id: string) => void;
  onDeleteCampaign?: (id: string) => void;
  onStatusFilter?: (status: string) => void;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  campaigns,
  loading = false,
  onRefresh,
  onViewCampaign,
  onEditCampaign,
  onDeleteCampaign,
  onStatusFilter,
}) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "ONGOING":
        return "bg-green-100 text-green-800 border border-green-300";
      case "UPCOMING":
        return "bg-red-100 text-red-800 border border-red-300";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800 border border-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "VOLUNTEER":
        return "bg-purple-100 text-purple-800";
      case "EVENT":
        return "bg-indigo-100 text-indigo-800";
      case "SOCIAL_ACTIVITY":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteCampaign = async (id: string, title: string) => {
    const result = await sweetAlert.confirm(
      "ক্যাম্পেইন মুছুন",
      `আপনি কি "${title}" ক্যাম্পেইনটি মুছতে চান?`,
      "হ্যাঁ, মুছুন",
      "না, বাতিল",
    );

    if (result.isConfirmed && onDeleteCampaign) {
      onDeleteCampaign(id);
    }
  };

  const statsCards = [
    {
      title: "মোট ক্যাম্পেইন",
      value: stats.total,
      icon: TrendingUp,
      color: "bg-gradient-to-br from-green-600 to-green-800",
      textColor: "text-white",
      onClick: () => onStatusFilter && onStatusFilter("ALL"),
    },
    {
      title: "চলমান",
      value: stats.ongoing,
      icon: Users,
      color: "bg-gradient-to-br from-green-500 to-green-700",
      textColor: "text-white",
      onClick: () => onStatusFilter && onStatusFilter("ONGOING"),
    },
    {
      title: "আসন্ন",
      value: stats.upcoming,
      icon: Calendar,
      color: "bg-gradient-to-br from-red-500 to-red-700",
      textColor: "text-white",
      onClick: () => onStatusFilter && onStatusFilter("UPCOMING"),
    },
    {
      title: "সম্পন্ন",
      value: stats.completed,
      icon: CheckCircle,
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      textColor: "text-white",
      onClick: () => onStatusFilter && onStatusFilter("COMPLETED"),
    },
    {
      title: "বাতিল",
      value: stats.cancelled,
      icon: AlertCircle,
      color: "bg-gradient-to-br from-gray-500 to-gray-700",
      textColor: "text-white",
      onClick: () => onStatusFilter && onStatusFilter("CANCELLED"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            onClick={stat.onClick}
            className={`${stat.color} ${stat.textColor} rounded-xl p-5 shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">
                  {formatNumber(stat.value)}
                </p>
              </div>
              <stat.icon className="h-10 w-10 opacity-80" />
            </div>
            <div className="mt-3 h-1 w-full bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white bg-opacity-70 rounded-full"
                style={{ width: `${(stat.value / (stats.total || 1)) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-800">সকল ক্যাম্পেইন</h2>
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            {formatNumber(campaigns.length)} টি
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              রিফ্রেশ
            </button>
          )}
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <AlertCircle className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              কোনো ক্যাম্পেইন নেই
            </h3>
            <p className="text-gray-500">এখনও কোনো ক্যাম্পেইন তৈরি করা হয়নি</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-green-700 to-green-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    ক্যাম্পেইন
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    স্ট্যাটাস
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    টাইপ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    তারিখ
                  </th>
                  <th
                    scope="col"
                    className="px6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    ভলান্টিয়ার
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    কার্যক্রম
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr
                    key={campaign._id}
                    className="hover:bg-green-50 transition-colors cursor-pointer"
                    onClick={() =>
                      onViewCampaign && onViewCampaign(campaign._id)
                    }
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {campaign.images?.[0] ? (
                          <Image
                            src={campaign.images[0].url}
                            alt={campaign.title}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover mr-3"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mr-3">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {campaign.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {campaign.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(campaign.status)}`}
                      >
                        {bn(campaign.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeBadgeClass(campaign.type)}`}
                      >
                        {bn(campaign.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(campaign.startDate).toLocaleDateString("bn-BD")}
                      {campaign.endDate && (
                        <div className="text-gray-500 text-xs">
                          থেকে{" "}
                          {new Date(campaign.endDate).toLocaleDateString(
                            "bn-BD",
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="font-medium">
                          {campaign.registeredVolunteers || 0}
                        </span>
                        {campaign.volunteerLimit && (
                          <span className="text-gray-500 text-sm ml-1">
                            / {campaign.volunteerLimit}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="flex items-center space-x-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {onViewCampaign && (
                          <button
                            onClick={() => onViewCampaign(campaign._id)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            title="দেখুন"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        {onEditCampaign && (
                          <button
                            onClick={() => onEditCampaign(campaign._id)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="সম্পাদনা"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                        )}
                        {onDeleteCampaign && (
                          <button
                            onClick={() =>
                              handleDeleteCampaign(campaign._id, campaign.title)
                            }
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="মুছুন"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-2 sm:mb-0">
            সর্বশেষ আপডেট: {new Date().toLocaleString("bn-BD")}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">চলমান</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">আসন্ন</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">সম্পন্ন</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
