#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building for Vercel deployment...\n');

try {
  // Check if dist directory exists, create if not
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
    console.log('📁 Created dist directory');
  }

  // Build CSS with Tailwind
  console.log('🎨 Building CSS with Tailwind CSS...');
  execSync('npx tailwindcss -i ./style.css -o ./dist/style.css --minify', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('\n✅ Vercel build completed successfully!');
  console.log('📦 Output: dist/style.css');
  
  // Check file size
  const stats = fs.statSync('dist/style.css');
  const fileSizeInKB = (stats.size / 1024).toFixed(2);
  console.log(`📊 File size: ${fileSizeInKB} KB`);
  
  // Create a simple index file for Vercel
  if (!fs.existsSync('index.html')) {
    console.log('⚠️  No index.html found in root directory');
  }
  
} catch (error) {
  console.error('❌ Vercel build failed:', error.message);
  process.exit(1);
}
