import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// PATTERN: Interface Segregation - Only expose what's needed
interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonIcon?: string;
  onButtonClick?: () => void;
}

/**
 * HeroSection Component
 *
 * PATTERN: Single Responsibility Principle
 * - Only responsible for displaying hero content
 * - Handles navigation through props
 *
 * PATTERN: Dependency Injection
 * - Receives all content through props
 * - No hardcoded strings or navigation logic
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonIcon = "🌟",
  onButtonClick,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate("/quiz");
    }
  };

  return (
    <Box className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-logo">
            <img
              src="/logo.png"
              alt="Skin Studio Logo"
              className="hero-logo-img"
            />
          </div>
          <Typography className="hero-title">{title}</Typography>
          <Typography className="hero-subtitle">{subtitle}</Typography>
          <Button className="hero-button" onClick={handleButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default HeroSection;
