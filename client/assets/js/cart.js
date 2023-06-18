const BASE_URL="http://localhost:8000"

let tBody=document.querySelector('tbody')
let not=document.querySelector('.remove-notification')
let total=document.querySelector('.total-price')
let checkStock=[]
let quantity
let totalPrice=0
let productPrice

async function getCartData(){
    tBody.innerHTML=''
    let res=await axios(`${BASE_URL}/cartdata`)
    let data=res.data
    let res2= await axios(`${BASE_URL}/products`)
    let data2=res2.data
    checkStock=data2
    data.forEach(product => {
        totalPrice= totalPrice+ +product.currPrice
        total.innerHTML=`Total: $ ${totalPrice}`
        let trElem=document.createElement('tr')
        trElem.innerHTML=`
        <td><i class="fa-solid fa-xmark" onclick=deleteCart(${product.id},this)></i></td>
        <td class="td-img"><img src="${product.img}" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td>${checkStock.find(item=>item.name==product.name) ? "Instock" : "Sold Out"}</td>
        <td>$${product.currPrice}</td>
        <td><input type="number" value="1" oninput=onInput(${product.currPrice},this)></td>
        <td>$ ${productPrice ? productPrice : product.currPrice}</td>  
        `
        tBody.append(trElem)
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
    productPrice=btn.value * price
    console.log(productPrice);
    if(btn.value<1){
        btn.value=1
    }
}