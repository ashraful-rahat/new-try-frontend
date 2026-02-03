export interface Complaint {
  _id: string;
  complaintId: string;
  name: string;
  phone: string;
  area: string;
  complaintType: string;
  details: string;
  status: "pending" | "solved" | "in_progress";
  adminNote?: string;
  createdAt: string;
  solvedAt?: string;
}

export interface ComplaintStats {
  total: number;
  pending: number;
  solved: number;
  inProgress: number;
}
