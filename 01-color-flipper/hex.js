const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
let spanCol = document.querySelector(".color")

// add event listner to the btn
document.getElementById("btn").onclick = () => {
  let myColor = unniqueNum();
  spanCol.textContent = myColor
  document.body.style.backgroundColor = myColor
};

// function to generate unique number
function unniqueNum() {
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)] ;
  }
  if (color == spanCol.textContent) {
    return unniqueNum()
  } else {
    return color;
  }
}