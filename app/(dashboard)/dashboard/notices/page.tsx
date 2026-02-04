// app/dashboard/notices/page.tsx
"use client";

import { NoticeType, SimpleNotice } from "@/app/interfaces/notice";
import { noticeService } from "@/app/lib/api/noticeService";

import { formatDate } from "@/app/interfaces/languageUtils";
import {
  AlertCircle,
  Bell,
  Calendar,
  Clock,
  Edit,
  FileText,
  MapPin,
  Megaphone,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import NoticeActions from "./NoticeActions"; // ✅ Correct import
import NoticeFilters from "./NoticeFilters";

export default function NoticesDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState<SimpleNotice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<SimpleNotice[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedNotice, setSelectedNotice] = useState<SimpleNotice | null>(
    null,
  );
  const [activeFilter, setActiveFilter] = useState<NoticeType | "all">("all");

  // Fetch notices on mount
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await noticeService.fetchAllNotices();

      if (response.success && response.notices) {
        setNotices(response.notices);
        setFilteredNotices(response.notices);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type: NoticeType | "all") => {
    setActiveFilter(type);

    if (type === "all") {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(notices.filter((notice) => notice.type === type));
    }
  };

  const handleSearch = (searchText: string) => {
    if (!searchText.trim()) {
      setFilteredNotices(notices);
      return;
    }

    const filtered = notices.filter(
      (notice) =>
        notice.title.toLowerCase().includes(searchText.toLowerCase()) ||
        notice.description.toLowerCase().includes(searchText.toLowerCase()) ||
        notice.location.toLowerCase().includes(searchText.toLowerCase()),
    );

    setFilteredNotices(filtered);
  };

  const handleCreateNotice = () => {
    setModalMode("create");
    setSelectedNotice(null);
    setModalOpen(true);
  };

  const handleEditNotice = (id: string) => {
    const notice = notices.find((n) => n._id === id);
    if (notice) {
      setModalMode("edit");
      setSelectedNotice(notice);
      setModalOpen(true);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    const result = await noticeService.deleteNotice(id);
    if (result.success) {
      fetchNotices();
    }
  };

  const handleNoticeSuccess = () => {
    setModalOpen(false);
    fetchNotices();
  };

  const getTypeColor = (type: NoticeType) => {
    switch (type) {
      case "election":
        return "bg-red-100 text-red-800";
      case "important":
        return "bg-yellow-100 text-yellow-800";
      case "daily":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: NoticeType) => {
    switch (type) {
      case "election":
        return "নির্বাচনী";
      case "important":
        return "গুরুত্বপূর্ণ";
      case "daily":
        return "দৈনন্দিন";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              নোটিশ ম্যানেজমেন্ট
            </h1>
            <p className="text-gray-600 mt-1">
              সকল নোটিশ দেখুন, তৈরি করুন এবং ম্যানেজ করুন
            </p>
          </div>

          <button
            onClick={handleCreateNotice}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-medium transition-all shadow-lg"
          >
            <Plus className="h-4 w-4" />
            নতুন নোটিশ
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-600 to-green-800 text-white rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">মোট নোটিশ</p>
                <p className="text-3xl font-bold mt-2">{notices.length}</p>
              </div>
              <Bell className="h-10 w-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">আজকের নোটিশ</p>
                <p className="text-3xl font-bold mt-2">
                  {
                    notices.filter(
                      (n) =>
                        new Date(n.date).toDateString() ===
                        new Date().toDateString(),
                    ).length
                  }
                </p>
              </div>
              <Calendar className="h-10 w-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 text-white rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">গুরুত্বপূর্ণ</p>
                <p className="text-3xl font-bold mt-2">
                  {notices.filter((n) => n.type === "important").length}
                </p>
              </div>
              <AlertCircle className="h-10 w-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">নির্বাচনী</p>
                <p className="text-3xl font-bold mt-2">
                  {notices.filter((n) => n.type === "election").length}
                </p>
              </div>
              <Megaphone className="h-10 w-10 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <NoticeFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={() => {
            setActiveFilter("all");
            setFilteredNotices(notices);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <FileText className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              কোনো নোটিশ নেই
            </h3>
            <p className="text-gray-500 mb-4">
              {activeFilter === "all"
                ? "এখনও কোনো নোটিশ তৈরি করা হয়নি"
                : "এই ক্যাটাগরিতে কোনো নোটিশ নেই"}
            </p>
            <button
              onClick={handleCreateNotice}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              প্রথম নোটিশ তৈরি করুন
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice._id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {notice.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(notice.type)}`}
                      >
                        {getTypeLabel(notice.type)}
                      </span>
                      {notice.priority > 5 && (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                          <TrendingUp className="h-3 w-3" />
                          উচ্চ অগ্রাধিকার
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-3">
                      {notice.description.length > 150
                        ? `${notice.description.substring(0, 150)}...`
                        : notice.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(notice.date)}
                      </div>
                      {notice.time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {notice.time}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {notice.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditNotice(notice._id)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="সম্পাদনা"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(notice._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="মুছুন"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Notice Modal */}
      <NoticeActions
        notice={selectedNotice}
        open={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        onSuccess={handleNoticeSuccess}
      />
    </div>
  );
}
