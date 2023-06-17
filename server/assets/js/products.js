const BASE_URL = "http://localhost:8000";

let tBody = document.querySelector("tbody");
let form = document.querySelector("form");
let productName = document.querySelector("#product-name");
let currPrice = document.querySelector("#product-price-curr");
let prevPrice = document.querySelector("#product-price-prev");
let img = document.querySelector("#product-img");

let filtered = [];
let alldata = [];
let check = false;
let editId;

async function getAllData() {
  tBody.innerHTML = "";
  let res = await axios(`${BASE_URL}/products`);
  let data = res.data;
  console.log(data);
  alldata = data;
  filtered = filtered.length ? filtered : data;
  filtered.forEach((product) => {
    let trElem = document.createElement("tr");
    trElem.innerHTML = `
        <td><img src="${product.img}" alt=""></td>
        <td>${product.name}</td>
        <td>${product.currPrice}</td>
        <td>${product.prevPrice}</td>
        <td>
          <i
            class="fa-regular fa-pen-to-square edit"
            onclick="editProduct(${product.id})"
          ></i>
          <i
            class="fa-solid fa-trash delete"
            onclick="deleteProduct(${product.id},this)"
          ></i>
        </td>
        `;
    tBody.append(trElem);
  });
}
getAllData();

function emptyForm() {
  productName.value = "";
  currPrice.value = "";
  prevPrice.value = "";
}

async function deleteProduct(id,btn) {
  await axios.delete(`${BASE_URL}/products/${id}`);
  // console.log(btn.closest("tr"));
  btn.closest('tr').remove()                  
}

async function addEditRoom() {
  let date=new Date().toLocaleDateString
  let obj = {
    date:date,
    name: productName.value,
    currPrice: currPrice.value,
    prevPrice: prevPrice.value,
  };
  if (check) {
    await axios.patch(`${BASE_URL}/products/${editId}`, obj);
    check = false;
    getAllData();
  } else {
    await axios.post(`${BASE_URL}/products`, obj);
  }
  getAllData();
}

async function editProduct(id) {
  editId = id;
  check = true;
  editData = alldata.find((item) => item.id == id);
  productName.value = editData.name;
  currPrice.value = editData.currPrice;
  prevPrice.value = editData.prevPrice ? editData.prevPrice : 0;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addEditRoom();
  emptyForm();
});
