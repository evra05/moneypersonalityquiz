// Application Constants
// Global settings and configuration values

// App Information
export const APP_INFO = {
    NAME: 'Money Personality Test',
    VERSION: '1.0.0',
    DESCRIPTION: 'Discover your money personality type with our 20-question test',
    AUTHOR: 'Your Name',
    YEAR: '2025'
};

// Test Configuration
export const TEST_CONFIG = {
    TOTAL_QUESTIONS: 20,
    QUESTIONS_PER_TYPE: 4,
    PERSONALITY_TYPES: [
        'Saver',
        'Spender', 
        'Giver',
        'Money Avoider',
        'Status Seeker'
    ],
    SCORING: {
        YES_VALUE: 1,
        NO_VALUE: 0
    }
};

// Question Categories (based on PersonalityTest.md)
export const QUESTION_CATEGORIES = {
    SAVER: {
        name: 'Saver',
        questions: [1, 2, 3, 4],
        title: 'Penyimpan (Saver)',
        icon: 'fas fa-piggy-bank'
    },
    SPENDER: {
        name: 'Spender',
        questions: [5, 6, 7, 8],
        title: 'Pemboros (Spender)',
        icon: 'fas fa-shopping-cart'
    },
    GIVER: {
        name: 'Giver',
        questions: [9, 10, 11, 12],
        title: 'Pemurah (Giver)',
        icon: 'fas fa-heart'
    },
    MONEY_AVOIDER: {
        name: 'Money Avoider',
        questions: [13, 14, 15, 16],
        title: 'Pengelak Duit (Money Avoider)',
        icon: 'fas fa-eye-slash'
    },
    STATUS_SEEKER: {
        name: 'Status Seeker',
        questions: [17, 18, 19, 20],
        title: 'Pengejar Status (Status Seeker)',
        icon: 'fas fa-crown'
    }
};

// UI Configuration
export const UI_CONFIG = {
    ANIMATION_DURATION: 300,
    TRANSITION_DELAY: 500,
    PROGRESS_UPDATE_DELAY: 100,
    MESSAGE_DISPLAY_DURATION: 3000,
    ERROR_DISPLAY_DURATION: 5000
};

// Form Validation Rules
export const VALIDATION_RULES = {
    NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 50,
        PATTERN: /^[a-zA-Z\s]+$/
    },
    EMAIL: {
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
};

// Error Messages
export const ERROR_MESSAGES = {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_NAME: 'Please enter a valid name (2-50 characters)',
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    SAVE_ERROR: 'Failed to save your results. Please try again.',
    LOAD_ERROR: 'Failed to load questions. Please refresh the page.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
    USER_SAVED: 'User information saved successfully',
    RESULTS_SAVED: 'Test results saved successfully',
    TEST_COMPLETED: 'Test completed successfully!'
};

// Local Storage Keys
export const STORAGE_KEYS = {
    USER_DATA: 'money_personality_user',
    TEST_PROGRESS: 'money_personality_progress',
    TEST_ANSWERS: 'money_personality_answers',
    TEST_RESULTS: 'money_personality_results'
};

// API Endpoints (if using a backend)
export const API_ENDPOINTS = {
    USERS: '/api/users',
    QUESTIONS: '/api/questions',
    RESULTS: '/api/results',
    AIRTABLE: '/api/airtable'
};

// Feature Flags
export const FEATURES = {
    AIRTABLE_INTEGRATION: true,
    LOCAL_STORAGE: true,
    SHARE_RESULTS: true,
    RETAKES: true,
    PROGRESS_SAVING: true
};

// Development Configuration
export const DEV_CONFIG = {
    DEBUG_MODE: true,
    LOG_LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
    MOCK_AIRTABLE: false,
    AUTO_SAVE: true
};

// Export all constants
export default {
    APP_INFO,
    TEST_CONFIG,
    QUESTION_CATEGORIES,
    UI_CONFIG,
    VALIDATION_RULES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    STORAGE_KEYS,
    API_ENDPOINTS,
    FEATURES,
    DEV_CONFIG
}; 