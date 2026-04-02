const menuInput = document.getElementById("menuInput");
const statsInput = document.getElementById("statsInput");

const menuFileName = document.getElementById("menuFileName");
const statsFileName = document.getElementById("statsFileName");

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
if (statsInput) {
  statsInput.addEventListener("change", function () {
    if (statsInput.files.length > 0) {
      const file = statsInput.files[0];
      const name = file.name.toLowerCase();

      if (!name.endsWith(".csv")) {
        alert("Please upload a CSV file (.csv) for customer statistics.");
        statsInput.value = "";
        statsFileName.textContent = "No file selected";
        return;
      }

      statsFileName.textContent = "Uploaded: " + file.name;
    }
  });
}

function goToResults() {
  window.location.href = "results.html";
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

function login() {
  const username = document.getElementById("username").value;

  if (username) {
    localStorage.setItem("user", username);
    window.location.href = "index.html";
  }
}

function signup() {
  const username = document.getElementById("newUser").value;

  if (username) {
    localStorage.setItem("user", username);
    window.location.href = "index.html";
  }
}

window.onload = function () {
  const user = localStorage.getItem("user");

  const welcomeText = document.getElementById("welcomeText");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    if (welcomeText) welcomeText.textContent = "Welcome, " + user;

    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
  }
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