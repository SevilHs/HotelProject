const BASE_URL = "http://localhost:8000";

let row = document.querySelector(".news-row");
let textLength=200

async function getNewsData() {
    row.innerHTML = "";
    let res = await axios(`${BASE_URL}/news`);
    let data = res.data;
    data.forEach((element) => {
        // console.log(element.text.split('').length);;
        row.innerHTML += `
        <div class="col col-12">
        <a href="" class="img-with-link">
          <div class="hidden-text"><i class="fa-solid fa-link" style="color: #ffffff;"></i></div>
          <img src=${element.img} alt="" />
        </a>
        <span>${element.name} / ${element.date}</span>
        <a href="" class="news-title"
          >${element.title}</a
        >
        <p>
          ${element.text.slice(0,textLength)}...
        </p>
        <button class="read-more-btn" onclick=changeLength(${element.text.split('').length},${element.id})>READ MORE</button>
      </div>
        `;
  });
}
getNewsData()

async function changeLength(textt,id){
    let res =await axios(`${BASE_URL}/news/${id}`)
    let data=res.data
    // textLength=textt
    data.text.slice(0,textt)
    // getNewsData()
}