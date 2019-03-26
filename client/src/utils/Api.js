import axios from "axios";
import { authHeader } from "./AuthHeader";

export default axios.create({
  baseURL: "http://localhost:9000/api/"
});

export const Api = axios.create({
  baseURL: "http://localhost:9000/api/",
  headers: authHeader()
});
