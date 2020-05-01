export class Grid {
  constructor(tableElement, width, height, cellSize) {
    this.tableElement = tableElement;
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
  }

  createGrid() {
    let rows = Math.floor(this.height / this.cellSize);
    let cols = Math.floor(this.width / this.cellSize);
    let tableHtml = "";

    for (let row = 0; row <= rows; row++) {
      tableHtml += `<tr>`;
      for (let col = 0; col <= cols; col++) {
        tableHtml += `<td class="r${row} c${col}"></td>`;
      }
      tableHtml += "</tr>";
    }
    this.tableElement.innerHTML = tableHtml;
  }

  placeStart() {
    let start_cell = this.tableElement.querySelector(".r10.c5");
    start_cell.innerHTML = '<i class="start_icon noselect material-icons">lens</i>';
    let start_icon = document.querySelector(".start_icon");
    return start_icon;
  }
  placeEnd() {
    let end_cell = this.tableElement.querySelector(".r10.c15");
    end_cell.innerHTML = '<i class="end_icon noselect material-icons">lens</i>';
    let end_icon = document.querySelector(".end_icon");
    return end_icon;
  }
}


export default Grid;