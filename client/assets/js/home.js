let menuBtn = document.querySelector(".menu-btn");
let menuItems = document.querySelector(".menu-items");

menuBtn.addEventListener("click", () => {
  if (menuItems.style.display == "block") {
    menuItems.style.display = "none";
  } else {
    menuItems.style.display = "block";
  }
});
