const hamburger = document.querySelector(".hamburger")
const headerInner = document.querySelector(".header-inner")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open")
  headerInner.classList.toggle("open")
})