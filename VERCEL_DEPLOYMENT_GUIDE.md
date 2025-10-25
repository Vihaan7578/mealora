# 🚀 Vercel Deployment Guide for Mealora

## ❌ Current Issue: 404 Error on Gemini API

### Problem
Getting `404 (Not Found)` error when calling Google Gemini API from Vercel deployment.

### Root Causes
1. **API Key Issues**: The API key might be restricted or not enabled for Generative Language API
2. **CORS Issues**: Direct browser calls to Gemini API from production domain
3. **Model Names**: Some model names might not be available in certain regions

---

## ✅ Solution 1: Verify Google API Key (Recommended)

### Step 1: Check API Key Restrictions
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click on your API key: `AIzaSyBPKf66by_yOIqIO3f8qvZdFpyFe3TmXh4`
3. Verify these settings:
   - ✅ **API Restrictions**: Set to "Don't restrict key" OR specifically enable "Generative Language API"
   - ✅ **Application restrictions**: Set to "None" for testing
   - ✅ **Website restrictions**: Add your Vercel domain (e.g., `your-app.vercel.app`)

### Step 2: Enable the Generative Language API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** > **Library**
4. Search for "Generative Language API"
5. Click **Enable**

### Step 3: Test the API Key
Run this in your browser console on your Vercel site:

```javascript
// Test API call
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        contents: [{ parts: [{ text: 'Say hello' }] }]
    })
})
.then(r => r.json())
.then(d => console.log('✅ Success:', d))
.catch(e => console.error('❌ Error:', e));
```

---

## ✅ Solution 2: Use Environment Variables on Vercel

### Why?
- Keeps API key secure
- Allows easy key rotation
- Works across different environments

### How to Set Up:

1. **Go to Vercel Dashboard**:
   - Open your project on [vercel.com](https://vercel.com)
   - Go to **Settings** > **Environment Variables**

2. **Add Variable**:
   - **Name**: `VITE_GEMINI_API_KEY` or `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Value**: `AIzaSyBPKf66by_yOIqIO3f8qvZdFpyFe3TmXh4`
   - **Environments**: Check Production, Preview, Development
   - Click **Save**

3. **Update app.js**:
   ```javascript
   // Change this line:
   const API_KEY = 'AIzaSyBPKf66by_yOIqIO3f8qvZdFpyFe3TmXh4';
   
   // To this:
   const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBPKf66by_yOIqIO3f8qvZdFpyFe3TmXh4';
   ```

4. **Redeploy**: Vercel will automatically redeploy with the new environment variable

---

## ✅ Solution 3: Create a Serverless Function (Advanced)

To avoid exposing the API key in the browser, create a Vercel serverless function.

### Create `/api/generate.js`:

```javascript
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { prompt } = req.body;
        
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 2048,
                    }
                })
            }
        );
        
        if (!response.ok) {
            const error = await response.text();
            console.error('Gemini API Error:', error);
            return res.status(response.status).json({ 
                error: `API Error: ${response.status}`,
                details: error 
            });
        }
        
        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
```

### Update `app.js` to use the serverless function:

```javascript
async function generateWithAI(prompt, retryCount = 0) {
    try {
        // Use your Vercel API endpoint instead of direct Gemini API
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to generate content');
        }
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
        
    } catch (error) {
        console.error('Error:', error);
        
        if (retryCount < 2) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return generateWithAI(prompt, retryCount + 1);
        }
        
        throw error;
    }
}
```

---

## ✅ Solution 4: Check Model Availability

Some Gemini models might not be available in all regions. Try using only stable models:

### Update `app.js`:

```javascript
// Use only stable, widely available models
const AI_MODELS = [
    'gemini-pro',              // Most stable and widely available
    'gemini-1.5-flash',        // Alternative
];
```

---

## 🔍 Debugging Steps

### 1. Check Console Logs
Open browser DevTools (F12) on your Vercel site and look for:
- `🔍 Attempting API call with model: ...`
- `📍 URL: ...`
- `📡 Response status: ...`
- Any error messages

### 2. Test API Key Directly
```bash
curl -X POST \
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "contents": [{
      "parts": [{"text": "Hello"}]
    }]
  }'
```

### 3. Check Network Tab
- Open DevTools > Network tab
- Try generating a meal plan
- Look for the Gemini API request
- Check the response for detailed error messages

---

## 📝 Quick Fix Checklist

- [ ] API key is correct and not expired
- [ ] Generative Language API is enabled in Google Cloud Console
- [ ] API key restrictions allow your Vercel domain
- [ ] Model name is correct (`gemini-1.5-flash` or `gemini-pro`)
- [ ] CORS is not blocking the request
- [ ] Check browser console for detailed error messages
- [ ] Try using a serverless function instead of direct API calls

---

## 🆘 Still Not Working?

### Option 1: Get a New API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Make sure to enable "Generative Language API"
4. Update your Vercel environment variables

### Option 2: Use OpenAI Instead
If Gemini continues to have issues, you can switch to OpenAI:

```javascript
// In app.js
const OPENAI_API_KEY = 'your-openai-key';

async function generateWithAI(prompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 2048
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}
```

---

## 🚀 Redeploy to Vercel

After making changes:

```bash
git add .
git commit -m "Fix: Update Gemini API integration for Vercel"
git push origin main
```

Vercel will automatically redeploy!

---

## 📞 Support

If you're still having issues:
1. Check the updated console logs (they're now more detailed)
2. Share the exact error message from the console
3. Verify your API key works with the curl command above

Good luck with your hackathon! 🏆

