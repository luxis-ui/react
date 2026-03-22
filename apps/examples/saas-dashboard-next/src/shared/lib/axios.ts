import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Example: Get token from localStorage or any secure storage
function getAuthToken(): string | null {
  return localStorage.getItem('token');
}

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add other custom headers or logging here
    return config;
  },
  (error: AxiosError) => {
    // Log request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Optionally handle response globally
    return response;
  },
  (error: AxiosError) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Response error:', error.response.status, error.response.data);
      // Example: handle 401 Unauthorized
      if (error.response.status === 401) {
        // Optionally redirect to login or refresh token
      }
    } else if (error.request) {
      // No response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Axios error:', error.message);
    }
    return Promise.reject(error);
  }
);

export { api };