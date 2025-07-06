import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Container, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type NavTab = {
    label: string;
    path: string;
};

const tabs: NavTab[] = [
    { label: 'Quizuri', path: '/quizzes' },
    // Add new tabs here    , ex:
    // { label: 'About', path: '/about' },
];

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const currentTab = tabs.findIndex(tab => location.pathname.startsWith(tab.path));

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/logo.png`}
                        alt="Logo Skin Studio"
                        sx={{ height: 40, mr: 2 }}
                    />

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
                                sx={{
                                    color: 'white',
                                    fontSize: { xs: '1rem', md: '1.25rem' }, // mai mare pe desktop
                                    fontWeight: 500,
                                }}
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
