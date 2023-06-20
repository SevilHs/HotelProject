const BASE_URL = "http://localhost:8080";


let team = document.querySelector(".team-row");
let loadMore = document.querySelector(".load-more");
let menuBtn = document.querySelector(".menu-btn");
let menuItems = document.querySelector(".menu-items");
let arrowUp = document.querySelector(".arrow-up-btn");

let num=3
let hidden=false

async function getTeamData() {
  team.innerHTML=''
  let res = await axios(`${BASE_URL}/team`);
  let data = res.data;
  console.log(data);
  data.slice(0,num).forEach((element) => {
    team.innerHTML += `
    <div class="col col-12 col-md-6 col-lg-4">
    <div class="item">
      <img src=${element.img} alt="" />
      <div class="carousel-text">
        <div class="carousel-text-visible">
          <h3 class="name-surname">${element.name} ${element.surname}</h3>
          <span>${element.position}</span>
        </div>
        <div class="carousel-text-hidden">
          <h3 class="name-surname">${element.name} ${element.surname}</h3>
          <div class="sosial-icons">
            <a href=""><i class="fa-brands fa-instagram"></i></a>
            <a href=""><i class="fa-brands fa-twitter"></i></a>
            <a href=""><i class="fa-brands fa-facebook-f"></i></a>
            <a href=""><i class="fa-brands fa-pinterest-p"></i></a>
          </div>
          <a href="mailto:valentina@gmail.com">${element.email}</a>
        </div>
      </div>
    </div>
  </div>
    `;
  });
}
getTeamData();

loadMore.addEventListener("click", () => {
  if(!hidden){
    num += 3;
    hidden=true
    loadMore.innerHTML=`<i class="fa-solid fa-arrow-up"></i>`
  }else{hidden=false
    loadMore.innerHTML="LOAD MORE"
    num=3
  }
  getTeamData();
});



var a = 0;
$(window).scroll(function () {
  var oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".num").each(function () {
      var $this = $(this);
      jQuery({ Counter: 0 }).animate(
        { Counter: $this.text() },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.ceil(this.Counter));
          },
        }
      );
    });
    a = 1;
  }
});

$("input").on("change", function () {
  $("#testimonials-about").toggleClass("change-bgcolor");
});


let checkMenu = false;

arrowUp.style.display="none"

function scrollFunction() {
  if (
    document.body.scrollTop > 110 ||
    document.documentElement.scrollTop > 110
  ) {
    header.style.position = "fixed";
    header.style.backgroundColor = "#222";
    header.style.padding = "30px 0";
    arrowUp.style.display = "block";
  } else {
    header.style.position = "absolute";
    header.style.backgroundColor = "transparent";
    header.style.padding = "40px 0";
    arrowUp.style.display = "none";
  }
}

window.onscroll = function () {
  scrollFunction();
};

menuBtn.addEventListener("click", () => {
  if (!checkMenu) {
    menuItems.style.visibility = "visible";
    checkMenu = true;
  } else {
    checkMenu = false;
    menuItems.style.visibility = "hidden";
  }
});


arrowUp.onclick = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
