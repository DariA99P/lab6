import {ListType, StockType} from "./types";

export const transformDataToListType = (item: any, stocks: StockType[]): ListType => {
    return {
        ...item,
        stocks: item.stocks.map((i: any) => {
            const stock = stocks.find(stock => stock.id === i.idStock);
            return {
                number: i.number,
                name: stock ? stock.typeStock : null,
                allSum: stock ? stock.costPerShare*i.number : null,
            };
        }),
        tradingStocks: item.tradingStocks.map((i: any) => {
            return {
                number: i.number,
                name: stocks.find(stock => stock.id === i.idStock)?.typeStock
            };
        })
    }
}