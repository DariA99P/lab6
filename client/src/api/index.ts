import axios from 'axios';
import {ListType} from "../library/types";

export const getBookList = () => axios.get('/list');

export const getBookInfoById = (id: number) => axios.get(`/book/${id}`);

export const updateBook = (id: number, bookInfo: ListType) => axios.put(`/book/${id}`, bookInfo);

export const deleteBookApi = (id: number) => axios.delete(`/book/delete/${id}`);