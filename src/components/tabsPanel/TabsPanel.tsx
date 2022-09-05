import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import s from './tabsPanel.module.scss';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function TabsPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 1}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({value, handleChange}: BasicTabsPropsType) {
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 2, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs" textColor="inherit" indicatorColor="primary">
                    <Tab  label="Просмотр" {...a11yProps(0)}
                         sx={{
                             color: "white",
                             fontSize: '14px'
                         }}
                    />
                    <Tab label="Управление" {...a11yProps(1)} sx={{color: "white", fontSize: '14px'}}/>
                </Tabs>
            </Box>
        </Box>
    );
}

type BasicTabsPropsType = {
    value: number
    handleChange: (event: React.SyntheticEvent, newValue: number) => void
}