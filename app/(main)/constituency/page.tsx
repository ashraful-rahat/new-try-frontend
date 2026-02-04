// app/(main)/constituency/page.tsx
"use client";

import { Building, Clock, Mail, MapPin, Phone, Users } from "lucide-react";

interface Union {
  name: string;
  population: string;
  wards: number;
  color: string;
  chairman: string;
}

interface Project {
  title: string;
  area: string;
  status: string;
  budget: string;
}

export default function ConstituencyPage() {
  const unions: Union[] = [
    {
      name: "ফেনী সদর",
      population: "২৫,০০০",
      wards: 9,
      color: "bg-green-500",
      chairman: "মোঃ জাহিদ হোসেন",
    },
    {
      name: "লেমুয়া",
      population: "২২,০০০",
      wards: 9,
      color: "bg-blue-500",
      chairman: "মোঃ রফিকুল ইসলাম",
    },
    {
      name: "কাজিরবাগ",
      population: "২০,০০০",
      wards: 9,
      color: "bg-purple-500",
      chairman: "মোঃ সেলিম মিয়া",
    },
    {
      name: "মোটবি",
      population: "১৮,০০০",
      wards: 9,
      color: "bg-amber-500",
      chairman: "মোঃ আলমগীর হোসেন",
    },
    {
      name: "চর চান্দিয়া",
      population: "১৫,০০০",
      wards: 9,
      color: "bg-red-500",
      chairman: "মোঃ কামরুল হাসান",
    },
    {
      name: "কালিদহ",
      population: "২১,০০০",
      wards: 9,
      color: "bg-indigo-500",
      chairman: "মোঃ শরিফুল ইসলাম",
    },
    {
      name: "দিঘলিয়া",
      population: "১৯,০০০",
      wards: 9,
      color: "bg-teal-500",
      chairman: "মোঃ শহিদুল্লাহ",
    },
    {
      name: "মহাজন",
      population: "১৭,০০০",
      wards: 9,
      color: "bg-pink-500",
      chairman: "মোঃ আনিসুর রহমান",
    },
    {
      name: "শুভপুর",
      population: "২৩,০০০",
      wards: 9,
      color: "bg-cyan-500",
      chairman: "মোঃ রেজাউল করিম",
    },
  ];

  const developmentProjects: Project[] = [
    {
      title: "ফেনী নদী ব্রিজ",
      area: "ফেনী সদর",
      status: "সম্পন্ন",
      budget: "৫০ কোটি",
    },
    {
      title: "সদর হাসপাতাল উন্নয়ন",
      area: "ফেনী সদর",
      status: "চলমান",
      budget: "৩০ কোটি",
    },
    {
      title: "শহর সড়ক সংস্কার",
      area: "ফেনী সদর",
      status: "চলমান",
      budget: "২০ কোটি",
    },
    {
      title: "লেমুয়া উচ্চ বিদ্যালয়",
      area: "লেমুয়া",
      status: "সম্পন্ন",
      budget: "৫ কোটি",
    },
    {
      title: "কাজিরবাগ কমিউনিটি সেন্টার",
      area: "কাজিরবাগ",
      status: "আসন্ন",
      budget: "৩ কোটি",
    },
    {
      title: "মোটবি ড্রেনেজ সিস্টেম",
      area: "মোটবি",
      status: "চলমান",
      budget: "১০ কোটি",
    },
  ];

  const totalPopulation = unions.reduce((sum: number, union: Union) => {
    const pop = parseInt(union.population.replace(/,/g, ""));
    return sum + (isNaN(pop) ? 0 : pop);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-white rounded-full shadow-lg mb-6">
            <MapPin className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            আমার নির্বাচনী এলাকা: ফেনী সদর
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ফেনী সদর উপজেলার ৯টি ইউনিয়নের উন্নয়ন কার্যক্রম, সমস্যা ও সমাধান।
            সরাসরি জনগণের সাথে যোগাযোগের মাধ্যম।
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">৯</div>
            <div className="text-gray-700">ইউনিয়ন</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {totalPopulation.toLocaleString()}
            </div>
            <div className="text-gray-700">মোট জনসংখ্যা</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">৮১</div>
            <div className="text-gray-700">ওয়ার্ড</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">১৫+</div>
            <div className="text-gray-700">উন্নয়ন প্রকল্প</div>
          </div>
        </div>

        {/* Unions Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ইউনিয়ন সমূহ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unions.map((union: Union, index: number) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`h-12 w-12 ${union.color} rounded-lg flex items-center justify-center`}
                  >
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {union.name}
                    </h3>
                    <p className="text-gray-600 text-sm">ইউনিয়ন</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>জনসংখ্যা: {union.population}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    <span>ওয়ার্ড: {union.wards}টি</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>চেয়ারম্যান: {union.chairman}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition-colors text-sm">
                  {union.name} এর সমস্যা জানান
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Development Projects */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            চলমান উন্নয়ন প্রকল্প
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      প্রকল্প
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      এলাকা
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      অবস্থা
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      বাজেট
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      বিস্তারিত
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {developmentProjects.map(
                    (project: Project, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {project.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {project.area}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              project.status === "সম্পন্ন"
                                ? "bg-green-100 text-green-800"
                                : project.status === "চলমান"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {project.budget}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            দেখুন
                          </button>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                আপনার ইউনিয়নের সমস্যা জানান
              </h3>
              <p className="text-white/90 mb-6">
                সরাসরি আমাদের সাথে যোগাযোগ করে আপনার ইউনিয়নের সমস্যা, উন্নয়ন
                চাহিদা ও পরামর্শ জানাতে পারেন।
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold mb-1">৯টি</div>
                  <div className="text-sm">ইউনিয়ন কভার</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold mb-1">২৪/৭</div>
                  <div className="text-sm">সমস্যা রিপোর্টিং</div>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <span>জরুরি যোগাযোগ: ০১৭০০-১২৩৪৫৬</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <span>ইমেইল: fenisedar@monju.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5" />
                  <span>সময়: সকাল ৯টা - সন্ধ্যা ৬টা</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>অফিস: ফেনী সদর, রাজনৈতিক কার্যালয়</span>
                </div>
              </div>
              <button className="w-full bg-white text-green-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                সমস্যা রিপোর্ট করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
