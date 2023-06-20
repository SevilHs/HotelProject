const BASE_URL = "http://localhost:8080";

let darkMode = document.querySelector(".input");
let adminHeader = document.querySelector("#admin-header");
let sideMenu = document.querySelector("#main-side-menu");
let mainSection = document.querySelector("#main-content-rooms");
let screenSize = document.querySelector(".screen-size-li");
let formBg = document.querySelector("#add-edit");
let submitBtn = document.querySelector("#submit-btn");
let row=document.querySelector(".row-news")

let checkFullScreen = false;
let checkDarkMode = false;
let alldata=[]

async function getUsersData(){
    row.innerHTML=""
    let res = await axios(`${BASE_URL}/users`)
    let data=res.data
    alldata=data
    data.forEach(user => {
        row.innerHTML+=`
        <div class="col col-6 col-md-4">
        <div class="user">
          <img src=${user.file} alt=${user.username} />
          <div class="user-info">
          <i class="fa-solid fa-user-plus" onclick=doAdmin(${user.id})></i>
            <div class="text-visible">
              <h3 class="name-surname">${user.username}</h3>
              <span>+${user.number}</span>
            </div>
            <div class="text-hidden">
              <div class="sosial-icons">
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-pinterest-p"></i>
              </div>
              <a href="mailto:valentina@gmail.com">${user.email}</a>
            </div>
          </div>
        </div>
      </div>
        `
    });
}
getUsersData()

async function doAdmin(id){
   let obj={
    isAdmin:true
   }
   await axios.patch(`${BASE_URL}/users/${id}`,obj)
}


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