const menuInput = document.getElementById("menuInput");
const ingredientsInput = document.getElementById("ingredientsInput");

const menuFileName = document.getElementById("menuFileName");
const ingredientsFileName = document.getElementById("ingredientsFileName");

const customerInput = document.getElementById("customerInput");
const customerFileName = document.getElementById("customerFileName");


// Add event listeners for the Menu Data file input, ensuring only CSV files are accepted and updating the displayed file name accordingly
if (menuInput) {
  menuInput.addEventListener("change", function () {
    if (menuInput.files.length > 0) {
      const file = menuInput.files[0];
      const name = file.name.toLowerCase();

      if (!name.endsWith(".csv")) {
        alert("Please upload a CSV file (.csv) for menu data.");
        menuInput.value = "";
        menuFileName.textContent = "No file selected";
        return;
      }

      menuFileName.textContent = "Uploaded: " + file.name;
    }
  });
}

// Add event listener for the customer statistics file input, ensuring only CSV files are accepted and updating the displayed file name accordingly
if (ingredientsInput) {
  ingredientsInput.addEventListener("change", function () {
    if (ingredientsInput.files.length > 0) {
      const file = ingredientsInput.files[0];
      const name = file.name.toLowerCase();

      if (!name.endsWith(".csv")) {
        alert("Please upload a CSV file (.csv) for ingredients data.");
        ingredientsInput.value = "";
        ingredientsFileName.textContent = "No file selected";
        return;
      }

      ingredientsFileName.textContent = "Uploaded: " + file.name;
    }
  });
}


if (customerInput) {
  customerInput.addEventListener("change", function () {
    if (customerInput.files.length > 0) {
      const file = customerInput.files[0];
      const name = file.name.toLowerCase();

      if (!name.endsWith(".csv")) {
        alert("Please upload a CSV file (.csv) for customer data.");
        customerInput.value = "";
        customerFileName.textContent = "No file selected";
        return;
      }

      customerFileName.textContent = "Uploaded: " + file.name;
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
      menuData = menuData.concat(csv);
    }

    if (ingredientsInput.files.length > 0) {
      const csv = await parseCSVFile(ingredientsInput.files[0]);
      ingredientsData = ingredientsData.concat(csv);
    }

    if (customerInput.files.length > 0) {
      const csv = await parseCSVFile(customerInput.files[0]);
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
  localStorage.setItem("targetProfitPercent", targetPercent);

  saveAnalysisHistory(analyzedResults, customerData, targetPercent, fileNames);



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


function saveAnalysisHistory(analyzedResults, customerData, targetPercent, fileNames) {
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
    targetPercent: targetPercent,
    totalProfit: totalProfit,
    topItem: topItem.dishName,
    fileNames: fileNames,
    results: analyzedResults,
    customerData: customerData
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
      <h2>${analysis.date}</h2>
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
  localStorage.setItem("targetProfitPercent", selected.targetPercent);

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