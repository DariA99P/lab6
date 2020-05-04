import React from "react";
import {
    ButtonBlockStyled,
    ButtonStyled, FormBlockStyled,
    LineBlockStyled,
    LoginComponentStyled,
    TextStyled, TitleBlockStyled,
    TitleStyled
} from "../styled";
import {Input, InputNumber} from "antd";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser, registerUser} from "../redux/actions";

export const LoginComponent: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState();
    const onChange = React.useCallback(e => setValue(e.target.value), []);
    const onClickLogin = React.useCallback(
        () => dispatch(loginUser.started(value || '')
        ), 
        [dispatch, value]
    );
    return (
        <LoginComponentStyled>
            <TitleBlockStyled>
                <TitleStyled>Вход</TitleStyled>
            </TitleBlockStyled>
            <LineBlockStyled>
                Имя:
                <Input
                    value={value}
                    onChange={onChange}
                    style={{ marginLeft: '16px' }}
                />
            </LineBlockStyled>
            <ButtonBlockStyled>
                <Link to={{ pathname: '/register'}}>
                    <ButtonStyled>Новый пользователь</ButtonStyled>
                </Link>
                <ButtonStyled style={{ marginLeft: '16px' }} type="primary" onClick={onClickLogin}>Войти</ButtonStyled>
            </ButtonBlockStyled>
        </LoginComponentStyled>
    )
}

export const RegisterComponent: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    const [balance, setBalance] = React.useState(0);
    const onChangeName = React.useCallback(e => setValue(e.target.value),
        []
    );
    const onChangeBalance = React.useCallback(value =>  setBalance(value), []);
    const onClickRegister = React.useCallback(() => {
        dispatch(registerUser.started({ name: value, balance }))
    }, [balance, dispatch, value]);
    return (
        <LoginComponentStyled>
            <TitleBlockStyled>
                <TitleStyled>Регистрация</TitleStyled>
            </TitleBlockStyled>
            <FormBlockStyled>
                <LineBlockStyled>
                    <TextStyled>Имя:</TextStyled>
                    <Input
                        value={value}
                        onChange={onChangeName}
                        style={{ width: '250px' }}
                    />
                </LineBlockStyled>
                <LineBlockStyled>
                    <TextStyled>Начальный баланс:</TextStyled>
                    <InputNumber
                        value={balance}
                        onChange={onChangeBalance}
                        style={{ width: '250px' }}
                    />
                </LineBlockStyled>
            </FormBlockStyled>
            <ButtonBlockStyled>
                <Link to={{ pathname: '/'}}>
                    <ButtonStyled>Назад</ButtonStyled>
                </Link>
                <ButtonStyled style={{ marginLeft: '16px' }} type="primary" onClick={onClickRegister}>
                    Регистр
                </ButtonStyled>
            </ButtonBlockStyled>
        </LoginComponentStyled>
    )
}