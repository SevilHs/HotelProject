const BASE_URL="http://localhost:8000"

let row=document.querySelector('.row')

async function getAlldata(){
  let res=await axios(`${BASE_URL}/rooms`)
  let data= res.data
  data.forEach(room => {
    row.innerHTML+=`
    <div class="col col-12 col-md-6 col-lg-4">
    <div class="img-text">
      <img
        src="${room.img}"
        alt=""
      />
      <div class="price-room">From $ ${room.price}</div>
      <div class="price-sale">${room.sale}% off</div>
    </div>
    <div class="rooms-text">
      <h3>${room.roomName}</h3>
      <span>${room.bed}</span>
      <span>${room.guests} Guests</span>
      <a href="./roomdetails.html?id=${room.id}">DETAILS<i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
    `
  });
}
getAlldata()

$(".owl-carousel1").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 2,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });