const BASE_URL = "http://localhost:8080";

let row = document.querySelector(".messages");

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