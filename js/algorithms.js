export class Algorithms {
  constructor(grid) {
    console.log(grid);
    this.cells = grid.cells;
    // console.log(this.cells);
    this.mode = null;
    // this.algoDict = {
    //   "a-star": this.aStar
    // };
    this.dropDownMenu();
    this.startAlgo();
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
    let self = this;
    dropdownContent.childNodes.forEach(option => {
      option.addEventListener("click", () => {
        algoName.textContent = option.textContent;
        self.mode = option.id;
      });
    });

  }

  visualizeAStar(currentCell) {
    currentCell.getElement().classList.add("cellCenter");

    const neighborCells = this.getNeighbourCells(currentCell);
    for (const cell of neighborCells) {
      if (!cell.getElement().classList.contains("cellCenter")) {
        cell.getElement().classList.add("cellSeen");
      }
    }
  }

  * getNeighbourCells(centerCell) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let currCell = this.cells[centerCell.pos[0] - 1 + i][centerCell.pos[1] - 1 + j];
        if (currCell !== centerCell) {
          console.log(currCell);
          yield currCell;
        }
      }
    }
  }

  startAlgo() {
    const startBtn = document.getElementById("start");
    const self = this;
    startBtn.addEventListener("click", function() {
      // self.algoDict[`${self.mode}`]();
      self.aStar();
    });
  }

  getPosFromElement(element) {
    return [parseInt(element.dataset.row), parseInt(element.dataset.col)];
  }

  aStar() {
    const self = this;
    const startIcon = table.querySelector(".start_icon");
    const endIcon = table.querySelector(".end_icon");

    const startPos = this.getPosFromElement(startIcon.parentElement);
    const endPos = this.getPosFromElement(endIcon.parentElement);

    // console.log(startPos, endPos);
    for (const cellRow of self.cells) {
      for (const cell of cellRow) {
        if (cell.pos[0] === startPos[0] && cell.pos[1] === startPos[1]) {
          this.startCell = cell;
        }
        if (cell.pos[0] === endPos[0] && cell.pos[1] === endPos[1]) {
          this.endCell = cell;
        }
      }

    }


    let open = []; // set of cells to be calculated
    let closed = []; // set of cells already evaluated

    open.push(this.startCell);
    while (true) {
      const current = this.getMinFCostCell(open);
      Algorithms.removeFromArray(open, current);
      closed.push(current);
      this.visualizeAStar(current);


      if (current === this.endCell) {
        return console.log("Path found");
      }

      for (const neighbour of this.getNeighbourCells(current)) {
        if (neighbour.getElement().classList.contains("wall") || closed.includes(neighbour)) {
          continue;
        }

        if (!open.includes(neighbour)) {
          self.setFCost(neighbour);
          neighbour.parent = current;

          if (!open.includes(neighbour)) {
            open.push(neighbour);
          }
        }
      }
    }
  }

  static removeFromArray(array, current) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === current) {
        array.splice(i, 1);
      }
    }
  }

  getMinFCostCell(open) {
    let minFCost = Infinity;
    let bestCell = null;
    for (const currCell of open) {
      this.setFCost(currCell);
      if (currCell.fCost < minFCost) {
        minFCost = currCell.fCost;
        bestCell = currCell;
      }
    }
    return bestCell;
  }

  static calcDistance(currPos, relPos) {
    return Math.sqrt((currPos[0] - relPos[0]) ** 2 + (currPos[1] - relPos[1]) ** 2) * 10;
  }

  setFCost(currCell) {
    const gCost = Algorithms.calcDistance(currCell.pos, this.startCell.pos);
    const hCost = Algorithms.calcDistance(currCell.pos, this.endCell.pos);
    currCell.fCost = gCost + hCost;
  }


}

export default Algorithms;