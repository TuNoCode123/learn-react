import axios from "axios";
import { store } from "../redux/store/store";
const instance = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
  timeout: 1000,
});
instance.interceptors.request.use(
  function (config) {
    const token = store.getState()?.login?.accessToken;
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response?.data;
  },
  function (error) {
    return error ? error?.response?.data : Promise.reject(error);
  }
);
export default instance;
