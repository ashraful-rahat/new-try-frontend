"use client";

import {
  CheckCircle,
  Clock,
  Filter,
  MessageSquare,
  Plus,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const complaints = [
  {
    id: 1,
    title: "রাস্তা মেরামত",
    user: "রফিক ইসলাম",
    date: "২০২৪-০১-১৫",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    title: "বিদ্যুৎ সমস্যা",
    user: "সুমন আলী",
    date: "২০২৪-০১-১৪",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: 3,
    title: "পানি সরবরাহ",
    user: "আনিকা আহমেদ",
    date: "২০২৪-০১-১৩",
    status: "resolved",
    priority: "low",
  },
  {
    id: 4,
    title: "ড্রেনেজ সমস্যা",
    user: "মেহেদী হাসান",
    date: "২০২৪-০১-১২",
    status: "pending",
    priority: "high",
  },
  {
    id: 5,
    title: "সুবিধা ভবন",
    user: "নাজনীন আক্তার",
    date: "২০২৪-০১-১১",
    status: "rejected",
    priority: "medium",
  },
];

export default function ComplaintsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            অভিযোগ ব্যবস্থাপনা
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            সব অভিযোগ দেখুন এবং ব্যবস্থাপনা করুন
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition">
          <Plus className="h-5 w-5" />
          নতুন অভিযোগ
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setSelectedFilter("all")}
          className={`px-4 py-2 rounded-lg ${selectedFilter === "all" ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
        >
          সব অভিযোগ
        </button>
        <button
          onClick={() => setSelectedFilter("pending")}
          className={`px-4 py-2 rounded-lg ${selectedFilter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
        >
          পেন্ডিং
        </button>
        <button
          onClick={() => setSelectedFilter("in-progress")}
          className={`px-4 py-2 rounded-lg ${selectedFilter === "in-progress" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
        >
          প্রক্রিয়াধীন
        </button>
        <button
          onClick={() => setSelectedFilter("resolved")}
          className={`px-4 py-2 rounded-lg ${selectedFilter === "resolved" ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
        >
          সমাধানকৃত
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="অভিযোগ খুঁজুন..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2">
            <Filter className="h-5 w-5" />
            ফিল্টার
          </button>
          <button className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2">
            এক্সপোর্ট
          </button>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  আইডি
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  শিরোনাম
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ব্যবহারকারী
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  তারিখ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  অবস্থা
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {complaints.map((complaint) => (
                <tr
                  key={complaint.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      #{complaint.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {complaint.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {complaint.user}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {complaint.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        complaint.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : complaint.status === "in-progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : complaint.status === "resolved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {complaint.status === "pending" && (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {complaint.status === "in-progress" && (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {complaint.status === "resolved" && (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {complaint.status === "rejected" && (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3">
                      দেখুন
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      এডিট
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-400">
          পৃষ্ঠা <span className="font-medium">1</span> এর{" "}
          <span className="font-medium">1</span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg">
            পূর্ববর্তী
          </button>
          <button className="px-3 py-1 bg-green-600 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg">
            পরবর্তী
          </button>
        </div>
      </div>
    </div>
  );
}
