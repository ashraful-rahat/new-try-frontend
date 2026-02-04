// components/Footer.tsx
import {
  Award,
  Calendar,
  Facebook,
  Flag,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-red-600 to-amber-600 rounded-xl flex items-center justify-center">
                <Flag className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">মজিবুর রহমান ভূঁইয়া</h3>
                <p className="text-gray-400 text-sm">
                  চেয়ারম্যান, আমার বাংলাদেশ পার্টি
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              &#34;জনগণের অধিকার, স্বচ্ছতা, ন্যায় এবং গণতান্ত্রিক মূল্যবোধই
              হচ্ছে আমার পথনির্দেশ&ldquo;
            </p>

            <div className="flex items-center gap-4 pt-4">
              <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm">
                সংগ্রামী নেতা
              </span>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                গণমাধ্যম সংগঠক
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-3">
              {[
                { name: "হোম", href: "/" },
                { name: "নেতা সম্পর্কে", href: "/about" },
                { name: "আমার ভিশন", href: "/vision" },
                { name: "নোটিশ", href: "/notices" },
                { name: "ক্যাম্পেইন", href: "/campaign" },
                { name: "অভিযোগ", href: "/complaints" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="h-1 w-1 bg-red-600 rounded-full"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">
              আরও সেবা
            </h4>
            <ul className="space-y-3">
              {[
                {
                  name: "সেবা প্রকল্প",
                  href: "/schemes",
                  icon: <Heart className="h-4 w-4" />,
                },
                {
                  name: "আমার এলাকা",
                  href: "/constituency",
                  icon: <MapPin className="h-4 w-4" />,
                },
                {
                  name: "অ্যাপয়েন্টমেন্ট",
                  href: "/appointments",
                  icon: <Calendar className="h-4 w-4" />,
                },
                {
                  name: "আমার অঙ্গীকার",
                  href: "/pledges",
                  icon: <Award className="h-4 w-4" />,
                },
                {
                  name: "গ্যালারি",
                  href: "/gallery",
                  icon: <Users className="h-4 w-4" />,
                },
                {
                  name: "ডোনেশন",
                  href: "/donation",
                  icon: <Shield className="h-4 w-4" />,
                },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">
              যোগাযোগ
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-red-400 mt-1" />
                <div>
                  <p className="font-medium">ইমেইল</p>
                  <a
                    href="mailto:mrmonju1971@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    mrmonju1971@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <p className="font-medium">হোয়াটসঅ্যাপ</p>
                  <p className="text-gray-400">+880...</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">জন্মস্থান</p>
                  <p className="text-gray-400">নন্দনকানন, চট্টগ্রাম</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <p className="font-medium mb-3">সামাজিক যোগাযোগ</p>
                <div className="flex gap-3">
                  {[
                    {
                      icon: <Facebook className="h-5 w-5" />,
                      href: "#",
                      label: "Facebook",
                    },
                    {
                      icon: <Twitter className="h-5 w-5" />,
                      href: "#",
                      label: "Twitter",
                    },
                    {
                      icon: <Youtube className="h-5 w-5" />,
                      href: "#",
                      label: "YouTube",
                    },
                    {
                      icon: <Linkedin className="h-5 w-5" />,
                      href: "#",
                      label: "LinkedIn",
                    },
                    {
                      icon: <Instagram className="h-5 w-5" />,
                      href: "#",
                      label: "Instagram",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Mission */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear} মজিবুর রহমান ভূঁইয়া মঞ্জু। সর্বস্বত্ব সংরক্ষিত।
              </p>
              <p className="text-gray-500 text-sm mt-1">
                জনগণের জন্য, জনগণের দ্বারা, জনগণের নেতা
              </p>
            </div>

            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  গোপনীয়তা নীতি
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  শর্তাবলী
                </Link>
                <Link
                  href="/disclaimer"
                  className="hover:text-white transition-colors"
                >
                  দায়বদ্ধতা অস্বীকার
                </Link>
                <Link
                  href="/sitemap"
                  className="hover:text-white transition-colors"
                >
                  সাইটম্যাপ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
