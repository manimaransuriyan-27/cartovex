import axios from 'axios';
import appRouter from '../routes/App.routes';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 401 — session expired or not logged in
    if (status === 401) {
      appRouter.navigate('/auth/login');
    }

    // 403 — logged in but not permitted
    if (status === 403) {
      appRouter.navigate('/forbidden');
    }

    // 500+ — server error
    if (status >= 500) {
      appRouter.navigate('/error');
    }

    // 400 / 409 / 422 — rethrow so the calling component's
    // catch block can map errors to specific form fields
    return Promise.reject(error);
  },
);

export default apiClient;

// apiClient.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   },
// );
