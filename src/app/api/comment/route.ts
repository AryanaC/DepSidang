import { axiosInstance } from "@/lib/actions";
import { IComment } from "@/types/comment";
import { GenericAbortSignal } from "axios";

type CommentData = {
  id: string;
  name: string;
  comment: string;
  rating: number;
};

type ReplyData = {
  replyComment: string;
};

type ValidateData = {
  isValid: boolean;
};

export const getComments = (params?: any, signal?: GenericAbortSignal) => {
  return axiosInstance.get<{ data: IComment[] }>('/admin/comment', { params, signal }).then((response) => response.data.data);
};

export const createComment = (data: CommentData) => {
  return axiosInstance.post('/admin/comment', data).then((response) => response.data);
};

export const updateReplyComment = (id: string, data: ReplyData) => {
  return axiosInstance.put(`/admin/comment/${id}`, data).then((response) => response.data);
};

export const deleteComment = (id: string) => {
  return axiosInstance.delete(`/admin/comment/${id}`).then((response) => response.data);
};

export const validateComment = (id: string, data: ValidateData) => {
  return axiosInstance.put(`/admin/comment/${id}`, data).then((response) => response.data);
};

export const createUserComment = (data: CommentData) => {
  return axiosInstance.post('/user/comment', data).then((response) => response.data);
};

export const getUserComments = (params?: any, signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: IComment[] }>('/comment', { params, signal }).then((response) => response.data.data);
  };
