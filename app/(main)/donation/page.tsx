// app/(main)/donation/page.tsx
"use client";

import {
  Banknote,
  CheckCircle,
  CreditCard,
  HandHeart,
  Lock,
  Shield,
  Smartphone,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function DonationPage() {
  const [donationAmount, setDonationAmount] = useState(500);
  const [paymentMethod, setPaymentMethod] = useState("bkash");

  const donationOptions = [100, 500, 1000, 2000, 5000, "অন্যান্য"];

  const paymentMethods = [
    {
      id: "bkash",
      name: "bKash",
      icon: <Smartphone className="h-6 w-6 text-pink-600" />,
      number: "০১৭০০-১২৩৪৫৬",
      description: "দ্রুত ও নিরাপদ",
    },
    {
      id: "nagad",
      name: "Nagad",
      icon: <Smartphone className="h-6 w-6 text-green-600" />,
      number: "০১৭০০-৭৮৯০১২",
      description: "সুবিধাজনক",
    },
    {
      id: "rocket",
      name: "Rocket",
      icon: <Smartphone className="h-6 w-6 text-purple-600" />,
      number: "০১৭৩০-১২৩৪৫৬",
      description: "দ্রুত প্রক্রিয়াকরণ",
    },
    {
      id: "bank",
      name: "ব্যাংক",
      icon: <Banknote className="h-6 w-6 text-blue-600" />,
      number: "আইবিএম ব্যাংক, ফেনী",
      description: "ডিজিটাল ট্রানজেকশন",
    },
  ];

  const recentDonations = [
    {
      name: "আনোয়ার হোসেন",
      amount: "৫০০",
      method: "bKash",
      time: "২ ঘণ্টা আগে",
    },
    {
      name: "নাজমা আক্তার",
      amount: "১০০০",
      method: "Nagad",
      time: "৩ ঘণ্টা আগে",
    },
    {
      name: "রফিকুল ইসলাম",
      amount: "২০০০",
      method: "ব্যাংক",
      time: "৫ ঘণ্টা আগে",
    },
    {
      name: "সম্মিলিত দান",
      amount: "৫০০০",
      method: "Rocket",
      time: "১ দিন আগে",
    },
  ];

  const transparencyData = [
    { category: "শিক্ষা", amount: "৫০,০০০", percentage: 40 },
    { category: "স্বাস্থ্য", amount: "৩০,০০০", percentage: 25 },
    { category: "দুর্যোগ ত্রাণ", amount: "২০,০০০", percentage: 15 },
    { category: "যুব উন্নয়ন", amount: "১৫,০০০", percentage: 12 },
    { category: "প্রশাসন", amount: "৫,০০০", percentage: 8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-white rounded-full shadow-lg mb-6">
            <HandHeart className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ডোনেশন</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            জনসেবা ও সামাজিক উন্নয়ন কার্যক্রম বাস্তবায়নের জন্য আপনার দান।
            প্রতিটি টাকা স্বচ্ছতার সাথে জনগণের কল্যাণে ব্যয় করা হয়।
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">
              ১,২০,০০০+
            </div>
            <div className="text-gray-700">মোট সংগ্রহ (টাকা)</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">৫০০+</div>
            <div className="text-gray-700">মোট দাতা</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">১২</div>
            <div className="text-gray-700">প্রকল্প সমর্থিত</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">১০০%</div>
            <div className="text-gray-700">স্বচ্ছতা</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Donation Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Donation Amount */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                দানের পরিমাণ নির্বাচন
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {donationOptions.map((amount) => (
                  <button
                    key={amount}
                    onClick={() =>
                      setDonationAmount(
                        amount === "অন্যান্য" ? 0 : (amount as number),
                      )
                    }
                    className={`py-4 rounded-xl font-bold text-lg transition-all ${
                      donationAmount === (amount === "অন্যান্য" ? 0 : amount)
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {amount === "অন্যান্য" ? amount : `${amount} টাকা`}
                  </button>
                ))}
              </div>

              {donationAmount === 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    কাস্টম অ্যামাউন্ট
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                      placeholder="দানের পরিমাণ লিখুন"
                      onChange={(e) =>
                        setDonationAmount(Number(e.target.value))
                      }
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      টাকা
                    </span>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">দানের পরিমাণ:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {donationAmount} টাকা
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">পরিষেবা চার্জ:</span>
                  <span className="text-gray-900">০ টাকা</span>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      মোট:
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      {donationAmount} টাকা
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                পেমেন্ট মাধ্যম
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === method.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {method.icon}
                      <div>
                        <div className="font-bold text-gray-900">
                          {method.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {method.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">{method.number}</div>
                  </button>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      নিরাপদ লেনদেন
                    </h4>
                    <p className="text-gray-600 text-sm">
                      আপনার সব তথ্য এনক্রিপ্টেড ও সম্পূর্ণ নিরাপদ। আমরা আপনার
                      ব্যক্তিগত তথ্য কখনোই শেয়ার করি না।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="space-y-8">
            {/* Donation Button */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">দান করুন</h3>
              <p className="text-white/90 mb-6">
                আপনার দান সামাজিক উন্নয়ন ও জনসেবার কাজে ব্যবহৃত হবে।
              </p>
              <div className="mb-6">
                <div className="text-3xl font-bold mb-2">
                  {donationAmount} টাকা
                </div>
                <div className="text-white/80">মোট দানের পরিমাণ</div>
              </div>
              <button className="w-full bg-white text-red-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  এখনই দান করুন
                </div>
              </button>
              <div className="mt-4 text-center text-sm text-white/80">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4" />
                  ১০০% নিরাপদ লেনদেন
                </div>
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                সাম্প্রতিক দান
              </h3>
              <div className="space-y-4">
                {recentDonations.map((donation, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {donation.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {donation.method}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">
                        {donation.amount} টাকা
                      </div>
                      <div className="text-xs text-gray-500">
                        {donation.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-center text-red-600 font-medium hover:text-red-700">
                সব দান দেখুন →
              </button>
            </div>

            {/* Transparency */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                অর্থের ব্যবহার
              </h3>
              <div className="space-y-4">
                {transparencyData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm text-gray-700 mb-1">
                      <span>{item.category}</span>
                      <span>
                        {item.amount} টাকা ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>মাসিক প্রতিবেদন প্রকাশিত হয়</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Impact */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">আপনার দানের প্রভাব</h2>
              <p className="text-white/90 mb-6">
                আপনার প্রতিটি দান সরাসরি জনগণের জীবন পরিবর্তনে ভূমিকা রাখে। গত
                বছরে আমাদের দানের মাধ্যমে:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">৫০০+</div>
                  <div className="text-sm">শিক্ষার্থী উপবৃত্তি</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">২০০+</div>
                  <div className="text-sm">চিকিৎসা সহায়তা</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">১০০০+</div>
                  <div className="text-sm">দুর্যোগ ত্রাণ প্যাকেট</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">৫০+</div>
                  <div className="text-sm">মহিলা উদ্যোক্তা</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">দাতাদের জন্য বিশেষ</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-300" />
                  <span>দাতাদের বার্ষিক সম্মেলনে আমন্ত্রণ</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>মাসিক আপডেট ও প্রতিবেদন</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-300" />
                  <span>ট্যাক্স রিটার্নের জন্য রসিদ</span>
                </li>
                <li className="flex items-center gap-2">
                  <HandHeart className="h-5 w-5 text-green-300" />
                  <span>প্রত্যক্ষ সাহায্য কার্যক্রমে অংশগ্রহণ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
