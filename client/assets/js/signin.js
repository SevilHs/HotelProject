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
        data.filter((user) => {
          (user.username.toLocaleLowerCase() ==
            username.value.toLocaleLowerCase() ||
            user.email.toLocaleLowerCase() == username.value.toLocaleLowerCase()) &&
          user.password.toLocaleLowerCase() == password.value.toLocaleLowerCase()
            ? console.log("true")
            : console.log("false");
        });
      }
      getUser();
  } else {
    requiredText.forEach((item) =>(item.style.visibility = "visible"));
  }
  //   window.location = "shop.html";
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
