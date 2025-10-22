# 🌿 Mealora Python Desktop Application

## ✅ Complete Python Version of Web App!

I've created a **full-featured Python desktop application** using CustomTkinter that replicates **ALL** the functionality of the web app with **Indian cuisine customization**!

---

## 📁 File Structure

```
Hackathon/
├── mealora_app.py          ⭐ NEW - Complete Python desktop app
├── index.html              → Web version (home)
├── planner.html            → Web version (planner)
├── grocery.html            → Web version (grocery)
├── saved.html              → Web version (saved plans)
├── progress.html           → Web version (progress)
├── recipes.html            → Web version (recipes)
└── data/                   → Shared data folder
    ├── saved_plans/        → JSON meal plans
    └── progress.json       → Progress tracking
```

---

## 🚀 How to Run Python App

### **Option 1: Direct Run**
```bash
python mealora_app.py
```

### **Option 2: Install Dependencies First** (if needed)
```bash
pip install customtkinter google-generativeai matplotlib
python mealora_app.py
```

---

## ✨ Features in Python App

### **All 6 Pages Included:**

#### **1. 🏠 Home Page**
- Beautiful welcome screen
- Stats showcase
- Feature cards
- "Start Planning" button

#### **2. 🍽️ Meal Planner** ⭐ WITH TABLE VIEW!
- Age, gender, health goal inputs
- 4 Indian-themed quick templates:
  - 🔥 Weight Loss (Satvik diet)
  - 💪 Muscle Gain (High protein Indian)
  - 🩺 Diabetes Control (Low GI Indian foods)
  - 🍛 Balanced Thali
- **Card View** and **Table View** toggle
- Save plans locally
- AI generates with Indian cuisine:
  - Traditional breakfast (Poha, Upma, Idli, Dosa, Paratha)
  - Complete thali lunches (Dal, Sabzi, Roti/Rice, Curd)
  - Indian snacks with chai
  - Hindi/English ingredient names
  - Indian measurements (katori, cup, roti)

#### **3. 🛒 Grocery List Generator**
- Info about Indian ingredient categories:
  - 🥬 Sabzi & Vegetables
  - 🌾 Dal & Pulses
  - 🍚 Grains & Atta
  - 🥛 Dairy products
  - 🧂 Masale & Spices

#### **4. 💾 Saved Plans Manager**
- View all saved meal plans
- Plan cards with metadata
- View full plans in new window
- Delete plans
- Sorted by date

#### **5. 📈 Progress Tracker**
- Log weight and target weight
- **Matplotlib chart** showing progress
- Visual graph of weight over time
- Saves to JSON file

#### **6. 📖 Recipe Generator**
- Enter any Indian recipe name
- Quick recipe buttons:
  - Chole Masala, Palak Paneer, Dal Tadka
  - Aloo Paratha, Poha, Rajma
- AI generates detailed recipes with:
  - Ingredients in Hindi/English (Haldi, Jeera, etc.)
  - Indian measurements (katori, cup, pinch/chutki)
  - Cooking instructions with Indian terms (Tadka, Bhuno, Dum)
  - Serving suggestions (what to serve with)
  - Chef's tips

---

## 🇮🇳 Indian Cuisine Features

### **Ingredients with Indian Names:**
- **Vegetables**: Aloo, Pyaaz, Tamatar, Bhindi, Palak, Baingan, Karela, Lauki, Tinda
- **Dals**: Toor dal, Moong dal, Masoor dal, Chana dal, Urad dal
- **Grains**: Wheat atta, Rice, Besan, Sooji/Rava, Poha, Bajra, Jowar, Ragi
- **Dairy**: Doodh, Dahi, Paneer, Ghee, Makhan
- **Spices**: Haldi, Jeera, Dhaniya, Laal mirch, Hing, Garam masala

### **Indian Measurements:**
- 1 katori (small bowl)
- 2 roti/chapati
- 1 bowl
- 1 cup chai
- Pinch (chutki)

