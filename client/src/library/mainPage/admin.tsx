import React from "react";
import {RootState} from "../../redux";
import {useSelector} from "react-redux";
import {ListType} from "../types";
import {Table, Tooltip} from "antd";
import * as s from '../styled';
import {columns} from "./columns";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";

const iconStyles: React.CSSProperties = { fontSize: '24px' };
const mainStyles: React.CSSProperties = { width: "100%" };
export const AdminPanelComponent: React.FC = () => {
    const list = useSelector<RootState, ListType[]>(state => state.library.list);
    return (
        <s.WrapperComponentStyled>
            <s.TitleBlockStyled style={mainStyles}>
                <Link to={{ pathname: '/'}}>
                    <LogoutOutlined style={iconStyles}/>
                </Link>
                <s.TitleStyled>Панель администратора</s.TitleStyled>
                <Tooltip title='Страница пользователя' placement="leftTop">
                    <Link to={{ pathname: '/home'}}>
                        <UserOutlined style={iconStyles} />
                    </Link>
                </Tooltip>
            </s.TitleBlockStyled>
            <Table
                style={mainStyles}
                dataSource={list}
                columns={columns}
                scroll={{ y: 700 }}
            />
        </s.WrapperComponentStyled>
    );
};
