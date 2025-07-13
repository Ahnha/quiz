# Adding Your Logo to HTML Reports

## Overview
Your HTML reports now support custom logos! Here are the different ways to add your logo:

## Option 1: Base64 Encoded Logo (Recommended)

### Why Base64?
- ✅ Works offline (no external dependencies)
- ✅ Embedded directly in the HTML
- ✅ No file hosting required
- ✅ Perfect for email reports

### How to Convert Your Logo to Base64:

#### Method A: Online Converter
1. Go to https://www.base64-image.de/
2. Upload your logo image
3. Copy the base64 string
4. Use it in the code below

#### Method B: Browser Console
1. Place your logo in the `public` folder (e.g., `public/logo.png`)
2. Open browser console on your app
3. Run this code:
```javascript
function convertImageToBase64(imagePath) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };
        img.onerror = reject;
        img.src = imagePath;
    });
}

convertImageToBase64('/logo.png').then(base64 => console.log(base64));
```

### Implementation:
In `src/pages/components/QuizResultForm.tsx`, uncomment and update:

```typescript
const reportData: HTMLReportData = {
    // ... other properties
    logoUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...', // Your base64 string
    logoAlt: 'Skin Studio Logo',
};
```

## Option 2: File in Public Folder

### Steps:
1. Place your logo in the `public` folder (e.g., `public/logo.png`)
2. Update the code:

```typescript
const reportData: HTMLReportData = {
    // ... other properties
    logoUrl: '/logo.png',
    logoAlt: 'Skin Studio Logo',
};
```

## Option 3: External URL

```typescript
const reportData: HTMLReportData = {
    // ... other properties
    logoUrl: 'https://yourdomain.com/logo.png',
    logoAlt: 'Skin Studio Logo',
};
```

## Logo Specifications

### Recommended Format:
- **Format**: PNG or SVG (PNG for better compatibility)
- **Size**: 60x60px or larger (will be scaled down)
- **Background**: Transparent or white
- **File size**: Keep under 100KB for base64

### CSS Styling:
The logo is styled with:
```css
.logo {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
}

.logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
}
```

## Quick Start

1. **Convert your logo to base64** using the online converter
2. **Open** `src/pages/components/QuizResultForm.tsx`
3. **Find** the `reportData` object (around line 115)
4. **Uncomment** and update the logo properties:
```typescript
logoUrl: 'data:image/png;base64,YOUR_BASE64_STRING_HERE',
logoAlt: 'Your Brand Name',
```

## Testing

1. Run your app: `npm start`
2. Complete a quiz
3. Generate a report
4. Your logo should appear in the top-left corner

## Troubleshooting

### Logo not showing?
- Check the base64 string is complete
- Verify the image format is supported
- Check browser console for errors

### Logo too large/small?
- The logo container is 60x60px
- Use `object-fit: contain` for proper scaling
- Adjust the CSS if needed

### Base64 string too long?
- Compress your image first
- Use a smaller logo file
- Consider using a URL instead

## Example Implementation

```typescript
// In QuizResultForm.tsx
const reportData: HTMLReportData = {
    userName: userName.trim(),
    quizTitle: quizName,
    score,
    resultText: result,
    skinType: pdfContent.skinType,
    agingCategory: pdfContent.agingCategory,
    skinRecommendation: pdfContent.skinRecommendation,
    agingRecommendation: pdfContent.agingRecommendation,
    quizResult,
    language: propLanguage,
    date: new Date().toLocaleDateString('ro-RO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }),
    // Your logo configuration
    logoUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...', // Replace with your base64
    logoAlt: 'Skin Studio Logo',
};
```

That's it! Your logo will now appear in all HTML reports. 🎉 