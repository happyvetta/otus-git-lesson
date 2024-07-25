import axios from "axios";
import config from "../config/config.js";

export const client = axios.create({
  baseURL: config.baseURL,
});
