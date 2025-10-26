// Global state
const API_KEY = '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';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// STRICT VEGETARIAN ENFORCEMENT SYSTEM
const NON_VEG_KEYWORDS = [
    // Meat - exact matches
    'chicken', 'beef', 'pork', 'lamb', 'mutton', 'goat', 'turkey', 'duck', 'fish', 'salmon', 'tuna', 'prawn', 'shrimp', 'crab', 'lobster',
    'meat', 'flesh', 'animal', 'carcass', 'butcher', 'slaughter',
    
    // Indian non-veg terms
    'murgi', 'gosht', 'machli', 'jhinga', 'kekda', 'bakra', 'bakra', 'murga', 'andha', 'mutton', 'chicken', 'fish', 'prawn', 'shrimp',
    'kabab', 'biryani', 'tikka', 'curry', 'masala', 'gravy', 'soup', 'broth', 'stock',
    
    // Common non-veg dishes
    'biryani', 'kabab', 'tikka', 'butter chicken', 'chicken curry', 'fish curry', 'prawn curry', 'mutton curry',
    'chicken tikka', 'fish tikka', 'prawn tikka', 'lamb curry', 'goat curry', 'beef curry',
    
    // Seafood
    'seafood', 'marine', 'aquatic', 'shellfish', 'mollusk', 'crustacean',
    
    // Processed non-veg
    'sausage', 'bacon', 'ham', 'pepperoni', 'salami', 'hot dog', 'burger', 'pizza', 'sandwich',
    'nuggets', 'patties', 'cutlets', 'kebabs', 'tandoori', 'grilled', 'fried',
    
    // Eggs (if considering as non-veg)
    'egg', 'eggs', 'omelette', 'scrambled', 'boiled', 'fried egg', 'egg curry', 'anda',
    
    // Dairy products that might be non-veg
    'rennet', 'gelatin', 'lard', 'tallow',
    
    // Common misspellings and variations
    'chiken', 'chken', 'chikn', 'chikken', 'chikn', 'chiken', 'chikn', 'chikn',
    'fsh', 'fis', 'fihs', 'fihs', 'fihs', 'fihs', 'fihs', 'fihs',
    'meat', 'meet', 'met', 'meat', 'meet', 'met', 'meat', 'meet',
    'prawn', 'prawns', 'prawn', 'prawns', 'prawn', 'prawns', 'prawn', 'prawns',
    'shrimp', 'shrimps', 'shrimp', 'shrimps', 'shrimp', 'shrimps', 'shrimp', 'shrimps',
    'crab', 'crabs', 'crab', 'crabs', 'crab', 'crabs', 'crab', 'crabs',
    'lobster', 'lobsters', 'lobster', 'lobsters', 'lobster', 'lobsters', 'lobster', 'lobsters',
    'turkey', 'turkeys', 'turkey', 'turkeys', 'turkey', 'turkeys', 'turkey', 'turkeys',
    'duck', 'ducks', 'duck', 'ducks', 'duck', 'ducks', 'duck', 'ducks',
    'beef', 'beefs', 'beef', 'beefs', 'beef', 'beefs', 'beef', 'beefs',
    'pork', 'porks', 'pork', 'porks', 'pork', 'porks', 'pork', 'porks',
    'lamb', 'lambs', 'lamb', 'lambs', 'lamb', 'lambs', 'lamb', 'lambs',
    'mutton', 'muttons', 'mutton', 'muttons', 'mutton', 'muttons', 'mutton', 'muttons',
    'goat', 'goats', 'goat', 'goats', 'goat', 'goats', 'goat', 'goats',
    'salmon', 'salmons', 'salmon', 'salmons', 'salmon', 'salmons', 'salmon', 'salmons',
    'tuna', 'tunas', 'tuna', 'tunas', 'tuna', 'tunas', 'tuna', 'tunas'
];

// Function to calculate Levenshtein distance for fuzzy matching
function levenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[str2.length][str1.length];
}

// Function to detect typos and misspellings
function detectTypos(word, keywords) {
    for (let keyword of keywords) {
        const distance = levenshteinDistance(word, keyword);
        const maxDistance = Math.max(1, Math.floor(keyword.length * 0.3)); // Allow 30% error
        if (distance <= maxDistance && distance > 0) {
            return { detected: true, keyword: keyword, original: word };
        }
    }
    return { detected: false };
}

// Enhanced function to detect non-vegetarian content with typo detection
function detectNonVegContent(text) {
    if (!text) return false;
    
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);
    
    // Check exact matches first
    for (let word of words) {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (NON_VEG_KEYWORDS.includes(cleanWord)) {
            return { detected: true, keyword: cleanWord, type: 'exact' };
        }
    }
    
    // Check for partial matches
    for (let keyword of NON_VEG_KEYWORDS) {
        if (lowerText.includes(keyword)) {
            return { detected: true, keyword: keyword, type: 'partial' };
        }
    }
    
    // Check for typos and misspellings
    for (let word of words) {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (cleanWord.length >= 3) { // Only check words with 3+ characters
            const typoResult = detectTypos(cleanWord, NON_VEG_KEYWORDS);
            if (typoResult.detected) {
                return { detected: true, keyword: typoResult.keyword, original: typoResult.original, type: 'typo' };
            }
        }
    }
    
    // Check for context clues that suggest non-veg requests
    const contextClues = [
        'real chicken', 'actual chicken', 'genuine chicken', 'authentic chicken',
        'real meat', 'actual meat', 'genuine meat', 'authentic meat',
        'real fish', 'actual fish', 'genuine fish', 'authentic fish',
        'only chicken', 'only meat', 'only fish', 'must have chicken',
        'need chicken', 'want chicken', 'require chicken', 'chicken only',
        'meat only', 'fish only', 'non veg', 'non-veg', 'nonvegetarian'
    ];
    
    for (let clue of contextClues) {
        if (lowerText.includes(clue)) {
            return { detected: true, keyword: clue, type: 'context' };
        }
    }
    
    return { detected: false };
}

// Function to show ACHA warning
function showAchaWarning() {
    // Remove any existing warning
    const existingWarning = document.getElementById('acha-warning');
    if (existingWarning) {
        existingWarning.remove();
    }
    
    // Create warning overlay
    const warning = document.createElement('div');
    warning.id = 'acha-warning';
    warning.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            font-family: 'Arial', sans-serif;
        ">
            <div style="
                font-size: 8rem;
                font-weight: 900;
                color: #ff0000;
                text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 60px #ff0000;
                animation: achaPulse 0.5s ease-in-out;
                text-align: center;
                line-height: 1;
            ">
                ACHA?<br>
                <div style="font-size: 2rem; margin-top: 1rem; color: #ff6666;">
                    STRICTLY VEGETARIAN ONLY! 🚫
                </div>
            </div>
        </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes achaPulse {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes achaFade {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.8); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(warning);
    
    // Fade away after 3 seconds
    setTimeout(() => {
        warning.style.animation = 'achaFade 1s ease-out';
        setTimeout(() => {
            if (warning.parentNode) {
                warning.remove();
            }
        }, 1000);
    }, 3000);
}

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


