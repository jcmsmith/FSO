import axios from "axios";

const baseURL = process.env.REACT_APP_PROD
  ? "http://127.0.0.11:3001"
  : "http://localhost:3001/api";

const apiClient = axios.create({
  baseURL,
});

export default apiClient;
