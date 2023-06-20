const BASE_URL = "http://localhost:8000";
const TEAM = "http://localhost:8080";
let adminName=new URLSearchParams(window.location.search).get("name")

let bar = document.querySelectorAll(".bar");
let circle = document.querySelectorAll(".circle");
let circleText = document.querySelector(".circle-text");
let month = document.querySelectorAll(".month");
let members = document.querySelector(".main-container-members");
let admin=document.querySelector('.admin-name')
let screenSize=document.querySelector('.screen-size-li')
let logOut=document.querySelector('.log-out')
let adminHeader=document.querySelector('#admin-header')
let sideMenu=document.querySelector('#main-side-menu')
let mainSection=document.querySelector('#main-section')
let darkMode=document.querySelector('.input')

let checkFullScreen=false
let checkDarkMode=false


admin.innerHTML=`${adminName}!`

async function getActivityData() {
  let res = await axios(`${BASE_URL}/activity`);
  let data = res.data;
  bar[data.length - 1].classList.add("selected");
  data.forEach((element) => {
    bar.forEach((item) => {
      if (element.id == item.id) {
        item.style.height = `${element.totalsale + element.restaurant}%`;
      } else if (!item.id) {
        item.style.height = "10%";
      }
    });
    circleText.innerHTML = element.month;
    circle.forEach((item) => {
      if ("restaurant" == item.id) {
        item.setAttribute(
          "stroke-dasharray",
          `${
            (element.restaurant * 100) /
              (element.totalsale + element.restaurant) +
            100
          },100`
        );
        // console.log(item);
      } else if ("totalsale" == item.id) {
        item.removeAttribute("stroke-dasharray");
        item.setAttribute(
          "stroke-dasharray",
          `${
            (element.restaurant * 100) /
            (element.totalsale + element.restaurant)
          },100`
        );
        // console.log(item);
      }
    });
  });
}
getActivityData();

async function getMembersData() {
  members.innerHTML = "";
  let res = await axios(`${TEAM}/team`);
  let data = res.data;
  // console.log(data);
  data.forEach((item) => {
    members.innerHTML += `
    <span class="member">
    <div class="img-text">
        <img src=${item.img} alt="">
        <div class="member-text">
            <div>
                <h3>${item.name}</h3>
                <p>${item.position}</p>
            </div>
        </div>
    </div>
    <div class="actions">
      <i class="fa-solid fa-trash" onclick=deleteMember(${item.id},this)></i>
    </div>
  </span>     
        `;
  });
}
getMembersData();

async function deleteMember(id,btn){
    await axios.delete(`${TEAM}/team/${id}`)
    btn.closest('span').remove()
}

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
  localStorage.getItem("dark") && (adminHeader.classList.add('dark-mode'),sideMenu.classList.add('dark-mode'),mainSection.classList.add('dark-mode') )

  darkMode.addEventListener('click',()=>{
    if(!checkDarkMode){
      localStorage.setItem("dark","mode")
      adminHeader.classList.add('dark-mode'),
      sideMenu.classList.add('dark-mode'),
      mainSection.classList.add('dark-mode'),
      checkDarkMode=true
    }else{
      adminHeader.classList.remove('dark-mode')
      sideMenu.classList.remove('dark-mode')
      mainSection.classList.remove('dark-mode')
      localStorage.removeItem("dark")
      checkDarkMode=false
    }
    // console.log(checkDarkMode);
  })
};  
