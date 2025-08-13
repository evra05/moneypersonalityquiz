// Main Application Logic
// This file handles the overall app flow and initialization

// Import other modules
import { initializeQuestions } from './questions.js';
import { calculatePersonalityType } from './scoring.js';
import { saveToAirtable } from './airtable.js';

// App state
let currentUser = null;
let currentQuestion = 0;
let answers = [];

// Initialize the application
function initApp() {
    console.log('Money Personality Test App Initialized');
    setupEventListeners();
    loadQuestions();
}

// Setup event listeners
function setupEventListeners() {
    // Start test button
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startTest);
    }

    // Back button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', goBack);
    }

    // Retake button
    const retakeBtn = document.getElementById('retake-btn');
    if (retakeBtn) {
        retakeBtn.addEventListener('click', retakeTest);
    }

    // Share button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
}

// Start the test
function startTest() {
    // Show user data collection form first
    showUserForm();
}

// Show user data collection form
function showUserForm() {
    // TODO: Implement user form display
    console.log('Show user form');
}

// Load questions from data
function loadQuestions() {
    // Questions will be loaded from questions.js
    console.log('Loading questions...');
}

// Export functions for use in other modules
export { initApp, startTest, currentUser }; 