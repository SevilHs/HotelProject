let header = document.querySelector("header");

let menuBtn = document.querySelector(".menu-btn");
let menuItems = document.querySelector(".menu-items");
let arrowUp = document.querySelector(".arrow-up-btn");

let checkMenu = false;

arrowUp.style.display="none"

function scrollFunction() {
  if (
    document.body.scrollTop > 110 ||
    document.documentElement.scrollTop > 110
  ) {
    header.style.position = "fixed";
    header.style.backgroundColor = "#222";
    header.style.padding = "30px 0";
    arrowUp.style.display = "block";
  } else {
    header.style.position = "absolute";
    header.style.backgroundColor = "transparent";
    header.style.padding = "40px 0";
    arrowUp.style.display = "none";
  }
}

window.onscroll = function () {
  scrollFunction();
};

menuBtn.addEventListener("click", () => {
  if (!checkMenu) {
    menuItems.style.visibility = "visible";
    checkMenu = true;
  } else {
    checkMenu = false;
    menuItems.style.visibility = "hidden";
  }
});


arrowUp.onclick = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
