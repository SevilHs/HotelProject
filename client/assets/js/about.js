$(".owl-carousel1-about").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 3,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });