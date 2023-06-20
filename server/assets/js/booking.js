const BOOKING = "http://localhost:8080";

let tBodyBooking = document.querySelector(".tbody-booking");
let formBooking = document.querySelector(".form-booking");
let roomNameB = document.querySelector("#room-name-b");
let checkIn = document.querySelector("#check-in");
let checkOut = document.querySelector("#check-out");
let adults = document.querySelector("#adults");
let children = document.querySelector("#children");
let submitBtn = document.querySelector("#submit-btn");
let screenSize = document.querySelector(".screen-size-li");
let img = document.querySelector("#room-img");
let darkMode = document.querySelector(".input");
let adminHeader = document.querySelector("#admin-header");
let sideMenu = document.querySelector("#main-side-menu");
let mainSection = document.querySelector("#main-content-rooms");
let formBg = document.querySelector("#add-edit");
let yesBtn=document.querySelector('.yes-btn')
let cancelBtn=document.querySelector('.cancel-btn')

let checkFullScreen = false;
let checkDarkMode = false;

let filtered = [];
let alldata = [];
let check = false;
let editId;

async function getAllData() {
  tBodyBooking.innerHTML = "";
  let res = await axios(`${BOOKING}/booking`);
  let data = res.data;
  console.log(data);
  alldata = data;
  filtered = filtered.length ? filtered : data;
  filtered.forEach((elem) => {
    let trElem = document.createElement("tr");
    trElem.innerHTML = `
        <td class="room-name">${elem.roomName}</td>
        <td>${elem.checkIn}</td>
        <td>${elem.checkOut}</td>
        <td>${elem.adults}</td>
        <td>${elem.children}</td>
        <td>
          <i
            class="fa-regular fa-pen-to-square edit"
            onclick="editBooking(${elem.id})"
          ></i>
          <i
          id="myBtn"
            class="fa-solid fa-trash delete"
            onclick="deleteRoom(${elem.id},this)"
          ></i>
        </td>
        `;
    tBodyBooking.append(trElem);
  });
}
getAllData();

function emptyForm() {
  roomNameB.value = "";
  children.value = "";
  adults.value = "";
  checkIn.value = "";
  checkOut.value = "";
}

async function deleteRoom(id, btn) {
    modal.style.display = "block";
    yesBtn.addEventListener('click', async()=>{
        await axios.delete(`${BOOKING}/booking/${id}`);
        btn.closest("tr").remove();
    })
    cancelBtn.addEventListener('click',()=>{
        modal.style.display = "none";
        console.log("cancel");
    })
}

async function addEditBooking() {
  let obj = {
    roomName: roomNameB.value,
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    adults: adults.value,
    children: children.value,
  };
  if (check) {
    await axios.patch(`${BOOKING}/booking/${editId}`, obj);
    check = false;
    getAllData();
  } else {
    await axios.post(`${BOOKING}/booking`, obj);
    getAllData();
  }
}

async function editBooking(id) {
    submitBtn.innerHTML="Edit"
  editId = id;
  check = true;
  editData = alldata.find((item) => item.id == id);
  roomNameB.value = editData.roomName;
  checkIn.value = editData.checkIn;
  checkOut.value = editData.checkOut;
  children.value = editData.children;
  adults.value = editData.adults;
}

formBooking.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    roomNameB.value &&
    children.value &&
    adults.value &&
    checkIn.value &&
    checkOut.value
  ) {
    addEditBooking();
    emptyForm();
  }
});

screenSize.addEventListener("click", () => {
  if (!checkFullScreen) {
    screenSize.innerHTML =
      '<img class="screen-size" src="./assets/images/full-screen.png" alt="">';
    document.documentElement.requestFullscreen();
    checkFullScreen = true;
  } else {
    screenSize.innerHTML =
      '<img class="screen-size" src="./assets/images/expand.png" alt="square"/>';
    checkFullScreen = false;
    document.exitFullscreen();
  }
  console.log(checkFullScreen);
});

window.onload = function () {
  localStorage.getItem("dark") &&
    (adminHeader.classList.add("dark-mode"),
    sideMenu.classList.add("dark-mode"),
    mainSection.classList.add("dark-mode"),
    formBg.classList.add("dark-mode"));

  darkMode.addEventListener("click", () => {
    if (!checkDarkMode) {
      localStorage.setItem("dark", "mode");
      adminHeader.classList.add("dark-mode"),
        sideMenu.classList.add("dark-mode"),
        mainSection.classList.add("dark-mode"),
        formBg.classList.add("dark-mode");
      checkDarkMode = true;
    } else {
      localStorage.removeItem("dark");
      adminHeader.classList.remove("dark-mode");
      sideMenu.classList.remove("dark-mode");
      mainSection.classList.remove("dark-mode");
      mainSection.classList.remove("dark-mode");
      formBg.classList.remove("dark-mode");
      checkDarkMode = false;
    }
    console.log(checkDarkMode);
  });
};


var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
yesBtn.onclick = function() {
  modal.style.display = "none";
}
cancelBtn.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}