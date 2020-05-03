import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

// sagas

import { saga as librarySaga } from '../library/redux/sagas';

// reducers
import library, {ILibraryReducerShape} from '../library/redux/reducer';
export interface RootState {
  library: ILibraryReducerShape;
}
export const reducer = combineReducers<RootState>({
  library,
});

export function* saga() {
  yield all([librarySaga()]);
}
