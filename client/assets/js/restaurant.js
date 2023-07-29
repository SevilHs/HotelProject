let arrowDown = document.querySelector(".arrow-down");
let aboutRestSec = document.querySelector("#about-rest");
let menu = document.querySelectorAll(".restaurant-menu-text");
let menuName = document.querySelectorAll(".item");
let { top: position } = aboutRestSec.getBoundingClientRect();

arrowDown.addEventListener("click", () => {
  document.documentElement.scrollTop = position;
});

menuName.forEach((item) => {
  item.addEventListener('click',()=>{
    menuName.forEach(item=>item.classList.remove('active'))
    item.classList.add('active')
    menu.forEach(menu=>menu.id==item.id ? menu.style.display="flex" : menu.style.display="none")
    })
});

$('.owl-carousel').owlCarousel({
  items: 1,
  loop:true,
  margin:10,
  nav:true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
  }
})