// let global varivales

const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
let spanCol = document.querySelector(".color")

// add event listner to the btn
document.getElementById("btn").onclick = () => {
  let myColor = colors[unniqueNum()];
  spanCol.textContent = myColor
  document.body.style.background = myColor
};

// function to generate unique number
function unniqueNum() {
  let num = Math.floor(Math.random() * (4));
  if (num == colors.indexOf(spanCol.textContent)) {
    return unniqueNum()
  } else {
    return num;
  }
}