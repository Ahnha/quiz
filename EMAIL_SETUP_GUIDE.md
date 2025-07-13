# Email Setup Guide for Skin Studio Quiz App

## 🚀 Quick Setup (5 minutes)

### Step 1: Sign up for EmailJS
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Create a free account
3. Verify your email

### Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy your Service ID** (you'll need this)

### Step 3: Create Email Templates
1. Go to "Email Templates" in EmailJS dashboard
2. Create 3 templates:

#### Template 1: User Report Template
- **Name**: "User Report"
- **Subject**: `Your Skin Care Report - Skin Studio`
- **Body**: 
```html
<h2>Hello {{user_name}},</h2>
<p>Here's your personalized skin care report from Skin Studio.</p>
<div>{{message}}</div>
<p>Best regards,<br>Skin Studio Team</p>
```

#### Template 2: Skin Studio Contact Template
- **Name**: "Skin Studio Contact"
- **Subject**: `Contact Form - {{name}} - {{quiz_title}}`
- **Body**:
```html
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Message:</strong> {{message}}</p>
<p><strong>Quiz User:</strong> {{user_name}}</p>
<p><strong>Quiz:</strong> {{quiz_title}}</p>
<p><strong>Score:</strong> {{score}}</p>
<div>{{message}}</div>
```

#### Template 3: Skin Studio Quiz Template
- **Name**: "Skin Studio Quiz"
- **Subject**: `Quiz Report - {{user_name}} - {{quiz_title}}`
- **Body**:
```html
<h2>New Quiz Report</h2>
<p><strong>User:</strong> {{user_name}}</p>
<p><strong>Quiz:</strong> {{quiz_title}}</p>
<p><strong>Score:</strong> {{score}}</p>
<p><strong>Date:</strong> {{date}}</p>
<div>{{message}}</div>
```

### Step 4: Get Your Credentials
1. **Service ID**: From Step 2
2. **Template IDs**: Copy from each template you created
3. **User ID**: Found in "Account" → "API Keys"

### Step 5: Update Configuration
1. Open `src/config/emailConfig.ts`
2. Replace the placeholder values:

```typescript
export const EMAIL_CONFIG = {
    EMAILJS_SERVICE_ID: 'your_actual_service_id',
    EMAILJS_TEMPLATE_ID: 'your_user_report_template_id',
    EMAILJS_USER_ID: 'your_actual_user_id',
    SKIN_STUDIO_EMAIL: 'your_skinstudio_email@example.com',
    TEMPLATES: {
        USER_REPORT: 'your_user_report_template_id',
        SKIN_STUDIO_CONTACT: 'your_contact_template_id',
        SKIN_STUDIO_QUIZ: 'your_quiz_template_id'
    }
};
```

### Step 6: Update HTML
1. Open `public/index.html`
2. Find the EmailJS initialization script
3. Replace `'your_user_id'` with your actual User ID:

```javascript
emailjs.init("your_actual_user_id");
```

## ✅ Test Your Setup

1. **Take a quiz** in your app
2. **Open the report**
3. **Click "Send to Skin Studio"**
4. **Fill out the contact form**
5. **Check your email** - you should receive the contact form
6. **Check the Skin Studio email** - they should receive the contact form

## 🔧 Troubleshooting

### "EmailJS is not configured" error
- Make sure you updated `src/config/emailConfig.ts`
- Check that all IDs are correct

### "EmailJS is not available" error
- Make sure EmailJS is loaded in `public/index.html`
- Check that your User ID is correct

### Emails not sending
- Check EmailJS dashboard for errors
- Verify your email service is connected
- Check browser console for errors

### Template variables not working
- Make sure template variable names match exactly
- Check EmailJS template syntax

## 📧 Email Features

Once configured, your app will support:

1. **📥 Download Report** - Downloads HTML file
2. **🖨️ Print Report** - Opens print dialog
3. **📧 Send to Skin Studio** - Sends contact form + report
4. **❌ Cancel** - Closes report window

## 🎯 Next Steps

1. **Customize email templates** with your branding
2. **Add more email features** as needed
3. **Set up email tracking** in EmailJS dashboard
4. **Configure email notifications** for new submissions

## 💡 Tips

- **Free tier**: EmailJS allows 200 emails/month free
- **Templates**: Use HTML in templates for better formatting
- **Variables**: All template variables are automatically populated
- **Testing**: Test with your own email first
- **Backup**: Keep your EmailJS credentials secure

## 🆘 Need Help?

- **EmailJS Docs**: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **App Issues**: Check browser console for errors
- **Email Issues**: Check EmailJS dashboard for delivery status 