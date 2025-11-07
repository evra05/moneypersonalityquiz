### Admin Panel Guide

This guide explains how to view user-submitted data (name, email, phone number) in the Admin Panel and how to use Export and Clear functions. It also includes an optional enhancement to automatically clear data after each export to prevent duplicates in future exports.

---

### Access

- Open the file: `public/admin-panel.html`
- Open directly in a browser or via a local dev server.
- Login credentials (editable in `public/admin-panel.html`):
  - Username: `admin2024`
  - Password: `MoneyTest@2024!`

---

### Data Source and What You See

- Test results come from the Firestore collection `testResults`.
  - Each result typically includes:
    - `userName` (name)
    - `userEmail` (email)
    - `userPhone` (phone)
    - `scores` (scores per personality type)
    - `topPersonalities` or `personalityType` (derived personality type)
    - `timestamp` (when the result was recorded)
- Dashboard loading and statistics:
  - Clicking “Refresh Data” in the sidebar (or auto-load after login) calls `loadAllData()` to fetch from `testResults` and update statistics and lists.

---

### Export Data

- Clicking “Export Data” runs `exportData()`:
  - Exports a JSON file named like: `money-personality-data-YYYY-MM-DD.json`
  - Includes: `allResults` (with name, email, phone, etc.), `personalityData`, and `exportDate`

---

### Clear All Data

- Clicking “Clear All Data” runs `clearData()`:
  - Prompts for confirmation; upon confirmation, deletes all documents from the `testResults` collection.
  - After deletion, local page state resets and statistics refresh.
- “Advanced Delete” is also available for bulk deletion by personality type, date range, or age (e.g., 7/30/90/365 days).

---

### Auto-clear After Export (Recommended Enhancement)

To avoid exporting old data again, you can automatically clear `testResults` after a successful export. Two options:

- Option A: Add `exportAndClearData()` and change the sidebar menu click from `exportData()` to `exportAndClearData()`.
- Option B: Keep two manual steps (“Export” then “Clear”).

Below are the steps for Option A:

1) In `public/admin-panel.html`, inside the `<script type="module">` where `exportData()` and `clearData()` already exist, add the following functions:

```html
<script type="module">
  // ... existing code (exportData and clearData already defined)

  async function clearDataSilently() {
    try {
      // Same as clearData but without a confirmation prompt, for automatic clearing
      const resultsSnapshot = await getDocs(collection(db, 'testResults'));
      if (resultsSnapshot.empty) return;

      const deletePromises = resultsSnapshot.docs.map(docSnapshot =>
        deleteDoc(doc(db, 'testResults', docSnapshot.id))
      );
      await Promise.all(deletePromises);

      // Reset local state and UI
      allResults = [];
      Object.keys(personalityData).forEach(type => {
        personalityData[type].count = 0;
        personalityData[type].results = [];
        personalityData[type].percentage = 0;
      });
      displayPersonalityData();
      updateOverallStats();
      showAlert('✅ Data cleared automatically after export', 'success');
    } catch (error) {
      console.error('Auto clear error:', error);
      showAlert('❌ Auto-clear failed: ' + error.message, 'error');
    }
  }

  async function exportAndClearData() {
    try {
      // Export first
      exportData();
    } finally {
      // Then clear silently
      await clearDataSilently();
    }
  }

  // Expose to window (consistent with existing functions)
  window.exportAndClearData = exportAndClearData;
  window.clearDataSilently = clearDataSilently;
}</script>
```

2) Change the sidebar “Export Data” menu click handler from `exportData()` to `exportAndClearData()`:

```html
<!-- Original: onclick="exportData()" -->
<div class="nav-item" onclick="exportAndClearData()">
  <span class="nav-icon">📥</span>
  <span class="nav-text">Export Data</span>
  <span style="margin-left:6px;color:#28a745;font-weight:600;">(Auto-Clear)</span>
  </div>
```

After these changes, each click on “Export Data” will:
- Download a fresh JSON export;
- Automatically clear the `testResults` data in Firestore;
- Reset on-screen totals and lists, ensuring the next export won’t include old data.

---

### Notes and Best Practices

- Clearing data is irreversible. Ensure the exported file is downloaded and verified before enabling auto-clear or clearing.
- If you also need to export basic user records (e.g., the `users` collection), you can extend similarly:
  - Add `getDocs` export logic for the `users` collection;
  - Optionally extend `clearDataSilently()` to clear `users` as well (evaluate carefully).
- To change login credentials, modify `ADMIN_CREDENTIALS` in `public/admin-panel.html`.

---

### FAQ

- Is the exported file empty?
  - Make sure you clicked “Refresh Data” after login, or verify that data is being written to `testResults`.
- Auto-clear didn’t run?
  - Confirm the menu now calls `exportAndClearData()`; check the browser console for Firestore permission or network errors.
- Prefer not to auto-clear?
  - Keep the original `exportData()` and `clearData()` and run them manually as two steps.

