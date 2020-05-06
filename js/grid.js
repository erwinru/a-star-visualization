export class Grid {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cells = [];
    this.createGrid();

    this.elements = [];
    this.placeStart();
    this.placeEnd();
    this.makeElementsMoveable();
    this.drawWall();
    this.clearWall();
  }

  createGrid() {
    this.tableElement = document.getElementById("table");
    let rows = Math.floor(this.height / this.cellSize);
    let cols = Math.floor(this.width / this.cellSize);
    let tableHtml = "";

    for (let row = 0; row <= rows; row++) {
      tableHtml += `<tr>`;
      let cellRow = [];
      for (let col = 0; col <= cols; col++) {
        const cell = new Cell([row, col]);
        cellRow.push(cell);

        tableHtml += cell.html;
      }
      tableHtml += "</tr>";
      this.cells.push(cellRow);
    }
    this.tableElement.innerHTML = tableHtml;
  }

  placeStart() {
    let start_cell = this.tableElement.querySelector("[data-row='10'][data-col='5']");
    start_cell.innerHTML = '<i class="start_icon noselect material-icons">lens</i>';
    this.elements.push(document.querySelector(".start_icon"));

  }
  placeEnd() {
    let end_cell = this.tableElement.querySelector("[data-row='10'][data-col='15']");
    end_cell.innerHTML = '<i class="end_icon noselect material-icons">lens</i>';
    this.elements.push(document.querySelector(".end_icon"));
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

  clearWall() {
    const clearBtn = document.getElementById("clear");
    const tableElement = this.tableElement;
    clearBtn.addEventListener("click", function() {
      tableElement.firstChild.childNodes.forEach(tableRow => {
        tableRow.childNodes.forEach(tableCell => {
          tableCell.classList.remove("wall");
          tableCell.classList.remove("cellSeen");
          tableCell.classList.remove("cellCenter");
        });
      });
    });
  }
}

class Cell {
  constructor(pos) {
    this.pos = pos;
    this.row = pos[0];
    this.col = pos[1];
    this.html = `<td data-row="${this.row}" data-col="${this.col}"></td>`;
    this.fCost = null;
    this.parent = null;
    // this.htmlElement = document.querySelector(`[data-row='${this.row}'][data-col='${this.col}']`);
  }

  getElement() {
    return document.querySelector(`[data-row='${this.row}'][data-col='${this.col}']`);
  }
}


export default Grid;