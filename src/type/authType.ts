export type UserRole = "admin" | "user" | "customer";

export interface AuthUser {
  $id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
  profileImage?: File | null; // Add this line
}
