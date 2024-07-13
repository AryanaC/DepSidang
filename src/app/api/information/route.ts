import { apiCall } from '@/lib/actions';
import { IInformation } from '@/types/information';
import axios from 'axios';

export const getInformation = async () => {
    return apiCall<IInformation>("GET", `admin/information`, undefined, undefined);
};

// export const createInformation = async (data: any) => {
//     const response = await axios.post(`${API_URL}/admin/information`, data);
//     return response.data;
// };

// export const getInformationById = async (id: string) => {
//     const response = await axios.get(`${API_URL}/admin/information/${id}`);
//     return response.data;
// };

// export const deleteInformation = async (id: string) => {
//     const response = await axios.delete(`${API_URL}/admin/information/${id}`);
//     return response.data;
// };

// export const updateInformation = async (id: string, data: any) => {
//     const response = await axios.put(`${API_URL}/admin/information/${id}`, data);
//     return response.data;
// };
