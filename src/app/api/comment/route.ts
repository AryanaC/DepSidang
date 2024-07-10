import { apiCall, axiosInstance } from "@/lib/actions";
import { IComment, ReplyData, ValidateData } from "@/types/comment";
import { GenericAbortSignal } from "axios";

type CommentData = {
  id: string;
  name: string;
  comment: string;
  rating: number;
};
export const getComments = (params?: any, signal?: GenericAbortSignal) => {
  return apiCall<IComment[]>("GET", `/admin/comment`, undefined, params);
  // return axiosInstance.get<{ data: IComment[] }>('/admin/comment', { params, signal }).then((response) => response.data.data);
};

export const createComment = (data: CommentData) => {
  return axiosInstance.post('/admin/comment', data).then((response) => response.data);
};

export const updateReplyComment = (id: string, data: ReplyData) => {
  return apiCall<any>("PUT", `/admin/comment/${id}`, data, undefined);
};

export const deleteComment = (id: string) => {
  return apiCall<any>("DELETE", `/admin/comment/${id}`, undefined, undefined);
};

export const validateComment = (id: string, data: ValidateData) => {
  return apiCall<any>("PUT", `/admin/comment/validate/${id}`, data, undefined);
};

export const createUserComment = (data: CommentData) => {
  return axiosInstance.post('/user/comment', data).then((response) => response.data);
};

export const getUserComments = (params?: any, signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: IComment[] }>('/comment', { params, signal }).then((response) => response.data.data);
  };
