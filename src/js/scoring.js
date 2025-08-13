// Scoring Module
// Handles personality type calculation based on question responses

// Personality types and their descriptions
const personalityTypes = {
    "Saver": {
        title: "Penyimpan (Saver)",
        icon: "fas fa-piggy-bank",
        description: "You are a natural saver who values financial security and planning for the future. You prefer to save money and make thoughtful spending decisions.",
        recommendations: [
            "Continue your excellent saving habits",
            "Consider setting up automatic savings",
            "Learn about investment options for your savings"
        ]
    },
    "Spender": {
        title: "Pemboros (Spender)",
        icon: "fas fa-shopping-cart",
        description: "You enjoy spending money and find pleasure in buying things. You tend to spend money quickly and may need help with budgeting.",
        recommendations: [
            "Try creating a budget to track your spending",
            "Set aside money for savings before spending",
            "Consider waiting 24 hours before making big purchases"
        ]
    },
    "Giver": {
        title: "Pemurah (Giver)",
        icon: "fas fa-heart",
        description: "You are generous and enjoy helping others financially. You find joy in giving and supporting those around you.",
        recommendations: [
            "Your generosity is wonderful - keep helping others",
            "Make sure to save some money for yourself too",
            "Consider volunteering time as well as money"
        ]
    },
    "Money Avoider": {
        title: "Pengelak Duit (Money Avoider)",
        icon: "fas fa-eye-slash",
        description: "You prefer to avoid thinking about money and financial matters. You may need encouragement to engage with financial planning.",
        recommendations: [
            "Start with small steps - track your spending for a week",
            "Learn about basic money management",
            "Consider talking to a trusted adult about money"
        ]
    },
    "Status Seeker": {
        title: "Pengejar Status (Status Seeker)",
        icon: "fas fa-crown",
        description: "You value status and prestige, often choosing expensive items to show your position. You care about how others perceive your wealth.",
        recommendations: [
            "Focus on what makes you happy, not what impresses others",
            "Consider the value of experiences over expensive items",
            "Learn to appreciate quality over brand names"
        ]
    }
};

// Calculate scores based on answers
function calculateScores(answers) {
    const scores = {
        "Saver": 0,
        "Spender": 0,
        "Giver": 0,
        "Money Avoider": 0,
        "Status Seeker": 0
    };
    
    // Calculate scores based on question numbers from PersonalityTest.md
    // Questions 1-4: Saver
    // Questions 5-8: Spender
    // Questions 9-12: Giver
    // Questions 13-16: Money Avoider
    // Questions 17-20: Status Seeker
    
    answers.forEach((answer, index) => {
        if (answer === true) { // "Yes" answer
            if (index >= 0 && index <= 3) scores.Saver++;
            else if (index >= 4 && index <= 7) scores.Spender++;
            else if (index >= 8 && index <= 11) scores.Giver++;
            else if (index >= 12 && index <= 15) scores["Money Avoider"]++;
            else if (index >= 16 && index <= 19) scores["Status Seeker"]++;
        }
    });
    
    return scores;
}

// Calculate personality type based on highest score
function calculatePersonalityType(answers) {
    const scores = calculateScores(answers);
    
    let maxScore = 0;
    let maxType = "Saver";
    
    for (const [type, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            maxType = type;
        }
    }
    
    return {
        type: maxType,
        scores: scores,
        maxScore: maxScore
    };
}

// Get personality type details
function getPersonalityDetails(type) {
    return personalityTypes[type] || null;
}

// Display results
function displayResults(personalityResult) {
    const { type, scores } = personalityResult;
    const details = getPersonalityDetails(type);
    
    if (!details) return;
    
    // Update personality icon
    const personalityIcon = document.getElementById('personality-icon');
    if (personalityIcon) {
        personalityIcon.innerHTML = `<i class="${details.icon}"></i>`;
    }
    
    // Update personality title
    const personalityTitle = document.getElementById('personality-title');
    if (personalityTitle) {
        personalityTitle.textContent = details.title;
    }
    
    // Update personality description
    const personalityDescription = document.getElementById('personality-description');
    if (personalityDescription) {
        // Convert \n\n to HTML paragraph breaks
        const formattedDescription = details.description.replace(/\n\n/g, '</p><p>');
        personalityDescription.innerHTML = `<p>${formattedDescription}</p>`;
    }
    
    // Log scores for debugging
    console.log('Personality Scores:', scores);
    console.log('Final Type:', type);
}

// Export functions
export { 
    calculateScores, 
    calculatePersonalityType, 
    getPersonalityDetails, 
    displayResults,
    personalityTypes 
}; 