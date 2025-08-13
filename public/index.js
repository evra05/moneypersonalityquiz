// User info state (no authentication)
let currentUser = null; // { name, email, phone }
let userProfile = null;

// Authentication removed



function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Helper functions for showing messages


function showErrorMessage(message) {
    // Remove any existing messages
    removeMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const currentForm = document.querySelector('.auth-form:not([style*="display: none"])');
    if (currentForm) {
        currentForm.insertBefore(errorDiv, currentForm.firstChild);
    }
}

function removeMessages() {
    const messages = document.querySelectorAll('.error-message');
    messages.forEach(msg => msg.remove());
}

// Initialize (no auth). Prefill user info if stored
function initializeAppNoAuth() {
    const nameInput = document.getElementById('user-name-input');
    const emailInput = document.getElementById('user-email-input');
    const phoneInput = document.getElementById('user-phone-input');
    try {
        const saved = JSON.parse(localStorage.getItem('mpq_user'));
        if (saved) {
            if (nameInput) nameInput.value = saved.name || '';
            if (emailInput) emailInput.value = saved.email || '';
            if (phoneInput) phoneInput.value = saved.phone || '';
        }
    } catch (_) {}
}

// Removed user info UI and signOut (no auth)

// Personality Test Questions (Bahasa Malaysia) - Based on Soalan Quiz.md
const questions = [
    // Penjimat/Saver - Questions 1-5
    {
        id: 1,
        text: "Saya rasa seronok bila duit saya makin banyak.",
        type: "Saver"
    },
    {
        id: 2,
        text: "Saya suka menabung daripada shopping.",
        type: "Saver"
    },
    {
        id: 3,
        text: "Saya akan fikir dulu sebelum beli sesuatu.",
        type: "Saver"
    },
    {
        id: 4,
        text: "Saya risau kalau duit saya habis.",
        type: "Saver"
    },
    {
        id: 5,
        text: "Saya akan guna duit bila betul-betul perlu sahaja.",
        type: "Saver"
    },

    // Pemboros/Spender - Questions 6-10
    {
        id: 6,
        text: "Saya akan terus beli bila nampak benda yang saya suka.",
        type: "Spender"
    },
    {
        id: 7,
        text: "Saya suka shopping guna duit saya.",
        type: "Spender"
    },
    {
        id: 8,
        text: "Walaupun saya tak perlukan sesuatu barang, saya tetap akan shopping.",
        type: "Spender"
    },
    {
        id: 9,
        text: "Saya suka shopping tanpa merancang.",
        type: "Spender"
    },
    {
        id: 10,
        text: "Saya rasa rugi kalau saya tak terus beli barang yang saya suka.",
        type: "Spender"
    },

    // Pemurah/Giver - Questions 11-15
    {
        id: 11,
        text: "Saya suka belikan hadiah untuk orang lain.",
        type: "Giver"
    },
    {
        id: 12,
        text: "Saya suka tolong orang guna duit saya sendiri seperti membelikan makanan untuk kawan.",
        type: "Giver"
    },
    {
        id: 13,
        text: "Saya rasa gembira bila buat orang lain gembira dengan hadiah saya.",
        type: "Giver"
    },
    {
        id: 14,
        text: "Saya suka berkongsi duit saya dengan orang lain.",
        type: "Giver"
    },
    {
        id: 15,
        text: "Saya akan bersedekah jika saya ada duit lebih.",
        type: "Giver"
    },

    // Pengelak Duit/Money Avoider - Questions 16-20
    {
        id: 16,
        text: "Saya jarang fikir pasal duit.",
        type: "Money Avoider"
    },
    {
        id: 17,
        text: "Saya malas nak kira duit.",
        type: "Money Avoider"
    },
    {
        id: 18,
        text: "Saya rasa duit tak penting sangat.",
        type: "Money Avoider"
    },
    {
        id: 19,
        text: "Saya tahu macam mana nak uruskan duit saya dengan betul.",
        type: "Money Avoider"
    },
    {
        id: 20,
        text: "Saya lebih gemar orang lain urus duit saya.",
        type: "Money Avoider"
    },

    // Pengejar Status/Status Seeker - Questions 21-25
    {
        id: 21,
        text: "Saya nak orang nampak saya hebat dengan barang yang saya ada.",
        type: "Status Seeker"
    },
    {
        id: 22,
        text: "Saya suka barang saya nampak mahal dan berjenama.",
        type: "Status Seeker"
    },
    {
        id: 23,
        text: "Saya sanggup beratur panjang untuk beli barang yang trending.",
        type: "Status Seeker"
    },
    {
        id: 24,
        text: "Saya suka orang terpegun dengan barang berjenama yang saya ada.",
        type: "Status Seeker"
    },
    {
        id: 25,
        text: "Jika kawan saya beli sesuatu barang, saya akan beli barang yang sama.",
        type: "Status Seeker"
    }
];

// Decimal scoring system constants
const DECIMAL_ANSWER_VALUES = {
    YA: 2.3,           // Strong agreement (was 2)
    KADANG_KADANG: 1.4, // Moderate agreement (was 1)
    TIDAK: 0.1         // Minimal score (was 0)
};

