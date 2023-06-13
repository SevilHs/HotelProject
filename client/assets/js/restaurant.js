let arrowDown = document.querySelector(".arrow-down");
let aboutRestSec = document.querySelector("#about-rest");
let menu = document.querySelectorAll(".restaurant-menu-text");
let menuName = document.querySelectorAll(".item");
let { top: position } = aboutRestSec.getBoundingClientRect();

// console.log(position);
arrowDown.addEventListener("click", () => {
  document.documentElement.scrollTop = position;
});


menuName.forEach((item) => {
  item.addEventListener('click',()=>{
        // console.log(item.id);
        if (item.id==1) {
          menu[0].style.display="flex"
          menu.forEach(item=>{item.id!="menu1" ? item.style.display="none" : null})
        }
        else if (item.id==2) {
          menu[1].style.display="flex"
          menu.forEach(item=>item.id!="menu2" ? item.style.display="none" : null)
        }
        else if (item.id==3) {
          menu[2].style.display="flex"
          menu.forEach(item=>item.id!="menu3" ? item.style.display="none" : null)
        }
        else if (item.id==4) {
          menu[3].style.display="flex"
          menu.forEach(item=>item.id!="menu4" ? item.style.display="none" : null)
        }
        else if (item.id==5) {
          menu[4].style.display="flex"
          menu.forEach(item=>item.id!="menu5" ? item.style.display="none" : null)
        }
        else if (item.id==6) {
          menu[5].style.display="flex"
          menu.forEach(item=>item.id!="menu6" ? item.style.display="none" : null)
        }
    })
});


$(".owl-carousel1").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  items: 2,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
});
