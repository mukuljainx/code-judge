import axios from "axios";

axios.interceptors.request.use((config) => {
  return {
    ...config,
    baseURL: "http://34.207.245.156:4059",
    headers: {
      ...config.headers,
    },
  };
});

export default axios;
