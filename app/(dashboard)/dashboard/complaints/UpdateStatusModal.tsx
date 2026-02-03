"use client";

import { useState } from "react";

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
  onClose,
}: UpdateStatusModalProps) {
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState(currentNote);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onUpdate(status, note);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">স্ট্যাটাস আপডেট</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                নতুন স্ট্যাটাস
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={loading}
              >
                <option value="pending">বিচারাধীন</option>
                <option value="in_progress">চলমান</option>
                <option value="solved">সমাধান হয়েছে</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">নোট</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="নোট লিখুন..."
                disabled={loading}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                বাতিল
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
