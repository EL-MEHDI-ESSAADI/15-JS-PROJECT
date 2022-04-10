// global variabls
const openCartBtn = document.querySelector(".openCart");
const closeCartBtn = document.querySelector(".closeCart");
const cartEl = document.getElementById("cart");
const overlayEl = document.querySelector(".overlay");
const cartProductsEl = document.getElementById("cartProducts");
const mainProductsEl = document.querySelector(".products");
const totalPriceEl = document.querySelector(".totalPrice");
const productsData = [
   {
      title: "queen panel bed",
      price: 10.99,
      image: "./assets/product-1.jpeg",
   },
   {
      title: "king panel bed",
      price: 12.99,
      image: "./assets/product-2.jpeg",
   },
   {
      title: "single panel bed",
      price: 12.99,
      image: "./assets/product-3.jpeg",
   },
   {
      title: "twin panel bed",
      price: 22.99,
      image: "./assets/product-4.jpeg",
   },
   {
      title: "fridge",
      price: 88.99,
      image: "./assets/product-5.jpeg",
   },
   {
      title: "dresser",
      price: 32.99,
      image: "./assets/product-6.jpeg",
   },
   {
      title: "couch",
      price: 45.99,
      image: "./assets/product-7.jpeg",
   },
   {
      title: "table",
      price: 33.99,
      image: "./assets/product-8.jpeg",
   },
];
const UserData = localStorage.products ? JSON.parse(localStorage.products) : [];
const clearDataBtn = document.querySelector(".clearBtn");
const countEl = document.querySelector(".count");


// initial products and cart
productsData.forEach((itemData, index) => {
   let productEl = document.createElement("div");
   let isInCart = UserData.some((product) => product.id === index);
   productEl.className = "product" + (isInCart ? " inCart" : "");
   productEl.dataset.id = index;
   productEl.innerHTML = `
   <figure>
   <div class="imgCon">
      <img src="${itemData.image}" alt="product">
      <button class="fs-200 uppercase addBtn bg-primary ">${
         isInCart
            ? "in cart"
            : `<i class="fas fa-shopping-cart"></i>add to cart`
      }</button>
   </div>
   <figcaption>
      <h3 class="title fs-300">${itemData.title}</h3>
      <h4 class="prise text-primary">$${itemData.price}</h4>
   </figcaption>
   </figure>   
   `;
   productEl
      .querySelector("button")
      .addEventListener("click", addToCart(index));
   mainProductsEl.append(productEl);
});
UserData.forEach((product) => {
   addToCart(product.id, product.items, true)();
   updateCount()
});

// event listeners for close and open cart
openCartBtn.addEventListener("click", openNav);
closeCartBtn.addEventListener("click", closeNav);
clearDataBtn.addEventListener("click", clearData);

// functions
function openNav() {
   cartEl.classList.toggle("closed");
   overlayEl.style.display = "block";
   document.firstElementChild.style.overflow = "hidden"
}
function closeNav() {
   cartEl.classList.toggle("closed");
   setTimeout((_) => (overlayEl.style.display = "none"), 300);
   document.firstElementChild.style.overflow = "initial"
}

function addToCart(index, items = 1, isInitial) {
   return function () {
      if (!isInitial) {
         if (
            mainProductsEl
               .querySelector(`[data-id="${index}"]`)
               .classList.contains("inCart")
         )
            return;
         this.innerText = "in cart";
         UserData.push({ id: index, items: items });
         localStorage.products = JSON.stringify(UserData);
         openNav();
      }
      let cartProductEl = document.createElement("li");
      let itemData = productsData[index];
      let newTotalPrice = +totalPriceEl.innerText + itemData.price * items;
      mainProductsEl
         .querySelector(`[data-id="${index}"]`)
         .classList.add("inCart");
      cartProductEl.className = "product flex";
      cartProductEl.dataset.id = index;
      cartProductEl.innerHTML = `
      <img src="${itemData.image}" alt="product">
      <div class="flex infoContainer">
         <div>
            <header class="fs-200 productName">${itemData.title}</header>
            <div class="fs-200 price">$<span>${itemData.price}</span></div>
            <button class="text-gray removeBtn">remove</button>
         </div>
         <div>
            <button class="fas fa-chevron-up text-primary upBtn" aria-controls="product-items" aria-label="decrease items of this product"></button>
            <span class="product-items" id="product-items">${items}</span>
            <button class="fas fa-chevron-down text-primary downBtn" aria-label="increase items of this product"></button>
         </div>
      </div>
      `;
      let productItemsEl = cartProductEl.querySelector(".product-items");
      cartProductEl
         .querySelector(".upBtn")
         .addEventListener(
            "click",
            updateItemsNum(productItemsEl, index, cartProductEl, "normal", 1)
         );
      cartProductEl
         .querySelector(".downBtn")
         .addEventListener(
            "click",
            updateItemsNum(productItemsEl, index, cartProductEl, "normal", -1)
         );
      cartProductEl
         .querySelector(".removeBtn")
         .addEventListener(
            "click",
            updateItemsNum(productItemsEl, index, cartProductEl, "reverse")
         );
      cartProductsEl.append(cartProductEl);
      totalPriceEl.innerText = newTotalPrice.toFixed(2);
      updateCount()
   };
}

function updateItemsNum(itemsNumEl, id, cartProductEl, state = "normal", num) {
   return function () {
      let newTotalPrice, newItemsValue;
      if (state != "normal") num = -itemsNumEl.innerText;
      newTotalPrice = +totalPriceEl.innerText + productsData[id].price * num;
      newItemsValue = +itemsNumEl.innerText + num;
      totalPriceEl.innerText = newTotalPrice.toFixed(2);
      UserData.some((product, index) => {
         if (product.id != id) return;
         if (newItemsValue === 0) {
            UserData.splice(index, 1);
            localStorage.products = JSON.stringify(UserData);
            cartProductEl.remove();
            mainProductsEl.querySelector(
               `[data-id="${id}"] .addBtn`
            ).innerHTML = `<i class="fas fa-shopping-cart"></i> add to cart`;
            mainProductsEl
               .querySelector(`[data-id="${id}"]`)
               .classList.remove("inCart");
         } else {
            itemsNumEl.innerText = newItemsValue;
            product.items = newItemsValue;
            localStorage.products = JSON.stringify(UserData);
         }
         return true;
      });
      updateCount()
   };
}

function clearData() {
   cartProductsEl.innerHTML = "";
   totalPriceEl.innerText = 0;
   mainProductsEl.querySelectorAll(".inCart").forEach((product) => {
      let shopIconEl = document.createElement("i");
      let addBtn = product.querySelector(".addBtn");
      product.classList.remove("inCart");
      shopIconEl.className = "fas fa-shopping-cart";
      addBtn.lastChild.remove();
      addBtn.append(shopIconEl, "add to cart");
      UserData.splice(0,UserData.length);
      localStorage.products = "[]";
   });
   closeNav()
   updateCount()
}

function updateCount() {
   countEl.innerText = cartProductsEl.childElementCount
}