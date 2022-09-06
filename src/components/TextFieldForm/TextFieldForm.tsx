import React, {useState} from 'react';
import TableRow from "@mui/material/TableRow";
import s from "../basicTable/textfield.module.scss";
import {styled, TextField} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import {AppRootStateType, useAppDispatch} from "../../bll/store";
import {
    addNewLevel,
    addNewRow,
    addNullLevel,
    NewRowData,
    RowData,
    updateLevel,
    updateRow
} from "../../bll/newRowDataSlice";
import {useSelector} from "react-redux";

const MyTableCell = styled(TableCell)({
    color: "#ffffff",
})

// функция для сохранения строки
function saveRow(rowData: NewRowData, storage: RowData[]) {
    const index = Math.max(...storage.map((v) => v.id), 0) + 1
    const row: RowData = {id: index, ...rowData}

    // storage.push(row)

    const res = {
        current: row,
        changed: recalculation(row.parent, storage)
    }

    console.log(res)
    return res
}

// функция для изменения строки
function editRow(row: RowData, storage: RowData[]) {
    const index = storage.findIndex((v) => v.id === row.id)
    storage.splice(index, 1, row)

    return {
        current: row,
        changed: recalculation(row.parent, storage)
    }
}

function recalculation(parentID: number | null, storage: RowData[]) {
    const changedRows: RowData[] = []

    if (parentID == null) return changedRows
    let currentParentIndex = storage.findIndex((v) => v.id === parentID)
    if (currentParentIndex === -1) return changedRows
    let currentParent = storage[currentParentIndex]

    do {
        const children = storage.filter((v) => v.parent == currentParent.id)
        const newPrice = children.reduce((acc, v) => acc + v.price, 0)
        if (currentParent.price === newPrice) break

        storage[currentParentIndex].price = newPrice
        changedRows.push(storage[currentParentIndex])

        currentParentIndex = storage.findIndex((v) => v.id === currentParent.parent)
    } while (currentParentIndex !== -1)

    return changedRows
}


export const TextFieldForm = (props: TextFieldFormPropsType) => {

    const [valueTextField, setValueTextField] = useState<TextFieldsType[]>([
        {id: 1, name: "title", value: props.title || '', placeholder: "Наименование работ", type: "string"},
        {id: 2, name: "unit", value: props.unit || '', placeholder: "Ед. изм", type: "string"},
        {id: 3, name: "quantity", value: props.quantity || 0, placeholder: "Количество", type: "number"},
        {id: 4, name: "unitPrice", value: props.unitPrice || 0, placeholder: "Цена за еденицу", type: "number"}
    ])

    const dispatch = useAppDispatch();
    const storage = useSelector((state: AppRootStateType) => state.rootLevel.level)

    const setValue = (id: number, value: string | number) => {
        setValueTextField(valueTextField
            .map((field) => field.id === id
                ? {...field, value: value}
                : field)
        )
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            if (props.type == "level" && props.parent) {
                console.log("add level")
                if (props.editMode) {
                    const levelData = {
                        id: props.id,
                        parent: props.parent,
                        type: props.type,
                        title: String(valueTextField[0].value),
                        price: Number(valueTextField[3].value) * Number(valueTextField[2].value),
                        value: props.value
                    }
                    dispatch(updateLevel({levelData}))
                    props.setEditMode && props.setEditMode(false)

                } else {
                    dispatch(addNewLevel({
                        title: String(valueTextField[0].value),
                        parent: props.parent,
                        type: props.type
                    }))
                    props.setIsVisible && props.setIsVisible({isOpen: false})
                }

            } else if (props.type == "row") {
                if (props.editMode && props.row && props.id) {

                    const rowData = {
                        id: props.id,
                        title: String(valueTextField[0].value),
                        parent: props.parent,
                        type: props.type,
                        unit: String(valueTextField[1].value),
                        unitPrice: Number(valueTextField[3].value),
                        quantity: Number(valueTextField[2].value),
                        price: Number(valueTextField[3].value) * Number(valueTextField[2].value)
                    }
                    dispatch(updateRow({row: rowData}))
                    props.setEditMode && props.setEditMode(false)

                } else {
                    const rowData = {
                        title: String(valueTextField[0].value),
                        parent: props.parent,
                        type: props.type,
                        unit: String(valueTextField[1].value),
                        unitPrice: Number(valueTextField[3].value),
                        quantity: Number(valueTextField[2].value),
                        price: Number(valueTextField[3].value) * Number(valueTextField[2].value)
                    }

                    dispatch(addNewRow({rowData: rowData}))
                }
            } else if (props.parent === null) {
                console.log("null level")

                dispatch(addNullLevel({
                    nullLevel: {
                        title: String(valueTextField[0].value)
                    }}))
            }
        } else if (e.key === "Escape")  {
            props.changeEditMode && props.changeEditMode()
        }
    }

    return (
        <TableRow>
            <MyTableCell>
                {props.LevelLabel}
            </MyTableCell>
            {valueTextField
                .map((el, i) => {
                    return (
                        <MyTableCell>
                            <TextField
                                key={el.id}
                                type={el.type}
                                onBlur={() => props.changeEditMode && props.changeEditMode()}
                                value={el.value}
                                name={el.name}
                                placeholder={el.placeholder}
                                size={"small"}
                                onKeyPress={handleKeyPress}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(el.id, e.currentTarget.value)}
                                sx={{width: "100%", border: "1px solid grey", borderRadius: "5px",}}
                                InputProps={{className: `${s.textFieldLabel}`}}
                            />
                        </MyTableCell>
                    )
                })
            }
            <MyTableCell>
                {Number(valueTextField[2].value) * Number(valueTextField[3].value)}
            </MyTableCell>
        </TableRow>
    );
};

type TextFieldFormPropsType = {
    row?: RowData
    value?: any

    id?: number
    title?: string
    unit?: string
    quantity?: number,
    unitPrice?: number,
    price?: number,
    parent: null | number,
    type: "level" | "row"

    changeEditMode?: () => void
    LevelLabel?: React.ReactNode
    setIsVisible?: any
    addLevelHandler?: () => void
    addRowHandler?: () => void

    editMode?: boolean
    setEditMode?: (value: boolean) => void
}

export type TextFieldsType = {
    id: number
    name: string,
    value: string | number
    placeholder: string
    type: React.HTMLInputTypeAttribute | undefined
}