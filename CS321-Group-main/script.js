const menuInput = document.getElementById("menuInput");
const ingredientsInput = document.getElementById("ingredientsInput");

const menuFileName = document.getElementById("menuFileName");
const ingredientsFileName = document.getElementById("ingredientsFileName");

const customerInput = document.getElementById("customerInput");
const customerFileName = document.getElementById("customerFileName");


// Add event listeners for the Menu Data file input, ensuring only CSV files are accepted and updating the displayed file name accordingly
if (menuInput) {
  menuInput.addEventListener("change", function () {
    const file = menuInput.files[0];
    const removeBtn = document.getElementById("removeMenuBtn");

    if (file) {
      menuFileName.textContent = file.name;
      removeBtn.style.display = "inline-block";
    }
  });
}

// Add event listener for the customer statistics file input, ensuring only CSV files are accepted and updating the displayed file name accordingly
if (ingredientsInput) {
  ingredientsInput.addEventListener("change", function () {
    const file = ingredientsInput.files[0];
    const removeBtn = document.getElementById("removeIngredientsBtn");

    if (file) {
      ingredientsFileName.textContent = file.name;
      removeBtn.style.display = "inline-block";
    }
  });
}


if (customerInput) {
  customerInput.addEventListener("change", function () {
    const file = customerInput.files[0];
    const removeBtn = document.getElementById("removeCustomerBtn");

    if (file) {
      customerFileName.textContent = file.name;
      removeBtn.style.display = "inline-block";
    }
  });
}

function goBack() {
  window.location.href = "index.html";
}

function showTab(tabId, buttonElement) {
  const tabContents = document.querySelectorAll(".tab-content");
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabContents.forEach((tab) => {
    tab.classList.remove("active");
  });

  tabButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  if (buttonElement) {
    buttonElement.classList.add("active");
  }
}

function goToLogin() {
  window.location.href = "login.html";
}

function goToSignup() {
  window.location.href = "signup.html";
}

function signup() {
  const username = document.getElementById("newUser").value;
  const password = document.getElementById("newPassword").value;

  if (!username || !password) {
    alert("Please enter a username and password.");
    return;
  }

  localStorage.setItem("savedUsername", username);
  localStorage.setItem("savedPassword", password);
  localStorage.setItem("user", username);

  window.location.href = "index.html";
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const savedUsername = localStorage.getItem("savedUsername");
  const savedPassword = localStorage.getItem("savedPassword");

  if (username === savedUsername && password === savedPassword) {
    localStorage.setItem("user", username);
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password.");
  }
}

window.onload = function () {
  const user = localStorage.getItem("user");

  const welcomeText = document.getElementById("welcomeText");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const historyBtn = document.getElementById("historyBtn");

  if (user) {
    if (welcomeText) welcomeText.textContent = "Welcome, " + user;
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (historyBtn) historyBtn.style.display = "inline-block";
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
    if (historyBtn) historyBtn.style.display = "none";
  }

  loadResultsPage();
  loadHistoryPage();
};

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function handleLogin(event) {
  event.preventDefault();
  login();
}

function handleSignup(event) {
  event.preventDefault();
  signup();
}

function hasRequiredHeaders(data, requiredHeaders) {
  if (!data || data.length === 0) {
    return false;
  }

  const actualHeaders = Object.keys(data[0]).map(header => header.trim());

  return requiredHeaders.every(requiredHeader =>
    actualHeaders.includes(requiredHeader)
  );
}

function validateCSVData(data, requiredHeaders, fileType, errorText) {
  if (!hasRequiredHeaders(data, requiredHeaders)) {
    errorText.textContent =
      fileType + " CSV format is incorrect. Required columns: " +
      requiredHeaders.join(", ");
    return false;
  }

  return true;
}

