let menuBtn = document.querySelector(".menu-btn");
let menuItems = document.querySelector(".menu-items");

menuBtn.addEventListener("click", () => {
  if (menuItems.style.display == "block") {
    menuItems.style.display = "none";
  } else {
    menuItems.style.display = "block";
  }
});

$('.owl-carousel1').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  items:2,
  autoplay:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:2
      },
      1000:{
          items:2
      }
  }
})

var owl = $('.owl-carousel2');
owl.owlCarousel({
    items:1, 
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
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
});
