# Seminary in Israel Guide 🇮🇱

I built this web app to make day-to-day life in Israel less stressful for students. It pulls together the tools I found myself needing constantly—budgeting, expense tracking, and currency conversion—into one offline-capable interface.

## 🌟 Key Features
* **Smart Expense Tracker:**
    * **Budget Warnings:** You can set a monthly limit (e.g., 2000 ILS). If your expenses cross that line, the UI visually warns you by turning red.
    * **Categories:** Expenses can be tagged (Food, Travel, Shopping) to keep things organized.
    * **It Remembers You:** I used **Local Storage** so your budget and expense list stay saved in your browser, even if you close the tab or restart your phone.
* **Live Currency Converter:** Fetches real-time USD/ILS rates using a live API, with a fallback mode for when you don't have data.
* **Travel Info:** Quick reference charts for common bus routes.

## 💻 Tech Stack
* **Frontend:** HTML5, CSS3, Bootstrap (it's fully responsive for mobile).
* **JavaScript:** * `async/await` for fetching API data.
    * DOM manipulation for the dynamic tables.
    * Defensive programming to ensure the code runs smoothly on every page.

## 📸 Screenshots
