import { axiosInstance } from "@/lib/actions";
import { IGallery } from "@/types/gallery";
import { GenericAbortSignal } from "axios";

export const loginUser = (data: any) => {
    return axiosInstance.post('/login', data).then((response) => response.data);
  };
  
  export const registerUser = (data: any) => {
    return axiosInstance.post('/register', data).then((response) => response.data);
  };