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

// table grid
(function makeGrid() {
  const table = document.getElementById("table");
  const header = document.getElementById("header");
  const contentDivider = document.getElementById("content-divider");

  const cellSize = 20;
  const windowHeight = window.innerHeight;
  const width = window.innerWidth;
  const height = (windowHeight - header.offsetHeight - contentDivider.offsetHeight);

  function createGrid(tableElement, width, height, cellSize) {
    let rows = Math.floor(height / cellSize);
    let cols = Math.floor(width / cellSize);
    let grid = "";

    for (let i = 0; i <= rows; i++) {
      grid += "<tr>";
      for (let j = 0; j <= cols; j++) {
        grid += "<td></td>";
      }
      grid += "</tr>";
    }
    tableElement.innerHTML = grid;
  }

  createGrid(table, width, height, cellSize);
})();



// dragging items
const start_icon = document.getElementById("start_icon");
const canvas = document.getElementById("gridCanvas");