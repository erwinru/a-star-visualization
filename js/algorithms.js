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

  startAlgo() {
    const startBtn = document.getElementById("start");
    const self = this;
    startBtn.addEventListener("click", function() {
      console.log(self.algoDict[`${self.mode}`]);
      console.log(self.mode);
      self.algoDict[`${self.mode}`]();
    });

  }

  aStar() {
    console.log("test");
  }
}

export default Algorithms;