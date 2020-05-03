import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";
import {ListType} from "../types";
import * as s from '../styled';
import {Descriptions, Tooltip} from "antd";
import {cancelChanges, changeIsEditMode, getBookInfoInitialize, saveChanges} from "../redux/actions";
import {ItemComponent} from "./descriptionsItem";
import { HomeFilled } from '@ant-design/icons';
import {Link} from "react-router-dom";
import {StatusComponent} from "./statusComponent";

const buttonStyles: React.CSSProperties = { marginLeft: '16px' };
const homeIconStyles: React.CSSProperties = { fontSize: '24px', marginTop: '16px' };

export const DetailsInfoComponent: React.FC = () => {
    const dispatch = useDispatch();

    const initialize = useSelector<RootState, boolean>(
        state => state.library.initialize
    );

    React.useEffect(() => {
        if (initialize)
            dispatch(getBookInfoInitialize.started(Number(localStorage.getItem('bookId'))))
    }, [dispatch, initialize]);

    const currentBookInfo = useSelector<RootState, ListType | any>(
        state => state.library.currentBookInfo || {}
    );
    const isEditMode = useSelector<RootState, boolean>(
        state => state.library.isEditMode
    );
    const isSaving = useSelector<RootState, boolean>(
        state => state.library.isSaving
    );
    const {
        yearOfPublishing,
        author,
        name,
    } = currentBookInfo;

    const [inputTitle, setInputTitle] = React.useState(name);
    const [inputAuthor, setInputAuthor] = React.useState(author);
    const [inputYearOfPublishing, setInputYearOfPublishing] = React.useState(yearOfPublishing);

    const onClick = React.useCallback(
        () => {
            if (!isEditMode) {
                dispatch(changeIsEditMode(true));
            } else {
                const bookInfo: ListType = {
                    ...currentBookInfo,
                    name: inputTitle,
                    author: inputAuthor,
                    yearOfPublishing: inputYearOfPublishing
                };
                dispatch(saveChanges.started(bookInfo))
            }
        },
        [currentBookInfo, dispatch, inputAuthor, inputTitle, inputYearOfPublishing, isEditMode]
    );

    const onClickHomeButton = React.useCallback(() => dispatch(changeIsEditMode(false)), [dispatch]);

    React.useEffect(() => {
        setInputTitle(name);
    }, [name]);

    React.useEffect(() => {
        setInputAuthor(author);
    }, [author]);

    React.useEffect(() => {
        setInputYearOfPublishing(yearOfPublishing);
    }, [yearOfPublishing]);

    const onChangeInputTitle = React.useCallback(e => {
        setInputTitle(e.target.value);
    }, []);

    const onChangeInputAuthor = React.useCallback(e => {
        setInputAuthor(e.target.value);
    }, []);

    const onChangeYearOfPublishing = React.useCallback(e => {
        setInputYearOfPublishing(e.target.value);
    }, []);

    const onClickCancelButton = React.useCallback(
        () => {
            setInputTitle(name);
            setInputAuthor(author);
            setInputYearOfPublishing(yearOfPublishing);
            dispatch(cancelChanges());
        },
        [author, dispatch, name, yearOfPublishing]
    );
    
    return (
        <s.BookWrapperComponentStyled>
            <s.BlockInfoStyled>
                <s.TitleStyled>Book Info</s.TitleStyled>
                <s.DescriptionsStyled title="" bordered column={1}>
                    <Descriptions.Item label="Title of the book	">
                        <ItemComponent item={inputTitle} onChange={onChangeInputTitle} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Author">
                        <ItemComponent item={inputAuthor} onChange={onChangeInputAuthor} />
                    </Descriptions.Item>
                    <Descriptions.Item label="The year of publishing">
                        <ItemComponent item={inputYearOfPublishing} onChange={onChangeYearOfPublishing} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Language">{currentBookInfo.language}</Descriptions.Item>
                    <Descriptions.Item label="Number of pages">{currentBookInfo.numberOfPages}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <StatusComponent
                            inStock={currentBookInfo.inStock}
                            reader={currentBookInfo.reader}
                            returnDate={currentBookInfo.returnDate}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                        {currentBookInfo.description || 'No description'}
                    </Descriptions.Item>
                </s.DescriptionsStyled>
                <s.ButtonBlockStyled>
                    <s.ButtonStyled onClick={onClickCancelButton}>Cancel</s.ButtonStyled>
                    <s.ButtonStyled
                        type="primary"
                        style={buttonStyles}
                        onClick={onClick}
                        loading={isSaving}
                    >
                        {isEditMode ? 'Save' : 'Edit' }
                    </s.ButtonStyled>
                </s.ButtonBlockStyled>
            </s.BlockInfoStyled>
           <s.ControlPanelStyled>
               <Tooltip title="Homepage">
                   <Link to={{ pathname: '/'}}>
                       <HomeFilled style={homeIconStyles} onClick={onClickHomeButton} />
                   </Link>
               </Tooltip>
           </s.ControlPanelStyled>
        </s.BookWrapperComponentStyled>
    );
};
