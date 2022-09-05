import React, {useState} from 'react';
import TableRow from "@mui/material/TableRow";
import {file, folder_2} from "../basicTable/BasicTable";
import {RowData} from "../../bll/newRowDataSlice";
import {styled} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import {TextFieldForm} from '../TextFieldForm/TextFieldForm';

const MyTableCell = styled(TableCell)({
    color: "#ffffff",
})


export const EditableRow: React.FC<EditableRowPropsType> = ({row}) => {
    const [editMode, setEditMode] = useState<boolean>(false)


    const changeEditMode = () => setEditMode(!editMode);

    return (
        <>
            {/*----- EditableRow -----*/}
            {editMode
                ? <TextFieldForm
                    LevelLabel={row.type == "level" ? folder_2 : file}
                    changeEditMode={changeEditMode}
                    row={row}
                    parent={row.parent}
                    type={row.type}
                    id={row.id}
                    title={row.title}
                    price={row.price}
                    unit={row.unit}
                    quantity={row.quantity}
                    unitPrice={row.unitPrice}

                    editMode={editMode}
                    setEditMode={setEditMode}
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