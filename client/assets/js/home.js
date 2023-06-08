let menuBtn = document.querySelector(".menu-btn");
let menuItems = document.querySelector(".menu-items");

menuBtn.addEventListener("click", () => {
  if (menuItems.style.display == "block") {
    menuItems.style.display = "none";
  } else {
    menuItems.style.display = "block";
  }
});

$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  items: 2,
  // responsive:{
  //     0:{
  //         items:1
  //     },
  //     1000:{
  //         items:4
  //     }
  // }
})