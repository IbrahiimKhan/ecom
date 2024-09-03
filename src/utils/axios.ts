import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';
const TIME_OUT = 3000;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {'Content-Type': 'application/json'},
});
