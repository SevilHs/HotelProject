const BASE_URL = "http://localhost:8080";

let customName = document.querySelector("#custom-name");
let customEmail = document.querySelector("#custom-email");
let customNumber = document.querySelector("#custom-number");
let customSubject = document.querySelector("#custom-subject");
let messageText = document.querySelector("#message-text");
let form = document.querySelector("form");
let not = document.querySelector("#notification");

function emptyInp() {
  (customName.value = ""),
    (customEmail.value = ""),
    (customNumber.value = ""),
    (customSubject.value = ""),
    (messageText.value = "");
}

async function addMessage() {
  let obj = {
    name: customName.value,
    email: customEmail.value,
    number: customNumber.value,
    subject: customSubject.value,
    message: messageText.value,
  };
  await axios.post(`${BASE_URL}/message`, obj);
}

function showNot(text) {
  if (
    !customName.value ||
    !customEmail.value ||
    !customNumber.value ||
    !customSubject.value ||
    !messageText.value
  ) {
    not.removeAttribute("hidden");
    not.innerHTML = text;
  }
  setTimeout(() => {
    not.setAttribute("hidden", "");
  }, 4000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    customName.value &&
    customEmail.value &&
    customNumber &&
    customSubject &&
    messageText
  ) {
    addMessage();
  }
  showNot("One or more fields have an error. Please check and try again.");
  emptyInp();
});
