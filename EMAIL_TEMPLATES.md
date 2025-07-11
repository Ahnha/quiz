# Email Templates for Skin Studio Quiz App

## Overview
This document contains the email templates you need to create in EmailJS for the enhanced email functionality.

## Template 1: Enhanced User Email (`template_quiz_enhanced`)

**Subject:** Raport Personalizat de Îngrijire a Pielii - {{user_name}}

**HTML Content:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Raport Personalizat de Îngrijire a Pielii</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #9c27b0, #7b1fa2); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; max-width: 600px; margin: 0 auto; }
        .section { margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px; }
        .section h3 { color: #9c27b0; margin-top: 0; }
        .routine-item { margin: 10px 0; padding-left: 20px; }
        .product-item { margin: 8px 0; padding-left: 20px; }
        .footer { text-align: center; padding: 20px; background: #f0f0f0; margin-top: 30px; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🌿 Skin Studio</h1>
        <h2>Raport Personalizat de Îngrijire a Pielii</h2>
        <p>Pentru: {{user_name}}</p>
        <p>Data: {{date}}</p>
    </div>

    <div class="content">
        <div class="highlight">
            <h3>Rezultatul Testului</h3>
            <p><strong>Test completat:</strong> {{quiz_title}}</p>
            <p><strong>Scor obținut:</strong> {{quiz_score}}</p>
            <p><strong>Rezultat:</strong> {{quiz_result}}</p>
        </div>

        <div class="section">
            <h3>🎯 Tipul Tău de Piele</h3>
            <p><strong>{{skin_type}}</strong></p>
            <p>Această evaluare se bazează pe răspunsurile tale la testul de evaluare a pielii.</p>
        </div>

        <div class="section">
            <h3>⏰ Rutina Zilnică Recomandată</h3>
            <div class="routine-item">
                {{daily_routine}}
            </div>
        </div>

        <div class="section">
            <h3>🛍️ Produse Recomandate</h3>
            <div class="product-item">
                {{recommended_products}}
            </div>
        </div>

        <div class="section">
            <h3>💡 Sfaturi de Stil de Viață</h3>
            <div class="routine-item">
                {{lifestyle_tips}}
            </div>
        </div>

        <div class="section">
            <h3>📋 Recomandări Anti-Îmbătrânire</h3>
            <p><strong>{{aging_category}}</strong></p>
            <p>Aceste recomandări te vor ajuta să menții pielea tânără și sănătoasă.</p>
        </div>

        <div class="highlight">
            <h3>⚠️ Sfaturi Importante</h3>
            <ul>
                <li>Folosește întotdeauna protecție solară, chiar și în zilele înnorate</li>
                <li>Bea suficientă apă (cel puțin 2L pe zi)</li>
                <li>Dormi 7-8 ore pe noapte pentru regenerarea pielii</li>
                <li>Consultă un dermatolog pentru probleme specifice</li>
                <li>Fii consistent cu rutina de îngrijire</li>
            </ul>
        </div>

        <div class="footer">
            <p><strong>Skin Studio</strong> - Îngrijirea pielii tale, pasiunea noastră</p>
            <p>Pentru întrebări sau recomandări personalizate, nu ezita să ne contactezi.</p>
            <p>Mulțumim că ai ales să-ți îngrijești pielea cu noi! 🌿</p>
        </div>
    </div>
</body>
</html>
```

## Template 2: Owner Notification (`template_owner_notification`)

**Subject:** Nouă Recomandare de Produse - {{user_name}}

**HTML Content:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Notificare Utilizator Nou</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #9c27b0; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; max-width: 600px; margin: 0 auto; }
        .user-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔔 Notificare Utilizator Nou</h1>
        <p>Un utilizator dorește să primească recomandări de produse</p>
    </div>

    <div class="content">
        <div class="user-info">
            <h3>Informații Utilizator</h3>
            <p><strong>Nume:</strong> {{user_name}}</p>
            <p><strong>Email:</strong> {{user_email}}</p>
            <p><strong>Test completat:</strong> {{quiz_title}}</p>
            <p><strong>Scor obținut:</strong> {{quiz_score}}</p>
        </div>

        <div class="highlight">
            <h3>Profilul Pielii</h3>
            <p><strong>Tip de piele:</strong> {{skin_type}}</p>
            <p><strong>Categoria de îmbătrânire:</strong> {{aging_category}}</p>
        </div>

        <div class="user-info">
            <h3>Acțiuni Recomandate</h3>
            <ul>
                <li>Adaugă utilizatorul în lista de email-uri pentru recomandări</li>
                <li>Pregătește o listă de produse personalizate</li>
                <li>Trimite un email de follow-up cu recomandări specifice</li>
                <li>Monitorizează interesul pentru produsele recomandate</li>
            </ul>
        </div>

        <p><em>Acest utilizator a dat consimțământul pentru a primi recomandări de produse personalizate.</em></p>
    </div>
</body>
</html>
```

## Setup Instructions

### 1. Create Templates in EmailJS
1. Log in to your EmailJS account
2. Go to "Email Templates"
3. Create two new templates with the names:
   - `template_quiz_enhanced`
   - `template_owner_notification`

### 2. Configure Template Variables
Make sure your EmailJS service supports these variables:
- `user_name`
- `user_email`
- `quiz_title`
- `quiz_score`
- `quiz_result`
- `skin_type`
- `aging_category`
- `daily_routine`
- `recommended_products`
- `lifestyle_tips`
- `send_to_owner`
- `date`

### 3. Update Email Configuration
In the `ResultEmailForm.tsx` file, update the `OWNER_EMAIL` constant with your actual email address:

```typescript
const OWNER_EMAIL = 'your-actual-email@example.com';
```

### 4. Test the Templates
1. Complete a quiz
2. Fill out the email form
3. Check that both emails are sent correctly
4. Verify the PDF download works

## Features Included

### For Users:
- ✅ Personalized skin type analysis
- ✅ Daily routine recommendations
- ✅ Product recommendations
- ✅ Lifestyle tips
- ✅ Anti-aging advice
- ✅ Professional guidance
- ✅ PDF download option

### For You (Site Owner):
- ✅ User consent checkbox
- ✅ Notification emails for interested users
- ✅ User profile information
- ✅ Skin type and aging category data
- ✅ Contact information for follow-up

## Customization Options

### Email Styling
- Modify the CSS in the HTML templates
- Change colors to match your brand
- Add your logo to the header
- Customize the footer information

### Content
- Add more sections to the email
- Include seasonal recommendations
- Add links to your products
- Include social media links

### PDF Content
- Modify the `skinCareRecommendations.ts` file
- Add more detailed recommendations
- Include product images
- Add your branding to the PDF

## Security Notes
- All user data is handled securely through EmailJS
- Users must explicitly consent to receive product recommendations
- CAPTCHA protection prevents spam
- Email addresses are only used for the intended purpose

## Support
If you need help setting up these templates or have questions about the implementation, please refer to the EmailJS documentation or contact their support team. 