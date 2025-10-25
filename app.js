// Global state
const API_KEY = 'AIzaSyBPKf66by_yOIqIO3f8qvZdFpyFe3TmXh4';

// Multiple model fallbacks for reliability
const AI_MODELS = [
    'gemini-1.5-flash',           // Most stable
    'gemini-1.5-pro',             // Backup
    'gemini-2.0-flash-exp'        // Experimental (may be unstable)
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

// AI Generation with retry logic and model fallback
async function generateWithAI(prompt, retryCount = 0, modelIndex = 0) {
    const model = AI_MODELS[modelIndex];
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    
    console.log(`🔍 Attempting API call with model: ${model}`);
    console.log(`📍 URL: ${API_URL}`);
    
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });
        
        console.log(`📡 Response status: ${response.status}`);
        
        // Handle 404 - Model not found
        if (response.status === 404) {
            console.error(`❌ Model ${model} not found (404). Trying next model...`);
            
            // Try next model
            if (modelIndex < AI_MODELS.length - 1) {
                return await generateWithAI(prompt, 0, modelIndex + 1);
            }
            
            throw new Error('❌ API Error: Model not found. Please check your API key or try again later.');
        }
        
        // Handle 503 Service Unavailable
        if (response.status === 503) {
            console.warn(`⚠️ Model ${model} is unavailable (503). Trying next model...`);
            
            // Try next model
            if (modelIndex < AI_MODELS.length - 1) {
                return await generateWithAI(prompt, 0, modelIndex + 1);
            }
            
            // All models failed, retry with first model after delay
            if (retryCount < 3) {
                const delay = Math.pow(2, retryCount) * 1000;
                console.log(`⏳ All models unavailable. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return await generateWithAI(prompt, retryCount + 1, 0);
            }
            
            throw new Error('🔴 Gemini AI is currently overloaded. Please try again in a few moments.');
        }
        
        // Handle other errors
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ API Error Response:`, errorText);
            
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch (e) {
                errorData = { error: { message: errorText } };
            }
            
            throw new Error(errorData.error?.message || `API Error: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log(`✅ Successfully received response from ${model}`);
        
        // Validate response
        if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
            console.error('❌ Invalid response structure:', data);
            throw new Error('Invalid response from AI');
        }
        
        return data.candidates[0].content.parts[0].text;
        
    } catch (error) {
        console.error(`❌ Error in generateWithAI:`, error);
        
        // Network errors
        if (error.message.includes('fetch') || error.name === 'TypeError') {
            if (retryCount < 2) {
                const delay = Math.pow(2, retryCount) * 1000;
                console.log(`⏳ Network error. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return await generateWithAI(prompt, retryCount + 1, modelIndex);
            }
            throw new Error('🌐 Network error. Please check your connection.');
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


