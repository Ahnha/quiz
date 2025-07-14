import React from "react";
import { Box, Container, Typography } from "@mui/material";

// PATTERN: Data Transfer Object - Clear structure for info sections
export interface InfoSectionData {
  title: string;
  text: string;
}

// PATTERN: Feature Item structure
export interface FeatureItem {
  icon: string;
  text: string;
}

// PATTERN: Interface Segregation - Separate props for different concerns
interface InfoSectionProps {
  sections: InfoSectionData[];
  features?: FeatureItem[];
}

/**
 * InfoSection Component
 *
 * PATTERN: Single Responsibility Principle
 * - Only responsible for displaying info sections and features
 *
 * PATTERN: Composition over Inheritance
 * - Uses composition to build complex UI from simple components
 *
 * PATTERN: Open/Closed Principle
 * - Open for extension (can add more sections/features)
 * - Closed for modification (doesn't need to change existing code)
 */
const InfoSection: React.FC<InfoSectionProps> = ({
  sections,
  features = [],
}) => {
  return (
    <Box className="info-section">
      <Container maxWidth="lg">
        {/* Info Blocks */}
        <div className="info-container">
          {sections.map((section, index) => (
            <Box className="info-block" key={index}>
              <Typography className="section-title">{section.title}</Typography>
              <Typography className="section-text">{section.text}</Typography>
            </Box>
          ))}
        </div>

        {/* Features Grid - Only render if features are provided */}
        {features.length > 0 && (
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-item" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-text">{feature.text}</div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Box>
  );
};

export default InfoSection;
