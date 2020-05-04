import {ListType, StockType} from "../types";
import React from "react";
import {ButtonInfo} from "./ButtonInfo";

export const columns = [
    {
        title: 'Брокер',
        dataIndex: 'item',
        key: 'name',
        render: (_record: any, item: ListType) => <div key={item.id}>{item.name}</div>,
    },
    {
        title: 'Доступный баланс',
        dataIndex: 'item',
        key: 'balance',
        render: (_record: any, item: ListType) => <div key={item.id}>{item.balance} грн</div>,
    },
    {
        title: 'Выкупленные акции',
        dataIndex: 'item',
        key: 'infoStocks',
        render: (_record: any, item: ListType) => (
            <div key={item.id}>
                {item.stocks.map((i, index) => (
                    <div key={index}>
                        <div>{`Тип акции: ${i.name};`}</div>
                        <div>{`Количество купленных акций: ${i.number}.`}</div>
                        <div>{`Общая сумма: ${i.allSum} грн;`}</div>
                    </div>
                ))}
            </div>
        ),
    },
    {
        title: 'Акции выставленные на торги',
        dataIndex: 'item',
        key: 'tradingStocks',
        render: (_record: any, item: ListType) => (
            <div key={item.id}>
                {item.tradingStocks.map((i, index) => (
                    <div key={index}>
                        <div>{`Тип акции: ${i.name};`}</div>
                        <div>{`Количество акций: ${i.number}.`}</div>
                    </div>
                ))}
            </div>
        ),
    },
];

export const columnsStocks = [
    {
        title: 'Название акции',
        dataIndex: 'item',
        key: 'name',
        render: (_record: any, item: StockType) => <div key={item.id}>{item.typeStock}</div>,
    },
    {
        title: 'Количество доступных акций',
        dataIndex: 'item',
        key: 'count',
        render: (_record: any, item: StockType) => <div key={item.id}>{item.numberShares}</div>,
    },
    {
        title: 'Стоимость',
        dataIndex: 'item',
        key: 'count',
        render: (_record: any, item: StockType) => <div key={item.id}>{item.costPerShare} грн/шт</div>,
    },
    {
        title: '',
        dataIndex: 'item',
        key: 'action',
        render: (_record: any, item: StockType) => <ButtonInfo item={item} />,
    },
]