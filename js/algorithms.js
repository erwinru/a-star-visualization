export class Algorithms {
  constructor(grid, ui) {
    this.grid = grid;
    this.ui = ui;
  }

  visualizeAStar(currentCell) {
    currentCell.getElement().classList.remove("cellSeen");
    currentCell.getElement().classList.add("cellCenter");

    const neighborCells = this.grid.getNeighbourCells(currentCell);
    for (const cell of neighborCells) {
      if (!cell.getElement().classList.contains("cellCenter")) {
        cell.getElement().classList.add("cellSeen");
      }
    }
  }

  visualizePath(cell) {
    cell.getElement().classList.add("shortestPath");
    if (cell.parent !== null) {
      this.visualizePath(cell.parent);
    }
  }

  aStar(delay) {
    const self = this;
    const startIcon = table.querySelector(".start_icon");
    const endIcon = table.querySelector(".end_icon");

    function getPosFromElement(element) {
      return [parseInt(element.dataset.col), parseInt(element.dataset.row)];
    }

    const startPos = getPosFromElement(startIcon.parentElement);
    const endPos = getPosFromElement(endIcon.parentElement);

    this.startCell = this.grid.grid[startPos[1]][startPos[0]];
    this.endCell = this.grid.grid[endPos[1]][endPos[0]];


    let open = []; // set of cells to be calculated
    let closed = []; // set of cells already evaluated

    open.push(this.startCell);


    // loop
    let intr = setInterval(() => {
      const current = this.getMinFCostCell(open);

      // remove current from open array
      for (var i = 0; i < open.length; i++) {
        if (open[i] === current) {
          open.splice(i, 1);
        }
      }
      closed.push(current);
      this.visualizeAStar(current);

      if (current === this.endCell) {
        clearInterval(intr);
        this.visualizePath(current);
      }

      for (const neighbour of this.grid.getNeighbourCells(current)) {
        if (neighbour.getElement().classList.contains("wall") || closed.includes(neighbour)) {
          continue;
        }

        let gScore = current.g + Algorithms.getDistance(current, neighbour);

        if (!open.includes(neighbour) || gScore < neighbour.g) {
          neighbour.g = gScore;
          neighbour.h = Algorithms.getDistance(neighbour, this.endCell);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.parent = current;
          if (!open.includes(neighbour)) {
            open.push(neighbour);
          }
        }
      }
    }, delay);
  }

  getMinFCostCell(open) {
    let minFCost = Infinity;
    let bestCell = null;
    for (const currCell of open) {
      if (currCell.f < minFCost) {
        minFCost = currCell.f;
        bestCell = currCell;
      }
    }
    return bestCell;
  }

  static getDistance(cellA, cellB) {
    const dX = Math.abs(cellA.x - cellB.x);
    const dY = Math.abs(cellA.y - cellB.y);

    if (dX > dY) {
      return 14 * dY + 10 * (dX - dY);
    }
    return 14 * dX + 10 * (dY - dX);
  }
}
export default Algorithms;