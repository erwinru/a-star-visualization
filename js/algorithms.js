export class Algorithms {
  constructor() {
    this.mode = null;
    this.algoDict = {
      "a-star": this.aStar
    };
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

  getPosFromElement(element) {
    const pos = [parseInt(element.dataset.row), parseInt(element.dataset.col)];
    return pos;
  }

  visualizeAStar(centerPos) {
    let upperLeft = [centerPos[0] - 1, centerPos[1] - 1];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cell = document.querySelector(`[data-row='${upperLeft[0] + i}'][data-col='${upperLeft[1] + j}']`);
        if (upperLeft[0] + i === centerPos[0] && upperLeft[1] + j === centerPos[1]) {
          if (cell.classList.contains("cellSeen")) {
            cell.classList.remove("cellSeen");
          }
          cell.classList.add("cellCenter");
        } else {
          if (!cell.classList.contains("cellCenter")) {
            cell.classList.add("cellSeen");
          }
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

  aStar() {
    const startIcon = table.querySelector(".start_icon");
    const endIcon = table.querySelector(".end_icon");

    let startPos = this.getPosFromElement(startIcon.parentElement);
    let endPos = this.getPosFromElement(endIcon.parentElement);

    const self = this;
    table.addEventListener("click", function() {
      let mouseClickElement = document.elementFromPoint(window.event.clientX, window.event.clientY);
      let centerPos = self.getPosFromElement(mouseClickElement);
      self.visualizeAStar(centerPos);
    });
  }

}

export default Algorithms;