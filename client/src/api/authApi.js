import axios from "axios";

const API_BASE_URL = "http://localhost:5050/api/user";

export const loginApi = (credentials) =>
  axios.post(`${API_BASE_URL}/login`, credentials);

export const registerApi = (data) =>
  axios.post(`${API_BASE_URL}/register`, data);

// export const changePasswordApi = (data) =>
//   axios.put(`${API_BASE_URL}/change-password`, data);

export const forgotPasswordApi = (email) =>
  axios.post(`${API_BASE_URL}/forgotpassword`, email);

export const resetPasswordApi = (data) =>
  axios.post(`${API_BASE_URL}/resetpassword`, data);
