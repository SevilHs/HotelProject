const BASE_URL = "http://localhost:8000";

let tBody = document.querySelector("tbody");
let form = document.querySelector("form");
let productName = document.querySelector("#product-name");
let currPrice = document.querySelector("#product-price-curr");
let prevPrice = document.querySelector("#product-price-prev");
let img = document.querySelector("#product-img");
let adminHeader=document.querySelector('#admin-header')
let sideMenu=document.querySelector('#main-side-menu')
let mainSection=document.querySelector('#products-admin')
let formBg=document.querySelector('#add-edit')
let darkMode=document.querySelector('.input')
let screenSize=document.querySelector('.screen-size-li')
let yesBtn=document.querySelector('.yes-btn')
let cancelBtn=document.querySelector('.cancel-btn')
let submitBtn = document.querySelector("#submit-btn");


let checkFullScreen=false
let checkDarkMode=false

let filtered = [];
let alldata = [];
let check = false;
let editId;
let base64

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
  modal.style.display = "block";
  yesBtn.addEventListener('click', async()=>{
    await axios.delete(`${BASE_URL}/products/${id}`);
    btn.closest('tr').remove()        
  })
  cancelBtn.addEventListener('click',()=>{
      modal.style.display = "none";
      console.log("cancel");
  })
}

async function addEditRoom() {
  let date=new Date().toLocaleDateString()
  let obj = {
    date:date,
    name: productName.value,
    currPrice: currPrice.value,
    prevPrice: prevPrice.value,
    img: base64
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
  submitBtn.innerHTML="EDIT"
  editId = id;
  check = true;
  editData = alldata.find((item) => item.id == id);
  productName.value = editData.name;
  currPrice.value = editData.currPrice;
  prevPrice.value = editData.prevPrice ? editData.prevPrice : 0;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(productName.value && currPrice.value && prevPrice){
    addEditRoom();
    emptyForm();
  }
});


const convertBase64=(file)=>{
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

const uploadImg= async(e)=>{
  const file=e.target.files[0]
  base64=await convertBase64(file)
  // console.log(file);
  // console.log(e);
  // console.log(base64);
}

img.addEventListener('change',(e)=>{
  uploadImg(e)
})

screenSize.addEventListener('click',()=>{
  if(!checkFullScreen){
    screenSize.innerHTML='<img class="screen-size" src="./assets/images/full-screen.png" alt="">'
    document.documentElement.requestFullscreen()
    checkFullScreen=true
  }else{
    screenSize.innerHTML='<img class="screen-size" src="./assets/images/expand.png" alt="square"/>'
    checkFullScreen=false
    document.exitFullscreen()
  }
  console.log(checkFullScreen);
})

window.onload = function () {
  localStorage.getItem("dark") && (adminHeader.classList.add('dark-mode'),sideMenu.classList.add('dark-mode'),mainSection.classList.add('dark-mode'),formBg.classList.add('dark-mode') )

  darkMode.addEventListener('click',()=>{
    if(!checkDarkMode){
      localStorage.setItem("dark","mode")
      adminHeader.classList.add('dark-mode'),
      sideMenu.classList.add('dark-mode'),
      mainSection.classList.add('dark-mode'),
      formBg.classList.add('dark-mode'),
      checkDarkMode=true
    }else{
      adminHeader.classList.remove('dark-mode')
      sideMenu.classList.remove('dark-mode')
      mainSection.classList.remove('dark-mode') 
      formBg.classList.remove('dark-mode') 
      localStorage.removeItem("dark")
      checkDarkMode=false
    }
    // console.log(checkDarkMode);
  })
};  

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
yesBtn.onclick = function() {
  modal.style.display = "none";
}
cancelBtn.onclick = function() {
  modal.style.display = "none";
}