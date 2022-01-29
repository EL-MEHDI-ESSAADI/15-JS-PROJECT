// MDN
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.

const btn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");

// hide preloader when the page load

window.addEventListener("load",() => {
  document.querySelector(".preloader").classList.add("hide-preloader")
})

// set button controler
btn.addEventListener("click", (e) => {
  if (!btn.classList.contains("slide")) {
    btn.classList.add("slide")
    video.pause()
  } else {
    btn.classList.remove("slide")
    video.play()
  }
});