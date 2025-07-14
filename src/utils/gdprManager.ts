import { SecurityUtils, ErrorLogger } from "../config/security";

/**
 * GDPR Consent Manager
 *
 * PATTERN: Service Layer
 * - Centralized GDPR consent management
 * - Secure data handling
 * - Compliance with latest GDPR regulations
 */

export interface ConsentData {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  thirdParty: boolean;
  timestamp: string;
  version: string;
  language: string;
}

export interface CookieInfo {
  name: string;
  purpose: string;
  duration: string;
  type: "necessary" | "analytics" | "marketing" | "thirdParty";
}

/**
 * GDPR Consent Manager Class
 *
 * Handles all GDPR-related operations including:
 * - Consent storage and retrieval
 * - Cookie management
 * - Consent validation
 * - Compliance checking
 */
export class GDPRManager {
  private static instance: GDPRManager;
  private consentKey = "gdpr-consent";
  private consentVersion = "1.0";

  private constructor() {}

  /**
   * Get singleton instance
   */
  public static getInstance(): GDPRManager {
    if (!GDPRManager.instance) {
      GDPRManager.instance = new GDPRManager();
    }
    return GDPRManager.instance;
  }

  /**
   * Get current consent data
   */
  public getConsent(): ConsentData | null {
    try {
      const consent = SecurityUtils.safeLocalStorageGet(this.consentKey, null);
      if (consent && this.isValidConsent(consent)) {
        return consent as ConsentData;
      }
      return null;
    } catch (error) {
      ErrorLogger.log(error as Error, "GDPR Manager - Get Consent");
      return null;
    }
  }

  /**
   * Save consent data
   */
  public saveConsent(consent: Partial<ConsentData>): boolean {
    try {
      const fullConsent: ConsentData = {
        necessary: true, // Always true
        analytics: consent.analytics || false,
        marketing: consent.marketing || false,
        thirdParty: consent.thirdParty || false,
        timestamp: new Date().toISOString(),
        version: this.consentVersion,
        language: consent.language || "en",
      };

      SecurityUtils.safeLocalStorageSet(this.consentKey, fullConsent);
      this.applyConsent(fullConsent);
      return true;
    } catch (error) {
      ErrorLogger.log(error as Error, "GDPR Manager - Save Consent");
      return false;
    }
  }

  /**
   * Check if consent has been given
   */
  public hasConsent(): boolean {
    const consent = this.getConsent();
    return consent !== null;
  }

  /**
   * Check if specific consent type is given
   */
  public hasConsentFor(
    type: keyof Omit<ConsentData, "timestamp" | "version" | "language">,
  ): boolean {
    const consent = this.getConsent();
    if (!consent) return false;

    return consent[type] === true;
  }

  /**
   * Revoke consent
   */
  public revokeConsent(): boolean {
    try {
      SecurityUtils.safeLocalStorageSet(this.consentKey, null);
      this.clearNonNecessaryCookies();
      return true;
    } catch (error) {
      ErrorLogger.log(error as Error, "GDPR Manager - Revoke Consent");
      return false;
    }
  }

  /**
   * Update consent preferences
   */
  public updateConsent(preferences: Partial<ConsentData>): boolean {
    const currentConsent = this.getConsent();
    if (!currentConsent) return false;

    const updatedConsent = {
      ...currentConsent,
      ...preferences,
      timestamp: new Date().toISOString(),
    };

    return this.saveConsent(updatedConsent);
  }

  /**
   * Get consent statistics
   */
  public getConsentStats(): {
    totalConsents: number;
    analyticsConsents: number;
    marketingConsents: number;
    thirdPartyConsents: number;
    lastConsentDate: string | null;
  } {
    const consent = this.getConsent();
    if (!consent) {
      return {
        totalConsents: 0,
        analyticsConsents: 0,
        marketingConsents: 0,
        thirdPartyConsents: 0,
        lastConsentDate: null,
      };
    }

    return {
      totalConsents: 1,
      analyticsConsents: consent.analytics ? 1 : 0,
      marketingConsents: consent.marketing ? 1 : 0,
      thirdPartyConsents: consent.thirdParty ? 1 : 0,
      lastConsentDate: consent.timestamp,
    };
  }

  /**
   * Validate consent data
   */
  private isValidConsent(consent: any): consent is ConsentData {
    return (
      consent &&
      typeof consent === "object" &&
      typeof consent.necessary === "boolean" &&
      typeof consent.analytics === "boolean" &&
      typeof consent.marketing === "boolean" &&
      typeof consent.thirdParty === "boolean" &&
      typeof consent.timestamp === "string" &&
      typeof consent.version === "string" &&
      typeof consent.language === "string"
    );
  }

  /**
   * Apply consent settings to cookies and tracking
   */
  private applyConsent(consent: ConsentData): void {
    try {
      // Always allow necessary cookies
      this.enableNecessaryCookies();

      // Apply analytics consent
      if (consent.analytics) {
        this.enableAnalyticsCookies();
      } else {
        this.disableAnalyticsCookies();
      }

      // Apply marketing consent
      if (consent.marketing) {
        this.enableMarketingCookies();
      } else {
        this.disableMarketingCookies();
      }

      // Apply third-party consent
      if (consent.thirdParty) {
        this.enableThirdPartyCookies();
      } else {
        this.disableThirdPartyCookies();
      }
    } catch (error) {
      ErrorLogger.log(error as Error, "GDPR Manager - Apply Consent");
    }
  }

