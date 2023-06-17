const BASE_URL = "http://localhost:8000";

let row = document.querySelector(".products-row");
let search = document.querySelector("#search");
let sort = document.querySelectorAll(".option");
let loadMore = document.querySelector(".load-more");
// let option=document.querySelectorAll('option')
// console.log(option[0]);

let allData = [];
let filtered = [];
let defaultArr = [];
let favData;
let num = 3;

async function getAllData() {
  row.innerHTML = "";
  let res = await axios(`${BASE_URL}/products`);
  let data = res.data;
  allData = data;
  filtered = filtered.length ? filtered : data;
  filtered.slice(0, num).forEach((product) => {
    console.log(product.prevPrice);
    console.log(product.currPrice);
    row.innerHTML += `
            <div class="col col-12 col-md-6 col-lg-4 product-div">
                <a href="" class="img-div">
                  <img src="${product.img}" alt="${product.name}">
                  <div class="cart-fav">
                    <i class="fa-solid fa-basket-shopping" onclick=addCart(${product.id})></i>
                    <i class="fa-regular fa-heart" onclick=addFav(${product.id},this)></i>
                  </div>
                </a>
                <div class="name-price">
                  <h3>${product.name}</h3>
                  <p><span class="prev-price">${product.prevPrice ? "$" + product.prevPrice : ""}</span>$${product.currPrice}</p>
                </div>
              </div>
    `;
  });
}

async function addCart(id) {
  // let res=await axios( `${BASE_URL}/products/${id}`)
  // let data=res.data
  let productCart = allData.find((item) => item.id == id);
  let res2 = await axios(`${BASE_URL}/cartdata`);
  let data2 = res2.data;
  let checkCart = data2.find((item) => item.id == id);
  if (!checkCart) {
    await axios.post(`${BASE_URL}/cartdata`, productCart);
  } else {
    alert("nono");
  }
}

async function addFav(id, btn) {
  let productFav = allData.find((item) => item.id == id);
  let res2 = await axios(`${BASE_URL}/favdata`);
  let data2 = res2.data;
  let checkFav = data2.find((item) => item.id == id);
  if (!checkFav) {
    await axios.post(`${BASE_URL}/favdata`, productFav);
    btn.children[0].style.color = "red";
  } else {
    btn.children[0].style.color = "";
    alert("nono");
  }
}

getAllData();

// search.addEventListener("input", (e) => {
//   e.preventDefault();
//   filtered = allData.slice(0, num).filter((item) => {
//     return item.name
//       .toLocaleLowerCase()
//       .includes(e.target.value.toLocaleLowerCase());
//   });
//   defaultArr = filtered;
//   getAllData();
// });

loadMore.addEventListener("click", () => {
  num += 3;
  filtered = allData.slice(0, num).filter((item) => {
    return item.name
      .toLocaleLowerCase()
      .includes(search.value.toLocaleLowerCase());
  });
  defaultArr = filtered;
  getAllData();
  // if(allData.length<=num){
  //   loadMore.disabled=true
  // }
});

// sort.addEventListener("change", () => {
//   if (sort.value == "asc") {
//     filtered = filtered.slice(0, num).sort((a, b) => a.currPrice - b.currPrice);
//   } else if (sort.value == "dsc") {
//     filtered = filtered.slice(0, num).sort((a, b) => b.currPrice - a.currPrice);
//   } else if (sort.value == "product-name") {
//     filtered = filtered
//       .slice(0, num)
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }
//   getAllData();
// });

var a = 0;
$(window).scroll(function () {
  var oTop = $("#per-counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    // console.log($('.num'));
    $(".num").each(function () {
      var $this = $(this);
      jQuery({ Counter: 0 }).animate(
        { Counter: $this.text() },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(`${Math.ceil(this.Counter)}%`);
          },
        }
      );
    });
    a = 1;
  }
});

var b = 0;
$(window).scroll(function () {
  var oTop = $("#per-counter").offset().top - window.innerHeight;
  if (b == 0 && $(window).scrollTop() > oTop) {
    //   console.log($('.underline'));
    $(".underline").each(function () {
      var $this = $(this);
      // console.log($this.width());
      jQuery({ Counter: 0 }).animate(
        { Counter: $this.width() },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.width(Math.ceil(this.Counter));
          },
        }
      );
    });
    b = 1;
  }
});
