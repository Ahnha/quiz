// Logo Converter Utility
// This script helps convert your logo image to base64 format for embedding in HTML reports

// Instructions:
// 1. Place your logo image (PNG, JPG, SVG) in the public folder
// 2. Run this script in the browser console or use the function below
// 3. Copy the base64 string and use it in the HTML report

function convertImageToBase64(imagePath) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = reject;
    img.src = imagePath;
  });
}

// Example usage:
// convertImageToBase64('/logo.png').then(base64 => console.log(base64));

// Alternative: Manual conversion
// 1. Open your image in a text editor or use online tools
// 2. Convert to base64 using: https://www.base64-image.de/
// 3. Copy the result and use it in the HTML report

export { convertImageToBase64 };