function getManualMenuData() {
  const rows = document.querySelectorAll("#manualMenuRows .manual-row");
  const menuData = [];

  rows.forEach(row => {
    const dishName = row.querySelector(".manual-menu-dish").value.trim();
    const menuPrice = row.querySelector(".manual-menu-price").value.trim();
    const unitsSold = row.querySelector(".manual-menu-units").value.trim();

    if (dishName && menuPrice && unitsSold) {
      menuData.push({
        "Dish Name": dishName,
        "Menu Price": menuPrice,
        "Units Sold": unitsSold
      });
    }
  });

  return menuData;
}

function getManualIngredientData() {
  const rows = document.querySelectorAll("#manualIngredientRows .manual-row");
  const ingredientData = [];

  rows.forEach(row => {
    const dishName = row.querySelector(".manual-ingredient-dish").value.trim();
    const ingredientName = row.querySelector(".manual-ingredient-name").value.trim();
    const quantityNeeded = row.querySelector(".manual-ingredient-quantity").value.trim();
    const unitCost = row.querySelector(".manual-ingredient-cost").value.trim();

    if (dishName && ingredientName && quantityNeeded && unitCost) {
      ingredientData.push({
        "Dish Name": dishName,
        "Ingredient Name": ingredientName,
        "Quantity Needed": quantityNeeded,
        "Unit Cost": unitCost
      });
    }
  });

  return ingredientData;
}

function getManualCustomerData() {
  const rows = document.querySelectorAll("#manualCustomerRows .manual-row");
  const customerData = [];

  rows.forEach(row => {
    const dishName = row.querySelector(".manual-customer-dish").value.trim();
    const month = row.querySelector(".manual-customer-month").value.trim();
    const unitsSold = row.querySelector(".manual-customer-units").value.trim();

    if (dishName && month && unitsSold) {
      customerData.push({
        "Dish Name": dishName,
        "Month": month,
        "Units Sold": unitsSold
      });
    }
  });

  return customerData;
}

function parseCSVFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: results => resolve(results.data),
      error: () => reject()
    });
  });
}

async function goToResults() {
  const profitInput = document.getElementById("profitPercent").value;
  const analysisNameInput = document.getElementById("analysisName").value.trim();
  const analysisName = analysisNameInput || "Untitled Analysis";
  const errorText = document.getElementById("profitError");

  errorText.textContent = "";

  if (!profitInput) {
    errorText.textContent = "Please enter a profit percentage.";
    return;
  }

  const targetPercent = parseFloat(profitInput);

  if (isNaN(targetPercent) || targetPercent <= 0) {
    errorText.textContent = "Enter a valid profit percentage.";
    return;
  }

  let menuData = getManualMenuData();
  let ingredientsData = getManualIngredientData();
  let customerData = getManualCustomerData();

  try {
    if (menuInput.files.length > 0) {
      const csv = await parseCSVFile(menuInput.files[0]);
      if (!validateCSVData(csv, ["Dish Name", "Menu Price", "Units Sold"], "Menu Items", errorText)) {
        return;
      }
      menuData = menuData.concat(csv);
    }

    if (ingredientsInput.files.length > 0) {
      const csv = await parseCSVFile(ingredientsInput.files[0]);
      if (!validateCSVData(csv, ["Dish Name", "Ingredient Name", "Quantity Needed", "Unit Cost"], "Ingredients", errorText)) {
        return;
      }
      ingredientsData = ingredientsData.concat(csv);
    }

    if (customerInput.files.length > 0) {
      const csv = await parseCSVFile(customerInput.files[0]);
      if (!validateCSVData(csv, ["Dish Name", "Month", "Units Sold"], "Customer Data", errorText)) {
        return;
      }
      customerData = customerData.concat(csv);
    }
  } catch {
    errorText.textContent = "CSV read error.";
    return;
  }

  if (!menuData.length) {
    errorText.textContent = "Add menu data.";
    return;
  }

  if (!ingredientsData.length) {
    errorText.textContent = "Add ingredient data.";
    return;
  }

  if (!customerData.length) {
    errorText.textContent = "Add customer data.";
    return;
  }

  const analyzedResults = menuData.map(item =>
    analyzeMenuItem(item, ingredientsData, targetPercent)
  );

  const fileNames = {
  menuFile: menuInput.files.length ? menuInput.files[0].name : "Manual Entry",
  ingredientsFile: ingredientsInput.files.length ? ingredientsInput.files[0].name : "Manual Entry",
  customerFile: customerInput.files.length ? customerInput.files[0].name : "Manual Entry"
};

  localStorage.setItem("analysisResults", JSON.stringify(analyzedResults));
  localStorage.setItem("customerData", JSON.stringify(customerData));
  localStorage.setItem("ingredientsData", JSON.stringify(ingredientsData));
  localStorage.setItem("targetProfitPercent", targetPercent);
  localStorage.setItem("analysisName", analysisName);

  saveAnalysisHistory(analyzedResults, customerData, targetPercent, fileNames, analysisName);



  window.location.href = "results.html";
}