// Global variables
let isFirstTimeUser = false;
let currentQuestionIndex = 0;
let answers = [];
let shuffledQuestions = []; // Array to hold shuffled questions
let scores = {
    "Saver": 0,
    "Spender": 0,
    "Giver": 0,
    "Money Avoider": 0,
    "Status Seeker": 0,
};

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array]; // Create a copy
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Personality types and their descriptions
const personalityTypes = {
    "Saver": {
        title: "SOFI SIMPAN",
        characterName: "Sofi Saver",
        color: "#4A90E2",
        points: [
            "Tak mudah terpengaruh",
            "Bijak merancang", 
            "Berjimat-cermat"
        ],
        description: "Sofi suka simpan duit. Setiap kali dia dapat duit raya atau upah, dia akan masukkan ke dalam tabungnya. Sofi rasa gembira bila tengok duit dalam tabungnya makin banyak.\n\nKalau dia nampak barang yang dia suka, dia akan fikir dulu. \“Ini keperluan atau kehendak?\” Itulah cara Sofi kawal dirinya supaya tidak belanja sesuka hati.\n\nSofi juga bijak merancang. Dia ada senarai barang \‘kehendak\’ yang dia nak beli, tapi dia tahu tak semua perlu dibeli sekarang. Dia juga tak mudah terikut-ikut dengan kawan-kawannya yang suka shopping.\n\nIbu dan ayah bangga dengan Sofi kerana dia tahu menjaga duitnya. Tapi ibu juga ajar Sofi bahawa menabung itu memang penting, tetapi tak salah untuk shopping sekali-sekala."
    },
    "Spender": {
        title: "ZARA ZOOM SHOPPING",
        characterName: "Zara Spender",
        color: "#E74C3C",
        points: [
            "Spontan",
            "Kurang merancang",
            "Suka berbelanja"
        ],
        description: "Zara sangat sukakan shopping. Bila nampak barang yang cantik, dia terus rasa nak beli. \“Wah, comelnya! Zara nak sangat ni,\” katanya sambil tersenyum lebar.\n\nZara suka jualan murah atau promosi menarik. Kadang-kadang, dia beli barang tanpa fikir panjang sama ada dia perlukan atau tidak. Bagi Zara, rasa seronok waktu membeli itu yang paling penting.\n\nTapi, bila duit dah habis dan barang yang dibeli tak digunakan, barulah Zara rasa menyesal. Jadi, mama Zara mula ajar dia cara buat bajet supaya dia boleh kawal perbelanjaannya.\n\nSekarang, Zara masih suka shopping, tapi dia cuba fikir dulu sebelum beli dan mula belajar simpan duit sedikit demi sedikit."
    },
    "Giver": {
        title: "MUBIN MURAH HATI",
        characterName: "Mubin Giver",
        icon: "❤️",
        color: "#27AE60",
        points: [
            "Pemurah",
            "Prihatin",
            "Suka berkongsi"
        ],
        description: "Mubin sangat suka berkongsi. Bila dia dapat duit raya, dia akan berfikir, “Siapa yang aku boleh belanja kali ni?” Kadang-kadang dia belikan makanan untuk kawan atau hadiah untuk adik. Dia rasa sangat gembira bila tengok orang lain happy.\n\nBagi Mubin, duit bukan untuk disimpan lama-lama. Dia percaya rezeki akan datang balik bila kita berkongsi. Dia juga suka derma bila nampak tabung di masjid atau di sekolah.\n\nTapi kadang-kadang, Mubin terlalu seronok memberi sampai duitnya cepat habis. Ibu dan ayah ajar Mubin supaya belajar seimbangkan antara memberi dan menabung.\n\nSekarang, Mubin masih seorang yang pemurah, tapi dia juga pandai merancang penggunaan duitnya. Dia simpan sebahagian duitnya dan guna sebahagian lagi untuk bersedekah."
    },
    "Money Avoider": {
        title: "DANIAL DON'T CARE",
        characterName: "Danial Don't Care",
        icon: "😴",
        color: "#F39C12",
        points: [
            "Kurang minat urus duit",
            "Santai",
            "Tak ambil peduli"
        ],
        description: "Danial jenis yang tak kisah sangat pasal duit. Bila orang bagi duit, dia letak saja merata-rata. Kadang-kadang bawah bantal, dalam poket seluar, atau entah ke mana. Dia tak ingat pun duit tu masih ada atau dah hilang. \n\nDia lebih suka tengok kartun, main dengan kawan atau makan makanan sedap daripada fikir pasal menabung atau shopping. Kalau nak beli sesuatu, Danial biasanya akan tanya, \“Ayah ada duit tak?\” sebab dia tak tahu berapa duit yang dia sendiri ada.\n\nTapi satu hari, dia tengok kawan dia beli mainan guna duit simpanan sendiri. Danial pun rasa nak cuba. Ibu mula ajar dia simpan sedikit demi sedikit dan kira duit dengan betul.\n\nSekarang, Danial masih santai seperti biasa, tapi dia dah mula pandai urus duit dan tidak letakkan duitnya merata-rata. "
    },
    "Status Seeker": {
        title: "FASHA FASHIONISTA",
        characterName: "FASHA FASHIONISTA",
        icon: "👑",
        color: "#9B59B6",
        points: [
            "Pentingkan pandangan orang lain",
            "Ikut trend",
            "Suka bergaya"
        ],
        description: "Fasha sangat suka bergaya. Setiap kali keluar rumah, dia akan pilih pakaian paling cantik dalam almari dia. Dia suka warna yang menarik, aksesori yang comel, dan barang-barang yang berjenama.\n\nBagi Fasha, beli barang yang cantik dan mahal buat dia rasa yakin dan gembira. Bila orang puji penampilan dia, dia rasa bangga. Kadang-kadang, Fasha lebih suka shopping untuk nampak cantik daripada menabung untuk keperluan lain.\n\nTapi lama-lama, Fasha mula perasan duitnya cepat habis. Mama pun ajar Fasha tentang beza antara kehendak dan keperluan. Sekarang, Fasha masih suka bergaya dengan barang berjenama, tapi dia mula berfikir dulu sebelum beli. Kalau betul-betul perlukan sesuatu barang dan ada bajet, barulah dia beli."
    }
};

// Function to get the correct SVG filename for each personality type
function getPersonalityImage(personalityType) {
    const imageMap = {
        "Saver": "SOFI SIMPAN.svg",
        "Spender": "ZARA.svg", 
        "Giver": "MUBIN.svg",
        "Money Avoider": "Danial.svg",
        "Status Seeker": "FARAH.svg"
    };
    return imageMap[personalityType] || "default.svg";
}

// Application state
// let currentQuestionIndex = 0;
// let answers = [];
// let scores = {
//     "Saver": 0,
//     "Spender": 0,
//     "Giver": 0,
//     "Money Avoider": 0,
//     "Status Seeker": 0
// };

