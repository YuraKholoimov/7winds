import React, {ChangeEvent, useState} from "react";
import s from "./folder.module.scss";
import {styled, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

const MyTableCellHead = styled(TableCell)({
    color: "#A1A1AA"
})
const MyTableCell = styled(TableCell)({
    color: "#ffffff",
    padding: "0"
})
const MyTextField = styled(TextField)({
    border: "1px solid grey",
    borderRadius: "5px",
})


function Folder({explorer}: FolderPropsType) {
    console.log(explorer)
    const [expand, setExpand] = useState(false);
    const [textFieldVisible, setTextFieldVisible] = useState<boolean>(false)

    const [workName, setWorkName] = useState<string>("")
    const [measure, setMeasure] = useState<number>(0)
    const [amount, setAmount] = useState<number>(0)
    const [prisePerItem, setPrisePerItem] = useState<number>(0)

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            console.log('enter press here! ')
            // setRows(state => [...state, createData(icon_folder_2, workName, measure, amount, prisePerItem, 0)])
            // console.log(rows)
        }
    }

    const setVelue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(event.currentTarget.name)
        if (event.currentTarget) {
            if (event.currentTarget.name == "workName") {
                setWorkName(event.currentTarget.value)
            } else if (event.currentTarget.name == "measure") {
                setMeasure(Number(event.currentTarget.value))
            } else if (event.currentTarget.name == "amount") {
                setAmount(Number(event.currentTarget.value))
            } else {
                setPrisePerItem(Number(event.currentTarget.value))
            }
        }
    }


    return (
        <div style={{backgroundColor: "grey", position: "relative"}}>

            <TableContainer component={"table"}>
                <Table sx={{minWidth: 650}} aria-label="simple table">

                    {/*----- End Table column title -----*/}
                    <TableBody>
                        {explorer.value.map((row: any, i: number) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <MyTableCell sx={{width: "200px"}}>
                                    <div>
                                        {row.level}
                                        {explorer.name != "file" &&
                                            <button onClick={() => setTextFieldVisible(state => !state)}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M15.5556 4H5.77778C4.8 4 4 4.8 4 5.77778V18.2222C4 19.2 4.8 20 5.77778 20H18.2222C19.2 20 20 19.2 20 18.2222V8.44444L15.5556 4ZM7.55556 7.55556H12V9.33333H7.55556V7.55556ZM16.4444 16.4444H7.55556V14.6667H16.4444V16.4444ZM16.4444 12.8889H7.55556V11.1111H16.4444V12.8889ZM14.6667 9.33333V5.77778L18.2222 9.33333H14.6667Z"
                                                        fill="#7890B2"/>
                                                </svg>
                                            </button>}
                                    </div>
                                </MyTableCell>
                                <MyTableCell sx={{width: "740px"}}>{row.name}</MyTableCell>
                                <MyTableCell sx={{width: "210px"}}>{row.calories}</MyTableCell>
                                <MyTableCell sx={{width: "210px"}}>{row.fat}</MyTableCell>
                                <MyTableCell sx={{width: "210px"}}>{row.carbs}</MyTableCell>
                                <MyTableCell sx={{width: "210px"}}>{row.protein}</MyTableCell>
                            </TableRow>
                        ))}
                        {/*----- TextField -----*/}
                        {textFieldVisible && <TableRow>
                            <MyTableCell></MyTableCell>
                            <MyTableCell>
                                <MyTextField
                                    name={"workName"}
                                    placeholder={"Наименование работ"}
                                    size={"small"}
                                    onKeyPress={handleKeyPress}
                                    onChange={setVelue}
                                    sx={{width: "730px"}}
                                    InputProps={{className: `${s.textFieldLabel}`}}
                                />
                            </MyTableCell>
                            <MyTableCell>
                                <MyTextField
                                    name={"measure"}
                                    placeholder={"Ед. изм"}
                                    size={"small"}
                                    onChange={setVelue}
                                    sx={{width: "170px"}}
                                    InputProps={{className: `${s.textFieldLabel}`}}
                                />
                            </MyTableCell>
                            <MyTableCell>
                                <MyTextField
                                    placeholder={"Количество"}
                                    size={"small"}
                                    sx={{width: "170px"}}
                                    onChange={setVelue}
                                    InputProps={{className: `${s.textFieldLabel}`}}
                                />
                            </MyTableCell>
                            <MyTableCell>
                                <MyTextField
                                    placeholder={"Цена за ед."}
                                    size={"small"}
                                    sx={{width: "170px"}}
                                    onChange={setVelue}
                                    InputProps={{className: `${s.textFieldLabel}`}}
                                    onKeyPress={handleKeyPress}
                                />
                            </MyTableCell>
                            <MyTableCell>
                                0
                            </MyTableCell>
                        </TableRow>}
                        {/*----- End TextField -----*/}
                    </TableBody>
                </Table>
            </TableContainer>


            {/*<Divider variant="inset" component="li" sx={{background: "white"}}/>*/}
            <br />
            <div style={{
                // display: expand ? "block" : "none",
                paddingLeft: "25px",
                // position: "absolute",
                // left: "20px"
                // height: "60px"
                // border: "1px solid red"

            }}>
                {explorer.items.map((explore: any) => (
                    <Folder key={explore.name} explorer={explore}/>
                ))}
            </div>
        </div>
    );
}

type FolderPropsType = {
    explorer: any
}

export default Folder;