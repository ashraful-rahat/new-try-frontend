// app/components/dashboard/NoticeActions.tsx
"use client";

import {
  CreateNoticeDTO,
  NoticeType,
  SimpleNotice,
  UpdateNoticeDTO,
} from "@/app/interfaces/notice";
import { noticeService } from "@/app/lib/api/noticeService";
import { sweetAlert } from "@/app/utils/sweetAlert";
import {
  AlertCircle,
  Bell,
  Calendar,
  Clock,
  FileText,
  Loader2,
  MapPin,
  Megaphone,
  Save,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface NoticeActionsProps {
  notice?: SimpleNotice | null;
  open: boolean;
  mode: "create" | "edit";
  onClose: () => void;
  onSuccess: () => void;
}

const NoticeActions: React.FC<NoticeActionsProps> = ({
  notice,
  open,
  mode,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateNoticeDTO | UpdateNoticeDTO>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    type: "daily",
    priority: 0,
  });

  // Notice types
  const noticeTypes = [
    { value: "daily", label: "দৈনন্দিন", icon: Bell },
    { value: "important", label: "গুরুত্বপূর্ণ", icon: AlertCircle },
    { value: "election", label: "নির্বাচনী", icon: Megaphone },
  ];

  // Initialize form with notice data for edit mode
  useEffect(() => {
    if (mode === "edit" && notice) {
      setFormData({
        title: notice.title,
        description: notice.description,
        date: new Date(notice.date).toISOString().split("T")[0],
        time: notice.time || "",
        location: notice.location,
        type: notice.type,
        priority: notice.priority,
      });
    } else {
      // Reset for create mode
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        location: "",
        type: "daily",
        priority: 0,
      });
    }
  }, [notice, mode, open]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "priority") {
      const numValue = value === "" ? 0 : parseInt(value);
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.title || formData.title.length < 3) {
      sweetAlert.error("ত্রুটি", "শিরোনাম কমপক্ষে ৩ অক্ষরের হতে হবে");
      return false;
    }

    if (!formData.description || formData.description.length < 10) {
      sweetAlert.error("ত্রুটি", "বিবরণ কমপক্ষে ১০ অক্ষরের হতে হবে");
      return false;
    }

    if (!formData.date) {
      sweetAlert.error("ত্রুটি", "তারিখ দিন");
      return false;
    }

    if (!formData.location) {
      sweetAlert.error("ত্রুটি", "লোকেশন দিন");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      let result;

      if (mode === "create") {
        result = await noticeService.createNotice(formData as CreateNoticeDTO);
      } else {
        if (!notice) return;
        result = await noticeService.updateNotice(
          notice._id,
          formData as UpdateNoticeDTO,
        );
      }

      if (result.success) {
        sweetAlert.success(
          "সফল হয়েছে!",
          mode === "create"
            ? "নোটিশ তৈরি করা হয়েছে"
            : "নোটিশ আপডেট করা হয়েছে",
        );
        onSuccess();
        onClose();
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      sweetAlert.error("ত্রুটি", error.message || "কাজটি সম্পন্ন করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  {mode === "create" ? (
                    <Bell className="h-6 w-6 text-white" />
                  ) : (
                    <FileText className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {mode === "create"
                      ? "নতুন নোটিশ তৈরি করুন"
                      : "নোটিশ সম্পাদনা করুন"}
                  </h2>
                  <p className="text-blue-200 text-sm">
                    {mode === "create"
                      ? "নতুন নোটিশের তথ্য দিন"
                      : notice?.title}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto max-h-[calc(90vh-80px)]"
          >
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  মৌলিক তথ্য
                </h3>

                <div className="space-y-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      নোটিশের শিরোনাম *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="নোটিশের শিরোনাম লিখুন"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      বিস্তারিত বিবরণ *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="নোটিশের বিস্তারিত বিবরণ লিখুন"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Date & Location */}
              <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  তারিখ ও অবস্থান
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Date */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      তারিখ *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date as string}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      সময় (ঐচ্ছিক)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="time"
                        name="time"
                        value={formData.time || ""}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      অবস্থান *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="নোটিশের অবস্থান"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Type & Priority */}
              <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-purple-600" />
                  ধরন ও অগ্রাধিকার
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      নোটিশের ধরন
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {noticeTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                type: type.value as NoticeType,
                              }))
                            }
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                              formData.type === type.value
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                            }`}
                          >
                            <Icon className="h-5 w-5 mb-1" />
                            <span className="text-xs font-medium">
                              {type.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      অগ্রাধিকার (০-১০)
                    </label>
                    <input
                      type="range"
                      name="priority"
                      min="0"
                      max="10"
                      value={formData.priority || 0}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>নিম্ন ({formData.priority || 0})</span>
                      <span className="font-medium">অগ্রাধিকার স্তর</span>
                      <span>উচ্চ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                  disabled={loading}
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      সংরক্ষণ হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {mode === "create" ? "নোটিশ তৈরি করুন" : "সংরক্ষণ করুন"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoticeActions;
