// Airtable Integration Module
// Handles saving user data and results to Airtable

// Airtable configuration
const AIRTABLE_CONFIG = {
    BASE_ID: '', // Will be set from environment variables
    API_KEY: '', // Will be set from environment variables
    TABLES: {
        USERS: 'Users',
        QUESTIONS: 'Questions',
        RESULTS: 'Results'
    }
};

// Initialize Airtable configuration
function initAirtable() {
    // Load configuration from environment or config file
    // This will be implemented when we set up the config files
    console.log('Airtable integration initialized');
}

// Save user data to Airtable
async function saveUser(userData) {
    try {
        const { name, email } = userData;
        
        const userRecord = {
            fields: {
                'Name': name,
                'Email': email
            }
        };
        
        // TODO: Implement actual Airtable API call
        console.log('Saving user to Airtable:', userRecord);
        
        return {
            success: true,
            userRecord: userRecord
        };
    } catch (error) {
        console.error('Error saving user:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Save test results to Airtable
async function saveResults(userEmail, answers, scores, finalPersonality) {
    try {
        const resultRecord = {
            fields: {
                'User Email': userEmail,
                'Answers (JSON)': JSON.stringify(answers),
                'Saver Score': scores.Saver || 0,
                'Spender Score': scores.Spender || 0,
                'Giver Score': scores.Giver || 0,
                'Money Avoider Score': scores['Money Avoider'] || 0,
                'Status Seeker Score': scores['Status Seeker'] || 0,
                'Final Personality': finalPersonality
            }
        };
        
        // TODO: Implement actual Airtable API call
        console.log('Saving results to Airtable:', resultRecord);
        
        return {
            success: true,
            resultRecord: resultRecord
        };
    } catch (error) {
        console.error('Error saving results:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Save questions to Airtable (for admin use)
async function saveQuestions(questions) {
    try {
        const questionRecords = questions.map(question => ({
            fields: {
                'Question No.': question.id,
                'Question': question.text,
                'Personality Type': question.type
            }
        }));
        
        // TODO: Implement actual Airtable API call
        console.log('Saving questions to Airtable:', questionRecords.length, 'questions');
        
        return {
            success: true,
            questionRecords: questionRecords
        };
    } catch (error) {
        console.error('Error saving questions:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Get questions from Airtable (if needed)
async function getQuestions() {
    try {
        // TODO: Implement actual Airtable API call to fetch questions
        console.log('Fetching questions from Airtable');
        
        return {
            success: true,
            questions: [] // Will be populated from Airtable
        };
    } catch (error) {
        console.error('Error fetching questions:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Main function to save complete test data
async function saveToAirtable(userData, answers, personalityResult) {
    try {
        // Save user first
        const userResult = await saveUser(userData);
        if (!userResult.success) {
            throw new Error('Failed to save user data');
        }
        
        // Calculate scores
        const scores = calculateScores(answers);
        
        // Save results
        const resultsResult = await saveResults(
            userData.email,
            answers,
            scores,
            personalityResult.type
        );
        
        if (!resultsResult.success) {
            throw new Error('Failed to save results');
        }
        
        return {
            success: true,
            userRecord: userResult.userRecord,
            resultRecord: resultsResult.resultRecord
        };
        
    } catch (error) {
        console.error('Error saving to Airtable:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Import scoring function (will be moved to proper import when modules are set up)
function calculateScores(answers) {
    const scores = {
        "Saver": 0,
        "Spender": 0,
        "Giver": 0,
        "Money Avoider": 0,
        "Status Seeker": 0
    };
    
    answers.forEach((answer, index) => {
        if (answer === true) {
            if (index >= 0 && index <= 3) scores.Saver++;
            else if (index >= 4 && index <= 7) scores.Spender++;
            else if (index >= 8 && index <= 11) scores.Giver++;
            else if (index >= 12 && index <= 15) scores["Money Avoider"]++;
            else if (index >= 16 && index <= 19) scores["Status Seeker"]++;
        }
    });
    
    return scores;
}

// Export functions
export { 
    initAirtable,
    saveUser,
    saveResults,
    saveQuestions,
    getQuestions,
    saveToAirtable
}; 