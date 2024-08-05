import axiosInstance from "./axiosInstance";

export const generateAIContent = (prompt) =>
  axiosInstance.post("/generate-ai-content", { prompt });

export const addJournal = (data) => axiosInstance.post("/add", data);

export const getJournals = () => axiosInstance.get("/get");

export const getJournal = (id) => axiosInstance.get(`/getbyid/${id}`);

export const deleteJournal = (id) => axiosInstance.delete(`delete/${id}`);
