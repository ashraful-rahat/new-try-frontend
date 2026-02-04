// app/(main)/appointments/page.tsx
"use client";

import {
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState("২০২৪-০১-১৫");

  const timeSlots = [
    { time: "১০:০০ AM", available: true },
    { time: "১১:০০ AM", available: false },
    { time: "১২:০০ PM", available: true },
    { time: "২:০০ PM", available: true },
    { time: "৩:০০ PM", available: true },
    { time: "৪:০০ PM", available: false },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      name: "মোঃ রফিকুল ইসলাম",
      date: "২০২৪-০১-১৫",
      time: "১০:০০ AM",
      purpose: "সমস্যা নিয়ে আলোচনা",
      status: "নিশ্চিত",
    },
    {
      id: 2,
      name: "সালমা আক্তার",
      date: "২০২৪-০১-১৬",
      time: "১১:০০ AM",
      purpose: "সেবা প্রকল্প আবেদন",
      status: "পেন্ডিং",
    },
    {
      id: 3,
      name: "কামাল হোসেন",
      date: "২০২৪-০১-১৭",
      time: "৩:০০ PM",
      purpose: "এলাকার উন্নয়ন",
      status: "নিশ্চিত",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-white rounded-full shadow-lg mb-6">
            <Calendar className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            অ্যাপয়েন্টমেন্ট বুকিং
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            সরাসরি সাক্ষাতের জন্য সময় বুক করুন। জনগণের সমস্যা শোনা এবং সমাধানের
            জন্য প্রতি সপ্তাহে নির্দিষ্ট সময় বরাদ্দ রয়েছে।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Appointment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                নতুন অ্যাপয়েন্টমেন্ট
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পূর্ণ নাম
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="আপনার পূর্ণ নাম"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="০১XXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ইমেইল
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    বিষয়
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option>বিষয় নির্বাচন করুন</option>
                    <option>ব্যক্তিগত সমস্যা</option>
                    <option>এলাকার উন্নয়ন</option>
                    <option>সেবা প্রকল্প আবেদন</option>
                    <option>অন্যান্য</option>
                  </select>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  তারিখ নির্বাচন করুন
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {[
                    "২০২৪-০১-১৫",
                    "২০২৪-০১-১৬",
                    "২০২৪-০১-১৭",
                    "২০২৪-০১-১৮",
                    "২০২৪-০১-১৯",
                    "২০২৪-০১-২০",
                  ].map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`py-3 rounded-xl font-medium transition-colors ${
                        selectedDate === date
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {date.split("-")[2]} তারিখ
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  সময় স্লট নির্বাচন
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`py-4 rounded-xl font-medium transition-all ${
                        slot.available
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 cursor-not-allowed"
                      }`}
                      disabled={!slot.available}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="h-4 w-4" />
                        {slot.time}
                        {slot.available ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors">
                অ্যাপয়েন্টমেন্ট কনফার্ম করুন
              </button>
            </div>
          </div>

          {/* Right Column - Upcoming Appointments */}
          <div className="space-y-6">
            {/* Office Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                অফিস সময়
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">শনিবার - বৃহস্পতিবার</span>
                  <span className="font-medium">সকাল ১০টা - সন্ধ্যা ৬টা</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">শুক্রবার</span>
                  <span className="font-medium">সকাল ১০টা - দুপুর ১টা</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>অফিস: ফেনী শহর, রাজনৈতিক কার্যালয়</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                আসন্ন অ্যাপয়েন্টমেন্ট
              </h3>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {appointment.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {appointment.purpose}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          appointment.status === "নিশ্চিত"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">জরুরি যোগাযোগ</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <span>০১৭০০-১২৩৪৫৬</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <span>appointment@monju.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5" />
                  <span>সচিব: মোঃ আলমগীর</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/80">
                জরুরি প্রয়োজনে সরাসরি ফোন করুন
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
