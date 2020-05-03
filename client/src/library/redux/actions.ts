import actionCreatorFactory from 'typescript-fsa';
import {ListType} from "../types";

const actionCreator = actionCreatorFactory('library');

export const getBookList = actionCreator.async<void, any[]>('GET_BOOK_lIST');

export const userClickedOnTheDetailsButton = actionCreator<number>('CHANGE_CURRENT_BOOK_ID');

export const changeIsEditMode = actionCreator<boolean>('CHANGE_IS_EDIT_MODE');

export const cancelChanges = actionCreator('CANCEL_CHANGES');

export const saveChanges = actionCreator.async<ListType | null, boolean>('SAVE_CHANGES');

export const changeStatusBook = actionCreator<
{
  reader: string | null;
  returnDate: string | null;
}>('USER_TAKE_BOOK');

export const deleteBook = actionCreator<number>('DELETE_BOOK');

export const getBookInfoInitialize = actionCreator.async<number, ListType | null>(
    'GET_BOOK_INFO_INITIALIZE'
);