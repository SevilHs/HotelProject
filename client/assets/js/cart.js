const BASE_URL="http://localhost:8000"

let tBody=document.querySelector('tbody')
let not=document.querySelector('.remove-notification')
let total=document.querySelector('.total-price')
let cartR=document.querySelector('.cart-responsive')
let checkStock=[]
let quantity
let totalPrice=0
let defaultPrice=0

async function getCartData(){
    tBody.innerHTML=''
    let res=await axios(`${BASE_URL}/cartdata`)
    let data=res.data
    let res2= await axios(`${BASE_URL}/products`)
    let data2=res2.data
    checkStock=data2
    data.forEach(product => {
        totalPrice= totalPrice+ +product.currPrice
        defaultPrice=totalPrice
        // total.innerHTML=(localStorage.getItem("total")) ? `$ ${+(localStorage.getItem("total"))+ totalPrice}` : `Total: $ ${totalPrice}`
        total.innerHTML=`Total: $ ${totalPrice}`
        let trElem=document.createElement('tr')
        trElem.innerHTML=`
        <td><i class="fa-solid fa-xmark" onclick=deleteCart(${product.id},this)></i></td>
        <td class="td-img"><img src="${product.img}" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td>${checkStock.find(item=>item.name==product.name) ? "Instock" : "Sold Out"}</td>
        <td>$${product.currPrice}</td>
        <td><input type="number" value="1"  oninput=onInput(${product.currPrice},this)></td>
        <td class="price-quantity">$ ${product.currPrice}</td>  
        `
        tBody.append(trElem)
        cartR.innerHTML+=`
        <div class="col col-12">
        <img src=${product.img} alt="" />
        <div class="cart-text-responsive">
          <h3>${product.name}</h3>
          <input type="number" name="" id="" value="1" />
          <h4>$${product.currPrice}</h4>
        </div>
      </div>
        `
    });
}
getCartData()

async function deleteCart(id,btn){
    await axios.delete(`${BASE_URL}/cartdata/${id}`)
    btn.closest('tr').remove()
    not.removeAttribute('hidden')
    setTimeout(() => {
        not.setAttribute("hidden", "");
      }, 4000);
}

function onInput(price,btn){
    let test=+btn.value ? +price* +btn.value :0
    total.innerHTML=""
    if(+btn.value<=0){
        btn.value=0
    }
    if(btn.value!=""){
        defaultPrice=totalPrice
        defaultPrice+= test - +price
        // console.log(defaultPrice);
        total.innerHTML=`Total: $ ${defaultPrice}` 
        // test=+price* +btn.value
    }else{
        defaultPrice-=test
        total.innerHTML=`Total: $ ${defaultPrice}`
    }
    btn.parentElement.parentElement.querySelector(".price-quantity").innerHTML=`$ ${price* +btn.value}`
    // localStorage.setItem("total",`${price* +btn.value}`)   
}

// window.onload=()=>{
//     localStorage.removeItem("total")
// }
