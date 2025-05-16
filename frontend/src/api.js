import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change to your backend URL if deployed
});

export default api;
