// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class
let links = document.querySelector(".links")

document.querySelector(".nav-toggle").addEventListener("click", () => {
  links.classList.toggle("show-links")
})
