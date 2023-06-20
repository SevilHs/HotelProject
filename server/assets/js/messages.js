const BASE_URL = "http://localhost:8080";

let row = document.querySelector(".messages");
let adminHeader = document.querySelector("#admin-header");
let sideMenu = document.querySelector("#main-side-menu");
let mainSection = document.querySelector("#messages");
let darkMode = document.querySelector(".input");
let screenSize = document.querySelector(".screen-size-li");

let checkFullScreen = false;
let checkDarkMode = false;

async function getMessages() {
  row.innerHTML = "";
  let res = await axios(`${BASE_URL}/message`);
  let data = res.data;
  data.forEach(message => {
      row.innerHTML += `
        <div class="col col-12 col-md-6 message-card">
        <div class="message-card-div">
          <h2 class="name-icon"><img src="./assets/images/chat.png" alt=""> Custom name: <span>${message.name}</span> </h2>
        <h3>Email: <span> ${message.email}</span></h3>
        <div></div>
        <h4>Number: <a href="tel:+${message.number}"> ${message.number}</a></h4>
        <h4>Subject: <span> ${message.subject}</span></h4>
        <h4>Message: <br/> <p> ${message.message}</p></h4>
       
        </div>
      </div>  
        `;
  });
}
getMessages()

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
    mainSection.classList.add("dark-mode"));

  darkMode.addEventListener("click", () => {
    if (!checkDarkMode) {
      localStorage.setItem("dark", "mode");
      adminHeader.classList.add("dark-mode"),
        sideMenu.classList.add("dark-mode"),
        mainSection.classList.add("dark-mode"),
        (checkDarkMode = true);
    } else {
      adminHeader.classList.remove("dark-mode");
      sideMenu.classList.remove("dark-mode");
      mainSection.classList.remove("dark-mode");
      localStorage.removeItem("dark");
      checkDarkMode = false;
    }
    // console.log(checkDarkMode);
  });
};