function loadResultsPage() {
  const storedResults = localStorage.getItem("analysisResults");
  if (!storedResults) return;

  const results = JSON.parse(storedResults);
  if (!results.length) return;

  const tabsContainer = document.getElementById("tabsContainer");
  const menuItemSection = document.getElementById("menuItem");

  if (!tabsContainer || !menuItemSection) return;

  tabsContainer.innerHTML = "";

  // Overview tab
  const overviewBtn = document.createElement("button");
  overviewBtn.className = "tab-btn active";
  overviewBtn.textContent = "Overview";
  overviewBtn.onclick = function () {
    showTab("overview", overviewBtn);
  };
  tabsContainer.appendChild(overviewBtn);

  // Dynamic menu item tabs
  results.forEach((item) => {
    const itemBtn = document.createElement("button");
    itemBtn.className = "tab-btn";
    itemBtn.textContent = item.dishName;

    itemBtn.onclick = function () {
      updateMenuItemDisplay(item);
      showTab("menuItem", itemBtn);
    };

    tabsContainer.appendChild(itemBtn);
  });

  // Trends tab
  const trendsBtn = document.createElement("button");
  trendsBtn.className = "tab-btn";
  trendsBtn.textContent = "Trends";
  trendsBtn.onclick = function () {
    showTab("trends", trendsBtn);
  };
  tabsContainer.appendChild(trendsBtn);

  // Show first item by default in the menu item panel
  updateMenuItemDisplay(results[0]);
  updateOverviewDisplay(results);
  updateTrendsDisplay();
}

