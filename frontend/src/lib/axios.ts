import axios from "axios";

/**
 * Axios instance configured for Laravel API
 * Sets base URL and default headers for all requests
 */
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Laravel API endpoint (static)
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor to automatically add auth token.
 * Retrieves token from localStorage and adds to Authorization header.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Bearer token to all requests
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle authentication errors.
 * Automatically logs out user and redirects to login on 401 errors.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); // Clear invalid token
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
