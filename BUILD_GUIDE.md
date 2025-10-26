# 🚀 Mealora Build Guide

## Overview
This guide explains how to build the Mealora project with proper Tailwind CSS integration instead of using the CDN version.

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

## Build Commands

### Development Build
```bash
npm run dev
```
- Watches for changes and rebuilds CSS automatically
- Output: `dist/style.css`

### Production Build
```bash
npm run build
```
- Builds minified CSS for production
- Output: `dist/style.css` (minified)
- Shows file size information

### Simple Production Build
```bash
npm run build:simple
```
- Direct Tailwind CSS build without additional features

## File Structure

```
├── dist/
│   └── style.css          # Built CSS file (use this in HTML)
├── style.css              # Source CSS with Tailwind directives
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── package.json           # Dependencies and scripts
└── build.js              # Custom build script
```

## HTML Files

All HTML files now reference `dist/style.css` instead of the CDN:

```html
<link rel="stylesheet" href="dist/style.css">
```

## Tailwind Configuration

The project includes a custom Tailwind configuration with:
- Custom color palette matching the design system
- Custom breakpoints for responsive design
- Custom animations and utilities

## Production Deployment

1. Run the production build:
```bash
npm run build
```

2. Deploy the entire project including the `dist/` folder
3. Ensure all HTML files reference `dist/style.css`

## Benefits of This Approach

✅ **Performance**: Minified CSS reduces file size  
✅ **Reliability**: No dependency on external CDN  
✅ **Customization**: Full control over Tailwind configuration  
✅ **Offline Support**: Works without internet connection  
✅ **Version Control**: CSS is versioned with your code  

## Troubleshooting

### CSS Not Loading
- Ensure `dist/style.css` exists
- Check that HTML files reference `dist/style.css`
- Run `npm run build` to regenerate CSS

### Styling Issues
- Check `tailwind.config.js` for custom configurations
- Verify content paths in Tailwind config
- Rebuild CSS after making changes

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check Node.js version compatibility
- Clear `node_modules` and reinstall if needed