function updateMenuItemDisplay(item) {
  const menuItemTitle = document.getElementById("menuItemTitle");
  const dishCostValue = document.getElementById("dishCostValue");
  const menuPriceValue = document.getElementById("menuPriceValue");
  const profitMarginValue = document.getElementById("profitMarginValue");
  const suggestedPriceValue = document.getElementById("suggestedPriceValue");

  if (menuItemTitle) {
    menuItemTitle.textContent = "Menu Item: " + item.dishName;
  }
  if (dishCostValue) {
    dishCostValue.textContent = "$" + item.cost.toFixed(2);
  }
  if (menuPriceValue) {
    menuPriceValue.textContent = "$" + item.price.toFixed(2);
  }
  if (profitMarginValue) {
    profitMarginValue.textContent = item.margin.toFixed(1) + "%";
  }
  if (suggestedPriceValue) {
    suggestedPriceValue.textContent = "$" + item.suggestedPrice.toFixed(2);
  }

  const itemInsightText = document.getElementById("itemInsightText");

  if (itemInsightText) {
    let insight = "";

    // Margin-based insight
    if (item.margin < 20) {
      insight += item.dishName + " has a low profit margin. ";
      insight += "Consider increasing the price or reducing ingredient costs. ";
    } else if (item.margin < 40) {
      insight += item.dishName + " is moderately profitable. ";
      insight += "Small pricing adjustments could improve returns. ";
    } else {
      insight += item.dishName + " is highly profitable. ";
      insight += "You may have flexibility to adjust pricing competitively. ";
    }

    // Suggested price comparison
    if (item.suggestedPrice > item.price) {
      insight += "The system recommends increasing the price to improve margins. ";
    } else if (item.suggestedPrice < item.price) {
      insight += "The current price is above the target margin, so a lower price could still maintain profitability. ";
    }

    // Demand insight
    if (item.unitsSold > 120) {
      insight += "Demand appears strong, so increasing ingredient purchases may be beneficial.";
    } else if (item.unitsSold < 50) {
      insight += "Demand is relatively low, so this item may need promotion or review.";
    } else {
      insight += "Demand is stable for this item.";
    }

      itemInsightText.textContent = insight;

  }

  const itemBadge = document.getElementById("itemBadge");

  if (itemBadge) {
    // Get all results
    const storedResults = JSON.parse(localStorage.getItem("analysisResults")) || [];

    // Find top seller (highest units sold)
    let topItem = storedResults[0];

    storedResults.forEach(r => {
      if (r.unitsSold > topItem.unitsSold) {
        topItem = r;
      }
    });

    // Show badge only for top seller
    if (item.dishName === topItem.dishName) {
      itemBadge.style.display = "inline-block";
    } else {
      itemBadge.style.display = "none";
    }
  }

  const profitStatusBadge = document.getElementById("profitStatusBadge");

  if (profitStatusBadge) {
    profitStatusBadge.className = "profit-status";

    if (item.margin < 20) {
      profitStatusBadge.textContent = "Low Margin";
      profitStatusBadge.classList.add("low");
    } else if (item.margin < 40) {
      profitStatusBadge.textContent = "Healthy Margin";
      profitStatusBadge.classList.add("medium");
    } else {
      profitStatusBadge.textContent = "High Profit";
      profitStatusBadge.classList.add("high");
    }
  }

  const targetFeedbackText = document.getElementById("targetFeedbackText");
  const targetPercent = parseFloat(localStorage.getItem("targetProfitPercent"));

  if (targetFeedbackText && !isNaN(targetPercent)) {
    if (item.margin > targetPercent) {
      targetFeedbackText.textContent =
        "Above Target: This item is performing well because its profit margin is higher than the target of " +
        targetPercent +
        "%.";
    } else if (item.margin === targetPercent) {
        targetFeedbackText.textContent =
          "Meets Target: This item is exactly meeting the target profit margin of " +
          targetPercent +
          "%.";
    } else {
        targetFeedbackText.textContent =
          "Below Target: This item is below the target margin of " +
        targetPercent +
        "%. Consider increasing the price or reducing ingredient costs.";
    }
  }

  const costBreakdownList = document.getElementById("costBreakdownList");
  const storedIngredients = JSON.parse(localStorage.getItem("ingredientsData")) || [];

  if (costBreakdownList) {
    const ingredientsForDish = storedIngredients.filter(
      ingredient => ingredient["Dish Name"] === item.dishName
    );

    if (ingredientsForDish.length === 0) {
      costBreakdownList.innerHTML = "<p>No ingredient details available.</p>";
    } else {
      let html = "";

      ingredientsForDish.forEach((ingredient) => {
        const name = ingredient["Ingredient Name"];
        const quantity = parseFloat(ingredient["Quantity Needed"]);
        const unitCost = parseFloat(ingredient["Unit Cost"]);
        const totalCost = quantity * unitCost;

        html += `
          <p>
            <strong>${name}</strong>: 
            ${quantity} × $${unitCost.toFixed(2)} = 
            $${totalCost.toFixed(2)}
          </p>
        `;
      });

      html += `<p><strong>Total Dish Cost:</strong> $${item.cost.toFixed(2)}</p>`;

      costBreakdownList.innerHTML = html;
    }
  }

}

