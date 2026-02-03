"use client";

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import ComplaintForm from "./ComplaintForm";

export default function ComplaintsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-green-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              জনগণের অভিযোগ ব্যবস্থাপনা
            </h1>
            <p className="text-xl text-green-100 mb-6">
              আপনার সমস্যার কথা বলুন, আমরা সমাধান করব। ডিজিটাল বাংলাদেশ গড়ার
              অংশীদার হোন।
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Clock className="w-5 h-5 mr-2" />
              <span>২৪/৭ সেবা | দ্রুত সমাধান</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 -mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <AlertTriangle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">মোট অভিযোগ</p>
                  <p className="text-2xl font-bold text-gray-800">১,৫৬৭</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">সমাধান হয়েছে</p>
                  <p className="text-2xl font-bold text-gray-800">১,২৩৪</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">চলমান</p>
                  <p className="text-2xl font-bold text-gray-800">২৫৬</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">সন্তুষ্টি হার</p>
                  <p className="text-2xl font-bold text-gray-800">৯২%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-linear-to-r from-green-600 to-red-600 text-white p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-white/20 rounded-lg mr-4">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        নতুন অভিযোগ জমা দিন
                      </h2>
                      <p className="text-green-100">
                        সকল তথ্য সঠিকভাবে পূরণ করুন
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <ComplaintForm />
                </div>
              </div>
            </div>

            {/* Info Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Process Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-600" />
                  প্রক্রিয়া ধাপ
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "১",
                      title: "অভিযোগ জমা",
                      desc: "ফর্ম পূরণ করুন",
                      icon: "📝",
                      color: "green",
                    },
                    {
                      step: "২",
                      title: "পর্যালোচনা",
                      desc: "অফিসিয়াল যাচাই",
                      icon: "🔍",
                      color: "yellow",
                    },
                    {
                      step: "৩",
                      title: "সমাধান প্রক্রিয়া",
                      desc: "বিষয়বস্তু সমাধান",
                      icon: "⚡",
                      color: "blue",
                    },
                    {
                      step: "৪",
                      title: "সম্পন্ন",
                      desc: "সমস্যা সমাধান",
                      icon: "✅",
                      color: "purple",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`shrink-0 w-10 h-10 bg-${item.color}-100 text-${item.color}-600 rounded-full flex items-center justify-center font-bold text-lg`}
                      >
                        {item.step}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-800">
                            {item.title}
                          </p>
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-green-500 to-red-500 text-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  যোগাযোগ করুন
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="p-2 bg-white/20 rounded-lg mr-3">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">জরুরি কল</p>
                      <p className="text-green-100">৯৯৯ (২৪/৭)</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="p-2 bg-white/20 rounded-lg mr-3">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">সেবা কল সেন্টার</p>
                      <p className="text-green-100">৩৩৩</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="p-2 bg-white/20 rounded-lg mr-3">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">অফিস</p>
                      <p className="text-green-100">সচিবালয়, ঢাকা</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                  গুরুত্বপূর্ণ টিপস
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">সঠিক মোবাইল নম্বর দিন</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">
                      সমস্যার সঠিক অবস্থান উল্লেখ করুন
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">
                      বিস্তারিত বিবরণ প্রদান করুন
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">
                      অভিযোগ আইডি সংরক্ষণ করুন
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              আমাদের সেবাসমূহ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "⚡",
                  title: "দ্রুত প্রক্রিয়াকরণ",
                  desc: "অভিযোগ ২৪ ঘন্টার মধ্যে প্রক্রিয়া শুরু",
                },
                {
                  icon: "🔒",
                  title: "গোপনীয়তা",
                  desc: "আপনার তথ্য সম্পূর্ণ গোপন রাখা হয়",
                },
                {
                  icon: "📱",
                  title: "ট্র্যাকিং",
                  desc: "অভিযোগের অবস্থান বাস্তব সময়ে ট্র্যাক করুন",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <div className="mt-12 bg-linear-to-r from-green-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3">সরকারের প্রতিশ্রুতি</h3>
            <p className="text-green-100">
              প্রতিটি অভিযোগকে গুরুত্বের সাথে নিয়ে দ্রুততম সময়ে সমাধান করা
              আমাদের অঙ্গীকার। আপনার অংশগ্রহণ ডিজিটাল বাংলাদেশ গড়তে সহায়তা করে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
