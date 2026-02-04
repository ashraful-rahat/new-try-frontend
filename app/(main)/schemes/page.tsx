// app/(main)/schemes/page.tsx
import {
  Award,
  Calendar,
  CheckCircle,
  HeartHandshake,
  Target,
  Users,
} from "lucide-react";

export default function SchemesPage() {
  const schemes = [
    {
      id: 1,
      title: "মেডিকেল সহায়তা প্রকল্প",
      description: "দরিদ্র ও অসহায় পরিবারের চিকিৎসা ব্যয় সহায়তা",
      icon: <HeartHandshake className="h-8 w-8 text-green-600" />,
      status: "চলমান",
      beneficiaries: "৫০০+ পরিবার",
      startDate: "২০২৩ জানুয়ারি",
    },
    {
      id: 2,
      title: "শিক্ষা উপবৃত্তি",
      description: "মেধাবী ও গরীব শিক্ষার্থীদের মাসিক আর্থিক সহায়তা",
      icon: <Award className="h-8 w-8 text-blue-600" />,
      status: "চলমান",
      beneficiaries: "১০০০+ শিক্ষার্থী",
      startDate: "২০২২ জুলাই",
    },
    {
      id: 3,
      title: "মহিলা উদ্যোক্তা প্রকল্প",
      description: "মহিলাদের আত্মকর্মসংস্থানের জন্য প্রশিক্ষণ ও ঋণ সহায়তা",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      status: "চলমান",
      beneficiaries: "২০০+ মহিলা",
      startDate: "২০২৩ মার্চ",
    },
    {
      id: 4,
      title: "কৃষি সহায়তা",
      description: "কৃষকদের বিনামূল্যে সার, বীজ ও প্রযুক্তি সহায়তা",
      icon: <Target className="h-8 w-8 text-amber-600" />,
      status: "আসন্ন",
      beneficiaries: "প্রত্যাশিত: ৫০০ কৃষক",
      startDate: "২০২৪ জানুয়ারি",
    },
    {
      id: 5,
      title: "বয়স্ক ভাতা",
      description: "অসহায় বয়স্কদের মাসিক ভাতা প্রদান",
      icon: <Calendar className="h-8 w-8 text-red-600" />,
      status: "চলমান",
      beneficiaries: "৩০০+ বয়স্ক",
      startDate: "২০২১ সেপ্টেম্বর",
    },
    {
      id: 6,
      title: "দুর্যোগ ত্রাণ",
      description: "বন্যা ও ঘূর্ণিঝড় কবলিতদের ত্রাণ সহায়তা",
      icon: <CheckCircle className="h-8 w-8 text-cyan-600" />,
      status: "সক্রিয়",
      beneficiaries: "১০০০+ পরিবার",
      startDate: "সর্বদা প্রস্তুত",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-4">
            <HeartHandshake className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            সেবা প্রকল্প
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            জনসেবা ও সামাজিক উন্নয়নের জন্য আমাদের চলমান বিভিন্ন প্রকল্পসমূহ।
            প্রতিটি প্রকল্পই জনগণের কল্যাণে নিবেদিত।
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">৬</div>
            <div className="text-gray-700">সক্রিয় প্রকল্প</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">৩১০০+</div>
            <div className="text-gray-700">সর্বমোট উপকারভোগী</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">৩ বছর</div>
            <div className="text-gray-700">কাজের সময়কাল</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">১০০%</div>
            <div className="text-gray-700">সুবিধাভোগীর সন্তুষ্টি</div>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gray-50">{scheme.icon}</div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      scheme.status === "চলমান"
                        ? "bg-green-100 text-green-800"
                        : scheme.status === "আসন্ন"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {scheme.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {scheme.title}
                </h3>
                <p className="text-gray-600 mb-4">{scheme.description}</p>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>উপকারভোগী: {scheme.beneficiaries}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>শুরু: {scheme.startDate}</span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                  আরও জানুন
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            কীভাবে আবেদন করবেন?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">১</span>
              </div>
              <h3 className="font-bold text-lg mb-2">অনলাইনে আবেদন</h3>
              <p className="text-gray-600">
                আমাদের ওয়েবসাইটে আবেদন ফর্ম পূরণ করুন
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold text-xl">২</span>
              </div>
              <h3 className="font-bold text-lg mb-2">নথি যাচাই</h3>
              <p className="text-gray-600">
                আমাদের টিম আপনার দাখিলকৃত নথি যাচাই করবে
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold text-xl">৩</span>
              </div>
              <h3 className="font-bold text-lg mb-2">সুবিধা প্রদান</h3>
              <p className="text-gray-600">
                অনুমোদনের পর সরাসরি সুবিধা পৌঁছে দেওয়া হবে
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
