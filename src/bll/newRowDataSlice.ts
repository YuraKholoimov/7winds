import {createSlice, PayloadAction} from '@reduxjs/toolkit';


//----- SLICE
const slice = createSlice({
    name: 'tableData',
    initialState: {
        level: {
            // id: 1,
            // parent: null,
            // type: "level",
            // title: "Level NULL",
            // price: 1250000,
            // value: [
            //     {
            //         id: 2,
            //         type: "level",
            //         parent: 1,
            //         title: "Level 1",
            //         price: 1250000,
            //         value: [
            //             {
            //                 id: 1,
            //                 parent: 2,
            //                 type: "row",
            //                 title: "111",
            //                 price: 12,
            //                 unitPrice: 1,
            //                 unit: "1",
            //                 quantity: 12
            //             },
            //              {
            //                 id: 1,
            //                 parent: 2,
            //                 type: "row",
            //                 title: "111",
            //                 price: 12,
            //                 unitPrice: 1,
            //                 unit: "1",
            //                 quantity: 12
            //             },
            //
            //         ]
            //     }
            // ]
        }
    } as InitialStateType,
    reducers: {
        addNullLevel(state, action: PayloadAction<{nullLevel: any }>) {
            const nullLevel: LevelTypeStart = {
                id: 1,
                title: action.payload.nullLevel.title,
                type: "level",
                parent: null,
                price: 0,
                value: []

            }
            state.level = nullLevel
        },

        addNewLevel(state, action: PayloadAction<{ title: string, parent: null | number, type: "level" }>) {
            const index = state.level.value.length + 1;
            const level: LevelType = {...action.payload, id: index, price: 0, value: []}
            console.log(level)
            state.level.value.push(level)
        },
        updateLevel(state, action: PayloadAction<{ levelData: any }>) {
            console.log(action.payload.levelData)
            const indexLevel = state.level.value.findIndex((v) => v.id === action.payload.levelData.id);
            state.level.value[indexLevel].title = action.payload.levelData.title

        },
        addNewRow(state, action: PayloadAction<{ rowData: NewRowData }>) {
            const index = state.level.value.findIndex((v) => v.id == action.payload.rowData.parent)

            const storage = state.level.value[index].value
            const indexY = Math.max(...storage.map((v) => v.id), 0) + 1
            const row: RowData = {id: indexY, ...action.payload.rowData}

            storage.push(row)
        },

        updateRow(state, action: PayloadAction<{ row: RowData }>) {
            const indexLevel = state.level.value.findIndex((v) => v.id === action.payload.row.parent);
            const LevelStorage = state.level.value[indexLevel].value;
            const rowIndex = LevelStorage.findIndex(v => v.id == action.payload.row.id)

            state.level.value[indexLevel].value[rowIndex] = action.payload.row

        }
    }
});


//----- REDUCER
export const newRowDataSlice = slice.reducer;
export const {addNewLevel, updateLevel, addNewRow, updateRow, addNullLevel} = slice.actions;

//----- TYPES


export type InitialStateType = {
    level: LevelTypeStart

}
type LevelTypeStart = {
    id: number
    parent: null | number
    type: "level" | "row"
    title: string
    price: number
    value: LevelType[]

}

export type LevelType = {
    id: number
    parent: null | number
    type: "level" | "row"
    title: string,
    price: number
    value: RowData[]
}

export interface NewRowData {
    title: string // Наименование работ
    unit: string // Ед. изм.
    quantity: number // Количество
    unitPrice: number // Цена за ед.
    price: number // Стоимость

    parent: number | null // id уровня, в котором находится (либо null для первого уровня)
    type: 'level' | 'row'
}

export interface RowData extends NewRowData {
    id: number
}