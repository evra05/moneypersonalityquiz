// Personality Test Questions (Bahasa Malaysia)
const questions = [
    {
        id: 1,
        text: "Adakah kamu simpan sebahagian duit belanja setiap minggu?",
        type: "Saver",
        options: [
            { text: "Ya, saya selalu simpan", value: 5 },
            { text: "Kadang-kadang je", value: 3 },
            { text: "Jarang sangat", value: 1 },
            { text: "Tak pernah langsung", value: 0 }
        ]
    },
    {
        id: 2,
        text: "Bila kamu nampak mainan atau barang yang kamu nak, apa yang kamu buat?",
        type: "Spender",
        options: [
            { text: "Beli terus tanpa fikir", value: 5 },
            { text: "Fikir sikit, lepas tu beli", value: 3 },
            { text: "Tanya mak ayah dulu", value: 1 },
            { text: "Simpan duit dulu baru beli", value: 0 }
        ]
    },
    {
        id: 3,
        text: "Kalau kawan kamu tak ada duit nak beli makanan, apa kamu buat?",
        type: "Giver",
        options: [
            { text: "Belikan untuk dia", value: 5 },
            { text: "Kongsi makanan saya", value: 3 },
            { text: "Cakap dengan cikgu", value: 1 },
            { text: "Tak tahu nak buat apa", value: 0 }
        ]
    },
    {
        id: 4,
        text: "Berapa kerap kamu kira duit dalam tabung kamu?",
        type: "Money Avoider",
        options: [
            { text: "Tak pernah kira", value: 5 },
            { text: "Sekali sekala je", value: 3 },
            { text: "Setiap minggu", value: 1 },
            { text: "Setiap hari", value: 0 }
        ]
    },
    {
        id: 5,
        text: "Kenapa kamu nak beli barang mahal?",
        type: "Status Seeker",
        options: [
            { text: "Nak kawan nampak saya hebat", value: 5 },
            { text: "Sebab barang tu cantik", value: 3 },
            { text: "Sebab tahan lama", value: 1 },
            { text: "Saya tak beli barang mahal", value: 0 }
        ]
    },
    {
        id: 6,
        text: "Kalau dapat duit raya RM50, apa kamu buat?",
        type: "Saver",
        options: [
            { text: "Simpan semua dalam tabung", value: 5 },
            { text: "Simpan separuh, guna separuh", value: 3 },
            { text: "Guna sikit, simpan banyak", value: 1 },
            { text: "Habiskan semua", value: 0 }
        ]
    },
    {
        id: 7,
        text: "Bila pergi shopping dengan family, perasaan kamu macam mana?",
        type: "Spender",
        options: [
            { text: "Seronok gila! Nak beli banyak benda", value: 5 },
            { text: "Okay je, tengok-tengok", value: 3 },
            { text: "Boring, nak balik rumah", value: 1 },
            { text: "Takut habis duit", value: 0 }
        ]
    },
    {
        id: 8,
        text: "Kalau adik kamu nak pinjam duit, kamu buat apa?",
        type: "Giver",
        options: [
            { text: "Bagi je, tak payah bayar balik", value: 5 },
            { text: "Bagi, tapi kena bayar balik", value: 3 },
            { text: "Bagi sikit je", value: 1 },
            { text: "Tak nak bagi", value: 0 }
        ]
    },
    {
        id: 9,
        text: "Kamu suka tak belajar pasal duit dan simpanan?",
        type: "Money Avoider",
        options: [
            { text: "Tak suka, boring", value: 5 },
            { text: "Okay je", value: 3 },
            { text: "Suka sikit", value: 1 },
            { text: "Suka sangat!", value: 0 }
        ]
    },
    {
        id: 10,
        text: "Kalau kawan ada phone baru yang mahal, kamu rasa apa?",
        type: "Status Seeker",
        options: [
            { text: "Nak jugak yang sama!", value: 5 },
            { text: "Nak yang lagi mahal", value: 3 },
            { text: "Okay je, phone saya pun okay", value: 1 },
            { text: "Tak kisah, janji boleh guna", value: 0 }
        ]
    },
    {
        id: 11,
        text: "Bila mak ayah bagi duit belanja lebih, kamu buat apa?",
        type: "Saver",
        options: [
            { text: "Simpan untuk masa depan", value: 5 },
            { text: "Simpan untuk beli benda special", value: 3 },
            { text: "Guna untuk beli makanan sedap", value: 1 },
            { text: "Habiskan hari tu jugak", value: 0 }
        ]
    },
    {
        id: 12,
        text: "Kalau tengok iklan mainan baru, kamu rasa macam mana?",
        type: "Spender",
        options: [
            { text: "Nak sangat! Kena ada!", value: 5 },
            { text: "Menarik, tapi tengok dulu", value: 3 },
            { text: "Okay je", value: 1 },
            { text: "Tak berminat", value: 0 }
        ]
    },
    {
        id: 13,
        text: "Kalau kawan birthday, kamu buat apa?",
        type: "Giver",
        options: [
            { text: "Beli hadiah yang mahal", value: 5 },
            { text: "Beli hadiah yang cantik", value: 3 },
            { text: "Buat kad sendiri", value: 1 },
            { text: "Ucap selamat hari lahir je", value: 0 }
        ]
    },
    {
        id: 14,
        text: "Kamu suka tak plan macam mana nak guna duit?",
        type: "Money Avoider",
        options: [
            { text: "Tak suka, pening kepala", value: 5 },
            { text: "Malas nak fikir", value: 3 },
            { text: "Okay je", value: 1 },
            { text: "Suka! Best plan", value: 0 }
        ]
    },
    {
        id: 15,
        text: "Kenapa kamu nak beg sekolah yang branded?",
        type: "Status Seeker",
        options: [
            { text: "Nak kawan jealous", value: 5 },
            { text: "Nampak cool", value: 3 },
            { text: "Quality bagus", value: 1 },
            { text: "Saya tak kisah brand", value: 0 }
        ]
    },
    {
        id: 16,
        text: "Kalau tabung duit kamu dah penuh, kamu buat apa?",
        type: "Saver",
        options: [
            { text: "Buka akaun bank", value: 5 },
            { text: "Cari tabung yang lagi besar", value: 3 },
            { text: "Guna sikit untuk beli benda", value: 1 },
            { text: "Habiskan semua", value: 0 }
        ]
    },
    {
        id: 17,
        text: "Bila pergi kedai, kamu selalu beli apa yang tak plan?",
        type: "Spender",
        options: [
            { text: "Selalu! Banyak benda menarik", value: 5 },
            { text: "Kadang-kadang", value: 3 },
            { text: "Jarang", value: 1 },
            { text: "Tak pernah", value: 0 }
        ]
    },
    {
        id: 18,
        text: "Kalau family member sakit, kamu nak tolong macam mana?",
        type: "Giver",
        options: [
            { text: "Guna duit simpanan untuk ubat", value: 5 },
            { text: "Bagi sebahagian duit saya", value: 3 },
            { text: "Jaga dia", value: 1 },
            { text: "Doakan dia sihat", value: 0 }
        ]
    },
    {
        id: 19,
        text: "Kamu rasa duit tu penting tak dalam hidup?",
        type: "Money Avoider",
        options: [
            { text: "Tak penting, ada banyak benda lain", value: 5 },
            { text: "Sikit je penting", value: 3 },
            { text: "Penting jugak", value: 1 },
            { text: "Sangat penting!", value: 0 }
        ]
    },
    {
        id: 20,
        text: "Kalau kawan puji barang mahal kamu, kamu rasa apa?",
        type: "Status Seeker",
        options: [
            { text: "Bangga sangat!", value: 5 },
            { text: "Seronok sikit", value: 3 },
            { text: "Biasa je", value: 1 },
            { text: "Malu pulak", value: 0 }
        ]
    }
];

