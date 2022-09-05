import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import TabsPanel from '../tabsPanel/TabsPanel';
import Avatar from '@mui/material/Avatar/Avatar';
import ReplyIcon from '@mui/icons-material/Reply';

export default function ButtonAppBar({value, handleChange}: ButtonAppBarPropsType) {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{
                backgroundColor: '#27272A',
                height: '44px',
                display: 'flex',
                justifyContent: "center"
            }}>
                <Toolbar>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <AppsIcon/>
                    </IconButton>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 1}}
                    >
                        <ReplyIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <TabsPanel value={value} handleChange={handleChange}/>
                    </Typography>
                    <Avatar src="/static/images/avatar/3.jpg" sx={{height: "30px", width: "32px"}}/>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

type ButtonAppBarPropsType = {
    value: number
    handleChange: (event: React.SyntheticEvent, newValue: number) => void
}