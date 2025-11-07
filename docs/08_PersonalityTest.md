# Money Personality Test Specification (Firebase Integration + 25 Questions + Decimal Scoring)

## 🎯 Objective
Design a money personality test with 25 questions, using a decimal scoring system (see @NEW_SCORING_SYSTEM.md), and store user data and results in Firebase. The test will determine which of 5 money personality types the user belongs to:
1. Saver
2. Spender
3. Giver
4. Money Avoider
5. Status Seeker

---

## 🧠 Test Rules
- Each question has 3 options:
  - “Yes” = 2.3 points
  - “Sometimes” = 1.4 points
  - “No” = 0.1 points
- Each personality type is assigned 5 questions (total 25 questions).
- The maximum score for each type = 5 × 2.3 = 11.5 points.
- The personality type with the highest score is the user's result.
- If two or more types are within 0.01 points, use this priority order: Saver > Giver > Money Avoider > Spender > Status Seeker.

### Scoring Example
| Personality Type   | Question Numbers      |
|-------------------|----------------------|
| Saver             | 1, 6, 11, 16, 21     |
| Spender           | 2, 7, 12, 17, 22     |
| Giver             | 3, 8, 13, 18, 23     |
| Money Avoider     | 4, 9, 14, 19, 24     |
| Status Seeker     | 5, 10, 15, 20, 25    |

---

## 🖥 Flow Description
1. **Welcome Page**: Briefly introduce the test, click “Start” to continue.
2. **User Info Form**:
   - Name (required, 2-50 characters)
   - Email (required, format validation)
   - Phone number (required, format validation, recommended 11 digits)
   - All inputs must be validated; show error if invalid.
   - On success, save info to Firebase.
3. **Question Section**:
   - Show 1 question per page, with 3 options.
   - Allow navigation back and forth.
   - After all 25 questions, automatically proceed to the results page.
4. **Results Page**:
   - Show user’s personality type, scores, description, and recommendations.
   - Display a cartoon icon for the type (e.g., piggy bank for Saver, SVG/PNG in /assets).
   - All answers and scores are saved to Firebase.

---

## 🔑 User Data Collection
- Name, email, phone (all validated)
- Answers (JSON, record each question’s option and score)
- Calculated scores for each personality type and the final result
- All stored in Firebase Firestore

---

## 📊 Firebase Data Structure
### Collection 1: users
| Field     | Type      |
|-----------|-----------|
| name      | string    |
| email     | string    |
| phone     | string    |
| createdAt | timestamp |

### Collection 2: questions
| Field     | Type      |
|-----------|-----------|
| id        | number    |
| text      | string    |
| type      | string    |
| weight    | number (optional) |

### Collection 3: results
| Field              | Type             |
|--------------------|------------------|
| userId             | reference(users) |
| answers            | array(JSON)      |
| saverScore         | number           |
| spenderScore       | number           |
| giverScore         | number           |
| moneyAvoiderScore  | number           |
| statusSeekerScore  | number           |
| finalPersonality   | string           |
| createdAt          | timestamp        |

---

## ⚙️ Technical Notes
- **Frontend**: HTML/CSS/JS, single-page, paginated questions.
- **Data Storage**: Firebase Firestore.
- **Validation**: All user input validated on the frontend.
- **Scoring**: Decimal system, see @NEW_SCORING_SYSTEM.md.
- **Results Display**: Instant, with cartoon icon.

---

## 🔮 Example Question Format
```json
{
  "id": 1,
  "text": "Do you save part of your allowance every week?",
  "type": "Saver"
}
```

---

## 🚦 Flowchart
1. Welcome Page → 2. User Info Form (validation) → 3. Questions (25) → 4. Results Page (display + storage)

---

## 📝 Notes
- All data is stored in Firebase.
- Questions, personality descriptions, recommendations, and icons can be adjusted as needed.
- Scoring, result determination, and storage logic are detailed in @NEW_SCORING_SYSTEM.md.
