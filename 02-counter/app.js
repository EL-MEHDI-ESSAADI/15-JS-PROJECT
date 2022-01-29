let mySpan = document.getElementById("value");

document.querySelector(".reset").addEventListener("click", Von());
document.querySelector(".increase").addEventListener("click",Von(1));
document.querySelector(".decrease").addEventListener("click",Von(-1));

function Von(num) {
  return () => {
    mySpan.textContent = +mySpan.textContent + (num ?? (-mySpan.textContent));
    mySpan.textContent > 0 ? mySpan.style.color = "green": 
    mySpan.textContent < 0 ? mySpan.style.color = "red":
    mySpan.style.color = "inherit"
  }
}