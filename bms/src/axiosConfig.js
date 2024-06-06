// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://54.180.233.127:8080",
  withCredentials: true,
});
export default instance;