function updateOverviewDisplay(results) {
  const totalProfitValue = document.getElementById("totalProfitValue");
  const averageMarginValue = document.getElementById("averageMarginValue");
  const topItemValue = document.getElementById("topItemValue");
  const purchaseSuggestionValue = document.getElementById("purchaseSuggestionValue");
  const overviewSummaryText = document.getElementById("overviewSummaryText");

  let totalWeeklyProfit = 0;
  let totalMargin = 0;
  let topItem = results[0];
  let lowestMarginItem = results[0];

  results.forEach((item) => {
    totalWeeklyProfit += item.totalProfit;
    totalMargin += item.margin;

    if (item.totalProfit > topItem.totalProfit) {
      topItem = item;
    }

    if (item.margin < lowestMarginItem.margin) {
      lowestMarginItem = item;
    }
  });

  const averageMargin = totalMargin / results.length;

  if (totalProfitValue) {
    totalProfitValue.textContent = "$" + totalWeeklyProfit.toFixed(2);
  }

  if (averageMarginValue) {
    averageMarginValue.textContent = averageMargin.toFixed(1) + "%";
  }

  if (topItemValue) {
    topItemValue.textContent = topItem.dishName;
  }

  if (purchaseSuggestionValue) {
    purchaseSuggestionValue.textContent = "Buy more ingredients for " + topItem.dishName;
  }

  if (overviewSummaryText) {
    overviewSummaryText.textContent =
      "The restaurant is generating an estimated weekly profit of $" +
      totalWeeklyProfit.toFixed(2) +
      " with an average profit margin of " +
      averageMargin.toFixed(1) +
      "%. " +
      topItem.dishName +
      " is currently the top-performing menu item. " +
      "The team should prioritize ingredients for " +
      topItem.dishName +
      " and review " +
      lowestMarginItem.dishName +
      " for possible pricing improvements.";
  }
}

function updateTrendsDisplay() {
  const trendsGraph = document.getElementById("trendsGraph");
  const trendsLabels = document.getElementById("trendsLabels");
  const trendInsightText = document.getElementById("trendInsightText");

  const storedCustomerData = localStorage.getItem("customerData");

  if (!trendsGraph || !trendsLabels || !storedCustomerData) return;

  const customerData = JSON.parse(storedCustomerData);

  trendsGraph.innerHTML = "";
  trendsLabels.innerHTML = "";

  const monthlyTotals = {};

  customerData.forEach((row) => {
    const month = row["Month"]?.trim();
    const units = parseFloat(row["Units Sold"]?.trim());

    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }

    monthlyTotals[month] += units;
  });

  const months = Object.keys(monthlyTotals);
  const maxUnits = Math.max(...Object.values(monthlyTotals));

  let topMonth = months[0];

  months.forEach((month) => {
    if (monthlyTotals[month] > monthlyTotals[topMonth]) {
      topMonth = month;
    }

    const bar = document.createElement("div");
    bar.className = "bar";

    const heightPercent = (monthlyTotals[month] / maxUnits) * 100;
    bar.style.height = heightPercent + "%";
    bar.title = month + ": " + monthlyTotals[month] + " units sold";

    trendsGraph.appendChild(bar);

    const label = document.createElement("span");
    label.textContent = month;
    trendsLabels.appendChild(label);
  });

  if (trendInsightText) {
    trendInsightText.textContent =
      "Customer demand was highest in " +
      topMonth +
      " with " +
      monthlyTotals[topMonth] +
      " total units sold. This suggests the restaurant may need additional ingredient planning during higher-demand months.";
  }
}


function saveAnalysisHistory(analyzedResults, customerData, targetPercent, fileNames, analysisName) {
  const user = localStorage.getItem("user");

  if (!user) {
    return; // only save if logged in
  }

  const key = "analysisHistory_" + user;
  const history = JSON.parse(localStorage.getItem(key)) || [];

  const totalProfit = analyzedResults.reduce((sum, item) => sum + item.totalProfit, 0);

  const topItem = analyzedResults.reduce((best, item) =>
    item.totalProfit > best.totalProfit ? item : best
  );

  const analysis = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    name: analysisName,
    targetPercent: targetPercent,
    totalProfit: totalProfit,
    topItem: topItem.dishName,
    fileNames: fileNames,
    results: analyzedResults,
    customerData: customerData,
    ingredientsData: JSON.parse(localStorage.getItem("ingredientsData")) || []
  };

  history.unshift(analysis);

  localStorage.setItem(key, JSON.stringify(history));
}

