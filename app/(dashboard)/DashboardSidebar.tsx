"use client";

import {
  AlertCircle,
  BarChart3,
  Bell,
  CheckCircle,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Megaphone,
  Menu,
  MessageSquare,
  Settings,
  Shield,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "ড্যাশবোর্ড", href: "/dashboard", icon: Home },
  { name: "অভিযোগ", href: "/dashboard/complaints", icon: MessageSquare },
  { name: "ক্যাম্পেইন", href: "/dashboard/campaigns", icon: Megaphone },
  { name: "নোটিশ", href: "/dashboard/notices", icon: Bell },
  { name: "ব্যবহারকারী", href: "/dashboard/users", icon: Users },
  { name: "সমাধান", href: "/dashboard/resolved", icon: CheckCircle },
  { name: "রিপোর্ট", href: "/dashboard/reports", icon: BarChart3 },
  { name: "এনালিটিক্স", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "ডকুমেন্টস", href: "/dashboard/documents", icon: FileText },
  { name: "সিকিউরিটি", href: "/dashboard/security", icon: Shield },
  { name: "সাপোর্ট", href: "/dashboard/support", icon: HelpCircle },
  { name: "সেটিংস", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gradient-to-b from-green-700 to-green-900 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-green-800">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-white flex items-center justify-center shadow-lg">
              <span className="text-green-900 font-bold text-xl">বি</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">ড্যাশবোর্ড</h1>
              <p className="text-green-300 text-sm">ব্যবস্থাপনা সিস্টেম</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-green-300 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 border-b border-green-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white to-green-400 flex items-center justify-center">
              <User className="h-5 w-5 text-green-800" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">আব্দুল করিম</p>
              <p className="text-green-300 text-sm">সুপার এডমিন</p>
            </div>
            <AlertCircle className="h-5 w-5 text-green-300" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-white text-green-800 shadow-lg"
                      : "text-green-100 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive
                        ? "text-green-800"
                        : "text-green-300 group-hover:text-white"
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-green-800 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-green-800">
          <button className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium transition-all">
            <LogOut className="h-5 w-5" />
            লগআউট
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-green-700 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
}
