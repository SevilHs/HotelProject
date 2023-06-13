let arrowDown=document.querySelector('.arrow-down')
let aboutRestSec= document.querySelector('#about-rest')
let {top: position}=aboutRestSec.getBoundingClientRect()
console.log(position);
arrowDown.addEventListener('click',()=>{
    document.documentElement.scrollTop=position
})