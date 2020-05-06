import {
  Grid
} from "./grid.js";
import {
  Algorithms
} from "./algorithms.js";


(function main() {
  const header = document.getElementById("header");
  const contentDivider = document.getElementById("content-divider");

  const cellSize = 25.5;
  const windowHeight = window.innerHeight;
  const width = window.innerWidth;
  const height = (windowHeight - header.offsetHeight - contentDivider.offsetHeight);


  let grid = new Grid(width, height, cellSize);
  let algorithms = new Algorithms(grid);

})();