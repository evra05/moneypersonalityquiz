// Airtable Configuration
// Contains API settings and table configurations

// Airtable API Configuration
export const AIRTABLE_CONFIG = {
    // These will be loaded from environment variables in production
    BASE_ID: process.env.AIRTABLE_BASE_ID || '',
    API_KEY: process.env.AIRTABLE_API_KEY || '',
    
    // Table names as defined in PersonalityTest.md
    TABLES: {
        USERS: 'Users',
        QUESTIONS: 'Questions', 
        RESULTS: 'Results'
    },
    
    // API endpoints
    API_BASE_URL: 'https://api.airtable.com/v0',
    
    // Request headers
    getHeaders() {
        return {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json'
        };
    },
    
    // Get full API URL for a table
    getTableUrl(tableName) {
        return `${this.API_BASE_URL}/${this.BASE_ID}/${tableName}`;
    }
};

// Table field mappings based on PersonalityTest.md
export const TABLE_FIELDS = {
    USERS: {
        NAME: 'Name',
        EMAIL: 'Email'
    },
    
    QUESTIONS: {
        QUESTION_NO: 'Question No.',
        QUESTION: 'Question',
        PERSONALITY_TYPE: 'Personality Type'
    },
    
    RESULTS: {
        USER_EMAIL: 'User Email',
        ANSWERS_JSON: 'Answers (JSON)',
        SAVER_SCORE: 'Saver Score',
        SPENDER_SCORE: 'Spender Score',
        GIVER_SCORE: 'Giver Score',
        MONEY_AVOIDER_SCORE: 'Money Avoider Score',
        STATUS_SEEKER_SCORE: 'Status Seeker Score',
        FINAL_PERSONALITY: 'Final Personality'
    }
};

// Personality type options for Airtable
export const PERSONALITY_TYPES = [
    'Saver',
    'Spender', 
    'Giver',
    'Money Avoider',
    'Status Seeker'
];

// Validation functions for Airtable data
export const validateAirtableData = {
    // Validate user data
    user: (userData) => {
        const { name, email } = userData;
        return name && email && email.includes('@');
    },
    
    // Validate result data
    result: (resultData) => {
        const { userEmail, answers, scores, finalPersonality } = resultData;
        return userEmail && answers && scores && finalPersonality;
    },
    
    // Validate question data
    question: (questionData) => {
        const { questionNo, question, personalityType } = questionData;
        return questionNo && question && personalityType;
    }
};

// Error messages for Airtable operations
export const AIRTABLE_ERRORS = {
    INVALID_CONFIG: 'Airtable configuration is invalid. Please check your API key and base ID.',
    NETWORK_ERROR: 'Network error occurred while connecting to Airtable.',
    INVALID_DATA: 'Invalid data format for Airtable submission.',
    RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
    UNAUTHORIZED: 'Unauthorized access to Airtable. Please check your API key.',
    NOT_FOUND: 'Airtable base or table not found.'
};

// Export configuration
export default AIRTABLE_CONFIG; 