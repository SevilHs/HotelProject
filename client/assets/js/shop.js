const BASE_URL = "http://localhost:8000";
const USERS = "http://localhost:8080";

let row = document.querySelector(".products-row");
let search = document.querySelector("#search");
let loadMore = document.querySelector(".load-more");
let option = document.querySelectorAll(".option");
let newProductName = document.querySelector(".new-product-name");
let newProductImg = document.querySelector(".new-product-left");
let newProductPrice = document.querySelector(".price-new-in");
let newProductAddCart = document.querySelector(".add-cart-btn");
let productCount = document.querySelector(".product-count");
let file = document.querySelector(".img");

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
    // console.log(product.prevPrice);
    // console.log(product.currPrice);
    row.innerHTML += `
            <div class="col col-12 col-md-6 col-lg-4 product-div">
                <div class="img-div">
                  <img src="${product.img}" alt="${product.name}">
                  <div class="cart-fav">
                    <i class="fa-solid fa-basket-shopping" onclick=addCart(${
                      product.id
                    })></i>
                    <i class="fa-regular fa-heart" onclick=addFav(${
                      product.id
                    },this)></i>
                  </div>
                </div>
                <div class="name-price">
                  <h3>${product.name}</h3>
                  <p><span class="prev-price">${
                    product.prevPrice ? "$" + product.prevPrice : ""
                  }</span>$${product.currPrice}</p>
                </div>
              </div>
    `;
  });
}
getAllData();

async function getNewProduct() {
  let res = await axios(`${BASE_URL}/products`);
  let data = res.data;
  let max = [];
  data.forEach((item) => {
    max.push(new Date(item.date));
  });
  let currProduct = data.find(
    (item) =>
      new Date(item.date) ==
      `${
        max.sort((a, b) =>
          a.getMonth() != b.getMonth()
            ? b.getMonth() - a.getMonth()
            : b.getDate() - a.getDate()
        )[0]
      }`
  );
  // console.log(currProduct);
  newProductName.innerHTML = currProduct.name;
  newProductPrice.innerHTML = `$${currProduct.currPrice}`;
  newProductImg.innerHTML = `<img src=${currProduct.img} alt="new product" />`;

  newProductAddCart.addEventListener("click", async () => {
    let res2 = await axios(`${BASE_URL}/cartdata`);
    let data2 = res2.data;
    if (localStorage.getItem("sign")) {
      if (!data2.find((item) => item.id == currProduct.id)) {
        await axios.post(`${BASE_URL}/cartdata`, currProduct);
      } else {
        alert("This product already exists in the cart");
      }
    } else {
      window.location = "./signup.html";
    }
  });
}

getNewProduct();

async function getProductCount() {
  let res = await axios(`${BASE_URL}/cartdata`);
  let data = res.data;
  productCount.innerHTML = data.length;
}
getProductCount();

async function addCart(id) {
  // let res=await axios( `${BASE_URL}/products/${id}`)
  // let data=res.data
  if (localStorage.getItem("sign")) {
    let productCart = allData.find((item) => item.id == id);
    let res2 = await axios(`${BASE_URL}/cartdata`);
    let data2 = res2.data;
    let checkCart = data2.find((item) => item.id == id);
    if (!checkCart) {
      await axios.post(`${BASE_URL}/cartdata`, productCart);
    } else {
      alert("This product already exist in the cart");
    }
  } else {
    window.location = "./signup.html";
  }
}

async function addFav(id, btn) {
  if (localStorage.getItem("sign")) {
    let productFav = allData.find((item) => item.id == id);
    let res2 = await axios(`${BASE_URL}/favdata`);
    let data2 = res2.data;
    let checkFav = data2.find((item) => item.id == id);
    if (!checkFav) {
      await axios.post(`${BASE_URL}/favdata`, productFav);
    } else {
      await axios.delete(`${BASE_URL}/favdata/${id}`);
    }
    if (localStorage.getItem("fav")) {
      localStorage.removeItem("fav");
      btn.style.color = "";
    } else {
      localStorage.setItem("fav", "redHeart");
      btn.style.color = "red";
    }
  } else {
    window.location = "./signup.html";
  }
}

search.addEventListener("input", (e) => {
  e.preventDefault();
  filtered = allData.slice(0, num).filter((item) => {
    return item.name
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  defaultArr = filtered;
  getAllData();
});

loadMore.addEventListener("click", () => {
  num += 3;
  filtered = allData.slice(0, num).filter((item) => {
    return item.name
      .toLocaleLowerCase()
      .includes(search.value.toLocaleLowerCase());
  });
  defaultArr = filtered;
  getAllData();
  if (allData.length <= num) {
    loadMore.style.color = "black";
    loadMore.disabled = true;
    loadMore.style.opacity = "0.3";
  }
});

option[0].addEventListener("click", () => {
  filtered = filtered
    .slice(0, num)
    .sort((a, b) => a.name.localeCompare(b.name));
  option.forEach((item) => (item.style.color = ""));
  option[0].style.color = "white";
  getAllData();
});
option[1].addEventListener("click", () => {
  filtered = filtered.slice(0, num).sort((a, b) => a.currPrice - b.currPrice);
  option.forEach((item) => (item.style.color = ""));
  option[1].style.color = "white";
  getAllData();
});
option[2].addEventListener("click", () => {
  filtered = filtered.slice(0, num).sort((a, b) => b.currPrice - a.currPrice);
  option.forEach((item) => (item.style.color = ""));
  option[2].style.color = "white";
  getAllData();
});
option[3].addEventListener("click", () => {
  filtered = filtered
    .slice(0, num)
    .filter((item) => item.name.toLocaleLowerCase().includes("decor"));
  option.forEach((item) => (item.style.color = ""));
  option[3].style.color = "white";
  getAllData();
});
option[4].addEventListener("click", () => {
  filtered = defaultArr;
  option.forEach((item) => (item.style.color = ""));
  option[4].style.color = "white";
  getAllData();
});

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
