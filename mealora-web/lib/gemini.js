import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genai = new GoogleGenerativeAI('AIzaSyBPKf66by_yOIqIO3f8qvZdFpyFe3TmXh4')

export async function generateMealPlan(formData) {
  const { age, gender, healthGoal, preferences } = formData

  const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

  const prompt = `You are a professional nutritionist specializing in vegetarian diets. Create a detailed, personalized 7-day vegetarian meal plan based on the following information:

Age: ${age}
Gender: ${gender}
Health Condition/Dietary Goal: ${healthGoal}
Food Preferences/Allergies: ${preferences || 'None specified'}

Please provide:

1. NUTRITIONAL OVERVIEW (2-3 sentences)
   Address their specific health goal and how this plan helps

2. 7-DAY MEAL PLAN
   For each day, provide:
   
   DAY X - [Day Name]
   
   🌅 BREAKFAST
   • [Meal name and brief description]
   • Calories: ~XXX kcal
   
   🍎 MID-MORNING SNACK
   • [Snack details]
   • Calories: ~XXX kcal
   
   🍽️ LUNCH
   • [Meal name and brief description]
   • Calories: ~XXX kcal
   
   ☕ EVENING SNACK
   • [Snack details]
   • Calories: ~XXX kcal
   
   🌙 DINNER
   • [Meal name and brief description]
   • Calories: ~XXX kcal
   
   📊 Total Daily Calories: ~XXXX kcal

3. KEY NUTRITIONAL BENEFITS
   List 4-5 key benefits of this meal plan for their specific goals

4. IMPORTANT TIPS
   Provide 3-4 practical tips for success

Make sure all meals are:
- 100% vegetarian (no meat, fish, or poultry)
- Nutritionally balanced with adequate protein, carbs, and healthy fats
- Practical and easy to prepare
- Aligned with their specific health goal
- Include variety and different cuisines

Use emojis and clear formatting for better readability.`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return text
  } catch (error) {
    console.error('Error generating meal plan:', error)
    throw new Error('Failed to generate meal plan')
  }
}

export async function generateGroceryList(mealPlan) {
  const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

  const prompt = `From the following meal plan, extract a comprehensive grocery shopping list.
                    
Organize the list into these categories:
1. 🥬 Fresh Produce
2. 🌾 Grains & Legumes  
3. 🥛 Dairy & Alternatives
4. 🧂 Spices & Condiments
5. 🥫 Pantry Staples

For each item, estimate the quantity needed for the week.

Meal Plan:
${mealPlan}

Format the output clearly with category headers and bullet points.`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating grocery list:', error)
    throw new Error('Failed to generate grocery list')
  }
}

