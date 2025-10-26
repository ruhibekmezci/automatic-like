# automatic-like
Auto-like script for Chrome Console: finds possible like buttons, clicks them with random delays, supports max click limit and manual stop control.

# Auto Like Script

A lightweight JavaScript automation script for the **Chrome Console** that automatically clicks "like" buttons on any webpage.  
Perfect for testing automation behavior or simulating user interaction in a safe environment.

---

## 🚀 Features
- Detects multiple types of "like" buttons using flexible selectors  
- Random delay between clicks (human-like behavior)  
- Adjustable maximum click count  
- Manual stop control (`window.stopAutoLike = true`)  
- Works directly from Chrome DevTools Console — no setup needed

---

## 🧩 Usage
1. Open the target webpage  
2. Press `F12` to open **Developer Tools → Console**  
3. Paste the script below and press **Enter**  
4. Watch it automatically click the like buttons

To stop the process manually:
```js
window.stopAutoLike = true;

You can tweak parameters inside the script:
maxClicks = 30;       // maximum number of likes
minDelayMs = 700;     // minimum delay between clicks
maxDelayMs = 1800;    // maximum delay between clicks
selectorHints = [     // custom CSS selectors for like buttons
  'button[aria-label*="Like"]',
  'button[aria-label*="Beğen"]',
  '.like-button'
];

