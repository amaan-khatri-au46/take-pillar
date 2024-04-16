import axios from "axios";
import { getUserDetails } from "../utils/commonFunction/common";
const TOKEN_TYPE = "Bearer ";
const REQUEST_HEADER_AUTH_KEY = "Authorization";


const BaseService = axios.create({
  timeout: 60000,
  baseURL: process.env.REACT_APP_BASE_URL,
});

BaseService.interceptors.request.use(
  (config) => {
    const accessToken = getUserDetails()?.payload?.token; 
    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(error, "From Inside")
      return Promise.reject(error); 
    } else {
      return Promise.reject(error); 
    }
  },
);

export default BaseService;
