import React from "react";
import { Tooltip } from "antd";
import {Link} from "react-router-dom";
import {ListType} from "../types";
import { InfoCircleFilled } from '@ant-design/icons'
import {ActionsBlockButton} from "../styled";
import {MinusCircleFilled} from "@ant-design/icons/lib";
import {deleteBook, userClickedOnTheDetailsButton} from "../redux/actions";
import {useDispatch} from "react-redux";

export const ButtonInfo: React.FC<{ item: ListType }> = ({ item }) => {
    const dispatch= useDispatch();
    const onClickRemoveButton = React.useCallback(
        () => dispatch(deleteBook(item.id)),
        [dispatch, item.id]
    );

    const onClickDetailButton = React.useCallback(
        () => {
            localStorage.setItem('bookId', String(item.id));
            dispatch(userClickedOnTheDetailsButton(item.id));
        },
        [dispatch, item.id]
    );
    
    return (
        <ActionsBlockButton>
            <Link to={{ pathname: `/book/${item.id}`}}>
                <Tooltip title="Detailed information">
                    <InfoCircleFilled onClick={onClickDetailButton} />
                </Tooltip>
            </Link>
            <Link to={{ pathname: `/` }}>
                <Tooltip title="Delete book">
                    <MinusCircleFilled style={{ marginLeft: '16px' }} onClick={onClickRemoveButton} />
                </Tooltip>
            </Link>
        </ActionsBlockButton>
    )
};