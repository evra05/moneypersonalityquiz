// Questions Module
// Handles question data and display logic

// Question data based on PersonalityTest.md specifications
const questions = [
    // Saver Questions (1-4)
    { id: 1, text: "Do you save part of your allowance every week?", type: "Saver" },
    { id: 2, text: "Do you keep track of your spending in a notebook or app?", type: "Saver" },
    { id: 3, text: "Do you prefer to buy things on sale rather than at full price?", type: "Saver" },
    { id: 4, text: "Do you think about the future when making money decisions?", type: "Saver" },
    
    // Spender Questions (5-8)
    { id: 5, text: "Do you spend money as soon as you receive it?", type: "Spender" },
    { id: 6, text: "Do you often buy things you don't really need?", type: "Spender" },
    { id: 7, text: "Do you prefer buying expensive brands over cheaper alternatives?", type: "Spender" },
    { id: 8, text: "Do you feel excited when you get money to spend?", type: "Spender" },
    
    // Giver Questions (9-12)
    { id: 9, text: "Do you give money to friends when they need it?", type: "Giver" },
    { id: 10, text: "Do you donate to charity or help others financially?", type: "Giver" },
    { id: 11, text: "Do you enjoy buying gifts for others?", type: "Giver" },
    { id: 12, text: "Do you feel happy when you can help someone with money?", type: "Giver" },
    
    // Money Avoider Questions (13-16)
    { id: 13, text: "Do you avoid talking about money with others?", type: "Money Avoider" },
    { id: 14, text: "Do you feel uncomfortable when people ask about your finances?", type: "Money Avoider" },
    { id: 15, text: "Do you prefer not to think about money matters?", type: "Money Avoider" },
    { id: 16, text: "Do you avoid making financial decisions?", type: "Money Avoider" },
    
    // Status Seeker Questions (17-20)
    { id: 17, text: "Do you buy things to impress others?", type: "Status Seeker" },
    { id: 18, text: "Do you prefer expensive items to show your status?", type: "Status Seeker" },
    { id: 19, text: "Do you care about what brand of clothes you wear?", type: "Status Seeker" },
    { id: 20, text: "Do you want others to know when you have money?", type: "Status Seeker" }
];

// Initialize questions
function initializeQuestions() {
    console.log('Questions initialized:', questions.length);
    return questions;
}

// Display current question
function displayQuestion(questionIndex) {
    if (questionIndex >= 0 && questionIndex < questions.length) {
        const question = questions[questionIndex];
        const questionText = document.getElementById('question-text');
        
        if (questionText) {
            questionText.textContent = question.text;
        }
        
        // Update progress
        updateProgress(questionIndex + 1, questions.length);
        
        return question;
    }
    return null;
}

// Update progress bar and text
function updateProgress(current, total) {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill) {
        const percentage = (current / total) * 100;
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `Question ${current} of ${total}`;
    }
}

// Get question by index
function getQuestion(index) {
    return questions[index] || null;
}

// Get total number of questions
function getTotalQuestions() {
    return questions.length;
}

// Export functions
export { 
    initializeQuestions, 
    displayQuestion, 
    updateProgress, 
    getQuestion, 
    getTotalQuestions,
    questions 
}; 