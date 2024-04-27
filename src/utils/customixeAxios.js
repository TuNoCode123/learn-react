import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
  timeout: 1000,
});
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
export default instance;
