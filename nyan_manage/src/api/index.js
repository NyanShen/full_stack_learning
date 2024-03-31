import axios from 'axios';
 
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 使用环境变量配置API URL
  timeout: 10000, // 请求超时时间
});
 
export default http;