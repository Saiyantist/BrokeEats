/**
 * User data structure (returned from API)
 * Contains basic user information and timestamps
 */
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

/**
 * Login form data structure
 * Required fields for user authentication
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration form data structure
 */
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

/**
 * API response structure for authentication endpoints
 * Contains JWT token and user data on successful auth
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Authentication context interface for React Context
 * Provides auth state and methods to child components
 */
export interface AuthContextType {
  user: User | null; // Current authenticated user or null
  token: string | null; // JWT token or null
  login: (credentials: LoginCredentials) => Promise<void>; // Login method
  register: (credentials: RegisterCredentials) => Promise<void>; // Registration method
  logout: () => void; // Logout method
  isLoading: boolean; // Loading state for auth operations
} 