function goToHistory() {
  window.location.href = "history.html";
}

function loadHistoryPage() {
  const historyList = document.getElementById("historyList");
  if (!historyList) return;

  const user = localStorage.getItem("user");

  if (!user) {
    historyList.innerHTML = "<p>Please log in to view past analyses.</p>";
    return;
  }

  const key = "analysisHistory_" + user;
  const history = JSON.parse(localStorage.getItem(key)) || [];

  if (history.length === 0) {
    historyList.innerHTML = "<p>No past analyses saved yet.</p>";
    return;
  }

  historyList.innerHTML = "";

  history.forEach((analysis) => {
    const card = document.createElement("div");
    card.className = "info-card";

    card.innerHTML = `
      <h2>${analysis.name || "Untitled Analysis"}</h2>
      <p><strong>Date:</strong> ${analysis.date}</p>
      <p><strong>Target Profit:</strong> ${analysis.targetPercent}%</p>
      <p><strong>Total Profit:</strong> $${analysis.totalProfit.toFixed(2)}</p>
      <p><strong>Top Item:</strong> ${analysis.topItem}</p>
      <p><strong>Files:</strong> ${analysis.fileNames.menuFile}, ${analysis.fileNames.ingredientsFile}, ${analysis.fileNames.customerFile}</p>
      <div style="display:flex; gap:10px; margin-top:10px;">
    <button class="primary-btn" onclick="loadSavedAnalysis(${analysis.id})">
      View Analysis
    </button>

    <button class="remove-row-btn" onclick="deleteHistoryItem(${analysis.id})">
      Delete
    </button>
  </div>
`;;

    historyList.appendChild(card);
  });
}

function loadSavedAnalysis(id) {
  const user = localStorage.getItem("user");
  const key = "analysisHistory_" + user;
  const history = JSON.parse(localStorage.getItem(key)) || [];

  const selected = history.find(item => item.id === id);

  if (!selected) {
    alert("Saved analysis not found.");
    return;
  }

  localStorage.setItem("analysisResults", JSON.stringify(selected.results));
  localStorage.setItem("customerData", JSON.stringify(selected.customerData));
  localStorage.setItem("ingredientsData", JSON.stringify(selected.ingredientsData || []));
  localStorage.setItem("targetProfitPercent", selected.targetPercent);
  localStorage.setItem("analysisName", selected.name || "Untitled Analysis");

  window.location.href = "results.html";
}

function deleteHistoryItem(id){
    const user=localStorage.getItem("user");
    if(!user) return;

    const key="analysisHistory_" + user;
    let history=JSON.parse(localStorage.getItem(key)) || {};

    history=history.filter(item=>item.id !==id);

    localStorage.setItem(key,JSON.stringify(history));
    loadHistoryPage();
}
function addMenuRow() {
  const container = document.getElementById("manualMenuRows");

  const row = document.createElement("div");
  row.className = "manual-row";

  row.innerHTML = `
    <input type="text" placeholder="Dish Name" class="manual-menu-dish" />
    <input type="number" placeholder="Menu Price" class="manual-menu-price" step="0.01" min="0" />
    <input type="number" placeholder="Units Sold" class="manual-menu-units" min="0" />
    <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">Remove</button>
  `;

  container.appendChild(row);
}

function addIngredientRow() {
  const container = document.getElementById("manualIngredientRows");

  const row = document.createElement("div");
  row.className = "manual-row ingredient-row";

  row.innerHTML = `
    <input type="text" placeholder="Dish Name" class="manual-ingredient-dish" />
    <input type="text" placeholder="Ingredient Name" class="manual-ingredient-name" />
    <input type="number" placeholder="Quantity Needed" class="manual-ingredient-quantity" step="0.01" min="0" />
    <input type="number" placeholder="Unit Cost" class="manual-ingredient-cost" step="0.01" min="0" />
    <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">Remove</button>
  `;

  container.appendChild(row);
}

