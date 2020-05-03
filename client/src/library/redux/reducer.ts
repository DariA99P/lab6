import { reducerWithInitialState } from 'typescript-fsa-reducers';

import * as actions from './actions';
import { ListType } from "../types";

export interface ILibraryReducerShape {
  list: ListType[];
  currentBookId: number | null;
  isEditMode: boolean;
  isSaving: boolean;
  currentBookInfo: ListType | null;
  initialize: boolean;
}

const initialState: ILibraryReducerShape = {
  list: [],
  currentBookId: null,
  isEditMode: false,
  isSaving: false,
  currentBookInfo: null,
  initialize: true,
};

export default reducerWithInitialState<ILibraryReducerShape>(initialState)
    .case(
        actions.getBookList.done,
        (state, payload): ILibraryReducerShape => ({
            ...state,
            list: payload.result,
        }),
    )
    .case(
        actions.userClickedOnTheDetailsButton, (state, payload) => ({
            ...state,
            currentBookId: payload,
            currentBookInfo: state.list.find(item => item.id === payload) || null,
            isEditMode: initialState.isEditMode,
        })
    )
    .case(
        actions.changeIsEditMode, (state, payload) => ({
            ...state,
            isEditMode: payload,
        })
    )
    .case(
        actions.saveChanges.started, (state, payload) => ({
            ...state,
            isSaving: true,
            currentBookInfo: payload,
        })
    )
    .cases(
        [actions.saveChanges.done, actions.saveChanges.failed], state => ({
            ...state,
            isSaving: initialState.isSaving,
            isEditMode: !state.isEditMode,
        })
    )
    .case(actions.changeStatusBook, (state, payload) => ({
        ...state,
        currentBookInfo: state.currentBookInfo ? {
            ...state.currentBookInfo,
            inStock: !(payload.reader && payload.returnDate),
            reader: payload.reader,
            returnDate: payload.returnDate
        } : null,
    }))
    .case(actions.cancelChanges, state => ({
        ...state,
        currentBookInfo: state.list.find(item => item.id === state.currentBookId) || null,
        isEditMode: false,
    }))
    .case(actions.deleteBook, (state, payload) => ({
        ...state,
        currentBookId: payload,
        list: state.list.reduce((acc: ListType[], item) => {
            if (item.id !== payload) {
                return [...acc, item];
            }
            return acc;
        }, []),
    }))
    .case(actions.getBookInfoInitialize.started, (state, payload) => ({
        ...state,
        currentBookId: payload,
    }))
    .case(actions.getBookInfoInitialize.done, (state, payload) => ({
        ...state,
        currentBookInfo: payload.result || null,
        initialize: false,
    }))
    .case(actions.getBookInfoInitialize.failed, state => ({
        ...state,
        initialize: false,
    }));
