const BASE_URL = "http://localhost:8000";

let row=document.querySelector('.products-cards')
let search=document.querySelector('#search')
let sort=document.querySelector('#filter-by-options')
let loadMore=document.querySelector('.load-more')

let allData=[]
let filtered=[]
let defaultArr=[]
let favData
let num=4


async function getAllData(){
  row.innerHTML=''
  let res= await axios(`${BASE_URL}/products`)
  let data=res.data
  allData=data
  filtered= filtered.length ? filtered : data
  filtered.slice(0,num).forEach(product => {
    row.innerHTML+=`
    <div class="col col-6 col-md-4 col-lg-3 product-card">
    <div class="product-card-div">
        <div class="img-product">
            <img src=${product.img} alt="">
            <div class="sale-not">Sale!</div>   
            <div class="new-not">new</div>
        </div>
        <div class="about-product">
            <h3>${product.name}</h3>
            <p class="prev-curr-price"><span class="prev-price">$${product.prevPrice}</span>$${product.currPrice}</p>
            <div class="add-fav">
                <button class="add-cart"><span>ADD TO CART</span></button>
                <button class="fav-btn"><i class="fa-regular fa-heart"></i></button>
            </div>
        </div>
    </div>
</div>
    `
  });
}

getAllData()

search.addEventListener('input',(e)=>{
  e.preventDefault()
  filtered=allData.slice(0,num).filter(item=>{
   return item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  })
  defaultArr=filtered
  getAllData()
})

loadMore.addEventListener('click',()=>{
  num+=4
  filtered=allData.slice(0,num).filter(item=>{
    return item.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  })
  defaultArr=filtered
  getAllData()
})

sort.addEventListener('change',()=>{
  if(sort.value=="asc"){
    filtered=filtered.slice(0,num).sort((a,b)=>a.currPrice-b.currPrice)
  }else if(sort.value=="dsc"){
    filtered=filtered.slice(0,num).sort((a,b)=>b.currPrice-a.currPrice)
  }else if(sort.value=="product-name"){
    filtered=filtered.slice(0,num).sort((a,b)=>a.name.localeCompare(b.name))
  }
  getAllData()
})



var a = 0;
$(window).scroll(function() {
  var oTop = $('#per-counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    // console.log($('.num'));
    $('.num').each(function() {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.text(`${Math.ceil(this.Counter)}%`);
            }
        });
    });
    a = 1;
  }
});

var b = 0;
$(window).scroll(function() {
  var oTop = $('#per-counter').offset().top - window.innerHeight;
  if (b == 0 && $(window).scrollTop() > oTop) {
    //   console.log($('.underline'));
    $('.underline').each(function() {
        var $this = $(this);
        // console.log($this.width());
        jQuery({ Counter: 0 }).animate({ Counter: $this.width() }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.width(Math.ceil(this.Counter));
            }
        });
    });
    b = 1;
  }
});


