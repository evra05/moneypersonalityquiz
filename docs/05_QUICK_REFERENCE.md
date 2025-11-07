# 🚀 Quick Reference Guide - Money Personality Quiz

A condensed cheat sheet for developers. For detailed information, see [Complete Documentation](./COMPLETE_DOCUMENTATION.md).

---

## ⚡ Quick Commands

```bash
# Installation
npm install                     # Install dependencies

# Development
npm start                       # Start server (port 8080)
npm run dev                     # Start server (port 3000)

# Deployment
npm run deploy                  # Push to GitHub
npm run deploy:gh-pages         # Deploy to GitHub Pages
bash deploy.sh                  # Run deployment script
firebase deploy                 # Deploy to Firebase Hosting

# Firebase
firebase login                  # Login to Firebase
firebase init                   # Initialize Firebase project
firebase emulators:start        # Start local emulators
firebase deploy --only hosting  # Deploy only hosting
```

---

## 📁 File Quick Access

| Path | Purpose |
|------|---------|
| `public/index.html` | Main quiz page |
| `public/admin-panel.html` | Admin interface |
| `public/styles/styles.css` | Main stylesheet |
| `src/js/app.js` | Main app logic |
| `src/js/scoring.js` | Scoring algorithm |
| `config/firebase.js` | Firebase config |
| `config/constants.js` | App constants |
| `firestore.rules` | Security rules |

---

## 🔑 Login Credentials

**Admin Panel** (`/admin-panel.html`)
- Username: `admin2024`
- Password: `MoneyTest@2024!`

**Firebase Admin UID**
- Admin UID: `q5q5JIxzOTUkOCqUtqjZimZtzGT2`
- Update in `firestore.rules` for production

---

## 🔥 Firebase Quick Reference

### Configuration

```javascript
// config/firebase.js
const firebaseConfig = {
    apiKey: "AIzaSyDqZF8NrUcsMOIaaevC7CrtqFs5r8tgeBI",
    authDomain: "moneypersonalityquiz.firebaseapp.com",
    projectId: "moneypersonalityquiz",
    storageBucket: "moneypersonalityquiz.firebasestorage.app",
    messagingSenderId: "978040983989",
    appId: "1:978040983989:web:fdcbe7cfab81f644f149fc",
    measurementId: "G-C86TXY4ZE0"
};
```

### Common Operations

```javascript
// Import Firebase modules
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Sign in anonymously
const auth = getAuth();
await signInAnonymously(auth);

// Add document
const db = getFirestore();
await addDoc(collection(db, 'testResults'), {
    userName: 'John',
    score: 85
});

// Read documents
const querySnapshot = await getDocs(collection(db, 'testResults'));
querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
});
```

### Security Rules Template

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return request.auth != null && 
             request.auth.uid == "YOUR_ADMIN_UID";
    }
    
    // Test results
    match /testResults/{docId} {
      allow create: if isSignedIn();
      allow read, update, delete: if isAdmin();
    }
  }
}
```

---

## 🧠 Quiz Logic Quick Reference

### Personality Types

| Type | Character | Questions | Key Trait |
|------|-----------|-----------|-----------|
| Saver | Sofi Simpan | 1-4 | Saves money |
| Spender | Zara Zoom Shopping | 5-8 | Loves shopping |
| Giver | Mubin Murah Hati | 9-12 | Generous |
| Money Avoider | Danial Don't Care | 13-16 | Avoids money topics |
| Status Seeker | FaSHA Fashionista | 17-20 | Values status |

### Scoring Formula

```javascript
// Score calculation
score = (yesAnswers / totalQuestions) * 100;

// Example: 3 "Yes" out of 4 questions
score = (3 / 4) * 100 = 75%
```

### Question Structure

```javascript
{
    questionNo: 1,
    question: "Question text in Malay",
    personalityType: "Saver",
    category: "Saver"
}
```

### Answer Structure

```javascript
{
    questionNo: 1,
    answer: "yes",  // or "no"
    personalityType: "Saver",
    timestamp: "2025-11-07T10:30:00Z"
}
```

### Result Structure

```javascript
{
    userName: "Ahmad",
    userEmail: "ahmad@example.com",
    userPhone: "+60123456789",
    answers: [...],
    scores: {
        Saver: 4,
        Spender: 1,
        Giver: 2,
        "Money Avoider": 0,
        "Status Seeker": 1
    },
    personalityPercentages: {
        Saver: 100,
        Spender: 25,
        Giver: 50,
        "Money Avoider": 0,
        "Status Seeker": 25
    },
    topPersonalities: ["Saver", "Giver"],
    timestamp: "2025-11-07T10:30:00Z"
}
```

---

## 🎨 UI Component IDs

```javascript
// Main elements
document.getElementById('landing-page')
document.getElementById('quiz-container')
document.getElementById('results-page')
document.getElementById('admin-panel')

