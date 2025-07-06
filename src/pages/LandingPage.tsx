import React from 'react';
import { Box, Button, Container, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { landingTitle, landingSubtitle, landingSections } from '../landingText';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.main',
                    color: 'white',
                    textAlign: 'center',
                    p: 4,
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" fontWeight={700} mb={3}>
                        {landingTitle}
                    </Typography>
                    <Typography variant="h5" mb={4}>
                        {landingSubtitle}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => navigate('/quizuri')}
                    >
                        Începe Quiz-ul
                    </Button>
                </Container>
            </Box>

            <Box bgcolor="#f9f9f9" py={8}>
                <Container maxWidth="md">
                    <Stack spacing={4}>
                        {landingSections.map((section, index) => (
                            <Box key={index}>
                                <Typography variant="h4" textAlign="center" fontWeight={600}>
                                    {section.title}
                                </Typography>
                                <Typography variant="body1" textAlign="center" mb={4}>
                                    {section.text}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Container>
            </Box>

            <Box bgcolor="primary.dark" color="white" textAlign="center" py={2}>
                <Typography variant="body2">&copy; {new Date().getFullYear()} Skin Studio. Toate drepturile rezervate.</Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;
