export type AdminRole = "admin" | "member";

// Response after login/register
export interface AuthResponse {
  message: string;
  admin?: {
    id: string;
    email: string;
    role: AdminRole;
  };
  token?: string;
}
