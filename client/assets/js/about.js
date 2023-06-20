const BASE_URL = "http://localhost:8080";

let team = document.querySelector(".team-row");
let loadMore = document.querySelector(".load-more");

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



// $(".owl-carousel1-about").owlCarousel({
//   loop: true,
//   margin: 10,
//   nav: true,
//   // items: 3,
//   // autoplayTimeOut:2000,
//   // smartSpeed:800,
//   autoplay:true,
//   rewind:true,
//   animateOut:"fadeOut",
//   animateIn:"fadeIn",
//   responsiveClass:true,
//   dots:true,
//   responsive: {
//     0: {
//       items: 1,
//     },
//     600: {
//       items: 2,
//     },
//     1000: {
//       items: 3,
//     },
//     1366:{
//       items:3,
//     }
//   },
// });

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
