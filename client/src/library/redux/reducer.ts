import { reducerWithInitialState } from 'typescript-fsa-reducers';

import * as actions from './actions';
import {ListType, StockType} from "../types";

export interface ILibraryReducerShape {
  list: ListType[];
  stocks: StockType[];
  currentBookId: number | null;
  isEditMode: boolean;
  isSaving: boolean;
  currentBrokerInfo: ListType | null;
  initialize: boolean;
}

const initialState: ILibraryReducerShape = {
  list: [],
  stocks: [],
  currentBookId: null,
  isEditMode: false,
  isSaving: false,
  currentBrokerInfo: null,
  initialize: true,
};

export default reducerWithInitialState<ILibraryReducerShape>(initialState)
    .case(
        actions.getInitialData.done,
        (state, payload): ILibraryReducerShape => ({
            ...state,
            list: payload.result.brokers,
            stocks: payload.result.stocks,
            initialize: true,
        }),
    )
    .case(actions.getBrokerInfoById.done, (state, payload) => ({
        ...state,
        currentBrokerInfo: payload.result,
    }))
    .case(actions.buyStocks.done, (state, payload): ILibraryReducerShape => {
        return {
            ...state,
            list: payload.result.broker,
            stocks: payload.result.stocks,
            currentBrokerInfo: payload.result.broker.find(item => +item.id === state.currentBrokerInfo?.id) || null,
        };
    })
    .case(actions.sellStocks.done, (state, payload): ILibraryReducerShape => {
        return {
            ...state,
            list: payload.result.broker,
            stocks: payload.result.stocks,
            currentBrokerInfo: payload.result.broker.find(item => +item.id === state.currentBrokerInfo?.id) || null,
        };
    });
