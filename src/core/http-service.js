import axios from "axios";
const BASE_URL = "http://localhost:4000";

export const httpservice = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-apikey": "aVerySecureAndRandomKey123!@#$",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
