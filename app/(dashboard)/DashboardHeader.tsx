"use client";

import { Bell, Calendar, HelpCircle, Search, Settings } from "lucide-react";
import { useState } from "react";

export default function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Breadcrumb */}
          <div className="flex items-center">
            <div className="hidden md:block">
              <nav className="flex items-center text-sm">
                <span className="text-gray-500">ড্যাশবোর্ড</span>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-medium text-gray-900">হোম</span>
              </nav>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="খুঁজুন..."
                className="block w-64 rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <Calendar className="h-5 w-5" />
              </button>

              <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <HelpCircle className="h-5 w-5" />
              </button>

              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center shadow">
                <span className="text-white font-semibold text-sm">AK</span>
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">আব্দুল করিম</p>
                <p className="text-xs text-gray-500">এডমিন</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
