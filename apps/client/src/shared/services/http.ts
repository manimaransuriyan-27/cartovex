import axios, { AxiosRequestConfig } from 'axios';
import { rootStore } from '@/app/stores/RootStore';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // CRITICAL: sends httpOnly cookies on every request
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Refresh token queue setup ──────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: unknown) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
}

// ── Response interceptor ───────────────────────────────────────────────────
http.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    const is401 = error.response?.status === 401;
    const isRefreshEndpoint = originalRequest.url?.includes('/auth/refresh');
    const alreadyRetried = originalRequest._retry;

    // If 401 on refresh endpoint itself → session is fully expired → logout
    if (is401 && isRefreshEndpoint) {
      processQueue(error);
      // Trigger logout — import rootStore lazily to avoid circular deps
      rootStore.auth.clearSession();
      window.location.href = '/login?reason=session_expired';
      return Promise.reject(error);
    }

    // If 401 on any other endpoint and not already retried
    if (is401 && !alreadyRetried) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue this request while a refresh is already in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => http(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Call refresh — cookie is sent automatically (withCredentials)
        await http.post('/api/auth/refresh');
        processQueue(null); // Replay all queued requests
        return http(originalRequest); // Replay original failed request
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default http;
