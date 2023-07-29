const BASE_URL = "http://localhost:8000";

let row = document.querySelector(".news-row");

let textLength=200
let hidden=false

async function getNewsData() {
    row.innerHTML = "";
    let res = await axios(`${BASE_URL}/news`);
    let data = res.data;
    data.forEach((element) => {
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
          <span class="visible-text">${element.text.slice(0,textLength)}</span><span class="visible-dots">...</span>
          <span class="hidden-textt d-none">${element.text.slice(textLength)}</span>
        </p>
        <button class="read-more-btn" onclick=changeLength(this)>READ MORE</button>
      </div>
        `;
  });
}
getNewsData()

async function changeLength(btn){
  if(!hidden){
    btn.parentElement.querySelector(".hidden-textt").classList.remove("d-none")
    btn.parentElement.querySelector(".visible-dots").classList.add("d-none")
    hidden=true
    btn.innerHTML=`<i class="fa-solid fa-arrow-up"></i>`
  }else{
    btn.parentElement.querySelector(".hidden-textt").classList.add("d-none")
    btn.parentElement.querySelector(".visible-dots").classList.remove("d-none")
    hidden=false
    btn.innerHTML="READ MORE"
  }

}