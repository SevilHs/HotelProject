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

async function getUser() {
  let res = await axios(`${BASE_URL}/users`);
  let data = res.data;
  let isAdmin
  data.find((user) => {
    return (
      (user.username == username.value || user.email == username.value) &&
      user.password == password.value && (isAdmin=user.isAdmin)
    );
  });
  let checkUser = data.find((user) => {
    return (
      (user.username == username.value || user.email == username.value) &&
      user.password == password.value
    );
  });
  console.log(checkUser);
  if (checkUser && isAdmin ){
    window.location = `../server/admin.html?name=${checkUser.username}`;
  } else if (checkUser && !isAdmin) {
    localStorage.setItem("sign","true")
    window.location = "shop.html";
  } else {
    alert("Wrong username or password");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value && password.value) {
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