// Personality types and their descriptions (Bahasa Malaysia)
const personalityTypes = {
    "Saver": {
        title: "Penyimpan",
        icon: "🐷",
        description: "Kamu seorang yang bijak dengan duit! Kamu suka simpan duit untuk masa depan dan fikir betul-betul sebelum beli sesuatu. Teruskan tabiat baik ini!"
    },
    "Spender": {
        title: "Pemboros",
        icon: "🛒",
        description: "Kamu seronok shopping dan beli barang! Tapi cuba belajar simpan sikit duit untuk masa depan ya. Balance antara seronok dan simpan!"
    },
    "Giver": {
        title: "Pemurah",
        icon: "❤️",
        description: "Kamu baik hati dan suka tolong orang lain! Tapi jangan lupa jaga duit sendiri jugak. Tolong orang tapi jangan sampai susah sendiri."
    },
    "Money Avoider": {
        title: "Pengelak Duit",
        icon: "🙈",
        description: "Kamu tak suka fikir pasal duit kan? Cuba belajar sikit-sikit pasal duit sebab penting untuk masa depan. Mula dengan benda simple!"
    },
    "Status Seeker": {
        title: "Pengejar Status",
        icon: "👑",
        description: "Kamu suka barang cantik dan mahal untuk tunjuk pada kawan! Tak salah, tapi ingat yang penting bukan harga tapi kegunaan barang tu."
    }
};

