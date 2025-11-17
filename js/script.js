async function convertCurrency() {
    const amount = parseFloat(document.getElementById("usd-amount").value);
    const resultDisplay = document.getElementById("conversion-result");

    if (isNaN(amount)) {
        resultDisplay.textContent = "Please enter a valid number.";
        return;
    }

    try {
        resultDisplay.textContent = "Fetching rate...";
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const rate = data.rates.ILS;
        const ilsAmount = (amount * rate).toFixed(2);
        resultDisplay.textContent = `${amount} USD = ${ilsAmount} ILS (Live Rate: ${rate})`;
    } catch (error) {
        const fallbackRate = 3.8;
        const ilsAmount = (amount * fallbackRate).toFixed(2);
        resultDisplay.textContent = `${amount} USD ≈ ${ilsAmount} ILS (Offline Estimate)`;
    }
}

let expenses = JSON.parse(localStorage.getItem('semExpenses')) || [];
let monthlyBudget = parseFloat(localStorage.getItem('semBudget')) || 0;

function setBudget() {
    const budgetInput = document.getElementById("budget-limit");
    const val = parseFloat(budgetInput.value);
    if (!isNaN(val) && val > 0) {
        monthlyBudget = val;
        localStorage.setItem('semBudget', monthlyBudget);
        updateExpensesTable(); 
        alert("Budget set successfully!");
    }
}

function addExpense() {
    const itemName = document.getElementById("item-name").value;
    const itemCategory = document.getElementById("item-category").value;
    const costIls = parseFloat(document.getElementById("item-cost-ils").value);
    const costUsd = parseFloat(document.getElementById("item-cost-usd").value);

    if (itemName && !isNaN(costIls) && !isNaN(costUsd)) {
        expenses.push({ itemName, itemCategory, costIls, costUsd });
        localStorage.setItem('semExpenses', JSON.stringify(expenses));
        updateExpensesTable();
        
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
        row.innerHTML = `
            <td>${expense.itemName}</td>
            <td>${expense.itemCategory || 'Other'}</td>
            <td>${expense.costIls.toFixed(2)} ILS</td>
            <td>${expense.costUsd.toFixed(2)} USD</td>
            <td><button onclick="deleteExpense(${index})" class="btn btn-sm btn-danger">X</button></td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("total-expenses").textContent = `Total Spent: ${totalIls.toFixed(2)} ILS (${totalUsd.toFixed(2)} USD)`;
    
    updateBudgetDisplay(totalIls);
}

function updateBudgetDisplay(totalSpent) {
    const budgetStatus = document.getElementById("budget-status");
    const budgetInput = document.getElementById("budget-limit");
    
    if (budgetInput && monthlyBudget > 0) {
        budgetInput.value = monthlyBudget; 
    }

    if (budgetStatus && monthlyBudget > 0) {
        const remaining = monthlyBudget - totalSpent;
        budgetStatus.textContent = `Budget: ${monthlyBudget} ILS | Remaining: ${remaining.toFixed(2)} ILS`;
        budgetStatus.style.color = remaining < 0 ? "red" : "green";
    } else if (budgetStatus) {
        budgetStatus.textContent = "No budget limit set.";
        budgetStatus.style.color = "navy";
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('semExpenses', JSON.stringify(expenses));
    updateExpensesTable();
}

function calculateDateDifference(lastModified) {
    const currentDate = new Date();
    const modifiedDate = new Date(lastModified);
    const differenceMs = currentDate - modifiedDate;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const differenceHours = Math.floor((differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return {differenceDays, differenceHours};
}

function displayLastModified() {
    const lastModified = document.lastModified;
    const {differenceDays, differenceHours} = calculateDateDifference(lastModified);
    const footer = document.getElementById('footer');
    if (footer) {
        footer.textContent = `Page last modified on: ${lastModified}. Time since: ${differenceDays} days, ${differenceHours} hours.`;
    }
}

window.onload = function () {
    displayLastModified();
    updateExpensesTable();
};
