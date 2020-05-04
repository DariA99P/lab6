import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux";
import {InputItemStyled} from "../styled";

export const ItemComponent: React.FC<{ item: string; onChange: (e: any) => void }> = ({ item, onChange }) => {
    const isEditMode = useSelector<RootState, boolean>(
        state => state.library.isEditMode
    );

    return isEditMode ? <InputItemStyled value={item} onChange={onChange} /> : <div>{item}</div>
};