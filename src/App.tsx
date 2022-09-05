import React from 'react';
import './styles/app.scss';
import {Grid, Paper, styled, Table, TableContainer} from "@mui/material";
import AppBar from './components/appBar/AppBar';
import {TabsPanel} from './components/tabsPanel/TabsPanel';
import Folder from "./components/folder/Folder";
import explorer from "./data/data";
import BasicTable from './components/basicTable/BasicTable';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SideBar from "./components/sideBar/SideBar";
import TableBody from "@mui/material/TableBody";

const MyTableCellHead = styled(TableCell)({
    margin: "0",
    // padding: "0",
    color: "#A1A1AA",
    // borderRight: "1px solid grey"
})

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className="App">
            <div style={{width: "1920px"}}>
                <Grid container sx={{width: "100%"}}>
                    {/*--- App Bar ---*/}
                    <Grid xs={12}>
                        <AppBar value={value} handleChange={handleChange}/>
                    </Grid>
                    {/*--- Side Bar ---*/}
                    <Grid xs={1.5}>
                        <SideBar open={open} handleClick={handleClick}/>
                    </Grid>
                    {/*--- Main ---*/}
                    <Grid xs={10.5}>
                        <Paper variant="outlined" square sx={{background: "#27272A"}}>
                            <Grid container sx={{height: "44px", border: "1px solid grey"}}>
                                <Grid p={0} xs={4}
                                      sx={{color: "white", borderRight: "1px solid grey", paddingTop: "10px"}}
                                >
                                    Строительно-монтажные работы
                                </Grid>
                            </Grid>

                            {/*----- First Tab Page -----*/}
                            <TabsPanel value={value} index={0}>
                                <TableContainer component={"table"}>
                                    <Table sx={{minWidth: 650}} aria-label="simple table">
                                        {/*----- Table column title -----*/}
                                        <TableHead>
                                            <TableRow>
                                                <MyTableCellHead>Уровень</MyTableCellHead>
                                                <MyTableCellHead>Наименование работ</MyTableCellHead>
                                                <MyTableCellHead>Ед. изм.</MyTableCellHead>
                                                <MyTableCellHead>Количество</MyTableCellHead>
                                                <MyTableCellHead>Цена за ед.</MyTableCellHead>
                                                <MyTableCellHead>Стоимость</MyTableCellHead>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/*----- Table -----*/}
                                            <BasicTable/>

                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </TabsPanel>
                        </Paper>

                        {/*----- 2-nd Tab Page -----*/}
                        <TabsPanel value={value} index={1}>
                            <TableContainer component={"table"}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    {/*----- Table column title -----*/}
                                    <TableHead>
                                        <TableRow>
                                            <MyTableCellHead>Уровень</MyTableCellHead>
                                            <MyTableCellHead>Наименование работ</MyTableCellHead>
                                            <MyTableCellHead>Ед. изм.</MyTableCellHead>
                                            <MyTableCellHead>Количество</MyTableCellHead>
                                            <MyTableCellHead>Цена за ед.</MyTableCellHead>
                                            <MyTableCellHead>Стоимость</MyTableCellHead>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>

                            <Folder explorer={explorer}/>
                        </TabsPanel>
                    </Grid>
                </Grid>

            </div>
        </div>
    );
}

export default App;
