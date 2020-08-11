export class Algorithms {
  constructor(grid, ui) {
    this.grid = grid;
    this.ui = ui;
    this.heuristics = {

      octile: function(cellA, cellB) {
        const dX = Math.abs(cellA.x - cellB.x);
        const dY = Math.abs(cellA.y - cellB.y);

        if (dX > dY) {
          return 14 * dY + 10 * (dX - dY);
        } else {
          return 14 * dX + 10 * (dY - dX);
        }
      },
      chebyshev: function(cellA, cellB) {
        const dX = Math.abs(cellA.x - cellB.x);
        const dY = Math.abs(cellA.y - cellB.y);

        if (dX > dY) {
          return 10 * dY + 10 * (dX - dY);
        } else {
          return 10 * dX + 10 * (dY - dX);
        }
      }
    };
  }

  aStar(delay, heuristic, startIcon, endIcon) {
    const startCell = this.grid.grid[startIcon.y][startIcon.x];
    const endCell = this.grid.grid[endIcon.y][endIcon.x];

    let open = []; // set of cells to be calculated
    let closed = []; // set of cells already evaluated

    open.push(startCell);

    // loop
    while (delay === 0) {
      let current = open[0];
      for (let openCell of open) {
        if (openCell.f <= current.f && openCell.h < current.h) {
          current = openCell;
        }
      }
      // remove current from open array
      for (var i = 0; i < open.length; i++) {
        if (open[i] === current) {
          open.splice(i, 1);
        }
      }
      closed.push(current);
      this.grid.visualizeAStar(current);

      if (current === endCell) {
        this.grid.retracePath(startCell, endCell);
        return;
      }

      for (const neighbour of this.grid.getNeighbourCells(current)) {
        if (neighbour.getElement().classList.contains("wall") || closed
          .includes(neighbour)) {
          continue;
        }
        let gScore = current.g + this.heuristics[heuristic](current, neighbour);

        if (!open.includes(neighbour) || gScore < neighbour.g) {
          neighbour.g = gScore;
          neighbour.h = this.heuristics[heuristic](neighbour, endCell);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.parent = current;
          if (!open.includes(neighbour)) {
            open.push(neighbour);
          }
        }
      }
    }
    let intr = setInterval(() => {
      let current = open[0];
      for (let openCell of open) {
        if (openCell.f <= current.f && openCell.h < current.h) {
          current = openCell;
        }
      }
      // remove current from open array
      for (var i = 0; i < open.length; i++) {
        if (open[i] === current) {
          open.splice(i, 1);
        }
      }
      closed.push(current);
      this.grid.visualizeAStar(current);

      if (current === endCell) {
        clearInterval(intr);
        this.grid.retracePath(startCell, endCell);
        return;
      }

      for (const neighbour of this.grid.getNeighbourCells(current)) {
        if (neighbour.getElement().classList.contains("wall") || closed
          .includes(neighbour)) {
          continue;
        }
        let gScore = current.g + this.heuristics[heuristic](current, neighbour);

        if (!open.includes(neighbour) || gScore < neighbour.g) {
          neighbour.g = gScore;
          neighbour.h = this.heuristics[heuristic](neighbour, endCell);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.parent = current;
          if (!open.includes(neighbour)) {
            open.push(neighbour);
          }
        }
      }
    }, delay);
  }
}
export default Algorithms;