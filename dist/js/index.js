// Eventlistner for when the user hoveres over the brand
document.addEventListener("DOMContentLoaded", function () {
  var hoverElements = document.querySelectorAll(".brand_hover");
  var reducedDotColor = "rgba(102, 155, 188, 0.80)";
  var reducedNameUnderscoreColor = "rgba(251, 254, 243, 0.80)";
  var originalIvory = "#fbfef3";
  var originalSuperioty = "#669bbc";

  // Slightly reduce the alpha of the brand
  function hoverIn() {
    hoverElements.forEach(function (element) {
      if (element.classList.contains("brand_dot")) {
        element.style.color = reducedDotColor;
      } else {
        element.style.color = reducedNameUnderscoreColor;
      }
    });
  }

  // Reset brand to original color
  function hoverOut() {
    hoverElements.forEach(function (element) {
      if (element.classList.contains("brand_dot")) {
        element.style.color = originalSuperioty;
      } else {
        element.style.color = originalIvory;
      }
    });
  }

  hoverElements.forEach(function (element) {
    element.addEventListener("mouseover", hoverIn);
    element.addEventListener("mouseout", hoverOut);
  });
});

// Toogle switch between light and dark mode
document
  .getElementById("light_mode_btn")
  .addEventListener("click", function () {
    // Set light theme
    document.documentElement.style.setProperty("--text-color", "#474747");
    document.documentElement.style.setProperty("--bg-color", "#fbfef3");
    document.documentElement.style.setProperty("--bg-deep-color", "#e6e6e6");

    updateIcons(this, document.getElementById("dark_mode_btn"));
  });

document.getElementById("dark_mode_btn").addEventListener("click", function () {
  // Set dark theme
  document.documentElement.style.setProperty("--text-color", "#fbfef3");
  document.documentElement.style.setProperty("--bg-color", "#474747");
  document.documentElement.style.setProperty("--bg-deep-color", "#313131");

  updateIcons(this, document.getElementById("light_mode_btn"));
});

function updateIcons(activeBtn, inactiveBtn) {
  // Hide square icon and show filled square icon for active button
  activeBtn.querySelector(".bi-square").style.display = "none";
  activeBtn.querySelector(".bi-square-fill").style.display = "inline-block";

  // Reset icons for inactive button
  inactiveBtn.querySelector(".bi-square-fill").style.display = "none";
  inactiveBtn.querySelector(".bi-square").style.display = "inline-block";
}
