import React, { useEffect, useState } from 'react';
import { SecurityUtils, ErrorLogger } from '../config/security';

interface SecurityIssue {
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: Date;
    context?: string;
}

/**
 * Security Audit Component
 * 
 * PATTERN: Security Monitoring
 * - Monitors application security
 * - Reports potential security issues
 * - Provides security recommendations
 * - Development-only component
 */
const SecurityAudit: React.FC = () => {
    const [issues, setIssues] = useState<SecurityIssue[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') {
            return; // Only run in development
        }

        const auditSecurity = () => {
            const newIssues: SecurityIssue[] = [];

            // Check for HTTPS
            if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
                newIssues.push({
                    id: SecurityUtils.generateSecureId(),
                    type: 'warning',
                    message: 'Application is not running on HTTPS',
                    timestamp: new Date(),
                    context: 'Transport Security'
                });
            }

            // Check for secure cookies
            if (document.cookie.includes('secure') === false) {
                newIssues.push({
                    id: SecurityUtils.generateSecureId(),
                    type: 'info',
                    message: 'Consider using secure cookies in production',
                    timestamp: new Date(),
                    context: 'Cookie Security'
                });
            }

            // Check for CSP headers
            const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
            if (!cspMeta) {
                newIssues.push({
                    id: SecurityUtils.generateSecureId(),
                    type: 'warning',
                    message: 'Content Security Policy not detected',
                    timestamp: new Date(),
                    context: 'CSP'
                });
            }

            // Check for X-Frame-Options
            // Note: This would be checked on the server side in production
            newIssues.push({
                id: SecurityUtils.generateSecureId(),
                type: 'info',
                message: 'Consider implementing X-Frame-Options header',
                timestamp: new Date(),
                context: 'Frame Security'
            });

            // Check for environment variables exposure
            const sensitiveKeys = ['REACT_APP_EMAILJS_SECRET_KEY', 'REACT_APP_RECAPTCHA_SECRET_KEY'];
            sensitiveKeys.forEach(key => {
                if (process.env[key]) {
                    newIssues.push({
                        id: SecurityUtils.generateSecureId(),
                        type: 'error',
                        message: `Sensitive environment variable ${key} is exposed in client-side code`,
                        timestamp: new Date(),
                        context: 'Environment Security'
                    });
                }
            });

            setIssues(newIssues);

            // Log issues
            newIssues.forEach(issue => {
                ErrorLogger.warn(`Security Issue: ${issue.message}`, issue.context);
            });
        };

        // Run initial audit
        auditSecurity();

        // Set up periodic audits
        const interval = setInterval(auditSecurity, 30000); // Every 30 seconds

        return () => clearInterval(interval);
    }, []);

    if (process.env.NODE_ENV !== 'development' || issues.length === 0) {
        return null;
    }

    return (
        <div className="security-audit">
            <button
                className="security-audit-toggle"
                onClick={() => setIsVisible(!isVisible)}
                title="Security Audit"
            >
                🔒 {issues.filter(i => i.type === 'error').length}
            </button>

            {isVisible && (
                <div className="security-audit-panel">
                    <h3>Security Audit Results</h3>
                    <div className="security-issues">
                        {issues.map(issue => (
                            <div key={issue.id} className={`security-issue ${issue.type}`}>
                                <div className="issue-header">
                                    <span className="issue-type">{issue.type.toUpperCase()}</span>
                                    <span className="issue-context">{issue.context}</span>
                                </div>
                                <p className="issue-message">{issue.message}</p>
                                <small className="issue-timestamp">
                                    {issue.timestamp.toLocaleTimeString()}
                                </small>
                            </div>
                        ))}
                    </div>
                    <button
                        className="btn-minimal"
                        onClick={() => setIsVisible(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default SecurityAudit; 