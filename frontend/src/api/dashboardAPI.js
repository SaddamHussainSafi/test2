import api from "./apiClient";

export const getShelterDashboard = () => api.get("/shelter/dashboard");
export const getAdopterDashboard = () => api.get("/adopter/dashboard");
export const getAdminDashboard = () => api.get("/admin/dashboard");
export const getSuperAdminDashboard = () => api.get("/superadmin/dashboard");