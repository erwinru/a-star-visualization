// Dropdown for choosing Algorithm

(function() {
  const dropdownBtn = document.getElementById("dropdown-btn");
  const dropdownContent = document.getElementById("dropdown-content");

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (event.target != dropdownBtn && event.target.parentElement != dropdownBtn) {
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    }
  };
  /* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
  dropdownBtn.addEventListener("click", () => {
    dropdownContent.classList.toggle("show");
  });
})();