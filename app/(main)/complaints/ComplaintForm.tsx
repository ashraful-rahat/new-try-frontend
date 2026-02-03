"use client";

import axiosInstance from "@/app/utils/axios";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Loader2,
  MapPin,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    complaintType: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [complaintId, setComplaintId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosInstance.post("/complaints/create", formData);

      if (response.data.success) {
        setComplaintId(response.data.complaint.complaintId);
        setMessage("অভিযোগ সফলভাবে জমা হয়েছে!");
        setFormData({
          name: "",
          phone: "",
          area: "",
          complaintType: "",
          details: "",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "ত্রুটি হয়েছে, আবার চেষ্টা করুন",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {message && (
        <div
          className={`p-4 rounded-lg border ${message.includes("সফলভাবে") ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
        >
          <div className="flex items-start">
            {message.includes("সফলভাবে") ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p
                className={`font-medium ${message.includes("সফলভাবে") ? "text-green-800" : "text-red-800"}`}
              >
                {message}
              </p>
              {complaintId && (
                <div className="mt-2">
                  <p className="text-sm text-green-700">আপনার অভিযোগ আইডি:</p>
                  <div className="mt-1 inline-flex items-center bg-gradient-to-r from-green-600 to-red-600 text-white font-bold px-4 py-2 rounded-lg">
                    <FileText className="w-4 h-4 mr-2" />
                    {complaintId}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    এই আইডি দিয়ে পরবর্তীতে অভিযোগের অবস্থা ট্র্যাক করতে পারবেন।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-gray-800 font-semibold flex items-center">
              <User className="w-4 h-4 mr-2 text-gray-600" />
              আপনার নাম
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="আপনার পূর্ণ নাম"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="block text-gray-800 font-semibold flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-600" />
              মোবাইল নম্বর
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{11}"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="017XXXXXXXX"
            />
            <p className="text-xs text-gray-500">১১ ডিজিটের মোবাইল নম্বর দিন</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Area Field */}
          <div className="space-y-2">
            <label className="block text-gray-800 font-semibold flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-600" />
              এলাকা
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="আপনার এলাকার নাম"
            />
            <p className="text-xs text-gray-500">যেমন: মিরপুর, ঢাকা</p>
          </div>

          {/* Complaint Type */}
          <div className="space-y-2">
            <label className="text-gray-800 font-semibold flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-gray-600" />
              অভিযোগের ধরন
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none bg-white"
            >
              <option value="">ধরন নির্বাচন করুন</option>
              <option value="রাস্তা">রাস্তার সমস্যা</option>
              <option value="বিদ্যুৎ">বিদ্যুৎ সমস্যা</option>
              <option value="পানি">পানি সমস্যা</option>
              <option value="স্বাস্থ্য">স্বাস্থ্য সেবা</option>
              <option value="শিক্ষা">শিক্ষা সমস্যা</option>
              <option value="অন্যান্য">অন্যান্য</option>
            </select>
          </div>
        </div>

        {/* Details Field */}
        <div className="space-y-2">
          <label className="block text-gray-800 font-semibold items-center">
            <FileText className="w-4 h-4 mr-2 text-gray-600" />
            বিস্তারিত বিবরণ
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
            placeholder="আপনার অভিযোগের পূর্ণ বিবরণ লিখুন। সমস্যার অবস্থান, সময়কাল, এবং প্রভাব বর্ণনা করুন।"
          />
          <p className="text-xs text-gray-500">
            বিস্তারিত বিবরণ দিলে সমাধান সহজ হয়
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 shadow-lg hover:shadow-xl active:scale-[0.98]"
            } text-white`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                জমা দেওয়া হচ্ছে...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 mr-3" />
                অভিযোগ জমা দিন
              </>
            )}
          </button>
        </div>

        {/* Form Note */}
        <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
          <p className="flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
            <span>
              সবগুলো ফিল্ড (<span className="text-red-500">*</span>) পূরণ করা
              আবশ্যক
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
