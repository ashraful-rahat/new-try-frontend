"use client";

import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart,
  Bell,
  Calendar,
  CheckCircle,
  Megaphone,
  MessageSquare,
  PieChart,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    name: "মোট ব্যবহারকারী",
    value: "২,৫৪৩",
    icon: Users,
    change: "+১২%",
    color: "from-blue-500 to-blue-600",
    trend: "up",
  },
  {
    name: "অভিযোগ",
    value: "১,২৩৪",
    icon: MessageSquare,
    change: "+৮%",
    color: "from-green-500 to-green-600",
    trend: "up",
  },
  {
    name: "ক্যাম্পেইন",
    value: "৪৫",
    icon: Megaphone,
    change: "+২৩%",
    color: "from-purple-500 to-purple-600",
    trend: "up",
  },
  {
    name: "নোটিশ",
    value: "৩২",
    icon: Bell,
    change: "+৫%",
    color: "from-yellow-500 to-yellow-600",
    trend: "up",
  },
  {
    name: "সমাধান",
    value: "১,১০০",
    icon: CheckCircle,
    change: "+১৫%",
    color: "from-emerald-500 to-emerald-600",
    trend: "up",
  },
  {
    name: "পেন্ডিং",
    value: "১৩৪",
    icon: AlertTriangle,
    change: "-৩%",
    color: "from-red-500 to-red-600",
    trend: "down",
  },
];

const recentActivities = [
  {
    id: 1,
    user: "রফিক ইসলাম",
    action: "নতুন অভিযোগ দাখিল করেছেন",
    time: "১০ মিনিট আগে",
    type: "complaint",
  },
  {
    id: 2,
    user: "আনিকা আহমেদ",
    action: "ক্যাম্পেইনে অংশগ্রহণ করেছেন",
    time: "৩০ মিনিট আগে",
    type: "campaign",
  },
  {
    id: 3,
    user: "সুমন আলী",
    action: "নতুন নোটিশ পড়েছেন",
    time: "১ ঘণ্টা আগে",
    type: "notice",
  },
  {
    id: 4,
    user: "মেহেদী হাসান",
    action: "রিপোর্ট জমা দিয়েছেন",
    time: "২ ঘণ্টা আগে",
    type: "report",
  },
  {
    id: 5,
    user: "নাজনীন আক্তার",
    action: "প্রোফাইল আপডেট করেছেন",
    time: "৩ ঘণ্টা আগে",
    type: "profile",
  },
];

const quickActions = [
  {
    title: "অভিযোগ দেখুন",
    description: "সব অভিযোগের তালিকা",
    icon: MessageSquare,
    href: "/dashboard/complaints",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    title: "ক্যাম্পেইন তৈরি",
    description: "নতুন ক্যাম্পেইন শুরু করুন",
    icon: Megaphone,
    href: "/dashboard/campaigns",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    title: "নোটিশ দিন",
    description: "নতুন নোটিশ প্রকাশ করুন",
    icon: Bell,
    href: "/dashboard/notices",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    title: "রিপোর্ট তৈরি",
    description: "বিশ্লেষণ রিপোর্ট দেখুন",
    icon: BarChart,
    href: "/dashboard/reports",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              স্বাগতম, আব্দুল করিম!
            </h1>
            <p className="mt-0 text-gray-600">
              আজকের তারিখ: {new Date().toLocaleDateString("bn-BD")} | সকাল ১০:৩০
              AM
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-sm">
              নতুন টাস্ক
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid - Clean Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
              </div>
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === "up" ? (
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change} গত মাস থেকে
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions & Activities */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">দ্রুত অ্যাকশন</h2>
              <span className="text-sm text-gray-500">সব দেখুন</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`flex items-center p-4 rounded-lg border ${action.color} hover:shadow transition`}
                >
                  <div className="mr-4">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                সাম্প্রতিক কার্যক্রম
              </h2>
              <span className="text-sm text-green-600">সব দেখুন</span>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                      activity.type === "complaint"
                        ? "bg-red-50"
                        : activity.type === "campaign"
                          ? "bg-green-50"
                          : activity.type === "notice"
                            ? "bg-yellow-50"
                            : "bg-blue-50"
                    }`}
                  >
                    {activity.type === "complaint" && (
                      <MessageSquare className="h-5 w-5 text-red-600" />
                    )}
                    {activity.type === "campaign" && (
                      <Megaphone className="h-5 w-5 text-green-600" />
                    )}
                    {activity.type === "notice" && (
                      <Bell className="h-5 w-5 text-yellow-600" />
                    )}
                    {activity.type === "report" && (
                      <BarChart className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Charts & Summary */}
        <div className="space-y-8">
          {/* Performance Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">কর্মদক্ষতা</h2>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="h-48 bg-gradient-to-b from-gray-50 to-white rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">ডেটা লোড হচ্ছে...</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">৮৫%</div>
                <div className="text-sm text-gray-500">সাফল্য হার</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">৯২%</div>
                <div className="text-sm text-gray-500">সন্তুষ্টি</div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                সিস্টেম স্ট্যাটাস
              </h2>
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">সার্ভার</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  অনলাইন
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">ডাটাবেজ</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  সক্রিয়
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">ব্যাকআপ</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  চলমান
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">সিকিউরিটি</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  সক্রিয়
                </span>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">আসন্ন ইভেন্ট</h2>
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">মাসিক বৈঠক</p>
                  <p className="text-sm text-gray-500">আগামীকাল, ১০:০০ AM</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                  <Megaphone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">ক্যাম্পেইন লঞ্চ</p>
                  <p className="text-sm text-gray-500">৩ দিন পরে</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
