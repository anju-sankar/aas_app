// src/api.js
import axios from "axios"

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // takes the base URL from env
  headers: {
    'Content-Type': 'application/json',
    'X-Tenant-Domain': window.location.hostname,
  },
});

export default api;
