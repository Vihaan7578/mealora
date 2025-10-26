#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Mealora CSS...\n');

try {
  // Check if dist directory exists, create if not
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
    console.log('📁 Created dist directory');
  }

  // Build CSS with Tailwind
  console.log('🎨 Building CSS with Tailwind CSS...');
  execSync('npx tailwindcss -i ./style.css -o ./dist/style.css --minify', { stdio: 'inherit' });
  
      // Append custom CSS and form styles to the built file
      console.log('\n🎨 Adding custom CSS and form styles...');
      const customCSS = fs.readFileSync('custom.css', 'utf8');
      const formCSS = fs.readFileSync('form-styles.css', 'utf8');
      const builtCSS = fs.readFileSync('dist/style.css', 'utf8');
      const combinedCSS = builtCSS + '\n\n' + customCSS + '\n\n' + formCSS;
      fs.writeFileSync('dist/style.css', combinedCSS);
  
  console.log('\n✅ CSS build completed successfully!');
  console.log('📦 Output: dist/style.css');
  
  // Check file size
  const stats = fs.statSync('dist/style.css');
  const fileSizeInKB = (stats.size / 1024).toFixed(2);
  console.log(`📊 File size: ${fileSizeInKB} KB`);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
