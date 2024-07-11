import { apiCall, axiosInstance, setAuthToken } from "@/lib/actions";
import { IGallery } from "@/types/gallery";
import { GenericAbortSignal } from "axios";

export const getGalery = (params?: any, signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: IGallery[] }>('/galery', { params, signal }).then((response) => response.data.data);
};

export const createGalery = (data: FormData) => {

    const token = localStorage.getItem('token');
    setAuthToken(token);

    return axiosInstance.post('/admin/galery', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((response) => response.data);
};

export const deleteGalery = (id: string) => {
    return apiCall<IGallery>("DELETE", `/admin/galery/${id}`, undefined, undefined);
};

export const updateGalery = (id: string, data: any) => {
    return axiosInstance.put(`/galery/${id}`, data).then((response) => response.data);
};
