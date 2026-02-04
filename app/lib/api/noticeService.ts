// app/services/noticeService.ts

import {
  CreateNoticeDTO,
  NoticeResponse,
  UpdateNoticeDTO,
} from "@/app/interfaces/notice";
import axiosInstance from "@/app/utils/axios";
import { sweetAlert } from "@/app/utils/sweetAlert";

const NOTICE_ENDPOINT = "/notices";

// Get all notices
export const fetchAllNotices = async (
  type?: string,
): Promise<NoticeResponse> => {
  try {
    const url = type ? `${NOTICE_ENDPOINT}?type=${type}` : NOTICE_ENDPOINT;
    const response = await axiosInstance.get<NoticeResponse>(url);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching notices:", error);
    await sweetAlert.error(
      "নোটিশ লোড করা যায়নি",
      error.message || "দয়া করে পুনরায় চেষ্টা করুন",
    );
    return {
      success: false,
      message: error.message || "নোটিশ লোড করা যায়নি",
      notices: [],
    };
  }
};

// Get today's notices
export const fetchTodayNotices = async (): Promise<NoticeResponse> => {
  try {
    const response = await axiosInstance.get<NoticeResponse>(
      `${NOTICE_ENDPOINT}/today`,
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching today notices:", error);
    return {
      success: false,
      message: error.message || "আজকের নোটিশ পাওয়া যায়নি",
      notices: [],
    };
  }
};

// Get upcoming notices
export const fetchUpcomingNotices = async (
  limit: number = 10,
): Promise<NoticeResponse> => {
  try {
    const response = await axiosInstance.get<NoticeResponse>(
      `${NOTICE_ENDPOINT}/upcoming?limit=${limit}`,
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching upcoming notices:", error);
    return {
      success: false,
      message: error.message || "আসন্ন নোটিশ পাওয়া যায়নি",
      notices: [],
    };
  }
};

// Get important notices
export const fetchImportantNotices = async (): Promise<NoticeResponse> => {
  try {
    const response = await axiosInstance.get<NoticeResponse>(
      `${NOTICE_ENDPOINT}/important`,
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching important notices:", error);
    return {
      success: false,
      message: error.message || "গুরুত্বপূর্ণ নোটিশ পাওয়া যায়নি",
      notices: [],
    };
  }
};

// Get single notice by ID
export const fetchNoticeById = async (id: string): Promise<NoticeResponse> => {
  try {
    const response = await axiosInstance.get<NoticeResponse>(
      `${NOTICE_ENDPOINT}/${id}`,
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching notice:", error);
    await sweetAlert.error(
      "নোটিশ পাওয়া যায়নি",
      error.message || "দয়া করে পুনরায় চেষ্টা করুন",
    );
    return {
      success: false,
      message: error.message || "নোটিশ পাওয়া যায়নি",
    };
  }
};

// Create new notice
export const createNotice = async (
  data: CreateNoticeDTO,
): Promise<NoticeResponse> => {
  try {
    sweetAlert.loading("নোটিশ তৈরি হচ্ছে...");

    const response = await axiosInstance.post<NoticeResponse>(
      `${NOTICE_ENDPOINT}/create`,
      data,
    );

    sweetAlert.close();

    if (response.data.success) {
      await sweetAlert.success("সফল হয়েছে!", "নোটিশ তৈরি করা হয়েছে");
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sweetAlert.close();

    await sweetAlert.error(
      "নোটিশ তৈরি করা যায়নি",
      error.message || "দয়া করে পুনরায় চেষ্টা করুন",
    );

    return {
      success: false,
      message: error.message || "নোটিশ তৈরি করা যায়নি",
    };
  }
};

// Update notice
export const updateNotice = async (
  id: string,
  data: UpdateNoticeDTO,
): Promise<NoticeResponse> => {
  try {
    sweetAlert.loading("নোটিশ আপডেট হচ্ছে...");

    const response = await axiosInstance.patch<NoticeResponse>(
      `${NOTICE_ENDPOINT}/${id}`,
      data,
    );

    sweetAlert.close();

    if (response.data.success) {
      await sweetAlert.success("সফল হয়েছে!", "নোটিশ আপডেট করা হয়েছে");
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sweetAlert.close();

    await sweetAlert.error(
      "নোটিশ আপডেট করা যায়নি",
      error.message || "দয়া করে পুনরায় চেষ্টা করুন",
    );

    return {
      success: false,
      message: error.message || "নোটিশ আপডেট করা যায়নি",
    };
  }
};

// Delete notice
export const deleteNotice = async (id: string): Promise<NoticeResponse> => {
  try {
    const result = await sweetAlert.confirm(
      "নোটিশ মুছুন",
      "আপনি কি নিশ্চিত যে আপনি এই নোটিশটি মুছতে চান?",
      "হ্যাঁ, মুছুন",
      "না, বাতিল করি",
    );

    if (!result.isConfirmed) {
      throw new Error("নোটিশ মুছুন বাতিল করা হয়েছে");
    }

    sweetAlert.loading("নোটিশ মুছে ফেলা হচ্ছে...");

    const response = await axiosInstance.delete<NoticeResponse>(
      `${NOTICE_ENDPOINT}/${id}`,
    );

    sweetAlert.close();

    if (response.data.success) {
      await sweetAlert.success("সফল হয়েছে!", "নোটিশ মুছে ফেলা হয়েছে");
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sweetAlert.close();

    if (error.message !== "নোটিশ মুছুন বাতিল করা হয়েছে") {
      await sweetAlert.error(
        "নোটিশ মুছতে সমস্যা হয়েছে",
        error.message || "দয়া করে পুনরায় চেষ্টা করুন",
      );
    }

    return {
      success: false,
      message: error.message || "নোটিশ মুছতে সমস্যা হয়েছে",
    };
  }
};

// Export service object
export const noticeService = {
  fetchAllNotices,
  fetchTodayNotices,
  fetchUpcomingNotices,
  fetchImportantNotices,
  fetchNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
};
