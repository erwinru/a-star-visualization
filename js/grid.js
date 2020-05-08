class Grid {
  constructor(gridSizeX, gridSizeY) {
    this.gridSizeX = gridSizeX;
    this.gridSizeY = gridSizeY;

    this.grid = [];
    this.createGrid();
    this.elements = [];
    this.placeElement(5, Math.floor(gridSizeY / 2), "start");
    this.placeElement(gridSizeX - 5, Math.floor(gridSizeY / 2), "end");
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
    document.getElementById("table").innerHTML = this.tableHtml;
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

  placeElement(x, y, type) {
    const element = new GridElement(x, y, type);
    let cell = document.getElementById("table").querySelector(`[data-col='${element.x}'][data-row='${element.y}']`);
    cell.innerHTML = element.html;
    element.makeMoveable();
    this.elements.push(element.getElement());
  }
}

class GridElement {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.html = `<i class="${this.type}_icon noselect material-icons">lens</i>`;
  }

  getElement() {
    return document.querySelector(`.${this.type}_icon`);
  }

  makeMoveable() {
    this.getElement().addEventListener("mousedown", function() {
      table.addEventListener("mousemove", moveElement);
    });
    this.getElement().addEventListener("mouseup", function() {
      table.removeEventListener("mousemove", moveElement);
    });


    let moveElement = () => {
      let mouseHoverElement = document.elementFromPoint(window.event.clientX, window.event.clientY);
      const isStartIcon = mouseHoverElement.classList.contains("start_icon");
      const isEndIcon = mouseHoverElement.classList.contains("end_icon");
      const hasChilds = mouseHoverElement.hasChildNodes();
      if (!isStartIcon && !isEndIcon && !hasChilds) {
        mouseHoverElement.appendChild(this.getElement());
      }
    };
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
    this.grid = grid.grid;
    this.mode = null;
    this.drawWall();
    this.clearWall();
    this.dropDownMenu();

    this.startAlgo(algorithms);
  }

  clearWall() {
    const clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", () => {
      document.getElementById("table").firstChild.childNodes.forEach(tableRow => {
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

    table.addEventListener("mousedown", () => {
      const mouseHoverElement = document.elementFromPoint(window.event.clientX, window.event.clientY);
      const isEmptyCell = !mouseHoverElement.hasChildNodes() && mouseHoverElement.nodeName === "TD";
      if (isEmptyCell) {
        if (mouseHoverElement.classList.contains("wall")) {
          table.addEventListener("mousemove", erase);
          table.addEventListener("mouseup", () => {
            table.removeEventListener("mousemove", erase);
          });
        } else {
          table.addEventListener("mousemove", draw);
          table.addEventListener("mouseup", () => {
            table.removeEventListener("mousemove", draw);
          });
        }
      }
    });

    function draw() {
      const mouseHoverElement = document.elementFromPoint(window.event.clientX, window.event.clientY);
      mouseHoverElement.classList.add("wall");
    }

    function erase() {
      const mouseHoverElement = document.elementFromPoint(window.event.clientX, window.event.clientY);
      mouseHoverElement.classList.remove("wall");
    }
  }

  dropDownMenu() {
    const dropdownBtns = document.querySelectorAll("#dropdown-btn");
    const dropdownContents = document.querySelectorAll("#dropdown-content");
    // const algoName = document.getElementById("algo-name");


    dropdownBtns.forEach((btn) => {
      const dropdownContent = btn.nextElementSibling;
      btn.addEventListener("click", () => {
        dropdownContent.classList.toggle("show");
      });

      window.addEventListener("click", function(event) {
        if (event.target != btn && event.target.parentElement != btn) {
          if (dropdownContent.classList.contains("show")) {
            dropdownContent.classList.remove("show");
          }
        }
      });

      dropdownContent.childNodes.forEach(option => {
        option.addEventListener("click", () => {
          btn.firstChild.textContent = option.textContent;
          if (btn.classList.contains("algorithms")) {
            this.mode = option.id;
          } else {
            this.heuristic = option.id;
          }
        });
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