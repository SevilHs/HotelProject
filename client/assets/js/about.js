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
let scrollTopCounter=document.querySelector('#counter')

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