// Test function to verify scoring system
function testScoringSystem() {
    console.log('🧪 Testing new decimal scoring system...');

    // Test scenario 1: All "Ya" answers for Saver
    const testScores1 = { "Saver": 5 * DECIMAL_ANSWER_VALUES.YA, "Spender": 0, "Giver": 0, "Money Avoider": 0, "Status Seeker": 0 };
    const maxScore1 = 5 * DECIMAL_ANSWER_VALUES.YA;
    const percentage1 = Math.round((testScores1.Saver / maxScore1) * 100);
    console.log('Test 1 - All Ya for Saver:', testScores1.Saver, 'Percentage:', percentage1 + '%');

    // Test scenario 2: Mixed answers
    const testScores2 = {
        "Saver": 3 * DECIMAL_ANSWER_VALUES.YA + 2 * DECIMAL_ANSWER_VALUES.KADANG_KADANG,
        "Spender": 2 * DECIMAL_ANSWER_VALUES.YA + 3 * DECIMAL_ANSWER_VALUES.TIDAK,
        "Giver": 0, "Money Avoider": 0, "Status Seeker": 0
    };
    const percentage2_saver = Math.round((testScores2.Saver / maxScore1) * 100);
    const percentage2_spender = Math.round((testScores2.Spender / maxScore1) * 100);
    console.log('Test 2 - Mixed answers:');
    console.log('  Saver:', testScores2.Saver, 'Percentage:', percentage2_saver + '%');
    console.log('  Spender:', testScores2.Spender, 'Percentage:', percentage2_spender + '%');

    // Test tie-breaking
    const closeScores = { "Saver": 9.2, "Spender": 9.1, "Giver": 0, "Money Avoider": 0, "Status Seeker": 0 };
    const maxCloseScore = Math.max(...Object.values(closeScores));
    const DECIMAL_TOLERANCE = 0.01;
    const topPersonalities = Object.keys(closeScores).filter(type =>
        Math.abs(closeScores[type] - maxCloseScore) <= DECIMAL_TOLERANCE
    );
    console.log('Test 3 - Close scores tie-breaking:', topPersonalities);

    console.log('✅ Scoring system tests completed');
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Personality Test JavaScript Loaded!');

    // Initialize app (no auth)
    initializeAppNoAuth();

    // Run scoring system test
    testScoringSystem();



    // Get DOM elements
    const startBtn = document.getElementById('start-btn');
    const userInfoSubmitBtn = document.getElementById('user-info-submit-btn');
    const prevBtn = document.getElementById('prev-btn');
    const retakeBtn = document.getElementById('retake-btn');

    console.log('Start button found:', !!startBtn);

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Move to user info screen (intermediate)
            showScreen('user-info-screen');
            // Prefill when arriving at the screen
            initializeAppNoAuth();
        });
        console.log('✅ Start button event listener added');
    } else {
        console.error('❌ Start button not found!');
    }

    if (userInfoSubmitBtn) {
        userInfoSubmitBtn.addEventListener('click', submitUserInfoAndStart);
    }

    if (prevBtn) prevBtn.addEventListener('click', previousQuestion);

    // Add event listener for retake button
    if (retakeBtn) {
        console.log('🔄 Found retake button, adding event listener...');
        retakeBtn.addEventListener('click', function(e) {
            console.log('🔄 Retake button clicked!');
            e.preventDefault();
            e.stopPropagation();
            resetTest();
            showWelcomeScreen();
            console.log('✅ Test reset and welcome screen shown');
        });
        console.log('✅ Retake button event listener added');
    } else {
        console.error('❌ Retake button not found!');
    }
});


// Start the test
function submitUserInfoAndStart() {
    console.log('📨 Submitting user info...');
    // Validate user info before starting
    const nameInput = document.getElementById('user-name-input');
    const emailInput = document.getElementById('user-email-input');
    const phoneInput = document.getElementById('user-phone-input');
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    if (!name || !email || !phone) {
        showErrorMessage('Sila isi nama, emel dan nombor telefon.');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showErrorMessage('Format emel tidak sah.');
        return;
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
        showErrorMessage('Sila masukkan nombor telefon yang sah.');
        return;
    }
    // Save locally and set current user
    try { localStorage.setItem('mpq_user', JSON.stringify({ name, email, phone })); } catch (_) {}
    currentUser = { name, email, phone };
    // Save lightweight user record
    saveUserToFirestore(currentUser);
    // Proceed to test
    beginTest();
}

