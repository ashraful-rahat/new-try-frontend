// app/utils/languageUtils.ts

// =======================
// Bangla Translations
// =======================
const bnTranslations: Record<string, string> = {
  // Campaign Status
  UPCOMING: "আসন্ন",
  ONGOING: "চলমান",
  COMPLETED: "সম্পন্ন",
  CANCELLED: "বাতিল",

  // Campaign Types
  VOLUNTEER: "স্বেচ্ছাসেবক",
  EVENT: "ইভেন্ট",
  SOCIAL_ACTIVITY: "সামাজিক কার্যক্রম",

  // Dashboard
  "Total Campaigns": "মোট ক্যাম্পেইন",
  "Ongoing Campaigns": "চলমান ক্যাম্পেইন",
  "Upcoming Campaigns": "আসন্ন ক্যাম্পেইন",
  "Completed Campaigns": "সম্পন্ন ক্যাম্পেইন",
  "Cancelled Campaigns": "বাতিল ক্যাম্পেইন",

  // Categories (from backend enum)
  শিক্ষা: "শিক্ষা",
  স্বাস্থ্য: "স্বাস্থ্য",
  পরিবেশ: "পরিবেশ",
  "যুব উন্নয়ন": "যুব উন্নয়ন",
  "সামাজিক কার্যক্রম": "সামাজিক কার্যক্রম",
  অন্যান্য: "অন্যান্য",

  // Common
  "Loading...": "লোড হচ্ছে...",
  Error: "ত্রুটি",
  Success: "সফল",
  Warning: "সতর্কতা",
  Info: "তথ্য",
  Yes: "হ্যাঁ",
  No: "না",
  Save: "সংরক্ষণ",
  Cancel: "বাতিল",
  Delete: "মুছুন",
  Edit: "সম্পাদনা",
  View: "দেখুন",
  Create: "তৈরি করুন",
  Update: "আপডেট",
  Refresh: "রিফ্রেশ",
  Search: "খুঁজুন",
  Filter: "ফিল্টার",
  Status: "স্ট্যাটাস",
  Type: "টাইপ",
  Category: "ক্যাটাগরি",
  Location: "লোকেশন",
  Date: "তারিখ",
  Time: "সময়",
  Description: "বিবরণ",
  Title: "শিরোনাম",
  Actions: "কার্যক্রম",
  "Created At": "তৈরির সময়",
  "Updated At": "আপডেটের সময়",
};

// =======================
// Format Date to Bangla
// =======================
export const formatDate = (
  date: Date | string,
  includeTime: boolean = false,
): string => {
  const d = new Date(date);

  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();

  let formatted = `${day}/${month}/${year}`;

  if (includeTime) {
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    formatted += ` ${hours}:${minutes}`;
  }

  return formatted;
};

// =======================
// Get Bangla Status Color
// =======================
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "UPCOMING":
      return "warning"; // orange/yellow
    case "ONGOING":
      return "success"; // green
    case "COMPLETED":
      return "info"; // blue
    case "CANCELLED":
      return "error"; // red
    default:
      return "default";
  }
};

// =======================
// Get Bangla Status Icon
// =======================
export const getStatusIcon = (status: string): string => {
  switch (status) {
    case "UPCOMING":
      return "📅";
    case "ONGOING":
      return "⚡";
    case "COMPLETED":
      return "✅";
    case "CANCELLED":
      return "❌";
    default:
      return "📋";
  }
};

// =======================
// Get Type Icon
// =======================
export const getTypeIcon = (type: string): string => {
  switch (type) {
    case "VOLUNTEER":
      return "🤝";
    case "EVENT":
      return "🎪";
    case "SOCIAL_ACTIVITY":
      return "🏘️";
    default:
      return "📋";
  }
};

// =======================
// Translate to Bangla
// =======================
export const bn = (text: string): string => {
  return bnTranslations[text] || text;
};

// =======================
// Format Number with Bangla Separator
// =======================
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("bn-BD").format(num);
};

// =======================
// Get Relative Time in Bangla
// =======================
export const getRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "এইমাত্র";
  if (diffMins < 60) return `${diffMins} মিনিট আগে`;
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
  if (diffDays < 7) return `${diffDays} দিন আগে`;

  return formatDate(date);
};
