import React from 'react';
import Box from "@mui/material/Box";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";

const SideBar = ({handleClick, open}: SideBarPropsType) => {
    return (
        <Box sx={{width: '100%', maxWidth: 360}}>
            <nav aria-label="main  folders">
                <List sx={{
                    backgroundColor: "gray",
                    height: "100%"
                }}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleClick}>
                            <Typography variant="inherit" component="h5" sx={{mr: 2}}>
                                Название проекта
                                <Typography variant="inherit" component="h5">
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
                            <ListItemText primary="Inbox"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Drafts"/>
                        </ListItemButton>
                    </ListItem>
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