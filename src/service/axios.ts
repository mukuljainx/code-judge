import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.interceptors.request.use((config) => {
  // when we are running inside engine
  const token = localStorage.getItem("user.auth.token");

  return {
    ...config,
    baseURL: "http://54.226.177.73:4059",
    headers: {
      ...config.headers,
    },
  };
});

export default axios;
