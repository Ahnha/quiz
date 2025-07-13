// Email Configuration
// Update these values with your actual EmailJS credentials

export const EMAIL_CONFIG = {
    // EmailJS Configuration
    EMAILJS_SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
    EMAILJS_TEMPLATE_ID: 'your_template_id', // Replace with your EmailJS template ID
    EMAILJS_USER_ID: 'your_user_id', // Replace with your EmailJS user ID

    // Skin Studio Email
    SKIN_STUDIO_EMAIL: 'skinstudio@example.com', // Replace with actual Skin Studio email

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
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create email templates for:
//    - User reports (sending quiz results to users)
//    - Contact form submissions (sending contact info to Skin Studio)
//    - Quiz notifications (sending quiz results to Skin Studio)
// 4. Get your Service ID, Template IDs, and User ID
// 5. Update the values above with your actual credentials
// 6. Update the Skin Studio email address
// 7. Update the EmailJS initialization in public/index.html with your User ID 