// The thing is when add class avtive to buttom will active
// The thing is when add class avtive to item will display

let btns = document.querySelectorAll(".tab-btn");
let items = document.querySelectorAll(".content")
let btnContainer = document.querySelector(".btn-container")

btnContainer.onclick = e => {
  let btn = e.target;
  // remove active from all buttons
  btns.forEach(btnEl => {
    btnEl.classList.remove("active");
  });
  // add active to the clicked button
  btn.classList.add("active");
  // remove active from all buttons
  items.forEach(item => {
    item.classList.remove("active")
  });
    // add active to the target item
  document.querySelector(`#${btn.dataset.id}`).classList.add("active")
}