function addCustomerRow() {
  const container = document.getElementById("manualCustomerRows");

  const row = document.createElement("div");
  row.className = "manual-row";

  row.innerHTML = `
    <input type="text" placeholder="Dish Name" class="manual-customer-dish" />
    <input type="text" placeholder="Month" class="manual-customer-month" />
    <input type="number" placeholder="Units Sold" class="manual-customer-units" min="0" />
    <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">Remove</button>
  `;

  container.appendChild(row);
}
function clearAllInputs() {
  const menuInput = document.getElementById("menuInput");
  const ingredientsInput = document.getElementById("ingredientsInput");
  const customerInput = document.getElementById("customerInput");

  const menuFileName = document.getElementById("menuFileName");
  const ingredientsFileName = document.getElementById("ingredientsFileName");
  const customerFileName = document.getElementById("customerFileName");

  const profitPercent = document.getElementById("profitPercent");
  const profitError = document.getElementById("profitError");

  const manualMenuRows = document.getElementById("manualMenuRows");
  const manualIngredientRows = document.getElementById("manualIngredientRows");
  const manualCustomerRows = document.getElementById("manualCustomerRows");

  if (menuInput) menuInput.value = "";
  if (ingredientsInput) ingredientsInput.value = "";
  if (customerInput) customerInput.value = "";

  if (menuFileName) menuFileName.textContent = "No file selected";
  if (ingredientsFileName) ingredientsFileName.textContent = "No file selected";
  if (customerFileName) customerFileName.textContent = "No file selected";

  if (profitPercent) profitPercent.value = "";
  if (profitError) profitError.textContent = "";

  if (manualMenuRows) manualMenuRows.innerHTML = "";
  if (manualIngredientRows) manualIngredientRows.innerHTML = "";
  if (manualCustomerRows) manualCustomerRows.innerHTML = "";

  alert("All input data has been cleared.");
}

