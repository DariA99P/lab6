import {RootState} from "../../redux";

export const getCurrentBrokerInfo = (state: RootState) => state.library.currentBrokerInfo;
export const getStocks = (state: RootState) => state.library.stocks;