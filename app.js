// Global state
const API_KEY = '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';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Groq models - blazing fast!
const AI_MODELS = [
    'llama-3.3-70b-versatile',
    'llama-3.1-70b-versatile',
    'mixtral-8x7b-32768'
];

// Utility functions
function setActivePage(pageName) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === pageName) {
            link.classList.add('active');
        }
    });
}

// BMI Calculation and Calorie Adjustment
function calculateBMI(weight, height) {
    if (!weight || !height || height === 0) return null;
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

// Get Current Season
function getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Monsoon';
    return 'Winter';
}

// Seasonal Foods Database
const seasonalFoods = {
    'Spring': ['Tinda', 'Raw Mango', 'Cucumber', 'Radish', 'Carrots', 'Peas', 'Coriander'],
    'Summer': ['Karela', 'Bottle Gourd', 'Tori', 'Cucumber', 'Watermelon', 'Mint', 'Coconut Water'],
    'Monsoon': ['Bhindi', 'Brinjal', 'Karela', 'Corn', 'Lauki', 'Green Beans'],
    'Winter': ['Palak', 'Sarson', 'Bathua', 'Carrots', 'Beetroot', 'Peas', 'Cauliflower']
};

// STRICT Input Validation - Multi-layer Filtering
function validateAndSanitizeInput(text) {
    if (!text) return '';
    
    // Layer 1: Prohibited patterns (immediate rejection)
    const prohibitedPatterns = [
        /<table[^>]*>/gi,
        /<\/table>/gi,
        /\bcreate\s+(a\s+)?table\b/gi,
        /\bmake\s+(a\s+)?table\b/gi,
        /\bshow\s+(a\s+)?table\b/gi,
        /\bgenerate\s+(a\s+)?table\b/gi,
        /\bhtml\s+table\b/gi,
        /\byour\s+(mom|mother|dad|father|family|wife|husband)\b/gi,
        /\bthroughout\s+the\s+years\b/gi,
        /\bover\s+the\s+years\b/gi,
        /\btimeline\b/gi,
        /\bchart\b/gi,
        /\bgraph\b/gi,
        /\baudi\s+cars?\b/gi,
        /\bcreate\s+html\b/gi,
        /\bwrite\s+code\b/gi,
        /\bgenerate\s+code\b/gi,
        /\bscript\b/gi,
        /<script/gi,
        /javascript:/gi
    ];
    
    // Check for prohibited patterns
    for (let pattern of prohibitedPatterns) {
        if (pattern.test(text)) {
            console.warn('🚫 Prohibited pattern detected, rejecting input:', text);
            return null; // Return null to indicate explicit rejection
        }
    }
    
    // Layer 2: Food-related keywords (must contain at least one)
    const foodKeywords = [
        // Allergies & Intolerances
        'allergic', 'allergy', 'intolerant', 'cannot eat', 'avoid eating',
        // Health Conditions
        'diabetes', 'diabetic', 'blood pressure', 'bp', 'hypertension', 'low bp',
        'pcos', 'thyroid', 'hypothyroidism', 'hyperthyroidism', 'pregnancy',
        // Dietary Preferences
        'vegan', 'vegetarian', 'non-veg', 'non vegetarian', 'ovo', 'lacto',
        // Food Items
        'meat', 'chicken', 'fish', 'seafood', 'prawn', 'crab',
        'nuts', 'peanuts', 'almond', 'cashew', 'walnut',
        'milk', 'lactose', 'dairy', 'cheese', 'butter', 'curd', 'dahi',
        'gluten', 'wheat', 'maida', 'suji', 'semolina',
        'rice', 'dal', 'pulse', 'legumes', 'chana', 'masoor', 'arhar', 'toor', 'moong', 'urad',
        'paneer', 'tofu', 'soya', 'soy', 'soya chunks',
        'egg', 'eggplant', 'brinjal', 'baingan',
        'onion', 'garlic', 'tomato', 'potato', 'aloo',
        'cauliflower', 'gobhi', 'cabbage', 'band gobhi',
        'spinach', 'palak', 'fenugreek', 'methi',
        'okra', 'bhindi', 'bitter gourd', 'karela',
        'bottle gourd', 'lauki', 'ridge gourd', 'tori', 'dudhi',
        // Seasonings & Spices
        'salt', 'sugar', 'jaggery', 'gur', 'honey', 'shahad',
        'oil', 'ghee', 'mustard oil', 'coconut oil',
        'spicy', 'mild', 'less spicy', 'masala', 'spices',
        // General Terms
        'healthy', 'nutritious', 'protein', 'carbs', 'calories', 'fat',
        'weight', 'gain weight', 'lose weight', 'maintain weight',
        'prefer', 'like', 'dislike', 'love', 'hate',
        'breakfast', 'lunch', 'dinner', 'snacks', 'meal',
        'katori', 'bowl', 'plate', 'cup', 'rotis', 'chapatis'
    ];
    
    const lowerText = text.toLowerCase();
    const hasFoodKeyword = foodKeywords.some(keyword => 
        lowerText.includes(keyword.toLowerCase())
    );
    
    if (!hasFoodKeyword) {
        console.warn('🚫 No food-related keywords found, rejecting input:', text);
        return null;
    }
    
    // Layer 3: Suspicious patterns that might slip through
    const suspiciousPatterns = [
        /\b(create|make|generate|show|display|write)\s+.*\s+(for|about|of)\s+(your|my)\s*(mom|mother|dad|father|family)\b/gi,
        /\byears?\s+(old|ago|back)\b/gi,
        /\b(period|duration|span)\s+of\s+\d+\s+years\b/gi
    ];
    
    for (let pattern of suspiciousPatterns) {
        if (pattern.test(text)) {
            console.warn('🚫 Suspicious pattern detected, rejecting input:', text);
            return null;
        }
    }
    
    // If passed all checks, return the text
    return text;
}

// Local Storage helpers
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

function getSavedPlans() {
    return JSON.parse(localStorage.getItem('mealPlans') || '[]');
}

function deletePlan(id) {
    const plans = getSavedPlans();
    const filtered = plans.filter(p => p.id !== id);
    localStorage.setItem('mealPlans', JSON.stringify(filtered));
}

// Progress tracking
function saveProgress(data) {
    const progress = JSON.parse(localStorage.getItem('progress') || '[]');
    progress.push({
        id: Date.now(),
        date: new Date().toISOString(),
        ...data
    });
    localStorage.setItem('progress', JSON.stringify(progress));
}

function getProgress() {
    return JSON.parse(localStorage.getItem('progress') || '[]');
}

// AI Generation with Groq API
async function generateWithAI(prompt, retryCount = 0, modelIndex = 0) {
    const model = AI_MODELS[modelIndex];
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 4096,
                top_p: 1,
                stream: false
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Error:', errorData);
            
            if (modelIndex < AI_MODELS.length - 1) {
                return await generateWithAI(prompt, 0, modelIndex + 1);
            }
            throw new Error(errorData.error?.message || 'Failed to generate');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('Error:', error);
        if (retryCount < 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return await generateWithAI(prompt, retryCount + 1, modelIndex);
        }
        throw error;
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--info)'};
        color: white;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


