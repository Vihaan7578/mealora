# 🌿 Mealora - AI-Powered Meal Planning Web App

A stunning, modern web application for personalized vegetarian meal planning powered by Google Gemini AI.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10-ff69b4?style=flat-square)

## ✨ Features

- **AI-Powered Meal Plans**: Personalized 7-day vegetarian meal plans using Google Gemini AI
- **Beautiful Modern UI**: Stunning glassmorphism design with smooth animations
- **Interactive Components**: Framer Motion animations throughout
- **Smart Grocery Lists**: Auto-generated shopping lists organized by category
- **Nutrition Dashboard**: Visual insights with interactive charts
- **Save & Load Plans**: Local storage for your meal plans
- **Responsive Design**: Works perfectly on all devices
- **Export Features**: Save plans as PDFs (coming soon)

## 🎨 Design Features

- **Glassmorphism effects** for modern, elegant UI
- **Gradient backgrounds** with animated floating elements
- **Smooth animations** using Framer Motion
- **Custom scrollbars** with gradient styling
- **Responsive grid layouts**
- **Interactive hover effects**
- **Beautiful color palette** with primary teal and secondary indigo

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd mealora-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mealora-web/
├── app/
│   ├── layout.js          # Root layout with Toaster
│   ├── page.js            # Beautiful landing page
│   ├── planner/
│   │   └── page.js        # Main meal planner interface
│   └── globals.css        # Global styles & utilities
├── components/
│   ├── LoadingAnimation.js      # Beautiful loading state
│   ├── MealPlanDisplay.js       # Collapsible meal plan viewer
│   ├── GroceryList.js           # Smart grocery list modal
│   └── NutritionDashboard.js    # Interactive charts
├── lib/
│   └── gemini.js          # Google Gemini AI integration
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
```

## 🎯 How to Use

1. **Visit the Homepage** - Learn about Mealora's features
2. **Click "Start Planning Now"** - Navigate to the planner
3. **Fill Your Profile**:
   - Enter your age
   - Select your gender
   - Choose or enter your health goal
   - Add food preferences (optional)
4. **Generate Plan** - AI creates your personalized 7-day plan
5. **Explore Features**:
   - View your meal plan with expandable days
   - Generate grocery shopping list
   - View nutrition statistics
   - Save your plan locally
   - Export to PDF

## 🛠️ Technologies Used

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Google Gemini AI](https://ai.google.dev/)** - AI for meal plan generation
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[Chart.js](https://www.chartjs.org/)** - Beautiful charts
- **[React Hot Toast](https://react-hot-toast.com/)** - Elegant notifications

## 🎨 Design Inspiration

This app incorporates modern web design trends:
- **Glassmorphism** - Semi-transparent elements with blur effects
- **Gradient Meshes** - Animated background gradients
- **Neumorphism** - Soft shadows and highlights
- **Micro-interactions** - Delightful hover and click animations
- **Bold Typography** - Modern font hierarchy
- **Color Theory** - Harmonious color combinations

## 🔧 Customization

### Change Colors

Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  primary: {
    500: '#00E6A0',  // Change primary color
    // ... other shades
  },
}
```

### Add Your API Key

The app uses a hardcoded API key in `lib/gemini.js`. For production:

1. Create a `.env.local` file
2. Add your key: `NEXT_PUBLIC_GEMINI_API_KEY=your_key_here`
3. Update `lib/gemini.js` to use the env variable

## 📱 Responsive Design

The app is fully responsive and looks great on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1920px+)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click!

### Build for Production

```bash
npm run build
npm start
```

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- **Design & Development**: Built with modern web technologies
- **AI**: Powered by Google Gemini
- **Icons**: React Icons library
- **Fonts**: Inter from Google Fonts

## 💡 Future Enhancements

- [ ] User authentication
- [ ] Database integration
- [ ] PDF export functionality
- [ ] Recipe details with instructions
- [ ] Meal prep instructions
- [ ] Social sharing features
- [ ] Weekly progress tracking
- [ ] Shopping list mobile app integration

---

Made with ❤️ using Next.js, React, Tailwind CSS & Google Gemini AI

**Enjoy your beautiful meal planning experience! 🌿✨**

