import React from 'react';
import { Box, Button, Container, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { landingTitle, landingSubtitle, landingSections } from '../landing/landingText';
import '../styles/themeStyles.css';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box className="landing-wrapper">
            {/* HERO SECTION */}
            <Box className="hero-section">
                <Container maxWidth="md">
                    <Typography className="hero-title">
                        {landingTitle}
                    </Typography>
                    <Typography className="hero-subtitle">
                        {landingSubtitle}
                    </Typography>
                    <Button
                        className="cta-button"
                        onClick={() => navigate('/quiz')}
                    >
                        Începe Quiz-ul
                    </Button>
                </Container>
            </Box>

            {/* INFO SECTION */}
            <Box className="info-section">
                <Container maxWidth="md">
                    <Stack spacing={4}>
                        {landingSections.map((section, index) => (
                            <Box className="info-block" key={index}>
                                <Typography className="section-title">
                                    {section.title}
                                </Typography>
                                <Typography className="section-text">
                                    {section.text}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Container>
            </Box>

            {/* FOOTER */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Skin Studio. Toate drepturile rezervate.</p>
            </footer>
        </Box>
    );
};

export default LandingPage;