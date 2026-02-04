// app/interfaces/notice.ts

export type NoticeType = "election" | "daily" | "important";

export interface SimpleNotice {
  _id: string;
  title: string;
  description: string;
  date: Date | string;
  time?: string;
  location: string;
  type: NoticeType;
  priority: number;
  createdAt: Date | string;
}

export interface CreateNoticeDTO {
  title: string;
  description: string;
  date: Date | string;
  time?: string;
  location: string;
  type?: NoticeType;
  priority?: number;
}

export interface UpdateNoticeDTO {
  title?: string;
  description?: string;
  date?: Date | string;
  time?: string;
  location?: string;
  type?: NoticeType;
  priority?: number;
}

export interface NoticeResponse {
  success: boolean;
  message: string;
  notice?: SimpleNotice;
  notices?: SimpleNotice[];
}

export interface NoticeFilter {
  type?: NoticeType;
  search?: string;
  date?: Date | string;
}
