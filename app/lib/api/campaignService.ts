// app/services/campaignService.ts

import {
  CampaignFilter,
  CampaignResponse,
  CampaignStatsResponse,
  CreateCampaignDTO,
  UpdateCampaignDTO,
} from "@/app/interfaces/campaign";
import axiosInstance from "@/app/utils/axios";
import { sweetAlert } from "@/app/utils/sweetAlert";

// =======================
// Campaign API Service
// =======================

/**
 * Get campaign statistics
 */
export const fetchCampaignStats = async (): Promise<CampaignStatsResponse> => {
  try {
    sweetAlert.loading("পরিসংখ্যান লোড হচ্ছে...");

    const response =
      await axiosInstance.get<CampaignStatsResponse>("/campaigns/stats");

    sweetAlert.close();

    if (response.data.success) {
      sweetAlert.toast("পরিসংখ্যান লোড হয়েছে", "success");
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sweetAlert.close();

    await sweetAlert.error(
      "পরিসংখ্যান লোড করা যায়নি",
      error.message || "দয়া করে পুনরায় চেষ্টা করুন",
    );

    return {
      success: false,
      message: error.message || "পরিসংখ্যান লোড করা যায়নি",
      stats: {
        total: 0,
        upcoming: 0,
        ongoing: 0,
        completed: 0,
        cancelled: 0,
      },
    };
  }
};

/**
 * Get all campaigns with optional filters
 */
export const fetchAllCampaigns = async (
  filters?: CampaignFilter,
): Promise<CampaignResponse> => {
  try {
    const params = new URLSearchParams();

    if (filters?.status) params.append("status", filters.status);
    if (filters?.type) params.append("type", filters.type);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.search) params.append("search", filters.search);

    const queryString = params.toString();
    const url = queryString ? `/campaigns?${queryString}` : "/campaigns";

    const response = await axiosInstance.get<CampaignResponse>(url);

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await sweetAlert.error(
      "ক্যাম্পেইন লোড করা যায়নি",
      error.message || "দয়া করে পুনরায় চেষ্টা করুন",
    );

    return {
      success: false,
      message: error.message || "ক্যাম্পেইন লোড করা যায়নি",
      campaigns: [],
    };
  }
};

/**
 * Get active/ongoing campaigns
 */
export const fetchActiveCampaigns = async (): Promise<CampaignResponse> => {
  try {
    const response =
      await axiosInstance.get<CampaignResponse>("/campaigns/active");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "সক্রিয় ক্যাম্পেইন পাওয়া যায়নি",
      campaigns: [],
    };
  }
};

/**
 * Get single campaign by ID
 */
