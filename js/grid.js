class Grid {
  constructor(gridSizeX, gridSizeY) {
    this.gridSizeX = gridSizeX;
    this.gridSizeY = gridSizeY;
    this.path = null;

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

        if (checkX >= 0 && checkX <= this.gridSizeX && checkY >= 0 && checkY <= this
          .gridSizeY) {
          yield this.grid[checkY][checkX];
        }
      }
    }
  }

  visualizeAStar(currentCell) {
    currentCell.getElement().classList.remove("cellSeen");
    currentCell.getElement().classList.add("cellCenter");

    const neighborCells = this.getNeighbourCells(currentCell);
    for (const cell of neighborCells) {
      if (!cell.getElement().classList.contains("cellCenter")) {
        cell.getElement().classList.add("cellSeen");
      }
    }
  }

  retracePath(startCell, currCell) {
    currCell.getElement().classList.add("shortestPath");
    if (currCell === startCell) {
      return;
    } else {
      this.retracePath(startCell, currCell.parent);
    }
  }

  placeElement(x, y, type) {
    const element = new GridElement(x, y, type);
    let cell = document.getElementById("table").querySelector(
      `[data-col='${element.x}'][data-row='${element.y}']`);
    cell.innerHTML = element.html;
    this.elements.push(element);
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
    this.gridObj = grid;
    this.algorithmsObj = algorithms;
    this.grid = grid.grid;
    this.elements = grid.elements;
    this.algorithm = null;
    this.heuristic = null;
    this.instantPath = false;
    this.drawWall();
    this.clearWall();
    this.dropDownMenu();

    this.startAlgo();
    this.makeElementsMoveable();
    this.refreshPath();
  }

  clearWall() {
    const clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", () => {
      this.clearBeforeStart();
      const cells = document.getElementsByClassName("wall");
      while (cells.length > 0) {
        cells[0].classList.remove("wall");
        this.instantPath = false;
      }
    });
  }

  drawWall() {
    const DrawBtn = document.getElementById("draw-wall");
    let drawing = true;

    table.addEventListener("mousedown", () => {
      const mouseHoverElement = document.elementFromPoint(window.event
        .clientX,
        window.event.clientY);
      const isEmptyCell = !mouseHoverElement.hasChildNodes() &&
        mouseHoverElement
        .nodeName === "TD";
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

    let draw = () => {
      const mouseHoverElement = document.elementFromPoint(window.event.clientX,
        window
        .event.clientY);
      mouseHoverElement.classList.add("wall");
    };

    function erase() {
      const mouseHoverElement = document.elementFromPoint(window.event.clientX,
        window
        .event.clientY);
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
            this.algorithm = option.id;
          } else {
            this.heuristic = option.id;
          }
        });
      });
    });
  }

  startAlgo() {
    const startBtn = document.getElementById("start");
    startBtn.addEventListener("click", () => {
      if (this.algorithm === null) {
        startBtn.innerText = "Choose Algorithm!";
        startBtn.classList.add("alert");
        setTimeout(() => {
          startBtn.innerText = "Start";
          startBtn.classList.remove("alert");
        }, 1500);
      } else if (this.heuristic === null) {
        startBtn.innerText = "Choose Heuristic!";
        startBtn.classList.add("alert");
        setTimeout(() => {
          startBtn.innerText = "Start";
          startBtn.classList.remove("alert");
        }, 1500);
      } else {
        this.clearBeforeStart();
        this.instantPath = true;
        this.algorithmsObj.aStar(10, this.heuristic, this.elements[0], this
          .elements[1]);
      }
    });
  }

  clearBeforeStart() {
    let classes = ["cellSeen", "cellCenter", "shortestPath"];
    for (let classname of classes) {
      const cells = document.getElementsByClassName(classname);
      while (cells.length > 0) {
        cells[0].classList.remove(classname);
      }
    }
  }

  refreshPath() {
    document.addEventListener("mouseup", () => {
      let mouseHoverElement = document.elementFromPoint(window.event.clientX,
        window.event.clientY);
      const isStartIcon = mouseHoverElement.classList.contains("start_icon");
      const isEndIcon = mouseHoverElement.classList.contains("end_icon");
      const isWall = mouseHoverElement.classList.contains("wall");
      const isCell = mouseHoverElement.tagName === "TD";

      if ((isStartIcon || isEndIcon || isWall || isCell) && this
        .instantPath) {
        this.clearBeforeStart();
        this.algorithmsObj.aStar(0, this.heuristic, this.elements[0], this
          .elements[
            1]);
      }
    });
  }

  makeElementsMoveable() {
    this.elements.forEach(element => {
      element.getElement().addEventListener("mousedown", function() {
        table.addEventListener("mousemove", moveElement);
      });
      element.getElement().addEventListener("mouseup", function() {
        table.removeEventListener("mousemove", moveElement);
      });

      let moveElement = () => {
        let mouseHoverElement = document.elementFromPoint(window.event
          .clientX,
          window.event.clientY);
        const isStartIcon = mouseHoverElement.classList.contains(
          "start_icon");
        const isEndIcon = mouseHoverElement.classList.contains("end_icon");
        const hasChilds = mouseHoverElement.hasChildNodes();
        const isWall = mouseHoverElement.classList.contains("wall");
        if (!isStartIcon && !isEndIcon && !hasChilds && !isWall) {
          element.x = mouseHoverElement.dataset.col;
          element.y = mouseHoverElement.dataset.row;
          mouseHoverElement.appendChild(element.getElement());
        }
      };
    });
  }
}

export {
  Grid,
  UI
};