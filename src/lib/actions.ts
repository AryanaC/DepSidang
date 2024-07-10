import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const API_URL = process.env.API_URL || "http://localhost:8000";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the authorization token
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const handleApiError = (error: any): never => {
  throw new Error(
    error.response?.data?.message || "An error occurred. Please try again."
  );
};

export const apiCall = async <T>(
  method: AxiosRequestConfig["method"],
  url: string,
  data?: any,
  params?: any,
): Promise<T> => {
  try {
  
    const token = localStorage.getItem("token");

    console.log(token);

    if (token) {
      setAuthToken(token);
    }

    const config: AxiosRequestConfig = { method, url, data, params };
    const response: AxiosResponse<T> = await axiosInstance.request<T>(config);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
  return Promise.reject(new Error("Unhandled error occurred"));
};
