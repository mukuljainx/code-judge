import axios from "axios";

axios.interceptors.request.use((config) => {
  return {
    ...config,
    baseURL: "http://54.83.114.188:4059",
    headers: {
      ...config.headers,
    },
  };
});

export default axios;
