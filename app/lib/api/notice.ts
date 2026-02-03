// lib/api/notices.ts

import { NoticeResponse, SimpleNotice } from "@/app/interfaces/notice";
import axiosInstance from "@/app/utils/axios";

export const noticeService = {
  // Get all notices
  getAllNotices: async (): Promise<SimpleNotice[]> => {
    try {
      const response = await axiosInstance.get<NoticeResponse>("/notices");
      return response.data.notices || [];
    } catch (error) {
      console.error("Error fetching notices:", error);
      return [];
    }
  },

  // Get latest notices (for home page)
  getLatestNotices: async (limit: number = 4): Promise<SimpleNotice[]> => {
    try {
      const allNotices = await noticeService.getAllNotices();
      return allNotices
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, limit);
    } catch (error) {
      console.error("Error fetching latest notices:", error);
      return [];
    }
  },

  // Get notice by ID
  getNoticeById: async (id: string): Promise<SimpleNotice | null> => {
    try {
      const response = await axiosInstance.get<NoticeResponse>(
        `/notices/${id}`,
      );
      return response.data.notice || null;
    } catch (error) {
      console.error("Error fetching notice:", error);
      return null;
    }
  },
};
