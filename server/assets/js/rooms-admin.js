const BASE_URL = "http://localhost:8000";

let row = document.querySelector(".row");
let form = document.querySelector("form");
let roomName = document.querySelector("#room-name");
let roomBed = document.querySelector("#room-bed");
let roomPrice = document.querySelector("#room-price");
let roomGuests = document.querySelector("#room-guests");
let roomSale = document.querySelector("#room-sale");
let submitBtn = document.querySelector("#submit-btn");

let alldata = [];
let filtered = [];
let editId;
let check = false;

async function getAllData() {
  row.innerHTML = "";
  let res = await axios(`${BASE_URL}/rooms`);
  let data = res.data;
  alldata = data;
  filtered = data;
  filtered.forEach((room) => {
    row.innerHTML += `
    <div class="col col-12 col-md-6 col-lg-4">
    <div class="img-text">
      <img
        src="../client/assets/images/home-images/rooms/rooms-suites1.jpg"
        alt=""
      />
      <div class="price-room">From $ ${room.price}</div>
      <div class="price-sale"  >${room.sale} % off</div>
    </div>
    <div class="rooms-text">
      <h3>${room.roomName}</h3>
      <span>${room.bed}</span>
      <span>${room.guests} Guests</span>
      <div class="edit-delete">
        <i class="fa-regular fa-pen-to-square edit" onclick=editRoom(${room.id})></i>
        <i class="fa-solid fa-trash delete" onclick=deleteRoom(${room.id}) ></i>
      </div>
    </div>
  </div>
        `;
  });
}

getAllData();

function emptyForm() {
  roomName.value = "";
  roomBed.value = "";
  roomPrice.value = "";
  roomSale.value = "";
  roomGuests.value = "";
}

async function deleteRoom(id) {
  // confirm("Press a button!")
  // console.log(confirm());
  await axios.delete(`${BASE_URL}/rooms/${id}`);
  filtered.filter((item) => item.id != id);
  getAllData();
}

async function addEditRoom() {
  let obj = {
    roomName: roomName.value,
    bed: roomBed.value,
    price: roomPrice.value,
    sale: roomSale.value,
    guests: roomGuests.value,
  };
  if (check) {
    await axios.patch(`${BASE_URL}/rooms/${editId}`, obj);
    check = false;
  } else {
    await axios.post(`${BASE_URL}/rooms`, obj);
  }
  getAllData();
}

async function editRoom(id) {
  editId = id;
  check = true;
  editData = alldata.find((item) => item.id == id);
  roomName.value = editData.roomName;
  roomBed.value = editData.bed;
  roomPrice.value = editData.price;
  roomSale.value = editData.sale ? editData.sale : 0;
  roomGuests.value = editData.guests;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addEditRoom();
  emptyForm();
});