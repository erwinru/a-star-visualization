class Grid {
  constructor(gridSizeX, gridSizeY) {
    this.gridSizeX = gridSizeX;
    this.gridSizeY = gridSizeY;

    this.grid = [];
    this.createGrid();
  }

  createGrid() {
    this.tableHtml = "";

    for (let row = 0; row <= this.gridSizeY; row++) {
      this.tableHtml += `<tr>`;
      let cellRow = [];
      for (let col = 0; col <= this.gridSizeX; col++) {
        const cell = new Cell(col, row);
        cellRow.push(cell);
        this.tableHtml += cell.html;
      }
      this.tableHtml += "</tr>";
      this.grid.push(cellRow);
    }
  }

  * getNeighbourCells(cell) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {

        if (x === 0 && y === 0) {
          continue;
        }

        const checkX = cell.x + x;
        const checkY = cell.y + y;

        if (checkX >= 0 && checkX <= this.gridSizeX && checkY >= 0 && checkY <= this.gridSizeY) {
          yield this.grid[checkY][checkX];
        }
      }
    }
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pos = [x, y];
    this.html = `<td data-col="${this.x}" data-row="${this.y}" ></td>`;
    this.g = null;
    this.h = null;
    this.f = null;
    this.parent = null;
  }

  getElement() {
    return document.querySelector(`[data-col='${this.x}'][data-row='${this.y}']`);
  }
}

class UI {
  constructor(grid, algorithms) {
    this.tableElement = document.getElementById("table");
    this.tableElement.innerHTML = grid.tableHtml;
    this.grid = grid.grid;
    this.elements = [];
    this.mode = null;
    this.placeStart();
    this.placeEnd();
    this.makeElementsMoveable();
    this.drawWall();
    this.clearWall();
    this.dropDownMenu();


    this.startAlgo(algorithms);
  }

  clearWall() {
    const clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", () => {
      this.tableElement.firstChild.childNodes.forEach(tableRow => {
        tableRow.childNodes.forEach(tableCell => {
          tableCell.classList.remove("wall");
          tableCell.classList.remove("cellSeen");
          tableCell.classList.remove("cellCenter");
          tableCell.classList.remove("shortestPath");
        });
      });
    });
  }

  drawWall() {
    const DrawBtn = document.getElementById("draw-wall");
    let drawing = true;
    DrawBtn.addEventListener("click", function() {
      if (drawing) {
        drawing = false;
        DrawBtn.textContent = "Stop Drawing";

        table.addEventListener("mousedown", startDrawing);
        table.addEventListener("mouseup", function() {
          table.removeEventListener("mousemove", fillOutSquares);
        });
      } else {
        drawing = true;
        DrawBtn.textContent = "Draw Wall";
        table.removeEventListener("mousedown", startDrawing);

      }
    });

    function startDrawing() {
      table.addEventListener("mousemove", fillOutSquares);
    }

    function fillOutSquares() {
      let mouseHoverElement = document.elementFromPoint(window.event.clientX, window.event.clientY);
      if (!mouseHoverElement.hasChildNodes() && mouseHoverElement.nodeName === "TD") {
        const emptySquare = mouseHoverElement;
        emptySquare.classList.add("wall");
      }
    }
  }

  makeElementsMoveable() {

    this.elements.forEach(element => {
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
      const hasChilds = mouseHoverElement.hasChildNodes();
      if (!isStartIcon && !isEndIcon && !hasChilds) {
        mouseHoverElement.appendChild(element);
      }
    }
  }

  placeStart() {
    let start_cell = this.tableElement.querySelector("[data-col='5'][data-row='10']");
    start_cell.innerHTML = '<i class="start_icon noselect material-icons">lens</i>';
    this.elements.push(document.querySelector(".start_icon"));

  }
  placeEnd() {
    let end_cell = this.tableElement.querySelector("[data-col='15'][data-row='10']");
    end_cell.innerHTML = '<i class="end_icon noselect material-icons">lens</i>';
    this.elements.push(document.querySelector(".end_icon"));
  }

  dropDownMenu() {
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownContent = document.getElementById("dropdown-content");
    const algoName = document.getElementById("algo-name");

    dropdownBtn.addEventListener("click", () => {
      dropdownContent.classList.toggle("show");
    });

    window.onclick = function(event) {
      if (event.target != dropdownBtn && event.target.parentElement != dropdownBtn) {
        if (dropdownContent.classList.contains("show")) {
          dropdownContent.classList.remove("show");
        }
      }
    };

    dropdownContent.childNodes.forEach(option => {
      option.addEventListener("click", () => {
        algoName.textContent = option.textContent;
        this.mode = option.id;
      });
    });
  }

  startAlgo(algorithms) {
    function clearBeforeStart(grid) {
      grid.forEach(cellRow => {
        cellRow.forEach(cell => {
          cell.g = null;
          cell.h = null;
          cell.f = null;
          cell.getElement().classList.remove("cellSeen");
          cell.getElement().classList.remove("cellCenter");
          cell.getElement().classList.remove("shortestPath");
        });
      });
    }

    const startBtn = document.getElementById("start");
    startBtn.addEventListener("click", () => {
      if (this.mode == "a-star") {
        clearBeforeStart(this.grid);
        algorithms.aStar(5);
      } else {
        startBtn.innerText = "Choose Algorithm!";
        startBtn.style.color = "red";
        setTimeout(() => {
          startBtn.innerText = "Start";
          startBtn.style.color = "black";
        }, 1500);
      }
    });
  }
}


export {
  Grid,
  UI
};