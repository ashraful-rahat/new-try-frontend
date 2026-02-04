"use client";

import { useState } from "react";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";
import { sweetAlert } from "../../../utils/sweetAlert";


interface UpdateStatusModalProps {
  currentStatus: string;
  currentNote: string;
  onUpdate: (status: string, note: string) => Promise<void>;
  onClose: () => void;
}

export default function UpdateStatusModal({
  currentStatus,
  currentNote,
  onUpdate,
  onClose
}: UpdateStatusModalProps) {
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState(currentNote);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!status) {
      sweetAlert.warning("সতর্কতা", "দয়া করে একটি স্ট্যাটাস নির্বাচন করুন");
      return;
    }

    try {
      setLoading(true);
      await onUpdate(status, note);
      onClose();
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "pending", label: "বিচারাধীন", icon: <AlertCircle className="h-4 w-4" />, color: "yellow" },
    { value: "in_progress", label: "চলমান", icon: <Clock className="h-4 w-4" />, color: "blue" },
    { value: "solved", label: "সমাধান হয়েছে", icon: <CheckCircle className="h-4 w-4" />, color: "green" }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-300">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-bold text-gray-800">স্ট্যাটাস আপডেট</h2>
          <p className="text-gray-600 text-sm mt-1">অভিযোগের অবস্থা পরিবর্তন করুন</p>
        </div>

        <div className="p-6">
          {/* Status Options */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              নতুন স্ট্যাটাস নির্বাচন করুন
            </label>
            <div className="grid grid-cols-1 gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatus(option.value)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition ${status === option.value 
                    ? option.color === 'green' 
                      ? 'bg-green-50 border-green-300 text-green-700' 
                      : option.color === 'yellow' 
                      ? 'bg-yellow-50 border-yellow-300 text-yellow-700' 
                      : 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className={`p-2 rounded ${option.color === 'green' 
                    ? 'bg-green-100' 
                    : option.color === 'yellow' 
                    ? 'bg-yellow-100' 
                    : 'bg-blue-100'
                  }`}>
                    <div className={option.color === 'green' 
                      ? 'text-green-600' 
                      : option.color === 'yellow' 
                      ? 'text-yellow-600' 
                      : 'text-blue-600'
                    }>
                      {option.icon}
                    </div>
                  </div>
                  <span className="font-medium">{option.label}</span>
                  {status === option.value && (
                    <span className="ml-auto text-sm font-semibold">✓ নির্বাচিত</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Note Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              নোট যোগ করুন (ঐচ্ছিক)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none bg-gray-50"
              placeholder="আপডেট সম্পর্কে নোট লিখুন..."
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-2">
              এই নোটটি অভিযোগকারীকে দেখানো হবে না, শুধু অ্যাডমিনদের জন্য।
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              বাতিল
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50 shadow-md"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}