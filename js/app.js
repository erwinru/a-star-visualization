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

(function main() {
  const table = document.getElementById("table");
  const header = document.getElementById("header");
  const contentDivider = document.getElementById("content-divider");

  const cellSize = 25;
  const windowHeight = window.innerHeight;
  const width = window.innerWidth;
  const height = (windowHeight - header.offsetHeight - contentDivider.offsetHeight);


  let grid = new Grid(table, width, height, cellSize);
  grid.createGrid();
  let start_icon = grid.placeStart();

  start_icon.addEventListener("mousedown", function() {
    if (event.target === start_icon) {
      window.addEventListener("mousemove", moveElementEvent);
    }
  });
  window.addEventListener("mouseup", function() {
    placeElement(event);
  });

  function moveElementEvent() {
    moveElement(event, start_icon);
  }

  function placeElement(event) {
    window.removeEventListener("mousemove", moveElementEvent);
    console.log(event);
    start_icon.style.position = "static";
    let cell = document.elementFromPoint(window.event.clientX, window.event.clientY);
    // console.log(cell);
    cell.appendChild(start_icon);
  }


  function moveElement(event) {
    let x, y;
    x = event.clientX;
    y = event.clientY;
    // console.log(x, y);
    start_icon.style.position = "absolute";
    start_icon.style.left = x + "px";
    start_icon.style.top = y + "px";
  }

  function eventListeners(start_icon) {


  }


})();


// dragging items
const start_icon = document.getElementById("start_icon");
const canvas = document.getElementById("gridCanvas");