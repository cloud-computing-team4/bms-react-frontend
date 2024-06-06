// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://54.180.233.127:443",
  withCredentials: true,
});
export default instance;