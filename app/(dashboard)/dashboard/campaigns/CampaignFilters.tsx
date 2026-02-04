// app/components/dashboard/CampaignFilters.tsx
import { CampaignFilter } from "@/app/interfaces/campaign";
import { bn } from "@/app/interfaces/languageUtils";

import {
  Calendar,
  Download,
  Filter,
  Printer,
  RefreshCw,
  Search,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";

interface CampaignFiltersProps {
  onFilterChange: (filters: CampaignFilter) => void;
  onSearch: (searchText: string) => void;
  onExport?: () => void;
  onPrint?: () => void;
  onReset?: () => void;
}

const CampaignFilters: React.FC<CampaignFiltersProps> = ({
  onFilterChange,
  onSearch,
  onExport,
  onPrint,
  onReset,
}) => {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<CampaignFilter>({
    // ✅ Temporary fix: default values দিলাম
    status: undefined,
    type: undefined,
    category: undefined,
    search: undefined,
    startDate: undefined,
    endDate: undefined,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Status options
  const statusOptions = [
    { value: "", label: "সব স্ট্যাটাস" },
    { value: "UPCOMING", label: "আসন্ন" },
    { value: "ONGOING", label: "চলমান" },
    { value: "COMPLETED", label: "সম্পন্ন" },
    { value: "CANCELLED", label: "বাতিল" },
  ];

  // Type options
  const typeOptions = [
    { value: "", label: "সব ধরন" },
    { value: "VOLUNTEER", label: "স্বেচ্ছাসেবক" },
    { value: "EVENT", label: "ইভেন্ট" },
    { value: "SOCIAL_ACTIVITY", label: "সামাজিক কার্যক্রম" },
  ];

  // Category options (from backend)
  const categoryOptions = [
    { value: "", label: "সব ক্যাটাগরি" },
    { value: "শিক্ষা", label: "শিক্ষা" },
    { value: "স্বাস্থ্য", label: "স্বাস্থ্য" },
    { value: "পরিবেশ", label: "পরিবেশ" },
    { value: "যুব উন্নয়ন", label: "যুব উন্নয়ন" },
    { value: "সামাজিক কার্যক্রম", label: "সামাজিক কার্যক্রম" },
    { value: "অন্যান্য", label: "অন্যান্য" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
    // ✅ Safe filter change
    onFilterChange({
      ...filters,
      search: searchText,
    } as CampaignFilter);
  };

  const handleFilterChange = (key: keyof CampaignFilter, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value || undefined,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setSearchText("");
    // ✅ Reset করলে সব undefined করে দাও
    const resetFilters: CampaignFilter = {
      status: undefined,
      type: undefined,
      category: undefined,
      search: undefined,
      startDate: undefined,
      endDate: undefined,
    };
    setFilters(resetFilters);
    setShowAdvanced(false);
    if (onReset) onReset();
    onFilterChange(resetFilters);
  };

  const handleDateChange = (type: "startDate" | "endDate", value: string) => {
    const newFilters = {
      ...filters,
      [type]: value ? new Date(value) : undefined,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // ✅ Helper function to check if filter has value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasFilterValue = (value: any): boolean => {
    return value !== undefined && value !== null && value !== "";
  };

  // ✅ Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (hasFilterValue(filters.status)) count++;
    if (hasFilterValue(filters.type)) count++;
    if (hasFilterValue(filters.category)) count++;
    if (hasFilterValue(filters.search)) count++;
    if (hasFilterValue(filters.startDate)) count++;
    if (hasFilterValue(filters.endDate)) count++;
    return count;
  };

  return (
    <div className="space-y-4">
      {/* Main Search and Quick Actions */}
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
                placeholder="ক্যাম্পেইন খুঁজুন (নাম, বিবরণ, অবস্থান)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
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
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter className="h-4 w-4" />
              ফিল্টার
              {getActiveFilterCount() > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              রিসেট
            </button>

            {/* Export Button */}
            {onExport && (
              <button
                onClick={onExport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-colors"
              >
                <Download className="h-4 w-4" />
                এক্সপোর্ট
              </button>
            )}

            {/* Print Button */}
            {onPrint && (
              <button
                onClick={onPrint}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg font-medium transition-colors"
              >
                <Printer className="h-4 w-4" />
                প্রিন্ট
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters (Collapsible) */}
      {showAdvanced && (
        <div className="bg-linear-to-br from-green-50 to-white border border-green-200 rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Filter className="h-5 w-5 text-green-600" />
              উন্নত ফিল্টার
            </h3>
            <button
              onClick={() => setShowAdvanced(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                স্ট্যাটাস
              </label>
              <select
                value={filters.status || ""}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                ধরন
              </label>
              <select
                value={filters.type || ""}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 items-center gap-2">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                ক্যাটাগরি
              </label>
              <select
                value={filters.category || ""}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Volunteer Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                স্বেচ্ছাসেবক
              </label>
              <select
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              >
                <option value="">সব</option>
                <option value="volunteer_needed">স্বেচ্ছাসেবক প্রয়োজন</option>
                <option value="volunteer_full">স্বেচ্ছাসেবক পূর্ণ</option>
              </select>
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                শুরুর তারিখ থেকে
              </label>
              <input
                type="date"
                value={
                  filters.startDate
                    ? new Date(filters.startDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => handleDateChange("startDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                শুরুর তারিখ পর্যন্ত
              </label>
              <input
                type="date"
                value={
                  filters.endDate
                    ? new Date(filters.endDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => handleDateChange("endDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {getActiveFilterCount() > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                সক্রিয় ফিল্টার:
              </h4>
              <div className="flex flex-wrap gap-2">
                {hasFilterValue(filters.status) && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    স্ট্যাটাস: {bn(filters.status || "")}
                    <button
                      onClick={() => handleFilterChange("status", "")}
                      className="hover:text-green-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {hasFilterValue(filters.type) && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    ধরন: {bn(filters.type || "")}
                    <button
                      onClick={() => handleFilterChange("type", "")}
                      className="hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {hasFilterValue(filters.category) && (
                  <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    ক্যাটাগরি: {filters.category}
                    <button
                      onClick={() => handleFilterChange("category", "")}
                      className="hover:text-purple-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {hasFilterValue(filters.search) && (
                  <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    সার্চ: {filters.search}
                    <button
                      onClick={() => handleFilterChange("search", "")}
                      className="hover:text-yellow-900"
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

export default CampaignFilters;
