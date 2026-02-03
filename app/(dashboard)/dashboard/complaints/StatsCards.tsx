import { ComplaintStats } from "@/app/interfaces/complaint";
import { AlertCircle, CheckCircle, Clock, FileText } from "lucide-react";

interface StatsCardsProps {
  stats: ComplaintStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">মোট</p>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">বিচারাধীন</p>
            <p className="text-2xl font-bold mt-1">{stats.pending}</p>
          </div>
          <div className="p-2 bg-yellow-100 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">চলমান</p>
            <p className="text-2xl font-bold mt-1">{stats.inProgress}</p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">সমাধান</p>
            <p className="text-2xl font-bold mt-1">{stats.solved}</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