  /**
   * Enable necessary cookies (always enabled)
   */
  private enableNecessaryCookies(): void {
    // These cookies are essential for the website to function
    // Session management, language preferences, etc.
    try {
      // Set session cookie
      document.cookie = "session_id=; path=/; max-age=3600; SameSite=Strict";

      // Set language preference
      const language = SecurityUtils.safeLocalStorageGet(
        "preferred-language",
        "en",
      );
      document.cookie = `lang=${language}; path=/; max-age=31536000; SameSite=Strict`;
    } catch (error) {
      ErrorLogger.log(
        error as Error,
        "GDPR Manager - Enable Necessary Cookies",
      );
    }
  }

  /**
   * Enable analytics cookies
   */
  private enableAnalyticsCookies(): void {
    try {
      // Google Analytics (if configured)
      if (typeof window !== "undefined" && (window as any).gtag) {
        document.cookie = "_ga=; path=/; max-age=63072000; SameSite=Lax";
        document.cookie = "_gid=; path=/; max-age=86400; SameSite=Lax";
      }
    } catch (error) {
      ErrorLogger.log(
        error as Error,
        "GDPR Manager - Enable Analytics Cookies",
      );
    }
  }

  /**
   * Disable analytics cookies
   */
  private disableAnalyticsCookies(): void {
    try {
      // Remove analytics cookies
      document.cookie = "_ga=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "_gid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "_gat=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } catch (error) {
      ErrorLogger.log(
        error as Error,
        "GDPR Manager - Disable Analytics Cookies",
      );
    }
  }

  /**
   * Enable marketing cookies
   */
  private enableMarketingCookies(): void {
    try {
      // Marketing cookies for advertising
      document.cookie =
        "marketing_consent=true; path=/; max-age=31536000; SameSite=Lax";
    } catch (error) {
      ErrorLogger.log(
        error as Error,
        "GDPR Manager - Enable Marketing Cookies",
      );
    }
  }

  /**
   * Disable marketing cookies
   */
  private disableMarketingCookies(): void {
    try {
      // Remove marketing cookies
      document.cookie =
        "marketing_consent=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } catch (error) {
      ErrorLogger.log(
        error as Error,
        "GDPR Manager - Disable Marketing Cookies",
      );
    }
  }

  /**
   * Enable third-party cookies
   */
  private enableThirdPartyCookies(): void {
    try {
      // Third-party service cookies
      document.cookie =
        "third_party_consent=true; path=/; max-age=31536000; SameSite=Lax";
    } catch (error) {
      ErrorLogger.log(
        error as Error,
        "GDPR Manager - Enable Third Party Cookies",
      );
    }
  }

  /**
   * Disable third-party cookies
   */
  private disableThirdPartyCookies(): void {
    try {
      // Remove third-party cookies
      document.cookie =
        "third_party_consent=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } catch (error) {
      ErrorLogger.log(
        error as Error,
        "GDPR Manager - Disable Third Party Cookies",
      );
    }
  }

  /**
   * Clear all non-necessary cookies
   */
  private clearNonNecessaryCookies(): void {
    this.disableAnalyticsCookies();
    this.disableMarketingCookies();
    this.disableThirdPartyCookies();
  }

  /**
   * Get cookie information for transparency
   */
  public getCookieInfo(): CookieInfo[] {
    return [
      {
        name: "session_id",
        purpose: "Session management and security",
        duration: "1 hour",
        type: "necessary",
      },
      {
        name: "lang",
        purpose: "Language preference",
        duration: "1 year",
        type: "necessary",
      },
      {
        name: "_ga",
        purpose: "Google Analytics - User identification",
        duration: "2 years",
        type: "analytics",
      },
      {
        name: "_gid",
        purpose: "Google Analytics - Session tracking",
        duration: "24 hours",
        type: "analytics",
      },
      {
        name: "marketing_consent",
        purpose: "Marketing and advertising preferences",
        duration: "1 year",
        type: "marketing",
      },
      {
        name: "third_party_consent",
        purpose: "Third-party service integration",
        duration: "1 year",
        type: "thirdParty",
      },
    ];
  }

  /**
   * Check if consent needs renewal (older than 1 year)
   */
  public needsRenewal(): boolean {
    const consent = this.getConsent();
    if (!consent) return true;

    const consentDate = new Date(consent.timestamp);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return consentDate < oneYearAgo;
  }

  /**
   * Export consent data for data portability (GDPR requirement)
   */
  public exportConsentData(): string {
    const consent = this.getConsent();
    if (!consent) return "";

    try {
      return JSON.stringify(consent, null, 2);
    } catch (error) {
      ErrorLogger.log(error as Error, "GDPR Manager - Export Consent Data");
      return "";
    }
  }
}

// Export singleton instance
export const gdprManager = GDPRManager.getInstance();
