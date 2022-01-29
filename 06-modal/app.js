
let modal = document.querySelector(".modal-overlay");

document.querySelectorAll(".btn").forEach((el) => {
  el.onclick = () => {
    modal.classList.toggle("open-modal")
  };
})

