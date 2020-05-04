import axios from 'axios';
import {ListType} from "../library/types";

export const getListApi = () => axios.get('/list');
export const getStocksApi = () => axios.get('/listStocks');
export const loginUserApi = (value: string) => axios.post('/login', { name: value });
export const registerUserApi = (name: string, balance: number) => axios.post('/register', { name, balance });
export const getBrokerInfoByIdApi = (id: number) => axios.get(`/brokers/${id}`);
export const buyStocksApi = (idStock: number, count: number, idBroker: number) =>
    axios.put(`/brokers/${idBroker}`, {idStock, count});

export const sellStocksApi = (idStock: number, count: number, idBroker: number) =>
    axios.put(`/brokers/sell/${idBroker}`, {idStock, count});
