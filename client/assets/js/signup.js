const BASE_URL = "http://localhost:8080";

let form = document.querySelector("form");
let username = document.querySelector(".username");
let email = document.querySelector(".email");
let number = document.querySelector(".number");
let password = document.querySelector(".password");
let showPassword = document.querySelector(".fa-eye");
let requiredText = document.querySelectorAll(".required-text");

requiredText.forEach((item) => (item.style.visibility = "hidden"));
username.addEventListener('input',()=>{
    requiredText[0].style.visibility="hidden"
})
email.addEventListener('input',()=>{
    requiredText[1].style.visibility="hidden"
})
number.addEventListener('input',()=>{
    requiredText[2].style.visibility="hidden"
})
password.addEventListener('input',()=>{
    requiredText[3].style.visibility="hidden"
})

let checkShow = false;

function emptyInp() {
  username.value = "";
  email.value = "";
  number.value = "";
  password.value = "";
}

async function setUser() {
  let obj = {
    username: username.value,
    email: email.value,
    number: number.value,
    password: password.value,
  };
  let res = await axios(`${BASE_URL}/users`);
  let data = res.data;
  let checkData = data.find((item) => item.username == username.value);
  console.log(checkData);
  if (!checkData) {
    await axios.post(`${BASE_URL}/users`, obj);
    emptyInp();
  } else {
    alert("this username already exists");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value && email.value && password.value && number.value) {
    setUser();
  }else{
    requiredText.forEach(item=>item.style.visibility="visible")
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
