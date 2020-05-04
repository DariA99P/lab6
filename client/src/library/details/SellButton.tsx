import React from "react";
import {Button, InputNumber, Modal, Select} from "antd";
import {ListType, StockType} from "../types";
import {ModalBodyLabelStyled} from "../styled";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";
import {sellStocks} from "../redux/actions";

const buttonStyles: React.CSSProperties = { width: '100px' };
const inputStyles: React.CSSProperties = { marginLeft: '16px', width: '200px' };
export const SellButton: React.FC = () => {
    const dispatch= useDispatch();
    const [isVisible, setIsVisible] = React.useState(false);
    const [numberStocks, setNumberStocks] = React.useState(0);
    const [stockId, setStockId] = React.useState(0);
    const [maxNumber, setMaxNumber] = React.useState(0);
    const brokerInfo = useSelector<RootState, ListType | null>(state => state.library.currentBrokerInfo);
    const stocks = useSelector<RootState, StockType[]>(state => state.library.stocks);

    const onClickSell = React.useCallback(() => setIsVisible(true), []);
    const onOk = React.useCallback(() => {
        setIsVisible(false);
        dispatch(sellStocks.started({ idStock: stockId, count: numberStocks }));
    }, [dispatch, numberStocks, stockId]);
    const onCancel = React.useCallback(() => setIsVisible(false), []);
    const onChangeTypeStock = React.useCallback(value => {
        const findStock = stocks.find(i => i.typeStock === value.toString());
        const findBrokerStock = brokerInfo?.stocks.find(i => i.name === value.toString())
        setStockId(findStock ? findStock.id : 0);
        setMaxNumber(findBrokerStock ? findBrokerStock.number : 0);
    }, [brokerInfo, stocks]);
    const onChangeNumber =  React.useCallback(value => setNumberStocks(value), []);
    const findStock = stocks.find(i => i.id === stockId);
    const sumStocks = findStock ? findStock.costPerShare * numberStocks : 0;

    return (
        <>
            <Button style={buttonStyles} type="primary" onClick={onClickSell}>Продать</Button>
            <Modal
                title='Продажа акций'
                visible={isVisible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <ModalBodyLabelStyled>
                    <div>Тип продаваемой акции:</div>
                    <Select style={inputStyles} onChange={onChangeTypeStock}>
                        {brokerInfo?.stocks.map(i => <Select.Option value={i.name}>{i.name}</Select.Option>)}
                    </Select>
                </ModalBodyLabelStyled>
                <ModalBodyLabelStyled>
                    <div>Количество акций:</div>
                    <InputNumber style={inputStyles} min={1} max={maxNumber} onChange={onChangeNumber}/>
                </ModalBodyLabelStyled>
                <ModalBodyLabelStyled>
                    <div>{`Выручка: ${sumStocks}`}</div>
                </ModalBodyLabelStyled>
            </Modal>
        </>
    )
};