export const fetchCampaignById = async (
  id: string,
): Promise<CampaignResponse> => {
  try {
    const response = await axiosInstance.get<CampaignResponse>(
      `/campaigns/${id}`,
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await sweetAlert.error(
      "ক্যাম্পেইন পাওয়া যায়নি",
      error.message || "দয়া করে পুনরায় চেষ্টা করুন",
    );

    return {
      success: false,
      message: error.message || "ক্যাম্পেইন পাওয়া যায়নি",
    };
  }
};

/**
 * Create new campaign (with or without images)
 */
export const createCampaign = async (
  campaignData: CreateCampaignDTO,
  images?: File[],
): Promise<CampaignResponse> => {
  try {
    sweetAlert.loading("ক্যাম্পেইন তৈরি হচ্ছে...");

    let response;

    if (images && images.length > 0) {
      // With images - use FormData
      const formData = new FormData();

      // Append campaign data
      Object.entries(campaignData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof Date) {
            formData.append(key, value.toISOString());
          } else if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Append images
      images.forEach((image) => {
        formData.append("images", image);
      });

      response = await axiosInstance.post<CampaignResponse>(
        "/campaigns/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    } else {
      // Without images - use JSON
      response = await axiosInstance.post<CampaignResponse>(
        "/campaigns/create",
        campaignData,
      );
    }

    sweetAlert.close();

    if (response.data.success) {
      await sweetAlert.success(
        "সফল হয়েছে!",
        "ক্যাম্পেইন সফলভাবে তৈরি করা হয়েছে",
      );
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sweetAlert.close();

    await sweetAlert.error(
      "ক্যাম্পেইন তৈরি করা যায়নি",
      error.message || "দয়া করে পুনরায় চেষ্টা করুন",
    );

    return {
      success: false,
      message: error.message || "ক্যাম্পেইন তৈরি করা যায়নি",
    };
  }
};

/**
 * Update existing campaign
 */
export const updateCampaign = async (
  id: string,
  updateData: UpdateCampaignDTO,
  images?: File[],
): Promise<CampaignResponse> => {
  try {
    sweetAlert.loading("ক্যাম্পেইন আপডেট হচ্ছে...");

    let response;

    if (images && images.length > 0) {
      // With images - use FormData
      const formData = new FormData();

      // Append update data
      Object.entries(updateData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof Date) {
            formData.append(key, value.toISOString());
          } else if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Append images
      images.forEach((image) => {
        formData.append("images", image);
      });

      response = await axiosInstance.patch<CampaignResponse>(
        `/campaigns/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    } else {
      // Without images - use JSON
      response = await axiosInstance.patch<CampaignResponse>(
        `/campaigns/${id}`,
        updateData,
      );
    }

    sweetAlert.close();

    if (response.data.success) {
      await sweetAlert.success(
        "সফল হয়েছে!",
        "ক্যাম্পেইন সফলভাবে আপডেট করা হয়েছে",
      );
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sweetAlert.close();

    await sweetAlert.error(
      "ক্যাম্পেইন আপডেট করা যায়নি",
      error.message || "দয়া করে পুনরায় চেষ্টা করুন",
    );

    return {
      success: false,
      message: error.message || "ক্যাম্পেইন আপডেট করা যায়নি",
    };
  }
};

/**
 * Update campaign status
 */
export const updateCampaignStatus = async (
  id: string,
  status: string,
): Promise<CampaignResponse> => {
  try {
    const result = await sweetAlert.confirm(
      "স্ট্যাটাস পরিবর্তন",
      `আপনি কি এই ক্যাম্পেইনের স্ট্যাটাস "${status}" এ পরিবর্তন করতে চান?`,
      "হ্যাঁ, পরিবর্তন করি",
      "না, বাতিল করি",
    );

    if (!result.isConfirmed) {
      throw new Error("স্ট্যাটাস পরিবর্তন বাতিল করা হয়েছে");
    }

    sweetAlert.loading("স্ট্যাটাস আপডেট হচ্ছে...");

    const response = await axiosInstance.patch<CampaignResponse>(
      `/campaigns/${id}/status`,
      { status },
    );

    sweetAlert.close();

    if (response.data.success) {
      await sweetAlert.success(
        "সফল হয়েছে!",
        "ক্যাম্পেইন স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে",
      );
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sweetAlert.close();

    if (error.message !== "স্ট্যাটাস পরিবর্তন বাতিল করা হয়েছে") {
      await sweetAlert.error(
        "স্ট্যাটাস আপডেট করা যায়নি",
        error.message || "দয়া করে পুনরায় চেষ্টা করুন",
      );
    }

    return {
      success: false,
      message: error.message || "স্ট্যাটাস আপডেট করা যায়নি",
    };
  }
};

/**
 * Delete campaign
 */
export const deleteCampaign = async (id: string): Promise<CampaignResponse> => {
  try {
    const result = await sweetAlert.confirm(
      "ক্যাম্পেইন মুছুন",
      "আপনি কি নিশ্চিত যে আপনি এই ক্যাম্পেইনটি মুছতে চান? এই কাজটি পূর্বাবস্থায় ফিরিয়ে আনা যাবে না।",
      "হ্যাঁ, মুছুন",
      "না, বাতিল করি",
    );

    if (!result.isConfirmed) {
      throw new Error("ক্যাম্পেইন মুছুন বাতিল করা হয়েছে");
    }

    sweetAlert.loading("ক্যাম্পেইন মুছে ফেলা হচ্ছে...");

    const response = await axiosInstance.delete<CampaignResponse>(
      `/campaigns/${id}`,
    );

    sweetAlert.close();

    if (response.data.success) {
      await sweetAlert.success(
        "সফল হয়েছে!",
        "ক্যাম্পেইন সফলভাবে মুছে ফেলা হয়েছে",
      );
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sweetAlert.close();

    if (error.message !== "ক্যাম্পেইন মুছুন বাতিল করা হয়েছে") {
      await sweetAlert.error(
        "ক্যাম্পেইন মুছতে সমস্যা হয়েছে",
        error.message || "দয়া করে পুনরায় চেষ্টা করুন",
      );
    }

    return {
      success: false,
      message: error.message || "ক্যাম্পেইন মুছতে সমস্যা হয়েছে",
    };
  }
};

/**
 * Add images to existing campaign
 */
export const addImagesToCampaign = async (
  id: string,
  images: File[],
): Promise<CampaignResponse> => {
  try {
    if (!images || images.length === 0) {
      throw new Error("কমপক্ষে একটি ইমেজ প্রয়োজন");
    }

    sweetAlert.loading("ইমেজ আপলোড হচ্ছে...");

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await axiosInstance.post<CampaignResponse>(
      `/campaigns/${id}/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    sweetAlert.close();

    if (response.data.success) {
      await sweetAlert.success("সফল হয়েছে!", "ইমেজ সফলভাবে যোগ করা হয়েছে");
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sweetAlert.close();

    await sweetAlert.error(
      "ইমেজ যোগ করা যায়নি",
      error.message || "দয়া করে পুনরায় চেষ্টা করুন",
    );

    return {
      success: false,
      message: error.message || "ইমেজ যোগ করা যায়নি",
    };
  }
};

/**
 * Remove image from campaign
 */
export const removeImageFromCampaign = async (
  campaignId: string,
  publicId: string,
): Promise<CampaignResponse> => {
  try {
    const result = await sweetAlert.confirm(
      "ইমেজ মুছুন",
      "আপনি কি নিশ্চিত যে আপনি এই ইমেজটি মুছতে চান?",
      "হ্যাঁ, মুছুন",
      "না, বাতিল করি",
    );

    if (!result.isConfirmed) {
      throw new Error("ইমেজ মুছুন বাতিল করা হয়েছে");
    }

    sweetAlert.loading("ইমেজ মুছে ফেলা হচ্ছে...");

    const response = await axiosInstance.delete<CampaignResponse>(
      `/campaigns/${campaignId}/images/${publicId}`,
    );

    sweetAlert.close();

    if (response.data.success) {
      await sweetAlert.success("সফল হয়েছে!", "ইমেজ সফলভাবে মুছে ফেলা হয়েছে");
    }

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sweetAlert.close();

    if (error.message !== "ইমেজ মুছুন বাতিল করা হয়েছে") {
      await sweetAlert.error(
        "ইমেজ মুছতে সমস্যা হয়েছে",
        error.message || "দয়া করে পুনরায় চেষ্টা করুন",
      );
    }

    return {
      success: false,
      message: error.message || "ইমেজ মুছতে সমস্যা হয়েছে",
    };
  }
};

/**
 * Export all functions
 */
export const campaignService = {
  fetchCampaignStats,
  fetchAllCampaigns,
  fetchActiveCampaigns,
  fetchCampaignById,
  createCampaign,
  updateCampaign,
  updateCampaignStatus,
  deleteCampaign,
  addImagesToCampaign,
  removeImageFromCampaign,
};
