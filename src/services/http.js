import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BE,
  withCredentials: true,
  timeout: 8000,
});
