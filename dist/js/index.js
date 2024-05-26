// Global variables
var currentTheme = "dark";

// Eventlistner for when the user hoveres over the brand
document.addEventListener("DOMContentLoaded", function () {
  var hoverElements = document.querySelectorAll(".brand-hover");
  var reducedDotColorDark = "rgba(102, 155, 188, 0.80)";
  var reducedColorDark = "rgba(251, 254, 243, 0.80)";
  var reducedColorLight = "rgba(71, 71, 71, 0.80)";
  var originalSuperioty = "--color-superioority";
  var currentTextThemeColor = "var(--text-color)";

  // Slightly reduce the alpha of the brand
  function hoverIn() {
    var hoverColor =
      currentTheme === "light" ? reducedColorLight : reducedColorDark;

    hoverElements.forEach(function (element) {
      if (element.classList.contains("brand-dot")) {
        element.style.color = reducedDotColorDark;
      } else {
        element.style.color = hoverColor;
      }
    });
  }

  // Reset brand to original color
  function hoverOut() {
    hoverElements.forEach(function (element) {
      if (element.classList.contains("brand-dot")) {
        element.style.color = originalSuperioty;
      } else {
        element.style.color = currentTextThemeColor;
      }
    });
  }

  hoverElements.forEach(function (element) {
    element.addEventListener("mouseover", hoverIn);
    element.addEventListener("mouseout", hoverOut);
  });
});

// Toogle theme to light mode
document
  .getElementById("light-mode-btn")
  .addEventListener("click", function () {
    updateTheme("light");
    updateIcons(this, document.getElementById("dark-mode-btn"));
  });

// Toogle theme to dark mode
document.getElementById("dark-mode-btn").addEventListener("click", function () {
  updateTheme("dark");
  updateIcons(this, document.getElementById("light-mode-btn"));
});

/**
 * Function for updating the behavior of the dark and light mode square buttons
 * @param {The chosen square of the theme} activeBtn
 * @param {The square which is not chosen} inactiveBtn
 */
function updateIcons(activeBtn, inactiveBtn) {
  activeBtn.querySelector(".bi-square").style.display = "none";
  activeBtn.querySelector(".bi-square-fill").style.display = "inline-block";

  // Reset icons for inactive button
  inactiveBtn.querySelector(".bi-square-fill").style.display = "none";
  inactiveBtn.querySelector(".bi-square").style.display = "inline-block";
}

/**
 * Set global variables for colors and backgrounds dependning on theme
 * @param {The chosen theme. Can be dark or light} theme
 */
function updateTheme(theme) {
  currentTheme = theme;
  localStorage.setItem("theme", theme);
  document.documentElement.className = theme + "-mode";
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme") || "dark";
  updateTheme(savedTheme);

  // Ensure icons are updated correctly
  if (savedTheme === "light") {
    updateIcons(
      document.getElementById("light-mode-btn"),
      document.getElementById("dark-mode-btn"),
    );
  } else {
    updateIcons(
      document.getElementById("dark-mode-btn"),
      document.getElementById("light-mode-btn"),
    );
  }
});

// Load screen on initial visit to website
document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loadingScreen");
  const mainContent = document.querySelector(".content-wrapper-container");

  // Use ?testing=true for testing purpose in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const testing = urlParams.get("testing");

  loadingScreen.style.visibility = "visible";
  loadingScreen.style.opacity = "1";

  if (!localStorage.getItem("firstVisit") || testing === "true") {
    localStorage.setItem("firstVisit", "true");
    setTimeout(function () {
      // Start the fade-out effect for the loading screen
      loadingScreen.style.opacity = "0";

      // Wait for the fade-out to complete before hiding the screen and showing content
      setTimeout(function () {
        loadingScreen.style.visibility = "hidden";
        mainContent.classList.remove("content-hidden");
        mainContent.classList.add("content-visible");
      }, 500);
    }, 1000);
  } else {
    loadingScreen.style.display = "none";
    mainContent.classList.remove("content-hidden");
    mainContent.classList.add("content-visible");
  }
});
