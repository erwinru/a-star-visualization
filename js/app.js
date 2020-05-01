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


// create grid and drag / drop items on grid
(function main() {
  const table = document.getElementById("table");
  const header = document.getElementById("header");
  const contentDivider = document.getElementById("content-divider");

  const cellSize = 25.5;
  const windowHeight = window.innerHeight;
  const width = window.innerWidth;
  const height = (windowHeight - header.offsetHeight - contentDivider.offsetHeight);


  let grid = new Grid(table, width, height, cellSize);
  grid.createGrid();
  let start_icon = grid.placeStart();
  let end_icon = grid.placeEnd();

  const moveableElements = [start_icon, end_icon];

  moveableElements.forEach(element => {
    function moveElementWrapper(event) {
      moveElement(element);
    }
    element.addEventListener("mousedown", function() {
      table.addEventListener("mousemove", moveElementWrapper);
    });
    element.addEventListener("mouseup", function() {
      table.removeEventListener("mousemove", moveElementWrapper);
    });
  });

  function moveElement(element) {
    let mouseHoverElement = document.elementFromPoint(window.event.clientX, window.event.clientY);
    const isStartIcon = mouseHoverElement.classList.contains("start_icon");
    const isEndIcon = mouseHoverElement.classList.contains("end_icon");
    const hasChilds = mouseHoverElement.hasChildNodes()
    if (!isStartIcon && !isEndIcon && !hasChilds) {

      mouseHoverElement.appendChild(element);
    }

  }

})();