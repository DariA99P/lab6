import {ListType} from "../types";
import React from "react";
import {ButtonInfo} from "./ButtonInfo";

export const columns = [
    {
        title: 'Title of the book',
        dataIndex: 'item',
        key: 'name',
        render: (_record: any, item: ListType) => <div key={item.id}>{item.name}</div>,
    },
    {
        title: 'Author',
        dataIndex: 'item',
        key: 'author',
        render: (_record: any, item: ListType) => <div key={item.id}>{item.author}</div>,
    },
    {
        title: 'The year of publishing',
        dataIndex: 'item',
        key: 'yearPub',
        render: (_record: any, item: ListType) => <div key={item.id}>{item.yearOfPublishing}</div>,
    },
    {
        title: 'Language',
        dataIndex: 'item',
        key: 'language',
        render: (_record: any, item: ListType) => <div key={item.id}>{item.language}</div>,
    },
    {
        title: 'Action',
        dataIndex: 'item',
        key: 'action',
        render: (_record: any, item: ListType) => <ButtonInfo item={item} />,
    },
];