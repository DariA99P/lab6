import React from "react";
import {Button, InputNumber, Modal} from "antd";
import {ListType, StockType} from "../types";
import {ErrorMessageStyled, ModalBodyLabelStyled} from "../styled";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";
import {buyStocks} from "../redux/actions";

const buttonStyles: React.CSSProperties = { width: '100px' };
const inputStyles: React.CSSProperties = { marginLeft: '16px', width: '200px' };
export const ButtonInfo: React.FC<{ item: StockType }> = ({ item }) => {
    const dispatch= useDispatch();
    const [isVisible, setIsVisible] = React.useState(false);
    const [numberStocks, setNumberStocks] = React.useState(0);
    const currentBrokerInfo = useSelector<RootState, ListType | null>(state => state.library.currentBrokerInfo);

    const onClickBuy = React.useCallback(() => setIsVisible(true), []);
    const onOk = React.useCallback(() => {
        setIsVisible(false);
        dispatch(buyStocks.started({ idStock: item.id, count: numberStocks }));
    }, [dispatch, item.id, numberStocks]);
    const onCancel = React.useCallback(() => setIsVisible(false), []);
    const onChange = React.useCallback(value => setNumberStocks(value), []);

    const sumStocks = numberStocks*item.costPerShare;
    const isValid = currentBrokerInfo && sumStocks > currentBrokerInfo?.balance;

    return (
        <>
            <Button style={buttonStyles} type="primary" onClick={onClickBuy}>Купить</Button>
            <Modal
                title='Покупка акций'
                visible={isVisible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <ModalBodyLabelStyled>
                    <div>Количество акций: </div>
                    <InputNumber style={inputStyles} min={1} max={+item.numberShares} onChange={onChange}/>
                </ModalBodyLabelStyled>
                <ModalBodyLabelStyled>
                    <div>{`Суммарная стоимость: ${sumStocks}`}</div>
                </ModalBodyLabelStyled>
                <ModalBodyLabelStyled>
                    {isValid && (<ErrorMessageStyled>У Вас недостаточно средств</ErrorMessageStyled>)}
                </ModalBodyLabelStyled>
            </Modal>
        </>
    )
};