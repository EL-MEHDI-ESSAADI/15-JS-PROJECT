// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************

let dateSpan = document.getElementById("date")
dateSpan.textContent = new Date().getFullYear()
// ********** close links ************
let linksContainer = document.querySelector(".links-container")
let links = document.querySelector(".links")
document.querySelector(".nav-toggle").onclick = () => {
  if (linksContainer.getBoundingClientRect().height === 0) {
    linksContainer.style.height = `${links.clientHeight}px`
  } else {
    linksContainer.style.height = 0
  }
};
// ********** fixed myNav ************
let myNav = document.querySelector("nav")
let topLink = document.querySelector(".top-link")
window.onscroll = () => {
  let navHeight = myNav.getBoundingClientRect().height
  let scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight && !myNav.classList.contains("fixed-nav")) {
    myNav.classList.add("fixed-nav")
  } else if (scrollHeight < navHeight && myNav.classList.contains("fixed-nav")) {
    myNav.classList.remove("fixed-nav")
  } else if (scrollHeight > 50 && !topLink.classList.contains("show-link")) {
    topLink.classList.add("show-link")
  } else if (scrollHeight < 500 && topLink.classList.contains("show-link")) {
    topLink.classList.remove("show-link")
  }
};

// ********** smooth scroll ************
scrollLiks = document.querySelectorAll(".scroll-link");

scrollLiks.forEach(link => {
  link.onclick = (e) => {
    // prevent default
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href");
    const target = document.querySelector(id);
    const navHeight = myNav.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const isNavFixed = myNav.classList.contains("fixed-nav");
    let position = target.offsetTop - navHeight;

    if (!isNavFixed) {
      position = position - navHeight
    }
    if(navHeight > 82) {
      position += containerHeight
    }
    window.scrollTo({
      left:0,
      top:position,
      behavior: "smooth",
    })
    linksContainer.style.height = 0
  }
});




// topLink.onclick = () => {
//   window.scrollTo({       //  scroll by x and y with auto or smooth behavoir
//     top: 0,         // x nad y are numbers and the unit is outo to px
//     right: 0,
//     behavior: "smooth"
//   })
// };
// select links
