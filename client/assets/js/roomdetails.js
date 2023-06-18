const BASE_URL="http://localhost:8000"

let id= new URLSearchParams(window.location.search).get("id")
let roomImg=document.querySelector('.room-img')
let roomName=document.querySelector('.room-name')
let guests=document.querySelector('.guests')
let price=document.querySelector('.price')
let bed=document.querySelector('.bed')

async function getRoomData(){
    let res= await axios(`${BASE_URL}/rooms/${id}`)
    let data= res.data
    console.log(data);
    roomName.innerHTML=data.roomName
    roomImg.src=data.img
    guests.innerHTML=`${data.guests} Persons`
    price.innerHTML=`$ ${data.price}`
    bed.innerHTML=data.bed
}
getRoomData()

$(".owl-carousel4").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 3,
    autoplay: true,
    autoplayTimeout:2000,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  });