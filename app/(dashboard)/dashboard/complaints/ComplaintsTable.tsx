"use client";

import { Complaint } from "@/app/interfaces/complaint";
import { getStatusBadge } from "@/app/utils/complaintUtils";
import { sweetAlert } from "@/app/utils/sweetAlert";
import { Eye, Edit, Trash2 } from "lucide-react";

interface ComplaintsTableProps {
  complaints: Complaint[];
  onView: (complaint: Complaint) => void;
  onUpdate: (complaint: Complaint) => void;
  onDelete: (id: string) => void;
}

export default function ComplaintsTable({
  complaints,
  onView,
  onUpdate,
  onDelete
}: ComplaintsTableProps) {
  const handleDelete = async (id: string, complaintId: string) => {
    const result = await sweetAlert.confirm(
      "অভিযোগ মুছবেন?",
      `আপনি কি অভিযোগ #${complaintId} মুছতে চান? এই কাজটি পূর্বাবস্থায় ফিরিয়ে আনা যাবে না।`,
      "হ্যাঁ, মুছুন",
      "না, বাতিল করুন"
    );

    if (result.isConfirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                অভিযোগ আইডি
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                নাম
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                ফোন
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                এলাকা
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                স্ট্যাটাস
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                কার্যক্রম
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((complaint) => {
              const status = getStatusBadge(complaint.status);
              return (
                <tr 
                  key={complaint._id} 
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 font-mono bg-gray-50 px-3 py-1 rounded border border-gray-200">
                        {complaint.complaintId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{complaint.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{complaint.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{complaint.area}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${status.color === 'green' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : status.color === 'yellow' 
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${status.color === 'green' 
                        ? 'bg-green-500' 
                        : status.color === 'yellow' 
                        ? 'bg-yellow-500' 
                        : 'bg-blue-500'
                      }`}></span>
                      {status.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView(complaint)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
                        title="বিস্তারিত দেখুন"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span className="hidden md:inline">দেখুন</span>
                      </button>
                      <button
                        onClick={() => onUpdate(complaint)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-50 text-green-700 hover:bg-green-100 rounded-lg border border-green-200 transition"
                        title="স্ট্যাটাস আপডেট"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span className="hidden md:inline">এডিট</span>
                      </button>
                      <button
                        onClick={() => handleDelete(complaint._id, complaint.complaintId)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-700 hover:bg-red-100 rounded-lg border border-red-200 transition"
                        title="মুছুন"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="hidden md:inline">মুছুন</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {complaints.length === 0 && (
        <div className="text-center py-12 border-t border-gray-200">
          <div className="text-gray-400 mb-2">📭</div>
          <p className="text-gray-600 font-medium">কোনো অভিযোগ পাওয়া যায়নি</p>
          <p className="text-gray-500 text-sm mt-1">অনুগ্রহ করে সার্চ বা ফিল্টার পরিবর্তন করুন</p>
        </div>
      )}
    </div>
  );
}