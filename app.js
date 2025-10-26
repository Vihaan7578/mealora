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
    
    const lowerText = text.toLowerCase().trim();
    
    // Allow "none" and its synonyms in optional fields
    const noneKeywords = ['none', 'nil', 'nothing', 'na', 'n/a', 'not applicable', 'no', "don't have", "don't", 'no allergies', 'no preferences'];
    if (noneKeywords.includes(lowerText)) {
        return ''; // Return empty string to indicate "none"
    }
    
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
        'allergic', 'allergy', 'intolerant', 'cannot eat', 'avoid eating', 'sensitivity', 'react',
        // Health Conditions
        'diabetes', 'diabetic', 'blood pressure', 'bp', 'hypertension', 'low bp',
        'pcos', 'thyroid', 'hypothyroidism', 'hyperthyroidism', 'pregnancy',
        // Dietary Preferences
        'vegan', 'vegetarian', 'non-veg', 'non vegetarian', 'ovo', 'lacto', 'jain', 'satvik', 'pure veg',
        // Grains & Cereals
        'rice', 'basmati', 'dosa rice', 'idli rice', 'brown rice', 'red rice', 'wheat', 'atta', 'whole wheat', 'maida',
        'rava', 'sooji', 'semolina', 'besan', 'gram flour', 'pohe', 'poha', 'aval', 'poha',
        'jowar', 'sorghum', 'bajra', 'pearl millet', 'nachni', 'ragi', 'finger millet', 'kuttu', 'buckwheat',
        'amaranth', 'rajgira', 'quinoa', 'barley', 'jaw', 'corn', 'makka', 'cornflour', 'cornflakes',
        // Lentils & Pulses (Daals)
        'dal', 'daal', 'lentil', 'pulse', 'legumes', 'toor dal', 'arhar dal', 'pigeon pea',
        'moong dal', 'green gram', 'masoor dal', 'red lentil', 'chana dal', 'split chickpea', 'bengal gram',
        'urad dal', 'black gram', 'masoor', 'toor', 'moong', 'chana', 'urad',
        'rajma', 'kidney beans', 'chole', 'kabuli chana', 'white chickpeas', 'black chana', 'kala chana',
        'lobia', 'black eyed peas', 'matar', 'green peas', 'fresh peas', 'dry peas', 'vatana',
        'chawli', 'cowpeas', 'sprouts', 'moong sprouts', 'chana sprouts',
        // Vegetables (Sabzi)
        'potato', 'aloo', 'batata', 'onion', 'pyaaz', 'shallot', 'garlic', 'lehsun', 'ginger', 'adrak',
        'tomato', 'tamatar', 'capsicum', 'shimla mirch', 'bell pepper', 'chilli', 'mirch', 'green chilli', 'hari mirch',
        'cauliflower', 'gobhi', 'phool gobhi', 'cabbage', 'band gobhi', 'patta gobhi',
        'broccoli', 'bhindi', 'okra', 'ladyfinger', 'brinjal', 'baingan', 'eggplant', 'aubergine',
        'cucumber', 'kheera', 'kakdi', 'radish', 'mooli', 'carrot', 'gajar', 'beetroot', 'chuqandar',
        'pumpkin', 'kaddu', 'kashifal', 'bitter gourd', 'karela', 'ridge gourd', 'tori', 'turai', 'luffa',
        'bottle gourd', 'lauki', 'dudhi', 'tuvar', 'ivy gourd', 'tindora', 'round gourd', 'tinda',
        'snake gourd', 'padwal', 'chichinda', 'ash gourd', 'petha', 'wax gourd', 'white pumpkin',
        'spinach', 'palak', 'fenugreek', 'methi', 'collard greens', 'saag', 'mustard greens', 'sarson',
        'bathua', 'lamb quarters', 'amaranth leaves', 'chaulai', 'thotakura', 'colocasia', 'arbi', 'arvi',
        'raw banana', 'kaccha kela', 'plantain', 'yam', 'ratalu', 'suran', 'elephant foot yam',
        'cluster beans', 'guvar', 'guar', 'drumstick', 'sahjan', 'moringa', 'green beans', 'french beans', 'beans',
        'peas', 'matar', 'snap peas', 'snow peas', 'corn', 'bhutta', 'baby corn', 'mushroom', 'khumb',
        'chilli', 'pepper', 'mirch', 'papad', 'papadum', 'pickle', 'achaar',
        // Leafy Vegetables
        'lettuce', 'cabbage', 'radish leaves', 'mooli ke patte', 'turnip', 'shalgam', 'kohlrabi', 'knol khol',
        'celery', 'ajwain leaves', 'ajmoda', 'parsley', 'pudina', 'mint', 'dhaniya', 'coriander', 'cilantro',
        'basil', 'tulsi', 'curry leaves', 'kadi patta', 'bay leaves', 'tej patta', 'spring onion', 'hara pyaaz',
        'spinach', 'palak', 'bathua', 'chaulai', 'methi', 'fenugreek leaves', 'sarson', 'mustard leaves',
        'amaranth leaves', 'ponnaganti', 'dill', 'soya', 'sabsige', 'sorrel', 'ambat chuka', 'purslane',
        // Fruits
        'apple', 'seb', 'banana', 'kela', 'mango', 'aam', 'sweet lime', 'mosambi', 'orange', 'santra', 'narangi',
        'guava', 'amrood', 'peru', 'papaya', 'papita', 'pomegranate', 'anar', 'grapefruit', 'chakotra',
        'watermelon', 'tarbooj', 'kalingada', 'muskmelon', 'kharbuja', 'cantaloupe', 'rock melon',
        'peach', 'aadu', 'plum', 'aloo bukhara', 'apricot', 'khubani', 'jamun', 'java plum', 'black plum',
        'litchi', 'amrud', 'star fruit', 'kamrakh', 'wood apple', 'bael', 'custard apple', 'sitaphal',
        'jackfruit', 'kathal', 'pineapple', 'ananas', 'coconut', 'nariyal', 'tender coconut', 'nariyal pani',
        'grapes', 'angur', 'kiwi', 'avocado', 'figs', 'anjeer', 'dates', 'khajur', 'raisins', 'kishmish',
        'almonds', 'badam', 'cashews', 'kaju', 'pistachio', 'pista', 'walnuts', 'akhrot', 'hazelnuts', 'pista',
        'peanuts', 'mungphali', 'groundnut', 'peanut butter', 'sunflower seeds', 'surajmukhi', 'pumpkin seeds', 'kaddu ke beej',
        'flax seeds', 'alsi', 'chia seeds', 'til', 'sesame seeds', 'gajar beej', 'carrot seeds',
        'chia', 'basil seeds', 'sabja', 'pomegranate seeds', 'anar dana',
        // Dairy Products
        'milk', 'doodh', 'curd', 'dahi', 'yogurt', 'buttermilk', 'chaas', 'lassi', 'lassi',
        'paneer', 'cottage cheese', 'cheese', 'butter', 'makhan', 'ghee', 'clarified butter',
        'cream', 'malai', 'cream cheese', 'mascarpone', 'yogurt', 'greek yogurt', 'hung curd', 'chakka',
        'milk powder', 'khoya', 'mawa', 'condensed milk', 'rabdi', 'basundi', 'shrikhand',
        // Oils & Fats
        'oil', 'refined oil', 'sunflower oil', 'mustard oil', 'sarson ka tel', 'sesame oil', 'til ka tel',
        'coconut oil', 'nariyal ka tel', 'groundnut oil', 'peanut oil', 'mungphali ka tel',
        'olive oil', 'jaitun ka tel', 'rice bran oil', 'soybean oil', 'gingerly oil', 'til',
        'ghee', 'clarified butter', 'vanaspati', 'dalda', 'butter', 'makhan',
        // Spices & Condiments
        'salt', 'namak', 'black salt', 'kala namak', 'rock salt', 'sendha namak', 'table salt',
        'sugar', 'chini', 'white sugar', 'brown sugar', 'gud', 'jaggery', 'gur', 'honey', 'shahad', 'madhu',
        'turmeric', 'haldi', 'cumin', 'jeera', 'coriander', 'dhaniya', 'dhaniya powder', 'coriander powder',
        'garam masala', 'cardamom', 'elaichi', 'green cardamom', 'hari elaichi', 'black cardamom', 'badi elaichi',
        'cinnamon', 'dalchini', 'cloves', 'laung', 'lavang', 'star anise', 'chakra phool', 'black pepper', 'kali mirch',
        'red chilli', 'lal mirch', 'chilli powder', 'red chilli powder', 'pepper', 'kali mirch powder',
        'asafoetida', 'hing', 'devil\'s dung', 'fenugreek seeds', 'methi dana', 'mustard seeds', 'rai', 'sarson',
        'fennel', 'saunf', 'cumin seeds', 'jeera', 'carom seeds', 'ajwain', 'caraway', 'shahi jeera',
        'bay leaves', 'tej patta', 'curry leaves', 'kadi patta', 'mint', 'pudina', 'oregano', 'ajwain',
        'dill', 'soya', 'fennel', 'anise', 'nigella', 'kalonji', 'mangrail', 'onion seeds',
        'sesame', 'til', 'poppy seeds', 'khus khus', 'kas kas', 'star anise', 'chakra phool',
        'nutmeg', 'jaiphal', 'mace', 'javitri', 'dry ginger', 'saunth', 'amchur', 'dry mango powder', 'khatai',
        'tamarind', 'imli', 'kokum', 'kukum', 'dry kokum', 'amchur', 'lemon', 'nimbu', 'lime',
        'lemon juice', 'nimbu ka ras', 'vinegar', 'sirka', 'soy sauce', 'tomato ketchup', 'mustard sauce',
        // Indian Dishes & Preparations
        'roti', 'chapati', 'phulka', 'naan', 'paratha', 'poori', 'bhatura', 'kulcha', 'missi roti', 'makke ki roti',
        'tandoori roti', 'rumali roti', 'lachha paratha', 'aloo paratha', 'gobhi paratha', 'mooli paratha',
        'methi paratha', 'paneer paratha', 'onion kulcha', 'amritsari kulcha', 'garlic naan', 'butter naan',
        'pav', 'bun', 'pav bhaji', 'vada pav', 'dabeli', 'misal pav', 'bread', 'double roti',
        'dal', 'sambar', 'rasam', 'dal fry', 'dal tadka', 'dal makhani', 'ma ki dal', 'dal panchmel',
        'tadka dal', 'dal curry', 'mix dal', 'toor dal', 'arhar ki dal', 'moong dal', 'chana dal',
        'urad dal', 'masoor dal', 'dal chawal', 'dal bati', 'dal dhokli', 'rajma', 'rajma masala',
        'chana masala', 'chole', 'kadala curry', 'chana curry', 'chickpea curry', 'chole bhature',
        'kala chana', 'channa', 'sundal', 'chana chaat', 'samosa', 'samos', 'kachori', 'bhatia',
        'dhokla', 'idli', 'dosa', 'uttapam', 'pongal', 'upma', 'poha', 'avalakki', 'avil',
        'sevai', 'vermicelli', 'semiya', 'ravai', 'appam', 'string hoppers', 'puttu', 'kerala breakfast',
        'biryani', 'veg biryani', 'pulao', 'pulaav', 'fried rice', 'jeera rice', 'tamarind rice', 'puliyogare',
        'lemon rice', 'nimbu rice', 'curd rice', 'dahi rice', 'bisi bele bath', 'khichdi', 'khichri', 'khichuri',
        'dal khichdi', 'moong dal khichdi', 'bisi bele bath', 'karnataka special', 'ven pongal', 'kichadi',
        'vegetable pulao', 'veggie pulao', 'mutter pulao', 'green peas pulao', 'coconut rice',
        'sabzi', 'sabji', 'curry', 'vegetable curry', 'mixed vegetable', 'pav bhaji', 'mixed bhaji',
        'aloo gobhi', 'potato cauliflower', 'matar paneer', 'paneer matar', 'paneer butter masala', 'paneer makhani',
        'palak paneer', 'spinach with cottage cheese', 'mutter paneer', 'kadhai paneer', 'shahi paneer',
        'paneer tikka', 'paneer lababdar', 'paneer kofta', 'paneer butter masala', 'paneer capsicum',
        'aloo palak', 'potato spinach', 'aloo matar', 'potato peas', 'aloo bhindi', 'potato okra',
        'bhindi masala', 'okra curry', 'baingan bharta', 'brinjal bharta', 'ennegayi', 'stuffed brinjal',
        'gutti vankaya', 'bharwa baingan', 'aloo baingan', 'dum aloo', 'potato curry', 'potato sabzi',
        'mushroom masala', 'mushroom curry', 'gobi manchurian', 'cauliflower manchurian',
        'aloo gobi', 'cauliflower potato', 'alu gobi', 'gobi dry', 'cabbage curry', 'band gobhi sabzi',
        'lauki sabzi', 'bottle gourd curry', 'turai sabzi', 'ridge gourd curry', 'tinda sabzi', 'round gourd',
        'karela sabzi', 'bitter gourd curry', 'kadu ka khatta', 'pumpkin curry', 'channa saag',
        'kofta', 'vegetable kofta', 'malai kofta', 'lauki kofta', 'bottle gourd kofta', 'bhindi fry',
        'okra fry', 'rajma masala', 'kidney beans curry', 'rajma chawal', 'rajma recipe',
        'paneer curry', 'cottage cheese curry', 'soya curry', 'soya chunks curry', 'nutrela',
        'green moong curry', 'hari moong sabzi', 'toor dal sabzi', 'arhar dal sabzi',
        'methi malai matar', 'fenugreek curry', 'methi chicken substitute', 'methi thepla', 'methi paratha',
        'sabudana', 'sago', 'sabudana khichdi', 'sabudana vada', 'sabudana kheer', 'tapioca',
        'tapioca pearl', 'veg sandwich', 'grilled sandwich', 'paneer sandwich', 'veg burger',
        'pav bhaji', 'masala pav', 'butter pav', 'corn sandwich', 'aloo sandwich',
        'spring roll', 'veg spring roll', 'samosa', 'aloo samosa', 'mutter samosa', 'onion samosa',
        'kachori', 'matar kachori', 'khasta kachori', 'daal kachori', 'pyaz ki kachori',
        'pakora', 'onion pakora', 'aloo pakora', 'bhind pakora', 'bread pakora', 'mirch pakora',
        'gobi pakora', 'mirchi pakora', 'chana pakora', 'besan pakora', 'mango pickle',
        'veggie pakora', 'bhajiya', 'onion bhajiya', 'mirchi bhajiya', 'brinjal fry', 'baingan fry',
        'baton', 'barfi', 'halwa', 'sheera', 'kheer', 'payasam', 'firni', 'zarda',
        'gulab jamun', 'rasgulla', 'rasmalai', 'barfi', 'peda', 'kaju katli', 'kaju barfi',
        'besan ladoo', 'motichoor ladoo', 'coconut ladoo', 'nariyal laddu', 'gajar halwa', 'carrot halwa',
        'gaajar halwa', 'moong dal halwa', 'badam halwa', 'doodh halwa', 'sheera', 'suji halwa',
        'kachori halwa', 'sabudana halwa', 'doodh peda', 'rabdi', 'basundi', 'kulfi', 'raita',
        'boondi raita', 'pudina raita', 'cucumber raita', 'onion raita', 'banana raita',
        'papad', 'roasted papad', 'fried papad', 'papad curry', 'veg thali', 'combo meal',
        'combo', 'thaali', 'mixed thali', 'veg platter', 'indian thali',
        // Snacks & Street Food
        'chaat', 'sweet corn', 'bhutta', 'pav bhaji', 'vada pav', 'bhel puri', 'sev puri',
        'dahi puri', 'paani puri', 'golgappa', 'sev puri', 'ragda pattice', 'dah vada',
        'poha', 'poha upma', 'avalakki', 'poha recipe', 'batata vada', 'bombay vada pav',
        'dahi vada', 'aloo tikki', 'potato tikki', 'matar kulcha', 'chole kulche',
        'dosa', 'masala dosa', 'onion dosa', 'plain dosa', 'podi dosa', 'uttapam', 'rava dosa',
        'rice dosa', 'semiya dosa', 'kal dosa', 'egg dosa', 'paneer dosa', 'onion uttapam',
        'idli', 'sambar idli', 'fried idli', 'rava idli', 'rice idli', 'kanchipuram idli',
        'paddu', 'gundpongalu', 'ponganalu', 'appe', 'apam', 'dhokla', 'khaman dhokla',
        'white dhokla', 'rice dhokla', 'besan dhokla', 'khandvi', 'patra', 'aloo vadi',
        'moong dal dhokla', 'adda pongal', 'ven pongal', 'khara pongal', 'pongal recipe',
        'upma', 'rava upma', 'suji upma', 'vegetable upma', 'bread upma', 'corn upma',
        'coconut chutney', 'dahi chutney', 'onion chutney', 'tomato chutney', 'peanut chutney',
        'green chutney', 'pudina chutney', 'mint chutney', 'dhaniya chutney', 'coriander chutney',
        'coconut chutney', 'nariyal chutney', 'til chutney', 'sesame chutney', 'ginger chutney', 'adrak chutney',
        'pickle', 'achaar', 'mango pickle', 'limbo pickle', 'nimbu ka achaar', 'amla pickle', 'aamla achar',
        'lemon pickle', 'mirch pickle', 'green chilli pickle', 'chilli pickle', 'onion pickle',
        'carrot pickle', 'gajar ka achaar', 'garlic pickle', 'lehsun ka achaar', 'mix pickle', 'mixed achaar',
        // Beverages
        'chai', 'tea', 'masala chai', 'ginger tea', 'adrak chai', 'lemon tea', 'nimbu chai',
        'coffee', 'kaapi', 'filter coffee', 'milk coffee', 'black coffee', 'cold coffee',
        'lassi', 'sweet lassi', 'salted lassi', 'mango lassi', 'chocolate lassi', 'strawberry lassi',
        'chaas', 'buttermilk', 'salted buttermilk', 'sweet buttermilk', 'jeera chaas', 'cumin buttermilk',
        'lassi', 'yogurt drink', 'jal jeera', 'cumin water', 'fruit juice', 'mix fruit juice',
        'mango juice', 'orange juice', 'sweet lime juice', 'mosambi juice', 'watermelon juice',
        'coconut water', 'tender coconut', 'nariyal paani', 'dab', 'coconut drink',
        'shikanji', 'nimbu pani', 'lemonade', 'sugarcane juice', 'ganne ka ras',
        'milkshake', 'banana shake', 'mango shake', 'papaya shake', 'badam shake', 'almond shake',
        'horlicks', 'bournvita', 'complan', 'boost', 'malt drink', 'energy drink',
        // Regional Specialties
        'gujarati thaali', 'rajasthani thaali', 'punjabi thaali', 'south indian thaali',
        'bengali thaali', 'maharashtrian thaali', 'hyderabadi biryani', 'lucknowi biryani',
        'amritsari kulcha', 'kerala sadya', 'onam sadya', 'bengali khichuri',
        'maharashtrian misal', 'gujarati dhokla', 'tamil pongal', 'andhra pachadi',
        // Cooking Terms & Methods
        'tadka', 'chhonk', 'tempering', 'bhuno', 'bhunna', 'saute', 'fry', 'deep fry',
        'stir fry', 'sabzi', 'curry', 'gravy', 'masala', 'spice mix', 'masala powder',
        'dum', 'dum cooking', 'pressure cook', 'pressure cooker', 'bhap', 'steam',
        'roast', 'bake', 'grill', 'tandoor', 'kadhai', 'wok', 'tawa', 'pan',
        'deep fry', 'shallow fry', 'stir fry', 'saute', 'braise', 'boil', 'blanch',
        // Measurements & Quantities
        'katori', 'bowl', 'cup', 'glass', 'tbsp', 'tablespoon', 'tsp', 'teaspoon',
        'pinch', 'chutki', 'kg', 'kilogram', 'gram', 'gm', 'g', 'piece', 'ek',
        'do', 'teen', 'two', 'three', 'four', 'paanch', 'chaar', 'some', 'little bit',
        'hari thor', 'thoda', 'zara', 'enough', 'bhar', 'fil', 'fully', 'completely',
        // Meal Times
        'breakfast', 'nashta', 'subah', 'morning', 'lunch', 'dopahar', 'afternoon',
        'dinner', 'raat ka khana', 'night', 'snacks', 'nasta', 'evening snacks',
        'bedtime', 'sone se pehle', 'mid night snack', 'drinks', 'beverages'
    ];
    
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

