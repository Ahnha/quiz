// PATTERN: Service Layer - Email Service
// Handles email sending functionality for reports and notifications

import { ErrorLogger } from "../config/security";
import { EMAIL_CONFIG } from "../config/emailConfig";

export interface EmailData {
  to: string;
  subject: string;
  htmlContent: string;
  userName?: string;
  quizTitle?: string;
  score?: number;
  date?: string;
  language?: "ro" | "en";
}

/**
 * Email Service Class
 *
 * PATTERN: Service Layer Pattern
 * - Handles email sending operations
 * - Provides clean interface for email operations
 *
 * PATTERN: Error Handling
 * - Comprehensive error handling and logging
 * - Graceful fallbacks for email sending issues
 */
export class EmailService {
  // EmailJS configuration from config file
  private static readonly EMAILJS_SERVICE_ID = EMAIL_CONFIG.EMAILJS_SERVICE_ID;
  private static readonly EMAILJS_TEMPLATE_ID =
    EMAIL_CONFIG.EMAILJS_TEMPLATE_ID;
  private static readonly EMAILJS_USER_ID = EMAIL_CONFIG.EMAILJS_USER_ID;
  private static readonly SKIN_STUDIO_EMAIL = EMAIL_CONFIG.SKIN_STUDIO_EMAIL;

