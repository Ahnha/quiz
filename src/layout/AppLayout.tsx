import React from 'react';
import { AppBar, Toolbar, Typography, Box, Tabs, Tab, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type NavTab = {
    label: string;
    path: string;
};

const tabs: NavTab[] = [
    { label: 'Quizuri', path: '/quizzes' },
    // Aici adaugi ușor alte taburi, ex:
    // { label: 'Despre', path: '/about' },
];

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const currentTab = tabs.findIndex(tab => location.pathname.startsWith(tab.path));

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Quiz App
                    </Typography>
                    <Tabs
                        value={currentTab === -1 ? false : currentTab}
                        textColor="inherit"
                        indicatorColor="secondary"
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.label}
                                component={Link}
                                to={tab.path}
                                sx={{ color: 'white' }}
                            />
                        ))}
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ py: 4 }}>
                {children}
            </Container>
        </>
    );
};

export default AppLayout;
