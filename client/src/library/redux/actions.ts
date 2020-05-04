import actionCreatorFactory from 'typescript-fsa';
import {ListType, StockType} from "../types";

const actionCreator = actionCreatorFactory('library');

export const getInitialData = actionCreator.async<void, {
  brokers: ListType[];
  stocks: StockType[];
}>('GET_INITIAL_DATA');

export const loginUser = actionCreator.async<string, boolean>('LOGIN_USER');
export const registerUser = actionCreator.async<{ name: string, balance: number }, boolean>('REGISTER_USER');

export const getBrokerInfoById = actionCreator.async<string, ListType>('GET_BROKER_INFO_BY_ID');

export const changeStatusBook = actionCreator<
{
  reader: string | null;
  returnDate: string | null;
}>('USER_TAKE_BOOK');

export const buyStocks = actionCreator.async<
    { idStock: number; count: number; },
    { broker: ListType[]; stocks: StockType[];}>
('BUY_STOCKS');

export const sellStocks = actionCreator.async<
    { idStock: number; count: number; },
    { broker: ListType[]; stocks: StockType[];}>
('SELL_STOCKS');