  /**
   * Send email using EmailJS
   * @param data - Email data
   */
  public static async sendEmail(data: EmailData): Promise<void> {
    try {
      // Check if EmailJS is configured
      if (
        this.EMAILJS_SERVICE_ID === "your_service_id" ||
        this.EMAILJS_TEMPLATE_ID === "your_template_id" ||
        this.EMAILJS_USER_ID === "your_user_id"
      ) {
        throw new Error(
          "EmailJS is not configured. Please update src/config/emailConfig.ts with your EmailJS credentials.",
        );
      }

      // Check if EmailJS is available
      if (typeof window !== "undefined" && (window as any).emailjs) {
        await this.sendWithEmailJS(data);
      } else {
        // Fallback to fetch API (you'll need to implement a backend endpoint)
        await this.sendWithFetchAPI(data);
      }
    } catch (error) {
      ErrorLogger.log(error as Error, "Email Service");
      throw new Error(
        `Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Send email to Skin Studio
   * @param data - Report data
   */
  public static async sendToSkinStudio(data: EmailData): Promise<void> {
    const skinStudioData: EmailData = {
      to: this.SKIN_STUDIO_EMAIL,
      subject: `Quiz Report - ${data.userName} - ${data.quizTitle}`,
      htmlContent: data.htmlContent,
      userName: data.userName,
      quizTitle: data.quizTitle,
      score: data.score,
      date: data.date,
      language: data.language,
    };

    await this.sendEmail(skinStudioData);
  }

  /**
   * Send report to user's email
   * @param data - Report data
   */
  public static async sendToUser(data: EmailData): Promise<void> {
    if (!data.to) {
      throw new Error("Recipient email is required");
    }

    // Use the direct EmailJS template with the correct variables
    if (typeof window === "undefined" || !(window as any).emailjs) {
      throw new Error(
        "EmailJS is not available. Please check if it is properly loaded.",
      );
    }

    const emailjs = (window as any).emailjs;

    const templateParams = {
      from_page: "Skin Studio Quiz App",
      user_name: data.userName || "User",
      from_email: data.to,
      quiz_title: data.quizTitle || "Quiz",
      quiz_score: data.score || 0,
      quiz_result: data.htmlContent, // This will contain the full report HTML
      name: data.userName || "User",
      email: data.to,
      phone: "",
      message: "",
      date: data.date || new Date().toLocaleDateString(),
      language: data.language || "ro",
    };

    return new Promise((resolve, reject) => {
      emailjs
        .send(
          this.EMAILJS_SERVICE_ID,
          this.EMAILJS_TEMPLATE_ID,
          templateParams,
          this.EMAILJS_USER_ID,
        )
        .then((response: any) => {
          console.log("Report sent to user successfully:", response);
          resolve();
        })
        .catch((error: any) => {
          console.error("Report sending failed:", error);
          reject(
            new Error(
              `Report sending failed: ${error.text || error.message || "Unknown error"}`,
            ),
          );
        });
    });
  }

  /**
   * Send contact information to Skin Studio
   * @param data - Contact data with quiz results
   */
  public static async sendContactToSkinStudio(data: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    subscribeUpdates?: boolean;
    userName: string;
    quizTitle: string;
    score: number;
    date: string;
    language?: "ro" | "en";
    htmlContent: string;
  }): Promise<void> {
    // Use the direct EmailJS template with the correct variables
    if (typeof window === "undefined" || !(window as any).emailjs) {
      throw new Error(
        "EmailJS is not available. Please check if it is properly loaded.",
      );
    }

    const emailjs = (window as any).emailjs;

    const templateParams = {
      from_page: "Skin Studio Quiz App",
      user_name: data.userName,
      from_email: data.email,
      quiz_title: data.quizTitle,
      quiz_score: data.score,
      quiz_result: data.htmlContent, // This will contain the full report HTML
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      message: data.message || "",
      date: data.date,
      language: data.language || "ro",
    };

    return new Promise((resolve, reject) => {
      emailjs
        .send(
          this.EMAILJS_SERVICE_ID,
          this.EMAILJS_TEMPLATE_ID,
          templateParams,
          this.EMAILJS_USER_ID,
        )
        .then((response: any) => {
          console.log("Contact sent to Skin Studio successfully:", response);
          resolve();
        })
        .catch((error: any) => {
          console.error("Contact sending failed:", error);
          reject(
            new Error(
              `Contact sending failed: ${error.text || error.message || "Unknown error"}`,
            ),
          );
        });
    });
  }

  /**
   * Generate HTML content for contact email to Skin Studio
   * @param data - Contact data
   * @returns HTML string
   */
  private static generateContactEmailHTML(data: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    subscribeUpdates?: boolean;
    userName: string;
    quizTitle: string;
    score: number;
    date: string;
    language?: "ro" | "en";
    htmlContent: string;
  }): string {
    const isRomanian = data.language === "ro";

    return `
<!DOCTYPE html>
<html lang="${data.language || "ro"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skin Studio - Contact Form Submission</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #9c27b0, #e91e63);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 15px;
            border-left: 4px solid #9c27b0;
        }
        .section h3 {
            color: #9c27b0;
            margin-top: 0;
        }
        .contact-info {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 15px;
        }
        .quiz-info {
            background: #f3e5f5;
            padding: 15px;
            border-radius: 6px;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .value {
            color: #333;
            margin-bottom: 8px;
        }
        .message-box {
            background: #fff3e0;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #ff9800;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #9c27b0;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Skin Studio</h1>
        <p>${isRomanian ? "Formular de Contact - Quiz Îngrijire Piele" : "Contact Form - Skin Care Quiz"}</p>
    </div>

    <div class="section">
        <h3>${isRomanian ? "Informații de Contact" : "Contact Information"}</h3>
        <div class="contact-info">
            <div class="value">
                <span class="label">${isRomanian ? "Nume:" : "Name:"}</span> ${data.name}
            </div>
            <div class="value">
                <span class="label">${isRomanian ? "Email:" : "Email:"}</span> ${data.email}
            </div>
            ${
              data.phone
                ? `
            <div class="value">
                <span class="label">${isRomanian ? "Telefon:" : "Phone:"}</span> ${data.phone}
            </div>
            `
                : ""
            }
            <div class="value">
                <span class="label">${isRomanian ? "Abonare la actualizări:" : "Subscribe to updates:"}</span> ${data.subscribeUpdates ? (isRomanian ? "Da" : "Yes") : isRomanian ? "Nu" : "No"}
            </div>
        </div>
    </div>

    <div class="section">
        <h3>${isRomanian ? "Detalii Quiz" : "Quiz Details"}</h3>
        <div class="quiz-info">
            <div class="value">
                <span class="label">${isRomanian ? "Utilizator:" : "User:"}</span> ${data.userName}
            </div>
            <div class="value">
                <span class="label">${isRomanian ? "Test:" : "Quiz:"}</span> ${data.quizTitle}
            </div>
            <div class="value">
                <span class="label">${isRomanian ? "Scor:" : "Score:"}</span> ${data.score}
            </div>
            <div class="value">
                <span class="label">${isRomanian ? "Data:" : "Date:"}</span> ${data.date}
            </div>
        </div>
    </div>

    ${
      data.message
        ? `
    <div class="section">
        <h3>${isRomanian ? "Mesaj" : "Message"}</h3>
        <div class="message-box">
            ${data.message.replace(/\n/g, "<br>")}
        </div>
    </div>
    `
        : ""
    }

    <div class="section">
        <h3>${isRomanian ? "Raport Complet" : "Complete Report"}</h3>
        <p>${isRomanian ? "Raportul complet al utilizatorului este atașat mai jos:" : "The complete user report is attached below:"}</p>
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 6px; background: white;">
            ${data.htmlContent}
        </div>
    </div>

    <div class="footer">
        <p>© 2025 Skin Studio. ${isRomanian ? "Toate drepturile rezervate." : "All rights reserved."}</p>
        <p>${isRomanian ? "Acest email a fost generat automat din formularul de contact al aplicației." : "This email was automatically generated from the application contact form."}</p>
    </div>
</body>
</html>
        `;
  }

  /**
   * Send email using EmailJS
   * @param data - Email data
   */
  private static async sendWithEmailJS(data: EmailData): Promise<void> {
    // Check if EmailJS is available
    if (typeof window === "undefined" || !(window as any).emailjs) {
      throw new Error(
        "EmailJS is not available. Please check if it is properly loaded.",
      );
    }

    const emailjs = (window as any).emailjs;

    const templateParams = {
      to_email: data.to,
      subject: data.subject,
      message: data.htmlContent,
      user_name: data.userName || "",
      quiz_title: data.quizTitle || "",
      score: data.score || 0,
      date: data.date || "",
      language: data.language || "ro",
    };

    return new Promise((resolve, reject) => {
      emailjs
        .send(
          this.EMAILJS_SERVICE_ID,
          this.EMAILJS_TEMPLATE_ID,
          templateParams,
          this.EMAILJS_USER_ID,
        )
        .then((response: any) => {
          console.log("Email sent successfully:", response);
          resolve();
        })
        .catch((error: any) => {
          console.error("Email sending failed:", error);
          reject(
            new Error(
              `Email sending failed: ${error.text || error.message || "Unknown error"}`,
            ),
          );
        });
    });
  }

  /**
   * Send email using fetch API (fallback)
   * @param data - Email data
   */
  private static async sendWithFetchAPI(data: EmailData): Promise<void> {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to send email");
    }
  }

  /**
   * Validate email address
   * @param email - Email address to validate
   * @returns boolean
   */
  // eslint-disable-next-line no-useless-escape
  public static isValidEmail(email: string): boolean {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    return emailRegex.test(email);
  }
}
