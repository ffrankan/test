import axios from 'axios';

const HttpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


HttpClient.interceptors.request.use(
  (config) => {
    const token = '222';
    config.headers.authorization = 'Bearer ' + token;
    return config;
  },
  (error) => {
    console.error('网络错误，请稍后重试');
    return Promise.reject(error);
  },
);

HttpClient.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default HttpClient;
