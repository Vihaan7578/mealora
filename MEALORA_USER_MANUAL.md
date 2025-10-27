# 🌿 Mealora - Complete User Manual & Technical Guide

## Table of Contents
1. [Overview](#overview)
2. [Quick Start Guide](#quick-start-guide)
3. [Live Demo Access](#live-demo-access)
4. [Local Deployment](#local-deployment)
5. [Project Architecture](#project-architecture)
6. [File Structure Explained](#file-structure-explained)
7. [AI Integration Deep Dive](#ai-integration-deep-dive)
8. [Special Features & Parameters](#special-features--parameters)
9. [User Interface Guide](#user-interface-guide)
10. [Technical Specifications](#technical-specifications)
11. [Troubleshooting](#troubleshooting)
12. [Advanced Customization](#advanced-customization)

---

## Overview

**Mealora** is a sophisticated AI-powered meal planning platform specifically designed for Indian vegetarian cuisine. Built with modern web technologies and powered by Groq API with Llama models, it offers personalized 7-day meal plans, smart grocery lists, progress tracking, and recipe generation.

### Key Highlights
- 🎯 **AI-Powered**: Uses Groq API with Llama 3.3 70B for intelligent meal planning
- 🇮🇳 **Indian-Focused**: Tailored for Indian vegetarian dietary preferences
- 📱 **Fully Responsive**: Works seamlessly on all devices
- 💾 **Local Storage**: No server required - everything saves locally
- 🎨 **Modern Design**: Glassmorphism UI with smooth animations
- ⚡ **Fast & Lightweight**: Optimized for performance

---

## Quick Start Guide

### Option 1: Use the Live Version (Recommended)
Visit the hosted version at: **https://mealora-mauve.vercel.app/planner.html**

### Option 2: Run Locally
1. **Download the project** to your computer
2. **Open terminal/command prompt** in the project folder
3. **Start a local server**:
   ```bash
   python -m http.server 8000
   ```
4. **Open your browser** and go to: `http://localhost:8000`

---

## Live Demo Access

The application is already hosted and accessible at:
- **Main Site**: https://mealora-mauve.vercel.app/
- **Meal Planner**: https://mealora-mauve.vercel.app/planner.html
- **Grocery List**: https://mealora-mauve.vercel.app/grocery.html
- **Saved Plans**: https://mealora-mauve.vercel.app/saved.html
- **Progress Tracker**: https://mealora-mauve.vercel.app/progress.html
- **Recipe Generator**: https://mealora-mauve.vercel.app/recipes.html

---

## Local Deployment

### Prerequisites
- **Python 3.x** (for local server)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Internet connection** (for AI API calls)

### Step-by-Step Setup

1. **Download/Clone the Project**
   ```bash
   # If using git
   git clone [repository-url]
   cd Hackathon
   
   # Or simply download and extract the ZIP file
   ```

2. **Navigate to Project Directory**
   ```bash
   cd C:\Users\rp416\OneDrive\Desktop\Hackathon
   ```

3. **Start Local Server**
   ```bash
   # Windows
   python -m http.server 8000
   
   # Mac/Linux
   python3 -m http.server 8000
   ```

4. **Access the Application**
   Open your browser and navigate to: `http://localhost:8000`

5. **Stop the Server** (when done)
   ```bash
   # Windows
   Ctrl + C
   
   # Or kill the process
   taskkill /F /IM python.exe
   ```

### Alternative: Direct File Access
You can also open `index.html` directly in your browser, but some features may not work due to CORS restrictions.

---

## Project Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Custom CSS with Glassmorphism effects
- **AI Integration**: Groq API with Llama 3.3 70B models
- **Data Storage**: Browser LocalStorage API
- **Charts**: Chart.js for data visualization
- **Icons**: Emoji-based iconography
- **Fonts**: Inter from Google Fonts

### Architecture Pattern
```
User Interface (HTML/CSS)
    ↓
JavaScript Logic (app.js)
    ↓
AI API Integration (Gemini)
    ↓
Local Storage (Browser)
    ↓
Data Visualization (Charts)
```

---

## File Structure Explained

```
Hackathon/
├── 📄 Core HTML Pages
│   ├── index.html          # 🏠 Homepage with hero section
│   ├── planner.html        # 🍽️ Main meal planning interface
│   ├── grocery.html        # 🛒 Smart grocery list generator
│   ├── saved.html          # 💾 Saved meal plans manager
│   ├── progress.html       # 📊 Progress tracking with charts
│   └── recipes.html        # 👨‍🍳 Recipe generator
│
├── 🎨 Styling & Assets
│   ├── style.css           # 🎨 Main stylesheet with glassmorphism
│   ├── logo.PNG            # 🖼️ Custom Mealora logo
│   └── dist/
│       └── style.css       # 📦 Compiled CSS (if any)
│
├── ⚡ JavaScript & Logic
│   ├── app.js              # 🧠 Core application logic & AI integration
│   └── data/               # 💾 Local data storage
│       ├── config.json     # ⚙️ Configuration settings
│       ├── progress_logs/  # 📈 User progress data
│       └── saved_plans/    # 💾 Saved meal plans
│
├── 📚 Documentation
│   ├── README.md           # 📖 Main project documentation
│   ├── PROJECT_INFO.md     # ℹ️ Project overview
│   ├── TECHNICAL_DOCUMENTATION.md # 🔧 Technical details
│   └── INDIAN_CUSTOMIZATION.md    # 🇮🇳 Indian-specific features
│
└── 🚀 Next.js Version (Alternative)
    └── mealora-web/        # ⚛️ React/Next.js implementation
        ├── app/            # 📱 Next.js app directory
        ├── components/     # 🧩 React components
        ├── lib/           # 📚 Utility libraries
        └── package.json   # 📦 Dependencies
```

### Key Files Breakdown

#### `app.js` - The Brain of the Application
This 822-line JavaScript file contains:
- **AI Integration**: Google Gemini API calls
- **Data Management**: LocalStorage operations
- **Form Validation**: Input sanitization and validation
- **UI Interactions**: Dynamic content updates
- **Error Handling**: Robust error management
- **Utility Functions**: BMI calculation, seasonal data, etc.

#### `style.css` - Visual Design System
- **Glassmorphism Effects**: Semi-transparent elements with blur
- **Responsive Design**: Mobile-first approach
- **Animation System**: Smooth transitions and hover effects
- **Color Palette**: Consistent theming throughout
- **Typography**: Modern font hierarchy

#### `planner.html` - Core Functionality
The main meal planning interface featuring:
- **User Profile Form**: Age, gender, health goals
- **AI Prompt Construction**: Dynamic prompt building
- **Dual View System**: Card and table formats
- **Save/Load Functionality**: Local data persistence

---

## AI Integration Deep Dive

### Groq API Integration with Llama Models

The main HTML version uses Groq API with Llama models for all AI-powered features:

#### API Configuration
```javascript
const API_KEY = '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';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
```

#### Supported AI Models (Fallback System)
```javascript
const AI_MODELS = [
    'llama-3.3-70b-versatile',    // Primary model
    'llama-3.1-70b-versatile',    // Fallback 1
    'llama-3.1-8b-instant'        // Fallback 2
];
```

### Alternative: Google Gemini 2.0 Flash (Next.js Version)

The React/Next.js version (`mealora-web/`) uses Google Gemini 2.0 Flash:

#### API Configuration
```javascript
const genai = new GoogleGenerativeAI('AIzaSyBPKf66by_yOIqIO3f8qvZdFpyFe3TmXh4')
const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
```

### AI Prompt Engineering

#### Meal Plan Generation Prompt
The system constructs sophisticated prompts that include:
- **User Profile Data**: Age, gender, health conditions
- **Indian Cuisine Focus**: Specific to vegetarian Indian food
- **Seasonal Considerations**: Current season and regional crops
- **Health-Specific Guidelines**: Tailored to user's health goals
- **Nutritional Requirements**: Balanced macro and micronutrients

#### Example Prompt Structure
```
Create a detailed Indian vegetarian meal plan for someone with [health_condition]...

Age: [age]
Gender: [gender]
Health Condition: [condition]
Food Preferences: [preferences]
Season: [current_season]
Region: [selected_state]

Please provide:
1. NUTRITIONAL OVERVIEW
2. 7-DAY MEAL PLAN (with calories)
3. KEY NUTRITIONAL BENEFITS
4. IMPORTANT TIPS

Make sure all meals are:
- 100% vegetarian
- Nutritionally balanced
- Practical and easy to prepare
- Aligned with health goals
- Include variety and different cuisines
```

### AI Features by Page

#### 1. Meal Planner (`planner.html`)
- **Personalized Meal Plans**: 7-day plans based on user profile
- **Health-Specific Recommendations**: Tailored to conditions like diabetes, PCOS, etc.
- **Seasonal Food Integration**: Uses current season and regional crops
- **Calorie Estimation**: Approximate daily calorie counts
- **Indian Cuisine Focus**: Authentic Indian vegetarian dishes

#### 2. Grocery List Generator (`grocery.html`)
- **Smart Categorization**: Organizes items by Indian grocery store layout
- **Quantity Estimation**: Calculates weekly requirements
- **Indian Ingredient Names**: Uses familiar terminology
- **Regional Variations**: Adapts to selected state/region

#### 3. Recipe Generator (`recipes.html`)
- **Detailed Instructions**: Step-by-step cooking methods
- **Indian Cooking Techniques**: Tadka, bhuno, dum cooking
- **Serving Adjustments**: 2, 4, or 6 servings
- **Nutritional Information**: Calorie and macro breakdowns

---

## Special Features & Parameters

### 1. Indian Cuisine Customization

#### Regional State Database
The app includes comprehensive data for all 28 Indian states:
```javascript
const stateCrops = {
    'Andhra Pradesh': {
        'Spring': ['Tomato', 'Cucumber', 'Beans', 'Carrots', 'Onion', 'Green Chilies', 'Bottle Gourd'],
        'Summer': ['Watermelon', 'Musk Melon', 'Cucumber', 'Bitter Gourd', 'Bottle Gourd', 'Ridge Gourd', 'Tomato'],
        // ... more seasons
    },
    // ... all 28 states
};
```

#### Seasonal Food Integration
```javascript
const seasonalFoods = {
    'Spring': ['Tinda', 'Raw Mango', 'Cucumber', 'Radish', 'Carrots', 'Peas', 'Coriander'],
    'Summer': ['Karela', 'Bottle Gourd', 'Tori', 'Cucumber', 'Watermelon', 'Mint', 'Coconut Water'],
    'Monsoon': ['Bhindi', 'Brinjal', 'Karela', 'Corn', 'Lauki', 'Green Beans'],
    'Winter': ['Palak', 'Sarson', 'Bathua', 'Carrots', 'Beetroot', 'Peas', 'Cauliflower']
};
```

### 2. Health Condition Templates

#### Quick-Start Templates
- 🔥 **Weight Loss**: Satvik diet approach
- 💪 **Muscle Gain**: High protein Indian foods
- 🩺 **Diabetes Control**: Low GI Indian foods
- 🍛 **Balanced Thali**: Complete nutritional approach

#### Supported Health Conditions
- Diabetes (Type 1 & 2)
- High Blood Pressure
- PCOS Management
- Thyroid Disorders
- Weight Management
- General Wellness

### 3. Advanced Input Validation

#### Multi-Layer Security System
```javascript
function validateAndSanitizeInput(text) {
    // Layer 1: Prohibited patterns (immediate rejection)
    // Layer 2: Food-related keywords (must contain at least one)
    // Layer 3: Suspicious patterns that might slip through
}
```

#### Health Condition Validation
- **Chronic Conditions**: Diabetes, hypertension, PCOS, thyroid, etc.
- **Temporary Issues**: Fever, cold, flu, seasonal allergies
- **Dietary Restrictions**: Allergies, intolerances, preferences

### 4. BMI & Calorie Calculation

#### Automatic BMI Assessment
```javascript
function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi;
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return { category: 'Underweight', calorieAdjustment: '+300' };
    if (bmi < 25) return { category: 'Normal Weight', calorieAdjustment: 'Maintain' };
    if (bmi < 30) return { category: 'Overweight', calorieAdjustment: '-300' };
    return { category: 'Obese', calorieAdjustment: '-500' };
}
```

### 5. Data Persistence System

#### LocalStorage Implementation
```javascript
// Save meal plan
function saveMealPlan(plan, userData) {
    const plans = JSON.parse(localStorage.getItem('mealPlans') || '[]');
    const newPlan = {
        id: Date.now(),
        name: userData.planName || `Plan ${plans.length + 1}`,
        date: new Date().toISOString(),
        userData,
        mealPlan: plan,
    };
    plans.push(newPlan);
    localStorage.setItem('mealPlans', JSON.stringify(plans));
    return newPlan;
}
```

---

## User Interface Guide

### Navigation System
The app features a consistent navigation bar across all pages:
- **Home**: Landing page with feature overview
- **Meal Planner**: Core meal planning functionality
- **Grocery List**: Smart shopping list generator
- **Saved Plans**: Manage your saved meal plans
- **Progress**: Track your health journey
- **Recipes**: Generate detailed recipes

### Design System

#### Glassmorphism Effects
```css
.glass {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

#### Color Palette
- **Primary Green**: `#00E6A0` (Emerald/Teal)
- **Secondary Purple**: `#6366F1` (Indigo)
- **Success**: `#10B981` (Green)
- **Danger**: `#EF4444` (Red)
- **Warning**: `#F59E0B` (Amber)
- **Info**: `#3B82F6` (Blue)

#### Typography
- **Primary Font**: Inter (Google Fonts)
- **Headings**: Bold, gradient text effects
- **Body Text**: Clean, readable sans-serif
- **Code**: Monospace for technical content

### Responsive Design

#### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

#### Mobile Optimizations
- Touch-friendly button sizes
- Swipe gestures for navigation
- Optimized form layouts
- Compressed images and assets

---

## Technical Specifications

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### API Rate Limits
- **Groq API**: 30 requests per minute (free tier)
- **Fallback System**: Automatic model switching
- **Error Handling**: Graceful degradation

### Data Storage Limits
- **LocalStorage**: ~5-10MB per domain
- **Meal Plans**: ~50KB per plan
- **Progress Data**: ~1KB per entry
- **Estimated Capacity**: 100+ saved plans

---

## Troubleshooting

### Common Issues & Solutions

#### 1. "API Error" Messages
**Problem**: AI features not working
**Solutions**:
- Check internet connection
- Verify API key is valid
- Wait a few minutes and try again
- Check browser console for detailed errors

#### 2. Data Not Saving
**Problem**: Meal plans not persisting
**Solutions**:
- Ensure browser supports LocalStorage
- Check if private/incognito mode is disabled
- Clear browser cache and try again
- Verify sufficient storage space

#### 3. Slow Loading
**Problem**: App takes too long to load
**Solutions**:
- Check internet speed
- Clear browser cache
- Disable browser extensions
- Try a different browser

#### 4. Mobile Display Issues
**Problem**: Layout looks broken on mobile
**Solutions**:
- Refresh the page
- Check if JavaScript is enabled
- Try landscape orientation
- Update mobile browser

### Error Codes Reference

| Error Code | Description | Solution |
|------------|-------------|----------|
| 429 | Rate limit exceeded | Wait 1 minute and retry |
| 401 | Invalid API key | Contact administrator |
| 500 | Server error | Try again later |
| CORS | Cross-origin error | Use local server instead of file:// |

---

## Advanced Customization

### Modifying AI Prompts

#### Edit `app.js` to customize prompts:
```javascript
const prompt = `Create a detailed Indian vegetarian meal plan...`;
// Modify this string to change AI behavior
```

#### Add New Health Conditions:
```javascript
const healthConditions = [
    'diabetes', 'high_bp', 'pcos', 'thyroid',
    'your_new_condition' // Add here
];
```

### Styling Customization

#### Change Color Scheme:
Edit `style.css`:
```css
:root {
    --primary: #your-color;
    --secondary: #your-color;
    --accent: #your-color;
}
```

#### Modify Glassmorphism Effects:
```css
.glass {
    background: rgba(255, 255, 255, 0.1); /* Increase opacity */
    backdrop-filter: blur(15px); /* Increase blur */
}
```

### Adding New Features

#### 1. New Page
1. Create new HTML file
2. Include navigation links
3. Add page-specific JavaScript
4. Style with existing CSS classes

#### 2. New AI Feature
1. Add function to `app.js`
2. Create API call to Gemini
3. Design prompt template
4. Add UI elements

#### 3. Data Storage
1. Define data structure
2. Create save/load functions
3. Add to LocalStorage
4. Implement error handling

---

## Security Considerations

### Data Privacy
- **No Server Storage**: All data stays in your browser
- **No User Tracking**: No analytics or tracking scripts
- **Local Processing**: AI calls are the only external requests
- **API Key**: Currently hardcoded (change for production)

### Input Validation
- **Multi-layer Filtering**: Prevents malicious input
- **Food-Only Content**: Restricts to meal planning topics
- **Health Focus**: Validates health-related inputs
- **XSS Protection**: Sanitizes all user inputs

### Recommendations for Production
1. **Environment Variables**: Move API key to environment variables
2. **Input Sanitization**: Add more robust validation
3. **Rate Limiting**: Implement client-side rate limiting
4. **HTTPS**: Always use secure connections
5. **Content Security Policy**: Add CSP headers

---

## Future Enhancement Ideas

### Planned Features
- [ ] **User Authentication**: Login/signup system
- [ ] **Database Integration**: Cloud data storage
- [ ] **PDF Export**: Save plans as PDFs
- [ ] **Mobile App**: Native iOS/Android apps
- [ ] **Social Features**: Share plans with family
- [ ] **Nutrition Tracking**: Detailed macro tracking
- [ ] **Shopping Integration**: Order groceries online
- [ ] **Recipe Videos**: Step-by-step cooking videos

### Technical Improvements
- [ ] **PWA Support**: Offline functionality
- [ ] **Service Workers**: Background sync
- [ ] **Web Push**: Notification system
- [ ] **Advanced Charts**: More data visualization
- [ ] **AI Model Fine-tuning**: Custom model training
- [ ] **Multi-language**: Support for regional languages

---

## Support & Community

### Getting Help
- **Documentation**: Refer to this manual
- **Code Comments**: Check JavaScript files for inline documentation
- **Browser Console**: Check for error messages
- **GitHub Issues**: Report bugs and request features

### Contributing
- **Code Quality**: Follow existing patterns
- **Documentation**: Update this manual for new features
- **Testing**: Test on multiple browsers and devices
- **Performance**: Optimize for speed and efficiency

---

## Conclusion

Mealora represents a comprehensive solution for AI-powered meal planning, specifically tailored for Indian vegetarian cuisine. With its modern design, robust functionality, and intelligent AI integration, it provides users with personalized, practical, and culturally relevant meal planning assistance.

The application's architecture allows for easy customization and extension, making it suitable for both personal use and commercial deployment. The combination of local data storage, AI-powered recommendations, and responsive design creates a seamless user experience across all devices.

Whether you're looking to improve your health, manage specific conditions, or simply enjoy better meal planning, Mealora provides the tools and intelligence to help you succeed on your nutritional journey.

---

**Made with ❤️ using modern web technologies and Groq API with Llama models**

*For technical support or feature requests, please refer to the project documentation or contact the development team.*

---

*Last Updated: January 2025*
*Version: 2.0*
*Compatibility: All modern browsers*
