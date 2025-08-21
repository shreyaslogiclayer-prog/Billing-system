const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG template
function generateSVGIcon(size) {
  const padding = size * 0.2; // 20% padding
  const iconSize = size - (padding * 2);
  const center = size / 2;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="#000000" rx="${size * 0.1}"/>
  
  <!-- Icon content - Simple habit tracker icon -->
  <g transform="translate(${padding}, ${padding})">
    <!-- Checklist icon -->
    <rect x="${iconSize * 0.2}" y="${iconSize * 0.2}" width="${iconSize * 0.6}" height="${iconSize * 0.6}" 
          fill="none" stroke="#ffffff" stroke-width="${iconSize * 0.05}" rx="${iconSize * 0.05}"/>
    
    <!-- Check marks -->
    <g fill="none" stroke="#ffffff" stroke-width="${iconSize * 0.04}" stroke-linecap="round">
      <polyline points="${iconSize * 0.3},${iconSize * 0.35} ${iconSize * 0.4},${iconSize * 0.45} ${iconSize * 0.6},${iconSize * 0.25}"/>
      <polyline points="${iconSize * 0.3},${iconSize * 0.55} ${iconSize * 0.4},${iconSize * 0.65} ${iconSize * 0.6},${iconSize * 0.45}"/>
    </g>
    
    <!-- Calendar grid -->
    <g stroke="#ffffff" stroke-width="${iconSize * 0.02}" opacity="0.7">
      <line x1="${iconSize * 0.25}" y1="${iconSize * 0.35}" x2="${iconSize * 0.75}" y2="${iconSize * 0.35}"/>
      <line x1="${iconSize * 0.25}" y1="${iconSize * 0.55}" x2="${iconSize * 0.75}" y2="${iconSize * 0.55}"/>
      <line x1="${iconSize * 0.25}" y1="${iconSize * 0.75}" x2="${iconSize * 0.75}" y2="${iconSize * 0.75}"/>
    </g>
  </g>
</svg>`;
}

// Generate HTML file to convert SVGs to PNGs
function generateHTMLConverter() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PWA Icon Generator</title>
</head>
<body>
    <h1>PWA Icon Generator</h1>
    <p>Click the button below to generate and download all PWA icons:</p>
    <button onclick="generateIcons()">Generate Icons</button>
    <div id="progress"></div>
    
    <script>
        const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
        
        function generateSVGIcon(size) {
            const padding = size * 0.2;
            const iconSize = size - (padding * 2);
            
            return \`<?xml version="1.0" encoding="UTF-8"?>
<svg width="\${size}" height="\${size}" viewBox="0 0 \${size} \${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="\${size}" height="\${size}" fill="#000000" rx="\${size * 0.1}"/>
  <g transform="translate(\${padding}, \${padding})">
    <rect x="\${iconSize * 0.2}" y="\${iconSize * 0.2}" width="\${iconSize * 0.6}" height="\${iconSize * 0.6}" 
          fill="none" stroke="#ffffff" stroke-width="\${iconSize * 0.05}" rx="\${iconSize * 0.05}"/>
    <g fill="none" stroke="#ffffff" stroke-width="\${iconSize * 0.04}" stroke-linecap="round">
      <polyline points="\${iconSize * 0.3},\${iconSize * 0.35} \${iconSize * 0.4},\${iconSize * 0.45} \${iconSize * 0.6},\${iconSize * 0.25}"/>
      <polyline points="\${iconSize * 0.3},\${iconSize * 0.55} \${iconSize * 0.4},\${iconSize * 0.65} \${iconSize * 0.6},\${iconSize * 0.45}"/>
    </g>
    <g stroke="#ffffff" stroke-width="\${iconSize * 0.02}" opacity="0.7">
      <line x1="\${iconSize * 0.25}" y1="\${iconSize * 0.35}" x2="\${iconSize * 0.75}" y2="\${iconSize * 0.35}"/>
      <line x1="\${iconSize * 0.25}" y1="\${iconSize * 0.55}" x2="\${iconSize * 0.75}" y2="\${iconSize * 0.55}"/>
      <line x1="\${iconSize * 0.25}" y1="\${iconSize * 0.75}" x2="\${iconSize * 0.75}" y2="\${iconSize * 0.75}"/>
    </g>
  </g>
</svg>\`;
        }
        
        function svgToPng(svgString, size) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                
                canvas.width = size;
                canvas.height = size;
                
                img.onload = function() {
                    ctx.drawImage(img, 0, 0, size, size);
                    canvas.toBlob(resolve, 'image/png');
                };
                
                const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(svgBlob);
                img.src = url;
            });
        }
        
        function downloadBlob(blob, filename) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        async function generateIcons() {
            const progressDiv = document.getElementById('progress');
            progressDiv.innerHTML = '<p>Generating icons...</p>';
            
            for (let i = 0; i < ICON_SIZES.length; i++) {
                const size = ICON_SIZES[i];
                progressDiv.innerHTML += \`<p>Generating icon-\${size}x\${size}.png...</p>\`;
                
                const svgString = generateSVGIcon(size);
                const pngBlob = await svgToPng(svgString, size);
                downloadBlob(pngBlob, \`icon-\${size}x\${size}.png\`);
                
                // Small delay to prevent browser from blocking downloads
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            progressDiv.innerHTML += '<p><strong>All icons generated! Save them to public/icons/ directory.</strong></p>';
        }
    </script>
</body>
</html>`;
  
  return htmlContent;
}

// Create SVG files for each size
console.log('Generating SVG icons...');
ICON_SIZES.forEach(size => {
  const svgContent = generateSVGIcon(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  
  fs.writeFileSync(filepath, svgContent);
  console.log(`Generated: ${filename}`);
});

// Create HTML converter
const htmlContent = generateHTMLConverter();
const htmlPath = path.join(__dirname, 'icon-generator.html');
fs.writeFileSync(htmlPath, htmlContent);

console.log('\n✅ SVG icons generated in public/icons/');
console.log('✅ HTML icon generator created at scripts/icon-generator.html');
console.log('\nTo generate PNG icons:');
console.log('1. Open scripts/icon-generator.html in your browser');
console.log('2. Click "Generate Icons" button');
console.log('3. Save the downloaded PNG files to public/icons/ directory');
console.log('\nOr use an online SVG to PNG converter with the generated SVG files.'); 