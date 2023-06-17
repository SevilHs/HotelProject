const BASE_URL = "http://localhost:8080";

let form = document.querySelector("form");
let username = document.querySelector(".username");
let password = document.querySelector(".password");
let showPassword = document.querySelector(".fa-eye");
let requiredText = document.querySelectorAll(".required-text");

requiredText.forEach((item) => (item.style.visibility = "hidden"));

username.addEventListener("input", () => {
  requiredText[0].style.visibility = "hidden";
});
password.addEventListener("input", () => {
  requiredText[1].style.visibility = "hidden";
});

let checkShow = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value && password.value) {
    async function getUser() {
      let res = await axios(`${BASE_URL}/users`);
      let data = res.data;
      let checkUser = data.find((user) => {
        return (
          (user.username == username.value || user.email == username.value) &&
          user.password == password.value
        );
      });
      if (
        ("1" == username.value || "1@gmail.com" == username.value) &&
        "1" == password.value
      ) {
        window.location = "../server/admin.html";
      } else if (checkUser) {
        window.location = "shop.html";
      } else {
        alert("Wrong information");
      }
    }
    getUser();
  } else {
    requiredText.forEach((item) => (item.style.visibility = "visible"));
  }
});

showPassword.addEventListener("click", () => {
  password.focus();
  if (!checkShow) {
    password.type = "text";
    checkShow = true;
  } else {
    password.type = "password";
    checkShow = false;
  }
});
