import { Complaint } from "@/app/interfaces/complaint";
import { getStatusBadge } from "@/app/utils/complaintUtils";
import { Calendar, MapPin, Phone, User, X } from "lucide-react";

interface ComplaintDetailsModalProps {
  complaint: Complaint;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ComplaintDetailsModal({
  complaint,
  onClose,
  onUpdate,
}: ComplaintDetailsModalProps) {
  const status = getStatusBadge(complaint.status);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">অভিযোগ বিস্তারিত</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">আইডি</label>
                <p className="font-semibold">{complaint.complaintId}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">স্ট্যাটাস</label>
                <div
                  className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                    status.color === "green"
                      ? "bg-green-100 text-green-800"
                      : status.color === "yellow"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {status.icon}
                  <span className="ml-1">{status.text}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">নাম</label>
                <div className="flex items-center mt-1">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="font-semibold">{complaint.name}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">ফোন</label>
                <div className="flex items-center mt-1">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="font-semibold">{complaint.phone}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">এলাকা</label>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="font-semibold">{complaint.area}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">ধরন</label>
                <p className="font-semibold">{complaint.complaintType}</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">বিস্তারিত</label>
              <div className="mt-1 p-3 bg-gray-50 rounded">
                <p className="whitespace-pre-wrap">{complaint.details}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">জমার তারিখ</label>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <p>
                    {new Date(complaint.createdAt).toLocaleDateString("bn-BD")}
                  </p>
                </div>
              </div>
              {complaint.solvedAt && (
                <div>
                  <label className="text-sm text-gray-600">সমাধান তারিখ</label>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <p>
                      {new Date(complaint.solvedAt).toLocaleDateString("bn-BD")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {complaint.adminNote && (
              <div>
                <label className="text-sm text-gray-600">অ্যাডমিন নোট</label>
                <div className="mt-1 p-3 bg-blue-50 rounded">
                  <p>{complaint.adminNote}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              বন্ধ করুন
            </button>
            <button
              onClick={onUpdate}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              স্ট্যাটাস আপডেট
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
