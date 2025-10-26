import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    common: {
      // Do NOT set any default content-type - let axios/browser decide
    }
  }
});

// Request interceptor: attach token and handle FormData
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // For FormData, completely bypass transformation and DO NOT set Content-Type
  if (config.data instanceof FormData) {
    console.log("FormData detected - setting up for multipart");
    // CRITICAL: Set transformRequest to pass FormData through completely unmodified
    config.transformRequest = [(data) => data];
    // CRITICAL: Remove the Content-Type header completely
    // This tells axios/XMLHttpRequest to auto-set it with the boundary
    delete config.headers["Content-Type"];
    // Also remove from defaults in case they're applied
    delete config.headers.post["Content-Type"];
  } else if (config.data) {
    // For regular JSON/data, set proper content type
    config.headers["Content-Type"] = "application/json";
  }
  
  console.log("Request config:", {
    url: config.url,
    method: config.method,
    hasAuth: !!config.headers.Authorization,
    contentType: config.headers["Content-Type"],
    isFormData: config.data instanceof FormData,
  });
  
  return config;
});

// Response interceptor: handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Log the error for debugging
      console.error("401 Unauthorized:", {
        url: error.config?.url,
        headers: error.config?.headers,
        data: error.response?.data,
      });
      
      // Only redirect if we had a token (meaning it was invalid/expired)
      const hadToken = localStorage.getItem("token");
      if (hadToken) {
        // Don't auto-logout immediately, let the user see the error
        // localStorage.removeItem("token");
        // localStorage.removeItem("user");
        
        // Only redirect if not already on login page to avoid loops
        // if (window.location.pathname !== "/login") {
        //   window.location.href = "/login";
        // }
      }
    }
    return Promise.reject(error);
  }
);

// Helper function for GET requests
export const fetchData = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

export default api;