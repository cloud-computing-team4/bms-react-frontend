// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://cloudbms.kro.kr",
  withCredentials: true,
});

export default instance;