function beginTest() {
    console.log('🎯 Starting test...');
    console.log('📊 Decimal scoring values:', DECIMAL_ANSWER_VALUES);
    console.log('📝 Total questions available:', questions.length);

    const testScreen = document.getElementById('test-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    const userInfoScreen = document.getElementById('user-info-screen');

    if (welcomeScreen) welcomeScreen.classList.remove('active');
    if (userInfoScreen) userInfoScreen.classList.remove('active');
    if (testScreen) testScreen.classList.add('active');

    currentQuestionIndex = 0;
    answers = [];
    shuffledQuestions = shuffleArray(questions);
    resetScores();
    showQuestion();
    updateNavigationButtons();
    console.log('✅ Test started successfully');
}

// Reset scores
function resetScores() {
    scores = {
        "Saver": 0,
        "Spender": 0,
        "Giver": 0,
        "Money Avoider": 0,
        "Status Seeker": 0,
    };
}

// Show current question with smooth transitions
function showQuestion() {
    const question = shuffledQuestions[currentQuestionIndex];
    console.log('📝 Showing question:', currentQuestionIndex + 1, question.text);

    // Get DOM elements
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    const progressText = document.getElementById('progress-text');
    const questionCounter = document.getElementById('question-counter');
    const questionSection = document.querySelector('.question-section');

    // Fade out current content
    if (questionSection) {
        questionSection.style.opacity = '0';
        questionSection.style.transform = 'translateY(20px)';
    }

    setTimeout(() => {
        // Update question text
        if (questionText) {
            questionText.textContent = question.text;
        }

        // Update progress with smooth animation
        const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressPercentage) progressPercentage.textContent = Math.round(progress) + '%';
        if (progressText) {
            progressText.innerHTML = `Soalan ${currentQuestionIndex + 1}/${shuffledQuestions.length}`;
        }
        if (questionCounter) questionCounter.textContent = currentQuestionIndex + 1;

        // Create Ya/Kadang-kadang/Tidak options with staggered animation
        if (optionsContainer) {
            optionsContainer.innerHTML = '';

            // Create Ya (Yes) option
            const yaOption = createOption("✅ Ya", DECIMAL_ANSWER_VALUES.YA, 0);
            optionsContainer.appendChild(yaOption);

            // Create Kadang-kadang (Sometimes) option
            const kadangOption = createOption("🤔 Kadang-kadang", DECIMAL_ANSWER_VALUES.KADANG_KADANG, 1);
            optionsContainer.appendChild(kadangOption);

            // Create Tidak (No) option
            const tidakOption = createOption("❌ Tidak", DECIMAL_ANSWER_VALUES.TIDAK, 2);
            optionsContainer.appendChild(tidakOption);

            // Restore previous answer if exists
            if (answers[currentQuestionIndex]) {
                const previousAnswer = answers[currentQuestionIndex];
                const selectedOption = optionsContainer.querySelector(`[data-value="${previousAnswer.value}"]`);
                if (selectedOption) {
                    selectedOption.classList.add('selected');
                }
            }
        }

        // Fade in new content
        if (questionSection) {
            questionSection.style.opacity = '1';
            questionSection.style.transform = 'translateY(0)';
        }

        updateNavigationButtons();
    }, 200);
}

// Create option element
function createOption(text, value, index) {
    const option = document.createElement('button');
    option.className = 'option';
    option.textContent = text;
    option.dataset.value = value;
    option.style.animationDelay = `${index * 0.1}s`;
    
    option.addEventListener('click', function() {
        selectOption(this, value);
    });
    
    return option;
}

// Select an option
function selectOption(optionElement, value) {
    console.log('✅ Option selected:', optionElement.textContent, 'Value:', value);

    // Remove previous selections with fade effect
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt !== optionElement) {
            opt.style.opacity = '0.6';
            opt.style.transform = 'scale(0.95)';
        }
    });

    // Select current option with animation
    optionElement.classList.add('selected');
    optionElement.style.opacity = '1';
    optionElement.style.transform = 'scale(1.02)';

    // Add a subtle pulse effect
    setTimeout(() => {
        optionElement.style.transform = 'scale(1)';
    }, 150);

    // Store answer with decimal value
    const question = shuffledQuestions[currentQuestionIndex];
    answers[currentQuestionIndex] = {
        questionId: question.id,
        answer: optionElement.textContent,
        value: value, // Now uses decimal values (2.3, 1.4, 0.1)
        type: question.type
    };

    // Update scores
    updateScores();
    updateNavigationButtons();

    // Add a small delay for visual feedback
    setTimeout(() => {
        // Auto advance to next question or show results if last question
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            nextQuestion();
        } else {
            // This is the last question, show results
            showResults();
        }
    }, 800);
}

// Update scores based on current answers with decimal values
function updateScores() {
    console.log('🔄 Updating scores...');
    console.log('📝 Current answers:', answers);
    console.log('📋 Shuffled questions:', shuffledQuestions);
    
    resetScores();

    answers.forEach((answer, index) => {
        console.log(`Processing answer ${index}:`, answer);
        
        if (answer && answer.value !== undefined) {
            const question = shuffledQuestions[index];
            console.log(`Question ${index}:`, question);
            
            if (question && question.type) {
                scores[question.type] += answer.value; // Now uses decimal values (2.3, 1.4, 0.1)
                console.log(`✅ Added ${answer.value} to ${question.type}, new total: ${scores[question.type]}`);
            } else {
                console.log(`❌ No question found for index ${index}`);
            }
        } else {
            console.log(`⚠️ Skipping answer ${index} - invalid answer:`, answer);
        }
    });

    console.log('📊 Final decimal scores:', scores);
}

// Manual navigation functions removed - using auto-advance only

// Go back to welcome screen
function goToWelcome() {
    testScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    resetTest();
}

// Navigation buttons functionality removed

// Reset test
function resetTest() {
    currentQuestionIndex = 0;
    answers = [];
    shuffledQuestions = []; // Reset shuffled questions
    resetScores();
}

