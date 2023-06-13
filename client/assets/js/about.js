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


// window.onscroll=(()=>{
//   let a=0
//   let oTop= counterSec.offsetTop-window.innerHeight
//   if (a==0 && document.documentElement.scrollTop>oTop) {
//     numbers.forEach((number) => {
//       const updateNumber=()=>{
//         let endValue=parseInt(number.getAttribute('data-value'))
//         // console.log(endValue);
//         let numberText= parseInt(number.innerHTML)
//         // console.log(numberText);
//         let increment= endValue/200
//         // console.log(increment);
//         if(numberText<endValue){
//           number.innerHTML=Math.ceil(numberText+increment)
//           setTimeout(updateNumber,1)
//         }else if(number1.innerHTML==endValue){
//          number1.innerHTML=`${endValue}+`
//         }
//       }
//       updateNumber()
//     });
//     a=1
//   }
// })

var a = 0;
$(window).scroll(function() {
  var oTop = $('#counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.num').each(function() {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.text(Math.ceil(this.Counter));
            }
        });
    });
    a = 1;
  }
});

$('input').on('change', function() {
  $('#testimonials-about').toggleClass('change-bgcolor');
});