// Health Condition Validation
function validateHealthCondition(text, type) {
    if (!text) return ''; // Empty is allowed
    
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
            console.warn('🚫 Prohibited pattern detected in health condition, rejecting input:', text);
            return null;
        }
    }
    
    // Valid health condition keywords
    const chronicHealthKeywords = [
        'diabetes', 'diabetic', 'type 1 diabetes', 'type 2 diabetes', 'type-1', 'type-2',
        'blood pressure', 'bp', 'high blood pressure', 'low blood pressure', 'hypertension', 'hypotension',
        'pcos', 'polycystic ovary syndrome',
        'thyroid', 'hypothyroidism', 'hyperthyroidism', 'hashimoto', 'graves',
        'heart', 'cardiac', 'cardiovascular',
        'cholesterol', 'high cholesterol', 'lipid',
        'obesity', 'overweight',
        'depression', 'anxiety',
        'arthritis', 'osteoarthritis', 'rheumatoid',
        'anemia', 'iron deficiency',
        'ibs', 'irritable bowel syndrome',
        'celiac', 'gluten',
        'kidney', 'renal',
        'liver',
        'asthma',
        'migraine'
    ];
    
    const temporaryHealthKeywords = [
        'fever', 'cold', 'flu', 'infection',
        'weakness', 'fatigue', 'tiredness',
        'headache', 'head ache',
        'cough', 'sore throat',
        'nausea', 'vomiting',
        'diarrhea', 'constipation',
        'stomach ache', 'stomachache', 'abdominal pain',
        'dizziness',
        'loss of appetite', 'appetite loss'
    ];
    
    const validKeywords = type === 'chronic' ? chronicHealthKeywords : temporaryHealthKeywords;
    
    const lowerText = text.toLowerCase();
    const hasValidKeyword = validKeywords.some(keyword => 
        lowerText.includes(keyword.toLowerCase())
    );
    
    if (!hasValidKeyword) {
        console.warn('🚫 No valid health condition keywords found, rejecting input:', text);
        return null;
    }
    
    // Layer 2: Suspicious patterns
    const suspiciousPatterns = [
        /\b(create|make|generate|show|display|write)\s+.*\s+(for|about|of)\s+(your|my)\s*(mom|mother|dad|father|family)\b/gi,
        /\byears?\s+(old|ago|back)\b/gi,
        /\b(period|duration|span)\s+of\s+\d+\s+years\b/gi
    ];
    
    for (let pattern of suspiciousPatterns) {
        if (pattern.test(text)) {
            console.warn('🚫 Suspicious pattern detected in health condition, rejecting input:', text);
            return null;
        }
    }
    
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


