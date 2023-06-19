const BASE_URL = "http://localhost:8000";

let id = new URLSearchParams(window.location.search).get("id");
let roomImg = document.querySelector(".room-img");
let roomName = document.querySelector(".room-name");
let guests = document.querySelector(".guests");
let price = document.querySelector(".price");
let bed = document.querySelector(".bed");
let form = document.querySelector("#booking-form");
let checkIn = document.querySelector("#check-in");
let checkOut = document.querySelector("#check-out");
let option1 = document.querySelector("#adults");
let option2 = document.querySelector("#children");
let option3=document.querySelector('#room-name')
let not = document.querySelector("#notification");

async function getRoomData() {
  let res = await axios(`${BASE_URL}/rooms/${id}`);
  let data = res.data;
  console.log(data);
  roomName.innerHTML = data.roomName;
  roomImg.src = data.img;
  guests.innerHTML = `${data.guests} Persons`;
  price.innerHTML = `$ ${data.price}`;
  bed.innerHTML = data.bed;
}
getRoomData();

$(".owl-carousel4").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  items: 3,
  autoplay: true,
  autoplayTimeout: 2000,
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

let modal = document.querySelector("#myModal");
let btn = document.querySelector("#myBtn");
let span = document.querySelector(".close");

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

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
    format: "dd/mm/yyyy", 
    title: getDatePickerTitle(elem),
  });
}

let check;

function showNot(text) {
  if (!option1.value || !option2.value || !option3.value || !checkIn.value || !checkOut.value ) {
    not.removeAttribute("hidden");
    not.innerHTML = text;
  }
  if (check) {
    not.removeAttribute("hidden");
    not.innerHTML = text;
  }
  setTimeout(() => {
    not.setAttribute("hidden", "");
  }, 4000);
}

async function setData() {
  let res = await axios(`${BASE_URL}/booking`);
  let data = res.data;
  check = data.find(
    (item) =>
      item.checkIn == checkIn.value &&
      item.checkOut == checkOut.value &&
      item.roomName == option3.value
  );
  if (!check) {
    console.log(check);
    let obj = {
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      adults: option1.value,
      children: option2.value,
      roomName: option3.value
    };
    await axios.post(`${BASE_URL}/booking`, obj);
  } else {
    console.log("no");
    showNot("These days have been booked. Please try again.");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkIn.value && checkOut.value && option1.value && option2.value && option3.value) {
    setData();
  }
  showNot("One or more fields have an error. Please check and try again.");
});