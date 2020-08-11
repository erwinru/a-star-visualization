import {
  Grid,
  UI
} from "./grid.js";
import {
  Algorithms
} from "./algorithms.js";


(function main() {
  const header = document.getElementById("header");
  const contentDivider = document.getElementById("content-divider");

  const cellSize = 25.5;
  // console.log("hello");
  const windowHeight = window.innerHeight;
  const width = window.innerWidth;
  const height = (windowHeight - header.offsetHeight - contentDivider.offsetHeight);

  let gridSizeY = Math.floor(height / cellSize);
  let gridSizeX = Math.floor(width / cellSize);


  let grid = new Grid(gridSizeX, gridSizeY);
  let algorithms = new Algorithms(grid);
  new UI(grid, algorithms);

})();
