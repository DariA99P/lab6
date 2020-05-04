import React from "react";
import {useDispatch, useSelector} from "react-redux";
import * as s from '../styled';
import {Descriptions, Table, Tooltip} from "antd";
import { getBrokerInfoById } from "../redux/actions";
import {RootState} from "../../redux";
import {ListType, StockType} from "../types";
import { HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {columnsStocks} from "../mainPage/columns";
import {DescriptionsBlockStyled} from "../styled";
import {SellButton} from "./SellButton";

const homeIconStyles: React.CSSProperties = { fontSize: '24px', marginTop: '16px' };

export const HomeComponent: React.FC = () => {
    const dispatch = useDispatch();
    const brokerId = localStorage.getItem('brokerId');
    const initialize = useSelector<RootState, boolean>(state => state.library.initialize);
    const currentBrokerInfo = useSelector<RootState, ListType | null>(state => state.library.currentBrokerInfo);
    console.log(currentBrokerInfo);
    const stocks = useSelector<RootState, StockType[]>(state => state.library.stocks);
    React.useEffect(() => {
        if (initialize) {
            dispatch(getBrokerInfoById.started(brokerId || ''));
        }
    }, [dispatch, brokerId, initialize]);

    return (
        <s.BrokersWrapperComponentStyled>
            <s.BlockInfoStyled>
                <s.TitleBlockStyled>
                    <s.TitleStyled>Персональная информация</s.TitleStyled>
                </s.TitleBlockStyled>
                {currentBrokerInfo && (
                    <s.DescriptionsStyled title="" bordered column={1}>
                        <Descriptions.Item label="Брокер">{currentBrokerInfo.name}</Descriptions.Item>
                        <Descriptions.Item label="Доступный баланс">{currentBrokerInfo.balance} грн</Descriptions.Item>
                        <Descriptions.Item label="Выкупленные акции">
                            <DescriptionsBlockStyled>
                                <div>
                                    {currentBrokerInfo.stocks.map((i, index) => (
                                        <div key={index}>
                                            <div>{`Тип акции: ${i.name};`}</div>
                                            <div>{`Количество купленных акций: ${i.number}.`}</div>
                                            <div>{`Общая сумма: ${i.allSum} грн;`}</div>
                                        </div>
                                    ))}
                                </div>
                                <SellButton />
                            </DescriptionsBlockStyled>
                        </Descriptions.Item>
                        <Descriptions.Item label="Акции выставленные на торги">
                            <DescriptionsBlockStyled>
                                <div>
                                    {currentBrokerInfo.tradingStocks.map((i, index) => (
                                        <div key={index}>
                                            <div>{`Тип акции: ${i.name};`}</div>
                                            <div>{`Количество акций: ${i.number}.`}</div>
                                        </div>
                                    ))}
                                </div>
                            </DescriptionsBlockStyled>
                        </Descriptions.Item>
                    </s.DescriptionsStyled>
                )}
                <s.TitleBlockStyled>
                    <s.TitleStyled>Список доступных акций</s.TitleStyled>
                </s.TitleBlockStyled>
                <Table dataSource={stocks} columns={columnsStocks} />
            </s.BlockInfoStyled>
            <s.ControlPanelStyled>
                <Tooltip title="Страница администратора">
                    <Link to={{ pathname: '/admin'}}>
                        <HomeFilled style={homeIconStyles} />
                    </Link>
                </Tooltip>
            </s.ControlPanelStyled>
        </s.BrokersWrapperComponentStyled>
    );
};