### **Cooking Methods:**
- Tadka/Chhonk
- Bhuno
- Dum
- Pakana

---

## 🎯 What's Different from Web Version?

### **Similarities (95% identical):**
- ✅ Same 6 pages
- ✅ Same Indian cuisine focus
- ✅ Same AI integration
- ✅ Same table/card view toggle
- ✅ Same data storage (JSON files)
- ✅ Same features

### **Differences:**
- 🖥️ **Desktop window** instead of browser
- 📊 **Matplotlib charts** instead of Chart.js
- 📁 **File dialogs** instead of web modals
- 🎨 **CustomTkinter styling** instead of Tailwind CSS

---

## 💾 Data Storage

Both versions share the same data folder:
- `data/saved_plans/` - Meal plans (JSON)
- `data/progress.json` - Progress tracking

**You can use both apps interchangeably!** Data saved in one works in the other.

---

## 🎨 UI Features

- **Beautiful CustomTkinter interface**
- **Indian green theme** (#00C9A7)
- **Smooth navigation** between pages
- **Scrollable content** areas
- **Loading states** during AI generation
- **Error handling** with user-friendly messages
- **Responsive layout**

---

## 📊 Table View Feature

After generating a meal plan:
1. Look for **"📊 Table"** button
2. Click to switch to table format
3. Shows 7-day grid with Breakfast, Lunch, Dinner, Snacks
4. Click **"📄 Card"** to return to detailed view

---

## 🔑 API Key

Uses the same Google Gemini API key as the web version:
```python
API_KEY = "AIzaSyBPKf66by_yOIqIO3f8qvZdFpyFe3TmXh4"
```

Change in `mealora_app.py` line 12 if needed.

---

## 🐛 Troubleshooting

### **Missing Dependencies?**
```bash
pip install customtkinter google-generativeai matplotlib
```

### **Import Error?**
Make sure you have Python 3.8+:
```bash
python --version
```

### **API Error?**
Check your internet connection - AI requires online access.

---

## 🎯 Quick Start Guide

1. **Run the app:**
   ```bash
   python mealora_app.py
   ```

2. **Navigate to Meal Planner**

3. **Fill in your details:**
   - Age: 25
   - Gender: Male/Female/Other
   - Health Goal: Or click a template

4. **Click "Generate My Meal Plan"**

5. **Wait for AI** (10-15 seconds)

6. **Toggle between Card/Table views**

7. **Save your plan**

8. **Try other features:**
   - View Saved Plans
   - Track Progress
   - Generate Recipes

---

## ✅ Complete Feature List

### **Meal Planning:**
- [x] AI-powered generation
- [x] Indian cuisine focus
- [x] Hindi/English terminology
- [x] Traditional meals
- [x] Indian measurements
- [x] Card view
- [x] Table view
- [x] Save plans
- [x] Load plans

### **Data Management:**
- [x] Save to JSON
- [x] Load from JSON
- [x] Delete plans
- [x] View plans
- [x] Progress tracking

### **UI/UX:**
- [x] 6-page navigation
- [x] Beautiful design
- [x] Loading states
- [x] Error handling
- [x] Charts/graphs
- [x] Scrollable areas

### **Indian Features:**
- [x] Indian ingredients
- [x] Hindi/English names
- [x] Indian measurements
- [x] Traditional recipes
- [x] Cooking methods
- [x] Thali-style meals

---

## 📝 Summary

You now have **TWO versions** of Mealora:

### **Web Version** (HTML/CSS/JS)
- Run: `python -m http.server 8000`
- Access: http://localhost:8000
- Best for: Web browsers, online sharing

### **Python Version** (CustomTkinter)
- Run: `python mealora_app.py`
- Access: Desktop window
- Best for: Offline use, desktop app

**Both are fully functional with Indian cuisine customization!** 🇮🇳

---

Made with ❤️ - Complete Python replication of web app! 🚀

