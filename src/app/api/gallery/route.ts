import { apiCall, axiosInstance } from "@/lib/actions";
import { IGallery } from "@/types/gallery";
import { GenericAbortSignal } from "axios";

export const getGalery = (params?: any, signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: IGallery[] }>('/galery', { params, signal }).then((response) => response.data.data);
};

export const createGalery = (data: IGallery) => {
    return apiCall<IGallery>("GET", "/galery", data, undefined);
};

export const deleteGalery = (id: string) => {
    return apiCall<IGallery>("DELETE", `/admin/galery/${id}`, undefined, undefined);
};

export const updateGalery = (id: string, data: any) => {
    return axiosInstance.put(`/galery/${id}`, data).then((response) => response.data);
};
