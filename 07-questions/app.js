




let articles = document.querySelectorAll("article");

document.querySelectorAll(".question").forEach((article) => {
  article.querySelector(".question-btn").onclick = () => {
    article.classList.toggle("show-text");

    articles.forEach((itel) => {
      if (article != itel)
      itel.classList.remove("show-text")
    })
  };
});




