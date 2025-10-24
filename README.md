# 🌿 Mealora - Complete AI Meal Planning Platform (Indian Cuisine Edition 🇮🇳)

 https://mealora-mauve.vercel.app/
 
A stunning, feature-rich multi-page web application for personalized **INDIAN VEGETARIAN** meal planning powered by Google Gemini AI.

## 🇮🇳 **Indian Cuisine Customization**

This app is specifically designed for **Indian vegetarians** with:
- **Indian ingredients & names**: Dal, Sabzi, Roti, Paratha, Curd, Paneer, etc.
- **Hindi-English terminology**: The way Indians actually speak - "1 katori dal", "2 roti", "Tadka lagana"
- **Traditional Indian meals**: Poha, Upma, Idli, Dosa, Chole, Rajma, Palak Paneer
- **Indian cooking methods**: Tadka, Bhuno, Dum, cooking on tawa, kadhai, pressure cooker
- **Regional varieties**: Punjabi, South Indian, Gujarati, Bengali styles
- **Indian measurements**: kg, grams, katori, cup, bunch (guccha), pinch (chutki)
- **Authentic grocery categories**: Sabzi, Dal, Masale, Atta, Doodh Utpad

## ✨ **NEW FEATURES - FULLY EXPANDED!**

### 🎨 **Multi-Page Navigation**
- **6 Complete Pages** with beautiful navigation
- Smooth page transitions
- Active page highlighting
- Responsive on all devices

### 📊 **Table & Card View for Meal Plans**
- **Card View**: Beautiful formatted text with scrolling
- **Table View**: Organized 7-day table format
- **Toggle between views** instantly
- Perfect for printing or sharing

---

## 📱 **All Pages & Features**

### 1. **🏠 Home Page** (`index.html`)
- Stunning hero section with animations
- Stats showcase (100% Vegetarian, 10K+ Users)
- 6 feature cards explaining all capabilities
- Call-to-action buttons
- Professional footer

### 2. **🍽️ Meal Planner** (`planner.html`)
- AI-powered **INDIAN** meal plan generation
- Age, gender, and health goal inputs
- 4 quick-start templates:
  - 🔥 Weight Loss (Satvik diet)
  - 💪 Muscle Gain (High protein Indian food)
  - 🩺 Diabetes Control (Low GI Indian foods)
  - 🍛 Balanced Thali
- Food preferences & allergies
- **CARD VIEW** - Detailed formatted plan with Indian meals
- **TABLE VIEW** - 7-day organized table ⭐ NEW!
- Generates plans with: Poha, Idli, Dosa, Dal-Roti, Sabzi, Paneer dishes, Curd, Raita
- Uses Indian cooking terms: Tadka, Bhuno, Dum, Pakana
- Save plans locally
- Beautiful loading animations

### 3. **🛒 Grocery List Generator** (`grocery.html`)
- Select from saved meal plans
- AI-generated shopping lists in **INDIAN CATEGORIES**:
  - 🥬 Sabzi & Vegetables (Aloo, Pyaaz, Tamatar, Bhindi, etc.)
  - 🌾 Dal & Pulses (Toor, Moong, Masoor, Chana, Rajma)
  - 🍚 Grains & Atta (Wheat atta, Rice, Besan, Sooji, Poha)
  - 🥛 Dairy/Doodh Utpad (Milk, Dahi, Paneer, Ghee)
  - 🧂 Masale & Spices (Haldi, Jeera, Dhaniya, Garam masala)
  - 🥫 Indian Staples (Oil, Namak, Chini, Achaar, Chai patti)
  - 🌰 Dry Fruits (Badam, Kaju, Pista, Kishmish)
  - 🥗 Salad items (Kheera, Mooli, Gajar, Pudina, Nimbu)
- Uses Indian measurements: kg, grams, bunch/guccha, packet
- Copy to clipboard
- Print functionality

### 4. **💾 Saved Plans** (`saved.html`)
- View all saved meal plans
- Beautiful card grid layout
- Quick view modal
- Delete plans
- Copy plan to clipboard
- Shows plan metadata (age, gender, goal, date)

### 5. **📈 Progress Tracker** (`progress.html`)
- Log weight and measurements
- Energy level tracking (1-10 scale)
- Optional daily notes
- **Interactive Chart.js graph** showing progress
- Stats cards (Total Change, To Goal, Avg Energy)
- Recent entries history
- Persistent local storage

### 6. **📖 Recipe Generator** (`recipes.html`)
- Generate detailed **INDIAN VEGETARIAN** recipes
- Servings selector (2, 4, or 6)
- Dietary preferences input
- Quick Indian recipe buttons:
  - Chole Masala
  - Palak Paneer
  - Dal Tadka
  - Aloo Paratha
  - Poha
  - Rajma Masala
- **Authentic Indian format**:
  - Ingredients (Samagri) in Hindi-English
  - Indian measurements (katori, cup, chutki)
  - Cooking Instructions (Banane ki Vidhi) with Tadka, Bhuno, Dum
  - Serving suggestions with Roti/Rice/Raita
  - Chef's tips (Suzhav) with regional variations
- Step-by-step instructions with "kadhai mein", "pressure cooker mein"
- Nutritional information
- Copy and print functionality

---

## 🎯 **How to Use**

### **Option 1: Simple HTTP Server (Recommended)**
```bash
python -m http.server 8000
```
Then open: **http://localhost:8000**

### **Option 2: Direct File**
Double-click `index.html` to open in your browser!

