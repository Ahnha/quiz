# Email Setup for Quiz App

This document explains how to set up email functionality for the Skin Studio quiz app.

## Features Added

1. **Automatic Skin Studio Notification**: When a user generates a report, it's automatically sent to Skin Studio
2. **User Email Sending**: Users can send the report to their own email address from the HTML report page
3. **Skin Studio Contact Form**: Users can send their contact information and quiz results directly to Skin Studio from the report page

## Setup Options

### Option 1: EmailJS (Recommended for Frontend-only)

1. **Sign up for EmailJS**:
   - Go to [EmailJS](https://www.emailjs.com/)
   - Create a free account
   - Add your email service (Gmail, Outlook, etc.)

2. **Configure EmailJS**:
   - Get your Service ID, Template ID, and User ID
   - Update the constants in `src/services/emailService.ts`:

   ```typescript
   private static readonly EMAILJS_SERVICE_ID = 'your_service_id';
   private static readonly EMAILJS_TEMPLATE_ID = 'your_template_id';
   private static readonly EMAILJS_USER_ID = 'your_user_id';
   private static readonly SKIN_STUDIO_EMAIL = 'your_skinstudio_email@example.com';
   ```

3. **Add EmailJS to your HTML**:
   Add this script to your `public/index.html`:

   ```html
   <script
     type="text/javascript"
     src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
   ></script>
   <script type="text/javascript">
     (function () {
       emailjs.init("your_user_id");
     })();
   </script>
   ```

4. **Create Email Templates**:
   - Create a template for Skin Studio notifications
   - Create a template for user email reports
   - Create a template for Skin Studio contact form submissions
   - Use variables like `{{user_name}}`, `{{quiz_title}}`, `{{score}}`, etc.

### Option 2: Backend API (For Full-Stack Apps)

1. **Create API Endpoints**:

   ```javascript
   // /api/send-email (for general email sending)
   // /api/send-user-email (for sending reports to users)
   // /api/send-to-skin-studio (for contact form submissions)
   ```

2. **Use a Node.js email service**:

   ```bash
   npm install nodemailer
   ```

3. **Example Express endpoints**:

   ```javascript
   const nodemailer = require("nodemailer");

   // Send report to user
   app.post("/api/send-user-email", async (req, res) => {
     try {
       const {
         email,
         userName,
         quizTitle,
         score,
         date,
         language,
         htmlContent,
       } = req.body;

       const transporter = nodemailer.createTransporter({
         service: "gmail",
         auth: {
           user: "your_email@gmail.com",
           pass: "your_app_password",
         },
       });

       await transporter.sendMail({
         from: "your_email@gmail.com",
         to: email,
         subject: `${language === "ro" ? "Raportul tău de îngrijire a pielii" : "Your Skin Care Report"} - Skin Studio`,
         html: htmlContent,
       });

       res.json({ success: true });
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });

   // Send contact form to Skin Studio
   app.post("/api/send-to-skin-studio", async (req, res) => {
     try {
       const {
         name,
         email,
         phone,
         message,
         userName,
         quizTitle,
         score,
         date,
         language,
         htmlContent,
       } = req.body;

       const transporter = nodemailer.createTransporter({
         service: "gmail",
         auth: {
           user: "your_email@gmail.com",
           pass: "your_app_password",
         },
       });

       // Generate contact email HTML
       const contactEmailHTML = generateContactEmailHTML({
         name,
         email,
         phone,
         message,
         userName,
         quizTitle,
         score,
         date,
         language,
         htmlContent,
       });

       await transporter.sendMail({
         from: "your_email@gmail.com",
         to: "skinstudio@example.com", // Replace with actual Skin Studio email
         subject: `Contact Form - ${name} - ${quizTitle}`,
         html: contactEmailHTML,
       });

       res.json({ success: true });
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });
   ```

## Configuration

### Update Skin Studio Email

In `src/services/emailService.ts`, update the Skin Studio email address:

```typescript
private static readonly SKIN_STUDIO_EMAIL = 'your_actual_skinstudio_email@example.com';
```

### Email Templates

#### Skin Studio Notification Template

Subject: `Quiz Report - {{user_name}} - {{quiz_title}}`
Body: Include the full HTML report content with user details.

#### User Email Template

Subject: `Your Skin Care Report - Skin Studio` (or Romanian equivalent)
Body: Include the full HTML report content.

#### Skin Studio Contact Form Template

Subject: `Contact Form - {{name}} - {{quiz_title}}`
Body: Include contact information, quiz details, and the complete report.

## New Features in HTML Report

### Contact Form Modal

The HTML report now includes a "Send to Skin Studio" button that opens a modal with:

- **Full Name** (required)
- **Email** (required)
- **Phone** (optional)
- **Message** (optional)

### Form Validation

- Name and email are required fields
- Email format validation
- Real-time error messages
- Success confirmation

### User Experience

- Tab navigation through form fields
- Enter key support for quick navigation
- Ctrl+Enter to submit the form
- Click outside modal to close
- Loading states during submission

## Testing

1. **Test Skin Studio notifications**: Complete a quiz and check if Skin Studio receives the email
2. **Test user email sending**: Open a report and use the "Send to Email" button
3. **Test Skin Studio contact form**: Use the "Send to Skin Studio" button and fill out the contact form
4. **Check error handling**: Test with invalid email addresses and missing required fields

## Security Considerations

1. **Email validation**: Both client and server-side email validation
2. **Input sanitization**: All form inputs are sanitized before processing
3. **Rate limiting**: Implement rate limiting for email sending
4. **CORS**: Configure CORS properly for API endpoints
5. **Environment variables**: Store sensitive data in environment variables

## Troubleshooting

### Common Issues

1. **EmailJS not working**:
   - Check if EmailJS is properly loaded
   - Verify Service ID, Template ID, and User ID
   - Check browser console for errors

2. **Backend API errors**:
   - Check server logs
   - Verify email service credentials
   - Test API endpoints with Postman

3. **CORS errors**:
   - Configure CORS properly on your backend
   - Check if the API endpoint is accessible

4. **Contact form not submitting**:
   - Check if all required fields are filled
   - Verify email format
   - Check browser console for JavaScript errors

### Debug Mode

Enable debug logging in `src/services/emailService.ts`:

```typescript
console.log("Email data:", data);
console.log("EmailJS response:", response);
```

## Support

For issues with:

- **EmailJS**: Check [EmailJS documentation](https://www.emailjs.com/docs/)
- **Nodemailer**: Check [Nodemailer documentation](https://nodemailer.com/)
- **App-specific issues**: Check the browser console and server logs
