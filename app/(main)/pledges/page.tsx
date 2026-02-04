// app/(main)/pledges/page.tsx
import {
  Award,
  Calendar,
  CheckCircle,
  Heart,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export default function PledgesPage() {
  const pledges = [
    {
      id: 1,
      title: "শিক্ষার উন্নয়ন",
      description:
        "প্রতিটি ইউনিয়নে একটি করে আধুনিক প্রাথমিক বিদ্যালয় প্রতিষ্ঠা",
      icon: <Award className="h-8 w-8 text-blue-600" />,
      status: "সম্পন্ন",
      progress: 100,
      completedCount: 6,
      totalCount: 6,
      timeline: "২০২২-২০২৪",
    },
    {
      id: 2,
      title: "স্বাস্থ্য সেবা",
      description: "প্রতিটি উপজেলায় একটি করে কমিউনিটি ক্লিনিক স্থাপন",
      icon: <Heart className="h-8 w-8 text-red-600" />,
      status: "চলমান",
      progress: 75,
      completedCount: 4,
      totalCount: 6,
      timeline: "২০২৩-২০২৫",
    },
    {
      id: 3,
      title: "রাস্তা সংস্কার",
      description: "১০০ কিলোমিটার গ্রামীণ সড়ক উন্নয়ন ও সংস্কার",
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      status: "চলমান",
      progress: 60,
      completedCount: 60,
      totalCount: 100,
      timeline: "২০২২-২০২৬",
    },
    {
      id: 4,
      title: "যুব উদ্যোক্তা",
      description: "১০০০ জন যুবকের কর্মসংস্থান সৃষ্টি",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      status: "চলমান",
      progress: 45,
      completedCount: 450,
      totalCount: 1000,
      timeline: "২০২৩-২০২৫",
    },
    {
      id: 5,
      title: "মহিলা ক্ষমতায়ন",
      description: "মহিলাদের জন্য ৫টি কারিগরি প্রশিক্ষণ কেন্দ্র",
      icon: <Shield className="h-8 w-8 text-pink-600" />,
      status: "আসন্ন",
      progress: 0,
      completedCount: 0,
      totalCount: 5,
      timeline: "২০২৪-২০২৬",
    },
    {
      id: 6,
      title: "পরিবেশ উন্নয়ন",
      description: "১০০,০০০ গাছ রোপণ ও পরিবেশ সংরক্ষণ",
      icon: <Target className="h-8 w-8 text-emerald-600" />,
      status: "চলমান",
      progress: 30,
      completedCount: 30000,
      totalCount: 100000,
      timeline: "২০২৩-২০২৭",
    },
  ];

  const completedPledges = pledges.filter((p) => p.status === "সম্পন্ন").length;
  const totalPledges = pledges.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-white rounded-full shadow-lg mb-6">
            <Award className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            আমার অঙ্গীকার
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            জনগণের প্রতি আমার প্রতিশ্রুতি এবং প্রতিশ্রুতি পূরণের অগ্রগতি।
            প্রতিটি অঙ্গীকারই জনগণের কল্যাণে নিবেদিত।
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">মোট অঙ্গীকার</p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalPledges}টি
                </p>
              </div>
              <Award className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">সম্পন্ন অঙ্গীকার</p>
                <p className="text-3xl font-bold text-gray-900">
                  {completedPledges}টি
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">মোট অগ্রগতি</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(
                    pledges.reduce((acc, p) => acc + p.progress, 0) /
                      totalPledges,
                  )}
                  %
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Pledges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {pledges.map((pledge) => (
            <div
              key={pledge.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gray-50">
                      {pledge.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {pledge.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pledge.status === "সম্পন্ন"
                            ? "bg-green-100 text-green-800"
                            : pledge.status === "চলমান"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {pledge.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{pledge.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>অগ্রগতি</span>
                    <span>{pledge.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        pledge.status === "সম্পন্ন"
                          ? "bg-green-500"
                          : pledge.status === "চলমান"
                            ? "bg-blue-500"
                            : "bg-amber-500"
                      }`}
                      style={{ width: `${pledge.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {pledge.completedCount}
                    </div>
                    <div className="text-sm text-gray-600">সম্পন্ন</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {pledge.totalCount}
                    </div>
                    <div className="text-sm text-gray-600">লক্ষ্যমাত্রা</div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t border-gray-100">
                  <Calendar className="h-4 w-4" />
                  <span>সময়সীমা: {pledge.timeline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promise Summary */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">আমার প্রতিশ্রুতি</h2>
              <p className="text-white/90 mb-6">
                জনগণের কল্যাণে আমার প্রতিটি প্রতিশ্রুতি পূরণের জন্য কাজ করছি।
                স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে প্রতিটি অঙ্গীকার বাস্তবায়ন করব।
              </p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">১০০%</div>
                  <div className="text-sm">স্বচ্ছতা</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">১০০%</div>
                  <div className="text-sm">জবাবদিহিতা</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">১০০%</div>
                  <div className="text-sm">জনগণের অংশগ্রহণ</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">পরবর্তী লক্ষ্য</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>২০২৫ সালের মধ্যে সব চলমান প্রকল্প সম্পন্ন</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>প্রতিটি ওয়ার্ডে ডিজিটাল সেন্টার প্রতিষ্ঠা</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>যুবকদের জন্য ১০০০+ কর্মসংস্থান সৃষ্টি</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>মহিলা উদ্যোক্তাদের জন্য বিশেষ তহবিল</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
