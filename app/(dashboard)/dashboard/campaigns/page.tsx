// app/dashboard/campaigns/page.tsx
"use client";

import { campaignService } from "@/app/lib/api/campaignService";
import { sweetAlert } from "@/app/utils/sweetAlert";
import { useEffect, useState } from "react";

import {
  Campaign,
  CampaignFilter,
  CampaignStats,
} from "@/app/interfaces/campaign";
import {
  BarChart3,
  FileText,
  Filter,
  Grid,
  List,
  Settings,
} from "lucide-react";
import CampaignActions from "./CampaignActions";
import CampaignFilters from "./CampaignFilters";
import StatsSection from "./StatsSection";

export default function CampaignsDashboardPage() {
  // State management
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );

  // View state
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [activeFilters, setActiveFilters] = useState<CampaignFilter>({});

  // Fetch initial data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats and campaigns in parallel
      const [statsResponse, campaignsResponse] = await Promise.all([
        campaignService.fetchCampaignStats(),
        campaignService.fetchAllCampaigns(),
      ]);

      if (statsResponse.success && statsResponse.stats) {
        setStats(statsResponse.stats);
      }

      if (campaignsResponse.success && campaignsResponse.campaigns) {
        const campaignsData = campaignsResponse.campaigns;
        setCampaigns(campaignsData);
        setFilteredCampaigns(campaignsData);
      }
    } catch (error) {
      sweetAlert.error("ডেটা লোড করা যায়নি", "দয়া করে পুনরায় চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filters: CampaignFilter) => {
    setActiveFilters(filters);

    let filtered = [...campaigns];

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(
        (campaign) => campaign.status === filters.status,
      );
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter((campaign) => campaign.type === filters.type);
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(
        (campaign) => campaign.category === filters.category,
      );
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(searchLower) ||
          campaign.description.toLowerCase().includes(searchLower) ||
          (campaign.location &&
            campaign.location.toLowerCase().includes(searchLower)),
      );
    }

    // Apply date filters
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filtered = filtered.filter(
        (campaign) => new Date(campaign.startDate) >= startDate,
      );
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      filtered = filtered.filter(
        (campaign) => new Date(campaign.startDate) <= endDate,
      );
    }

    setFilteredCampaigns(filtered);
  };

  // Handle search
  const handleSearch = (searchText: string) => {
    handleFilterChange({ ...activeFilters, search: searchText });
  };

  // Create campaign
  const handleCreateCampaign = () => {
    setModalMode("create");
    setSelectedCampaign(null);
    setModalOpen(true);
  };

  // Edit campaign
  const handleEditCampaign = (id: string) => {
    const campaign = campaigns.find((c) => c._id === id);
    if (campaign) {
      setModalMode("edit");
      setSelectedCampaign(campaign);
      setModalOpen(true);
    }
  };

  // View campaign
  const handleViewCampaign = (id: string) => {
    sweetAlert.info("ক্যাম্পেইন ডিটেইলস", "এই ফিচারটি শীঘ্রই আসছে...");
  };

  // Delete campaign
  const handleDeleteCampaign = async (id: string) => {
    const result = await campaignService.deleteCampaign(id);
    if (result.success) {
      fetchDashboardData();
    }
  };

  // Update campaign status
  const handleStatusFilter = (status: string) => {
    if (status === "ALL") {
      handleFilterChange({});
    } else {
      handleFilterChange({ status: status as Campaign["status"] });
    }
  };

  // Export data
  const handleExport = async () => {
    try {
      sweetAlert.loading("ডেটা এক্সপোর্ট হচ্ছে...");

      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 1500));

      sweetAlert.close();
      sweetAlert.success(
        "এক্সপোর্ট সফল",
        "ক্যাম্পেইন ডেটা সফলভাবে এক্সপোর্ট করা হয়েছে",
      );
    } catch (error) {
      sweetAlert.error("এক্সপোর্ট ব্যর্থ", "দয়া করে পুনরায় চেষ্টা করুন");
    }
  };

  // Print data
  const handlePrint = () => {
    window.print();
  };

  // Reset filters
  const handleResetFilters = () => {
    setActiveFilters({});
    setFilteredCampaigns(campaigns);
  };

  // Handle campaign action success
  const handleCampaignSuccess = () => {
    setModalOpen(false);
    fetchDashboardData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 md:p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                ক্যাম্পেইন ম্যানেজমেন্ট
              </h1>
              <p className="text-gray-600 mt-1">
                সব ক্যাম্পেইন দেখুন, তৈরি করুন এবং ম্যানেজ করুন
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    viewMode === "table"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
              </div>

              {/* Quick Stats */}
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-medium transition-all">
                <BarChart3 className="h-4 w-4" />
                রিপোর্ট
              </button>

              {/* Create Campaign Button */}
              <button
                onClick={handleCreateCampaign}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 font-medium transition-all shadow-lg"
              >
                <FileText className="h-4 w-4" />
                নতুন ক্যাম্পেইন
              </button>
            </div>
          </div>

          {/* Stats Summary */}
          {stats && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">মোট ক্যাম্পেইন</div>
                <div className="text-xl font-bold text-gray-900">
                  {stats.total}
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">চলমান</div>
                <div className="text-xl font-bold text-green-600">
                  {stats.ongoing}
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">আসন্ন</div>
                <div className="text-xl font-bold text-red-600">
                  {stats.upcoming}
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">সম্পন্ন</div>
                <div className="text-xl font-bold text-blue-600">
                  {stats.completed}
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">বাতিল</div>
                <div className="text-xl font-bold text-gray-600">
                  {stats.cancelled}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="mb-6">
          <CampaignFilters
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onExport={handleExport}
            onPrint={handlePrint}
            onReset={handleResetFilters}
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          {/* Stats and Table Section */}
          {stats && (
            <StatsSection
              stats={stats}
              campaigns={filteredCampaigns}
              loading={loading}
              onRefresh={fetchDashboardData}
              onViewCampaign={handleViewCampaign}
              onEditCampaign={handleEditCampaign}
              onDeleteCampaign={handleDeleteCampaign}
              onStatusFilter={handleStatusFilter}
            />
          )}

          {/* Empty State */}
          {!loading &&
            filteredCampaigns.length === 0 &&
            campaigns.length > 0 && (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                  <Filter className="h-full w-full" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  কোনো ক্যাম্পেইন পাওয়া যায়নি
                </h3>
                <p className="text-gray-500 mb-4">
                  আপনার ফিল্টারের সাথে মিলিয়ে কোনো ক্যাম্পেইন নেই
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  সব ফিল্টার রিসেট করুন
                </button>
              </div>
            )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            সর্বশেষ আপডেট: {new Date().toLocaleDateString("bn-BD")} | মোট
            রেকর্ড: {campaigns.length} | দেখানো হচ্ছে:{" "}
            {filteredCampaigns.length}
          </p>
          <p className="mt-1">
            ক্যাম্পেইন সিস্টেম v1.0 |
            <button className="ml-2 text-green-600 hover:text-green-800">
              <Settings className="h-4 w-4 inline mr-1" />
              সেটিংস
            </button>
          </p>
        </div>
      </main>

      {/* Create/Edit Campaign Modal */}
      <CampaignActions
        campaign={selectedCampaign}
        open={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        onSuccess={handleCampaignSuccess}
      />
    </div>
  );
}