---

## 🛠️ **Technologies Used**

- **HTML5** - Structure
- **CSS3** - Custom styles with glassmorphism
- **JavaScript (ES6+)** - Interactivity and logic
- **Tailwind CSS** (via CDN) - Utility styling
- **Chart.js** (via CDN) - Beautiful charts
- **Google Gemini AI** - Meal plans, grocery lists, recipes
- **LocalStorage API** - Save data locally

---

## 📁 **File Structure**

```
Hackathon/
├── index.html          # Home page
├── planner.html        # Meal planner with table view
├── grocery.html        # Grocery list generator
├── saved.html          # Saved plans manager
├── progress.html       # Progress tracker with charts
├── recipes.html        # Recipe generator
├── style.css           # Global styles
├── app.js              # Global JavaScript functions
├── README.md           # This file
└── PROJECT_INFO.md     # Additional project info
```

---

## 🌟 **Key Features Highlight**

### **Visual Design**
- ✅ Glassmorphism effects throughout
- ✅ Animated floating gradient orbs
- ✅ Smooth hover animations
- ✅ Gradient text and buttons
- ✅ Custom scrollbars
- ✅ Sticky navigation bar
- ✅ Responsive grid layouts

### **Functionality**
- ✅ AI-powered content generation
- ✅ Local data persistence
- ✅ Print & copy capabilities
- ✅ Real-time form validation
- ✅ Loading states & animations
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Interactive charts
- ✅ **Table format option** ⭐ NEW!

### **User Experience**
- ✅ Intuitive navigation
- ✅ Clear visual feedback
- ✅ Error handling
- ✅ Quick action buttons
- ✅ Template shortcuts
- ✅ Responsive on all devices

---

## 💡 **Usage Examples**

### **Create a Meal Plan**
1. Go to **Meal Planner** page
2. Enter your age, select gender
3. Choose a template OR type your health goal
4. Add preferences (optional)
5. Click **Generate My Meal Plan**
6. **Toggle between Card & Table views** ⭐
7. Save your plan!

### **Generate Grocery List**
1. Go to **Grocery List** page
2. Select a saved meal plan
3. AI generates organized shopping list
4. Copy or print the list

### **Track Progress**
1. Go to **Progress** page
2. Enter current weight & target weight
3. Set energy level (1-10)
4. Add notes (optional)
5. Click **Save Progress**
6. See your chart update!

### **Get a Recipe**
1. Go to **Recipes** page
2. Enter a recipe name (or choose a quick option)
3. Select servings
4. Add dietary preferences (optional)
5. Click **Generate Recipe**
6. Get detailed instructions!

---

## 🎨 **Color Palette**

- **Primary Green**: `#00E6A0` (Emerald/Teal)
- **Secondary Purple**: `#6366F1` (Indigo)
- **Success**: `#10B981` (Green)
- **Danger**: `#EF4444` (Red)
- **Warning**: `#F59E0B` (Amber)
- **Info**: `#3B82F6` (Blue)

---

## 📊 **Data Storage**

All data is stored locally in your browser using LocalStorage:

- **Meal Plans**: `localStorage.getItem('mealPlans')`
- **Progress Logs**: `localStorage.getItem('progress')`

### Clear All Data
Open browser console and run:
```javascript
localStorage.clear();
location.reload();
```

---

## 🚀 **Deployment**

### **Deploy to Netlify (Free)**
1. Drag & drop the `Hackathon` folder to Netlify
2. Get instant live URL!

### **Deploy to Vercel**
```bash
vercel
```

### **Deploy to GitHub Pages**
1. Push to GitHub
2. Enable GitHub Pages in settings
3. Done!

---

## 🌐 **Browser Compatibility**

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📝 **License**

Open source - Free to use and modify!

---

## 🙏 **Credits**

- **Design & Development**: Modern web technologies
- **AI**: Google Gemini 2.0 Flash
- **Charts**: Chart.js
- **Icons**: Emojis
- **Fonts**: Inter from Google Fonts
- **CSS Framework**: Tailwind CSS

---

## 🎯 **What's New in This Version**

### **Major Updates:**
- ✅ **6 complete pages** (was single page)
- ✅ **Table format option** for meal plans ⭐ REQUESTED!
- ✅ **Grocery list generator** with AI
- ✅ **Saved plans manager** with delete/view
- ✅ **Progress tracker** with Chart.js graphs
- ✅ **Recipe generator** with detailed instructions
- ✅ **Navigation system** across all pages
- ✅ **Local storage** for all data
- ✅ **Print & copy** functionality everywhere
- ✅ **Enhanced UI/UX** throughout

---

## 📱 **Mobile Responsive**

All 6 pages work perfectly on:
- 📱 Phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1920px+)

---

## 🎊 **Summary**

**Mealora** is now a **complete multi-page meal planning platform** with:
- 6 interconnected pages
- Table & card view options
- Grocery list generation
- Progress tracking with charts
- Recipe generation
- Save/load functionality
- Beautiful modern design
- All powered by AI!

**Enjoy your expanded, feature-rich meal planning app! 🌿✨**

---

## 🌐 **Access Your App**

**Current Server**: http://localhost:8000

**Start Server**:
```bash
python -m http.server 8000
```

**Stop Server**:
```bash
# Windows
taskkill /F /IM python.exe

# Mac/Linux
killall python
```

---

Made with ❤️ using Google Gemini AI • 2025 Mealora