// Show welcome screen
function showWelcomeScreen() {
    const resultsScreen = document.getElementById('results-screen');
    const testScreen = document.getElementById('test-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    
    if (resultsScreen) resultsScreen.classList.remove('active');
    if (testScreen) testScreen.classList.remove('active');
    if (welcomeScreen) welcomeScreen.classList.add('active');
}

// Helper functions for kids-friendly design
function getPersonalityEmoji(personality) {
    const emojiMap = {
        'danial': '😴',
        'farah': '👗',
        'mubin': '🤗',
        'zara': '🛍️',
        'sofi': '💰'
    };
    return emojiMap[personality] || '🎭';
}

function getPersonalityBadge(personality) {
    const badgeMap = {
        'danial': 'PENGELAK DUIT',
        'farah': 'PENGEJAR STATUS',
        'mubin': 'PEMURAH',
        'zara': 'PEMBOROS',
        'sofi': 'PENJIMAT'
    };
    return badgeMap[personality] || 'UNKNOWN';
}

function getPersonalityBadgeEn(personality) {
    const badgeMap = {
        'danial': 'MONEY AVOIDER',
        'farah': 'STATUS SEEKER',
        'mubin': 'GIVER',
        'zara': 'SPENDER',
        'sofi': 'SAVER'
    };
    return badgeMap[personality] || 'UNKNOWN';
}

// Returns combined Malay/English secondary label for a given personality type key
function getSecondaryLabelForType(type) {
    const typeToBadges = {
        'Saver': '(PENJIMAT) (SAVER)',
        'Spender': '(PEMBOROS) (SPENDER)',
        'Giver': '(PEMURAH) (GIVER)',
        'Money Avoider': '(PENGELAK DUIT)\n(MONEY AVOIDER)',
        'Status Seeker': '(PENGEJAR STATUS)\n(STATUS SEEKER)'
    };
    return typeToBadges[type] || '';
}

// Show results
function showResults() {
    console.log('🎉 Showing results...');
    
    // Get DOM elements
    const testScreen = document.getElementById('test-screen');
    const resultsScreen = document.getElementById('results-screen');
    const highestPersonalities = document.getElementById('highest-personalities');
    
    console.log('Test screen found:', !!testScreen);
    console.log('Results screen found:', !!resultsScreen);
    console.log('Highest personalities element found:', !!highestPersonalities);
    
    if (testScreen) testScreen.classList.remove('active');
    if (resultsScreen) resultsScreen.classList.add('active');

    // Scroll to top of the results screen with a small delay to ensure transition completes
    setTimeout(() => {
        if (resultsScreen) {
            resultsScreen.scrollTop = 0;
            // Also scroll the window to top for better user experience
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('📜 Scrolled to top of results screen');
        }
    }, 100);

    // Calculate highest scoring personality type(s) with decimal tolerance
    const DECIMAL_TOLERANCE = 0.01;
    const maxScore = Math.max(...Object.values(scores));
    const topPersonalities = Object.keys(scores).filter(type =>
        Math.abs(scores[type] - maxScore) <= DECIMAL_TOLERANCE
    );

    // Calculate percentages for all personality types using new maximum score
    const MAX_SCORE_PER_TYPE = 5 * DECIMAL_ANSWER_VALUES.YA; // 5 × 2.3 = 11.5
    const personalityPercentages = {};
    Object.keys(scores).forEach(type => {
        personalityPercentages[type] = Math.round((scores[type] / MAX_SCORE_PER_TYPE) * 100);
    });

    console.log('🏆 Top personalities:', topPersonalities, 'Max Score:', maxScore);
    console.log('📊 Raw scores:', scores);
    console.log('📊 Percentages:', personalityPercentages);
    console.log('🎯 Max score per type used for calculation:', MAX_SCORE_PER_TYPE);
    console.log('🔢 Decimal tolerance used:', DECIMAL_TOLERANCE);

    // Validate scores before saving
    console.log('🔍 Validating scores before saving...');
    console.log('📊 Scores object:', scores);
    console.log('📝 Answers array:', answers);
    
    // Check if answers are valid
    const hasValidAnswers = answers && answers.length > 0 && 
                           answers.every(answer => answer && answer.value !== undefined);
    
    // Check if scores are valid
    const hasValidScores = scores && Object.keys(scores).length > 0 && 
                          Object.values(scores).every(score => score !== undefined && score !== null);
    
    console.log('✅ Has valid answers:', hasValidAnswers);
    console.log('✅ Has valid scores:', hasValidScores);
    
    if (hasValidAnswers && hasValidScores) {
        // Save results to Firestore
        saveResultsToFirestore();
    } else {
        console.log('❌ Skipping save - invalid data detected');
        console.log('Answers valid:', hasValidAnswers);
        console.log('Scores valid:', hasValidScores);
    }

    // Display main personality/personalities with new design
    if (highestPersonalities) {
        console.log('🎯 Setting innerHTML for highest personalities');
        
        // Kids-friendly personality result design - Each personality in its own container
        let mainResultHTML = '';
        
        topPersonalities.forEach((personality, index) => {
            console.log('Processing personality:', personality);
            const personalityData = personalityTypes[personality];
            console.log('Personality data found:', !!personalityData);
            const percentage = personalityPercentages[personality];
            
            if (personalityData) {
                mainResultHTML += `
                    <div class="personality-result-container">
                        <div class="personality-card-kids" style="--personality-color: ${personalityData.color};">
                            <div class="card-header-kids">
                                <div class="card-icon-kids">
                                    <div class="personality-icon-container ${getPersonalityImage(personality).includes('FARAH.svg') ? 'fanisha-container' : ''}" style="
                                        width: 120px; 
                                        height: 120px; 
                                        border-radius: 50%; 
                                        background: ${personalityData.color}; 
                                        display: flex; 
                                        align-items: center; 
                                        justify-content: center; 
                                        margin: 0 auto;
                                        aspect-ratio: 1;
                                        min-width: 120px;
                                        min-height: 120px;
                                        max-width: 120px;
                                        max-height: 120px;">
                                        <img src="assets/images/${getPersonalityImage(personality)}" 
                                             alt="${personalityData.characterName}" 
                                             style="width: 100px; height: 100px; object-fit: contain;">
                                    </div>
                                </div>
                                <div class="card-title-kids">
                                    <h3 style="color: var(--personality-color, #2d3748);">${personalityData.title}</h3>
                                     <div class="card-subtitle-kids" style="margin-top: 4px; font-size: 14px; color: #4a5568; font-weight: 600;">${getSecondaryLabelForType(personality)}</div>
                                </div>
                                ${personalityData.points ? `
                                <div class="personality-points">
                                    ${personalityData.points.map(point => `
                                        <div class="point-item">
                                            <span class="point-icon">✓</span>
                                            <span class="point-text">${point}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                ` : ''}
                            </div>
                            <div class="card-body-kids">
                                <div class="description-section">
                                    <div class="personality-description">${personalityData.description.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                mainResultHTML += `
                    <div class="personality-result-container">
                        <div class="personality-card-kids error">
                            <div class="card-header-kids">
                                <div class="card-icon-kids">
                                    <span class="personality-emoji">❌</span>
                                </div>
                                <div class="card-title-kids">
                                    <h3>Error: ${personality}</h3>
                                </div>
                            </div>
                            <div class="card-body-kids">
                                <p>Personality data not found!</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        highestPersonalities.innerHTML = mainResultHTML;
        console.log('✅ InnerHTML set successfully');
    } else {
        console.error('❌ highest-personalities element not found!');
    }

    // Handle other personalities with new design
    const otherPersonalities = document.getElementById('other-personalities');
    const otherResultsSection = document.querySelector('.other-results');

    if (otherPersonalities && otherResultsSection) {
        // Get ALL personality types except the ones already shown in main results
        const allPersonalityTypes = Object.keys(personalityTypes);
        const otherTypes = allPersonalityTypes.filter(type => !topPersonalities.includes(type));

        // Always show the "Jenis Personaliti Lain" section if there are other types to show
        if (otherTypes.length > 0) {
            otherResultsSection.style.display = 'block';

            let otherHTML = '';
            otherTypes
                .sort((a, b) => scores[b] - scores[a]) // Sort by score descending
                .forEach((type, index) => {
                    const personalityData = personalityTypes[type];
                    const percentage = personalityPercentages[type] || 0;

                    // Show all personality types, even if they have 0% score
                    otherHTML += `
                        <div class="personality-result-container">
                            <div class="other-personality-item" style="--personality-color: ${personalityData.color};">
                                <div class="other-personality-header">
                                    <div class="other-personality-icon-name">
                                        <div class="other-personality-icon">
                                            <div class="personality-icon-container">
                                                <img src="assets/images/${getPersonalityImage(type)}" 
                                                     alt="${personalityData.characterName}">
                                            </div>
                                        </div>
                                        <div class="other-personality-info">
                                            <h3 class="other-personality-title">${personalityData.title}</h3>
                                             <div class="other-personality-subtitle">${getSecondaryLabelForType(type)}</div>
                                        </div>
                                    </div>
                                    <div class="other-personality-percentage">
                                        <span class="percentage-value">${percentage}%</span>
                                    </div>
                                </div>
                                ${personalityData.points ? `
                                <div class="personality-points">
                                    ${personalityData.points.map(point => `
                                        <div class="point-item-container">
                                            <span class="point-icon">✓</span>
                                            <span class="point-text">${point}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                ` : ''}
                                <div class="other-personality-content">
                                    <div class="other-personality-description">${personalityData.description.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>')}</div>
                                </div>
                            </div>
                        </div>
                    `;
                });

            otherPersonalities.innerHTML = otherHTML;
        } else {
            // Hide "Jenis Personaliti Lain" section if all personality types are already shown in main results
            otherResultsSection.style.display = 'none';
        }
    }
    
    // 添加动画效果
    setTimeout(() => {
        // 为主个性卡片添加弹跳动画
        const personalityCards = document.querySelectorAll('.personality-card-kids');
        personalityCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'bounceIn 0.8s ease-out';
            }, index * 300);
        });
        
        // 为要点添加滑动动画
        const pointItems = document.querySelectorAll('.point-item');
        pointItems.forEach((point, index) => {
            setTimeout(() => {
                point.style.animation = 'slideInLeft 0.6s ease-out';
            }, index * 200);
        });
        
        // 为其他结果添加淡入动画
        const otherResults = document.querySelectorAll('.other-personality-item');
        otherResults.forEach((result, index) => {
            setTimeout(() => {
                result.style.animation = 'fadeInUp 0.6s ease-out';
            }, (index + pointItems.length) * 200);
        });
        
        // 为图标添加旋转动画
        const personalityIcons = document.querySelectorAll('.personality-icon-container');
        personalityIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'rotateIn 1s ease-out';
            }, index * 400);
        });
        
        // 添加浮动庆祝元素
        addFloatingCelebration();
    }, 100);
}

