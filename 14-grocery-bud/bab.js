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
// ****** EVENT LISTENERS **********
form.addEventListener("submit", addAtime);
submitBtn.onclick = submitBtnEvn;

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
  article.className = "grocery-item"
  article.dataset.id = id
  list.append(article);
  // add event listner to edit btn
  editBtnEvn(id);
  // add event listner to delete btn
  deleteBtnEvn(id);

  // edit the container
  if (!container.classList.contains("show-container")) {
    container.classList.add("show-container");
  }
  // add item to local storage
  addToLS(value, id);
  // reset grocery value
  grocery.value = "";
  // edit alert
  alertFun("alert-success", "item add to the list");
}
function addToLS(value, id) {
  items.push({
    value: value,
    id: id,
  });
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
function editBtnEvn(id) {
  document.querySelector(`[data-id="${id}"] .edit-btn`).onclick = () => {
    submitBtn.textContent = "edit";
    submitBtn.dataset.target = id;
    grocery.value = document.querySelector(
      `[data-id="${id}"] .title`
    ).textContent;
  };
}
function deleteBtnEvn(id) {
  document.querySelector(`[data-id="${id}"] .delete-btn`).onclick = () => {
    // remove it from DOM
    let article = document.querySelector(`[data-id="${id}"]`)
    article.parentElement.removeChild(article);
    // remove it from local storage
    items = items.filter(el => el.id != id );
    localStorage.items = JSON.stringify(items)
    // check for list
    if(!list.childElementCount) {
      container.classList.remove("show-container");
    }
    //  alert 
    alertFun("alert-danger","item deleted")

  };
}
function submitBtnEvn(e) {
  let id = submitBtn.dataset.target;
  if (id != "") {
    // prevent default callback fun
    e.preventDefault();
    // get changed value and set it
    value = grocery.value;
    list.querySelector(`[data-id="${id}"] .title`).textContent = value;
    // update value in local data
    let item = items.filter((item) => {
      return item.id == id;
    })[0];
    item.value = value;
    localStorage.items = JSON.stringify(items);
    // reset subBtn ann grocey
    submitBtn.textContent = "submit";
    submitBtn.dataset.target = "";
    grocery.value = "";

    // edit alert
    alert.classList.add("alert-success");
    alert.textContent = "value changed";
    setTimeout((_) => {
      alert.textContent = "";
      alert.classList.remove("alert-success");
    }, 1000);
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
// ****** LOCAL STORAGE **********
// restore item from local storage
if (localStorage.hasOwnProperty("items") && localStorage.items != "[]") {
  container.classList.add("show-container");
  // restore items
  restorItems();
  // reset editBtn event listener
  items.forEach((item) => {
    editBtnEvn(item.id);
    deleteBtnEvn(item.id);
  });
}
// remove item from local storage

// ****** SETUP ITEMS **********
