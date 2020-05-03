import {RootState} from "../../redux";

export const getCurrentBookInfo = (state: RootState) => state.library.currentBookInfo;
export const getCurrentBookId = (state: RootState) => state.library.currentBookId;