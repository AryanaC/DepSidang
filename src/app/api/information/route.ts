import axios from 'axios';

const API_URL = process.env.API_URL || "http://localhost:8000";

export const getInformation = async () => {
    const response = await axios.get(`${API_URL}/admin/information`);
    return response.data;
};

export const createInformation = async (data: any) => {
    const response = await axios.post(`${API_URL}/admin/information`, data);
    return response.data;
};

export const getInformationById = async (id: string) => {
    const response = await axios.get(`${API_URL}/admin/information/${id}`);
    return response.data;
};

export const deleteInformation = async (id: string) => {
    const response = await axios.delete(`${API_URL}/admin/information/${id}`);
    return response.data;
};

export const updateInformation = async (id: string, data: any) => {
    const response = await axios.put(`${API_URL}/admin/information/${id}`, data);
    return response.data;
};
