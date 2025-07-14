import React, { useEffect } from "react";
import { SECURITY_CONFIG } from "../config/security";

/**
 * Content Security Policy Component
 *
 * PATTERN: Security Headers
 * - Adds CSP headers to prevent XSS attacks
 * - Configurable policy based on environment
 * - Protects against code injection
 */
const ContentSecurityPolicy: React.FC = () => {
  useEffect(() => {
    // Add CSP meta tag to head
    const addCSPMetaTag = () => {
      // Remove existing CSP meta tag if present
      const existingCSP = document.querySelector(
        'meta[http-equiv="Content-Security-Policy"]',
      );
      if (existingCSP) {
        existingCSP.remove();
      }

      // Create CSP policy string
      const cspPolicy = Object.entries(SECURITY_CONFIG.csp)
        .map(([directive, sources]) => {
          if (Array.isArray(sources)) {
            return `${directive} ${sources.join(" ")}`;
          }
          return `${directive} ${sources}`;
        })
        .join("; ");

      // Create and add meta tag
      const meta = document.createElement("meta");
      meta.httpEquiv = "Content-Security-Policy";
      meta.content = cspPolicy;
      document.head.appendChild(meta);
    };

    // Add security headers
    const addSecurityHeaders = () => {
      // Note: In a real application, these headers would be set on the server
      // This is just for demonstration and local development
      if (process.env.NODE_ENV === "development") {
        console.info("Security headers would be set on server in production");
      }
    };

    addCSPMetaTag();
    addSecurityHeaders();

    // Cleanup function
    return () => {
      const cspMeta = document.querySelector(
        'meta[http-equiv="Content-Security-Policy"]',
      );
      if (cspMeta) {
        cspMeta.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ContentSecurityPolicy;
