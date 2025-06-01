import axios, { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";


const axiosInstance = axios.create({
  baseURL: "/",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }
            config.headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);


axios.interceptors.response.use(
    (response: AxiosResponse) => Promise.resolve(response),
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.clear();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