// 添加浮动庆祝效果
function addFloatingCelebration() {
    const celebrationEmojis = ['🎉', '✨', '🎊', '🌟', '💫', '🎈', '🎯', '🏆'];
    const resultsScreen = document.getElementById('results-screen');
    
    if (!resultsScreen) return;
    
    // 创建浮动元素
    for (let i = 0; i < 8; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = celebrationEmojis[i];
        emoji.style.cssText = `
            position: fixed;
            font-size: 24px;
            pointer-events: none;
            z-index: 1000;
            animation: floatCelebration 3s ease-in-out infinite;
            animation-delay: ${i * 0.3}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        resultsScreen.appendChild(emoji);
        
        // 3秒后移除元素
        setTimeout(() => {
            if (emoji.parentNode) {
                emoji.parentNode.removeChild(emoji);
            }
        }, 3000);
    }
}

// Save user data to Firestore (no auth user object)
async function saveUserToFirestore(user) {
    try {
        console.log('💾 Saving user data to Firestore...');
        const userData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
        };

        console.log('👤 User data to save:', userData);

        // Save to Firestore as a new document
        const { collection, addDoc } = window.firebaseFirestore;
        const usersRef = collection(window.firebaseFirestore.db, 'users');
        await addDoc(usersRef, userData);
        
        console.log('✅ User data saved successfully');
        return true;
    } catch (error) {
        console.error('❌ Error saving user data to Firestore:', error);
        return false;
    }
}

// Save results to Firestore
async function saveResultsToFirestore() {
    try {
        // proceed without authentication

        // Validate required data
        if (!answers || !scores) {
            console.log('❌ Missing answers or scores data, skipping save');
            console.log('Answers:', answers);
            console.log('Scores:', scores);
            return;
        }

        console.log('💾 Saving results to Firestore...');
        
        // Calculate percentages and top personalities
        const personalityPercentages = calculatePersonalityPercentages();
        const topPersonalities = getTopPersonalities();
        
        // Validate calculated data
        if (!personalityPercentages || !topPersonalities) {
            console.log('❌ Failed to calculate percentages or top personalities');
            return;
        }
        
        // Prepare the result data with validation
        const resultData = {
            userEmail: currentUser?.email || 'user@example.com',
            userName: currentUser?.name || 'User',
            userPhone: currentUser?.phone || '',
            answers: answers,
            scores: scores,
            personalityPercentages: personalityPercentages,
            topPersonalities: topPersonalities,
            timestamp: new Date().toISOString()
        };

        // Remove any undefined values and clean up data
        Object.keys(resultData).forEach(key => {
            if (resultData[key] === undefined) {
                console.log(`⚠️ Removing undefined value for key: ${key}`);
                delete resultData[key];
            } else if (Array.isArray(resultData[key])) {
                // Clean up arrays (like answers)
                resultData[key] = resultData[key].filter(item => item !== undefined && item !== null);
            } else if (typeof resultData[key] === 'object' && resultData[key] !== null) {
                // Clean up objects (like scores)
                Object.keys(resultData[key]).forEach(subKey => {
                    if (resultData[key][subKey] === undefined || resultData[key][subKey] === null) {
                        console.log(`⚠️ Removing undefined value for subKey: ${key}.${subKey}`);
                        delete resultData[key][subKey];
                    }
                });
            }
        });

        console.log('📊 Result data to save:', resultData);

        // Save to Firestore
        const { collection, addDoc } = window.firebaseFirestore;
        const resultsRef = collection(window.firebaseFirestore.db, 'testResults');
        
        const docRef = await addDoc(resultsRef, resultData);
        
        console.log('✅ Results saved successfully with ID:', docRef.id);
        // showNotification('✅ Keputusan kuiz anda telah disimpan!');
        
        return docRef.id;
    } catch (error) {
        console.error('❌ Error saving results to Firestore:', error);
        // showNotification('❌ Gagal menyimpan keputusan. Sila cuba lagi.');
        return null;
    }
}

// Calculate personality percentages
function calculatePersonalityPercentages() {
    try {
        console.log('🔢 Calculating personality percentages...');
        console.log('📊 Current scores:', scores);
        
        if (!scores || Object.keys(scores).length === 0) {
            console.log('❌ No scores available for percentage calculation');
            return null;
        }
        
        const MAX_SCORE_PER_TYPE = 5 * 2.3; // 5 questions × 2.3 points = 11.5
        const percentages = {};
        
        Object.keys(scores).forEach(type => {
            if (scores[type] !== undefined && scores[type] !== null) {
                percentages[type] = Math.round((scores[type] / MAX_SCORE_PER_TYPE) * 100);
            } else {
                console.log(`⚠️ Undefined score for type: ${type}`);
                percentages[type] = 0;
            }
        });
        
        console.log('📊 Calculated percentages:', percentages);
        return percentages;
    } catch (error) {
        console.error('❌ Error calculating percentages:', error);
        return null;
    }
}

// Get top personalities
function getTopPersonalities() {
    try {
        console.log('🏆 Getting top personalities...');
        console.log('📊 Current scores:', scores);
        
        if (!scores || Object.keys(scores).length === 0) {
            console.log('❌ No scores available for top personalities');
            return [];
        }
        
        const DECIMAL_TOLERANCE = 0.01;
        const maxScore = Math.max(...Object.values(scores));
        const topPersonalities = Object.keys(scores).filter(type =>
            Math.abs(scores[type] - maxScore) <= DECIMAL_TOLERANCE
        );
        
        console.log('🏆 Top personalities:', topPersonalities);
        return topPersonalities;
    } catch (error) {
        console.error('❌ Error getting top personalities:', error);
        return [];
    }
}

// Add this function to enable moving to the next question or showing results
function nextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        // Add slide transition effect
        const questionSection = document.querySelector('.question-section');
        if (questionSection) {
            questionSection.style.transform = 'translateX(-100%)';
            questionSection.style.opacity = '0';
        }

        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 200);
    } else {
        showResults();
    }
}

// Go to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        // Add slide transition effect
        const questionSection = document.querySelector('.question-section');
        if (questionSection) {
            questionSection.style.transform = 'translateX(100%)';
            questionSection.style.opacity = '0';
        }

        setTimeout(() => {
            currentQuestionIndex--;
            showQuestion();
        }, 200);
    }
}

// Update navigation buttons
function updateNavigationButtons() {
    // Get DOM elements
    const prevBtn = document.getElementById('prev-btn');
    
    // Previous button
    if (prevBtn) {
        if (currentQuestionIndex === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            prevBtn.disabled = false;
        }
    }
}

// Share functionality
function initializeShareButton() {
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShare);
    }
}

// Handle share button click
async function handleShare() {
    try {
        // Generate share content
        const shareContent = generateShareContent();
        
        // Try native Web Share API first
        if (navigator.share) {
            await navigator.share({
                title: 'Personaliti Wang Saya',
                text: shareContent.text,
                url: window.location.href
            });
        } else {
            // Fallback to custom share options
            showShareOptions(shareContent);
        }
    } catch (error) {
        console.error('Share failed:', error);
        // Fallback to custom share options
        const shareContent = generateShareContent();
        showShareOptions(shareContent);
    }
}

// Generate share content
function generateShareContent() {
    // Calculate highest scoring personality type with decimal tolerance
    const DECIMAL_TOLERANCE = 0.01;
    const maxScore = Math.max(...Object.values(scores));
    const topPersonalities = Object.keys(scores).filter(type =>
        Math.abs(scores[type] - maxScore) <= DECIMAL_TOLERANCE
    );
    const mainPersonality = topPersonalities[0];
    const personalityData = personalityTypes[mainPersonality];

    // Calculate percentages using new maximum score
    const MAX_SCORE_PER_TYPE = 5 * DECIMAL_ANSWER_VALUES.YA; // 5 × 2.3 = 11.5
    const personalityPercentages = {};
    Object.keys(scores).forEach(type => {
        personalityPercentages[type] = Math.round((scores[type] / MAX_SCORE_PER_TYPE) * 100);
    });
    
    // Generate share text
    const shareText = `🎯 Personaliti Wang Saya: ${personalityData.title} ${personalityData.icon}

${personalityData.description}

📊 Keputusan Lengkap:
${Object.keys(personalityTypes).map(type => {
    const data = personalityTypes[type];
    const percentage = personalityPercentages[type] || 0;
    return `${data.icon} ${data.title}: ${percentage}%`;
}).join('\n')}

🔗 Ambil ujian anda di: ${window.location.href}

#PersonalitiWang #UjianPersonaliti #Kewangan`;

    // Generate share image data (for future use)
    const shareImageData = {
        personality: mainPersonality,
        title: personalityData.title,
        icon: personalityData.icon,
        description: personalityData.description,
        percentages: personalityPercentages
    };

    return {
        text: shareText,
        imageData: shareImageData,
        url: window.location.href
    };
}

// Show custom share options
function showShareOptions(shareContent) {
    // Create share modal
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <div class="share-modal-header">
                <h3>📤 Kongsi Keputusan</h3>
                <button class="share-modal-close">&times;</button>
            </div>
            <div class="share-modal-body">
                <div class="share-options">
                    <button class="share-option" data-method="copy">
                        <span class="share-icon">📋</span>
                        <span>Salin Teks</span>
                    </button>
                    <button class="share-option" data-method="whatsapp">
                        <span class="share-icon">💬</span>
                        <span>WhatsApp</span>
                    </button>
                    <button class="share-option" data-method="telegram">
                        <span class="share-icon">📱</span>
                        <span>Telegram</span>
                    </button>
                    <button class="share-option" data-method="facebook">
                        <span class="share-icon">📘</span>
                        <span>Facebook</span>
                    </button>
                    <button class="share-option" data-method="twitter">
                        <span class="share-icon">🐦</span>
                        <span>Twitter</span>
                    </button>
                    <button class="share-option" data-method="email">
                        <span class="share-icon">📧</span>
                        <span>Email</span>
                    </button>
                </div>
                <div class="share-preview">
                    <h4>Pratonton:</h4>
                    <div class="share-preview-content">
                        ${shareContent.text.replace(/\n/g, '<br>')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .share-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .share-modal-content {
            background: white;
            border-radius: 20px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideInUp 0.3s ease;
        }
        
        .share-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border-radius: 20px 20px 0 0;
        }
        
        .share-modal-header h3 {
            margin: 0;
            font-size: 1.3rem;
            font-weight: 600;
        }
        
        .share-modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .share-modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .share-modal-body {
            padding: 1.5rem;
        }
        
        .share-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .share-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 15px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .share-option:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border-color: #10b981;
        }
        
        .share-icon {
            font-size: 1.5rem;
        }
        
        .share-preview {
            background: #f8fafc;
            border-radius: 15px;
            padding: 1rem;
            border: 1px solid #e5e7eb;
        }
        
        .share-preview h4 {
            margin: 0 0 0.5rem 0;
            color: #374151;
            font-size: 1rem;
        }
        
        .share-preview-content {
            background: white;
            padding: 1rem;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            font-size: 0.9rem;
            line-height: 1.5;
            color: #374151;
            max-height: 200px;
            overflow-y: auto;
        }
        
        @media (max-width: 600px) {
            .share-modal-content {
                width: 95%;
                margin: 1rem;
            }
            
            .share-options {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Handle close button
    const closeBtn = modal.querySelector('.share-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });

    // Handle share options
    const shareOptions = modal.querySelectorAll('.share-option');
    shareOptions.forEach(option => {
        option.addEventListener('click', () => {
            const method = option.dataset.method;
            handleShareMethod(method, shareContent);
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });
}

// Handle different share methods
function handleShareMethod(method, shareContent) {
    const { text, url } = shareContent;
    
    switch (method) {
        case 'copy':
            copyToClipboard(text);
            break;
        case 'whatsapp':
            shareToWhatsApp(text, url);
            break;
        case 'telegram':
            shareToTelegram(text, url);
            break;
        case 'facebook':
            shareToFacebook(url);
            break;
        case 'twitter':
            shareToTwitter(text, url);
            break;
        case 'email':
            shareToEmail(text, url);
            break;
    }
}

// Copy to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('✅ Teks telah disalin ke clipboard!');
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('✅ Teks telah disalin ke clipboard!');
    }
}

// Share to WhatsApp
function shareToWhatsApp(text, url) {
    const whatsappText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
    window.open(whatsappUrl, '_blank');
}

// Share to Telegram
function shareToTelegram(text, url) {
    const telegramText = encodeURIComponent(text);
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${telegramText}`;
    window.open(telegramUrl, '_blank');
}

// Share to Facebook
function shareToFacebook(url) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
}

// Share to Twitter
function shareToTwitter(text, url) {
    const twitterText = encodeURIComponent(text.substring(0, 200) + '...');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
}

// Share to Email
function shareToEmail(text, url) {
    const subject = encodeURIComponent('Personaliti Wang Saya');
    const body = encodeURIComponent(text);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'share-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize share button when results are shown (no auth)
document.addEventListener('DOMContentLoaded', function() {
    initializeShareButton();
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const shareBtn = document.getElementById('share-btn');
                if (shareBtn && !shareBtn.hasAttribute('data-initialized')) {
                    shareBtn.setAttribute('data-initialized', 'true');
                    shareBtn.addEventListener('click', handleShare);
                }
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
});

// Check if user profile exists in Firestore
async function checkUserProfile(uid) {
    try {
        const { collection, query, where, getDocs } = window.firebaseFirestore;
        const usersRef = collection(window.firebaseFirestore.db, 'users');
        const q = query(usersRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        }
        return null;
    } catch (error) {
        console.error('Error checking user profile:', error);
        return null;
    }
}

// Load user profile for returning users
async function loadUserProfile(uid) {
    try {
        console.log('📥 Loading user profile for:', uid);
        const userDoc = await checkUserProfile(uid);
        
        if (userDoc) {
            userProfile = userDoc;
            console.log('✅ User profile loaded:', userProfile);
            return userDoc;
        } else {
            console.log('ℹ️ No existing profile found for user');
            return null;
        }
    } catch (error) {
        console.error('❌ Error loading user profile:', error);
        return null;
    }
}


