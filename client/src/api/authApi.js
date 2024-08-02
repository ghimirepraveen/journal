import axios from "axios";

const API_BASE_URL = "api";

export const loginApi = (credentials) =>
  axios.post(`${API_BASE_URL}/login`, credentials);

export const registerApi = (data) =>
  axios.post(`${API_BASE_URL}/register`, data);

export const changePasswordApi = (data) =>
  axios.put(`${API_BASE_URL}/change-password`, data);

export const resetPasswordApi = (data) =>
  axios.post(`${API_BASE_URL}/reset-password`, data);
