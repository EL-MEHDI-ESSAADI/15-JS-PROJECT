let slides = document.querySelectorAll(".slide");
let prevBtn = document.querySelector(".prevBtn");
let nextBtn = document.querySelector(".nextBtn");
let slideCon = document.querySelector(".slider-container")
let counter = 0
slides.forEach((slide,index) => {
  slide.style.left = `${index}00%`
})
// ############# Add event listender to buttons ##########
nextBtn.onclick = () => {
  if(counter == slideCon.childElementCount - 1) {
    counter = 0
    carsoul(counter);
  }else { 
    counter++
    carsoul(counter);
  }
}

prevBtn.onclick = () => {
  if(counter == 0) {
    counter = slides.length - 1
    carsoul(counter);
  }else { 
    counter--
    carsoul(counter);
  }
}
function carsoul(counter) {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${- 100 * counter}%)`
  })
}