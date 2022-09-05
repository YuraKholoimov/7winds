import React, {useState} from 'react';
import TableRow from "@mui/material/TableRow";
import {file, folder_2} from "../basicTable/BasicTable";
import {NewRowData, RowData} from "../../bll/newRowDataSlice";
import {styled} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import {TextFieldForm} from '../TextFieldForm/TextFieldForm';
import {useAppDispatch} from "../../bll/store";

const MyTableCell = styled(TableCell)({
    color: "#ffffff",
})


export const EditableRow: React.FC<EditableRowPropsType> = ({row}) => {
    const dispatch = useAppDispatch();
    // const [isVisible, setIsVisible] = useState<any>({isOpen: true})
    // const [textFieldType, setTextFieldType] = useState<any>({type: "level"})
    const [editMode, setEditMode] = useState<boolean>(false)


    const changeEditMode = () => {
        setEditMode(!editMode)
    }
    //
    // const addLevelHandler = () => {
    //     console.log("ADDNewLEVEL")
    //     setTextFieldType({type: "level"})
    //     setIsVisible({isOpen: !isVisible.isOpen})
    //     // setTextFieldVisible({isOpen: !textFieldVisible.isOpen, type: "level"})
    //     // dispatch(addNewLevel())
    // }
    //
    // const addRowHandler = () => {
    //     console.log("ADDNewROW")
    //     setTextFieldType({type: "row"})
    //     setIsVisible({isOpen: !isVisible.isOpen})
    //     // setTextFieldVisible({isOpen: !textFieldVisible.isOpen, type: "row"})
    // }

    return (
        <>
            {/*----- EditableRow -----*/}
            {editMode
                ? <TextFieldForm
                    // setTextFieldVisible={setIsVisible}
                    LevelLabel={row.type == "level" ? folder_2 : file}
                    changeEditMode={changeEditMode}
                    row={row}
                    // id={row.id}
                    // title={row.title}
                    // unit={row.unit}
                    // quantity={row.quantity}
                    // unitPrice={row.unitPrice}
                    parent={row.parent}
                    type={row.type}
                    editMode={editMode}
                />
                : <TableRow key={row.title} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onDoubleClick={changeEditMode}>
                    <MyTableCell sx={{width: "200px"}}>
                        <div style={{paddingLeft: "25px"}}>
                            {row.type == "row" && file}
                        </div>
                    </MyTableCell>
                    <MyTableCell sx={{width: "740px"}}>{row.title}</MyTableCell>
                    <MyTableCell sx={{width: "210px"}}>{row.type == "row" && row.unit}</MyTableCell>
                    <MyTableCell sx={{width: "210px"}}>{row.type == "row" && row.quantity}</MyTableCell>
                    <MyTableCell sx={{width: "210px"}}>{row.type == "row" && row.unitPrice}</MyTableCell>
                    <MyTableCell sx={{width: "210px"}}>{row.price}</MyTableCell>
                </TableRow>
            }
        </>
    );
};

type EditableRowPropsType = {
    row: RowData
}