// Application state
let currentQuestionIndex = 0;
let answers = [];
let scores = {
    "Saver": 0,
    "Spender": 0,
    "Giver": 0,
    "Money Avoider": 0,
    "Status Seeker": 0
};

// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const testScreen = document.getElementById('test-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const progressPercentage = document.getElementById('progress-percentage');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const questionCounter = document.getElementById('question-counter');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    if (totalQuestionsSpan) totalQuestionsSpan.textContent = questions.length;

    if (startBtn) startBtn.addEventListener('click', startTest);
    if (backBtn) backBtn.addEventListener('click', goToWelcome);
    if (prevBtn) prevBtn.addEventListener('click', previousQuestion);
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);

    // Add event listener for retake button
    const retakeBtn = document.getElementById('retake-btn');
    if (retakeBtn) {
        retakeBtn.addEventListener('click', function() {
            resetTest();
            showWelcomeScreen();
        });
    }
});

// Start the test
function startTest() {
    welcomeScreen.classList.remove('active');
    testScreen.classList.add('active');
    currentQuestionIndex = 0;
    answers = [];
    resetScores();
    showQuestion();
    updateNavigationButtons();
}

// Reset scores
function resetScores() {
    scores = {
        "Saver": 0,
        "Spender": 0,
        "Giver": 0,
        "Money Avoider": 0,
        "Status Seeker": 0
    };
}

// Show current question
function showQuestion() {
    const question = questions[currentQuestionIndex];

    // Update question text with animation
    if (questionText) {
        questionText.style.opacity = '0';
        setTimeout(() => {
            questionText.textContent = question.text;
            questionText.style.opacity = '1';
        }, 150);
    }

    // Update progress
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    if (progressFill) progressFill.style.width = progress + '%';
    if (progressPercentage) progressPercentage.textContent = Math.round(progress) + '%';
    if (progressText) {
        progressText.innerHTML = `Soalan <span>${currentQuestionIndex + 1}</span> daripada <span>${questions.length}</span>`;
    }
    if (questionCounter) questionCounter.textContent = currentQuestionIndex + 1;

    // Create options
    if (optionsContainer) {
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = createOption(option.text, option.value, index);
            optionsContainer.appendChild(optionElement);
        });

        // Restore previous answer if exists
        if (answers[currentQuestionIndex]) {
            const previousAnswer = answers[currentQuestionIndex];
            const selectedOption = optionsContainer.querySelector(`[data-value="${previousAnswer.value}"]`);
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }
    }

    updateNavigationButtons();
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
    // Remove previous selections
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Select current option
    optionElement.classList.add('selected');

    // Store answer
    const question = questions[currentQuestionIndex];
    answers[currentQuestionIndex] = {
        questionId: question.id,
        answer: optionElement.textContent,
        value: value,
        type: question.type
    };

    // Update scores
    updateScores();
    updateNavigationButtons();

    // Add a small delay for visual feedback
    setTimeout(() => {
        // Auto advance to next question if not the last one
        if (currentQuestionIndex < questions.length - 1) {
            nextQuestion();
        }
    }, 600);
}

// Update scores based on current answers
function updateScores() {
    resetScores();

    answers.forEach(answer => {
        if (answer && answer.value !== undefined) {
            scores[answer.type] += answer.value;
        }
    });
}

// Go to next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else if (answers[currentQuestionIndex]) {
        // All questions answered, show results
        showResults();
    }
}

