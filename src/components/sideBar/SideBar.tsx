import React from 'react';
import Box from "@mui/material/Box";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Typography} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";


const SideBar = ({handleClick, open}: SideBarPropsType) => {
    return (
        <Box sx={{width: '100%', height: "100vh", maxWidth: 360, bgcolor: '#27272A', border: "1px solid grey"}}>
            <nav aria-label="main  folders">
                <List>
                    <ListItem disablePadding
                              sx={{
                                  borderBottom: "1px solid grey",
                                  // paddingLeft: "30px",
                                  height: "36px",
                              }}>
                        <ListItemButton onClick={handleClick}>
                            <Typography variant="inherit" component="h5" sx={{mr: 2, color: "white"}}>
                                Название проекта
                                <Typography variant="inherit" component="h5" sx={{mr: 2, color: "white"}}>
                                    Абривиатура
                                </Typography>
                            </Typography>
                            {open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemText primary="Starred"/>
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <Typography sx={{color: "white"}}>
                                По проекту
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <Typography sx={{color: "white"}}>
                                Обьекты
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <Typography sx={{color: "white"}}>
                                РД
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <Typography sx={{color: "white"}}>
                                МТО
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <Typography sx={{color: "white"}}>
                                СМР
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <Typography sx={{color: "white"}}>
                                График
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <Typography sx={{color: "white"}}>
                                МиМ
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <Typography sx={{color: "white"}}>
                            Обьекты
                        </Typography>
                    </ListItemButton>
                </List>

            </nav>
        </Box>
    );
};

type SideBarPropsType = {
    handleClick: () => void
    open: boolean
}

export default SideBar;