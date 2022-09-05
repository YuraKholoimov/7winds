import React, {useState} from 'react';
import TableRow from "@mui/material/TableRow";
import {file, folder_1, folder_2} from "../basicTable/BasicTable";
import {InitialStateType, LevelType, NewRowData, RowData} from "../../bll/newRowDataSlice";
import {styled} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import {TextFieldForm} from '../TextFieldForm/TextFieldForm';
import {AddLevelButton} from "../buttons/AddLevelButton/AddLevelButton";
import {AddRowButton} from "../buttons/AddRowButton/AddRowButton";
import {useAppDispatch} from "../../bll/store";
import {EditableRow} from "../EditableRow/EditableRow";

const MyTableCell = styled(TableCell)({
    color: "#ffffff",
})


export const EditableLevel: React.FC<EditableLevelPropsType> = (
    {id, type, value, rows, price, parent, title}
) => {

    const dispatch = useAppDispatch();
    const [isVisible, setIsVisible] = useState<any>({isOpen: true});
    const [textFieldType, setTextFieldType] = useState<any>({type: "level"});
    const [editMode, setEditMode] = useState<boolean>(false);


    const changeEditMode = () =>  setEditMode(!editMode)

    const addLevelHandler = () => {
        console.log("ADDNewLEVEL")
        setTextFieldType({type: "level"})
        setIsVisible({isOpen: !isVisible.isOpen})
        // setTextFieldVisible({isOpen: !textFieldVisible.isOpen, type: "level"})
        // dispatch(addNewLevel())
    }

    const addRowHandler = () => {
        console.log("ADDNewROW")
        setTextFieldType({type: "row"})
        setIsVisible({isOpen: !isVisible.isOpen})
        // setTextFieldVisible({isOpen: !textFieldVisible.isOpen, type: "row"})
    }

    return (
        <>
            {/*----- EditableRow -----*/}
            {editMode
                ? <TextFieldForm
                    setTextFieldVisible={setIsVisible}
                    LevelLabel={type == "level" ? folder_2 : file}
                    changeEditMode={changeEditMode}
                    title={title}
                    parent={parent}
                    type={type}
                    editMode={editMode}

                />
                : <TableRow key={id} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onDoubleClick={changeEditMode}>
                    <MyTableCell sx={{width: "200px"}}>
                        {!parent && folder_1}
                        {parent
                            && <div style={{
                                height: "27px",
                                width: "50px",
                                borderRadius: "5px",
                                background: "rgba(255,255,255,0.18)"
                            }}><AddLevelButton onClickHandler={addLevelHandler}/>
                                <AddRowButton onClickHandler={addRowHandler}/>
                            </div>}
                    </MyTableCell>
                    <MyTableCell sx={{width: "740px"}}>{title}</MyTableCell>
                    <MyTableCell sx={{width: "210px"}}>{}</MyTableCell>
                    <MyTableCell sx={{width: "210px"}}>{}</MyTableCell>
                    <MyTableCell sx={{width: "210px"}}>{}</MyTableCell>
                    <MyTableCell sx={{width: "210px"}}>{price}</MyTableCell>
                </TableRow>
            }

            {value
                ?.map((level: any) => (
                    <EditableLevel id={level.id} type={level.type} parent={level.parent}
                                   title={level.title} price={level.price} key={level.id}
                                   rows={level.value}
                    />
                ))
            }

            {rows
                ?.map(row => (
                    <EditableRow row={row}/>
                ))
            }

            {/*----- TextFieldForm -----*/}
            {isVisible.isOpen
                && <TextFieldForm
                    type={textFieldType.type}
                    parent={id}
                    setTextFieldVisible={setIsVisible}
                    addLevelHandler={addLevelHandler}
                    addRowHandler={addRowHandler}
                    LevelLabel={<>
                        {textFieldType.type == "level"
                            && <AddLevelButton onClickHandler={addLevelHandler}/>}
                        {textFieldType.type == "row"
                            && <AddRowButton onClickHandler={addRowHandler}/>
                        }
                    </>}
                />
            }
        </>
    );
};

type EditableLevelPropsType = {
    id: number
    parent: number | null
    type: "level" | "row"
    title: string
    price: number
    value?: LevelType[]
    // level: LevelsType
    rows?: RowData[]
    // rootLevel?: InitialStateType
}