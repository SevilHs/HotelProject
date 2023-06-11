$(".owl-carousel1-about").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  items: 3,
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

let numbers = document.querySelectorAll(".num");
let number1=document.querySelector('.num1')
let counterSec=document.querySelector('#counter')


// console.log(counterSec.getBoundingClientRect().top);
// console.log(document.documentElement.scrollTop);
let scrollValue=counterSec.offsetTop
window.onscroll=(()=>{
  let documentScrollValue=document.documentElement.scrollTop
  // console.log(scrollValue);
  // console.log(documentScrollValue);
  if (documentScrollValue>2000) {
    numbers.forEach((number) => {
      const updateNumber=()=>{
        let endValue=parseInt(number.getAttribute('data-value'))
        // console.log(endValue);
        let numberText= parseInt(number.innerHTML)
        // console.log(numberText);
        let increment= endValue/200
        // console.log(increment);
        if(numberText<endValue){
          number.innerHTML=Math.ceil(numberText+increment)
          setTimeout(updateNumber,1)
        }else if(number1.innerHTML==endValue){
         number1.innerHTML=`${endValue}+`
        }
      } 
      updateNumber()
    });
  }
})

$('input').on('change', function() {
  $('#testimonials-about').toggleClass('change-bgcolor');
});
