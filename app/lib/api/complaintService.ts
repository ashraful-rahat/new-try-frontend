import { Complaint } from "@/app/interfaces/complaint";
import axiosInstance from "@/app/utils/axios";

export const complaintService = {
  getAllComplaints: async (): Promise<Complaint[]> => {
    try {
      const response = await axiosInstance.get("/complaints/all");

      // Directly check response data
      if (response.data && Array.isArray(response.data.complaints)) {
        return response.data.complaints;
      } else if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.complaints)
      ) {
        return response.data.complaints;
      } else if (Array.isArray(response.data)) {
        // যদি শুধু array টাই সরাসরি আসে
        return response.data;
      }

      console.log("Unexpected API response structure:", response.data);
      return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Service Error:", error.message);
      throw error; // Re-throw for component to handle
    }
  },

  updateStatus: async (
    id: string,
    status: string,
    adminNote?: string,
  ): Promise<void> => {
    try {
      await axiosInstance.patch(`/complaints/${id}/status`, {
        status,
        adminNote: adminNote || undefined,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Update Error:", error.message);
      throw error;
    }
  },

  deleteComplaint: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/complaints/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Delete Error:", error.message);
      throw error;
    }
  },
};
