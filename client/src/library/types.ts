export interface ListType {
    id: number;
    name: string;
    balance: number;
    stocks: Array<{
        name: string;
        number: number;
        allSum: number;
    }>;
    tradingStocks: Array<{
        name: string;
        number: number;
    }>;
}

export interface StockType {
    id: number;
    typeStock: string;
    numberShares: number;
    costPerShare: number;
}