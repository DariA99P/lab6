import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import * as actions from './actions';
import {
  buyStocksApi,
  getBrokerInfoByIdApi,
  getListApi,
  getStocksApi,
  loginUserApi,
  registerUserApi,
  sellStocksApi
} from "../../api";
import {transformDataToListType} from "../transform";
import {message} from "antd";
import {getCurrentBrokerInfo, getStocks} from "./selectors";
import history from "../../config/history";

function* getList() {
  try {
    const { data } = yield call(getListApi);
    const { data: stocksData} = yield call(getStocksApi);
    yield put(actions.getInitialData.done({
      params: undefined,
      result: {
        brokers: data.map((item: any) => transformDataToListType(item, stocksData)),
        stocks: stocksData,
      }
    }));
  }
  catch (error) {
    console.error(error);
    yield put(actions.getInitialData.failed({
      params: undefined,
      error,
    }));
  }
}

function* loginUser({ payload }: { type: string, payload: string }) {
  try {
    const result = yield call(loginUserApi, payload);
    localStorage.setItem('brokerId', result.data.id);
    history.push('/admin');
    yield put(actions.loginUser.done({
      result: true,
      params: ''
    }));
  }
  catch (error) {
    message.error('Данный пользователь не найден!');
    yield put(actions.loginUser.failed({
      params: '',
      error,
    }));
  }
}

function* registerUser({ payload }: { type: string, payload: { name: string, balance: number } }) {
  try {
    const result = yield call(registerUserApi, payload.name, payload.balance);
    history.push('/');
    yield put(actions.registerUser.done({
      result: true,
      params: { balance: 0, name: ''}
    }));
  }
  catch (error) {
    message.error('Данный пользователь уже существует!');
    yield put(actions.registerUser.failed({
      params: { balance: 0, name: ''},
      error,
    }));
  }
}

function* getBrokerInfo({ payload }: { type: string, payload: string }) {
  try {
    const stocks = yield select(getStocks);
    const { data } = yield call(getBrokerInfoByIdApi, +payload);
    yield put(actions.getBrokerInfoById.done({
      result: transformDataToListType(data, stocks),
      params: ''
    }));
  }
  catch (error) {
    message.error('Данный пользователь не найден!');
    yield put(actions.getBrokerInfoById.failed({
      params: '',
      error,
    }));
  }
}

function* buyStocks({ payload }: { type: string, payload: { idStock: number; count: number; } }) {
  try {
    const brokerInfo = yield select(getCurrentBrokerInfo);
    const { data } = yield call(buyStocksApi, payload.idStock, payload.count, brokerInfo.id);
    yield put(actions.buyStocks.done({
      result: {
        broker: data.list.map((item: any) => transformDataToListType(item, data.stocks)),
        stocks: data.stocks
      },
      params: { count: 0, idStock: 0}
    }));
  }
  catch (error) {
    message.error('Сессия покупки акций не прошла!');
    yield put(actions.buyStocks.failed({
      params: { count: 0, idStock: 0},
      error,
    }));
  }
}

function* sellStocks({ payload }: { type: string, payload: { idStock: number; count: number; } }) {
  try {
    const brokerInfo = yield select(getCurrentBrokerInfo);
    const { data } = yield call(sellStocksApi, payload.idStock, payload.count, brokerInfo.id);
    yield put(actions.sellStocks.done({
      result: {
        broker: data.list.map((item: any) => transformDataToListType(item, data.stocks)),
        stocks: data.stocks
      },
      params: { count: 0, idStock: 0}
    }));
  }
  catch (error) {
    message.error('Сессия продажи акций не прошла!');
    yield put(actions.sellStocks.failed({
      params: { count: 0, idStock: 0},
      error,
    }));
  }
}

export function* saga() {
  yield all([
      takeLatest(actions.getInitialData.started, getList),
      takeLatest(actions.loginUser.started, loginUser),
      takeLatest(actions.registerUser.started, registerUser),
      takeLatest(actions.getBrokerInfoById.started, getBrokerInfo),
      takeLatest(actions.buyStocks.started, buyStocks),
      takeLatest(actions.sellStocks.started, sellStocks)
  ]);
}
