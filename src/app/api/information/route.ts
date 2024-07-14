import { apiCall } from '@/lib/actions';
import { IInformation } from '@/types/information';
import axios from 'axios';

export const getInformation = async () => {
    return apiCall<IInformation>("GET", `admin/information`, undefined, undefined);
};

export const createInformation = async (data: any) => {
    return apiCall<IInformation>("POST", `admin/information`, data, undefined);
};

export const deleteInformation = async (id: string) => {
    return apiCall<IInformation>("DELETE", `admin/information/${id}`, undefined, undefined);
};

export const updateInformation = async (id: string, data: any) => {
    return apiCall<IInformation>("PUT", `admin/information/${id}`, data, undefined);
};
