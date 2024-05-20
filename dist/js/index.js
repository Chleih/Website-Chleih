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