function downloadResults() {
  const storedResults = localStorage.getItem("analysisResults");
  const targetPercent = localStorage.getItem("targetProfitPercent");

  if (!storedResults) {
    alert("No results available to download.");
    return;
  }

  const results = JSON.parse(storedResults);

  let report = "Restaurant Budget Optimizer Results\n";
  report += "Target Profit Percentage: " + targetPercent + "%\n";
  report += "Generated: " + new Date().toLocaleString() + "\n\n";

  results.forEach((item) => {
    report += "Dish Name: " + item.dishName + "\n";
    report += "Cost: $" + item.cost.toFixed(2) + "\n";
    report += "Current Price: $" + item.price.toFixed(2) + "\n";
    report += "Units Sold: " + item.unitsSold + "\n";
    report += "Profit Per Unit: $" + item.profitPerUnit.toFixed(2) + "\n";
    report += "Profit Margin: " + item.margin.toFixed(1) + "%\n";
    report += "Suggested Price: $" + item.suggestedPrice.toFixed(2) + "\n";
    report += "Total Profit: $" + item.totalProfit.toFixed(2) + "\n";
    report += "-----------------------------------\n";
  });

  const blob = new Blob([report], { type: "text/plain" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "restaurant-budget-results.txt";
  link.click();

  URL.revokeObjectURL(link.href);
}

function removeMenuFile() {
  menuInput.value = "";
  menuFileName.textContent = "No file selected";
  document.getElementById("removeMenuBtn").style.display = "none";
}

function removeIngredientsFile() {
  ingredientsInput.value = "";
  ingredientsFileName.textContent = "No file selected";
  document.getElementById("removeIngredientsBtn").style.display = "none";
}

function removeCustomerFile() {
  customerInput.value = "";
  customerFileName.textContent = "No file selected";
  document.getElementById("removeCustomerBtn").style.display = "none";
}

function loadSampleData() {
  const manualMenuRows = document.getElementById("manualMenuRows");
  const manualIngredientRows = document.getElementById("manualIngredientRows");
  const manualCustomerRows = document.getElementById("manualCustomerRows");
  const profitPercent = document.getElementById("profitPercent");

  if (!manualMenuRows || !manualIngredientRows || !manualCustomerRows) {
    return;
  }

  manualMenuRows.innerHTML = "";
  manualIngredientRows.innerHTML = "";
  manualCustomerRows.innerHTML = "";

  const sampleMenuItems = [
    { dish: "Chicken Bowl", price: 20, units: 150 },
    { dish: "Steak Tacos", price: 18, units: 95 },
    { dish: "Veggie Pasta", price: 15, units: 70 }
  ];

  const sampleIngredients = [
    { dish: "Chicken Bowl", ingredient: "Chicken", quantity: 1, cost: 6.00 },
    { dish: "Chicken Bowl", ingredient: "Rice", quantity: 1, cost: 2.00 },
    { dish: "Steak Tacos", ingredient: "Steak", quantity: 1, cost: 7.50 },
    { dish: "Steak Tacos", ingredient: "Tortilla", quantity: 2, cost: 1.00 },
    { dish: "Veggie Pasta", ingredient: "Pasta", quantity: 1, cost: 2.50 },
    { dish: "Veggie Pasta", ingredient: "Vegetables", quantity: 1, cost: 3.00 }
  ];

  const sampleCustomerData = [
    { dish: "Chicken Bowl", month: "Jan", units: 40 },
    { dish: "Chicken Bowl", month: "Feb", units: 55 },
    { dish: "Chicken Bowl", month: "Mar", units: 60 },
    { dish: "Steak Tacos", month: "Jan", units: 30 },
    { dish: "Steak Tacos", month: "Feb", units: 35 },
    { dish: "Steak Tacos", month: "Mar", units: 30 },
    { dish: "Veggie Pasta", month: "Jan", units: 20 },
    { dish: "Veggie Pasta", month: "Feb", units: 25 },
    { dish: "Veggie Pasta", month: "Mar", units: 25 }
  ];

  sampleMenuItems.forEach(item => {
    const row = document.createElement("div");
    row.className = "manual-row";

    row.innerHTML = `
      <input type="text" placeholder="Dish Name" class="manual-menu-dish" value="${item.dish}" />
      <input type="number" placeholder="Menu Price" class="manual-menu-price" step="0.01" min="0" value="${item.price}" />
      <input type="number" placeholder="Units Sold" class="manual-menu-units" min="0" value="${item.units}" />
      <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">Remove</button>
    `;

    manualMenuRows.appendChild(row);
  });

  sampleIngredients.forEach(item => {
    const row = document.createElement("div");
    row.className = "manual-row ingredient-row";

    row.innerHTML = `
      <input type="text" placeholder="Dish Name" class="manual-ingredient-dish" value="${item.dish}" />
      <input type="text" placeholder="Ingredient Name" class="manual-ingredient-name" value="${item.ingredient}" />
      <input type="number" placeholder="Quantity Needed" class="manual-ingredient-quantity" step="0.01" min="0" value="${item.quantity}" />
      <input type="number" placeholder="Unit Cost" class="manual-ingredient-cost" step="0.01" min="0" value="${item.cost}" />
      <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">Remove</button>
    `;

    manualIngredientRows.appendChild(row);
  });

  sampleCustomerData.forEach(item => {
    const row = document.createElement("div");
    row.className = "manual-row";

    row.innerHTML = `
      <input type="text" placeholder="Dish Name" class="manual-customer-dish" value="${item.dish}" />
      <input type="text" placeholder="Month" class="manual-customer-month" value="${item.month}" />
      <input type="number" placeholder="Units Sold" class="manual-customer-units" min="0" value="${item.units}" />
      <button type="button" class="remove-row-btn" onclick="this.parentElement.remove()">Remove</button>
    `;

    manualCustomerRows.appendChild(row);
  });

  if (profitPercent) {
    profitPercent.value = 30;
  }

  alert("Sample restaurant data has been loaded.");
}