// Buttons
document.getElementById('start-btn')
document.getElementById('submit-answer-btn')
document.getElementById('next-btn')
document.getElementById('back-btn')
document.getElementById('retake-btn')
document.getElementById('share-btn')

// Form inputs
document.getElementById('user-name')
document.getElementById('user-email')
document.getElementById('user-phone')

// Display elements
document.getElementById('question-text')
document.getElementById('progress-bar')
document.getElementById('question-counter')
document.getElementById('result-personality')
document.getElementById('result-score')
```

---

## 🛠️ Common Code Snippets

### Initialize App

```javascript
// src/js/app.js
function initApp() {
    console.log('App initialized');
    setupEventListeners();
    loadQuestions();
}

document.addEventListener('DOMContentLoaded', initApp);
```

### Show Notification

```javascript
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
```

### Validate Email

```javascript
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
```

### Local Storage Operations

```javascript
// Save data
localStorage.setItem('quiz_answers', JSON.stringify(answers));

// Get data
const answers = JSON.parse(localStorage.getItem('quiz_answers'));

// Remove data
localStorage.removeItem('quiz_answers');

// Clear all
localStorage.clear();
```

### Error Handling Template

```javascript
async function saveResults(data) {
    try {
        const docRef = await addDoc(collection(db, 'testResults'), data);
        showNotification('Saved successfully!', 'success');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to save. Please try again.', 'error');
        return { success: false, error: error.message };
    }
}
```

---

## 🐛 Debugging Quick Tips

### Check Firebase Connection

```javascript
console.log('Firebase app:', firebase.apps.length);
console.log('Firestore:', !!db);
console.log('Auth:', !!auth);
```

### Enable Firestore Debug Logging

```javascript
firebase.firestore.setLogLevel('debug');
```

### Monitor Auth State

```javascript
auth.onAuthStateChanged(user => {
    console.log('Auth state:', user ? user.uid : 'Not signed in');
});
```

### Check User Answers

```javascript
console.table(answers);
console.log('Total answers:', answers.length);
console.log('Expected:', 20);
```

### Verify Scores

```javascript
console.log('Scores:', scores);
console.log('Percentages:', percentages);
console.log('Winner:', topPersonalities[0]);
```

---

## 🔗 Important URLs

| Purpose | URL |
|---------|-----|
| **Live Site** | https://evra05.github.io/moneypersonalitytest/ |
| **Local Dev** | http://localhost:8080 |
| **Admin Panel** | http://localhost:8080/admin-panel.html |
| **Firebase Console** | https://console.firebase.google.com/project/moneypersonalityquiz |
| **GitHub Repo** | https://github.com/evra05/moneypersonalitytest |
| **Firebase Docs** | https://firebase.google.com/docs |
| **Airtable API** | https://airtable.com/api |

---

## 📊 Project Statistics

- **Total Questions:** 20
- **Personality Types:** 5
- **Questions per Type:** 4
- **Max Score per Type:** 100%
- **Languages:** Malay (primary)
- **Supported Browsers:** Chrome, Firefox, Safari, Edge (latest 2)

---

## 🎯 Performance Targets

- **First Contentful Paint:** < 1.8s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.8s
- **Lighthouse Performance:** > 90
- **Lighthouse Accessibility:** > 95

---

## 🔐 Security Checklist

- [ ] Change admin password from default
- [ ] Update admin UID in Firestore rules
- [ ] Enable HTTPS in production
- [ ] Remove console.log statements
- [ ] Validate all user inputs
- [ ] Test security rules in emulator
- [ ] Review API key restrictions
- [ ] Enable Firebase App Check (optional)

---

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```

### Commit Message Format

```
type: Brief description

- Detailed change 1
- Detailed change 2

Types: feat, fix, docs, style, refactor, test, chore
```

---

## 🚨 Common Errors & Quick Fixes

### Error: "Firebase not initialized"
```javascript
// Solution: Check if Firebase is loaded
if (typeof firebase !== 'undefined') {
    // Firebase is ready
}
```

### Error: "Permission denied"
```javascript
// Solution: Check if user is authenticated
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
    } else {
        signInAnonymously(auth);
    }
});
```

### Error: "CORS policy violation"
```javascript
// Solution: Use server-side proxy or configure CORS
// For development, use cors-anywhere or local proxy
```

### Error: "npm install fails"
```bash
# Solution: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Further Reading

- **Complete Documentation:** [COMPLETE_DOCUMENTATION.md](./COMPLETE_DOCUMENTATION.md)
- **Documentation Index:** [INDEX.md](./INDEX.md)
- **Firebase Setup:** [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **Admin Panel Guide:** [Admin-Panel.md](./Admin-Panel.md)
- **Scoring System:** [NEW_SCORING_SYSTEM.md](./NEW_SCORING_SYSTEM.md)

---

**Quick Reference Version:** 1.0.0  
**Last Updated:** November 7, 2025  

*For detailed information, always refer to the [Complete Documentation](./COMPLETE_DOCUMENTATION.md)*

