"use client";

import axiosInstance from "@/app/utils/axios";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Complaint {
  _id: string;
  complaintId: string;
  name: string;
  phone: string;
  area: string;
  complaintType: string;
  details: string;
  status: "pending" | "solved" | "in_progress";
  adminNote?: string;
  createdAt: string;
  solvedAt?: string;
}

export default function DashboardPage() {
  // স্টেট ম্যানেজমেন্ট
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ফিল্টার স্টেট
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // পেজিনেশন
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // মডাল স্টেট
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null,
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [adminNote, setAdminNote] = useState("");

  // ডাটা লোড
  useEffect(() => {
    fetchComplaints();
  }, []);

  // ফিল্টার অ্যাপ্লাই
  useEffect(() => {
    let filtered = [...complaints];

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.complaintId.toLowerCase().includes(query) ||
          c.phone.includes(query) ||
          c.area.toLowerCase().includes(query),
      );
    }

    setFilteredComplaints(filtered);
  }, [complaints, statusFilter, searchQuery]);

  // API থেকে ডাটা আনো
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.get("/complaints/all");

      if (response.data.success) {
        setComplaints(response.data.complaints || []);
      }
    } catch (err) {
      setError("ডাটা লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  // স্ট্যাটাস আপডেট
  const handleStatusUpdate = async () => {
    if (!selectedComplaint) return;

    try {
      await axiosInstance.patch(`/complaints/${selectedComplaint._id}/status`, {
        status: newStatus,
        adminNote: adminNote || undefined,
      });

      fetchComplaints();
      setShowUpdateModal(false);
      setSelectedComplaint(null);
    } catch (err) {
      alert("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে");
    }
  };

  // কমপ্লেইন্ট ডিলিট
  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি এই অভিযোগ মুছতে চান?")) return;

    try {
      await axiosInstance.delete(`/complaints/${id}`);
      fetchComplaints();
    } catch (err) {
      alert("ডিলিট করতে সমস্যা হয়েছে");
    }
  };

  // স্ট্যাটাস ব্যাজ
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
          text: "text-yellow-800 dark:text-yellow-300",
          icon: <AlertCircle className="h-4 w-4" />,
          label: "বিচারাধীন",
        };
      case "in_progress":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-800 dark:text-blue-300",
          icon: <Clock className="h-4 w-4" />,
          label: "চলমান",
        };
      case "solved":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-800 dark:text-green-300",
          icon: <CheckCircle className="h-4 w-4" />,
          label: "সমাধান হয়েছে",
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-900",
          text: "text-gray-800 dark:text-gray-300",
          icon: <AlertCircle className="h-4 w-4" />,
          label: status,
        };
    }
  };

  // স্ট্যাটিস্টিক্স
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    solved: complaints.filter((c) => c.status === "solved").length,
    inProgress: complaints.filter((c) => c.status === "in_progress").length,
  };

  // পেজিনেশন ক্যালকুলেশন
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredComplaints.slice(startIndex, endIndex);

  // লোডিং স্টেট
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mb-4"></div>
          <p className="text-gray-600 text-lg">ড্যাশবোর্ড লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* হেডার সেকশন */}
      <div className="bg-gradient-to-r from-green-600 to-red-600 text-white shadow-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center">
                <Shield className="h-8 w-8 mr-3" />
                অভিযোগ ড্যাশবোর্ড
              </h1>
              <p className="text-green-100 text-lg">
                সমস্ত অভিযোগের ব্যবস্থাপনা ও ট্র্যাকিং
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={fetchComplaints}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition backdrop-blur-sm"
              >
                <RefreshCw className="h-4 w-4" />
                রিফ্রেশ
              </button>
              <button className="flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg font-semibold transition">
                <Download className="h-4 w-4" />
                এক্সপোর্ট
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* স্ট্যাটস ওভারভিউ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  মোট অভিযোগ
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">সর্বমোট</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">বিচারাধীন</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.pending}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-yellow-600">মনোযোগ প্রয়োজন</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">চলমান</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.inProgress}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-blue-600">প্রক্রিয়াধীন</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">
                  সমাধান হয়েছে
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.solved}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">
                {stats.total > 0
                  ? ((stats.solved / stats.total) * 100).toFixed(1)
                  : 0}
                % সফলতা
              </span>
            </div>
          </div>
        </div>

        {/* সার্চ ও ফিল্টার সেকশন */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="অভিযোগ আইডি, নাম, ফোন বা এলাকা দিয়ে খুঁজুন..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none bg-white"
                >
                  <option value="all">সব স্ট্যাটাস</option>
                  <option value="pending">বিচারাধীন</option>
                  <option value="in_progress">চলমান</option>
                  <option value="solved">সমাধান হয়েছে</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className="px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition"
              >
                ক্লিয়ার
              </button>
            </div>
          </div>

          {/* কুইক ফিল্টার বাটন */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                statusFilter === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FileText className="h-4 w-4" />
              সব ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                statusFilter === "pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <AlertCircle className="h-4 w-4" />
              বিচারাধীন ({stats.pending})
            </button>
            <button
              onClick={() => setStatusFilter("in_progress")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                statusFilter === "in_progress"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Clock className="h-4 w-4" />
              চলমান ({stats.inProgress})
            </button>
            <button
              onClick={() => setStatusFilter("solved")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                statusFilter === "solved"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              সমাধান ({stats.solved})
            </button>
          </div>
        </div>

        {/* কমপ্লেইন্ট টেবিল */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-800">সমস্ত অভিযোগ</h3>
              <p className="text-sm text-gray-600">
                {filteredComplaints.length} টি অভিযোগ পাওয়া গেছে
              </p>
            </div>
            <div className="text-sm text-gray-600">
              পেজ {currentPage} / {totalPages}
            </div>
          </div>

          {error ? (
            <div className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={fetchComplaints}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                পুনরায় চেষ্টা করুন
              </button>
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">
                কোনো অভিযোগ পাওয়া যায়নি
              </p>
              <p className="text-gray-500 mt-2">
                অন্য ফিল্টার চেষ্টা করুন বা নতুন অভিযোগ যোগ করুন
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        অভিযোগ আইডি
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        নাম ও তথ্য
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        এলাকা ও ধরন
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        তারিখ
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        অবস্থা
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        কার্যক্রম
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentItems.map((complaint) => {
                      const statusBadge = getStatusBadge(complaint.status);
                      return (
                        <tr
                          key={complaint._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="p-2 bg-green-100 rounded-lg mr-3">
                                <FileText className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <div className="font-mono font-semibold text-gray-800">
                                  {complaint.complaintId}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: {complaint._id.slice(-6)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="p-2 bg-blue-100 rounded-full mr-3">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">
                                  {complaint.name}
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {complaint.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <MapPin className="h-3 w-3 text-gray-400 mr-2" />
                                {complaint.area}
                              </div>
                              <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {complaint.complaintType}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-800">
                              {new Date(complaint.createdAt).toLocaleDateString(
                                "bn-BD",
                              )}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(complaint.createdAt).toLocaleTimeString(
                                "bn-BD",
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusBadge.bg} ${statusBadge.text}`}
                            >
                              {statusBadge.icon}
                              <span className="ml-2">{statusBadge.label}</span>
                            </span>
                            {complaint.adminNote && (
                              <div className="text-xs text-gray-500 mt-2 max-w-xs truncate">
                                📝 {complaint.adminNote}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedComplaint(complaint);
                                  setShowDetailsModal(true);
                                }}
                                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedComplaint(complaint);
                                  setNewStatus(complaint.status);
                                  setAdminNote(complaint.adminNote || "");
                                  setShowUpdateModal(true);
                                }}
                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(complaint._id)}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* পেজিনেশন */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  দেখানো হচ্ছে {startIndex + 1} থেকে{" "}
                  {Math.min(endIndex, filteredComplaints.length)} পর্যন্ত, মোট{" "}
                  {filteredComplaints.length} টি
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg ${
                          currentPage === pageNum
                            ? "bg-green-600 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && <span className="px-2">...</span>}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ডিটেইলস মডাল */}
      {showDetailsModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    অভিযোগ বিস্তারিত
                  </h3>
                  <p className="text-gray-600">সম্পূর্ণ বিবরণ ও স্ট্যাটাস</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-8">
                {/* হেডার কার্ড */}
                <div className="bg-gradient-to-r from-green-50 to-red-50 p-6 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-800">
                        {selectedComplaint.complaintId}
                      </div>
                      <div className="text-gray-600">অভিযোগ আইডি</div>
                    </div>
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${getStatusBadge(selectedComplaint.status).bg} ${getStatusBadge(selectedComplaint.status).text}`}
                    >
                      {getStatusBadge(selectedComplaint.status).icon}
                      <span className="ml-2">
                        {getStatusBadge(selectedComplaint.status).label}
                      </span>
                    </span>
                  </div>
                </div>

                {/* ব্যবহারকারী তথ্য */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        নাম
                      </label>
                      <div className="flex items-center mt-2">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-lg">
                          {selectedComplaint.name}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        ফোন নম্বর
                      </label>
                      <div className="flex items-center mt-2">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-lg">
                          {selectedComplaint.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        এলাকা
                      </label>
                      <div className="flex items-center mt-2">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-lg">
                          {selectedComplaint.area}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        অভিযোগের ধরন
                      </label>
                      <div className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg mt-2">
                        {selectedComplaint.complaintType}
                      </div>
                    </div>
                  </div>
                </div>

                {/* বিস্তারিত বিবরণ */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-3 block">
                    বিস্তারিত বিবরণ
                  </label>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedComplaint.details}
                    </p>
                  </div>
                </div>

                {/* তারিখ ও সময় */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      জমার তারিখ ও সময়
                    </label>
                    <div className="flex items-center mt-2">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <span>
                        {new Date(selectedComplaint.createdAt).toLocaleString(
                          "bn-BD",
                        )}
                      </span>
                    </div>
                  </div>
                  {selectedComplaint.solvedAt && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        সমাধান তারিখ
                      </label>
                      <div className="flex items-center mt-2">
                        <CheckCircle className="h-5 w-5 text-gray-400 mr-3" />
                        <span>
                          {new Date(selectedComplaint.solvedAt).toLocaleString(
                            "bn-BD",
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* অ্যাডমিন নোট */}
                {selectedComplaint.adminNote && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-3 block">
                      অ্যাডমিন নোট
                    </label>
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-700">
                        {selectedComplaint.adminNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* বাটন */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
                  >
                    বন্ধ করুন
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setShowUpdateModal(true);
                    }}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                  >
                    স্ট্যাটাস আপডেট
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* আপডেট মডাল */}
      {showUpdateModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                স্ট্যাটাস আপডেট
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    নতুন স্ট্যাটাস নির্বাচন করুন
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="pending">বিচারাধীন</option>
                    <option value="in_progress">চলমান</option>
                    <option value="solved">সমাধান হয়েছে</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    নোট যোগ করুন (ঐচ্ছিক)
                  </label>
                  <textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="আপডেট সম্পর্কে নোট লিখুন..."
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
                  >
                    বাতিল
                  </button>
                  <button
                    onClick={handleStatusUpdate}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                  >
                    আপডেট করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
