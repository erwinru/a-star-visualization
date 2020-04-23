import {
  Grid
} from "./grid.js";

// Dropdown for choosing Algorithm

(function() {
  const dropdownBtn = document.getElementById("dropdown-btn");
  const dropdownContent = document.getElementById("dropdown-content");

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (event.target != dropdownBtn && event.target.parentElement != dropdownBtn) {
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    }
  };
  /* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
  dropdownBtn.addEventListener("click", () => {
    dropdownContent.classList.toggle("show");
  });
})();


// Drawing canvas grid

(function() {
  let canvas, ctx, grid, header, contentdiv;

  function init() {
    header = document.querySelector(".header");
    contentdiv = document.querySelector(".content-divider");
    canvas = document.getElementById("gridCanvas");
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - header.offsetHeight - contentdiv.offsetHeight;

    grid = new Grid();
    grid.drawLines(canvas, ctx);

  }


  document.addEventListener('DOMContentLoaded', init);
})();