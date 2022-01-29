// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let items = [];
let editId = 0;
// ****** EVENT LISTENERS **********
form.addEventListener("submit", addAtime);
submitBtn.onclick = submitBtnEvn;
clearBtn.onclick = clearAll;
// ****** FUNCTIONS **********
function addAtime(e) {
  e.preventDefault();

  let value = grocery.value;
  // check if the value str not empty
  if (!value) {
    alertFun("alert-danger", "Please enter value");
    return;
  }
  // add item to the list
  let id = new Date().getTime();
  let article = document.createElement("article");
  article.innerHTML = `
  <p class="title">${value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`;
  article.className = "grocery-item";
  article.dataset.id = id;
  // add event listner to edit btn
  article.querySelector(".edit-btn").addEventListener("click", editBtnEvn);
  // add event listner to delet btn
  article.querySelector(".delete-btn").addEventListener("click", deleteBtnEvn);
  console.log(article.querySelector(".delete-btn").onclick);
  // append the article
  list.append(article);
  // edit the container
  container.classList.add("show-container");
  // add item to local storage
  addToLS(value, id);
  // reset grocery value
  grocery.value = "";
  // edit alert
  alertFun("alert-success", "item add to the list");
}
function addToLS(value, id) {
  items.push({value,id});
  localStorage.items = JSON.stringify(items);
}
function restorItems() {
  items = JSON.parse(localStorage.items);
  items.forEach((item) => {
    list.innerHTML += `<article class="grocery-item" data-id="${item.id}">
      <p class="title">${item.value}</p>
      <div class="btn-container">
        <button type="button" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </article>`;
  });
}
function editBtnEvn(e) {
  let article = e.currentTarget.parentElement.parentElement;
  submitBtn.textContent = "edit";
  editId = +article.dataset.id;
  grocery.value = article.firstElementChild.textContent;
}
function deleteBtnEvn(e) {
  // remove it from DOM
  let article = e.currentTarget.parentElement.parentElement;
  let id = article.dataset.id;
  article.parentElement.removeChild(article);
  // remove it from local storage
  items = items.filter((el) => el.id != id);
  localStorage.items = JSON.stringify(items);
  // check for list
  if (!list.childElementCount) {
    container.classList.remove("show-container");
  }
  // reset subBtn and grocey
  if (submitBtn.textContent != "submit") {
    backToDefault()
  }
  //  alert
  alertFun("alert-danger", "item deleted");
}
function submitBtnEvn(e) {
  if (editId) {
    // get changed value and set it
    value = grocery.value;
    // prevent default callback fun
    e.preventDefault();
    list.querySelector(`[data-id="${editId}"] .title`).textContent = value;
    // update value in local data
    let item = items.filter((item) => {
      return item.id == editId;
    })[0];
    item.value = value;
    localStorage.items = JSON.stringify(items);
    // reset subBtn and grocey
    backToDefault()

    // edit alert
    alertFun("alert-success","value changed")
  }
}
function alertFun(type, textValue) {
  alert.classList.add(type);
  alert.textContent = textValue;
  setTimeout((_) => {
    alert.textContent = "";
    alert.classList.remove(type);
  }, 1000);
}
function clearAll() {
  // remove element
  const listItems = document.querySelectorAll(".grocery-item");
  listItems.forEach((item) => {
    list.removeChild(item);
  });
  // clear local storage
  items = [];
  localStorage.removeItem("items");
  container.classList.remove("show-container");
  // reset subBtn and grocey
  if (submitBtn.textContent != "submit") {
    backToDefault()
  }
  alertFun("alert-danger", "empty list");
}
function backToDefault() {
  submitBtn.textContent = "submit";
  editId = 0;
  grocery.value = "";
};
// ****** LOCAL STORAGE **********
// restore item from local storage
if (localStorage.hasOwnProperty("items") && localStorage.items != "[]") {
  console.log("bb");
  container.classList.add("show-container");
  // restore items
  restorItems();
  // reset editBtn event listener
  items.forEach((item) => {
    let id = item.id;
    
    document
      .querySelector(`[data-id="${id}"] .edit-btn`)
      .addEventListener("click", editBtnEvn);
    document
      .querySelector(`[data-id="${id}"] .delete-btn`)
      .addEventListener("click", deleteBtnEvn);
  });
}