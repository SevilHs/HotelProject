let menuBtn = document.querySelector(".menu-btn");
let menuItems = document.querySelector(".menu-items");
let form = document.querySelector("#booking-form");
let option1 = document.querySelector("#adults"); 
let option2 = document.querySelector("#children"); 
let not = document.querySelector("#notification");

menuBtn.addEventListener("click", () => {
  if (menuItems.style.display == "block") {
    menuItems.style.display = "none";
  } else {
    menuItems.style.display = "block";
  }
});

$(".owl-carousel1").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  items: 2,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 2,
    },
  },
});

var owl = $(".owl-carousel2");
owl.owlCarousel({
  items: 1,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

$(".owl-carousel3").owlCarousel({
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

$(".owl-carousel4").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  items: 3,
  autoplay: true,
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 3,
    },
  },
});

function showNot(){
  if (!option1.value || !option2.value) {
    not.removeAttribute("hidden");
  }
  setTimeout(() => {
    notification.setAttribute("hidden", "");
  }, 2000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  showNot()
  console.log(option1.value);
});

const getDatePickerTitle = elem => {
  const label = elem.nextElementSibling;
  let titleText = '';
  if (label && label.tagName === 'LABEL') {
    titleText = label.textContent;
  } else {
    titleText = elem.getAttribute('aria-label') || '';
  }
  return titleText;
}
const elems = document.querySelectorAll('.datepicker_input');
for (const elem of elems) {
  const datepicker = new Datepicker(elem, {                          // ???????????????
    'format': 'dd/mm/yyyy', // UK format
    title: getDatePickerTitle(elem)
  });
}