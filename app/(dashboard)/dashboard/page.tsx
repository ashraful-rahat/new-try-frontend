"use client";

import { Complaint } from "@/app/interfaces/complaint";
import { complaintService } from "@/app/lib/api/complaintService";
import { useEffect, useState } from "react";

import { calculateStats, filterComplaints } from "@/app/utils/complaintUtils";
import { sweetAlert } from "@/app/utils/sweetAlert";

import ComplaintDetailsModal from "./complaints/ComplaintDetailsModal";
import ComplaintsTable from "./complaints/ComplaintsTable";
import SearchFilter from "./complaints/SearchFilter";
import StatsCards from "./complaints/StatsCards";
import UpdateStatusModal from "./complaints/UpdateStatusModal";
export default function DashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null,
  );
  const [showDetails, setShowDetails] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  // ডাটা লোড
  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await complaintService.getAllComplaints();
      setComplaints(data);

      if (data.length === 0) {
        sweetAlert.info("Info", "কোনো অভিযোগ পাওয়া যায়নি");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      sweetAlert.error("ত্রুটি", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ফিল্টারড ডাটা
  const filteredComplaints = filterComplaints(complaints, statusFilter, search);
  const stats = calculateStats(complaints);

  // স্ট্যাটাস আপডেট
  const handleStatusUpdate = async (status: string, note: string) => {
    if (!selectedComplaint) return;

    try {
      await complaintService.updateStatus(selectedComplaint._id, status, note);
      await loadComplaints();
      setShowUpdate(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Update error:", err);
    }
  };

  // ডিলিট
  const handleDelete = async (id: string) => {
    try {
      await complaintService.deleteComplaint(id);
      await loadComplaints();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Delete error:", err);
    }
  };

  // লোডিং স্টেট
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mb-4"></div>
        <p className="text-gray-600 text-lg">ড্যাশবোর্ড লোড হচ্ছে...</p>
        <p className="text-gray-500 text-sm mt-2">অনুগ্রহ করে অপেক্ষা করুন</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* হেডার */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                অভিযোগ ড্যাশবোর্ড
              </h1>
              <p className="text-gray-600 mt-2">
                সকল অভিযোগ দেখুন, ব্যবস্থাপনা করুন এবং ট্র্যাক করুন
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                সর্বশেষ আপডেট: {new Date().toLocaleTimeString("bn-BD")}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="text-red-600 mr-3">⚠️</div>
                <div className="flex-1">
                  <p className="text-red-700 font-medium">{error}</p>
                  <button
                    onClick={loadComplaints}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                  >
                    আবার চেষ্টা করুন
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* স্ট্যাটস */}
      <StatsCards stats={stats} />

      {/* সার্চ ও ফিল্টার */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onRefresh={loadComplaints}
      />

      {/* টেবিল */}
      <ComplaintsTable
        complaints={filteredComplaints}
        onView={(c) => {
          setSelectedComplaint(c);
          setShowDetails(true);
        }}
        onUpdate={(c) => {
          setSelectedComplaint(c);
          setShowUpdate(true);
        }}
        onDelete={handleDelete}
      />

      {/* মডালস */}
      {showDetails && selectedComplaint && (
        <ComplaintDetailsModal
          complaint={selectedComplaint}
          onClose={() => setShowDetails(false)}
          onUpdate={() => {
            setShowDetails(false);
            setShowUpdate(true);
          }}
        />
      )}

      {showUpdate && selectedComplaint && (
        <UpdateStatusModal
          currentStatus={selectedComplaint.status}
          currentNote={selectedComplaint.adminNote || ""}
          onUpdate={handleStatusUpdate}
          onClose={() => setShowUpdate(false)}
        />
      )}
    </div>
  );
}
