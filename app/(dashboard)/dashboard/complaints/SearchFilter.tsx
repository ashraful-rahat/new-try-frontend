import { RefreshCw, Search } from "lucide-react";

interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  onRefresh: () => void;
}

export default function SearchFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onRefresh,
}: SearchFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="অভিযোগ আইডি, নাম, ফোন বা এলাকা দিয়ে খুঁজুন..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">সব স্ট্যাটাস</option>
            <option value="pending">বিচারাধীন</option>
            <option value="in_progress">চলমান</option>
            <option value="solved">সমাধান হয়েছে</option>
          </select>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            title="রিফ্রেশ করুন"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
