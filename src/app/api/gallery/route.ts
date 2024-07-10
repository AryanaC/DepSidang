import { axiosInstance } from "@/lib/actions";
import { IGallery } from "@/types/gallery";
import { GenericAbortSignal } from "axios";

export const getGalery = (params?: any, signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: IGallery[] }>('/galery', { params, signal }).then((response) => response.data.data);
};

export const createGalery = (data: IGallery) => {
    return axiosInstance.post('/galery', data).then((response) => response.data);
};

export const deleteGalery = (id: string) => {
    return axiosInstance.delete(`/galery/${id}`).then((response) => response.data);
};

export const updateGalery = (id: string, data: any) => {
    return axiosInstance.put(`/galery/${id}`, data).then((response) => response.data);
};
