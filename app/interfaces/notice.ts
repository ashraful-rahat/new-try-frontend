// types/notice.ts
export interface SimpleNotice {
  _id: string;
  title: string;
  description: string;
  date: string; // Changed from Date to string for API response
  time?: string;
  location: string;
  type: "election" | "daily" | "important";
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface NoticeResponse {
  success: boolean;
  message: string;
  notice?: SimpleNotice;
  notices?: SimpleNotice[];
}
