import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import React from "react";
import type { Complaint, ComplaintStats } from "../interfaces/complaint";

export interface StatusBadge {
  color: string;
  text: string;
  icon: React.ReactNode;
}

export const getStatusBadge = (status: string): StatusBadge => {
  switch (status) {
    case "pending":
      return {
        color: "yellow",
        text: "বিচারাধীন",
        icon: React.createElement(AlertCircle, { className: "h-4 w-4" }),
      };
    case "in_progress":
      return {
        color: "blue",
        text: "চলমান",
        icon: React.createElement(Clock, { className: "h-4 w-4" }),
      };
    case "solved":
      return {
        color: "green",
        text: "সমাধান হয়েছে",
        icon: React.createElement(CheckCircle, { className: "h-4 w-4" }),
      };
    default:
      return {
        color: "gray",
        text: status,
        icon: React.createElement(AlertCircle, { className: "h-4 w-4" }),
      };
  }
};

export const calculateStats = (complaints: Complaint[]): ComplaintStats => {
  return {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    solved: complaints.filter((c) => c.status === "solved").length,
    inProgress: complaints.filter((c) => c.status === "in_progress").length,
  };
};

export const filterComplaints = (
  complaints: Complaint[],
  statusFilter: string,
  searchQuery: string,
): Complaint[] => {
  let filtered = [...complaints];

  if (statusFilter !== "all") {
    filtered = filtered.filter((c) => c.status === statusFilter);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.complaintId.toLowerCase().includes(query) ||
        c.area.toLowerCase().includes(query),
    );
  }

  return filtered;
};