// Go to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// Go back to welcome screen
function goToWelcome() {
    testScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    resetTest();
}

// Update navigation buttons
function updateNavigationButtons() {
    // Previous button
    if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;

    // Next button
    const hasAnswer = answers[currentQuestionIndex] !== undefined;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (nextBtn) {
        if (isLastQuestion && hasAnswer) {
            nextBtn.textContent = 'Lihat Hasil →';
            nextBtn.disabled = false;
        } else {
            nextBtn.textContent = 'Seterusnya →';
            nextBtn.disabled = !hasAnswer;
        }
    }
}

// Reset test
function resetTest() {
    currentQuestionIndex = 0;
    answers = [];
    resetScores();
}

// Show welcome screen
function showWelcomeScreen() {
    if (resultsScreen) resultsScreen.classList.remove('active');
    if (testScreen) testScreen.classList.remove('active');
    if (welcomeScreen) welcomeScreen.classList.add('active');
}

// Show results
function showResults() {
    testScreen.classList.remove('active');
    resultsScreen.classList.add('active');

    // Calculate highest scoring personality type
    const maxScore = Math.max(...Object.values(scores));
    const topPersonalities = Object.keys(scores).filter(type => scores[type] === maxScore);

    // Display main result
    const mainPersonality = topPersonalities[0];
    const personalityData = personalityTypes[mainPersonality];

    const highestPersonalities = document.getElementById('highest-personalities');
    if (highestPersonalities) {
        highestPersonalities.innerHTML = `
            <div class="personality-result">
                <div class="personality-icon">${personalityData.icon}</div>
                <h2>${personalityData.title}</h2>
                <p>${personalityData.description}</p>
            </div>
        `;
    }

    // Display other personality types
    const otherPersonalities = document.getElementById('other-personalities');
    if (otherPersonalities) {
        otherPersonalities.innerHTML = '';

        Object.keys(personalityTypes).forEach(type => {
            if (type !== mainPersonality) {
                const data = personalityTypes[type];
                const percentage = Math.round((scores[type] / (questions.length * 5)) * 100);

                const typeElement = document.createElement('div');
                typeElement.className = 'other-personality';
                typeElement.innerHTML = `
                    <div class="other-icon">${data.icon}</div>
                    <div class="other-info">
                        <h4>${data.title}</h4>
                    </div>
                `;
                otherPersonalities.appendChild(typeElement);
            }
        });
    }
}
    });
    
    // Select the clicked option
    selectedOption.classList.add('selected');
    
    // Store the answer
    const answer = selectedOption.dataset.value === 'yes';
    answers[currentQuestion] = answer;
    
    // Update scores
    const question = questions[currentQuestion];
    if (answer) {
        scores[question.type]++;
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
        nextQuestion();
    }, 500);
}

// Move to next question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Go back to previous question
function goBack() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    } else {
        // Go back to welcome screen
        testScreen.classList.remove('active');
        welcomeScreen.classList.add('active');
        resetTest();
    }
}

// Show results
function showResults() {
    testScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // Calculate personality type
    const personalityType = calculatePersonalityType();
    const personality = personalityTypes[personalityType];
    
    // Update results display
    personalityIcon.innerHTML = `<i class="${personality.icon}"></i>`;
    personalityTitle.textContent = personality.title;
    personalityDescription.textContent = personality.description;
}

// Calculate personality type based on scores
function calculatePersonalityType() {
    let maxScore = 0;
    let maxType = "Saver";
    
    for (const [type, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            maxType = type;
        }
    }
    
    return maxType;
}

// Retake test
function retakeTest() {
    resultsScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    resetTest();
}

// Reset test state
function resetTest() {
    currentQuestion = 0;
    answers = [];
    scores = {
        "Saver": 0,
        "Spender": 0,
        "Giver": 0,
        "Money Avoider": 0,
        "Status Seeker": 0
    };
}

// Share results (placeholder)
function shareResults() {
    const personalityType = calculatePersonalityType();
    const personality = personalityTypes[personalityType];
    
    const shareText = `I just took a Money Personality Test and found out I'm a ${personality.title}! Take the test yourself to discover your money personality type.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Money Personality Test Result',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Results copied to clipboard!');
        });
    }
} 