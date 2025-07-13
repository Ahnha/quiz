// Email Configuration
// Update these values with your actual EmailJS credentials

export const EMAIL_CONFIG = {
    // EmailJS Configuration
    EMAILJS_SERVICE_ID: 'service_b0eycgy', // Your actual Service ID
    EMAILJS_TEMPLATE_ID: 'template_cursor', // ✅ Updated to your template name
    EMAILJS_USER_ID: 'qpMdCwldZeAqODpQR', // ✅ Updated to your EmailJS user ID

    // Skin Studio Email
    SKIN_STUDIO_EMAIL: 'a.m.stratulat@gmail.com', // ✅ Updated to your email

    // Email Templates
    TEMPLATES: {
        // Template for sending reports to users
        USER_REPORT: 'your_user_report_template_id',

        // Template for sending contact form to Skin Studio
        SKIN_STUDIO_CONTACT: 'your_contact_template_id',

        // Template for sending quiz results to Skin Studio
        SKIN_STUDIO_QUIZ: 'your_quiz_template_id'
    }
};

// Instructions for setup:
// 1. ✅ Service ID: service_b0eycgy (already set)
// 2. Create the email template in EmailJS dashboard using the HTML above
// 3. Copy the Template ID from EmailJS dashboard
// 4. Get your User ID from EmailJS Account → API Keys
// 5. Update the values above with your actual credentials
// 6. Update the Skin Studio email address
// 7. Update the EmailJS initialization in public/index.html with your User ID 