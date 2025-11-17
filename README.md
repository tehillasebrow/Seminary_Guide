Seminary in Israel Guide
I built this web app to make day-to-day seminary life in Israel less stressful. It pulls together all the tools I kept needing—budgeting, tracking expenses, bus info, and currency conversions—so everything is in one spot and easy to use.

📱 Features
Smart Expense Tracker:

Budget Management: Set a monthly budget limit. The app visually warns you (turning red) if your spending exceeds your budget.

Categorization: Organize expenses by type (Food, Transportation, Shopping, etc.) to better understand your spending habits.

Persistent Data: Everything is stored using Local Storage, so your budget and expense list remain saved even after you close the browser.

Live Currency Converter:

Fetches real-time USD to ILS exchange rates using a live API.

Includes an offline fallback mode that uses estimated rates if no internet connection is available.

Transportation Guide: Quick reference charts for common inter-city bus routes and fares.

Info & Tips: A curated collection of useful resources for students spending the year abroad.

🛠️ Technologies Used
HTML5: Semantic structure and multi-page setup.

CSS3 & Bootstrap: Clean, responsive layout that works perfectly on both mobile phones and laptops.

JavaScript (ES6+):

Fetch API & Async/Await: To retrieve live currency data from external APIs.

DOM Manipulation: For dynamically building the expense table and updating budget status colors (Green/Red) in real-time.

Local Storage: Implemented CRUD (Create, Read, Delete) operations to persist user data.

Defensive Programming: Includes safety checks to ensure scripts run smoothly across different pages without errors.
