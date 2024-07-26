import axios from "axios";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const globalAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "X-API-Key": process.env.REACT_APP_API_KEY,
    "Content-Type": "application/json",
  },
});

globalAxios.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

globalAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
