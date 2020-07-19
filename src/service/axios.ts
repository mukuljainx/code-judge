import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.interceptors.request.use((config) => {
  // when we are running inside engine
  const token = localStorage.getItem("user.auth.token");

  return {
    ...config,
    baseURL: process.env.API_URL,
    headers: {
      ...config.headers,
    },
  };
});

export default axios;
