// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.cloudbms.kro.kr/",
  withCredentials: true,
});

export default instance;
