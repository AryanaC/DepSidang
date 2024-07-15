import { apiCall, axiosInstance, setAuthToken } from "@/lib/actions";
import { VisitorFavorite } from "@/types/any";
import { IGallery } from "@/types/gallery";
import { GenericAbortSignal } from "axios";

export const getHomePage = (params?: any, signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: VisitorFavorite[] }>('/homepage', { params, signal }).then((response) => response.data.data);
};
