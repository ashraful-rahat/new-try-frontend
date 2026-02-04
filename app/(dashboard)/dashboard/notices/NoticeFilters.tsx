// app/components/dashboard/NoticeFilters.tsx
"use client";

import { NoticeType } from "@/app/interfaces/notice";
import {
  AlertCircle,
  Bell,
  Filter,
  Megaphone,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import React, { useState } from "react";

interface NoticeFiltersProps {
  activeFilter: NoticeType | "all";
  onFilterChange: (filter: NoticeType | "all") => void;
  onSearch: (searchText: string) => void;
  onReset: () => void;
}

const NoticeFilters: React.FC<NoticeFiltersProps> = ({
  activeFilter,
  onFilterChange,
  onSearch,
  onReset,
}) => {
  const [searchText, setSearchText] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const filterOptions = [
    {
      value: "all",
      label: "সব নোটিশ",
      icon: Bell,
      color: "bg-gray-100 text-gray-800",
    },
    {
      value: "daily",
      label: "দৈনন্দিন",
      icon: Bell,
      color: "bg-green-100 text-green-800",
    },
    {
      value: "important",
      label: "গুরুত্বপূর্ণ",
      icon: AlertCircle,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "election",
      label: "নির্বাচনী",
      icon: Megaphone,
      color: "bg-red-100 text-red-800",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
  };

  const handleReset = () => {
    setSearchText("");
    setShowAdvanced(false);
    onReset();
  };

  return (
    <div className="space-y-4">
      {/* Main Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="নোটিশ খুঁজুন (শিরোনাম, বিবরণ, অবস্থান)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {searchText && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchText("");
                    onSearch("");
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Advanced Filter Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                showAdvanced
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter className="h-4 w-4" />
              আরও ফিল্টার
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              রিসেট
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const Icon = option.icon;
          const isActive = activeFilter === option.value;

          return (
            <button
              key={option.value}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => onFilterChange(option.value as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? `${option.color} shadow-md transform scale-105`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              উন্নত ফিল্টার
            </h3>
            <button
              onClick={() => setShowAdvanced(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                তারিখ থেকে
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                তারিখ পর্যন্ত
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Priority Filter */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              অগ্রাধিকার স্তর
            </label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">সব</span>
              <input
                type="range"
                min="0"
                max="10"
                defaultValue="0"
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600">উচ্চ</span>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchText || activeFilter !== "all") && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                সক্রিয় ফিল্টার:
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeFilter !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {filterOptions.find((f) => f.value === activeFilter)?.label}
                    <button
                      onClick={() => onFilterChange("all")}
                      className="hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchText && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    সার্চ: {searchText}
                    <button
                      onClick={() => {
                        setSearchText("");
                        onSearch("");
                      }}
                      className="hover:text-green-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticeFilters;
