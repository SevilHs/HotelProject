let arrowDown=document.querySelector('.arrow-down')
let visitUs= document.querySelector('#visit-us')
let {top: position}=visitUs.getBoundingClientRect()
console.log(position);
arrowDown.addEventListener('click',()=>{
    document.documentElement.scrollTop=position
})