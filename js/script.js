// Currency Conversion Function
function convertCurrency() {
    const usdToIlsRate = 3.8; // Example conversion rate
    const usdAmount = parseFloat(document.getElementById("usd-amount").value);
    if (!isNaN(usdAmount)) {
        const ilsAmount = (usdAmount * usdToIlsRate).toFixed(2);
        document.getElementById("conversion-result").textContent = `${usdAmount} USD is approximately ${ilsAmount} ILS.`;
    } else {
        document.getElementById("conversion-result").textContent = "Please enter a valid number.";
    }
}

// --- EXPENSE TRACKER (IMPROVED) ---

// 1. Load expenses from LocalStorage (or start with empty array if none exist)
let expenses = JSON.parse(localStorage.getItem('semExpenses')) || [];

// 2. Run this immediately to show any saved data when the page loads
updateExpensesTable();

function addExpense() {
    const itemName = document.getElementById("item-name").value;
    const costIls = parseFloat(document.getElementById("item-cost-ils").value);
    const costUsd = parseFloat(document.getElementById("item-cost-usd").value);

    if (itemName && !isNaN(costIls) && !isNaN(costUsd)) {
        expenses.push({itemName, costIls, costUsd});
        
        // 3. Save to LocalStorage whenever we add a new item
        localStorage.setItem('semExpenses', JSON.stringify(expenses));
        
        updateExpensesTable();
        
        // 4. Clear the input fields for better user experience
        document.getElementById("item-name").value = "";
        document.getElementById("item-cost-ils").value = "";
        document.getElementById("item-cost-usd").value = "";
    } else {
        alert("Please fill in all fields with valid data.");
    }
}

function updateExpensesTable() {
    const tableBody = document.querySelector("#expenses-table tbody");
    
    
    if (!tableBody) return; 

    tableBody.innerHTML = "";
    
    let totalIls = 0, totalUsd = 0;
    
    
    expenses.forEach((expense, index) => {
        totalIls += expense.costIls;
        totalUsd += expense.costUsd;

        const row = document.createElement("tr");
        // Added a Delete button column to the row
        row.innerHTML = `
            <td>${expense.itemName}</td>
            <td>${expense.costIls.toFixed(2)} ILS</td>
            <td>${expense.costUsd.toFixed(2)} USD</td>
            <td><button onclick="deleteExpense(${index})" class="btn btn-sm btn-danger" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer;">X</button></td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("total-expenses").textContent = `Total: ${totalIls.toFixed(2)} ILS (${totalUsd.toFixed(2)} USD)`;
}


function deleteExpense(index) {
    expenses.splice(index, 1); // Remove item at specific index
    localStorage.setItem('semExpenses', JSON.stringify(expenses)); // Update storage
    updateExpensesTable(); // Refresh screen
}

// --- END EXPENSE TRACKER ---

// Function to create and insert the button
function addButton() {
    const button = document.createElement('button1');
    button.textContent = "Show Info";

    button.addEventListener('click', () => {
        const overlay = document.getElementById('overlay');
        overlay.textContent = "Names: Tehilla Sebrow, Aviva Robinson, Rikki Mann. Semester: Fall 2024";
        overlay.style.display = "flex";

        setTimeout(() => {
            overlay.style.display = "none";
        }, 3000);
    });

    document.body.appendChild(button);
}

// Function to calculate the difference between two dates in days and hours
function calculateDateDifference(lastModified) {
    const currentDate = new Date();
    const modifiedDate = new Date(lastModified);

    const differenceMs = currentDate - modifiedDate;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const differenceHours = Math.floor((differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return {differenceDays, differenceHours};
}

// Function to display the last modified information
function displayLastModified() {
    const lastModified = document.lastModified;
    const {differenceDays, differenceHours} = calculateDateDifference(lastModified);

    const footer = document.getElementById('footer');
    footer.textContent = `Page last modified on: ${lastModified}. 
    Time since last modification: ${differenceDays} days and ${differenceHours} hours.`;
}

// Initialize features on page load
window.onload = function () {
    addButton();
    displayLastModified();
    updateExpensesTable(); // Ensure table is drawn on load
};
