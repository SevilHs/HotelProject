const BASE_URL = "http://localhost:8080";

let menuBtn = document.querySelector(".menu-btn");
let menuItems = document.querySelector(".menu-items");
let form = document.querySelector("#booking-form");
let checkIn = document.querySelector("#check-in");
let checkOut = document.querySelector("#check-out");
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
AOS.init();
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
  autoplayTimeout:3000,
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

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

var iframe=document.getElementsByTagName("iframe")[0].contentWindow

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
  // iframe.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
  iframe.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const getDatePickerTitle = (elem) => {
  const label = elem.nextElementSibling;
  let titleText = "";
  if (label && label.tagName === "LABEL") {
    titleText = label.textContent;
  } else {
    titleText = elem.getAttribute("aria-label") || "";
  }
  return titleText;
};
const elems = document.querySelectorAll(".datepicker_input");
for (const elem of elems) {
  const datepicker = new Datepicker(elem, {
    // ???????????????
    format: "dd/mm/yyyy", 
    title: getDatePickerTitle(elem),
  });
}

let check;
function showNot(text) {
  if (!option1.value || !option2.value) {
    not.removeAttribute("hidden");
    not.innerHTML = text;
  }
  if (check) {
    not.removeAttribute("hidden");
    not.innerHTML = text;
  }
  setTimeout(() => {
    notification.setAttribute("hidden", "");
  }, 4000);
}

async function setData() {
  let res = await axios(`${BASE_URL}/booking`);
  let data = res.data;
  check = data.find(
    (item) =>
      item.checkIn == checkIn.value &&
      item.checkOut == checkOut.value &&
      item.adults == option1.value &&
      item.children == option2.value
  );
  if (!check) {
    console.log(check);
    let obj = {
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      adults: option1.value,
      children: option2.value,
    };
    await axios.post(`${BASE_URL}/booking`, obj);
  } else {
    console.log("no");
    showNot("These days have been booked. Please try again.");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkIn.value && checkOut.value && option1.value && option2.value) {
    setData();
  }
  showNot("One or more fields have an error. Please check and try again.");
});