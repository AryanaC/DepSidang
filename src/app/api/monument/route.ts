import { apiCall, axiosInstance, setAuthToken } from '@/lib/actions';
import { IInformation } from '@/types/information';
import { IMonument } from '@/types/monument';
import axios from 'axios';

export const getMonument = async () => {
    return apiCall<IMonument[]>("GET", `admin/monument`, undefined, undefined);
};

export const createMonument = async (data: any) => {
    const token = localStorage.getItem('token');
    setAuthToken(token);

    return axiosInstance.post('/admin/monument', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((response) => response.data);
};

export const deleteMonument = async (id: string) => {
    return apiCall<IMonument>("DELETE", `admin/monument/${id}`, undefined, undefined);
};

export const updateMonument = async (id: string, data: any) => {
    return apiCall<IMonument>("PUT", `admin/monument/${id}`, data, undefined);
};
