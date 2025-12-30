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
  email: string;
  password: string;
  name: string;
}
